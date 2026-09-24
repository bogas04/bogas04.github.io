import sharp from "sharp";

export const MAX_IMAGE_DIMENSION = 1440;
export const JPEG_QUALITY = 95;
export const OPTIMIZATION_VERSION = "2";

export async function optimizeImage(input: Buffer | string): Promise<{
  data: Buffer;
  width: number;
  height: number;
}> {
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
