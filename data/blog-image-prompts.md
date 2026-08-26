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

## Post: `/blogs/dgca-ground-school-guide`

### Prompt 31 — Hero / OpenGraph and card
- **File:** `public/blog/dgca-ground-school/hero-ground-school.webp`
- **Dimensions:** 1200 × 630
- **Alt:** "Students at desks working through navigation charts and a flight computer in a ground school classroom"

> Four or five South Asian students at simple desks in a bright classroom, each
> working over a large navigation chart with a circular slide-rule flight computer
> and a plotter. Heads down, working, not posed. A whiteboard behind carries
> abstract diagram shapes only — never letters or numbers.

### Prompt 32 — Relative paper difficulty
- **File:** `public/blog/dgca-ground-school/subject-difficulty.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Five columns of clearly different heights representing the relative preparation load of each DGCA written paper"

> Five vertical columns on a common baseline, clearly different in height. The
> tallest and the second tallest carry the orange accent; the shortest is roughly a
> third of the tallest. No axis marks, no gridlines, no labels — the comparison is
> carried entirely by height.

### Prompt 33 — Six-month study plan
- **File:** `public/blog/dgca-ground-school/study-timeline.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A six-segment horizontal band with study intensity rising and falling across the months of a ground school course"

> A horizontal band divided into six equal segments left to right, each segment
> filled to a different height like a simple bar sequence inside the band. The
> fourth segment is marked with the orange accent to indicate the first examination
> attempt. Clean, flat, no text.

---

## Post: `/blogs/best-flying-school-in-india`

### Prompt 28 — Hero / OpenGraph and card
- **File:** `public/blog/best-flying-school/hero-school-comparison.webp`
- **Dimensions:** 1200 × 630
- **Alt:** "Three small flying school hangars with training aircraft parked outside, viewed side by side for comparison"

> Three small hangar-and-office buildings standing in a row on a flat apron, each
> with one or two light training aircraft parked outside. The buildings are similar
> but not identical, and the number of aircraft outside each differs visibly. Wide,
> even, comparative composition — no building favoured over the others.

### Prompt 29 — Fleet-to-student ratio
- **File:** `public/blog/best-flying-school/fleet-ratio.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Two groups showing a few aircraft with a small crowd of students beside many aircraft with a much larger crowd"

> The frame split into two halves by generous empty space. Left: three small
> aircraft with a group of about six simplified student figures. Right: eight
> aircraft with a crowd of about forty figures. The point is that the right side has
> more aircraft and a far worse ratio. Orange accent on the left group.

### Prompt 30 — Verification process
- **File:** `public/blog/best-flying-school/verification-steps.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A checklist clipboard beside a magnifying glass held over a small hangar and aircraft"

> A clipboard holding a sheet with a column of tick marks (marks only, never
> letters), lying flat. Beside it, a large magnifying glass hovering over a small
> hangar with an aircraft, rendering that portion in sharper focus. Calm, methodical.

---

## Post: `/blogs/pilot-training-cost-in-india`

### Prompt 24 — Hero / OpenGraph and card
- **File:** `public/blog/pilot-training-cost/hero-cost-breakdown.webp`
- **Dimensions:** 1200 × 630
- **Alt:** "A desk with a calculator, a notebook of figures and a small model training aircraft, representing the cost of pilot training"

> A tidy desk seen from slightly above: a simple calculator, an open notebook with
> ruled lines and neat handwritten-looking marks (abstract strokes, never legible
> characters), a pen, and a small model single-engine training aircraft resting
> beside them. Calm, considered, unglamorous — this is a planning scene, not an
> aspirational one.

### Prompt 25 — Cost proportions
- **File:** `public/blog/pilot-training-cost/cost-proportions.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Three stacked bars of very different heights showing flying training dominating ground school and living costs"

> Three vertical bars standing on a common baseline, dramatically different in
> height. The tallest is roughly eight times the shortest and carries the orange
> accent; a middle bar sits at about a third of its height; the shortest is small
> enough to read as almost negligible. Clean, flat, no axis marks or gridlines.

### Prompt 27 — India compared with abroad
- **File:** `public/blog/pilot-training-cost/india-vs-abroad-cost.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "Two sets of stacked coins of similar total height, one built from fewer large discs and the other from many small ones"

> Two stacks of coins standing side by side on a flat surface, reaching almost
> exactly the same height. The left stack is made of a few large thick discs; the
> right of many thin ones. The point is that two very different compositions add up
> to nearly the same total. Neither stack is highlighted over the other.

