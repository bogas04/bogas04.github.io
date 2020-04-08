import React, { memo } from "react";

import { BLOG_URL, WEBSITE_URL } from "../../constants";

import { getBlogPosts, IBlogPost } from "../../utils/blog";
import SeoTags from "../../components/SeoTags";
import BlogLayout from "../../layout/blog";

export async function getStaticPaths() {
  const posts = getBlogPosts();
  const paths = posts.map((s) => ({ params: { slug: s.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const post = getBlogPosts().find((p) => {
    return p.slug === context.params.slug;
  });

  return {
    props: { post },
  };
}

interface IBlogPostProps {
  post: IBlogPost;
}

function BlogPost({ post }: IBlogPostProps) {
  const postTitle = `${post.title} | Blog | Divjot Singh`;
  const postUrl = `${BLOG_URL}/${post.slug}`;
  const postImage = `${WEBSITE_URL}/${post.image}`;
  const keywords = ((post.keywords || []) as string[]).join(", ");

  return (
    <BlogLayout>
      <style>
        {`
  .content h2 {
    font-size: 1.4em;
    font-weight: 500;
  }
  .content img,
  .content h4 {
    margin: 1em 0;
  }

  .content pre {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content pre code {
    background-color: transparent;
    padding: 0;
  }

  @media (prefers-color-scheme: dark) {
    .content pre {
      color: black;
    }
  }

  .content ul {
    line-height: 1.5;
  }

  .content li {
    margin: 0 0 0.5em 0;
  }
  h4 {
    text-transform: capitalize;
    margin-bottom: 2em;
  }`}
      </style>

      <SeoTags
        title={postTitle}
        description={post.description}
        imageUrl={postImage}
        pageUrl={postUrl}
        keywords={keywords}
      />

      <h1>{post.title}</h1>
      <h4>
        <a href="/">Divjot Singh</a> | <a href="/blog">Blog</a> |{" "}
        {new Date(post.date).toDateString()}
        <br />
        {keywords}
      </h4>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </BlogLayout>
  );
}

export default memo(BlogPost);
