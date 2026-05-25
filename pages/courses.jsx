import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSlides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
        tag: 'WeOne Aviation Academy',
        title: 'Pilot Training',
        highlight: 'Courses & Programs',
        sub: 'DGCA Approved Ground Classes, CPL, PPL & International Flight Training — everything you need to fly professionally.',
    },
];

const stats = [
    { num: '500+', label: 'Students Trained', icon: '🎓' },
    { num: '3', label: 'Training Countries', icon: '🌍' },
    { num: '100%', label: 'DGCA Approved', icon: '✅' },
    { num: '₹1.5L+', label: 'Avg Starting Salary/mo', icon: '💰' },
];

const courses = [
    {
        id: 'cpl',
        tag: 'Most Popular',
        tagColor: 'bg-av-orange',
        icon: '✈️',
        title: 'Commercial Pilot License (CPL)',
        subtitle: 'Fly for airlines professionally',
        duration: '18–24 months',
        hours: '200 hours',
        eligibility: '10+2 PCM',
        fee: '₹40–50 Lakh',
        authority: 'DGCA India',
        highlights: [
            'Ground school + simulator + flight training',
            'DGCA exam preparation included',
            'Airline interview prep & placement support',
            'Training options in India, USA & South Africa',
        ],
        href: '/commercial-pilot-license',
        ctaLabel: 'Explore CPL Course →',
        bg: 'from-av-blue to-av-navy',
    },
    {
        id: 'ppl',
        tag: 'Beginner Friendly',
        tagColor: 'bg-green-500',
        icon: '🛩️',
        title: 'Private Pilot License (PPL)',
        subtitle: 'Your first step into the skies',
        duration: '6–12 months',
        hours: '40–50 hours',
        eligibility: '10+2 (any stream)',
        fee: '₹7.5–10 Lakh',
        authority: 'DGCA India',
        highlights: [
            'Solo & cross-country flights',
            'Night flying & instrument basics',
            'Foundation for CPL upgrade',
            'Flexible full-time & weekend batches',
        ],
        href: '/private-pilot-license',
        ctaLabel: 'Explore PPL Course →',
        bg: 'from-slate-700 to-slate-900',
    },
    {
        id: 'dgca',
        tag: 'Ground Training',
        tagColor: 'bg-blue-500',
        icon: '📚',
        title: 'DGCA Ground Classes',
        subtitle: 'Crack DGCA exams with expert guidance',
        duration: '4–6 months',
        hours: '500+ hours',
        eligibility: '10+2 PCM',
        fee: '₹2–3 Lakh',
        authority: 'DGCA India',
        highlights: [
            'Air Navigation, Meteorology, Air Regulations',
            'Technical General & Technical Specific',
            'RTR (Radio Telephony) preparation',
            'Mock tests, past papers & doubt sessions',
        ],
        href: '/dgca-ground-classes',
        ctaLabel: 'Explore Ground Classes →',
        bg: 'from-indigo-700 to-indigo-900',
    },
    {
        id: 'usa',
        tag: 'International',
        tagColor: 'bg-red-500',
        icon: '🇺🇸',
        title: 'Flight Training in USA',
        subtitle: 'FAA certified pilot training abroad',
        duration: '12–18 months',
        hours: '250+ hours',
        eligibility: '10+2 PCM + Passport',
        fee: '₹45–65 Lakh',
        authority: 'FAA (USA)',
        highlights: [
            'FAA PPL & CPL certification',
            'World-class training infrastructure',
            'Convert FAA license to DGCA on return',
            'Visa & travel assistance provided',
        ],
        href: '/flight-training-usa',
        ctaLabel: 'Explore USA Training →',
        bg: 'from-red-800 to-red-950',
    },
    {
        id: 'southafrica',
        tag: 'International',
        tagColor: 'bg-yellow-500',
        icon: '🇿🇦',
        title: 'Flight Training in South Africa',
        subtitle: 'Cost-effective international training',
        duration: '12–18 months',
        hours: '200+ hours',
        eligibility: '10+2 PCM + Passport',
        fee: '₹35–50 Lakh',
        authority: 'SACAA',
        highlights: [
            'SACAA approved flying schools',
            'Excellent weather for year-round flying',
            'Budget-friendly vs USA & Australia',
            'Convert license to DGCA on return',
        ],
        href: '/flight-training-south-africa',
        ctaLabel: 'Explore South Africa Training →',
        bg: 'from-yellow-700 to-yellow-900',
    },
    {
        id: 'scholarship',
        tag: '🎁 Scholarship Available',
        tagColor: 'bg-purple-600',
        icon: '🏆',
        title: 'Topper Scholarship Program',
        subtitle: 'Class 10 & 12 toppers fly at zero cost',
        duration: 'Varies',
        hours: 'All programs',
        eligibility: 'Class 10 / 12 Toppers',
        fee: 'Money-Back Guarantee',
        authority: 'WeOne Aviation',
        highlights: [
            'Full money-back guarantee for toppers',
            'Applicable on CPL & Ground Class programs',
            'Limited seats — apply now',
            'Free career counselling included',
        ],
        href: '/contact',
        ctaLabel: 'Apply for Scholarship →',
        bg: 'from-purple-700 to-purple-950',
    },
];

