import Head from "next/head";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  discardRecovery,
  loadRecovery,
  saveRecovery,
  type RecoverySnapshot,
} from "../utils/authoringRecovery";

declare global {
  interface Window {
    showDirectoryPicker?: (options?: {
      mode?: "read" | "readwrite";
      id?: string;
    }) => Promise<FileSystemDirectoryHandle>;
  }
  interface FileSystemHandle {
    queryPermission(options?: {
      mode?: "read" | "readwrite";
    }): Promise<PermissionState>;
    requestPermission(options?: {
      mode?: "read" | "readwrite";
    }): Promise<PermissionState>;
  }
  interface FileSystemDirectoryHandle {
    entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
    removeEntry(name: string, options?: { recursive?: boolean }): Promise<void>;
  }
}

const HANDLE_DATABASE = "divjot-gallery-uploader";
const HANDLE_STORE = "handles";
const REPOSITORY_HANDLE_KEY = "repository";
const UPLOADER_RECOVERY_KEY = "divjot-gallery-uploader-recovery";
const IMAGE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;
const ALBUM_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;
const OPTIMIZATION_VERSION = "2";
const MAX_CONCURRENT_TRANSFORMS = 4;

type GalleryCategory = "travel" | "blog" | "random" | "screenshots";

type AlbumConfig = {
  id: string;
  path: string;
};

type AlbumForm = {
  id: string;
  path: string;
  title: string;
  summary: string;
  category: GalleryCategory;
  cover: string;
  startDate: string;
  endDate: string;
  published: boolean;
};

type ImageForm = {
  id: string;
  title: string;
  alt: string;
  takenAt: string;
  location: string;
  published: boolean;
  featured: boolean;
  optimized: boolean;
  optimizationVersion: string;
  caption: string;
};

type GalleryImage = ImageForm & {
  name: string;
};

type GalleryAlbum = AlbumConfig & {
  form: AlbumForm;
  directory: FileSystemDirectoryHandle;
  images: GalleryImage[];
};

type UploaderRecovery = {
  selectedAlbumId: string | null;
  selectedImageId: string | null;
  albumForm: AlbumForm;
  imageForm: ImageForm;
  savedAlbumForm: AlbumForm;
  savedImageForm: ImageForm;
};

type OptimizationNotice = {
  albumId: string;
  message: string;
};

const emptyAlbum = (): AlbumForm => ({
  id: "",
  path: "public/img/",
  title: "",
  summary: "",
  category: "random",
  cover: "",
  startDate: "",
  endDate: "",
  published: false,
});

const emptyImage = (): ImageForm => ({
  id: "",
  title: "",
  alt: "",
  takenAt: "",
  location: "",
  published: false,
  featured: false,
  optimized: false,
  optimizationVersion: "",
  caption: "",
});

const imageId = (name: string) => name.replace(/\.[^.]+$/, "");

async function optimiseImage(file: File): Promise<Blob> {
  const response = await fetch("/api/local-image-optimizer", {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!response.ok) throw new Error(await response.text() || "The local image optimizer could not process this image.");
  return response.blob();
}

async function mapWithConcurrency<T, Result>(
  values: T[],
  task: (value: T) => Promise<Result>,
): Promise<Result[]> {
  const results = new Array<Result>(values.length);
  let nextIndex = 0;
  const worker = async () => {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await task(values[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENT_TRANSFORMS, values.length) }, worker));
  return results;
}

const safeText = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const frontmatterString = (value: string) => JSON.stringify(safeText(value));

function parseFrontmatter(source: string) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string | boolean>, body: source.trim() };
  const data: Record<string, string | boolean> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!field) continue;
    const [, key, rawValue] = field;
    const value = rawValue.trim();
    if (value === "true") data[key] = true;
    else if (value === "false") data[key] = false;
    else if (value.startsWith('"') && value.endsWith('"')) {
      try {
        data[key] = JSON.parse(value) as string;
      } catch {
        data[key] = value.slice(1, -1);
      }
    } else data[key] = value;
  }
  return { data, body: match[2].trim() };
}

const stringValue = (value: string | boolean | undefined) =>
  typeof value === "string" ? value : "";

const booleanValue = (value: string | boolean | undefined) => value === true;

