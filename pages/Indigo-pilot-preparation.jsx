import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=1920&q=80',
        tag: 'JFO Interview Coaching',
        title: 'IndiGo Pilot Interview',
        highlight: 'Preparation JFO 2026',
        sub: 'Ace Your IndiGo Junior First Officer Selection — with We One Aviation Academy',
    },
];

const selectionStages = [
    { icon: '🧠', title: 'ADAPT / Psychometric Test Preparation', desc: 'Master the cognitive and psychometric screening tools used by IndiGo to evaluate pilot candidates at the very first stage of selection.' },
    { icon: '🗣️', title: 'Group Discussion (GD)', desc: "Build the communication clarity, structured thinking, and leadership qualities needed to stand out confidently in IndiGo's group evaluation rounds." },
    { icon: '🎯', title: 'Personal Interview (HR + Technical)', desc: 'Prepare thoroughly for both HR behavioral rounds and in-depth technical assessments with guided mock sessions and expert panel feedback.' },
];

const cplCourseFeatures = [
    { icon: '📊', title: 'ADAPT Test Strategies & Practice Sessions', desc: 'Learn targeted approaches for cognitive aptitude, situational judgment, and personality assessments that IndiGo uses to screen entry-level pilot candidates.' },
    { icon: '🗣️', title: 'GD Techniques with Real-Time Evaluation', desc: 'Participate in simulated group discussions with live coaching on structured speaking, assertiveness, and professional communication delivery.' },
    { icon: '🎙️', title: 'HR + Technical Interview Preparation', desc: 'Crack both the HR behavioral rounds and aviation-specific technical questions through intensive mock interviews and comprehensive post-session debriefs.' },
    { icon: '✈️', title: 'Airline Knowledge & SOP Basics', desc: "Build foundational awareness of IndiGo's operational culture, standard procedures, and the expectations evaluators hold for fresh CPL applicants." },
    { icon: '💪', title: 'Communication & Confidence Building', desc: 'Develop executive presence, calm under pressure, and the self-assurance to deliver your best performance on the actual selection day.' },
];

const typeRatedFeatures = [
    { icon: '🛩️', title: 'A320-Specific Technical Interview Preparation', desc: "Deep-dive into Airbus A320 systems, limitations, and operational knowledge — the technical bedrock that IndiGo's evaluators rigorously probe in experienced pilot candidates." },
    { icon: '📋', title: 'Scenario-Based Airline Questions', desc: 'Practice complex line scenarios and real-world operational decision-making questions that assess your command readiness and situational judgment.' },
    { icon: '🎙️', title: 'HR Interview Polishing', desc: 'Refine your professional narrative, behavioral answers, and personal storytelling with individualized coaching and structured practice rounds.' },
    { icon: '📘', title: 'CRM & Airline SOP Understanding', desc: "Strengthen your grasp of Crew Resource Management principles, fatigue management, and IndiGo-specific SOPs — essential topics at the experienced pilot interview level." },
    { icon: '🏢', title: 'Advanced Mock Interview Sessions', desc: "Experience high-fidelity mock interviews designed to closely mirror IndiGo's actual selection environment, complete with panel-style evaluation and actionable feedback." },
];

const differentiators = [
    { icon: '👨‍✈️', title: 'Airline Pilot Mentors', desc: 'Train under aviation professionals with direct airline hiring and line operations experience who understand precisely what IndiGo evaluators look for at each stage.' },
    { icon: '🎯', title: 'IndiGo-Specific Preparation Modules', desc: "Benefit from curriculum built around IndiGo's known selection patterns, question banks, and evaluation benchmarks gathered from recent recruitment cycles." },
    { icon: '📝', title: 'Realistic Mock Tests & Simulations', desc: 'Simulate the full IndiGo JFO selection process — from psychometric tests to final panel interviews — in a structured, airline-grade training environment.' },
    { icon: '🔍', title: 'Personalized Feedback & Improvement Plan', desc: 'Receive individual feedback reports after every mock session with a tailored roadmap identifying your specific gaps and a clear plan to address them.' },
    { icon: '✅', title: 'Proven Success-Focused Training Approach', desc: 'Our methodology is built on a track record of successful selections — pilots who cleared IndiGo and other major carriers after training with We One Aviation.' },
];

const whoShouldJoin = [
    { icon: '🛫', title: 'CPL Holders', desc: 'Fresh commercial pilot license holders preparing to enter IndiGo and looking to build a strong foundation for airline interview success.' },
    { icon: '🛩️', title: 'A320 Type Rated Pilots', desc: "Pilots with an Airbus A320 type rating specifically targeting IndiGo fleet operations who need focused, aircraft-specific interview coaching." },
    { icon: '✈️', title: 'Airline Interview Aspirants', desc: 'Pilots targeting airline selections who want a structured, mentor-led preparation program to maximize their chances across all rounds.' },
    { icon: '💡', title: 'GD + PI Improvement Seekers', desc: 'Candidates who have the technical knowledge but need to sharpen group discussion skills, personal interview performance, and overall confidence.' },
];

