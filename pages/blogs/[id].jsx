import Layout from '../../components/Layout';
import StructuredData from '../../components/StructuredData';
import FAQSection from '../../components/FAQSection';
import Link from 'next/link';
import NextImage from 'next/image';
import { MongoClient, ObjectId } from 'mongodb';

/*
 * ── Static blog data ──────────────────────────────────────────────────────
 *
 * These six posts predate every sourcing rule on this site. They are reachable
 * at /blogs/1 to /blogs/6, they carry 2024 dates, and five of the six restate
 * a page that is now deeper and fully sourced. /blogs/6 is not even linked
 * from the blog index — its card is commented out there — so it has sat as an
 * orphan.
 *
 * WHAT CHANGED 2026-09-15, and what deliberately did not.
 *
 * Did not: none of these URLs was deleted or redirected. Removing a live URL
 * is the owner's call, and it is recorded as an open question in
 * SEO-BACKLOG.md with the inventory in data/legacy-blog-inventory.md.
 *
 * Did: two things that do not need that call.
 *   1. `canonicalTo` points a post at the page that supersedes it, so the
 *      duplicate stops competing with the real page for the same query. Layout
 *      applies it.
 *
 *      CORRECTED 2026-09-16: this originally set `noindex` alongside the
 *      canonical. That is a conflicting pair of signals — a noindexed page is
 *      dropped rather than read, so the canonical it carries may never be
 *      honoured and the consolidation silently fails. The canonical now stands
 *      alone, which is what actually transfers the signal to the superseding
 *      page.
 *   2. Unsourced figures were removed. /blogs/3 printed a "₹40–80 lakhs"
 *      training cost with no source — the same figure removed from
 *      /cost-transparency in this branch. /blogs/4 printed per-airline pilot
 *      salaries down to the lakh, which no airline publishes and which
 *      nothing supports. /blogs/5 printed a 6/6 vision standard and a 140/90
 *      blood-pressure limit as DGCA requirements — the same unsourced
 *      standard removed from /commercial-pilot-license-eligibility. All three
 *      are gone. What replaces them is what can be shown.
 */
