import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '2', label: 'Training Programs', icon: '🎓' },
    { num: '200 Hrs', label: 'CPL Flying Hours', icon: '✈️' },
    { num: 'DGCA', label: 'Approved', icon: '🏅' },
    { num: '18-24 Mo', label: 'CPL Duration', icon: '📅' },
];

const programs = [
    {
        tag: 'Most Popular',
        code: 'CPL',
        title: 'Commercial Pilot License (CPL)',
        desc: "The CPL allows you to fly aircraft commercially and get paid for your services. It's the primary license for those aspiring to become airline pilots.",
        duration: '18-24 months',
        cost: '₹35-50 Lakhs',
        flying: '200 flying hours',
        features: [
            'Fly commercial aircraft',
            'Employment eligibility',
            'Multi-engine rating included',
            'Instrument rating training',
        ],
        highlight: true,
    },
    {
        tag: null,
        code: 'PPL',
        title: 'Private Pilot License (PPL)',
        desc: "The PPL allows you to fly single-engine aircraft for personal use. It's often the first step for aspiring commercial pilots.",
        duration: '6-12 months',
        cost: '₹10-15 Lakhs',
        flying: '40 flying hours',
        features: [
            'Fly for personal use',
            'Foundation for CPL',
            'Single-engine aircraft',
            'Day VFR operations',
        ],
        highlight: false,
    },
];

const eligibility = [
    { icon: '🎂', title: 'Minimum Age', desc: '17 years (PPL), 18 years (CPL)' },
    { icon: '📚', title: 'Education', desc: '10+2 with Physics & Mathematics' },
    { icon: '🏥', title: 'Medical', desc: 'Class 1/2 Medical Certificate' },
    { icon: '🗣️', title: 'English', desc: 'ICAO Level 4 proficiency' },
    { icon: '👁️', title: 'Vision', desc: '6/6 (correctable)' },
    { icon: '📏', title: 'Height', desc: 'No specific requirement' },
];

const syllabus = [
    { icon: '🗺️', title: 'Air Navigation', desc: 'Maps, charts, flight planning, navigation systems' },
    { icon: '🌤️', title: 'Meteorology', desc: 'Weather systems, forecasts, aviation weather' },
    { icon: '📋', title: 'Air Regulations', desc: 'Aviation law, DGCA rules, airspace' },
    { icon: '⚙️', title: 'Technical General', desc: 'Aerodynamics, aircraft systems, instruments' },
    { icon: '🛩️', title: 'Technical Specific', desc: 'Aircraft type-specific knowledge' },
    { icon: '📻', title: 'Radio Telephony', desc: 'Communication procedures, phraseology' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PilotTrainingProgramsPage() {
    return (
        <Layout
            title="Pilot Training Programs – CPL & PPL in India | DGCA Approved | AviationGuide"
            description="Explore DGCA-approved Commercial Pilot License (CPL) and Private Pilot License (PPL) training programs in India. Compare duration, cost, flying hours, eligibility, and syllabus."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Training Programs</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Become a Professional Pilot
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        World-class training programs designed to launch your aviation career. Train with experienced instructors on modern aircraft.
                    </p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Programs Available</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">CPL &amp; PPL — DGCA Approved</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Choose the right program to kickstart your aviation career. Compare eligibility, costs, and syllabus below.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-lg font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── Programs ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Our Training Programs</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Choose the Right <span className="text-av-orange">Program</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Choose the right program to kickstart your aviation career.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {programs.map((prog, i) => (
                            <ScrollReveal key={prog.code} delay={i * 120}>
                                <div className={`relative rounded-2xl p-8 h-full flex flex-col shadow-sm border ${prog.highlight ? 'bg-av-blue border-av-orange/40' : 'bg-white border-gray-100 card-hover hover:border-av-orange/30'}`}>

                                    {/* Most Popular Badge */}
                                    {prog.tag && (
                                        <div className="absolute -top-3 left-8">
                                            <span className="bg-av-orange text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                                                {prog.tag}
                                            </span>
                                        </div>
                                    )}

                                    {/* Code Badge */}
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl font-montserrat font-black text-xl mb-5 ${prog.highlight ? 'bg-av-orange text-white' : 'bg-av-blue text-white'}`}>
                                        {prog.code}
                                    </div>

                                    <h3 className={`font-montserrat font-bold text-xl mb-3 ${prog.highlight ? 'text-white' : 'text-av-blue'}`}>
                                        {prog.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed mb-6 ${prog.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                                        {prog.desc}
                                    </p>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {[
                                            { label: 'Duration', val: prog.duration },
                                            { label: 'Cost', val: prog.cost },
                                            { label: 'Flying', val: prog.flying },
                                        ].map(stat => (
                                            <div key={stat.label} className={`rounded-xl p-3 text-center ${prog.highlight ? 'bg-white/10' : 'bg-av-light border border-av-sky/20'}`}>
                                                <div className={`font-montserrat font-bold text-xs ${prog.highlight ? 'text-av-orange' : 'text-av-blue'}`}>{stat.val}</div>
                                                <div className={`text-xs mt-0.5 ${prog.highlight ? 'text-white/50' : 'text-gray-400'}`}>{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-8 flex-grow">
                                        {prog.features.map(f => (
                                            <li key={f} className={`flex items-center gap-2 text-sm ${prog.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                                                <span className="text-av-orange font-bold text-base leading-none">*</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/contact"
                                        className={`inline-block text-center px-6 py-3 rounded-full font-semibold text-sm transition-all ${prog.highlight ? 'bg-av-orange text-white hover:bg-white hover:text-av-blue' : 'bg-av-blue text-white hover:bg-av-orange'}`}
                                    >
                                        Learn More →
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Requirements</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility <span className="text-av-orange">Criteria</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Before starting your pilot training, ensure you meet the following requirements set by DGCA for obtaining a pilot license in India.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {eligibility.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 flex items-start gap-4">
                                    <div className="text-3xl flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-av-blue mb-1">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="text-center">
                        <Link href="/eligibility" className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Check Full Eligibility →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Syllabus ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Training Syllabus</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Comprehensive <span className="text-av-orange">Curriculum</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Comprehensive curriculum covering all aspects of aviation theory and practice.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {syllabus.map((subject, i) => (
                            <ScrollReveal key={subject.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-5 h-full flex items-start gap-4">
                                    <div className="text-3xl flex-shrink-0">{subject.icon}</div>
                                    <div>
                                        <h4 className="font-montserrat font-bold text-white text-sm mb-1">{subject.title}</h4>
                                        <p className="text-white/70 text-xs leading-relaxed">{subject.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="text-center">
                        <Link href="/syllabus" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            View Complete Syllabus →
                        </Link>
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