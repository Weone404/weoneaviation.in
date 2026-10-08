# Blog standard — AEO, SEO and E-E-A-T for /blogs/*

Adopted 2026-10-08. Adapted from the owner's "aeo-seo-blog" skill, which was
written for an AI-security company; its internal links, demo CTAs and
"attack scenario" examples do not apply here and are replaced below. Where this
file and `lib/facts.js` / `scripts/check-claims.js` disagree, the facts file and
the claims gate win. Every post — new or rewritten — meets this before it ships.

## Truth comes first

- Every figure comes from `lib/facts.js`, imported, never retyped. A figure that
  is not there is not on the page: say it varies, or add it to facts.js with its
  source URL first. Salary figures and private-school fee ranges are never
  published (see `PAY_NOTE`, `COST_NOTE`).
- No placement, pass-rate, fleet, simulator or approval claim. `ACADEMY.scope`
  is the boundary for anything said about us.
- Never a future date. `dateModified` is the day of the edit.

## Page furniture (BlogPostLayout handles most of it)

| Element | Rule |
|---|---|
| `title` (meta) | Primary keyword first, 60 characters or fewer |
| `description` (meta) | 140–160 characters, contains the primary keyword, says what the reader gets |
| H1 (`heading`) | Primary keyword; carries the target year only if the content is year-sensitive (from 1 October 2026 that year is 2027) |
| Quick Answer | Kept. One question, a 40–60 word self-contained answer. This is the site's answer block for answer engines |
| Summary box | 4–6 facts, each one sentence, last one names the source and the date it was read |
| Last updated | Rendered by the layout from `dateModified` |
| Schema | `BlogPosting` + `FAQPage` built from the post's own `peopleAlsoAsk`, passed as `schema={[articleSchema, faqSchema]}`. The layout then turns off the generic FAQ injection |
| Primary sources | `sources` prop: the `sources` entries from facts.js the post relies on. Rendered as a list after the article |
| Author | We One Aviation Academy (owner's decision, 2026-10-08). No invented people or credentials |

## Body structure

1. **Intro — a problem-led hook, not an answer.** 80–150 words. Start from the
   situation the reader is in (a rejected application, a quote that does not add
   up, a parent asking whether Class 12 marks matter). Use the primary keyword
   once. Say what the post will settle. The Quick Answer above already answers;
   the intro does not repeat it.
2. **Top CTA** — `<BlogCta variant="top" />` right after the intro. Helpful,
   free, no pitch. Override the text when a more specific free resource fits.
3. **H2 sections.** Every H2 maps to a question a student or parent actually
   asks; use the question form where it reads naturally. The **first one or two
   sentences under each H2 answer that question directly** in 40–50 words, in
   complete, self-contained language (name the subject; do not open with "It" or
   "This"). No blockquote, no "Direct answer:" label — it is simply the opening.
   Then the depth: tables for anything compared, numbered lists for steps.
4. **Mid CTA** — `<BlogCta variant="mid" />` after the section where a reader
   would naturally think "who helps with this?". Override for the topic.
5. **Closing H2** — never "Conclusion" or "In conclusion". A takeaway heading
   ("What to do this week", "The short version") with 2–3 sentences and one
   forward-looking line.
6. **People also ask** — `<PeopleAlsoAsk items={peopleAlsoAsk} />` as the last
   child. Every answer stands alone: no "as mentioned above", no pronoun
   without its noun. Count by body length:
   under 1,000 words → 4–5; 1,000–2,000 → 6–8; over 2,000 → 8–10.
7. Bottom CTA, Related guides, Primary sources and the author box come from the
   layout.

## Links

- **External: at least 3 inline** links to primary sources with `<Ext>` (opens in a
  new tab, `rel="noopener noreferrer"`): DGCA, the Pariksha portal and its PDFs,
  eGCA, PIB, India Code, IGRUA, the Ministry of Civil Aviation. Take the URL from
  facts.js. No coaching sites, no aggregators.
- **Internal: 4–6 inline** links with descriptive anchors, woven into the
  sentences that need them, plus the `related` list. Check `pages/` as well as
  `pages/blogs/` for the page that owns a subject, and link to it rather than
  re-explaining it.

## Voice

- A ground instructor explaining to a student and their parent: direct, warm,
  specific. Second person ("you"), first person plural for the academy ("we").
- Write each paragraph to the length the idea needs. No one-line paragraphs used
  to look punchy; no padding to reach a word count.
- Never use: delve, leverage, navigate, landscape, crucial, vital, robust,
  realm, tapestry, paramount, underscore, intricate, seamless, game-changer,
  "in today's fast-paced world", "it's important to note", "in conclusion",
  moreover, furthermore. No "Pro tip" callouts. No emoji in body copy.

## Before shipping

- `npx eslint <your files>` clean; `npm run build`; `npm run check:claims`.
- Read the rendered page once, top to bottom, as the student it is written for.
- Index card in `pages/blogs/index.jsx`: title, excerpt and `date` (published)
  match the post; add `updated` (e.g. `'Oct 8, 2026'`) when `dateModified`
  differs from `datePublished`.
