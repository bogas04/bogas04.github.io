import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  IMAGES_DIRECTORY,
  formatPath,
  inspectImage,
  isImageFile,
} from "./gallery-lib.ts";

function stagedImagePaths(): string[] {
  const output = execFileSync(
    "git",
    ["diff", "--cached", "--name-only", "-z", "--diff-filter=AM", "--", "public/img"],
    { encoding: "buffer" },
  );

  return output
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .map((filePath) => path.resolve(process.cwd(), filePath))
    .filter((filePath) => filePath.startsWith(`${IMAGES_DIRECTORY}${path.sep}`))
    .filter(isImageFile);
}

async function main(): Promise<void> {
  const imagePaths = stagedImagePaths();
  const errors: string[] = [];

  for (const imagePath of imagePaths) {
    if (!fs.existsSync(imagePath)) continue;
    try {
      await inspectImage(imagePath);
    } catch (error) {
      errors.push(
        `${formatPath(imagePath)} cannot be committed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  if (errors.length) {
    console.error("Staged image check failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Staged image check passed: ${imagePaths.length} image(s) inspected`);
}

void main();
