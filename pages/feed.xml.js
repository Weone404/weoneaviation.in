import { MongoClient } from 'mongodb';

// RSS 2.0 feed for the aviation blog. Helps AI systems (and readers) discover
// and track new content — one of the AEO signals flagged in the audit.
// Mirrors the data logic in pages/blogs/index.jsx: MongoDB first, then a
// hardcoded fallback so the feed always renders even without a DB connection.
const hardcodedBlogs = [
    { id: 1, title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.', date: 'Dec 15, 2026' },
    { id: 2, title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.', date: 'Dec 10, 2026' },
    { id: 3, title: 'CPL Training in India vs Abroad – Which is Better?', excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.', date: 'Dec 5, 2026' },
    { id: 4, title: 'Pilot Salary in India 2026 – Complete Breakdown by Airline', excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.', date: 'Nov 28, 2026' },
    { id: 5, title: 'Medical Requirements to Become a Pilot in India – DGCA Class 1', excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.', date: 'Nov 20, 2026' },
];

const SITE = 'https://weoneaviation.in';

const esc = (s = '') =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

const toRfc822 = (d) => {
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
};

export default function Feed() {
    return null;
}

export async function getServerSideProps({ res }) {
    let mongoBlogs = [];
    try {
        if (process.env.MONGODB_URI) {
            const client = new MongoClient(process.env.MONGODB_URI);
            await client.connect();
            const db = client.db();
            const raw = await db.collection('blogs').find({}).sort({ createdAt: -1 }).limit(50).toArray();
            mongoBlogs = raw.map((b) => ({
                id: b._id.toString(),
                title: b.title,
                excerpt: b.excerpt || '',
                date: b.createdAt ? new Date(b.createdAt).toUTCString() : new Date().toUTCString(),
            }));
            await client.close();
        }
    } catch (err) {
        mongoBlogs = [];
    }

    const posts = [...mongoBlogs, ...hardcodedBlogs];

    const items = posts
        .map(
            (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blogs/${esc(p.id)}</link>
      <guid isPermaLink="true">${SITE}/blogs/${esc(p.id)}</guid>
      <description>${esc(p.excerpt)}</description>
      <pubDate>${toRfc822(p.date)}</pubDate>
    </item>`
        )
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>We One Aviation Academy — Blog</title>
    <link>${SITE}/blogs</link>
    <description>Expert guides on pilot training, DGCA exams, and aviation careers in India.</description>
    <language>en-IN</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    res.write(xml);
    res.end();

    return { props: {} };
}