function albumFile(form: AlbumForm) {
  return `---
title: ${frontmatterString(form.title)}
summary: ${frontmatterString(form.summary)}
cover: ${frontmatterString(form.cover)}
category: ${form.category}
startDate: ${frontmatterString(form.startDate)}
endDate: ${frontmatterString(form.endDate)}
published: ${form.published}
---

${form.summary.trim()}\n`;
}

function imageFile(form: ImageForm) {
  return `---
title: ${frontmatterString(form.title)}
alt: ${frontmatterString(form.alt)}
takenAt: ${frontmatterString(form.takenAt)}
location: ${frontmatterString(form.location)}
published: ${form.published}
featured: ${form.featured}
optimized: ${form.optimized}
optimizationVersion: ${frontmatterString(form.optimizationVersion)}
---

${form.caption.trim()}\n`;
}

function openHandleDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(HANDLE_DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(HANDLE_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveRepositoryHandle(repository: FileSystemDirectoryHandle) {
  const database = await openHandleDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(HANDLE_STORE, "readwrite");
    transaction.objectStore(HANDLE_STORE).put(repository, REPOSITORY_HANDLE_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

async function loadRepositoryHandle() {
  const database = await openHandleDatabase();
  const handle = await new Promise<FileSystemDirectoryHandle | undefined>((resolve, reject) => {
    const request = database.transaction(HANDLE_STORE).objectStore(HANDLE_STORE).get(REPOSITORY_HANDLE_KEY);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return handle;
}

async function readText(directory: FileSystemDirectoryHandle, name: string) {
  return (await directory.getFileHandle(name)).getFile().then((file) => file.text());
}

async function writeText(directory: FileSystemDirectoryHandle, name: string, value: string) {
  const file = await directory.getFileHandle(name, { create: true });
  const writer = await file.createWritable();
  await writer.write(value);
  await writer.close();
}

async function directoryAt(
  repository: FileSystemDirectoryHandle,
  relativePath: string,
  create = false,
) {
  const segments = relativePath.split("/").filter(Boolean);
  let directory = repository;
  for (const segment of segments) {
    directory = await directory.getDirectoryHandle(segment, { create });
  }
  return directory;
}

function validateAlbumPath(value: string) {
  const normalised = value.replace(/^\.\//, "").replace(/\/+$/, "");
  if (!normalised.startsWith("public/img/") || normalised.includes("..")) {
    throw new Error("Album paths must stay inside public/img.");
  }
  return normalised;
}

async function readAlbum(
  repository: FileSystemDirectoryHandle,
  config: AlbumConfig,
): Promise<GalleryAlbum> {
  const directory = await directoryAt(repository, config.path);
  const parsedAlbum = parseFrontmatter(await readText(directory, "index.md"));
  const form: AlbumForm = {
    id: config.id,
    path: config.path,
    title: stringValue(parsedAlbum.data.title),
    summary: stringValue(parsedAlbum.data.summary) || parsedAlbum.body,
    category: (stringValue(parsedAlbum.data.category) as GalleryCategory) || "random",
    cover: stringValue(parsedAlbum.data.cover),
    startDate: stringValue(parsedAlbum.data.startDate),
    endDate: stringValue(parsedAlbum.data.endDate),
    published: booleanValue(parsedAlbum.data.published),
  };
  const images: GalleryImage[] = [];
  for await (const [name, entry] of directory.entries()) {
    if (entry.kind !== "file" || !IMAGE_PATTERN.test(name)) continue;
    const id = imageId(name);
    let parsed = { data: {} as Record<string, string | boolean>, body: "" };
    try {
      parsed = parseFrontmatter(await readText(directory, `${id}.md`));
    } catch (error) {
      if ((error as DOMException).name !== "NotFoundError") throw error;
    }
    images.push({
      id,
      name,
      title: stringValue(parsed.data.title),
      alt: stringValue(parsed.data.alt),
      takenAt: stringValue(parsed.data.takenAt),
      location: stringValue(parsed.data.location),
      published: booleanValue(parsed.data.published),
      featured: booleanValue(parsed.data.featured),
      optimized: booleanValue(parsed.data.optimized),
      optimizationVersion: stringValue(parsed.data.optimizationVersion),
      caption: parsed.body,
    });
  }
  return { ...config, form, directory, images: images.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })) };
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV !== "development") return { notFound: true };
  return { props: {} };
};

export default function GalleryUploader() {
  const router = useRouter();
  const [repository, setRepository] = useState<FileSystemDirectoryHandle | null>(null);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [albumSearch, setAlbumSearch] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [albumForm, setAlbumForm] = useState<AlbumForm>(emptyAlbum);
  const [imageForm, setImageForm] = useState<ImageForm>(emptyImage);
  const [optimizationNotice, setOptimizationNotice] = useState<OptimizationNotice | null>(null);
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [hasSavedRepository, setHasSavedRepository] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<string, string>>({});
  const [savedAlbumForm, setSavedAlbumForm] = useState<AlbumForm>(emptyAlbum);
  const [savedImageForm, setSavedImageForm] = useState<ImageForm>(emptyImage);
  const [recovery, setRecovery] = useState<RecoverySnapshot<UploaderRecovery> | null>(null);
  const [recoveryReady, setRecoveryReady] = useState(false);

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId) || null;
  const selectedImage = selectedAlbum?.images.find((image) => image.id === selectedImageId) || null;
  const isDirty =
    JSON.stringify(albumForm) !== JSON.stringify(savedAlbumForm) ||
    JSON.stringify(imageForm) !== JSON.stringify(savedImageForm);
  const recoveryValue = (): UploaderRecovery => ({
    selectedAlbumId,
    selectedImageId,
    albumForm,
    imageForm,
    savedAlbumForm,
    savedImageForm,
  });

  const reload = async (nextRepository: FileSystemDirectoryHandle, preferredAlbumId?: string | null) => {
    const gallery = await nextRepository.getDirectoryHandle("gallery");
    const config = JSON.parse(await readText(gallery, "albums.json")) as { albums?: AlbumConfig[] };
    if (!Array.isArray(config.albums)) throw new Error("gallery/albums.json must contain an albums array.");
    const nextAlbums = await Promise.all(config.albums.map((album) => readAlbum(nextRepository, album)));
    setRepository(nextRepository);
    setAlbums(nextAlbums);
    const nextSelectedId = preferredAlbumId && nextAlbums.some((album) => album.id === preferredAlbumId)
      ? preferredAlbumId
      : nextAlbums[0]?.id || null;
    setSelectedAlbumId(nextSelectedId);
    setSelectedImageId(null);
    const nextAlbum = nextAlbums.find((album) => album.id === nextSelectedId);
    const nextAlbumForm = nextAlbum?.form || emptyAlbum();
    const nextImageForm = emptyImage();
    setAlbumForm(nextAlbumForm);
    setImageForm(nextImageForm);
    setSavedAlbumForm(nextAlbumForm);
    setSavedImageForm(nextImageForm);
  };

  useEffect(() => {
    const restoreRepository = async () => {
      try {
        const saved = await loadRepositoryHandle();
        if (!saved) return;
        setHasSavedRepository(true);
        if ((await saved.queryPermission({ mode: "readwrite" })) === "granted") {
          await reload(saved);
          setMessage("Reconnected to the saved repository.");
        } else {
          setMessage("Your repository is remembered. Reconnect to grant file access.");
        }
      } catch {
        setMessage("Could not restore the saved repository.");
      }
    };
    void restoreRepository();
  }, []);

  useEffect(() => {
    setRecovery(loadRecovery<UploaderRecovery>(UPLOADER_RECOVERY_KEY));
    setRecoveryReady(true);
  }, []);

  useEffect(() => {
    if (!recoveryReady || !isDirty) return;
    const timer = window.setTimeout(
      () => saveRecovery(UPLOADER_RECOVERY_KEY, recoveryValue()),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [recoveryReady, albumForm, imageForm, savedAlbumForm, savedImageForm]);

  useEffect(() => {
    if (!isDirty) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!selectedImage || !selectedAlbum) {
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
      return;
    }
    let active = true;
    void selectedAlbum.directory.getFileHandle(selectedImage.name).then((handle) => handle.getFile()).then((file) => {
      if (!active) return;
      const url = URL.createObjectURL(file);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return url;
      });
    });
    return () => { active = false; };
  }, [selectedAlbum, selectedImage]);

  useEffect(() => {
    if (!selectedAlbum) {
      setThumbnailUrls({});
      return undefined;
    }
    let active = true;
    const urls: string[] = [];
    void Promise.all(selectedAlbum.images.map(async (image) => {
      const file = await (await selectedAlbum.directory.getFileHandle(image.name)).getFile();
      const url = URL.createObjectURL(file);
      urls.push(url);
      return [image.id, url] as const;
    })).then((entries) => {
      if (active) {
        setThumbnailUrls(Object.fromEntries(entries));
      } else {
        entries.forEach(([, url]) => URL.revokeObjectURL(url));
      }
    }).catch(() => {
      if (active) setThumbnailUrls({});
    });
    return () => {
      active = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedAlbum]);

  const connect = async () => {
    setIsBusy(true);
    try {
      if (!window.showDirectoryPicker) throw new Error("This uploader needs Chrome, Edge, or another browser with the File System Access API.");
      const nextRepository = await window.showDirectoryPicker({ mode: "readwrite", id: "bogas04-repository" });
      await saveRepositoryHandle(nextRepository);
      setHasSavedRepository(true);
      await reload(nextRepository);
      setMessage("Repository connected. Images and metadata are written only when you save.");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setMessage(error instanceof Error ? error.message : "Could not connect to that folder.");
    } finally {
      setIsBusy(false);
    }
  };

  const reconnect = async () => {
    setIsBusy(true);
    try {
      const saved = await loadRepositoryHandle();
      if (!saved) throw new Error("No saved repository was found.");
      if ((await saved.requestPermission({ mode: "readwrite" })) !== "granted") throw new Error("File access was not granted.");
      await reload(saved);
      setMessage("Reconnected to the saved repository.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not reconnect to the saved repository.");
    } finally {
      setIsBusy(false);
    }
  };

  const selectAlbum = (album: GalleryAlbum) => {
    if (isDirty) {
      saveRecovery(UPLOADER_RECOVERY_KEY, recoveryValue());
      if (!window.confirm("You have unsaved changes. They are kept in this browser for recovery. Continue?")) return;
    }
    setSelectedAlbumId(album.id);
    setSelectedImageId(null);
    setAlbumForm(album.form);
    const nextImageForm = emptyImage();
    setImageForm(nextImageForm);
    setSavedAlbumForm(album.form);
    setSavedImageForm(nextImageForm);
  };

  const selectImage = (image: GalleryImage) => {
    if (isDirty) {
      saveRecovery(UPLOADER_RECOVERY_KEY, recoveryValue());
      if (!window.confirm("You have unsaved changes. They are kept in this browser for recovery. Continue?")) return;
    }
    setSelectedImageId(image.id);
    setImageForm(image);
    setSavedImageForm(image);
  };

  const restoreRecovery = () => {
    if (!recovery) return;
    const value = recovery.value;
    setSelectedAlbumId(value.selectedAlbumId);
    setSelectedImageId(value.selectedImageId);
    setAlbumForm(value.albumForm);
    setImageForm(value.imageForm);
    setSavedAlbumForm(value.savedAlbumForm);
    setSavedImageForm(value.savedImageForm);
    setRecovery(null);
    setMessage("Restored unsaved gallery details from this browser. Save when you are ready to write them to the repository.");
  };

  const discardStoredRecovery = () => {
    discardRecovery(UPLOADER_RECOVERY_KEY);
    setRecovery(null);
  };

  const saveAlbum = async () => {
    if (!repository) return setMessage("Connect the repository before saving an album.");
    if (!ALBUM_ID_PATTERN.test(albumForm.id)) return setMessage("Album ID must use lowercase letters, numbers, hyphens, and nested folder slashes.");
    setIsBusy(true);
    try {
      const albumPath = validateAlbumPath(albumForm.path);
      const directory = await directoryAt(repository, albumPath, true);
      await writeText(directory, "index.md", albumFile({ ...albumForm, path: albumPath }));
      const gallery = await repository.getDirectoryHandle("gallery");
      const config = JSON.parse(await readText(gallery, "albums.json")) as { albums: AlbumConfig[] };
      const existingIndex = config.albums.findIndex((album) => album.id === selectedAlbumId || album.id === albumForm.id);
      const entry = { id: albumForm.id, path: albumPath };
      if (existingIndex === -1) config.albums.push(entry);
      else config.albums[existingIndex] = entry;
      await writeText(gallery, "albums.json", `${JSON.stringify(config, null, 2)}\n`);
      await reload(repository, albumForm.id);
      setSavedAlbumForm({ ...albumForm, path: albumPath });
      discardRecovery(UPLOADER_RECOVERY_KEY);
      setRecovery(null);
      setMessage(`Saved ${albumForm.id} in ${albumPath}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the album.");
    } finally {
      setIsBusy(false);
    }
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length || !selectedAlbum || !repository) return;
    if (files.some((file) => !IMAGE_PATTERN.test(file.name))) return setMessage("Choose only JPG, PNG, GIF, WebP, or AVIF images.");
    setIsBusy(true);
    setMessage(`Optimising ${files.length} image${files.length === 1 ? "" : "s"} and removing metadata…`);
    try {
      let skipped = 0;
      const acceptedFiles: File[] = [];
      for (const file of files) {
        const name = `${imageId(file.name)}.jpg`;
        let exists = false;
        try {
          await selectedAlbum.directory.getFileHandle(name);
          exists = true;
        } catch (error) {
          if ((error as DOMException).name !== "NotFoundError") throw error;
        }
        if (exists && !window.confirm(`Replace ${name}?`)) {
          skipped += 1;
          continue;
        }
        acceptedFiles.push(file);
      }
      const uploadedImages = await mapWithConcurrency(acceptedFiles, async (file) => {
        const name = `${imageId(file.name)}.jpg`;
        const id = imageId(name);
        const image = await optimiseImage(file);
        const destination = await selectedAlbum.directory.getFileHandle(name, { create: true });
        const writer = await destination.createWritable();
        await writer.write(image);
        await writer.close();
        try {
          const parsed = parseFrontmatter(await readText(selectedAlbum.directory, `${id}.md`));
          return {
            id,
            title: stringValue(parsed.data.title),
            alt: stringValue(parsed.data.alt),
            takenAt: stringValue(parsed.data.takenAt),
            location: stringValue(parsed.data.location),
            published: booleanValue(parsed.data.published),
            featured: booleanValue(parsed.data.featured),
            optimized: true,
            optimizationVersion: OPTIMIZATION_VERSION,
            caption: parsed.body,
          };
        } catch (error) {
          if ((error as DOMException).name !== "NotFoundError") throw error;
          const nextImage = { ...emptyImage(), id, title: id, optimized: true, optimizationVersion: OPTIMIZATION_VERSION };
          await writeText(selectedAlbum.directory, `${id}.md`, imageFile(nextImage));
          return nextImage;
        }
      });
      await reload(repository, selectedAlbum.id);
      const latestImage = uploadedImages.at(-1);
      if (latestImage) {
        setSelectedImageId(latestImage.id);
        setImageForm(latestImage);
      }
      setMessage(`Added ${uploadedImages.length} optimised image${uploadedImages.length === 1 ? "" : "s"}${skipped ? `; skipped ${skipped} existing image${skipped === 1 ? "" : "s"}` : ""}. Add title, alt text, dates, and captions before publishing.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add that image.");
    } finally {
      setIsBusy(false);
    }
  };

  const autoFillAlbumDates = () => {
    if (!selectedAlbum) return;
    const dates = selectedAlbum.images.map((image) => image.id === selectedImageId ? imageForm.takenAt : image.takenAt)
      .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
      .sort();
    if (!dates.length) return setMessage("Add a full Taken at date to one or more images before auto-filling the album dates.");
    setAlbumForm((current) => ({ ...current, startDate: dates[0], endDate: dates.at(-1)! }));
    setMessage(`Set album dates from ${dates[0]} to ${dates.at(-1)}. Save the album to write them.`);
  };

  const optimizeAlbumImages = async () => {
    if (!selectedAlbum || !repository) return;
    const imagesToOptimize = selectedAlbum.images.filter((image) => image.optimizationVersion !== OPTIMIZATION_VERSION);
    if (!imagesToOptimize.length) {
      setOptimizationNotice({
        albumId: selectedAlbum.id,
        message: `All ${selectedAlbum.images.length} image${selectedAlbum.images.length === 1 ? " is" : "s are"} already optimized to 1440px.`,
      });
      return;
    }
    if (!window.confirm(`Optimize ${imagesToOptimize.length} image${imagesToOptimize.length === 1 ? "" : "s"} to a 1440px maximum? This replaces their current master files.`)) return;
    setIsBusy(true);
    setMessage(`Optimizing ${imagesToOptimize.length} image${imagesToOptimize.length === 1 ? "" : "s"}…`);
    try {
      await mapWithConcurrency(imagesToOptimize, async (image) => {
        const source = await (await selectedAlbum.directory.getFileHandle(image.name)).getFile();
        const optimized = await optimiseImage(source);
        const destinationName = `${image.id}.jpg`;
        const destination = await selectedAlbum.directory.getFileHandle(destinationName, { create: true });
        const writer = await destination.createWritable();
        await writer.write(optimized);
        await writer.close();
        if (destinationName !== image.name) await selectedAlbum.directory.removeEntry(image.name);
        await writeText(selectedAlbum.directory, `${image.id}.md`, imageFile({ ...image, optimized: true, optimizationVersion: OPTIMIZATION_VERSION }));
      });
      await reload(repository, selectedAlbum.id);
      setOptimizationNotice({
        albumId: selectedAlbum.id,
        message: `Optimized ${imagesToOptimize.length} image${imagesToOptimize.length === 1 ? "" : "s"} to a 1440px maximum.`,
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not optimize this album's images.");
    } finally {
      setIsBusy(false);
    }
  };

  const saveImage = async () => {
    if (!selectedAlbum || !selectedImage || !repository) return setMessage("Choose an image before saving its details.");
    setIsBusy(true);
    try {
      await writeText(selectedAlbum.directory, `${selectedImage.id}.md`, imageFile({ ...imageForm, id: selectedImage.id }));
      await reload(repository, selectedAlbum.id);
      setSelectedImageId(selectedImage.id);
      setImageForm(imageForm);
      setSavedImageForm(imageForm);
      discardRecovery(UPLOADER_RECOVERY_KEY);
      setRecovery(null);
      setMessage(`Saved metadata for ${selectedImage.name}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the image details.");
    } finally {
      setIsBusy(false);
    }
  };

  const visibleImages = useMemo(() => selectedAlbum?.images || [], [selectedAlbum]);
  const visibleAlbums = useMemo(() => {
    const search = albumSearch.trim().toLocaleLowerCase();
    if (!search) return albums;
    return albums.filter((album) =>
      [album.id, album.path, album.form.title, album.form.category]
        .some((value) => value.toLocaleLowerCase().includes(search)),
    );
  }, [albumSearch, albums]);

  return (
    <main className="mx-auto min-h-screen max-w-384 bg-white px-6 py-10 text-slate-800 dark:bg-[#333] dark:text-white sm:px-10">
      <Head><title>upload | divjot</title></Head>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-6 dark:border-white/15">
        <div>
          <h1 className="m-0 font-body text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">organise your gallery.</h1>
          <p className="mb-0 mt-2 text-sm text-slate-600 dark:text-slate-300">Local-only authoring for albums, images, and captions.</p>
        </div>
        <div className="flex gap-2">
          {!repository && hasSavedRepository && <button className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-50 dark:border-white/25" type="button" onClick={() => void reconnect()} disabled={isBusy}>Reconnect saved</button>}
          <button className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" onClick={repository ? () => { setRepository(null); setAlbums([]); } : () => void connect()} disabled={isBusy} autoFocus={!repository && router.query.connect === "1"}>{repository ? "Disconnect" : "Connect repository"}</button>
        </div>
      </header>

      {message && <p className="mb-6 rounded-md bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-white/10 dark:text-slate-200">{message}</p>}

      {recovery && <section className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-300/40 dark:bg-amber-300/10 dark:text-amber-100" aria-label="Recovered gallery work"><p className="m-0">Unsaved gallery details from {new Date(recovery.savedAt).toLocaleString()} are available in this browser.</p><div className="mt-3 flex flex-wrap gap-2"><button className="rounded bg-amber-900 px-3 py-1.5 font-semibold text-white dark:bg-amber-100 dark:text-amber-950" type="button" onClick={restoreRecovery}>Restore them</button><button className="rounded border border-current px-3 py-1.5 font-semibold" type="button" onClick={discardStoredRecovery}>Discard recovery</button></div></section>}

      {isDirty && <p className="mb-6 text-sm text-slate-500 dark:text-slate-300">Unsaved details are recoverable in this browser and will not be written to the repository until you save.</p>}

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)]">
        <aside className="order-last border-t border-slate-200 pt-6 dark:border-white/15 lg:order-first lg:border-r lg:border-t-0 lg:pr-6 lg:pt-0">
          <div className="mb-4 flex items-center justify-between"><p className="m-0 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">albums</p><button className="rounded bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={!repository || isBusy} onClick={() => { setSelectedAlbumId(null); setSelectedImageId(null); setAlbumForm(emptyAlbum()); setImageForm(emptyImage()); }}>New album</button></div>
          {!repository && <p className="text-sm text-slate-500 dark:text-slate-300">Connect the repository to organise the gallery.</p>}
          {repository && <input className="mb-3 w-full rounded border border-slate-300 bg-transparent px-2.5 py-2 text-sm dark:border-white/25" type="search" placeholder="Search albums" aria-label="Search albums" value={albumSearch} onChange={(event) => setAlbumSearch(event.target.value)} />}
          <ul className="m-0 list-none space-y-1 p-0">{visibleAlbums.map((album) => <li key={album.id}><button className={`w-full rounded px-2 py-2 text-left text-sm ${album.id === selectedAlbumId ? "bg-slate-200 dark:bg-white/15" : "hover:bg-slate-100 dark:hover:bg-white/10"}`} type="button" disabled={isBusy} onClick={() => selectAlbum(album)}><span className="block truncate">{album.form.title || album.id}</span><span className="block truncate text-xs text-slate-500 dark:text-slate-300">{album.path}</span><span className="text-[0.65rem] uppercase text-slate-500 dark:text-slate-300">{album.images.length} images</span></button></li>)}{repository && visibleAlbums.length === 0 && <li className="px-2 py-3 text-sm text-slate-500 dark:text-slate-300">No matching albums.</li>}</ul>
        </aside>

        <section aria-label="Album editor">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">album</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="mb-1 block text-sm font-semibold">Album ID</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="screenshots/celeste" value={albumForm.id} onChange={(event) => setAlbumForm((current) => ({ ...current, id: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">Image folder</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="public/img/screenshots/celeste" value={albumForm.path} onChange={(event) => setAlbumForm((current) => ({ ...current, path: event.target.value }))} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Title</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.title} onChange={(event) => setAlbumForm((current) => ({ ...current, title: event.target.value }))} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Summary</span><textarea className="min-h-20 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.summary} onChange={(event) => setAlbumForm((current) => ({ ...current, summary: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">Category</span><select className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.category} onChange={(event) => setAlbumForm((current) => ({ ...current, category: event.target.value as GalleryCategory }))}><option value="travel">Travel</option><option value="blog">Blog</option><option value="random">Random</option><option value="screenshots">Screenshots</option></select></label>
            <label><span className="mb-1 block text-sm font-semibold">Cover image</span><select className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.cover} onChange={(event) => setAlbumForm((current) => ({ ...current, cover: event.target.value }))}><option value="">Choose after upload</option>{visibleImages.map((image) => <option key={image.id} value={image.id}>{image.name}</option>)}</select></label>
            <label><span className="mb-1 block text-sm font-semibold">Start date</span><input type="date" className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.startDate} onChange={(event) => setAlbumForm((current) => ({ ...current, startDate: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">End date</span><input type="date" className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.endDate} onChange={(event) => setAlbumForm((current) => ({ ...current, endDate: event.target.value }))} /></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={albumForm.published} onChange={(event) => setAlbumForm((current) => ({ ...current, published: event.target.checked }))} /> Publish this album</label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3"><button className="rounded bg-slate-800 px-5 py-2.5 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={!repository || isBusy} onClick={() => void saveAlbum()}>{selectedAlbumId ? "Save album" : "Create album"}</button>{selectedAlbum && <><button className="rounded border border-slate-300 px-5 py-2.5 font-semibold disabled:opacity-50 dark:border-white/25" type="button" disabled={isBusy} onClick={autoFillAlbumDates}>Auto-fill from image dates</button><button className="rounded border border-slate-300 px-5 py-2.5 font-semibold disabled:opacity-50 dark:border-white/25" type="button" disabled={isBusy} onClick={() => void optimizeAlbumImages()}>Optimize all images</button>{optimizationNotice?.albumId === selectedAlbum.id && <p className="m-0 text-sm text-emerald-700 dark:text-emerald-300" role="status">{optimizationNotice.message}</p>}</>}</div>

          {selectedAlbum && <div className="mt-9 border-t border-slate-200 pt-6 dark:border-white/15"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><p className="m-0 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">images</p><label className="cursor-pointer rounded border border-slate-300 px-3 py-2 text-sm dark:border-white/25"><input className="sr-only" type="file" multiple accept="image/avif,image/gif,image/jpeg,image/png,image/webp" onChange={uploadImages} disabled={isBusy} />Upload images</label></div><p className="text-xs text-slate-500 dark:text-slate-300">Select one or more images. They are reduced to 1440px on the longest edge, then saved as quality-95 JPEGs with orientation baked in and metadata removed.</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{visibleImages.map((image) => <button className={`group relative aspect-square overflow-hidden rounded border text-left ${image.id === selectedImageId ? "border-slate-800 ring-2 ring-slate-800 dark:border-white dark:ring-white" : "border-slate-300 dark:border-white/25"}`} type="button" key={image.id} aria-label={`Edit ${image.title || image.name}`} onClick={() => selectImage(image)}>{thumbnailUrls[image.id] ? <img className="h-full w-full object-cover" src={thumbnailUrls[image.id]} alt="" /> : <span className="block h-full bg-slate-100 dark:bg-white/10" />}{image.optimizationVersion === OPTIMIZATION_VERSION && <span className="absolute bottom-1 left-1 rounded bg-emerald-700/85 px-1.5 py-0.5 text-[0.65rem] uppercase text-white">optimized</span>}<span className="absolute right-1 bottom-1 rounded bg-black/65 px-1.5 py-0.5 text-[0.65rem] uppercase text-white">{image.published ? "published" : "draft"}</span></button>)}</div></div>}
        </section>

        <section className="min-w-0 border-t border-slate-200 pt-6 dark:border-white/15 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Image editor">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">image details</p>
          {!selectedImage && <p className="text-sm text-slate-500 dark:text-slate-300">Choose an image to add its accessible text, caption, and publishing details.</p>}
          {selectedImage && <><div className="mb-5 overflow-hidden rounded border border-slate-200 bg-slate-100 dark:border-white/15 dark:bg-black/20">{previewUrl ? <img className="max-h-80 w-full object-contain" src={previewUrl} alt="" /> : <div className="h-48" />}</div><p className="mb-5 text-xs text-slate-500 dark:text-slate-300">{selectedImage.name}</p><div className="grid gap-4"><label><span className="mb-1 block text-sm font-semibold">Title</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.title} onChange={(event) => setImageForm((current) => ({ ...current, title: event.target.value }))} /></label><label><span className="mb-1 block text-sm font-semibold">Alt text</span><textarea className="min-h-20 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.alt} onChange={(event) => setImageForm((current) => ({ ...current, alt: event.target.value }))} /></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1 block text-sm font-semibold">Taken at</span><input type="date" className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.takenAt} onChange={(event) => setImageForm((current) => ({ ...current, takenAt: event.target.value }))} /></label><label><span className="mb-1 block text-sm font-semibold">Location</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.location} onChange={(event) => setImageForm((current) => ({ ...current, location: event.target.value }))} /></label></div><label><span className="mb-1 block text-sm font-semibold">Caption</span><textarea className="min-h-32 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.caption} onChange={(event) => setImageForm((current) => ({ ...current, caption: event.target.value }))} /></label><div className="flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={imageForm.published} onChange={(event) => setImageForm((current) => ({ ...current, published: event.target.checked }))} /> Publish image</label><label className="flex items-center gap-2"><input type="checkbox" checked={imageForm.featured} onChange={(event) => setImageForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured</label></div></div><button className="mt-5 rounded bg-slate-800 px-5 py-2.5 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={isBusy} onClick={() => void saveImage()}>Save image details</button></>}
        </section>
      </div>
    </main>
  );
}
