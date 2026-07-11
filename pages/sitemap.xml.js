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
    { loc: 'https://weoneaviation.in/courses/cpl-flight-training', priority: '0.9', changefreq: 'monthly' },
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
    { loc: 'https://weoneaviation.in/blogs/cpl-full-form', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/dgca-exam-guide', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/pilot-training-delhi', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/blogs/ppl-course-fees', priority: '0.7', changefreq: 'monthly' },
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
    { loc: 'https://weoneaviation.in/cbse-full-form', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://weoneaviation.in/icse-full-form', priority: '0.7', changefreq: 'monthly' },
];

export default function SitemapXML() {
    return null;
}

export async function getServerSideProps({ res }) {
    const lastmod = '2026-04-25';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
            .map(
                ({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(xml);
    res.end();

    return { props: {} };
}