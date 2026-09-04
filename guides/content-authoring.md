# Content authoring

This repository has two local-only authoring pages:

- `/write` creates and edits blog posts.
- `/upload` creates and manages image-gallery albums and photos.

Start the development server with `pnpm start`, then open either page in Chrome
or Edge. Both pages use the browser's File System Access API, so the first step
is to select this repository's root directory and grant read/write access. The
saved directory handle stays only in that browser's local IndexedDB storage;
neither page uploads files to a server or commits/pushes Git changes.

They deliberately return 404 in production, so they are not deployed to the
public site.

## `/write`: blog posts

`/write` reads and writes Markdown files in `src/blog`. It provides a Markdown
editor, live preview, tags, draft status, and a list of existing posts.

- Saving creates or updates a post Markdown file with its front matter.
- Saving a draft keeps it private to the repository; commit and push only when
  it is ready to publish.
- Deleting a post removes its Markdown file after confirmation.
- Image uploads are written to `public/img/blog` as WebP files. They are
  browser-reencoded at quality 0.86, limited to 2400px on the longest side,
  and have EXIF and other embedded metadata removed. `/write` inserts the
  resulting Markdown image reference for you.

## `/upload`: gallery albums and images

`/upload` manages `gallery/albums.json` plus the folders it references under
`public/img`.

An album has a stable ID and a configurable source path. Its folder contains:

```text
public/img/travel/example-trip/
  index.md       # album title, dates, category, cover, and publication state
  beach.jpg      # sanitised source image
  beach.md       # title, alt text, caption, and publication state
```

The page can create an album, choose its category and cover, edit album
metadata, upload photos, and edit each photo's accessible text and caption.
Images are reencoded locally as quality-95 JPEG files, with orientation baked
into pixels and embedded metadata removed. Their filename base is retained;
for example, `sunset.png` becomes `sunset.jpg`.

Mark both the album and an image as published before it appears in the gallery.
`published: false` prevents it from appearing in gallery pages, but files under
`public/img` are static public assets after deployment. Do not put confidential
or unsanitised material there.

## How the gallery is built

`gallery/albums.json` maps a stable gallery ID to an arbitrary folder below
`public/img`; neither the folder name nor image filename needs to follow a
convention.

During each build:

1. `pnpm gallery:check` validates album configuration, image sidecars, and
   required accessibility metadata for published images.
2. `pnpm gallery:build` reads published albums/images and creates responsive,
   metadata-free derivatives in `public/gallery`, plus
   `gallery/generated/manifest.json` for the gallery pages.
3. `pnpm gallery:audit` confirms that generated image derivatives contain no
   embedded metadata.
4. Next.js renders `/image-gallery`, each album page, and individual photo
   pages from that manifest.

The generated directories are ignored by Git and recreated for every build.
GitHub Actions runs the gallery validation, generation, audit, and site build
on pushes to `main` before publishing the static site.

## Command-line alternative

For one-off terminal uploads, use:

```sh
pnpm gallery:add ~/Pictures/photo.jpg --album my-trip --category travel
```

It creates the same quality-95 JPEG, strips metadata, and adds a Markdown
sidecar. The album must already exist in `gallery/albums.json`; `/upload` is
the easier way to create and organise albums.
