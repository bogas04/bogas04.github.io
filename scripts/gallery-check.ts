import fs from "node:fs";
import path from "node:path";

import {
  IMAGES_DIRECTORY,
  PUBLIC_DIRECTORY,
  PUBLIC_GALLERY_DIRECTORY,
  allImageSidecars,
  booleanValue,
  formatPath,
  inspectImage,
  isGalleryCategory,
  listImageFilesRecursive,
  readAlbumConfigs,
  readAlbums,
  imageIdIsSafe,
  slugIsSafe,
  stringValue,
} from "./gallery-lib.ts";

function add(errors: string[], message: string): void {
  errors.push(message);
}

async function main(): Promise<void> {
  const errors: string[] = [];
  let configs;
  try {
    configs = readAlbumConfigs();
  } catch (error) {
    add(errors, error instanceof Error ? error.message : String(error));
    configs = [];
  }
  const albums = configs.length ? readAlbums() : [];
  const albumIds = new Set<string>();

  if (!configs.length) add(errors, "gallery/albums.json has no albums");

  for (const config of configs) {
    const albumId = config.id;
    const albumDirectory = path.resolve(process.cwd(), config.path);
    if (albumIds.has(albumId)) add(errors, `duplicate album ID: ${albumId}`);
    albumIds.add(albumId);
    if (!slugIsSafe(albumId)) add(errors, `unsafe album ID: ${albumId}`);
    if (!albumDirectory.startsWith(`${IMAGES_DIRECTORY}${path.sep}`)) {
      add(errors, `album path must be inside public/img: ${config.path}`);
      continue;
    }
    if (!fs.existsSync(albumDirectory)) add(errors, `${config.path} is missing`);
    if (!fs.existsSync(path.join(albumDirectory, "index.md"))) {
      add(errors, `${formatPath(albumDirectory)} is missing index.md`);
    }
  }

  for (const album of albums) {
    const albumTitle = stringValue(album.data.title);
    const albumSummary = stringValue(album.data.summary);
    const albumCover = stringValue(album.data.cover);
    const albumCategory = stringValue(album.data.category);
    if (!albumTitle) add(errors, `${formatPath(album.metadataPath)} is missing title`);
    if (!albumSummary) add(errors, `${formatPath(album.metadataPath)} is missing summary`);
    if (!isGalleryCategory(albumCategory)) {
      add(errors, `${formatPath(album.metadataPath)} must declare category: travel, blog, or random`);
    }
    if (!albumCover) add(errors, `${formatPath(album.metadataPath)} is missing cover`);
    if (!stringValue(album.data.startDate)) {
      add(errors, `${formatPath(album.metadataPath)} is missing startDate`);
    }
    if (!stringValue(album.data.endDate)) {
      add(errors, `${formatPath(album.metadataPath)} is missing endDate`);
    }
    if (typeof album.data.published !== "boolean") {
      add(errors, `${formatPath(album.metadataPath)} must declare published: true or false`);
    }

    const imageIds = new Set<string>();
    for (const image of album.images) {
      if (imageIds.has(image.id)) add(errors, `duplicate image ID: ${album.id}/${image.id}`);
      imageIds.add(image.id);
      if (!imageIdIsSafe(image.id)) add(errors, `unsafe image ID: ${album.id}/${image.id}`);
      if (image.id === "index") {
        add(errors, `${formatPath(image.sourcePath)} uses reserved image ID: index`);
      }

      if (!fs.existsSync(image.sidecarPath)) {
        add(errors, `${formatPath(image.sourcePath)} has no matching sidecar`);
      } else {
        if (booleanValue(image.data.published) && !stringValue(image.data.title)) {
          add(errors, `${formatPath(image.sidecarPath)} is published but missing title`);
        }
        if (booleanValue(image.data.published) && !stringValue(image.data.alt)) {
          add(errors, `${formatPath(image.sidecarPath)} is published but missing alt`);
        }
      }

      try {
        const inspection = await inspectImage(image.sourcePath);
      } catch (error) {
        add(
          errors,
          `${formatPath(image.sourcePath)} cannot be decoded: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    for (const sidecarPath of allImageSidecars(album)) {
      const id = path.basename(sidecarPath, ".md");
      if (!album.images.some((image) => image.id === id)) {
        add(errors, `${formatPath(sidecarPath)} refers to no image`);
      }
    }

    if (albumCover && !album.images.some((image) => image.id === albumCover)) {
      add(errors, `${formatPath(album.metadataPath)} cover does not match an image`);
    }
  }

  // Existing public assets are also committed source files. Keep the privacy
  // boundary from regressing when an old blog or travel image is replaced.
  for (const publicImagePath of listImageFilesRecursive(PUBLIC_DIRECTORY)) {
    if (publicImagePath.startsWith(`${IMAGES_DIRECTORY}${path.sep}`)) continue;
    if (publicImagePath.startsWith(`${PUBLIC_GALLERY_DIRECTORY}${path.sep}`)) continue;
    try {
      const inspection = await inspectImage(publicImagePath);
      if (inspection.metadataReasons.length) {
        add(
          errors,
          `${formatPath(publicImagePath)} contains ${inspection.metadataReasons.join(", ")}`,
        );
      }
    } catch (error) {
      add(
        errors,
        `${formatPath(publicImagePath)} cannot be decoded: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  if (errors.length) {
    console.error(`Gallery check failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  const imageCount = albums.reduce((count, album) => count + album.images.length, 0);
  console.log(`Gallery check passed: ${albums.length} album(s), ${imageCount} master image(s)`);
}

void main();
