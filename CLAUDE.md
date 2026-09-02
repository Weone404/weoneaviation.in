@AGENTS.md

# Daily blog routine — standing rules

A scheduled routine publishes one blog post a day here. These rules are the
accumulated corrections from real runs. They override any narrower reading of
the routine prompt's "Files you may change" list.

## The merge is the finish line, not the push

`.github/workflows/auto-merge-blog.yml` triggers only on `claude/blog-**`
branches. It builds, runs the claims gate, then merges into master; Vercel
deploys master. A post pushed to any other branch never goes live.

So: push to `claude/blog-YYYY-MM-DD`, then **watch that Action to completion**
before ending the run. Poll it or schedule a wake-up — do not end while it is
still in progress, and do not treat a green local build as "published".

If the Action fails:

- **On your content** — fix it in your own files and push again.
- **On the pipeline** (the workflow, a dirty tree, the runner) — **fix the
  workflow and push again. Do not stop and ask.** Push the fix to the same
  `claude/blog-*` branch: the Action re-runs from that branch's own copy of the
  workflow, so the fix applies immediately and reaches master via the merge.
  Keep it minimal and comment why it is there.

Escalate to a notification only for something genuinely out of reach — revoked
credentials, a GitHub outage, a repo setting you cannot change. "Outside my
usual scope" is not such a reason. Never push to master directly, and never
open a PR.

Fixed 2026-09-02: the Build step regenerates the tracked
`.generated-sitemap.xml`, which made `git checkout master` abort every run. The
workflow now discards it before the merge.

## Things earlier runs got wrong

- **Topic overlap** — check `pages/` at the repo root too, not just
  `pages/blogs/`. `rtr-a.jsx`, `dgca-computer-number.jsx`,
  `commercial-pilot-license-eligibility.jsx`, `dgca-class-2-class-1-medical.jsx`
  and `student-pilot-license-spl.jsx` already own their subjects.
- **FAQ schema** — `data/pageFaqs.js` is off limits to the routine, so build the
  `FAQPage` object from the post's own `peopleAlsoAsk` array and pass
  `schema={[articleSchema, faqSchema]}`. `StructuredData` accepts an array. See
  `pages/blogs/become-pilot-without-physics-and-maths-class-12.jsx`.
- **Prompt numbering** — grep `data/blog-image-prompts.md` for the highest
  `### Prompt N` rather than trusting a number quoted in the prompt. Insert the
  new `## Post:` section before the closing "Adding images for a new post"
  section. Do not repeat the house-style paragraph under each prompt; the block
  at the top of that file already covers every entry.
- **Lint** — `npm run lint` has pre-existing failures in `pages/admin/*`,
  `dgca-computer-number.jsx` and others. Not yours. Verify your own files with
  `npx eslint <files>` and say so in the summary.
- **Sitemap** — `npm run build` rewrites `.generated-sitemap.xml`. Commit that
  change with the post; every previous blog commit does.
- **Conflicting sources** — if secondary sources disagree on a figure, that is
  not a source. Leave the figure out and say it varies.
