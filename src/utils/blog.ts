import fs from "fs";

import { toMarkdown, parseHead, getHeroImage, IBlogPostMeta } from "./";

import path from "path";

export interface IBlogPost extends IBlogPostMeta {
  html: string;
  image: string;
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
      .filter((fileName) => !/^draft /.test(fileName))
      // get contents
      .map((fileName) =>
        fs.readFileSync(pathJoin(blogDataFolder, fileName), "utf-8")
      )
      .map((content) => {
        // parse front matter
        const [, head, body] = content.split("---");
        const meta = parseHead(head);
        const html = toMarkdown(body);

        // construct posts data
        return {
          ...meta,
          image: getHeroImage(html),
          html,
        };
      })
      // sort by date
      // @ts-ignore
      .sort((a, b) => a.date < b.date)
  );
}
