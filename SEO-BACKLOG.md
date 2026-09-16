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

**2.31 — DONE 2026-09-16. /ame-aircraft-maintenance-engineer.** The largest
sourceable gap left after the 50-keyword list was closed: roughly 27,100 monthly
searches, covered until now by one section of a blog post, and the territory the
competitor VFTI ranks first for.

It is honest for us to publish because it says outright that we do not train
AMEs. What it offers is what a 17-year-old choosing between the routes actually
needs: DGCA's requirements for both, side by side, from the regulator's own
documents.

The fact that carries the page: an AME candidate needs Physics, CHEMISTRY and
Mathematics; a pilot needs Physics and Mathematics. DGCA states both side by side
in its own rejection-reasons document for computer numbers. A student who drops
Chemistry at 10+2 has closed the AME door and left the pilot door open, and
nobody tells them at the point they choose subjects. That consequence is now
stated on the after-12th page too.

Withheld: AME salary, placement, institute fees, institute counts. None
sourceable. On whether there is an AME shortage — the Ministry has published a
position on PILOT supply and none on engineers, so the page says so rather than
inventing one.

**2.32 — DROPPED 2026-09-16, and worth recording why.** A page on pilot eyesight
requirements was researched and abandoned. "Can I become a pilot with glasses" is
among the highest-volume aviation queries in India and the site does not answer
it. DGCA's medical standards could not be retrieved: the Class 1 and Class 2
pages are served through a JavaScript portal that returns only navigation, and
the CAR attachment returns binary that cannot be read by the tools available
here.

Building the page anyway would have meant publishing exactly the kind of
unsourced vision figure that was REMOVED from
/commercial-pilot-license-eligibility on 15 September for being untraceable.
Writing it back onto a new page would be worse than the original error, because
it would be deliberate.

**If the owner can obtain CAR Section 7 Series 'C' Part I as a readable
document**, or any DGCA publication stating the visual acuity standard, this is
probably the single highest-demand page the site could still add. Until then it
stays unbuilt.


**2.30 — DONE 2026-09-16. All 36 legacy database URLs resolved. Backlog 2.1 is
closed.** The set that began as "29 blog posts on MongoDB ObjectId URLs", turned
out to be 36 when the live index was read, and has been worked down across this
branch, is finished. Verified programmatically: every ObjectId in
data/legacy-blog-inventory.md has a matching redirect in next.config.js, 36 of
36, zero missing.

The decision to consolidate rather than rebuild was made on evidence rather than
convenience. The Semrush positions export of 15 September shows only five
ObjectId URLs ranking for anything across the entire site, every one with zero
traffic, and four of those five were already redirected. They had no ranking
value to preserve. What they had was crawl budget, against a site indexing 74
pages out of 502 — which is the binding constraint on everything else.

Nothing was deleted. Every post still exists in the database; the redirect stops
the ObjectId being a separate self-canonicalising destination.

One correction included: 6a8be2f7, "Aviation Safety Procedures Every Student Must
Know", had a parked mapping to a DGCA medical page. That mismatch was flagged in
this file on 15 September and has now been resolved properly — it points at
/air-regulations, because safety procedures are regulation. No parked redirects
remain anywhere in next.config.js.

Where a destination is an imperfect match it says so on its own line in the
config. The clearest example: "Importance of Aviation English for Pilots" points
at /rtr-a because radio telephony is where aviation English is examined, but a
dedicated English Language Proficiency page does not exist and would be the
better destination if one is ever built.


**2.28 — URGENT, NEEDS THE OWNER. The three lead magnets take an email and give
nothing back.** /lead-magnets/cpl-cost-breakdown, /dgca-exam-checklist and
/pre-admission-checklist collect a name and email, show "Check your email! PDF
downloading now...", then link to /pdfs/<file>. There is no public/pdfs
directory and no PDF anywhere in public/. The API behind the form saves the lead
and sends a welcome email; it does not attach or link the guide either. So every
person who has filled that form handed over their contact details, was told it
worked, and received nothing.

Fixed on 2026-09-16 as far as it can be fixed in code: the form now checks
whether the file exists before claiming a download, and if it does not, tells
the person the truth and gives them the email and phone number to get it
directly. The lead is still captured, which was the part that worked.

