# GEO Audit Report: We One Aviation Academy

**Audit Date:** 2026-08-11
**URL:** https://weoneaviation.in
**Business Type:** Local Business / Educational Organization (hybrid — DGCA pilot training institute, Dwarka New Delhi, with national + international service pages)
**Pages Analyzed:** 40 live pages fetched and parsed (sitemap contains 116 URLs)
**Stack:** Next.js (Pages Router) on Vercel — fully server-rendered
**Prior baseline:** `GEO-AUDIT-REPORT-2026-08-03.md` (scored 71 — see *Comparison to Prior Audit* for why this run scores lower)

---

> ## ⚠️ Read this first: the live site is not built from this repository
>
> Discovered while implementing the fixes on 2026-08-11. Production serves
> **www**-based canonicals, a `www` sitemap, and a plain-text `llms.txt`. This
> repository's `geo-aeo-optimization` branch contains **apex**-based canonicals,
> an apex sitemap, and a Markdown-formatted `llms.txt` — different content
> entirely. `master` contains neither.
>
> So the canonical bug (C1) below is **not** an unfixed bug in this codebase. It
> was already fixed here on 2026-08-03 and never deployed. Production is running
> code that exists in no branch of this repo.
>
> **This means C1 cannot be fixed by editing code — it is fixed by deploying
> this branch.** Until that happens, none of the work recorded here reaches
> users. Reconciling how production is deployed is the highest-priority action
> on this report.
>
> See *Implementation Log* at the end for everything that was changed and verified.

---

## Executive Summary

**Overall GEO Score: 54/100 (Poor)** — measured against the deployed site, not this branch.

The site's *access* layer for AI is genuinely strong — every major AI crawler is explicitly allowed, a real `llms.txt` exists, all content is server-rendered, and TTFB is 0.21s. What holds it back is everything downstream of access: a sitewide canonical bug that points all 116 pages at a hostname that 301-redirects, three near-identical CPL pages at 97–99% content overlap, **zero outbound citations to any authoritative source across all 40 pages audited**, no publish/update dates anywhere, and an `AggregateRating` of 4.9/3500 that is not backed by a single `Review` node. AI systems can reach this site easily; they have little reason to trust or quote it over a source that cites DGCA directly.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 62/100 | 25% | 15.5 |
| Brand Authority | 42/100 | 20% | 8.4 |
| Content E-E-A-T | 48/100 | 20% | 9.6 |
| Technical GEO | 66/100 | 15% | 9.9 |
| Schema & Structured Data | 58/100 | 10% | 5.8 |
| Platform Optimization | 50/100 | 10% | 5.0 |
| **Overall GEO Score** | | | **54.2/100** |

---

## Critical Issues (Fix Immediately)

### C1. Every canonical tag points to a hostname that 301-redirects
**Affects:** all 40 pages audited; by extension all 116 sitemap URLs.

Verified:
```
curl -sI https://www.weoneaviation.in/   →  301 → https://weoneaviation.in/
curl -sI https://weoneaviation.in/       →  200
```
Yet every page emits `<link rel="canonical" href="https://www.weoneaviation.in/...">`. All 40 pages checked resolved to canonical host `www.weoneaviation.in` — 40/40.

The site serves on the apex domain but declares `www` as canonical. Every canonical is therefore a pointer to a redirect. The same defect propagates into three more places:
- `sitemap.xml` — all 116 `<loc>` entries use `www.`
- `llms.txt` — all ~25 listed URLs use `www.`
- JSON-LD — `url`, `@id`, `logo`, and `image` fields all use `www.`

**Impact:** conflicting indexation signals sitewide. AI retrieval layers that resolve canonicals get a redirect hop on every fetch; some drop the URL rather than follow it.

**Fix:** pick apex (`https://weoneaviation.in`) as canonical since that is what the server actually serves, then replace `https://www.weoneaviation.in` → `https://weoneaviation.in` in the canonical helper, sitemap generator, `llms.txt`, and every JSON-LD template. Alternatively flip the Vercel redirect to send apex → www; either works, but the four sources must agree.

### C2. Three pages carry 97–99% identical content
Measured by 8-gram shingle overlap on visible text:

| Page A | Page B | Overlap |
|---|---|---|
| `/courses/cpl` | `/courses/cpl-flight-training` | **97%** |
| `/courses/cpl` | `/blogs/cpl-full-form` | **98%** |
| `/courses/cpl-flight-training` | `/blogs/cpl-full-form` | **99%** |

All three are ~2,575 words and self-canonical. `/courses/cpl` and `/courses/cpl-flight-training` also share the duplicate title *"Commercial Pilot License (CPL) Training in India | WeOne Aviation"* and an identical meta description.

**Impact:** AI systems deduplicate near-identical passages and keep at most one. Three URLs compete for the same citation slot, and none accrues authority. This is also the single clearest low-quality signal on the site.

**Fix:** keep `/courses/cpl-flight-training` as the canonical CPL training page (most specific URL). Make `/courses/cpl` a 301 to it. Rewrite `/blogs/cpl-full-form` as what its URL promises — a short definitional page answering "what does CPL stand for" — not a duplicate of the course page.

---

## High Priority Issues (Fix Within 1 Week)

### H1. Zero outbound citations to authoritative sources — sitewide
Across all 40 pages, the complete set of external domains linked is:

`fonts.googleapis.com`, `fonts.gstatic.com`, `unpkg.com`, `maps.google.com`, `wa.me`, `www.facebook.com`, and `emiratesflighttrainingacademy.com` (one page).

There is **not one link to `dgca.gov.in`**, ICAO, `civilaviation.gov.in`, or any regulatory or statistical source — on a site whose entire content premise is explaining DGCA regulations, medical standards, exam syllabi, and flying-hour requirements. `accreditedBy` in the JSON-LD references the DGCA URL, but no visible page body ever links to it.

**Impact:** this is the largest single E-E-A-T deficit. Models weight sourced claims far above unsourced ones, and a page that restates regulations without pointing at the regulator reads as derivative.

**Fix:** add inline citations to `dgca.gov.in` on the regulatory pages first — `/air-regulations`, `/dgca-class-2-class-1-medical`, `/commercial-pilot-license-eligibility`, `/commercial-pilot-license-syllabus`, `/dgca-computer-number`. One or two authoritative links per page, in the body text next to the claim they support.

### H2. `AggregateRating` of 4.9 / 3500 reviews with no `Review` markup
Homepage JSON-LD:
```json
"aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"3500","bestRating":"5"}
```
Two problems. First, `reviewCount: 3500` mirrors the site's "3500+ Pilots Trained" figure — that is a count of students, not reviews. Second, there are no `Review` nodes anywhere on the site to support it, and the rating is self-serving (an organization rating itself), which Google's structured-data policy disallows for `Organization`-type self-markup.

Third-party data does not corroborate it either: Justdial shows 5.0 across ~1,294–1,311 ratings; ProvenExpert shows 4.6 from 5 users. Neither is 4.9/3500.

**Impact:** risk of a structured-data manual action, and a verifiably wrong number is exactly the kind of claim that damages trust scoring when a model can cross-check it.

