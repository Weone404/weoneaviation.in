#!/usr/bin/env node
/**
 * Build gate: bars claims the academy cannot substantiate from ever shipping again.
 *
 * Scans the compiled pages (rendered HTML + server bundles) and public/llms.txt,
 * so it catches a claim however it reaches the page — literal JSX, template
 * literal, or imported constant. Runs as `postbuild`, since `.next/server/pages`
 * does not exist until `next build` has run.
 *
 * Certification bodies (ICAO/IATA/EASA/MoCA) are matched only next to a claim
 * word. Bare mentions are legitimate on this site: the Air Regulations syllabus
 * covers ICAO Annexes, and DGCA genuinely does sit under the Ministry of Civil
 * Aviation. It is "ICAO Aligned" and "IATA Partner" that were unfounded.
 */
const fs = require('fs');
const path = require('path');

const CLAIM = '(certified|approved|aligned|compliant|accredited|affiliat|partner|member|recognis|recogniz)';
const PATTERNS = [
  /3500\+/i, /3000\+/i, /500\+\s*pilots/i,
  /98%\s*success/i, /100%\s*result/i, /100%\s*placement/i, /95%\s*pass/i,
  /25\+\s*partner/i, /225\+\s*hours/i, /20\+\s*countries/i,
  /oldest pilot training/i, /India'?s #1/i, /India'?s premier/i,
  /aggregateRating/i, /ISO 9001/i, /www\.weoneaviation\.in/i,
  new RegExp(`(ICAO|IATA|EASA|Ministry of Civil Aviation)[\\s-]*${CLAIM}`, 'i'),
  new RegExp(`${CLAIM}[a-z]*\\s+(by\\s+)?(ICAO|IATA|EASA|Ministry of Civil Aviation)`, 'i'),
];

const targets = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|js|json|txt)$/.test(e.name)) targets.push(p);
  }
};
walk(path.join('.next', 'server', 'pages'));
if (fs.existsSync(path.join('public', 'llms.txt'))) targets.push(path.join('public', 'llms.txt'));

if (!targets.length) {
  console.error('check-claims: nothing to scan — run `next build` first.');
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
