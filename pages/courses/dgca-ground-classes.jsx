import { useState } from 'react';
import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────
// NOTE: All body copy below is taken verbatim from DGCA_Ground_Classes.docx.
// Route paths for the "Related Pages" links are placeholders — update the
// `href` values to match your actual routes.

const coreSubjects = [
    'Air Regulations',
    'Air Navigation',
    'Aviation Meteorology',
    'Technical General',
    'Technical Specific (where applicable)',
    'Radio Telephony (RTR guidance)',
    'Performance and Flight Planning',
    'Human Factors and Aviation Safety',
];

const whyEssentialList = [
    'Build a strong understanding of aviation theory before flight training.',
    'Prepare effectively for DGCA examinations with structured guidance.',
    'Improve problem-solving and decision-making skills for real flight scenarios.',
    'Learn from experienced instructors with practical aviation knowledge.',
    'Develop confidence through mock tests, doubt-clearing sessions, and performance analysis.',
    'Stay updated with the latest DGCA regulations and examination patterns.',
    'Create a smoother transition from ground school to flying training and airline assessments.',
];

const whoShouldJoinList = [
    'Students planning to pursue a Commercial Pilot Licence (CPL).',
    'Candidates preparing for DGCA theory examinations.',
    'Future airline pilots seeking a strong academic foundation.',
    'Students enrolled in Flying Training Organizations (FTOs) who need structured theory support.',
    'Graduates looking to transition into the aviation industry.',
    'Professionals preparing for advanced pilot qualifications such as ATPL theory.',
    'Students who prefer online, offline, or hybrid aviation learning.',
];

const approachList = [
    'Experienced aviation instructors with industry expertise.',
    'Comprehensive coverage of DGCA theory subjects.',
    'Regular mock tests and performance tracking.',
    'Small batch sizes for personalized attention.',
    'Flexible online and classroom learning options.',
    'One-on-one doubt-clearing sessions.',
    'Updated study material aligned with DGCA standards.',
    'Guidance for CPL, ATPL, and airline career progression.',
];

const relatedPages = [
    { label: 'DGCA Ground Classes', href: '/dgca-ground-classes-in-india' },
    { label: 'DGCA Ground School', href: '/dgca-ground-classes-in-india' },
    { label: 'DGCA Ground Classes in India', href: '/dgca-ground-classes-in-india' },
    { label: 'DGCA Coaching', href: '/dgca-ground-classes-in-india' },
    { label: 'DGCA CPL Ground Classes', href: '/commercial-pilot-license' },
    { label: 'Pilot Ground Classes', href: '/how-to-become-a-pilot-after-12th' },
    { label: 'DGCA Exam Preparation', href: '/dgca-pariksha' },
    { label: 'Commercial Pilot Ground Classes', href: '/commercial-pilot-license' },
    { label: 'DGCA Ground Training', href: '/pilot-training-in-india' },
    { label: 'CPL Ground School', href: '/commercial-pilot-license-syllabus' },
    { label: 'Aviation Ground Classes', href: '/pilot-training-in-india' },
    { label: 'Air Navigation', href: '/air-navigation' },
    { label: 'Air Regulations', href: '/air-regulations' },
    { label: 'Aviation Meteorology', href: '/aviation-meteorology' },
    { label: 'Technical General', href: '/technical-general' },
    { label: 'Technical Specific', href: '/technical-general' },
    { label: 'RTR (A)', href: '/rtr-a' },
    { label: 'Commercial Pilot Licence (CPL)', href: '/commercial-pilot-license' },
    { label: 'Pilot Training', href: '/pilot-training-in-india' },
    { label: 'DGCA Exams', href: '/dgca-pariksha' },
    { label: 'Mock Tests', href: '/dgca-pariksha' },
    { label: 'Aviation Career', href: '/how-to-become-a-pilot-after-12th' },
    { label: 'Pilot Academy', href: '/pilot-training-in-india' },
    { label: 'Ground School', href: '/dgca-ground-classes-in-india' },
    { label: 'Aviation Subjects', href: '/commercial-pilot-license-syllabus' },
    { label: 'Aviation Safety', href: '/air-regulations' },
    { label: 'Airline Pilot Training', href: '/advanced-atpl-pilot-training' },
];

