# On-Page SEO Pass — weoneaviation.in
### Synthesized best practices from 5 leading on-page SEO Claude skills

- **Date:** 2026-08-03
- **Reference toolkits (all verified live on GitHub):** `AgriciDaniel/claude-seo`, `aaron-he-zhu/seo-geo-claude-skills`, `inhouseseo/superseo-skills`, `seranking/seo-skills`, `rampstackco/claude-skills`
- **Approach:** Rather than clone 5 overlapping toolkits, I distilled their **shared on-page checklist** and applied it against the actual codebase with real data.

## The consolidated on-page checklist (what all 5 tools test)
Unique title (≤60 char, keyword-first) · unique meta description (~150 char, CTA) · single H1 · clean H2→H3 hierarchy · descriptive image alt · internal links with descriptive anchors · canonical · Open Graph/Twitter · structured data · no duplicate/cannibalizing content.

---

## ✅ Fixed this pass — duplicate & mismatched titles/descriptions

A code-wide scan of all 101 pages found **4 duplicate title sets** and **6 duplicate description sets** — classic copy-paste meta where blog pages were cloned from main pages. Every one is now unique and intent-matched:

| Page | New title | Intent |
|---|---|---|
| `courses/cpl` | CPL Course in India: Fees, Eligibility & Admission | enrollment |
| `blogs/cpl-full-form` *(content = CPL fees)* | CPL Course Fees in India: Full Cost Breakdown | cost |
| `courses/cpl-flight-training` | CPL Flight Training in India: Hours & Aircraft | training |
| `dgca-full-form` | DGCA Full Form: What Is DGCA in Aviation? | definition |
| `blogs/dgca-exam-guide` *(content = DGCA meaning)* | What Is DGCA? Role in Pilot Licensing & Safety | informational |
| `courses/ppl` | PPL Full Form: Private Pilot License Meaning & More | definition |
| `blogs/ppl-course-fees` | PPL Full Form in Aviation & Other Fields | definition |
| `how-to-become-a-pilot-after-12th` | How to Become a Pilot After 12th in India (2026) | guide |
| `blogs/aviation-course-after-12th` | Aviation Courses After 12th: Pilot Career Paths | careers |
| `best-flight-schools-in-usa` | *(kept)* — description differentiated | comparison |
| `flying-school/usa` | *(kept)* — description differentiated | program |

**Result:** duplicate titles **4 → 0**, duplicate descriptions **6 → 0** (verified across all 101 pages). All descriptions rewritten unique + within snippet length. esbuild-validated.

Also confirmed clean (no action needed): the earlier "Vision Test" / "Commercial Pilot" title flags were false positives from inner component props — the real `<title>` tags render correctly (the AEO crawler passed titles 15/15 live).

---

## ⚠️ Deeper issue found — content duplication (needs a decision, not just meta)

Fixing the meta exposed that several **blog pages are near-clones of main pages**:
- `blogs/dgca-exam-guide` content ≈ `dgca-full-form` (both "what is DGCA")
- `blogs/ppl-course-fees` content ≈ `courses/ppl` (both "PPL full form")
- `blogs/cpl-full-form` overlaps `commercial-pilot-license` / `courses/cpl`
- `blogs/aviation-course-after-12th` ≈ `how-to-become-a-pilot-after-12th`

Unique meta reduces the signal collision, but two pages with near-identical *body content* still compete. **Recommended resolution (your call):** for each pair, either (a) `rel=canonical` the weaker/blog version to the primary, or (b) genuinely differentiate the body content. I did **not** auto-canonicalize — that de-indexes a page and is a strategy decision.

## Remaining on-page items (not auto-fixed)
- **Over-long titles** on other pages (many 65–94 chars, e.g. `cbse-full-form`, `courses`, `australia`) — trim to ≤60 for full SERP display. Lower priority than duplicates.
- **Internal-link anchor text** — replace generic "Learn More"/"Contact Us" with keyword-descriptive anchors (from your own `SEO_OPTIMIZATION_STRATEGY.md`).
- **Image alt quality** — coverage passes, but review for descriptive, keyword-relevant alts.
- **Keyword cannibalization** `/commercial-pilot-license` vs `/courses/cpl` — same decision as the content-dup pairs above.

---
*On-page titles/descriptions are now unique sitewide. The remaining items are either content/strategy decisions (consolidation) or lower-priority polish (title trims, anchors, alts).*
