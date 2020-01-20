import * as fs from "fs";
import path from "path";
import { toMarkdown, parseHead, getHeroImage } from "./_utils";

const pathJoin = path.join;

const blogDataFolder = pathJoin(
  process.cwd(),
  "src",
  "routes",
  "blog",
  "_data"
);

const posts = fs
  // read all files
  .readdirSync(blogDataFolder)
  // filter out mds
  .filter(fileName => /\.md$/.test(fileName))
  // filter out drafts
  .filter(fileName => !/^draft /.test(fileName))
  // get contents
  .map(fileName => fs.readFileSync(pathJoin(blogDataFolder, fileName), "utf-8"))
  .map(content => {
    // parse front matter
    const [, head, body] = content.split("---");
    const meta = parseHead(head);
    const html = toMarkdown(body);

    // construct posts data
    return {
      ...meta,
      image: getHeroImage(html),
      html
    };
  })
  // sort by date
  .sort((a, b) => a.date < b.date);

export default posts;
