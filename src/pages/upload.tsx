import Head from "next/head";
import type { GetStaticProps } from "next";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

declare global {
  interface Window {
    showDirectoryPicker?: (options?: {
      mode?: "read" | "readwrite";
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
  }
}

const HANDLE_DATABASE = "divjot-gallery-uploader";
const HANDLE_STORE = "handles";
const REPOSITORY_HANDLE_KEY = "repository";
const IMAGE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;
const ALBUM_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type GalleryCategory = "travel" | "blog" | "random";

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
  caption: "",
});

const imageId = (name: string) => name.replace(/\.[^.]+$/, "");

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
  const [repository, setRepository] = useState<FileSystemDirectoryHandle | null>(null);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [albumForm, setAlbumForm] = useState<AlbumForm>(emptyAlbum);
  const [imageForm, setImageForm] = useState<ImageForm>(emptyImage);
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [hasSavedRepository, setHasSavedRepository] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId) || null;
  const selectedImage = selectedAlbum?.images.find((image) => image.id === selectedImageId) || null;

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
    setAlbumForm(nextAlbum?.form || emptyAlbum());
    setImageForm(emptyImage());
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

  const connect = async () => {
    setIsBusy(true);
    try {
      if (!window.showDirectoryPicker) throw new Error("This uploader needs Chrome, Edge, or another browser with the File System Access API.");
      const nextRepository = await window.showDirectoryPicker({ mode: "readwrite" });
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
    setSelectedAlbumId(album.id);
    setSelectedImageId(null);
    setAlbumForm(album.form);
    setImageForm(emptyImage());
  };

  const selectImage = (image: GalleryImage) => {
    setSelectedImageId(image.id);
    setImageForm(image);
  };

  const saveAlbum = async () => {
    if (!repository) return setMessage("Connect the repository before saving an album.");
    if (!ALBUM_ID_PATTERN.test(albumForm.id)) return setMessage("Album ID must use lowercase letters, numbers, and hyphens.");
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
      setMessage(`Saved ${albumForm.id} in ${albumPath}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the album.");
    } finally {
      setIsBusy(false);
    }
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !selectedAlbum || !repository) return;
    if (!IMAGE_PATTERN.test(file.name)) return setMessage("Choose a JPG, PNG, GIF, WebP, or AVIF image.");
    setIsBusy(true);
    try {
      const existing = await selectedAlbum.directory.getFileHandle(file.name, { create: true });
      if ((await existing.getFile()).size > 0 && !window.confirm(`Replace ${file.name}?`)) return;
      const writer = await existing.createWritable();
      await writer.write(await file.arrayBuffer());
      await writer.close();
      const id = imageId(file.name);
      let nextImageForm: ImageForm;
      try {
        const parsed = parseFrontmatter(await readText(selectedAlbum.directory, `${id}.md`));
        nextImageForm = {
          id,
          title: stringValue(parsed.data.title),
          alt: stringValue(parsed.data.alt),
          takenAt: stringValue(parsed.data.takenAt),
          location: stringValue(parsed.data.location),
          published: booleanValue(parsed.data.published),
          featured: booleanValue(parsed.data.featured),
          caption: parsed.body,
        };
      } catch (error) {
        if ((error as DOMException).name !== "NotFoundError") throw error;
        nextImageForm = { ...emptyImage(), id, title: id };
        await writeText(selectedAlbum.directory, `${id}.md`, imageFile(nextImageForm));
      }
      await reload(repository, selectedAlbum.id);
      setSelectedImageId(id);
      setImageForm(nextImageForm);
      setMessage(`Added ${file.name}. Add its title, alt text, and caption before publishing.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add that image.");
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
      setMessage(`Saved metadata for ${selectedImage.name}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the image details.");
    } finally {
      setIsBusy(false);
    }
  };

  const visibleImages = useMemo(() => selectedAlbum?.images || [], [selectedAlbum]);

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
          <button className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" onClick={repository ? () => { setRepository(null); setAlbums([]); } : () => void connect()} disabled={isBusy}>{repository ? "Disconnect" : "Connect repository"}</button>
        </div>
      </header>

      {message && <p className="mb-6 rounded-md bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-white/10 dark:text-slate-200">{message}</p>}

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)]">
        <aside className="order-last border-t border-slate-200 pt-6 dark:border-white/15 lg:order-first lg:border-r lg:border-t-0 lg:pr-6 lg:pt-0">
          <div className="mb-4 flex items-center justify-between"><p className="m-0 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">albums</p><button className="rounded bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={!repository || isBusy} onClick={() => { setSelectedAlbumId(null); setSelectedImageId(null); setAlbumForm(emptyAlbum()); setImageForm(emptyImage()); }}>New album</button></div>
          {!repository && <p className="text-sm text-slate-500 dark:text-slate-300">Connect the repository to organise the gallery.</p>}
          <ul className="m-0 max-h-[70vh] list-none space-y-1 overflow-y-auto p-0">{albums.map((album) => <li key={album.id}><button className={`w-full rounded px-2 py-2 text-left text-sm ${album.id === selectedAlbumId ? "bg-slate-200 dark:bg-white/15" : "hover:bg-slate-100 dark:hover:bg-white/10"}`} type="button" disabled={isBusy} onClick={() => selectAlbum(album)}><span className="block truncate">{album.form.title || album.id}</span><span className="block truncate text-xs text-slate-500 dark:text-slate-300">{album.path}</span><span className="text-[0.65rem] uppercase text-slate-500 dark:text-slate-300">{album.images.length} images</span></button></li>)}</ul>
        </aside>

        <section aria-label="Album editor">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">album</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="mb-1 block text-sm font-semibold">Album ID</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="bali" value={albumForm.id} onChange={(event) => setAlbumForm((current) => ({ ...current, id: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">Image folder</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="public/img/travel/bali" value={albumForm.path} onChange={(event) => setAlbumForm((current) => ({ ...current, path: event.target.value }))} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Title</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.title} onChange={(event) => setAlbumForm((current) => ({ ...current, title: event.target.value }))} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Summary</span><textarea className="min-h-20 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.summary} onChange={(event) => setAlbumForm((current) => ({ ...current, summary: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">Category</span><select className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.category} onChange={(event) => setAlbumForm((current) => ({ ...current, category: event.target.value as GalleryCategory }))}><option value="travel">Travel</option><option value="blog">Blog</option><option value="random">Random</option></select></label>
            <label><span className="mb-1 block text-sm font-semibold">Cover image</span><select className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={albumForm.cover} onChange={(event) => setAlbumForm((current) => ({ ...current, cover: event.target.value }))}><option value="">Choose after upload</option>{visibleImages.map((image) => <option key={image.id} value={image.id}>{image.name}</option>)}</select></label>
            <label><span className="mb-1 block text-sm font-semibold">Start date</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="2024" value={albumForm.startDate} onChange={(event) => setAlbumForm((current) => ({ ...current, startDate: event.target.value }))} /></label>
            <label><span className="mb-1 block text-sm font-semibold">End date</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="2024" value={albumForm.endDate} onChange={(event) => setAlbumForm((current) => ({ ...current, endDate: event.target.value }))} /></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={albumForm.published} onChange={(event) => setAlbumForm((current) => ({ ...current, published: event.target.checked }))} /> Publish this album</label>
          </div>
          <button className="mt-5 rounded bg-slate-800 px-5 py-2.5 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={!repository || isBusy} onClick={() => void saveAlbum()}>{selectedAlbumId ? "Save album" : "Create album"}</button>

          {selectedAlbum && <div className="mt-9 border-t border-slate-200 pt-6 dark:border-white/15"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><p className="m-0 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">images</p><label className="cursor-pointer rounded border border-slate-300 px-3 py-2 text-sm dark:border-white/25"><input className="sr-only" type="file" accept="image/avif,image/gif,image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={isBusy} />Upload image</label></div><p className="text-xs text-slate-500 dark:text-slate-300">The original filename and path are preserved. Generated gallery versions are created by the normal build.</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{visibleImages.map((image) => <button className={`rounded border p-2 text-left text-xs ${image.id === selectedImageId ? "border-slate-800 dark:border-white" : "border-slate-300 dark:border-white/25"}`} type="button" key={image.id} onClick={() => selectImage(image)}><span className="block truncate font-semibold">{image.name}</span><span className="text-slate-500 dark:text-slate-300">{image.published ? "published" : "draft"}</span></button>)}</div></div>}
        </section>

        <section className="min-w-0 border-t border-slate-200 pt-6 dark:border-white/15 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-label="Image editor">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">image details</p>
          {!selectedImage && <p className="text-sm text-slate-500 dark:text-slate-300">Choose an image to add its accessible text, caption, and publishing details.</p>}
          {selectedImage && <><div className="mb-5 overflow-hidden rounded border border-slate-200 bg-slate-100 dark:border-white/15 dark:bg-black/20">{previewUrl ? <img className="max-h-80 w-full object-contain" src={previewUrl} alt="" /> : <div className="h-48" />}</div><p className="mb-5 text-xs text-slate-500 dark:text-slate-300">{selectedImage.name}</p><div className="grid gap-4"><label><span className="mb-1 block text-sm font-semibold">Title</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.title} onChange={(event) => setImageForm((current) => ({ ...current, title: event.target.value }))} /></label><label><span className="mb-1 block text-sm font-semibold">Alt text</span><textarea className="min-h-20 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.alt} onChange={(event) => setImageForm((current) => ({ ...current, alt: event.target.value }))} /></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1 block text-sm font-semibold">Taken at</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" placeholder="2024-05-18" value={imageForm.takenAt} onChange={(event) => setImageForm((current) => ({ ...current, takenAt: event.target.value }))} /></label><label><span className="mb-1 block text-sm font-semibold">Location</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.location} onChange={(event) => setImageForm((current) => ({ ...current, location: event.target.value }))} /></label></div><label><span className="mb-1 block text-sm font-semibold">Caption</span><textarea className="min-h-32 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25" value={imageForm.caption} onChange={(event) => setImageForm((current) => ({ ...current, caption: event.target.value }))} /></label><div className="flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={imageForm.published} onChange={(event) => setImageForm((current) => ({ ...current, published: event.target.checked }))} /> Publish image</label><label className="flex items-center gap-2"><input type="checkbox" checked={imageForm.featured} onChange={(event) => setImageForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured</label></div></div><button className="mt-5 rounded bg-slate-800 px-5 py-2.5 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800" type="button" disabled={isBusy} onClick={() => void saveImage()}>Save image details</button></>}
        </section>
      </div>
    </main>
  );
}
