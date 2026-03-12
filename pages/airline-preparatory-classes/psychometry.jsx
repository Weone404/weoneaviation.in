import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const testTypes = [
    {
        icon: '🧠',
        title: 'Aptitude & Cognitive Tests',
        desc: 'Measures your mental processing speed, logical reasoning, and ability to solve problems under time pressure.',
        examples: ['Number Series', 'Pattern Recognition', 'Logical Deduction', 'Abstract Reasoning'],
    },
    {
        icon: '➕',
        title: 'Mental Arithmetic',
        desc: 'Tests your ability to perform fast, accurate calculations without a calculator — critical for cockpit decision-making.',
        examples: ['Addition / Subtraction speed tests', 'Percentage calculations', 'Distance-Speed-Time problems', 'Unit conversions'],
    },
    {
        icon: '🗺️',
        title: 'Spatial Orientation',
        desc: 'Evaluates your ability to mentally rotate and visualize objects in 3D — essential for reading instruments and situational awareness.',
        examples: ['3D object rotation', 'Map reading', 'Instrument interpretation', 'Compass direction problems'],
    },
    {
        icon: '🎯',
        title: 'Multi-Tasking (Divided Attention)',
        desc: 'Assesses your ability to track multiple tasks simultaneously — simulating real cockpit workload management.',
        examples: ['Dual-task tracking', 'Monitoring multiple dials', 'Simultaneous input tasks', 'Priority task switching'],
    },
    {
        icon: '💾',
        title: 'Short-Term Memory',
        desc: 'Tests how well you retain and recall sequences of numbers, letters, or symbols after a brief delay.',
        examples: ['Digit span recall', 'Letter sequence memory', 'Word-pair association', 'Number reversal tasks'],
    },
    {
        icon: '🕹️',
        title: 'Psychomotor / Hand-Eye Coordination',
        desc: 'Measures your physical coordination using joystick/rudder pedal tasks — directly simulates aircraft control inputs.',
        examples: ['Joystick tracking tasks', 'Rudder pedal coordination', 'Cursor stabilization', 'Complex Control Task (CCT)'],
    },
    {
        icon: '😌',
        title: 'Personality & Psychometric Assessment',
        desc: 'Evaluates your psychological suitability — stress tolerance, teamwork, decision-making style, and leadership qualities.',
        examples: ['Big Five personality traits', 'Situational judgement', 'Stress response scenarios', 'CRM (Crew Resource Management) traits'],
    },
    {
        icon: '🎤',
        title: 'Personal Interview',
        desc: 'Face-to-face assessment of communication skills, confidence, motivation, and overall suitability as an airline pilot.',
        examples: ['Motivation for flying', 'Situational questions', 'Technical aviation knowledge', 'Career goal clarity'],
    },
];

