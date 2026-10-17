import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const objectKey = process.env.TELEGRAM_NOW_OBJECT;
const caption = (process.env.TELEGRAM_NOW_CAPTION || "").trim();
const kind = process.env.TELEGRAM_NOW_KIND;
const updateId = process.env.TELEGRAM_NOW_UPDATE_ID;
const bucket = process.env.R2_BUCKET;
const endpoint = process.env.R2_ENDPOINT;

if (!objectKey || !/^telegram-now\/[0-9]+$/.test(objectKey) || !caption || !updateId || !bucket || !endpoint) {
  throw new Error("Missing or invalid Telegram now publication inputs.");
}
if (kind !== "image" && kind !== "video") throw new Error("Unsupported Telegram media type.");

const tempDirectory = path.join(process.cwd(), ".telegram-now-temp");
await fs.mkdir(tempDirectory, { recursive: true });
const sourcePath = path.join(tempDirectory, "source");
const imagePath = path.join(tempDirectory, "image.webp");
const videoPath = path.join(tempDirectory, "video.mp4");

function command(program: string, args: string[], env = process.env) {
  const result = spawnSync(program, args, { stdio: "inherit", env });
  if (result.status !== 0) throw new Error(`${program} failed with status ${result.status}`);
}

const awsEnv = { ...process.env, AWS_EC2_METADATA_DISABLED: "true", AWS_DEFAULT_REGION: "auto" };
command("aws", ["s3", "cp", `s3://${bucket}/${objectKey}`, sourcePath, "--endpoint-url", endpoint], awsEnv);

const now = new Date();
const date = now.toISOString().slice(0, 10);
const firstLine = caption.split(/\r?\n/, 1)[0].trim();
const title = (firstLine || `${kind === "image" ? "Photo" : "Video"} update`).replace(/\s+/g, " ").slice(0, 90);
const safeTitle = title.normalize("NFKD").replace(/[^\p{L}\p{N} -]/gu, "").trim().replace(/\s+/g, "-").toLowerCase() || "update";
const stem = `${date}-${safeTitle}-${updateId}`;
let assetName: string;

if (kind === "image") {
  const metadata = await sharp(sourcePath, { failOn: "error" }).metadata();
  if (!metadata.width || !metadata.height || metadata.width * metadata.height > 100_000_000) {
    throw new Error("Image dimensions exceed the site's 100-megapixel limit.");
  }
  await sharp(sourcePath, { failOn: "error" })
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85, effort: 5 })
    .toFile(imagePath);
  assetName = `${stem}.webp`;
  await fs.mkdir(path.join(process.cwd(), "public/img/now"), { recursive: true });
  await fs.copyFile(imagePath, path.join(process.cwd(), "public/img/now", assetName));
} else {
  command("ffmpeg", ["-nostdin", "-y", "-i", sourcePath, "-map_metadata", "-1", "-map_metadata:s", "-1", "-map_chapters", "-1", "-c", "copy", "-movflags", "+faststart", videoPath]);
  assetName = `${stem}.mp4`;
  await fs.mkdir(path.join(process.cwd(), "public/img/now"), { recursive: true });
  await fs.copyFile(videoPath, path.join(process.cwd(), "public/img/now", assetName));
}

const safeText = (value: string) => value.replace(/[\r\n]+/g, " ").replace(/['"]/g, "").trim();
const description = safeText(caption.replace(/https?:\/\/\S+/g, "").slice(0, 180)) || title;
const body = kind === "image"
  ? `![${title.replace(/[\[\]]/g, "\\$&")}](/img/now/${assetName})\n\n${caption}`
  : `[Watch video](/img/now/${assetName})\n\n${caption}`;
const markdown = `---\ntitle: ${safeText(title)}\ndescription: ${description}\ndate: "${now.toISOString()}"\ncategories: []\nkeywords: [now]\n---\n\n${body}\n`;
const blogDirectory = path.join(process.cwd(), "src/blog");
await fs.mkdir(blogDirectory, { recursive: true });
const markdownPath = path.join(blogDirectory, `now ${stem}.md`);
await fs.writeFile(markdownPath, markdown, { flag: "wx" });
await fs.rm(tempDirectory, { recursive: true, force: true });
command("aws", ["s3", "rm", `s3://${bucket}/${objectKey}`, "--endpoint-url", endpoint], awsEnv);
