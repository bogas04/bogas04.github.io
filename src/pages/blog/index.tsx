import { memo, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { BLOG_URL } from "../../constants";
import SeoTags from "../../components/SeoTags";
import { getBlogPosts, IBlogPost } from "../../utils/blog";
import { formatBlogDatePath, getBlogPostPath } from "../../utils/blogDate";
import BlogLayout, { BlogBreadcrumbItem } from "../../layout/blog";

import Link from "next/link";

export async function getStaticProps() {
  const posts = getBlogPosts();

  return {
    props: { posts },
  };
}

export interface IBlogListingProps {
  posts: IBlogPost[];
  heading?: ReactNode;
  breadcrumbs?: BlogBreadcrumbItem[];
}

export function BlogListing({ posts, heading, breadcrumbs }: IBlogListingProps) {
  const router = useRouter();
  const showDrafts = router.query["be-more-vulnerable"] === "1";
  const [drafts, setDrafts] = useState<IBlogPost[]>([]);

  useEffect(() => {
    if (!showDrafts) return;

    fetch("/_be-more-vulnerable.json")
      .then((response) => response.json())
      .then(setDrafts)
      .catch(() => setDrafts([]));
  }, [showDrafts]);

  const visiblePosts = showDrafts
    ? [...posts, ...drafts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : posts;

  return (
    <BlogLayout
      breadcrumbs={breadcrumbs || [
        { href: "/", label: "Divjot Singh" },
        { label: "Blog" },
      ]}
    >
      <style>
        {`
  ul {
    margin: 2em 1em;
    padding: 0;
    line-height: 1.5;
  }

  .post {
    list-style: none;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #cbcbcb;
    margin: 1em;
    transition: all 0.2s;
  }

  .post a {
    text-decoration: none;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .post a:hover,
  .post a:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .post-media {
    margin: 0;
    min-width: 30%;
    max-width: 30%;
    object-fit: cover;
  }

  .post-placeholder {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    background: #e2e8f0;
  }

  .post-placeholder-icon {
    font-size: 4.5rem;
    line-height: 1;
    transform: rotate(-8deg);
  }

  .post-body {
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }

  .post-title {
    display: flex;
    align-items: center;
  }

  .post-title small {
    padding: 4px;
    margin-left: 10px;
    color: black;
    background-color: gold;
    font-weight: bold;
    font-size: 8px;
    text-transform: uppercase;
  }

  .post-body p ,
  .post-body span {
    color: initial;
  }

  @media (prefers-color-scheme: dark) {
    .post {
      border-color: #555555;
    }

    .post-body p,
    .post-body span {
      color: white;
    }

    .post:hover,
    .post:focus {
      box-shadow: none;
    }

    .post a:hover,
    .post a:focus {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  @media (max-width: 800px) {
    ul {
      margin: 2em -1em;
    }
    .post a {
      flex-direction: column-reverse;
    }
    .post-media {
      min-width: calc(100% + 2em);
      max-width: calc(100% + 2em);
      padding: 0;
      margin: -1em -1em 1em;
      height: 300px;
      object-fit: cover;
    }
  }`}
      </style>

      <SeoTags
        title="Blog | Divjot Singh"
        description="My thoughts on work, life and world."
        imageUrl=""
        pageUrl={BLOG_URL}
      />

      {heading && <p>{heading}</p>}

      <ul>
        {visiblePosts.map((post) => (
          <li
            className={`post  ${post.isDraft ? "draft" : ""}`}
            key={post.title}
          >
            <Link href={getBlogPostPath(post)}>

              <div className="post-body">
                <h2 className="post-title">
                  {post.title} {post.isDraft && <small>draft</small>}
                </h2>

                <p>{post.description}</p>
                <span>
                  <time dateTime={post.date}>
                    {formatBlogDatePath(post.date)}
                  </time>{" "}
                  |{" "}
                  <time
                    dateTime={`PT${post.readingTimeMinutes}M`}
                    aria-label={`${post.readingTimeMinutes} minute estimated reading time`}
                  >
                    {post.readingTimeMinutes} min read
                  </time>
                </span>
              </div>
              {post.image ? (
                <img
                  className="post-media"
                  src={post.image}
                  alt={`Image for ${post.title}`}
                />
              ) : (
                <div className="post-media post-placeholder" aria-hidden="true">
                  <span className="post-placeholder-icon">🤷🏽‍♂️</span>
                </div>
              )}

            </Link>
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}

export default memo(BlogListing);
