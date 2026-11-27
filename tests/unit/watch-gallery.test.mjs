import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import test from "node:test";
import { watchGallery } from "../../scripts/watch-gallery.mjs";

async function waitFor(condition) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (condition()) return;
    await sleep(20);
  }
  throw new Error("Timed out waiting for gallery rebuild");
}

test("gallery watcher coalesces changes and serializes rebuilds", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "gallery-watch-"));
  await mkdir(path.join(root, "public/img/album"), { recursive: true });
  await mkdir(path.join(root, "gallery/generated"), { recursive: true });
  let builds = 0;
  let active = 0;
  let overlap = false;
  const stop = watchGallery({ root, delay: 40, onError: (error) => { throw error; }, rebuild: async () => {
    builds++;
    active++;
    if (active > 1) overlap = true;
    await sleep(150);
    active--;
  } });
  try {
    await writeFile(path.join(root, "public/img/album/01.jpg"), "image");
    await writeFile(path.join(root, "public/img/album/01.md"), "metadata");
    await waitFor(() => builds === 1);
    await writeFile(path.join(root, "gallery/albums.json"), "{}");
    await waitFor(() => builds === 2);
    await sleep(220);
    assert.equal(overlap, false);
    await writeFile(path.join(root, "gallery/generated/manifest.json"), "{}");
    await sleep(120);
    assert.equal(builds, 2);
  } finally {
    stop();
    await rm(root, { recursive: true, force: true });
  }
});
