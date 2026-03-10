import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: 'WPC Wing', label: 'Issued By', icon: '🏛️' },
    { num: '18+', label: 'Minimum Age', icon: '🎓' },
    { num: 'Lifetime', label: 'License Validity', icon: '✅' },
    { num: '6x / Year', label: 'Exam Frequency', icon: '📝' },
];

const importancePoints = [
    { icon: '🪪', title: 'Mandatory for Pilots', desc: 'To become a commercial pilot or airline pilot, clearing the RTR exam is compulsory.' },
    { icon: '🛡️', title: 'Ensures Safety', desc: 'RTR-certified professionals can handle emergency communications and routine transmissions efficiently.' },
    { icon: '🌐', title: 'International Recognition', desc: 'An RTR license validates that the candidate is capable of using standardized aviation English and ICAO-approved phraseology.' },
    { icon: '✈️', title: 'Eligibility for CPL', desc: 'RTR clearance is essential to obtain a Commercial Pilot License (CPL) in India.' },
    { icon: '💼', title: 'Professional Requirement', desc: 'Air traffic controllers, pilots, navigators, and communication specialists must have an RTR license.' },
];

const historyPoints = [
    'Radio communication became a necessity during World War I and II, where aircraft and ships required reliable communication methods.',
    'After the development of civil aviation, countries started regulating radio frequencies and licensing radio operators.',
    'In India, the Wireless Planning and Coordination (WPC) Wing under the Ministry of Communications took charge of monitoring and issuing radio licenses, including RTR.',
    'The RTR license evolved into a global requirement aligned with ICAO (International Civil Aviation Organization) standards.',
];

const eligibility = [
    { label: 'Minimum Age', value: '18 years' },
    { label: 'Educational Qualification', value: '10+2 with Physics and Mathematics (same as CPL eligibility)' },
    { label: 'Language Proficiency', value: 'Must have good command of English (ICAO Level 4 or higher recommended)' },
    { label: 'Medical', value: 'Must hold a Class 2/1 Medical Certificate approved by DGCA' },
];

const part1Points = [
    'Candidates are tested on radio telephony procedures.',
    'Use of aviation phraseology, emergency handling, distress calls, and communication techniques.',
    'Conducted in a simulated environment.',
];

const part2Points = [
    'Conducted by a panel including DGCA and WPC representatives.',
    'Radio communication rules & regulations',
    'DGCA and ICAO communication standards',
    'Meteorology & navigation terms',
    'Aviation safety procedures',
    "Tests candidate's presence of mind in emergency scenarios.",
];

const syllabus = [
    'Radio Communication Procedures',
    'ICAO Aviation English & Phraseology',
    'Aircraft Communication Systems',
    'Emergency Procedures & Distress Calls',
    'Indian Telegraph Act & Wireless Telegraphy Rules',
    'Basic Navigation and Meteorology',
    'Human Factors in Communication',
];

const careerBenefits = [
    { icon: '🪪', title: 'Mandatory Step for Pilots', desc: 'Without RTR, you cannot get a Commercial Pilot License (CPL).' },
    { icon: '💼', title: 'Better Job Opportunities', desc: 'Airlines and aviation companies prefer candidates who already hold an RTR license.' },
    { icon: '🌍', title: 'International Career', desc: 'RTR is recognized globally, so it helps in working abroad as a pilot or ATC.' },
    { icon: '🏆', title: 'Professional Credibility', desc: 'Holding RTR demonstrates strong communication skills and regulatory knowledge.' },
];

const otherFields = [
    { icon: '📊', field: 'RTR in Accounting & Finance', fullForm: 'Record to Report', desc: 'A process in finance involving collection, processing, and delivering business reports.' },
    { icon: '🖥️', field: 'RTR in Technology', fullForm: 'Real-Time Rendering', desc: 'Used in computer graphics and gaming for live rendering of visuals.' },
    { icon: '🏢', field: 'RTR in Business', fullForm: 'Ready to Run', desc: 'Refers to products or services that are pre-configured and ready for immediate use.' },
    { icon: '🏭', field: 'RTR in Manufacturing', fullForm: 'Release to Ramp', desc: 'Phase in product development before mass production.' },
];

const challenges = [
    'High competition (limited seats available per exam session).',
    'Pressure of oral exam (many candidates fail in viva).',
    'Limited attempts (exam conducted only a few times yearly).',
    'Requirement of fluent aviation English.',
];

