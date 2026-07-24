const fs = require('fs');
const paths = [
  'pages/pilot-training-in-chhattisgarh.jsx',
  'pages/pilot-training-in-gujarat.jsx',
  'pages/pilot-training-in-tamil-nadu.jsx',
  'pages/pilot-training-in-mumbai.jsx',
  'pages/pilot-training-in-coimbatore.jsx',
  'pages/pilot-training-in-chennai.jsx',
  'pages/pilot-training-in-andhra-pradesh.jsx',
  'pages/pilot-training-in-assam.jsx',
  'pages/pilot-training-in-bangalore.jsx',
];
const cityNames = ['chhattisgarh','gujarat','tamil','nadu','mumbai','coimbatore','chennai','andhra','pradesh','assam','bangalore'];
const stop = new Set(['the','and','to','of','in','a','is','for','with','our','we','students','student','training','pilot','pilots','dgca','classes','cpl','ppl','course','courses','can','about','as','that','this','are','be','on','by','from','have','it','how','more','their','than','per','hours','india']);
function words(text){
  return text.toLowerCase().replace(/http[^\s"']+/g,'').replace(/[{}<>:\/\\=\[\]();,\"']/g,' ').split(/\s+/).filter(Boolean);
}
function tokenize(path){
  const raw = fs.readFileSync(path,'utf8');
  // remove import/exports lines and JSX braces for cleaner text
  const cleaned = raw.split('\n').filter(l=>!l.trim().startsWith('import') && !l.trim().startsWith('export') && !l.includes('CityPageTemplate')).join(' ');
  const ws = words(cleaned).map(w=>w.replace(/[^a-z0-9\-]/g,''));
  const filtered = ws.filter(w=>w && !stop.has(w) && !cityNames.includes(w) && w.length>2);
  return new Set(filtered);
}
const sets = paths.map(p=>tokenize(p));
function jacc(a,b){
  const A = Array.from(a), B = Array.from(b);
  const inter = A.filter(x=>b.has(x)).length;
  const uni = new Set([...A,...B]).size;
  return inter/uni;
}
console.log('Files:', paths.join(', '));
for(let i=0;i<sets.length;i++){
  for(let j=i+1;j<sets.length;j++){
    const sim = jacc(sets[i], sets[j]);
    console.log(`${paths[i]} <-> ${paths[j]} = ${(sim*100).toFixed(1)}%`);
  }
}

// also output size of each set
for(let i=0;i<sets.length;i++){
  console.log(`${paths[i]} tokens: ${sets[i].size}`);
}
