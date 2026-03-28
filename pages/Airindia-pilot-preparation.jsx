import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
        tag: 'Aviation Course',
        title: 'Air India Pilot Interview',
        highlight: 'Preparation 2026',
        sub: 'Crack Your Air India Pilot Selection Process with We One Aviation',
    },
];

const selectionStages = [
    'Psychometric / ADAPT-style Assessments',
    'Group Discussions (GD)',
    'Personal Interviews (HR + Technical)',
];

const cplTraining = [
    'ADAPT & psychometric test strategies',
    'GD communication & evaluation practice',
    'HR + technical interview preparation',
    'Airline knowledge & SOP awareness',
    'Confidence building sessions',
];

const typeRatedTraining = [
    'Aircraft-specific technical interview prep',
    'Scenario-based questioning (line operations)',
    'HR interview polishing',
    'Airline SOP & CRM concepts',
    'Real airline-level mock interviews',
];

const differentiators = [
    { icon: '👨‍✈️', text: 'Mentorship by airline professionals' },
    { icon: '🧪', text: 'Realistic mock assessments' },
    { icon: '📋', text: 'Personalized feedback & improvement plan' },
    { icon: '🎯', text: 'Focus on Air India-specific hiring patterns' },
    { icon: '✅', text: 'Proven preparation methodology' },
];

const batchFeatures = [
    { icon: '💺', label: 'Limited seats for focused training' },
    { icon: '📅', label: 'Weekend & weekday batches available' },
    { icon: '💻', label: 'Online + classroom options' },
];

const whoShouldJoin = [
    { icon: '🎓', label: 'CPL holders preparing for airline interviews' },
    { icon: '✈️', label: 'Type Rated pilots targeting Air India' },
    { icon: '🗣️', label: 'Pilots who want structured GD + PI preparation' },
    { icon: '💪', label: 'Candidates aiming to improve confidence & performance' },
];

const contactDetails = [
    { icon: '📱', label: 'Phone', value: '+91 9555291956 / 9717977702', href: 'tel:+919555291956' },
    { icon: '🌐', label: 'Website', value: 'www.weoneaviation.in', href: 'https://www.weoneaviation.in' },
    { icon: '📧', label: 'Email', value: 'info@weoneaviation.in', href: 'mailto:info@weoneaviation.in' },
    { icon: '📸', label: 'Instagram', value: '@topflyer_pilot', href: 'https://www.instagram.com/topflyer_pilot' },
];

