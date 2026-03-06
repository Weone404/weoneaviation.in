import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '10+2', label: 'Min. Education', icon: '🎓' },
    { num: 'Class 2', label: 'Medical Required', icon: '🩺' },
    { num: 'DGCA', label: 'Approved Body', icon: '🏛️' },
    { num: 'CPL', label: 'Goal License', icon: '🪪' },
];

const steps = [
    {
        num: '01',
        icon: '✅',
        title: 'Eligibility Criteria',
        shortDesc: 'Meet DGCA requirements before enrolling.',
        details: [
            'Minimum educational qualification of 10+2 with Physics and Mathematics.',
            'A Class 2 Medical Certificate.',
            'Fluency in English.',
        ],
        note: 'Before enrolling in a pilot training program, you must ensure that you meet the eligibility criteria set by the Directorate General of Civil Aviation (DGCA) in India.',
    },
    {
        num: '02',
        icon: '🏫',
        title: 'Enroll in a Pilot Training Program',
        shortDesc: 'Join a reputed flight school.',
        details: [],
        note: 'Once you meet the eligibility criteria, you can enroll in a pilot training program offered by reputed flight schools like Weone Aviation. This training program will provide you with the necessary theoretical knowledge and practical flying experience required to become a pilot.',
    },
    {
        num: '03',
        icon: '📚',
        title: 'Ground Training',
        shortDesc: 'Learn theory — regulations, meteorology, navigation.',
        details: [],
        note: 'During the pilot training program, you will undergo ground training that covers subjects such as aviation regulations, meteorology, navigation, and aircraft systems. This theoretical knowledge is essential for passing the written examinations conducted by the DGCA.',
    },
    {
        num: '04',
        icon: '✈️',
        title: 'Flight Training',
        shortDesc: 'Fly under experienced instructors.',
        details: [],
        note: 'After completing the ground training, you will progress to flight training, where you will learn how to operate an aircraft under the guidance of experienced flight instructors. This hands-on experience is crucial for developing your piloting skills and gaining confidence in the cockpit.',
    },
    {
        num: '05',
        icon: '🪪',
        title: 'Obtain a Commercial Pilot License (CPL)',
        shortDesc: 'Pass DGCA exams and get your CPL.',
        details: [],
        note: 'Upon successfully completing the required flying hours and passing the DGCA examinations, you will be eligible to obtain a Commercial Pilot License (CPL). This license allows you to fly as a professional pilot and pursue a career in the aviation industry.',
    },
    {
        num: '06',
        icon: '📊',
        title: 'Build Flight Experience',
        shortDesc: 'Gain hours through instruction, surveys, charters.',
        details: [],
        note: 'After obtaining your CPL, you will need to gain more flying experience to qualify for employment opportunities with airlines or charter companies. You can build your flight hours by working as a flight instructor, conducting aerial surveys, or flying chartered flights.',
    },
];

const whyWeOne = [
    { icon: '🏆', text: 'Industry-recognized training programs.' },
    { icon: '🛡️', text: 'Emphasis on safety and professionalism.' },
    { icon: '🛩️', text: 'Practical hands-on training.' },
    { icon: '💼', text: 'Placement assistance for aspiring pilots.' },
];

