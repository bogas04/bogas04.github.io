# Image privacy

Images are published from `public/img`, so treat every committed image there as
public once the site deploys.

- Preserve the existing sanitisation workflow that removes embedded metadata and
  bakes orientation into pixels. The technical workflow is documented in
  [Content authoring](content-authoring.md).
- Use the existing gallery validation and staged image checks when relevant.
- Do not perform subjective content review of photos. Albums distinguish the
  context; the author decides whether content needs redaction.
- Do not add original, unsanitised image files to public paths.
