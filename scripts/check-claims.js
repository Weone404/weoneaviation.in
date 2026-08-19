#!/usr/bin/env node
/**
 * Build gate: bars claims the academy cannot substantiate from ever shipping again.
 *
 * Scans all of .next/server (rendered HTML, page bundles and the shared chunks
 * that API routes and serverless functions are built from) plus public/llms.txt,
 * so it catches a claim however it reaches a reader — literal JSX, template
 * literal, imported constant, or an email body compiled into a cron route.
 * Runs as `postbuild`, so a claim that reaches the build fails the deploy.
 * .githooks/pre-push also runs it via `npm run check:claims`, so a hit is
 * normally caught before anything reaches origin.
 *
 * Keep the exclusions below: Vercel restores .next/cache between builds, so
 * artifacts from an EARLIER commit survive into
 * the current .next tree. Scanning those would fail a build over a claim that
 * has already been removed. .next/cache is skipped outright; if the scan is
 * ever widened again, prefer filtering to files whose mtime is from the current
 * build (>= the mtime of .next/BUILD_ID) over adding more path exclusions.
 *
 * Certification bodies (ICAO/IATA/EASA/MoCA) are matched only next to a claim
 * word. Bare mentions are legitimate on this site: the Air Regulations syllabus
 * covers ICAO Annexes, and DGCA genuinely does sit under the Ministry of Civil
 * Aviation. It is "ICAO Aligned" and "IATA Partner" that were unfounded.
 */
/*
 * ── REGULATORY SOURCING BASIS (recorded 2026-08-19) ────────────────────────
 * Read this before re-verifying any DGCA figure. It exists so the next session
 * does not repeat the search.
 *
 * WHERE THE NUMBERS COME FROM
 *   Aircraft Rules, 1937, Schedule II — consolidated text published by India
 *   Code (upload.indiacode.nic.in, actid AC_CEN_36_0_00013_193422_1523351174422).
 *   236 pages, real text layer. Amendment annotations run to 2018.
 *     Section B  Student Pilot's Licence          16 years
 *     Section E  Private Pilot's Licence (A)      17 years
 *     Section J  Commercial Pilot's Licence (A)   18 years; 1(e) = 200 hours
 *     Section M  Airline Transport Pilot (A)      21 years
 *   The Rules remain in force: the Bharatiya Vayuyan Adhiniyam, 2024 (16 of
 *   2024) repealed the Aircraft Act 1934 at s.43(1) but s.43(2) saves rules
 *   made under it. Cite as "Aircraft Rules, 1937 (continued in force by
 *   s.43(2) of the Bharatiya Vayuyan Adhiniyam, 2024)".
 *
 * AMENDMENT STATE — checked against civilaviation.gov.in
 *   Sections B, E and J: no post-2018 amendment found. Safe to cite.
 *   Section M and N: AMENDED TWICE. Re-check before using either.
 *     G.S.R. 22(E), 7 Jan 2020  (Aircraft (First Amendment) Rules, 2020)
 *       rewrote Section M 1(e) and Section N 1(e) — the ATPL experience
 *       figures (500->250, 200->100, 1000->500, 100->75, 10->20 hours).
 *       Ages untouched.
 *     G.S.R. 731(E), 10 Oct 2023 (Aircraft (First Amendment) Rules, 2023)
 *       rules 13, 38(2), 39C; Schedule II Section A para 9->10 and
 *       Section M para 4(e) (instrument rating).
 *   GAP: G.S.R. 579(E), 9 Aug 2019 is named in the 2020 notification as the
 *   then-latest amendment. Its text could not be retrieved from any
 *   government source. It is the one unclosed gap for Sections B, E and J.
 *
 * RTR(A) — different instrument entirely, do not cite Schedule II for it.
 *   Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025,
 *   G.S.R. 413(E), 25 June 2025, made under the Bharatiya Vayuyan Adhiniyam,
 *   2024. Administered by the DGCA, NOT by WPC/DoT — that route is superseded.
 *   r.6 age 16 + Class X; r.8(4) written then practical; r.8(5) syllabus;
 *   r.8(6) practical within three years of the written.
 *
 * STILL UNVERIFIED — must not appear on the site until sourced
 *   - the DGCA theory pass mark (set under CAR Section 7, not in the Rules)
 *   - the Class 1 / Class 2 medical split and when each applies. Rule 39B is
 *     the instrument but delegates the standards to the Director-General; the
 *     split lives in a DGCA medical CAR served only through DGCA's
 *     AES-encrypted JS portal.
 *   - the ATPL-from-defence 500 h / 200 h PIC figure is a Pariksha
 *     computer-number document rule for defence applicants in lieu of a CPL.
 *     It is NOT a CPL requirement and must stay off the CPL pages.
 * ───────────────────────────────────────────────────────────────────────────
 */
