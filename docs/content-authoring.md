# Content authoring

This repository has a local-only authoring hub and two standalone editors:

- `/admin` links to the editors and manages the home page.
- `/write` creates and edits blog posts.
- `/upload` creates and manages image-gallery albums and photos.

Use `pnpm write` or `pnpm upload` to start the development server and open the
right authoring page. `pnpm start` remains available when you want the whole
site without opening an editor.

The editors use the browser's File System Access API, so the first connection
still requires selecting this repository's root directory and granting
read/write access. A command line tool cannot grant that browser permission or
pass a directory handle to the page. The Connect repository button is focused
when opened through either authoring command, and Chrome or Edge remembers the
last directory used for this site. The saved directory handle stays only in that
browser's local IndexedDB storage; neither page uploads files to a server or
commits/pushes Git changes.

These local-only pages deliberately return 404 in production, so they are not deployed to the
public site.

## `/admin`: home page and editor hub

`/admin` matches the local editors and links to `/write`, `/upload`, and the
local composer on `/now`. Connect the repository in Chrome or Edge to edit
the introduction, home links, work, travel, education, talks, and social links
stored in `src/data/home.json`. Entries
can be added, reordered, edited and removed; nested lists can be edited too.
Save writes that file only after validation and rejects changes if it was edited
on disk since connection. The browser warns before leaving with unsaved work;
changes are not published, committed or pushed automatically. Keep existing
work IDs and gallery album IDs stable because they appear in public URLs. Work details, education paragraphs, and the travel introduction use inline Markdown for links, **bold**, *italics*, and `code`; wrap text in `==double equals==` for a highlight. Links that open a new tab retain their target and rel attributes in an optional Markdown link title, for example `[name](https://example.com "target=_blank;rel=noopener noreferrer")`. Layout, icons, and interaction behavior remain in code.

The page uses the same development-only 404 guard as the other editors. It is
not an authentication mechanism and must not be exposed on a public server.

## `/write`: blog posts

`/write` reads and writes Markdown files in `src/blog`. It provides a Markdown
editor, live preview, tags, draft status, and a list of existing posts.

- Saving creates or updates a post Markdown file with its front matter.
- Unsaved edits are kept locally in the browser and can be restored after a
  crash or accidental tab closure. They are not written to the repository until
  Save is selected.
- Saving a draft keeps it private to the repository; commit and push only when
  it is ready to publish.
- Deleting a post removes its Markdown file after confirmation.
- Image uploads are written to `public/img/blog` as WebP files. They are
  browser-reencoded at quality 0.86, limited to 2400px on the longest side,
  and have EXIF and other embedded metadata removed. `/write` inserts the
  resulting Markdown image reference for you.

## `/upload`: gallery albums and images

`/upload` manages `gallery/albums.json` plus the folders it references under
`public/img`. On the local gallery, an album has **Edit album** and **Add images**
shortcuts, and each photo has an edit shortcut. These open the relevant place
in `/upload` after repository access is granted; adding images still requires
choosing files. The shortcuts are absent from the public site.

An album has a stable ID and a configurable source path. Its folder contains:

```text
public/img/travel/example-trip/
  index.md       # album title, dates, category, cover, and publication state
  beach.jpg      # sanitised source image
  beach.md       # title, alt text, caption, and publication state
```

The album sidebar groups albums by category, shows cover previews, image counts
and publication state, and stays independently scrollable on desktop. Search
by name, ID, category, or folder; Cmd+K or Ctrl+K focuses the search.

The page can create an album, choose its category and cover, edit album
metadata, upload one or more photos at once, and edit each photo's accessible
text and caption. Gallery categories are Travel, Blog, Random, and
Screenshots. Image dates use the browser's date picker; use **Auto-fill from
image dates** to set an album's start and end dates from its dated images.
Unsaved album and image metadata is recoverable locally in the browser; it does
not write to the repository until Save is selected.
The image editor can delete the selected source image and its matching metadata
file after confirmation. Save unsaved details first, and choose and save a new
cover before deleting an image used as the album cover. Deletion can break
existing links. The local server watches gallery files and refreshes the manifest
after changes; reload an open gallery page to see the update.
`pnpm start` runs a local-only Sharp service alongside Next.js, so `/upload`
works whether it is opened through `pnpm upload` or visited from an ordinary
local development session. Both it and `pnpm gallery:add` use the same image
optimizer: it reduces images to 1440px on their longest edge, reencodes them as
quality-95 JPEGs, bakes orientation into pixels, and removes embedded metadata.
Their filename base is retained; for example, `sunset.png` becomes
`sunset.jpg`. `pnpm gallery:add` also accepts HEIC/HEIF sources; the shared
optimizer decodes their primary photo before resizing and sanitizing it. The
uploader sends up to four images to this local service at once. **Optimize all
images** applies the same process to every unprocessed
image in the selected album without changing its image metadata. Afterward, the
control reports that the album is already optimized instead of reprocessing the
files.

