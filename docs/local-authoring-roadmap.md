# Local authoring roadmap

`/write` and `/upload` use the browser File System Access API to edit a local
repository after the author grants a directory handle. They are development only
and intentionally return 404 in production. See
[Content authoring](content-authoring.md) for current behaviour.

Unsaved work protection is a required future feature, especially for `/write`.
The author has lost a blog post after closing a tab with unsaved work.

When implementing it, cover:

- an obvious dirty and saved state;
- a warning before closing or navigating away from unsaved edits;
- local browser recovery after a crash or accidental tab closure;
- a recovery path that does not overwrite the Markdown file without the
  author's intent; and
- equivalent consideration for gallery metadata and uploads in `/upload`.

Document the chosen storage model, recovery UX, and cleanup policy in a focused
document alongside the implementation.