const syllabus = [
    {
        phase: 'Phase 1: Ground School',
        duration: '3–4 months',
        topics: ['Air Navigation', 'Meteorology', 'Air Regulations', 'Technical General', 'RTR (Radio Telephony)', 'Aviation Medicine'],
    },
    {
        phase: 'Phase 2: PPL Training',
        duration: '4–5 months',
        topics: ['Solo flights', 'Cross-country flying', 'Night flying', 'Basic instrument flying', 'Emergency procedures', 'PPL skill test'],
    },
    {
        phase: 'Phase 3: CPL Flying',
        duration: '8–10 months',
        topics: ['Instrument Rating (IR)', 'Multi-engine rating', 'Advanced navigation', 'CPL skill test', 'Type rating prep', 'Airline interview prep'],
    },
];

const eligibilityList = [
    { label: 'Age', desc: 'Minimum 17 years for PPL; 18 years for CPL.' },
    { label: 'Education', desc: '10+2 with Physics and Mathematics (PCM). Minimum 50% marks.' },
    { label: 'DGCA Class 1–2 Medical', desc: 'Candidate must clear DGCA Class 1 and Class 2 medical examinations.' },
    { label: 'Total Flight Hours', desc: 'Minimum 200 hours of flight time required for CPL (DGCA mandate).' },
    { label: 'PIC Hours', desc: '100 hours as Pilot-in-Command (PIC) for CPL eligibility.' },
    { label: 'Instrument Flying', desc: 'At least 10 hours of instrument flying instruction required.' },
    { label: 'Language Proficiency', desc: 'English proficiency (written and verbal) is mandatory.' },
    { label: 'Nationality', desc: 'Indian citizen or OCI holder required for DGCA licensing.' },
];

const salaryData = [
    { level: 'First Officer (Beginner)', range: '₹1.5 – 3 Lakh/month', annual: '₹18 – 36 Lakh/year' },
    { level: 'Senior First Officer', range: '₹5 – 10 Lakh/month', annual: '₹60 Lakh – 1.2 Crore/year' },
    { level: 'Captain (Senior Pilot)', range: '₹12 – 25 Lakh/month', annual: '₹1.5 Crore – 3 Crore/year' },
];

const whyWeOne = [
    { icon: '🏛️', title: 'DGCA Approved', desc: 'All our programs are fully approved and regulated by DGCA, ensuring your license is valid nationwide.' },
    { icon: '🌍', title: 'International Training', desc: 'We offer flight training in USA and South Africa for global exposure and FAA / SACAA certification.' },
    { icon: '👨‍✈️', title: 'Expert Instructors', desc: 'Learn from experienced commercial pilots and DGCA-certified ground instructors.' },
    { icon: '📈', title: 'Placement Support', desc: '100% placement assistance with airline interview prep and career counselling.' },
    { icon: '💸', title: 'Budget Friendly', desc: 'Affordable ground classes starting at ₹2 Lakh. Scholarship available for class toppers.' },
    { icon: '🏥', title: 'Medical Assistance', desc: 'We assist with DGCA Class 1 & Class 2 medical tests through our approved network.' },
];

