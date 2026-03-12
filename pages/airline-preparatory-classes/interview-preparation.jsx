import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const whyInterviewMatters = [
    { icon: '🎯', title: 'Final Gateway to the Cockpit', desc: 'After clearing aptitude tests and medicals, the interview is the last barrier between you and your pilot seat. Airlines use it to confirm you are the right person — not just the right score.' },
    { icon: '🧍', title: 'Personality Over Marks', desc: 'Airlines are not just hiring a pilot — they are hiring a crew member who will share a cockpit for years. Your attitude, composure, and communication matter more than your academic record.' },
    { icon: '⚡', title: 'Stress Tolerance is Watched', desc: 'Interviewers deliberately apply pressure to observe how you respond under stress. Staying calm, articulate and composed during tough questions is itself part of the evaluation.' },
    { icon: '🤝', title: 'CRM Starts at the Interview', desc: 'Crew Resource Management begins before you even step into a cockpit. Interviewers look for evidence of teamwork, decision-making clarity, and situational awareness in your answers.' },
];

const interviewTypes = [
    {
        icon: '👥',
        title: 'HR Panel Interview',
        airlines: 'SpiceJet, Air India, IndiGo, Air Arabia',
        desc: 'A structured interview with 2–4 HR and operations panel members. Focuses on motivation, background, values, and cultural fit within the airline.',
        keyAreas: ['Why do you want to be a pilot?', 'Tell us about yourself', 'Career goals and commitment', 'Situational judgement questions'],
        duration: '15–30 minutes',
    },
    {
        icon: '✈️',
        title: 'Technical Aviation Interview',
        airlines: 'Emirates, Qatar Airways, Air Arabia MPL',
        desc: 'Deep dive into your aviation knowledge — aircraft systems, meteorology, air regulations, navigation principles, and instrument reading.',
        keyAreas: ['Aircraft systems basics', 'Weather and METAR reading', 'Air traffic procedures', 'Basic navigation and heading calculations'],
        duration: '20–45 minutes',
    },
    {
        icon: '🌍',
        title: 'Competency-Based Interview (CBI)',
        airlines: 'Emirates, Qatar Airways, Lufthansa, British Airways',
        desc: 'Structured around the STAR format — you are asked to describe real past experiences that demonstrate specific competencies airlines look for in pilots.',
        keyAreas: ['Leadership and decision-making examples', 'Conflict resolution scenarios', 'Handling pressure and workload', 'Learning from past mistakes'],
        duration: '30–60 minutes',
    },
    {
        icon: '🎭',
        title: 'Group Discussion / Group Exercise',
        airlines: 'Air India, Some international programmes',
        desc: 'Candidates are assessed together as a group on a topic or scenario. Evaluators observe leadership, listening skills, and how you contribute without dominating.',
        keyAreas: ['Aviation industry topics', 'Scenario-based group decisions', 'Debate and consensus building', 'Active listening and participation'],
        duration: '20–30 minutes',
    },
];

const starExamples = [
    {
        question: 'Tell me about a time you had to make a quick decision under pressure.',
        situation: 'During my college exams, our study group leader fell ill the night before a major group presentation.',
        task: 'I had to step up, reorganise the content, and ensure all members knew their revised sections within a few hours.',
        action: 'I quickly assessed each member\'s strengths, redistributed the presentation topics, held a rapid rehearsal, and kept everyone calm and focused.',
        result: 'We delivered the presentation successfully the next morning and received one of the highest scores in our batch.',
        competency: 'Decision-making under pressure',
    },
    {
        question: 'Describe a situation where you had to work effectively as part of a team.',
        situation: 'During a community volunteer project, our 8-person team was tasked with organising a large-scale event with a very limited budget.',
        task: 'We needed to coordinate logistics, sponsors, and volunteer roles — all within two weeks with no professional event management experience.',
        action: 'I took initiative to create a shared task tracker, held daily check-ins, and ensured everyone was heard during decisions. When conflict arose over priorities, I mediated calmly.',
        result: 'The event ran smoothly, attracted over 300 attendees, and our team was recognised for exceptional coordination.',
        competency: 'Teamwork and CRM',
    },
    {
        question: 'Give an example of when you received critical feedback. How did you handle it?',
        situation: 'My college professor publicly pointed out errors in my technical report in front of the entire class.',
        task: 'I had to process the criticism, correct my work, and maintain my confidence for the rest of the semester.',
        action: 'I approached the professor privately, asked for specific guidance on the errors, reworked the report thoroughly, and applied the feedback to all subsequent assignments.',
        result: 'My final grade improved significantly, and the professor later cited my revised report as a strong example for the next batch.',
        competency: 'Receptiveness to feedback and self-improvement',
    },
];

