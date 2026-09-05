import fs from "node:fs";
import path from "node:path";

import { GalleryManifest } from "./gallery";

const EMPTY_MANIFEST: GalleryManifest = { albums: [], images: [] };

export function getGalleryManifest(): GalleryManifest {
  const manifestPath = path.join(
    process.cwd(),
    "gallery",
    "generated",
    "manifest.json",
  );
  if (!fs.existsSync(manifestPath)) return EMPTY_MANIFEST;
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as GalleryManifest;
  } catch (error) {
    throw new Error(`Unable to read ${manifestPath}: ${String(error)}`);
  }
}

