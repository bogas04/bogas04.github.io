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
  import { BLOG_URL } from "../../constants";
  import SeoTags from "../../components/seo-tags.svelte";
  export let posts;
</script>

<style>
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

  .post:hover {
    box-shadow: #0003 0px 2px 5px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
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
  }
</style>

<SeoTags
  title="Blog | Divjot Singh"
  description="My thoughts on work, life and world."
  imageUrl=""
  pageUrl={BLOG_URL} />

<h1>
  <a href="/" rel="preload">Divjot Singh</a>
  | Blog
</h1>

<ul>
  {#each posts as post}
    <li class="post">
      <a rel="prefetch" href="blog/{post.slug}">
        <div class="post-body">
          <h2>{post.title}</h2>

          <p>{post.description}</p>
          <span>{new Date(post.date).toDateString()}</span>
        </div>
        {#if post.image}
          <img src={post.image} alt="Image for the post" />
        {/if}
      </a>
    </li>
  {/each}

</ul>