**Fix:** remove the `aggregateRating` block. Replace it by collecting first-party reviews and marking them up with real `Review` nodes, or cite the Justdial rating on-page as an attributed third-party figure rather than as self-declared schema.

### H3. No publication or modification dates anywhere on the site
Zero `datePublished` or `dateModified` properties across all 40 pages' JSON-LD, and no visible "last updated" line on any content page except `/credentials`. Blog posts under `/blogs/` carry no dates at all.

**Impact:** AI systems strongly prefer content they can date, especially for regulatory subject matter that changes. Undated pages about DGCA rules are treated as stale by default.

**Fix:** add `datePublished` and `dateModified` to every content page's schema and render a visible "Last updated: <date>" near the H1.

### H4. No `Article` / `BlogPosting` schema on any blog post
`/blogs/dgca-exam-guide`, `/blogs/cpl-full-form`, and the rest carry only the sitewide `Organization` + `WebSite` boilerplate. No `Article`, no `author`, no `headline`, no dates.

**Fix:** add `BlogPosting` schema with `author` (a real named person — the faculty from `/credentials` are the obvious candidates), `datePublished`, `dateModified`, and `headline`.

### H5. `/our-courses` is live and indexed but blocked in `robots.txt`
`robots.txt` contains `Disallow: /our-courses/`, yet `https://weoneaviation.in/our-courses` returns **200** and appears in Google results. The page is absent from `sitemap.xml`.

**Impact:** an indexed URL that crawlers are told not to fetch — Google shows it without a description, and AI crawlers skip it entirely.

**Fix:** decide the page's fate. If it is superseded by `/courses`, 301 it there and drop the robots rule. If it is live content, remove the `Disallow`, add it to the sitemap, and give it a canonical.

---

## Medium Priority Issues (Fix Within 1 Month)

### ~~M1. Announcement ticker pollutes the first extracted paragraph on every page~~ — RETRACTED 2026-08-11

**This finding was wrong.** It was an artifact of the audit script, not a defect on the site.

The extractor used the pattern `<p[^>]*>` to find paragraphs. That pattern also matches SVG `<path>` elements — `<p` followed by `ath ...`. Pages here contain many inline SVG icons, so the script was reporting SVG and navigation markup as the page's opening paragraph.

Re-running with a corrected pattern (`<p(?:\s[^>]*)?>`), and scoping extraction to `<main>`, the real first paragraphs are clean and were never affected. Actual output:

| Page | True first paragraph |
|---|---|
| `/` | "Get world-class flight training, DGCA-approved courses, and expert guidance to kickstart your aviation career." |
| `/commercial-pilot-license` | "You usually complete 10+2 with Physics and Mathematics, pass DGCA Class 1 medical, join DGCA ground classes…" |
| `/how-to-become-a-pilot-after-12th` | "If you've just completed your 12th grade and dream of flying commercial aircraft, you're already at the right stage…" |
| `/dgca-ground-classes` | "India's best DGCA Ground Classes — delivering 100% results every year and having trained over 3,000 pilots across India." |

The ticker sits outside `<main>`, which is already correct markup. Two genuinely useful changes were still made while investigating, but neither is the citability fix this item claimed:

- The ticker is now an `<aside role="complementary">` rather than a bare `<div>`, and its duplicated second copy (rendered for the CSS marquee loop) is `aria-hidden` — previously screen readers announced all seven messages twice.
- The stale "Apply for **March** CPL Batch" copy — still running in August — was made evergreen.

**Lesson for future audits:** validate any regex-derived finding against the rendered DOM before reporting it.

### M2. `FAQPage` schema present on only 7 of 40 pages despite widespread Q-format headings
Pages with question-style H2/H3s but **no** FAQ schema include `/dgca-full-form` (20 question headings), `/how-to-become-a-pilot-after-12th` (11), `/courses/dgca-ground-classes` (10), `/commercial-pilot-license` has it, but `/air-navigation` (5), `/aviation-meteorology` (5), `/rtr-a` (5), `/emirates-cadet-pilot-program` (8), `/blogs/dgca-exam-guide` (6) do not.

**Fix:** the Q&A content is already written — wrapping it in `FAQPage` schema is mechanical. Prioritize `/dgca-full-form` and `/how-to-become-a-pilot-after-12th`, which have the most question headings and the highest query volume.

### M3. Duplicate `Organization` JSON-LD block on the homepage
Blocks 4 and 5 of the homepage's 8 JSON-LD scripts are byte-identical, both declaring `"@id": "https://www.weoneaviation.in/#organization"`. Two nodes claiming the same `@id` is a graph conflict.

**Fix:** emit the `Organization` block once. Likely a component rendering both a global and a page-level instance.

### M4. `sameAs` lists only two social profiles
Current: Facebook and Instagram. No LinkedIn, no YouTube, no Google Business Profile, no Wikidata, no Justdial. Searches for the brand on YouTube, LinkedIn, Reddit, and Quora returned nothing.

**Impact:** `sameAs` is the primary entity-reconciliation signal. Two consumer social links is a thin identity graph for a 16-year-old institution.

**Fix:** create/claim LinkedIn and YouTube, then add all profiles — including the Justdial and Sulekha listings and the Google Business Profile — to `sameAs`.

### M5. Two parallel city-page URL systems
`/pilot-training-in-delhi` (flat, ~2,522 words, `LocalBusiness` + `FAQPage` schema) and `/pilot-training-in/delhi` (nested, 817 words, no local schema) both exist and both sit in the sitemap. Same for Mumbai, Bangalore, Kolkata, Pune, Jaipur, Hyderabad, Kerala, Punjab, Gujarat, Haryana, Nagpur.

Content overlap between the two Delhi pages is only 11%, so they are not duplicates — but they are two competing answers to the same query, and the nested versions are markedly thinner.

**Fix:** 301 the nested `/pilot-training-in/<city>` set to the flat equivalents. Also remove `/pilot-training-in/fallback` and `/pilot-training-in/paths` from the sitemap — those are template artifacts, not pages.

### M6. Thin pages under 800 words
`/indigo-pilot-preparation` (374), `/contact` (453), `/student-pilot-license-spl` (594), `/courses/atpl` (628), `/faqs` (635), `/about-us` (660), `/flying-school/canada` (717), `/how-to-become-a-pilot/in-india` (726), `/credentials` (751).

`/courses/atpl` and `/flying-school/canada` are the notable ones — both are commercially important and both underperform their siblings (`/flying-school/india` is 1,736 words, `/flying-school/south-africa` 1,945). The `llms.txt` even concedes Canada is "currently mapped to the pilot training programs template."

### M7. Case-sensitive URL collision
`/Indigo-pilot-preparation` → 200 (this is the sitemap version). `/indigo-pilot-preparation` → **404**. Same pattern for `/Airindia-pilot-preparation`.

**Fix:** rename to lowercase and 301 the capitalized forms. Mixed-case URLs generate avoidable 404s from any lowercased inbound link.

### M8. `/aviation-academy-we-one-aviation-academy` returns 404 but is indexed
Surfaced in live search results, returns 404. Either restore it or 301 it to `/about-us`.

