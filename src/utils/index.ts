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

export const slugifyTitle = (title: string) => slugify(title).toLowerCase();

export interface IBlogPostMeta {
  keywords?: string | string[];
  date?: string;
  title?: string;
  slug?: string;
  legacySlug?: string;
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
    .map((e) => e.trim())
    .filter(Boolean);

  meta.slug = slugifyTitle(meta.title);
  meta.legacySlug = slugifiyTitleDate(meta.title, meta.date);

  return meta;
}

export function toMarkdown(content: string) {
  const rendered = remark()
    .use(prism)
    .use(slug)
    .use(headings, {
      behavior: "prepend",
      content: {
        type: "element",
        tagName: "span",
        children: [{ type: "text", value: "🔗" }],
      },
    })
    // Keep generated heading IDs aligned with their fragment links. `remark-html`
    // otherwise applies its safe default `user-content-` prefix to every ID.
    .use(html, { sanitize: { clobberPrefix: "" } })
    .processSync(content)
    .toString();

  return rendered.replace(
    /(<h([1-6])\b[^>]*\bid="([^"]+)"[^>]*>)<a href="#\3" aria-hidden="true" tabindex="-1"><span>🔗<\/span><\/a>((?:(?!<a\b)[\s\S])*?)<\/h\2>/g,
    (_match, openingTag, level, id, headingContent) =>
      `${openingTag}<a class="heading-permalink" href="#${id}" tabindex="0"><span class="heading-permalink-icon" aria-hidden="true">🔗</span><span class="heading-permalink-text">${headingContent}</span></a></h${level}>`
  );
}

export function linkBlogImages(html: string) {
  return html.replace(
    /<img\b([^>]*?)\bsrc=("[^"]*"|'[^']*')([^>]*)>/gi,
    (image, beforeSrc, quotedSource, afterSrc) => {
      const source = quotedSource.slice(1, -1);
      return `<a class="blog-image-link" href="${source}" target="_blank" rel="noopener noreferrer">${image}</a>`;
    }
  );
}

export function getHeroImage(html: string) {
  try {
    return html.match(/<img\b[^>]+?src\s*=\s*['"]?([^\s'"?#>]+)/)[1];
  } catch (err) {
    return null;
  }
}
