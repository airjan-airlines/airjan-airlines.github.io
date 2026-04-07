# ui.md

## Design concept

A personal website that reads as a magazine cover and issue — TIME's authority
and structured grid, but worn as fashion. Every page is an edition. You are
the subject. The design earns the word "portfolio" without ever using it.

---

## Color

Base: off-white (#F5F0EB or similar warm newsprint tone).
Primary accent: TIME red — a single, disciplined red used only for masthead
elements, section labels, and key interactive moments. Never decorative.
Text: near-black, not pure black. Slightly warm.
No other colors. The photo and any data visualizations are the only other
sources of color on the page.

---

## Typography

Headlines: Didot or Bodoni-style high-contrast serif. The extreme thick-thin
stroke variation is the signature. Display sizes — 80px and above on the cover.
Body: A clean, tight serif for running text. Not a sans. Think NYT body copy
energy — readable but still editorial.
Labels / metadata: Small caps or tightly tracked uppercase in a geometric sans.
Used sparingly: dates, section names, issue numbers.
No monospace anywhere. This is not a dev portfolio that looks like a terminal.

---

## Cover (Home page)

The entire viewport is a magazine cover. Literal cover conventions:
- Masthead at top: your name, large, in the Didot serif, optionally with a
  thin red rule underneath.
- Issue line: a fake but serious issue identifier. e.g. "Vol. 1 — 2025" or
  "The Builder Issue." Set in small caps, muted.
- Cover photo: full-bleed or large portrait of you, positioned slightly
  off-center as magazine covers do — leaving room for cover lines.
- Cover lines: 3–4 short lines positioned around the photo like a real
  magazine cover. These are your stat highlights and current work, written
  as editorial teasers. e.g. "Reducing forecast error by 50%." or
  "500 downloads. Still building."
- A single red element: either the masthead underline, a thin red border,
  or one cover line in red. Not more than one use of red on the cover.
- On scroll or on a timed trigger: the cover "opens" — a page-turn or
  split animation that transitions into the interior of the site.

---

## Interior pages

Once past the cover, the site follows a magazine interior grid:

- 12-column grid, used seriously. Content doesn't just center in a max-width
  container — it occupies the grid with intention. Pull quotes, wide images,
  and text columns break into the grid at different widths.
- Section openers mimic magazine chapter pages: large section title,
  a short editorial descriptor, a thin rule, then content below.
- Running header: very small, top of every interior page. Issue line on the
  left, section name on the right. Like a book header. Disappears on scroll
  down, reappears on scroll up.
- Page numbers: visible in the corner, styled as a magazine would. Purely
  aesthetic but commits to the bit.

---

## Work section

The split Technical / Non-Technical layout is a two-column magazine spread.
Left column is Technical, right is Non-Technical, separated by a thin vertical
rule — the same way a magazine splits a feature across a spread.

Project cards are not cards in the UI-component sense. They are editorial
entries: a large numeral or label, a headline, a short deck (subheadline),
and a pull quote of the most interesting outcome. Clicking opens a full
feature-style detail page for that project.

Experience entries are typeset as short editorial profiles — 2–3 paragraph
narrative, not a bulleted list. The organization name runs large, your role
runs in italics beneath it.

---

## Research section

Treated as a long-form feature article. Drop cap on the first paragraph of
the plain-language abstract. A pull quote from the key finding, set large in
the Didot serif, spanning two columns. The technical abstract sits below in
smaller type, labeled clearly.

---

## Blog

The blog index is a magazine table of contents — each post has a title, a
one-line deck, a category label, and a page/issue number. Clean, vertical,
typographically driven. No thumbnails on the index.

Individual posts are typeset as magazine features: wide measure, generous
leading, drop caps optional per post, pull quotes for key passages.

---

## Skills graph

The one section that breaks the magazine metaphor intentionally. The graph is
a full-bleed dark panel — the only dark surface on the site. White nodes on
black, red edges for the strongest skill relationships. This contrast makes it
feel like an inset data visualization in an otherwise editorial publication,
which is exactly what TIME does with its data spreads.

---

## Interactions and animation

Cover open: the signature moment. On first load, the cover is static for 1–2
seconds, then either auto-advances or responds to a scroll/click. The
transition is a vertical split — the cover tears down the middle and the two
halves slide apart to reveal the interior. Or a page-curl. The agent should
implement whichever is more technically clean.

Page transitions: each section change is a horizontal slide, mimicking
turning a page. Fast — 200–300ms. Not slow and cinematic.

Cover lines: each cover line on the home page animates in sequentially on
load, as if being typeset in real time.

Hover states: project entries and blog posts lift slightly with a very subtle
shadow (the only shadow on the site). Cursor changes to a custom one —
a thin crosshair or a simple circle, replacing the default pointer.

Scroll behavior: the running header fades in/out based on scroll direction.
Section titles pin briefly as you enter a section, then scroll away.

Generative element: one optional ambient animation — a very slow, extremely
subtle paper texture or grain overlay on the cover only. CSS or canvas. Should
read as photographic grain, not noise. If it adds load time, cut it.

---

## Responsive

Mobile is a single-column magazine. The cover still works as a cover — the
photo crops to portrait, the masthead stays large, cover lines stack below the
photo. Interior pages drop to single column. The grid simplifies but the
typographic hierarchy stays intact. Page-turn transitions become vertical
swipes on mobile.

---

## What to avoid

- No glassmorphism, no gradients, no dark mode toggle (the site has one mode:
  warm newsprint).
- No card components with rounded corners and drop shadows everywhere — the
  design system uses rules, columns, and type hierarchy instead.
- No sans-serif body text.
- No hero sections with a centered headline and a button below it.
- No skill bars or percentage indicators.
- The red accent must stay disciplined. If it appears more than 3–4 times on
  any given page, it has been overused.