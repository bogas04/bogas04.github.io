import React from "react";

import SeoTags from "../components/SeoTags";

export default function Custom404Page() {
  const status = "Page not found | 404 ";
  let message = "Oopsie dooppsie this page is a poopsie!";
  let image = "img/errors/404.png";

  return (
    <>
      <style>
        {`
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
    font-size: 4em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
    font-size: 1.8em;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2.8em;
    }
    img {
      width: 40vw;
      height: auto;
    }
  }
  `}
      </style>

      <SeoTags title={status} />

      <main>
        <h1>{status}</h1>

        <img src={image} alt={status + " error code"} />

        <p>{message}</p>
      </main>
    </>
  );
}