const careerOptions = [
    { icon: '✈️', title: 'Airline Pilot', salary: '₹1.5–10 Lakh/mo' },
    { icon: '📦', title: 'Cargo Pilot', salary: '₹2–5 Lakh/mo' },
    { icon: '🛩️', title: 'Charter Pilot', salary: '₹1–4 Lakh/mo' },
    { icon: '🎓', title: 'Flight Instructor', salary: '₹1–3 Lakh/mo' },
    { icon: '💼', title: 'Corporate Pilot', salary: '₹2–6 Lakh/mo' },
    { icon: '🚑', title: 'Air Ambulance', salary: '₹2–5 Lakh/mo' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoursesPage() {
    return (
        <Layout
            title="Pilot Training Courses – CPL, PPL, DGCA Ground Classes & International Flying | WeOne Aviation"
            description="Explore all pilot training courses at WeOne Aviation Academy – DGCA approved CPL, PPL, ground classes, and international flight training in USA & South Africa."
        >
            <HeroSlider customSlides={heroSlides} />

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-6">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <ScrollReveal key={s.label} delay={i * 80} className="text-center">
                            <div className="text-2xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── All Courses ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Our Programs</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            All Pilot Training <span className="text-av-orange">Courses</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            From ground classes to the cockpit — we offer complete pilot training solutions for every stage of your aviation journey.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, i) => (
                            <ScrollReveal key={course.id} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover hover:border-av-orange/30 transition-all h-full flex flex-col">
                                    {/* Card Header */}
                                    <div className={`bg-gradient-to-br ${course.bg} p-6 relative`}>
                                        <span className={`inline-block ${course.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                                            {course.tag}
                                        </span>
                                        <div className="text-4xl mb-2">{course.icon}</div>
                                        <h3 className="font-montserrat font-black text-white text-lg leading-snug">{course.title}</h3>
                                        <p className="text-white/60 text-xs mt-1">{course.subtitle}</p>
                                    </div>

                                    {/* Quick Facts */}
                                    <div className="grid grid-cols-2 border-b border-gray-100">
                                        {[
                                            { label: 'Duration', val: course.duration },
                                            { label: 'Flight Hours', val: course.hours },
                                            { label: 'Eligibility', val: course.eligibility },
                                            { label: 'Est. Fee', val: course.fee },
                                        ].map((fact) => (
                                            <div key={fact.label} className="px-4 py-3 border-r border-b border-gray-100 last:border-r-0">
                                                <div className="text-xs text-gray-400 uppercase tracking-wider">{fact.label}</div>
                                                <div className="font-montserrat font-bold text-av-blue text-xs mt-0.5">{fact.val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Highlights */}
                                    <div className="px-5 py-4 flex-grow">
                                        <p className="text-xs font-semibold text-av-blue mb-2">What's Included:</p>
                                        <ul className="space-y-1.5">
                                            {course.highlights.map((h, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                                                    <span className="text-av-orange mt-0.5 flex-shrink-0">▸</span> {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Authority + CTA */}
                                    <div className="px-5 pb-5">
                                        <div className="text-xs text-gray-400 mb-3">
                                            Authority: <span className="font-semibold text-av-blue">{course.authority}</span>
                                        </div>
                                        <Link
                                            href={course.href}
                                            className="block w-full bg-av-blue text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-av-orange transition-all"
                                        >
                                            {course.ctaLabel}
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CPL Syllabus ── */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">CPL Training Path</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Commercial Pilot <span className="text-av-orange">Training Phases</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            The CPL program is structured into 3 clear phases — from ground school to full CPL flying.
                        </p>
                    </ScrollReveal>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {syllabus.map((phase, i) => (
                            <ScrollReveal key={phase.phase} delay={i * 100}>
                                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between bg-av-blue px-6 py-4">
                                        <h4 className="font-montserrat font-bold text-white text-sm">{phase.phase}</h4>
                                        <span className="text-av-orange text-xs font-semibold bg-white/10 px-3 py-1 rounded-full">{phase.duration}</span>
                                    </div>
                                    <div className="px-6 py-4 bg-white grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {phase.topics.map((t, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">▸</span> {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Requirements</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility <span className="text-av-orange">Criteria</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Here are the basic requirements to enroll in a pilot training program at WeOne Aviation.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {eligibilityList.map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 card-hover hover:border-av-orange/30 transition-all h-full">
                                    <span className="text-av-orange font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                                    <div>
                                        <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.label}</div>
                                        <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Salary Section ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Earning Potential</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Commercial Pilot <span className="text-av-orange">Salary in India</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
                            Aviation is one of the highest-paying careers in India. Here's what you can expect at each level.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-3 gap-6 mb-10">
                        {salaryData.map((s, i) => (
                            <ScrollReveal key={s.level} delay={i * 100}>
                                <div className="glass rounded-2xl overflow-hidden">
                                    <div className="bg-av-orange/20 border-b border-white/10 px-5 py-4">
                                        <div className="font-montserrat font-bold text-white text-sm">{s.level}</div>
                                        <div className="text-av-orange font-black text-xl mt-1">{s.range}</div>
                                    </div>
                                    <div className="px-5 py-4">
                                        <div className="text-white/60 text-xs">{s.annual}</div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Career Options */}
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-white text-center mb-6 text-xl">Career Paths After CPL</h3>
                    </ScrollReveal>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {careerOptions.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 60}>
                                <div className="glass rounded-2xl p-4 text-center card-hover">
                                    <div className="text-3xl mb-2">{c.icon}</div>
                                    <div className="font-montserrat font-bold text-white text-xs mb-1">{c.title}</div>
                                    <div className="text-av-orange font-semibold text-xs">{c.salary}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why WeOne ── */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Why Choose Us</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why WeOne <span className="text-av-orange">Aviation Academy?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            We are India's most trusted pilot training institute with a proven track record of producing successful commercial pilots.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyWeOne.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 transition-all h-full flex gap-4">
                                    <div className="text-3xl flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How to Start ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How to <span className="text-av-orange">Get Started</span>
                        </h2>
                    </ScrollReveal>


                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Take Off Your Career</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Become a <span className="text-av-orange">Commercial Pilot?</span>
                        </h2>
                        <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                            Join India's most trusted aviation training academy. Get free career counselling today and take the first step toward the skies. ✈️
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg"
                            >
                                Get Free Counselling →
                            </Link>
                            <a
                                href="https://wa.me/919355611996"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                            >
                                WhatsApp Now
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}