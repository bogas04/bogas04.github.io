# Home page design

The home page is Divjot's personal space, not a generic portfolio template. It
should feel bold, playful and unmistakably personal, with room for work,
travel, education and other parts of life. Keep the author's quirky voice and
specific stories. Refine grammar without sanding away personality.

This direction applies to `/` only. Other routes have their own inspirations;
see [Design direction](design-direction.md). Do not treat this as a site-wide
component system.

## Visual language

- Take cues from Windows Phone and Metro: strong blocks of colour, square edges,
  confident type, generous scale and straightforward interactions. The work
  carousel also takes inspiration from iPod Cover Flow.
- The sections have their own strong backgrounds: purple for the introduction,
  charcoal for work, yellow for travel, pink for education, green for talks
  and blue for social links. Preserve the contrast between sections.
- The display serif used for “divjot” and the section headings is Newsreader.
  Manrope provides bold titles and readable UI; DM Mono is used sparingly for
  utility details. Mix type to establish hierarchy, not to decorate every line.
- Section boundaries slope at different angles. Keep the contents and sticky
  headings level. Do not add rectangular shadows that cut across the slants.
- Prefer square corners and simple shapes. A slightly rotated or offset
  background can add character, as in travel and education. Do not substitute
  hard borders and offset shadows when a rotated background is intended.
- The slanted yellow marker highlights in work can draw attention to key facts
  and links. Keep contrast high and avoid highlighting so much that nothing
  stands out.
- Avoid generic, polished portfolio patterns: repeated numbered editorial
  cards, decorative labels and taglines, uniform grids with only background
  variations, or rounded cards that weaken the site's character. Variation
  should come from hierarchy, layout and content, not random colours.

## Introduction and navigation

Keep the personal introduction conversational. The navigation is a Metro poster
layout with icons, labels and short subtitles. On the two-column layout, Now
and Blog share a row, Images and Plays share the next row, and LinkedIn and
GitHub stay paired. The layout should also work when the number of links changes. Keep the
navigation tiles in a consistent colour family rather than assigning each a
new colour.

## Work

The charcoal background lets the company colours stand out. Use an edge-to-edge,
horizontally snapping Cover Flow carousel: the centred role faces forward and
neighbours angle away. Roles run from older on the left to newer on the right,
with the latest role initially centred. Cards should have matching heights.
Off-centre cards are grayscale; avoid colour changes on hover that make a
company appear to change identity, and avoid translucent cards whose overlaps
create distracting patches.

The year ruler runs left to right with visible markings. Selecting a year finds
the most recent role active then, or the closest available role. The undated
question-mark tile follows the latest role and links to LinkedIn; it is not a
job or a point on the year scale.

Highlights expand inline into a full-width reading view, not a dialog. On
large screens the role information, major achievements and Udaan management
sit on the left, with work details on the right. Keep hierarchy clear between
company, role, duration, website, summary and details. Sticky content needs
space below the section heading and must not obscure the close control. On
mobile, stack content and place the duration length on its own line.

The highlights action is a prominent button. Close returns to the carousel and
brings it into view. Scrolling past the expanded view collapses it without
pulling the reader back up. Preserve shareable `?work=...#work` URLs and browser
history; see [URL compatibility](url-compatibility.md). Use View Transitions
where available, respecting reduced-motion preferences and avoiding misplaced
or flashing elements.

## Travel

Keep the map and destination browsing, with a mobile-friendly photo layout.
Tiles and photos have square corners. Light, subtly rotated backgrounds add a
loose, cut-paper feel on the yellow section; they are not brutalist outlined
boxes. Keep destination text readable and map controls accessible.

## Education

Show NSIT before St. Mary's. Each institution has its name, academic facts,
achievements and website on the left, with a personal account as a prominent
serif blockquote on the right. Stack them on smaller screens. A subtly offset,
rotated background can distinguish the quotation. Preserve meaningful facts
and links; don't replace the section with a programming-language inventory.
The accounts should sound like the author, with specific memories rather than
generic inspirational copy.

## Talks

Talks use the green section and bold, square poster-like treatments that relate
to the home navigation. Soft cream, sage, blush and lavender sit over darker green, subtly rotated
offset backgrounds, with deep green text to keep them readable. Give titles and imagery prominence; keep the talk,
event and recording links distinct and clear. Scale the layout down to mobile
without losing content. Avoid reverting to numbered editorial cards or adding
arbitrary visual decorations.

## Across screen sizes

Keep content legible without hover, preserve keyboard focus and semantic links
and controls, and respect reduced motion. Test the actual mobile layout as well
as desktop. Avoid layout shifts, unwanted scroll jumps and controls that get
lost behind sticky elements. Prefer the platform and Tailwind styles colocated
with markup, as described in [Technical principles](technical-principles.md).
