import fs from "node:fs";
import path from "node:path";

import {
  PUBLIC_GALLERY_DIRECTORY,
  formatPath,
  inspectImage,
  isImageFile,
} from "./gallery-lib.ts";

function findGeneratedImages(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findGeneratedImages(entryPath);
    return entry.isFile() && isImageFile(entry.name) ? [entryPath] : [];
  });
}

async function main(): Promise<void> {
  const files = findGeneratedImages(PUBLIC_GALLERY_DIRECTORY);
  const errors: string[] = [];
  for (const filePath of files) {
    try {
      const inspection = await inspectImage(filePath, { publicAsset: true });
      if (inspection.metadataReasons.length) {
        errors.push(`${formatPath(filePath)} contains ${inspection.metadataReasons.join(", ")}`);
      }
    } catch (error) {
      errors.push(
        `${formatPath(filePath)} cannot be decoded: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
  if (errors.length) {
    console.error(`Gallery audit failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Gallery audit passed: ${files.length} generated image(s) contain no metadata`);
}

void main();

