import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data (verbatim from source content) ───────────────────────────────────

const processSteps = [
    {
        num: '1',
        icon: '🎓',
        title: 'Complete Class 12',
        desc: 'The first step is successfully completing your higher secondary education. Students aspiring to become commercial pilots should have studied Physics and Mathematics, as these subjects are generally required for CPL eligibility.',
    },
    {
        num: '2',
        icon: '🔢',
        title: 'Obtain a DGCA Computer Number',
        desc: 'A DGCA Computer Number is required before appearing for DGCA theory examinations. This unique identification number allows candidates to register for examinations and continue the licensing process.',
    },
    {
        num: '3',
        icon: '🩺',
        title: 'Clear DGCA Class II & Class I Medical Examination',
        desc: 'Medical fitness is one of the most important requirements for pilot training.',
        note: 'You must undergo:',
        list: ['DGCA Class II Medical Examination', 'DGCA Class I Medical Examination'],
        footnote: 'These medical assessments evaluate vision, hearing, cardiovascular health, neurological fitness, and overall physical condition to ensure candidates meet aviation medical standards.',
    },
    {
        num: '4',
        icon: '📚',
        title: 'Join DGCA Ground Classes',
        desc: 'Ground school prepares students for DGCA theory examinations and builds the academic foundation required for professional flying.',
        note: 'Core subjects include:',
        list: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Technical General', 'Technical Specific', 'Flight Planning', 'Aviation Safety'],
        footnote: 'Professional ground classes also include mock tests, revision sessions, and expert guidance to improve examination performance.',
    },
    {
        num: '5',
        icon: '📝',
        title: 'Pass DGCA Theory Examinations',
        desc: 'Candidates must clear the required DGCA theory papers before obtaining a Commercial Pilot Licence.',
        footnote: 'Consistent preparation, structured study plans, and practice examinations significantly improve success rates.',
    },
    {
        num: '6',
        icon: '🛩️',
        title: 'Join a DGCA-Approved Flying Training Organization (FTO)',
        desc: 'After completing the initial academic requirements, students enroll in a DGCA-approved flying school to begin practical flight training.',
        note: 'During this phase, students learn:',
        list: ['Aircraft familiarization', 'Pre-flight inspections', 'Aircraft handling', 'Take-off procedures', 'Navigation flights', 'Instrument flying', 'Emergency procedures', 'Cross-country flying', 'Night flying', 'Radio communication'],
        footnote: 'Flight training combines simulator sessions, instructor-led flights, and solo flying experience.',
    },
    {
        num: '7',
        icon: '⏱️',
        title: 'Complete the Required Flying Hours',
        desc: 'To qualify for a Commercial Pilot Licence (CPL), students must complete the flying hours prescribed by the DGCA. These hours include dual instruction, solo flying, cross-country flights, instrument training, and night flying, helping pilots gain practical experience under different operating conditions.',
    },
    {
        num: '8',
        icon: '🪪',
        title: 'Obtain Your Commercial Pilot Licence (CPL)',
        desc: 'After successfully completing the required flight training, DGCA examinations, medical assessments, and flying hour requirements, candidates can apply for their Commercial Pilot Licence.',
        footnote: 'The CPL allows pilots to pursue professional flying careers with airlines, charter operators, cargo companies, and other aviation organizations.',
    },
];

const eligibilityList = [
    'Completion of Class 12 from a recognized board',
    'Physics and Mathematics at the 10+2 level',
    'Minimum age as prescribed by DGCA for licence requirements',
    'Valid DGCA medical fitness',
    'English language proficiency',
    'Successful completion of DGCA examinations and flight training',
];

const skillsList = [
    { icon: '🗣️', label: 'Communication skills' },
    { icon: '🧭', label: 'Decision-making ability' },
    { icon: '🎖️', label: 'Leadership' },
    { icon: '🧩', label: 'Problem-solving' },
    { icon: '👁️', label: 'Situational awareness' },
    { icon: '⏰', label: 'Time management' },
    { icon: '🤝', label: 'Teamwork' },
    { icon: '📏', label: 'Discipline' },
    { icon: '💪', label: 'Confidence' },
    { icon: '📊', label: 'Analytical thinking' },
    { icon: '🧘', label: 'Stress management' },
    { icon: '🛡️', label: 'Safety awareness' },
];

