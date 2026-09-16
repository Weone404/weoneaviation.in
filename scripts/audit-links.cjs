#!/usr/bin/env node
/*
 * scripts/audit-links.cjs — internal link and orphan audit. Added 2026-09-16.
 *
 * WHY IT EXISTS. Two audits in this project returned a false all-clear because
 * the grep behind them was narrower than the codebase. The duplicate-FAQPage
 * check looked only for generateFAQSchema and missed twelve pages that build the
 * node by hand. The first run of this audit looked only for JSX `href=` and
 * reported 39 orphans, most of which were linked through data arrays.
 *
 * So the lesson is baked in here: this repo expresses internal links in at least
 * four shapes — `href="/x"`, `href: '/x'`, `link: '/x'` and `slug: 'x'` on blog
 * cards. The regex below covers all four. If you add a fifth, widen it, and
 * treat any sudden jump in the orphan count as a sign the regex is wrong rather
 * than the site.
 *
 * WHAT IT REPORTS
 *   1. Broken internal links — an href pointing at no page, no redirect source
 *      and no dynamic route. These become real 404s for crawlers.
 *   2. Orphans — real routes with zero inbound internal links. /404,
 *      /robots.txt, /sitemap.xml and any 301 source are expected here.
 *   3. Pages with exactly one inbound link. Not a fault, but worth looking at:
 *      this is how it was found that the site's second highest-traffic page was
 *      linked only from the HTML sitemap.
 *
 * Run: node scripts/audit-links.cjs
 */
const fs=require('fs'),path=require('path');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(['node_modules','.next','.git'].includes(e.name)?[]:walk(path.join(d,e.name))):[path.join(d,e.name)]);

// 1. build the set of real routes from pages/
const pageFiles=walk('pages').filter(f=>/\.(jsx|js)$/.test(f)&&!/\/(api|admin)\//.test(f)&&!/^pages\/_/.test(f));
const routes=new Set();
for(const f of pageFiles){
  let r='/'+f.replace(/^pages\//,'').replace(/\.(jsx|js)$/,'');
  r=r.replace(/\/index$/,'')||'/';
  if(r==='/index')r='/';
  routes.add(r);
}
// 2. redirect sources + dynamic routes
const cfg=require(path.resolve('next.config.js'));
cfg.redirects().then(reds=>{
  const redSrc=new Set(reds.map(r=>r.source));
  const dynamic=[...routes].filter(r=>r.includes('['));
  const isDynamic=u=>dynamic.some(d=>{
    const re=new RegExp('^'+d.replace(/\[\.\.\.[^\]]+\]/g,'.+').replace(/\[[^\]]+\]/g,'[^/]+')+'$');
    return re.test(u);
  });
  // 3. collect internal hrefs
  const linkRe=/(?:(?:href|link|to)\s*[=:]\s*["'`{]+\s*|slug:\s*['"])(\/?[a-zA-Z0-9\-_/\[\].]*)/g;
  const hrefs=new Map();
  for(const f of pageFiles.concat(walk('components').filter(x=>/\.jsx$/.test(x)))){
    const t=fs.readFileSync(f,'utf8');let m;
    while((m=linkRe.exec(t))){
      let u=m[1].split('#')[0];if(u&&!u.startsWith('/'))u='/blogs/'+u;u=u.replace(/\/$/,'')||'/';
      if(!hrefs.has(u))hrefs.set(u,new Set());
      hrefs.get(u).add(f);
    }
  }
  const broken=[];
  const inbound=new Map();
  for(const [u,files] of hrefs){
    if(routes.has(u)||redSrc.has(u)||isDynamic(u)||u.startsWith('/blog/')||/\.(xml|txt|webp|png|jpg|pdf)$/.test(u)){
      if(routes.has(u)) inbound.set(u,(inbound.get(u)||0)+files.size);
    } else broken.push([u,[...files].slice(0,2)]);
  }
  console.log('=== BROKEN INTERNAL LINKS ('+broken.length+') ===');
  broken.sort().forEach(([u,f])=>console.log('  '+u+'   <- '+f.join(', ')));
  // 4. orphans: real routes with 0 inbound links
  const sitemap=fs.readFileSync('.generated-sitemap.xml','utf8');
  const orphans=[...routes].filter(r=>!r.includes('[')&&r!=='/'&&!(inbound.get(r)>0));
  console.log('\n=== ORPHANS: no inbound internal link ('+orphans.length+') ===');
  orphans.sort().forEach(r=>console.log('  '+r+(sitemap.includes(r+'<')?'':'   [ALSO NOT IN SITEMAP]')));
  // 5. thin inbound (1 link only)
  const thin=[...routes].filter(r=>inbound.get(r)===1);
  console.log('\n=== ONLY ONE INBOUND LINK ('+thin.length+') ===');
  thin.sort().forEach(r=>console.log('  '+r));
});
