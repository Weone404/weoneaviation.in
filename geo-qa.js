const fs=require('fs'),path=require('path');let FAIL=0;
const ok=m=>console.log('  ✓ '+m), bad=m=>{FAIL++;console.log('  ✗ '+m)}, head=m=>console.log('\n== '+m);
const routes=new Set(),dynamic=[];
(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory()){if(!/api|admin/.test(e.name))w(p)} else if(/\.(jsx?|tsx?)$/.test(e.name)){
 let r='/'+p.replace(/^pages\//,'').replace(/\.[jt]sx?$/,'');r=r.replace(/\/index$/,'')||'/';if(r==='/index')r='/';
 routes.add(r);if(r.includes('['))dynamic.push(r);}}})('pages');
const cfg=fs.readFileSync('next.config.js','utf8'),redir={};
for(const m of cfg.matchAll(/source:\s*'([^']+)'[\s\S]{0,160}?destination:\s*'([^']+)'/g))redir[m[1]]=m[2];
const live=h=>routes.has(h)||dynamic.some(d=>h.startsWith(d.split('[')[0])&&h.length>d.split('[')[0].length);

head('1. llms.txt URLs');
const urls=[...new Set([...fs.readFileSync('public/llms.txt','utf8').matchAll(/https:\/\/weoneaviation\.in(\/[^\s)\]]*)?/g)].map(m=>(m[1]||'/').replace(/\/$/,'')||'/'))];
const l404=urls.filter(u=>!live(u)),lred=urls.filter(u=>redir[u]);
console.log('  '+urls.length+' unique URLs');
l404.length?bad('404: '+l404.join(', ')):ok('0 404s');
lred.length?bad('redirects: '+lred.join(', ')):ok('0 redirected URLs');

