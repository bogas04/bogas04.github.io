# Local authoring roadmap

`/write` and `/upload` use the browser File System Access API to edit a local
repository after the author grants a directory handle. They are development only
and intentionally return 404 in production. See
[Content authoring](content-authoring.md) for current behaviour.

Both editors protect unsaved form changes. They show an unsaved state, warn
before a tab closes, and store a local recovery snapshot in browser storage.
After a crash or accidental tab closure, the editor offers to restore or discard
that snapshot.

Recovery snapshots never write Markdown or gallery metadata to the repository.
The author must choose Save to write the restored work. `/upload` applies this
to album and image details; image uploads remain an explicit file action.

The recovery data belongs to the browser profile and device that created it. It
is not a backup, sync service, or private store for confidential content.
