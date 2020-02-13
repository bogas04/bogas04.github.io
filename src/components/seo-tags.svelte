<script>
  export let title;
  export let description;
  export let imageUrl;
  export let pageUrl;
  export let keywords;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  {#if keywords && keywords.length !== 0}
    <meta name="keywords" content={keywords} />
  {/if}

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