const airlineQuestions = [
    {
        airline: 'SpiceJet',
        flag: '🔴',
        colour: 'border-red-300',
        headerBg: 'bg-red-600',
        questions: [
            'Why do you want to join SpiceJet specifically?',
            'What do you know about SpiceJet\'s fleet and expansion plans?',
            'How would you handle a disagreement with a senior captain in the cockpit?',
            'Describe your understanding of CRM and its importance in aviation.',
            'Where do you see yourself in 5 years within the airline?',
            'What are the key qualities of an ideal First Officer?',
        ],
    },
    {
        airline: 'IndiGo',
        flag: '🔵',
        colour: 'border-blue-300',
        headerBg: 'bg-blue-700',
        questions: [
            'Why IndiGo over other Indian carriers?',
            'How do you manage stress during high-workload situations?',
            'Describe a moment when you demonstrated leadership without a formal title.',
            'What is IndiGo\'s current fleet type and primary market focus?',
            'How would you communicate a safety concern to a senior colleague?',
            'What does punctuality mean to you as a pilot?',
        ],
    },
    {
        airline: 'Air India',
        flag: '🟠',
        colour: 'border-orange-300',
        headerBg: 'bg-orange-600',
        questions: [
            'What motivates you to fly for India\'s national carrier?',
            'How would you represent Air India\'s values as a First Officer?',
            'Tell us about a time you managed a conflict within a team environment.',
            'How do you stay updated with aviation regulations and industry developments?',
            'What challenges do you foresee in the first year of your airline career?',
            'Describe your preparation journey for becoming a commercial pilot.',
        ],
    },
    {
        airline: 'Emirates',
        flag: '🟢',
        colour: 'border-green-300',
        headerBg: 'bg-green-700',
        questions: [
            'Why do you want to fly for Emirates rather than an Indian carrier?',
            'How do you adapt when working with colleagues from very different cultural backgrounds?',
            'Describe a situation where your communication skills prevented a potential problem.',
            'What do you understand about long-haul operations and fatigue management?',
            'How would you handle a passenger emergency while managing cockpit duties?',
            'What specific qualities make you suitable for a multicultural crew environment?',
        ],
    },
    {
        airline: 'Qatar Airways',
        flag: '🟣',
        colour: 'border-purple-300',
        headerBg: 'bg-purple-700',
        questions: [
            'What draws you to Qatar Airways as your career airline?',
            'How do you handle authority and hierarchy in a professional setting?',
            'Describe your approach to continuous learning and self-development.',
            'What do you know about Qatar Airways\' route network and aircraft types?',
            'Tell us about a time you had to prioritise safety over efficiency.',
            'How do you manage personal wellbeing during demanding work schedules?',
        ],
    },
];

