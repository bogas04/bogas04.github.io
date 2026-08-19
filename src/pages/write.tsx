import Head from "next/head";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import remark from "remark";
// @ts-ignore `remark-html` predates its bundled TypeScript declarations.
import html from "remark-html";
import { getBlogTagColors } from "../utils/blogTag";

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

const MAX_IMAGE_DIMENSION = 2400;
const HANDLE_DATABASE = "divjot-blog-writer";
const HANDLE_STORE = "handles";
const REPOSITORY_HANDLE_KEY = "repository";

type WriterDirectories = {
  repository: FileSystemDirectoryHandle;
  blog: FileSystemDirectoryHandle;
  images: FileSystemDirectoryHandle;
};

type ExistingPost = {
  fileName: string;
  title: string;
  date: string;
  isDraft: boolean;
};

type ParsedPost = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
};

type PostSort = "alphabetical" | "status";

const postSortLabels: Record<PostSort, string> = {
  alphabetical: "A–Z",
  status: "Drafts first",
};

const nextPostSort: Record<PostSort, PostSort> = {
  alphabetical: "status",
  status: "alphabetical",
};

const today = () => new Date().toISOString().slice(0, 10);

const renderPreview = (markdown: string) =>
  remark().use(html).processSync(markdown).toString();

const getReadingTimeMinutes = (markdown: string) => {
  const prose = markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  const wordCount = prose.match(/\b[\w'-]+\b/g)?.length || 0;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

const formatLastSaved = (savedAt: Date, now: number) => {
  const seconds = Math.max(0, Math.floor((now - savedAt.getTime()) / 1000));
  if (seconds < 5) return "last saved just now";
  if (seconds < 60) return `last saved ${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `last saved ${minutes}m ago`;
  return `last saved ${Math.floor(minutes / 60)}h ago`;
};

const safeFilePart = (value: string) =>
  value
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const safeFrontmatterValue = (value: string) =>
  value
    .replace(/[\r\n]+/g, " ")
    .replace(/['"]/g, "")
    .trim();

const postFingerprint = ({
  fileName,
  title,
  description,
  date,
  tags,
  body,
  isDraft,
}: {
  fileName: string | null;
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
  isDraft: boolean;
}) =>
  JSON.stringify({ fileName, title, description, date, tags, body, isDraft });

function BlogTagPills({
  tags,
  onRemove,
  onSelect,
}: {
  tags: string[];
  onRemove?: (tag: string) => void;
  onSelect?: (tag: string) => void;
}) {
  if (tags.length === 0) return null;
  return (
    <ul className="blog-tags mb-2!" aria-label="Tags">
      {tags.map((tag) => {
        const colors = getBlogTagColors(tag);
        const style = {
          "--tag-background-color": colors.backgroundColor,
          "--tag-text-color": colors.textColor,
          "--tag-background-color-dark": colors.darkBackgroundColor,
          "--tag-text-color-dark": colors.darkTextColor,
        } as CSSProperties;
        return (
          <li key={tag}>
            {onRemove ? (
              <button
                className="blog-tag"
                type="button"
                onClick={() => onRemove(tag)}
                style={style}
              >
                <span className="tag-name">{tag}</span>
                <span className="tag-count" aria-label={`Remove ${tag}`}>
                  ×
                </span>
              </button>
            ) : onSelect ? (
              <button
                className="blog-tag"
                type="button"
                onClick={() => onSelect(tag)}
                style={style}
              >
                <span className="tag-name">{tag}</span>
              </button>
            ) : (
              <span className="blog-tag" style={style}>
                <span className="tag-name">{tag}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const markdownFile = ({
  title,
  description,
  date,
  tags,
  body,
}: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
}) => `---
title: ${safeFrontmatterValue(title)}
description: ${safeFrontmatterValue(description)}
date: "${date}T12:00:00.000Z"
categories: []
keywords: [${tags.map((tag) => safeFrontmatterValue(tag)).join(", ")}]
---

${body.trim()}\n`;

async function getWriterDirectories(
  repository: FileSystemDirectoryHandle,
): Promise<WriterDirectories> {
  const src = await repository.getDirectoryHandle("src");
  const blog = await src.getDirectoryHandle("blog");
  const publicDirectory = await repository.getDirectoryHandle("public");
  const imageRoot = await publicDirectory.getDirectoryHandle("img");
  const images = await imageRoot.getDirectoryHandle("blog", { create: true });

  return { repository, blog, images };
}

function openHandleDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(HANDLE_DATABASE, 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore(HANDLE_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveRepositoryHandle(repository: FileSystemDirectoryHandle) {
  const database = await openHandleDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(HANDLE_STORE, "readwrite");
    transaction
      .objectStore(HANDLE_STORE)
      .put(repository, REPOSITORY_HANDLE_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

async function loadRepositoryHandle() {
  const database = await openHandleDatabase();
  const handle = await new Promise<FileSystemDirectoryHandle | undefined>(
    (resolve, reject) => {
      const request = database
        .transaction(HANDLE_STORE)
        .objectStore(HANDLE_STORE)
        .get(REPOSITORY_HANDLE_KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    },
  );
  database.close();
  return handle;
}

function parsePost(content: string): ParsedPost {
  const [, frontmatter = "", body = ""] = content.split(/---\r?\n?/);
  const values: Record<string, string> = {};
  let activeKey = "";

  for (const line of frontmatter.split(/\r?\n/)) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field) {
      activeKey = field[1];
      values[activeKey] = field[2];
    } else if (activeKey && /^\s+/.test(line)) {
      values[activeKey] += ` ${line.trim()}`;
    }
  }

  return {
    title: values.title || "Untitled post",
    description: values.description || "",
    date: (values.date || today()).replace(/["']/g, "").slice(0, 10),
    tags: (values.keywords || "")
      .trim()
      .replace(/^\[/, "")
      .replace(/\]$/, "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    body: body.trim(),
  };
}

async function getExistingPosts(directory: FileSystemDirectoryHandle) {
  const tags = new Set<string>();
  const posts: ExistingPost[] = [];

  for await (const [name, entry] of directory.entries()) {
    if (entry.kind !== "file" || !name.endsWith(".md")) continue;

    const post = parsePost(
      await (await (entry as FileSystemFileHandle).getFile()).text(),
    );
    post.tags.forEach((tag) => tags.add(tag));
    posts.push({
      fileName: name,
      title: post.title,
      date: post.date,
      isDraft: name.startsWith("draft "),
    });
  }

  return {
    posts: posts.sort((a, b) => a.title.localeCompare(b.title)),
    tags: [...tags].sort((a, b) => a.localeCompare(b)),
  };
}

async function optimiseImage(file: File) {
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });
  const scale = Math.min(
    1,
    MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.86),
  );
  if (!blob) throw new Error("The browser could not optimise this image.");
  return blob;
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV !== "development") return { notFound: true };
  return { props: {} };
};

export default function BlogWriter() {
  const router = useRouter();
  const [directories, setDirectories] = useState<WriterDirectories | null>(
    null,
  );
  const [hasSavedRepository, setHasSavedRepository] = useState(false);
  const [posts, setPosts] = useState<ExistingPost[]>([]);
  const [postSearch, setPostSearch] = useState("");
  const [postSort, setPostSort] = useState<PostSort>("status");
  const [editingFileName, setEditingFileName] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today);
  const [body, setBody] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const textarea = useRef<HTMLTextAreaElement>(null);
  const lastSavedDraft = useRef<string | null>(null);
  const isSaving = useRef(false);
  const autosave = useRef<() => void>(() => undefined);

  const preview = useMemo(
    () => renderPreview(body || "_Start writing to see a preview._"),
    [body],
  );
  const availableTags = tags.filter((tag) => !selectedTags.includes(tag));
  const visiblePosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(postSearch.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (postSort === "status") {
        return (
          Number(b.isDraft) - Number(a.isDraft) ||
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });
  const readingTimeMinutes = getReadingTimeMinutes(body);
  const draftFromUrl =
    typeof router.query.draft === "string" ? router.query.draft : null;

  const setDraftInUrl = (fileName: string | null) => {
    void router.replace(
      { pathname: "/write", query: fileName ? { draft: fileName } : {} },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  useEffect(() => {
    if (!lastSavedAt) return;
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [lastSavedAt]);

  const loadRepository = async (repository: FileSystemDirectoryHandle) => {
    const nextDirectories = await getWriterDirectories(repository);
    const existingContent = await getExistingPosts(nextDirectories.blog);
    setDirectories(nextDirectories);
    setPosts(existingContent.posts);
    setTags(existingContent.tags);
  };

  useEffect(() => {
    const restoreRepository = async () => {
      try {
        const repository = await loadRepositoryHandle();
        if (!repository) return;
        setHasSavedRepository(true);
        if (
          (await repository.queryPermission({ mode: "readwrite" })) ===
          "granted"
        ) {
          await loadRepository(repository);
          setMessage("Reconnected to the saved repository.");
        } else {
          setMessage(
            "Your repository is remembered. Reconnect to grant file access.",
          );
        }
      } catch {
        setMessage("Could not restore the saved repository.");
      }
    };
    void restoreRepository();
  }, []);

  const connect = async () => {
    setIsBusy(true);
    setMessage("");
    try {
      if (!window.showDirectoryPicker) {
        throw new Error(
          "This writer needs Chrome, Edge, or another browser with the File System Access API.",
        );
      }
      const repository = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      await saveRepositoryHandle(repository);
      setHasSavedRepository(true);
      await loadRepository(repository);
      setMessage(
        "Repository connected. Files will be written only when you save.",
      );
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not connect to that folder.",
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const reconnect = async () => {
    setIsBusy(true);
    try {
      const repository = await loadRepositoryHandle();
      if (!repository) throw new Error("No saved repository was found.");
      const permission = await repository.requestPermission({
        mode: "readwrite",
      });
      if (permission !== "granted")
        throw new Error("File access was not granted.");
      await loadRepository(repository);
      setMessage("Reconnected to the saved repository.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not reconnect to the saved repository.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const disconnect = () => {
    setDirectories(null);
    setPosts([]);
    setEditingFileName(null);
    setLastSavedAt(null);
    setMessage("");
  };

  const addTag = (rawTag: string) => {
    const tag = safeFrontmatterValue(rawTag);
    if (!tag || selectedTags.includes(tag)) return;
    setSelectedTags((current) => [...current, tag]);
    setTagInput("");
  };

  const insertAtCursor = (content: string) => {
    const element = textarea.current;
    if (!element) return;
    const start = element.selectionStart;
    const end = element.selectionEnd;
    setBody(
      (current) => `${current.slice(0, start)}${content}${current.slice(end)}`,
    );
    requestAnimationFrame(() => {
      element.focus();
      const cursor = start + content.length;
      element.setSelectionRange(cursor, cursor);
    });
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!directories) {
      setMessage("Connect the repository before uploading an image.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    setIsBusy(true);
    setMessage("Optimising image and removing metadata…");
    try {
      const image = await optimiseImage(file);
      const name = `${safeFilePart(file.name.replace(/\.[^.]+$/, "")) || "image"}-${Date.now()}.webp`;
      const imageFile = await directories.images.getFileHandle(name, {
        create: true,
      });
      const writer = await imageFile.createWritable();
      await writer.write(image);
      await writer.close();
      insertAtCursor(
        `![${safeFrontmatterValue(file.name.replace(/\.[^.]+$/, ""))}](/img/blog/${name})`,
      );
      setMessage(
        `Added /img/blog/${name}. It was resized if needed and re-encoded without EXIF metadata.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not add that image.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const editPost = async (post: ExistingPost) => {
    if (!directories) return;
    setIsBusy(true);
    try {
      const content = await (
        await directories.blog.getFileHandle(post.fileName)
      ).getFile();
      const parsed = parsePost(await content.text());
      setEditingFileName(post.fileName);
      setTitle(parsed.title);
      setDescription(parsed.description);
      setDate(parsed.date);
      setSelectedTags(parsed.tags);
      setBody(parsed.body);
      setIsDraft(post.isDraft);
      setLastSavedAt(new Date(content.lastModified));
      lastSavedDraft.current = post.isDraft
        ? postFingerprint({ fileName: post.fileName, ...parsed, isDraft: true })
        : null;
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not open that post.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const openPost = (post: ExistingPost) => {
    setDraftInUrl(post.isDraft ? post.fileName : null);
    void editPost(post);
  };

  const newPost = () => {
    setDraftInUrl(null);
    setEditingFileName(null);
    setTitle("");
    setDescription("");
    setDate(today());
    setSelectedTags([]);
    setBody("");
    setIsDraft(true);
    lastSavedDraft.current = null;
    setLastSavedAt(null);
    setMessage("New draft. Save it to create a Markdown file.");
  };

  const deleteDraft = async () => {
    if (!directories || !editingFileName || !isDraft) return;
    if (
      !window.confirm(
        `Delete “${title || editingFileName}”? This cannot be undone.`,
      )
    )
      return;

    setIsBusy(true);
    try {
      await directories.blog.removeEntry(editingFileName);
      const existingContent = await getExistingPosts(directories.blog);
      setPosts(existingContent.posts);
      setTags(existingContent.tags);
      newPost();
      setMessage("Draft deleted.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not delete the draft.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const save = async (isAutosave = false) => {
    if (!directories) {
      if (!isAutosave) setMessage("Connect the repository before saving.");
      return;
    }
    if (!title.trim() || !description.trim()) {
      if (!isAutosave) setMessage("Title and description are required.");
      return;
    }
    const name = safeFilePart(`${isDraft ? "draft " : ""}${title}.md`);
    if (!name || name === ".md") {
      if (!isAutosave) setMessage("Please use a valid title.");
      return;
    }
    const snapshot = postFingerprint({
      fileName: name,
      title,
      description,
      date,
      tags: selectedTags,
      body,
      isDraft,
    });
    if (
      isAutosave &&
      (!isDraft || snapshot === lastSavedDraft.current || isSaving.current)
    )
      return;

    isSaving.current = true;
    if (!isAutosave) setIsBusy(true);
    try {
      if (name !== editingFileName) {
        try {
          await directories.blog.getFileHandle(name);
          throw new Error(`src/blog/${name} already exists.`);
        } catch (error) {
          if ((error as DOMException).name !== "NotFoundError") throw error;
        }
      }
      const file = await directories.blog.getFileHandle(name, { create: true });
      const writer = await file.createWritable();
      await writer.write(
        markdownFile({ title, description, date, tags: selectedTags, body }),
      );
      await writer.close();
      if (editingFileName && editingFileName !== name) {
        await directories.blog.removeEntry(editingFileName);
      }
      setEditingFileName(name);
      setDraftInUrl(isDraft ? name : null);
      lastSavedDraft.current = isDraft ? snapshot : null;
      setLastSavedAt(new Date());
      const existingContent = await getExistingPosts(directories.blog);
      setPosts(existingContent.posts);
      setTags(existingContent.tags);
      setMessage(
        isAutosave
          ? `Autosaved src/blog/${name}.`
          : `Saved src/blog/${name}. Review it in git, then commit and push when ready.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not save the post.",
      );
    } finally {
      isSaving.current = false;
      if (!isAutosave) setIsBusy(false);
    }
  };

  autosave.current = () => {
    void save(true);
  };

  useEffect(() => {
    if (!directories || !isDraft) return;
    const timer = window.setTimeout(() => autosave.current(), 30_000);
    return () => window.clearTimeout(timer);
  }, [
    directories,
    isDraft,
    editingFileName,
    title,
    description,
    date,
    selectedTags,
    body,
  ]);

  useEffect(() => {
    if (
      !router.isReady ||
      !directories ||
      !draftFromUrl ||
      editingFileName === draftFromUrl
    )
      return;
    const post = posts.find(
      (candidate) => candidate.fileName === draftFromUrl && candidate.isDraft,
    );
    if (post) void editPost(post);
  }, [router.isReady, directories, draftFromUrl, posts, editingFileName]);

  return (
    <main className="mx-auto min-h-screen max-w-384 bg-white px-6 py-10 text-slate-800 dark:bg-[#333] dark:text-white sm:px-10">
      <Head>
        <title>write | divjot</title>
      </Head>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-6 dark:border-white/15">
        <div>
          <h1 className="m-0 font-body text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            write something.
          </h1>
        </div>
        <div className="flex gap-2">
          {!directories && hasSavedRepository && (
            <button
              className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-50 dark:border-white/25"
              type="button"
              onClick={reconnect}
              disabled={isBusy}
            >
              Reconnect saved
            </button>
          )}
          <button
            className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800"
            type="button"
            onClick={directories ? disconnect : connect}
            disabled={isBusy}
          >
            {directories ? "Disconnect" : "Connect repository"}
          </button>
        </div>
      </header>

      {message && (
        <p className="mb-6 rounded-md bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-white/10 dark:text-slate-200">
          {message}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)_minmax(0,1fr)]">
        <aside
          className="order-last border-t border-slate-200 pt-6 dark:border-white/15 lg:order-first lg:border-r lg:border-t-0 lg:pr-6 lg:pt-0"
          aria-label="Existing posts"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="m-0 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
              posts
            </p>
            <button
              className="rounded bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800"
              type="button"
              onClick={newPost}
              disabled={!directories || isBusy}
            >
              New post
            </button>
          </div>
          {!directories && (
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Connect the repository to edit posts.
            </p>
          )}
          {directories && (
            <button
              className="mb-3 text-xs text-slate-500 underline underline-offset-4 dark:text-slate-300"
              type="button"
              onClick={() => setPostSort((current) => nextPostSort[current])}
            >
              Sort: {postSortLabels[postSort]}
            </button>
          )}
          {directories && (
            <input
              className="mb-3 w-full rounded border border-slate-300 bg-transparent px-2.5 py-2 text-sm dark:border-white/25"
              type="search"
              placeholder="Search posts"
              aria-label="Search posts"
              value={postSearch}
              onChange={(event) => setPostSearch(event.target.value)}
            />
          )}
          <ul className="m-0 max-h-[70vh] list-none space-y-1 overflow-y-auto p-0">
            {visiblePosts.map((post) => (
              <li key={post.fileName}>
                <button
                  className={`w-full rounded px-2 py-2 text-left text-sm ${editingFileName === post.fileName ? "bg-slate-200 dark:bg-white/15" : "hover:bg-slate-100 dark:hover:bg-white/10"}`}
                  type="button"
                  onClick={() => openPost(post)}
                  disabled={isBusy}
                >
                  <span className="block truncate">{post.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-600 dark:text-slate-300">
                    {formatPostDate(post.date)}
                  </span>
                  {post.isDraft && (
                    <span className="text-[0.65rem] uppercase text-amber-600 dark:text-amber-300">
                      draft
                    </span>
                  )}
                </button>
              </li>
            ))}
            {directories && visiblePosts.length === 0 && (
              <li className="px-2 py-3 text-sm text-slate-500 dark:text-slate-300">
                No matching posts.
              </li>
            )}
          </ul>
        </aside>
        <section className="flex min-h-0 flex-col" aria-label="Post editor">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <input
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25"
                placeholder="Title"
                aria-label="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label className="sm:col-span-2">
              <textarea
                className="min-h-20 w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25"
                placeholder="Description"
                aria-label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <label>
              <input
                className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25"
                type="date"
                aria-label="Date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <label className="flex items-end gap-2 pb-2 text-sm">
              <input
                type="checkbox"
                checked={isDraft}
                onChange={(event) => setIsDraft(event.target.checked)}
              />{" "}
              Save as draft{" "}
              <span className="text-xs text-slate-500 dark:text-slate-300">
                (autosaves every 30s)
              </span>
            </label>
          </div>

          <div className="mt-5">
            <BlogTagPills
              tags={selectedTags}
              onRemove={(tag) =>
                setSelectedTags((current) =>
                  current.filter((currentTag) => currentTag !== tag),
                )
              }
            />
            <div className="mt-2 flex gap-2">
              <input
                className="min-w-0 flex-1 rounded border border-slate-300 bg-transparent px-3 py-2 dark:border-white/25"
                placeholder="Add a tag"
                aria-label="Add a tag"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTag(tagInput);
                  }
                }}
              />
              <button
                className="rounded border border-slate-300 px-3 text-sm dark:border-white/25"
                type="button"
                onClick={() => addTag(tagInput)}
              >
                Add
              </button>
            </div>
            {availableTags.length > 0 && (
              <div className="mt-2">
                <BlogTagPills tags={availableTags} onSelect={addTag} />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <label className="cursor-pointer rounded border border-slate-300 px-3 py-2 text-sm dark:border-white/25">
              <input
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={uploadImage}
                disabled={isBusy}
              />
              Add optimised image
            </label>
            <span className="text-xs text-slate-500 dark:text-slate-300">
              WebP · max {MAX_IMAGE_DIMENSION}px · EXIF removed
            </span>
          </div>
          <label className="mt-3 flex min-h-128 flex-1 flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-semibold">
              Markdown{" "}
              <span className="font-normal text-slate-500 dark:text-slate-300">
                {readingTimeMinutes} {readingTimeMinutes === 1 ? "min" : "mins"}{" "}
                read
              </span>
            </span>
            <textarea
              ref={textarea}
              className="min-h-128 w-full flex-1 rounded border border-slate-300 bg-transparent p-3 text-sm leading-6 dark:border-white/25"
              placeholder="Start writing…"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </label>
          <div className="sticky bottom-0 z-10 mt-5 flex items-center justify-between gap-4 border-t border-slate-200 bg-white/95 pt-4 backdrop-blur-sm dark:border-white/15 dark:bg-[#333]/95">
            <span className="text-xs text-slate-500 dark:text-slate-300">
              {lastSavedAt
                ? formatLastSaved(lastSavedAt, currentTime)
                : "not saved yet"}
            </span>
            <div className="flex items-center gap-3">
              {isDraft && editingFileName && (
                <button
                  className="rounded border border-red-300 px-3 py-2 text-sm text-red-700 disabled:opacity-50 dark:border-red-300/50 dark:text-red-300"
                  type="button"
                  disabled={isBusy}
                  onClick={() => void deleteDraft()}
                >
                  Delete draft
                </button>
              )}
              <button
                className="rounded bg-slate-800 px-5 py-2.5 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-800"
                type="button"
                disabled={isBusy || !directories}
                onClick={() => void save()}
              >
                {editingFileName ? "Save changes" : "Save Markdown file"}
              </button>
            </div>
          </div>
        </section>

        <section
          className="min-w-0 border-t border-slate-200 pt-6 dark:border-white/15 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          aria-label="Preview"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
            preview
          </p>
          <h2 className="mb-2 font-body text-3xl font-semibold tracking-[-0.03em]">
            {title || "Untitled post"}
          </h2>
          {description && (
            <p className="mb-5 text-slate-600 dark:text-slate-200">
              {description}
            </p>
          )}
          <BlogTagPills tags={selectedTags} />
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </section>
      </div>
    </main>
  );
}
