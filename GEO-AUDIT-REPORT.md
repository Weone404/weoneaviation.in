# GEO + SEO Audit — We One Aviation Academy

- **Domain:** https://weoneaviation.in
- **Business type:** Local Service / Educational Organization (DGCA-approved pilot training, Dwarka, New Delhi)
- **Stack:** Next.js 14.2 (Pages Router), Tailwind, deployed on Vercel — fully server-rendered
- **Audit date:** 2026-08-03
- **Analysis basis:** Live site + full source code review (`weoneaviation.in/`)

---

## Composite GEO Score: **71 / 100** — "Strong foundation, held back by one domain bug"

| Category | Weight | Score | Weighted |
|---|---|---|---|
| AI Citability & Visibility | 25% | 80 | 20.0 |
| Brand Authority Signals | 20% | 60 | 12.0 |
| Content Quality & E-E-A-T | 20% | 82 | 16.4 |
| Technical Foundations | 15% | 72 | 10.8 |
| Structured Data | 10% | 50 | 5.0 |
| Platform Optimization | 10% | 70 | 7.0 |
| **Total** | | | **71.2** |

**One-line verdict:** The site is unusually well-built for AI search — full SSR, an actual `llms.txt`, rich homepage schema, and strong E-E-A-T. It is dragged down by a single high-impact bug (a www/non-www conflict that makes every canonical and every sitemap URL point to a redirect) and by structured data existing on only 3 of ~74 pages.

---

## ✅ What's Already Excellent (keep it)

1. **Full server-side rendering.** GPTBot, ClaudeBot, and PerplexityBot all receive the complete 138 KB HTML with title, H1, meta description, and JSON-LD — no JS execution required. This is the single biggest GEO advantage and most competitors fail here.
2. **All major AI crawlers are allowed.** `robots.txt` blocks only SEO scraper bots (Ahrefs, Semrush, MJ12, Petal, etc.). GPTBot / ClaudeBot / PerplexityBot / Google-Extended are **not** blocked → 200 on every test.
3. **A real, well-written `llms.txt` exists** at `/llms.txt` — courses, flying schools, subject guides, all annotated. Very few sites have this.
4. **Rich homepage schema:** `EducationalOrganization`, `Course`, `FAQPage`, `Review`, `AggregateRating`, `BreadcrumbList`, and 4× `Person` (faculty). This is exactly what AI engines cite.
5. **Strong E-E-A-T:** founding date (2009), DGCA accreditation with `accreditedBy`, named faculty, a dedicated `/credentials` page, physical address + geo-coordinates.
6. **Solid technical hygiene:** HTTPS + HSTS, tight CSP, `X-Content-Type-Options`, `X-Frame-Options`, per-page canonicals set in `Layout.jsx`, true 404s (no soft-404), ~116-URL sitemap.

---

## 🔴 Critical — Fix First

