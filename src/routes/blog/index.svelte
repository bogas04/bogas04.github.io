<script context="module">
  import { sanitizeDate } from "./_utils";
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<style>
  ul {
    margin: 2em 1em;
    padding: 0;
    line-height: 1.5;
  }

  li {
    list-style: none;
  }

  .post {
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #cbcbcb;
    padding: 1em;
    margin: 1em;
    transition: all 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1em;
  }
  .post:hover {
    box-shadow: #0003 0px 2px 5px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  }
  .post img {
    margin: 0;
    min-width: 30%;
    max-width: 30%;
  }
  @media (max-width: 800px) {
    .post {
      flex-direction: column-reverse;
    }
    .post img {
      min-width: 100%;
      padding: 0;
      margin: 1em;
    }
  }
</style>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Blog | Divjot Singh</title>
  <meta name="title" content="Blog | Divjot Singh" />
  <meta name="description" content="My thoughts on work, life and world." />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bogas04.github.io/blog" />
  <meta property="og:title" content="Blog | Divjot Singh" />
  <meta
    property="og:description"
    content="My thoughts on work, life and world." />
  <meta property="og:image" content="" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://bogas04.github.io/blog" />
  <meta property="twitter:title" content="Blog | Divjot Singh" />
  <meta
    property="twitter:description"
    content="My thoughts on work, life and world." />
  <meta property="twitter:image" content="" />

</svelte:head>

<h1>
  <a href="/" rel="preload">Divjot Singh</a>
  | Blog
</h1>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <a rel="prefetch" href="blog/{post.slug}" class="post">
      <li>
        <h2>{post.title}</h2>

        <p>{post.description}</p>
        <span>{sanitizeDate(post.date)}</span>
      </li>
      {#if post.image}
        <img src={post.image} alt="Image for the post" />
      {/if}
    </a>
  {/each}

</ul>
