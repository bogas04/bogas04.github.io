<script>
  export let status;
  export let error;
  export let message =
    status === 404
      ? "Oopsie dooppsie this page is poopsie!"
      : "Uh-oh! You broke our site.";
  export let image =
    status === 404 ? "img/errors/404.png" : "img/errors/500.png";

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  main {
    text-align: center;
    padding: 10vh 10vw;
  }

  img {
    height: 40vh;
    width: auto;
  }
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
    font-size: 1.8em;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<main>
  <h1>{status}</h1>

  <img src={image} alt={status + ' error code'} />

  <p>{message}</p>
  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}

</main>