/* ── Sidebar sub-components (shared between mobile + desktop renders) ── */
function SidebarWhoCanJoin() {
    return (
        <div className="bg-av-blue rounded-2xl p-5 sm:p-6 text-white">
            <h4 className="font-montserrat font-bold mb-4 text-sm sm:text-base">Who Can Join</h4>
            <ul className="space-y-2 text-sm text-white/80">
                {[
                    'CPL holders',
                    'Type Rated pilots (A320/B737)',
                    'Pilots needing GD + PI prep',
                    'Candidates improving confidence',
                    'Air India aspirants',
                ].map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-snug">
                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SidebarHighlights() {
    return (
        <div className="bg-av-orange rounded-2xl p-5 sm:p-6 text-white">
            <h4 className="font-montserrat font-bold mb-2 text-sm sm:text-base">Course Highlights</h4>
            <p className="text-white/80 text-sm mb-3">Air India Pilot Preparation:</p>
            <div className="text-2xl font-montserrat font-black">2026 Batches</div>
            <div className="mt-2 space-y-1">
                {['Online + Classroom Available', 'Weekend & Weekday Options'].map((t) => (
                    <div key={t} className="text-white/70 text-xs">{t}</div>
                ))}
            </div>
            <a
                href="https://wa.me/919555291956"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all"
            >
                Get Free Counselling
            </a>
        </div>
    );
}

function SidebarContact() {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 sm:p-6">
            <h4 className="font-montserrat font-bold text-av-blue mb-4 text-sm sm:text-base">Quick Contact</h4>
            <div className="space-y-3">
                {contactDetails.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-av-orange transition-colors min-w-0"
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span className="truncate">{item.value}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function AirIndiaPilotPreparation() {
    return (
        <Layout
            title="Air India Pilot Interview Preparation 2026 | WeOne Aviation Academy"
            description="Crack your Air India pilot selection process with We One Aviation. Structured preparation for CPL holders and Type Rated pilots covering ADAPT, GD, HR & technical interviews."
        >
            <HeroSlider customSlides={heroSlides} />

            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* ══ Main Content ══ */}
                        <div className="lg:col-span-2 space-y-10">
                            <ScrollReveal>
                                {/* Header */}
                                <div className="section-tag">Aviation Course</div>
                                <h1 className="font-montserrat text-2xl sm:text-3xl font-bold text-av-blue mb-4 underline-orange leading-tight">
                                    ✈️ Air India Pilot Interview Preparation (2026) – We One Aviation
                                </h1>
                                <div className="space-y-3 mb-6">
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        At We One Aviation, we offer a structured and airline-focused training program designed to help pilots successfully clear the Air India recruitment process.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        Whether you are a CPL holder or a Type Rated pilot (A320/B737), our training prepares you for every stage of selection with precision and confidence.
                                    </p>
                                </div>

                                {/* Quick Facts */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    {[
                                        ['CPL & Type Rated', 'Who Can Join'],
                                        ['A320 / B737', 'Fleet Coverage'],
                                        ['2026', 'Batch Year'],
                                        ['100%', 'Placement Focus'],
                                    ].map(([val, label]) => (
                                        <div key={label} className="bg-av-light rounded-xl p-3 sm:p-4 text-center">
                                            <div className="font-montserrat font-bold text-av-blue text-xs sm:text-sm leading-snug">{val}</div>
                                            <div className="text-gray-500 text-xs mt-1">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Selection Stages ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🎯 Air India Selection Stages We Cover
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our program is built around the actual airline hiring process:
                                </p>
                                <div className="space-y-3">
                                    {selectionStages.map((stage) => (
                                        <div key={stage} className="flex items-center gap-3 bg-av-light rounded-xl px-4 sm:px-5 py-3">
                                            <span className="text-av-orange font-bold flex-shrink-0">✔️</span>
                                            <span className="text-av-blue font-semibold text-sm leading-snug">{stage}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── CPL Holders ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🧑‍✈️ Courses for CPL Holders
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Designed for fresh commercial pilots preparing for airline entry.
                                </p>
                                <div className="space-y-3">
                                    {cplTraining.map((item, i) => (
                                        <div key={i} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white shadow-sm hover:border-av-orange/30 transition-all flex items-start gap-3">
                                            <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">🔹</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Type Rated ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🛫 Type Rated Pilot Preparation (A320 / B737)
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Tailored for experienced pilots aiming to join Air India fleet operations.
                                </p>
                                <div className="space-y-3">
                                    {typeRatedTraining.map((item, i) => (
                                        <div key={i} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white shadow-sm hover:border-av-orange/30 transition-all flex items-start gap-3">
                                            <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">🔹</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Differentiators ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🧠 What Makes Our Training Different?
                                </h3>
                                <div className="space-y-3">
                                    {differentiators.map((item) => (
                                        <div key={item.text} className="flex items-center gap-3 bg-av-light rounded-xl px-4 sm:px-5 py-3">
                                            <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                                            <span className="text-av-blue font-semibold text-sm leading-snug">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Upcoming Batches ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    📅 Upcoming Batches
                                </h3>
                                <div className="bg-av-blue rounded-2xl p-5 sm:p-6">
                                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        🚨 New batches starting soon
                                    </div>
                                    <div className="space-y-3">
                                        {batchFeatures.map((item) => (
                                            <div key={item.label} className="flex items-start gap-3 text-white/90 text-sm">
                                                <span className="text-lg flex-shrink-0 leading-tight">{item.icon}</span>
                                                <span className="leading-relaxed">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href="https://wa.me/919555291956"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-block bg-av-orange text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-white hover:text-av-blue transition-all"
                                    >
                                        Reserve Your Seat →
                                    </a>
                                </div>
                            </ScrollReveal>

                            {/* ── Who Should Join ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🏆 Who Should Join?
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {whoShouldJoin.map((item) => (
                                        <div key={item.label} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <div className="flex items-start gap-3 bg-av-blue p-3 sm:p-4">
                                                <span className="text-lg sm:text-xl flex-shrink-0 leading-tight">{item.icon}</span>
                                                <h4 className="font-montserrat font-bold text-white text-sm leading-snug">{item.label}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Mobile-only sidebar ── */}
                            <div className="lg:hidden space-y-5">
                                <ScrollReveal>
                                    <LeadForm title="Join Air India Pilot Preparation" />
                                </ScrollReveal>
                                <ScrollReveal delay={100}><SidebarWhoCanJoin /></ScrollReveal>
                                <ScrollReveal delay={150}><SidebarHighlights /></ScrollReveal>
                                <ScrollReveal delay={200}><SidebarContact /></ScrollReveal>
                            </div>

                            {/* ── CTA Banner ── */}
                            <ScrollReveal>
                                <div className="bg-av-blue rounded-2xl p-6 sm:p-8 text-center">
                                    <h3 className="font-montserrat text-lg sm:text-xl font-bold text-white mb-3">
                                        🚀 Start Your Airline Career Today
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-2">
                                        Prepare Smart. Perform Better. Get Selected.
                                    </p>
                                    <p className="text-white/60 text-xs mb-5">✈️ Join Air India Pilot Preparation Program Now</p>
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-av-orange text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                                    >
                                        Book Free Counselling
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* ══ Desktop Sidebar ══ */}
                        <div className="hidden lg:block">
                            <div className="sticky top-28 space-y-6">
                                <ScrollReveal delay={200}>
                                    <LeadForm title="Join Air India Pilot Preparation" />
                                </ScrollReveal>
                                <ScrollReveal delay={300}><SidebarWhoCanJoin /></ScrollReveal>
                                <ScrollReveal delay={400}><SidebarHighlights /></ScrollReveal>
                                <ScrollReveal delay={500}><SidebarContact /></ScrollReveal>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
}