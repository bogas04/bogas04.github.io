# Technical principles

## Styles live with markup

Prefer Tailwind utility classes over additions to `src/app.css`. Keep a
component's markup and its styling close together, so its visual behaviour is
easy to see and change in one place.

Reserve global CSS for genuine global concerns such as resets, base typography,
shared tokens, or styling that Tailwind cannot express cleanly. Do not move
component specific styling into `app.css` by default.

## Use the platform

Start with semantic HTML and modern browser features before adding custom
JavaScript or recreating native controls. Use the appropriate element for the
meaning and interaction, then enhance it where needed.

Examples include scroll snapping for carousels, View Transitions for navigation,
and native popup or dialog behaviour when they fit the interaction.

## Progressive enhancement

Build a useful core experience that works without an optional enhancement.
Enhance it for browsers with Baseline support rather than blocking the feature
on older or unusual browsers. Preserve working navigation, readable content,
and usable controls if JavaScript, View Transitions, scrolling enhancements, or
other optional browser capabilities are unavailable.
