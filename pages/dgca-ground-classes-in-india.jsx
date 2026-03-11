import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Page Data ───────────────────────────────────────────────────────────────

const heroSlides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
        tag: 'Pan-India DGCA Coaching',
        title: 'DGCA Ground Classes',
        highlight: 'in India',
        sub: "From Kashmir to Kanyakumari — India's #1 DGCA Ground Classes with 100% exam results, every year",
    },
];

const quickStats = [
    { val: '3,000+', label: 'Pilots Trained Across India' },
    { val: '6 Months', label: 'Full DGCA Syllabus' },
    { val: '28 States', label: 'Pan-India Reach' },
    { val: '100%', label: 'DGCA Pass Rate' },
    { val: '25%', label: 'Scholarship for All' },
    { val: '6 Papers', label: 'DGCA India Exam' },
];

const subjects = [
    {
        num: '01', icon: '🗺️', title: 'Air Navigation',
        short: 'Navigate aircraft across Indian and international airspace using maps, GPS, and instruments.',
        detail: 'Covers basic navigation, map reading, compass errors, radio aids (VOR, NDB, DME), flight planning, and Indian airspace classifications as defined by DGCA India.',
    },
    {
        num: '02', icon: '⛅', title: 'Aviation Meteorology',
        short: "Understand Indian weather patterns — monsoon, fog over IGI, western disturbances — and their effect on flight.",
        detail: 'Atmospheric structure, weather systems, METAR/TAF interpretation with special focus on India-specific phenomena: monsoon turbulence, seasonal fog, and tropical cyclones.',
    },
    {
        num: '03', icon: '📋', title: 'Air Regulations',
        short: "Master DGCA's Civil Aviation Requirements (CARs) and ICAO rules that govern every pilot in India.",
        detail: 'Indian aviation laws, DGCA licensing requirements, CARs, rules of the air, and duty/flight time limits as mandated for pilots operating in Indian airspace.',
    },
    {
        num: '04', icon: '⚙️', title: 'Technical General',
        short: 'Learn the science of flight — aerodynamics, engines, hydraulics, and instruments — as per DGCA India syllabus.',
        detail: 'Aerodynamics, piston and turbine engines, aircraft structures, electrical/hydraulic systems, instruments, and fire protection — fully aligned to DGCA India exam pattern.',
    },
    {
        num: '05', icon: '🛩️', title: 'Technical Specific',
        short: 'Master the exact aircraft flown at DGCA-approved flying schools across India (e.g., Cessna 172).',
        detail: 'Aircraft systems, limitations, performance, normal and emergency procedures for the specific type used at DGCA-approved Indian flying academies.',
    },
    {
        num: '06', icon: '📻', title: 'Radio Telephony (RTR)',
        short: 'Communicate with Indian ATC using correct ICAO phraseology and Indian radio procedures.',
        detail: 'Standard RT phraseology, Indian ATC procedures, emergency communication, and mock RT exercises for operating in Indian airspace.',
    },
];

const statesServed = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal',
    'Indore', 'Nagpur', 'Surat', 'Kochi', 'Coimbatore', 'Patna',
    'Ranchi', 'Bhubaneswar', 'Guwahati', 'Dehradun', 'Shimla', 'Jammu',
];

const eligibility = [
    {
        icon: '🎓',
        title: 'Class 12 with Physics & Maths',
        desc: 'From any CBSE, ICSE, or state board recognized in India. Students without these subjects can qualify via NIOS — a DGCA-accepted alternative.',
    },
    {
        icon: '🎂',
        title: 'Age: 17+ Years',
        desc: 'Minimum 17 years to join ground classes. 18+ years required to apply for DGCA India CPL.',
    },
    {
        icon: '🩺',
        title: 'DGCA Class 2 Medical',
        desc: 'Must be obtained from a DGCA-approved Aviation Medical Examiner (AME) listed on the official DGCA India website.',
    },
    {
        icon: '🗣️',
        title: 'English Proficiency',
        desc: 'All DGCA India exams and ATC communication are in English. Fluency in reading, writing, and speaking is mandatory.',
    },
    {
        icon: '🔢',
        title: 'DGCA Computer Number',
        desc: 'A unique DGCA-issued ID required to register for any DGCA exam in India. We help every student obtain this.',
    },
];

