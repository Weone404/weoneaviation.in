const fs = require('fs');
const path = require('path');

/**
 * ⚠️ THE `pages` ARRAY BELOW IS DEAD CODE. EDITING IT CHANGES NOTHING.
 *
 * getSitemapXml() at the bottom of this file returns the contents of
 * .generated-sitemap.xml (written by scripts/generate-sitemap.js during
 * `npm run build`) and falls back to the root sitemap.xml. Neither path ever
 * reads this array — it is a leftover from when this route generated the XML
 * itself, and it has since drifted out of sync with what is actually served.
 *
 * To change the sitemap, edit scripts/generate-sitemap.js. That script walks
 * pages/ and derives URLs from the filesystem, so adding or deleting a page
 * updates the sitemap automatically; the host comes from the `host` constant
 * at the top of it.
 *
 * Left in place rather than deleted so the history of what used to be listed
 * stays available, but do not trust it as a record of the live sitemap.
 */
const pages = [
    { loc: 'https://weoneaviation.in/', priority: '1.0', changefreq: 'weekly' },
    { loc: 'https://weoneaviation.in/about-us', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/contact', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/sitemap', priority: '0.5', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/courses', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/credentials', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/privacy-policy', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/terms', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/courses/cpl', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/courses/ppl', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/courses/atpl', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/courses/dgca-ground-classes', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/commercial-pilot-license', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/commercial-pilot-license-eligibility', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/commercial-pilot-license-admission-process', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/commercial-pilot-license-salary', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/commercial-pilot-license-syllabus', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/full-form-of-cpl-commercial-pilot-license', priority: '0.75', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-ground-classes', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-ground-classes-in-india', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-pariksha', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-full-form', priority: '0.75', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-computer-number', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/dgca-class-2-class-1-medical', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/how-to-become-a-pilot-after-12th', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/how-to-become-a-pilot/after-12th', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/how-to-become-a-pilot/in-india', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/your-guide-on-how-to-become-a-pilot-in-india', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/air-navigation', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/air-regulations', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/aviation-meteorology', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/technical-general', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/rtr-a', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/rtr-full-form-meaning-importance-and-complete-guide', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/ppl-full-form', priority: '0.75', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/flying-school/india', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/flying-school/usa', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/flying-school/canada', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/flying-school/australia', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/flying-school/south-africa', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/best-flight-schools-in-usa', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-course-training-in-india', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-sri-lanka', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/airline-preparation-course', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/airline-preparatory-classes/cass-compass', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/airline-preparatory-classes/interview-preparation', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/airline-preparatory-classes/psychometry', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/Airindia-pilot-preparation', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/Indigo-pilot-preparation', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/spice-jet', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/air-arabia', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/emirates-cadet-pilot-program', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/qatar-airways-cadet-pilot-program', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/ecga-login-your-complete-guide', priority: '0.75', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/faqs', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/doubt', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/aviation-course-after-12th', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/dgca-exam-guide', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/pilot-training-delhi', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-delhi', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-noida', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-ghaziabad', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-gurugram', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-haryana', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-punjab', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-jaipur', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-rajasthan', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-mumbai', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-maharashtra', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-pune', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-goa', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-gujarat', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-bangalore', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-hyderabad', priority: '0.9', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-andhra-pradesh', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-tamil-nadu', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-chennai', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-coimbatore', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-kerala', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-kolkata', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-assam', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-arunachal-pradesh', priority: '0.75', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-nagpur', priority: '0.85', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-chhattisgarh', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-bihar', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/pilot-training-in-india', priority: '0.95', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/private-pilot-license-ppl-course-details', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/student-pilot-license-spl', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/advanced-atpl-pilot-training', priority: '0.8', changefreq: 'monthly' },
];

function getSitemapXml() {
    const sitemapPath = path.join(process.cwd(), 'sitemap.xml');

    const generatedPath = path.join(process.cwd(), '.generated-sitemap.xml');
    if (fs.existsSync(generatedPath)) {
        return fs.readFileSync(generatedPath, 'utf8');
    }

    if (fs.existsSync(sitemapPath)) {
        return fs.readFileSync(sitemapPath, 'utf8');
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
}

export default function SitemapXML() {
    return null;
}

export async function getServerSideProps({ res }) {
    const xml = getSitemapXml();

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(xml);
    res.end();

    return { props: {} };
}