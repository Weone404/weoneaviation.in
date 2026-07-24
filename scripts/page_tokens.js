const fs = require('fs');
const paths = [
  'pages/ppl-full-form.jsx',
  'pages/best-flight-schools-in-usa.jsx',
  'pages/technical-general.jsx',
  'pages/advanced-atpl-pilot-training.jsx',
  'pages/dgca-full-form.jsx',
  'pages/rtr-a.jsx',
  'pages/rtr-full-form-meaning-importance-and-complete-guide.jsx',
];
const stop = new Set(['the','and','to','of','in','a','is','for','with','our','we','students','student','training','pilot','pilots','dgca','classes','cpl','ppl','course','courses','can','about','as','that','this','are','be','on','by','from','have','it','how','more','their','than','per','hours','india']);
function words(text){
  return text.toLowerCase().replace(/http[^\s"']+/g,'').replace(/[{}<>:\/\\=\[\]();,\"']/g,' ').split(/\s+/).filter(Boolean);
}
function tokenize(path){
  const raw = fs.readFileSync(path,'utf8');
  const cleaned = raw.split('\n').filter(l=>!l.trim().startsWith('import') && !l.trim().startsWith('export') && !l.includes('CityPageTemplate')).join(' ');
  const ws = words(cleaned).map(w=>w.replace(/[^a-z0-9\-]/g,''));
  const filtered = ws.filter(w=>w && !stop.has(w) && w.length>2);
  return new Set(filtered);
}
console.log('Files:', paths.join(', '));
for(const p of paths){
  try{
    const s = tokenize(p);
    console.log(`${p} tokens: ${s.size}`);
  }catch(e){
    console.error('ERROR reading',p,e.message);
  }
}