const hardcodedBlogs = [
    {
        id: 1,
        title: 'How to Become a Commercial Pilot in India',
        excerpt:
            'The licence route in outline — the education gate, the medical, the computer number, the written papers and the flying hours. The fully sourced version, with the rule behind each stage, is the route guide.',
        category: 'CPL Guide',
        readTime: '4 min',
        date: 'Dec 15, 2024',
        canonicalTo: '/your-guide-on-how-to-become-a-pilot-in-india',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
        content: `
      <p><strong>This is a short, older summary.</strong> The current and fully sourced version of this route, with the rule or regulation behind every stage, is at <a href="/your-guide-on-how-to-become-a-pilot-in-india">your guide on how to become a pilot in India</a>.</p>

      <h2>What a Commercial Pilot Licence is</h2>
      <p>A Commercial Pilot Licence (CPL) permits you to fly an aeroplane for hire or reward. In India it is issued by the Directorate General of Civil Aviation.</p>

      <h2>The gates, in order</h2>
      <ul>
        <li>Class 12 with Physics and Mathematics. If you did not take both, the National Institute of Open Schooling route is the bridge.</li>
        <li>Minimum age 18 for a CPL. See <a href="/commercial-pilot-license-eligibility">CPL eligibility</a> for each licence and its rule.</li>
        <li>A DGCA medical at an approved centre — Class 2 to begin, Class 1 for the CPL. The approved centres are listed on <a href="/dgca-class-2-class-1-medical">the medical page</a>.</li>
        <li>A computer number, then the DGCA written papers. See <a href="/dgca-computer-number">the computer number guide</a>.</li>
        <li>200 hours as pilot of an aeroplane, flown at a flying training organisation.</li>
        <li>RTR (A), examined separately under its own rules.</li>
      </ul>

      <h2>What this page does not tell you</h2>
      <p>A total cost, or a duration. Both vary by school and by how quickly aircraft are available, and any single figure quoted here would be unverifiable. <a href="/cost-transparency">The cost page</a> sets out what is known and what is not.</p>
    `,
        faqs: [],
    },
    {
        id: 2,
        title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips',
        excerpt:
            'Five DGCA written papers, with RTR (A) examined separately. The subjects, the 70% threshold per paper, and the fees DGCA charges.',
        category: 'DGCA',
        readTime: '5 min',
        date: 'Dec 10, 2024',
        canonicalTo: '/blogs/dgca-ground-school-guide',
        img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=80',
        content: `
      <p><strong>This is a short, older summary.</strong> The current treatment, with every figure cited to its DGCA document, is at <a href="/blogs/dgca-ground-school-guide">the DGCA ground school guide</a>.</p>

      <h2>The five DGCA written papers</h2>
      <ul>
        <li>Air Navigation</li>
        <li>Aviation Meteorology</li>
        <li>Air Regulations</li>
        <li>Technical General (Airframes &amp; Engines)</li>
        <li>Technical Specific (Aircraft Type)</li>
      </ul>
      <p>Aviation Medicine, Human Performance, Instruments and Principles of Flight are taught within the syllabus above; they are not separate DGCA papers. Lists of "9 DGCA subjects" count these, and RTR (A), as papers of their own. RTR (A) is required, but it is examined separately under its own rules rather than as a sixth DGCA paper.</p>

      <h2>Pattern and pass mark</h2>
      <p>Each paper is multiple choice and is cleared on its own rather than in one sitting. The pass mark is <strong>70% per paper</strong>, set by the Civil Aviation Requirement that governs the examinations — an aggregate does not exist, so a strong paper cannot carry a weak one.</p>

      <h2>Examination fees</h2>
      <p>DGCA charges <strong>&#8377;2,500</strong> per paper in a regular session and <strong>&#8377;5,000</strong> per paper in an Online On-Demand Examination. Payment is through Bharatkosh, and the fee is not refunded or carried to a later session. The sourced fee and session detail is in the <a href="/dgca-computer-number">DGCA computer number guide</a>.</p>

      <h2>Preparing</h2>
      <p>Because papers are cleared individually, the sensible order is to clear what you are ready for rather than waiting to be ready for everything. Subject pages: <a href="/air-navigation">Air Navigation</a>, <a href="/aviation-meteorology">Aviation Meteorology</a>, <a href="/air-regulations">Air Regulations</a>, <a href="/technical-general">Technical General</a>, and <a href="/rtr-a">RTR (A)</a>.</p>
    `,
        faqs: [],
    },
    {
        id: 3,
        title: 'CPL Training in India vs Abroad',
        excerpt:
            'What actually differs between training in India and training overseas — and why the cost comparison you have read is probably unsourced.',
        category: 'Training',
        readTime: '5 min',
        date: 'Dec 5, 2024',
        img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80',
        content: `
      <h2>What genuinely differs</h2>
      <p><strong>Training in India.</strong> No visa. The licence issued is a DGCA licence, so there is no conversion step at the end. Flying is interrupted by the monsoon in much of the country, and how fast you finish depends heavily on how many aircraft your school has and how many students share them.</p>
      <p><strong>Training abroad.</strong> Often better year-round flying weather and a larger fleet, which is the real driver of how quickly hours accumulate. Against that, the licence is issued by that country's regulator and has to be converted to a DGCA licence afterwards, which adds time and cost that a headline fee will not show.</p>

      <h2>On cost, and why no range is printed here</h2>
      <p>This page used to quote a total for training in India. It was removed on 15 September 2026 because nothing supported it. Private flying schools publish very little, the figures circulating online are largely unsourced, and a number stated confidently here would be a number a reader could not check.</p>
      <p>The one publicly comparable figure is Indira Gandhi Rashtriya Uran Akademi's published course fee, and <a href="/cost-transparency">the cost page</a> sets it out alongside what it does and does not include. Compare any quote line by line, and keep DGCA's own charges — &#8377;2,500 per examination paper, plus the medical — separate from what a school charges.</p>

      <h2>The question worth asking either way</h2>
      <p>Not "which is cheaper" but "how many aircraft are flying, and how many students are waiting for them". DGCA weights aircraft utilisation and student-to-aircraft ratio at 40% of its own ranking of Indian flying schools, because that is what decides whether 200 hours take eighteen months or four years. <a href="/how-to-choose-an-aviation-academy">How to check an aviation academy</a> explains how to look it up.</p>
    `,
        faqs: [],
    },
    {
        id: 4,
        title: 'Pilot Pay in India: What Can and Cannot Be Verified',
        excerpt:
            'Airline pilot pay scales in India are not published by the airlines. What that means for every salary figure you have read, including the ones that used to be on this page.',
        category: 'Career',
        readTime: '4 min',
        date: 'Nov 28, 2024',
        /*
         * canonicalTo added 2026-09-16. The Semrush positions export of
         * 2026-09-15 showed the salary cluster stranded on this legacy
         * numeric-id post: /blogs/4 held 41 keywords and 42,030 of search
         * volume — "pilot salary" alone is 27,100, at position 66 — while
         * /commercial-pilot-license-salary held 2 keywords and 4,540 at
         * position 40. The wrong page was carrying the topic, and neither was
         * earning anything. The rebuilt salary page is now the target, so the
         * signal consolidates onto the page that can actually answer the query.
         */
        canonicalTo: '/commercial-pilot-license-salary',
        img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
        content: `
      <h2>What this page used to say</h2>
      <p>Until 15 September 2026 this page carried per-airline salary bands for first officers and captains, quoted to the lakh. They were removed because nothing supported them. Indian airlines do not publish pilot pay scales, the figures are negotiated and vary by fleet, seniority, contract type and roster, and no public document exists that a reader could check them against.</p>

      <h2>What is actually knowable</h2>
      <ul>
        <li>Pay rises with command. A captain is paid materially more than a first officer at the same airline, because the responsibility and the qualification differ.</li>
        <li>A large part of pilot pay is flying-hour linked rather than fixed, so it moves with the roster and with how much the airline is flying.</li>
        <li>Wide-body operations generally pay more than narrow-body at the same carrier.</li>
        <li>There is a gap between a fresh CPL holder and an employed first officer. The licence does not carry a job with it, and the wait varies with the hiring cycle.</li>
      </ul>

      <h2>Why we will not print a number</h2>
      <p>Because a prospective student cannot verify one, and a figure you cannot verify is worth less than an honest blank. If a page shows you an exact monthly salary for a named airline, ask where it came from. We One Aviation does not employ pilots and does not place students into airline jobs — hiring decisions rest with the operator — so any earnings figure from us would be a claim about somebody else's payroll.</p>

      <h2>What to do with this</h2>
      <p>The full treatment of this question — including the one thing about Indian pilot pay that <em>is</em> published, the regulatory ceiling of 1,000 flying hours a year that the hour-linked part of the pay sits under — is on our <a href="/commercial-pilot-license-salary">commercial pilot salary page</a>. Plan against the cost, which is knowable, rather than against the income, which is not. <a href="/cost-transparency">The cost page</a> sets out what can be shown. If you are weighing whether the career is worth the outlay, that is the honest arithmetic to do.</p>
    `,
        faqs: [],
    },
    {
        id: 5,
        title: 'Medical Requirements to Become a Pilot in India',
        excerpt:
            'Which DGCA medical class you need and when. The full sourced treatment, including the approved centres, is on the medical page.',
        category: 'Medical',
        readTime: '4 min',
        date: 'Nov 20, 2024',
        canonicalTo: '/dgca-class-2-class-1-medical',
        img: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1200&q=80',
        content: `
      <p><strong>This is a short, older summary.</strong> The current version — with the classes, their validity, and DGCA's own list of approved examination centres — is at <a href="/dgca-class-2-class-1-medical">DGCA Class 2 and Class 1 medical</a>.</p>

      <h2>Which class, and when</h2>
      <ul>
        <li><strong>Class 2</strong> is the one you start with. It is what a Student Pilot Licence requires, and it is the sensible first spend of the whole process — it is cheap relative to everything after it, and it tells you early whether the rest is worth beginning.</li>
        <li><strong>Class 1</strong> is required for a Commercial Pilot Licence and is the more demanding assessment.</li>
      </ul>

      <h2>What this page no longer says</h2>
      <p>It used to list specific standards — a vision figure and a blood-pressure limit — as DGCA requirements. They were removed on 15 September 2026 because they could not be traced to the Civil Aviation Requirement that actually governs flight-crew medical examinations, and a wrong medical standard is the kind of error that makes someone abandon the idea for no reason, or spend money they should not have.</p>
      <p>Assessment is made by a DGCA-approved examiner against that requirement, and a number of conditions that people assume are disqualifying are in fact assessed case by case. If you have a specific concern, the useful step is the Class 2 examination itself rather than a checklist online.</p>

      <h2>Where the examination happens</h2>
      <p>At a DGCA-approved centre. The current list, including which of them are in Delhi and the NCR, is on <a href="/dgca-class-2-class-1-medical">the medical page</a>.</p>
    `,
        faqs: [],
    },
    {
        id: 6,
        title: 'How to Become a Pilot After 12th Science',
        excerpt:
            'The route from Class 12 PCM to a Commercial Pilot Licence, in order. The fuller version is the after-12th page.',
        category: 'After 12th',
        readTime: '4 min',
        date: 'Nov 15, 2024',
        canonicalTo: '/how-to-become-a-pilot-after-12th',
        img: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1200&q=80',
        content: `
      <p><strong>This is a short, older summary.</strong> The fuller version is at <a href="/how-to-become-a-pilot-after-12th">how to become a pilot after 12th</a>.</p>

      <h2>Minimum eligibility</h2>
      <ul>
        <li>Class 12 with Physics and Mathematics. Without both subjects, the National Institute of Open Schooling route is the bridge, and it belongs at the front of your plan rather than the middle.</li>
        <li>Minimum age 16 for a Student Pilot Licence, 17 for a Private Pilot Licence, 18 for a Commercial Pilot Licence — Aircraft Rules, 1937, Schedule II, Sections B, E and J.</li>
      </ul>

      <h2>The order that saves money</h2>
      <ol>
        <li>Class 2 medical first. It is the cheapest gate and the one that can stop everything.</li>
        <li>Computer number, then start the written papers. Neither needs a flying school and neither needs a medical certificate.</li>
        <li>Choose a flying training organisation — check it against DGCA's published list and ranking before paying anything. See <a href="/how-to-choose-an-aviation-academy">how to check an aviation academy</a>.</li>
        <li>Fly the 200 hours a Commercial Pilot Licence requires.</li>
        <li>Class 1 medical, RTR (A), and the skill test.</li>
      </ol>

      <h2>On timelines</h2>
      <p>This page used to state a fixed two-to-three-year duration. It was removed on 15 September 2026: the regulations set minimums, not durations, and how long the flying actually takes depends on aircraft availability at your school and on weather. Ask a school how many aircraft it has and how many students share them — that answer predicts your timeline better than any figure on a website.</p>
    `,
        faqs: [],
    },
];

