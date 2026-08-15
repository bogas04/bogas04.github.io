import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import {
  GALLERY_CATEGORIES,
  IMAGES_DIRECTORY,
  createTemporaryDirectory,
  formatPath,
  inspectImage,
  listImageFiles,
  slugIsSafe,
} from "./gallery-lib.ts";

function usage(): never {
  console.error("Usage: pnpm gallery:add <image> --album <album-id> [--category travel|blog|random] [--id <image-id>]");
  process.exit(1);
}

function argumentValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function nextImageId(directory: string): string {
  const ids = listImageFiles(directory)
    .map((filePath) => path.basename(filePath, path.extname(filePath)))
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id));
  const next = (ids.length ? Math.max(...ids) : 0) + 1;
  return String(next).padStart(3, "0");
}

function createAlbumTemplate(
  albumDirectory: string,
  albumId: string,
  coverId: string,
  category: string,
): void {
  const albumPath = path.join(albumDirectory, "index.md");
  if (fs.existsSync(albumPath)) return;
  fs.writeFileSync(
    albumPath,
    `---
title: ${albumId}
summary:
cover: ${coverId}
category: ${category}
startDate:
endDate:
published: false
---

Add an album summary.
`,
    "utf8",
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const inputPath = args.find((arg) => !arg.startsWith("-"));
  const albumId = argumentValue(args, "--album");
  const category = argumentValue(args, "--category") || "random";
  const requestedId = argumentValue(args, "--id");
  if (!inputPath || !albumId || !slugIsSafe(albumId)) usage();
  if (!(GALLERY_CATEGORIES as readonly string[]).includes(category)) usage();
  if (requestedId && (!slugIsSafe(requestedId) || requestedId === "index")) usage();
  if (!fs.existsSync(inputPath)) throw new Error(`Input image does not exist: ${inputPath}`);

  const imageDirectory = path.join(IMAGES_DIRECTORY, albumId);
  const id = requestedId || nextImageId(imageDirectory);
  const destinationPath = path.join(imageDirectory, `${id}.jpg`);
  const sidecarPath = path.join(imageDirectory, `${id}.md`);
  if (fs.existsSync(destinationPath) || fs.existsSync(sidecarPath)) {
    throw new Error(`Gallery image already exists: ${albumId}/${id}`);
  }

  fs.mkdirSync(imageDirectory, { recursive: true });
  createAlbumTemplate(imageDirectory, albumId, id, category);

  const temporaryDirectory = createTemporaryDirectory("gallery-add-");
  const temporaryPath = path.join(temporaryDirectory, `${id}.jpg`);
  try {
    await sharp(inputPath, { failOn: "error" })
      .rotate()
      .jpeg({ quality: 95, mozjpeg: true })
      .toFile(temporaryPath);

    const inspection = await inspectImage(temporaryPath);
    if (inspection.metadataReasons.length) {
      throw new Error(
        `sanitised output still contains ${inspection.metadataReasons.join(", ")}`,
      );
    }
    fs.renameSync(temporaryPath, destinationPath);
    fs.writeFileSync(
      sidecarPath,
      `---
title:
alt:
takenAt:
location:
published: false
featured: false
---

Write a caption for this photo.
`,
      "utf8",
    );
    console.log(`Added sanitised master: ${formatPath(destinationPath)}`);
    console.log(`Created caption sidecar: ${formatPath(sidecarPath)}`);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
