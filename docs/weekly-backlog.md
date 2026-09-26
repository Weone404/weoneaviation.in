# We One Aviation — Weekly Growth Backlog

Living backlog for the weekly autonomous growth routine. P0/P1 get fixed the
run they're found; P2/P3 land here. Move an item to "Cleared" with the run
date when it's done; don't delete history.

---

## Open

### P1 — Sitewide color-contrast failures (Design/Perf rotation target)
Lighthouse (desktop) flags `color-contrast` on every page audited this run
(homepage, /commercial-pilot-license, /dgca-ground-classes,
/pilot-training-in-dwarka) — it's systemic, coming from shared low-opacity
Tailwind utility classes (`text-white/60`, `text-white/70`, `text-gray-400`,
`text-gray-300`, `.section-tag`) used across footer, hero, sidebar and CTA
components. NOT fixed this run: a global contrast pass needs visual
verification at multiple breakpoints in both themes per the routine's own
rule ("any redesign must keep or improve every metric"), which didn't fit
this run's remaining budget. Ready-to-execute for the next ISO-week%4==3
(DESIGN, UX & PERFORMANCE) slot: audit `tailwind.config.js` color tokens,
raise the low-opacity white/gray text tokens against their actual
backgrounds, re-run Lighthouse on the same 4 pages to confirm no regression.

### P2 — Heading-order skips (h2 → h4, no h3) in hand-built sidebar boxes
Lighthouse flags `heading-order` on /dgca-ground-classes and
/pilot-training-in-dwarka: an `<h4>` "Eligibility Criteria" sidebar box
heading with no `<h3>` before it. The same "Eligibility Criteria" sidebar
pattern is duplicated by hand (not a shared component) across at least 9
files: `pilot-training-in-india.jsx`, `qatar-airways-cadet-pilot-program.jsx`,
`rtr-full-form-meaning-importance-and-complete-guide.jsx`, `courses/cpl.jsx`,
`courses/ppl.jsx`, `dgca-ground-classes.jsx`,
`blogs/aviation-course-after-12th.jsx`, `cbse-full-form.jsx`,
`airline-preparatory-classes/cass-compass.jsx`. Check each one's local
heading hierarchy and fix the level (usually just renaming h4→h3 or adding
the missing h3), not a shared-component fix.

### P3 — Console network errors on Lighthouse runs (likely proxy artifact, not verified live)
Lighthouse's `errors-in-console` audit shows `ERR_TUNNEL_CONNECTION_FAILED`
for `googletagmanager.com/gtm.js` and a `tecmicra.com/CRM-Dev/webhook/tracker.php`
call on every page tested in this sandboxed environment. This is very likely
this environment's outbound proxy blocking those hosts, not a production
defect — Vercel production has no such restriction. Re-check against the
live site after deploy (§9 post-deploy verification) rather than treating it
as a fix-now finding; if it reproduces live, the tecmicra.com webhook is
worth asking the owner what it's for before touching it (it isn't referenced
anywhere in this repo's own source, so it's likely injected via a
third-party tag in Google Tag Manager, not code we own here).

### P1 — Entity authority / AI citation gap (drives next rotation)
We One Aviation is not cited by AI-engine-style search summaries for any of
the six unbranded local-intent prompts probed this run (best DGCA ground
classes in Delhi, pilot training institute in Dwarka, which institute for
DGCA prep in Delhi, CPL training cost 2026, DGCA ground classes fees Delhi).
Golden Epaulettes Aviation is the incumbent across nearly all of them. Brand
queries ("is We One Aviation DGCA approved") do surface correctly. See
docs/geo-knowledge-base.md 2026-W39 citation scoreboard for detail. Target
for the ISO-week%4==1 (CONTENT & AEO) rotation: rewrite/expand the weakest
commercial pages answer-first with the exact phrasing these prompts use, and
check the entity-clarity paragraph is present and identical everywhere.

