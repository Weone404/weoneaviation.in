import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const glanceTable = [
    { label: 'Full Form', value: 'Radio Telephony Restricted (Aeronautical)' },
    { label: 'Common Name', value: 'RTR (A)' },
    { label: 'Purpose', value: 'Aviation Radio Communication Certification' },
    { label: 'Required For', value: 'Commercial Pilots & Certain Aviation Personnel' },
    { label: 'Conducting Authority', value: 'Wireless Planning & Coordination (WPC) Wing' },
    { label: 'Aviation Regulator', value: 'DGCA' },
    { label: 'Exam Type', value: 'Oral + Practical Assessment' },
    { label: 'Importance', value: 'Required for professional radio communication during flight' },
];

const atcCommunications = [
    'Air Traffic Control (ATC)',
    'Ground Control',
    'Tower Controllers',
    'Approach Control',
    'Area Control Centres',
    'Other aircraft when required',
];

const incorrectCommunicationResults = [
    'Navigation errors',
    'Runway misunderstandings',
    'Airspace violations',
    'Delayed instructions',
    'Safety risks',
    'Operational confusion',
];

const rtrCertifiedAbilities = [
    'Communicate confidently with Air Traffic Control.',
    'Use internationally accepted aviation phraseology.',
    'Read back instructions accurately.',
    'Handle abnormal situations calmly.',
    'Maintain communication discipline throughout flight operations.',
];

const rtrTrainingPrepares = [
    'Receive ATC clearances.',
    'Request departure permission.',
    'Coordinate take-off.',
    'Communicate during climb and cruise.',
    'Receive approach instructions.',
    'Obtain landing clearance.',
    'Report emergencies.',
    'Manage unexpected situations professionally.',
];

const whoNeedsRTR = [
    'Commercial Pilot Licence (CPL) holders and applicants',
    'Airline pilots',
    'Flight instructors operating aircraft with radio communication',
    'Corporate pilots',
    'Charter pilots',
    'Certain other aviation personnel, depending on regulatory requirements',
];

const trainingTopics = [
    {
        title: 'Standard Aviation Phraseology',
        desc: 'Pilots learn internationally recognized communication terminology that reduces misunderstandings between pilots and Air Traffic Control.',
        list: null,
    },
    {
        title: 'Air Traffic Control Communication',
        desc: 'Students practice communication during:',
        list: ['Taxiing', 'Take-off', 'Climb', 'Cruise', 'Descent', 'Landing', 'Parking'],
    },
    {
        title: 'Emergency Communication',
        desc: 'Pilots learn appropriate communication procedures during situations involving:',
        list: ['Engine failure', 'Weather diversions', 'Medical emergencies', 'Communication failure', 'Aircraft system malfunctions'],
    },
    {
        title: 'Radio Discipline',
        desc: 'Professional communication requires:',
        list: ['Clear pronunciation', 'Correct timing', 'Listening carefully', 'Accurate readback', 'Professional confidence'],
    },
];

const rtrVsDgca = [
    { rtr: 'Focuses on aviation radio communication', dgca: 'Regulates civil aviation in India' },
    { rtr: 'Conducted under WPC', dgca: 'Regulates pilot licensing' },
    { rtr: 'Tests communication skills', dgca: 'Conducts pilot theory examinations' },
    { rtr: 'Required for radio operation', dgca: 'Issues Commercial Pilot Licence' },
    { rtr: 'Part of the pilot qualification pathway', dgca: 'Governs overall pilot licensing standards' },
];

const rtrVsFrtol = [
    { rtr: 'Demonstrates competence in aeronautical radio communication', frtol: 'Licence authorizing radio operation in flight' },
    { rtr: 'Qualification obtained through examination', frtol: 'Operational licence issued subject to applicable requirements' },
    { rtr: 'Important milestone for commercial pilots', frtol: 'Used alongside pilot licensing privileges' },
];

const benefits = [
    { icon: '🗣️', title: 'Improved Communication Skills', desc: 'Pilots become more confident communicating with Air Traffic Control in different operational environments.' },
    { icon: '🛡️', title: 'Better Flight Safety', desc: 'Clear communication reduces misunderstandings and improves situational awareness.' },
    { icon: '🎖️', title: 'Professional Aviation Standards', desc: 'RTR training develops communication habits expected by airlines and aviation organizations.' },
    { icon: '📈', title: 'Career Progression', desc: 'RTR is an important component of the licensing pathway for aspiring commercial pilots in India.' },
    { icon: '💪', title: 'Increased Confidence', desc: 'Pilots become more comfortable handling routine and non-routine communication scenarios.' },
];

