<script>
  import { fade } from "svelte/transition";
  import { stores } from "@sapper/app";
  import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";

  const { preloading } = stores();
</script>

<PageLoadingBar {preloading} color1="#ffc600" color2="#eb4471" />

{#if !$preloading}
  <main transition:fade>
    <slot />
  </main>
{/if}