### Prompt 26 — Overrun triggers
- **File:** `public/blog/pilot-training-cost/overrun-triggers.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A budget line rising gently then stepping upward at several points, each step representing an unplanned training cost"

> A single line running left to right, rising gently at first, then jumping upward
> in four distinct vertical steps at irregular intervals before continuing. A faint
> dashed horizontal line runs across the frame at the height of the original gentle
> slope, showing how far above the plan the real line finished. Orange accent on the
> steps only.

---

## Post: `/blogs/flight-school-prerequisites-admission-guide`

Prompts 18, 20 and 22 repeat subjects used elsewhere in the cluster. Render them as
separate files with a different camera angle or colour weighting so a reader moving
between the three guides does not meet the same picture twice.

### Prompt 17 — Hero / OpenGraph and card
- **File:** `public/blog/flight-school-prerequisites/hero-admission-checklist.webp`
- **Dimensions:** 1200 × 630
- **Alt:** "A student assembling academic certificates, a medical file and identity documents at a desk, with a training aircraft visible through the window behind"

> A South Asian student at a desk, calmly sorting three neat stacks of documents into
> folders. Through a large window behind, a single-engine training aircraft sits on an
> apron in soft daylight. The desk is orderly, not cluttered. The aircraft is small in
> frame — the paperwork is the subject, the flying is the destination.

### Prompt 18 — Licence ladder
- **File:** `public/blog/flight-school-prerequisites/licence-ladder.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Four ascending steps representing the progression from Student Pilot Licence through Private and Commercial to Airline Transport Pilot Licence"

> Four ascending platforms rising left to right, each carrying an aircraft silhouette
> that grows larger and more capable from a light trainer to an airliner. Use a lower,
> more head-on viewpoint than any other ladder illustration in this file so the two do
> not read as the same image.

### Prompt 19 — Admission process
- **File:** `public/blog/flight-school-prerequisites/admission-process.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A stepped path running from a certificate through a medical file and a portal screen to a training aircraft and a licence document"

> A path of flat stepping stones running left to right across the frame, each stone
> carrying one simple icon in order: an academic certificate, a medical file with a
> stethoscope, a laptop screen, a single-engine aircraft, and a licence document. The
> stones are evenly spaced and clearly sequential. Orange accent on the final stone.

### Prompt 20 — Flying hours composition
- **File:** `public/blog/flight-school-prerequisites/flying-hours-composition.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "One large circle containing four smaller nested segments, showing that the component hour requirements sit inside a single total"

> One large circle with four smaller shapes nested completely inside it. Nothing sits
> outside the outer ring. Weight this version toward the pale blue end of the palette
> so it reads differently from the other two nested-circle illustrations in this file.

### Prompt 21 — Document checklist
- **File:** `public/blog/flight-school-prerequisites/documents-checklist.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "A neat stack of document folders in categories beside a scanner and a passport-size photograph"

> Six labelled-by-colour folders fanned in a neat overlapping stack — no text on the
> folders, colour alone distinguishes them. Beside the stack, a flatbed scanner with
> its lid open and a single small photograph resting on the glass. Clean desk surface,
> generous empty space above.

### Prompt 22 — Cost buckets
- **File:** `public/blog/flight-school-prerequisites/cost-buckets.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Three containers of clearly different sizes side by side, the largest representing flight training costs"

> Three containers side by side, dramatically different in size, the centre one roughly
> five times the volume of the smallest and filled with the orange accent. Use a
> straight-on elevation rather than a three-quarter view to distinguish it from the
> other cost illustrations in this file.

### Prompt 23 — Choosing a flight school
- **File:** `public/blog/flight-school-prerequisites/school-selection.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A magnifying glass held over three small flight school buildings with aircraft parked beside them"

> Three small hangar-and-office buildings sitting on a flat plane, each with a light
> aircraft parked beside it. A large magnifying glass hovers over the middle one,
> enlarging it slightly and rendering it in sharper detail than the other two. The
> examination is the subject, not the buildings.

---

## Post: `/blogs/commercial-pilot-training-programs-complete-guide`

Prompts 11 to 14 are deliberate near-repeats of 4, 5, 6 and 7 from the pilot-training
guide, rendered as separate files so the two posts do not share an asset. Vary the
camera angle or colour weighting slightly between the pair so a reader landing on both
does not see the same picture twice.

### Prompt 10 — Hero / OpenGraph and card
- **File:** `public/blog/commercial-pilot-training-programs/hero-training-programme.webp`
- **Dimensions:** 1200 × 630
- **Alt:** "An Indian student pilot at a ground-school desk with charts, and the same student in the cockpit of a training aircraft, shown as one continuous programme"

> A wide scene reading left to right as one continuous programme: a South Asian
> student at a desk with navigation charts and a flight computer, then the same
> student walking out to a single-engine training aircraft on an apron, then seated
> at its controls. Three moments, one unbroken flow, no dividing lines.

### Prompt 11 — Flying hours composition
- **File:** `public/blog/commercial-pilot-training-programs/flying-hours-composition.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "One large circle containing four smaller nested segments, showing that command, cross-country, instrument and night flying sit inside a single total"

