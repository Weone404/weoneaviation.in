# GEO / AI-Search Analysis — weoneaviation.in

- **URL:** https://weoneaviation.in
- **Business:** We One Aviation Academy — DGCA-approved pilot-training institute, Dwarka, New Delhi (est. 2009)
- **Date:** 2026-08-03 (re-run)
- **Framing (per Google):** GEO/AEO is *SEO applied to AI-search surfaces*, not a separate discipline. Google's AI-optimization guide (updated 2026-06-29) states there is **no AI-specific optimization** — the same fundamentals feed AI Overviews and AI Mode. Findings below are prioritized on that basis.

> ## ⚠️ DEPLOY STATUS: code fixes are NOT live yet
> Re-verified against the live site this run:
> - Homepage canonical still = `https://www.weoneaviation.in/` (**old www value** — the non-www fix is local only)
> - `/ppl-full-form` live has **0 `FAQPage` blocks** (1 ld+json = the old org schema); the new FAQ schema is local only
> - Homepage `last-modified: 2026-08-03 05:30 GMT` — **unchanged since before the edits**
>
> **Conclusion:** every improvement from the last two sessions (non-www canonicalization, CSP fix, `Course`/`Breadcrumb`/`FAQ`/`Article` schema, expanded `sameAs`) exists in the repo but has **not been built & deployed**. The scores below are split into **Live (today)** and **Projected (after deploy)**. The single highest-impact action right now is: **`npm install && npm run build` then deploy to Vercel.**

---

## 1. GEO Readiness Score — Live: **72 / 100**  ·  After deploy: **~76 / 100**  ·  After deploy + authority work: **~82 / 100**

| Criterion | Weight | Live | After deploy | Notes |
|---|---|---|---|---|
| Citability (passage-level) | 25% | 72 | 75 | Strong definitions & headings; **stats still lack source attribution**, no original data |
| Structural Readability | 20% | 85 | 88 | Question-headings, tables, lists, FAQ blocks; FAQ now schema-backed after deploy |
| Multi-Modal Content | 15% | 55 | 55 | Many images (some external), but **no embedded video despite an active YouTube channel**, no charts/calculators — unchanged |
| Authority & Brand Signals | 20% | 58 | 66 | +`sameAs` (YouTube/Justdial) & blog `Article` dates after deploy; still **no Wikipedia/Reddit, static-blog dates, entity confusion** |
| Technical Accessibility | 20% | 78 | 92 | Full SSR, all AI crawlers allowed. **Live canonical still conflicts (www vs non-www); resolved only after deploy** |

**Verdict:** The code is in strong shape, but **the live site hasn't changed** — so today's score is still gated by the un-deployed canonical conflict and the missing schema. Deploy first; then the ceiling becomes **authority/freshness** (dates, Wikipedia/Reddit, entity consolidation), which no deploy fixes on its own.

---

## 2. Platform Breakdown

| Platform | Score | Why |
|---|---|---|
| **Google AI Overviews** | 70 | Ranking-correlated; good SSR + structure + schema. Gated by classic rankings and snippet eligibility. |
| **Google AI Mode** (Gemini 2.5) | 62 | Broader pool, **freshness + entity authority weighted** → dragged down by missing dates and no Wikidata/Wikipedia entity. |
| **ChatGPT** | 55 | Leans on Wikipedia (47.9%) + Reddit (11.3%) — the site has **neither**. Directory listings (Justdial, IndiaMART) help slightly. |
| **Perplexity** | 52 | Reddit-dominant (46.7%) citation profile — **no Reddit footprint** found. |
| **Bing Copilot** | 65 | Bing-index driven; standard SEO + IndexNow would lift this. |

> AI Overviews and AI Mode agree on the answer ~86% of the time but cite the *same URLs* only ~13.7% of the time — treat them as two surfaces. This site is better positioned for AI Overviews (structure) than AI Mode (freshness/entity).

---

## 3. AI Crawler Access — ✅ All key crawlers allowed

`robots.txt` names **no** AI crawlers, so they all inherit `User-agent: * → Allow: /`.

| Crawler | Status |
|---|---|
| GPTBot, OAI-SearchBot (OpenAI) | ✅ Allowed — verified 200 |
| ClaudeBot (Anthropic) | ✅ Allowed — verified 200 |
| PerplexityBot | ✅ Allowed — verified 200 |
| CCBot (Common Crawl) | ✅ Allowed |
| Google-Extended (Gemini grounding/training) | ✅ Allowed |
| Bytespider, cohere-ai | ✅ Allowed |

Blocked bots are only SEO scrapers (Ahrefs, Semrush, MJ12, Petal, etc.) — correct.

**Optional decision:** if you want to *keep AI-search visibility but opt out of model training*, that's not currently separable for most crawlers. Google-Extended being allowed means you're opted **into** Gemini grounding+training. Leave as-is for maximum visibility (recommended for a lead-gen site).

---

## 4. llms.txt Status — present, but a non-Google lever

`/llms.txt` exists (created last session; a corrected non-www copy is in `public/llms.txt`).