// ─────────────────────────────────────────────
// Inline styles for blog content
// ─────────────────────────────────────────────
const blogContentStyles = `
  .blog-content h2 {
    font-family: var(--font-montserrat, sans-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f2b5b;
    margin: 2rem 0 0.75rem;
  }
  .blog-content p {
    font-size: 0.9375rem;
    line-height: 1.8;
    color: #4b5563;
    margin: 0 0 1rem;
  }
  .blog-content ul {
    margin: 0 0 1.25rem;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .blog-content li {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: #4b5563;
  }
  .blog-content strong {
    color: #0f2b5b;
    font-weight: 600;
  }
  .blog-content a {
    color: #e8580a;
    text-decoration: underline;
  }
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 1.5rem;
  }
  .step-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 14px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
  }
  .step-number {
    min-width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff3ec;
    color: #e8580a;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .step-body { flex: 1; }
  .step-title {
    margin: 0 0 2px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #111827 !important;
    line-height: 1.4 !important;
  }
  .step-desc {
    margin: 0 !important;
    font-size: 13px !important;
    color: #6b7280 !important;
    line-height: 1.5 !important;
  }
`;

// ─────────────────────────────────────────────
// WhatsApp URL helper
// ─────────────────────────────────────────────
const WA_NUMBER = '919667370747';
const WA_MESSAGE = encodeURIComponent(
    'Hello We One Aviation! I read your blog and want to learn more about pilot training.'
);
const waLink = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Hero banner with overlay text */
function BlogHero({ blog }) {
    return (
        <div className="relative h-72 md:h-[420px] w-full overflow-hidden pt-16 bg-av-blue">
            <NextImage
                src={blog.img}
                alt={blog.title}
                width={1600}
                height={900}
                priority
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <section className="absolute bottom-0 left-0 right-0 px-6 py-8 md:px-12 md:py-10 max-w-5xl mx-auto">
                <span className="bg-av-orange text-white text-[11px] font-semibold px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-wider">
                    {blog.category}
                </span>
                <h1 className="font-montserrat text-2xl md:text-[2rem] font-black text-white leading-tight max-w-2xl">
                    {blog.title}
                </h1>
                <div className="flex items-center gap-2 text-white/60 text-sm mt-3">
                    <span>{blog.date}</span>
                    <span className="text-white/30">·</span>
                    <span>{blog.readTime} read</span>
                </div>
            </section>
        </div>
    );
}

