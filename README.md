# bogas04.fyi

The source for [bogas04.fyi](https://bogas04.fyi), a personal website for
writing, photography, and an evolving digital identity outside corporate
platforms.

## How it is made

The site uses the Next.js Pages Router with static export and Tailwind. It has
no application server. Blog posts are Markdown files in `src/blog`; gallery
albums are registered in `gallery/albums.json` and use image masters plus
Markdown metadata under `public/img`.

Gallery pages are built from a generated manifest. Blog pages produce RSS, Atom,
and a sitemap during the site build. Public images are served from their
canonical `/img/**` paths.

## Publishing

GitHub Actions builds every push to `main`, validates and generates the gallery,
creates the static site, then publishes it to `gh-pages`. GitHub Pages serves
the generated branch and Cloudflare provides the public domain.

## Project documentation

The implementation and its decisions are documented in [`docs/`](docs/):

- [Content authoring](docs/content-authoring.md)
- [Design direction](docs/design-direction.md)
- [Technical principles](docs/technical-principles.md)
- [Build and deployment](docs/build-and-deployment.md)