const whyUs = [
    {
        icon: '🏆',
        title: 'Only Institute in India with 100% Results',
        desc: "We One Aviation Academy is the only DGCA coaching institute in India delivering 100% pass results every year. Most students clear all 6 papers on the first attempt.",
    },
    {
        icon: '👨‍✈️',
        title: 'Instructors Who Fly Indian Airlines',
        desc: "Every teacher is a licensed commercial pilot flying Indian routes. They share real-world experience and give you the exact roadmap for a pilot career in India.",
    },
    {
        icon: '🌐',
        title: 'Online for All 28 Indian States',
        desc: 'Live online batches accessible from any city, town, or village in India. No need to relocate — study from home and clear your DGCA exams.',
    },
    {
        icon: '💰',
        title: '25% Scholarship — Every Indian Student',
        desc: 'A flat 25% fee scholarship is granted to every student enrolled in our DGCA Ground Classes in India — no conditions, no competition.',
    },
    {
        icon: '📚',
        title: 'Free DGCA Books, Notes & Mock Papers',
        desc: 'All study material aligned to the DGCA India syllabus — textbooks, practice questions, and mock test papers — provided free of cost.',
    },
    {
        icon: '🔁',
        title: 'Free Repeat Classes Until You Clear',
        desc: "If you don't clear a DGCA paper, we give you free repeat classes until you do. No extra fees, ever — because your success is our guarantee.",
    },
    {
        icon: '📝',
        title: 'Complete DGCA Paperwork Support',
        desc: 'From DGCA computer number registration and medical coordination to exam form filling — we handle all the bureaucracy so you can focus on studying.',
    },
    {
        icon: '✈️',
        title: '100% Placement Support for Indian Airlines',
        desc: 'From your first DGCA paper to your first job at IndiGo, Air India, or Akasa Air — our placement team supports you all the way.',
    },
];

const indianAirlines = [
    { name: 'IndiGo', routes: '100+ destinations', fact: "India's largest airline by market share" },
    { name: 'Air India', routes: '100+ destinations', fact: 'National carrier, now Tata-owned & expanding fast' },
    { name: 'Akasa Air', routes: '25+ destinations', fact: 'India\'s newest airline, aggressively hiring pilots' },
    { name: 'SpiceJet', routes: '60+ destinations', fact: 'Budget carrier with large domestic network' },
    { name: 'Vistara', routes: '50+ destinations', fact: 'Premium carrier, Tata-Singapore Airlines JV' },
    { name: 'Air Asia India', routes: '30+ destinations', fact: 'Ultra-low-cost domestic carrier' },
];

const flyingSchools = [
    { name: 'IGRUA', location: 'Rae Bareli, UP', type: 'Government' },
    { name: 'Bombay Flying Club', location: 'Mumbai, Maharashtra', type: 'Private' },
    { name: 'MP Flying Club', location: 'Bhopal, MP', type: 'State Govt.' },
    { name: 'Chimes Aviation Academy', location: 'Gondia, Maharashtra', type: 'Private' },
    { name: 'GATI', location: 'Bhubaneswar, Odisha', type: 'Government' },
    { name: 'CAE Oxford Aviation', location: 'Pan India', type: 'International' },
];

const examCenters = [
    'New Delhi (IGI)', 'Mumbai', 'Hyderabad', 'Kolkata', 'Chennai',
    'Bangalore', 'Ahmedabad', 'Nagpur', 'Bhubaneswar', 'Guwahati',
];

