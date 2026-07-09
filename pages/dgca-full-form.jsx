import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const glance = [
    { topic: 'Full Form', details: 'Directorate General of Civil Aviation' },
    { topic: 'Country', details: 'India' },
    { topic: 'Governing Ministry', details: 'Ministry of Civil Aviation' },
    { topic: 'Established', details: '1927 (roots in the Civil Aviation Department; current DGCA functions evolved over time)' },
    { topic: 'Headquarters', details: 'New Delhi' },
    { topic: 'Primary Role', details: 'Regulate Civil Aviation in India' },
    { topic: 'Pilot Licences', details: 'SPL, PPL, CPL, ATPL' },
    { topic: 'Official Functions', details: 'Pilot Licensing, Aviation Safety, Flight Training Approval, Aircraft Airworthiness, DGCA Examinations' },
];

const whatDgcaDoes = [
    'Issuing pilot licences.',
    'Conducting DGCA theory examinations.',
    'Approving Flying Training Organizations (FTOs).',
    'Monitoring aviation safety.',
    'Certifying aircraft airworthiness.',
    'Authorizing aviation medical examinations.',
    'Auditing airlines and aviation organizations.',
    'Investigating aviation incidents.',
    'Publishing Civil Aviation Requirements (CAR).',
    'Promoting safe and efficient aviation operations.',
];

const whyEstablished = [
    'Improve passenger safety.',
    'Standardize pilot licensing.',
    'Regulate commercial aviation.',
    'Monitor airline compliance.',
    'Maintain aircraft safety.',
    'Implement international aviation standards.',
    "Support the growth of India's aviation sector.",
];

const withoutDgca = [
    'Pilot licences would not have a standardized framework.',
    'Flying schools would lack consistent regulatory oversight.',
    'Aviation safety standards would vary.',
    'Aircraft inspections and certifications would not follow a unified process.',
];

const keyFunctions = [
    {
        num: '1',
        icon: '🪪',
        title: 'Pilot Licensing',
        intro: 'DGCA issues and regulates pilot licences required for different stages of aviation training and professional flying.',
        listIntro: 'These include:',
        list: ['Student Pilot Licence (SPL)', 'Private Pilot Licence (PPL)', 'Commercial Pilot Licence (CPL)', 'Airline Transport Pilot Licence (ATPL)'],
        outro: 'Before receiving these licences, candidates must satisfy educational, medical, theoretical, and flight training requirements.',
    },
    {
        num: '2',
        icon: '📝',
        title: 'DGCA Examinations',
        intro: 'DGCA conducts examinations to evaluate whether pilot trainees possess the theoretical knowledge necessary for safe aircraft operations.',
        listIntro: 'Core examination subjects include:',
        list: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Technical General', 'Technical Specific'],
        outro: 'These examinations ensure pilots understand both aviation theory and operational procedures before progressing in their training.',
    },
    {
        num: '3',
        icon: '🏫',
        title: 'Approval of Flying Training Organizations (FTOs)',
        intro: 'DGCA approves Flying Training Organizations (FTOs) that meet its operational, infrastructure, maintenance, and training standards.',
        outro: 'Training with a DGCA-approved FTO is essential for candidates pursuing pilot licences recognized in India.',
    },
    {
        num: '4',
        icon: '🛡️',
        title: 'Aviation Safety Oversight',
        intro: "Safety is at the core of DGCA's responsibilities.",
        listIntro: 'The authority monitors:',
        list: ['Airline operations.', 'Flight safety procedures.', 'Aircraft maintenance.', 'Pilot competency.', 'Operational compliance.', 'Aviation documentation.'],
        outro: 'Regular inspections and audits help reduce operational risks and strengthen aviation safety across the country.',
    },
    {
        num: '5',
        icon: '✈️',
        title: 'Aircraft Airworthiness',
        intro: 'Before an aircraft can operate commercially, it must meet strict airworthiness standards.',
        listIntro: 'DGCA oversees:',
        list: ['Aircraft inspections.', 'Maintenance programs.', 'Technical compliance.', 'Safety certifications.', 'Continued airworthiness monitoring.'],
        outro: 'This helps ensure that aircraft remain safe throughout their operational life.',
    },
    {
        num: '6',
        icon: '🩺',
        title: 'Medical Certification',
        intro: 'Professional pilots must meet aviation medical standards before receiving or renewing licences.',
        listIntro: 'DGCA-approved medical examinations evaluate:',
        list: ['Vision', 'Hearing', 'Cardiovascular health', 'Neurological fitness', 'Overall physical condition'],
        outro: 'Medical fitness is an essential component of aviation safety.',
    },
];