const myths = [
    { title: 'Myth 1: RTR Is Only About Speaking English', desc: 'Not true. The examination evaluates the correct use of aviation radio procedures, phraseology, and communication discipline—not just general English speaking ability.' },
    { title: 'Myth 2: RTR Is Harder Than Flying', desc: 'RTR requires consistent preparation and practice, but with structured guidance and regular communication exercises, many students successfully clear the examination.' },
    { title: 'Myth 3: Only Airline Pilots Need RTR', desc: 'Commercial pilots, charter pilots, flight instructors, and other aviation professionals who use aeronautical radio communication may require the appropriate qualification depending on their role and regulatory requirements.' },
];

const internalLinks = [
    'Commercial Pilot Licence (CPL)',
    'DGCA Full Form',
    'DGCA Ground Classes',
    'PPL Full Form',
    'How to Become a Pilot After 12th',
    'Pilot Training in India',
    'CPL Eligibility',
    'CPL Syllabus',
    'ATPL Full Form',
    'Aviation Career Guide',
];

const eligibilityRequirements = [
    'Enrollment in or completion of the relevant pilot training pathway.',
    'Compliance with applicable aviation regulations.',
    'Adequate knowledge of aviation communication procedures.',
    'Ability to communicate using standard aviation phraseology.',
];

const steps = [
    {
        num: 1,
        title: 'Complete Your Ground Training',
        intro: 'Build a strong foundation in aviation subjects such as:',
        list: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Aircraft Technical Knowledge', 'Radio Communication Procedures'],
        outro: 'A solid understanding of these topics makes RTR preparation easier.',
    },
    {
        num: 2,
        title: 'Practice Standard Aviation Phraseology',
        intro: 'Professional communication follows internationally recognized terminology.',
        intro2: 'Students should become comfortable with:',
        list: ['Call signs', 'Readback procedures', 'Departure clearance', 'Taxi instructions', 'Take-off clearance', 'Climb instructions', 'Cruise communication', 'Descent procedures', 'Landing clearance', 'Emergency phraseology'],
        outro: 'Regular practice improves confidence and accuracy.',
    },
    {
        num: 3,
        title: 'Apply for the RTR (A) Examination',
        intro: 'Candidates should follow the application process prescribed by the WPC Wing and ensure they submit the required documents within the specified timelines.',
    },
    {
        num: 4,
        title: 'Attend the Examination',
        intro: "The RTR (A) assessment typically evaluates a candidate's ability to communicate effectively using standard aviation radio procedures.",
        outro: 'The examination focuses on practical communication skills rather than memorizing lengthy theoretical answers.',
    },
    {
        num: 5,
        title: 'Receive Your RTR Qualification',
        intro: 'Candidates who successfully complete the examination become eligible for the RTR (A) qualification, which forms an important part of the licensing pathway for commercial pilots in India.',
    },
];

const examPatternAreas = [
    {
        title: 'Standard Radio Phraseology',
        desc: 'Candidates demonstrate the correct use of internationally accepted aviation communication terminology.',
        list: null,
    },
    {
        title: 'Air Traffic Control Communication',
        desc: 'Students communicate as they would during different stages of flight, including:',
        list: ['Start-up', 'Taxi', 'Take-off', 'Climb', 'Cruise', 'Descent', 'Landing'],
    },
    {
        title: 'Emergency Communication',
        desc: 'Candidates may be assessed on how they communicate during abnormal or emergency situations, such as:',
        list: ['Communication failure', 'Weather diversions', 'Engine-related issues', 'Priority situations'],
    },
    {
        title: 'Practical Communication Skills',
        desc: 'Examiners evaluate:',
        list: ['Clarity of speech', 'Confidence', 'Listening ability', 'Accuracy of readbacks', 'Professional communication discipline'],
    },
];

const syllabusTopics = [
    'Aviation Radio Telephony',
    'ICAO Standard Phraseology',
    'Air Traffic Control Procedures',
    'Aviation Communication Rules',
    'Radio Equipment Basics',
    'Emergency Communication',
    'Flight Operations Communication',
    'Aviation Safety Communication',
    'Operational Procedures',
    'Practical Radio Exercises',
];

