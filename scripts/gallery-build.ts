import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import {
  GENERATED_DIRECTORY,
  PUBLIC_GALLERY_DIRECTORY,
  booleanValue,
  formatPath,
  inspectImage,
  publicImageUrl,
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

interface GalleryManifest {
  albums: ManifestAlbum[];
  images: ManifestImage[];
}

function dateOrEmpty(value: unknown): string {
  return stringValue(value as never);
}

async function buildImage(
  sourcePath: string,
  outputDirectory: string,
): Promise<{ width: number; height: number }> {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const source = sharp(sourcePath, { failOn: "error" }).rotate();
  await source
    .clone()
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputDirectory, "thumb.webp"));
  await source
    .clone()
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5 })
    .toFile(path.join(outputDirectory, "display.webp"));
  await source
    .clone()
    .resize({ width: 2200, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outputDirectory, "display.jpg"));

  const displayMetadata = await sharp(path.join(outputDirectory, "display.webp")).metadata();
  return { width: displayMetadata.width || 0, height: displayMetadata.height || 0 };
}

async function main(): Promise<void> {
  const albums = readAlbums();
  const manifest: GalleryManifest = { albums: [], images: [] };

  fs.rmSync(PUBLIC_GALLERY_DIRECTORY, { recursive: true, force: true });
  fs.rmSync(GENERATED_DIRECTORY, { recursive: true, force: true });
  fs.mkdirSync(PUBLIC_GALLERY_DIRECTORY, { recursive: true });
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
      const outputDirectory = path.join(PUBLIC_GALLERY_DIRECTORY, album.id, image.id);
      const dimensions = await buildImage(image.sourcePath, outputDirectory);
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
        photoUrl: `/image-gallery/${encodeURIComponent(album.id)}/${encodeURIComponent(image.id)}/`,
        thumbUrl: publicImageUrl(album.id, image.id, "thumb.webp"),
        displayUrl: publicImageUrl(album.id, image.id, "display.webp"),
        fallbackUrl: publicImageUrl(album.id, image.id, "display.jpg"),
      };
      manifest.images.push(imageData);
      manifestAlbum.images.push(image.id);
    }
    manifest.albums.push(manifestAlbum);
  }

  fs.writeFileSync(
    path.join(GENERATED_DIRECTORY, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `Built ${manifest.images.length} gallery image(s) in ${formatPath(PUBLIC_GALLERY_DIRECTORY)}`,
  );
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
