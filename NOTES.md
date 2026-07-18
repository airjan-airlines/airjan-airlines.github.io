# Redesign notes — review before merging

Branch: `redesign-2026`. Everything below needs your eyes before this is true
enough to publish.

---

## 1. Prose I drafted — every line here is mine, not yours

You chose "draft prose, mark it clearly." This is the complete list. None of it
came from your resume; all of it is inference from your resume plus your essays.
**Read each one and either accept it or rewrite it in your own voice.**

### `data/resume.ts`

| Field | Where it shows | Risk |
|---|---|---|
| `thesis` | Home, lead headline | **Now adapted from your own LinkedIn bio**, not drafted by me. Trimmed to the greeting plus the representation-learning / time-series line. |
| `standfirst` | Home, opening paragraph | **Also from your LinkedIn bio**, trimmed to current work plus the "still figuring out what to specialize in" line. The resume-listing of ForgeQB / health department / Harvard is dropped here, since each has its own page. |
| `statsHighlights` | Cover lines | Reworded. |
| `appointments[].deck` | Research, pull quotes | 4 drafted one-liners. The Theorem one ("If a language model writes the specification, who checks the specification?") is the most editorializing. |
| `appointments[].narrative` | Research, body copy | 4 drafted paragraphs. **These contain interpretive claims your resume does not support** — see §2. |
| `internship.narrative` | Engineering, Industry section | Says the mortality brief "went to county leadership as a decision document." Your resume says you *drafted* a brief for county leadership. Verify it was actually delivered/used. |
| `projects[].deck` | Engineering | 5 drafted one-liners. |
| `projects[].pullQuote` | Engineering | setos.ai quote ("The hard part was never retrieval. It was knowing when to stop.") is invented — it's a plausible reading of the kneedle-algorithm bullet, but you never said it. |

### Page-level copy

- `app/page.tsx` — the **"Now"** and **"Open to"** blocks are now written from
  your LinkedIn bio rather than my inference. Note the old site said
  "co-founder opportunities" under Open To; I dropped that. Put it back if you
  still mean it.
- `app/interests/page.tsx` — the "Offline" paragraph, including *"being bad at
  something in public, repeatedly, until I wasn't."* Pure invention. Replace if
  it doesn't sound like you.
- Section decks on every page (`SectionOpener deck=`): Research, Engineering,
  Writing, Interests, Archive. All drafted.
- `app/not-found.tsx` — "This page was never printed."

---

## 2. Interpretive claims worth a second look

These read as fact on the page but are my inference:

- **MIT:** "nobody hands you the ground truth for what regime you are currently in."
- **JHU:** *"It mostly generalized, until frequency got involved."* — I inferred this
  from your bullet about DeepONet limitations on high-frequency signals. If the
  cross-material results were actually weak, this sentence is wrong.
- **Harvard:** "a relationship nobody had written down." Your resume says "novel."
  I escalated that to a novelty claim in plain English. Defensible, but stronger.
- **Fort Bend:** "the baseline lost by a wide margin" — from "reducing RMSE by
  over 50%." Fine, but it's my phrasing of your number.

---

## 3. Facts from your LinkedIn bio that were NOT in the resume

Your bio contained three things `new-resume.txt` does not, now reflected on the site:

- **CS double major.** `profile.degree` is now "B.A. Data Science and Computer
  Science". Your resume says Data Science only. **Update the resume.**
- **MIT AI Safety Fundamentals Fellowship.** Mentioned in the home standfirst,
  but it has *no entry on the Research page* because I don't have dates, a
  location, or bullets for it. Give me those and it becomes a proper entry.
- **The ForgeQB outreach videos.** Now the ForgeQB pull quote, close to verbatim,
  replacing a line I had invented.

### One conflict to resolve

**ForgeQB post views: your resume says `24k+`, your LinkedIn bio says `26K+`.**
The site currently shows **24k+** in the stat row, following the resume. The pull
quote deliberately omits a number so the two don't contradict each other on the
same page. Pick one and I'll make them agree.

Also note your bio says "close to 500 downloads" where the resume says "500
downloads"; the site uses 500.

---

## 4. Factual corrections I made

Changes to the *content* of `new-resume.txt`, made deliberately:

- **`ASCL` → `ACSL`.** Frama-C uses ACSL (ANSI/ISO C Specification Language).
  Assumed transposition typo. **Fix this in your actual resume PDF too.**
- **`nueral operator` → `neural operator`** (typo in resume, line 17).
- **`Febuary` → `February`** (typo in resume, line 64).
- **ForgeQB team size: 5 → 4.** Old site said 5 developers, new resume says 4.
  I used the resume. Only one can be right.