const airlineTests = [
    {
        airline: 'SpiceJet',
        flag: '🔴',
        programme: 'Spice Star Academy Cadet Programme',
        system: 'COMPASS (Computerized Pilot Aptitude Screening System)',
        phases: [
            { name: 'COMPASS Test', duration: '90 min', type: 'Aptitude MCQ', skills: 'Memory, Maths, Orientation, Multi-tasking' },
            { name: 'CCT (Complex Control Task)', duration: '10 min', type: 'Psychomotor', skills: 'Eye-Hand-Foot Coordination, Joystick & Rudder' },
            { name: 'Psychometric Test', duration: '60 min', type: 'Personality', skills: 'Psychological suitability for airline pilot role' },
            { name: 'Personal Interview', duration: '10 min', type: 'Interview', skills: 'Verbal communication, personality assessment' },
        ],
        tip: 'All 4 phases usually happen on the same day. Practice the CCT joystick task separately — it catches many candidates off-guard.',
        color: 'border-red-400',
        headerBg: 'bg-red-600',
    },
    {
        airline: 'IndiGo',
        flag: '🔵',
        programme: 'IndiGo Cadet Pilot Programme (ifly)',
        system: 'DLR / PILAPT / Airline-specific aptitude battery',
        phases: [
            { name: 'Cognitive Aptitude Test', duration: '60–90 min', type: 'Aptitude', skills: 'Reasoning, Memory, Arithmetic, Spatial' },
            { name: 'Multi-Task Assessment', duration: '30 min', type: 'Psychomotor', skills: 'Divided attention, tracking, coordination' },
            { name: 'Personality Questionnaire', duration: '45 min', type: 'Personality', skills: 'CRM traits, stress tolerance, teamwork' },
            { name: 'HR & Technical Interview', duration: '20–30 min', type: 'Interview', skills: 'Motivation, aviation knowledge, communication' },
        ],
        tip: 'IndiGo places heavy emphasis on multi-tasking tests. Practice tracking tasks on apps like Pilot Aptitude Trainer.',
        color: 'border-blue-400',
        headerBg: 'bg-blue-700',
    },
    {
        airline: 'Air India',
        flag: '🟠',
        programme: 'Air India Ab Initio / Cadet Programme',
        system: 'ADAPT / Airline-specific aptitude system',
        phases: [
            { name: 'Aptitude Battery Test', duration: '90 min', type: 'Aptitude', skills: 'Verbal, Numerical, Abstract, Spatial reasoning' },
            { name: 'Psychomotor Assessment', duration: '20 min', type: 'Psychomotor', skills: 'Coordination, reaction time, tracking' },
            { name: 'Group Discussion', duration: '20 min', type: 'Group', skills: 'Leadership, teamwork, communication' },
            { name: 'Panel Interview', duration: '20–30 min', type: 'Interview', skills: 'Aviation knowledge, motivation, situational judgment' },
        ],
        tip: 'Air India includes a Group Discussion round — practice speaking clearly on aviation topics and current airline industry news.',
        color: 'border-orange-400',
        headerBg: 'bg-orange-600',
    },
    {
        airline: 'Emirates',
        flag: '🟢',
        programme: 'Emirates Cadet Pilot Programme',
        system: 'PILAPT (Pilot Aptitude Test)',
        phases: [
            { name: 'PILAPT Online Test', duration: '90 min', type: 'Aptitude', skills: 'Spatial, Memory, Maths, Multi-tasking, Coordination' },
            { name: 'Simulator Assessment', duration: '30 min', type: 'Psychomotor', skills: 'Basic aircraft handling, coordination' },
            { name: 'Psychometric Questionnaire', duration: '45 min', type: 'Personality', skills: 'Personality profile, stress management' },
            { name: 'Final Interview (Dubai)', duration: '30 min', type: 'Interview', skills: 'Motivation, English proficiency, situational judgment' },
        ],
        tip: 'PILAPT is available to practice online at pilapt.com. Emirates shortlists heavily based on PILAPT scores — practice daily for 4 weeks minimum.',
        color: 'border-green-400',
        headerBg: 'bg-green-700',
    },
    {
        airline: 'Qatar Airways',
        flag: '🟣',
        programme: 'Qatar Airways Cadet Pilot Programme',
        system: 'Airline-specific aptitude + Simulator assessment',
        phases: [
            { name: 'Online Aptitude Test', duration: '60 min', type: 'Aptitude', skills: 'Maths, Reasoning, Spatial orientation' },
            { name: 'Psychomotor Test', duration: '20 min', type: 'Psychomotor', skills: 'Hand-eye coordination, tracking tasks' },
            { name: 'Personality Profile', duration: '45 min', type: 'Personality', skills: 'Behavioural tendencies, CRM suitability' },
            { name: 'Assessment Day Interview', duration: '30 min', type: 'Interview', skills: 'English, aviation motivation, competency-based questions' },
        ],
        tip: 'Qatar focuses on strong English proficiency and confidence. Practice STAR (Situation, Task, Action, Result) answers for the interview.',
        color: 'border-purple-400',
        headerBg: 'bg-purple-700',
    },
];