const syllabusSubjects = [
    {
        icon: '⚖️',
        title: 'Air Regulations',
        intro: "Air Regulations form the legal foundation of aviation. Every commercial pilot must understand the rules and procedures established by the Directorate General of Civil Aviation (DGCA) and international aviation organizations to operate safely and legally.",
        listLabel: "What You'll Learn",
        items: [
            'DGCA rules and regulations',
            'ICAO standards and recommended practices',
            'Rules of the Air',
            'Aircraft documentation',
            'Flight crew licensing requirements',
            'Air Traffic Services (ATS)',
            'Airspace classifications',
            'Aviation safety regulations',
            'Aircraft operations',
            'Pilot responsibilities',
            'Flight planning regulations',
            'Aviation law basics',
        ],
        closingLabel: 'Why It Matters',
        closingText: 'A thorough understanding of Air Regulations helps pilots make legally compliant decisions throughout every stage of flight, from pre-flight planning to landing.',
    },
    {
        icon: '🧭',
        title: 'Air Navigation',
        intro: "Navigation is one of the most critical subjects in commercial pilot training. It teaches pilots how to accurately determine an aircraft's position and safely navigate from departure to destination.",
        listLabel: 'Topics Covered',
        items: [
            'Latitude and longitude',
            'Maps and aeronautical charts',
            'Compass systems',
            'Magnetic variation and deviation',
            'Time calculations',
            'Flight planning',
            'Dead reckoning',
            'Radio navigation',
            'GPS navigation',
            'Instrument navigation',
            'Wind correction angle',
            'Fuel calculations',
            'Distance and speed calculations',
            'Navigation logs',
        ],
        closingLabel: 'Practical Learning',
        closingText: 'Students solve navigation problems similar to those encountered in DGCA examinations while also learning how professional pilots plan real-world flights.',
    },
    {
        icon: '⛈️',
        title: 'Aviation Meteorology',
        intro: 'Weather directly affects every flight. Pilots must be able to interpret weather reports, forecast conditions, and make informed operational decisions.',
        listLabel: 'Topics Included',
        items: [
            'Atmosphere and pressure systems',
            'Wind patterns',
            'Temperature variations',
            'Clouds and cloud formation',
            'Visibility',
            'Fog',
            'Thunderstorms',
            'Turbulence',
            'Wind shear',
            'Monsoon weather',
            'Tropical weather systems',
            'Weather charts',
            'METAR decoding',
            'TAF interpretation',
            'SIGMET',
            'Aviation weather forecasting',
        ],
        closingLabel: 'Why Students Need It',
        closingText: 'Understanding weather enables pilots to identify potential hazards, optimize flight planning, and maintain safe operations.',
    },
    {
        icon: '⚙️',
        title: 'Technical General',
        intro: 'Technical General develops a strong understanding of how aircraft function. Students learn the engineering principles that support safe aircraft operations.',
        listLabel: 'Topics Covered',
        items: [
            'Aircraft structure',
            'Aircraft systems',
            'Flight controls',
            'Hydraulics',
            'Pneumatics',
            'Landing gear',
            'Electrical systems',
            'Fuel systems',
            'Engines',
            'Propellers',
            'Aircraft instruments',
            'Flight management basics',
            'Aircraft maintenance awareness',
            'Aircraft limitations',
        ],
        closingLabel: 'Practical Benefits',
        closingText: 'Rather than memorizing systems, students understand how different aircraft components interact during normal and abnormal operations.',
    },
    {
        icon: '🛩️',
        title: 'Technical Specific (Where Applicable)',
        intro: 'Depending on the aircraft type used during flight training, students may also prepare for Technical Specific examinations.',
        listLabel: 'Topics generally include:',
        items: [
            'Aircraft-specific systems',
            'Cockpit instruments',
            'Emergency procedures',
            'Aircraft limitations',
            'Electrical configuration',
            'Engine systems',
            'Fuel management',
            'Hydraulic systems',
            'Performance calculations',
        ],
    },
    {
        icon: '📻',
        title: 'RTR (A) Guidance',
        intro: 'Although the Radio Telephony Restricted (Aeronautical) examination is conducted separately, communication skills are essential for every pilot.',
        listLabel: 'Our guidance includes:',
        items: [
            'Standard ICAO phraseology',
            'ATC communication',
            'Emergency radio calls',
            'Readback procedures',
            'Radio discipline',
            'Communication practice sessions',
            'Common examination questions',
        ],
    },
];