const fs = require('fs');
const path = require('path');

const CLAIM = '(certified|approved|aligned|compliant|accredited|affiliat|partner|member|recognis|recogniz)';
const OUTCOME = '(graduate|alumni|student|placement|placed|hired|our pilots|trainee)';
const OWNS = '(our fleet|our aircraft|our simulator|we operate|owned by us|in-house|Aircraft Used|Aircraft Fleet)';
const RUPEES_PER_MONTH = '\u20b9\\d[\\d.,]*L\\s*/\\s*month';
const PATTERNS = [
  /3500\+/i, /3000\+/i, /500\+\s*pilots/i,
  /98%\s*success/i, /100%\s*result/i, /100%\s*placement/i, /95%\s*pass/i,
  /25\+\s*partner/i, /225\+\s*hours/i, /20\+\s*countries/i,
  /oldest pilot training/i, /India'?s #1/i, /India'?s premier/i,
  /aggregateRating/i, /ISO 9001/i, /www\.weoneaviation\.in/i,
  new RegExp(`(ICAO|IATA|EASA|Ministry of Civil Aviation)[\\s-]*${CLAIM}`, 'i'),
  new RegExp(`${CLAIM}[a-z]*\\s+(by\\s+)?(ICAO|IATA|EASA|Ministry of Civil Aviation)`, 'i'),
  // Graduate-outcome promises: hiring windows and salary figures the academy
  // cannot stand behind. Industry-wide pay ranges stated as such are fine; a
  // rupee-per-month figure tied to our own graduates is not.
  /avg\.?\s*starting salary/i, /average starting salary/i,
  /hired within/i, /placement within/i,
  // Facilities, fleet and verifiability claims (2026-08-19 /credentials pass).
  // We do not own simulators, aircraft, a ground-school building or a medical
  // clinic; the flying is done at partner schools.
  /Level C\b/i, /CAE Simaero/i, /sqft facility/i, /in-house DGCA/i,
  /aviation medicine clinic/i, /verified faculty/i, /publicly verifiable/i,
  /Train on the Most Advanced Aircraft/i, /State-of-the-Art Training Facilities/i,
  /Free \d+ hrs of flying/i,
  // Aircraft types are matched only where they are framed as OURS. Bare type
  // names are legitimate all over this site: the Technical Specific syllabus is
  // taught on a Cessna 172, the PPL flight test is flown on a 152/172, and the
  // flying-school pages list the fleets of partner schools abroad. It is
  // "Aircraft Used"/"our fleet" that was the false claim, not the word Cessna.
  new RegExp(`${OWNS}[^.]{0,60}(Cessna\\s*\\d|Piper\\s*PA-)`, 'i'),
  new RegExp(`(Cessna\\s*\\d|Piper\\s*PA-)[^.]{0,60}${OWNS}`, 'i'),
  new RegExp(`${OUTCOME}[^.]{0,80}${RUPEES_PER_MONTH}`, 'i'),
  new RegExp(`${RUPEES_PER_MONTH}[^.]{0,80}${OUTCOME}`, 'i'),
];

const targets = [];
// Restored between Vercel builds, so it can hold artifacts from earlier
// commits. node_modules is vendor code we do not control and do not speak for.
const SKIP_DIRS = new Set(['cache', 'node_modules']);
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p);
    } else if (/\.(html|js|json|txt)$/.test(e.name) && !e.name.endsWith('.map')) {
      targets.push(p);
    }
  }
};
walk(path.join('.next', 'server'));
if (fs.existsSync(path.join('public', 'llms.txt'))) targets.push(path.join('public', 'llms.txt'));

if (!targets.length) {
  console.error('check-claims: nothing to scan — run `npm run build` first.');
  process.exit(1);
}

const failures = [];
for (const file of targets) {
  const text = fs.readFileSync(file, 'utf8');
  for (const re of PATTERNS) {
    const m = text.match(re);
    if (m) failures.push(`${file}\n    matched ${re}  →  ${JSON.stringify(m[0].slice(0, 80))}`);
  }
}

if (failures.length) {
  console.error(`\ncheck-claims: ${failures.length} unverifiable claim(s) found:\n`);
  failures.forEach((f) => console.error('  ' + f));
  console.error('\nRemove the claim — do not soften it. See data/academy.js.\n');
  process.exit(1);
}
console.log(`check-claims: clean (${targets.length} files scanned).`);