/* ── Reusable card components ── */
function SimpleCard({ icon, title, desc }) {
    return (
        <div className="border border-gray-100 rounded-xl p-4 sm:p-5 bg-white shadow-sm hover:border-av-orange/30 transition-all">
            <div className="flex items-start gap-3 mb-2">
                <span className="text-xl sm:text-2xl flex-shrink-0 leading-tight">{icon}</span>
                <h4 className="font-montserrat font-bold text-av-blue text-sm leading-snug">{title}</h4>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
        </div>
    );
}

function AccentCard({ icon, title, desc }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 bg-av-blue p-3 sm:p-4">
                <span className="text-lg sm:text-xl flex-shrink-0">{icon}</span>
                <h4 className="font-montserrat font-bold text-white text-sm leading-snug">{title}</h4>
            </div>
            <div className="p-3 sm:p-4 bg-white">
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

export default function IndiGoPilotPrep() {
    return (
        <Layout
            title="IndiGo Pilot Interview Preparation JFO 2026 | We One Aviation Academy"
            description="Crack the IndiGo Junior First Officer (JFO) selection process with We One Aviation's structured interview prep — ADAPT tests, Group Discussions, HR & Technical interviews for CPL holders and A320 Type Rated pilots."
        >
            <HeroSlider customSlides={heroSlides} />

            {/* ── Page body ── */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Sticky sidebar floats to the right on lg+; stacks below content on mobile */}
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* ══ Main content ══ */}
                        <div className="lg:col-span-2 space-y-10">
                            <ScrollReveal>

                                {/* Section tag + heading */}
                                <div className="section-tag">JFO Interview Coaching</div>
                                <h1 className="font-montserrat text-2xl sm:text-3xl font-bold text-av-blue mb-4 underline-orange leading-tight">
                                    IndiGo Pilot Interview Preparation (JFO 2026)
                                </h1>

                                <div className="space-y-3 mb-6">
                                    {[
                                        "Joining IndiGo as a Junior First Officer is one of the most competitive pathways in Indian aviation — and it demands far more than a license and logbook hours. At We One Aviation, we provide a structured, result-driven training program built to help aspiring pilots successfully clear every stage of the IndiGo JFO recruitment process in 2026.",
                                        "Whether you hold a CPL and are entering the airline world for the first time, or you're an A320 Type Rated pilot targeting IndiGo's fleet directly — our program, mentored by active airline professionals, covers every critical phase of the selection journey with precision and purpose.",
                                        "From ADAPT psychometric assessments and group discussions to technical panels and HR interviews, we prepare you with the knowledge, composure, and communication skills to stand apart and get selected.",
                                    ].map((p, i) => (
                                        <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
                                    ))}
                                </div>

                                {/* Quick Facts */}
                                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-2">
                                    {[
                                        ['CPL & A320 TR', 'Eligible Pilots'],
                                        ['A320 Fleet', 'Type Coverage'],
                                        ['JFO 2026', 'Current Batch'],
                                        ['Online + Class', 'Mode of Training'],
                                    ].map(([val, label]) => (
                                        <div key={label} className="bg-av-light rounded-xl p-3 sm:p-4 text-center">
                                            <div className="font-montserrat font-bold text-av-blue text-xs sm:text-sm leading-snug">{val}</div>
                                            <div className="text-gray-500 text-xs mt-1">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Ace Your Selection ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🛫 Ace Your IndiGo JFO Selection Process
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    IndiGo's JFO selection is a multi-layered process that evaluates cognitive ability, interpersonal effectiveness, and alignment with the airline's high-performance culture. Our program at We One Aviation is architected around these exact parameters — so you walk into each round prepared, not just practiced.
                                </p>
                            </ScrollReveal>

                            {/* ── Selection Stages ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🎯 IndiGo Selection Stages Covered
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our preparation program is built around the actual IndiGo hiring process. Every module targets a specific selection stage so you walk in prepared at every round:
                                </p>
                                <div className="space-y-3">
                                    {selectionStages.map((item) => (
                                        <SimpleCard key={item.title} {...item} />
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── CPL Holders ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🧑‍✈️ CPL Holder Preparation Program
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Designed for fresh commercial pilots making their first move into airline recruitment. Our CPL preparation track gives you the complete toolkit to navigate IndiGo's full assessment process:
                                </p>
                                <div className="space-y-3">
                                    {cplCourseFeatures.map((item) => (
                                        <AccentCard key={item.title} {...item} />
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Type Rated Pilots ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🛫 Type Rated Pilot Program (A320)
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Specialized training for pilots already type rated on the Airbus A320 and aiming for a direct entry role with IndiGo:
                                </p>
                                <div className="space-y-3">
                                    {typeRatedFeatures.map((item) => (
                                        <AccentCard key={item.title} {...item} />
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Why Choose Us ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    🧠 Why Choose We One Aviation?
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    There are many interview preparation options available — but very few built specifically around airline pilot selection and IndiGo's recruitment patterns:
                                </p>
                                <div className="space-y-3">
                                    {differentiators.map((item) => (
                                        <SimpleCard key={item.title} {...item} />
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Upcoming Batches ── */}
                            <ScrollReveal>
                                <h3 className="font-montserrat text-lg sm:text-xl font-bold text-av-blue mb-3">
                                    📅 Upcoming Batches
                                </h3>
                                <div className="bg-av-light rounded-2xl p-5 sm:p-6">
                                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        🚨 New Batches Starting Soon
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            ['🪑', 'Limited seats available for focused, small-batch training'],
                                            ['📅', 'Flexible batch options — weekday and weekend schedules available'],
                                            ['💻', 'Online and offline (classroom) training modes both available'],
                                        ].map(([icon, text]) => (
                                            <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                                                <span className="text-lg flex-shrink-0 leading-tight">{icon}</span>
                                                <span className="leading-relaxed">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href="https://wa.me/919555291956"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-block bg-av-orange text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-av-blue transition-all"
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
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    This program is purpose-built for pilots at a critical career junction:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {whoShouldJoin.map((item) => (
                                        <SimpleCard key={item.title} {...item} />
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ── Mobile-only sidebar cards ── */}
                            <div className="lg:hidden space-y-5">
                                <ScrollReveal>
                                    <LeadForm title="Join IndiGo JFO Prep 2026" />
                                </ScrollReveal>
                                <ScrollReveal delay={100}>
                                    <SidebarWhoCanEnroll />
                                </ScrollReveal>
                                <ScrollReveal delay={150}>
                                    <SidebarHighlights />
                                </ScrollReveal>
                                <ScrollReveal delay={200}>
                                    <SidebarContact />
                                </ScrollReveal>
                            </div>

                            {/* ── CTA Banner ── */}
                            <ScrollReveal>
                                <div className="bg-av-blue rounded-2xl p-6 sm:p-8 text-center">
                                    <h3 className="font-montserrat text-lg sm:text-xl font-bold text-white mb-3">
                                        🚀 Start Your IndiGo JFO Journey Today
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                        The difference between a good pilot and a selected pilot is preparation. At We One Aviation, we give you the structured edge to walk into your IndiGo JFO interview with confidence, clarity, and a plan that delivers results. ✈️
                                    </p>
                                    <p className="text-av-orange font-montserrat font-bold text-sm mb-5">
                                        Prepare Smart. Perform Better. Get Selected.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-av-orange text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                                    >
                                        Join IndiGo JFO Preparation Program Now
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* ══ Desktop sidebar ══ */}
                        <div className="hidden lg:block">
                            <div className="sticky top-28 space-y-6">
                                <ScrollReveal delay={200}>
                                    <LeadForm title="Join IndiGo JFO Prep 2026" />
                                </ScrollReveal>
                                <ScrollReveal delay={300}>
                                    <SidebarWhoCanEnroll />
                                </ScrollReveal>
                                <ScrollReveal delay={400}>
                                    <SidebarHighlights />
                                </ScrollReveal>
                                <ScrollReveal delay={500}>
                                    <SidebarContact />
                                </ScrollReveal>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
}

/* ── Sidebar sub-components ── */
function SidebarWhoCanEnroll() {
    return (
        <div className="bg-av-blue rounded-2xl p-5 sm:p-6 text-white">
            <h4 className="font-montserrat font-bold mb-4 text-sm sm:text-base">Who Can Enroll</h4>
            <ul className="space-y-2 text-sm text-white/80">
                {[
                    'CPL holders (fresh airline aspirants)',
                    'A320 type rated pilots',
                    'Pilots targeting IndiGo JFO',
                    'Candidates needing GD + PI coaching',
                    'Pilots seeking confidence & structure',
                    'Airline interview aspirants',
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
            <h4 className="font-montserrat font-bold mb-2 text-sm sm:text-base">Program Highlights</h4>
            <p className="text-white/80 text-sm mb-3">IndiGo JFO Interview Prep:</p>
            <div className="text-2xl font-montserrat font-black">Batch 2026</div>
            <div className="mt-2 space-y-1">
                {['Online + Classroom Modes', 'Weekday & Weekend Options', 'Limited Seats — Focused Training'].map((t) => (
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
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <h4 className="font-montserrat font-bold text-av-blue mb-4 text-sm sm:text-base">Quick Contact</h4>
            <div className="space-y-2.5 text-sm text-gray-600">
                {[
                    { icon: '📱', href: 'tel:+919555291956', label: '+91 9555291956' },
                    { icon: '📱', href: 'tel:+919717977702', label: '+91 9717977702' },
                    { icon: '📧', href: 'mailto:info@weoneaviation.in', label: 'info@weoneaviation.in' },
                ].map(({ icon, href, label }) => (
                    <div key={href} className="flex items-center gap-2 min-w-0">
                        <span className="flex-shrink-0">{icon}</span>
                        <a href={href} className="hover:text-av-orange transition-colors truncate">{label}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}