### C1. www vs non-www conflict (highest impact)
The live site serves on **non-www** (`https://weoneaviation.in` → **200**), and **www 301-redirects to non-www** (`https://www.weoneaviation.in` → **301 → https://weoneaviation.in/`**).

But everything in the code declares **www** as canonical:
- `components/Layout.jsx` → `canonicalUrl = https://www.weoneaviation.in...`
- `pages/_document.jsx` → schema `url`, `logo`, OG images all `www.`
- `sitemap.xml` → **all 116 `<loc>` entries use `www.`** (every one is a redirect)
- `llms.txt` → every listed URL uses `www.`
- `robots.txt` sitemap line uses **non-www** (contradicts the sitemap's own contents)

**Effect:** Every canonical tag points to a URL that redirects to a *different* URL. Google and AI crawlers get split signals, crawl budget is wasted following redirects, and link authority is diluted across two hostnames.

**Fix — pick ONE hostname and make everything agree.** Since the live 200 is non-www, the cheapest fix is to standardize on **non-www**:
- `Layout.jsx`: `const canonicalUrl = \`https://weoneaviation.in${...}\`` (drop `www.`)
- `_document.jsx`: change all `www.weoneaviation.in` → `weoneaviation.in` (schema `url`/`logo`/`image`, OG/Twitter images)
- Regenerate `sitemap.xml.js` and `llms.txt` with non-www URLs
- Confirm `robots.txt` sitemap line reads `https://weoneaviation.in/sitemap.xml` ✓ (already does)

*(Alternatively standardize on www and flip the Vercel redirect the other way — but that's more moving parts. Non-www matches the current live server.)*

### C2. Structured data on only 3 of ~74 pages
`ld+json` appears in `index.jsx`, `credentials.jsx`, and `_document.jsx` only. City pages inherit schema via `Citypagetemplate.jsx` ✓, but the **highest-value GEO pages have none**:
- `commercial-pilot-license.jsx`, `dgca-full-form.jsx`, `ppl-full-form.jsx`, `rtr-full-form-*.jsx`, `how-to-become-a-pilot-after-12th.jsx`
- Subject guides: `air-navigation`, `air-regulations`, `aviation-meteorology`, `technical-general`, `rtr-a`
- `CoursePageTemplate.jsx` (used by 4 course pages) has **zero** schema

These "what is DGCA / how to become a pilot / CPL eligibility" pages are precisely the queries AI answer engines resolve. **Add `FAQPage` + `Article` (or `Course`) schema** to them. Add `FAQPage` and `Course` schema into `CoursePageTemplate.jsx` once → covers 4 pages instantly. See generated templates below.

---

## 🟠 High Priority

### H1. `llms.txt` URLs redirect
`llms.txt` is great but lists `www.` URLs that all 301. Regenerate with non-www (rolls in with C1).

### H2. Verify Review / AggregateRating are real
`index.jsx` ships `Review` + `AggregateRating` schema. Your own `_document.jsx` comment correctly warns that "3500 is pilots trained, not reviews." If the rating/reviewCount is **not** backed by verifiable Google Business / third-party reviews, remove it — fabricated review schema risks a Google manual action and AI engines increasingly cross-check. Prefer pulling the real count from Google Business Profile.

### H3. Breadcrumbs only on homepage
`BreadcrumbList` exists only in `index.jsx`. Add it site-wide (ideal spot: `Layout.jsx` or each template) so AI engines understand site hierarchy and get breadcrumb context for every cited page.

---

## 🟡 Medium Priority

- **M1. External Unsplash images** (flagged in your `SEO_OPTIMIZATION_STRATEGY.md`): hurts LCP and originality/E-E-A-T. Self-host via Cloudinary (already a dependency) or use original photography.
- **M2. Thin `sameAs`:** schema lists only Facebook + Instagram. Add LinkedIn, YouTube, and (if it exists) a Google Business Profile / Wikidata entry. Brand mentions correlate ~3× stronger than backlinks for AI citation.
- **M3. Keyword cannibalization:** `/commercial-pilot-license` vs `/courses/cpl` — differentiate (guide vs enrollment) or canonicalize the weaker one (your own strategy doc already flags this).
- **M4. No `Article` schema on blog posts** in `/blogs` — add `Article` + author `Person` for citability.

---

## 🟢 Brand Authority / Off-site (ongoing)

- Seed authoritative mentions: Reddit (r/flying, r/india aviation threads), YouTube (student testimonials, campus tours), Quora answers on "how to become a pilot in India."
- Pursue a **Google Business Profile** with real reviews — feeds both local pack and AI "near me" answers, and gives you a legitimate source for AggregateRating.
- Consider a Wikidata entry for the entity "We One Aviation Academy" to strengthen entity recognition.

---

## Prioritized Action Plan

| # | Action | Effort | Impact | Files |
|---|--------|--------|--------|-------|
| 1 | Fix www→non-www across canonical/OG/schema/sitemap/llms.txt | S | 🔴🔴🔴 | `Layout.jsx`, `_document.jsx`, `sitemap.xml.js`, `llms.txt` |
| 2 | Add `FAQPage`+`Course` schema to `CoursePageTemplate.jsx` | S | 🔴🔴 | `CoursePageTemplate.jsx` |
| 3 | Add `FAQPage`/`Article` schema to top informational pages | M | 🔴🔴 | ~8 page files |
| 4 | Verify or remove homepage Review/AggregateRating | S | 🟠🟠 | `index.jsx` |
| 5 | Regenerate `llms.txt` with non-www URLs | S | 🟠 | `llms.txt` |
| 6 | Site-wide `BreadcrumbList` | M | 🟠 | `Layout.jsx` |
| 7 | Self-host Unsplash images | M | 🟡 | multiple |
| 8 | Expand `sameAs` + Google Business Profile | M | 🟡🟢 | `_document.jsx` + off-site |

---

## Ready-to-Use Schema Templates

### FAQ schema (drop into any informational page's `<Head>`)
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the full form of DGCA?',
        acceptedAnswer: { '@type': 'Answer',
          text: 'DGCA stands for the Directorate General of Civil Aviation, India\'s regulatory body for civil aviation.' } },
      { '@type': 'Question', name: 'Who can appear for DGCA exams?',
        acceptedAnswer: { '@type': 'Answer',
          text: 'Candidates who have passed Class 12 with Physics and Mathematics and hold a DGCA computer number.' } }
    ]
  }) }}
