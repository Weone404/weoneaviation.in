import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '3–4x', label: 'Exams Per Year', icon: '📅' },
    { num: '70%', label: 'Passing Marks', icon: '✅' },
    { num: 'CBT', label: 'Online Mode', icon: '💻' },
    { num: 'MCQs', label: 'Question Type', icon: '📝' },
];

const keyDetails = [
    { label: 'Conducted By', value: 'Directorate General of Civil Aviation (DGCA)' },
    { label: 'Frequency', value: 'Three to four times a year' },
    { label: 'Mode of Exam', value: 'Online (CBT – Computer-Based Test)' },
    { label: 'Languages', value: 'Primarily in English' },
    { label: 'Types of Licenses', value: 'CPL, PPL, Instrument Rating (IR), Flight Radio Telephony Operator\'s License (FRTOL)' },
];

const eligibility = [
    { icon: '🎂', label: 'Age Requirement', value: 'Minimum age is 17 for PPL and 18 for CPL.' },
    { icon: '📚', label: 'Educational Qualification', value: 'At least 10+2 with Physics and Mathematics (or equivalent).' },
    { icon: '🩺', label: 'Medical Fitness', value: 'Must hold a valid Class 2 or Class 1 medical certificate from DGCA-approved medical examiners.' },
];

const syllabusTopics = [
    {
        icon: '🗺️',
        title: 'Air Navigation',
        points: [
            'Principles of navigation, calculations, map reading',
            'Understanding global and regional aviation systems',
        ],
    },
    {
        icon: '⚖️',
        title: 'Air Regulations',
        points: [
            'International Civil Aviation Organization (ICAO) regulations',
            'Indian aviation laws and DGCA guidelines',
        ],
    },
    {
        icon: '🌦️',
        title: 'Meteorology',
        points: [
            'Weather patterns, forecasts, and impact on flight',
            'Understanding atmospheric conditions and meteorological instruments',
        ],
    },
    {
        icon: '⚙️',
        title: 'Technical General & Specific',
        points: [
            'Aircraft structure, engines, and technical systems',
            'Operational knowledge of specific aircraft types',
        ],
    },
];

const examPattern = [
    { label: 'Mode', value: 'Online, Computer-Based Test (CBT)' },
    { label: 'Question Type', value: 'Multiple-choice questions (MCQs)' },
    { label: 'Duration', value: 'Varies for each subject' },
    { label: 'Passing Marks', value: 'Minimum of 70% in each subject to pass', highlight: true },
];

const applySteps = [
    {
        num: '01',
        title: 'Register on the DGCA Pariksha Portal',
        desc: 'Create an account on the DGCA website through the DGCA exam website. Fill in all required personal and educational details.',
    },
    {
        num: '02',
        title: 'Upload Required Documents',
        desc: 'Educational certificates, ID proof, and medical certificates.',
    },
    {
        num: '03',
        title: 'Select Subjects and Exam Date',
        desc: 'Choose the subjects you wish to appear for in the upcoming session.',
    },
    {
        num: '04',
        title: 'Pay the Exam Fee',
        desc: 'Submit the application fee online and confirm the payment.',
    },
];

const prepTips = [
    { icon: '📖', tip: 'Understand the Syllabus Thoroughly: Go through the topics in detail to ensure comprehensive coverage.' },
    { icon: '📚', tip: 'Use Standard Study Material: DGCA recommended books and pilot training manuals are essential.' },
    { icon: '🧪', tip: 'Take Practice Tests: Regular practice tests can help gauge your preparation level.' },
    { icon: '🏫', tip: 'Attend DGCA Ground Classes: Enrolling in a ground school or training academy can provide structured guidance.' },
    { icon: '⏱️', tip: 'Focus on Time Management: Practicing within time limits helps build confidence for the actual exam.' },
];

const computerNumberSteps = [
    { num: '01', title: 'Create a DGCA Account', desc: 'You will need to register on the DGCA portal to start the process.' },
    { num: '02', title: 'Fill in the Details', desc: 'Provide accurate personal, educational, and medical details as required.' },
    { num: '03', title: 'Upload Required Documents', desc: 'Submit documents such as your educational certificates, medical fitness certificate, and identity proof.' },
    { num: '04', title: 'Payment', desc: 'Pay the applicable fees to complete the application process.' },
    { num: '05', title: 'Computer Number Issuance', desc: 'Once your application is processed, DGCA will issue a unique computer number. This number will be required to apply for exams and track your results.' },
];