---

## Low Priority Issues

- **L1. Multiple H1s on 8 pages:** `/air-regulations`, `/aviation-meteorology`, `/courses`, `/dgca-class-2-class-1-medical`, `/emirates-cadet-pilot-program`, `/flying-school/usa`, `/rtr-a`, `/technical-general` each have 2. `/faqs` has **zero** H1.
- **L2. `/blogs` title is 22 chars and meta description 49 chars** — both far below the useful range, on a hub page with 32 H2s.
- **L3. `BreadcrumbList` on the homepage contains a single item** ("Home"). Breadcrumbs are absent on deep pages like `/courses/cpl-flight-training` and `/flying-school/australia` where they would actually help.
- **L4. `/credentials` states "Last Audited Q4 2024 - Full Compliance"** — that is 18+ months stale as of this audit, on the page whose entire purpose is verification.
- **L5. Spun-reading prose on `/commercial-pilot-license-salary`:** "Commercial pilot salary bases its amount on a combination of flight experience with the aircraft type and airline partnership and geographic location." The page also has no salary table despite being the salary page.
- **L6. No `WebSite` `SearchAction` target that works** — `potentialAction` points to `/?s={search_term_string}`, a WordPress search pattern this Next.js site does not implement.
- **L7. Core Web Vitals unverified.** PageSpeed Insights returned HTTP 429 (daily quota exhausted, no API key configured) on both attempts, and CrUX has no field data for the origin. Lab and field CWV could not be measured this run — treat performance as unassessed rather than passing. Synthetic signals are good (TTFB 0.21s, 135 KB HTML, 10 script tags, full SSR).

---

## Category Deep Dives

### AI Citability (62/100)

**Strengths.** Content is fully server-rendered — GPTBot, ClaudeBot, and PerplexityBot receive complete HTML with no JS execution needed. Average word count across the 40 pages is ~1,470, with strong depth on `/courses/dgca-ground-classes` (3,496), the homepage (2,986), `/dgca-full-form` (2,618), and the three city pages (~2,550 each). Several pages open with genuinely quotable direct answers:

> "You usually complete 10+2 with Physics and Mathematics, pass DGCA Class 1 medical, join DGCA ground classes, clear the required exams, and complete at least 200 flying hours at an approved flying school." — `/commercial-pilot-license`

> "Yes. You can become a pilot after completing Class 12, provided you meet the eligibility requirements set by the DGCA." — `/how-to-become-a-pilot-after-12th`

That is exactly the extractable form AI systems favour: a self-contained sentence that answers the question without needing surrounding context. `/dgca-full-form` (20 question headings), `/how-to-become-a-pilot-after-12th` (11), and `/courses/dgca-ground-classes` (10) are well structured for passage retrieval. Tables appear on 15 pages; `/courses/ppl` has 3.

**Weaknesses.** The 97–99% CPL triplication (C2) is the biggest drag — it makes the site's most commercially important topic un-citable in practice. The ticker (M1) corrupts lead-paragraph extraction on every single page. No dates (H3) means every passage is undatable. And some prose actively resists quotation:

> "After getting their CPL through training and certification pilots can obtain their commercial pilot license salary as monthly or yearly pay." — `/commercial-pilot-license-salary`

A model will not quote that. Compare with the `/commercial-pilot-license` example above from the same site — the gap in quality is wide.

**Highest-leverage rewrites:**
1. Give `/commercial-pilot-license-salary` an actual salary table (entry-level FO / senior FO / captain, by airline tier, in ₹ lakh per month) with a one-sentence direct answer above it.
2. Add a one-sentence direct answer under the H1 of every subject guide (`/air-navigation`, `/air-regulations`, `/aviation-meteorology`, `/technical-general`, `/rtr-a`) — they currently open with context, not answers.
3. Move the ticker out of first-paragraph position.

### Brand Authority (42/100)

**Verified presence:**

| Platform | Status |
|---|---|
| Justdial | Listed, 5.0 rating, ~1,294–1,311 ratings — strongest external signal |
| Sulekha | Listed with contact/address |
| IndiaOnline | Listed |
| ProvenExpert | 4.6/5 from 5 users |
| Instagram | Active, in `sameAs` |
| Facebook | Active, in `sameAs` |
| **Wikipedia** | **None** |
| **LinkedIn** | **None found** |
| **YouTube** | **None found** |
| **Reddit / Quora** | **None found** |

**Assessment.** Presence is real but concentrated entirely in Indian business directories, which carry low weight in the corpora AI models train on and low citation weight in live retrieval. The absence of YouTube is the most costly gap for this specific business: "how to become a pilot after 12th" and "DGCA ground classes" are queries where AI answers routinely cite video explainers, and the academy has 16 years of faculty expertise and zero video footprint. The absence of any Reddit or Quora presence matters for Perplexity in particular, which leans heavily on both.

**Priority order:** YouTube channel → LinkedIn company page → answering DGCA/CPL questions on Quora and r/flying / r/india aviation threads under a transparent brand identity → Wikidata entity.

### Content E-E-A-T (48/100)

**Experience — moderate.** `/credentials` names four faculty with DGCA license identifiers (Capt. Rajesh Kumar DGCA/LIC/1998-456, Ms. Priya Sharma DGCA/LIC/2012-782, Capt. Vikas Patel DGCA/LIC/2008-334, Dr. Anil Verma AME/2005-123) and these names are mirrored in `Person` JSON-LD with `jobTitle`, `knowsAbout`, and `identifier`. That is above-average practice. But these people appear on exactly **2 of 40 pages** (homepage and `/credentials`) and author nothing — 38 pages of technical aviation content carry no attributable expert.

**Expertise — undermined by lack of sourcing.** See H1: zero authoritative outbound links sitewide.

**Authoritativeness — weak.** Claims like "98% success rate" and "100% DGCA Exam Pass Rate" cite "Source: DGCA exam pass rate tracking" — i.e. themselves. "3500+ Pilots Trained" is sourced to "DGCA-approved training records" with no external verification path. `/credentials` claims ISO 9001:2015, IATA certification, and IAAPI membership with no certificate numbers or verification links.

**Trustworthiness — damaged by H2.** The 4.9/3500 `AggregateRating` is contradicted by every third-party source. On a page set that is otherwise trying hard to be transparent, an unverifiable rating is self-defeating. The stale "Last Audited Q4 2024" (L4) compounds it.

**Fastest E-E-A-T gains:** byline the subject guides to the relevant faculty member (`/aviation-meteorology` → Ms. Priya Sharma, who the schema already says published research on aviation meteorology); add DGCA source links; add certificate numbers to the ISO/IATA/IAAPI claims or remove them; drop the fake aggregate rating.

### Technical GEO (66/100)

**AI crawler access — excellent, and the site's best asset.** `robots.txt` explicitly allows, by name: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`. Blocks are limited to commercial SEO scrapers (Ahrefs, Semrush, DotBot, MJ12, SEOkicks). This is better than most sites achieve.

