# SEO-TODO

Working notes for We One Aviation (`www.weoneaviation.in`). Tracks decisions that
**cannot be made safely from the codebase alone** and require live data.

---

## Keyword cannibalization clusters — DO NOT consolidate yet

Each cluster below has multiple URLs competing for the same or overlapping
queries. Consolidating (merge / 301 / canonical) **before** looking at Google
Search Console impression + click + position data risks killing a page that is
actually the one ranking. **Required before any merge:** pull GSC "Search
results" → filter by each URL (or Pages report), 90-day window, and confirm which
URL earns the impressions/clicks for the shared queries. Keep the winner; 301 the
losers into it.

> Status: **analysis only.** No consolidation performed in this branch.

### Cluster 1 — DGCA Ground Classes

| URL | File | Primary angle |
|---|---|---|
| `/dgca-ground-classes` | `pages/dgca-ground-classes.jsx` | Generic DGCA ground classes / course landing |
| `/courses/dgca-ground-classes` | `pages/courses/dgca-ground-classes.jsx` | Course-catalog entry for the same offering |
| `/dgca-ground-classes-in-india` | `pages/dgca-ground-classes-in-india.jsx` | "in India" / pan-India geo-modified variant |

**Overlap:** all three target "DGCA ground classes" + close variants, describe the
same six-subject DGCA syllabus, same course, same academy. The `/courses/...` and
top-level `/dgca-ground-classes` are the strongest duplication risk (same product,
two paths). `-in-india` adds only a geo modifier.

**Before merging — need from GSC:** impressions/clicks/avg position per URL for
`dgca ground classes`, `dgca ground classes in india`, `dgca coaching`, and
`dgca online classes`. Likely outcome: keep one canonical hub, 301 the other two —
**but confirm with data first.**

### Cluster 2 — How to become a pilot

| URL | File | Title angle |
|---|---|---|
| `/how-to-become-a-pilot-after-12th` | `pages/how-to-become-a-pilot-after-12th.jsx` | "after 12th" (flat URL) |
| `/how-to-become-a-pilot/after-12th` | `pages/how-to-become-a-pilot/after-12th.jsx` | "after 12th" (nested URL) — **near-duplicate of the flat one** |
| `/how-to-become-a-pilot/in-india` | `pages/how-to-become-a-pilot/in-india.jsx` | "in India — DGCA guide" |
| `/your-guide-on-how-to-become-a-pilot-in-india` | `pages/your-guide-on-how-to-become-a-pilot-in-india.jsx` | "in India" long-form guide — **near-duplicate of `/in-india`** |

**Overlap:** two distinct intents (**after-12th** vs **in-india**) but each intent
is served by **two competing URLs**. The two "after-12th" pages and the two
"in-india" pages are the direct cannibalization pairs.

**Before merging — need from GSC:** per-URL impressions/position for
`how to become a pilot`, `how to become a pilot after 12th`, and
`how to become a pilot in india`. Expected: collapse each pair to one URL (301 the
weaker), leaving one after-12th page and one in-india page — **confirm with data.**

### Cluster 3 — Delhi location page vs blog post

| URL | File | Role |
|---|---|---|
| `/pilot-training-in-delhi` | `pages/pilot-training-in-delhi.jsx` | Primary location/service page |
| `/blogs/pilot-training-delhi` | `pages/blogs/pilot-training-delhi.jsx` | Near-verbatim duplicate of the above |

**Status:** the blog post now carries a `rel="canonical"` → `/pilot-training-in-delhi`
(added via the `canonical` prop on `CityPageTemplate` → `Layout`). This is an
**interim** signal, not a permanent decision.

**Permanent decision still needed (data-dependent):**
- If GSC shows the blog URL has earned backlinks or ranks for informational
  queries the location page does not, keep it but **differentiate** the content
  (make it a genuine guide, not a copy).
- If it has no independent value, **301** `/blogs/pilot-training-delhi` →
  `/pilot-training-in-delhi` and remove it from the sitemap.
- Do not delete/redirect until backlink + impression data is reviewed.

---

## Related item flagged but NOT changed

- **Self-serving `Review` markup on the homepage** (`pages/index.jsx`, `reviewSchema`,
  injected ~line 428): three hard-coded 5-star `Rating` entries with named authors.
  Self-serving review markup on `Organization`/`EducationalOrganization` has been
  ineligible for star snippets since 2019 and risks a structured-data manual action
  if the reviews aren't independently verifiable. The fabricated `aggregateRating`
  was removed; **this `Review` block is a candidate for the same removal —
  pending decision.**

- **Duplicate location pages:** the dynamic route `/pilot-training-in/<city>`
  (`pages/pilot-training-in/[city].jsx`) overlaps the flat pages
  `/pilot-training-in-<city>` for several cities (delhi, mumbai, bangalore, …).
  Same cannibalization pattern as Cluster 1–3 — needs GSC data before deciding
  which set to keep. Not touched here beyond fixing title/description length.

---

## Cannot be fixed from this repository (needs external access)

These require dashboards, credentials, or Google-side actions that do not live in
the codebase. Tracking here so they are not forgotten:

- [ ] **Vercel redirect status** — confirm apex→www and any legacy paths return
      **301** (permanent), not 302/307. Set in Vercel project settings /
      `vercel.json`, verified with `curl -I`. Cannot be validated from source.
- [ ] **Google Search Console verification** — confirm the `www` property is
      verified and is the one receiving data (needed for every consolidation
      decision in the clusters above).
- [ ] **PageSpeed Insights / CrUX API key** — required to pull field Core Web
      Vitals and run automated PSI checks; not stored in repo.
- [ ] **Sitemap resubmission** — after this branch deploys, resubmit
      `https://www.weoneaviation.in/sitemap.xml` in GSC and confirm it is read
      without errors.
- [ ] **Google Business Profile** — NAP consistency, categories, and posts are
      managed in the GBP dashboard, outside this repo.
