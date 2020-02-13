import slugify from "slugify";
import snarkdown from "snarkdown";

export const sanitize = str =>
  str
    .replace(/  /gi, " ")
    .replace(/['"]/gi, "")
    .trim();

export const sanitizeDate = date => {
  return new Date(date).toLocaleDateString("en-us").replace(/\//gi, "-");
};

export const slugifiyTitleDate = (title, date) =>
  `${slugify(title)}-${sanitizeDate(date)}`.toLowerCase();

export function parseHead(rawHead) {
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
  meta.keywords = meta.keywords
    .trim()
    .slice(1, -1)
    .split(",")
    .map(e => e.trim());
  meta.slug = slugifiyTitleDate(meta.title, meta.date);

  return meta;
}

export function toMarkdown(content) {
  return snarkdown(content);
}
export function getHeroImage(html) {
  try {
    return html.match(/<img\b[^>]+?src\s*=\s*['"]?([^\s'"?#>]+)/)[1];
  } catch (err) {
    return;
  }
}