head('2. Schema uniqueness per page');
const counts={},dupes=[];
for(const r of routes){const f=['pages'+(r==='/'?'/index':r)+'.jsx','pages'+(r==='/'?'/index':r)+'.js'].find(x=>fs.existsSync(x));if(!f)continue;
 const s=fs.readFileSync(f,'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\{\/\*[\s\S]*?\*\/\}/g,'');
 for(const t of ['Course','FAQPage','BreadcrumbList','BlogPosting','Article','HowTo','EducationalOrganization','WebSite']){
  let n=(s.match(new RegExp(`['"]@type['"]:\\s*['"]${t}['"]`,'g'))||[]).length;
  if(t==='Course')n+=(s.match(/generateCourseSchema\(/g)||[]).length;
  if(t==='FAQPage')n+=(s.match(/generateFAQSchema\(/g)||[]).length;
  if(t==='BreadcrumbList')n+=(s.match(/generateBreadcrumbSchema\(/g)||[]).length;
  if(t==='HowTo')n+=(s.match(/generateHowToSchema\(/g)||[]).length;
  if(n>0){counts[t]=(counts[t]||0)+1;if(n>1)dupes.push(`${r}: ${n}x ${t}`);}}}
dupes.length?dupes.forEach(bad):ok('no page emits a duplicate schema node');
console.log('  page-level: '+Object.entries(counts).map(([k,v])=>k+'='+v).join('  '));

head('3. existingFaqRoutes / routeContent hygiene');
const pf=fs.readFileSync('data/pageFaqs.js','utf8');
const setKeys=[...pf.slice(0,pf.indexOf('const routeContent')).matchAll(/'(\/[^']*)'/g)].map(m=>m[1]);
const rcKeys=[...pf.matchAll(/^\s*'(\/[^']*)':\s*\{/gm)].map(m=>m[1]);
const oS=setKeys.filter(k=>redir[k]),oR=rcKeys.filter(k=>redir[k]);
const shadow=rcKeys.filter(k=>setKeys.includes(k)),dup=rcKeys.filter((k,i)=>rcKeys.indexOf(k)!==i);
const dead=setKeys.concat(rcKeys).filter(k=>!live(k)&&!redir[k]&&k!=='/pilot-training-in/[city]'&&!k.includes('['));
oS.length?bad('Set members that 301: '+oS.join(', ')):ok('no 301d routes in existingFaqRoutes');
oR.length?bad('routeContent keys that 301: '+oR.join(', ')):ok('no 301d routes in routeContent');
shadow.length?bad('routeContent shadowed by Set: '+shadow.join(', ')):ok('no unreachable routeContent entries');
dup.length?bad('DUPLICATE routeContent keys: '+[...new Set(dup)].join(', ')):ok('no duplicate routeContent keys');
dead.length?bad('keys with no route and no redirect: '+dead.join(', ')):ok('every key maps to a real or redirected route');

head('4. Redirects');
const chains=Object.keys(redir).filter(a=>redir[redir[a]]),loops=[];
for(const a of Object.keys(redir)){let c=a,seen=[a];for(let i=0;i<8;i++){c=redir[c];if(!c)break;if(seen.includes(c)){loops.push(seen.concat(c));break}seen.push(c)}}
const deadD=[...new Set(Object.values(redir))].filter(d=>!live(d)&&!d.startsWith('http')&&!d.includes(':'));
console.log('  '+Object.keys(redir).length+' redirects');
loops.length?bad('LOOPS '+JSON.stringify(loops)):ok('no loops');
chains.length?bad('chains: '+chains.map(a=>a+' -> '+redir[a]+' -> '+redir[redir[a]]).join(', ')):ok('no multi-hop chains');
deadD.length?bad('destinations that 404: '+deadD.join(', ')):ok('every destination resolves');

head('5. Internal links');
const broken={};
(function sc(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory()){if(!/node_modules|\.git|\.next|_to_delete/.test(e.name))sc(p)}
 else if(/\.(jsx?|tsx?)$/.test(e.name)&&!/next\.config|geo-qa/.test(p)){const s=fs.readFileSync(p,'utf8');
 for(const m of s.matchAll(/href[=:]\s*[{"']*["'](\/[^"'#?]*)["']/g)){let h=m[1].replace(/\/$/,'')||'/';
 if(/^\/(api|_next|admin)/.test(h)||/\.\w+$/.test(h.split('/').pop()))continue;
 if(!live(h)&&!redir[h])(broken[h]||=new Set()).add(p);}}}})('.');
Object.keys(broken).length?Object.entries(broken).forEach(([h,s])=>bad(h+' <- '+[...s].join(', '))):ok('no broken internal links');

head('6. Relative imports resolve');
let bi=0;
(function im(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory()){if(!/node_modules|\.git|\.next|_to_delete/.test(e.name))im(p)}
 else if(/\.(jsx?|tsx?)$/.test(e.name)){const s=fs.readFileSync(p,'utf8');
 for(const m of s.matchAll(/from\s+['"](\.[^'"]+)['"]/g)){const b=path.resolve(path.dirname(p),m[1]);
 if(!['','.js','.jsx','.ts','.tsx','/index.js','/index.jsx'].some(x=>fs.existsSync(b+x))){bad(p+' -> '+m[1]);bi++}}}}})('.');
if(!bi)ok('every relative import resolves');

head('7. Facts consistency (lib/facts.js is the source of truth)');
{
  const facts = fs.readFileSync('lib/facts.js','utf8');
  const ages = {};
  for (const m of facts.matchAll(/code: '(\w+)',[^}]*?minAge: (\d+)/g)) ages[m[1]] = m[2];
  const papers = [...facts.matchAll(/^  '([A-Z][^']+)',$/gm)].map(m=>m[1]);
  // Contradictory paper counts. FIVE written papers + RTR(A) examined separately.
  const badCounts = [];
  const scan = (d) => { for (const e of fs.readdirSync(d,{withFileTypes:true})) { const p2=path.join(d,e.name);
    if (e.isDirectory()) { if(!/node_modules|\.git|\.next|_to_delete/.test(e.name)) scan(p2); }
    else if (/\.(jsx?|txt)$/.test(p2) && !/geo-qa|lib\/facts/.test(p2)) { const t=fs.readFileSync(p2,'utf8');
      for (const pat of [/\b9 DGCA subjects\b/, /\ball 9 CPL subjects\b/, /\bnine DGCA (papers|subjects)\b/, /\bsix DGCA papers\b/, /\b9 CPL subjects\b/])
        if (pat.test(t)) badCounts.push(`${p2}: ${t.match(pat)[0]}`);
      /*
       * Banned DGCA medical-class split. Two exclusions, both deliberate:
       *  - files whose route 301s (the retired /dgca-class-2-class-1-medical
       *    page is kept on disk but never served);
       *  - a FOREIGN regulator's own class designation. "CASA Class 1" and
       *    "SACAA Class 1" are those authorities' terms on the flying-school
       *    pages and are correctly sourced; only the DGCA split is unsourced.
       */
      const routeOfFile = '/' + p2.replace(/^pages\//,'').replace(/\.[jt]sx?$/,'').replace(/\/index$/,'');
      if (!redir[routeOfFile]) {
        const deDGCA = t.replace(/\b(SACAA|CASA|FAA|EASA|TCCA)\s+Class\s*[12I]+[^,.<)]*/gi, '');
        if (/Class [12] Medical Certificate|Class 1 and Class 2 medical|Class I Medical Exam|DGCA Class [12]/i.test(deDGCA)) badCounts.push(`${p2}: medical class split`);
      }
    } } };
  scan('pages'); scan('components'); scan('data'); scan('public');
  const expectAges = { SPL:'16', PPL:'17', CPL:'18', ATPL:'21' };
  const ageOk = Object.entries(expectAges).every(([k,v]) => ages[k] === v);
  ageOk ? ok(`licence ages match Schedule II (${Object.entries(ages).map(([k,v])=>k+' '+v).join(', ')})`)
        : bad('licence ages in lib/facts.js do not match Schedule II: ' + JSON.stringify(ages));
  papers.length === 5 ? ok('DGCA_PAPERS holds exactly 5 written papers')
                      : bad(`DGCA_PAPERS holds ${papers.length}, expected 5`);
  badCounts.length ? badCounts.forEach(bad) : ok('no contradictory paper counts or medical-class claims in page sources');
}

console.log('\n'+(FAIL?FAIL+' CHECK(S) FAILED':'ALL CHECKS PASSED'));
