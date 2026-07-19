import Link from "next/link";
import BlogLayout from "../../../layout/blog";
import { getBlogPosts } from "../../../utils/blog";
import { getBlogTagColors, getBlogTagSlug } from "../../../utils/blogTag";

export async function getStaticProps() {
  const tagCounts = getBlogPosts().reduce<Record<string, number>>(
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
  const maxCount = Math.max(...tags.map((tag) => tag.count), 1);

  return (
    <BlogLayout
      title="Blog tags"
      breadcrumbs={[
        { href: "/", label: "Divjot Singh" },
        { href: "/blog", label: "Blog" },
        { label: "Tags" },
      ]}
    >
      <style>{`
        .tag-cloud {
          display: flex;
          flex-flow: row wrap;
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tag-cloud a {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--tag-text-color);
          padding: 0;
          color: var(--tag-text-color);
          background: var(--tag-background-color);
          text-decoration: none;
        }
        .tag-cloud .tag-name { padding: 0.2em 0.45em; }
        .tag-cloud .tag-count {
          align-self: stretch;
          display: inline-flex;
          align-items: center;
          border-left: 1px solid currentColor;
          padding: 0 0.45em;
        }

        @supports (grid-template-rows: masonry) {
          .tag-cloud {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
            grid-template-rows: masonry;
            align-tracks: start;
          }

          .tag-cloud li { break-inside: avoid; }
        }
      `}</style>
      <ul className="tag-cloud">
          {tags.map((tag) => (
            <li key={tag.name}>
              <Link
                href={`/blog/tags/${getBlogTagSlug(tag.name)}`}
                style={{
                  "--tag-background-color": getBlogTagColors(tag.name).backgroundColor,
                  "--tag-text-color": getBlogTagColors(tag.name).textColor,
                  fontSize: `${0.9 + (tag.count / maxCount) * 0.9}em`,
                } as React.CSSProperties}
              >
                <span className="tag-name">{tag.name}</span>
                <span className="tag-count">{tag.count}</span>
              </Link>
            </li>
          ))}
      </ul>
    </BlogLayout>
  );
}

export default TagsIndex;
