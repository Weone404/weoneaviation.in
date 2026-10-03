# Blog refresh queue

Work list for the scheduled blog task. Work the top TODO item only, then mark it
DONE with the date and branch.

## How blog URLs are served (recorded 30 September 2026 so later runs skip the recon)

- `/blogs/1` … `/blogs/6` were a static array in `pages/blogs/[id].jsx`. All six
  now redirect permanently; the static entries remain as a rollback path and are
  unreachable because redirects run before routing.
- 24-character hex ObjectId URLs come from MongoDB, read by `getStaticPaths` and
  `getStaticProps` in `pages/blogs/[id].jsx` (`db.collection('blogs')`,
  `fallback: 'blocking'`). All 36 that existed on 15 September 2026 redirect —
  see `data/legacy-blog-inventory.md`.
- File-based slug posts are `pages/blogs/<slug>.jsx`, registered in the
  `guidePosts` array in `pages/blogs/index.jsx`.
- `scripts/generate-sitemap.js` walks `pages/` at build, so it never listed hex
  or numeric URLs and needs no exclusion list.

## Queue

### P1 — owner decision needed

- **HOLD** — `/blogs/pilot-salary-in-india` and `/blogs/pilot-salary-in-india-2026`
  — two live pages on one intent. House rules ban salary or income projections.
  Owner must decide which survives and whether a sourced market-rate reference is
  permitted. Do not touch either until this line says otherwise.

### P2 — year-sensitive slug posts, UPGRADE in place

From 1 October 2026 the target year becomes 2027, so each of these needs the year
in the H1, a cycle note, quick facts, and any figure reconciled against
`lib/facts.js`. URLs and datePublished stay; set dateModified to the day of the
edit.

- **TODO** — `/blogs/pilot-training-cost-in-india` — UPGRADE — year in H1, cycle note.
- **TODO** — `/blogs/commercial-pilot-training-programs-complete-guide` — UPGRADE.
- **TODO** — `/blogs/how-to-become-an-airline-pilot-in-india` — UPGRADE. Now also the
  destination of `/blogs/1`, so it carries that post's intent.
- **TODO** — `/blogs/flight-school-prerequisites-admission-guide` — UPGRADE.
- **TODO** — `/blogs/dgca-ground-school-guide` — UPGRADE.
- **TODO** — `/blogs/best-flying-school-in-india` — UPGRADE.
- **TODO** — `/blogs/what-is-pilot-training-complete-guide` — UPGRADE.
- **TODO** — `/blogs/cpl-vs-atpl-difference-india` — UPGRADE.
- **TODO** — `/blogs/type-rating-for-pilots-in-india` — UPGRADE.
- **TODO** — `/blogs/mcc-training-for-pilots-in-india` — UPGRADE.
- **TODO** — `/blogs/aviation-course-after-12th` — UPGRADE.

### P3 — already at or near the standard, touch only if a figure moves

`cpl-pilot-in-command-hours-requirement-india`, `cpl-cross-country-flight-requirement-india`,
`cpl-night-flying-hours-requirement-india`, `cpl-simulator-hours-dgca-rules`,
`how-pilots-build-hours`, `dgca-computer-number-rejected-reasons`,
`change-details-dgca-computer-number-profile`, `do-you-need-ppl-before-cpl-in-india`,
`ppl-physics-maths-requirement-india`, `igrua-admission-eligibility-fees`,
`foreign-national-nri-pilot-training-india`, `how-to-become-a-flight-dispatcher-in-india`,
`english-language-proficiency-test-for-pilots-in-india`,
`convert-foreign-pilot-licence-to-dgca-india`, `bharatiya-vayuyan-adhiniyam-pilot-licensing-india`,
`pilot-shortage-in-india`, `aviation-jobs-besides-pilot`, `dgca-exam-guide`,
`cpl-training-india-vs-abroad`, `instrument-rating-for-pilots-in-india`,
`multi-engine-rating-for-pilots-in-india`, `flying-instructor-rating-for-pilots-in-india`,
`become-pilot-without-physics-and-maths-class-12`.

### DONE

- **DONE 2026-09-30** — `/blogs/1`, `/blogs/2`, `/blogs/3`, `/blogs/5`, `/blogs/6` —
  the last five non-keyword blog URLs. Four merged into the page that supersedes
  them; `/blogs/3` replaced by a new post at `/blogs/cpl-training-india-vs-abroad`.
  Branch: `claude/blog-slugs-2026-09-30-1`.
- **DONE 2026-09-16** — all 36 MongoDB ObjectId URLs, see `data/legacy-blog-inventory.md`.
- **DONE 2026-09-17** — `/blogs/dgca-exam-guide` rewritten from a "DGCA full form"
  explainer into a real examination guide, so its URL and content now agree. Do
  NOT rename this route to `/blogs/dgca-full-form`; that query is served by the
  site page `/dgca-full-form`.