**Needs from owner:** produce CPL-Cost-Breakdown-Guide.pdf,
DGCA-Exam-Checklist.pdf and Pre-Admission-Checklist.pdf and drop them in
public/pdfs/. The moment they exist the download works and the fallback never
shows. This is a trust problem rather than an SEO one, which is why it is at the
top of this list.

**2.29 — DONE 2026-09-16. Internal link audit, and a finding that matters.**
scripts/audit-links.cjs added. The site's second highest-traffic page,
/full-form-of-cpl-commercial-pilot-license (731 visits a month, 230,050 of search
volume), had exactly ONE inbound internal link — from the HTML sitemap. So did
/icse-full-form (171,380 volume) and /cbse-full-form (150,330). Three of the four
largest-volume pages on the site were reachable only from a sitemap page, which
is a plausible part of why they sit at positions 46, 26 and 33.

Contextual links added from the pages that should have linked them all along:
the CPL eligibility page, the route guide, /dgca-ground-classes and the
after-12th page, plus links to the new counselling, timeline and hour-building
pages from their natural parents. Every page with one inbound link is now above
one, and /student-checklists — the only real orphan in the sitemap — is linked.

The audit script exists because two earlier audits in this project returned false
all-clears from greps that were narrower than the codebase. Its header records
the four shapes internal links take here and warns that a jump in the orphan
count means the regex is wrong, not the site.


**2.26 — DONE 2026-09-16. /blogs/how-pilots-build-hours built, three legacy URLs
retired.** The three parked redirects (6a7034d8, 6a1d00f8, 6a0bf3f4) finally have
the destination they had been waiting on since before this branch, and were
activated in the same commit per the standing rule. Three ObjectId URLs on one
topic, consolidated.

The page's angle is the question nobody answers: not how to build hours but WHY,
when 200 is what the licence requires. The answer is published — the Ministry of
Civil Aviation's position that there is no shortage of pilots in India but there
is a shortage of commanders. Hours are not for the licence; they are for the
scarcity, and the scarcity is at command level. It also publishes the FDTL
ceiling on how fast hours can accumulate once employed, and the recency rule that
deletes hours older than five years.

Deliberately withheld: any airline's minimum-hours figure (set per vacancy, moves
with the cycle), ATPL hour figures (the Section M table was amended twice, see
ATPL_HOURS_GUIDANCE), instructor-rating thresholds (sources disagree, none
primary), and any cost per hour.

**2.27 — DONE 2026-09-16. The duplicate-FAQPage bug was twelve pages wider than
2.11 found.** The 15 September audit grepped for `generateFAQSchema` and found
five pages. Twelve more emit their own FAQPage node as a hand-written object
instead, so the grep never saw them: ten file-based blog posts,
/commercial-pilot-license-syllabus, and the new hour-building post.

Each was shipping two FAQPage nodes AND four generic fallback questions that
nobody wrote for that page, rendered visibly beneath its real ones. Verified by
calling getPageFAQs directly on each route rather than by inspection. All twelve
are now gated, and re-checked the same way afterwards.

**When auditing this gate in future, grep for the FAQPage type as well as for
generateFAQSchema.** A page can emit the node either way, and the narrower grep
gives a false all-clear. That note is now in the gate itself.


**2.23 — DONE 2026-09-16. Four new pages for keyword-list gaps.** Built after
mapping all 50 priority keywords against the routes that exist. Forty-six were
already covered; four were not, and one is still blocked.

- **/how-long-does-it-take-to-become-a-pilot** (keyword 45). Every competitor
  answers with a duration nobody can source, because no Indian regulation sets
  one. This page publishes what the rules DO set: floors, and — the part almost
  nobody covers — expiry windows, since paper passes die at two and a half
  years (five for CPL and ATPL) and hours older than five years stop counting.
  Ends on the one question to ask a school, backed by DGCA weighting
  Operational Aspects at 40% of its own FTO ranking.
- **/pilot-training-abroad** (keyword 43). Five country pages existed under
  /flying-school/ with no parent, competing with each other for the generic
  term — the same shape the airline cadet pages had. Leads with the fact most
  pages bury: a foreign licence is not an Indian licence, and conversion sits
  outside every quote. No conversion fee or timeline is stated; we could not
  source one.