> One large circle with four smaller shapes nested entirely inside it — contained,
> never stacked alongside. The largest inner shape fills about half the circle. The
> containment must read instantly: nothing sits outside the outer ring. Use a
> top-down flat composition, distinct from a side-on treatment elsewhere.

### Prompt 12 — Training timeline
- **File:** `public/blog/commercial-pilot-training-programs/training-timeline.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "A horizontal path running from a school building through a classroom and a training aircraft to a licence document"

> A horizontal ribbon running left to right past four waypoints in order: a school
> building, a desk with a stethoscope beside it, a single-engine aircraft in flight,
> and a certificate. Add small gaps or breaks in the ribbon between waypoints to
> suggest that the stages do not run continuously.

### Prompt 13 — Cost buckets
- **File:** `public/blog/commercial-pilot-training-programs/cost-buckets.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "Three containers of clearly different sizes side by side, the largest representing flight training costs"

> Three containers side by side on a level surface, dramatically different in size.
> The centre one is roughly five times the volume of the smallest and is filled with
> the orange accent; the other two are navy. The size difference is the entire point.

### Prompt 14 — India vs abroad
- **File:** `public/blog/commercial-pilot-training-programs/india-vs-abroad.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "Two flight paths leaving one airport, one looping back domestically and the other crossing an ocean before returning"

> A simplified world arc seen from above. Two dotted paths leave the same point on
> the Indian subcontinent: one loops short and domestic, the other crosses an ocean
> to a distant landmass and returns to the same origin. Both end where they started.

### Prompt 15 — Aircraft categories
- **File:** `public/blog/commercial-pilot-training-programs/aircraft-categories.webp`
- **Dimensions:** 1200 × 675
- **Alt:** "Three aircraft of increasing complexity beside a flight training device, representing single-engine, multi-engine and simulator training"

> Four objects in a row, all in clean side profile: a small two-seat single-engine
> trainer, a slightly larger four-seat single, a twin-engine light aircraft, and a
> boxy ground-based flight training device with a screen. Increasing complexity left
> to right. Generic shapes — do not attempt any identifiable manufacturer or model.

### Prompt 16 — Career paths after CPL
- **File:** `public/blog/commercial-pilot-training-programs/career-paths.webp`
- **Dimensions:** 1200 × 800
- **Alt:** "One path branching into four routes ending at an airliner, a training aircraft, a charter aircraft and a business jet"

> A single path starting bottom-centre and branching into four routes fanning
> upward, each ending at a different aircraft silhouette: an airliner, a small
> training aircraft, a light charter aircraft and a business jet. Equal visual
> weight to all four branches — none presented as the destination.

---

## Post: `/blogs/dgca-exam-guide`

### Prompt 8 — Card and hero
- **File:** `public/blog/dgca-exam-guide/hero-dgca-regulator.webp`
- **Dimensions:** 1200 × 630
- **Alt to use on swap:** "A government regulatory building beside an aircraft and a licence document, representing the DGCA's oversight of Indian pilot licensing"

> A calm institutional scene: a simple government-style building with columns on
> the left, a single-engine aircraft on an apron to the right, and a certificate
> document floating between them connecting the two. Flat, orderly, no clutter.
> Orange accent on the certificate only.

---

## Post: `/blogs/aviation-course-after-12th`

### Prompt 9 — Card and hero
- **File:** `public/blog/aviation-course-after-12th/hero-after-12th-routes.webp`
- **Dimensions:** 1200 × 630
- **Alt to use on swap:** "A school gate opening onto several diverging paths leading to different aviation careers"

> A school gate on the left opening onto three or four paths that fan outward to
> the right, each ending at a different simple destination: a training aircraft,
> an air traffic control tower, a maintenance hangar, and a university building.
> Equal visual weight to each path. Orange accent on the aircraft path.

---

## Adding images for a new post

1. Create `public/blog/<post-slug>/` and keep every file for that post inside it.
2. Add a numbered prompt block here under a `## Post:` heading for the route.
3. In the post, use `BlogImagePlaceholder` with `src`, `width`, `height`, `alt`
   and `promptId` matching the number here.
4. When the real file exists, swap the component for `next/image` — the props are
   deliberately identical, so nothing else changes and there is no layout shift.