const supportsAviationSafety = [
    'Setting national aviation standards.',
    'Conducting airline inspections.',
    'Monitoring pilot licensing.',
    'Regulating maintenance organizations.',
    'Approving aviation training programs.',
    'Reviewing safety procedures.',
    'Investigating incidents and recommending improvements.',
];

const dgcaVsIcao = [
    { dgca: 'Regulates civil aviation in India', icao: 'Develops global aviation standards' },
    { dgca: 'Issues Indian pilot licences', icao: 'Does not issue pilot licences' },
    { dgca: 'Approves Indian flying schools', icao: 'Does not approve national training organizations' },
    { dgca: 'Conducts DGCA examinations', icao: 'Does not conduct pilot exams' },
    { dgca: 'Enforces aviation regulations in India', icao: 'Provides international guidance to member states' },
];

const licensingSteps = [
    {
        step: '01',
        title: 'Meet the Educational Eligibility',
        desc: 'Candidates should complete Class 12 from a recognized board. For a Commercial Pilot Licence (CPL), Physics and Mathematics at the 10+2 level are generally required under DGCA regulations.',
    },
    {
        step: '02',
        title: 'Obtain a DGCA Computer Number',
        desc: 'A DGCA Computer Number is a unique identification number required before appearing for DGCA theory examinations. It allows candidates to register for exams and track their licensing progress.',
    },
    {
        step: '03',
        title: 'Complete DGCA Medical Examinations',
        desc: 'Medical fitness is an essential requirement for every pilot.',
        listIntro: 'Candidates typically undergo:',
        list: ['DGCA Class II Medical Examination', 'DGCA Class I Medical Examination'],
        outro: 'These assessments evaluate eyesight, hearing, cardiovascular health, neurological condition, and overall fitness to ensure candidates are medically suitable for flying.',
    },
    {
        step: '04',
        title: 'Join DGCA Ground Classes',
        desc: 'Ground school prepares students for DGCA theory examinations by building a strong understanding of aviation principles.',
        listIntro: 'Students study subjects such as:',
        list: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Technical General', 'Technical Specific', 'Flight Planning', 'Aviation Safety'],
        outro: 'A structured ground training program helps students develop conceptual understanding instead of relying solely on memorization.',
    },
    {
        step: '05',
        title: 'Clear DGCA Theory Examinations',
        desc: 'Candidates must pass the required DGCA theory papers before progressing toward pilot licensing.',
        outro: 'Regular revision, mock tests, and consistent preparation improve both confidence and examination performance.',
    },
    {
        step: '06',
        title: 'Complete Flight Training',
        desc: 'Students then undergo practical flight training at a DGCA-approved Flying Training Organization (FTO).',
        listIntro: 'Training generally includes:',
        list: ['Aircraft familiarization', 'Pre-flight inspection', 'Take-off and landing practice', 'Solo flying', 'Cross-country flying', 'Instrument flying', 'Night flying', 'Emergency procedures', 'Radio communication'],
        outro: 'This phase develops the practical flying skills required for safe aircraft operations.',
    },
    {
        step: '07',
        title: 'Complete Required Flying Hours',
        desc: 'To qualify for a Commercial Pilot Licence, students must complete the flying hours prescribed by DGCA. These hours include dual instruction, solo flights, cross-country flying, instrument flying, and night flying.',
    },
    {
        step: '08',
        title: 'Apply for a Commercial Pilot Licence (CPL)',
        desc: 'Once all academic, medical, and flying requirements are fulfilled, eligible candidates can apply to DGCA for the issue of their Commercial Pilot Licence.',
    },
];

const approvedFtoProvides = [
    'Training that meets DGCA standards',
    'Qualified flight instructors',
    'Approved aircraft',
    'Structured training programs',
    'Standardized operating procedures',
    'Better preparation for licensing requirements',
];

