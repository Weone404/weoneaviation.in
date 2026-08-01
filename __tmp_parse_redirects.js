const fs = require('fs');
const text = fs.readFileSync('next.config.js', 'utf8');
const lines = text.split(/\r?\n/);
let bucket = 'Unclassified';
const buckets = { A: [], D: [], E: [], U: [] };
let inRedirectBlock = false;
let current = null;
for (const raw of lines) {
  const line = raw.trim();
  if (line.startsWith('// Bucket A')) bucket = 'A';
  else if (line.startsWith('// Bucket D')) bucket = 'D';
  else if (line.startsWith('// Bucket E')) bucket = 'E';
  if (line === 'return [' || line === 'return[') {
    inRedirectBlock = true;
    continue;
  }
  if (!inRedirectBlock) continue;
  if (line === '];') break;
  if (line === '{') {
    current = { bucket, source: null, destination: null };
    continue;
  }
  if (!current) continue;
  const s = line.match(/source\s*:\s*'([^']+)'/);
  if (s) current.source = s[1];
  const d = line.match(/destination\s*:\s*'([^']+)'/);
  if (d) current.destination = d[1];
  if (line === '},' || line === '}') {
    const key = buckets[current.bucket] ? current.bucket : 'U';
    if (current.source && current.destination) buckets[key].push(current);
    current = null;
  }
}
const all = [...buckets.A, ...buckets.D, ...buckets.E, ...buckets.U];
const unique = new Map();
for (const entry of all) {
  unique.set(entry.source, entry.destination);
}
console.log(JSON.stringify({ total: all.length, uniqueCount: unique.size, buckets, unmatched: buckets.U.length }, null, 2));
for (const b of ['A', 'D', 'E']) {
  console.log(`\nBUCKET ${b} (${buckets[b].length})`);
  buckets[b].forEach((e, i) => console.log(`${i+1}. ${e.source} -> ${e.destination}`));
}
console.log('\nHOST REDIRECT', buckets.U.map(e => `${e.source} -> ${e.destination}`).join('\n'));