const structureItems = [
    { icon: '🏫', title: 'Classroom Learning', text: 'Students attend instructor-led sessions that simplify complex aviation concepts using real-life aviation examples.' },
    { icon: '💬', title: 'Interactive Discussions', text: 'Every class includes opportunities for questions, discussions, and practical examples that reinforce understanding.' },
    { icon: '📝', title: 'Mock Examinations', text: 'Regular mock tests help students become familiar with the DGCA examination pattern while identifying areas that need improvement.' },
    { icon: '📊', title: 'Performance Analysis', text: "Each student's progress is monitored through periodic assessments, allowing instructors to provide targeted feedback and personalized guidance." },
    { icon: '🎯', title: 'Doubt-Clearing Sessions', text: 'Dedicated sessions ensure that difficult topics are fully understood before moving to advanced concepts.' },
];

const learningModeRows = [
    { feature: 'Live Instructor Sessions', online: '✔', classroom: '✔' },
    { feature: 'Recorded Lectures', online: '✔', classroom: '✔' },
    { feature: 'Doubt Clearing', online: '✔', classroom: '✔' },
    { feature: 'Study Material', online: '✔', classroom: '✔' },
    { feature: 'Mock Tests', online: '✔', classroom: '✔' },
    { feature: 'Flexible Learning', online: 'Excellent', classroom: 'Moderate' },
    { feature: 'Classroom Interaction', online: 'Limited', classroom: 'Extensive' },
];

const durationList = [
    'Complete all DGCA theory subjects.',
    'Revise important concepts.',
    'Practice numerical problems.',
    'Attend mock examinations.',
    'Improve weak areas.',
    'Prepare confidently for DGCA exams.',
];

const eligibilityList = [
    'Students who have completed or are pursuing 10+2 with Physics and Mathematics.',
    'Graduates exploring aviation as a career.',
    'Candidates preparing for CPL admission.',
    'Flying trainees seeking structured theory coaching.',
    'Individuals aiming for airline pilot careers.',
];

const studyMaterialList = [
    'Updated subject notes',
    'DGCA-focused study material',
    'Practice question banks',
    'Numerical problem sets',
    'Revision modules',
    'Mock examinations',
    'Previous exam pattern guidance',
    'Instructor-led revision sessions',
];

const whyChooseCards = [
    {
        icon: '👨‍🏫',
        title: 'Experienced Aviation Faculty',
        paras: [
            'Learning from experienced instructors makes a significant difference in understanding complex aviation concepts. Our faculty members simplify technical topics using practical examples from aviation operations, making learning more engaging and effective.',
            'Students receive guidance throughout their preparation, from mastering theory subjects to developing the confidence required for DGCA examinations.',
        ],
        listLabel: 'Our Faculty Focuses On:',
        items: [
            'Concept-based learning',
            'Practical aviation examples',
            'One-to-one doubt solving',
            'Personalized academic guidance',
            'Continuous performance improvement',
            'Exam-oriented preparation',
        ],
    },
    {
        icon: '📚',
        title: 'Comprehensive Study Material',
        paras: [
            'A strong academic foundation begins with quality study resources. We One Aviation provides updated learning materials that align with the latest DGCA syllabus and examination trends.',
        ],
        listLabel: 'Our study resources include:',
        items: [
            'Structured subject notes',
            'Chapter-wise explanations',
            'Practice question banks',
            'Numerical exercises',
            'Previous exam pattern guidance',
            'Revision notes',
            'Quick reference guides',
            'Mock examination papers',
        ],
        closingText: 'The content is regularly reviewed to ensure students prepare using the most relevant information.',
    },
    {
        icon: '📈',
        title: 'Regular Mock Tests & Performance Analysis',
        paras: [
            'Practice plays a vital role in achieving success in DGCA examinations. Our structured assessment system helps students become familiar with the exam format while identifying areas that require additional attention.',
        ],
        listLabel: 'Students benefit from:',
        items: [
            'Weekly assessments',
            'Full-length mock examinations',
            'Time management practice',
            'Subject-wise performance reports',
            'Personalized feedback',
            'Revision planning',
        ],
        closingText: 'Performance tracking enables students to monitor their progress and improve consistently before appearing for DGCA exams.',
    },
    {
        icon: '🤝',
        title: 'Individual Mentorship',
        paras: [
            'Every student learns differently. Our mentors provide personalized academic support to help students overcome challenges and stay motivated throughout their preparation.',
        ],
        listLabel: 'Mentorship includes:',
        items: [
            'Career guidance',
            'Subject planning',
            'Study schedules',
            'Progress reviews',
            'Doubt-clearing sessions',
            'Exam strategy discussions',
        ],
        closingText: 'This individualized approach ensures students receive the support they need at every stage of their pilot training journey.',
    },
    {
        icon: '💻',
        title: 'Modern Learning Environment',
        paras: [
            'We One Aviation combines traditional classroom teaching with modern learning methods to create an engaging educational experience.',
        ],
        listLabel: 'Students gain access to:',
        items: [
            'Interactive classroom sessions',
            'Digital presentations',
            'Online learning support',
            'Recorded revision classes (where available)',
            'Practice assignments',
            'Self-assessment tools',
        ],
        closingText: 'Our flexible learning approach accommodates students from different educational backgrounds and locations.',
    },
];