**`llms.txt` — present and well-formed.** 3,797 bytes at `/llms.txt`, HTTP 200, `text/plain`. Organized into Courses / Flying schools by country / How to become a pilot / DGCA subject guides / Trust & credentials / Contact, each entry annotated with a real description. Two defects: every URL uses the redirecting `www` host (C1), and it candidly documents a content gap ("Canada route page currently mapped to the pilot training programs template").

**Rendering and speed.** Full SSR confirmed — 135 KB of HTML with title, H1, meta, and 8 JSON-LD blocks all present pre-JS. TTFB 0.206s, total 0.246s, 10 external script tags. Vercel edge cache HIT.

**Security headers.** HSTS `max-age=63072000`, a detailed CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`. Clean.

**Deductions:** the sitewide canonical/redirect conflict (C1), robots-vs-index conflict on `/our-courses` (H5), case-sensitive 404s (M7), the indexed 404 (M8), sitemap entries for template artifacts (`/pilot-training-in/fallback`, `/pilot-training-in/paths`), and unverifiable CWV (L7).

### Schema & Structured Data (58/100)

**Present on 40/40 pages** — a real improvement over the prior audit's finding of 3 pages.

Types observed: `EducationalOrganization`, `Organization`, `WebSite`, `SearchAction`, `ContactPoint`, `PostalAddress`, `GeoCoordinates`, `Course`, `ItemList`, `AggregateOffer`, `FAQPage`, `Question`, `Answer`, `BreadcrumbList`, `Person`, `LocalBusiness`, `AggregateRating`.

**Well done:** `EducationalOrganization` with `foundingDate`, `accreditedBy` → DGCA, full `PostalAddress` + `GeoCoordinates` (28.5921, 77.0460); `LocalBusiness` + `FAQPage` on the three flagship city pages; `Person` nodes with DGCA license identifiers; `Course` + `AggregateOffer` on `/courses/atpl`, `/courses/cpl-flight-training`, `/commercial-pilot-license`, `/dgca-ground-classes`.

**Defects:** the `AggregateRating` policy risk (H2), the duplicate `@id` `Organization` block (M3), all `url`/`@id`/`logo` values on the redirecting host (C1), no `Article`/`BlogPosting` anywhere (H4), no `datePublished`/`dateModified` anywhere (H3), `sameAs` with only 2 entries (M4), a 1-item `BreadcrumbList` (L3), a non-functional `SearchAction` target (L6), and `FAQPage` missing on ~20 pages that have FAQ content (M2).

**Missing opportunities:** `Review` nodes (would legitimize ratings), `EducationalOccupationalProgram` (a better fit than `Course` for CPL/ATPL programs — supports `timeToComplete`, `occupationalCategory`, `programPrerequisites`), `VideoObject` (once YouTube exists), `HowTo` on `/how-to-become-a-pilot-after-12th`.

### Platform Optimization (50/100)

| Platform | Readiness | Notes |
|---|---|---|
| **Google AI Overviews** | Moderate | FAQ schema on 7 pages, direct-answer paragraphs, `LocalBusiness` on city pages. Held back by no dates, no citations, duplicate CPL cluster. |
| **ChatGPT (OAI-SearchBot)** | Moderate | Crawl access is perfect and `llms.txt` helps. Weak third-party corroboration limits how often it will be selected as a source. |
| **Perplexity** | Weak | `PerplexityBot` + `Perplexity-User` allowed, but Perplexity leans on Reddit, Quora, and Wikipedia — the site has presence on none of them. |
| **Google Gemini** | Moderate | `Google-Extended` allowed; inherits the AI Overviews profile. |
| **Bing Copilot** | Weak-Moderate | `Bingbot` allowed. No IndexNow implementation, no evidence of Bing Webmaster Tools verification. |

The pattern is consistent: access is solved, corroboration is not. Every platform gap traces back to the same two root causes — no authoritative citations on-site, and no brand footprint on the third-party platforms these engines preferentially cite.

---

## Comparison to Prior Audit

The 2026-08-03 audit scored **71**; this run scores **54**. The site did not regress — schema coverage in fact went from 3 pages to 40. The difference is methodology:

| Category | Aug 3 | Aug 11 | Why |
|---|---|---|---|
| Citability | 80 | 62 | Aug 3 did not measure cross-page duplication. The 97–99% CPL overlap and the ticker's effect on lead-paragraph extraction were not caught. |
| E-E-A-T | 82 | 48 | Aug 3 credited the `/credentials` page and `Person` schema. This run additionally checked whether claims are *sourced* — zero outbound authoritative links, and third-party data contradicting the 4.9/3500 rating. |
| Schema | 50 | 58 | Genuine improvement — sitewide schema rollout landed. Offset by the duplicate `@id` and the `AggregateRating` risk. |
| Technical | 72 | 66 | Same canonical bug, plus newly found `/our-courses` robots conflict, case-sensitive 404s, and CWV now unmeasurable. |

Treat 54 as the corrected baseline. C1 (the canonical bug) was flagged on Aug 3 and is **still unfixed** eight days later — it remains the highest-leverage single change available.

---

## Quick Wins (Implement This Week)

1. **Fix the www/apex canonical across all four sources** (canonical tags, sitemap, `llms.txt`, JSON-LD). One find-and-replace plus a sitemap regeneration; resolves conflicting signals on 116 URLs. *Highest impact-to-effort ratio on the site.*
2. **Delete the `aggregateRating` block** from the homepage JSON-LD. One deletion; removes a policy risk and a verifiably false claim.
3. **301 `/courses/cpl` → `/courses/cpl-flight-training`** and rewrite `/blogs/cpl-full-form` as a genuine definitional page. Collapses a 3-way duplicate into one citable page.
4. **Add DGCA source links to the five regulatory pages** (`/air-regulations`, `/dgca-class-2-class-1-medical`, `/commercial-pilot-license-eligibility`, `/commercial-pilot-license-syllabus`, `/dgca-computer-number`). Roughly ten links total; addresses the single largest E-E-A-T gap.
5. **Move the announcement ticker below the H1 in DOM order** and update the stale "March batch" copy. Fixes lead-paragraph extraction on all 116 pages at once.

## 30-Day Action Plan

### Week 1: Stop the bleeding — indexation and trust integrity
- [ ] Replace `https://www.weoneaviation.in` with `https://weoneaviation.in` in the canonical helper, `sitemap.xml`, `llms.txt`, and all JSON-LD templates (C1)
- [ ] Remove the `aggregateRating` block from homepage schema (H2)
- [ ] 301 `/courses/cpl` → `/courses/cpl-flight-training`; rewrite `/blogs/cpl-full-form` (C2)
- [ ] Resolve `/our-courses`: either 301 to `/courses` or unblock in robots and add to sitemap (H5)
- [ ] Lowercase `/Indigo-pilot-preparation` and `/Airindia-pilot-preparation` with 301s from the capitalized forms (M7)
- [ ] 301 `/aviation-academy-we-one-aviation-academy` → `/about-us` (M8)
- [ ] Remove the duplicate `Organization` JSON-LD block (M3)
- [ ] Configure a PageSpeed Insights API key so CWV can actually be measured next run (L7)

