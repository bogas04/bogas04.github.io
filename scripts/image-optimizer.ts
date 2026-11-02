import fs from "node:fs/promises";
import path from "node:path";

import decodeHeic from "heic-decode";
import sharp from "sharp";

export const MAX_IMAGE_DIMENSION = 1440;
export const JPEG_QUALITY = 95;
export const OPTIMIZATION_VERSION = "3";

function isHeicBuffer(input: Buffer): boolean {
  if (input.length < 12 || input.toString("ascii", 4, 8) !== "ftyp") {
    return false;
  }

  const brands = input.toString("ascii", 8, Math.min(input.length, 64));
  return /heic|heix|hevc|hevx/i.test(brands);
}

async function inputBuffer(input: Buffer | string): Promise<Buffer> {
  return Buffer.isBuffer(input) ? input : fs.readFile(input);
}

export async function optimizeImage(input: Buffer | string): Promise<{
  data: Buffer;
  width: number;
  height: number;
}> {
  const isHeic =
    typeof input === "string"
      ? [".heic", ".heif"].includes(path.extname(input).toLowerCase())
      : isHeicBuffer(input);

  if (isHeic) {
    // Decode the HEIF primary image explicitly; generic container decoders can
    // select an auxiliary depth image from recent iPhone photos.
    const decoded = await decodeHeic({ buffer: await inputBuffer(input) });
    const output = await sharp(Buffer.from(decoded.data), {
      raw: { width: decoded.width, height: decoded.height, channels: 4 },
      failOn: "error",
    })
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    return {
      data: output.data,
      width: output.info.width,
      height: output.info.height,
    };
  }

  const output = await sharp(input, { failOn: "error" })
    .rotate()
    .resize({
      width: MAX_IMAGE_DIMENSION,
      height: MAX_IMAGE_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  return {
    data: output.data,
    width: output.info.width,
    height: output.info.height,
  };
}
