import Layout from '../../components/Layout';
import Link from 'next/link';
import { MongoClient, ObjectId } from 'mongodb';

const hardcodedBlogs = [
    {
        id: 1,
        title: 'How to Become a Commercial Pilot in India – Complete 2024 Guide',
        excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.',
        category: 'CPL Guide',
        readTime: '8 min',
        date: 'Dec 15, 2024',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
        content: `
      <h2>What is a Commercial Pilot License (CPL)?</h2>
      <p>A Commercial Pilot License (CPL) allows you to fly aircraft for compensation or hire. In India, the CPL is issued by the Directorate General of Civil Aviation (DGCA) and is the primary qualification required to work as a pilot for an airline.</p>
      <h2>Eligibility Requirements</h2>
      <ul>
        <li>Minimum age: 18 years</li>
        <li>Educational qualification: 10+2 with Physics and Mathematics</li>
        <li>Valid DGCA Class 1 Medical Certificate</li>
        <li>Minimum 200 hours of total flight time</li>
      </ul>
      <h2>Step-by-Step Process</h2>
      <p><strong>Step 1 – Get your Class 1 Medical:</strong> Visit an approved DGCA medical centre and clear the Class 1 medical examination.</p>
      <p><strong>Step 2 – Enroll in a Flying School:</strong> Choose a DGCA-approved flying academy in India or abroad.</p>
      <p><strong>Step 3 – Complete Ground Training:</strong> You must pass 9 DGCA written theory exams.</p>
      <p><strong>Step 4 – Log Flying Hours:</strong> Complete at least 200 hours of flight time.</p>
      <p><strong>Step 5 – Skill Test:</strong> Appear for the DGCA CPL skill test conducted by an authorised examiner.</p>
      <h2>Cost of CPL Training in India</h2>
      <p>The total cost typically ranges from ₹40 lakhs to ₹80 lakhs depending on the flying school and aircraft type.</p>
      <h2>Career Prospects</h2>
      <p>After obtaining a CPL, most pilots join regional airlines or charter operators as First Officers. The aviation industry in India is growing rapidly with significant pilot demand expected over the next decade.</p>
      <h2>Conclusion</h2>
      <p>Becoming a commercial pilot in India is a challenging but rewarding career path. WeOne Aviation is here to guide you every step of the way.</p>
    `,
    },
    {
        id: 2,
        title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips',
        excerpt: 'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.',
        category: 'DGCA',
        readTime: '6 min',
        date: 'Dec 10, 2024',
        img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=80',
        content: `
      <h2>Overview of DGCA Written Exams</h2>
      <p>To obtain a CPL in India, candidates must pass 9 written examinations conducted by the DGCA.</p>
      <h2>The 9 DGCA Exam Subjects</h2>
      <ul>
        <li>Air Navigation</li><li>Aviation Meteorology</li><li>Air Regulations</li>
        <li>Technical General (Airframes & Engines)</li><li>Technical Specific (Aircraft Type)</li>
        <li>Radio Telephony (RTR)</li><li>Instruments & Electronics</li>
        <li>Aviation Medicine</li><li>Principles of Flight</li>
      </ul>
      <h2>Exam Pattern</h2>
      <p>Each exam consists of MCQs. The passing score is 70% and you have up to 6 attempts per subject.</p>
      <h2>Preparation Tips</h2>
      <p><strong>Start Early:</strong> Begin ground school preparation alongside flying training.</p>
      <p><strong>Practice Mock Tests:</strong> WeOne Aviation provides comprehensive question banks for all 9 subjects.</p>
      <h2>Conclusion</h2>
      <p>With consistent study and proper guidance, clearing all 9 DGCA exams is very achievable.</p>
    `,
    },
    {
        id: 3,
        title: 'CPL Training in India vs Abroad – Which is Better?',
        excerpt: 'Pros and cons of training in India vs USA, Canada, Australia.',
        category: 'Training',
        readTime: '7 min',
        date: 'Dec 5, 2024',
        img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80',
        content: `
      <h2>Training in India</h2>
      <p><strong>Pros:</strong> Lower cost (₹40–80 lakhs), no visa needed, direct DGCA CPL.</p>
      <p><strong>Cons:</strong> Weather disruptions, some older aircraft fleets.</p>
      <h2>Training Abroad (USA, Canada, Australia)</h2>
      <p><strong>Pros:</strong> Better weather, modern aircraft, international exposure.</p>
      <p><strong>Cons:</strong> Higher cost, license conversion adds time and money.</p>
      <h2>Our Recommendation</h2>
      <p>For most Indian students, training in India offers the best value for money.</p>
    `,
    },
    {
        id: 4,
        title: 'Pilot Salary in India 2024 – Complete Breakdown by Airline',
        excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains.',
        category: 'Career',
        readTime: '5 min',
        date: 'Nov 28, 2024',
        img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
        content: `
      <h2>First Officer Salaries</h2>
      <ul>
        <li><strong>IndiGo:</strong> ₹3 lakh – ₹5 lakh/month</li>
        <li><strong>Air India:</strong> ₹4 lakh – ₹6 lakh/month</li>
        <li><strong>SpiceJet:</strong> ₹2.5 lakh – ₹4.5 lakh/month</li>
      </ul>
      <h2>Captain Salaries</h2>
      <ul>
        <li><strong>IndiGo Captain:</strong> ₹7 lakh – ₹12 lakh/month</li>
        <li><strong>Air India Captain:</strong> ₹8 lakh – ₹14 lakh/month</li>
      </ul>
      <h2>Additional Perks</h2>
      <p>Beyond base salary, pilots receive flying allowances, travel benefits, medical insurance, and more.</p>
    `,
    },
    {
        id: 5,
        title: 'Medical Requirements to Become a Pilot in India – DGCA Class 1',
        excerpt: 'Detailed guide on DGCA Class 1 medical requirements.',
        category: 'Medical',
        readTime: '6 min',
        date: 'Nov 20, 2024',
        img: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1200&q=80',
        content: `
      <h2>Key Requirements</h2>
      <ul>
        <li><strong>Vision:</strong> 6/6 in each eye, no colour blindness</li>
        <li><strong>Hearing:</strong> Normal hearing in both ears</li>
        <li><strong>Cardiovascular:</strong> Normal ECG, no history of heart disease</li>
        <li><strong>Blood Pressure:</strong> Within normal limits (max 140/90)</li>
        <li><strong>Mental Health:</strong> No history of psychiatric disorders</li>
      </ul>
      <h2>Where to Get Your Class 1 Medical</h2>
      <p>DGCA-approved centres are in Delhi, Mumbai, Chennai, Kolkata, Hyderabad, and Bengaluru.</p>
    `,
    },
    {
        id: 6,
        title: 'How to Become a Pilot After 12th Science – Step-by-Step',
        excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots.',
        category: 'After 12th',
        readTime: '9 min',
        date: 'Nov 15, 2024',
        img: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1200&q=80',
        content: `
      <h2>Minimum Eligibility</h2>
      <ul>
        <li>10+2 with Physics and Mathematics (minimum 50% marks)</li>
        <li>Age: Minimum 17 years for SPL, 18 for CPL</li>
      </ul>
      <h2>Step-by-Step Roadmap</h2>
      <p><strong>Step 1 – Clear Class 1 Medical</strong></p>
      <p><strong>Step 2 – Research Flying Schools</strong></p>
      <p><strong>Step 3 – Secure Funding</strong></p>
      <p><strong>Step 4 – Student Pilot License (SPL)</strong></p>
      <p><strong>Step 5 – Private Pilot License (PPL)</strong></p>
      <p><strong>Step 6 – DGCA Theory Exams</strong></p>
      <p><strong>Step 7 – Instrument Rating (IR)</strong></p>
      <p><strong>Step 8 – CPL after 200 flight hours</strong></p>
      <h2>Timeline</h2>
      <p>The entire process typically takes 2 to 3 years.</p>
    `,
    },
];

