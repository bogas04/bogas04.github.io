# /plays

`/plays` is Divjot's place for games. It evokes the modern Xbox dashboard: a
full-screen image from his published screenshots, a row of square tiles and a
bright focus glow. It is distinct from the homepage despite sharing some Metro
influence. Use published screenshots rather than invented game covers.

On larger screens, the selected tile expands to 2×2 while the others remain
1×1. They share a fixed-height, bottom-aligned row so selection does not move
content below. On phones, take cues from the Xbox mobile app: a wide featured
games tile sits above three compact shortcuts. Keep the layout within the
viewport and avoid resizing tiles on focus.

The tiles link to the games board, captures, gaming posts and achievements.
The My games tile uses published screenshots and links directly to the Trello
board without displaying its name. Do not embed the board or invent a game list.
A custom yearly list and dropped games may be considered later.

### Possible Trello integration

In the future, fetch the board during a scheduled build and generate a public
snapshot for a native games library, potentially grouped by year with dropped
games last. First inspect how the board represents years and statuses. If API
credentials are needed, keep any token in GitHub Actions secrets and publish
only the intended game data. Preserve the last successful snapshot if Trello
is unavailable. This is a future option, not an implemented workflow.

A brief splash appears at most once per local calendar day per browser, using
localStorage. If storage is unavailable, it may appear on each visit. The
splash presents the profile picture, name and page name. They move into
the header with a View Transition where available. The splash must not prevent
interaction, trap focus or remain visible if scripts fail. Skip it for reduced
motion and fall back gracefully when View Transitions are unavailable.

Show confirmed gamer IDs in Xbox, PlayStation, Steam order. Do not assume a
display name is a public profile URL or display a live score without verifying
its source and update behaviour. The TrueAchievements address still needs
verification because its security check blocked inspection.

Touch, keyboard and standard-mapped gamepads must work independently. On a
controller, the D-pad or left stick moves focus and A activates the selection.
Do not steal focus on load. Keep focus indicators visible and respect reduced
motion. Browser tests for these behaviors live in `tests/e2e/plays.spec.ts`;
physical controller testing remains useful across browsers and devices.
