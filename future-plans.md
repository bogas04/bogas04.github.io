# Future plans and website audit

Audit date: 27 November 2026. This is a working list, not a commitment to build
all of these. The site is a personal home for expression and ownership, so a
small, enjoyable addition is often better than another system to maintain.

The audit covers the repository, a local static build, the existing tests, and a
production-dependency advisory scan. It is not a penetration test, a complete
accessibility audit, or a field-performance study. Public response headers,
real devices, and external integrations were not independently tested.

## What to do first

1. **Reduce image loading on home and `/images`.** Both are heavy on a phone,
   and the image grid creates far more elements than are actually visible.
2. **Review and update vulnerable dependencies.** Prioritize the local image
   processing and build toolchain, then rerun the static build and authoring
   tests. See the exposure notes below before interpreting severity labels.
3. **Add tests for actually saving content.** `/write`, `/now`, and `/upload`
   do not yet have equivalent coverage for their important file-writing flows.
4. **Make authoring feel trustworthy.** Show exactly what is saved, what is
   still a draft, and what needs a rebuild or deployment.

## Performance

### Baseline, not a Lighthouse score

A local static build was opened in headless Chromium at 390 × 844, with a fresh
browser page and third-party requests blocked. The resource totals below are
encoded response bodies recorded shortly after load, not compressed CDN
transfer, Core Web Vitals, or a measurement on a real phone. They identify
where to investigate, not guaranteed visitor costs.

| Page | Observed resource bodies | Image elements in DOM | Observation |
| --- | ---: | ---: | --- |
| Home | ~24 MB | 104 | 70 images had loaded in this run. |
| `/images` | ~23 MB | 1,497 | 64 images had loaded; multiple copies of gallery views are mounted. |
| `/plays` | ~3.2 MB | 7 | Includes the screenshot collage and background. |
| `/blog` | ~7.8 MB | 22 | Listing imagery deserves a closer look. |
| `/now` | ~2.1 MB | 13 | Smaller, but still worth tracking as entries accumulate. |

The repository's `public/img` is about 151 MB, including about 97 MB of game
screenshots, and `.git` is about 316 MB. These are repository sizes, not what a
visitor downloads on a single page. Figures change as images are added.

### High priority

- **Render only the active gallery view and nearby mobile panes.**
  `src/components/gallery/GalleryCategoryFilter.tsx` mounts both desktop and
  mobile views, and the mobile track mounts every album plus the all-photos
  grid. CSS hiding does not remove the DOM or necessarily prevent image loads.
  Keep swipe, keyboard access, deep links, and scroll restoration intact; test
  changing viewport sizes too. Measure DOM size, image requests, and navigation
  smoothness before and after.
- **Generate genuinely small display variants.** Gallery thumbnails point to
  the same source files as the detail image. Produce responsive, metadata-free
  thumbnails for grids and cover cards, and serve larger variants for detail
  views. Keep existing original public asset URLs working. Decide whether
  generated derivatives belong in Git or only in the build before implementing.
- **Defer home travel images.** Inspect the travel carousels and photo stacks in
  `src/pages/index.tsx`: many are present before the visitor reaches travel.
  Load only the visible image and a small number of neighbors, without breaking
  keyboard navigation or causing layout shifts. Check whether hidden desktop
  and mobile variants initiate requests.
- **Re-measure the blog listing.** Identify which hero images account for the
  initial load and provide smaller previews or defer off-screen entries. Avoid
  breaking linked original images in posts.

### Follow-up

- The `/images` index now uses compact page data, but its size still grows with
  every photo. Keep the current static export, and consider year or album
  partitions only when measurements justify the added navigation complexity.
- Profile view transitions after reducing DOM and image work. Preserve the
  selected-photo animation, reduced-motion behavior, and back/scroll position.
- Establish a small repeatable performance baseline for home, `/images`, and
  `/plays`: request counts, page data, image bytes, LCP and interaction latency.
  Compare a real phone and a throttled connection, not only localhost.
