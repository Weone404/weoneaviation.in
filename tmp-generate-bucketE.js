const fs = require('fs');
const data = JSON.parse(fs.readFileSync('.tmp-legacy-final.json','utf8'));
const overrides = {
  '/home': { target: '/', decision: 'REDIRECT' },
  '/cpl-full-form': { target: '/full-form-of-cpl-commercial-pilot-license', decision: 'REDIRECT' },
  '/master-the-dgca-cpl-exam-complete-guide-to-syllabus-subjects-and-success-tips': { target: '/dgca-pariksha', decision: 'REDIRECT' },
  '/master-the-dgca-cpl-exam-complete-guide-to-syllabus-subjects-and-succe': { target: '/dgca-pariksha', decision: 'REDIRECT' },
  '/pilot-kaise-bane': { target: '/how-to-become-a-pilot-after-12th', decision: 'REDIRECT' },
  '/pil': { target: '', decision: 'NO GOOD MATCH — 404' },
  '/)': { target: '', decision: 'NO GOOD MATCH — 404' },
};
const table = data.E.map(item => {
  const path = item.path;
  const score = item.score;
  const override = overrides[path];
  let target = item.bestRoute;
  let decision = score >= 0.4 ? 'REDIRECT' : 'NO GOOD MATCH — 404';
  if (override) {
    target = override.target;
    decision = override.decision;
  }
  if (path === '/home' || path === '/home/') {
    target = '/'; decision = 'REDIRECT';
  }
  if (path === '/pilot-kaise-bane') {
    target = '/how-to-become-a-pilot-after-12th'; decision = 'REDIRECT';
  }
  if (path.startsWith('/master-the-dgca-cpl-exam')) {
    target = '/dgca-pariksha'; decision = 'REDIRECT';
  }
  if (path === '/cpl-full-form') {
    target = '/full-form-of-cpl-commercial-pilot-license'; decision = 'REDIRECT';
  }
  if (path === '/pil' || path === '/)') {
    target = ''; decision = 'NO GOOD MATCH — 404';
  }
  return {
    url: item.url,
    legacyPath: path,
    proposedTarget: target,
    score,
    decision,
  };
});
const lines = ['| Legacy URL | Proposed Target | Confidence | Decision |','|---|---|---|---|'];
let redirects = [];
for (const row of table) {
  const confidence = row.score.toFixed(4);
  lines.push(`| ${row.url} | ${row.proposedTarget || ''} | ${confidence} | ${row.decision} |`);
  if (row.decision === 'REDIRECT') {
    redirects.push({ source: row.legacyPath, destination: row.proposedTarget });
  }
}
fs.writeFileSync('.tmp-bucketE-table.md', lines.join('\n'), 'utf8');
fs.writeFileSync('.tmp-bucketE-redirects.json', JSON.stringify(redirects, null, 2), 'utf8');
console.log('rows', table.length, 'redirects', redirects.length);