const careerCards = [
    { icon: '✈️', title: 'Commercial Pilot', text: 'Commercial pilots operate passenger and cargo aircraft for domestic and international airlines after obtaining the required licences and flight experience.' },
    { icon: '🛫', title: 'Airline Pilot', text: 'With additional experience, training, and airline selection processes, commercial pilots can advance to airline operations with scheduled carriers.' },
    { icon: '🎓', title: 'Flight Instructor', text: 'Experienced pilots may choose to become certified flight instructors, helping train the next generation of aviation professionals.' },
    { icon: '🛩️', title: 'Charter Pilot', text: 'Charter pilots operate private and corporate aircraft, offering flexible flying opportunities across different sectors.' },
    { icon: '📦', title: 'Cargo Pilot', text: 'The rapid growth of e-commerce and logistics has increased demand for cargo pilots operating dedicated freight aircraft.' },
    { icon: '💼', title: 'Corporate Aviation', text: 'Corporate aviation offers opportunities to fly business aircraft for private companies, multinational organizations, and executive travel.' },
];

const skillsList = [
    'Analytical thinking',
    'Flight planning',
    'Decision-making',
    'Problem-solving',
    'Weather interpretation',
    'Navigation planning',
    'Aviation communication',
    'Risk assessment',
    'Operational awareness',
    'Safety management',
    'Time management',
    'Professional discipline',
];

const prepareSteps = [
    { title: 'Build Strong Fundamentals', text: 'Start by understanding the core principles of each subject before attempting advanced numerical problems or mock tests.' },
    { title: 'Follow a Structured Study Plan', text: 'Allocate dedicated time to each subject and revise regularly instead of relying on last-minute preparation.' },
    { title: 'Practice Numerical Problems', text: 'Subjects such as Air Navigation require regular practice to improve calculation speed and accuracy.' },
    { title: 'Solve Mock Papers', text: 'Attempting mock examinations under timed conditions helps students improve confidence and identify weak areas.' },
    { title: 'Revise Consistently', text: 'Frequent revision reinforces learning and improves long-term retention of key aviation concepts.' },
    { title: 'Seek Expert Guidance', text: 'Clarify doubts early with instructors to avoid misconceptions and strengthen conceptual understanding.' },
];

const journeySteps = [
    { step: '1', title: 'Career Counselling', text: 'Understand the Commercial Pilot Licence pathway, eligibility requirements, and aviation career opportunities.' },
    { step: '2', title: 'Enrollment', text: 'Choose the learning mode and batch that best suits your schedule and goals.' },
    { step: '3', title: 'Foundation Classes', text: 'Build a strong understanding of aviation fundamentals before progressing to advanced topics.' },
    { step: '4', title: 'Subject-Wise Learning', text: 'Study Air Regulations, Navigation, Meteorology, Technical General, and other DGCA subjects through structured modules.' },
    { step: '5', title: 'Assessments', text: 'Take regular mock tests and receive detailed performance feedback.' },
    { step: '6', title: 'Revision & Exam Preparation', text: 'Attend intensive revision sessions, practice question discussions, and final exam strategy workshops.' },
    { step: '7', title: 'DGCA Examination', text: 'Appear for DGCA theory examinations with confidence and a strong academic foundation.' },
    { step: '8', title: 'Flight Training', text: 'After successfully completing the theory requirements, continue your journey toward Commercial Pilot Licence training.' },
];