const process = [
    { step: '01', title: 'Enroll in DGCA Ground Classes', desc: 'Join We One Aviation Academy — online (any Indian state) or offline (Delhi). Get your batch schedule and study material.' },
    { step: '02', title: 'Get Your DGCA Computer Number', desc: 'We help you register with DGCA India to obtain the unique Computer Number required to appear in any DGCA exam.' },
    { step: '03', title: 'Complete the 6-Month India Syllabus', desc: 'Cover all 6 DGCA subjects thoroughly under active commercial pilots. Practice with DGCA India past papers.' },
    { step: '04', title: 'Appear at DGCA Exam Centre', desc: 'Sit for DGCA exams at the nearest designated centre in your Indian state — Delhi, Mumbai, Chennai, Kolkata & more.' },
    { step: '05', title: 'Clear All 6 Papers & Get CPL', desc: 'After clearing all DGCA papers and completing flying hours at a DGCA-approved school, apply for your CPL from DGCA India.' },
];

const faqs = [
    {
        q: 'Can students from any state in India join DGCA Ground Classes?',
        a: 'Yes! We One Aviation Academy offers live online classes for students from every Indian state and union territory. Delhi students can also attend our offline centre.',
    },
    {
        q: 'Is the DGCA syllabus the same across all of India?',
        a: 'Yes. The DGCA syllabus — all 6 papers — is centrally set by the Directorate General of Civil Aviation, Government of India. It is uniform at every approved institute across the country.',
    },
    {
        q: 'Where are DGCA exams conducted in India?',
        a: 'DGCA India conducts theory exams at designated centres in Delhi, Mumbai, Hyderabad, Kolkata, Chennai, Bangalore, Ahmedabad, Nagpur, Bhubaneswar, and Guwahati. We assist all students with centre selection and registration.',
    },
    {
        q: 'What is the fee for DGCA Ground Classes in India?',
        a: 'Fees vary by institute. At We One Aviation, we offer competitive fees with a 25% scholarship for every enrolled Indian student. Contact us for the latest fee structure and EMI options.',
    },
    {
        q: 'Can I do DGCA Ground Classes online from anywhere in India?',
        a: 'Absolutely. Our live online batches are accessible from any corner of India. All you need is a smartphone or laptop and a stable internet connection.',
    },
    {
        q: 'How many attempts are allowed for DGCA exams in India?',
        a: 'DGCA India allows multiple attempts to clear each paper. There is no overall attempt limit, but papers must be cleared within the validity period of your Student Pilot License (SPL). We provide free repeat classes for students who need extra attempts.',
    },
    {
        q: 'Is a DGCA CPL valid only in India?',
        a: 'A DGCA India CPL allows you to fly in India. For international operations, pilots typically convert to an ICAO-aligned license. However, clearing DGCA exams is the first step regardless of your long-term goal.',
    },
];

