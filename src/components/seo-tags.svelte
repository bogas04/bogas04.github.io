<script>
  export let title;
  export let description;
  export let imageUrl;
  export let pageUrl;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageUrl} />
  <meta property="twitter:title" content={title} />

  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={imageUrl} />
</svelte:head>