Pressing Ctrl+C stops both the local HTTP listener and Next.js's development
runtime. A subsequent `pnpm start` can reuse the same port without manual
cleanup.

Mark both the album and an image as published before it appears in the gallery.
Screenshot albums may leave both start and end dates empty when capture dates
are unknown. Their undated images appear in the gallery's undated section;
do not substitute an import date for an unknown capture date.
`published: false` prevents it from appearing in gallery pages, but files under
`public/img` are static public assets after deployment. Do not put confidential
or unsanitised material there.

Before every commit, the pre-commit hook checks every staged image added or
modified below `public/img`. It blocks images larger than 25 MiB or 100 million
pixels; use `/upload` or `pnpm gallery:add` to re-encode oversized originals.

## How the gallery is built

Gallery back arrows use the visitor's known in-site browsing history, preserving
the view and page scroll position they came from. For a direct entry, they
replace the current page with the parent album or folder, then the pictures index, so repeated back actions
continue up the hierarchy. The pictures header links home.

`gallery/albums.json` maps a stable gallery ID to an arbitrary folder below
`public/img`; neither the folder name nor image filename needs to follow a
convention. Album IDs may use slash-separated, lowercase path segments to make
nested gallery folders. For example, an album with ID `screenshots/celeste`
and path `public/img/screenshots/celeste` is browsed at
`/images/screenshots/celeste/`; `/images/screenshots/` becomes its containing
folder. A registered album cannot also be a containing folder, so put images
in the leaf game folders rather than the `screenshots` folder itself.

```mermaid
flowchart TD
  Upload["/upload + local Sharp service"] --> UploadImage["Shared image optimizer\nResize to 1440px maximum\nRe-encode to JPEG, quality 95\nBake orientation and remove metadata"]
  CLI["pnpm gallery:add"] --> CLIImage["Shared image optimizer"]
  Manual["Manually add an image"] --> Source
  UploadImage --> Source["public/img/<album-folder>/<image>.<ext>"]
  CLIImage --> Source

  Source --- Sidecar["<image>.md\ntitle, alt, takenAt, published, caption"]
  Source --- Album["index.md\ntitle, cover, category, startDate, published"]
  Album --- Registry["gallery/albums.json\nalbum ID → folder"]

  Source --> Check["pnpm gallery:check"]
  Sidecar --> Check
  Album --> Check
  Registry --> Check
  Check -->|"album and image are published"| Manifest["gallery/generated/manifest.json"]
  Check -->|"missing sidecar, invalid image, or invalid metadata"| Block["Build and deploy blocked"]

  Manifest --> All["/images\nAll published gallery images"]
  Manifest --> AlbumPage["/images/<album>\nPublished images in one album"]
  Manifest --> PhotoPage["/images/<album>/<file>\nOne image page"]
  Source --> Asset["/img/<folder>/<file>\nActual public image file"]
  Asset --> PhotoPage
  Asset --> Blog["/blog and other pages\nDirect image references"]
```

An image appears in gallery pages only if all of these conditions hold:

1. Its folder is registered as an album in `gallery/albums.json`.
2. The album's `index.md` has `published: true`.
3. The image has a matching `.md` sidecar with `published: true`.

Files below `public/img` are always public at their `/img/**` URL after a
deployment. A blog post can therefore use an image directly even when that
image is not published in the image gallery.

During each build:

1. `pnpm gallery:check` validates album configuration, image sidecars, and
   required accessibility metadata for published images.
2. `pnpm gallery:build` reads published albums/images and creates
   `gallery/generated/manifest.json` for the gallery pages. All displayed
   images remain at their canonical `/img/**` paths.
3. Next.js renders `/images`, each album page, and individual photo
   pages from that manifest.

The `/images` timeline groups all published images by calendar year. Individual
image and album metadata retains their more specific dates.

The gallery index sends a compact form of this manifest as page data and restores
its image fields for rendering. Photo pages only receive their navigation and
album context; folder and album pages receive the images they need.

The generated manifest is ignored by Git and recreated for every build.
GitHub Actions runs the gallery validation, generation, and site build on
pushes to `main` before publishing the static site.

## Command-line alternative

For one-off terminal uploads, use:

```sh
pnpm gallery:add ~/Pictures/photo.jpg --album my-trip --category travel
```

It creates the same quality-95 JPEG, strips metadata, and adds a Markdown
sidecar. The album must already exist in `gallery/albums.json`; `/upload` is
the easier way to create and organise albums.
