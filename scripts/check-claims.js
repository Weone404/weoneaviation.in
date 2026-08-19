#!/usr/bin/env node
/**
 * Build gate: bars claims the academy cannot substantiate from ever shipping again.
 *
 * Scans all of .next/server (rendered HTML, page bundles and the shared chunks
 * that API routes and serverless functions are built from) plus public/llms.txt,
 * so it catches a claim however it reaches a reader — literal JSX, template
 * literal, imported constant, or an email body compiled into a cron route.
 * TEMPORARILY OUT OF THE DEPLOY PATH (2026-08-19). It ran as `postbuild`, which
 * means a hit fails the Vercel build and blocks production. It now runs from
 * .githooks/pre-push via `npm run check:claims`, so nothing reaches origin
 * without passing, but a false positive can no longer hold up a deploy.
 *
 * To move it back to `postbuild`, keep the exclusions below: Vercel restores
 * .next/cache between builds, so artifacts from an EARLIER commit survive into
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