const preparationSteps = [
    {
        phase: 'Phase 1',
        duration: 'Weeks 1–2',
        title: 'Know Yourself Deeply',
        icon: '🪞',
        colour: 'bg-blue-600',
        tasks: [
            'Write a detailed personal timeline of every key life event, achievement and challenge',
            'Identify your top 5 strengths with real examples for each',
            'Prepare a concise, confident 90-second "Tell me about yourself" answer',
            'Clarify your genuine motivation for becoming a pilot — make it specific and authentic',
            'Research the airline you are applying to — fleet, routes, values, recent news',
        ],
    },
    {
        phase: 'Phase 2',
        duration: 'Weeks 2–3',
        title: 'Master the STAR Method',
        icon: '⭐',
        colour: 'bg-green-600',
        tasks: [
            'Study 8–10 competencies airlines typically assess (leadership, CRM, decision-making, etc.)',
            'Write out 6–8 detailed STAR stories from your personal and academic life',
            'Practise each STAR story out loud — not just in your head',
            'Record yourself answering and review your body language and pace',
            'Identify which stories can answer multiple different competency questions',
        ],
    },
    {
        phase: 'Phase 3',
        duration: 'Weeks 3–4',
        title: 'Build Aviation Knowledge',
        icon: '📚',
        colour: 'bg-orange-600',
        tasks: [
            'Revise basic aviation concepts: weather, navigation, air regulations, aircraft systems',
            'Study ICAO phonetic alphabet and standard radio phraseology',
            'Understand the difference between VFR and IFR operations',
            'Read about the specific aircraft type operated by your target airline',
            'Stay current on Indian and global aviation news — DGCA, IATA, airline expansions',
        ],
    },
    {
        phase: 'Phase 4',
        duration: 'Week 4',
        title: 'Mock Interviews & Refinement',
        icon: '🎤',
        colour: 'bg-purple-600',
        tasks: [
            'Conduct at least 3 full mock interviews with a mentor or coach',
            'Simulate panel interviews with 2–3 people asking questions simultaneously',
            'Practise answering unexpected and challenging questions without preparation time',
            'Refine your professional appearance — dress code, grooming, posture',
            'Prepare 3–5 intelligent questions to ask the panel at the end of your interview',
        ],
    },
];

const bodyLanguageTips = [
    { icon: '👁️', tip: 'Eye Contact', desc: 'Maintain natural, steady eye contact with each panel member. Avoid staring at one person only — distribute attention across the panel.' },
    { icon: '🪑', tip: 'Posture', desc: 'Sit upright with both feet flat on the floor. Lean very slightly forward to convey engagement. Never slouch or cross your arms.' },
    { icon: '🤲', tip: 'Hand Gestures', desc: 'Use open-palm gestures naturally to emphasise points. Keep hands visible on the table. Avoid fidgeting, touching your face, or pen-clicking.' },
    { icon: '😊', tip: 'Facial Expression', desc: 'Smile genuinely when entering the room and during positive exchanges. Keep a composed, neutral expression during serious questions.' },
    { icon: '🗣️', tip: 'Voice & Pace', desc: 'Speak at a measured, confident pace. Pause before answering — it shows thoughtfulness, not hesitation. Avoid filler words like "umm" and "like".' },
    { icon: '👔', tip: 'Professional Appearance', desc: 'Dress in formal business attire — well-pressed, conservative colours. For aviation interviews, a navy or charcoal suit is always appropriate.' },
];

const commonMistakes = [
    { mistake: 'Giving vague, generic answers', fix: 'Always anchor your answer in a specific real experience. "I am a good team player" means nothing — a STAR story proves it.' },
    { mistake: 'Badmouthing previous institutions or employers', fix: 'Even if you had a difficult experience, frame it as a learning opportunity. Airlines want positive, solution-focused candidates.' },
    { mistake: 'Not researching the airline beforehand', fix: 'Know the airline\'s fleet, number of aircraft, key routes, recent milestones, and values before you walk in. This shows genuine interest.' },
    { mistake: 'Freezing on technical questions', fix: 'If you are unsure, say "I would approach this by..." and reason through it aloud. Structured thinking is valued over memorised answers.' },
    { mistake: 'Overconfidence or arrogance', fix: 'Confidence is welcome — arrogance is not. Acknowledge your areas for development. Airlines want candidates who are self-aware.' },
    { mistake: 'Weak closing — no questions for the panel', fix: 'Always prepare 2–3 thoughtful questions for the panel. It shows genuine curiosity and engagement with the role.' },
];

const sampleQuestions = [
    { category: 'Motivational', question: 'What was the defining moment that made you decide to pursue a career as a pilot?' },
    { category: 'Situational', question: 'You notice your captain appears fatigued before departure. What steps would you take?' },
    { category: 'Technical', question: 'Explain the difference between indicated airspeed and true airspeed.' },
    { category: 'CRM', question: 'How would you assertively raise a safety concern if your captain dismisses your input?' },
    { category: 'Personal', question: 'Describe a significant personal failure and what it taught you about yourself.' },
    { category: 'Industry', question: 'What do you see as the biggest challenge facing the aviation industry over the next decade?' },
    { category: 'Motivational', question: 'If you were not selected today, what steps would you take to improve and reapply?' },
    { category: 'Situational', question: 'A passenger becomes aggressive in the cabin mid-flight. How does this affect your cockpit responsibilities?' },
];