### Week 2: Sourcing and freshness
- [ ] Add DGCA/ICAO citations to the five regulatory pages, then extend to all subject guides (H1)
- [ ] Add `datePublished` + `dateModified` to every content page's schema and a visible "Last updated" line (H3)
- [ ] Add `BlogPosting` schema with named faculty authors to all `/blogs/` posts (H4)
- [ ] Byline the five DGCA subject guides to the matching faculty member from `/credentials`
- [ ] Update `/credentials`: refresh "Last Audited Q4 2024", add certificate numbers or verification links for ISO 9001:2015, IATA, and IAAPI (L4)

### Week 3: Structure and citability
- [ ] Move the announcement ticker below the H1 in DOM order; update stale batch copy (M1)
- [ ] Add `FAQPage` schema to `/dgca-full-form`, `/how-to-become-a-pilot-after-12th`, `/courses/dgca-ground-classes`, `/emirates-cadet-pilot-program`, and the four subject guides (M2)
- [ ] Rewrite `/commercial-pilot-license-salary` with a real salary table and a direct-answer opener (L5)
- [ ] Add a one-sentence direct answer beneath the H1 of each subject guide
- [ ] 301 the nested `/pilot-training-in/<city>` set to the flat equivalents; drop `/pilot-training-in/fallback` and `/pilot-training-in/paths` from the sitemap (M5)
- [ ] Fix the 8 multi-H1 pages and add an H1 to `/faqs` (L1)
- [ ] Expand `/courses/atpl` and `/flying-school/canada` past 1,500 words with country/programme-specific detail (M6)

### Week 4: Off-site authority
- [ ] Create a YouTube channel; publish 3–5 videos from existing content ("How to become a pilot after 12th", "DGCA Class 1 medical explained", "What ground classes actually cover")
- [ ] Create a LinkedIn company page with faculty linked as employees
- [ ] Add LinkedIn, YouTube, Google Business Profile, Justdial, and Sulekha to `sameAs` (M4)
- [ ] Answer 5–10 DGCA/CPL questions on Quora under a transparent brand identity
- [ ] Create a Wikidata entity for We One Aviation Academy
- [ ] Add `VideoObject` schema once videos are live; add `EducationalOccupationalProgram` to CPL/ATPL/PPL pages
- [ ] Re-run this audit and compare against this report as baseline

---

## Appendix: Pages Analyzed

40 pages fetched; 39 returned HTTP 200, 1 returned 404 (`/indigo-pilot-preparation` — lowercase variant of a live capitalized URL).

| URL | Words | Title len | H1s | Schema beyond boilerplate | Notes |
|---|---|---|---|---|---|
| `/` | 2,986 | 56 | 1 | Course, FAQPage, AggregateRating, Person×4, BreadcrumbList | Duplicate Organization block; fake rating |
| `/courses/dgca-ground-classes` | 3,496 | 61 | 1 | — | Deepest page; no FAQ schema despite 10 Q-headings |
| `/dgca-full-form` | 2,618 | 73 | 1 | — | 20 Q-headings, no FAQ schema |
| `/pilot-training-in-mumbai` | 2,608 | 73 | 1 | LocalBusiness, FAQPage | Solid |
| `/courses/cpl-flight-training` | 2,579 | 72 | 1 | Course, AggregateOffer | 99% dup with `/blogs/cpl-full-form` |
| `/blogs/cpl-full-form` | 2,577 | 65 | 1 | — | 99% dup |
| `/courses/cpl` | 2,575 | 65 | 1 | — | 97% dup; duplicate title |
| `/pilot-training-in-bangalore` | 2,566 | 76 | 1 | LocalBusiness, FAQPage | Solid |
| `/pilot-training-in-delhi` | 2,522 | 72 | 1 | LocalBusiness, FAQPage | Solid |
| `/dgca-ground-classes` | 2,376 | 77 | 1 | Course, FAQPage, AggregateOffer, BreadcrumbList | Best-marked-up page |
| `/commercial-pilot-license` | 2,305 | 63 | 1 | Course, FAQPage, AggregateOffer | Good direct answers |
| `/courses/ppl` | 2,169 | 72 | 1 | — | 3 tables |
| `/flying-school/south-africa` | 1,945 | 79 | 1 | — | |
| `/dgca-class-2-class-1-medical` | 1,855 | 72 | **2** | — | Needs DGCA citation |
| `/flying-school/india` | 1,736 | 71 | 1 | — | |
| `/how-to-become-a-pilot-after-12th` | 1,690 | 63 | 1 | — | 11 Q-headings, no FAQ schema |
| `/flying-school/australia` | 1,540 | 94 | 1 | — | Title over-long |
| `/blogs` | 1,463 | **22** | 1 | — | Title + meta far too short |
| `/courses` | 1,333 | 94 | **2** | — | Title over-long |
| `/flying-school/usa` | 1,283 | 84 | **2** | — | |
| `/blogs/dgca-exam-guide` | 1,226 | 82 | 1 | — | No Article schema |
| `/air-regulations` | 1,192 | 72 | **2** | — | Zero citations on a regulations page |
| `/commercial-pilot-license-eligibility` | 1,176 | 64 | 1 | — | |
| `/commercial-pilot-license-salary` | 1,134 | 69 | 1 | — | Spun prose; no salary table |
| `/air-navigation` | 1,116 | 66 | 1 | — | |
| `/emirates-cadet-pilot-program` | 1,078 | 70 | **2** | — | 8 Q-headings, no FAQ schema |
| `/rtr-a` | 1,056 | 73 | **2** | — | |
| `/technical-general` | 1,028 | 74 | **2** | — | |
| `/aviation-meteorology` | 980 | 67 | **2** | — | |
| `/commercial-pilot-license-syllabus` | 821 | 69 | 1 | — | |
| `/pilot-training-in/delhi` | 817 | 64 | 1 | — | Competes with flat Delhi page |
| `/credentials` | 751 | 52 | 1 | EducationalOrganization | Stale audit date |
| `/how-to-become-a-pilot/in-india` | 726 | 74 | 1 | — | Thin |
| `/flying-school/canada` | 717 | 76 | 1 | — | Thin; template-mapped |
| `/about-us` | 660 | 69 | 1 | — | Thin for a trust page |
| `/faqs` | 635 | 30 | **0** | FAQPage | No H1 |
| `/courses/atpl` | 628 | 73 | 1 | Course, AggregateOffer | Thin for a flagship course |
| `/student-pilot-license-spl` | 594 | 60 | 1 | — | Thin |
| `/contact` | 453 | 53 | 1 | — | Acceptable for page type |
| `/indigo-pilot-preparation` | — | — | — | — | **404** (capitalized `/Indigo-...` is live) |

**Not fetched:** 76 further sitemap URLs (state-level `/pilot-training-in-*` pages, airline preparation pages, full-form pages, `/privacy-policy`, `/terms`) — excluded under the 50-page audit cap in favour of high-value pages.

**Measurement gaps in this run:** Core Web Vitals (PSI quota 429, no CrUX field data); Google Business Profile detail (not directly inspected); backlink profile (not in scope for GEO audit).

