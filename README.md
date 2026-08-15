# bogas04.fyi
My homepage built with [Next.js](https://nextjs.org/) and loouveee

Feel free to use it for your own personal webpage, though don't forget to star the repo!

## Deployment

GitHub Actions builds the site after each push to `main` and publishes the generated
files to the `gh-pages` branch. Configure GitHub Pages to deploy from the `gh-pages`
branch at `/` (Settings → Pages); `main` contains source code only.

## Image gallery

Gallery masters live in `gallery/images` and are always JPEGs re-encoded by
`sharp` without embedded metadata. Travel photos, blog images, and manually
added photos all use the same album format: each folder contains `index.md`,
image masters, and matching Markdown sidecars.

`public/gallery` contains generated deployment derivatives. Site-only artwork
such as talk thumbnails, maps, logos, and error illustrations lives in
`public/assets` and is not included in the gallery manifest.

```sh
pnpm gallery:add ~/Pictures/photo.jpg --album my-trip --category travel
pnpm gallery:prepare
pnpm gallery:check
git add gallery/
git commit -m "feat(gallery): add photos"
git push
```

The build creates responsive assets under `public/gallery` and a manifest under
`gallery/generated`; both are ignored and recreated for every deployment.

To configure the vanity host, add a Cloudflare Redirect Rule for
`img.bogas04.fyi/*` to `https://bogas04.fyi/image-gallery/` with status `301`.