/>
```

### Course schema (add to `CoursePageTemplate.jsx`, driven by props)
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,                 // e.g. "Commercial Pilot License (CPL)"
    description: courseDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'We One Aviation Academy',
      sameAs: 'https://weoneaviation.in'
    },
    educationalCredentialAwarded: 'DGCA-recognized training',
    inLanguage: 'en-IN'
  }) }}
/>
```

### Correct non-www canonical (replace in `Layout.jsx`)
```jsx
const canonicalUrl = `https://weoneaviation.in${canonicalPath === '/' ? '/' : canonicalPath}`;
```

---

## Verification Log (evidence)

| Check | Result |
|---|---|
| `https://weoneaviation.in/` | **200**, 138 KB, Vercel, SSR |
| `https://www.weoneaviation.in/` | **301 → https://weoneaviation.in/** |
| GPTBot / ClaudeBot / PerplexityBot on `/` | **200**, full HTML each |
| `/robots.txt` | present; AI bots allowed, SEO scrapers blocked |
| `/llms.txt` | **200**, structured (uses www URLs — redirect) |
| `/sitemap.xml` | 116 URLs, **all www (redirecting)** |
| Homepage canonical | `https://www.weoneaviation.in/` (redirects) |
| Random bad URL | **404** (correct, no soft-404) |
| Pages with inline JSON-LD | 3 of ~74 top-level pages |

---

## ✅ Fixes Applied (2026-08-03) — Projected score: **~78/100**

| # | Fix | Files changed |
|---|-----|---------------|
| 1 | **Domain standardized to non-www** across canonical, OG, schema, and all page URLs (`www.` → bare host) | `Layout.jsx`, `_document.jsx`, `index.jsx`, `credentials.jsx`, `Citypagetemplate.jsx`, + 6 pages |
| 2 | **`next.config.js` redirect flipped** to enforce non-www (was fighting production, which serves non-www 200) | `next.config.js` |
| 3 | **CSP syntax bug fixed** — stray `',+` was corrupting `connect-src` (dropped clarity/tecmicra + injected a `NaN` directive) | `next.config.js` |
| 4 | **`Course` schema added** to `CoursePageTemplate.jsx` → covers 4 course pages with provider + credential | `CoursePageTemplate.jsx` |
| 5 | **Site-wide `BreadcrumbList`** auto-generated from URL path (skips homepage & admin) | `Layout.jsx` |
| 6 | **`public/llms.txt`** committed with corrected non-www URLs | `public/llms.txt` |

**Verification:** zero `www.weoneaviation.in` refs remain in code except the redirect's match condition (correct); `node -e require('./next.config.js')` and `node --check` pass. A full `next build` was not run (deps not installed locally — run `npm install && npm run build` before deploy).

### Still recommended (manual, needs real content/data)
- Add `FAQPage` schema to the top informational pages (`dgca-full-form`, `commercial-pilot-license`, `ppl-full-form`, `how-to-become-a-pilot-after-12th`, subject guides) using their **real** on-page Q&A. Template is in this report.
- Verify the homepage `Review`/`AggregateRating` numbers are backed by real, verifiable reviews (else remove — Google penalty risk).
- Expand `sameAs` (LinkedIn, YouTube) + create a Google Business Profile.
- Self-host the Unsplash images (LCP + originality).

---
*Generated by the GEO-SEO analysis skill. GEO-first, SEO-supported.*
