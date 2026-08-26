# Blog image generation prompts

One entry per `BlogImagePlaceholder` on the site. Each block is copy-paste ready
for ChatGPT (or any image generator). Generate, then save to the `src` path shown
and replace `BlogImagePlaceholder` with `next/image` at the same width and height.

## House style — applies to every image

These rules exist for search and answer-engine reasons, not only aesthetic ones.

- **No text of any kind.** No words, letters, numbers, labels, captions, or
  signage. Generators mangle text, and mangled text in an image is worse than no
  image. Every diagram that needs labels is already an HTML table in the article
  body — the image sits beside it as illustration, never as the data itself.
- **Brand palette**, taken from `tailwind.config.js`:
  - deep navy `#0a2342`
  - darker navy `#0d3060`
  - burnt orange `#b45309` (accent — use sparingly, one focal point)
  - amber `#f59e0b`
  - sky blue `#0ea5e9`
  - pale blue `#e0f0ff` (backgrounds)
- **Style:** flat vector illustration, minimal and clean, generous negative space,
  no gradients heavier than a single soft wash, no drop shadows, no 3D rendering,
  no photorealism.
- **Context:** Indian aviation training. Where people appear, show South Asian
  students and instructors, modest professional clothing, single-engine training
  aircraft rather than airliners unless the subject calls for one.
- **Composition:** subject centred or on a clear thirds line, ample margin so the
  image survives cropping to a card thumbnail.
- **Export:** WebP, quality 80–85, at exactly the pixel dimensions given.

Append this to every prompt below:

> Flat vector illustration, minimal clean style, deep navy #0a2342 and pale blue
> #e0f0ff as the base palette with burnt orange #b45309 as the single accent,
> Indian aviation training context, generous negative space, absolutely NO text,
> words, letters, numbers or signage anywhere in the image.

---

## Post: `/blogs/what-is-pilot-training-complete-guide`

### Prompt 1 — Hero / OpenGraph
- **File:** `public/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp`
- **Dimensions:** 1200 × 630 (also serves as the OG card)
- **Alt text already set in code:** "An Indian student pilot moving from a ground-school classroom desk to the cockpit of a training aircraft, shown as a single continuous journey"

> A single continuous scene split left to right: on the left, a young South Asian
> student seated at a classroom desk with charts and a flight computer; on the
> right, the same student in the cockpit of a small single-engine training
> aircraft, hands on the controls. The two halves flow into each other rather than
> being separated by a hard line. Wide horizontal composition with sky above.

### Prompt 2 — Licence ladder
- **File:** `public/blog/what-is-pilot-training/licence-ladder.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Four ascending steps representing the progression from Student Pilot Licence through Private and Commercial to Airline Transport Pilot Licence"

> Four ascending steps or platforms rising left to right, each slightly higher than
> the last. A small aircraft silhouette sits on each step, growing progressively
> larger and more capable from a light trainer on the first to an airliner on the
> fourth. The fourth step is marked out with the orange accent. No labels — the
> progression is conveyed by height and aircraft size alone.

### Prompt 3 — PPL vs CPL
- **File:** `public/blog/what-is-pilot-training/ppl-vs-cpl.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "Two runways diverging from a single starting point, one leading to a small private aircraft and the other to an airliner"

> Two runways diverging from one shared threshold in a shallow Y shape, seen from
> a high angle. The left runway ends at a small private single-engine aircraft
> parked on grass; the right runway ends at a commercial airliner at a terminal
> gate. Equal visual weight to both paths — neither is presented as superior.

### Prompt 4 — Flying hours composition
- **File:** `public/blog/what-is-pilot-training/flying-hours-composition.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "A single large circle containing four smaller nested segments, showing that command, cross-country, instrument and night flying all sit inside one total rather than adding to it"

> One large circle containing four smaller shapes nested entirely inside it,
> clearly contained rather than stacked or added alongside. The largest inner
> shape occupies about half the circle; the others are progressively smaller. The
> containment relationship must read instantly — nothing sits outside the outer
> circle. Orange accent on the outer ring only.

### Prompt 5 — Training timeline
- **File:** `public/blog/what-is-pilot-training/training-timeline.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A horizontal path running from a school building through a classroom and a training aircraft to a licence document, marking the stages of pilot training"

> A horizontal winding path or ribbon running left to right across the frame,
> passing four simple icon-like waypoints in order: a school building, a
> classroom desk with a stethoscope beside it, a single-engine training aircraft
> in flight, and a certificate document. The path thickens slightly at each
> waypoint. Orange accent on the final waypoint.

### Prompt 6 — Cost buckets
- **File:** `public/blog/what-is-pilot-training/cost-buckets.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Three containers of clearly different sizes side by side, the largest representing flight training costs and the smallest representing ground and documentation"

> Three simple containers or vessels standing side by side on a level surface, in
> clearly different sizes. The centre one is dramatically the largest — roughly
> five times the volume of the smallest. The smallest sits on the left, a
> medium one on the right. The largest is filled with the orange accent; the other
> two in navy tones. The size difference is the whole point of the image.

### Prompt 7 — India vs abroad
- **File:** `public/blog/what-is-pilot-training/india-vs-abroad.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "Two flight paths leaving one airport, one curving back to land domestically and the other crossing an ocean before returning"

> A simplified globe or world map arc seen from above. Two dotted flight paths
> leave the same point on the Indian subcontinent: one curves in a short domestic
> loop and returns; the other travels a long arc across an ocean to a distant
> landmass and loops back to the origin. Both paths return to the same point.
> Orange accent on the long international arc.

---

## Adding images for a new post

1. Create `public/blog/<post-slug>/` and keep every file for that post inside it.
2. Add a numbered prompt block here under a `## Post:` heading for the route.
3. In the post, use `BlogImagePlaceholder` with `src`, `width`, `height`, `alt`
   and `promptId` matching the number here.
4. When the real file exists, swap the component for `next/image` — the props are
   deliberately identical, so nothing else changes and there is no layout shift.
