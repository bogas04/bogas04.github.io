import fs from "fs";

import { toMarkdown, parseHead, getHeroImage, IBlogPostMeta } from "./";

import path from "path";

export interface IBlogPost extends IBlogPostMeta {
  html: string;
  image: string;
  isDraft?: boolean;
  fileName: string;
}

export function getBlogPosts(): IBlogPost[] {
  const pathJoin = path.join;

  const blogDataFolder = pathJoin(process.cwd(), "src", "blog");

  return (
    fs
      // read all files
      .readdirSync(blogDataFolder)
      // filter out mds
      .filter((fileName) => /\.md$/.test(fileName))
      // filter out drafts
      .filter(
        (fileName) =>
          !(process.env.NODE_ENV === "production" && isDraft(fileName))
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
        const html = toMarkdown(body);

        // construct posts data
        return {
          ...meta,
          isDraft: isDraft(fileName),
          image: getHeroImage(html),
          html,
          fileName,
        };
      })
      // sort by date
      // @ts-ignore
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
}

const isDraft = (fileName: string) => /^draft /.test(fileName);
