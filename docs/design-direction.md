# Design direction

The site is intentionally not one visual system applied everywhere. Each public
surface can evoke a different remembered web experience while remaining usable
and accessible.

Current directions:

- Home page: bold colour and personal presence.
- Blog: easy reading takes priority.
- Image gallery: Metro or Windows Phone inspired presentation.
- `/now`: an early Orkut scrapbook. Use a blue utility header, pink Orkut-like
  wordmark treatment, compact Arial typography, thin blue borders, black and
  gray body copy, small beveled controls, a left profile rail using
  `public/profile.png`, and compact friend and community cards. Keep the actual
  update content readable and retain its canonical `/now` and `/now/<slug>`
  routes. On desktop, scale this intentionally small-screen-inspired surface
  to 140% so its 1,008px canvas uses roughly 1,410px on a modern display; do
  not make the recreation feel miniature. See [Now social directory](now-social.md)
  for the data-backed right rail.

For every new route, ask the author for its intended visual style before making
design decisions. Helpful prompts can include Hi5, old Facebook, Orkut,
Windows Vista or Aqua skeuomorphism, and Microsoft Office ribbon design, but do
not assume any of them apply.

Record the selected inspiration, interaction constraints, and accessibility
choices in a narrow route or feature document when the route is added.