const keyAdvantages = [
    'Experienced aviation faculty',
    'Student-focused teaching methodology',
    'Updated DGCA syllabus coverage',
    'Comprehensive study material',
    'Flexible online and classroom batches',
    'Regular mock tests',
    'Individual mentorship',
    'Performance tracking',
    'Career counselling',
    'Strong academic support',
    'Practical learning approach',
    'Focus on long-term aviation success',
];

const faqs = [
    {
        q: 'What are DGCA Ground Classes?',
        a: 'DGCA Ground Classes are aviation theory courses that prepare aspiring pilots for the DGCA examinations required to obtain a Commercial Pilot Licence (CPL). The course covers Air Regulations, Air Navigation, Aviation Meteorology, Technical General, and other essential aviation subjects needed for pilot training and safe flight operations.',
    },
    {
        q: 'What subjects are included in DGCA Ground Classes?',
        intro: 'DGCA Ground Classes typically cover five core subjects:',
        items: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Technical General', 'Technical Specific (if applicable)'],
        closing: 'Many institutes also provide guidance for Radio Telephony (RTR), flight planning, mock tests, and exam preparation.',
    },
    {
        q: 'How long does it take to complete DGCA Ground Classes?',
        a: "The duration of DGCA Ground Classes generally ranges from 3 to 6 months, depending on the institute, batch schedule, learning mode (online or offline), and the student's preparation pace.",
    },
    {
        q: 'Who is eligible to join DGCA Ground Classes?',
        a: 'Anyone interested in becoming a commercial pilot can join DGCA Ground Classes. While students typically have a 10+2 background with Physics and Mathematics for CPL eligibility, ground classes are open to aspiring pilots who want to build a strong theoretical foundation before or during flight training.',
    },
    {
        q: 'Why should I choose We One Aviation for DGCA Ground Classes?',
        a: 'We One Aviation offers experienced aviation instructors, a DGCA-focused curriculum, updated study materials, regular mock tests, personalized mentoring, and flexible online and classroom training. The program is designed to help students understand aviation concepts, prepare confidently for DGCA examinations, and build a strong foundation for a successful commercial pilot career.',
    },
];

// ─── Small reusable bits ───────────────────────────────────────────────────