const tips = [
    { icon: '🎙️', tip: 'Practice Radio Calls daily with ATC recordings.' },
    { icon: '📖', tip: 'Focus on Standard ICAO Phraseology instead of casual English.' },
    { icon: '📚', tip: 'Study Communication Rules & Regulations from DGCA-approved books.' },
    { icon: '🏫', tip: 'Join a Good RTR Training Institute for mock tests and oral preparation.' },
    { icon: '😌', tip: 'Stay Calm in Viva – panel checks confidence and clarity.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RTRPage() {
    return (
        <Layout
            title="RTR Full Form – Meaning, Importance, and Complete Guide | Radio Telephony Restricted"
            description="RTR Full Form is Radio Telephony Restricted. Learn about RTR license in aviation, its importance for pilots, exam pattern, syllabus, eligibility, career benefits, and RTR in other fields."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Aviation License</div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        RTR Full Form – Meaning, Importance, and Complete Guide
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-5">
                        In today's world of communication and technology, abbreviations are commonly used to simplify lengthy terms. One such important abbreviation is RTR, which holds different meanings depending on the field of use. However, in aviation and telecommunication, the most widely recognized full form of RTR is:
                    </p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-5">
                        <p className="text-white/70 text-sm mb-1">RTR stands for</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">Radio Telephony Restricted</p>
                    </div>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        RTR is an essential license issued by the <strong className="text-white">Wireless Planning and Coordination (WPC) Wing</strong> of the Ministry of Communications, Government of India, under the Department of Telecommunications. It plays a significant role for pilots, air traffic controllers (ATCs), and other professionals involved in air-to-ground and ground-to-air communication.
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

            {/* ── What is RTR ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">About RTR</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            What is RTR?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            <strong>RTR stands for Radio Telephony Restricted.</strong> It is a professional license that certifies an individual's ability to operate radio communication equipment in the aviation and maritime sectors.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            In aviation, RTR ensures that pilots and ATCs can communicate effectively using radio telephony, which is the standard method of exchanging vital information related to aircraft operations, navigation, and safety.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="text-white/80 text-sm leading-relaxed">
                                Without an RTR license, a pilot <strong className="text-av-orange">cannot legally operate an aircraft</strong> in controlled airspace, as communication is a crucial part of aviation safety.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="section-tag">History & Background</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            History and Background of RTR
                        </h2>
                        <div className="space-y-3">
                            {historyPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-av-light rounded-xl border border-av-sky/20">
                                    <div className="w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Importance ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Why It Matters</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Importance of RTR <span className="text-av-orange">in Aviation</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {importancePoints.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Types of RTR ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">License Types</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Types of <span className="text-av-orange">RTR Licenses</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">In India, there are two categories of RTR licenses:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <div className="text-4xl mb-4">✈️</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-2">RTR (Aero)</h3>
                                <p className="text-av-orange font-semibold text-sm mb-4">Radio Telephony Restricted (Aeronautical)</p>
                                <ul className="space-y-2">
                                    {[
                                        'Required by pilots and air traffic controllers.',
                                        'Allows communication between aircraft and ground stations.',
                                        'Focuses on aviation phraseology and emergency procedures.',
                                    ].map(p => (
                                        <li key={p} className="flex items-start gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <div className="text-4xl mb-4">🚢</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">RTR (Maritime)</h3>
                                <p className="text-av-orange font-semibold text-sm mb-4">Radio Telephony Restricted (Maritime)</p>
                                <ul className="space-y-2">
                                    {[
                                        'Required for ship captains, marine officers, and radio operators in the maritime industry.',
                                        'Ensures communication between ships and port authorities or other vessels.',
                                    ].map(p => (
                                        <li key={p} className="flex items-start gap-2 text-gray-600 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── RTR (Aero) Deep Dive ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">Deep Dive</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            RTR (Aero) – For Pilots and <span className="text-av-orange">Aviation Professionals</span>
                        </h2>
                        <p className="text-white/60 mt-2 text-sm">Since most students and professionals seek RTR in aviation, let's focus more on RTR (Aero).</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        {/* Eligibility */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8 h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">Eligibility for RTR (Aero)</h3>
                                <div className="space-y-3">
                                    {eligibility.map(row => (
                                        <div key={row.label} className="bg-white/10 rounded-xl p-4">
                                            <p className="text-av-orange font-semibold text-xs mb-1">{row.label}</p>
                                            <p className="text-white/80 text-sm">{row.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Exam Overview */}
                        <ScrollReveal delay={150}>
                            <div className="glass rounded-2xl p-8 h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">RTR (Aero) Examination Process</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-5">
                                    The RTR exam in India is conducted by the <strong className="text-av-orange">WPC Wing</strong> of the Ministry of Communications. The exam is generally held <strong className="text-white">six times a year</strong> in cities like Delhi, Mumbai, Chennai, and Kolkata.
                                </p>

                                {/* Part 1 */}
                                <div className="bg-white/10 rounded-xl p-5 mb-4">
                                    <p className="text-av-orange font-semibold mb-2">Part 1 – Practical Test (Transmission &amp; Reception)</p>
                                    <ul className="space-y-1">
                                        {part1Points.map(p => (
                                            <li key={p} className="flex items-start gap-2 text-white/80 text-xs">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Part 2 */}
                                <div className="bg-white/10 rounded-xl p-5">
                                    <p className="text-av-orange font-semibold mb-2">Part 2 – Viva Voice (Oral Examination)</p>
                                    <ul className="space-y-1">
                                        {part2Points.map(p => (
                                            <li key={p} className="flex items-start gap-2 text-white/80 text-xs">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Passing Criteria, Syllabus, Validity */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Passing Criteria</h4>
                                <ul className="space-y-3">
                                    {[
                                        'Candidates must clear both Part 1 and Part 2 in the same attempt.',
                                        'If a candidate passes only one part, they get a chance to clear the remaining part in the next attempt.',
                                    ].map(p => (
                                        <li key={p} className="flex items-start gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Syllabus for RTR (Aero)</h4>
                                <ul className="space-y-2">
                                    {syllabus.map(s => (
                                        <li key={s} className="flex items-start gap-2 text-white/80 text-xs">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Validity of RTR License</h4>
                                <div className="bg-av-orange/20 border border-av-orange/40 rounded-xl p-4 mb-4">
                                    <p className="text-av-orange font-bold text-lg text-center">Valid for Life</p>
                                </div>
                                <ul className="space-y-2">
                                    {[
                                        'RTR (Aero) is valid for life, unless suspended or canceled by authorities.',
                                        'Unlike medical and CPL renewals, RTR does not require periodic re-validation.',
                                    ].map(p => (
                                        <li key={p} className="flex items-start gap-2 text-white/80 text-xs">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Career Benefits ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Career</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Career Benefits <span className="text-av-orange">of RTR</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {careerBenefits.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RTR in Other Fields ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Other Fields</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            RTR in <span className="text-av-orange">Other Fields</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Though in aviation, RTR stands for Radio Telephony Restricted, the abbreviation has different full forms in other sectors too:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {otherFields.map((item, i) => (
                            <ScrollReveal key={item.field} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-1 text-sm">{item.field}</h3>
                                    <p className="text-av-orange font-semibold text-xs mb-2">{item.fullForm}</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-5 text-center">
                            <p className="text-gray-600 text-sm">
                                Thus, RTR has multiple meanings, but <strong className="text-av-blue">in aviation, it is primarily Radio Telephony Restricted.</strong>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Challenges & Tips ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Challenges */}
                        <ScrollReveal>
                            <div className="section-tag">Challenges</div>
                            <h2 className="font-montserrat text-3xl font-bold text-white mb-6">
                                Challenges Faced by Students in <span className="text-av-orange">RTR Exam</span>
                            </h2>
                            <div className="space-y-3">
                                {challenges.map((c, i) => (
                                    <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                                        <div className="w-6 h-6 bg-red-500/70 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                        <p className="text-white/80 text-sm leading-relaxed">{c}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Tips */}
                        <ScrollReveal delay={200}>
                            <div className="section-tag">Tips</div>
                            <h2 className="font-montserrat text-3xl font-bold text-white mb-6">
                                Tips to <span className="text-av-orange">Crack RTR Exam</span>
                            </h2>
                            <div className="space-y-3">
                                {tips.map((t, i) => (
                                    <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                                        <span className="text-2xl flex-shrink-0">{t.icon}</span>
                                        <p className="text-white/80 text-sm leading-relaxed">{t.tip}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Conclusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Conclusion
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The full form of RTR is <strong className="text-av-blue">Radio Telephony Restricted</strong>, a crucial license for aviation and maritime professionals. In aviation, it is mandatory for pilots and ATCs to legally operate aircraft communication systems. Conducted by the WPC wing of the Ministry of Communications, the RTR exam ensures that candidates are competent in handling radio communication, emergency procedures, and aviation phraseology.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Apart from aviation, RTR has different meanings in finance, technology, and business, but its significance in aviation is unmatched.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                For any aspiring commercial pilot in India, clearing RTR is one of the most important milestones in the journey toward flying an aircraft. With proper preparation, practice, and guidance, one can successfully clear RTR and move closer to fulfilling the dream of becoming a pilot.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="text-center mt-8">
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Start Your Pilot Journey →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}