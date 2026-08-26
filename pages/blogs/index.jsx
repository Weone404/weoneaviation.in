import Layout from '../../components/Layout';
import Link from 'next/link';
import NextImage from 'next/image';
import { MongoClient } from 'mongodb';

const hardcodedBlogs = [
    { id: 1, title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.', category: 'CPL Guide', readTime: '8 min', date: 'Dec 15, 2026', img: '/how to Become a Commercial pilot in India.jpeg', faqs: [] },
    { id: 2, title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Prepare for the five DGCA written papers, with RTR (A) examined separately. Know the syllabus, the exam pattern, and how papers are cleared one at a time.', category: 'DGCA', readTime: '6 min', date: 'Dec 10, 2026', img: '/Dgca written exam subject pattern and preparation tips.jpeg', faqs: [] },
    { id: 3, title: 'CPL Training in India vs Abroad – Which is Better?', excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.', category: 'Training', readTime: '7 min', date: 'Dec 5, 2026', img: '/Cpl training in india vs abroad which is better.jpeg', faqs: [] },
    { id: 4, title: 'Pilot Salary in India 2026 – Complete Breakdown by Airline', excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.', category: 'Career', readTime: '5 min', date: 'Nov 28, 2026', img: '/salary.webp', faqs: [] },
    { id: 5, title: 'Medical Requirements to Become a Pilot in India', excerpt: 'Detailed guide on DGCA medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.', category: 'Medical', readTime: '6 min', date: 'Nov 20, 2026', img: '/Pilot-Salary.webp', faqs: [] },
    // { id: 6, title: 'How to Become a Pilot After 12th Science – Step-by-Step', excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.', category: 'After 12th', readTime: '9 min', date: 'Nov 15, 2026', img: '/Pilot-Salary.webp' },
];

/*
 * File-based guides live at pages/blogs/<slug>.jsx rather than in MongoDB, so
 * they never appeared in the grid above — that grid only knows numeric ids.
 * They are listed here and rendered first, because they are the deepest pages
 * on the site and were invisible from the index that is meant to surface them.
 *
 * `image` describes the file that will replace the placeholder. Generate it from
 * the matching prompt in data/blog-image-prompts.md, drop it at `src`, and the
 * card swaps to next/image with no layout change.
 */
const guidePosts = [
    {
        slug: 'what-is-pilot-training-complete-guide',
        title: 'What is Pilot Training? Complete Guide to PPL and CPL Courses in India (2026)',
        excerpt: 'The licence ladder from SPL to ATPL, DGCA eligibility with Schedule II clause references, the five written papers, RTR (A), the full 200-hour flight-time breakdown, timelines and cost buckets.',
        category: 'Pilot training guide',
        readTime: '14 min',
        date: 'Aug 26, 2026',
        image: { src: '/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp', width: 1200, height: 630, promptId: '1' },
    },
    {
        slug: 'dgca-exam-guide',
        title: 'DGCA Full Form and What the DGCA Does',
        excerpt: 'What the Directorate General of Civil Aviation is, its role in pilot licensing and safety oversight, and how it governs the examinations behind an Indian pilot licence.',
        category: 'DGCA guide',
        readTime: '8 min',
        date: 'Jan 2, 2025',
        image: { src: '/blog/dgca-exam-guide/hero-dgca-regulator.webp', width: 1200, height: 630, promptId: '8' },
    },
    {
        slug: 'aviation-course-after-12th',
        title: 'Aviation Courses After 12th in India',
        excerpt: 'Which aviation courses are open after Class 12, what each route leads to, and how the licence path differs from an academic aviation degree.',
        category: 'After 12th',
        readTime: '9 min',
        date: 'Jan 2, 2025',
        image: { src: '/blog/aviation-course-after-12th/hero-after-12th-routes.webp', width: 1200, height: 630, promptId: '9' },
    },
];

export async function getServerSideProps() {
    let mongoBlogs = [];
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('weoneaviation');
        const raw = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray();
        mongoBlogs = raw.map((b) => ({
            id: b._id.toString(),
            title: b.title,
            excerpt: b.excerpt || '',
            category: b.category || 'Blog',
            readTime: '5 min',
            date: new Date(b.createdAt).toDateString(),
            img: b.coverImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
            faqs: Array.isArray(b.faqs) ? b.faqs : [],
        }));
        client.close();
    } catch (e) {
        console.error('MongoDB fetch error:', e);
    }

    return { props: { mongoBlogs } };
}

export default function BlogsIndex({ mongoBlogs }) {
    const allBlogs = [...mongoBlogs, ...hardcodedBlogs];

    return (
        <Layout title="Blogs – We One Aviation" description="Aviation blogs, pilot guides, DGCA tips and more.">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-av-blue to-av-navy pt-32 pb-16 px-4 text-center text-white">
                <h1 className="font-montserrat text-4xl md:text-5xl font-black mb-4">Aviation Blogs</h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Expert guides on pilot training, DGCA exams, careers, and everything aviation.
                </p>
                <p className="text-white/70 text-sm max-w-2xl mx-auto mt-3">
                    If you are comparing pilot training options across India and want exam-centre guidance, simulator providers, and travel tips, see our India guide: <Link href="/pilot-training-in-india" className="font-semibold underline">Pilot Training in India</Link>.
                </p>
            </div>

            {/* In-depth guides — file-based posts, listed first */}
            <section className="pt-16 px-4 max-w-7xl mx-auto" aria-labelledby="in-depth-guides">
                <div className="flex items-baseline justify-between gap-4 mb-8">
                    <h2 id="in-depth-guides" className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">
                        In-depth guides
                    </h2>
                    <p className="text-sm text-gray-500">Long-form, sourced against DGCA rules</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guidePosts.map((post) => (
                        <Link
                            href={`/blogs/${post.slug}`}
                            key={post.slug}
                            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden bg-av-light/40 border-b-2 border-dashed border-av-sky/40 flex items-center justify-center">
                                <div className="text-center px-4">
                                    <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-av-orange mb-1">
                                        Image placeholder
                                    </p>
                                    <p className="font-mono text-[11px] text-av-blue break-all leading-snug">{post.image.src}</p>
                                    <p className="font-mono text-[11px] text-gray-500 mt-1">
                                        {post.image.width} &times; {post.image.height} px
                                    </p>
                                    <p className="font-mono text-[10px] text-gray-400 mt-1">
                                        Prompt {post.image.promptId} &rarr; data/blog-image-prompts.md
                                    </p>
                                </div>
                                <span className="absolute top-3 left-3 bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-montserrat text-lg font-bold text-av-blue mb-2 leading-snug group-hover:text-av-orange transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 flex-1">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>&#128197; {post.date}</span>
                                    <span>&#9201; {post.readTime} read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 px-4 max-w-7xl mx-auto" aria-labelledby="latest-articles">
                <h2 id="latest-articles" className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue mb-8">
                    Latest articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allBlogs.map((blog) => (
                        <Link
                            href={`/blogs/${blog.id}`}
                            key={blog.id}
                            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <NextImage
                                    src={blog.img}
                                    alt={blog.title}
                                    width={800}
                                    height={600}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-3 left-3 bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-montserrat text-lg font-bold text-av-blue mb-2 leading-snug group-hover:text-av-orange transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 flex-1">{blog.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>📅 {blog.date}</span>
                                    <span>⏱ {blog.readTime} read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </Layout>
    );
}