const prepTips = [
    {
        category: 'Mental Arithmetic',
        icon: '➕',
        color: 'bg-blue-50 border-blue-200',
        iconBg: 'bg-blue-600',
        tips: [
            'Practice 20 mental math problems every morning without a calculator',
            'Use apps like "Math Workout" or "King of Math" daily',
            'Drill multiplication tables up to 20×20',
            'Practice percentage, fraction and speed-distance-time problems',
            'Time yourself — aim to solve basic problems in under 5 seconds',
        ],
    },
    {
        category: 'Spatial Orientation',
        icon: '🗺️',
        color: 'bg-green-50 border-green-200',
        iconBg: 'bg-green-600',
        tips: [
            'Practice 3D mental rotation exercises daily (use free online tools)',
            'Study aircraft attitude indicator (AI) and heading indicator (HI)',
            'Solve cube-folding and mirror-image problems',
            'Play spatial puzzle games like Tetris or Block! Hexa',
            'Study maps and compass directions regularly',
        ],
    },
    {
        category: 'Memory & Recall',
        icon: '💾',
        color: 'bg-yellow-50 border-yellow-200',
        iconBg: 'bg-yellow-600',
        tips: [
            'Practice digit-span exercises — recall 7+ digits forward and backward',
            'Use the Memory Palace technique for sequences',
            'Play "N-Back" tasks (dual n-back) to build working memory',
            'Practice letter-number substitution tasks',
            'Review sequences immediately after — spaced repetition helps',
        ],
    },
    {
        category: 'Multi-Tasking',
        icon: '🎯',
        color: 'bg-orange-50 border-orange-200',
        iconBg: 'bg-orange-600',
        tips: [
            'Download the PILAPT practice app and use it daily',
            'Practice tracking a moving target while doing mental arithmetic simultaneously',
            'Use flight simulator games (X-Plane, MSFS) to build cockpit awareness',
            'Practice dual-task activities (e.g., walking + counting backwards)',
            'Build focus endurance — practice sustained attention for 90 minutes',
        ],
    },
    {
        category: 'Psychomotor / Coordination',
        icon: '🕹️',
        color: 'bg-purple-50 border-purple-200',
        iconBg: 'bg-purple-600',
        tips: [
            'Get a USB joystick and practice tracking tasks on PC simulators',
            'Use apps specifically designed for CCT (Complex Control Task) practice',
            'Practice smooth, small joystick inputs — avoid jerky corrections',
            'Build foot-hand coordination through sports like badminton or table tennis',
            'Simulate rudder inputs with keyboard while tracking with joystick',
        ],
    },
    {
        category: 'Personality & Interview',
        icon: '🎤',
        color: 'bg-red-50 border-red-200',
        iconBg: 'bg-red-600',
        tips: [
            'Be honest in personality tests — they detect inconsistent answers',
            'Read about CRM (Crew Resource Management) principles thoroughly',
            'Prepare your "Why do you want to be a pilot?" story — keep it genuine',
            'Practice STAR format answers for competency-based questions',
            'Read aviation news and know current trends in Indian aviation',
        ],
    },
];

const practiceQuestions = [
    {
        category: 'Mental Arithmetic',
        icon: '➕',
        questions: [
            { q: 'A pilot flies 450 km in 1.5 hours. What is the average speed?', a: '300 km/h', hint: 'Speed = Distance ÷ Time' },
            { q: 'What is 17% of 2400?', a: '408', hint: 'Multiply 2400 × 0.17' },
            { q: 'If fuel burn is 85 kg/hour, how much fuel is used in 2 hours 45 minutes?', a: '233.75 kg', hint: '2.75 × 85 = 233.75' },
            { q: 'An aircraft descends 3,000 ft in 4 minutes. What is the rate of descent per minute?', a: '750 ft/min', hint: '3000 ÷ 4 = 750' },
        ],
    },
    {
        category: 'Spatial Orientation',
        icon: '🗺️',
        questions: [
            { q: 'An aircraft is heading 270°. It turns left 90°. What is the new heading?', a: '180°', hint: '270° − 90° = 180°' },
            { q: 'You are flying North. You make a 180° turn. What direction are you flying?', a: 'South', hint: 'North + 180° = South' },
            { q: 'An aircraft banks left at 30° and the nose pitches up. Which way does the left wing point?', a: 'Down (toward ground)', hint: 'In a left bank, left wing dips below horizon' },
            { q: 'Heading 090° = which cardinal direction?', a: 'East', hint: '090° is due East on a compass' },
        ],
    },
    {
        category: 'Short-Term Memory',
        icon: '💾',
        questions: [
            { q: 'Read once, then recall: 7 – 3 – 9 – 1 – 5 – 8 – 2. Repeat backwards.', a: '2 – 8 – 5 – 1 – 9 – 3 – 7', hint: 'Practice digit-span reversal daily' },
            { q: 'Read once: ALPHA – BRAVO – DELTA – GOLF – KILO. What was the 3rd word?', a: 'DELTA', hint: 'Visualize the sequence as a story' },
            { q: 'Read once: 4 – 7 – 2 – 9 – 6. What is the sum of the 2nd and 4th numbers?', a: '16 (7+9)', hint: 'Focus on position, not just sequence' },
            { q: 'Sequence: A3 – B7 – C2 – D9. What letter-number pair was in position 3?', a: 'C2', hint: 'Use chunking to memorize alphanumeric pairs' },
        ],
    },
    {
        category: 'Logical Reasoning',
        icon: '🧩',
        questions: [
            { q: 'All pilots pass medical. Some cadets are pilots. Can all cadets pass medical?', a: 'Not necessarily — only cadets who are pilots must pass medical', hint: 'Identify what is definite vs. possible' },
            { q: 'Series: 2, 5, 10, 17, 26, ___?', a: '37', hint: 'Differences are +3, +5, +7, +9, +11' },
            { q: 'If FLIGHT = 6, PILOT = 5, then AVIATION = ?', a: '8', hint: 'Count the number of letters in each word' },
            { q: 'Series: 144, 121, 100, 81, ___?', a: '64', hint: 'These are perfect squares: 12², 11², 10², 9², 8²' },
        ],
    },
];

