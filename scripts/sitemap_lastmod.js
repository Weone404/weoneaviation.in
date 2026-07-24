const fs = require('fs');
const xml = fs.readFileSync('.generated-sitemap.xml','utf8');
const urlsToCheck = [
  'dgca-full-form', 'technical-general', 'rtr-a', 'rtr-full-form-meaning-importance-and-complete-guide', 'ppl-full-form', 'best-flight-schools-in-usa',
  'pilot-training-in-chhattisgarh','pilot-training-in-gujarat','pilot-training-in-tamil-nadu','pilot-training-in-mumbai','pilot-training-in-coimbatore','pilot-training-in-chennai','pilot-training-in-andhra-pradesh','pilot-training-in-assam','pilot-training-in-bangalore'
];

const chunks = xml.split('<url>').slice(1);
const map = {};
for(const c of chunks){
  const locMatch = c.match(/<loc>\s*([^<]+)\s*<\/loc>/i);
  const lastmodMatch = c.match(/<lastmod>\s*(\d{4}-\d{2}-\d{2})\s*<\/lastmod>/i);
  if(locMatch){
    map[locMatch[1].trim()] = lastmodMatch ? lastmodMatch[1] : null;
  }
}

for(const slug of urlsToCheck){
  const loc = `https://www.weoneaviation.in/${slug}`;
  console.log(`${loc} => ${map[loc] || 'NOT FOUND'}`);
}
