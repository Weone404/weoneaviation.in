import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const eligibilityCriteria = [
    { criteria: 'Nationality', details: 'Indian National or Overseas Citizen of India (OCI)' },
    { criteria: 'Age', details: '17 to 35 years at the time of applying' },
    { criteria: 'Height', details: 'Minimum 158 cms (approx. 5ft 2 inches)' },
    { criteria: 'Language', details: 'Fluent in English (verbal and written)' },
    { criteria: 'Education', details: '10+2 with minimum 60% in English, Physics & Mathematics' },
    { criteria: 'Passport', details: 'Must hold a valid Indian passport' },
    { criteria: 'Medical', details: 'Clearance of Class II Medical Test as per DGCA guidelines' },
];

const selectionPhases = [
    {
        phase: 'Phase 1',
        title: 'COMPASS Test',
        subtitle: 'Computerized Pilot Aptitude Screening System',
        desc: 'Multiple-choice questions. Results shall be announced soon after the test.',
        skills: ['Short-term memory (Memory)', 'Mental arithmetic (Mathematics)', 'Spatial Orientation (Orientation)', 'Multi-tasking (Task Manager)'],
        duration: '90 Minutes',
        icon: '🧠',
    },
    {
        phase: 'Phase 2',
        title: 'CCT',
        subtitle: 'Complex Control Task',
        desc: 'All applicants who pass Phase 1 will take this test. Requires a joystick and rudder pedal set connected to a computer.',
        skills: ['Eye-Hand-Foot Coordination', 'The aptitude to fly an aircraft'],
        duration: '10 Minutes',
        icon: '🕹️',
    },
    {
        phase: 'Phase 3',
        title: 'Psychometric Test',
        subtitle: 'Personality Assessment',
        desc: 'Evaluates your psychological suitability and personality for the role of an airline pilot.',
        skills: ['Personality assessment', 'Psychological suitability for airline pilot role'],
        duration: '60 Minutes',
        icon: '🧩',
    },
    {
        phase: 'Phase 4',
        title: 'Personal Interview',
        subtitle: 'Face-to-Face Assessment',
        desc: 'Final phase to evaluate communication skills and personality fit for the airline cockpit.',
        skills: ['Verbal communication skills', 'Personality for the job of an airline pilot'],
        duration: '10 Minutes',
        icon: '🎤',
    },
];

const courses = [
    {
        icon: '✈️',
        title: 'Cadet Pilot Programme',
        desc: 'The Pilot Programme is tailored specifically to address all training areas for Academy students with a holistic view.',
        phases: [
            'Ground School for preparation of DGCA CPL Papers',
            'Flying training for CPL',
            'Aircraft specific Type Rating',
        ],
        tag: 'Core Programme',
        tagColor: 'bg-av-orange',
    },
    {
        icon: '🎓',
        title: 'Cadet Pilot Programme + BBA',
        desc: 'Higher Secondary (10+2) students can finish their graduation alongside the Pilot Programme. Includes a BBA degree from a UGC-recognised University.',
        phases: [
            'Full Cadet Pilot Programme',
            'BBA Degree (UGC recognised)',
            'Dual qualification on completion',
        ],
        tag: 'For 10+2 Students',
        tagColor: 'bg-green-600',
    },
    {
        icon: '🏆',
        title: 'Cadet Pilot Programme + MBA',
        desc: 'Graduate students can opt for an MBA degree alongside the Pilot Programme, expanding their skill set for Flight Operations management roles.',
        phases: [
            'Full Cadet Pilot Programme',
            'MBA Degree (UGC recognised)',
            'Leadership & operations management skills',
        ],
        tag: 'For Graduates',
        tagColor: 'bg-purple-600',
    },
];

const feeStructure = [
    { instalment: '1st Instalment', amount: '₹10 Lac + taxes', note: 'Non-refundable admission fee. To be deposited within 10 days from date of letter of admission.' },
    { instalment: '2nd Instalment', amount: '₹30 Lac + taxes', note: 'To be deposited within 14 days from date of commencement of assigned batch.' },
    { instalment: '3rd Instalment', amount: '₹25 Lac + taxes', note: 'On commencement of IR phase of Flying Training or 7 months from batch commencement (whichever is earlier).' },
    { instalment: '4th Instalment', amount: '₹24.50 Lac + taxes', note: 'Within 14 days from date of CPL completion or 12 months from batch commencement (whichever is earlier).' },
];