// ─── Practice Quiz Component ─────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function PsychometryPage() {
    const [activeAirline, setActiveAirline] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <Layout
            title="Pilot Psychometry Test Preparation – Airline Cadet Guide 2025 | We One Aviation"
            description="Complete guide to pilot psychometry tests for SpiceJet, IndiGo, Air India, Emirates & Qatar Airways cadet programmes. Types of tests, preparation tips, practice questions and airline-wise details."
        >

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">Airline Preparatory Classes</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Pilot <span className="text-av-orange">Psychometry</span> Test Preparation
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">Complete Guide for Airline Cadet Selection 2025</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        Psychometry tests are the <strong className="text-white">first major hurdle</strong> in every airline cadet selection process. Whether you're applying to SpiceJet, IndiGo, Air India, Emirates or Qatar Airways — this guide covers everything you need to crack their tests and land your seat in the cockpit.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['SpiceJet COMPASS', 'IndiGo ifly', 'Emirates PILAPT', 'Air India', 'Qatar Airways'].map(tag => (
                            <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                ✈️ {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── What is Psychometry ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">What is Psychometry?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is a <span className="text-av-orange">Pilot Psychometry Test?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            A Pilot Psychometry Test is a scientifically designed assessment used by airlines to evaluate whether a candidate has the <strong className="text-av-blue">mental aptitude, coordination, personality, and psychological suitability</strong> to become a safe and effective airline pilot. These tests are mandatory for all airline cadet programmes worldwide.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Why Do Airlines Test Psychometry?</h3>
                                <ul className="space-y-3">
                                    {[
                                        { icon: '🧠', text: 'To check if you can handle high cognitive workload in the cockpit' },
                                        { icon: '⚡', text: 'To assess quick decision-making under stress and time pressure' },
                                        { icon: '🎯', text: 'To evaluate hand-eye-foot coordination needed to fly the aircraft' },
                                        { icon: '👥', text: 'To determine if your personality suits CRM and teamwork in a crew environment' },
                                        { icon: '💡', text: 'To predict your training success rate before investing in expensive flight training' },
                                        { icon: '🛡️', text: 'To ensure flight safety by identifying the right candidates early' },
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
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">Key Facts About Psychometry Tests</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'When does it happen?', value: 'Before flying training — during airline cadet selection' },
                                        { label: 'Can you prepare for it?', value: 'Yes! With structured practice, scores improve significantly' },
                                        { label: 'How many attempts?', value: 'Most airlines allow 1–2 attempts. Preparation is critical.' },
                                        { label: 'How long does it take?', value: '3–5 hours for a full selection day (all phases)' },
                                        { label: 'Is it the same for all airlines?', value: 'No — each airline uses a different system (COMPASS, PILAPT, DLR, etc.)' },
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

                    {/* Test Types Grid */}
                    <ScrollReveal className="text-center mb-10">
                        <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">
                            8 Types of <span className="text-av-orange">Psychometry Tests</span> for Pilots
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">Every airline cadet test uses a combination of these assessment types</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {testTypes.map((test, i) => (
                            <ScrollReveal key={test.title} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="text-3xl mb-3">{test.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{test.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-grow">{test.desc}</p>
                                    <div className="space-y-1">
                                        {test.examples.map(ex => (
                                            <span key={ex} className="inline-block bg-av-blue/5 text-av-blue text-xs px-2 py-0.5 rounded-full mr-1 mb-1">{ex}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Airline-wise Tests ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Airline-Wise Details</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Psychometry Tests by <span className="text-av-orange">Airline</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">Each airline uses a different assessment system. Know exactly what to expect before you walk in.</p>
                    </ScrollReveal>

                    {/* Airline Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {airlineTests.map((airline, i) => (
                            <button
                                key={airline.airline}
                                onClick={() => setActiveAirline(i)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeAirline === i ? 'bg-av-blue text-white shadow-lg' : 'bg-white border border-gray-200 text-av-blue hover:border-av-orange hover:text-av-orange'}`}
                            >
                                {airline.flag} {airline.airline}
                            </button>
                        ))}
                    </div>

                    {/* Active Airline Card */}
                    {airlineTests.map((airline, i) => (
                        <div key={airline.airline} className={activeAirline === i ? 'block' : 'hidden'}>
                            <ScrollReveal>
                                <div className={`bg-white rounded-2xl border-2 ${airline.color} shadow-lg overflow-hidden`}>
                                    <div className={`${airline.headerBg} px-8 py-5`}>
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <h3 className="font-montserrat font-black text-white text-2xl">{airline.flag} {airline.airline}</h3>
                                                <p className="text-white/80 text-sm">{airline.programme}</p>
                                            </div>
                                            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                                                <p className="text-white/70 text-xs">Assessment System</p>
                                                <p className="text-white font-bold text-sm">{airline.system}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="overflow-x-auto rounded-xl mb-6">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-av-blue text-white">
                                                        <th className="px-4 py-3 text-left">Phase</th>
                                                        <th className="px-4 py-3 text-left">Test Name</th>
                                                        <th className="px-4 py-3 text-left">Duration</th>
                                                        <th className="px-4 py-3 text-left">Type</th>
                                                        <th className="px-4 py-3 text-left">Skills Tested</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {airline.phases.map((phase, j) => (
                                                        <tr key={phase.name} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-4 py-3 font-bold text-av-orange">{j + 1}</td>
                                                            <td className="px-4 py-3 font-semibold text-av-blue">{phase.name}</td>
                                                            <td className="px-4 py-3 text-gray-600">{phase.duration}</td>
                                                            <td className="px-4 py-3">
                                                                <span className="bg-av-blue/10 text-av-blue text-xs font-semibold px-2 py-1 rounded-full">{phase.type}</span>
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs">{phase.skills}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="bg-av-orange/10 border border-av-orange/30 rounded-xl p-4 flex items-start gap-3">
                                            <span className="text-2xl flex-shrink-0">💡</span>
                                            <div>
                                                <p className="text-av-orange font-bold text-sm mb-1">Pro Tip for {airline.airline}:</p>
                                                <p className="text-gray-600 text-sm leading-relaxed">{airline.tip}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Preparation Tips ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">How to Prepare</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            How to <span className="text-av-orange">Prepare</span> for Psychometry Tests
                        </h2>
                        <p className="text-white/60 mt-2 text-sm max-w-2xl mx-auto">
                            Psychometry tests can be mastered with the right practice strategy. Here are targeted tips for each test category.
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

                    {/* Study Plan */}
                    <ScrollReveal>
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-6 text-center">
                                📅 Recommended <span className="text-av-orange">4-Week Study Plan</span>
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { week: 'Week 1', focus: 'Foundation', tasks: ['Mental arithmetic drills — 30 min/day', 'Digit span memory exercises', 'Compass/heading direction basics', 'Read about CRM principles'] },
                                    { week: 'Week 2', focus: 'Spatial & Coordination', tasks: ['3D rotation exercises daily', 'Start joystick tracking practice', 'Attitude indicator reading', 'Spatial puzzle games'] },
                                    { week: 'Week 3', focus: 'Multi-Tasking & Speed', tasks: ['PILAPT practice app daily', 'Dual-task exercises', 'Timed arithmetic under 5 sec', 'Mock psychometric tests online'] },
                                    { week: 'Week 4', focus: 'Full Mock Tests', tasks: ['Full COMPASS mock test', 'CCT joystick task simulation', 'Mock personal interview', 'Review weak areas from week 1–3'] },
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
                            Sample <span className="text-av-orange">Practice Questions</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Try answering each question before revealing the answer. Aim to solve in under 10 seconds for arithmetic and 20 seconds for reasoning.
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
                        <p className="text-gray-500 text-sm mb-4">Want more practice questions and a personalised preparation plan?</p>
                        <Link href="/contact" className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Get Personal Coaching →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Start Preparing</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Don't Leave Your <span className="text-av-orange">Cockpit Seat to Chance</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            We One Aviation Academy offers dedicated Airline Preparatory Classes that include psychometry coaching, mock tests, CCT practice sessions, interview preparation and DGCA ground classes — everything under one roof.
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