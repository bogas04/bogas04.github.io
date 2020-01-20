import * as fs from "fs";
import * as path from "path";
import snarkdown from "snarkdown";

const sanitize = str =>
  str
    .replace(/  /gi, " ")
    .replace(/['"]/gi, "")
    .trim();

const sanitizeDate = date => {
  return new Date(date).toLocaleDateString("en-ca").replace(/\//gi, "-");
};

const slugifiy = (title, date) =>
  `${title.replace(/,/gi, "-").replace(/ /gi, "-")}-${sanitizeDate(
    date
  )}`.toLowerCase();

const blogDataFolder = path.join(
  process.cwd(),
  "src",
  "routes",
  "blog",
  "_data"
);

function parseHead(rawHead) {
  const lines = rawHead
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const meta = {};

  let previousTag = "";

  for (const line of lines) {
    if (line.includes(":")) {
      const [tag, ...content] = line.split(":");
      previousTag = tag;
      meta[previousTag] = sanitize(content.join(":"));
      continue;
    }
    meta[previousTag] += sanitize(line);
  }

  meta.slug = slugifiy(meta.title, meta.date);

  return meta;
}

const posts = fs
  .readdirSync(blogDataFolder)
  .filter(fileName => /\.md$/.test(fileName))
  .map(fileName =>
    fs.readFileSync(path.join(blogDataFolder, fileName), "utf-8")
  )
  .map(content => content.split("---"))
  .map(([, head, body]) => {
    const meta = parseHead(head);

    return {
      ...meta,
      html: snarkdown(body)
    };
  });

export default posts;
