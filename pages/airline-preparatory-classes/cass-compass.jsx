import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const compassModules = [
    {
        icon: '🧠',
        code: 'Module 1',
        title: 'Verbal Reasoning',
        duration: '10 min',
        questions: '20 Qs',
        desc: 'Tests your ability to understand and evaluate written information, draw logical conclusions from passages, and assess verbal arguments.',
        skills: ['Reading comprehension', 'Logical deduction from text', 'Verbal analogy', 'Critical reasoning'],
    },
    {
        icon: '➕',
        code: 'Module 2',
        title: 'Numerical Reasoning',
        duration: '12 min',
        questions: '20 Qs',
        desc: 'Evaluates speed and accuracy in mental arithmetic — a direct indicator of cockpit calculation ability under time pressure.',
        skills: ['Speed arithmetic', 'Data interpretation', 'Ratio & proportion', 'Distance-Speed-Time'],
    },
    {
        icon: '🗺️',
        code: 'Module 3',
        title: 'Spatial Reasoning',
        duration: '10 min',
        questions: '20 Qs',
        desc: 'Measures your ability to mentally rotate 3D objects and visualize spatial relationships — crucial for instrument reading and situational awareness.',
        skills: ['3D object rotation', 'Pattern folding', 'Mirror imaging', 'Instrument orientation'],
    },
    {
        icon: '🔢',
        code: 'Module 4',
        title: 'Abstract Reasoning',
        duration: '10 min',
        questions: '20 Qs',
        desc: 'Identifies patterns and rules in sequences of shapes and figures — tests raw cognitive ability and fluid intelligence.',
        skills: ['Shape pattern recognition', 'Matrix completion', 'Sequence rules', 'Odd-one-out'],
    },
    {
        icon: '💾',
        code: 'Module 5',
        title: 'Working Memory',
        duration: '8 min',
        questions: '15 Qs',
        desc: 'Tests your ability to hold and manipulate information in short-term memory — critical for handling multiple ATC instructions simultaneously.',
        skills: ['Digit span forward/backward', 'Letter-number sequencing', 'Alphanumeric recall', 'Word-pair association'],
    },
    {
        icon: '🎯',
        code: 'Module 6',
        title: 'Attention & Concentration',
        duration: '8 min',
        questions: '15 Qs',
        desc: 'Measures sustained attention, selective focus, and the ability to detect errors under time pressure — simulates cockpit scan duties.',
        skills: ['Proofreading tasks', 'Cancellation tests', 'Sustained vigilance', 'Selective attention'],
    },
    {
        icon: '🕹️',
        code: 'Module 7',
        title: 'CCT – Complex Control Task',
        duration: '10 min',
        questions: 'Practical',
        desc: 'A psychomotor test using joystick and rudder pedal simulation. Directly replicates aircraft control inputs and divided-attention flying tasks.',
        skills: ['Joystick tracking', 'Rudder pedal coordination', 'Eye-hand-foot sync', 'Dual-task tracking'],
    },
    {
        icon: '😌',
        code: 'Module 8',
        title: 'Personality & Psychometric Profile',
        duration: '60 min',
        questions: '~150 Qs',
        desc: 'Evaluates your psychological suitability for the airline pilot role — stress tolerance, CRM traits, decision-making style and personality fit.',
        skills: ['Big Five personality traits', 'CRM & teamwork values', 'Stress response scenarios', 'Leadership style'],
    },
];

