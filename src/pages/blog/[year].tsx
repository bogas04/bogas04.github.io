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
  const postImage = `${WEBSITE_URL}${post.image}`;
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
      <style>
        {`
  .content h2 {
    font-size: 1.6em;
    margin: 1em 0;
    font-weight: 500;
  }

  .content h3 {
    font-size: 1.2em;
    margin: 0.8em 0;
    font-weight: 500;
  }

  .content video {
    max-width: 100%;
  }

  .content img,
  .content video,
  .content h4 {
    margin: 1em 0;
  }

  .content .blog-image-link {
    display: block;
    cursor: zoom-in;
  }

  .content pre {
    padding: 10px;
    font-size: 20px;
    line-height: 26px;
    overflow-x: auto;
  } 

  .content pre code {
    background-color: initial;
  }

  blockquote {
    position: relative;
    font-style: italic;
  }

  blockquote::before {
    content: "“";
    position: absolute;
    margin: -0.5em;
    color: #333333;
    font-size: 3em;
    left: 0;
    top: 0;
  }

  blockquote::after {
    content: "”";
    position: absolute;
    margin: -0.5em;
    color: #333333;
    font-size: 3em;
    right: 0;
    bottom: 0;
  }

  blockquote + p > a {
    display: flex;
    justify-content: flex-end;
  }

  blockquote + p > a::before {
    content: "— ";
    white-space: pre;
  }

  @media (prefers-color-scheme: dark) {
    .content pre {
      color: black;
    }

    blockquote::after, blockquote::before {
      color: white;
    }
  }

  .content ul {
    line-height: 1.5;
  }

  .content li {
    margin: 0 0 0.5em 0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin: 0.4em 0 2em;
    padding: 0;
    list-style: none;
  }

  .tags li {
    margin: 0;
  }

  .tags a {
    min-height: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 0;
    border: 1px solid var(--tag-text-color);
    padding: 0;
    font-size: 0.85em;
    color: var(--tag-text-color);
    background: var(--tag-background-color);
    text-decoration: none;
  }

  .tags .tag-name { padding: 0.2em 0.45em; }
  .tags .tag-count {
    align-self: stretch;
    display: inline-flex;
    align-items: center;
    border-left: 1px solid currentColor;
    padding: 0 0.45em;
  }
  `}
      </style>

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
          <ul className="tags" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tags/${getBlogTagSlug(tag)}`}
                  style={{
                    "--tag-background-color": getBlogTagColors(tag).backgroundColor,
                    "--tag-text-color": getBlogTagColors(tag).textColor,
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

      <div
        className="content"
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