- **/online-dgca-ground-classes** (keyword 33). Reframes the question: every
  step of the DGCA examination process is already location-independent, so
  online is not a workaround. Balanced by what no ground school can do online
  or otherwise. No batch size, timings, duration, fee or pass rate, per the
  owner's standing rule.
- **/cpl-flight-training** (keyword 42). The deep blog posts on individual
  components existed with no page above them. Corrects the error most
  competitor pages make: the named components sit INSIDE the 200-hour total,
  not on top of it, and presenting them as additions has readers budgeting for
  flying hours the rule does not require.

**2.24 — DONE 2026-09-16. Keyword 50, /pilot-career-counselling, unblocked and
built.** The owner confirmed on 16 September that counselling is free of cost
and guides end to end. Those are the only two service claims on the page;
everything else is regulatory substance from lib/facts.js.

It is deliberately not a contact page with a new title. It publishes the agenda
in advance — the eight decisions a prospective pilot faces, in the order that
wastes the least money, each with the rule or published figure behind it and a
link to the page that sets it out in full. A reader who never makes contact
still leaves better informed, which is the only honest basis for asking anyone
to get in touch.

It also states what counselling cannot do, and closes on the Ministry of Civil
Aviation's own position that there is no shortage of pilots but there is a
shortage of commanders. A counselling page implying a guaranteed career would be
the same class of claim as the guaranteed Emirates interview removed on 15
September.

Carries Article, Service and FAQPage nodes. The Service node prices the offer at
0 INR, which is the owner's stated fact rather than an inference.

**Do not add to this page:** session length, batch size, timings, fees, pass
rates, placement, or a count of students counselled. None of it is
substantiated.

ALL 50 KEYWORDS ON THE OWNER'S PRIORITY LIST NOW HAVE A HOME.


**2.19 — DONE 2026-09-16. The www 301 that never existed.** next.config.js
carried a comment claiming a www-to-apex 301 ran at the Vercel edge; nothing
implemented it and no redirect in the table of 131 carried a host condition.
Verified live before fixing: www served every route with a correct apex
canonical and "index, follow", and no redirect. From the Semrush positions
export of 2026-09-15, 371 of 857 ranking rows sat on www carrying 295,190 of
tracked volume, with 49 keywords ranking on both hostnames at once. The rule is
now the first entry in redirects(). **Verify after deploy** that
https://www.weoneaviation.in/dgca-pariksha returns a 301 to apex.

