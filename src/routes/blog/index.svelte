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

  a {
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #cbcbcb;
    padding: 1em;
    margin: 1em;
    transition: all 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a:hover {
    box-shadow: #0003 0px 2px 5px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  }
  a img {
    margin: -1em -1em;
    padding-left: 2em;
    min-width: 30%;
    max-width: 30%;
  }
</style>

<svelte:head>
  <title>My Blog</title>
</svelte:head>

<h1>My blog</h1>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <a rel="prefetch" href="blog/{post.slug}">
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
