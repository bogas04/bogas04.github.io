import SeoTags from "../components/SeoTags";

export default function Custom404Page() {
  const status = "Page not found | 404 ";
  const message = "Oopsie dooppsie this page is a poopsie!";
  const image = "/img/errors/404.png";

  return (
    <>
      <SeoTags title={status} />

      <main className="px-[10vw] py-[10vh] text-center">
        <h1 className="mx-auto mb-[0.5em] text-[2.8em] font-bold min-[481px]:text-[4em]">
          {status}
        </h1>

        <img
          src={image}
          alt={status + " error code"}
          className="h-auto w-[40vw] min-[481px]:h-[40vh] min-[481px]:w-auto"
        />

        <p className="mx-auto my-[1em] text-[1.8em]">{message}</p>
      </main>
    </>
  );
}