const careerList = [
    'Commercial Airlines',
    'Regional Airlines',
    'Charter Aviation',
    'Cargo Airlines',
    'Corporate Aviation',
    'Flight Instruction',
    'Government Aviation Services',
    'Air Ambulance Operations',
    'Aerial Survey',
    'Aviation Training Organizations',
];

const offerList = [
    'DGCA Ground Classes',
    'Experienced Aviation Faculty',
    'Updated Study Material',
    'Mock Tests & Performance Analysis',
    'Individual Mentorship',
    'Career Counselling',
    'Flexible Learning Options',
    'Admission Guidance',
    'End-to-End Pilot Career Support',
];

const faqs = [
    {
        q: 'Can I become a pilot after 12th?',
        a: 'Yes. Students who complete Class 12 and meet DGCA eligibility requirements can begin the process of becoming a commercial pilot.',
    },
    {
        q: 'Which subjects are required to become a pilot after 12th?',
        a: 'Physics and Mathematics are generally required for Commercial Pilot Licence (CPL) eligibility in India.',
    },
    {
        q: 'How long does it take to become a commercial pilot?',
        a: 'Most students complete their training in approximately 18–24 months, depending on flying hours, examinations, and training progress.',
    },
    {
        q: 'Is NEET or JEE required to become a pilot?',
        a: 'No. Admission to commercial pilot training does not require NEET or JEE. Candidates must meet DGCA eligibility criteria and complete the required training.',
    },
    {
        q: 'What is the first step to becoming a pilot after 12th?',
        a: 'The first step is completing Class 12, meeting DGCA eligibility requirements, and starting your ground training and medical certification process.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BecomeAPilotPage() {
    return (
        <Layout
            title="How to Become a Pilot After 12th in India | Complete Guide 2026"
            description="Learn how to become a pilot after 12th in India. Check eligibility, DGCA requirements, pilot training process, fees, duration, salary, and career opportunities with We One Aviation."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Career Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        How to Become a Pilot After 12th in India – Complete Step-by-Step Guide
                    </h1>
                    <h2 className="text-white/80 font-montserrat font-semibold text-lg mb-4">
                        Dreaming of Becoming a Pilot After 12th?
                    </h2>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        If you've just completed your 12th grade and dream of flying commercial aircraft, you're already at the right stage to begin your aviation journey. Becoming a pilot is one of the most respected and rewarding career paths, offering opportunities to travel the world, work with leading airlines, and enjoy excellent career growth.
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        However, becoming a commercial pilot involves more than learning to fly. You must meet the eligibility requirements, clear DGCA examinations, complete medical assessments, undergo professional flight training, and obtain a Commercial Pilot Licence (CPL) issued by the Directorate General of Civil Aviation (DGCA).
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        This guide explains every step of becoming a pilot after 12th, including eligibility, training, costs, duration, salary, and career opportunities.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Can You Become a Pilot After 12th? ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Getting Started</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            Can You Become a Pilot <span className="text-av-orange">After 12th?</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Yes. You can become a pilot after completing Class 12, provided you meet the eligibility requirements set by the DGCA.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Students who have studied Physics and Mathematics in Class 12 can directly pursue commercial pilot training. If you did not have these subjects in school, you can still become eligible by completing Physics and Mathematics through recognized open schooling or equivalent qualifications accepted under DGCA regulations.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Starting your pilot training soon after 12th allows you to complete your licence earlier and begin your aviation career at a younger age.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Step-by-Step Process ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">The Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Step-by-Step Process to Become a <span className="text-av-orange">Pilot After 12th</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {processSteps.map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 60}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{step.num}</div>
                                        <span className="text-2xl">{step.icon}</span>
                                        <h3 className="font-montserrat font-bold text-av-blue text-sm leading-snug">Step {step.num}: {step.title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                                    {step.note && (
                                        <p className="text-av-blue text-xs font-semibold mt-3 mb-1">{step.note}</p>
                                    )}
                                    {step.list && (
                                        <ul className="space-y-1 mt-1">
                                            {step.list.map(li => (
                                                <li key={li} className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed">
                                                    <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{li}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {step.footnote && (
                                        <p className="text-gray-500 text-xs leading-relaxed mt-3">{step.footnote}</p>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility to Become a <span className="text-av-orange">Pilot After 12th</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">To begin your pilot journey, you should generally meet the following requirements:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {eligibilityList.map(item => (
                            <ScrollReveal key={item}>
                                <div className="flex items-start gap-3 p-4 bg-av-light rounded-xl border border-av-sky/20">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                    <p className="text-sm text-gray-600">{item}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <p className="text-center text-gray-400 text-xs">Always verify the latest eligibility requirements with DGCA before starting your training.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Skills ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Skills</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Skills Every <span className="text-av-orange">Pilot Should Develop</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Successful pilots possess more than technical knowledge. Key skills include:</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {skillsList.map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 40}>
                                <div className="card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <p className="text-av-blue font-semibold text-xs">{item.label}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-6">
                        <p className="text-center text-gray-500 text-sm">Developing these skills during training contributes to long-term success in the aviation industry.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Duration ── */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Duration</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-5">
                            How Long Does It Take to Become a <span className="text-av-orange">Pilot After 12th?</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            The time required depends on factors such as training schedule, weather conditions, examination completion, and flying hour availability.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            On average, students can complete the process in <strong className="text-av-blue">18 to 24 months</strong>, although timelines may vary depending on individual progress and training availability.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Cost ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Training Cost</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-5">
                            Cost of Becoming a <span className="text-av-orange">Pilot After 12th</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            The overall cost of pilot training depends on several factors, including the flying school, aircraft type, simulator training, accommodation, examination fees, and additional aviation requirements.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Prospective students should evaluate the quality of training, instructor experience, infrastructure, and career support when comparing pilot training programs.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Career Opportunities ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Careers</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Career Opportunities After <span className="text-av-orange">Becoming a Pilot</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">After obtaining a Commercial Pilot Licence, pilots can pursue careers in:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                        {careerList.map((item, i) => (
                            <ScrollReveal key={item} delay={i * 50}>
                                <div className="card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <p className="font-montserrat font-bold text-av-blue text-sm">{item}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto">As pilots gain experience and additional qualifications, they can progress to senior roles, including airline captain and flight instructor.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Choose We One Aviation ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Why We One Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Why Choose <span className="text-av-orange">We One Aviation?</span>
                        </h2>
                        <p className="text-white/70 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            At We One Aviation, we provide aspiring pilots with comprehensive guidance from the first step of their aviation journey. Our experienced faculty, structured DGCA ground training, personalized mentoring, and career-focused approach help students build a strong foundation for successful pilot training.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="glass rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-lg mb-6 text-center">What We Offer</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {offerList.map(item => (
                                    <div key={item} className="flex items-start gap-2 text-white/80 text-sm">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 text-xs text-center mt-6">Our objective is to help students prepare confidently for DGCA examinations and take the next step toward a successful career in aviation.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Start Your Journey CTA ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Get Started</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-5">
                            Start Your <span className="text-av-orange">Pilot Journey Today</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            Choosing to become a pilot after 12th is the beginning of an exciting and rewarding career. With the right guidance, structured training, and dedication, you can achieve your dream of flying professionally.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Whether you're exploring aviation for the first time or ready to start your Commercial Pilot Licence journey, We One Aviation is here to support you at every stage.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Contact We One Aviation today to learn more about pilot training, DGCA ground classes, admission guidance, and the pathway to becoming a commercial pilot after 12th.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Contact We One Aviation →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQs</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 60}>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-montserrat font-bold text-av-blue text-sm mb-2">{i + 1}. {faq.q}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

        </Layout>
    );
}