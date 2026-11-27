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

Home page work highlights can be linked with `/?work=<company>#work`. The
supported identifiers are `udaan`, `swiggy`, `samsung`, `housing`, `fizzy`,
`refiral`, and `frrole`. Keep these identifiers stable even if role data or
presentation changes. Unknown identifiers leave the carousel closed. Other
query parameters are preserved when highlights open or close.

`/stats/` is a static redirect to `https://bogas04.goatcounter.com/`. It uses
a meta refresh and a fallback link because the site is statically exported.
It is excluded from the sitemap.