### P2 — Two near-duplicate USA training pages, now de-duplicated content but not consolidated
`pages/best-flight-schools-in-usa.jsx` and `pages/flying-school/usa.jsx` had
byte-identical body copy (fixed this run — see knowledge base). They still
cover overlapping search intent (best-schools comparison vs. CPL-in-USA
program). Decide in a CONTENT rotation week whether to fully differentiate
both or 301-consolidate one into the other; don't leave them drifting back
into duplication.

### P2 — `data/pageFaqs.js` dead `routeContent` entries
Three `routeContent` keys are permanently shadowed by `existingFaqRoutes`
(the Set is checked first): `/commercial-pilot-license-admission-process`,
`/blogs/dgca-exam-guide`, `/pilot-training-in-sri-lanka`. Inert, not a live
bug — safe cleanup for a Schema & Entity rotation week. Remove the three
dead object entries from `routeContent` (data/pageFaqs.js lines ~372, ~482,
~522 as of 2026-W39; re-grep before editing, line numbers drift).

### P2 — Verify current CPL/DGCA cost figures against 2026 market data
Live web search this run cited CPL total cost at ₹55L–90L (2026) and DGCA
ground-class fees at ₹80k–1.5L (basic) to ₹2L–5L (comprehensive) — check
`/cost-transparency` and `lib/facts.js` PARIKSHA figures are still current
against a primary DGCA/FTO source before publishing any number change. Do
not copy the web-search figures directly without sourcing them (Hard Rule:
Pariksha figures come only from `PARIKSHA` in `lib/facts.js`, sourced).

