import Layout from '../../components/Layout';
import Link from 'next/link';
import NextImage from 'next/image';
import { MongoClient } from 'mongodb';

/*
 * These five mirror the posts in pages/blogs/[id].jsx and must match them
 * exactly. Corrected 2026-09-11: the titles and dates here read 2026 while the
 * posts themselves read 2024, so every card advertised a publication date in
 * the future. The post is the source of truth — change it there first, then
 * here. Never ship a date later than the day of the build.
 */
const hardcodedBlogs = [
    // id 4 ("Pilot Salary in India") removed 2026-09-16: that path now 301s to
    // /commercial-pilot-license-salary. See next.config.js.
    // id 6 ("How to Become a Pilot After 12th Science") is intentionally absent
    // from this grid. It is canonicalised and noindexed to
    // /how-to-become-a-pilot-after-12th in pages/blogs/[id].jsx, so surfacing
    // it here would advertise a page we are asking search engines to ignore.
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
        slug: 'cpl-training-india-vs-abroad',
        title: 'CPL Training India vs Abroad 2026',
        excerpt: 'A course abroad ends with that country\u2019s licence, not a DGCA one. What genuinely differs, the conversion DGCA actually requires \u2014 two written papers instead of five, a skill test in India, a radio certificate and a currency rule \u2014 and the question worth asking either way.',
        category: 'Pilot training abroad',
        readTime: '9 min',
        date: 'Sep 30, 2026',
        image: { src: '/blog/cpl-training-india-vs-abroad/hero-two-routes.webp', width: 1200, height: 630, promptId: '83' },
    },
    {
        slug: 'dgca-computer-number-rejected-reasons',
        title: 'Why a DGCA Computer Number Application Gets Rejected — and How to Avoid It',
        excerpt: "Partial versus complete rejection, the three-chance rule, and the name, date-of-birth and upload mismatches DGCA's own rejection list is built around — so you can check your documents before you submit.",
        category: 'DGCA exams',
        readTime: '6 min',
        date: 'Sep 29, 2026',
        image: { src: '/blog/dgca-computer-number-rejected/hero-mismatched-forms.webp', width: 1200, height: 630, promptId: '79' },
    },
    {
        slug: 'how-to-become-a-flight-dispatcher-in-india',
        title: 'How to Become a Flight Dispatcher in India: DGCA FDEG Eligibility Explained',
        excerpt: "A Flight Dispatcher is a separate DGCA flight-crew licence, not an airline job title — age, education and registration requirements from the same Civil Aviation Requirement that governs pilot examinations, compared side by side with a CPL and an AME licence.",
        category: 'Aviation careers',
        readTime: '8 min',
        date: 'Sep 28, 2026',
        image: { src: '/blog/flight-dispatcher-india/hero-dispatcher-and-captain.webp', width: 1200, height: 630, promptId: '77' },
    },
    {
        slug: 'ppl-physics-maths-requirement-india',
        title: "Do You Need Physics and Maths for a PPL in India? What DGCA's Pariksha Rules Say",
        excerpt: "DGCA's Pariksha rules state the Physics-and-Mathematics condition for every flight crew category except one: PPL, which needs only a Class 10 pass. What that means for a standalone Private Pilot Licence, and why it doesn't remove the requirement once a CPL is the goal.",
        category: 'Pilot eligibility',
        readTime: '7 min',
        date: 'Sep 27, 2026',
        image: { src: '/blog/ppl-physics-maths-requirement/hero-class-ten-small-aircraft.webp', width: 1200, height: 630, promptId: '74' },
    },
    {
        slug: 'igrua-admission-eligibility-fees',
        title: 'IGRUA Admission: Eligibility, Selection Process and Fees Explained',
        excerpt: "What India's only government-run flying academy actually asks of an applicant: the three-stage merit selection, the eligibility DGCA already sets for every CPL candidate, and what the published course fee covers that a private quote usually does not.",
        category: 'Flying school selection',
        readTime: '9 min',
        date: 'Sep 26, 2026',
        image: { src: '/blog/igrua-admission-eligibility-fees/hero-single-gate-many-aircraft.webp', width: 1200, height: 630, promptId: '72' },
    },
    {
        slug: 'pilot-shortage-in-india',
        title: "Is There a Pilot Shortage in India? What the Government's Own Numbers Say",
        excerpt: "The Ministry of Civil Aviation's own Parliament answer: no shortage of pilots overall, only of commanders on certain aircraft types. DGCA's CPL-issuance figures, and what the real bottleneck means for anyone deciding whether to train.",
        category: 'Pilot career guide',
        readTime: '8 min',
        date: 'Sep 25, 2026',
        image: { src: '/blog/pilot-shortage-in-india/hero-many-aircraft-one-riser.webp', width: 1200, height: 630, promptId: '69' },
    },
    {
        slug: 'do-you-need-ppl-before-cpl-in-india',
        title: 'Do You Need a PPL Before a CPL in India? What DGCA Actually Requires',
        excerpt: "DGCA's own eGCA prerequisites for a CPL application never mention a held Private Pilot Licence. Why most flying schools still route students through PPL-level flying anyway, and when a standalone PPL genuinely makes sense.",
        category: 'Pilot eligibility',
        readTime: '8 min',
        date: 'Sep 24, 2026',
        image: { src: '/blog/ppl-before-cpl-india/hero-one-runway-one-checkpoint.webp', width: 1200, height: 630, promptId: '66' },
    },
    {
        slug: 'cpl-pilot-in-command-hours-requirement-india',
        title: 'Pilot-in-Command Hours for a CPL in India: The 100-Hour Requirement Explained',
        excerpt: 'The largest of the four CPL_HOURS components: what pilot-in-command time actually means, the 15-hour recency condition in the six months before applying, and why cross-country and night hours count toward this total rather than sitting apart from it.',
        category: 'CPL flying hours',
        readTime: '8 min',
        date: 'Sep 23, 2026',
        image: { src: '/blog/cpl-pilot-in-command-hours/hero-solo-cockpit.webp', width: 1200, height: 630, promptId: '64' },
    },
    {
        slug: 'foreign-national-nri-pilot-training-india',
        title: 'Can a Foreign National or NRI Train to Become a Pilot in India?',
        excerpt: "DGCA's Pariksha portal accepts foreign nationals for CPL training, but with extra steps an Indian candidate never sees: a passport, an Indian mobile number and a security clearance. Why an NRI's Indian passport keeps them on the ordinary route instead.",
        category: 'Pilot eligibility',
        readTime: '9 min',
        date: 'Sep 22, 2026',
        image: { src: '/blog/foreign-national-nri-pilot-training-india/hero-passport-and-flight-log.webp', width: 1200, height: 630, promptId: '61' },
    },
    {
        slug: 'pilot-salary-in-india',
        title: 'Pilot Salary in India: How to Read a Pay Figure Before You Fund Training',
        excerpt: 'No Indian airline publishes a pilot pay scale. How to read the salary figures families meet, what DGCA does publish, what to check in a real offer, and how to plan training money from the side you can verify.',
        category: 'Pilot career guide',
        readTime: '8 min',
        date: 'Sep 5, 2026',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: /salary.webp printed unsourced pay bands beside airline logos.
    },
    {
        slug: 'mcc-training-for-pilots-in-india',
        title: 'Multi-Crew Cooperation (MCC) Training in India: What It Is and Why CPL Holders Need It',
        excerpt: 'MCC teaches the two-pilot working method airline flight decks run on — task-sharing, monitoring and CRM. How it differs from a type rating and an ATPL, what it costs, and when to take it.',
        category: 'Pilot career guide',
        readTime: '9 min',
        date: 'Sep 5, 2026',
        image: { src: '/blog/mcc-training/hero-two-pilot-crew.webp', width: 1200, height: 630, promptId: '40' },
    },
    {
        slug: 'cpl-vs-atpl-difference-india',
        title: "CPL vs ATPL: What's the Difference and Which Licence Do You Need?",
        excerpt: 'A Commercial Pilot Licence qualifies you to be paid to fly and is what most airline pilots start with. An Airline Transport Pilot Licence is required for command. Age, prerequisites and why you cannot skip straight to ATPL.',
        category: 'Pilot licence guide',
        readTime: '8 min',
        date: 'Sep 4, 2026',
        image: { src: '/blog/cpl-vs-atpl/hero-two-cockpit-seats.webp', width: 1200, height: 630, promptId: '38' },
    },
    {
        slug: 'type-rating-for-pilots-in-india',
        title: 'Type Rating for Pilots in India: What It Is and How CPL Holders Get One',
        excerpt: 'A type rating is a separate, aircraft-specific qualification a CPL does not include. Which aircraft need one, the prerequisites, how DGCA-approved TRTO training works, and airline-sponsored versus self-sponsored routes.',
        category: 'Pilot career guide',
        readTime: '9 min',
        date: 'Sep 3, 2026',
        image: { src: '/blog/type-rating/hero-type-rating-simulator.webp', width: 1200, height: 630, promptId: '36' },
    },
    {
        slug: 'become-pilot-without-physics-and-maths-class-12',
        title: 'How to Become a Pilot in India Without Physics and Maths in Class 12',
        excerpt: 'Commerce and Biology stream students are not shut out. How the NIOS bridge route for Physics and Mathematics actually works, what it adds to your timeline, and the mistakes that cost a training cycle.',
        category: 'Pilot eligibility',
        readTime: '8 min',
        date: 'Sep 2, 2026',
        image: { src: '/blog/become-pilot-without-physics-maths/hero-two-paths-converge.webp', width: 1200, height: 630, promptId: '34' },
    },
    {
        slug: 'dgca-ground-school-guide',
        title: 'DGCA Ground School: The Complete Guide to Clearing the Papers (2026)',
        excerpt: 'The five written papers subject by subject with honest difficulty ratings, where RTR (A) actually sits, why attempting all five in one cycle backfires, a six-month study plan, and what to do after a failed paper.',
        category: 'DGCA ground school',
        readTime: '13 min',
        date: 'Aug 26, 2026',
        image: { src: '/blog/dgca-ground-school/hero-ground-school.webp', width: 1200, height: 630, promptId: '31' },
    },
    {
        slug: 'best-flying-school-in-india',
        title: 'Best Flying School in India: How to Choose One (2026)',
        excerpt: 'Every credible school is DGCA, so approval cannot be your deciding factor. What separates them: fleet-to-student ratio, daily serviceability, instructor turnover, weather losses at that base — and the eight questions that get you those numbers.',
        category: 'Flying school selection',
        readTime: '13 min',
        date: 'Aug 26, 2026',
        image: { src: '/blog/best-flying-school/hero-school-comparison.webp', width: 1200, height: 630, promptId: '28' },
    },
    {
        slug: 'pilot-training-cost-in-india',
        title: 'Pilot Training Cost in India: Complete Breakdown for 2026',
        excerpt: 'Every line, from ground school and examination fees to the flying phase, ratings, and living costs — plus the seven triggers that push a budget past its quote and the questions that expose an understated fee.',
        category: 'Pilot training cost',
        readTime: '12 min',
        date: 'Aug 26, 2026',
        image: { src: '/blog/pilot-training-cost/hero-cost-breakdown.webp', width: 1200, height: 630, promptId: '24' },
    },
    {
        slug: 'flight-school-prerequisites-admission-guide',
        title: 'Flight School Prerequisites in India (2027): What to Have Ready Before Admission',
        excerpt: "Subjects, the Class 1 medical, the DGCA computer number and the documents, in the order to complete them before any flying school deposit, with the Pariksha rules that cause most rejections.",
        category: 'Flight school admission',
        readTime: '10 min',
        date: 'Aug 26, 2026',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: it showed a WeOne-branded aircraft, implying a fleet we do not operate.
    },
    {
        slug: 'commercial-pilot-training-programs-complete-guide',
        title: 'Commercial Pilot Training Programmes in India (2027): How to Compare One',
        excerpt: "What a complete CPL programme includes, the four kinds on offer, how to check a school on DGCA's approved list and ranking, and the questions that make two quotes comparable.",
        category: 'Commercial pilot training',
        readTime: '11 min',
        date: 'Aug 26, 2026',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: it showed WeOne-branded aircraft and a flight academy we do not operate.
    },
    {
        slug: 'what-is-pilot-training-complete-guide',
        title: 'What Is Pilot Training? Licences, PPL vs CPL and How Training Works in India (2027)',
        excerpt: "The four licences from SPL to ATPL, PPL against CPL, the ground half and the flying half, who is eligible, and what can honestly be said about duration and cost, all from Schedule II and DGCA's CARs.",
        category: 'Pilot training guide',
        readTime: '12 min',
        date: 'Aug 26, 2026',
        updated: 'Oct 8, 2026',
        image: { src: '/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp', width: 1200, height: 630, promptId: '1' },
    },
    {
        slug: 'how-to-become-an-airline-pilot-in-india',
        title: 'How to Become an Airline Pilot in India (2027): From Class 12 to the Right Seat',
        excerpt: "The DGCA licence requirements in the order to tackle them, then what airlines add after the CPL: selection, cadet criteria, type training, duty-time limits and the government's own words on pilot supply.",
        category: 'Pilot career guide',
        readTime: '12 min',
        date: 'Sep 1, 2026',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: its baked-in text contradicted the rewritten post.
    },
    {
        slug: 'dgca-exam-guide',
        title: 'DGCA Exam Guide: Papers, Pass Mark, Fees, Sessions and How to Book',
        excerpt: 'The five CPL papers, the 70% pass mark in each with no aggregate, the fee per paper, the session calendar, the booking rules and the five-year life of a pass, all from the DGCA CAR and the Pariksha portal.',
        category: 'DGCA exams',
        readTime: '9 min',
        date: 'Jan 2, 2025',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: its baked-in text contradicted the rewritten post.
    },
    {
        slug: 'aviation-course-after-12th',
        title: 'Aviation Courses After 12th in India: Which Route Needs What',
        excerpt: 'Commercial pilot, private pilot, AME, flight dispatcher and Air Force entry, side by side: the Class 12 subjects, minimum age and medical each route needs, and what to do in the first month after results.',
        category: 'After 12th',
        readTime: '9 min',
        date: 'Jan 2, 2025',
        updated: 'Oct 8, 2026',
        // image removed 2026-10-08: its baked-in text contradicted the rewritten post.
    },
    {
        slug: 'convert-foreign-pilot-licence-to-dgca-india',
        title: 'How to Convert a Foreign Pilot Licence to an Indian DGCA Licence',
        excerpt: 'A foreign CPL or ATPL does not let you fly commercially in India. The written papers, the currency test on your rating, the skill test and the RTR(A) step most guides leave out — from CAR Section 7 Series G.',
        category: 'Licensing',
        readTime: '9 min',
        date: 'Sep 19, 2026',
        image: { src: '/blog/convert-foreign-pilot-licence-to-dgca-india/hero-two-licences-one-desk.webp', width: 1200, height: 630, promptId: '59' },
    },
    {
        slug: 'change-details-dgca-computer-number-profile',
        title: 'How to Change Your Details on a DGCA Computer Number Profile',
        excerpt: 'Which details on your Pariksha profile you can change yourself, which need Central Examination Organisation approval, and how the Profile Update Form works.',
        category: 'DGCA exams',
        readTime: '5 min',
        date: 'Sep 30, 2026',
        image: { src: '/blog/change-details-dgca-computer-number-profile/hero-two-lanes.webp', width: 1200, height: 630, promptId: '81' },
    },
    {
        slug: 'dgca-exam-fee-refund-failed-payment',
        title: 'DGCA Exam Fee Refund: What Happens If a Payment Fails or You Miss the Session',
        excerpt: 'DGCA refunds an examination fee only when the Bharatkosh payment succeeded but no service was delivered. What qualifies, how to claim it, and why a missed session is not refunded.',
        category: 'DGCA exams',
        readTime: '5 min',
        date: 'Oct 2, 2026',
        image: { src: '/blog/dgca-exam-fee-refund-failed-payment/hero-payment-fork.webp', width: 1200, height: 630, promptId: '84' },
    },
    {
        slug: 'dgca-exam-pass-validity-cpl-five-years',
        title: 'How Long Does a DGCA Exam Pass Stay Valid? The 5-Year Rule for CPL Papers',
        excerpt: 'A cleared DGCA theory paper expires. Five years for a CPL or ATPL, two and a half for other licences, counted back from your application. How to plan the exams around your flying.',
        category: 'DGCA exams',
        readTime: '6 min',
        date: 'Oct 3, 2026',
        image: { src: '/blog/dgca-exam-pass-validity-cpl-five-years/hero-five-year-window.webp', width: 1200, height: 630, promptId: '87' },
    },
    {
        slug: 'dgca-regular-vs-on-demand-exam-session',
        title: 'Regular vs On-Demand DGCA Exam Session: Which Should You Book?',
        excerpt: 'DGCA lists four regular and eight on-demand exam sessions for 2026, and the on-demand fee is double. What each costs, the gaps between sessions, and when paying more is worth it.',
        category: 'DGCA exams',
        readTime: '6 min',
        date: 'Oct 6, 2026',
        image: { src: '/blog/dgca-regular-vs-on-demand-exam-session/hero-two-session-lanes.webp', width: 1200, height: 630, promptId: '90' },
    },
    {
        slug: 'board-verification-certificate-dgca-computer-number',
        title: 'Board Verification Certificate for a DGCA Computer Number: Who Needs It and How It Works',
        excerpt: 'The BVC is the document that trips up manual computer number applications. Who needs it, the three ways it is addressed, and when DigiLocker waives it.',
        category: 'DGCA computer number',
        readTime: '6 min',
        date: 'Oct 7, 2026',
        image: { src: '/blog/board-verification-certificate-dgca-computer-number/hero-bvc-document-trail.webp', width: 1200, height: 630, promptId: '93' },
    },
    {
        slug: 'dgca-recommended-books-cpl-exams',
        title: 'Which Books Does DGCA Recommend for the CPL Exams? Reading the Official List',
        excerpt: "DGCA publishes its own study-material list for the CPL written exams. What it names under each heading, where it does not line up with the five papers, and what it leaves out.",
        category: 'DGCA exams',
        readTime: '7 min',
        date: 'Oct 8, 2026',
        image: { src: '/blog/dgca-recommended-books-cpl-exams/hero-book-stack-five-papers.webp', width: 1200, height: 630, promptId: '96' },
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

/*
 * `mongoBlogs = []` default added 2026-09-15. getStaticProps always supplies
 * the prop today, but the component threw "mongoBlogs is not iterable" when
 * rendered without it — which is what happens on any path that renders this
 * page outside the static build, and what the render smoke test hits. A
 * missing database should degrade to the file-based posts, not a blank page.
 */
/*
 * Newest first, by the later of publication and last update. Added 2026-10-08:
 * the array is appended to by the daily routine, so the grid used to show the
 * oldest guides first and each new post at the very bottom. `updated` is
 * optional on an entry; when present it must equal the post's DATE_MODIFIED.
 */
const byRecency = (p) => new Date(p.updated || p.date).getTime() || 0;
const sortedGuides = [...guidePosts].sort((a, b) => byRecency(b) - byRecency(a));

export default function BlogsIndex({ mongoBlogs = [] }) {
    const allBlogs = [...mongoBlogs, ...hardcodedBlogs];

    return (
        <Layout title="Pilot Training Blog: DGCA Exams, CPL and Careers" description="Guides for students starting pilot training in India: CPL eligibility, DGCA exams, computer number, medicals, costs and flying schools, checked against DGCA.">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-av-blue to-av-navy pt-32 pb-16 px-4 text-center text-white">
                <h1 className="font-montserrat text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-lg">Aviation Blogs</h1>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Expert guides on pilot training, DGCA exams, careers, and everything aviation.
                </p>
                <p className="text-white/70 text-sm max-w-2xl mx-auto mt-3">
                    If you are comparing pilot training options across India and want exam-centre guidance, simulator providers, and travel tips, see our India guide: <Link href="/pilot-training-in-india" className="font-semibold underline">Pilot Training in India</Link>.
                </p>
            </div>

            {/* In-depth guides — file-based posts, listed first */}
            <section className="pt-16 px-4 max-w-7xl mx-auto" aria-labelledby="in-depth-guides">
                <div className="flex items-baseline justify-between gap-4 mb-10">
                    <h2 id="in-depth-guides" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue drop-shadow">
                        In-depth guides
                    </h2>
                    <p className="text-sm text-gray-500">Long-form, sourced against DGCA rules</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedGuides.map((post) => (
                        <Link
                            href={`/blogs/${post.slug}`}
                            key={post.slug}
                            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden border-b border-gray-200 bg-white">
                                {post.image ? (
                                    <NextImage
                                        src={post.image.src}
                                        alt={post.title}
                                        width={post.image.width}
                                        height={post.image.height}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    /*
                                     * No image: a type-only tile. Used where the old hero image
                                     * carried text that contradicts the rewritten post (2026-10-08).
                                     */
                                    <div className="w-full h-full bg-gradient-to-br from-av-blue to-av-navy flex items-end p-5" aria-hidden="true">
                                        <p className="font-montserrat text-white/90 text-lg font-bold leading-snug line-clamp-3">{post.title}</p>
                                    </div>
                                )}
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
                                    <span>&#128197; {post.updated ? `Updated ${post.updated}` : post.date}</span>
                                    <span>&#9201; {post.readTime} read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 px-4 max-w-7xl mx-auto" aria-labelledby="latest-articles">
                <h2 id="latest-articles" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue drop-shadow mb-10">
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