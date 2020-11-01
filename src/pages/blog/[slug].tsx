import { memo } from "react";
import "prismjs/themes/prism.css";
import "prism-themes/themes/prism-ghcolors.css";

import { BLOG_URL, WEBSITE_URL } from "../../constants";

import { getBlogPosts, IBlogPost } from "../../utils/blog";
import SeoTags from "../../components/SeoTags";
import BlogLayout from "../../layout/blog";
import Link from "next/link";

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

  blockquote ~ p > a {
    display: flex;
    justify-content: flex-end;
  }

  blockquote ~ p > a::before {
    content: "— ";
    white-space: pre;
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
  }
  h4 p{
    margin: 0.4em 0;
  }
  `}
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
        <Link href="/">
          <a>Divjot Singh</a>
        </Link>{" "}
        |{" "}
        <Link href="/blog">
          <a>Blog</a>
        </Link>{" "}
        | {new Date(post.date).toDateString()}
        <br />
        <p>{keywords}</p>
      </h4>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </BlogLayout>
  );
}

export default memo(BlogPost);