const courses = [
    { num: '1', title: 'Private Pilot License (PPL)', icon: '🛩️' },
    { num: '2', title: 'Commercial Pilot License (CPL)', icon: '✈️' },
    { num: '3', title: 'Multi-Engine Rating', icon: '⚙️' },
    { num: '4', title: 'Instrument Rating', icon: '🎛️' },
    { num: '5', title: 'Airline Transport Pilot License (ATPL)', icon: '🏅' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowToBecomeAPilotInIndiaPage() {
    return (
        <Layout
            title="Your Guide on How to Become a Pilot in India – Weone Aviation"
            description="Step-by-step guide on how to become a pilot in India. Learn about eligibility, ground training, flight training, CPL licensing, and pilot training courses at Weone Aviation."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Career Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Your Guide on How to Become a Pilot in India
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        Are you passionate about flying and aspire to become a pilot in India? <strong className="text-white">Weone Aviation</strong> is here to guide you through the process of achieving your dream career in aviation.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        In this article, we will provide you with a step-by-step guide on how to become a pilot in India, with a focus on the professional training provided by Weone Aviation.
                    </p>
                    <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                        Start Your Journey →
                    </Link>
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

            {/* ── Intro ── */}
            <section className="py-14 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Overview</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-5">
                            How to Become a <span className="text-av-orange">Pilot in India</span>
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Becoming a pilot in India requires dedication, hard work, and undergoing proper training. Here are the steps you need to follow to fulfill your aspiration:
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Steps – Overview Cards ── */}
            <section className="py-10 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {steps.map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 70}>
                                <div className="card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-av-orange/30 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{step.num}</div>
                                    <div>
                                        <div className="text-xl mb-1">{step.icon}</div>
                                        <h3 className="font-montserrat font-bold text-av-blue text-sm">{step.title}</h3>
                                        <p className="text-av-orange text-xs font-semibold mt-0.5">{step.shortDesc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Steps Detail ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Step 1 */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="section-tag">Step 1</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                                Eligibility Criteria
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">{steps[0].note}</p>
                            <p className="text-av-blue font-semibold text-sm mb-3">The basic requirements include:</p>
                            <ul className="space-y-3">
                                {steps[0].details.map(d => (
                                    <li key={d} className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20 text-sm text-gray-600">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white text-center">
                                <div className="text-5xl mb-4">✅</div>
                                <p className="font-montserrat font-black text-white text-2xl mb-2">Are You Eligible?</p>
                                <p className="text-white/70 text-sm leading-relaxed mb-5">Check all three requirements before taking the next step toward your pilot career.</p>
                                <Link href="/cpl-eligibility" className="inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                                    Check Full Eligibility →
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Steps 2–4 */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.slice(1, 4).map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 h-full flex flex-col">
                                    <div className="section-tag mb-2">Step {parseInt(step.num)}</div>
                                    <div className="text-3xl mb-3">{step.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-lg mb-3">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{step.note}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Steps 5–6 */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {steps.slice(4).map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 100}>
                                <div className={`rounded-2xl p-8 h-full ${i === 0 ? 'bg-av-blue text-white' : 'bg-white border border-gray-100 shadow-lg'}`}>
                                    <div className="section-tag mb-3">Step {parseInt(step.num)}</div>
                                    <div className="text-3xl mb-3">{step.icon}</div>
                                    <h3 className={`font-montserrat font-bold text-xl mb-4 ${i === 0 ? 'text-white' : 'text-av-blue'}`}>{step.title}</h3>
                                    <p className={`text-sm leading-relaxed ${i === 0 ? 'text-white/80' : 'text-gray-500'}`}>{step.note}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── Pilot Training at Weone Aviation ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Our Academy</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Pilot Training at <span className="text-av-orange">Weone Aviation</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Weone Aviation is a leading flight training academy in India that offers top-notch pilot training programs for aspiring aviators. With state-of-the-art facilities, experienced instructors, and a fleet of modern aircraft, Weone Aviation equips you with the skills and knowledge needed to excel in the aviation industry.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Why Choose */}
                        <ScrollReveal>
                            <h3 className="font-montserrat font-bold text-white text-2xl mb-6">
                                Why Choose <span className="text-av-orange">Weone Aviation?</span>
                            </h3>
                            <div className="space-y-4">
                                {whyWeOne.map(item => (
                                    <div key={item.text} className="glass rounded-xl p-4 flex items-center gap-4">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <p className="text-white/80 text-sm">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Courses */}
                        <ScrollReveal delay={200}>
                            <h3 className="font-montserrat font-bold text-white text-2xl mb-6">
                                Training Courses <span className="text-av-orange">Offered by Weone Aviation</span>
                            </h3>
                            <div className="space-y-3">
                                {courses.map((course, i) => (
                                    <div key={course.num} className="glass rounded-xl p-4 flex items-center gap-4">
                                        <div className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{course.num}</div>
                                        <span className="text-xl flex-shrink-0">{course.icon}</span>
                                        <p className="text-white font-semibold text-sm">{course.title}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Conclusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            In <span className="text-av-orange">Conclusion</span>
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 mb-8">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Becoming a pilot in India is a rewarding career path that requires commitment, perseverance, and proper training. By enrolling in a pilot training program at <strong className="text-av-blue">Weone Aviation</strong>, you can turn your dream of flying into reality. Follow the steps outlined in this guide and start your journey towards a successful career as a pilot in India.
                            </p>
                        </div>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Enroll at Weone Aviation →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}