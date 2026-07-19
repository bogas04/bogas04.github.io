import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getBlogPostSummaries, IBlogPostSummary } from "../../../utils/blog";
import {
  BLOG_TAG_ALIASES,
  getBlogTagColors,
  getBlogTagSlug,
} from "../../../utils/blogTag";
import BlogArchive from "../../../components/BlogArchive";

export async function getStaticPaths() {
  const tags = Array.from(
    new Set(
      getBlogPostSummaries()
        .flatMap((post) => (post.keywords || []) as string[])
        .map(getBlogTagSlug),
    ),
  );

  return {
    paths: [...tags, ...Object.keys(BLOG_TAG_ALIASES)]
      .filter((tag) => tag && tag !== "tags")
      .map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { tag: string } }) {
  const tag = context.params.tag;
  const redirectTo = BLOG_TAG_ALIASES[tag];
  if (redirectTo) return { props: { tag, redirectTo } };

  const posts = getBlogPostSummaries().filter((post) =>
    ((post.keywords || []) as string[]).some(
      (keyword) => getBlogTagSlug(keyword) === tag,
    ),
  );
  const tagName =
    posts
      .flatMap((post) => (post.keywords || []) as string[])
      .find((keyword) => getBlogTagSlug(keyword) === tag) || tag;

  return {
    props: { tag, tagName, posts },
  };
}

interface TagArchiveProps {
  tag: string;
  tagName?: string;
  posts?: IBlogPostSummary[];
  redirectTo?: string;
}

function TagArchive({ tag, tagName, posts, redirectTo }: TagArchiveProps) {
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) router.replace(`/blog/tags/${redirectTo}`);
  }, [redirectTo, router]);

  if (redirectTo) {
    const destination = `/blog/tags/${redirectTo}`;
    return (
      <>
        <Head>
          <meta httpEquiv="refresh" content={`0;url=${destination}`} />
          <link
            rel="canonical"
            href={`https://bogas04.github.io${destination}`}
          />
        </Head>
        <p>
          This tag has moved. <a href={destination}>Continue to the tag</a>.
        </p>
      </>
    );
  }

  const displayName = tagName || tag;
  const colors = getBlogTagColors(displayName);

  return (
    <BlogArchive
      heading={
        <>
          Posts tagged{" "}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: `1px solid ${colors.textColor}`,
              padding: 0,
              color: colors.textColor,
              background: colors.backgroundColor,
            }}
          >
            <span style={{ padding: "0.2em 0.45em" }}>{displayName}</span>
            <span
              style={{
                display: "inline-flex",
                alignSelf: "stretch",
                alignItems: "center",
                borderLeft: `1px solid ${colors.textColor}`,
                padding: "0 0.45em",
              }}
            >
              {posts?.length || 0}
            </span>
          </span>
        </>
      }
      posts={posts || []}
      breadcrumbs={[
        { href: "/", label: "Divjot Singh" },
        { href: "/blog", label: "Blog" },
        { href: "/blog/tags", label: "Tags" },
        { label: displayName },
      ]}
    />
  );
}

export default TagArchive;
