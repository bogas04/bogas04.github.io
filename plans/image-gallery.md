# Git-hosted image gallery plan

## Goal

Publish a Flickr-like gallery at `/image-gallery/`, with `img.bogas04.fyi`
redirecting to that canonical URL. Keep the entire workflow in this Git
repository and use the existing GitHub Actions deployment to generate gallery
assets.

The public site must never serve image metadata. In particular, output images
must not include EXIF, GPS, XMP, IPTC, camera, author, or capture-time data.

## Constraints and implications

- This repository is the source of the GitHub Pages site, so committed image
  files can be read directly from GitHub as well as from the deployed site.
- Therefore, do not commit private originals with metadata. The Git-tracked
  "source" image for the gallery is a high-quality but *already sanitized*
  master image.
- A pre-push hook validates the work tree and blocks unsafe pushes. It must not
  generate caption files: by that point the commit has already been created and
  generated files would not be pushed. Caption scaffolding belongs in an
  explicit command run before staging and committing.
- Audit and sanitise all existing images before including them in the gallery.
  Replacing a deployed file prevents new visitors from reading its metadata,
  but public Git history remains accessible unless it is deliberately rewritten
  later.

## Repository structure

```text
gallery/
  images/
    taiwan-2026/
      index.md                 # album metadata
      001.jpg                  # sanitised, Git-tracked master
      001.md                   # image metadata and caption
      002.jpg
      002.md
  generated/                   # gitignored build manifest
public/
  gallery/                     # gitignored generated image variants
  assets/                      # non-gallery site artwork
scripts/
  gallery-add.ts
  gallery-prepare.ts
  gallery-build.ts
  gallery-check.ts
  gallery-audit.ts
```

Only `gallery/images/**` is committed. `public/gallery` and
`gallery/generated` are recreated during every build and must be included in
`.gitignore`.

## Authoring model

Each album is a self-contained folder. `index.md` contains album-level
metadata, and each image has a Markdown sidecar with the same basename. For
example, `gallery/images/taiwan-2026/001.jpg` is described by
`gallery/images/taiwan-2026/001.md`.

```md
---
title: Morning market
alt: A fruit vendor arranging produce under red lanterns.
takenAt: 2026-03-12
location: Taipei, Taiwan
published: true
featured: false
---

A slow morning before the streets properly filled up.
```

`takenAt` and `location` are intentional editorial metadata; neither is read
from an image file. `alt` is required for every published image.

`index.md` contains album-level title, summary, cover-photo ID, category, trip
dates, and visibility.

## Commands

Add these package scripts:

```json
{
  "gallery:add": "node --no-warnings scripts/gallery-add.ts",
  "gallery:prepare": "node --no-warnings scripts/gallery-prepare.ts",
  "gallery:build": "node --no-warnings scripts/gallery-build.ts",
  "gallery:check": "node --no-warnings scripts/gallery-check.ts",
  "gallery:audit": "node --no-warnings scripts/gallery-audit.ts"
}
```

### `gallery:add`

Example:

```sh
pnpm gallery:add ~/Pictures/taiwan/001.jpg --album taiwan-2026
```

It sanitises the selected local original before writing
`gallery/images/taiwan-2026/001.jpg`, creates an adjacent caption template when
needed, and never writes the unsanitised original to the repository. If the
album is new, it also creates a non-destructive `index.md` template beside the
image.

Use `sharp` to decode and re-encode the image without `withMetadata()`. This
removes EXIF, GPS, XMP, IPTC, and other embedded metadata. Preserve only pixels,
orientation (baked into pixels), and colour profile as appropriate.

### `gallery:prepare`

Scans `gallery/images` and creates `index.md` plus a sidecar Markdown template
for every image that lacks one. It never overwrites an existing Markdown file.
Run it whenever images are copied in manually, before `git add`.

### `gallery:check`

Runs without changing files and fails when any of the following is true:

