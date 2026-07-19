import fs from "fs";
import path from "path";

const WEBSITE_URL = "https://bogas04.github.io";
const DOCS_DIRECTORY = path.join(process.cwd(), "docs");

function findHtmlFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

function toPageUrl(filePath: string): string | null {
  const relativePath = path.relative(DOCS_DIRECTORY, filePath);
  if (relativePath === "404.html" || relativePath.startsWith("_next")) return null;

  const pathname = relativePath
    .replace(/\\/g, "/")
    .replace(/(^|\/)index\.html$/, "$1")
    .replace(/\.html$/, "");

  return `${WEBSITE_URL}/${pathname}`.replace(/\/$/, "") || WEBSITE_URL;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function main(): void {
  const urls = findHtmlFiles(DOCS_DIRECTORY)
    .map(toPageUrl)
    .filter((url): url is string => Boolean(url))
    .sort();
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  const outputPath = path.join(DOCS_DIRECTORY, "sitemap.xml");
  fs.writeFileSync(outputPath, sitemap, "utf8");
  console.log(`Wrote ${urls.length} URLs to ${outputPath}`);
}

main();
