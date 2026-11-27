import { watch } from "node:fs";
import path from "node:path";

// Coalesce bursts of image and metadata writes, and never run two builds at once.
export function watchGallery({ root, rebuild, delay = 750, onError = console.error }) {
  let timer;
  let running = false;
  let pending = false;
  let closed = false;

  const schedule = () => {
    if (closed) return;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (running) { pending = true; return; }
      running = true;
      try { await rebuild(); } catch (error) { onError(error); }
      finally {
        running = false;
        if (pending && !closed) { pending = false; schedule(); }
      }
    }, delay);
  };

  const watchers = [
    watch(path.join(root, "public", "img"), { recursive: true }, schedule),
    watch(path.join(root, "gallery"), (_event, name) => {
      if (!name || name.toString() === "albums.json") schedule();
    }),
  ];
  for (const watcher of watchers) watcher.on("error", onError);
  return () => {
    closed = true;
    clearTimeout(timer);
    watchers.forEach((watcher) => watcher.close());
  };
}
