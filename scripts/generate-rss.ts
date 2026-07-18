import fs from "fs";
import path from "path";
import { Feed } from "feed";

// Import project utilities
import { getBlogPosts, IBlogPost } from "../src/utils/blog";
import { WEBSITE_URL, BLOG_URL } from "../src/constants";

async function generate() {
  const feed = new Feed({
    title: "Divjot Singh — Blog",
    id: WEBSITE_URL,
    link: WEBSITE_URL,
    language: "en",
    description: "My thoughts on work, life and world.",
    updated: new Date(),
    feedLinks: {
      rss: `${WEBSITE_URL}/blog.xml`,
    },
    author: {
      name: "Divjot Singh",
    },
  });

  const posts: IBlogPost[] = getBlogPosts()
    .filter((p) => !p.isDraft)
    .slice(0, 20);

  posts.forEach((p) => {
    const slugPart = p.slug && p.slug.startsWith("/") ? p.slug : `/${p.slug}`;
    const url = `${BLOG_URL}${slugPart}`;

    feed.addItem({
      title: p.title || "",
      id: url,
      link: url,
      description: p.description || "",
      content: p.html || "",
      date: p.date ? new Date(p.date) : new Date(),
      image: p.image ? `${WEBSITE_URL}${p.image}` : undefined,
      category: (p.keywords || []).map((k) => ({ name: String(k) })),
    });
  });

  const outPath = path.join(process.cwd(), "docs", "blog.xml");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, feed.rss2(), "utf-8");
  console.log("Wrote RSS feed to", outPath);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