const commonMistakes = [
    {
        icon: '🩺',
        title: 'Ignoring Medical Requirements',
        desc: 'Many candidates begin training without completing their medical examinations, only to face delays later. Completing medical assessments early provides greater clarity before investing in pilot training.',
    },
    {
        icon: '💸',
        title: 'Choosing a Training Institute Based Only on Fees',
        desc: 'Low fees should not be the only deciding factor. Consider instructor experience, infrastructure, aircraft availability, student support, and overall training quality.',
    },
    {
        icon: '📚',
        title: 'Underestimating DGCA Theory Subjects',
        desc: 'Subjects such as Air Navigation and Aviation Meteorology require conceptual understanding and regular practice. Starting preparation early can make the learning process more manageable.',
    },
    {
        icon: '🗓️',
        title: 'Lack of a Study Plan',
        desc: 'A structured schedule that combines theory, revision, and mock tests helps improve understanding and exam readiness.',
    },
];

const careerOpportunities = [
    { icon: '🛫', title: 'Commercial Airline Pilot', desc: 'Operate domestic and international passenger flights for scheduled airlines.' },
    { icon: '📦', title: 'Cargo Pilot', desc: 'Fly dedicated freight aircraft supporting logistics and supply chain operations.' },
    { icon: '🛩️', title: 'Charter Pilot', desc: 'Operate private and business aircraft for corporate clients and specialized travel.' },
    { icon: '💼', title: 'Corporate Pilot', desc: 'Work with businesses and organizations that operate private aircraft for executive transportation.' },
    { icon: '🎓', title: 'Flight Instructor', desc: 'Train aspiring pilots at approved Flying Training Organizations after meeting instructor qualification requirements.' },
    { icon: '🏛️', title: 'Government and Public Aviation', desc: 'Explore opportunities in government aviation departments and other specialized aviation services, subject to recruitment requirements.' },
];

const whyChooseWeOne = [
    'Experienced aviation instructors',
    'DGCA-focused ground classes',
    'Updated study materials',
    'Regular mock tests',
    'Performance tracking',
    'Personalized mentoring',
    'Career counselling',
    'Flexible learning options',
    'End-to-end guidance throughout the pilot training journey',
];

const quickAnswers = [
    {
        q: 'What is DGCA?',
        a: "DGCA stands for Directorate General of Civil Aviation. It is India's aviation regulator responsible for pilot licensing, aviation safety, flying school approvals, aircraft airworthiness, aviation medical standards, and civil aviation regulations.",
    },
    {
        q: 'Why is DGCA Important?',
        a: 'DGCA ensures that pilots, airlines, and aviation organizations operate according to established safety standards. It regulates pilot training, conducts examinations, approves Flying Training Organizations, and issues aviation licences.',
    },
    {
        q: 'Can You Become a Pilot Without DGCA?',
        a: 'No. Anyone pursuing a Commercial Pilot Licence in India must meet the licensing, medical, training, and examination requirements prescribed by DGCA.',
    },
];

const faqs = [
    {
        q: 'What is the full form of DGCA?',
        a: 'DGCA stands for Directorate General of Civil Aviation, the regulatory authority responsible for civil aviation safety and pilot licensing in India.',
    },
    {
        q: 'What is the role of DGCA in India?',
        a: 'DGCA regulates civil aviation by issuing pilot licences, approving flying schools, conducting examinations, overseeing aviation safety, and ensuring compliance with aviation regulations.',
    },
    {
        q: 'Is DGCA approval mandatory for pilot training?',
        a: 'To obtain an Indian Commercial Pilot Licence, candidates must complete training and meet the licensing requirements prescribed by DGCA.',
    },
    {
        q: 'Who conducts the DGCA examinations?',
        a: 'The Directorate General of Civil Aviation conducts theory examinations required for various pilot licences, including the Commercial Pilot Licence (CPL).',
    },
    {
        q: 'Why is DGCA important for aspiring pilots?',
        a: 'DGCA establishes the standards for pilot training, licensing, medical certification, and aviation safety, helping ensure that commercial pilots are properly trained and qualified.',
    },
];

