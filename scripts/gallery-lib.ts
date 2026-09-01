import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import type { Metadata } from "sharp";

export const ROOT_DIRECTORY = process.cwd();
export const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, "public");
export const GALLERY_DIRECTORY = path.join(ROOT_DIRECTORY, "gallery");
export const ALBUMS_CONFIG_PATH = path.join(GALLERY_DIRECTORY, "albums.json");
export const IMAGES_DIRECTORY = path.join(PUBLIC_DIRECTORY, "img");
export const GENERATED_DIRECTORY = path.join(GALLERY_DIRECTORY, "generated");
export const PUBLIC_GALLERY_DIRECTORY = path.join(
  ROOT_DIRECTORY,
  "public",
  "gallery",
);

export const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
export const MAX_SOURCE_PIXELS = 100_000_000;
export const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"]);
export const GALLERY_CATEGORIES = ["travel", "blog", "random"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type FrontMatterValue = boolean | number | string | null;
export type FrontMatter = Record<string, FrontMatterValue>;

export interface ParsedMarkdown {
  data: FrontMatter;
  body: string;
}

export interface GalleryImageRecord {
  albumId: string;
  id: string;
  sourcePath: string;
  sidecarPath: string;
  data: FrontMatter;
  caption: string;
}

export interface GalleryAlbumRecord {
  id: string;
  directory: string;
  metadataPath: string;
  data: FrontMatter;
  images: GalleryImageRecord[];
}

export interface GalleryAlbumConfig {
  id: string;
  path: string;
}

export interface ImageInspection {
  width: number;
  height: number;
  format: string;
  bytes: number;
  metadata: Metadata;
  metadataReasons: string[];
}

export function isImageFile(filePath: string): boolean {
  return SOURCE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

export function listDirectories(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(directory, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function listImageFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => path.join(directory, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function listImageFilesRecursive(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listImageFilesRecursive(entryPath);
    return entry.isFile() && isImageFile(entry.name) ? [entryPath] : [];
  });
}

function parseScalar(value: string): FrontMatterValue {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "~") return null;
  // Keep zero-padded identifiers such as `001` as strings.
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);

  if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
    try {
      return JSON.parse(trimmed) as string;
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

export function parseMarkdown(filePath: string): ParsedMarkdown {
  const source = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  if (!/^---\s*\r?\n/.test(source)) {
    return { data: {}, body: source.trim() };
  }

  const endMatch = source.slice(4).match(/^---\s*\r?\n/m);
  if (!endMatch || endMatch.index === undefined) {
    return { data: {}, body: source.trim() };
  }

  const frontMatterText = source.slice(4, 4 + endMatch.index);
  const body = source.slice(4 + endMatch.index + endMatch[0].length).trim();
  const data: FrontMatter = {};
  for (const line of frontMatterText.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator <= 0) continue;
    const key = line.slice(0, separator).trim();
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(key)) continue;
    data[key] = parseScalar(line.slice(separator + 1));
  }
  return { data, body };
}

export function stringValue(value: FrontMatterValue | undefined): string {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

export function booleanValue(
  value: FrontMatterValue | undefined,
  fallback = false,
): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return fallback;
}

export function slugIsSafe(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function imageIdIsSafe(value: string): boolean {
  return Boolean(value) && value !== "." && value !== ".." && !/[\\/]/.test(value);
}

export function isGalleryCategory(value: string): value is GalleryCategory {
  return (GALLERY_CATEGORIES as readonly string[]).includes(value);
}

export function createTemporaryDirectory(prefix = "gallery-"): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function containsAscii(buffer: Buffer, value: string): boolean {
  return buffer.includes(Buffer.from(value, "ascii"));
}

function inspectJpegMarkers(buffer: Buffer): string[] {
  const reasons: string[] = [];
  if (buffer.length < 2 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return reasons;
  }

  let offset = 2;
  while (offset + 1 < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset++];
    if (marker === undefined || marker === 0xda || marker === 0xd9) break;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > buffer.length) break;
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
    const payload = buffer.subarray(offset + 2, offset + segmentLength);
    if (marker === 0xe1) {
      if (payload.subarray(0, 6).toString("ascii") === "Exif\0\0") {
        reasons.push("EXIF");
      } else if (
        containsAscii(payload, "http://ns.adobe.com/xap/1.0/") ||
        containsAscii(payload, "http://ns.adobe.com/xmp/1.0/") ||
        containsAscii(payload, "<x:xmpmeta") ||
        containsAscii(payload, "<?xpacket")
      ) {
        reasons.push("XMP");
      }
    } else if (marker === 0xed) {
      reasons.push("IPTC/APP13");
    } else if (marker === 0xfe) {
      reasons.push("JPEG comment");
    }
    offset += segmentLength;
  }
  return reasons;
}

