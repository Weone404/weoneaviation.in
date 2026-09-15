# SEO backlog — verified state, open work, and what is blocked

Written 2026-09-15 from four inputs: the Search Console coverage export of
2026-09-15, the 1,108-row keyword-to-URL strategy export, the 50-keyword
priority list, and competitor keyword exports for Golden Epaulettes, FMS
Aviation, VFTI, PilotCET, Capt Ahluwalia, Capt Sahil Khurana, cplgroundclasses
and dgcaclasses.

This file is the checklist. Update the status column in the same commit as the
work, and do not mark anything done that has not been verified in build output
or in a primary source.

---

## 0. The number that governs everything

74 pages indexed of 502 known. Impressions grew from 4 a day (24 July) to about
3,000 a day (4 September), and indexed pages from 4 to 74 in the same window,
so direction is right and **indexation is the ceiling, not content quality**.

| Not-indexed reason | Pages | Ours to fix? |
|---|---|---|
| Not found (404) | 267 | Yes — blocked, see 1.1 |
| Page with redirect | 53 | No — these are our own 301s working |
| Blocked due to access forbidden (403) | 51 | Yes — blocked, see 1.2 |
| Excluded by noindex | 16 | Partly — only /admin/login carries noindex in code |
| Discovered, not indexed | 20 | Yes — see 2.1 |
| Crawled, not indexed | 17 | Yes — see 2.1 |
| Alternate/duplicate canonical | 4 | Yes — see 2.1 |

---

## 1. Blocked — needs an export that only the owner can produce

**1.1 — 267 URLs returning 404.** The coverage export is the Pages report,
which exports counts, not URLs. Three attempts to source the list another way
all failed: the Wayback CDX API is outside the container's egress allowlist,
through the browser pane it returns mostly asset files and needs a fresh
approval per read, and the device shell had no network at the time. Writing
redirects for URLs nobody has seen would be guesswork, and a wrong 301 is worse
than a 404 — it sends readers to the wrong page and tells Google two unrelated
pages are the same thing.
**Needed:** Search Console → Pages → "Not found (404)" → Export.

**1.2 — 51 URLs returning 403.** A 403 to Googlebot is a technical fault, not a
content decision. Nothing in this repo returns 403: there is no middleware, and
next.config.js has no 403 path. The likely cause is platform-level — legacy
WordPress probe paths (wp-admin, wp-json, xmlrpc) answered by a managed
firewall rule. That is a hypothesis, not a finding, and it needs the URL list
to confirm.
**Needed:** Search Console → Pages → "Blocked due to access forbidden" → Export.

**1.3 — 16 pages excluded by noindex.** Only /admin/login sets noindex in the
codebase, so 15 are unexplained and may be pages we want indexed.
**Needed:** Search Console → Pages → "Excluded by 'noindex' tag" → Export.

---

## 2. Open and unblocked

**2.1 — 29 blog posts on MongoDB ObjectId URLs.** They carry 147 keyword
mappings and 63,470 monthly volume, self-canonicalise to the ObjectId, and are
absent from the sitemap. The largest, "Aviation Jobs Besides Airline Pilot"
(23,190 volume, 24 keywords), is a substantial 1,300-word page — and it is the
bridge into the territory VFTI dominates (AME 27,100, air hostess and cabin
crew 40,500 + 22,200 + 18,100). next.config.js already holds a commented
consolidation block; the standing rule is that a line activates only in the
same commit as the rebuild that gives it a destination.
Duplicates inside the set: two copies of "Aviation Jobs Besides Airline Pilot",
three of "How Pilots Build Hours", and "How to Become a Pilot in India after
12th" (8,100) which duplicates two existing file-based pages.

**2.2 — No page for Dwarka.** Keywords 34 and 35 of the priority list are
"best pilot training academy in dwarka" and "pilot training institute in
dwarka", described as the Sector-7 battle. The academy is in Dwarka Sector 7
and there is no Dwarka page; the word appears only in body copy elsewhere.
Highest commercial intent of any gap on the list.
**Needs from owner:** batch size (the "only 20 students per batch" line was
removed as unverified), class timings, what a classroom batch actually
includes, and whether online batches run to the same schedule.

**2.3 — No cadet pilot programme hub.** Keyword 32, flagged as heavily targeted
by Golden Epaulettes. Six airline-specific pages exist (Emirates, Qatar, Air
India, IndiGo, SpiceJet, Air Arabia) with no hub above them, so they compete
with each other for the generic term. Airline cadet terms change per intake, so
any hub must cite airline sources and be refreshed each intake.

**2.4 — No pilot career counselling page.** Keyword 50, and it matches a
service the academy actually offers.
**Needs from owner:** what the counselling session covers, how long, whether it
is free, and what a parent leaves with.

