const fs = require('fs');
const redirects = JSON.parse(fs.readFileSync('.tmp-bucketE-redirects.json','utf8'));
console.log('array length', redirects.length);
const groups = new Map();
redirects.forEach(r => {
  if (!groups.has(r.source)) groups.set(r.source, new Set());
  groups.get(r.source).add(r.destination);
});
const unique = groups.size;
const duplicates = [...groups.entries()].filter(([source, dests]) => redirects.filter(r => r.source === source).length > 1);
console.log('unique sources', unique);
console.log('duplicate source keys count', duplicates.length);
duplicates.forEach(([source, dests]) => {
  const count = redirects.filter(r => r.source === source).length;
  console.log('SOURCE', source, 'count', count, 'dests', [...dests].join('|'));
});
const cfg = fs.readFileSync('next.config.js','utf8');
const lines = cfg.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('has:') || lines[i].includes('host')) {
    console.log('LINE', i+1, lines[i]);
  }
}
console.log('--- host rule section ---');
const idx = cfg.indexOf('has: [{ type: \'host\'');
if (idx !== -1) console.log(cfg.slice(idx, idx + 200));
