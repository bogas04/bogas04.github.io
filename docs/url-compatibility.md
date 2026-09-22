# URL compatibility

Anything publicly reachable is a compatibility contract. Do not knowingly break
existing routes, blog permalinks, image URLs, documents, RSS or Atom feeds, or
sitemap entries.

Prefer retaining a route, slug, filename, or public asset path. Do not rename
existing content solely for tidiness. Recently created and unlinked work has a
lower compatibility risk, but check its references in the repository first.

If changing a route is unavoidable, determine whether it is already used before
choosing a compatibility plan. Inspect repository references and, when useful,
consult [GoatCounter](https://bogas04.goatcounter.com/) for traffic. Ask the
author before introducing redirects or changing the static hosting strategy.

After route or content changes, verify the affected links, generated RSS and
Atom feeds, sitemap, and linked images.