const importantQueries = [
    {
        num: '1',
        title: 'What is DGCA Exam?',
        content: 'The DGCA exam refers to the series of exams required to obtain aviation licenses, including the Commercial Pilot License (CPL), Private Pilot License (PPL), and others. These exams are conducted by the Directorate General of Civil Aviation (DGCA), India\'s aviation regulatory body. The DGCA Pariksha tests candidates on subjects like Air Navigation, Meteorology, Air Regulations, and Aircraft Technical Knowledge.',
        extra: [
            { label: 'Purpose', value: 'The purpose of the DGCA exam is to ensure that candidates possess the required knowledge to operate an aircraft safely and in compliance with international and national aviation regulations.' },
            { label: 'Subjects Covered', value: 'Air Navigation, Air Regulations, Technical Knowledge, Meteorology, and other relevant subjects related to aviation.' },
        ],
    },
    {
        num: '3',
        title: 'DGCA Entrance Exam',
        content: 'The DGCA entrance exam is a key part of the process for becoming a pilot in India. It is designed to assess your theoretical knowledge in various subjects related to aviation. The entrance exam, or DGCA Pariksha, tests candidates on their understanding of technical aspects of flying, regulatory requirements, and meteorology, among other things.',
        extra: [
            { label: 'Eligibility', value: 'Candidates must meet specific requirements, such as completing their 12th standard with Physics and Mathematics and obtaining a medical certificate.' },
            { label: 'Mode', value: 'The exam is typically held online and is computer-based (CBT).' },
            { label: 'Frequency', value: 'It is held several times a year, allowing candidates multiple opportunities to appear.' },
        ],
    },
    {
        num: '4',
        title: 'How to Get Computer Number DGCA?',
        content: 'If you\'re wondering how to get a computer number DGCA, the process is simple and involves registering on the official DGCA website. After completing the online application and submitting necessary documents, DGCA will provide you with a unique computer number.',
        extra: [
            { label: 'Why is it Important?', value: 'Your computer number is your unique identifier in the DGCA database, and it will be used for all future exam-related processes. You will need it to apply for DGCA exams and receive your results.' },
            { label: 'Steps to Obtain', value: 'Follow the same procedure outlined above for registration and document submission.' },
        ],
    },
    {
        num: '5',
        title: 'DGCA WR Office',
        content: 'The DGCA WR office refers to the DGCA Western Regional office. It is one of the regional offices of the Directorate General of Civil Aviation that handles administrative work related to aviation exams, training, and licensure. If you\'re based in the western region of India, this office will be your point of contact for all DGCA-related services.',
        extra: [
            { label: 'Role', value: 'The DGCA WR office plays a key role in processing applications for exams, medical certificates, and flight training licenses.' },
            { label: 'Location', value: 'The office is based in Mumbai, Maharashtra, and serves candidates from states like Gujarat, Maharashtra, Madhya Pradesh, and others.' },
            { label: 'Contacting DGCA WR Office', value: 'Candidates can reach out to this office for assistance with exam procedures, documents, and other inquiries related to the DGCA Pariksha.' },
        ],
    },
];