**2.5 — PARTLY DONE 2026-09-15.** /cost-transparency rebuilt on sourced
figures and a wrong DGCA fee corrected (it said ₹3,000 per paper; the fee is
₹2,500 regular, ₹5,000 on demand). No 301s issued — which URL is canonical is
still the owner's decision and still needs Search Console data. Original note:
**Cost cluster still split across three URLs.** /cost-transparency,
/blogs/pilot-training-cost-in-india and /lead-magnets/cpl-cost-breakdown all
chase the same intent; only the blog ranks. CPL_COST in lib/facts.js holds the
one citable benchmark (IGRUA, the government academy under the Ministry of
Civil Aviation, ₹55,00,000 ab-initio to CPL with its inclusions and exclusions).
**Needs from owner:** which URL is canonical, and written partner-school quotes
if a private-school range is to be published as our own first-party data.

**2.6 — PARTLY DONE 2026-09-15.** The IGRUA benchmark and the "government
fees" angle are now on /cost-transparency. The IGRUA question-paper terms are
not built and should not be: we would be hosting or linking papers we do not
have. Original note: **IGRUA cluster untouched.** Capt Ahluwalia ranks 3rd for "pilot course
fees in india government" (1,600) and holds the IGRUA question-paper terms
(880 + 390). The IGRUA benchmark is already encoded; the cluster is not built.

**2.7 — DONE 2026-09-15. /your-guide-on-how-to-become-a-pilot-in-india rebuilt
as the cluster hub.** Six stages, each with the rule behind it, and a timeline
section built from the floors the rules fix rather than an invented duration.
No 301s issued for the rest of the cluster — that still needs Search Console
data. Original note:** It is the best current match for three of the 50 priority keywords —
"become a pilot", "how long does it take to become a pilot", "pilot career
counselling" — and ranks 27th for "how to become a pilot" (14,800) and 40th for
"how to become a pilot in india" (6,600). No page on the site answers how long
it takes.

**2.8 — Salary page blocked on a decision, not on research.**
/commercial-pilot-license-salary maps 74,120 volume, the second highest on the
site. scripts/check-claims.js blocks salary tied to our own graduates;
industry-wide ranges stated as such are permitted. No government body publishes
pilot pay — DGCA, the Ministry, PIB and parliamentary answers give licence
counts and FTO numbers only.
**Needs from owner:** whether to build it on airline disclosures and job
postings, or leave it.

---

## 3. Mistakes found in this analysis, and corrected

Recorded because the screen that produced them will be re-run.

**3.1 — The keyword-to-page matcher is a screen, not an answer.** Token overlap
produced "aviation academy" → /aviation-meteorology, "pilot training" and "cpl
training" → /pilot-training-in-sri-lanka, and "pilot school", "aviation school",
"flight training" and "best pilot schools" → the USA flying-school pages. Every
match must be read by a human before it drives work.

**3.2 — Line count is not a measure of thinness.** /pilot-training-in-delhi is
166 lines and was flagged thin; its content lives in
components/Citypagetemplate.jsx (487 lines). It is not thin.

**3.3 — "Does not import lib/facts.js" is not the same as unsourced.**
/rtr-a was flagged thin and unsourced. It was rewritten in August 2026 against
the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025
(G.S.R. 413(E), 25 June 2025), carries its own sourced constants and an honest
note about which operational details the Rules do not settle. It needs no work.

---

## 4. Mistakes found in the supplied 50-keyword list

**4.1 — The volumes are global.** For a Delhi academy serving India, global
volume is the wrong denominator, and the figures conflict with the Ahrefs India
data supplied earlier: this list puts "commercial pilot licence / CPL" at
12,100 global, while the Ahrefs export shows "cpl" at 201,000. Both cannot be
the same metric. Prioritise on the India figures.

**4.2 — The list omits the two pages that actually earn the traffic.** "egca
login" (74,000) and "dgca pariksha" (74,000 / 60,500) are absent, yet those two
pages produce roughly 1,850 of about 3,400 monthly visits. A priority list that
ignores the winners risks starving them.

**4.3 — Four keywords have no honest home yet** and are listed at 2.2, 2.3 and
2.4 above rather than being force-fitted to an existing page.

---

## 5. Done and verified

- lib/facts.js is the single sourced record: PARIKSHA (with the DigiLocker
  auto-generation route), EXAM_RULES, MEDICAL_STANDARDS, EGCA, SYLLABUS,
  CPL_COST, plus the licence ladder and CPL hours. Every figure carries its
  document and the date it was read.
- /dgca-computer-number, /dgca-pariksha, /dgca-class-2-class-1-medical,
  /ecga-login-your-complete-guide, /commercial-pilot-license-syllabus and
  /commercial-pilot-license-eligibility rebuilt from primary sources.
- The medical page restored from a 301 and added to the sitemap (87 → 88 URLs).
- One NAP everywhere: 9667370747, the Google Business number, across 30 files;
  the address aligned across 11; the "established 2002" claim removed.
- The 70% pass mark moved off the unverified list and cited to its CAR clause.