const selectionPhases = [
    {
        phase: 'Phase 1',
        title: 'COMPASS Aptitude Test',
        icon: '🧪',
        color: 'bg-blue-600',
        border: 'border-blue-300',
        duration: '~90 minutes',
        format: 'Computer-based MCQ',
        desc: 'The computerized aptitude battery covering verbal, numerical, spatial, abstract reasoning, working memory and attention modules. All modules are timed and adaptive.',
        passing: 'Typically top 30–40% of candidates proceed to Phase 2',
    },
    {
        phase: 'Phase 2',
        title: 'CCT – Complex Control Task',
        icon: '🕹️',
        color: 'bg-purple-600',
        border: 'border-purple-300',
        duration: '~10 minutes',
        format: 'Hands-on Psychomotor Simulator',
        desc: 'You will use a joystick and rudder pedals to track a moving target on screen while simultaneously performing a secondary cognitive task. This is the test most candidates are least prepared for.',
        passing: 'A smooth, controlled tracking style scores higher than frantic corrections',
    },
    {
        phase: 'Phase 3',
        title: 'Personality Questionnaire',
        icon: '😌',
        color: 'bg-green-600',
        border: 'border-green-300',
        duration: '~60 minutes',
        format: 'Self-report Questionnaire',
        desc: 'A comprehensive personality profile assessing psychological suitability, CRM values, stress handling, and teamwork orientation. Be honest — the test flags inconsistent patterns.',
        passing: 'No pass/fail threshold — used holistically alongside aptitude scores',
    },
    {
        phase: 'Phase 4',
        title: 'Personal Interview',
        icon: '🎤',
        color: 'bg-av-orange',
        border: 'border-orange-300',
        duration: '~10–15 minutes',
        format: 'Face-to-face / Panel',
        desc: 'Final human assessment evaluating your communication, motivation, aviation knowledge, and personality fit. Questions focus on your background, goals, and situational judgment.',
        passing: 'Final shortlist for cadet programme entry is made after this round',
    },
];

const practiceQuestions = [
    {
        category: 'Numerical Reasoning',
        icon: '➕',
        questions: [
            { q: 'A pilot flies 360 km in 1 hour 12 minutes. What is the average speed in km/h?', a: '300 km/h', hint: '1 hr 12 min = 1.2 hrs. Speed = 360 ÷ 1.2 = 300' },
            { q: 'Fuel burn rate is 120 kg/hour. How much fuel is consumed in 2 hours 15 minutes?', a: '270 kg', hint: '2.25 × 120 = 270 kg' },
            { q: 'What is 35% of 1,800?', a: '630', hint: '1800 × 0.35 = 630' },
            { q: 'An aircraft descends 4,500 ft in 6 minutes. What is the rate of descent per minute?', a: '750 ft/min', hint: '4500 ÷ 6 = 750' },
        ],
    },
    {
        category: 'Spatial Reasoning',
        icon: '🗺️',
        questions: [
            { q: 'Aircraft heading 090°. Turns right 135°. New heading?', a: '225°', hint: '90 + 135 = 225°' },
            { q: 'Flying South (180°). Makes a 270° left turn. New heading?', a: '270° (West)', hint: '180 − 270 = −90 → 360 − 90 = 270°' },
            { q: 'The attitude indicator shows left bank 30° and nose up 10°. Which wing is higher?', a: 'Right wing', hint: 'In a left bank, the right wing rises above horizon' },
            { q: 'Heading 315° is which general direction?', a: 'North-West', hint: '315° lies between North (360°) and West (270°)' },
        ],
    },
    {
        category: 'Working Memory',
        icon: '💾',
        questions: [
            { q: 'Read once, recall backwards: 8 – 2 – 6 – 4 – 1 – 9 – 3', a: '3 – 9 – 1 – 4 – 6 – 2 – 8', hint: 'Group digits in pairs to help memorize the sequence' },
            { q: 'Read once: FOXTROT – LIMA – OSCAR – BRAVO – MIKE. What was the 4th word?', a: 'BRAVO', hint: 'Visualize each NATO word as an image in a mental sequence' },
            { q: 'Sequence: A4 – C9 – E2 – G7. What is the sum of the numbers in positions 2 and 4?', a: '16 (9+7)', hint: 'Focus on extracting the number from each pair by position' },
            { q: 'Read once: 3, 7, 1, 9, 5. Which number appears in the middle position?', a: '1', hint: 'Middle of 5 items = position 3. The 3rd number is 1.' },
        ],
    },
    {
        category: 'Abstract Reasoning',
        icon: '🔢',
        questions: [
            { q: 'Series: 3, 6, 12, 24, 48, ___?', a: '96', hint: 'Each number doubles. 48 × 2 = 96' },
            { q: 'Series: 100, 91, 83, 76, 70, ___?', a: '65', hint: 'Differences: −9, −8, −7, −6, −5. Next: 70 − 5 = 65' },
            { q: 'Series: 1, 4, 9, 16, 25, ___?', a: '36', hint: 'Perfect squares: 1², 2², 3², 4², 5², 6² = 36' },
            { q: 'If PROP = 4, WING = 4, COCKPIT = 7, ALTIMETER = ?', a: '9', hint: 'Count the letters in each word' },
        ],
    },
];