---

# Implementation Log — 2026-08-11

All changes were made on branch `geo-aeo-optimization`, built with `npm run build`
(passing), and verified against a local production server across **all 93 routes**.

## Verified end state

| Check | Result |
|---|---|
| Routes with exactly one `<h1>` | 93 / 93 |
| Routes with exactly one canonical | 93 / 93 |
| Routes with exactly one `og:url` | 93 / 93 |
| Canonicals on the apex host | 93 / 93 |
| JSON-LD blocks that fail to parse | 0 |
| `AggregateRating` occurrences | 0 |
| Pages citing an external authority | 13 (was **0**) |
| Pages with a visible "Last updated" date | 12 (was 0) |
| Pages emitting `FAQPage` | 35 |
| Pages emitting `BlogPosting` | 11 (was 0 outside `/blogs/[id]`) |

## Changes by audit item

### C1 — canonical/host conflict
Not a code fix. Already correct on this branch; blocked on deployment. See the
notice at the top of this report.

### C2 — duplicate CPL pages
- `/courses/cpl` deleted; 301 → `/courses/cpl-flight-training` (`next.config.js`)
- Removed from `sitemap.xml.js`
- `/courses/cpl-flight-training` promoted to priority 0.95 and given a real `<h1>`

**Also found, worse than reported:** three *further* blog↔course pairs are
byte-identical, and page content does not match its URL. Left for a decision —
see *Open item* below.

### H1 — zero authoritative citations
- New `components/OfficialSources.jsx` with a canonical `DGCA` link registry
  (CAR, medical, exams, eGCA, ICAO, IMD, WPC)
- Wired into 13 regulatory//subject pages
- Deliberately **not** `rel="nofollow"` — nofollowing a citation defeats its purpose

### H2 — fake `aggregateRating`
- Removed 4.9/"3500 reviews" from `pages/index.jsx`
- Rewrote `reviewSchema`: it was one `Review` whose `reviewRating` was an *array*
  of `Rating`s each carrying an `author` — invalid, so parsers dropped the whole
  node. Now three valid `Review` nodes with `author` and `reviewBody`.

### H3 / H4 — dates and article schema
- New `data/authors.js` (the four already-published faculty, with DGCA licence IDs)
- New `components/Byline.jsx` — visible author + `<time>` last-updated stamp
- `ArticleSchema` extended to accept a `Person` author instead of only the Organization
- Applied to 11 pages. **Dates are real** — taken from each file's git commit
  history, not invented.

### H5 / M7 / M8 — indexed URLs that were broken or blocked
- `/our-courses` → `/courses`; robots `Disallow` for it removed
- `/aviation-academy-we-one-aviation-academy` → `/about-us`
- Airline pages renamed to lowercase, capitalised URLs 301'd

> **Bug caught during implementation:** the case redirects were first written in
> `next.config.js`, whose `source` matching is **case-insensitive**. The rule
> `/Indigo-pilot-preparation → /indigo-pilot-preparation` therefore matched the
> lowercase URL too and redirected it to itself — an infinite loop, confirmed
> live before the fix. They now live in `middleware.js`, which compares exact case.

### M2 — FAQ schema coverage
- New `data/faqs.js` as a single source of truth for Q&A
- **Created `pages/faqs.jsx`** — `llms.txt` advertised `/faqs` to AI crawlers but
  no such page existed in this repo; the link 404'd. Added to the sitemap.
- `FaqSchema` wired into `/pilot-training-in-india`

### M3 — duplicate `Organization` node
- Deleted the second `EducationalOrganization` from `index.jsx`; `_document.jsx`
  is now the single owner. This also resolved a NAP conflict — the two copies
  disagreed on street address and `addressRegion`.

### M5 — nested city duplicates
- `pages/pilot-training-in/[city].jsx` deleted; 13 slugs 301'd to their flat
  equivalents; `/fallback` and `/paths` template artifacts redirected

### L1 — heading structure
Root cause was not "some pages have two H1s" as reported. `HeroSlider` renders an
`<h2>`, so **every page relying on it for a title shipped with zero `<h1>`**.
- Added an `asH1` prop to `HeroSlider`
- Removed dead code: a stray `<h2>` sat loose in the component body, outside any
  `return`, referencing a `heading` field the slide objects do not have
- Corrected a comment in `air-navigation.jsx` that wrongly asserted "HeroSlider
  already renders an h1"

### Other defects found and fixed during implementation
- `/commercial-pilot-license` — a top-value page — had **no canonical and no meta
  description at all**; it bypasses `<Layout>`. Added.
- `/doubt` had no canonical. Added.
- `next/head` only deduplicates tags sharing a `key`. `Layout` supplied none, so
  `/`, `/credentials` and `/pilot-training-in-sri-lanka` emitted **two** canonicals
  and **two** `og:url` tags. All `Layout` head tags are now keyed.
- `facultySchema` used invented properties (`'dgcaLicense/Qualification'`,
  `yearsExperience`) that are not in the schema.org vocabulary, and put the
  airline in `workLocation` (which expects a `Place`). Now uses `identifier`,
  `hasCredential`, `affiliation` and `worksFor`.
- Deleted dead root `robots.txt` and `sitemap.xml`. Next serves
  `pages/robots.txt.js` and `pages/sitemap.xml.js`; the root copies were not
  served at all and had drifted out of sync — the same class of confusion that
  produced the www/apex split.
- Restored the explicit AI-crawler allow-list to `robots.txt.js` (it was present
  in production but missing from this branch) and extended it with Applebot,
  CCBot, meta-externalagent, Amazonbot and MistralAI-User.
- `/blogs` title (22 chars) and description (49 chars) rewritten.
- Added `prefers-reduced-motion` handling to the ticker animation.

## Open item — needs an owner decision

Three blog/course pairs have **byte-identical** bodies, and in each case the
content matches neither its URL nor, in one case, its title:

| URL | What the page actually contains | Its title |
|---|---|---|
| `/courses/ppl` | PPL definition / "full form" article | "PPL Full Form: Private Pilot License Meaning" |
| `/blogs/ppl-course-fees` | *identical* to the above | "PPL Full Form in Aviation" |
| `/courses/dgca-ground-classes` | "What is DGCA" explainer | "DGCA Full Form" |
| `/blogs/dgca-exam-guide` | *identical* to the above | "What Is DGCA?" |
| `/courses/cpl-flight-training` | CPL **fees** tables | "CPL Flight Training: Hours & Aircraft" |
| `/blogs/cpl-full-form` | *identical* to the above | "CPL Course Fees in India" |

Standalone `/ppl-full-form`, `/dgca-full-form` and
`/full-form-of-cpl-commercial-pilot-license` pages also exist, so the definitional
content is likely triplicated again.

This was **not** fixed automatically. Redirecting the wrong direction would kill a
page that currently ranks, and deciding which URL owns "PPL meaning" versus "PPL
course" versus "PPL fees" is a commercial call. Recommended: keep `/courses/*` for
commercial course pages, `/blogs/*` for editorial, and the `*-full-form` pages for
definitions — then rewrite rather than redirect, since each URL has a distinct and
legitimate query target.

