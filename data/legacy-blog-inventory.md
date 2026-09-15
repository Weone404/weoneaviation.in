# Legacy database blog inventory

Read from the live site's own blog index on 15 September 2026
(https://weoneaviation.in/blogs, which renders every row of the MongoDB
`blogs` collection). Until this file existed, the consolidation work was
guessing at how many posts there were; the supplied keyword spreadsheet said
29, the database actually holds 36, and five further posts live on numeric
ids that are not in the database at all.

Why this matters. Every one of these URLs self-canonicalises to itself, none
is in the XML sitemap, and several are near-duplicates of each other. They
are the single largest block of thin, unsourced, unindexed pages on the site.

The standing rule has not changed: a redirect line is activated in next.config.js
only in the same commit as the page that gives it a destination. Nothing here
is deleted. Nothing here is redirected until its destination exists.

## Status key

- `301` — redirect is live in next.config.js
- `PENDING` — redirect line is written but commented out; destination missing
- `OPEN` — no decision made yet

## Database posts (36)

| ObjectId | Title | Status / destination |
|---|---|---|
| 6aa0fd034738ae1b6c084077 | Career Opportunities after CPL Completion | OPEN — overlaps /commercial-pilot-license-salary (blocked on owner) and /blogs/aviation-jobs-besides-pilot |
| 6a9fab823dda771ee7446935 | How Aircraft Fly – Explained Simply | OPEN — principles-of-flight explainer; no home yet |
| 6a9e4f5b8c4cceb38ba8867e | Understanding Aircraft Instruments | OPEN — maps to /technical-general |
| 6a9bb0940eca0810d01f129c | Types of Aircraft Used in Flight Training | OPEN |
| 6a97b53cfeec1d5104271213 | Importance of Aviation English for Pilots | OPEN — maps to an ELP page that does not exist |
| 6a966b8435559fd1bf5c4ef7 | ATC Communication Tips for Student Pilots | OPEN — maps to /rtr-a |
| 6a8fc922ab469e6173e4cdf5 | Understanding NOTAMs and Aviation Weather | OPEN — maps to /aviation-meteorology |
| 6a8be2f757898ec159830c3e | Aviation Safety Procedures Every Student Must Know | PENDING — the commented line points at a medical page, which is wrong |
| 6a893d2e2c2fb9efee8153ca | What is CRM (Crew Resource Management)? | OPEN — maps to /blogs/mcc-training-for-pilots-in-india |
| 6a87eae016c8bc859396901b | Importance of Simulator Training in Aviation | OPEN — maps to /blogs/cpl-simulator-hours-dgca-rules |
| 6a75770ebc58e5c4285f7bc1 | Future of Aviation Careers in India | OPEN |
| 6a7178c67cef5b2241a02159 | DGCA Ground School Guide: Everything You Need to Know | 301 -> /blogs/dgca-ground-school-guide |
| 6a7034d8cf8e38fea1c417a5 | How Pilots Build Hours: A Complete Guide | PENDING -> /blogs/how-pilots-build-hours (does not exist) |
| 6a6c336593148a066f9559aa | If I Started Pilot Training Again, I'd do this | OPEN — opinion piece, no regulatory content |
| 6a6850dca7a285899ad63f18 | Pilot Myths Busted | OPEN |
| 6a619cc43a30c0c8e9d7e9d1 | Signs You Were Meant To Be a Pilot | OPEN — opinion piece |
| 6a5dc3d0e69c6a2bb320b6c0 | Discipline vs Talent in Aviation | OPEN — opinion piece |
| 6a5b27be734839af33893f0d | How Pilots Make Decisions under Pressure | OPEN |
| 6a59c21781d3e72d22cc9342 | Common Landing Errors Student Pilots Make | OPEN |
| 6a5474113d345ac99152ee5b | What Makes a Great Airline Pilot? | OPEN — opinion piece |
| 6a4b2bfec6790cb574fdb500 | Can Average Students Become Great Pilots? | OPEN — opinion piece |
| 6a38b7aece6bdc909efab785 | Aviation Jobs Besides Airline Pilot | 301 -> /blogs/aviation-jobs-besides-pilot |
| 6a27a2553ef9b6fb367fc42a | What Airlines Look For Beyond Flying Hours | OPEN |
| 6a240cea7b692cb9fe764c82 | Multi Engine Rating Explained | PENDING — the commented line names a slug that does not exist; the real page is /blogs/multi-engine-rating-for-pilots-in-india |
| 6a1d00f816d7f55288a22710 | How Pilots Build Hours After CPL | PENDING -> /blogs/how-pilots-build-hours (does not exist) |
| 6a13dbf1ad864b831525ec3b | Aviation Jobs Besides Airline Pilot (duplicate) | 301 -> /blogs/aviation-jobs-besides-pilot |
| 6a117717fc65055a7709739d | Why India Needs More Pilots | OPEN |
| 6a0e90762f3b24b31805ebdf | Is Pilot Career Worth It in 2026 | OPEN |
| 6a0bf3f4a8c579faedcb51e6 | How Pilots Build Hours (duplicate) | PENDING -> /blogs/how-pilots-build-hours (does not exist) |
| 6a06b251216e3de16875f5b0 | DGCA Ground School Guide – Complete Preparation | 301 -> /blogs/dgca-ground-school-guide |
| 6a040a0da7f96236c2f7ea90 | Pilot Training Cost in India Explained | 301 -> /blogs/pilot-training-cost-in-india |
| 6a01656be977bff6d3d6bd42 | Best Flying School in India: How to Choose the Right Aviation Academy | 301 -> /blogs/best-flying-school-in-india |
| 69f970e6d58c9676b0a61c01 | CPL vs Cadet Program: Which Is Better? | PENDING -> /blogs/cpl-vs-cadet-program (does not exist). The new /cadet-pilot-program hub, built 15 Sep 2026, now answers this question properly and is the better destination |
| 69f1a52df3ae4e86333eac32 | Best Aviation Academy Near Me | 301 -> /how-to-choose-an-aviation-academy (built 15 Sep 2026) |
| 69ef4fb93a29bf8490327d34 | How to Become a Pilot in India after 12th | 301 -> /how-to-become-a-pilot-after-12th |
| 69dc860c1f57ee917ebdcd84 | DGCA Subjects Coaching – Best Training for Pilot Ground Classes | OPEN — maps to /dgca-ground-classes |