const prepTips = [
    {
        category: 'Numerical Reasoning',
        icon: '➕',
        color: 'bg-blue-50 border-blue-200',
        iconBg: 'bg-blue-600',
        tips: [
            'Practice 20 mental math problems every morning without a calculator',
            'Drill times tables up to 20×20 — speed matters more than method',
            'Practice percentage, ratio and D-S-T problems daily',
            'Aim to solve basic arithmetic in under 5 seconds per question',
            'Use apps like "Math Workout" or "King of Math" to build speed',
        ],
    },
    {
        category: 'Spatial Reasoning',
        icon: '🗺️',
        color: 'bg-green-50 border-green-200',
        iconBg: 'bg-green-600',
        tips: [
            'Practice 3D mental rotation on free online tools daily',
            'Study the attitude indicator (AI) and how bank/pitch reads visually',
            'Solve cube-folding and mirror-image problems regularly',
            'Play spatial puzzle games like Tetris, Block! Hexa or similar',
            'Study compass headings and learn to add/subtract bearings mentally',
        ],
    },
    {
        category: 'Working Memory',
        icon: '💾',
        color: 'bg-yellow-50 border-yellow-200',
        iconBg: 'bg-yellow-600',
        tips: [
            'Practice digit-span recall — work up to 8+ digits forward and 6+ backward',
            'Use the Memory Palace (Method of Loci) for long sequences',
            'Play dual n-back tasks — one of the best working memory builders',
            'Practice letter-number substitution tasks under time pressure',
            'Use spaced repetition — short daily sessions beat one long session',
        ],
    },
    {
        category: 'CCT – Psychomotor',
        icon: '🕹️',
        color: 'bg-purple-50 border-purple-200',
        iconBg: 'bg-purple-600',
        tips: [
            'Get a USB joystick and practice CCT-style tracking tasks on PC',
            'Practice smooth, small joystick corrections — avoid jerky over-inputs',
            'Build foot-hand coordination through sports like badminton or table tennis',
            'Use X-Plane or MSFS basic flight tasks to feel control coordination',
            'Practice the secondary task (e.g. mental arithmetic) while tracking simultaneously',
        ],
    },
    {
        category: 'Personality Test',
        icon: '😌',
        color: 'bg-pink-50 border-pink-200',
        iconBg: 'bg-pink-600',
        tips: [
            'Be honest — personality tests are designed to detect inconsistent answers',
            'Read about CRM (Crew Resource Management) principles before the test',
            'Aim to reflect traits like: calm under pressure, team-first, safety-focused',
            'Don\'t try to "game" the test — answer naturally and consistently',
            'Review Big Five personality traits so you understand what\'s being measured',
        ],
    },
    {
        category: 'Personal Interview',
        icon: '🎤',
        color: 'bg-red-50 border-red-200',
        iconBg: 'bg-red-600',
        tips: [
            'Prepare a clear, genuine answer to "Why do you want to be a pilot?"',
            'Practice STAR format (Situation, Task, Action, Result) for situational questions',
            'Know basic aviation facts: types of licences, DGCA, SpiceJet\'s fleet, etc.',
            'Read recent Indian aviation news before the interview day',
            'Work on confident eye contact, posture and a calm, measured speaking pace',
        ],
    },
];

// ─── Practice Card Component ──────────────────────────────────────────────────