const relatedBlogs = [
    { label: 'How to Become a Pilot', href: '/how-to-become-a-pilot' },
    { label: 'Different Types of Pilot Licences', href: '/pilot-licences' },
    { label: 'Best DGCA Classes', href: '/best-dgca-classes' },
    { label: 'eGCA Login', href: '/egca-login' },
    { label: 'Pilot Course Fees After 12th', href: '/pilot-course-fees' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DGCAParikshaPage() {
    return (
        <Layout
            title="DGCA Pariksha – Complete Guide 2025 | Eligibility, Syllabus, Exam Pattern"
            description="Complete guide to DGCA Pariksha 2025. Learn about eligibility, syllabus, exam pattern, how to apply, computer number, DGCA WR office, preparation tips, and FAQs."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
                </div>
                <ScrollReveal className="relative z-10">
                    <div className="section-tag">Aviation Exam Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        DGCA Pariksha
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-5">
                        The DGCA Pariksha is a pivotal examination for aspiring licensed pilots in India. Conducted by the <strong className="text-white">Directorate General of Civil Aviation (DGCA)</strong>, this exam assesses essential knowledge on aviation, ensuring that all pilots maintain high safety standards and understanding of aeronautical principles.
                    </p>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm">
                        Let's explore all the essential details about DGCA Pariksha, from eligibility and syllabus to preparation tips and FAQs.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── What is + Why Important ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <div className="section-tag">About</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                What is <span className="text-av-orange">DGCA Pariksha?</span>
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                The DGCA Pariksha is a series of exams required to obtain various aviation licenses in India, such as the <strong>Commercial Pilot License (CPL)</strong>, <strong>Private Pilot License (PPL)</strong>, and other ratings. This examination covers multiple subjects to ensure candidates have a solid foundation in aviation theory and practice.
                            </p>

                            <div className="section-tag">Importance</div>
                            <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-4 mt-2">
                                Why is DGCA Pariksha <span className="text-av-orange">Important?</span>
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                DGCA Pariksha serves as a gatekeeper for aviation standards in India. Passing it demonstrates a pilot's proficiency in the core subjects essential for flight safety, technical know-how, and regulatory compliance. It also qualifies them for advanced training stages.
                            </p>

                            <Link href="https://dgcaexam.com/" target="_blank" className="inline-block bg-av-orange text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-av-blue transition-all">
                                CPL ATPL Mock Test Series →
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
                                    alt="Aviation student preparing for DGCA Pariksha exam"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-blue/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">DGCA Pariksha</p>
                                        <p className="text-white/80 text-xs">India's Aviation Licensing Exam</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Details Table */}
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left" colSpan={2}>Key Details about DGCA Pariksha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keyDetails.map((row, i) => (
                                            <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3 font-semibold text-av-blue text-xs w-1/3">{row.label}</td>
                                                <td className="px-4 py-3 text-gray-600 text-xs">{row.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility <span className="text-av-orange">Criteria</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">To appear for the DGCA Pariksha, candidates must meet specific eligibility requirements:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {eligibility.map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 100}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-4xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.label}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.value}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Syllabus ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Syllabus</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Syllabus for <span className="text-av-orange">DGCA Pariksha</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">The syllabus for DGCA Pariksha covers critical topics across different subjects. Here's a breakdown:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="grid sm:grid-cols-2 gap-5">
                                {syllabusTopics.map((item, i) => (
                                    <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover hover:border-av-orange/30">
                                        <div className="text-3xl mb-2">{item.icon}</div>
                                        <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                        <ul className="space-y-1">
                                            {item.points.map(p => (
                                                <li key={p} className="flex items-start gap-2 text-gray-500 text-xs">
                                                    <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                                    alt="Aviation navigation charts and instruments for DGCA exam"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-navy/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">4 Core Subjects</p>
                                        <p className="text-white/80 text-xs mt-1">Air Navigation · Air Regulations · Meteorology · Technical</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Exam Pattern ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Exam Pattern</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Exam Pattern and <span className="text-av-orange">Marking Scheme</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                                    alt="Computer based test CBT aviation DGCA exam"
                                    className="w-full h-72 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-blue/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">Computer-Based Test</p>
                                        <p className="text-white/80 text-xs mt-1">Online MCQ format — 70% passing marks required</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-5 py-3 text-left">Parameter</th>
                                            <th className="px-5 py-3 text-left">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examPattern.map((row, i) => (
                                            <tr key={row.label} className={`${row.highlight ? 'bg-av-orange/10' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                <td className={`px-5 py-3 font-semibold text-xs ${row.highlight ? 'text-av-orange' : 'text-av-blue'}`}>{row.label}</td>
                                                <td className={`px-5 py-3 text-xs font-medium ${row.highlight ? 'text-av-orange font-bold' : 'text-gray-600'}`}>{row.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── How to Apply ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Application</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            How to Apply for <span className="text-av-orange">DGCA Pariksha?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {applySteps.map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 text-center h-full flex flex-col items-center">
                                    <div className="w-12 h-12 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-lg mb-4 flex-shrink-0">{step.num}</div>
                                    <h4 className="font-montserrat font-bold text-white text-sm mb-2">{step.title}</h4>
                                    <p className="text-white/70 text-xs leading-relaxed">{step.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Preparation Tips ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Preparation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Preparation Tips for <span className="text-av-orange">DGCA Pariksha</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
                                    alt="Pilot student studying for DGCA exam with books"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-navy/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">Crack the DGCA Exam</p>
                                        <p className="text-white/80 text-xs mt-1">Smart preparation leads to success</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="space-y-4">
                                {prepTips.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 card-hover hover:border-av-orange/30">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.tip}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Computer Number Section ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Computer Number</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How to Apply for <span className="text-av-orange">Computer Number DGCA?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            To begin your DGCA Pariksha journey, you must first obtain a computer number, which is essential for applying for any aviation-related exams under DGCA. Here's how you can apply for the computer number:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <div className="space-y-4">
                                {computerNumberSteps.map((step, i) => (
                                    <div key={step.num} className="flex items-start gap-4 p-5 bg-av-light rounded-xl border border-av-sky/20 card-hover hover:border-av-orange/30">
                                        <div className="w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">{step.num}</div>
                                        <div>
                                            <h4 className="font-montserrat font-bold text-av-blue text-sm mb-1">{step.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white">
                                <div className="text-4xl mb-4">🔢</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Why is the Computer Number Important?</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-5">
                                    Your computer number is your <strong className="text-av-orange">unique identifier in the DGCA database</strong>, and it will be used for all future exam-related processes. You will need it to apply for DGCA exams and receive your results.
                                </p>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <p className="text-white/70 text-xs leading-relaxed">Steps to Obtain: Follow the same procedure outlined for registration and document submission on the official DGCA portal.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Important Queries ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">More Details</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            DGCA Pariksha – Related <span className="text-av-orange">Important Queries</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            The DGCA Pariksha is a crucial examination for aspiring pilots in India, conducted by the Directorate General of Civil Aviation (DGCA). To make it easier for candidates, it's important to understand the key steps, procedures, and requirements involved, as well as the relevant terms like "computer number," DGCA regional offices, and the DGCA entrance exam itself.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {importantQueries.map((item, i) => (
                            <ScrollReveal key={item.num} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{item.num}</div>
                                        <h3 className="font-montserrat font-bold text-av-blue text-sm leading-snug">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.content}</p>
                                    <div className="space-y-2">
                                        {item.extra.map(e => (
                                            <div key={e.label} className="p-2 bg-av-light rounded-lg border border-av-sky/20">
                                                <span className="text-av-orange font-semibold text-xs">{e.label}: </span>
                                                <span className="text-gray-500 text-xs">{e.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8 text-center">
                            <div className="text-4xl mb-3">📊</div>
                            <p className="text-av-orange font-bold text-lg font-montserrat mb-2">Passing Marks</p>
                            <p className="text-white text-3xl font-black font-montserrat mb-2">70%</p>
                            <p className="text-white/70 text-sm">To pass the DGCA Pariksha, you need at least 70% in each subject.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Weone Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Prepare Yourself for DGCA Pariksha and <span className="text-av-orange">Practice Online</span>
                        </h2>
                        <p className="text-white/60 mt-3 text-sm max-w-xl mx-auto">Experience of 20+ Years as a Pilot Trainer – Capt. Nitin Rana</p>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            <a href="https://dgcaexam.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Practice Test →
                            </a>
                            <Link href="/contact" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Apply Now →
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Courses */}
                    <ScrollReveal>
                        <div className="glass rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-5 text-center">Our Courses</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    'Commercial Pilot Training', 'Personality Development', 'Airline Preparation',
                                    'Cadet Program', 'Radio Telephony', 'DGCA Ground Classes',
                                    'Air Transport Pilot Licence', 'Pilot Training',
                                ].map(course => (
                                    <span key={course} className="bg-white/10 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20">{course}</span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Related Blogs ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat font-bold text-av-blue text-xl">Our Blogs</h3>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {relatedBlogs.map(blog => (
                            <Link key={blog.href} href={blog.href} className="card-hover bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:border-av-orange/30 transition-all group">
                                <span className="text-xl">✈️</span>
                                <span className="font-semibold text-av-blue text-xs group-hover:text-av-orange transition-colors leading-snug">{blog.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </Layout>
    );
}