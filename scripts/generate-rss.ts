import fs from "fs";
import path from "path";
// parse5 v6 does not ship TypeScript declarations.
// @ts-ignore
import * as parse5 from "parse5";
import { getBlogPosts, getBlogPostSummaries } from "../src/utils/blog.ts";
import { getBlogPostPath } from "../src/utils/blogDate.ts";

const WEBSITE_URL = "https://bogas04.github.io";
const BLOG_URL = `${WEBSITE_URL}/blog`;
// Keep this equal to the URL submitted to the W3C Feed Validator. GitHub Pages
// redirects it to HTTPS, but the validator compares against the requested URL.
const RSS_SELF_URL = "http://bogas04.github.io/blog.xml";
const ATOM_SELF_URL = `${WEBSITE_URL}/blog.atom`;

interface RssItem {
  title: string;
  date: Date;
  description: string;
  content: string;
  link: string;
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

function buildAtom(items: RssItem[]): string {
  const updatedAt = (items[0]?.date || new Date(0)).toISOString();
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
    `<title>Divjot Singh — Blog</title>\n` +
    `<id>${BLOG_URL}</id>\n` +
    `<link href="${BLOG_URL}" />\n` +
    `<link href="${ATOM_SELF_URL}" rel="self" type="application/atom+xml" />\n` +
    `<updated>${updatedAt}</updated>\n` +
    `<subtitle>My thoughts on work, life and world.</subtitle>\n`;
  const body = items.map((item) => {
    const publishedAt = item.date.toISOString();

    return `<entry>\n<title>${toCData(item.title)}</title>\n<id>${item.link}</id>\n<link href="${item.link}" />\n<updated>${publishedAt}</updated>\n<published>${publishedAt}</published>\n<summary type="html">${toCData(item.description)}</summary>\n<content type="html">${toCData(prepareContentHtml(item.content, item.link))}</content>\n</entry>\n`;
  }).join("\n");

  return `${header}${body}</feed>\n`;
}

function main(): void {
  const drafts = getBlogPostSummaries(true).filter((post) => post.isDraft);
  const posts: RssItem[] = getBlogPosts(true)
    .filter((post) => !post.isDraft)
    .map((post) => ({
    title: post.title || post.slug || "Untitled post",
    date: new Date(post.date),
    description: post.description || "",
    content: post.html,
    link: `${WEBSITE_URL}${getBlogPostPath(post)}`,
    }));

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  const recentPosts = posts.slice(0, 20);
  const rssOutputPath = path.join(process.cwd(), "docs", "blog.xml");
  const atomOutputPath = path.join(process.cwd(), "docs", "blog.atom");
  const draftPreviewOutputPath = path.join(
    process.cwd(),
    "docs",
    "_be-more-vulnerable.json"
  );
  fs.writeFileSync(rssOutputPath, buildRss(recentPosts), "utf8");
  fs.writeFileSync(atomOutputPath, buildAtom(recentPosts), "utf8");
  fs.writeFileSync(draftPreviewOutputPath, JSON.stringify(drafts), "utf8");
  console.log("Wrote RSS to", rssOutputPath);
  console.log("Wrote Atom to", atomOutputPath);
  console.log("Wrote draft preview data to", draftPreviewOutputPath);
}

main();