- Consider Git storage separately from visitor performance. Smaller derivatives,
  history growth, and external asset hosting each have different tradeoffs.
  Preserve public image URLs and have a backup before changing hosting or Git
  history.

## Security and privacy

### Dependency advisories: investigate and update

`pnpm audit --prod --json` on the audit date reported 21 advisory entries: 3
critical, 6 high, 11 moderate, and 1 low. The installed versions were Next.js
16.3.5 and Sharp 0.35.3. Advisory counts and fixes are time-sensitive; rerun the
scan before acting. Examples:

- [Next.js ImageResponse advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)
  and [Next.js image optimization advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
  carry critical ratings for affected runtime features. This site is a static
  Pages Router export, so those labels alone do **not** establish that the
  public site exposes the vulnerable paths. Verify actual feature usage and
  development/build exposure before assigning a site-specific severity.
- [Sharp/libheif advisory](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c)
  and [Sharp/librsvg advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)
  matter to investigate for local and CI image processing. Sharp receives local
  authoring inputs; this audit did not establish that a particular input is
  exploitable in this workflow.

Update to compatible fixed releases after checking the advisory ranges and
Next.js migration notes; test HEIC, orientation, metadata removal, gallery
builds, static export, and local authoring. Do not assume one patch version
fixes every advisory. The scan covered production dependency classification,
not all developer dependencies or an independent supply-chain review.

### Boundaries worth keeping explicit

- **Local editor endpoints:** `scripts/local-authoring-server.mjs` binds to
  `127.0.0.1`, and production excludes the authoring pages. Its link preview
  rejects local/private destinations and checks redirects, but it performs DNS
  validation separately from the eventual fetch and calls `response.text()`
  before slicing the body. Review DNS rebinding, address classification,
  response-size limits, and cross-origin request handling. Treat this as a
  local-server hardening task, not a demonstrated public-site exploit.
- **Drafts are not private:** `docs/content-lifecycle.md` documents the
  intentional unlinked draft preview and deployed draft summaries. Images under
  `public/img` can also be reached directly even if an album is unpublished.
  Make these distinctions visible in authoring screens and never place secrets
  or confidential photos there.
- **Markdown and third parties:** blog rendering uses `remark-html` sanitization,
  while some React surfaces render generated HTML. Keep sanitization and URL
  handling covered by adversarial tests when changing the pipeline. GoatCounter
  and Utterances introduce third-party scripts; inventory them, review what
  they receive, and check production CSP and other headers at the hosting
  layer. This audit did not inspect live headers or prove an XSS issue.
- **Build and repository access:** the deployment workflow has repository
  write permission and publishes with a token. Review action pinning, least
  privilege, dependency updates, and the scheduled friend-feed fetches. Treat
  imported feed URLs and their content as untrusted. Do not add secret-backed
  Trello integration without deciding exactly what is published in the static
  output.
- **Recovery data:** local drafts can persist in browser storage. The UI and
  docs should keep explaining that recovery is local convenience, not private
  encrypted storage or backup.

## UX and reliability

- **Finish the authoring improvements.** The new album controls, search,
  deletion guard, and watcher help. Next, make `/write` and `/upload` clearly
  distinguish unsaved form edits, files written locally, drafts, and content
  actually deployed. Make errors and partial failures actionable. Add a
  keyboard-accessible document finder in `/write`, with a discoverable shortcut.
- **Remove uncertainty after gallery edits.** The watcher rebuilds the local
  manifest, but an already-open page still needs a refresh. Show progress or a
  reliable completion state, and consider a safe refresh affordance that
  preserves the current album and scroll position.
- **Improve test coverage where writing happens.** Current browser tests cover
  gallery navigation, `/plays` interactions, homepage work and travel, and
  uploader selection/deletion. `/write` only has a basic initial-state test;
  add create, edit, save, conflict and recovery tests. Cover `/now` authoring,
  uploading and publishing an image, generated feeds, and production exclusion
  of local editors. Run the appropriate tests in CI before deployment. Current
  mobile tests emulate a phone in Chromium, so also check real Safari and a
  physical controller.
- **Accessibility pass:** keyboard and screen-reader navigation across gallery
  panes, sticky headers, back controls, the work carousel, and local editors;
  visible focus and reduced-motion behavior; contrast of photo overlays; and
  meaningful alt text for imported game captures. Do not assume automated
  checks alone establish accessibility.
- **Blog discovery:** a lightweight search or better tag browsing could connect
  older technical writing, personal essays, and gaming. Keep RSS and Atom easy
  to discover and preserve existing routes. Do not force every thought into a
  polished long-form post.
- **Page-specific design stays intentional.** New slash pages should have a
  distinct reason and a visual direction chosen with Divjot; they need not all
  resemble the home page or become generic dashboards.

## Ideas for more ways to be yourself

These are subjective invitations, not categories you need to fill or projects
that must be maintained. They draw on the published essays, home page, `/now`,
and `/plays`; personal writing does not imply an obligation to disclose more.

### `/bread` or `/eats`: the bread multiverse

A playful map of things you insist count as bread, from rumali roti and bao to
pie and pasta, with little field notes from travels and vegan finds. Start with
five opinionated entries and your own photos, not a restaurant database. This
fits “Bread is life” and lets the humor arrive before the taxonomy. A wider
`/eats` could include food beyond bread if you want room to grow.

### `/sounds`: songs and the moments they belong to

Small, optional notes about a song, a feeling, or a time you finally let
something sound good to you. “Unusual feelings evoked by music” is less a list
of favorite albums than a story about subjectivity, so this could be a
personal listening diary without scores, rankings, or public listening history.
Link out rather than assuming audio files or embeds are available to publish.

### `/questions`: a cabinet of unfinished thoughts

A collection of questions you are sitting with, perhaps a few sentences each,
with space to revisit an answer and date the change. The questions about
belonging, authenticity, purpose, and whether an idea qualifies as a post are
already present in your writing. Give yourself permission to leave an entry
unfinished or private; this should feel like an invitation, not a demand to
perform vulnerability.

### `/places`: a memory atlas, not a travel résumé

Pair a photo with a specific sensory detail, a meal, a walk, or something a
place made you reconsider. “Living in Suwon, Korea”, the travel section, and
the impossible wish to move freely suggest stories richer than a pin count.
Reuse albums and avoid exposing precise locations or travel patterns unless you
choose to. Start with one place and a few memories.

### `/wishes`: the impossible bucket list that changes

Give the existing essay a living companion: wishes such as train travel, an end
to factory farming, and waking up under a giant planet, with a note about why
each matters. Let wishes change or disappear, and preserve previous versions
only if that feels meaningful. This could be a single illustrated page rather
than a tracker with deadlines.

### `/plays`, further along

The games page already has a personality. A future build-time Trello snapshot
could turn “My games” into an owned library, with years and dropped games as
previously discussed in `docs/plays-design.md`. More personal than a score:
add an occasional note on a memorable world, or connect a capture to the
moment it represents. Keep the board link as a fallback and never expose API
credentials in static output.

### `/making`: small tools, real annoyances

A shelf of things built because something was irritating or intriguing:
NSITUlator, the day planner, web experiments, and the lessons learned while
making them. Lead with the problem and the human story, then link code or a
technical write-up. This gives your engineer side a home without repeating the
work résumé.

## A sensible order

First reduce the initial image load and update vulnerable dependencies. Then
make authoring saves and failure states dependable and testable. After that,
prototype one expressive page with a handful of real entries, choosing the one
that sounds fun to maintain today. Revisit the others when they call for a
place of their own.