function BulletList({ items, className = '' }) {
    return (
        <ul className={`space-y-2 ${className}`}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                    <span className="text-av-orange mt-1">●</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function FaqItem({ faq, isOpen, onToggle }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
                <span className="font-montserrat font-bold text-av-blue text-sm md:text-base">{faq.q}</span>
                <span className={`text-av-orange text-xl flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            {isOpen && (
                <div className="px-6 pb-5">
                    {faq.a && <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>}
                    {faq.intro && (
                        <>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{faq.intro}</p>
                            <BulletList items={faq.items} className="mb-3" />
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.closing}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DGCAGroundClassesPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <Layout
            title="DGCA Ground Classes in India | Expert CPL Coaching & Training"
            description="Join DGCA Ground Classes at We One Aviation. Learn Air Regulations, Navigation, Meteorology & Technical subjects with expert instructors, mock tests, and CPL exam preparation."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Expert Coaching for Commercial Pilot Aspirants</div>
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        DGCA Ground Classes in India
                    </h1>
                    <div className="max-w-3xl mx-auto space-y-4 text-left">
                        <p className="text-white/70 text-sm leading-relaxed">
                            If you're planning to become a commercial pilot in India, clearing the Directorate General of Civil Aviation (DGCA) examinations is one of the most important milestones in your aviation journey. Strong conceptual knowledge of aviation theory not only helps you pass DGCA exams but also prepares you for real-world flight operations and airline training.
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed">
                            At We One Aviation, our DGCA Ground Classes are designed to provide aspiring pilots with a structured learning experience led by experienced aviation professionals. Whether you are preparing for your Commercial Pilot Licence (CPL), advancing toward an Airline Transport Pilot Licence (ATPL), or beginning your aviation career, our training combines classroom instruction, practical examples, mock tests, and continuous academic support.
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Our curriculum follows current DGCA requirements while emphasizing conceptual understanding instead of rote memorization. Students receive guidance on exam strategy, subject mastery, and industry expectations to build confidence before entering flight training.
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* ── What Are DGCA Ground Classes ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <ScrollReveal>
                        <div className="section-tag">Overview</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            What Are DGCA Ground Classes?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            DGCA Ground Classes are professional classroom or online training programs that prepare aspiring pilots for the theoretical examinations conducted by India's aviation regulator, the Directorate General of Civil Aviation (DGCA). This DGCA Ground School format is ideal for students seeking structured DGCA coaching, DGCA exam preparation, and strong fundamentals in aviation subjects.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Ground school develops the theoretical foundation every commercial pilot needs before and during flight training. Students learn aviation principles, aircraft systems, navigation techniques, weather interpretation, regulations, and operational procedures that are essential for safe and professional flying.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            A well-designed DGCA ground school prepares students not only to clear DGCA exams but also to understand how these concepts are applied during real flight operations, airline pilot training, and aviation safety practices.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">
                                The course typically covers core subjects including:
                            </h3>
                            <BulletList items={coreSubjects} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Essential ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <ScrollReveal>
                        <div className="section-tag">Foundation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why DGCA Ground Classes Are Essential for Every Pilot
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Many aspiring pilots focus primarily on flying hours, but theoretical knowledge is equally important. Every flight decision — from interpreting weather conditions to planning routes and understanding aircraft limitations — depends on a solid academic foundation built through DGCA coaching, pilot ground classes, and DGCA exam preparation.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Rather than studying isolated topics, students gain an integrated understanding of aviation that supports long-term career growth.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">High-quality DGCA ground classes help students:</h3>
                            <BulletList items={whyEssentialList} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Who Should Join ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Who It's For</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Who Should Join <span className="text-av-orange">DGCA Ground Classes?</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="max-w-3xl mx-auto bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">Our DGCA Ground Classes are suitable for:</h3>
                            <BulletList items={whoShouldJoinList} />
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mt-8 leading-relaxed">
                            Regardless of your stage in pilot training, structured ground classes can significantly improve your understanding, exam performance, and overall readiness for an aviation career.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Featured Snippet ── */}
            <section className="py-16 px-4 bg-av-blue">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-8">
                            <p className="font-montserrat font-bold text-av-orange text-sm mb-2 uppercase tracking-wide">Featured Snippet: What Are DGCA Ground Classes?</p>
                            <p className="text-white/90 leading-relaxed">
                                DGCA Ground Classes are professional aviation theory courses that prepare aspiring pilots for the DGCA examinations required for a Commercial Pilot Licence (CPL). These classes cover Air Regulations, Navigation, Meteorology, Technical General, aircraft systems, flight planning, and aviation safety, helping students build the theoretical knowledge needed for flight training and a successful aviation career.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Choose We One Aviation (short) ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <ScrollReveal>
                        <div className="section-tag">Our Approach</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why Choose We One Aviation for DGCA Ground Classes?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Choosing the right ground school can make a significant difference in your pilot training journey. At We One Aviation, we focus on more than exam preparation — we help students develop the knowledge, confidence, and discipline required in professional aviation.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            By combining structured learning with practical insights, we prepare students not only to clear DGCA examinations but also to excel in future flight training and airline selection processes.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">Our approach includes:</h3>
                            <BulletList items={approachList} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Related Pages (from Internal Linking Suggestions) ── */}
            <section className="py-14 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Explore More</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">Related Pages & Keyword Topics</h2>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="flex flex-wrap justify-center gap-3">
                            {relatedPages.map((p) => (
                                <Link
                                    key={p.label}
                                    href={p.href}
                                    className="bg-av-light border border-av-sky/20 hover:border-av-orange/50 hover:bg-av-orange/10 transition-all rounded-full px-5 py-2.5 text-sm font-semibold text-av-blue"
                                >
                                    {p.label}
                                </Link>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Syllabus ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Syllabus</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            DGCA Ground Classes Syllabus: <span className="text-av-orange">Complete Subject-Wise Training</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            The DGCA Ground Classes curriculum is designed to help aspiring commercial pilots understand the theoretical principles behind safe and efficient flight operations. At We One Aviation, our training follows the latest DGCA examination pattern and focuses on conceptual learning, practical application, and exam-oriented preparation.
                        </p>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Each subject is taught using interactive classroom sessions, visual presentations, case studies, mock examinations, and doubt-clearing sessions to ensure students gain both theoretical knowledge and practical understanding.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        {syllabusSubjects.map((subj, i) => (
                            <ScrollReveal key={subj.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-7 h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">{subj.icon}</span>
                                        <h3 className="font-montserrat font-bold text-white text-lg">{subj.title}</h3>
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed mb-4">{subj.intro}</p>
                                    <p className="font-semibold text-av-orange text-sm mb-2">{subj.listLabel}</p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                                        {subj.items.map((item) => (
                                            <li key={item} className="text-white/70 text-xs leading-relaxed flex items-start gap-2">
                                                <span className="text-av-orange">●</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {subj.closingText && (
                                        <div className="bg-white/10 rounded-xl p-4 mt-2">
                                            <p className="text-av-orange font-semibold text-xs mb-1">{subj.closingLabel}</p>
                                            <p className="text-white/80 text-xs leading-relaxed">{subj.closingText}</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How Structured ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Learning System</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How Our DGCA Ground Classes <span className="text-av-orange">Are Structured</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Learning aviation theory requires consistency and proper guidance. Our structured learning system ensures that students remain on track throughout their preparation.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
                        {structureItems.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Online vs Offline ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Flexible Learning</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Online and Offline <span className="text-av-orange">DGCA Ground Classes</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Every student has different learning preferences. We One Aviation offers flexible learning modes to accommodate aspiring pilots across India.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="overflow-x-auto rounded-2xl shadow-lg">
                            <table className="w-full text-sm bg-white">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Feature</th>
                                        <th className="px-5 py-4 text-left">Online Classes</th>
                                        <th className="px-5 py-4 text-left">Classroom Training</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {learningModeRows.map((row, i) => (
                                        <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.feature}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.online}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.classroom}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={150}>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mt-6 leading-relaxed">
                            Both learning formats follow the same curriculum and are designed to maintain high academic standards.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Duration & Eligibility ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                            <div className="text-4xl mb-4">⏱️</div>
                            <h3 className="font-montserrat font-bold text-white text-xl mb-3">Course Duration</h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-4">
                                The duration of DGCA Ground Classes depends on the student's schedule, prior knowledge, and chosen learning mode.
                            </p>
                            <p className="font-semibold text-av-orange text-sm mb-2">Typical duration ranges from 3 to 6 months, allowing sufficient time to:</p>
                            <ul className="space-y-1.5 mb-4">
                                {durationList.map((item) => (
                                    <li key={item} className="text-white/80 text-xs leading-relaxed flex items-start gap-2">
                                        <span className="text-av-orange">●</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-white/70 text-xs leading-relaxed">
                                Students can also choose accelerated batches if they wish to complete their preparation within a shorter timeframe.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                            <div className="text-4xl mb-4">🎓</div>
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">Eligibility for DGCA Ground Classes</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Students from different educational backgrounds can join DGCA Ground Classes. While eligibility for obtaining a Commercial Pilot Licence is governed by DGCA regulations, ground classes are open to individuals who aspire to build a career in aviation.
                            </p>
                            <p className="font-semibold text-av-blue text-sm mb-2">These classes are suitable for:</p>
                            <BulletList items={eligibilityList} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Study Material ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Resources</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Study Material and <span className="text-av-orange">Learning Resources</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                            To support effective preparation, students receive access to comprehensive learning resources, including:
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                                <BulletList items={studyMaterialList} />
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <p className="text-gray-500 text-sm text-center mt-6 leading-relaxed">
                            Our resources are regularly updated to reflect changes in DGCA guidelines and examination trends, ensuring students prepare with relevant and accurate material.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Choose We One Aviation (long) ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Why We're Different</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Choose We One Aviation for <span className="text-av-orange">DGCA Ground Classes?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Selecting the right DGCA Ground School is one of the most important decisions in your pilot training journey. While many institutes focus only on helping students pass examinations, We One Aviation emphasizes building the theoretical knowledge, practical understanding, and professional mindset required for a successful aviation career.
                        </p>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Our goal is to prepare students not only for DGCA theory papers but also for flight training, airline assessments, simulator sessions, and future career growth.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        {whyChooseCards.map((card, i) => (
                            <ScrollReveal key={card.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">{card.icon}</span>
                                        <h3 className="font-montserrat font-bold text-av-blue text-lg">{card.title}</h3>
                                    </div>
                                    {card.paras.map((p) => (
                                        <p key={p} className="text-gray-500 text-sm leading-relaxed mb-3">{p}</p>
                                    ))}
                                    <p className="font-semibold text-av-blue text-sm mb-2">{card.listLabel}</p>
                                    <BulletList items={card.items} className="mb-3" />
                                    {card.closingText && (
                                        <p className="text-gray-500 text-sm leading-relaxed">{card.closingText}</p>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Career Opportunities ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Career Paths</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Career Opportunities After Completing <span className="text-av-orange">DGCA Ground Classes</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            DGCA Ground Classes serve as the academic foundation for various aviation career paths. After successfully completing ground school and meeting the required licensing criteria, students can progress toward professional pilot training and aviation roles.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {careerCards.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <div className="text-3xl mb-3">{c.icon}</div>
                                    <h3 className="font-montserrat font-bold text-white mb-2">{c.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">{c.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Skills ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Skill Building</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Skills You Develop During <span className="text-av-orange">DGCA Ground Classes</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed max-w-2xl mx-auto">
                            Professional pilot training requires much more than passing examinations. Throughout the course, students develop essential skills valued across the aviation industry.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="flex flex-wrap justify-center gap-3">
                            {skillsList.map((skill) => (
                                <span key={skill} className="bg-av-light border border-av-sky/20 rounded-full px-5 py-2.5 text-sm font-semibold text-av-blue">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <p className="text-gray-500 text-sm text-center mt-6 leading-relaxed">
                            These competencies contribute to long-term success in both training and professional aviation careers.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── How to Prepare ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Exam Strategy</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How to Prepare Effectively for <span className="text-av-orange">DGCA Examinations</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Success in DGCA theory exams depends on consistent preparation and a clear study strategy. Students who focus on understanding concepts rather than memorizing information are generally better prepared for both examinations and practical flight training.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {prepareSteps.map((s, i) => (
                            <ScrollReveal key={s.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold mb-4">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{s.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{s.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Student Learning Journey ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Your Journey</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Student Learning Journey at <span className="text-av-orange">We One Aviation</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                            Our structured approach guides students through every stage of their preparation.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {journeySteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 60}>
                                <div className="bg-av-light border border-av-sky/20 rounded-2xl p-5 h-full flex flex-col">
                                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm mb-3">
                                        {s.step}
                                    </div>
                                    <h4 className="font-montserrat font-bold text-av-blue text-sm mb-2">Step {s.step} — {s.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{s.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Students Trust ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Trust</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Students Trust <span className="text-av-orange">We One Aviation</span>
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
                            Students choose We One Aviation because of our commitment to quality education, transparent guidance, and career-focused training.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <div className="glass rounded-2xl p-8 text-left">
                            <p className="font-montserrat font-bold text-av-orange mb-4">Our Key Advantages</p>
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                                {keyAdvantages.map((item) => (
                                    <div key={item} className="flex items-start gap-2 text-white/80 text-sm leading-relaxed">
                                        <span className="text-av-orange mt-1">●</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 60}>
                                <FaqItem
                                    faq={faq}
                                    isOpen={openFaq === i}
                                    onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Get Started</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Begin Your <span className="text-av-orange">Aviation Career?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-3 leading-relaxed">
                            Every successful pilot begins with a strong theoretical foundation. At We One Aviation, our DGCA Ground Classes are designed to help aspiring pilots develop the knowledge, confidence, and discipline required for DGCA examinations, flight training, and future airline careers.
                        </p>
                        <p className="text-white/70 text-sm mb-3 leading-relaxed">
                            Whether you're starting your Commercial Pilot Licence journey or strengthening your understanding of aviation theory, our experienced instructors, structured curriculum, and student-focused approach will support you every step of the way.
                        </p>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Take the first step toward becoming a professional pilot. Enquire today and start your DGCA Ground Classes with We One Aviation.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Contact Us →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}