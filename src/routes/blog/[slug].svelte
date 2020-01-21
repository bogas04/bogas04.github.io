<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { BLOG_URL, WEBSITE_URL } from "../../constants";

  export let post;
  export const postTitle = `${post.title} | Blog | Divjot Singh`;
  export const postUrl = `${BLOG_URL}/${post.slug}`;
  export const postImage = `${WEBSITE_URL}/${post.image}`;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{postTitle}</title>
  <meta name="title" content={postTitle} />
  <meta name="description" content={post.description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={postUrl} />
  <meta property="og:title" content={postTitle} />
  <meta property="og:description" content={post.description} />
  <meta property="og:image" content={postImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content={postImage} />
  <meta property="twitter:url" content={postUrl} />
  <meta property="twitter:title" content={postTitle} />
  <meta property="twitter:description" content={post.description} />
  <meta property="twitter:image" content={postImage} />
</svelte:head>

<h1>
  <a href="/">Divjot Singh</a>
  |
  <a href="/blog" rel="preload">Blog</a>
  | {post.title}
</h1>

<div class="content">
  {@html post.html}
</div>
