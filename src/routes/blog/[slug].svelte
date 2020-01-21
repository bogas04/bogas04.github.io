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
  export let post;
  export const postTitle = `${post.title} | Blog | Divjot Singh`;
  export const postUrl = `https://bogas04.github.io/blog/${post.slug}`;
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
  <meta property="og:image" content={post.image} />

  <!-- Twitter -->
  <meta property="twitter:card" content={post.image} />
  <meta property="twitter:url" content={postUrl} />
  <meta property="twitter:title" content={postTitle} />
  <meta property="twitter:description" content={post.description} />
  <meta property="twitter:image" content={post.image} />
</svelte:head>

<h1>
  <a href="/blog">My blog</a>
  / {post.title}
</h1>

<div class="content">
  {@html post.html}
</div>
