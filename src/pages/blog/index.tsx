import React, { memo } from "react";
import { BLOG_URL } from "../../constants";
import SeoTags from "../../components/SeoTags";
import { getBlogPosts, IBlogPost } from "../../utils/blog";
import BlogLayout from "../../layout/blog";

import Link from "next/link";

export async function getStaticProps() {
  const posts = getBlogPosts();

  return {
    props: { posts },
  };
}

interface IBlogListingProps {
  posts: IBlogPost[];
}

function BlogListing({ posts }: IBlogListingProps) {
  return (
    <BlogLayout>
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

  .post img {
    margin: 0;
    min-width: 30%;
    max-width: 30%;
  }

  .post-body {
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }

  .post-body p,
  .post-body span {
    color: initial;
  }

  @media (prefers-color-scheme: dark) {
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
    .post img {
      min-width: calc(100% + 2em);
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

      <h1>
        <Link href="/">
          <a>Divjot Singh</a>
        </Link>{" "}
        | Blog
      </h1>

      <ul>
        {posts.map((post) => (
          <li className="post" key={post.title}>
            <Link href="blog/[slug]" as={`blog/${post.slug}`}>
              <a>
                <div className="post-body">
                  <h2>{post.title}</h2>

                  <p>{post.description}</p>
                  <span>{new Date(post.date).toDateString()}</span>
                </div>
                {post.image && (
                  <img src={post.image} alt="Image for the post" />
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}

export default memo(BlogListing);