- **Quizbowl club dates: `2022 - Present` → `2022 — 2026`.** You're at Berkeley;
  "Present" for a high-school club no longer parses.
- **"Founder" restored on ForgeQB** per your note, as the first bullet. The
  pull quote no longer says "Still building," and the home page labels it
  "Selected project" rather than "Shipping," since you're not actively on it.
  Its `duration` still reads "Feb. 2025 - Present" in `data/resume.ts`. Change
  that if "Present" overstates it.

---

## 5. Structural decisions

- **Nav is now 4 sections** — Research, Engineering, Writing, Interests — per your
  call. Research holds the four appointments. Engineering leads with Fort Bend
  under an "Industry" heading, then the five projects.
- **High-school leadership → `/archive`**, linked from the home Contents rail and
  the footer. Nothing was deleted.
- **Skate-Tracker kept** even though it's absent from your new resume, per "keep
  the content that isn't addressed." If it was dropped on purpose, delete it from
  `projects` in `data/resume.ts`.
- **Both essays untouched.** Content, dates, and URLs unchanged.

### Breaking route changes

| Old | New |
|---|---|
| `/technical` | `/engineering` |
| `/experience` | `/research` (+ Fort Bend on `/engineering`) |
| `/nontechnical` | `/archive` |

`/blog` and `/blog/[slug]` are **unchanged**, so your two shared essay links still
resolve. There's now a real 404 page for the rest.

**I removed `/technical/[slug]` — the per-project detail pages.** Reverse this if
you disagree. Reasoning: the new `/engineering` index already renders everything
those pages showed (deck, all bullets, stats, stack, pull quote), so a detail page
would be the same content at a second URL. Per-project deep links are preserved as
anchors instead — every project has `id={slug}`, so `/engineering#forgeqb` works and
the home page links that way.

The tradeoff: no dedicated per-project page to send someone to, and no room to
expand a project beyond what fits the index. If you want to write longer project
write-ups later, that route should come back. Recover the old version with:
`git show 2e260ae:app/technical/\[slug\]/page.tsx`

---

## 6. Copy rules now enforced

From the `design-taste-frontend` skill, applied across every visible string:

- **Em-dashes and en-dashes are gone** from all site copy. The skill calls the
  em-dash the single most-violated AI tell and bans it outright. Date ranges use
  hyphens; sentences were restructured with periods, commas, and colons.
  **Your two essays were deliberately left alone** (36 and 2 em-dashes) since
  that's your own writing and the skill says preserve author voice.
- **Middle-dot separators rationed** to at most one per line. They were doing all
  the joining work before (`Python · PyTorch · Docker`); stacks and skill lists
  are now comma-separated.
- **Colophon line removed** from the footer ("Set in Bodoni Moda and PT Serif").
  Performative-craftsman tell.
- **Section numerals removed** from page headers. They were decoration; the
  numerals in the home Contents rail already do that job.
- **Arrow-suffixed link labels** ("Read →", "Visit ↗") replaced with plain text.

Two things I kept **against** the skill's default advice, because your own
`planning_docs/ui.md` explicitly asks for them: the fake magazine page numbers on
the Writing index, and the large entry numerals. Say the word and they go.

---

## 7. Design changes

Kept: warm newsprint, Bodoni display, single red, the cover that splits into
TIME | LESS, the magazine grid.

Changed:
- **Scroll was broken.** `body` had `overflow-hidden` with content in a
  `fixed inset-[10px]` scroll container. That breaks mobile viewport behavior and
  scroll restoration. Now normal document flow.
- **Red desaturated** `#E31837` → `#C8102E`, and the 4px border is now a hairline.
  Reads considered rather than loud.
- **Real type scale** — fluid `clamp()` ramp replacing arbitrary jumps between
  `text-3xl` and `text-8xl`. Body text capped at 65ch.
- **Motion** — springs with `bounce: 0` replacing `easeInOut` everywhere;
  `prefers-reduced-motion` fully honored (the cover split is skipped entirely).
- **No drop shadows on hover**, per your note. Entries now highlight in red with
  a hairline rule that draws under the title. The `--shadow-lift` token is gone;
  nothing on the site casts a shadow.
- **Nothing shows outside the trim.** Solid bands cover only the margin between
  the viewport edge and the red rule (8px, 16px at md), layered above the page
  but below the frame, so scrolling text is clipped exactly at the border. Note
  there is still a small gap between the trim and the running header where text
  passes behind the header's semi-transparent background; say if you want that
  closed too.
- **Health department leads Engineering** under an "Industry" heading, above the
  projects.
- **The cover no longer holds you hostage** for 3.5s. Click, scroll, or key opens
  it; auto-advance is now a 5.2s fallback.
