import Layout from '../../components/Layout';
import Link from 'next/link';
import { MongoClient } from 'mongodb';

const hardcodedBlogs = [
    { id: 1, title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.', category: 'CPL Guide', readTime: '8 min', date: 'Dec 15, 2026', img: '/how to Become a Commercial pilot in India.jpeg' },
    { id: 2, title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.', category: 'DGCA', readTime: '6 min', date: 'Dec 10, 2026', img: '/Dgca written exam subject pattern and preparation tips.jpeg' },
    { id: 3, title: 'CPL Training in India vs Abroad – Which is Better?', excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.', category: 'Training', readTime: '7 min', date: 'Dec 5, 2026', img: '/Cpl training in india vs abroad which is better.jpeg' },
    { id: 4, title: 'Pilot Salary in India 2026 – Complete Breakdown by Airline', excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.', category: 'Career', readTime: '5 min', date: 'Nov 28, 2026', img: '/salary.webp' },
    { id: 5, title: 'Medical Requirements to Become a Pilot in India – DGCA Class 1', excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.', category: 'Medical', readTime: '6 min', date: 'Nov 20, 2026', img: '/pilot-salary.webp' },
    // { id: 6, title: 'How to Become a Pilot After 12th Science – Step-by-Step', excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.', category: 'After 12th', readTime: '9 min', date: 'Nov 15, 2026', img: '/pilot-salary.webp' },
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
        <Layout title="Blogs – WeOne Aviation" description="Aviation blogs, pilot guides, DGCA tips and more.">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-av-blue to-av-navy pt-32 pb-16 px-4 text-center text-white">
                <h1 className="font-montserrat text-4xl md:text-5xl font-black mb-4">Aviation Blogs</h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Expert guides on pilot training, DGCA exams, careers, and everything aviation.
                </p>
            </div>

            {/* Blog Grid */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allBlogs.map((blog) => (
                        <Link
                            href={`/blogs/${blog.id}`}
                            key={blog.id}
                            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.img}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-3 left-3 bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h2 className="font-montserrat text-lg font-bold text-av-blue mb-2 leading-snug group-hover:text-av-orange transition-colors">
                                    {blog.title}
                                </h2>
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