/** Sidebar with article meta and WhatsApp CTA */
function BlogSidebar({ blog }) {
    return (
        <aside className="hidden lg:flex flex-col gap-4 w-56 sticky top-24 flex-shrink-0">
            {/* Article meta */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Article Info
                </p>
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'Category', value: blog.category },
                        { label: 'Read time', value: blog.readTime },
                        { label: 'Published', value: blog.date },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-sm">
                            <span className="text-gray-500">{label}</span>
                            <span className="font-semibold text-av-blue text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="rounded-xl bg-av-orange p-4 text-white text-center">
                <p className="font-bold text-sm mb-1">Have questions?</p>
                <p className="text-white/80 text-xs mb-3">Talk to a pilot mentor for free.</p>
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white text-av-orange font-bold text-xs py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors"
                >
                    WhatsApp Us
                </a>
            </div>
        </aside>
    );
}

/** Bottom CTA block inside the article */
function ArticleCTA() {
    return (
        <div className="mt-12 border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="font-montserrat text-lg font-black text-av-blue mb-1">
                Ready to Start Your Pilot Journey?
            </h2>
            <p className="text-gray-500 text-sm mb-5">
                Get free expert guidance from our airline pilot mentors.
            </p>
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-av-orange hover:bg-orange-600 transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
                📱 Talk to an Expert on WhatsApp
            </a>
        </div>
    );
}