### P3 — `scripts/audit-content.cjs` babel presets not a tracked dependency
By design (see script's own header comment) — `npm install --no-save
@babel/preset-react @babel/plugin-transform-modules-commonjs` before running
it. Not broken, just easy to mistake for 100+ page failures if skipped.

### P3 — `pages/contact.jsx` fails the render-smoke test's `useRouter` stub
`scripts/audit-content.cjs` stubs `next/router` without a working
`useRouter()`; `pages/contact.jsx` calls it and the smoke test throws. The
real page builds and serves fine (confirmed via `npm run build` + live
crawl) — this is a stub gap in the smoke-test harness, not a page bug. Fix
the stub if the smoke test is worth trusting fully in future runs.

## Owner actions (off-site)

- **weoneaviation.com (out of scope, but flag it anyway)**: a live web search
  for "We One Aviation reviews" surfaces weoneaviation.com — the separate,
  out-of-scope Apache site — describing the academy as "trusted by over 6000
  candidates with 4000+ placements" and naming an instructor with a specific
  first-attempt pass count. Those are exactly the fabricated/unverifiable
  claim types this routine strips from weoneaviation.in (placement counts,
  named-instructor pass-rate claims). This routine has no access to .com and
  must not touch it, but the owner should know two properties under the same
  brand are making contradictory claims about verifiability, which is a
  reputational and potentially regulatory risk (DGCA scrutinizes advertising
  claims). Recommend the owner review/align weoneaviation.com's claims with
  the same evidentiary standard used on .in, or take it down/redirect it if
  it's no longer maintained.
- **Google Business Profile / local signals**: not checked this run (no GBP
  credentials in this environment). Compare against CSKAA and Golden
  Epaulettes' public GBP footprint (categories, Q&A, photo cadence, review
  count) next time GBP access is available — this ties directly into the P1
  citation gap above.
- **Third-party citations**: none of the six unbranded prompts probed this
  run surfaced weoneaviation.in anywhere, even as a secondary link. Backlink
  / directory outreach (aviation-course aggregator sites, Quora answers,
  Careers360 threads — several appeared as citation sources this week) is
  outside this routine's scope but would likely move these prompts faster
  than on-site work alone.

## Cleared

### 2026-W39
- **P0 — fabricated/unverifiable claims live on the homepage and other
  high-traffic pages, missed by every previous claims-cleanup pass.** Found
  by accident while investigating a duplicate-meta-description flag, then
  swept for systematically. Fixed on `pages/index.jsx` (the homepage),
  `pages/pilot-training-in-india.jsx`, `pages/courses.jsx`,
  `pages/air-navigation.jsx`, `pages/airline-preparation-course.jsx`, and the
  two USA training pages (see below): a "guaranteed instructor job
  opportunities" / "direct airline placement programs" / "international
  pilot job opportunities" claim on multiple country cards; "Hundreds of
  successful pilots flying with leading airlines" under a "Proven Track
  Record of Success" heading (duplicated identically on two pages); a
  "We Provide 100% Loan For Flight Training From Any Country" financing
  guarantee (also duplicated); a "Topper Scholarship Program" offering free
  CPL flight training under a "Money-Back Guarantee," with no documented
  terms, eligibility process or funding source anywhere in the repo (removed
  entirely, not hedged); "guaranteed career guidance" and a claim of training
  "with state-of-the-art aircraft" that contradicts the site's own
  established position that it owns no aircraft or simulators; "Guaranteed
  Results — High success rate" on /air-navigation with no stated number; and
  on /airline-preparation-course, an "Alumni Success Stories" testimonial-style
  claim with no named/documented alumni, a "reputation is a testament to the
  quality of education" claim, and language that the interview-prep service
  "assists students in securing job opportunities with leading airlines,"
  directly contradicting the site's own stated scope ("we do not place
  students into airline jobs") used correctly on every other page. Extended
  `scripts/check-claims.js` (the automated gate) with 7 new targeted patterns
  so these exact phrase classes fail the build if they recur — the gate had
  zero coverage for prose-form guarantee/placement/success claims that don't
  include a specific percentage or headcount, which is how all of these
  shipped and stayed live. One new pattern (`guaranteed...job`) needed a
  same-run false-positive fix: `/how-to-choose-an-aviation-academy.jsx` and
  `/credentials.jsx` both legitimately use "a guaranteed job" as an example
  of what to distrust, not a claim of their own.
- Fixed a real 2-hop redirect chain (`/ecga-login-your-compl` →
  `/ecga-login-your-complete-guide` → `/egca-login`) and a 404 redirect
  destination, collapsing both legacy sources straight to `/egca-login`.
- Deleted two fully unreachable orphan pages permanently shadowed by their
  own next.config.js redirects: `pages/faq.jsx` (→ `/faqs`) and
  `pages/pilot-course-training-in-india.jsx` (→ `/pilot-training-in-india`).
  Zero internal references to either found before deletion.
- Fixed 3 `@next/next/no-html-link-for-pages` lint errors (raw `<a>` instead
  of `<Link>`); 2 were in the two orphan pages just deleted, 1 fixed in
  `pages/commercial-pilot-license.jsx`.
- Fixed a false-positive "duplicate EducationalOrganization schema" flag in
  `geo-qa.js` (was counting nested `publisher:`/`provider:` references as
  top-level duplicates) — no page schema was actually broken.
- Added 30 missing URLs to `public/llms.txt` (real, live pages that were
  absent) and removed one dead legacy entry (`/blogs/4`, which now only
  redirects). llms.txt/sitemap parity restored except the one intentional
  canonical exception (see knowledge base).
- **P0 — fabricated/unverifiable claims live on two pages**:
  `pages/best-flight-schools-in-usa.jsx` and `pages/flying-school/usa.jsx`
  both advertised a "40-Hour PPL Challenge" with free Instrument Rating
  training, a "100% scholarship for advanced flight training after
  completing your CPL," and "1,500 flight hours flight building — FREE,"
  plus fake "Limited Seats Available — Apply Now!" urgency banners. All
  removed; both pages rewritten to only state what's independently
  verifiable (FAA licence recognition, partner-school location, aircraft
  used). This also fixed the pages' identical meta descriptions (found via
  `verify:meta`) since the two pages were otherwise byte-identical in body
  copy — see knowledge base for the near-duplicate-page note.
- Wired `verify:links`, `verify:schema`, `verify:meta`, `audit:crawl`, and
  `verify:all` into `package.json`, reusing existing audit scripts
  (`scripts/audit-links.cjs`, `geo-qa.js`, `scripts/seo-audit.js`) rather than
  rewriting them, and added `scripts/audit-crawl.mjs` for the Phase 1 site
  inventory (none existed before).