function inspectPngChunks(buffer: Buffer): string[] {
  const reasons: string[] = [];
  if (buffer.length < 24 || buffer.readUInt32BE(0) !== 0x89504e47) return reasons;
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    if (offset + 12 + length > buffer.length) break;
    if (type === "tEXt" || type === "zTXt" || type === "iTXt") {
      reasons.push(`PNG ${type} text metadata`);
    } else if (type === "eXIf") {
      reasons.push("PNG EXIF");
    }
    offset += 12 + length;
    if (type === "IEND") break;
  }
  return reasons;
}

function inspectWebpChunks(buffer: Buffer): string[] {
  const reasons: string[] = [];
  if (
    buffer.length < 12 ||
    buffer.subarray(0, 4).toString("ascii") !== "RIFF" ||
    buffer.subarray(8, 12).toString("ascii") !== "WEBP"
  ) {
    return reasons;
  }
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString("ascii");
    const length = buffer.readUInt32LE(offset + 4);
    if (type === "EXIF") reasons.push("WebP EXIF");
    if (type === "XMP ") reasons.push("WebP XMP");
    if (type === "ICCP") reasons.push("WebP ICC profile");
    if (type === "META") reasons.push("WebP metadata");
    offset += 8 + length + (length % 2);
  }
  return reasons;
}

function inspectGenericMetadata(buffer: Buffer): string[] {
  const reasons: string[] = [];
  if (containsAscii(buffer, "Exif\0\0")) reasons.push("EXIF");
  if (
    containsAscii(buffer, "http://ns.adobe.com/xap/1.0/") ||
    containsAscii(buffer, "http://ns.adobe.com/xmp/1.0/") ||
    containsAscii(buffer, "<x:xmpmeta") ||
    containsAscii(buffer, "<?xpacket")
  ) {
    reasons.push("XMP");
  }
  return reasons;
}

export function metadataReasons(
  filePath: string,
  metadata: Metadata,
  options: { publicAsset?: boolean } = {},
): string[] {
  const buffer = fs.readFileSync(filePath);
  const format = (metadata.format || path.extname(filePath).slice(1)).toLowerCase();
  const reasons = new Set<string>();

  if (metadata.exif) reasons.add("EXIF");
  if (metadata.iptc) reasons.add("IPTC");
  if (metadata.xmp) reasons.add("XMP");
  if ((metadata as Metadata & { tifftag?: Buffer }).tifftag) reasons.add("TIFF metadata");
  if (metadata.orientation) reasons.add("EXIF orientation");

  for (const reason of inspectGenericMetadata(buffer)) reasons.add(reason);
  if (format === "jpeg" || format === "jpg") {
    for (const reason of inspectJpegMarkers(buffer)) reasons.add(reason);
  } else if (format === "png") {
    for (const reason of inspectPngChunks(buffer)) reasons.add(reason);
  } else if (format === "webp") {
    for (const reason of inspectWebpChunks(buffer)) reasons.add(reason);
  } else if (format === "avif" || format === "heif" || format === "heic") {
    if (containsAscii(buffer, "xml ") || containsAscii(buffer, "XMP")) reasons.add("XMP/XML metadata");
    if (containsAscii(buffer, "uuid") && containsAscii(buffer, "Exif")) reasons.add("EXIF");
  }

  if (options.publicAsset && metadata.icc) reasons.add("ICC profile");
  return [...reasons];
}

