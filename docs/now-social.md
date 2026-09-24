# Now social directory

`src/data/now-social.json` supplies the `/now` page's friend and community
cards. Do not invent people, profile images, or websites.

Add a friend with a name and website URL:

```json
{ "name": "Name", "url": "https://example.com" }
```

Friend and community tiles always use pastel backgrounds and initials; do not
load favicons or other remote avatar images. Add a community with a name,
website URL, initials, and pastel `color`:

```json
{ "name": "Name", "url": "https://example.com", "initials": "NM", "color": "#d8edc8" }
```

The page's add and invite controls link to the GitHub edit screen for this JSON
file, so visitors can suggest entries through a normal repository change.

## Scrapbook updates

`/now` shows every published blog post tagged `now` in one newest-first
scrapbook feed that expands to fit its content. Do not replace the feed with an
older/newer pager or a nested scroll area. Individual `/now/<slug>` routes
remain available as canonical links to each update.

Friends and communities appear as three-column previews, capped at nine tiles.
Their `view all` controls open the matching centre view (`#friends` or
`#communities`), where lists larger than nine can be expanded. The top
navigation uses the same centre views; it does not navigate away from `/now`.

## Friend updates

The `/now` page also has an RSS or Atom tab for friends' recent posts. GitHub
Actions refreshes `src/data/friend-updates.json` every six hours and includes
the snapshot in the static export. It never fetches feeds in a visitor's
browser, so cross-origin restrictions and a failed feed cannot break the page.
Keep only the latest available item per friend, so frequent posters do not
crowd out people who post less often.

Feed discovery starts from a friend's website and checks its advertised feed,
then conventional feed paths. Add `"feedUrl": "https://example.com/feed.xml"`
to a friend when discovery needs an explicit URL. Run `pnpm refresh:friends`
to refresh the local snapshot; it fetches up to four feeds concurrently, while
reporting and skipping individual failures.
