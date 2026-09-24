import fs from "node:fs";
import path from "node:path";

import {
  GENERATED_DIRECTORY,
  booleanValue,
  formatPath,
  inspectImage,
  publicSourceUrl,
  readAlbums,
  stringValue,
} from "./gallery-lib.ts";

interface ManifestImage {
  id: string;
  album: string;
  albumTitle: string;
  category: string;
  title: string;
  alt: string;
  caption: string;
  takenAt: string;
  location: string;
  featured: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  photoUrl: string;
  thumbUrl: string;
  displayUrl: string;
  fallbackUrl: string;
}

interface ManifestAlbum {
  id: string;
  title: string;
  summary: string;
  category: string;
  cover: string;
  startDate: string;
  endDate: string;
  images: string[];
}

interface ManifestFolder {
  id: string;
  title: string;
  folders: string[];
  albums: string[];
}

interface GalleryManifest {
  albums: ManifestAlbum[];
  folders: ManifestFolder[];
  images: ManifestImage[];
}

function folderTitle(id: string): string {
  return id.split("/").at(-1)!.replace(/-/g, " ");
}

function dateOrEmpty(value: unknown): string {
  return stringValue(value as never);
}

async function main(): Promise<void> {
  const albums = readAlbums();
  const manifest: GalleryManifest = { albums: [], folders: [], images: [] };

  fs.rmSync(GENERATED_DIRECTORY, { recursive: true, force: true });
  fs.mkdirSync(GENERATED_DIRECTORY, { recursive: true });

  for (const album of albums) {
    if (!booleanValue(album.data.published)) continue;
    const publishedImages = album.images.filter((image) => booleanValue(image.data.published));
    if (!publishedImages.length) continue;

    const manifestAlbum: ManifestAlbum = {
      id: album.id,
      title: stringValue(album.data.title),
      summary: stringValue(album.data.summary),
      category: stringValue(album.data.category),
      cover: stringValue(album.data.cover),
      startDate: dateOrEmpty(album.data.startDate),
      endDate: dateOrEmpty(album.data.endDate),
      images: [],
    };

    for (const image of publishedImages) {
      const dimensions = await inspectImage(image.sourcePath);
      const sourceUrl = publicSourceUrl(image.sourcePath);
      const imageData: ManifestImage = {
        id: image.id,
        album: album.id,
        albumTitle: manifestAlbum.title,
        category: manifestAlbum.category,
        title: stringValue(image.data.title),
        alt: stringValue(image.data.alt),
        caption: image.caption,
        takenAt: dateOrEmpty(image.data.takenAt),
        location: stringValue(image.data.location),
        featured: booleanValue(image.data.featured),
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: dimensions.height ? dimensions.width / dimensions.height : 1,
        photoUrl: `/images/${album.id.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(image.id)}/`,
        thumbUrl: sourceUrl,
        displayUrl: sourceUrl,
        fallbackUrl: sourceUrl,
      };
      manifest.images.push(imageData);
      manifestAlbum.images.push(image.id);
    }
    manifest.albums.push(manifestAlbum);
  }

  const folders = new Map<string, ManifestFolder>();
  const ensureFolder = (id: string) => {
    const existing = folders.get(id);
    if (existing) return existing;
    const folder: ManifestFolder = { id, title: folderTitle(id), folders: [], albums: [] };
    folders.set(id, folder);
    return folder;
  };
  for (const album of manifest.albums) {
    const parts = album.id.split("/");
    if (parts.length === 1) continue;
    for (let index = 1; index < parts.length; index += 1) {
      const folderId = parts.slice(0, index).join("/");
      const folder = ensureFolder(folderId);
      const childId = parts.slice(0, index + 1).join("/");
      if (index === parts.length - 1) folder.albums.push(album.id);
      else if (!folder.folders.includes(childId)) folder.folders.push(childId);
    }
  }
  manifest.folders = [...folders.values()].map((folder) => ({
    ...folder,
    folders: folder.folders.sort(),
    albums: folder.albums.sort(),
  })).sort((a, b) => a.id.localeCompare(b.id));

  fs.writeFileSync(
    path.join(GENERATED_DIRECTORY, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `Built gallery manifest for ${manifest.images.length} image(s) in ${formatPath(GENERATED_DIRECTORY)}`,
  );
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
