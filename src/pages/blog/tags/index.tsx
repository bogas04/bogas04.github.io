import Link from "next/link";
import type { CSSProperties } from "react";
import BlogLayout from "../../../layout/blog";
import { getBlogPostSummaries } from "../../../utils/blog";
import { getBlogTagColors, getBlogTagSlug } from "../../../utils/blogTag";

export async function getStaticProps() {
  const tagCounts = getBlogPostSummaries().reduce<Record<string, number>>(
    (counts, post) => {
      ((post.keywords || []) as string[]).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
      return counts;
    },
    {}
  );
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { props: { tags } };
}

interface TagsIndexProps {
  tags: Array<{ name: string; count: number }>;
}

function TagsIndex({ tags }: TagsIndexProps) {
  return (
    <BlogLayout
      title="tags"
      breadcrumbs={[
        { href: "/", label: "divjot" },
        { href: "/blog", label: "blog" },
        { label: "tags" },
      ]}
    >
      <ul className="m-0 flex flex-wrap gap-3 p-0">
          {tags.map((tag) => (
            <li key={tag.name}>
              <Link
                href={`/blog/tags/${getBlogTagSlug(tag.name)}`}
                className="blog-tag transition-opacity hover:opacity-80"
                style={{
                  "--tag-background-color": getBlogTagColors(tag.name).backgroundColor,
                  "--tag-text-color": getBlogTagColors(tag.name).textColor,
                  "--tag-background-color-dark": getBlogTagColors(tag.name).darkBackgroundColor,
                  "--tag-text-color-dark": getBlogTagColors(tag.name).darkTextColor,
                } as CSSProperties}
              >
                <span className="tag-name">{tag.name}</span>
                <span className="tag-count" aria-label={`${tag.count} posts`}>
                  {tag.count}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </BlogLayout>
  );
}

export default TagsIndex;
