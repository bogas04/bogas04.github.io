<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    :global(body),
    main {
      background: #333;
      color: white;
    }

    :global(a) {
      color: lightsalmon;
    }
  }

  :global(img) {
    width: 100%;
  }
</style>

<main>
  <slot />
</main>