**Reality check per Google's primary source:** Google Search — *including its generative AI features* — **ignores `llms.txt`**; it "won't harm nor help" rankings/citations. Mueller called the discovery use-case "a dead end." So:
- ✅ Keep it for **non-Google** AI services that may read it.
- ❌ Do **not** count it as a Google AI-visibility lever. (This corrects the emphasis from the earlier audit.)

---

## 5. Brand Mention Analysis

| Platform | Presence | Impact |
|---|---|---|
| **Justdial** | ✅ Strong — **1,311 ratings** | Good local trust; feeds Google local + some AI |
| **YouTube** | ✅ Official channel (`@weoneaviationacademy`) | **Highest AI-citation correlate (~0.74)** — but underused (not embedded on-site) |
| **Facebook** | ✅ Page present | Minor |
| **IndiaMART / bestaviation.net** | ✅ Listed | Minor directory signal |
| **Wikipedia / Wikidata** | ❌ None | Big gap for ChatGPT (47.9% of its citations) |
| **Reddit** | ❌ None found | Big gap for Perplexity (46.7%) & ChatGPT (11.3%) |
| **LinkedIn** | ❌ No company page surfaced | Moderate gap |

⚠️ **Entity confusion (important):** search surfaces a separate **`weoneaviation.com`** ("Pilot Training in USA") and **IndiaMART/bestaviation listings citing a Kochi location**, while your schema says **Dwarka, Delhi (110077)** and Justdial says **110075**. AI engines resolve *entities*, not just pages — conflicting NAP/domains split your entity and weaken citation confidence. **Consolidate:** one canonical domain, one NAP (fix the 110075/110077 postcode mismatch), and disambiguate or reclaim the `.com`.

---

## 6. Passage-Level Citability

Flagship page `/commercial-pilot-license` audited live:

✅ **Working well:**
- Question-based H2s: *"How do you become a commercial pilot in India?"*, *"What is a Commercial Pilot License?"*
- Definition in first paragraph: *"A Commercial Pilot License (CPL) is the qualification required to fly aircraft professionally…"*
- Salary comparison **table**, 8-step **ordered list**, **FAQ Q&A** ("People also ask")

⚠️ **Gaps hurting citation:**
- **Passage length:** the opening definition is ~20 words — too thin. AI engines prefer **self-contained 134–167-word blocks**. Expand the answer directly under each question heading.
- **No source attribution:** figures (₹29–32 lakh, 200 hours, 18–24 months) have no cited source. Attribute to **DGCA CAR / official docs** — attributed stats are a strong citability signal.
- **No dates:** front-load isn't the issue; recency is (see §8).
- **~44% of AI citations come from the first 30% of a page** — ensure the fullest, most quotable answer sits high, not just a one-liner.

---

## 7. Server-Side Rendering — ✅ Excellent

Next.js 14 fully server-renders. GPTBot/ClaudeBot/PerplexityBot each receive the complete ~138 KB HTML with title, H1, meta, and JSON-LD — **no JS execution required**. Since AI crawlers don't run JavaScript, this is the single biggest technical advantage and it's already solved. Keep all primary content in the SSR payload (avoid client-only rendering for answers).

---

## 8. Top 5 Highest-Impact Changes

0. **🚀 DEPLOY THE PENDING CODE (do this first).** All the schema/canonical work is committed to the repo but **not live** (verified this run). Run `npm install && npm run build` and deploy to Vercel. This alone moves Live 72 → ~76 and activates the non-www canonical + FAQ/Course/Article/Breadcrumb schema. Nothing below matters until this ships.
1. **Add & maintain content dates (biggest content lever).** Static blog pages + informational guides show no `datePublished`/`dateModified`. Content <3 months old is **~3× more likely** to be AI-cited; 6+ months stale loses eligibility. Add real visible dates + wrap in the ready `<ArticleSchema>`, then run a **quarterly refresh program**.
2. **Fix entity consistency.** One domain, one NAP, correct postcode (`110075` vs `110077`); disambiguate the `.com`/Kochi listing; pursue a **Wikidata** item. `sameAs` for YouTube + Justdial is already added in code (pending deploy) — add LinkedIn too.
3. **Attribute every statistic to a primary source** (DGCA CAR, official fee schedules) and expand thin answer blocks to 134–167 words directly under each question heading.
4. **Build Reddit + embed YouTube.** Answer real questions in r/flying, r/Pilots, India aviation threads (Perplexity/ChatGPT citation fuel), and embed your existing YouTube videos on the matching course/guide pages (+multi-modal selection lift).
5. **Add author bylines with credentials** to blog + guide pages (currently anonymous) and `Person` schema — Experience/Expertise is a core AI authority signal.

---

## 9. Schema Recommendations

| Schema | Where | Status |
|---|---|---|
| `EducationalOrganization` | site-wide (`_document`) | ✅ present |
| `Course` | course pages | ✅ added last session (template) |
| `BreadcrumbList` | site-wide | ✅ added last session |
| **`Article` + `Person`** (author, datePublished, dateModified) | **blogs + informational guides** | ❌ **add — highest priority** |
| **`FAQPage`** | informational pages (dgca-full-form, ppl-full-form, how-to-become-a-pilot, subject guides) | ❌ add, using real on-page Q&A |
| `sameAs` expansion (YouTube, LinkedIn, Justdial, Wikidata) | `_document` org schema | ⚠️ currently only FB + IG |
| `VideoObject` | pages with embedded YouTube | ❌ add when videos embedded |