- **Navigation on every page.** Previously nav existed only on the home page —
  every interior page was a dead end.
- Added: focus rings, skip link, semantic `<main>/<nav>/<footer>`, OG/Twitter
  metadata, per-page titles, reading time on essays.

---

## 8. Motion decisions (design-motion-principles, Create mode)

Weighting for a creative portfolio: **Jakub primary** (production polish),
**Jhey secondary** (a portfolio is allowed a signature moment), Emil selective.
Both new animations fire once per visit, so the frequency gate permits
expressive motion here. It would not on a tool someone uses daily.

**Page turn between entries** (`components/PageTurn.tsx`, Research + Engineering)

- Triggered at a scroll *position* with a fixed duration, not scrubbed to scroll
  progress. The cookbook is explicit that scrubbing ties the animation to scroll
  speed, so a slow scroll plays a slow mushy turn. Position-triggered always
  turns at the same rate.
- Rotation is **14deg, not 90**. A literal page flip is a vestibular trigger and
  would hide the text mid-turn, which is hostile on a page someone is reading.
  Shallow rotation from a left-edge origin still reads as paper on a spine.
- 620ms, slightly over Jakub's 200-500ms polish band. Deliberate: this is the
  Jhey-weighted signature moment, and a turn that lands too fast reads as a
  glitch rather than a page.

**"Next" control.** You asked for scroll or a button, so it has both. It is a
real anchor, not a scroll handler, so it works without JS, is keyboard-operable
for free, and honours the reduced-motion override on `scroll-behavior`. It also
does real work: it's a way through a long page, not decoration.

**First-load typeset** (`components/Typeset.tsx`, home)

Two departures from the literal spec, both deliberate:

- **Characters are revealed, not appended.** Appending reflows the paragraph on
  every keystroke and shifts the whole page below it. Revealing pre-rendered
  characters costs one paint and zero layout.
- **No blinking caret**, even though that's the usual typewriter tell. A caret
  reads as a terminal, and your own `ui.md` says "no monospace anywhere, this is
  not a dev portfolio that looks like a terminal." Without it the effect reads
  as type being set, which is the actual magazine reference.
- **Per-character on the two short display lines, per-word on the paragraph.**
  Per-character on 250 characters of body copy takes about four seconds and
  nobody waits. All three blocks start at the same instant, so the page sets
  itself at once as you asked, finishing in roughly 1.2s.
- **First load only.** Gated on the cover being dismissed this session, so
  repeat visits render instantly. Reduced motion renders instantly too.
- The server renders the **plain, complete text**; the split spans only exist
  client-side. So search engines and no-JS visitors get clean markup, and screen
  readers get one sentence via `aria-label` rather than 200 separate spans.

If the typing turns out to be annoying in practice, delete the `play` prop at
the three call sites in `app/page.tsx` and it reverts to static text.

---

## 9. Things I could not verify

- **`forge-qb.com`** — I linked it as `https://forge-qb.com`. Untested.
- **`metadataBase`** is set to `https://airjan-airlines.github.io` from your git
  remote. Change it if you point a custom domain at this.
- **The cover photo is now the graduation frame**, which is a far better cover
  image than the bridge: rim light against deep shadow survives grayscale, and
  you stand at ~36% across, left of the seam, so the split tears beside you
  rather than through your face. The crop puts your head near 60% of the
  viewport, below the masthead at every width.

  **It is only 880x1168.** On a 1440px viewport that upscales about 1.6x, which
  the grain overlay will partly disguise but will not fix. **Send the original
  file** if you still have it; it is the one thing standing between this cover
  and looking properly sharp.

  Because the frame is dark, the masthead is now cream rather than red (red on
  near-black fails contrast), and the cover reads as a dark object that tears
  open onto bright paper. That is a deliberate break from the warm-newsprint
  system and the most reversible thing here if you dislike it: `fill-base` back
  to `fill-accent` in `Cover.tsx`, and restore the multiply blend.

  The bridge photo is unused now. I removed it from `public/` (it was 3MB of
  dead weight) but the original is untouched in `site_images/`.
- **The TIME masthead.** Worth a conscious decision: the site uses TIME's
  wordmark and signature red border. As a personal homage it's very unlikely to
  be a problem, and the TIME | LESS split is the best idea in the design. But
  it is a real publication's identity, so it's your call to make knowingly
  rather than by default.
- **I did not view the rendered pages.** Build, typecheck, lint, route
  generation, and CSS output are all verified; the actual visual result is not.
  Run `npm run dev` and look at it — particularly the cover split alignment at
  various widths, which is the most fragile piece.