const categoryColors = {
    Motivational: 'bg-blue-100 text-blue-700',
    Situational: 'bg-orange-100 text-orange-700',
    Technical: 'bg-green-100 text-green-700',
    CRM: 'bg-purple-100 text-purple-700',
    Personal: 'bg-red-100 text-red-700',
    Industry: 'bg-teal-100 text-teal-700',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function InterviewPreparationPage() {
    const [activeAirline, setActiveAirline] = useState(0);
    const [activeSTAR, setActiveSTAR] = useState(0);
    const [openSTAR, setOpenSTAR] = useState(null);

    return (
        <Layout
            title="Airline Pilot Interview Preparation – Complete Guide 2025 | We One Aviation"
            description="Master your airline pilot interview with We One Aviation's complete preparation guide. STAR method, airline-specific questions, body language tips, mock interview coaching for SpiceJet, IndiGo, Air India, Emirates & Qatar Airways."
        >

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">Airline Preparatory Classes</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Airline Pilot <span className="text-av-orange">Interview Preparation</span>
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">
                        From First Impression to Final Selection — 2025 Complete Guide
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        Clearing aptitude tests gets you to the door. A strong interview gets you through it. This comprehensive guide covers everything — interview formats, STAR technique, airline-specific questions, body language, common pitfalls, and a 4-week preparation roadmap.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['STAR Method', 'HR Panel', 'Technical Interview', 'CBI Format', 'Mock Interview Tips', 'Airline-Specific Q&A'].map(tag => (
                            <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                ✓ {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── Why the Interview Matters ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Why It Matters</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why the Pilot Interview is <span className="text-av-orange">More Than Just Q&A</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Many candidates prepare extensively for aptitude tests but underestimate the interview. In reality, airlines make their final hiring decisions almost entirely based on what they observe in this room.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyInterviewMatters.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Interview Types ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Interview Formats</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            4 Types of Airline <span className="text-av-orange">Interview Formats</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Each airline uses a different interview structure. Knowing the format before you walk in is a massive advantage.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {interviewTypes.map((type, i) => (
                            <ScrollReveal key={type.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-start gap-4 mb-4">
                                        <span className="text-4xl flex-shrink-0">{type.icon}</span>
                                        <div>
                                            <h3 className="font-montserrat font-bold text-av-blue text-lg">{type.title}</h3>
                                            <p className="text-av-orange text-xs font-semibold mt-0.5">{type.airlines}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{type.desc}</p>
                                    <div className="mb-3">
                                        <p className="text-av-blue font-semibold text-xs mb-2">Key Areas Assessed:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {type.keyAreas.map(area => (
                                                <span key={area} className="bg-av-blue/5 text-av-blue text-xs px-2 py-1 rounded-full">{area}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-av-orange/10 border border-av-orange/20 rounded-lg px-4 py-2 text-center mt-auto">
                                        <p className="text-av-orange font-bold text-xs">⏱ Typical Duration: {type.duration}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STAR Method ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Answer Framework</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            The <span className="text-av-orange">STAR Method</span> — Your Secret Weapon
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            STAR is the most powerful framework for answering competency-based interview questions. Every strong candidate uses it — whether they know it by name or not.
                        </p>
                    </ScrollReveal>

                    {/* STAR breakdown */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
                        {[
                            { letter: 'S', word: 'Situation', colour: 'bg-blue-600', desc: 'Set the scene. Describe the context — where, when, and who was involved. Keep it brief but vivid enough to paint a clear picture.' },
                            { letter: 'T', word: 'Task', colour: 'bg-green-600', desc: 'Explain your specific role or responsibility in that situation. What was expected of you? What challenge were you personally facing?' },
                            { letter: 'A', word: 'Action', colour: 'bg-av-orange', desc: 'This is the most important section. Describe exactly what YOU did — step by step. Use "I" not "we". Show your thinking and initiative.' },
                            { letter: 'R', word: 'Result', colour: 'bg-purple-600', desc: 'End with a clear, measurable outcome. What changed because of your actions? Quantify wherever possible — percentages, scores, feedback received.' },
                        ].map((s, i) => (
                            <ScrollReveal key={s.letter} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 text-center h-full flex flex-col">
                                    <div className={`w-14 h-14 ${s.colour} rounded-full flex items-center justify-center text-white font-black text-3xl mx-auto mb-4`}>{s.letter}</div>
                                    <h4 className="font-montserrat font-bold text-white text-xl mb-3">{s.word}</h4>
                                    <p className="text-white/70 text-xs leading-relaxed flex-grow">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* STAR Examples */}
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-white">
                            Live <span className="text-av-orange">STAR Answer Examples</span>
                        </h3>
                        <p className="text-white/60 mt-2 text-sm">Study these fully worked examples and build your own answers using the same structure</p>
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {starExamples.map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSTAR(i)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeSTAR === i ? 'bg-av-orange text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                            >
                                Example {i + 1}
                            </button>
                        ))}
                    </div>

                    {starExamples.map((ex, i) => (
                        <div key={i} className={activeSTAR === i ? 'block' : 'hidden'}>
                            <ScrollReveal>
                                <div className="glass rounded-2xl p-7">
                                    <div className="mb-5">
                                        <span className="bg-av-orange text-white text-xs font-bold px-3 py-1 rounded-full">{ex.competency}</span>
                                        <p className="text-white font-bold text-base mt-3">❓ Question: {ex.question}</p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { label: 'S — Situation', value: ex.situation, colour: 'bg-blue-600' },
                                            { label: 'T — Task', value: ex.task, colour: 'bg-green-600' },
                                            { label: 'A — Action', value: ex.action, colour: 'bg-av-orange' },
                                            { label: 'R — Result', value: ex.result, colour: 'bg-purple-600' },
                                        ].map(part => (
                                            <div key={part.label} className="bg-white/10 rounded-xl p-4">
                                                <span className={`inline-block ${part.colour} text-white text-xs font-bold px-2 py-0.5 rounded-full mb-2`}>{part.label}</span>
                                                <p className="text-white/80 text-sm leading-relaxed">{part.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Airline-Specific Questions ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Airline-Wise Preparation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Likely Interview Questions <span className="text-av-orange">by Airline</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Every airline has a distinct interview culture. These are the types of questions each airline panel is known to focus on — prepare answers specific to each one.
                        </p>
                    </ScrollReveal>

                    {/* Airline Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {airlineQuestions.map((a, i) => (
                            <button
                                key={a.airline}
                                onClick={() => setActiveAirline(i)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeAirline === i ? 'bg-av-blue text-white shadow-lg' : 'bg-white border border-gray-200 text-av-blue hover:border-av-orange hover:text-av-orange'}`}
                            >
                                {a.flag} {a.airline}
                            </button>
                        ))}
                    </div>

                    {airlineQuestions.map((airline, i) => (
                        <div key={airline.airline} className={activeAirline === i ? 'block' : 'hidden'}>
                            <ScrollReveal>
                                <div className={`bg-white rounded-2xl border-2 ${airline.colour} shadow-lg overflow-hidden`}>
                                    <div className={`${airline.headerBg} px-8 py-5 flex items-center gap-4`}>
                                        <span className="text-4xl">{airline.flag}</span>
                                        <div>
                                            <h3 className="font-montserrat font-black text-white text-2xl">{airline.airline}</h3>
                                            <p className="text-white/70 text-sm">Commonly asked interview questions — prepare a unique, honest answer for each</p>
                                        </div>
                                    </div>
                                    <div className="p-8 grid sm:grid-cols-2 gap-4">
                                        {airline.questions.map((q, j) => (
                                            <div key={j} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                <div className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{j + 1}</div>
                                                <p className="text-gray-700 text-sm leading-relaxed">{q}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-8 pb-8">
                                        <div className="bg-av-blue/5 border border-av-blue/20 rounded-xl p-4 flex items-start gap-3">
                                            <span className="text-2xl flex-shrink-0">💡</span>
                                            <p className="text-av-blue text-sm"><strong>Preparation Tip:</strong> Research this airline's fleet size, route network, recent news, and stated values before your interview. Weave that knowledge naturally into your answers to show genuine commitment.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 4-Week Prep Plan ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Preparation Roadmap</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Your <span className="text-av-orange">4-Week Interview</span> Preparation Plan
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Follow this structured roadmap to arrive at your interview day fully prepared, composed, and confident.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {preparationSteps.map((phase, i) => (
                            <ScrollReveal key={phase.phase} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col card-hover hover:border-av-orange/30">
                                    <div className={`${phase.colour} px-5 py-4 flex items-center gap-3`}>
                                        <span className="text-2xl">{phase.icon}</span>
                                        <div>
                                            <p className="text-white/70 text-xs font-semibold">{phase.phase} · {phase.duration}</p>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{phase.title}</h4>
                                        </div>
                                    </div>
                                    <ul className="p-5 space-y-2 flex-grow">
                                        {phase.tasks.map((task, j) => (
                                            <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0 font-bold">✓</span>
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Body Language & Common Mistakes ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Body Language */}
                        <div>
                            <ScrollReveal className="mb-8">
                                <div className="section-tag">Non-Verbal Communication</div>
                                <h2 className="font-montserrat text-3xl font-bold text-white">
                                    Body Language <span className="text-av-orange">Mastery</span>
                                </h2>
                                <p className="text-white/60 mt-2 text-sm">Studies show over 55% of communication is non-verbal. In a pilot interview, how you carry yourself is evaluated just as much as what you say.</p>
                            </ScrollReveal>
                            <div className="space-y-4">
                                {bodyLanguageTips.map((tip, i) => (
                                    <ScrollReveal key={tip.tip} delay={i * 60}>
                                        <div className="glass rounded-xl p-4 flex items-start gap-4">
                                            <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                                            <div>
                                                <p className="text-av-orange font-bold text-sm mb-1">{tip.tip}</p>
                                                <p className="text-white/70 text-xs leading-relaxed">{tip.desc}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>

                        {/* Common Mistakes */}
                        <div>
                            <ScrollReveal className="mb-8">
                                <div className="section-tag">Avoid These Errors</div>
                                <h2 className="font-montserrat text-3xl font-bold text-white">
                                    6 Interview Mistakes <span className="text-av-orange">That Cost Candidates Their Seat</span>
                                </h2>
                                <p className="text-white/60 mt-2 text-sm">These are the most common reasons candidates fail at the final interview stage — and exactly how to avoid each one.</p>
                            </ScrollReveal>
                            <div className="space-y-4">
                                {commonMistakes.map((item, i) => (
                                    <ScrollReveal key={i} delay={i * 60}>
                                        <div className="glass rounded-xl p-5">
                                            <div className="flex items-start gap-3 mb-2">
                                                <span className="text-red-400 font-bold text-lg flex-shrink-0">✗</span>
                                                <p className="text-white font-semibold text-sm">{item.mistake}</p>
                                            </div>
                                            <div className="flex items-start gap-3 pl-6">
                                                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                                                <p className="text-white/70 text-xs leading-relaxed">{item.fix}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sample Question Bank ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Question Bank</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Airline Interview <span className="text-av-orange">Question Bank</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Practise answering these questions on your own first — then work through them with a mentor or in a mock interview session.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {sampleQuestions.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 50}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover hover:border-av-orange/30 flex items-start gap-4">
                                    <div className="w-7 h-7 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                                    <div>
                                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${categoryColors[item.category]}`}>{item.category}</span>
                                        <p className="text-gray-700 text-sm leading-relaxed">{item.question}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="text-center mt-10">
                        <p className="text-gray-500 text-sm mb-4">Want 50+ more questions with model answers and personal coaching?</p>
                        <Link href="/contact" className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Book Your Mock Interview Session →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Get Coached</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Don't Wing Your <span className="text-av-orange">Most Important Interview</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            We One Aviation Academy's Airline Preparatory Classes include dedicated interview coaching — personalised mock interviews, STAR answer structuring, airline-specific preparation, and expert feedback from aviation professionals who know exactly what selection panels look for.
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