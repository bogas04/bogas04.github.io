import { memo, useEffect } from "react";
import "prismjs/themes/prism.css";
import "prism-themes/themes/prism-ghcolors.css";

import { BLOG_URL, WEBSITE_URL } from "../../constants";

import { getBlogPosts, IBlogPost } from "../../utils/blog";
import SeoTags from "../../components/SeoTags";
import BlogLayout from "../../layout/blog";
import Link from "next/link";
import { ShareLinks } from "../../components/ShareLinks/ShareLinks";

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
  const postImage = `${WEBSITE_URL}${post.image}`;
  const keywords = ((post.keywords || []) as string[]).join(", ");

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
        <Link href="/">Divjot Singh</Link> | <Link href="/blog">Blog</Link> |{" "}
        {new Date(post.date).toDateString()}
        <br />
        <p>{keywords}</p>
      </h4>

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
          <ShareLinks url={postUrl} description={post.description} />
        </div>
        <div style={{ marginTop: 24 }}>
          <div id="disqus_thread" />
        </div>
      </footer>
    </BlogLayout>
  );
}

export default memo(BlogPost);
