# bogas04.fyi
My homepage built with [Next.js](https://nextjs.org/) and loouveee

Feel free to use it for your own personal webpage, though don't forget to star the repo!

## Deployment

GitHub Actions builds the site after each push to `main` and publishes the generated
files to the `gh-pages` branch. Configure GitHub Pages to deploy from the `gh-pages`
branch at `/` (Settings → Pages); `main` contains source code only.

## Image gallery

Gallery masters can live anywhere below `public/img`. `gallery/albums.json`
maps stable gallery album IDs to their source directories, so an image path or
filename never needs to follow a gallery convention. Each mapped folder contains
`index.md`, image masters, and matching Markdown sidecars.

```json
{ "albums": [{ "id": "bali", "path": "public/img/travel/bali" }] }
```

`public/gallery` contains generated responsive derivatives. Site-only artwork
such as talk thumbnails, maps, logos, and error illustrations lives in
`public/assets` and is not included in the gallery manifest.

```sh
pnpm gallery:add ~/Pictures/photo.jpg --album my-trip --category travel
pnpm gallery:prepare
pnpm gallery:check
git add public/img/
git commit -m "feat(gallery): add photos"
git push
```

`gallery:add` keeps the input filename (with a `.jpg` extension after
sanitising) unless an explicit `--id` is supplied.

The build creates responsive assets under `public/gallery` and a manifest under
`gallery/generated`; both are ignored and recreated for every deployment.

### Local gallery authoring

Run `pnpm start` and open `/upload` in Chrome or Edge to connect a local
checkout. The page can create and organise albums, upload images without
renaming them, and edit the accompanying gallery metadata. It is development
only and never writes to the deployed site or GitHub.

To configure the vanity host, add a Cloudflare Redirect Rule for
`img.bogas04.fyi/*` to `https://bogas04.fyi/image-gallery/` with status `301`.
