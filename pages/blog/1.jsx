import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const blogs = [
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
      <p><strong>Step 1 – Get your Class 1 Medical:</strong> Visit an approved DGCA medical centre and clear the Class 1 medical examination. This is the first step before you invest in training.</p>
      <p><strong>Step 2 – Enroll in a Flying School:</strong> Choose a DGCA-approved flying academy in India or abroad. Popular choices include Indira Gandhi Rashtriya Uran Akademi (IGRUA), CAE Oxford, and National Flying Training Institute (NFTI).</p>
      <p><strong>Step 3 – Complete Ground Training:</strong> You must pass 9 DGCA written theory exams covering subjects like Air Navigation, Meteorology, Air Regulations, Technical General, and more.</p>
      <p><strong>Step 4 – Log Flying Hours:</strong> Complete at least 200 hours of flight time, including solo flying, cross-country navigation, and instrument flying.</p>
      <p><strong>Step 5 – Skill Test:</strong> Appear for the DGCA CPL skill test conducted by an authorised examiner.</p>

      <h2>Cost of CPL Training in India</h2>
      <p>The total cost of obtaining a CPL in India typically ranges from ₹40 lakhs to ₹80 lakhs depending on the flying school and aircraft type. This includes ground school fees, flying hours, exam fees, and miscellaneous charges.</p>

      <h2>Career Prospects</h2>
      <p>After obtaining a CPL, most pilots join regional airlines or charter operators as First Officers. With experience, you can progress to Captain rank at major carriers like IndiGo, Air India, or Vistara. The aviation industry in India is growing rapidly, with hundreds of new aircraft on order and significant pilot demand expected over the next decade.</p>

      <h2>Conclusion</h2>
      <p>Becoming a commercial pilot in India is a challenging but rewarding career path. With the right preparation, a good flying school, and dedication to your DGCA exams, you can achieve your dream of flying professionally. WeOne Aviation is here to guide you every step of the way.</p>
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
      <p>To obtain a CPL in India, candidates must pass 9 written examinations conducted by the DGCA. These exams test your theoretical knowledge across all aspects of aviation, from navigation to meteorology.</p>

      <h2>The 9 DGCA Exam Subjects</h2>
      <ul>
        <li>Air Navigation</li>
        <li>Aviation Meteorology</li>
        <li>Air Regulations</li>
        <li>Technical General (Airframes & Engines)</li>
        <li>Technical Specific (Aircraft Type)</li>
        <li>Radio Telephony (RTR)</li>
        <li>Instruments & Electronics</li>
        <li>Aviation Medicine</li>
        <li>Principles of Flight</li>
      </ul>

      <h2>Exam Pattern</h2>
      <p>Each exam consists of multiple-choice questions (MCQs). The passing score is 70% and exams are conducted at DGCA-approved centres across India. You have up to 6 attempts per subject.</p>

      <h2>Preparation Tips</h2>
      <p><strong>Start Early:</strong> Begin your ground school preparation alongside your flying training. Don't leave theory for the last moment.</p>
      <p><strong>Use DGCA-Approved Study Material:</strong> Refer to DGCA CAR (Civil Aviation Requirements) documents, which are the primary source for Air Regulations.</p>
      <p><strong>Practice Mock Tests:</strong> Regularly solve previous year papers and mock tests. WeOne Aviation provides comprehensive question banks for all 9 subjects.</p>
      <p><strong>Focus on Weak Areas:</strong> Air Navigation and Meteorology are often the toughest subjects. Give them extra attention.</p>

      <h2>Recommended Books</h2>
      <ul>
        <li>Oxford Aviation Academy manuals (internationally recognised)</li>
        <li>Trevor Thom series for Navigation</li>
        <li>DGCA official CAR documents for Air Regulations</li>
      </ul>

      <h2>Conclusion</h2>
      <p>With consistent study and proper guidance, clearing all 9 DGCA exams is very achievable. WeOne Aviation's ground classes are designed specifically to help you pass on the first attempt.</p>
    `,
    },
    {
        id: 3,
        title: 'CPL Training in India vs Abroad – Which is Better?',
        excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.',
        category: 'Training',
        readTime: '7 min',
        date: 'Dec 5, 2024',
        img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80',
        content: `
      <h2>The Big Question Every Aspiring Pilot Faces</h2>
      <p>Should you train in India or fly abroad for your CPL? Both options have their merits and the right choice depends on your budget, timeline, and career goals.</p>

      <h2>Training in India</h2>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Lower overall cost (₹40–80 lakhs vs ₹60–1.2 crore abroad)</li>
        <li>No need for visa or foreign exchange</li>
        <li>Direct DGCA CPL – no license conversion required</li>
        <li>Family stays close, lower living costs</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Weather disruptions can delay training</li>
        <li>Some schools have older aircraft fleets</li>
        <li>ATC congestion at busy airports</li>
      </ul>

      <h2>Training Abroad (USA, Canada, Australia)</h2>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Better weather, faster completion</li>
        <li>Modern aircraft and facilities</li>
        <li>International exposure and experience</li>
        <li>FAA/CASA license adds international credibility</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Higher cost including living expenses</li>
        <li>License conversion process to DGCA adds time and money</li>
        <li>Visa complications and currency fluctuation</li>
      </ul>

      <h2>License Conversion Process</h2>
      <p>If you train abroad with an FAA or EASA license, you must convert it to a DGCA CPL to fly for Indian airlines. This involves passing DGCA theory exams and a skill test, adding roughly 6–12 months and ₹5–10 lakhs to the process.</p>

      <h2>Our Recommendation</h2>
      <p>For most Indian students, training in India at a reputable DGCA-approved school offers the best value for money. However, if budget is not a constraint and you want faster training with international exposure, USA or Canada are excellent options.</p>
    `,
    },
    {
        id: 4,
        title: 'Pilot Salary in India 2024 – Complete Breakdown by Airline',
        excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.',
        category: 'Career',
        readTime: '5 min',
        date: 'Nov 28, 2024',
        img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
        content: `
      <h2>Pilot Salaries in India – 2024 Overview</h2>
      <p>The aviation sector in India offers some of the most competitive salaries across industries. Here's a detailed breakdown of what pilots earn at various stages of their career.</p>

      <h2>Trainee / Junior First Officer</h2>
      <p>Fresh CPL holders joining as trainee pilots or cadet pilots typically earn between ₹1.5 lakh to ₹2.5 lakh per month during their initial type rating and line training period.</p>

      <h2>First Officer Salaries</h2>
      <ul>
        <li><strong>IndiGo:</strong> ₹3 lakh – ₹5 lakh/month</li>
        <li><strong>Air India:</strong> ₹4 lakh – ₹6 lakh/month</li>
        <li><strong>SpiceJet:</strong> ₹2.5 lakh – ₹4.5 lakh/month</li>
        <li><strong>Vistara / Air India Express:</strong> ₹3.5 lakh – ₹5.5 lakh/month</li>
      </ul>

      <h2>Captain Salaries</h2>
      <ul>
        <li><strong>IndiGo Captain:</strong> ₹7 lakh – ₹12 lakh/month</li>
        <li><strong>Air India Captain:</strong> ₹8 lakh – ₹14 lakh/month</li>
        <li><strong>International Long-haul Captain:</strong> ₹15 lakh – ₹25 lakh/month</li>
      </ul>

      <h2>Additional Perks</h2>
      <p>Beyond base salary, pilots receive flying allowances, layover allowances, travel benefits for family, medical insurance, and provident fund contributions. Many airlines also offer free or heavily discounted travel for pilots and their immediate family members.</p>

      <h2>Career Progression Timeline</h2>
      <p>On average, a First Officer takes 8–12 years to upgrade to Captain, depending on the airline's growth and fleet expansion. With India's rapid aviation growth, this timeline has been shortening significantly in recent years.</p>
    `,
    },
    {
        id: 5,
        title: 'Medical Requirements to Become a Pilot in India – DGCA Class 1',
        excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.',
        category: 'Medical',
        readTime: '6 min',
        date: 'Nov 20, 2024',
        img: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1200&q=80',
        content: `
      <h2>Why Medical Fitness is Critical for Pilots</h2>
      <p>Aviation safety depends heavily on the physical and mental fitness of pilots. The DGCA mandates a Class 1 Medical Certificate for all commercial pilots, which must be renewed periodically throughout your career.</p>

      <h2>What is DGCA Class 1 Medical?</h2>
      <p>The Class 1 Medical is the most stringent medical examination for pilots. It assesses your overall health across multiple disciplines including vision, hearing, cardiovascular health, neurological condition, and mental health.</p>

      <h2>Key Requirements</h2>
      <ul>
        <li><strong>Vision:</strong> 6/6 in each eye (correctable with glasses/lenses), no colour blindness</li>
        <li><strong>Hearing:</strong> Normal hearing in both ears</li>
        <li><strong>Cardiovascular:</strong> Normal ECG, no history of heart disease</li>
        <li><strong>Blood Pressure:</strong> Within normal limits (max 140/90)</li>
        <li><strong>Diabetes:</strong> No insulin-dependent diabetes</li>
        <li><strong>Mental Health:</strong> No history of psychiatric disorders</li>
        <li><strong>BMI:</strong> Should be within healthy range</li>
      </ul>

      <h2>Common Disqualifying Conditions</h2>
      <p>Some conditions that may disqualify you include severe colour blindness, insulin-dependent diabetes, epilepsy, coronary artery disease, and certain psychiatric conditions. However, many borderline cases can be managed with a waiver or special issuance.</p>

      <h2>Where to Get Your Class 1 Medical</h2>
      <p>DGCA has approved specific medical centres across India for Class 1 examinations. Major centres are located in Delhi, Mumbai, Chennai, Kolkata, Hyderabad, and Bengaluru. Always book in advance as slots fill up quickly.</p>

      <h2>Tips to Prepare</h2>
      <p>Get a preliminary eye check and ensure your vision meets requirements. Maintain a healthy lifestyle with regular exercise and balanced diet. Avoid alcohol and ensure you are well-rested before your medical appointment.</p>
    `,
    },
    {
        id: 6,
        title: 'How to Become a Pilot After 12th Science – Step-by-Step',
        excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.',
        category: 'After 12th',
        readTime: '9 min',
        date: 'Nov 15, 2024',
        img: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1200&q=80',
        content: `
      <h2>Your Dream Starts After 12th</h2>
      <p>If you've just completed your 12th standard with Physics and Mathematics, you're already eligible to start your journey towards becoming a commercial pilot. Here's your complete roadmap.</p>

      <h2>Minimum Eligibility</h2>
      <ul>
        <li>10+2 with Physics and Mathematics (minimum 50% marks)</li>
        <li>Age: Minimum 17 years for Student Pilot License, 18 for CPL</li>
        <li>Valid DGCA Class 2 Medical (for SPL), Class 1 Medical (for CPL)</li>
      </ul>

      <h2>Step-by-Step Roadmap</h2>
      <p><strong>Step 1 – Clear Class 1 Medical:</strong> Before anything else, get your DGCA Class 1 medical done. This ensures you are physically fit to fly commercially.</p>
      <p><strong>Step 2 – Research Flying Schools:</strong> Shortlist DGCA-approved flying academies. Visit them, interact with current students, and compare costs and fleet quality.</p>
      <p><strong>Step 3 – Secure Funding:</strong> Aviation education loans are available from most major banks at education loan interest rates. Some schools also offer payment plans.</p>
      <p><strong>Step 4 – Student Pilot License (SPL):</strong> This is your first license. You'll do ground training and solo flying under supervision.</p>
      <p><strong>Step 5 – Private Pilot License (PPL):</strong> Build more hours and flying skills. PPL allows you to fly without compensation.</p>
      <p><strong>Step 6 – DGCA Theory Exams:</strong> Start preparing for and clearing the 9 DGCA theory papers simultaneously with your flying training.</p>
      <p><strong>Step 7 – Instrument Rating (IR):</strong> Learn to fly by instruments only – essential for commercial operations.</p>
      <p><strong>Step 8 – CPL:</strong> After 200 total flight hours and clearing all exams, you can apply for your Commercial Pilot License.</p>

      <h2>Timeline</h2>
      <p>The entire process from starting flying school to getting your CPL typically takes 2 to 3 years if training progresses without major weather or financial interruptions.</p>

      <h2>Top Flying Schools in India</h2>
      <ul>
        <li>IGRUA (Indira Gandhi Rashtriya Uran Akademi), Rae Bareli</li>
        <li>National Flying Training Institute (NFTI), Gondia</li>
        <li>Bombay Flying Club, Mumbai</li>
        <li>Ahmedabad Aviation and Aeronautics, Ahmedabad</li>
        <li>Government Aviation Training Institute (GATI), Bhopal</li>
      </ul>

      <h2>Final Advice</h2>
      <p>Start early, stay consistent, and don't let the costs intimidate you. Many successful airline pilots started exactly where you are now. WeOne Aviation is here to guide you through every stage of this incredible journey.</p>
    `,
    },
];

export async function getStaticPaths() {
    return {
        paths: blogs.map((b) => ({ params: { id: String(b.id) } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const blog = blogs.find((b) => b.id === Number(params.id)) || null;
    return { props: { blog } };
}

export default function BlogDetail({ blog }) {
    const router = useRouter();

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
        <Layout
            title={`${blog.title} – WeOne Aviation`}
            description={blog.excerpt}
        >
            {/* Hero Image */}
            <div className="relative h-72 md:h-96 w-full overflow-hidden pt-16">
                <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
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
                    {/* Back link */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-av-orange font-semibold text-sm mb-8 hover:underline"
                    >
                        ← Back to All Blogs
                    </Link>

                    {/* Content */}
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
                        <a
                            href={`https://wa.me/919355611996?text=${encodeURIComponent('Hello WeOne Aviation! I read your blog and want to learn more about pilot training.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-av-orange hover:bg-orange-600 transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
                        >
                            📱 Talk to an Expert on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
}