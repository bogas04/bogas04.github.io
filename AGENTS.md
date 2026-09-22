<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bogas04.fyi agent guide

This is an evolving personal website for its author to own and express their
digital identity. It is a home for personal and work writing, image galleries,
portfolio material, and future facets that do not need to live on corporate
platforms. Read [Project purpose](docs/project-purpose.md) before making a
product decision.

## Working rules

- Treat public URLs, documents, images, and feeds as compatibility contracts.
  Do not knowingly break them. Read [URL compatibility](docs/url-compatibility.md)
  before changing a route, slug, asset path, RSS, or sitemap behaviour.
- Before reviewing or editing blog prose, read
  [Editorial review](docs/editorial-review.md). Preserve the author's voice.
- Before changing image handling, read [Image privacy](docs/image-privacy.md).
- Before changing a public content surface, read
  [Content lifecycle](docs/content-lifecycle.md). Drafts must stay out of the
  normal public experience, feeds, and discovery surfaces.
- Before changing `/write` or `/upload`, read
  [Content authoring](docs/content-authoring.md) and
  [Local authoring roadmap](docs/local-authoring-roadmap.md).
- A new route has no assumed visual style. Ask the author which remembered web
  style it should evoke before designing it. Read
  [Design direction](docs/design-direction.md).
- Before changing markup, styles, or browser interactions, read
  [Technical principles](docs/technical-principles.md).
- Treat documentation as code. Create or update the narrow document covering a
  new route, feature decision, or enduring prohibition in the same change. See
  [Documentation policy](docs/documentation-policy.md).
- This site is statically exported and deployed by GitHub Actions on pushes to
  `main`. Read [Build and deployment](docs/build-and-deployment.md) before
  changing build or hosting behaviour.

## Change gate

Before handoff, review the change for broken links, RSS or Atom feed regressions,
broken images, unintended draft exposure, and offensive or insensitive published
prose. Run the relevant focused checks; `pnpm build` is the integrated static
site and gallery validation build.