const prepareTips = [
    { icon: '📘', title: 'Understand Standard Phraseology', desc: 'Learn the meaning and correct use of standard aviation communication terms.' },
    { icon: '🎙️', title: 'Practice Speaking Daily', desc: 'Regular speaking practice improves pronunciation, confidence, and communication flow.' },
    { icon: '📻', title: 'Listen to Live ATC Communications', desc: 'Listening to real aviation radio conversations helps students become familiar with communication speed, terminology, and sequencing.' },
    { icon: '🎧', title: 'Participate in Mock Oral Sessions', desc: 'Mock interviews and simulated radio exercises help students build confidence before the examination.' },
    { icon: '🎯', title: 'Focus on Clarity, Not Speed', desc: 'Professional communication is judged by accuracy and clarity—not by speaking quickly.' },
];

const commonMistakes = [
    { title: 'Memorizing Instead of Understanding', desc: 'Understanding the purpose of each communication procedure is more effective than memorizing scripted responses.' },
    { title: 'Speaking Too Quickly', desc: 'Fast communication often leads to unclear pronunciation and missed information.' },
    { title: 'Ignoring Readback Practice', desc: 'Correctly repeating ATC instructions is an essential aviation skill.' },
    { title: 'Lack of Regular Practice', desc: 'Consistent communication exercises are more beneficial than occasional intensive study sessions.' },
    { title: 'Fear of Making Mistakes', desc: 'Confidence develops through practice. Speaking regularly in simulated scenarios helps reduce examination anxiety.' },
];

const careerOpportunities = [
    { icon: '🛫', title: 'Commercial Pilot', desc: 'Operate passenger and cargo aircraft after meeting all licensing requirements.' },
    { icon: '✈️', title: 'Airline Pilot', desc: 'Progress toward airline employment after obtaining the necessary licences, ratings, and experience.' },
    { icon: '🛩️', title: 'Charter Pilot', desc: 'Fly private and business aircraft for charter operators.' },
    { icon: '🏢', title: 'Corporate Pilot', desc: 'Operate aircraft for businesses and private organizations.' },
    { icon: '🎓', title: 'Flight Instructor', desc: 'Teach aspiring pilots while using professional aviation communication procedures.' },
    { icon: '📡', title: 'Aviation Operations', desc: 'Support aviation organizations where knowledge of radio communication contributes to operational efficiency and safety.' },
];

const whyWeOne = [
    'Experienced aviation instructors',
    'Practical radio communication training',
    'Mock oral assessments',
    'Personalized mentoring',
    'Updated study resources',
    'DGCA-focused academic support',
    'Career counselling',
    'Structured preparation strategies',
];

const faqs = [
    { q: '1. What is the full form of RTR?', a: 'RTR stands for Radio Telephony Restricted (Aeronautical), a qualification related to aviation radio communication.' },
    { q: '2. Is RTR compulsory for a Commercial Pilot Licence (CPL)?', a: 'RTR (A) is an important requirement within the commercial pilot licensing pathway in India. Candidates should always verify the latest DGCA and WPC regulations applicable to their training.' },
    { q: '3. Who conducts the RTR examination?', a: 'The Wireless Planning & Coordination (WPC) Wing, under the Department of Telecommunications, conducts the RTR (A) examination.' },
    { q: '4. Is the RTR examination difficult?', a: 'The examination requires preparation and practical communication skills. With structured practice, mock assessments, and a clear understanding of aviation phraseology, many students successfully qualify.' },
    { q: '5. Why is radio communication important for pilots?', a: 'Effective radio communication enables pilots and Air Traffic Control to exchange critical operational information, improving coordination and maintaining aviation safety.' },
];

// ─── Small reusable sub-components ─────────────────────────────────────────