// ─────────────────────────────────────────────
// Data fetching (SSG)
// ─────────────────────────────────────────────

export async function getStaticPaths() {
    let mongoPaths = [];

    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('weoneaviation');
        const mongoBlogs = await db.collection('blogs').find({}).toArray();
        mongoPaths = mongoBlogs.map((b) => ({ params: { id: b._id.toString() } }));
        await client.close();
    } catch (e) {
        console.error('MongoDB path fetch error:', e.message);
    }

    const hardcodedPaths = hardcodedBlogs.map((b) => ({
        params: { id: String(b.id) },
    }));

    return {
        paths: [...hardcodedPaths, ...mongoPaths],
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    // Check hardcoded blogs first
    const hardcoded = hardcodedBlogs.find((b) => b.id === Number(params.id));
    if (hardcoded) return { props: { blog: hardcoded } };

    // Fall back to MongoDB
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('weoneaviation');
        const raw = await db
            .collection('blogs')
            .findOne({ _id: new ObjectId(params.id) });
        await client.close();

        if (!raw) return { notFound: true };

        const displayDate = raw.updatedAt
            ? `${new Date(raw.updatedAt).toDateString()} (edited)`
            : new Date(raw.createdAt).toDateString();

        /*
         * Machine-readable siblings of displayDate. BlogPosting wants ISO-8601;
         * "Mon Dec 15 2024 (edited)" is for the reader, not for a crawler.
         * dateModified falls back to createdAt so the field is never absent —
         * an Article node without dates is the one Google reliably ignores.
         */
        const datePublishedISO = new Date(raw.createdAt).toISOString();
        const dateModifiedISO = new Date(raw.updatedAt || raw.createdAt).toISOString();

        return {
            props: {
                blog: {
                    id: raw._id.toString(),
                    title: raw.title,
                    excerpt: raw.excerpt || '',
                    category: raw.category || 'Blog',
                    readTime: '5 min',
                    date: displayDate,
                    datePublishedISO,
                    dateModifiedISO,
                    img:
                        raw.coverImage ||
                        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
                    content: raw.content,
                    slug: raw.slug || '',
                    faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
                },
            },
            revalidate: 30,
        };
    } catch (e) {
        console.error('MongoDB blog fetch error:', e.message);
        return { notFound: true };
    }
}

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function BlogDetail({ blog }) {
    if (!blog) {
        return (
            <Layout title="Blog Not Found – We One Aviation">
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-black text-av-blue mb-4">Blog Not Found</h1>
                    <Link href="/blogs" className="text-av-orange font-semibold hover:underline">
                        ← Back to Blogs
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${blog.title} – We One Aviation`} description={blog.excerpt} canonical={blog.canonicalTo}>
            <StructuredData
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: blog.title,
                    description: blog.excerpt,
                    image: blog.img,
                    inLanguage: 'en-IN',
                    datePublished: blog.datePublishedISO,
                    dateModified: blog.dateModifiedISO,
                    articleSection: blog.category,
                    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://weoneaviation.in/blogs/${blog.id}` },
                    author: { '@type': 'Organization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in' },
                    publisher: {
                        '@type': 'EducationalOrganization',
                        name: 'We One Aviation Academy',
                        url: 'https://weoneaviation.in',
                        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
                    },
                }}
            />
            {/* Hero */}
            <BlogHero blog={blog} />

            {/* Body */}
            <section className="py-10 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-av-orange font-semibold text-sm mb-8 hover:underline"
                    >
                        ← Back to All Blogs
                    </Link>

                    {/* Two-column layout */}
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
                        {/* Article */}
                        <article className="flex-1 min-w-0">
                            <style>{blogContentStyles}</style>

                            <div
                                className="blog-content"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {blog.faqs?.length > 0 && (
                              <FAQSection faqs={blog.faqs} title="Frequently Asked Questions" idPrefix={`blog-${blog.id}-faq`} />
                            )}

                            <ArticleCTA />
                        </article>

                        {/* Sidebar */}
                        <BlogSidebar blog={blog} />
                    </div>
                </div>
            </section>
        </Layout>
    );
}