**2.20 — DONE 2026-09-16. Structured data added to the eight highest-value
pages.** The pattern the positions export exposed: these are not thin pages —
400 to 1,200 lines each — but they shipped no JSON-LD and no answer-first block
on queries where an AI Overview is already showing. /dgca-pariksha (1,103
visits, the site's highest), /full-form-of-cpl-commercial-pilot-license (731),
/icse-full-form, /cbse-full-form, /dgca-full-form, /ppl-full-form,
/ecga-login-your-complete-guide and /your-guide-on-how-to-become-a-pilot-in-india
now carry answer-first blocks, People-also-ask, Article nodes with citations and
FAQPage nodes as each was missing them. Every figure came from lib/facts.js; no
new facts were introduced.

Note for whoever audits this: four of those routes sit in the existingFaqRoutes
gate, which meant they were excluded from the automatic FAQ injection and had
never been given one of their own — so they had no FAQ structured data at all.
That is the inverse of backlog 2.11 and worth checking on any page in that gate.

**2.21 — Two owner decisions this analysis surfaced.**

*The misspelled slug.* /ecga-login-your-complete-guide reads "ecga" where the
query is "egca" — 74,000 volume at position 12, 756 visits a month. Renaming
means 301-ing a URL that is currently earning. On-page targeting has been fixed
without touching the URL. **Needs from owner:** rename to /egca-login with a
301, or leave it.

*The head term.* "cpl" alone is 201,000 volume and sits at position 46 on
/full-form-of-cpl-commercial-pilot-license, which already holds position 1 for
"cpl full form". The answer-first block now leads with the licence and its four
requirements, which is the content half of that gap. Whether to go further —
a dedicated hub for the bare term — is a decision worth taking on data after
this change has had time to register.

**2.22 — DONE 2026-09-16.** /pilot-training-in-india rebuilt around a sourced
core rather than extended. The diagnosis was that length was never the problem:
1,161 lines holding 133 keywords and 54,230 of search volume with nothing above
position 15 and 3 visits a month, and 109 of those keywords showing an AI
Overview. It had no JSON-LD, no answer-first block, no People-also-ask, no
sourced facts and not one table element in a page that size — and because the
route sits in the existingFaqRoutes gate it had no FAQ structured data at all.

The half that markup alone would not have fixed: the keywords it holds belong to
pages that now exist and are stronger. "pilot course fees" to
/cost-transparency, "best pilot training institute in india" and "aviation
academy" to /how-to-choose-an-aviation-academy, "commercial pilot license" to
/commercial-pilot-license. The page was competing with its own specialists. It
now routes each sub-intent to the page that answers it and keeps the one job
nothing else does — the national picture, built on DGCA's published FTO list and
ranking, which no competitor page for this term carries.

**Watch after deploy:** if the routing works, expect this page's keyword count
to fall while the specialist pages rise. A drop in keywords here is the intended
outcome, not a regression. Original note: **/pilot-training-in-india is the next real job.** 133 keywords, 54,230
of search volume, nothing above position 15, 3 visits a month, and 109 of those
133 keywords show an AI Overview. 1,161 lines of breadth with no depth: no
JSON-LD, no answer-first, no People-also-ask, zero table elements and no sourced
facts. It is the largest remaining page-level gap and it needs a rebuild rather
than an injection of markup.


**2.1 — STARTED 2026-09-15. 12 of 41 URLs now resolved, and the set was never 29.**

CORRECTION 2026-09-15: the supplied keyword spreadsheet said 29 database posts.
The live blog index, read the same day, shows 36 — plus five more posts on
numeric ids (/blogs/1 to /blogs/5) that are not in the database at all and were
missing from every count so far. 41 legacy URLs in total. The full inventory,
with a status and a destination decision for each, is now written down in
data/legacy-blog-inventory.md. Work from that file rather than from any
spreadsheet: it was read from the site itself.

Resolved so far (12): 6a040a0d, 6a01656b, 6a7178c6, 6a06b251, 6a13dbf1,
6a38b7ae, 69ef4fb9, and as of this commit 69f1a52d (to the new
/how-to-choose-an-aviation-academy), 69dc860c, 69f970e6, 6a87eae0, 6a893d2e
and 6a240cea. Two lines remain correctly parked because their destinations do
not exist: the three "How Pilots Build Hours" duplicates, and 6a8be2f7
(Aviation Safety Procedures), whose old mapping pointed at a medical page and
is a topic mismatch.

Next by value among what is left: the five numeric-id posts, three of which
(/blogs/1, /blogs/2, /blogs/5) are straight duplicates of pages that are now
sourced and deeper, and about a dozen opinion pieces with no regulatory content
that need a keep-or-consolidate decision rather than a rebuild.

Original note: **2 of 29 done.** The largest post, "Aviation Jobs
Besides Airline Pilot" (23,190 volume, 24 keywords) and its duplicate, now
live at /blogs/aviation-jobs-besides-pilot with both ObjectIds 301'd to it in
the same commit, per the standing rule. Rebuilt around the licensed/unlicensed
distinction no competitor draws, with AME sourced from the DGCA Pariksha AME
FAQ. A third, "How to Become a Pilot in India after 12th" (8,100), was a straight
duplicate of /how-to-become-a-pilot-after-12th and now 301s there — no new
page needed. That leaves 26. Also verified that the four still-commented
mappings in next.config.js all point at destinations that do not exist, and
annotated two that are wrong on their face: 6a8be2f7 is an aviation-safety
post pointed at a medical page, and 6a240cea names a multi-engine page under
a slug that does not exist while a real one does. 26 posts remain; the next by volume are "Best Aviation Academy Near Me"
(16,630, commercial intent — probably a landing page rather than a blog post)
and "How to Become a Pilot in India after 12th" (8,100), which duplicates two
existing file-based pages and should 301 rather than get a new page.
Original note: **29 blog posts on MongoDB ObjectId URLs.** They carry 147 keyword
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

**2.2 — DONE 2026-09-15.** /pilot-training-in-dwarka built, without any of the
operational detail the owner asked to keep off the site — no batch size, no
timings, no fee, no pass rate, no placement claim. What makes it more than a
thin location page is that three DGCA institutions a Delhi student needs are
physically in Delhi and no competitor mentions it: the Central Examination
Organisation at R.K. Puram (where a computer number is scrutinised, where an
original BVC must be on file, and where a rejection is appealed in person on
Tuesdays and Thursdays 3-5pm), four of DGCA's thirteen approved aeromedical
centres, and the equivalence body on Kotla Marg. Entirely sourced, useful
whether or not the reader enrols. LocalBusiness-style EducationalOrganization
schema with the confirmed NAP, plus Article and FAQPage. Linked from the
breadcrumb map, the HTML sitemap and /dgca-ground-classes, and in the XML
sitemap (89 to 90 URLs). Original note: **No page for Dwarka.** Keywords 34 and 35 of the priority list are
"best pilot training academy in dwarka" and "pilot training institute in
dwarka", described as the Sector-7 battle. The academy is in Dwarka Sector 7
and there is no Dwarka page; the word appears only in body copy elsewhere.
Highest commercial intent of any gap on the list.
**Needs from owner:** batch size (the "only 20 students per batch" line was
removed as unverified), class timings, what a classroom batch actually
includes, and whether online batches run to the same schedule.

**2.3 — DONE 2026-09-15.** /cadet-pilot-program built as a real hub above the
six airline pages, and the 301 that sent every generic cadet search onto the
Emirates page was removed. The hub deliberately publishes no airline-specific
terms (no fees, intakes, quotas or bond figures) because those change per
intake and cannot be kept true; it publishes the durable fact instead — a
cadet programme changes selection, funding and placement, not the licence, so
200 hours, five papers at 70%, Class 1 medical, RTR, ELP Level 4, age 18 and
the eGCA application hold on every route. Each of the six airline pages now
links up to it through components/CadetHubLink.jsx.
**Still open on this cluster:** the six airline pages carry inherited,
unsourced programme detail (guaranteed-interview wording, IELTS bands, age
floors, fleet lists, fee and bond figures). None of it traces to an airline
document read on a known date. These pages need the same source-or-remove pass
the DGCA pages got — logged as 2.10.

**2.16 — Claims sweep, 2026-09-15. Four false or unsupportable claims removed,
and three gaps closed in the gate that should have caught them.**

Removed:
- "Guaranteed job interview with Emirates upon successful completion", on
  /emirates-cadet-pilot-program and again in the /emirates-cadet-pilot-program
  FAQ content. Emirates' own release says candidates interested in opportunities
  with the airline "will be required to pass the selection process put in place
  by the airline". The site was asserting the opposite of the airline's own
  statement.
- "100% / Placement Focus" tile on /airindia-pilot-preparation.
- "100% / Pass Rate" tiles on /air-navigation and /technical-general, and
  "100% / DGCA Pass Rate" on /dgca-ground-classes-in-india. The academy's own
  Terms page says "We do not promise DGCA exam pass rates or results".
- "3,000+ Pilots Trained Across India" on /dgca-ground-classes-in-india, plus
  "28 States Pan-India Reach" and a six-month course duration in the same tile
  row. The duration is operational detail the owner asked to keep off the site.
- "Job Guarantee — With partner airline (Air Arabia)" row on /air-arabia,
  replaced with the structural difference, which is true.

Gate gaps closed in scripts/check-claims.js, each of which let one of the above
ship: the "3000+" patterns were literal digit strings and missed the
comma-formatted "3,000+"; and both the placement and pass-rate patterns
required the number and the word to sit in one string, while the site renders
them as separate array entries with markup between. All three now tolerate
intervening markup, with a tight bound so an unrelated "100%" elsewhere on a
long page does not fail a build for nothing.

**Left alone deliberately:** the "25% Scholarship for All" line on
/dgca-ground-classes-in-india, the "100% CPL scholarship" on
/best-flight-schools-in-usa, and "100% Loan For Flight Training" on the home
page. Anything about what is charged, discounted or financed is the owner's to
state. **Needs from owner:** are those three offers real and current, and on
what terms?

**2.10 — PARTLY DONE 2026-09-15.** Emirates, Qatar Airways, SpiceJet, Air
Arabia and Air India have had their false and unsourceable claims removed or
attributed. What was verified against a primary source and now carries a date:
Emirates' National Cadet Pilot Programme is an Emiratisation programme for UAE
nationals while the academy separately admits self-funded international cadets;
SpiceJet's own site states the Letter of Intent, the "assured job" wording, age
17–35, 10+2 with 60% in each of English, Physics and Mathematics, and a Class 2
DGCA medical — all now quoted and attributed to SpiceJet rather than asserted by
us. Qatar Airways could not be verified from its own material at all; the DGCA
medical requirement stated there was simply wrong and is gone.

**2.25 — DONE 2026-09-16. IndiGo and Air India, the two pages that had only had
the claims sweep.** They turned out to be a different problem from the other
four: they are not descriptions of airline cadet programmes at all, they are
recruitment-preparation service pages for pilots who already hold a licence.

Three things fixed:
- /indigo-pilot-preparation claimed "a track record of successful selections —
  pilots who cleared IndiGo and other major carriers after training with We One
  Aviation". An outcome claim about third-party hiring, unsubstantiated, and
  contradicting the scope statement. Replaced with an explicit statement of what
  is NOT claimed. A second card claimed curriculum built on IndiGo's "known
  selection patterns, question banks and evaluation benchmarks" — reworded to
  drop the implied inside knowledge.
- /airindia-pilot-preparation stated Air India's selection stages as fact. No
  published description could be sourced, and asserting a third party's process
  without one is the same failure as asserting their fees. Reframed as the
  stages we prepare you for, with the reader sent to the airline.
- A BUG OF MY OWN, from the 15 September cadet-hub batch: CadetHubLink was added
  to both pages. It addresses someone choosing an ab-initio cadet route, while
  these pages are for licence holders. Removed from both and replaced with a
  note that draws the distinction and routes the cadet reader to the hub. The
  hub's own list also implied both were cadet routes; both entries relabelled.

One genuinely sourced gain: IndiGo publishes its cadet criteria on its own site
— at least 18 and not more than 32, 10+2 with Physics and Mathematics
compulsory, a maximum of two attempts per stage, and no promise of employment on
that page. Now in lib/facts.js as INDIGO_CADET with the URL and the date read.
These are the only airline-specific figures anywhere on this site, and they are
there because the airline publishes them.

**Still open on this cluster:** SpiceJet's four fee instalments could not be
confirmed against Spice Star Academy's own fee page on 15 September 2026 — they
are left in place with an explicit caution rather than deleted, and need
confirming. IndiGo and Air India pages have not had a full sourcing pass, only
the claims sweep. Original note: **Six airline cadet pages are unsourced.** /emirates-cadet-pilot-program,
/qatar-airways-cadet-pilot-program, /spice-jet, /air-arabia,
/airindia-pilot-preparation and /indigo-pilot-preparation predate the sourcing
discipline. They state eligibility ages, English-test bands, training aircraft,
fee and bond figures, and in one case a guaranteed interview, with no citation
and no date read. Airline cadet terms change per intake, so each figure must
either be cited to that airline's own current page with the date it was read,
or removed and replaced with a line saying the airline publishes it per intake.
Doing this well means reading six airline sites; it is the largest remaining
sourcing job on the site.

**2.14 — The six numeric-id posts: unsourced claims removed, deletion still
an owner call.** /blogs/1 to /blogs/6 predate every sourcing rule here.
/blogs/6 is not even linked from the blog index. Three of them were shipping
figures that nothing supports: /blogs/3 a "₹40–80 lakhs" training cost (the
same figure removed from /cost-transparency in this branch), /blogs/4
per-airline pilot salaries quoted to the lakh, /blogs/5 a 6/6 vision standard
and a 140/90 blood-pressure limit presented as DGCA requirements (the same
unsourced standard removed from /commercial-pilot-license-eligibility). All
removed 2026-09-15 and replaced with what can be shown, including an explicit
paragraph in each saying what was taken out and why.

Four of the six (/blogs/1, 2, 5, 6) now carry a canonical to the page that
supersedes them plus noindex, which stops them competing with the real page
without removing a URL anyone may be holding. /blogs/3 and /blogs/4 have no
superseding page and stay indexable, now rewritten honestly.

**Needs from owner:** whether /blogs/1, /blogs/2, /blogs/5 and /blogs/6 should
be 301'd to their canonical targets and removed outright. That is a deletion,
so it is not being done without a decision. The canonical plus noindex already
achieves most of the benefit.

**2.17 — DONE 2026-09-15. Site-wide pay sweep, and the salary page rebuilt.**

/commercial-pilot-license-salary was the highest-volume page on the site (74,120
mapped searches) and it answered the question with ₹1.5–3 lakh entry, ₹6–10 lakh
captain and per-country monthly bands. None of it traced anywhere. It is rebuilt
around the one thing about Indian airline pilot pay that IS published and that no
competitor page carries: a large part of the pay is flying-hour linked, and DGCA
caps flying hours. CAR Section 7 Series 'J' Part III, Issue III of 24 April 2019
as revised 8 January 2024, sets 35 hours in 7 days, 100 in 28, 300 in 90 and
1,000 in 365, with a minimum weekly rest of 48 continuous hours including two
local nights. So the variable half of the pay has a hard, checkable ceiling.

A trap for the next session, recorded in lib/facts.js as well: CAR Section 7
Series 'J' PART I carries the same four numbers and applies to CABIN CREW. Part
III is the flight crew one.

The same figures were on eleven other surfaces, and all of them were swept in the
same commit — components/FAQs.jsx (which renders on the home page and was the
most widely served of them), /courses, /courses/cpl, /commercial-pilot-license,
/pilot-course-training-in-india, /pilot-training-in-india,
/dgca-ground-classes-in-india, /blogs/aviation-course-after-12th, and five
entries in data/pageFaqs.js. The site now answers this question with one voice
through lib/facts.js PAY_NOTE.

Three of those deserve naming:
- /dgca-ground-classes-in-india attached salary bands directly to this academy's
  own course — "Your DGCA Ground Classes in India are the first investment in
  this career". That is a salary claim tied to our own students' outcomes, which
  the owner's standing rules bar outright.
- /blogs/aviation-course-after-12th quoted a named-airline average, "IndiGo
  (Example) ₹62.7 Lakhs / Year". Attributing a specific figure to a named company
  with nothing behind it is the worst version of this problem.
- data/pageFaqs.js carried a return-on-investment calculation — a 24-month
  break-even worked from a ₹50 lakh cost and an assumed first officer salary. A
  financial projection built on an unsourced input is worse than none, because it
  reads as arithmetic.

Corrected in passing: components/FAQs.jsx said the minimum age for a CPL is 17.
It is 18 (Schedule II Section J); 17 is the PPL age. That error was on the home
page.

**2.18 — The cost ranges are the same problem and are NOT yet swept.** This is
the next batch. /cost-transparency states plainly that the ₹40–70 lakh range
could not be traced to any published document, while at least eight other
surfaces still quote a cost range as fact, and they do not even agree with each
other: ₹40–70 lakh, ₹40–55 lakh, ₹35–46 lakh, ₹35–45 lakh, ₹58–60 lakh, ₹50–90
lakh abroad, ₹6–10 lakh and ₹7.5–10 lakh for a PPL. Files: /blogs/pilot-training-cost-in-india,
/blogs/commercial-pilot-training-programs-complete-guide,
/blogs/flight-school-prerequisites-admission-guide, /how-to-become-a-pilot/after-12th,
/how-to-become-a-pilot/in-india, /flying-school/india, /pilot-training-in-india
(five per-country fee rows), /faq, and two entries in data/pageFaqs.js. The
site's own position is already set by /cost-transparency; everything else has to
be brought into line with it.

**Also needs the owner, found during the sweep:** data/pageFaqs.js describes a
"Topper Scholarship Program with a full money-back guarantee" for Class 10 and 12
toppers, and a 5–10% discount for paying the full fee upfront. Both are offers,
so both are yours to state — but a money-back guarantee is a strong promise and
should be one you can honour in writing. Confirm or remove.

**2.15 — SUPERSEDED by 2.17. Original note: /commercial-pilot-license-salary is unsourced.** While consolidating
/blogs/4 it became clear the destination has the same problem the source did:
₹1.5–3 lakh entry, ₹6–10 lakh captain, and per-country monthly bands, none of
them traceable. It was not redirected there for that reason. This page is
already blocked on the owner in section 1 for a rebuild; this note records that
what is currently live on it should not be treated as verified in the meantime.

**2.11 — Duplicate FAQ blocks, found and fixed 2026-09-15.** components/Layout.jsx
injects an FAQ block and an FAQPage schema node on every route that is not
listed in the `existingFaqRoutes` gate in data/pageFaqs.js. Five pages that
write their own FAQs were missing from that gate, so each shipped two visible
FAQ blocks and two competing FAQPage nodes: /cadet-pilot-program,
/pilot-training-in-dwarka, /dgca-class-2-class-1-medical,
/blogs/aviation-jobs-besides-pilot and /faq. Three of those five were pages
built in this branch, so this was self-inflicted. All five are now gated, and
a comment in the gate says any new page writing its own FAQs must be added in
the same commit. Worth a spot check on the rendered HTML after the next
deploy, since two FAQPage nodes on one URL is the kind of thing that
suppresses a rich result silently.

**2.12 — /about-us contradicts the honest scope statement.** The FAQ content
for /about-us in data/pageFaqs.js says students "learn from experienced airline
pilots, DGCA ground instructors, simulator instructors, and aviation medical
advisors". ACADEMY.scope, which every other page is built on, says the academy
does not employ pilots and does not own simulators. Both statements are on the
same site. The owner asked that instructor claims be left untouched, so this is
recorded rather than changed. It needs an owner decision: either the scope
statement is too narrow, or the /about-us copy overstates. It cannot be both.

**2.13 — Credentials are hard-coded in pages/api/blogs.js.** The Cloudinary
cloud name, API key and API secret are written in plain text in the file and
are in git history. This is not an SEO item and it is outside the brief, but it
was found while reading that file and it would be wrong not to say so. The
secret should be rotated in Cloudinary and moved to an environment variable.
Owner decision — no change made.

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

**2.9 — DONE 2026-09-15. The four DGCA subject pages.** Keywords 37 to 40 of
the priority list, all noted there as pages every major rival has. Each now
carries components/DgcaPaperFacts.jsx: the published syllabus headings for
that paper, the study material DGCA itself names for that subject, the 70%
pass mark with its clause, the fee, the five-year validity, and the 2026
session dates. Roughly 4,200 to 4,700 characters of sourced content added per
page, from one component rather than four copies that would drift apart.

## 4b. Verification available in this repo

`npm run build` then `npm run check:claims` remains the gate, and nothing
reaches origin without it — the pre-push hook enforces that.

Where a build is not possible (any environment without egress to
fonts.googleapis.com cannot build this site, because `next/font` fetches
Montserrat and Poppins at build time), `scripts/smoke-render.cjs` renders pages
offline and fails on a crash, on the word "undefined" reaching the copy, on NaN
and on [object Object]. It is not a substitute for the build; it closes the gap
between "eslint says it parses" and "React says it renders". Its two Babel
dependencies are installed with --no-save deliberately, so the dependency tree
this build is sensitive about does not move.

All fourteen rebuilt pages were run through it on 2026-09-15 and rendered clean.
The harness itself was corrected in the same pass: its lib/schema stub named
only two helpers, so a page importing generateFAQSchema reported a crash that
was the test's fault, not the page's.

### Page depth, for reference

Rendered text length from the smoke test, which is a fair proxy for how much a
reader actually gets: /dgca-computer-number 25,700 characters,
/commercial-pilot-license-eligibility 21,000,
/commercial-pilot-license-syllabus 15,500,
/your-guide-on-how-to-become-a-pilot-in-india 14,600,
/ecga-login-your-complete-guide 12,300, /dgca-class-2-class-1-medical 10,500,
/student-pilot-license-spl 9,600, /cost-transparency 9,600,
/blogs/aviation-jobs-besides-pilot 8,800.

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