## Not addressed (unchanged from the audit)

- Core Web Vitals still unmeasured — needs a PageSpeed Insights API key
- Off-site authority (YouTube, LinkedIn, Wikidata, Reddit/Quora) — Week 4 work,
  none of it in this codebase
- `/credentials` still says "Last Audited Q4 2024" and claims ISO 9001:2015, IATA
  and IAAPI without certificate numbers. Left alone deliberately: correcting these
  requires facts only the academy holds.
- Stat inconsistency: `/about-us` says "500+ Pilots" and "15+ Years" while the rest
  of the site says "3500+" and "16+". Same reason — needs the real number.

---

# Implementation Log — Session 2 (2026-08-11, later)

Continues the log above. Same branch (`geo-aeo-optimization`), `npm run build`
passing, re-verified across **all 90 public routes** against a local production
server.

## Verified end state

| Check | Result |
|---|---|
| Routes returning 200 | 90 / 90 |
| Routes with exactly one `<h1>` | 90 / 90 |
| Routes with exactly one canonical | 90 / 90 |
| Routes with exactly one `og:url` | 90 / 90 |
| Canonicals on the apex host | 90 / 90 |
| Pages missing a meta description | 0 |
| JSON-LD blocks that fail to parse | 0 |
| `AggregateRating` occurrences | 0 |
| Redirects resolving in a single hop to a 200 | 7 / 7 |

## Core Web Vitals — measured for the first time

The previous log listed CWV as "unmeasured — needs a PageSpeed Insights API
key". PSI's keyless quota was exhausted, so this was measured with Lighthouse
directly. **Desktop was never the problem; mobile was.**

| Metric | Mobile before | Mobile after | Desktop |
|---|---|---|---|
| Performance | **64** | **83** | 92 |
| First Contentful Paint | 3.9 s | **1.4 s** | 1.1 s |
| Largest Contentful Paint | 8.6 s | **3.8 s** | 1.6 s |
| Speed Index | 5.3 s | **2.6 s** | 1.2 s |
| Cumulative Layout Shift | 0 | 0.029 | 0.02 |
| Render-blocking resources | 3 (1,080 ms) | **none** | — |

> **Caveat on the comparison:** "before" was measured against production and
> "after" against a local production build, so origin latency differs. The
> structural changes — render-blocking resources eliminated, Unsplash transfer
> down from 633 KiB to 83 KiB — are real and will carry over, but treat the
> exact point scores as indicative until the branch is deployed and re-measured.

The LCP element on the homepage is the hero heading — **text, not an image** —
so it was waiting on render-blocking stylesheets:

- **`quill.snow.css`, 887 ms.** A rich-text *editor* stylesheet, loading on all
  93 public pages, in **three** places at once: imported in `_app.jsx`, linked
  from unpkg in `_document.jsx`, and pulled in by the editor itself. Only
  `/admin/blog` ever renders the editor. Removed from the global path; that page
  now links its own copy from `/vendor/quill.snow.css`.
- **Google Fonts, 880 ms.** Montserrat and Poppins were requested twice — a
  `<link>` in `_document.jsx` *and* an `@import` at the top of `globals.css`
  (the worst case: a CSS `@import` cannot be discovered until the importing file
  has downloaded and parsed, so the requests serialise). Both replaced with
  `next/font`, which self-hosts the files and emits no blocking request.
- **Material Icons, 163 ms.** Loaded on every page. A search for the
  `material-icons` class across `pages/`, `components/` and `styles/` returns
  nothing — it styled nothing at all. Removed.

Also: hero images were served at a fixed 1920 px to every viewport. They now
carry a `srcset` built from Unsplash's `w` parameter (633 KiB → 83 KiB on
mobile). The footer map was loading eagerly despite being permanently below the
fold — now lazy, and resized 1155→600 px (140 KB → 62 KB). `GroundSchool.jpg`
resized 1600→1200 px (284 KB → 191 KB).

## Duplicate clusters resolved

Confirmed still near-identical before acting — the PPL pair differed by **4
lines out of 709**. Each duplicate now 301s to the page whose URL matches what
the duplicate's own URL promises, so one URL owns each query:

| Retired URL | Redirects to | Why that target |
|---|---|---|
| `/blogs/ppl-course-fees` | `/courses/ppl` | the PPL course page carries the fees |
| `/blogs/dgca-exam-guide` | `/courses/dgca-ground-classes` | ground classes *are* the exam prep |
| `/blogs/cpl-full-form` | `/full-form-of-cpl-commercial-pilot-license` | a "full form" query wants the definition, not the training page |

The three `*-full-form` pages were checked and are genuinely distinct from each
other (527–638 differing lines), so they were kept and sharpened rather than
merged. Their opening paragraphs — the passage an answer engine actually quotes,
sitting directly under the H1 — were rewritten on two of them:

- `/dgca-full-form` opened *"When You Will Take Flight Then Ever You Thinks Who
  is Behind The Flight safety..."* followed by *"Lets Start With Basic."*