export async function getStaticPaths() {
    let mongoPaths = [];
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('weoneaviation');
        const mongoBlogs = await db.collection('blogs').find({}).toArray();
        mongoPaths = mongoBlogs.map((b) => ({ params: { id: b._id.toString() } }));
        client.close();
    } catch (e) { }

    const hardcodedPaths = hardcodedBlogs.map((b) => ({ params: { id: String(b.id) } }));

    return {
        paths: [...hardcodedPaths, ...mongoPaths],
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    // Check hardcoded first
    const hardcoded = hardcodedBlogs.find((b) => b.id === Number(params.id));
    if (hardcoded) return { props: { blog: hardcoded } };

    // Then check MongoDB
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('weoneaviation');
        const raw = await db.collection('blogs').findOne({ _id: new ObjectId(params.id) });
        client.close();

        if (!raw) return { notFound: true };

        return {
            props: {
                blog: {
                    id: raw._id.toString(),
                    title: raw.title,
                    excerpt: raw.excerpt || '',
                    category: raw.category || 'Blog',
                    readTime: '5 min',
                    date: new Date(raw.createdAt).toDateString(),
                    img: raw.coverImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
                    content: raw.content,
                },
            },
            revalidate: 60,
        };
    } catch (e) {
        return { notFound: true };
    }
}

export default function BlogDetail({ blog }) {
    if (!blog) {
        return (
            <Layout title="Blog Not Found – WeOne Aviation">
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-black text-av-blue mb-4">Blog Not Found</h1>
                    <Link href="/blogs" className="text-av-orange font-semibold hover:underline">← Back to Blogs</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${blog.title} – WeOne Aviation`} description={blog.excerpt}>
            {/* Hero Image */}
            <div className="relative h-72 md:h-96 w-full overflow-hidden pt-16">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
                    <span className="bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                        {blog.category}
                    </span>
                    <h1 className="font-montserrat text-2xl md:text-4xl font-black text-white leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/70 text-sm mt-3">
                        <span>📅 {blog.date}</span>
                        <span>⏱ {blog.readTime} read</span>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <section className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-av-orange font-semibold text-sm mb-8 hover:underline">
                        ← Back to All Blogs
                    </Link>

                    <div
                        className="prose prose-lg max-w-none
                            prose-headings:font-montserrat prose-headings:text-av-blue prose-headings:font-bold
                            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                            prose-p:text-gray-600 prose-p:leading-relaxed
                            prose-li:text-gray-600
                            prose-strong:text-av-blue
                            prose-a:text-av-orange"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* CTA */}
                    <div className="mt-12 bg-gradient-to-br from-av-blue to-av-navy rounded-2xl p-8 text-center text-white">
                        <h3 className="font-montserrat text-xl font-black mb-2">Ready to Start Your Pilot Journey?</h3>
                        <p className="text-white/70 text-sm mb-5">Get free expert guidance from our airline pilot mentors.</p>

                        <a href={`https://wa.me/919355611996?text=${encodeURIComponent('Hello WeOne Aviation! I read your blog and want to learn more about pilot training.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-av-orange hover:bg-orange-600 transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
                        >
                            📱 Talk to an Expert on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </Layout >
    );
}