# We One Aviation — GEO/AEO Knowledge Base

Living memory for the weekly autonomous growth routine (see CLAUDE.md / the routine
prompt for full rules). Append a dated section each run; do not delete history.

---

## 2026-W39 (run of 2026-09-26)

### Ecosystem changes this week

- **No new Google core/spam update as of this run.** Last confirmed ranking
  update was the August 2026 spam update (started Aug 18). No September 2026
  core update has been announced. [Search Engine Watch](https://searchenginewatch.com/could-googles-next-core-update-arrive-in-september-2026/), [Google Search Central](https://developers.google.com/search/updates)
- **AI Mode is merging into AI Overviews.** Google is pushing AI Mode features
  (link carousels for developing stories, "dynamic expansion" into longer
  answers, Generative UI custom layouts) into the regular AI Overviews surface,
  partly powered by Gemini 3.7 Flash. On 2026-09-16 Google's John Mueller said
  on Reddit that AI Mode/AI Overviews position and citation tracking will
  "evolve over time" with "edge cases" in how citations are counted — meaning
  our own citation-scoreboard probe below is a best-effort read, not a precise
  rank. [Search Engine Roundtable](https://www.seroundtable.com/sept-2026-google-webmaster-report-41979.html), [Harri Digital](https://www.harridigital.co.uk/blog/google-september-2026-update-ai-overviews-expansion)
- **FAQ rich results are deprecated in classic Google Search (since May 2026),
  but FAQPage schema itself is still valid and still read by AI engines.**
  Search Console reporting for FAQ rich results was removed and the Rich
  Results Test dropped support; the blue-link FAQ snippet is gone for most
  sites. This does NOT mean pull FAQPage schema — AEO tools (ChatGPT, Perplexity,
  Google AI Overviews) still parse FAQPage nodes for direct-answer extraction,
  which is the entire reason this site invests in per-page FAQPage. Action:
  keep shipping FAQPage; stop expecting a classic SERP snippet from it.
  [GetPassionfruit](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now), [Stan Ventures](https://www.stanventures.com/news/google-john-mueller-schema-update-2026-5719/)
- **schema.org v30 shipped stable 2026-03-19.** No breaking changes identified
  for the types this site uses (EducationalOrganization, Course, FAQPage,
  LocalBusiness, BreadcrumbList). [Schema.org usage stats](https://en.wikipedia.org/wiki/Schema.org) are now published
  publicly (June 2026) — worth checking in a future run to see how common
  Course/CourseInstance nesting is, to sanity-check our own markup shape.
- **Next.js**: this repo is on `^16.3.4`; Next.js 16.3 shipped "Instant
  Navigations" and dev/build speed work. Nothing pages-router-breaking found.
  [Next.js 16.3 blog](https://nextjs.org/blog/next-16-3)
- **DGCA**: Regular Exam 03 of 2026 runs 2026-09-22 to 09-26 (this week).
  Next Regular session is December 15–19, 2026. Dates are tentative per DGCA's
  own notice. [pariksha.dgca.gov.in exam calendar](https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=027F234C1243D44B5BF5C787082CDCC8)

### Citation scoreboard — 2026-W39 (first run; no prior week to diff against)

Read via live web search as a proxy for AI-answer-engine citation (Search's
own AI Overviews aren't directly queryable from this environment; treated as
directional, not exact — see the Mueller note above).

| Prompt | weoneaviation.in cited? | Who's winning | Notes |
|---|---|---|---|
| best DGCA ground classes in Delhi | **No** | Golden Epaulettes Aviation (dominant, cited in nearly every query this run), CEA Aviation, FMS Aviation Academy, Flightrule Aviation, CSKAA | We do not appear in any AI-generated summary for this core commercial query. |
| pilot training institute in Dwarka Delhi | **No** | Airborne Aviation, Golden Epaulettes, FMS Aviation, "Ground School For Aviators" | Same gap — Dwarka is our home turf and we're absent. |
| how to become a pilot in India after 12th | **No** (generic answer, no institute named) | No single institute cited; generic aggregator answer | Open field — a well-optimized answer-first page could win this with no entrenched incumbent. |
| CPL training cost in India 2026 | **No** | Golden Epaulettes, Airborne Aviation, FMS Aviation Academy, Poetic Pilot Academy | Market figures cited: ₹55L–90L total CPL cost, ₹35–50L for the 200 flying hours alone. Our own /cost-transparency should be checked against these current figures (not copied verbatim without sourcing, but as a freshness check). |
| DGCA ground classes fees Delhi | **No** | Golden Epaulettes, VFTI | Market figures cited: ₹80k–1.5L for basic ground-class batches, ₹2L–5L for comprehensive programs. |
| which institute should I join for DGCA exam preparation in Delhi | **No** | Golden Epaulettes, CSKAA, Capt. Ahluwalia Aviation Academy, FMS Aviation, Airship Aviation | Direct-recommendation query, same competitor set, we are absent. |
| We One Aviation reviews | N/A (brand query) | — | **Flag, not ours to fix**: results describe **weoneaviation.com** (the separate, out-of-scope Apache site) claiming "trusted by over 6000 candidates with 4000+ placements" and a named-instructor pass-rate claim. That is exactly the class of claim this routine's Hard Rule #1 strips from weoneaviation.in. Logged as an owner action below — ground truth says never touch .com. |
| is We One Aviation DGCA approved | Yes | — | Our own /about-us and /pilot-training-in-india pages surface directly, with accurate framing ("DGCA-approved ground classes... does not own aircraft, arranges training with partner schools"). Brand-query visibility is fine; the gap is entirely on unbranded local-intent queries. |

**Reading**: technical health (schema, redirects, sitemap, llms.txt — all
worked this run) is not the bottleneck. **Entity authority on unbranded local
commercial queries is the bottleneck** — Golden Epaulettes Aviation in
particular is cited far more consistently than we are, on our own home
ground (Dwarka Sector 7). This is a content/entity-signal problem, not a
technical one, and should drive the CONTENT & AEO rotation slot (next up,
ISO week 40).

### Durable rules learned this run

- **Next.js redirects() take precedence over a matching page file.** Confirmed
  live: `pages/faq.jsx` and `pages/pilot-course-training-in-india.jsx` were
  both fully unreachable dead code because `next.config.js` redirects their
  exact paths elsewhere. `npm run build` listing the route is not proof it's
  reachable — a page can build and still be permanently shadowed by its own
  redirect. Check redirect sources against `pages/` paths before trusting a
  route is live; geo-qa.js's "Set members that 301" check (section 3) already
  catches this for FAQ-gated routes, but it doesn't cover every page.
- **`data/pageFaqs.js`'s `existingFaqRoutes` Set always wins over
  `routeContent`.** A route listed in both is not a conflict Next.js resolves
  at random — the Set gate is checked first in Layout, so the `routeContent`
  entry for that route is permanently dead code. `geo-qa.js` section 3 already
  flags this ("routeContent shadowed by Set"); left unresolved this run
  (`/commercial-pilot-license-admission-process`, `/blogs/dgca-exam-guide`,
  `/pilot-training-in-sri-lanka`) since it's inert dead data, not a live bug —
  backlogged for a future data-hygiene pass.
- **A page can canonicalize to a DIFFERENT URL than itself on purpose.**
  `pages/blogs/pilot-salary-in-india.jsx` is a one-line re-export of
  `pilot-salary-in-india-2026.jsx`, and the shared component sets
  `CANONICAL` to the older, undated slug. Both URLs are live and both are in
  the sitemap, but only the canonical slug belongs in `llms.txt` and any
  "parity" check — treating this as a gap to fill by listing both URLs would
  be wrong. `scripts/audit-links.cjs` and `geo-qa.js`'s parity check both
  still flag the `-2026` URL as an apparent gap; this is expected and
  intentional, not a bug to fix.
- **Two near-duplicate legacy pages found by accident while fixing a
  duplicate-meta-description finding, not by the duplicate-content check
  itself**: `pages/best-flight-schools-in-usa.jsx` and
  `pages/flying-school/usa.jsx` were byte-identical in body content (same
  fabricated "40-Hour PPL Challenge / free IR", "100% CPL scholarship", "1,500
  hours flight building FREE", and fake "Limited Seats Available" urgency
  banners, differing only in title/H1 and image asset paths). Both were fixed
  in place this run (claims removed, made non-identical) rather than 301-
  consolidated, to preserve both keyword targets. `scripts/seo-audit.js`
  (wired as `npm run verify:meta`) catches duplicate title/description pairs
  by n-gram similarity — worth running it standalone every week, since this
  pair would have been caught by title/description alone before anyone read
  the body copy.
- **`scripts/audit-content.cjs` (render smoke test) needs
  `@babel/preset-react` and `@babel/plugin-transform-modules-commonjs`
  installed ad hoc** (`npm install --no-save ...`) — this is by design per the
  script's own header comment, not a bug. Do this before trusting its output;
  a "Cannot find module '@babel/preset-react'" wall of failures is the missing
  install, not 100+ broken pages.
- **`geo-qa.js` section 2's duplicate-schema check had a false-positive
  pattern**: it counted every `'@type': 'EducationalOrganization'` occurrence
  in a file, including ones nested inside `publisher:`/`provider:` on an
  Article or Course node — which is the schema.org-recommended shape, not a
  duplicate. Fixed this run with a negative lookbehind excluding nested
  references from the top-level count. If this pattern recurs for another
  type (e.g. a nested `Person` inside `author:`), apply the same fix rather
  than treating the flag as a real duplicate.

- **The claims gate has zero coverage for prose-form guarantee/placement/success
  claims that don't carry a specific percentage or headcount.** `pages/index.jsx`
  (the homepage) and `pages/pilot-training-in-india.jsx` carried "guaranteed
  instructor job opportunities," "Hundreds of successful pilots flying with
  leading airlines," a "100% Loan" financing guarantee, and a "Topper
  Scholarship... Money-Back Guarantee" with no documented terms anywhere in
  the repo — none of it caught by `npm run check:claims`, because every
  existing pattern requires a literal digit string or "%" sign next to the
  trigger word. Fixed the content and added 7 new patterns this run (see
  `scripts/check-claims.js`, dated 2026-09-26). **Do not assume the claims
  gate passing means the site is free of fabricated claims** — it catches
  the specific phrasings it has patterns for. A periodic manual read of the
  homepage and other top-of-funnel pages (not just the pages a diff touches)
  is still worth doing; this run only found the issue by accident while
  chasing an unrelated duplicate-meta-description flag.
- **Lighthouse (desktop) scores well across all 4 pages sampled this run**
  (Performance 99–100, Best Practices 96, SEO 92–100) **except two systemic
  gaps**: `color-contrast` fails on every page (shared low-opacity Tailwind
  text classes — `text-white/60`, `text-gray-400`, `.section-tag` — used in
  footer/hero/sidebar components; needs a real design-token pass, logged for
  the next Design/Perf rotation) and `errors-in-console` shows
  `ERR_TUNNEL_CONNECTION_FAILED` for `googletagmanager.com` and a
  `tecmicra.com` webhook — almost certainly this sandboxed environment's
  outbound proxy blocking those hosts rather than a live defect; re-check
  against the deployed site rather than trusting the sandbox reading here.
  `lighthouse` and `chrome-launcher` aren't tracked dependencies — install
  ad hoc (`npm install --no-save lighthouse chrome-launcher`) and point
  `CHROME_PATH` at `/opt/pw-browsers/chromium-*/chrome-linux/chrome` in this
  environment; a real `npx lighthouse` install works fine here (no network
  restriction on registry.npmjs.org), unlike a bare `npx lighthouse` without
  a prior install, which prompts for confirmation and hangs non-interactively.

### Verification scripts now wired into package.json

`verify:links` (→ `scripts/audit-links.cjs`), `verify:schema` (→ `geo-qa.js`,
which also covers most of what a `verify:meta`-style check would do:
schema-uniqueness, redirect chains, llms.txt/sitemap parity, facts-consistency
against `lib/facts.js`), `verify:meta` (→ `scripts/seo-audit.js`, duplicate
title/description finder), `audit:crawl` (→ new `scripts/audit-crawl.mjs`,
crawls a running local server and writes `docs/audit/inventory-<week>.json`),
and `verify:all` chaining lint → claims → build → links → schema → meta.
Run `npm start` in the background before `audit:crawl` — it needs a live
server on `http://localhost:3000` (override with `AUDIT_BASE_URL`).

### Known false positives / accepted exceptions in the audit tooling

Re-check these stay explained rather than "fixed" in future runs:

- `scripts/audit-links.cjs` flags `/favicon.ico` and `/pdfs` as broken
  internal links. Both are deliberate: favicon.ico is a real static file in
  `public/` (the script only resolves `pages/` routes, not static assets),
  and `/pdfs` is a documented graceful-degradation path in
  `components/PdfLeadMagnet.jsx` that HEAD-checks for the file and no-ops if
  absent (no `public/pdfs/` directory exists yet by design).
- `geo-qa.js` section 8 (llms.txt/sitemap parity) will always show
  `/blogs/pilot-salary-in-india-2026` as "in sitemap but not llms.txt" — see
  the canonical-URL note above. This is correct; do not add it to llms.txt.
- The remaining ~22 `geo-qa.js` failures after this run's fixes are all
  inside `pages/blogs/*.jsx` (medical-class-split / DGCA-subject-count
  inconsistencies against `lib/facts.js`, and missing route-specific FAQs on
  a handful of recent posts). These are the daily blog routine's content,
  not this routine's — see "Blog-routine content debt" in the backlog.