export async function inspectImage(
  filePath: string,
  options: { publicAsset?: boolean } = {},
): Promise<ImageInspection> {
  const stat = fs.statSync(filePath);
  if (stat.size > MAX_SOURCE_BYTES) {
    throw new Error(
      `${path.relative(ROOT_DIRECTORY, filePath)} is ${stat.size} bytes; source limit is ${MAX_SOURCE_BYTES} bytes`,
    );
  }
  const metadata = await sharp(filePath, { failOn: "error" }).metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;
  if (!width || !height) throw new Error("image has no readable dimensions");
  if (width * height > MAX_SOURCE_PIXELS) {
    throw new Error(
      `${path.relative(ROOT_DIRECTORY, filePath)} has ${width * height} pixels; source limit is ${MAX_SOURCE_PIXELS}`,
    );
  }
  return {
    width,
    height,
    format: metadata.format || path.extname(filePath).slice(1),
    bytes: stat.size,
    metadata,
    metadataReasons: metadataReasons(filePath, metadata, options),
  };
}

export function readAlbumConfigs(): GalleryAlbumConfig[] {
  if (!fs.existsSync(ALBUMS_CONFIG_PATH)) return [];
  const parsed = JSON.parse(fs.readFileSync(ALBUMS_CONFIG_PATH, "utf8")) as {
    albums?: unknown;
  };
  if (!Array.isArray(parsed.albums)) {
    throw new Error("gallery/albums.json must contain an albums array");
  }
  return parsed.albums.map((album, index) => {
    if (
      !album ||
      typeof album !== "object" ||
      typeof (album as GalleryAlbumConfig).id !== "string" ||
      typeof (album as GalleryAlbumConfig).path !== "string"
    ) {
      throw new Error(`gallery/albums.json album ${index + 1} must contain string id and path values`);
    }
    return album as GalleryAlbumConfig;
  });
}

export function findAlbum(albumId: string): GalleryAlbumRecord | null {
  const config = readAlbumConfigs().find((album) => album.id === albumId);
  if (!config) return null;
  const directory = path.resolve(ROOT_DIRECTORY, config.path);
  if (!directory.startsWith(`${IMAGES_DIRECTORY}${path.sep}`)) return null;
  const metadataPath = path.join(directory, "index.md");
  if (!fs.existsSync(directory) || !fs.existsSync(metadataPath)) return null;
  const images = listImageFiles(directory).map((sourcePath) => {
    const id = path.basename(sourcePath, path.extname(sourcePath));
    const sidecarPath = path.join(directory, `${id}.md`);
    const parsed = fs.existsSync(sidecarPath)
      ? parseMarkdown(sidecarPath)
      : { data: {}, body: "" };
    return {
      albumId,
      id,
      sourcePath,
      sidecarPath,
      data: parsed.data,
      caption: parsed.body,
    };
  });
  return {
    id: albumId,
    directory,
    metadataPath,
    data: parseMarkdown(metadataPath).data,
    images,
  };
}

export function readAlbums(): GalleryAlbumRecord[] {
  const albums = readAlbumConfigs()
    .map((config) => findAlbum(config.id))
    .filter((album): album is GalleryAlbumRecord => Boolean(album));
  return albums.sort((a, b) => {
    if (a.id === "blog" && b.id !== "blog") return 1;
    if (b.id === "blog" && a.id !== "blog") return -1;
    return 0;
  });
}

export function allImageSidecars(album: GalleryAlbumRecord): string[] {
  if (!fs.existsSync(album.directory)) return [];
  return fs
    .readdirSync(album.directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md")
    .map((entry) => path.join(album.directory, entry.name));
}

export function formatPath(filePath: string): string {
  return path.relative(ROOT_DIRECTORY, filePath) || filePath;
}

export function publicImageUrl(albumId: string, id: string, filename: string): string {
  return `/gallery/${encodeURIComponent(albumId)}/${encodeURIComponent(id)}/${filename}`;
}