function PracticeCard({ question, answer, hint }) {
    const [revealed, setRevealed] = useState(false);
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-av-orange/30 transition-all">
            <p className="font-semibold text-av-blue text-sm mb-4 leading-relaxed">{question}</p>
            {!revealed ? (
                <button
                    onClick={() => setRevealed(true)}
                    className="text-xs bg-av-blue text-white px-4 py-2 rounded-full font-semibold hover:bg-av-orange transition-all"
                >
                    Reveal Answer
                </button>
            ) : (
                <div className="space-y-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                        <p className="text-green-700 font-bold text-sm">✅ {answer}</p>
                    </div>
                    <div className="bg-av-blue/5 border border-av-blue/20 rounded-lg px-4 py-2">
                        <p className="text-av-blue text-xs">💡 <strong>Hint:</strong> {hint}</p>
                    </div>
                    <button
                        onClick={() => setRevealed(false)}
                        className="text-xs text-gray-400 hover:text-av-orange transition-all"
                    >
                        Hide Answer
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CompassPage() {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <Layout
            title="COMPASS Test – SpiceJet Cadet Pilot Programme Preparation 2025 | We One Aviation"
            description="Complete guide to the COMPASS (Computerized Pilot Aptitude Screening System) test used by SpiceJet's Spice Star Academy. Modules, phases, preparation tips, practice questions and CCT guidance."
        >

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">CASS – Cadet Aptitude Selection System</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        COMPASS <span className="text-av-orange">Test Preparation</span>
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">
                        Computerized Pilot Aptitude Screening System – SpiceJet Spice Star Cadet Programme
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        The COMPASS test is the <strong className="text-white">primary selection gateway</strong> for SpiceJet's Spice Star Academy Cadet Programme — one of India's most competitive ab initio cadet pathways. This complete guide covers every module, phase, and preparation strategy you need to crack it.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Verbal Reasoning', 'Numerical Reasoning', 'Spatial Reasoning', 'CCT Psychomotor', 'Personality Test', 'Personal Interview'].map(tag => (
                            <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                ✈️ {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── What is COMPASS ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">What is COMPASS?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is the <span className="text-av-orange">COMPASS Test?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            COMPASS — <strong className="text-av-blue">Computerized Pilot Aptitude Screening System</strong> — is the official aptitude testing platform used by SpiceJet for its Spice Star Academy Cadet Pilot Programme. It is a scientifically validated battery of cognitive, psychomotor and personality assessments designed to identify candidates who have the natural aptitude and psychological profile to succeed in airline pilot training.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Why SpiceJet Uses COMPASS</h3>
                                <ul className="space-y-3">
                                    {[
                                        { icon: '🧠', text: 'To identify candidates with strong cognitive processing speed and accuracy' },
                                        { icon: '✈️', text: 'To predict success rate in Type Rating and ab initio flight training' },
                                        { icon: '🎯', text: 'To measure psychomotor coordination needed for actual aircraft control' },
                                        { icon: '👥', text: 'To assess CRM and personality suitability for multi-crew airline operations' },
                                        { icon: '💡', text: 'To shortlist candidates for expensive cadet training investment' },
                                        { icon: '🛡️', text: 'To maintain SpiceJet\'s high standard of flight safety from day one' },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">COMPASS – Key Facts</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Programme', value: 'SpiceJet Spice Star Academy Cadet Pilot Programme' },
                                        { label: 'Test Type', value: 'Computerized aptitude + psychomotor + personality battery' },
                                        { label: 'Total Duration', value: '3–5 hours (all 4 phases on the same day)' },
                                        { label: 'Number of Attempts', value: '1–2 attempts maximum — preparation is critical' },
                                        { label: 'Eligibility', value: '10+2 with Physics & Maths, Class 2 Medical, 17–26 years (approx.)' },
                                        { label: 'Selection Outcome', value: 'Shortlisted candidates are sponsored for CPL training at partner FTOs' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/10 rounded-xl p-4">
                                            <p className="text-av-orange font-semibold text-xs mb-1">{item.label}</p>
                                            <p className="text-white/80 text-sm">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Modules Grid */}
                    <ScrollReveal className="text-center mb-10">
                        <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">
                            8 Modules of the <span className="text-av-orange">COMPASS Test</span>
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">Each module targets a specific cognitive or psychomotor skill set assessed during the selection</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {compassModules.map((mod, i) => (
                            <ScrollReveal key={mod.title} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-3xl">{mod.icon}</span>
                                        <span className="text-xs font-bold text-av-orange bg-av-orange/10 px-2 py-1 rounded-full">{mod.code}</span>
                                    </div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-1 text-sm">{mod.title}</h4>
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">⏱ {mod.duration}</span>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">📝 {mod.questions}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-grow">{mod.desc}</p>
                                    <div>
                                        {mod.skills.map(skill => (
                                            <span key={skill} className="inline-block bg-av-blue/5 text-av-blue text-xs px-2 py-0.5 rounded-full mr-1 mb-1">{skill}</span>
                                        ))}
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
                            The 4-Phase <span className="text-av-orange">COMPASS Selection Day</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            All four phases typically take place on the same assessment day. Here's exactly what to expect at each stage.
                        </p>
                    </ScrollReveal>

                    <div className="space-y-6">
                        {selectionPhases.map((phase, i) => (
                            <ScrollReveal key={phase.phase} delay={i * 80}>
                                <div className={`bg-white rounded-2xl border-2 ${phase.border} shadow-sm overflow-hidden`}>
                                    <div className={`${phase.color} px-8 py-5 flex flex-wrap items-center justify-between gap-4`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{phase.icon}</span>
                                            <div>
                                                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{phase.phase}</p>
                                                <h3 className="font-montserrat font-black text-white text-xl">{phase.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                                                <p className="text-white/70 text-xs">Duration</p>
                                                <p className="text-white font-bold text-sm">{phase.duration}</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                                                <p className="text-white/70 text-xs">Format</p>
                                                <p className="text-white font-bold text-sm">{phase.format}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-8 py-6 flex flex-col md:flex-row gap-4 items-start">
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{phase.desc}</p>
                                        <div className="md:w-72 flex-shrink-0 bg-av-orange/10 border border-av-orange/30 rounded-xl p-4">
                                            <p className="text-av-orange font-bold text-xs mb-1">📌 What It Means</p>
                                            <p className="text-gray-600 text-xs leading-relaxed">{phase.passing}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Day timeline */}
                    <ScrollReveal className="mt-12">
                        <div className="bg-av-blue rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-6 text-center">
                                📅 Typical COMPASS <span className="text-av-orange">Assessment Day Timeline</span>
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { time: '8:30 AM', event: 'Reporting & Document Verification', icon: '📋' },
                                    { time: '9:00 AM', event: 'COMPASS Aptitude Test (~90 min)', icon: '🧪' },
                                    { time: '11:00 AM', event: 'CCT – Complex Control Task (~10 min per candidate)', icon: '🕹️' },
                                    { time: '1:00 PM', event: 'Lunch Break', icon: '🍽️' },
                                    { time: '2:00 PM', event: 'Personality Questionnaire (~60 min)', icon: '😌' },
                                    { time: '3:30 PM', event: 'Personal Interviews (staggered)', icon: '🎤' },
                                    { time: '5:00 PM', event: 'Candidate Dismissal & Result Communication', icon: '📢' },
                                    { time: 'Next 7–14 days', event: 'Official shortlist notification via email/call', icon: '📧' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/10 rounded-xl p-4 flex items-start gap-3">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <div>
                                            <p className="text-av-orange font-bold text-xs mb-1">{item.time}</p>
                                            <p className="text-white/80 text-xs leading-relaxed">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Preparation Tips ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">How to Prepare</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            How to <span className="text-av-orange">Prepare</span> for COMPASS
                        </h2>
                        <p className="text-white/60 mt-2 text-sm max-w-2xl mx-auto">
                            COMPASS scores improve significantly with structured preparation. Here are targeted strategies for every module.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {prepTips.map((section, i) => (
                            <ScrollReveal key={section.category} delay={i * 80}>
                                <div className={`rounded-2xl border ${section.color} bg-white overflow-hidden h-full flex flex-col`}>
                                    <div className={`${section.iconBg} px-5 py-4 flex items-center gap-3`}>
                                        <span className="text-2xl">{section.icon}</span>
                                        <h4 className="font-montserrat font-bold text-white">{section.category}</h4>
                                    </div>
                                    <ul className="p-5 space-y-2 flex-grow">
                                        {section.tips.map((tip, j) => (
                                            <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                                <span className="text-av-orange font-bold mt-0.5 flex-shrink-0">✓</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* 4-Week Study Plan */}
                    <ScrollReveal>
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-6 text-center">
                                📅 Recommended <span className="text-av-orange">4-Week COMPASS Study Plan</span>
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    {
                                        week: 'Week 1', focus: 'Numerical & Verbal',
                                        tasks: ['Mental arithmetic 30 min/day without calculator', 'Times tables drill up to 20×20', 'Verbal reasoning practice passages', 'Read one aviation article daily'],
                                    },
                                    {
                                        week: 'Week 2', focus: 'Spatial & Memory',
                                        tasks: ['3D rotation exercises daily (free online tools)', 'Digit-span recall — build to 7+ digits', 'Attitude indicator reading practice', 'Compass heading additions/subtractions'],
                                    },
                                    {
                                        week: 'Week 3', focus: 'CCT & Multi-Tasking',
                                        tasks: ['USB joystick tracking tasks daily', 'Dual-task: track + mental arithmetic simultaneously', 'PILAPT practice app daily', 'Timed mock tests for all modules'],
                                    },
                                    {
                                        week: 'Week 4', focus: 'Full Mock & Interview',
                                        tasks: ['Full COMPASS mock test (timed)', 'CCT simulation — smooth inputs only', 'Mock personal interview with recording', 'Personality test practice + CRM review'],
                                    },
                                ].map((week, i) => (
                                    <div key={week.week} className="glass rounded-xl p-4">
                                        <div className="bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">{week.week}</div>
                                        <p className="text-white font-bold text-sm mb-3">{week.focus}</p>
                                        <ul className="space-y-1">
                                            {week.tasks.map((task, j) => (
                                                <li key={j} className="flex items-start gap-2 text-white/70 text-xs">
                                                    <span className="text-av-orange mt-0.5 flex-shrink-0">•</span>
                                                    <span>{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Practice Questions ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Practice Questions</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            COMPASS <span className="text-av-orange">Sample Practice Questions</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Attempt each question before revealing the answer. Target: solve arithmetic in under 10 seconds, reasoning in under 20 seconds.
                        </p>
                    </ScrollReveal>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {practiceQuestions.map((cat, i) => (
                            <button
                                key={cat.category}
                                onClick={() => setActiveCategory(i)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === i ? 'bg-av-orange text-white shadow-lg' : 'bg-white border border-gray-200 text-av-blue hover:border-av-orange hover:text-av-orange'}`}
                            >
                                {cat.icon} {cat.category}
                            </button>
                        ))}
                    </div>

                    {practiceQuestions.map((cat, i) => (
                        <div key={cat.category} className={activeCategory === i ? 'block' : 'hidden'}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {cat.questions.map((q, j) => (
                                    <ScrollReveal key={j} delay={j * 80}>
                                        <PracticeCard question={q.q} answer={q.a} hint={q.hint} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    ))}

                    <ScrollReveal className="text-center mt-10">
                        <p className="text-gray-500 text-sm mb-4">Want more COMPASS practice questions and a personalised coaching plan?</p>
                        <Link href="/contact" className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Get Personal Coaching →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Eligibility Criteria</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Who Can Apply for <span className="text-av-orange">Spice Star Cadet Programme?</span>
                        </h2>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { icon: '🎓', label: 'Education', value: '10+2 with Physics & Mathematics (minimum 50%)' },
                            { icon: '🏥', label: 'Medical', value: 'DGCA Class 2 Medical Certificate (Class 1 before solo)' },
                            { icon: '🗓️', label: 'Age', value: 'Typically 17–26 years at the time of application' },
                            { icon: '🌐', label: 'Language', value: 'English proficiency — spoken and written' },
                            { icon: '🇮🇳', label: 'Nationality', value: 'Indian citizens (NRIs may apply — check current batch criteria)' },
                            { icon: '📝', label: 'Licence', value: 'No prior flying experience required — ab initio programme' },
                        ].map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 items-start card-hover hover:border-av-orange/30">
                                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                                    <div>
                                        <p className="text-av-orange font-bold text-xs mb-1 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.value}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Start Preparing</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Your <span className="text-av-orange">SpiceJet Cockpit Seat</span> Starts Here
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            We One Aviation Academy offers dedicated COMPASS preparation coaching — covering all 8 modules, CCT joystick practice, personality test strategy and mock interview sessions. Everything under one roof.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Book Free Counselling →
                            </Link>
                            <Link href="/airline-preparation-course" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                View Full Airline Prep Course
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}