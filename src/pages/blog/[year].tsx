import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import "prism-themes/themes/prism-ghcolors.css";

import { WEBSITE_URL } from "../../constants";

import {
  getBlogPostSummaries,
  IBlogPost,
  IBlogPostSummary,
} from "../../utils/blog";
import { getBlogTagColors, getBlogTagSlug } from "../../utils/blogTag";
import {
  getBlogDateParts,
  getBlogPostPath,
} from "../../utils/blogDate";
import SeoTags from "../../components/SeoTags";
import BlogLayout from "../../layout/blog";
import Link from "next/link";
import { ShareLinks } from "../../components/ShareLinks/ShareLinks";
import BlogArchive from "../../components/BlogArchive";

const BLOG_PLACEHOLDER_IMAGE = "/img/travel/uk/uk-14.jpg";
const BLOG_PLACEHOLDER_ALT = "DJ shrugging infront of Awkward Hill Cottage in UK";

export async function getStaticPaths() {
  const posts = getBlogPostSummaries(true);
  const publishedPosts = getBlogPostSummaries();
  const years = Array.from(
    new Set(publishedPosts.map((post) => new Date(post.date).getFullYear()))
  );
  const paths = [
    ...posts.map((post) => ({ params: { year: post.legacySlug } })),
    ...years.map((year) => ({ params: { year: String(year) } })),
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { year: string } }) {
  const legacyPost = getBlogPostSummaries(true).find((p) => {
    return p.legacySlug === context.params.year;
  });
  if (legacyPost) {
    return { props: { legacyDestination: getBlogPostPath(legacyPost) } };
  }

  const year = context.params.year;
  const posts = getBlogPostSummaries().filter(
    (candidate) => String(new Date(candidate.date).getFullYear()) === year
  );

  return {
    props: { year, posts },
  };
}

interface IBlogPostProps {
  post: IBlogPost;
  tagCounts?: Record<string, number>;
}

interface IBlogRouteProps {
  post?: IBlogPost;
  posts?: IBlogPostSummary[];
  year?: string;
  legacyDestination?: string;
  tagCounts?: Record<string, number>;
}

function BlogPost({ post, tagCounts = {} }: IBlogPostProps) {
  const postTitle = `${post.title} | Blog | Divjot Singh`;
  const postUrl = `${WEBSITE_URL}${getBlogPostPath(post)}`;
  const postImage = `${WEBSITE_URL}${post.image || BLOG_PLACEHOLDER_IMAGE}`;
  const keywords = ((post.keywords || []) as string[]).join(", ");
  const tags = (post.keywords || []) as string[];
  const dateParts = getBlogDateParts(post.date);

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
            var disqus_config = function () {
              this.page.url = "${postUrl}";
              this.page.identifier = "${post.slug}";
            };
            (function () {
              // DON'T EDIT BELOW THIS LINE
              var d = document,
                s = d.createElement("script");
              s.src = "https://https-bogas04-github-io.disqus.com/embed.js";
              s.setAttribute("data-timestamp", +new Date());
              (d.head || d.body).appendChild(s);
            })();
        `;
    document.body.appendChild(script);
  }, []);
  return (
    <BlogLayout
      title={post.title}
      readingTimeMinutes={post.readingTimeMinutes}
      transitionSlug={post.slug}
      breadcrumbs={[
        { href: "/", label: "Divjot Singh" },
        { href: "/blog", label: "Blog" },
        ...(dateParts
          ? [
              { href: `/blog/${dateParts.year}`, label: dateParts.year },
              {
                href: `/blog/${dateParts.year}/${dateParts.month}`,
                label: dateParts.month,
              },
            ]
          : []),
        { label: "This post" },
      ]}
    >
      <SeoTags
        title={postTitle}
        description={post.description}
        imageUrl={postImage}
        pageUrl={postUrl}
        keywords={keywords}
        noIndex={post.isDraft}
      />

      <header>
        {tags.length > 0 && (
          <ul className="blog-tags" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tags/${getBlogTagSlug(tag)}`}
                  className="!text-[var(--tag-text-color)] dark:!text-[var(--tag-text-color-dark)]"
                  style={{
                    "--tag-background-color": getBlogTagColors(tag).backgroundColor,
                    "--tag-text-color": getBlogTagColors(tag).textColor,
                    "--tag-background-color-dark": getBlogTagColors(tag).darkBackgroundColor,
                    "--tag-text-color-dark": getBlogTagColors(tag).darkTextColor,
                  } as React.CSSProperties}
                >
                  <span className="tag-name">{tag}</span>
                  <span className="tag-count">{tagCounts[tag] || 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      {!post.image && (
        <img
          className="blog-placeholder-image"
          src={BLOG_PLACEHOLDER_IMAGE}
          alt={BLOG_PLACEHOLDER_ALT}
        />
      )}

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer
        style={{
          borderTop: "1px solid black",
          marginTop: 48,
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Like the article?</div>
          <div>
            [
            <a
              href={`https://github.com/bogas04/bogas04.github.io/blame/main/src/blog/${post.fileName}`}
              target="_blank"
            >
              History
            </a>
            ] [
            <a
              href={`https://github.com/bogas04/bogas04.github.io/blob/main/src/blog/${post.fileName}`}
              target="_blank"
            >
              Edit
            </a>
            ]
          </div>
        </section>
        <div style={{ marginTop: 24 }}>
          <a href="/blog.xml">RSS</a> | <a href="/blog.atom">Atom</a>
        </div>
        <div style={{ marginTop: 16 }}>
          <ShareLinks url={postUrl} description={post.description} />
        </div>
        <div style={{ marginTop: 24 }}>
          <div id="disqus_thread" />
        </div>
      </footer>
    </BlogLayout>
  );
}

function BlogRoute({ post, posts, year, legacyDestination, tagCounts }: IBlogRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (legacyDestination) router.replace(legacyDestination);
  }, [legacyDestination, router]);

  if (legacyDestination) {
    return (
      <>
        <Head>
          <meta httpEquiv="refresh" content={`0;url=${legacyDestination}`} />
          <link rel="canonical" href={`${WEBSITE_URL}${legacyDestination}`} />
        </Head>
        <p>
          This post has moved. <a href={legacyDestination}>Continue to the post</a>.
        </p>
      </>
    );
  }

  if (post) return <BlogPost post={post} tagCounts={tagCounts} />;

  return (
    <BlogArchive
      heading={`Posts from ${year}`}
      posts={posts || []}
      breadcrumbs={[
        { href: "/", label: "Divjot Singh" },
        { href: "/blog", label: "Blog" },
        { label: year || "" },
      ]}
    />
  );
}

export default memo(BlogRoute);