const blogs = [
    { title: 'Pilot Training in Delhi', date: 'February 13, 2025', desc: 'Complete guide to pilot training in Delhi — DGCA exam, simulator practice, PPL & CPL course fees.', href: '/blog/pilot-training-delhi' },
    { title: 'Private Pilot License (PPL) Course Fees in India', date: 'February 10, 2025', desc: 'PPL Course Fees 2025 — everything an Indian student needs to know before enrolling.', href: '/blog/ppl-course-fees' },
    { title: 'Full Form of CPL | Commercial Pilot License in India', date: 'January 28, 2025', desc: 'What CPL means in Indian aviation, eligibility, DGCA requirements and career scope.', href: '/blog/cpl-full-form' },
    { title: 'Master the DGCA CPL Exam: Complete Guide for Indian Students', date: 'January 21, 2025', desc: 'Complete DGCA CPL exam guide — syllabus, subjects, exam centres, and success tips for India.', href: '/blog/dgca-exam-guide' },
    { title: 'Aviation Course After 12th in India — Fees & Admission Guide', date: 'January 2, 2025', desc: 'All aviation courses available in India after 12th — fees, eligibility, and career paths explained.', href: '/blog/aviation-course-after-12th' },
    { title: 'Best Aviation Academy in India', date: 'December 12, 2024', desc: 'How We One Aviation Academy became India\'s most trusted DGCA Ground Classes institute.', href: '/blog/aviation-academy' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DGCAGroundClassesInIndia() {
    return (
        <Layout
            title="DGCA Ground Classes in India | #1 Pilot Coaching — All States | WeOne Aviation"
            description="Best DGCA Ground Classes in India — 100% pass rate, 3000+ pilots trained across all 28 states. Online & offline CPL ground coaching covering all 6 DGCA subjects. 25% scholarship available. Join WeOne Aviation Academy."
        >
            <HeroSlider customSlides={heroSlides} />

            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

                    {/* ── Main Content ── */}
                    <div className="lg:col-span-2 space-y-14">
                        <ScrollReveal>

                            {/* ── Overview ── */}
                            <div>
                                <div className="section-tag">Pan-India DGCA Coaching</div>
                                <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                    DGCA Ground Classes in India
                                </h1>
                                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                    Looking for the best <strong>DGCA Ground Classes in India</strong>? We One Aviation Academy is India's #1 DGCA coaching institute — delivering <strong>100% exam results every year</strong> and having trained over <strong>3,000 pilots from all 28 states and union territories</strong> of India.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                    DGCA Ground Classes in India are the mandatory theory coaching every student pilot must complete before appearing in the 6 examinations conducted by the <strong>Directorate General of Civil Aviation (DGCA), Ministry of Civil Aviation, Government of India</strong>. Clearing these 6 papers is required to obtain a Commercial Pilot License (CPL) in India — there are no shortcuts.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                    Whether you are in <strong>Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata</strong>, or any other city or village in India — We One Aviation brings DGCA Ground Classes to you through our live online batches and our offline centre in Delhi.
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                                    {quickStats.map(({ val, label }) => (
                                        <div key={label} className="bg-av-light rounded-xl p-4 text-center border border-gray-100">
                                            <div className="font-montserrat font-extrabold text-av-blue text-lg">{val}</div>
                                            <div className="text-gray-500 text-xs mt-1">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── What is DGCA India ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Is DGCA? — India's Aviation Authority</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    The <strong>Directorate General of Civil Aviation (DGCA)</strong> is the central regulatory body for civil aviation in India, functioning under the Ministry of Civil Aviation, Government of India. It is headquartered in New Delhi and has regional offices across the country.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    DGCA is India's equivalent of the FAA (USA) or EASA (Europe). Every pilot who flies commercially in India must hold a <strong>DGCA-issued CPL</strong>, and clearing the DGCA Ground Exams is the mandatory first step in that journey.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                                    {[
                                        { icon: '📜', t: 'Issues all pilot licenses in India', d: 'SPL, PPL, CPL — issued only by DGCA India after clearing all eligibility criteria.' },
                                        { icon: '🛡️', t: 'Regulates aviation safety across India', d: 'Sets safety standards for all aircraft, airports, airlines, and flying schools in India.' },
                                        { icon: '🏫', t: 'Approves flying schools in India', d: 'Only DGCA-approved academies can legally train pilots in India.' },
                                        { icon: '📝', t: 'Conducts DGCA Ground Exams', d: 'Organizes theory exams at designated centres in Delhi, Mumbai, Hyderabad, Chennai & more.' },
                                    ].map(({ icon, t, d }) => (
                                        <div key={t} className="flex gap-3 items-start bg-av-light rounded-xl p-4">
                                            <span className="text-2xl flex-shrink-0">{icon}</span>
                                            <div>
                                                <p className="font-semibold text-av-blue text-xs mb-1">{t}</p>
                                                <p className="text-gray-500 text-xs leading-relaxed">{d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── How to Become a Pilot in India — Process ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">How to Become a Pilot in India — Step-by-Step</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    DGCA Ground Classes in India are Step 1. Here is the complete roadmap from student to commercial pilot in India:
                                </p>
                                <div className="space-y-4">
                                    {process.map(({ step, title, desc }) => (
                                        <div key={step} className="flex gap-4 items-start">
                                            <div className="flex-shrink-0 w-10 h-10 bg-av-blue rounded-xl flex items-center justify-center text-white text-xs font-bold font-montserrat">{step}</div>
                                            <div className="border-b border-gray-100 pb-4 flex-1">
                                                <p className="font-semibold text-av-blue text-sm mb-1">{title}</p>
                                                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── 6 DGCA Subjects ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">6 DGCA Subjects — India Exam Pattern</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    The DGCA India exam consists of <strong>6 compulsory theory papers</strong>. All 6 must be cleared to be eligible for a CPL in India. Our DGCA Ground Classes in India cover every subject in full depth.
                                </p>
                                <div className="space-y-4">
                                    {subjects.map((s) => (
                                        <div key={s.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <div className="flex items-center gap-3 bg-av-blue p-4">
                                                <span className="font-montserrat font-black text-white/30 text-lg leading-none">{s.num}</span>
                                                <span className="text-xl">{s.icon}</span>
                                                <h3 className="font-montserrat font-bold text-white text-sm">{s.title}</h3>
                                            </div>
                                            <div className="p-4 bg-white space-y-2">
                                                <p className="text-gray-600 text-xs font-medium">{s.short}</p>
                                                <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-100 pt-2">{s.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── DGCA Exam Centres in India ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA Exam Centres Across India</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    DGCA India conducts theory examinations at designated centres across the country. Students can choose the centre nearest to them in their Indian state. We assist all our students with exam registration and centre selection.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {examCenters.map((c) => (
                                        <span key={c} className="bg-av-blue text-white text-xs px-3 py-1.5 rounded-full font-medium">{c}</span>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-xs italic">* DGCA India periodically updates examination centre lists. We help every student confirm the latest centre for their state.</p>
                            </div>

                            {/* ── Eligibility ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">Eligibility for DGCA Ground Classes in India</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    To join DGCA Ground Classes in India and work toward a Commercial Pilot License (CPL) from DGCA India, you must meet these requirements:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {eligibility.map(({ icon, title, desc }) => (
                                        <div key={title} className="rounded-xl border border-gray-100 overflow-hidden">
                                            <div className="bg-av-blue p-4 flex items-center gap-3">
                                                <span className="text-xl">{icon}</span>
                                                <h3 className="font-montserrat font-bold text-white text-sm">{title}</h3>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mt-5">
                                    Met all criteria? You're ready to begin. Join We One Aviation Academy — India's most trusted DGCA Ground Classes institute — and start your journey today. 🇮🇳✈️
                                </p>
                            </div>

                            {/* ── Why Choose ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">Why Choose We One Aviation for DGCA Ground Classes in India?</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    Hundreds of institutes across India offer DGCA coaching. Here is why thousands of student pilots from Delhi to Chennai, Kolkata to Ahmedabad consistently choose We One Aviation Academy:
                                </p>
                                <div className="space-y-3">
                                    {whyUs.map(({ icon, title, desc }) => (
                                        <div key={title} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-av-orange/30 transition-all">
                                            <span className="text-2xl flex-shrink-0">{icon}</span>
                                            <div>
                                                <p className="font-semibold text-av-blue text-sm mb-1">{title}</p>
                                                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── DGCA-Approved Flying Schools in India ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA-Approved Flying Schools in India</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    After clearing your DGCA Ground Exams, you complete your flying hours at a DGCA-approved flying school in India or abroad. Here are some of India's top DGCA-approved flying academies:
                                </p>
                                <div className="overflow-x-auto rounded-xl border border-gray-100">
                                    <table className="w-full text-xs text-left">
                                        <thead>
                                            <tr className="bg-av-blue text-white">
                                                <th className="px-4 py-3 font-montserrat font-semibold">Flying School</th>
                                                <th className="px-4 py-3 font-montserrat font-semibold">Location in India</th>
                                                <th className="px-4 py-3 font-montserrat font-semibold">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flyingSchools.map(({ name, location, type }, i) => (
                                                <tr key={name} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                    <td className="px-4 py-3 font-medium text-av-blue">{name}</td>
                                                    <td className="px-4 py-3 text-gray-600">{location}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${type === 'Government' || type === 'State Govt.'
                                                                ? 'bg-green-100 text-green-700'
                                                                : type === 'International'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                            }`}>{type}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-gray-400 text-xs italic mt-3">* We One Aviation helps every student select the right flying school in India or abroad based on budget, location, and career goals.</p>
                            </div>

                            {/* ── Indian Airlines Hiring Pilots ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Indian Airlines Actively Hiring Pilots — Your Future Employers</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    India is the <strong>3rd largest aviation market in the world</strong> and is projected to need over <strong>10,000 new pilots in the next decade</strong>. After you clear your DGCA exams and obtain your CPL, these are the airlines that could be your employer:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                                    {indianAirlines.map(({ name, routes, fact }) => (
                                        <div key={name} className="flex gap-3 items-start border border-gray-100 rounded-xl p-4 hover:border-av-orange/30 transition-all">
                                            <span className="text-av-orange font-montserrat font-black text-lg leading-none flex-shrink-0">✈</span>
                                            <div>
                                                <p className="font-montserrat font-bold text-av-blue text-sm">{name}</p>
                                                <p className="text-gray-500 text-xs">{routes}</p>
                                                <p className="text-gray-400 text-xs mt-0.5 italic">{fact}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-av-light rounded-xl p-5">
                                    <p className="text-av-blue font-semibold text-sm mb-2">💡 Pilot Salary in India</p>
                                    <p className="text-gray-600 text-xs leading-relaxed">Starting salary for First Officers at Indian airlines ranges from <strong>₹1.5 lakh to ₹3 lakh per month</strong>. Experienced Captains earn ₹5–15 lakh per month. Your DGCA Ground Classes in India are the first investment in this career.</p>
                                </div>
                            </div>

                            {/* ── States We Serve ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA Ground Classes Available Across All of India</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    We One Aviation Academy serves aspiring pilots from every corner of India through our live online platform. No matter which state or city you are in, you can join our DGCA Ground Classes in India right from your home:
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {statesServed.map((city) => (
                                        <span key={city} className="text-xs bg-av-light border border-gray-200 text-av-blue px-3 py-1.5 rounded-full font-medium hover:border-av-orange/50 transition-all">{city}</span>
                                    ))}
                                    <span className="text-xs bg-av-orange text-white px-3 py-1.5 rounded-full font-bold">+ Every Indian State</span>
                                </div>
                                <p className="text-gray-400 text-xs italic">All you need is a smartphone or laptop and an internet connection. Our online DGCA Ground Classes cover the full India syllabus through live sessions with recorded backups.</p>
                            </div>

                            {/* ── Online vs Offline ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-5">Online vs Offline DGCA Ground Classes in India</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="rounded-2xl border-2 border-av-blue p-5">
                                        <p className="font-montserrat font-bold text-av-blue mb-4 text-sm">🏫 Offline — Delhi Centre</p>
                                        <ul className="space-y-2 text-xs text-gray-600">
                                            {[
                                                'Face-to-face interaction with instructor pilots',
                                                'Physical books, notes and lab access',
                                                'Structured daily timetable and discipline',
                                                'In-person doubt clearing sessions',
                                                'Peer learning with Delhi-based aviation aspirants',
                                            ].map((pt, i) => (
                                                <li key={i} className="flex gap-2 items-start">
                                                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>{pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-2xl border-2 border-av-orange p-5">
                                        <p className="font-montserrat font-bold text-av-orange mb-4 text-sm">💻 Online — All Indian States</p>
                                        <ul className="space-y-2 text-xs text-gray-600">
                                            {[
                                                'Join from any city, town, or state in India',
                                                'Live sessions + recorded backup access',
                                                'Flexible batch timings for Indian time zones',
                                                'Digital notes and e-books provided free',
                                                'WhatsApp group support and doubt clearing',
                                            ].map((pt, i) => (
                                                <li key={i} className="flex gap-2 items-start">
                                                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>{pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* ── CTA Banner ── */}
                            <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #003580 0%, #0a5abf 100%)' }}>
                                <div className="p-8 text-center">
                                    <div className="text-4xl mb-3">🇮🇳 ✈️</div>
                                    <h2 className="font-montserrat text-xl font-bold text-white mb-2">Start Your DGCA Journey From Anywhere in India</h2>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                                        Join 3,000+ pilots from across India who trusted We One Aviation Academy for their DGCA Ground Classes. 100% results guaranteed. 25% scholarship for every Indian student.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                            Book Free Counselling — Pan India
                                        </Link>
                                        <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                            className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                            WhatsApp Us Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* ── FAQs ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-5">FAQs — DGCA Ground Classes in India</h2>
                                <div className="space-y-3">
                                    {faqs.map(({ q, a }) => (
                                        <div key={q} className="rounded-xl border border-gray-100 overflow-hidden">
                                            <div className="bg-av-blue/5 px-5 py-4">
                                                <p className="font-semibold text-av-blue text-sm">Q: {q}</p>
                                            </div>
                                            <div className="px-5 py-4">
                                                <p className="text-gray-600 text-xs leading-relaxed">A: {a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Blogs ── */}
                            <div>
                                <h2 className="font-montserrat text-xl font-bold text-av-blue mb-5">Latest Blogs on DGCA & Pilot Training in India</h2>
                                <div className="space-y-4">
                                    {blogs.map((blog) => (
                                        <div key={blog.title} className="rounded-xl border border-gray-100 p-5 hover:border-av-orange/30 transition-all">
                                            <p className="text-gray-400 text-xs mb-1">{blog.date}</p>
                                            <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{blog.title}</h3>
                                            <p className="text-gray-500 text-xs leading-relaxed mb-2">{blog.desc}</p>
                                            <Link href={blog.href} className="text-av-orange text-xs font-semibold hover:underline">Read More →</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </ScrollReveal>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="space-y-6">

                        <ScrollReveal delay={200}>
                            <LeadForm title="Join DGCA Ground Classes in India" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-1">DGCA India Eligibility</h4>
                                <p className="text-white/50 text-xs mb-4">As per DGCA India regulations</p>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ Class 12 — Physics & Maths (any Indian board)</li>
                                    <li>✓ Age: 17+ years</li>
                                    <li>✓ DGCA Class 2 Medical (India AME)</li>
                                    <li>✓ English proficiency</li>
                                    <li>✓ DGCA Computer Number</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={350}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">DGCA Ground Classes in India:</p>
                                <div className="text-2xl font-montserrat font-black">6 Months</div>
                                <div className="text-white/70 text-xs mt-1">Full DGCA India Syllabus</div>
                                <div className="text-white/70 text-xs mt-1">25% Scholarship — All Indian Students</div>
                                <div className="text-white/70 text-xs mt-1">Online — Every Indian State</div>
                                <div className="text-white/70 text-xs mt-1">Free Books, Notes & Mock Papers</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Counselling
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="rounded-2xl border-2 border-av-blue p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">🇮🇳 Pan-India Coverage</h4>
                                <p className="text-gray-500 text-xs leading-relaxed mb-3">Online live DGCA batches for students from every Indian state:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal'].map((city) => (
                                        <span key={city} className="text-xs bg-av-light text-av-blue px-2 py-1 rounded-full font-medium">{city}</span>
                                    ))}
                                    <span className="text-xs bg-av-orange/10 text-av-orange px-2 py-1 rounded-full font-semibold">+ All States</span>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={450}>
                            <div className="rounded-2xl border border-gray-100 p-6 bg-av-light">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">📍 DGCA Exam Centres in India</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {examCenters.map((c) => (
                                        <span key={c} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">{c}</span>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-xs mt-3 italic">We help all students with exam registration at their nearest Indian centre.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="rounded-2xl border border-gray-100 p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">💰 Pilot Salary in India</h4>
                                <div className="space-y-2">
                                    {[
                                        { role: 'First Officer (New)', salary: '₹1.5–3L / month' },
                                        { role: 'Senior First Officer', salary: '₹3–6L / month' },
                                        { role: 'Captain', salary: '₹5–15L / month' },
                                    ].map(({ role, salary }) => (
                                        <div key={role} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                                            <span className="text-gray-600">{role}</span>
                                            <span className="font-bold text-av-orange">{salary}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-xs mt-3 italic">Approximate figures for Indian airlines. Your DGCA journey starts here.</p>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </section>
        </Layout>
    );
}