const scholarships = [
    {
        category: 'Category 1',
        criteria: '96% and above aggregate in 10+2 (Physics, Maths & English) OR JEE Rank 1 to 1500',
        benefit: '₹10 Lac on 2nd + ₹10 Lac on 3rd + ₹10 Lac on 4th instalment',
        total: '₹30 Lac Total',
        max: 'Max 4 scholarships/year',
        color: 'bg-av-orange',
    },
    {
        category: 'Category 2',
        criteria: '92% and above aggregate in 10+2 (Physics, Maths & English) OR JEE Rank 1500 to 3000',
        benefit: '₹5 Lac on 2nd + ₹5 Lac on 3rd + ₹5 Lac on 4th instalment',
        total: '₹15 Lac Total',
        max: 'Max 6 scholarships/year',
        color: 'bg-av-blue',
    },
];

const curriculumPhases = [
    {
        phase: 'Phase 1',
        duration: '2 Months (Pre-flying Ground School) + 9 Months (Flying Academy)',
        title: 'CPL & Instrument Rating (Single Engine)',
        points: [
            '140 hours of Ground School Training (Pre-flying academy)',
            'Single Engine Flight Time training',
            'DGCA CAR Sec 7, Ser B, Pt IV, Issue III',
            'DGCA CAR Sec 7, Ser B, Pt VII, Issue I',
            'FAA CPL to DGCA CPL license conversion',
        ],
        note: 'SpiceJet does not require a Multi-Engine Rating for induction into its Q400/B737 Fleet.',
    },
    {
        phase: 'Phase 2',
        duration: '5 Months',
        title: 'SpiceJet Airline Pilot Induction Training',
        points: [
            'DGCA Theory Exams Training',
            'Conversion to Indian CPL',
            'SpiceJet company operations manual',
            'Safety equipment procedures training',
            'Slide, ditching and fire training',
            'Dangerous goods training',
        ],
        note: null,
    },
    {
        phase: 'Phase 3',
        duration: '7 Months',
        title: 'Type Rating',
        points: [
            'Technical ground school covering aircraft systems and performance',
            'Full Flight Simulator course (normal & emergency situations)',
            'Type Rating on Q400 or B737',
            'DGCA CAR Sec 7, Ser B, Pt XIX, Issue II',
            'Ground School Training (Post-flying academy) – 240 hours',
        ],
        note: 'Type Rating is required to fly a specific TYPE of aircraft (e.g. B737, Q400). Any aircraft above 5,700 kg MTOW or turbine-powered requires a Type Rating.',
    },
];

const keyFeatures = [
    { icon: '👨‍✈️', text: 'Programme managed entirely by SpiceJet to create First Officers for Q400 and B737 fleet' },
    { icon: '🪪', text: 'Graduate with a CPL (Indian DGCA) followed immediately by a Type Rating on Q400 or B737' },
    { icon: '📄', text: "Letter of Intent handed out on joining — offering a job as First Officer on Q400 or B737" },
];

const programmeHours = [
    { label: 'Ground School Training (Pre-flying academy)', hours: '140 Hours' },
    { label: 'Training at Flying Academy', hours: '200 Hours' },
    { label: 'Ground School Training (Post-flying academy)', hours: '240 Hours' },
];

