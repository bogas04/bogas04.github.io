# Content lifecycle

Manual content changes are fully supported. `/write` and `/upload` are optional
local editors that make authoring more convenient, not exclusive content paths.

Draft blog posts must stay out of normal deployed blog routes, archives, tags,
RSS, Atom, sitemaps, and discovery metadata. Local development intentionally
shows drafts. The deployed site's intentional exception is the unlinked
`/blog?be-more-vulnerable=1` preview. It loads an unlinked static draft summary
file so someone who knows the route can see the draft list.

This is obscurity, not privacy. Draft metadata is deployed in the static export,
and draft content may be reachable through its source link. Do not expose the
preview from normal navigation, feeds, or a sitemap. Do not use it for
confidential writing.

Gallery publication has its own explicit state: an album and each image must be
published before appearing in gallery pages. The source image remains publicly
reachable under `/img/**` after deployment regardless of gallery publication.

For the complete blog and gallery authoring formats, local editor behaviour, and
gallery build flow, read [Content authoring](content-authoring.md).
