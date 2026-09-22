# Build and deployment

The site uses Next.js static export and Tailwind. Static export is intentional:
it keeps hosting simple and avoids ongoing server costs.

GitHub Actions is the only deployment path. A push to `main` validates and
builds the gallery, builds the static site, generates the output, and force
publishes it to the `gh-pages` branch. Cloudflare serves the configured public
domain.

There are no preview deployments and the author commonly merges directly to
`main`. Do not introduce a server dependency, runtime API, or deployment path
without the author's explicit approval.

`pnpm build` runs gallery validation and generation before the site build. The
site build also produces the RSS, Atom, and sitemap output. Use focused checks
for the changed area and run the integrated build when practical.