const howItWorks = [
    { step: '1', icon: '📝', title: 'Register Online', desc: 'Apply online and ensure all eligibility requirements are met. Pay non-refundable application fee of ₹5,000.' },
    { step: '2', icon: '🔍', title: 'Complete the Selection', desc: 'Complete a 4-phase assessment process — COMPASS, CCT, Psychometric Test, and Personal Interview.' },
    { step: '3', icon: '⭐', title: 'Become a Spice Star', desc: 'Be a part of the ever-growing Spice Star family and paint the skies red with SpiceJet!' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpiceJetCadetPage() {
    return (
        <Layout
            title="SpiceJet Cadet Pilot Programme – Join Spice Star Academy | We One Aviation"
            description="SpiceJet's Cadet Pilot Programme at Spice Star Academy — world-class pilot training with India's favourite airline. Eligibility, selection process, fee structure, scholarships and curriculum."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">Airline Cadet Programme</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        SpiceJet <span className="text-av-orange">Cadet Pilot Programme</span>
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">Join Spice Star Academy — And Be A Star ✈️</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        SpiceJet's Cadet Pilot Programme is a perfect launchpad for those who want to fly high. Designed for young aspirants eyeing a seat in the cockpit — trained by <strong className="text-white">India's favourite airline</strong> with an assured job on successful completion.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {['Assured Job Offer', 'DGCA CPL + Type Rating', 'Scholarship Available', 'Q400 & B737 Fleet'].map(tag => (
                            <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                ✓ {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── About the Programme ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">About</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            SpiceJet Cadet <span className="text-av-orange">Pilot Programme</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">The world-class pilot training programme with India's favourite airline!</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Why SpiceJet?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    With 200 aircraft orders in process and massive expansion plans under the regional connectivity scheme, SpiceJet is all set to change the face of air travel in India — creating ample opportunities for those seeking a high-flying career.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    The Cadet Pilot Programme aims at not only providing trained professionals to the aviation industry but also an <strong className="text-av-blue">assured job with SpiceJet</strong> on completion of the course.
                                </p>
                                <ul className="space-y-2">
                                    {keyFeatures.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <span className="text-2xl flex-shrink-0">{f.icon}</span>
                                            <span>{f.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-6">Programme Hours</h3>
                                <div className="space-y-4 mb-8">
                                    {programmeHours.map((h, i) => (
                                        <div key={i} className="bg-white/10 rounded-xl p-4 flex justify-between items-center gap-4">
                                            <p className="text-white/80 text-sm">{h.label}</p>
                                            <p className="text-av-orange font-black text-lg whitespace-nowrap">{h.hours}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/20 pt-5">
                                    <p className="text-white/70 text-xs font-semibold mb-2">Infrastructure:</p>
                                    <p className="text-white/60 text-xs mb-2">🏢 <strong className="text-white">Ground Training:</strong> SpiceJet Aviation Training Academy, Gurgaon — DGCA-approved, 10,000+ sq. ft. classroom facilities.</p>
                                    <p className="text-white/60 text-xs">✈️ <strong className="text-white">Flight Training:</strong> SpiceJet-affiliated, DGCA-approved flying schools with a fleet of 20 single-engine trainer aircraft.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* How It Works */}
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-av-blue">
                            How Does This <span className="text-av-orange">Work?</span>
                        </h3>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {howItWorks.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center card-hover hover:border-av-orange/30 h-full">
                                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">{s.step}</div>
                                    <div className="text-3xl mb-3">{s.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2">{s.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Who Can Apply</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Eligibility <span className="text-av-orange">Criteria</span>
                        </h2>
                        <p className="text-white/60 mt-2 text-sm">Check if you meet the requirements for the SpiceJet Cadet Pilot Programme</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {eligibilityCriteria.map((row, i) => (
                            <ScrollReveal key={row.criteria} delay={i * 80}>
                                <div className="glass rounded-2xl p-5 flex items-start gap-4">
                                    <div className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">✓</div>
                                    <div>
                                        <p className="text-av-orange font-bold text-xs mb-1">{row.criteria}</p>
                                        <p className="text-white/80 text-sm leading-relaxed">{row.details}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Selection Process ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Selection Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            4-Phase <span className="text-av-orange">Selection Process</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            The selection process is completely transparent and scientifically designed to determine the suitability of the candidate for the job of an Airline Pilot.
                        </p>
                    </ScrollReveal>

                    {/* Registration Steps */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { step: '1', title: 'Online Registration', desc: 'Register at application.spicestaracademy.edu.in. Pay non-refundable application fee of ₹5,000.' },
                            { step: '2', title: 'Application Screening', desc: 'Internal screening process. If selected, the Academy team contacts you via email and/or SMS.' },
                            { step: '3', title: 'Selection Process Fee', desc: 'Pay non-refundable assessment fee of ₹20,000 via online payment to proceed to testing phases.' },
                        ].map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30">
                                    <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">{s.step}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2">{s.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Selection Phases */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {selectionPhases.map((phase, i) => (
                            <ScrollReveal key={phase.phase} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="text-3xl mb-3">{phase.icon}</div>
                                    <div className="inline-block bg-av-orange/10 text-av-orange text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{phase.phase}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-1">{phase.title}</h4>
                                    <p className="text-av-orange text-xs font-semibold mb-2">{phase.subtitle}</p>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{phase.desc}</p>
                                    <p className="text-av-blue font-semibold text-xs mb-2">Skills Tested:</p>
                                    <ul className="space-y-1 flex-grow mb-3">
                                        {phase.skills.map(skill => (
                                            <li key={skill} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="bg-av-blue/10 rounded-lg px-3 py-2 text-center mt-auto">
                                        <p className="text-av-blue font-bold text-xs">⏱ Duration: {phase.duration}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-8">
                        <div className="bg-av-blue/5 border border-av-blue/20 rounded-2xl p-5">
                            <p className="text-av-blue font-semibold text-sm mb-2">📌 Important Notes:</p>
                            <ul className="space-y-1">
                                {[
                                    'Only upon successfully completing each Phase can a candidate move ahead to the next phase.',
                                    'Phases 1, 2, 3 and 4 are usually completed on the same day, unless postponed.',
                                    'Final results will be announced on the same day after Phase 4.',
                                    'Phase 1, 2 and 3 are computer-based tests.',
                                    'No cell phones or calculators are allowed during the test.',
                                ].map(note => (
                                    <li key={note} className="flex items-start gap-2 text-xs text-gray-600">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Courses ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Courses We Offer</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Choose Your <span className="text-av-orange">Programme</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">SpiceJet Spice Star Academy offers three programme options to suit every aspiring pilot's background and goals.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {courses.map((course, i) => (
                            <ScrollReveal key={course.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="text-4xl mb-3">{course.icon}</div>
                                    <span className={`inline-block ${course.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit`}>{course.tag}</span>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-3">{course.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{course.desc}</p>
                                    <p className="text-av-blue font-semibold text-xs mb-2">Training Phases:</p>
                                    <ul className="space-y-1">
                                        {course.phases.map((p, j) => (
                                            <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="bg-av-orange text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{j + 1}</span>
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Curriculum ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Curriculum</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Training <span className="text-av-orange">Curriculum</span>
                        </h2>
                        <p className="text-white/60 mt-2 text-sm">Three structured phases from ground school to type rating</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {curriculumPhases.map((phase, i) => (
                            <ScrollReveal key={phase.phase} delay={i * 100}>
                                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                                    <div className="inline-block bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{phase.phase}</div>
                                    <h3 className="font-montserrat font-bold text-white mb-1">{phase.title}</h3>
                                    <p className="text-av-orange text-xs font-semibold mb-4">⏱ {phase.duration}</p>
                                    <ul className="space-y-2 flex-grow mb-4">
                                        {phase.points.map((point, j) => (
                                            <li key={j} className="flex items-start gap-2 text-white/80 text-sm">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {phase.note && (
                                        <div className="bg-av-orange/20 border border-av-orange/30 rounded-xl p-3 mt-auto">
                                            <p className="text-white/70 text-xs leading-relaxed"><span className="text-av-orange font-semibold">Note: </span>{phase.note}</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Fee Structure ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Fee Structure</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Programme <span className="text-av-orange">Fee Structure</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Total programme fee payable in 4 instalments. All amounts exclusive of GST and applicable taxes.</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {feeStructure.map((fee, i) => (
                            <ScrollReveal key={fee.instalment} delay={i * 80}>
                                <div className={`rounded-2xl p-6 h-full flex flex-col ${i === 0 ? 'bg-av-blue text-white' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-4 ${i === 0 ? 'bg-av-orange text-white' : 'bg-av-blue text-white'}`}>{i + 1}</div>
                                    <p className={`font-semibold text-xs mb-2 ${i === 0 ? 'text-white/70' : 'text-gray-500'}`}>{fee.instalment}</p>
                                    <p className={`font-montserrat font-black text-2xl mb-3 ${i === 0 ? 'text-av-orange' : 'text-av-blue'}`}>{fee.amount}</p>
                                    <p className={`text-xs leading-relaxed mt-auto ${i === 0 ? 'text-white/60' : 'text-gray-400'}`}>{fee.note}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                            <p className="text-av-blue font-semibold text-sm mb-3">📌 Additional Notes:</p>
                            <ul className="space-y-1">
                                {[
                                    'Extension of training at flying academy: ₹14,500 per hour + taxes.',
                                    'Additional housing (after 8 months): ₹28,000 per month + taxes.',
                                    'BBA/MBA Programme: 1st Instalment is ₹12 Lac + taxes (instead of ₹10 Lac).',
                                    'All amounts are exclusive of applicable taxes and GST.',
                                    'Refund of unaccrued fee considered in exceptional circumstances per Academy policy.',
                                ].map(note => (
                                    <li key={note} className="flex items-start gap-2 text-xs text-gray-500">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Scholarships ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Scholarship</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Scholarship <span className="text-av-orange">Programme</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">SpiceJet rewards academic excellence with substantial scholarships. Up to ₹30 Lac available for top performers.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {scholarships.map((s, i) => (
                            <ScrollReveal key={s.category} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 card-hover hover:border-av-orange/30">
                                    <div className={`inline-block ${s.color} text-white text-sm font-bold px-4 py-2 rounded-full mb-5`}>{s.category}</div>
                                    <p className="text-av-blue font-semibold text-sm mb-2">Eligibility:</p>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.criteria}</p>
                                    <p className="text-av-blue font-semibold text-sm mb-2">Scholarship Benefit:</p>
                                    <p className="text-gray-600 text-sm mb-4">{s.benefit}</p>
                                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                                        <div>
                                            <p className="text-av-orange font-black text-2xl">{s.total}</p>
                                            <p className="text-gray-400 text-xs">Total Scholarship Value</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-av-blue font-bold text-sm">{s.max}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                            <p className="text-yellow-800 font-semibold text-sm mb-2">⚠️ Disclaimer:</p>
                            <ul className="space-y-1">
                                {[
                                    'SpiceJet reserves the right to withdraw or change the scholarship criteria or entire programme without prior intimation.',
                                    'Number of scholarships is limited to 10 every year.',
                                    'Category 1 students get priority if more than 4 are eligible.',
                                ].map(note => (
                                    <li key={note} className="flex items-start gap-2 text-xs text-yellow-700">
                                        <span className="mt-0.5 flex-shrink-0">•</span><span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Walk-in & Faculty ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <div className="text-3xl mb-4">🚶</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">Walk-in Queries</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">For technical queries or counselling sessions, visit the SpiceJet Spice Star Academy facility:</p>
                                <div className="bg-av-blue/5 border border-av-blue/20 rounded-xl p-4">
                                    <p className="text-av-blue font-semibold text-sm">📅 Monday & Thursday</p>
                                    <p className="text-av-orange font-bold text-lg">02:30 PM – 03:30 PM</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white">
                                <div className="text-3xl mb-4">👨‍🏫</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Faculty & Infrastructure</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/10 rounded-xl p-4">
                                        <p className="text-av-orange font-semibold text-sm mb-1">Faculty</p>
                                        <p className="text-white/80 text-sm">DGCA-approved SpiceJet Ground School and Flight Instructors.</p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4">
                                        <p className="text-av-orange font-semibold text-sm mb-1">Ground Training</p>
                                        <p className="text-white/80 text-sm">SpiceJet Aviation Training Academy, Gurgaon. 10,000+ sq. ft. fully equipped DGCA-approved facilities.</p>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4">
                                        <p className="text-av-orange font-semibold text-sm mb-1">Flight Training</p>
                                        <p className="text-white/80 text-sm">SpiceJet-affiliated DGCA-approved flying schools with 20 single-engine trainer aircraft.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Apply Now</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to <span className="text-av-orange">Paint the Skies Red?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            Join the SpiceJet Cadet Pilot Programme and take the first step toward becoming a First Officer with India's favourite airline. We One Aviation Academy can guide you through the entire application and preparation process.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Get Free Counselling →
                            </Link>
                            <Link href="/commercial-pilot-license" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Learn About CPL
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}