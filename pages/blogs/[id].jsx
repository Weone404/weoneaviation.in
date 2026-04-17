import Layout from '../../components/Layout';
import Link from 'next/link';
import { MongoClient, ObjectId } from 'mongodb';

// ─────────────────────────────────────────────
// Static blog data
// ─────────────────────────────────────────────
const hardcodedBlogs = [
    {
        id: 1,
        title: 'How to Become a Commercial Pilot in India – Complete 2024 Guide',
        excerpt:
            'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.',
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
      <div class="steps-list">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-body">
            <p class="step-title">Get your Class 1 Medical</p>
            <p class="step-desc">Visit an approved DGCA medical centre and clear the Class 1 medical examination.</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-body">
            <p class="step-title">Enroll in a Flying School</p>
            <p class="step-desc">Choose a DGCA-approved flying academy in India or abroad.</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-body">
            <p class="step-title">Complete Ground Training</p>
            <p class="step-desc">You must pass 9 DGCA written theory exams before proceeding.</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-body">
            <p class="step-title">Log Flying Hours</p>
            <p class="step-desc">Complete at least 200 hours of total flight time.</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-body">
            <p class="step-title">Skill Test</p>
            <p class="step-desc">Appear for the DGCA CPL skill test conducted by an authorised examiner.</p>
          </div>
        </div>
      </div>

      <h2>Cost of CPL Training in India</h2>
      <p>The total cost typically ranges from <strong>₹40 lakhs to ₹80 lakhs</strong> depending on the flying school and aircraft type.</p>

      <h2>Career Prospects</h2>
      <p>After obtaining a CPL, most pilots join regional airlines or charter operators as First Officers. The aviation industry in India is growing rapidly with significant pilot demand expected over the next decade.</p>

      <h2>Conclusion</h2>
      <p>Becoming a commercial pilot in India is a challenging but rewarding career path. WeOne Aviation is here to guide you every step of the way.</p>
    `,
    },
    {
        id: 2,
        title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips',
        excerpt:
            'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.',
        category: 'DGCA',
        readTime: '6 min',
        date: 'Dec 10, 2024',
        img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=80',
        content: `
      <h2>Overview of DGCA Written Exams</h2>
      <p>To obtain a CPL in India, candidates must pass 9 written examinations conducted by the DGCA.</p>

      <h2>The 9 DGCA Exam Subjects</h2>
      <ul>
        <li>Air Navigation</li>
        <li>Aviation Meteorology</li>
        <li>Air Regulations</li>
        <li>Technical General (Airframes &amp; Engines)</li>
        <li>Technical Specific (Aircraft Type)</li>
        <li>Radio Telephony (RTR)</li>
        <li>Instruments &amp; Electronics</li>
        <li>Aviation Medicine</li>
        <li>Principles of Flight</li>
      </ul>

      <h2>Exam Pattern</h2>
      <p>Each exam consists of MCQs. The passing score is <strong>70%</strong> and you have up to <strong>6 attempts</strong> per subject.</p>

      <h2>Preparation Tips</h2>
      <div class="steps-list">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-body">
            <p class="step-title">Start Early</p>
            <p class="step-desc">Begin ground school preparation alongside flying training.</p>
          </div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-body">
            <p class="step-title">Practice Mock Tests</p>
            <p class="step-desc">WeOne Aviation provides comprehensive question banks for all 9 subjects.</p>
          </div>
        </div>
      </div>

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
        excerpt:
            'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains.',
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
        excerpt:
            'A complete roadmap for 12th PCM students aspiring to become commercial pilots.',
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
      <div class="steps-list">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-body"><p class="step-title">Clear Class 1 Medical</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-body"><p class="step-title">Research Flying Schools</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-body"><p class="step-title">Secure Funding</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-body"><p class="step-title">Student Pilot License (SPL)</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-body"><p class="step-title">Private Pilot License (PPL)</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">6</div>
          <div class="step-body"><p class="step-title">DGCA Theory Exams</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">7</div>
          <div class="step-body"><p class="step-title">Instrument Rating (IR)</p></div>
        </div>
        <div class="step-card">
          <div class="step-number">8</div>
          <div class="step-body"><p class="step-title">CPL after 200 flight hours</p></div>
        </div>
      </div>

      <h2>Timeline</h2>
      <p>The entire process typically takes <strong>2 to 3 years</strong>.</p>
    `,
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
const WA_NUMBER = '919355611996';
const WA_MESSAGE = encodeURIComponent(
    'Hello WeOne Aviation! I read your blog and want to learn more about pilot training.'
);
const waLink = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Hero banner with overlay text */
function BlogHero({ blog }) {
    return (
        <div className="relative h-72 md:h-[420px] w-full overflow-hidden pt-16">
            <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-8 md:px-12 md:py-10 max-w-5xl mx-auto">
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
            </div>
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
            <h3 className="font-montserrat text-lg font-black text-av-blue mb-1">
                Ready to Start Your Pilot Journey?
            </h3>
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

        return {
            props: {
                blog: {
                    id: raw._id.toString(),
                    title: raw.title,
                    excerpt: raw.excerpt || '',
                    category: raw.category || 'Blog',
                    readTime: '5 min',
                    date: displayDate,
                    img:
                        raw.coverImage ||
                        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
                    content: raw.content,
                    slug: raw.slug || '',
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
            <Layout title="Blog Not Found – WeOne Aviation">
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
        <Layout title={`${blog.title} – WeOne Aviation`} description={blog.excerpt}>
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