- an image has no matching sidecar;
- a sidecar refers to no image;
- a published image lacks `title` or `alt`;
- an album or image ID is duplicated;
- a master image contains EXIF, GPS, XMP, IPTC, or PNG text metadata;
- an image cannot be decoded or exceeds the agreed source-size limit.

### `gallery:build`

Reads published image/Markdown pairs and creates only public derivatives:

```text
public/gallery/<album>/<id>/thumb.webp    480px wide
public/gallery/<album>/<id>/display.webp  1440px wide
public/gallery/<album>/<id>/display.jpg   2200px wide fallback
gallery/generated/manifest.json
```

The manifest includes URLs, width, height, aspect ratio, album, title, alt,
and caption data. The Next.js gallery pages consume this manifest at static
build time.

### `gallery:audit`

Performs a post-generation scan of `public/gallery`. It must fail on any
metadata-bearing JPEG, WebP, AVIF, or PNG. This makes metadata stripping a
deploy-time invariant rather than a convention.

## Local hooks

Use a versioned hook manager such as Lefthook or Husky.

- `pre-commit`: run Markdown/front-matter formatting and lightweight gallery
  validation.
- `pre-push`: run `pnpm gallery:check` and `pnpm build`.

The intended publishing sequence is:

```sh
pnpm gallery:add ~/Pictures/taiwan/001.jpg --album taiwan-2026
pnpm gallery:prepare
pnpm gallery:check
git add gallery/
git commit -m "feat(gallery): add Taiwan photos"
git push
```

## Deployment changes

The repository already has a GitHub Action that builds on each push to `main`
and force-publishes the static export to `gh-pages`. Amend its build section to
run:

```sh
pnpm gallery:check
pnpm gallery:build
pnpm gallery:audit
pnpm run build
```

`gallery:build` runs before the Next export so generated files are copied from
`public/gallery` into `docs/gallery`. The generated assets are deployment-only;
the Action must not commit them back to `main`.

Cache the package manager store as it already does. At the current collection
size, regenerate every image on each deploy. Introduce content-hash caching
only if build times become material.

## Gallery UX

- `/image-gallery/`: album selector and responsive masonry-style grid.
- `/image-gallery/<album>/`: album grid, caption preview, and date/location.
- `/image-gallery/<album>/<id>/`: static shareable photo page.
- A client lightbox provides previous/next navigation and keyboard controls;
  captions stay visible and images retain their semantic `alt` text.
- Display derivatives use `srcset`/`sizes`; do not load full display images for
  every grid tile.
- `img.bogas04.fyi` is a Cloudflare redirect to
  `https://bogas04.fyi/image-gallery/`; the gallery's canonical URLs remain on
  `bogas04.fyi`.

## Migration

1. Add the gallery scripts, schema, `.gitignore` entries, and hooks.
2. Implement `gallery:add` and verify it strips metadata before any image is
   committed.
3. Move one small existing album into a self-contained folder under
   `gallery/images` with fresh Markdown sidecars; use sanitised copies, not the
   existing files directly.
4. Build the gallery UI and deploy it behind `/image-gallery/`.
5. Add the Cloudflare redirect for `img.bogas04.fyi`.
6. Migrate remaining gallery candidates and replace any currently served image
   URLs with sanitized copies where practical. Travel and blog images now use
   the canonical gallery derivatives; homepage-only artwork remains under
   `public/assets`.
7. Decide separately whether public Git history needs rewriting to remove
   previously committed metadata-bearing originals. This is a disruptive action
   and should only be done after confirming the repository's visibility and
   desired privacy boundary.

## Definition of done

- Adding a photo creates a non-destructive Markdown caption template.
- A push cannot proceed with uncaptioned, invalid, or metadata-bearing gallery
  masters.
- Every deployment recreates stripped responsive thumbnails and a manifest.
- A deployment fails if generated public assets expose metadata.
- The gallery is available at `/image-gallery/` and `img.bogas04.fyi` redirects
  there.