function BulletList({ items, dark = false }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className={`flex items-start gap-2 text-sm ${dark ? 'text-white/80' : 'text-gray-600'}`}>
                    <span className="text-av-orange mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RTRPage() {
    return (
        <Layout
            title="RTR Full Form: Meaning, Eligibility, Exam, Importance & Complete Guide for Pilots (2026)"
            description="Learn the RTR full form, its meaning, eligibility, exam process, syllabus, importance, and how the RTR (A) licence helps aspiring commercial pilots in India."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Aviation Qualification</div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        RTR Full Form: Meaning, Importance & Complete Guide for Aspiring Pilots
                    </h1>
                    <p className="text-av-orange font-semibold text-sm mb-3">
                        What is the Full Form of RTR? (AI Overview &amp; Featured Snippet Optimized)
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-5">
                        RTR stands for Radio Telephony Restricted (Aeronautical), commonly written as RTR (A) or Radio Telephone Operator's Restricted Certificate (Aeronautical). It is a professional aeronautical radio communication qualification required for commercial pilots and certain aviation personnel operating radio equipment during flight.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        In India, the RTR (A) examination is conducted under the Wireless Planning &amp; Coordination (WPC) Wing, Department of Telecommunications, while it is closely integrated into the commercial pilot licensing pathway alongside DGCA requirements. Passing the RTR (A) examination is one of the important milestones for candidates pursuing a Commercial Pilot Licence (CPL).
                    </p>
                </ScrollReveal>
            </div>

            {/* ── RTR at a Glance ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Quick Reference</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue underline-orange">
                            RTR at a Glance
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="text-left font-montserrat font-bold py-3 px-5">Particular</th>
                                        <th className="text-left font-montserrat font-bold py-3 px-5">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {glanceTable.map((row, i) => (
                                        <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                            <td className="py-3 px-5 font-semibold text-av-blue align-top w-1/3">{row.label}</td>
                                            <td className="py-3 px-5 text-gray-600 align-top">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What is RTR ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">About RTR</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            What is RTR?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The Radio Telephony Restricted (Aeronautical) qualification demonstrates that a pilot can communicate safely and effectively using standard aviation radio procedures.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            During every flight, pilots continuously communicate with:
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <BulletList items={atcCommunications} />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            These communications help maintain separation between aircraft, coordinate departures and arrivals, manage emergencies, and ensure safe flight operations.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            The RTR qualification confirms that a pilot understands aviation phraseology, radio procedures, and communication standards expected in professional aviation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why RTR Important ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">Why It Matters</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            Why is RTR Important in Aviation?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Clear radio communication is one of the foundations of aviation safety.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Incorrect communication can result in:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <ScrollReveal>
                            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 h-full">
                                <BulletList items={incorrectCommunicationResults} />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white h-full">
                                <p className="text-white/80 text-sm leading-relaxed mb-3">
                                    For this reason, professional pilots receive specialized radio communication training before obtaining the necessary qualifications.
                                </p>
                                <p className="text-av-orange font-semibold text-sm">
                                    An RTR-certified pilot demonstrates the ability to:
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-light rounded-2xl p-6 border border-av-sky/20">
                            <BulletList items={rtrCertifiedAbilities} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why Every Commercial Pilot Needs RTR ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">For Commercial Pilots</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Every Commercial Pilot Needs <span className="text-av-orange">RTR</span>
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-4">
                            Aspiring commercial pilots often focus on flight hours and DGCA theory examinations, but radio communication is equally important.
                        </p>
                        <p className="text-white/70 leading-relaxed mb-4">
                            Every commercial flight depends on continuous communication between the pilot and Air Traffic Control.
                        </p>
                        <p className="text-av-orange font-semibold mb-4">RTR training prepares pilots to:</p>
                    </ScrollReveal>

                    <ScrollReveal delay={150}>
                        <div className="glass rounded-2xl p-6 mb-6">
                            <BulletList items={rtrTrainingPrepares} dark />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={250}>
                        <p className="text-white/70 leading-relaxed">
                            Without effective communication, safe aircraft operations would not be possible.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Who Needs RTR ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">Eligibility Snapshot</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            Who Needs an RTR (A) Certificate?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            RTR (A) is generally required for aviation professionals who are authorized to operate aeronautical radio communication equipment.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">This commonly includes:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {whoNeedsRTR.map((item, i) => (
                            <ScrollReveal key={item} delay={i * 60}>
                                <div className="card-hover bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3 h-full">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                    <span className="text-gray-600 text-sm">{item}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <p className="text-gray-500 text-sm">
                            Candidates should always verify the latest licensing requirements issued by DGCA and WPC.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What Does an RTR-Certified Pilot Learn ── */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">Training Content</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            What Does an RTR-Certified Pilot Learn?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-2">RTR training goes beyond memorizing aviation phrases.</p>
                        <p className="text-gray-600 leading-relaxed mb-2">Students learn how to communicate professionally in real operational situations.</p>
                        <p className="text-gray-600 leading-relaxed">Training usually covers:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {trainingTopics.map((topic, i) => (
                            <ScrollReveal key={topic.title} delay={i * 100}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{topic.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{topic.desc}</p>
                                    {topic.list && <BulletList items={topic.list} />}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-8">
                        <p className="text-gray-500 text-sm text-center">
                            These skills improve operational safety throughout a pilot's career.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── RTR vs DGCA ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Clearing the Confusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            RTR vs DGCA — What's the Difference?
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm">Many students believe RTR and DGCA are the same. They are not.</p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mb-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="text-left font-montserrat font-bold py-3 px-5">RTR (A)</th>
                                        <th className="text-left font-montserrat font-bold py-3 px-5">DGCA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rtrVsDgca.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                            <td className="py-3 px-5 text-gray-600 align-top">{row.rtr}</td>
                                            <td className="py-3 px-5 text-gray-600 align-top">{row.dgca}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <p className="text-gray-500 text-sm text-center">
                            Both play different but complementary roles in a commercial pilot's journey.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── RTR vs FRTOL ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Another Common Question</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            RTR vs FRTOL
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm max-w-2xl mx-auto">
                            Another common point of confusion is the difference between RTR (A) and Flight Radio Telephony Operator's Licence (FRTOL).
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mb-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="text-left font-montserrat font-bold py-3 px-5">RTR (A)</th>
                                        <th className="text-left font-montserrat font-bold py-3 px-5">FRTOL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rtrVsFrtol.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                            <td className="py-3 px-5 text-gray-600 align-top">{row.rtr}</td>
                                            <td className="py-3 px-5 text-gray-600 align-top">{row.frtol}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <p className="text-gray-500 text-sm text-center">
                            Understanding the distinction helps students better navigate the pilot licensing process.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Benefits</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Benefits of Obtaining an <span className="text-av-orange">RTR (A)</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Earning an RTR qualification provides several professional advantages.</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((item, i) => (
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

            {/* ── Expert Insight ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Expert Insight</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            Why Students Should Take RTR Preparation Seriously
                        </h2>
                        <div className="bg-av-blue rounded-2xl p-8 text-white">
                            <p className="text-white/80 text-sm leading-relaxed mb-4">
                                One of the most common challenges faced by aspiring pilots is underestimating the importance of aviation communication. While flight training develops aircraft handling skills, professional pilots must also communicate accurately under time pressure.
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                At We One Aviation, students are encouraged to practice aviation phraseology regularly rather than only preparing for the examination. Developing confident communication habits early can make flight training smoother and better prepare students for professional cockpit operations.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Common Myths ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Myth Busting</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Common Myths <span className="text-av-orange">About RTR</span>
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {myths.map((myth, i) => (
                            <ScrollReveal key={myth.title} delay={i * 100}>
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="font-montserrat font-bold text-av-orange mb-2">{myth.title}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">{myth.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RTR (A) Eligibility Criteria ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            RTR (A) Eligibility Criteria
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Before applying for the Radio Telephony Restricted (Aeronautical) [RTR (A)] examination, candidates should ensure they meet the applicable eligibility requirements. These requirements may change over time, so applicants should always verify the latest notifications from the Wireless Planning &amp; Coordination (WPC) Wing and the Directorate General of Civil Aviation (DGCA).
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            In general, candidates pursuing a Commercial Pilot Licence (CPL) or other aviation careers requiring aeronautical radio communication are the primary applicants for the RTR (A) examination.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">Typical requirements include:</p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <BulletList items={eligibilityRequirements} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Step-by-Step RTR (A) Process ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Step-by-Step <span className="text-av-orange">RTR (A) Process</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Understanding the RTR process helps students prepare with confidence.</p>
                    </ScrollReveal>

                    <div className="space-y-6">
                        {steps.map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 80}>
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{step.num}</div>
                                        <h3 className="font-montserrat font-bold text-av-blue text-lg pt-1">Step {step.num}: {step.title}</h3>
                                    </div>
                                    <div className="pl-12">
                                        {step.intro && <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.intro}</p>}
                                        {step.intro2 && <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.intro2}</p>}
                                        {step.list && (
                                            <div className="grid sm:grid-cols-2 gap-2 mb-3">
                                                <BulletList items={step.list} />
                                            </div>
                                        )}
                                        {step.outro && <p className="text-gray-500 text-sm leading-relaxed">{step.outro}</p>}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RTR (A) Exam Pattern ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">Exam Pattern</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            RTR (A) Exam Pattern
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-2">
                            The examination is designed to assess how effectively candidates communicate in operational aviation situations.
                        </p>
                        <p className="text-white/70 leading-relaxed">Areas commonly assessed include:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {examPatternAreas.map((area, i) => (
                            <ScrollReveal key={area.title} delay={i * 100}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <h3 className="font-montserrat font-bold text-white mb-2">{area.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-3">{area.desc}</p>
                                    {area.list && <BulletList items={area.list} dark />}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RTR (A) Syllabus ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8">
                        <div className="section-tag">Syllabus</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            RTR (A) Syllabus
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-2">
                            The RTR syllabus focuses on practical aeronautical communication and operational procedures.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">Students should prepare topics such as:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {syllabusTopics.map((topic, i) => (
                            <ScrollReveal key={topic} delay={i * 40}>
                                <div className="flex items-start gap-2 bg-av-light rounded-xl p-4 border border-av-sky/20">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">•</span>
                                    <span className="text-gray-600 text-sm">{topic}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <p className="text-gray-500 text-sm">
                            Rather than rote learning, candidates benefit from regular communication practice and simulated ATC conversations.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── How to Prepare ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Preparation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How to Prepare for the <span className="text-av-orange">RTR Examination</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Success in the RTR examination comes from consistent practice rather than last-minute preparation.</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prepareTips.map((item, i) => (
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

            {/* ── Common Mistakes ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Avoid These</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Common Mistakes Students Make During <span className="text-av-orange">RTR Preparation</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Many candidates lose marks due to avoidable errors.</p>
                    </ScrollReveal>

                    <div className="space-y-3">
                        {commonMistakes.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 60}>
                                <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                    <div className="w-6 h-6 bg-red-500/70 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Career Opportunities ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Careers</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Career Opportunities <span className="text-av-orange">After RTR</span>
                        </h2>
                        <p className="text-white/70 mt-2 text-sm">An RTR qualification supports several aviation career pathways. Potential opportunities include:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {careerOpportunities.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-white mb-2 text-sm">{item.title}</h3>
                                    <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Choose We One Aviation ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-8 text-center">
                        <div className="section-tag">Why We One Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            Why Choose We One Aviation?
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Preparing for the RTR examination requires more than studying notes—it requires practical communication skills and professional guidance.
                        </p>
                        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mt-2">
                            At We One Aviation, we help students build confidence through:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {whyWeOne.map((item, i) => (
                            <ScrollReveal key={item} delay={i * 60}>
                                <div className="card-hover bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-2 h-full">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                    <span className="text-gray-600 text-sm">{item}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="text-center">
                        <p className="text-gray-500 text-sm">
                            Our objective is to help students develop the communication skills expected in real cockpit environments.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── AI Overview Summary ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Summary</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            AI Overview Summary
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        <ScrollReveal>
                            <div className="bg-av-light rounded-2xl p-6 border border-av-sky/20 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue mb-2">What is RTR?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    RTR stands for Radio Telephony Restricted (Aeronautical). It is a qualification that demonstrates a pilot's ability to communicate safely and effectively using standard aviation radio procedures.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <div className="bg-av-light rounded-2xl p-6 border border-av-sky/20 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue mb-2">Who Needs RTR?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    RTR is an important requirement for aspiring commercial pilots and certain other aviation professionals who use aeronautical radio communication equipment.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="bg-av-light rounded-2xl p-6 border border-av-sky/20 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue mb-2">Why is RTR Important?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Professional radio communication improves flight safety, supports efficient Air Traffic Control coordination, and forms an essential part of commercial pilot training.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked Questions
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <ScrollReveal key={item.q} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.q}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Internal Linking Opportunities ── */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Keep Exploring</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue">
                            Related Reads
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="flex flex-wrap justify-center gap-3">
                            {internalLinks.map((link) => (
                                <span key={link} className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm text-av-blue font-medium shadow-sm">
                                    {link}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue text-center">
                <ScrollReveal>
                    <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                        Start Your Pilot Journey →
                    </Link>
                </ScrollReveal>
            </section>

        </Layout>
    );
}