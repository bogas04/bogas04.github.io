import fs from "fs";
import path from "path";
// parse5 v6 does not ship TypeScript declarations.
// @ts-ignore
import * as parse5 from "parse5";

const WEBSITE_URL = "https://bogas04.github.io";
const BLOG_URL = `${WEBSITE_URL}/blog`;
// Keep this equal to the URL submitted to the W3C Feed Validator. GitHub Pages
// redirects it to HTTPS, but the validator compares against the requested URL.
const RSS_SELF_URL = "http://bogas04.github.io/blog.xml";
const DOCS_BLOG = path.join(process.cwd(), "docs", "blog");

interface RssItem {
  title: string;
  date: Date;
  description: string;
  content: string;
  link: string;
}

function readHtmlFiles(directory: string): string[] {
  try {
    return fs.readdirSync(directory).filter((file) => file.endsWith(".html"));
  } catch (error) {
    console.error("Could not read docs/blog directory:", error.message);
    return [];
  }
}

function extractTitle(html: string): string | null {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/\s+/g, " ").trim() : null;
}

function extractContentHtml(html: string): string | null {
  const match = html.match(/<div[^>]*class=["']content["'][^>]*>([\s\S]*?)<\/div>/i);
  return match ? match[1].trim() : null;
}

function extractDescription(html: string): string {
  let match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (match) return match[1].trim();

  const content = extractContentHtml(html);
  if (content) {
    match = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (match) return match[1].replace(/<[^>]+>/g, "").trim();
  }
  return "";
}

function extractDate(html: string, fileStats: fs.Stats): Date {
  const datePatterns = [
    /\b[A-Z][a-z]{2}\s+[A-Z][a-z]{2,8}\s+\d{1,2}\s+\d{4}\b/,
    /\b[A-Z][a-z]{2,8}\s+\d{1,2},?\s+\d{4}\b/,
    /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\b/,
    /\b\d{4}-\d{1,2}-\d{1,2}\b/,
  ];

  for (const pattern of datePatterns) {
    const match = html.match(pattern);
    if (!match) continue;
    const date = new Date(match[0].replace(/,/g, ""));
    if (!Number.isNaN(date.getTime())) return date;
  }

  return fileStats.mtime;
}

function toCData(value: string): string {
  return "<![CDATA[" + value.replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>";
}

function toAbsoluteUrl(value: string, baseUrl: string): string {
  const trimmed = value.trim();
  if (!trimmed || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(trimmed)) return value;

  try {
    return new URL(trimmed, baseUrl).href;
  } catch (_) {
    return value;
  }
}

function absolutizeSrcset(value: string, baseUrl: string): string {
  return value
    .split(",")
    .map((candidate) => {
      const parts = candidate.trim().split(/\s+/);
      if (!parts[0]) return candidate;
      parts[0] = toAbsoluteUrl(parts[0], baseUrl);
      return parts.join(" ");
    })
    .join(", ");
}

function prepareContentHtml(html: string, itemUrl: string): string {
  const fragment = parse5.parseFragment(html);
  const urlAttributes = new Set(["src", "href", "poster", "action", "cite", "data"]);

  const visit = (node: any): void => {
    for (const attribute of node.attrs || []) {
      if (urlAttributes.has(attribute.name)) {
        attribute.value = toAbsoluteUrl(attribute.value, itemUrl);
      } else if (attribute.name === "srcset") {
        attribute.value = absolutizeSrcset(attribute.value, itemUrl);
      }
    }
    (node.childNodes || []).forEach(visit);
  };

  visit(fragment);
  return parse5.serialize(fragment);
}

function buildRss(items: RssItem[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n<channel>\n` +
    `<title>Divjot Singh — Blog</title>\n` +
    `<link>${WEBSITE_URL}</link>\n` +
    `<description>My thoughts on work, life and world.</description>\n` +
    `<language>en-us</language>\n` +
    `<atom:link href="${RSS_SELF_URL}" rel="self" type="application/rss+xml" />\n` +
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  const body = items.map((item) =>
    `<item>\n<title>${toCData(item.title)}</title>\n<link>${item.link}</link>\n<guid>${item.link}</guid>\n<pubDate>${item.date.toUTCString()}</pubDate>\n<description>${toCData(item.description)}</description>\n<content:encoded>${toCData(prepareContentHtml(item.content, item.link))}</content:encoded>\n</item>\n`
  ).join("\n");

  return `${header}${body}</channel>\n</rss>\n`;
}

function main(): void {
  const posts: RssItem[] = readHtmlFiles(DOCS_BLOG).map((fileName) => {
    const fullPath = path.join(DOCS_BLOG, fileName);
    const html = fs.readFileSync(fullPath, "utf8");
    const basename = fileName.replace(/\.html$/, "");

    return {
      title: extractTitle(html) || basename,
      date: extractDate(html, fs.statSync(fullPath)),
      description: extractDescription(html),
      content: extractContentHtml(html) || "",
      link: `${BLOG_URL}/${basename}`,
    };
  });

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  const outputPath = path.join(process.cwd(), "docs", "blog.xml");
  fs.writeFileSync(outputPath, buildRss(posts.slice(0, 20)), "utf8");
  console.log("Wrote RSS to", outputPath);
}

main();
