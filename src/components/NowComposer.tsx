import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    showDirectoryPicker?: (options?: {
      mode?: "read" | "readwrite";
      id?: string;
    }) => Promise<FileSystemDirectoryHandle>;
  }
  interface FileSystemHandle {
    queryPermission(options?: { mode?: "read" | "readwrite" }): Promise<PermissionState>;
    requestPermission(options?: { mode?: "read" | "readwrite" }): Promise<PermissionState>;
  }
}

type LinkPreview = {
  url: string;
  title: string;
  description: string;
  image: string | null;
};

const HANDLE_DATABASE = "divjot-now-writer";
const HANDLE_STORE = "handles";
const REPOSITORY_HANDLE_KEY = "repository";

const cleanFrontmatter = (value: string) =>
  value.replace(/[\r\n]+/g, " ").replace(/['"]/g, "").trim();

const markdownText = (value: string) => value.replace(/[[\]]/g, "\\$&");

const fileNameFor = (title: string) =>
  `now ${title.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim()}.md`;

const descriptionFor = (body: string, title: string) =>
  cleanFrontmatter(body.replace(/\[[^\]]*\]\([^)]*\)/g, "").replace(/[#>*_`]/g, " ").replace(/\s+/g, " ").slice(0, 180)) || title;

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
  const repository = await new Promise<FileSystemDirectoryHandle | undefined>((resolve, reject) => {
    const request = database.transaction(HANDLE_STORE).objectStore(HANDLE_STORE).get(REPOSITORY_HANDLE_KEY);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return repository;
}

function previewMarkdown(preview: LinkPreview) {
  const link = `[${markdownText(preview.title || preview.url)}](${preview.url})`;
  const image = preview.image
    ? `[![${markdownText(preview.title || "Link preview")}](${preview.image})](${preview.url})\n\n`
    : "";
  const description = preview.description ? `\n> ${preview.description}` : "";
  return `${image}${link}${description}\n`;
}

export default function NowComposer() {
  const [repository, setRepository] = useState<FileSystemDirectoryHandle | null>(null);
  const [hasSavedRepository, setHasSavedRepository] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const restoreRepository = async () => {
      try {
        const savedRepository = await loadRepositoryHandle();
        if (!savedRepository) return;
        setHasSavedRepository(true);
        if ((await savedRepository.queryPermission({ mode: "readwrite" })) === "granted") {
          setRepository(savedRepository);
        }
      } catch {
        setMessage("Could not restore the saved repository.");
      }
    };
    void restoreRepository();
  }, []);

  const connect = async (reconnect = false) => {
    setIsBusy(true);
    try {
      const selectedRepository = reconnect
        ? await loadRepositoryHandle()
        : await window.showDirectoryPicker?.({ mode: "readwrite", id: "bogas04-repository" });
      if (!selectedRepository) throw new Error("Select this repository to publish a now post.");
      if (reconnect && (await selectedRepository.requestPermission({ mode: "readwrite" })) !== "granted") {
        throw new Error("File access was not granted.");
      }
      await saveRepositoryHandle(selectedRepository);
      setRepository(selectedRepository);
      setHasSavedRepository(true);
      setMessage("Repository connected. Publish writes a Markdown file.");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        setMessage(error instanceof Error ? error.message : "Could not connect the repository.");
      }
    } finally {
      setIsBusy(false);
    }
  };

  const insertPreview = async (url: string) => {
    if (!/^https?:\/\/\S+$/i.test(url)) {
      setMessage("Paste a complete http or https URL.");
      return;
    }
    setIsBusy(true);
    setMessage("Looking up link preview…");
    try {
      const response = await fetch("/api/local-link-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const result = await response.json() as LinkPreview & { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not create a link preview.");
      const insertion = previewMarkdown(result);
      setTitle((current) => current.trim() ? current : result.title);
      const element = textarea.current;
      if (!element) return;
      const start = element.selectionStart;
      const end = element.selectionEnd;
      setBody((current) => `${current.slice(0, start)}${insertion}${current.slice(end)}`);
      requestAnimationFrame(() => {
        element.focus();
        element.setSelectionRange(start + insertion.length, start + insertion.length);
      });
      setPreviewUrl("");
      setMessage("Added link preview to your update.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create a link preview.");
    } finally {
      setIsBusy(false);
    }
  };

  const publish = async () => {
    if (!repository) {
      setMessage("Connect the repository before publishing.");
      return;
    }
    if (!title.trim() || !body.trim()) {
      setMessage("A title and update are required.");
      return;
    }
    const fileName = fileNameFor(title);
    if (fileName === "now .md") {
      setMessage("Please use a valid title.");
      return;
    }

    setIsBusy(true);
    try {
      const blog = await (await repository.getDirectoryHandle("src")).getDirectoryHandle("blog");
      try {
        await blog.getFileHandle(fileName);
        throw new Error(`src/blog/${fileName} already exists. Choose a different title.`);
      } catch (error) {
        if ((error as DOMException).name !== "NotFoundError") throw error;
      }
      const file = await blog.getFileHandle(fileName, { create: true });
      const writer = await file.createWritable();
      await writer.write(`---\ntitle: ${cleanFrontmatter(title)}\ndescription: ${descriptionFor(body, title)}\ndate: "${new Date().toISOString()}"\ncategories: []\nkeywords: [now]\n---\n\n${body.trim()}\n`);
      await writer.close();
      setTitle("");
      setBody("");
      setMessage(`Published src/blog/${fileName}. The local page will refresh with the new update.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not publish the update.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Panel title="write a scrapbook entry">
      <div className="space-y-2 p-3 text-[12px] text-[#333]">
        <p className="m-0 text-[#666]">Local only. Connect the repository, then publish when this feels ready.</p>
        <input className="w-full border border-[#b8cce0] px-2 py-1 text-[12px]" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="subject" aria-label="Now post title" disabled={isBusy} />
        <textarea ref={textarea} className="min-h-28 w-full border border-[#b8cce0] px-2 py-1 text-[12px]" value={body} onChange={(event) => setBody(event.target.value)} onPaste={(event) => { const pasted = event.clipboardData.getData("text").trim(); if (/^https?:\/\/\S+$/i.test(pasted)) { event.preventDefault(); void insertPreview(pasted); } }} placeholder="what's on your mind? Paste a link to add a preview." aria-label="Now post update" disabled={isBusy} />
        <div className="flex gap-1">
          <input className="min-w-0 flex-1 border border-[#b8cce0] px-2 py-1 text-[11px]" value={previewUrl} onChange={(event) => setPreviewUrl(event.target.value)} placeholder="https://…" aria-label="Link to preview" disabled={isBusy} />
          <button type="button" onClick={() => void insertPreview(previewUrl.trim())} disabled={isBusy} className="text-[11px] disabled:opacity-50"><SmallButton>add preview</SmallButton></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {!repository && hasSavedRepository && <button type="button" onClick={() => void connect(true)} disabled={isBusy} className="text-[11px] disabled:opacity-50"><SmallButton>reconnect</SmallButton></button>}
          <button type="button" onClick={() => void connect()} disabled={isBusy} className="text-[11px] disabled:opacity-50"><SmallButton>{repository ? "change repository" : "connect repository"}</SmallButton></button>
          <button type="button" onClick={() => void publish()} disabled={isBusy || !repository} className="text-[11px] disabled:opacity-50"><SmallButton>publish</SmallButton></button>
        </div>
        {message && <p className="m-0 text-[11px] text-[#666]" role="status">{message}</p>}
      </div>
    </Panel>
  );
}

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return <section className="overflow-hidden rounded-[7px] border border-[#b6c9df] bg-white shadow-[0_1px_2px_rgb(43_70_109/15%)]"><h2 className="m-0 border-b border-[#d8e2ec] bg-[#f8fbff] px-3 py-1.5 font-[Arial,Helvetica,sans-serif] text-[14px] font-bold text-black">{title}</h2>{children}</section>;
}

function SmallButton({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-[4px] border border-[#9bb3cb] bg-gradient-to-b from-white to-[#d9e6f3] px-2 py-[1px] font-bold text-[#17578d] shadow-[inset_0_1px_white]">{children}</span>;
}
