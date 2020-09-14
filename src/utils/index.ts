import slugify from "slugify";
import remark from "remark";

// @ts-ignore
import html from "remark-html";
// @ts-ignore
import prism from "remark-prism";
// @ts-ignore
import headings from "remark-autolink-headings";
// @ts-ignore
import slug from "remark-slug";

export const sanitize = (str: string) =>
  str.replace(/  /gi, " ").replace(/['"]/gi, "").trim();

export const sanitizeDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-us").replace(/\//gi, "-");
};

export const slugifiyTitleDate = (title: string, date: string) =>
  `${slugify(title)}-${sanitizeDate(date)}`.toLowerCase();

export interface IBlogPostMeta {
  keywords?: string | string[];
  date?: string;
  title?: string;
  slug?: string;
  description?: string;
}

export function parseHead(rawHead: string) {
  const lines = rawHead
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const meta: IBlogPostMeta = {};

  let previousTag: keyof IBlogPostMeta;

  for (const line of lines) {
    if (line.includes(":")) {
      const [tag, ...content] = line.split(":");
      previousTag = tag as keyof IBlogPostMeta;
      meta[previousTag] = sanitize(content.join(":"));
      continue;
    }
    meta[previousTag] += sanitize(line);
  }

  meta.keywords = ((meta.keywords as unknown) as string)
    .trim()
    .slice(1, -1)
    .split(",")
    .map((e) => e.trim());

  meta.slug = slugifiyTitleDate(meta.title, meta.date);

  return meta;
}

export function toMarkdown(content: string) {
  return remark()
    .use(prism)
    .use(slug)
    .use(headings, {
      behavior: "prepend",
      content: {
        type: "element",
        tagName: "span",
        children: [{ type: "text", value: "🔗 " }],
      },
    })
    .use(html)
    .processSync(content)
    .toString();
}
export function getHeroImage(html: string) {
  try {
    return html.match(/<img\b[^>]+?src\s*=\s*['"]?([^\s'"?#>]+)/)[1];
  } catch (err) {
    return null;
  }
}
