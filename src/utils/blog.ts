import fs from "fs";

import {
  toMarkdown,
  parseHead,
  getHeroImage,
  IBlogPostMeta,
  linkBlogImages,
} from "./";

import path from "path";

export interface IBlogPost extends IBlogPostMeta {
  html: string;
  image: string;
  isDraft?: boolean;
  fileName: string;
  readingTimeMinutes: number;
}

export function getBlogPosts(includeDrafts = false): IBlogPost[] {
  const pathJoin = path.join;

  const blogDataFolder = pathJoin(process.cwd(), "src", "blog");

  return fs
    // read all files
    .readdirSync(blogDataFolder)
    // filter out mds
    .filter((fileName) => /\.md$/.test(fileName))
    // filter out drafts
    .filter(
      (fileName) =>
        !(
          process.env.NODE_ENV === "production" &&
          isDraft(fileName) &&
          !includeDrafts
        )
    )
    // get contents
    .map((fileName) => [
      fs.readFileSync(pathJoin(blogDataFolder, fileName), "utf-8"),
      fileName,
    ])
    .map(([content, fileName]) => {
      // parse front matter
      const [, head, body] = content.split("---");
      const meta = parseHead(head);
      const html = linkBlogImages(toMarkdown(body));

      // construct posts data
      return {
        ...meta,
        isDraft: isDraft(fileName),
        image: getHeroImage(html),
        html,
        fileName,
        readingTimeMinutes: getReadingTimeMinutes(body),
      };
    })
    // sort by date
    // @ts-ignore
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const isDraft = (fileName: string) => /^draft /.test(fileName);

function getReadingTimeMinutes(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "");
  const wordCount = prose.match(/\b[\w'-]+\b/g)?.length || 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}