const relatedPages = [
    { label: 'Commercial Pilot License', href: '/commercial-pilot-license' },
    { label: 'DGCA Ground Classes', href: '/dgca-ground-classes' },
    { label: 'CPL Eligibility', href: '/cpl-eligibility' },
    { label: 'CPL Syllabus', href: '/cpl-syllabus' },
    { label: 'How to Become a Pilot After 12th', href: '/how-to-become-a-pilot-after-12th' },
    { label: 'Pilot Training in India', href: '/pilot-training-in-india' },
    { label: 'RTR Full Form', href: '/rtr-full-form' },
    { label: 'PPL Full Form', href: '/ppl-full-form' },
    { label: 'CPL Full Form', href: '/cpl-full-form' },
];

// ─── Small reusable bits ──────────────────────────────────────────────────────

function BulletList({ items, dark }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? 'bg-av-orange' : 'bg-av-orange'}`} />
                    <span className={`text-sm leading-relaxed ${dark ? 'text-white/80' : 'text-gray-600'}`}>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DGCAPage() {
    return (
        <Layout
            title="DGCA Full Form: Meaning, Roles, Functions & Importance in Indian Aviation"
            description="Learn the DGCA full form, its meaning, history, functions, responsibilities, and role in pilot licensing and aviation safety. Complete guide for aspiring pilots."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Featured Snippet (AI Overview Optimized)</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        DGCA Full Form: Meaning, Roles, Functions &amp; Importance in Indian Aviation
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        What is the Full Form of DGCA?
                    </p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-5 max-w-3xl">
                        <p className="text-white/90 text-sm leading-relaxed">
                            DGCA stands for Directorate General of Civil Aviation. It is India&apos;s civil aviation regulatory authority under the Ministry of Civil Aviation. DGCA is responsible for regulating civil aviation, issuing pilot licences, approving flying schools, conducting pilot examinations, monitoring aviation safety, certifying aircraft airworthiness, and ensuring compliance with national and international aviation regulations.
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* ── DGCA at a Glance ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Overview</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue underline-orange">
                            DGCA at a Glance
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-xl shadow border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-4 py-3 text-left">Particular</th>
                                        <th className="px-4 py-3 text-left">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {glance.map((row, i) => (
                                        <tr key={row.topic} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 font-semibold text-av-blue align-top whitespace-nowrap">{row.topic}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What is DGCA ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">About DGCA</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue underline-orange">
                            What is DGCA?
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                The Directorate General of Civil Aviation (DGCA) is the regulatory body responsible for overseeing civil aviation activities in India. It establishes safety standards, regulates pilot training, certifies aviation personnel, supervises Flying Training Organizations (FTOs), and monitors airlines to ensure compliance with aviation regulations.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Every pilot, airline, aircraft operator, maintenance organization, and approved flying school in India must comply with DGCA regulations to maintain operational safety and regulatory standards.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                For aspiring pilots, DGCA plays a role throughout the licensing journey—from medical examinations and theory tests to issuing the Commercial Pilot Licence (CPL).
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What Does DGCA Do / Why Was DGCA Established / Why is DGCA Important ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 h-full flex flex-col">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">What Does DGCA Do?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                DGCA oversees nearly every aspect of civil aviation in India. Its objective is to ensure that aviation operations remain safe, standardized, and aligned with international best practices.
                            </p>
                            <p className="text-av-blue font-semibold text-sm mb-3">Its responsibilities include:</p>
                            <div className="flex-grow"><BulletList items={whatDgcaDoes} /></div>
                            <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">
                                These responsibilities help maintain public confidence in India&apos;s aviation system and ensure that pilots and operators meet required standards.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 h-full flex flex-col">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">Why Was DGCA Established?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                As aviation expanded, India needed a centralized authority to regulate aircraft operations, pilot qualifications, maintenance standards, and aviation safety.
                            </p>
                            <p className="text-av-blue font-semibold text-sm mb-3">DGCA was established to:</p>
                            <div className="flex-grow"><BulletList items={whyEstablished} /></div>
                            <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">
                                Today, DGCA continues to play a vital role in supporting one of the world&apos;s fastest-growing aviation markets.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-blue rounded-2xl p-7 h-full flex flex-col text-white">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-3">Why is DGCA Important?</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                Whether you&apos;re an aspiring pilot or an airline operator, DGCA affects almost every stage of aviation.
                            </p>
                            <p className="text-av-orange font-semibold text-sm mb-3">Without DGCA:</p>
                            <div className="flex-grow"><BulletList items={withoutDgca} dark /></div>
                            <p className="text-white/60 text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                                By enforcing regulations and monitoring compliance, DGCA helps ensure that aviation in India remains safe, reliable, and internationally recognized.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Key Functions of DGCA ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Functions</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Key Functions of <span className="text-av-orange">DGCA</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keyFunctions.map((fn, i) => (
                            <ScrollReveal key={fn.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {fn.num}
                                        </div>
                                        <span className="text-2xl">{fn.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-3">{fn.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{fn.intro}</p>
                                    {fn.list && (
                                        <>
                                            {fn.listIntro && <p className="text-av-blue font-semibold text-xs mb-2">{fn.listIntro}</p>}
                                            <div className="mb-3"><BulletList items={fn.list} /></div>
                                        </>
                                    )}
                                    <p className="text-gray-400 text-xs leading-relaxed mt-auto pt-3 border-t border-gray-100">{fn.outro}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How DGCA Supports Aviation Safety ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Safety</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            How DGCA Supports Aviation Safety
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Modern aviation depends on standardized regulations and continuous oversight. DGCA contributes to safer skies by:
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <BulletList items={supportsAviationSafety} />
                            <p className="text-gray-500 text-sm leading-relaxed mt-5 pt-5 border-t border-av-sky/20">
                                These activities create a regulatory framework that supports safe and efficient civil aviation in India.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── DGCA vs ICAO ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Clearing the Confusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue underline-orange">
                            DGCA and ICAO: What&apos;s the Relationship?
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Many people confuse DGCA with ICAO, but they serve different roles.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-xl shadow border border-gray-100 mb-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-4 py-3 text-left">DGCA</th>
                                        <th className="px-4 py-3 text-left">ICAO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dgcaVsIcao.map((row, i) => (
                                        <tr key={row.dgca} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 text-gray-600">{row.dgca}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.icao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-500 text-sm text-center leading-relaxed">
                            DGCA aligns many of its regulations with ICAO standards while adapting them to India&apos;s aviation environment.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Every Aspiring Pilot Should Understand DGCA + Expert Insight ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Why Every Aspiring Pilot Should Understand DGCA</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                For students planning a career in aviation, understanding DGCA is just as important as learning to fly. Every major milestone in the pilot training journey—including medical certification, theory examinations, flight training, and licence issuance—is governed by DGCA regulations.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Having a clear understanding of these requirements helps students make informed decisions, choose approved training pathways, and avoid unnecessary delays during the licensing process.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={150}>
                        <div className="bg-av-blue rounded-2xl p-8 h-full text-white">
                            <div className="section-tag">Expert Insight</div>
                            <h3 className="font-montserrat font-bold text-white text-xl mb-4">A Strong Foundation Leads to Better Pilot Training</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                One of the most common challenges faced by aspiring pilots is focusing only on flight hours while underestimating the importance of aviation theory. A solid understanding of subjects such as Air Navigation, Meteorology, and Air Regulations not only supports success in DGCA examinations but also contributes to better decision-making during real flight operations.
                            </p>
                            <p className="text-white/70 text-sm leading-relaxed">
                                At We One Aviation, students are encouraged to develop conceptual knowledge alongside practical skills, helping them prepare for both licensing requirements and long-term aviation careers.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── How DGCA Helps You Become a Commercial Pilot + Step-by-Step Process ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Pilot Career</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            How DGCA Helps You Become a <span className="text-av-orange">Commercial Pilot in India</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            If your goal is to become a commercial pilot, the Directorate General of Civil Aviation (DGCA) will be involved at every stage of your training and licensing journey. From verifying your eligibility to issuing your Commercial Pilot Licence (CPL), DGCA ensures that every pilot meets the required academic, medical, and operational standards.
                        </p>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Understanding the DGCA process early helps aspiring pilots plan their training more effectively and avoid unnecessary delays.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal className="text-center mb-10">
                        <h3 className="font-montserrat text-xl md:text-2xl font-bold text-white">
                            Step-by-Step DGCA Pilot Licensing Process
                        </h3>
                        <p className="text-white/60 mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
                            Below is the typical pathway to becoming a commercial pilot in India under DGCA regulations.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-5">
                        {licensingSteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 60}>
                                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-11 h-11 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                            {s.step}
                                        </div>
                                        <h4 className="font-montserrat font-bold text-white text-sm">Step {parseInt(s.step, 10)}: {s.title}</h4>
                                    </div>
                                    <p className="text-white/70 text-xs leading-relaxed mb-2">{s.desc}</p>
                                    {s.list && (
                                        <>
                                            {s.listIntro && <p className="text-av-orange font-semibold text-xs mb-2">{s.listIntro}</p>}
                                            <ul className="space-y-1.5 mb-2">
                                                {s.list.map((item) => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-av-orange flex-shrink-0" />
                                                        <span className="text-white/70 text-xs leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                    {s.outro && <p className="text-white/60 text-xs leading-relaxed mt-auto pt-2">{s.outro}</p>}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why DGCA-Approved Flying Schools Matter ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Choosing Right</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why DGCA-Approved Flying Schools Matter
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Choosing a DGCA-approved Flying Training Organization is one of the most important decisions for aspiring pilots.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Before enrolling, always verify that the academy is approved to conduct the relevant training.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">Approved training organizations provide:</h3>
                            <BulletList items={approvedFtoProvides} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Common Mistakes Aspiring Pilots Should Avoid ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-4">
                        <div className="section-tag">Avoid These</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Common Mistakes <span className="text-av-orange">Aspiring Pilots Should Avoid</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Many students unintentionally delay their pilot journey due to avoidable mistakes. Some of the most common include:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-6 mt-10">
                        {commonMistakes.map((m, i) => (
                            <ScrollReveal key={m.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex gap-4">
                                    <span className="text-3xl flex-shrink-0">{m.icon}</span>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-av-blue mb-2">{m.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Career Opportunities After DGCA Certification ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-4">
                        <div className="section-tag">Career Paths</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Career Opportunities <span className="text-av-orange">After DGCA Certification</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Completing DGCA requirements and obtaining a Commercial Pilot Licence opens the door to a wide range of aviation careers. Potential career opportunities include:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10">
                        {careerOpportunities.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <span className="text-3xl mb-3 block">{c.icon}</span>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{c.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto leading-relaxed">
                            As pilots gain experience and additional qualifications, they may progress to senior positions such as Captain, Training Captain, or Examiner.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Choose We One Aviation ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Why We One</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Choose <span className="text-av-orange">We One Aviation?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Beginning a pilot career requires more than just enrolling in a course—it requires guidance, structured learning, and continuous support.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-lg mb-5">
                                At We One Aviation, we help aspiring pilots build a strong foundation by offering:
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-x-8">
                                <BulletList items={whyChooseWeOne} />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mt-6 pt-6 border-t border-gray-100">
                                Our focus is on helping students understand aviation concepts, prepare confidently for DGCA examinations, and take the next step toward becoming professional pilots.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Quick Answers ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Quick Answers</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue underline-orange">
                            At a Glance
                        </h2>
                    </ScrollReveal>
                    <div className="space-y-5">
                        {quickAnswers.map((qa, i) => (
                            <ScrollReveal key={qa.q} delay={i * 80}>
                                <div className="bg-av-blue rounded-2xl p-6 text-white">
                                    <h3 className="font-montserrat font-bold text-av-orange mb-2">{qa.q}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">{qa.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <ScrollReveal key={f.q} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{i + 1}. {f.q}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Related Pages ── */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Explore More</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">
                            Related <span className="text-av-orange">Pages</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="flex flex-wrap justify-center gap-3">
                            {relatedPages.map((p) => (
                                <Link
                                    key={p.href}
                                    href={p.href}
                                    className="bg-white border border-gray-200 hover:border-av-orange hover:text-av-orange text-av-blue text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                                >
                                    {p.label}
                                </Link>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Any Query About Pilot Training</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                            Want to Start Your <span className="text-av-orange">Pilot Training Journey?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Our aviation career counsellors will guide you through DGCA exams, medical tests, flying school selection, and everything you need to become a licensed pilot.
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