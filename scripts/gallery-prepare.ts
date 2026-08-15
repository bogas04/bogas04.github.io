import fs from "node:fs";
import path from "node:path";

import {
  IMAGES_DIRECTORY,
  formatPath,
  isImageFile,
  listDirectories,
} from "./gallery-lib.ts";

function albumTemplateFor(albumId: string, coverId: string): string {
  return `---
title: ${albumId}
summary:
cover: ${coverId}
category: random
startDate:
endDate:
published: false
---

Add an album summary.
`;
}

function imageTemplateFor(): string {
  return `---
title:
alt:
takenAt:
location:
published: false
featured: false
---

Write a caption for this photo.
`;
}

function main(): void {
  let createdAlbums = 0;
  let createdCaptions = 0;
  for (const imageDirectory of listDirectories(IMAGES_DIRECTORY)) {
    const albumId = path.basename(imageDirectory);
    const imageFiles = fs
      .readdirSync(imageDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    const albumPath = path.join(imageDirectory, "index.md");
    if (!fs.existsSync(albumPath) && imageFiles.length) {
      const coverId = path.basename(imageFiles[0].name, path.extname(imageFiles[0].name));
      fs.writeFileSync(albumPath, albumTemplateFor(albumId, coverId), "utf8");
      createdAlbums += 1;
      console.log(`Created ${formatPath(albumPath)}`);
    }
    for (const entry of imageFiles) {
      const id = path.basename(entry.name, path.extname(entry.name));
      const sidecarPath = path.join(imageDirectory, `${id}.md`);
      if (fs.existsSync(sidecarPath)) continue;
      fs.writeFileSync(sidecarPath, imageTemplateFor(), "utf8");
      createdCaptions += 1;
      console.log(`Created ${formatPath(sidecarPath)}`);
    }
  }
  const created = createdAlbums + createdCaptions;
  console.log(
    created
      ? `Prepared ${createdAlbums} album template(s) and ${createdCaptions} caption template(s)`
      : "No gallery templates needed",
  );
}

main();
