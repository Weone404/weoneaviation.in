# AEO/GEO Audit — weoneaviation.in
### via `onvoyage-ai/gtm-engineer-skills → audit-website-aeo`

- **Site:** https://weoneaviation.in · **Pages crawled:** 15 · **Date:** 2026-08-03
- **Method:** 16 deterministic checks (50%) + 6-dimension agent evaluation (50%)

## Final Score: **70 / 100 → Grade C**

| Half | Score |
|---|---|
| Foundational (deterministic, 16 checks) | **83 / 100** |
| Intelligence (agent 6-dimension eval) | **57 / 100** |
| **Final** (0.5 × each) | **70 / 100 · C** |

> This is a **third-tool cross-check** (after `/geo` and `claude-seo:seo-geo`). It largely confirms the prior two audits and adds three concrete, previously-unflagged fixes: **llms.txt link format, missing RSS feed, and unclean heading hierarchy.** As with the others, it audits the **live** site — so the un-deployed code fixes are not reflected.

---

## Foundational Checks — 13 / 16 passed (83 pts)

**Passed (13):** page titles, meta descriptions, canonical present, single H1 (14/15), structured data present, schema types, Open Graph, internal linking, image alt coverage, content depth, indexable, AI-accessible meta tags, **AI bot access (no AI bots blocked)**.

**Failed (3):**
| Check | Pts | Detail | Fix |
|---|---|---|---|
| **Content structure** | 6 | 0/15 pages have a clean H1→H2→H3 outline | Fix heading hierarchy; homepage ships **two `<h1>`s** ("Your Dream of Flying" + "Best Pilot Training Institute in India") — demote one to H2 |
| **llms.txt valid** | 10 | "Found llms.txt but missing links" — the file uses bare `- URL — desc` lines, not markdown links | Reformat entries as `[Title](https://…)` so the validator (and non-Google AI) parse them |
| **RSS/Atom feed** | 8 | No feed found | Add `/feed.xml` (Next.js can generate it from the blog list) — helps AI systems track new content |

---

## Intelligence Evaluation — 6 dimensions (57/100)

| Dimension | 0–5 | Rationale (from crawled pages) |
|---|---|---|
| **Answer Readiness** | 3 | City & course pages use question headings + FAQ blocks; homepage/CPL open promotional ("Fly for airlines"); only ~20% lead with a definition |
| **Quotability** | 4 | Fee & salary **tables**, ordered lists, FAQ blocks — extractable 40–60 word passages exist |
| **Evidence Density** | 3 | Numeric claims on 100% of pages (3500+ pilots, 200 hrs, fees) but **no source attribution** and 0% author bylines |
| **Freshness** | 1 | **0%** of pages expose `publishedDate`/`modifiedDate`; no RSS. Weakest signal |
| **Structural Clarity** | 2 | Content-structure check failed 15/15; duplicate H1 on home; heading levels skip |
| **Content Depth** | 4 | All pages meet depth threshold across home / course / city templates |

**Intelligence = 17/30 → 57/100.**

---

## Weakest Pages (foundational)
1. `86%` — `/blogs` (no Article schema, no dates)
2. `88%` — `/` (duplicate H1)
3. `95%` — `/contact`, `/courses/cpl`, `/pilot-training-in-mumbai`

⚠️ **Deploy-pending confirmation:** the crawler saw `/courses/cpl` with only `EducationalOrganization` + `WebSite` schema — **the `Course` schema I added is not live yet.** City pages already show `LocalBusiness` + `FAQPage` (deployed). This independently confirms the code changes haven't shipped.

---

## Prioritized Fixes (this tool) — merged with deploy status

| # | Fix | Effort | Status |
|---|---|---|---|
| 1 | **Deploy pending code** (non-www canonical + Course/FAQ/Article/Breadcrumb schema) | — | ⏳ not shipped — do first |
| 2 | **Reformat `llms.txt`** links as markdown `[title](url)` | Low | New finding — quick win (+10 foundational pts) |
| 3 | **Add RSS/Atom feed** at `/feed.xml` | Low | New finding (+8 pts) |
| 4 | **Fix heading hierarchy** — single H1 per page, clean H2/H3 nesting (start with homepage's double H1) | Low–Med | New finding (+6 pts) |
| 5 | **Add real dates + author** to blogs/guides (`ArticleSchema` ready) | Med | Confirms prior audits — biggest intelligence lever |
| 6 | **Attribute statistics** to DGCA/official sources | Med | Confirms prior audits |

**If fixes 1–4 ship, foundational → ~100/100 and final → ~85 (Grade B+).** Reaching A requires the freshness/authority work (dates, author bylines, sourced stats).

---

## Cross-Tool Reconciliation

| Finding | `/geo` | `seo-geo` | `audit-website-aeo` |
|---|---|---|---|
| Full SSR, AI crawlers allowed | ✅ | ✅ | ✅ |
| Canonical www/non-www conflict | ✅ (fixed in code) | ✅ | passes presence check only |
| Missing schema on many pages | ✅ | ✅ | ✅ (confirms not deployed) |
| No content dates / freshness | — | ✅ | ✅ (quantified: 0%) |
| Anonymous authorship | — | ✅ | ✅ (0%) |
| **llms.txt link-format invalid** | — | — | ✅ **new** |
| **No RSS feed** | — | — | ✅ **new** |
| **Duplicate H1 / heading hierarchy** | — | — | ✅ **new** |

---

## ✅ Fixes Implemented This Session (the 3 new findings)

| Fix | What changed | Files | Validated |
|---|---|---|---|
| **llms.txt link format** | Rewrote all 22 entries as markdown `[Title](url): desc` + `>` summary line — passes the validator's link check | `public/llms.txt` | 22 markdown links ✓ |
| **RSS/Atom feed** | New SSR `/feed.xml` (RSS 2.0) from MongoDB + hardcoded fallback; added `<link rel="alternate" type="application/rss+xml">` auto-discovery | `pages/feed.xml.js`, `pages/_document.jsx` | XML gen + escaping runtime-tested ✓ |
| **Duplicate H1** | Demoted `HeroSlider`'s hero `<h1>` → `<h2>` (it's reused on every page); each page's own content keeps the single H1 | `components/HeroSlider.jsx` | 0 `<h1>` left in HeroSlider ✓ |

All changed files pass `esbuild` transpilation (exit 0). These + the pending schema/canonical work take **foundational → ~100/100** and **final → ~85 (Grade B+)** once deployed.

### Re-audit + NAP fix (follow-up run)
- **Re-ran the live audit** → identical **83 foundational / 70 final (C)**, confirming nothing is deployed yet.
- **NAP postcode standardised → `110075`** across all 8 files (schema, footer, contact, city template, homepage). The code was inconsistent (`110077` ×7, `110075` ×2). Aligned to `110075` — the **primary Sector-7 Dwarka pincode** and the value on the business's **own Justdial listing**. Reversible if the true building pincode is `110077`.

**Note:** this tool audits the **live** site, so re-running it won't reflect these local fixes until deployed. Verify post-deploy by re-running:
`node ~/.claude/skills/gtm-engineer-skills/audit-website-aeo/scripts/aeo-audit.mjs https://weoneaviation.in --max-pages=15 --out=./aeo-audit.json`

---
*Artifacts: `aeo-audit.json` (raw), this report. Tool: onvoyage-ai/gtm-engineer-skills, installed to `~/.claude/skills/`. Next step in that toolkit: the `improve-aeo-geo` skill applies further code-level fixes.*
