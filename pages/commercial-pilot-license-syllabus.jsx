import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '6', label: 'Ground Subjects', icon: '📚' },
    { num: '200 hrs', label: 'Flight Training', icon: '✈️' },
    { num: 'DGCA', label: 'Standard', icon: '🏛️' },
    { num: 'CPL', label: 'License Awarded', icon: '🪪' },
];

const groundSubjects = [
    {
        num: '01',
        icon: '🗺️',
        title: 'Air Navigation',
        desc: 'Flight planning together with radio navigation and instrument flying and global positioning systems make up the subject matter.',
    },
    {
        num: '02',
        icon: '🌦️',
        title: 'Aviation Meteorology',
        desc: 'The training provides knowledge about weather patterns together with cloud formations and wind systems and their effects on flight operations.',
    },
    {
        num: '03',
        icon: '⚖️',
        title: 'Air Regulation',
        desc: 'Students gain knowledge of the rules from DGCA besides ICAO regulations and general aviation laws.',
    },
    {
        num: '04',
        icon: '⚙️',
        title: 'Technical General',
        desc: 'Focuses on the basic working of aircraft systems, engines, and instruments.',
    },
    {
        num: '05',
        icon: '🛩️',
        title: 'Technical Specific',
        desc: 'Training for the aircraft type that a candidate operates during their flight education period.',
    },
    {
        num: '06',
        icon: '📡',
        title: 'Radio Telephony (RTR)',
        desc: 'Trains students in aviation communication, standard phraseology, and emergency procedures.',
    },
];

const flightModules = [
    {
        num: '01',
        icon: '🛫',
        title: 'Basic Maneuvers',
        desc: 'Take-off and landing procedures together with straight-and-level flight and turns and climbing and descending flights.',
    },
    {
        num: '02',
        icon: '🗺️',
        title: 'Cross-Country Flights',
        desc: 'Navigation exercises between different airfields.',
    },
    {
        num: '03',
        icon: '🎛️',
        title: 'Instrument Flying',
        desc: 'Training includes flying using instruments alone to duplicate low-visibility conditions.',
    },
    {
        num: '04',
        icon: '🌙',
        title: 'Night Flying',
        desc: 'Flight operations during night conditions.',
    },
    {
        num: '05',
        icon: '🧑‍✈️',
        title: 'Solo Flying',
        desc: 'Independent flying operations help develop personal confidence as well as flying expertise.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CPLSyllabusPage() {
    return (
        <Layout
            title="Commercial Pilot License Syllabus – Complete CPL Syllabus 2025 | DGCA"
            description="Explore the complete Commercial Pilot License (CPL) syllabus in India. Covers DGCA ground training subjects and flight training modules including Air Navigation, Meteorology, RTR, and more."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="section-tag">Pilot Training</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot License Syllabus
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        A <strong className="text-white">commercial pilot license</strong> syllabus was designed to teach aspiring pilots the necessary skills which will enable them to carry out safe aircraft operations efficiently. The CPL syllabus meets <strong className="text-white">DGCA (Directorate General of Civil Aviation)</strong> standards through a combination of ground instruction and flight training that produces fully prepared candidates for aviation success.
                    </p>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
                        The following sections provide an in-depth review of the learning subjects in Commercial Pilot License training programs within India.
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

            {/* ── Ground Training Subjects ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Theory</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Ground Training <span className="text-av-orange">Subjects</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Theoretical learning at ground school serves as the essential starting point for becoming a pilot. The <strong>commercial pilot</strong> license syllabus for ground school teaches these necessary subjects:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {groundSubjects.map((subject, i) => (
                            <ScrollReveal key={subject.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {subject.num}
                                        </div>
                                        <span className="text-2xl">{subject.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{subject.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{subject.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-6 text-center">
                            <p className="text-white/80 text-sm leading-relaxed max-w-2xl mx-auto">
                                Instructors teach subjects through <strong className="text-av-orange">classroom sessions</strong> and <strong className="text-av-orange">online resources</strong> as well as conducting <strong className="text-av-orange">mock tests</strong> to ensure students pass their DGCA examinations.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Flight Training Modules ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Practical</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Flight Training <span className="text-av-orange">Modules</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Students must complete flight training as a practical requirement for the commercial <strong className="text-white">pilot license</strong> syllabus:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {flightModules.map((module, i) => (
                            <ScrollReveal key={module.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {module.num}
                                        </div>
                                        <span className="text-2xl">{module.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-white mb-2">{module.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed flex-grow">{module.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="text-white/80 text-sm leading-relaxed max-w-3xl mx-auto">
                                To earn a commercial pilot license students need at least <strong className="text-av-orange text-base">200 hours</strong> of flight schooling that must cover required hours for solo flights, cross-country flights and instrument flight tasks.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Conclusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            Your Path to the <span className="text-av-orange">Cockpit</span>
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 mb-8 text-left">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The official commercial pilot license syllabus exists as a carefully designed program which prepares future pilots for actual aviation duties. Students receive both academic instruction and flight training at this facility which prepares them for professional pilot competence and confidence levels.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Competence in ground and flight subjects creates pilots who are prepared to manage different climate situations and corporate rules as well as airline protocol.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                The syllabus stands as the <strong className="text-av-blue">essential prerequisite</strong> for aviation students interested in reaching cockpit positions.
                            </p>
                        </div>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Enroll in CPL Program →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}