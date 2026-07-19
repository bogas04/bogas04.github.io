import fs from "fs";

import {
  toMarkdown,
  parseHead,
  linkBlogImages,
} from "./index.ts";
import type { IBlogPostMeta } from "./index.ts";

import path from "path";

export interface IBlogPost extends IBlogPostMeta {
  html: string;
  image: string | null;
  isDraft?: boolean;
  fileName: string;
  readingTimeMinutes: number;
}

export interface IBlogPostSummary extends IBlogPostMeta {
  image: string | null;
  isDraft?: boolean;
  fileName: string;
  readingTimeMinutes: number;
}

interface BlogSource extends IBlogPostSummary {
  body: string;
}

let blogSources: BlogSource[] | undefined;
const renderedPosts = new Map<string, IBlogPost>();

function getBlogSources(): BlogSource[] {
  if (blogSources) return blogSources;

  const blogDataFolder = path.join(process.cwd(), "src", "blog");

  blogSources = fs
    .readdirSync(blogDataFolder)
    .filter((fileName) => /\.md$/.test(fileName))
    .map((fileName) => [
      fs.readFileSync(path.join(blogDataFolder, fileName), "utf-8"),
      fileName,
    ])
    .map(([content, fileName]) => {
      const [, head, body] = content.split("---");
      const meta = parseHead(head);

      return {
        ...meta,
        isDraft: isDraft(fileName),
        image: getHeroImageFromMarkdown(body),
        fileName,
        readingTimeMinutes: getReadingTimeMinutes(body),
        body,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return blogSources;
}

function shouldIncludePost(post: IBlogPostSummary, includeDrafts: boolean) {
  return !(
    process.env.NODE_ENV === "production" &&
    post.isDraft &&
    !includeDrafts
  );
}

export function getBlogPostSummaries(includeDrafts = false): IBlogPostSummary[] {
  return getBlogSources()
    .filter((post) => shouldIncludePost(post, includeDrafts))
    .map(({ body: _body, ...post }) => post);
}

export function getBlogPost(fileName: string): IBlogPost | undefined {
  const source = getBlogSources().find((post) => post.fileName === fileName);
  if (!source) return undefined;

  const cachedPost = renderedPosts.get(fileName);
  if (cachedPost) return cachedPost;

  const { body, ...summary } = source;
  const html = linkBlogImages(toMarkdown(body));
  const post = { ...summary, html };
  renderedPosts.set(fileName, post);
  return post;
}

export function getBlogPosts(includeDrafts = false): IBlogPost[] {
  return getBlogPostSummaries(includeDrafts)
    .map((post) => getBlogPost(post.fileName))
    .filter((post): post is IBlogPost => Boolean(post));
}

const isDraft = (fileName: string) => /^draft /.test(fileName);

function getReadingTimeMinutes(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "");
  const wordCount = prose.match(/\b[\w'-]+\b/g)?.length || 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function getHeroImageFromMarkdown(markdown: string): string | null {
  const markdownImage = markdown.match(/!\[[^\]]*\]\(<?([^\s)>]+)[^)]*\)/);
  if (markdownImage?.[1]) return markdownImage[1];

  const htmlImage = markdown.match(/<img\b[^>]*\bsrc=["']?([^\s"'>]+)/i);
  return htmlImage?.[1] || null;
}