## Numeric-id posts (5)

These are not in the database. They are the `hardcodedBlogs` array in
pages/blogs/index.jsx mirrored by the `posts` object in pages/blogs/[id].jsx,
and they are reachable at /blogs/1 through /blogs/5. They carry 2024 dates and
predate every sourcing rule on this site.

| URL | Title | Note |
|---|---|---|
| /blogs/1 | How to Become a Commercial Pilot in India | Duplicates /your-guide-on-how-to-become-a-pilot-in-india and /blogs/how-to-become-an-airline-pilot-in-india |
| /blogs/2 | DGCA Written Exams: Subjects, Pattern & Preparation Tips | Duplicates /blogs/dgca-ground-school-guide and /dgca-pariksha |
| /blogs/3 | CPL Training in India vs Abroad | No file-based equivalent |
| /blogs/4 | Pilot Salary in India | Overlaps /commercial-pilot-license-salary, which is blocked on the owner |
| /blogs/5 | Medical Requirements to Become a Pilot in India | Duplicates /dgca-class-2-class-1-medical, which is fully sourced |

/blogs/1, /blogs/2 and /blogs/5 are straight duplicates of pages that are now
sourced and deeper. They should 301 to those pages and be removed from both
arrays in the same commit. /blogs/3 and /blogs/4 need a decision first.
