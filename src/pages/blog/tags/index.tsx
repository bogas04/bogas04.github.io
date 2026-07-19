import Link from "next/link";
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
      <ul className="m-0 flex flex-row flex-wrap gap-4 p-0 [@supports(grid-template-rows:masonry)]:grid [@supports(grid-template-rows:masonry)]:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] [@supports(grid-template-rows:masonry)]:[grid-template-rows:masonry] [@supports(grid-template-rows:masonry)]:[align-tracks:start] [&>li]:[@supports(grid-template-rows:masonry)]:break-inside-avoid">
          {tags.map((tag) => (
            <li key={tag.name}>
              <Link
                href={`/blog/tags/${getBlogTagSlug(tag.name)}`}
                className="inline-flex items-center border border-[var(--tag-text-color)] bg-[var(--tag-background-color)] p-0 no-underline text-[var(--tag-text-color)] dark:!border-[var(--tag-text-color-dark)] dark:!bg-[var(--tag-background-color-dark)] dark:!text-[var(--tag-text-color-dark)]"
                style={{
                  "--tag-background-color": getBlogTagColors(tag.name).backgroundColor,
                  "--tag-text-color": getBlogTagColors(tag.name).textColor,
                  "--tag-background-color-dark": getBlogTagColors(tag.name).darkBackgroundColor,
                  "--tag-text-color-dark": getBlogTagColors(tag.name).darkTextColor,
                  fontSize: `${0.9 + (tag.count / maxCount) * 0.9}em`,
                } as React.CSSProperties}
              >
                <span className="px-[0.45em] py-[0.2em]">{tag.name}</span>
                <span className="inline-flex self-stretch items-center border-l border-current px-[0.45em]">
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