> Note: `Review`/`AggregateRating` on the homepage must be backed by **real, verifiable** reviews (you have 1,311 Justdial ratings — cite that source's real count) or removed, to stay within Google's guidelines.

---

## 10. Content Reformatting Suggestions (specific)

**On `/commercial-pilot-license`, under "What is a Commercial Pilot License?" — expand to a ~150-word citable block:**

> *"A Commercial Pilot License (CPL) is the DGCA-issued qualification that permits a pilot to fly aircraft for hire and reward in India. Per DGCA Civil Aviation Requirements (CAR Section 7), a CPL applicant must be at least 18, hold a Class 1 medical, pass exams in Air Navigation, Aviation Meteorology, Air Regulations, and Technical (General & Specific), and log a minimum of 200 flying hours. Training in India typically takes 18–24 months and costs ₹29–32 lakh (2026). A CPL holder can work as a First Officer with airlines, in charter, cargo, or as a flight instructor…"*

Apply the same pattern to `dgca-full-form`, `ppl-full-form`, `rtr-full-form-*`, and the subject guides: **question heading → 134–167-word attributed answer → supporting table/list.**

---

## Quick Wins (this week)
1. Add visible Published/Updated dates + `Article` schema to all guides & blogs.
2. Attribute stats to DGCA; expand thin definitions to ~150 words.
3. Expand `sameAs` (YouTube, LinkedIn, Justdial); fix postcode NAP mismatch.
4. Embed existing YouTube videos on matching pages.

## Higher Effort (this quarter)
1. Create a Wikidata entity; seed authoritative Reddit answers.
2. Add author bios + credentials (`Person` schema) across content.
3. Publish one piece of **original data** (e.g., "We One 2026 DGCA pass-rate & placement report") — unique, citable, and hard for competitors to replicate.
4. Consolidate/disambiguate the `.com` vs `.in` entity.

---

## ✅ Implemented This Session (2026-08-03)

| Change | Detail | Coverage |
|---|---|---|
| **`FaqSchema` component** | Reusable `FAQPage` JSON-LD built from each page's **existing** `{ q, a }` array — no invented Q&A | Wired into `ppl-full-form`, `dgca-ground-classes-in-india`, `dgca-class-2-class-1-medical`, `ecga-login-your-complete-guide`, `air-arabia` |
| **`ArticleSchema` component** | `BlogPosting` with author + publisher + `datePublished`/`dateModified` (safely normalized to ISO 8601 from real blog dates) | Wired into `blogs/[id].jsx` (covers all DB + hardcoded posts) |
| **`sameAs` expanded** | Added verified **YouTube** channel + **Justdial** (1,311 reviews) to Organization schema — strengthens entity graph for ChatGPT/AI-Mode | `_document.jsx` |
| **(prior round)** | non-www canonicalization, CSP fix, `Course` schema, site-wide `BreadcrumbList`, `llms.txt` | — |

**Schema-emitting sources: 3 → 14** (plus `CityPageTemplate` → ~25 city pages, `CoursePageTemplate` → 4 course pages, `Layout` breadcrumb → every page).

**Validation:** all edited files pass `esbuild` JSX transpilation (exit 0). Full `next build` still requires `npm install` locally before deploy.

### Deliberately NOT auto-changed (need real business data — no fabrication)
- **Publish dates on the 5 static blog pages** (`cpl-full-form`, `dgca-exam-guide`, `pilot-training-delhi`, `ppl-course-fees`, `aviation-course-after-12th`) and informational guides — they have **no date fields**. Add real dates, then wrap in the ready `<ArticleSchema … datePublished=… />`. This unlocks the recency signal (the single biggest remaining GEO lever).
- **NAP postcode mismatch** (schema `110077` vs Justdial `110075`) — confirm the correct pincode, then align everywhere.
- **Homepage `AggregateRating`** — point it at the real Justdial review count/URL or remove.
- **Off-site:** Wikidata entity, Reddit presence, embedding YouTube videos on-page — content/outreach work.

---
*Generated by claude-seo `seo-geo`. Google-first: GEO = SEO fundamentals applied to AI-search surfaces.*

**Sources (brand-mention research):** [Justdial reviews](https://www.justdial.com/Delhi/We-One-Aviation-Academy-Near-By-Shiksa-Bharti-College-Dwarka-Sector-7/011PXX11-XX11-211126112621-P9X7_BZDET/reviews) · [YouTube channel](https://www.youtube.com/@weoneaviationacademy) · [bestaviation.net listing](https://www.bestaviation.net/school/weone-aviation-academy-4468/) · [IndiaMART (Kochi listing)](https://www.indiamart.com/we-oneaviation-academy/) · [Facebook page](https://www.facebook.com/WeOneAcademy/)
