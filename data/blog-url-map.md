# Blog URL map — keyword URLs for every blog post

State file for the one-off keyword-URL migration. A new session running the same
prompt continues from the first row that is not DONE, after checking what is
already merged into master.

Built 30 September 2026.

## Phase 0 recon — how the blog actually works

1. **Numeric URLs (`/blogs/1` … `/blogs/6`) are STATIC.** They are an array of
   objects at the top of `pages/blogs/[id].jsx` (`hardcodedBlogs` there, and a
   parallel card array in `pages/blogs/index.jsx`). No database, no API. Content
   is an HTML string in the `content` field of each object.
2. **Hex ObjectId URLs are MongoDB.** `pages/blogs/[id].jsx` imports
   `MongoClient` and reads `db.collection('blogs')` in `getStaticPaths` and
   `getStaticProps`, with `fallback: 'blocking'`. Full content of any hex post
   is read from that collection, not from the repo.
3. **The listing page reads both.** `pages/blogs/index.jsx` renders
   `hardcodedBlogs` (numeric, now empty), `guidePosts` (the file-based slug
   posts) and the MongoDB rows.
4. **`scripts/generate-sitemap.js` walks `pages/` at build.** It does not read
   MongoDB, so hex and numeric URLs were never in the sitemap. Nothing to
   exclude, and no `data/blog-migrated-urls.js` is needed — the exclusion the
   prompt asks for already exists structurally.
5. **New hex posts are created outside this repo.** There is an admin area at
   `pages/admin/`, but post creation writes to the MongoDB collection named in
   `MONGODB_URI`. Phase 4 is therefore not actionable here beyond what is
   already true: every existing ObjectId URL redirects, so a new one would have
   to be created deliberately.
6. **Course page for local/commercial intent:** `/dgca-ground-classes`
   (also `/dgca-ground-classes-in-india`, `/online-dgca-ground-classes`).
7. **`next.config.js`:** `trailingSlash` is NOT set. 163 redirect rules after
   this batch.

## THE MIGRATION WAS ALREADY 88% COMPLETE BEFORE THIS RUN

The prompt's audit describes ~48 posts on non-keyword URLs. That was true on
15 September 2026. It is not true now. All 36 MongoDB ObjectId URLs were
inventoried in `data/legacy-blog-inventory.md` and given permanent redirects on
16 September 2026 — the file records "ALL 36 RESOLVED", and the 36 rules are in
`next.config.js`. Spot-checked live on 30 September: `/blogs/6a38b7aece6bdc909efab785`
and `/blogs/6a040a0da7f96236c2f7ea90` both return 308 to their destinations.

So this run had five URLs left to do, not forty-eight. They are below.

## The rows

| Old URL | Old title | Content source | Disposition | New URL | Primary keyword | Status |
|---|---|---|---|---|---|---|
| /blogs/1 | How to Become a Commercial Pilot in India | Static array in `[id].jsx` | MERGE | /blogs/how-to-become-an-airline-pilot-in-india | how to become a commercial pilot in india | DONE 2026-09-30 |
| /blogs/2 | DGCA Written Exams: Subjects, Pattern & Preparation Tips | Static array in `[id].jsx` | MERGE | /blogs/dgca-exam-guide | dgca written exam subjects | DONE 2026-09-30 |
| /blogs/3 | CPL Training in India vs Abroad | Static array in `[id].jsx` | RENAME | /blogs/cpl-training-india-vs-abroad | cpl training india vs abroad | DONE 2026-09-30 |
| /blogs/4 | Pilot Salary in India | Static array (removed) | MERGE | /commercial-pilot-license-salary | pilot salary india | DONE 2026-09-16 |
| /blogs/5 | Medical Requirements to Become a Pilot in India | Static array in `[id].jsx` | MERGE | /dgca-class-2-class-1-medical | pilot medical requirements india | DONE 2026-09-30 |
| /blogs/6 | How to Become a Pilot After 12th Science | Static array in `[id].jsx` | MERGE | /how-to-become-a-pilot-after-12th | how to become a pilot after 12th | DONE 2026-09-30 |
| 36 × ObjectId URLs | see `data/legacy-blog-inventory.md` | MongoDB `blogs` | MERGE / COURSE | see that file | — | DONE 2026-09-16 |

## Three rows in the prompt's draft that the evidence changed

**`/blogs/5` → NOT a new post at `/blogs/dgca-class-1-medical-requirements-india`.**
The draft asks for a new blog post built from a medical brief. Since that brief
was written, `/dgca-class-2-class-1-medical` has been rebuilt against the DGCA
PDF of **CAR Section 7, Series 'C', Part I, Issue II of 12.10.2017 at Revision 7
dated 01 October 2025, effective 15 November 2025**, supplied by the owner on
16 September. It runs to 30,000 rendered characters and carries the validity
bands, the statutory fees, the eGCA booking step, the CA-34/34A/35 forms, the
Class 2 investigation table, the four dispositions, the 45-day window, the
90-day appeal route and the examiner empanelment bar. Creating a second medical
page would split that cluster and would breach this prompt's own slug rule —
"not the same intent as any existing slug". The redirect points at the sourced
page instead.

Two figures in the draft brief also disagree with what the CAR actually says,
which is a second reason not to build a page on it:
- The brief gives the DGCA medical fee as ₹3,000 initial and ₹2,000 renewal.
  Rev. 7 paragraph 4.3 gives **₹5,000 for Class 1, initial and renewal**, and
  **₹3,000 for Class 2 and Class 3**, payable on Bharatkosh.
- The brief says a finalised Class 2 is a prerequisite for the Class 1 initial.
  Rev. 7 paragraph 3.1.5 says the opposite: a Class 2 Medical Assessment is
  **not** mandatory before a Class 1 initial examination.
Both are flagged here rather than published anywhere.

**`/blogs/dgca-exam-guide` → NOT renamed to `/blogs/dgca-full-form`.**
The draft is right that the URL and the content disagreed — the page was a
"what the DGCA does" explainer. That was fixed by rewriting the page on
17 September 2026 into an actual examination guide: the five papers, the 70%
per-subject rule with no aggregate, both validity windows, the fee table, the
2026 session calendar with DGCA's own tentative caveat, the booking rules and
the oral pass marks by licence. The URL now matches the content, so renaming it
would break a page that is already correct. `/dgca-full-form` already exists as
a site page and covers that query.

**`/blogs/3` → a new post, not a merge into `/pilot-training-abroad`.**
`/pilot-training-abroad` answers "should I train abroad at all" for any
destination. "CPL training India vs abroad" is a comparison query with a
different answer shape. Kept separate, and the two cross-link.

## Still on HOLD for the owner

- **`/blogs/pilot-salary-in-india` and `/blogs/pilot-salary-in-india-2026` both
  exist.** Two live pages on the same intent, and house rules ban salary
  projections. Needs an owner decision on which survives and whether a sourced
  market-rate reference is allowed at all. Neither was touched.
