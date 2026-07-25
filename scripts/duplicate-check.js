const fs = require('fs');
const path = require('path');

const files = [
  'pages/pilot-training-in-mumbai.jsx',
  'pages/pilot-training-in-chennai.jsx',
  'pages/pilot-training-in-bangalore.jsx',
  'pages/pilot-training-in-coimbatore.jsx',
  'pages/pilot-training-in-chhattisgarh.jsx',
  'pages/pilot-training-in-gujarat.jsx',
  'pages/pilot-training-in-tamil-nadu.jsx',
  'pages/pilot-training-in-andhra-pradesh.jsx',
  'pages/pilot-training-in-assam.jsx',
];

function stripHtml(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, ' and ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function getTextOverlap(a, b) {
  const sentencesA = splitSentences(a);
  const sentencesB = splitSentences(b);
  if (!sentencesA.length || !sentencesB.length) return 0;

  const setA = new Set(sentencesA.map((s) => s.toLowerCase()));
  const setB = new Set(sentencesB.map((s) => s.toLowerCase()));
  const shared = [...setA].filter((s) => setB.has(s)).length;
  const union = new Set([...setA, ...setB]).size;
  return union ? Number((shared / union) * 100).toFixed(1) : 0;
}

const bodies = files.map((file) => {
  const input = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const match = input.match(/intro=\{?`?([\s\S]*?)`?\s*\}/);
  const body = match ? match[1] : input;
  return stripHtml(body);
});

console.log('Similarity matrix (%)');
console.log('Files:');
files.forEach((file) => console.log(`- ${file}`));
console.log('');

for (let i = 0; i < files.length; i += 1) {
  const row = [];
  for (let j = 0; j < files.length; j += 1) {
    row.push(getTextOverlap(bodies[i], bodies[j]).toString().padStart(6));
  }
  console.log(`${files[i].replace('pages/', '')}`.padEnd(30) + row.join(' '));
}