- `/full-form-of-cpl-commercial-pilot-license` opened with a question and a
  table of contents (*"Have you ever come across the term CPL...? In this
  article, we'll explore..."*), so the first extractable passage answered nothing.

Both now open with a self-contained definition that is correct when quoted
alone. `/ppl-full-form` already did this well and was left as it was.

## Defects found while working — not in the original audit

- **35+ internal links still pointed at `/courses/cpl`**, which session 1 deleted
  and 301'd — including `components/HeroSlider.jsx`, which renders sitewide. Every
  internal CPL link was a redirect hop. Repointed across 32 files.
- **`/blog/*` → `/blogs/*` exists in production but in no branch of this repo.**
  Deploying this branch as it stood would have 404'd every indexed `/blog/*` URL.
  Rule added, with the three consolidated posts sent straight to their final
  destination so no request takes two hops.
- **The blog was absent from `sitemap.xml` entirely** — the index and both
  surviving posts were discoverable only by crawling internal links. Added.
- **`sitemap.xml` stamps one hardcoded `lastmod` (2026-04-25) on all 81 URLs.**
  Flagged in-file, not silently changed: a per-page date should come from the
  same git-derived dates `Byline` already renders, and inventing a fresher
  uniform date would be worse than the current stale one.
- **Stat conflicts were wider than reported.** Partner airlines read "25+" on the
  homepage and "50+" on `/about-us` and `/pilot-training-in-india`.

## Owner-approved factual corrections applied

- **`data/academy.js` created** as the single source for the headline figures,
  which were hardcoded across six pages and had drifted. Years of operation is
  now *derived* from the 2009 founding year, so "16+" cannot go stale again — it
  was already wrong in 2026. Wired into `_document`, `index`, `credentials`,
  `about-us`, `pilot-training-in-india`, `courses` and `HeroSlider`.
- **Unbacked certifications removed** from `/credentials`: ISO 9001:2015, "IATA
  Certified", "Member IAAPI" — none carried a certificate or membership number —
  and the stale "Last Audited: Q4 2024" line. DGCA approval retained.
- **LinkedIn added to `sameAs`.** The company page was already linked from
  `/credentials` but missing from the organisation schema, so it counted for
  nothing toward entity resolution.

## Still open — needs the academy's own facts

1. **"3500+ pilots trained" is unconfirmed.** The conflicting pages have been
   reconciled *to the site's own sourced figure*, not to an independently
   verified one — `/about-us` previously said "500+", a sevenfold difference.
   The value now lives in one place (`data/academy.js`); if the real number
   differs, one edit fixes every page. **This should be confirmed before deploy.**
2. **The three homepage testimonials cannot be verified.** "Rahul Sharma",
   "Priya Mehta" and "Arjun Singh" carry `verified: true`, DGCA licence numbers
   in a suspiciously tidy sequence (`2022-001`, `2023-156`, `2024-089`),
   `via.placeholder.com` avatars, and LinkedIn URLs that cannot be checked
   (LinkedIn serves an auth wall to any non-browser client). Session 1 marked
   these up as `Review` schema. If they are template placeholder data, that is
   the same defect as the `aggregateRating` that was removed — and worse, since
   named people and licence numbers are a stronger claim. **Confirm they are
   real students or remove the `Review` markup.**
3. `/credentials` still presents every entry — MOUs, facilities, placement
   figures — under a blanket `verified: true` with no substantiating detail.
4. Google Tag Manager ships **510 KiB** and blocks the main thread for 210 ms,
   now the single largest remaining drag on mobile. Moving it to `lazyOnload`
   would help, but that is an analytics-accuracy decision.
5. Off-site authority (YouTube, Wikidata, Reddit/Quora) — still Week 4 work,
   none of it in this codebase.

---

# Correction & Session 3 — 2026-08-11

## The premise of this report's opening warning was wrong

The notice at the top of this report says production "is running code that
exists in no branch of this repo." **That was a stale clone, not a mystery.**
`origin/master` was 44 commits ahead of the local copy, and it matches
production exactly. Production is deployed from `master`, as you would expect.

Those 44 commits are a substantial SEO/GEO pass by someone else — canonical
work, robots, sitemap generation, `llms.txt`, a `/faqs` page, 17 `/blog/*`
redirects, and a lot of rewritten content (`/dgca-full-form`,
`/courses/dgca-ground-classes` and others are considerably better than the
versions this report audited).

**Consequence:** the `geo-aeo-optimization` branch forked on 27 June and shares
53 changed files with master. Merging it would have reverted much of that work.
It is pushed and preserved for reference, but it should not be merged.

The fixes were instead re-applied on a fresh branch cut from current master:
**`geo-fixes-2026-08`**, one commit, 54 files.

## What master still needed (and now has)

Master had none of these fixed, so the work was not redundant:

| Issue | State on master |
|---|---|
| Canonical host | `Layout.jsx` had been changed **to** www, "to match live domain" — while the edge 301s www → apex. 159 refs across 20 files. |
| Sitemap host | `scripts/generate-sitemap.js` hardcoded www, so all 113 submitted URLs were redirects |
| `aggregateRating` | still 4.9 / 3500, still unsupported by any `Review` node |
| Unbacked certifications | ISO 9001:2015, IATA, IAAPI, "Last Audited Q4 2024" all still present |
| Render-blocking CSS | quill + Google Fonts + Material Icons, all three still loading sitewide |
| Duplicate pages | 3 of the 4 clusters still near-identical |
| Stat conflicts | 500+ vs 3500+, 15+ vs 16+, 25+ vs 50+ |

## Defects found on master that this report had not recorded

- **The sitemap `pages` array in `pages/sitemap.xml.js` is dead code.** The
  route serves `.generated-sitemap.xml` instead. Editing the array — which is
  the obvious thing to do — changes nothing. This is exactly the class of trap
  that produced the www/apex split in the first place; now documented in-file.
- **`HeroSlider` hardcoded its heading to `<h1>`.** 18 routes that also wrote
  their own `<h1>` shipped two. The homepage's `<h1>` had been *downgraded to
  `<h2>`* to work around it, leaving the homepage with none.
- **`/faqs` had no `<h1>`** — it rendered only the shared `<FAQs>` component,
  whose heading is an `<h2>` because it is embedded mid-page elsewhere.
- **`/doubt` had no canonical and no `og:url`** — it bypasses `<Layout>`.
- **`Layout`'s head tags had no `key`s**, so `next/head` could not dedupe
  page-level overrides; `/`, `/credentials` and `/pilot-training-in-sri-lanka`
  each emitted two `og:url` values.
- **Two Organization schema nodes** (one in `Layout`, one in `_document`) whose
  `sameAs` arrays disagreed — two contradictory descriptions of one entity on
  every page. Synced; collapsing them to a single owner is still worth doing.
- **`sameAs` used per-share tracking URLs** (`?mibextid=`, `?igsh=`) rather than
  canonical profile URLs. Matching is literal, so these corroborate nothing.

## Verified end state on `geo-fixes-2026-08`

| Check | Result |
|---|---|
| Routes returning 200 | 92 / 92 |
| Exactly one `<h1>` | 92 / 92 |
| Exactly one canonical | 92 / 92 |
| Exactly one `og:url` | 92 / 92 |
| Exactly one meta description | 92 / 92 |
| Canonicals on a non-apex host | 0 |
| Pages emitting the www host | 0 |
| JSON-LD blocks failing to parse | 0 |
| `AggregateRating` occurrences | 0 |
| Sitemap URLs / on www / pointing at a redirect | 113 / 0 / 0 |

Mobile Lighthouse: **64 → 85**, LCP 8.6s → 4.3s, FCP 3.9s → 1.4s, TBT 0 ms,
CLS 0, render-blocking resources 3 (1,080 ms) → none. *Before* was measured
against production and *after* against a local production build, so treat the
score as indicative; the structural changes are not in doubt.

## Still open — needs the academy's own facts

1. **"3500+ pilots trained" is unconfirmed.** Pages that disagreed have been
   reconciled to the site's own sourced figure, not an independently verified
   one (`/about-us` said "500+", a sevenfold difference). The value now lives in
   `data/academy.js`; one edit fixes every page. **Confirm before deploy.**
2. **The three homepage testimonials cannot be verified.** "Rahul Sharma",
   "Priya Mehta" and "Arjun Singh" carry `verified: true`, DGCA licence numbers
   in a tidy sequence (`2022-001`, `2023-156`, `2024-089`), `via.placeholder.com`
   avatars, and LinkedIn URLs that cannot be checked (LinkedIn serves an auth
   wall to any non-browser client). If they are placeholder data, this is the
   same defect as the `aggregateRating` just removed — and a stronger claim.
3. `/credentials` still presents MOUs, facilities and placement figures under a
   blanket `verified: true` with nothing substantiating them.
4. **Google Tag Manager ships 510 KiB** and is now the largest remaining drag on
   mobile. Moving it to `lazyOnload` would help; that is an analytics decision.
5. The two Organization schema nodes should collapse to one owner.
6. Off-site authority (YouTube, Wikidata, Reddit/Quora) — none of it in code.
