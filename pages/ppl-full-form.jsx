import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const pplAtGlance = [
    { feature: 'Full Form', details: 'Private Pilot Licence' },
    { feature: 'Issued By', details: 'Directorate General of Civil Aviation (DGCA)' },
    { feature: 'Purpose', details: 'Personal & Recreational Flying' },
    { feature: 'Commercial Flying', details: 'Not Allowed' },
    { feature: 'Flight Training', details: 'Required' },
    { feature: 'Medical Examination', details: 'Required' },
    { feature: 'Ground Classes', details: 'Required' },
    { feature: 'Next Career Step', details: 'Commercial Pilot Licence (CPL)' },
];

const pplHelpsYou = [
    'Learn safe aircraft operation.',
    'Understand aviation regulations.',
    'Develop strong decision-making skills.',
    'Build confidence during flight.',
    'Gain practical flying experience.',
    'Understand navigation and weather interpretation.',
    'Prepare for advanced pilot licences.',
    'Experience real-world aviation procedures.',
];

const whoShouldApply = [
    'Learn to fly aircraft for personal use.',
    'Explore aviation as a career.',
    'Build flying experience before pursuing a Commercial Pilot Licence.',
    'Fly recreationally.',
    'Join flying clubs.',
    'Understand aviation professionally.',
    'Develop advanced aviation skills.',
];

const eligibilitySections = [
    { title: 'Educational Qualification', desc: 'Candidates should meet the educational criteria prescribed by DGCA and the chosen flying training organization.' },
    { title: 'Medical Fitness', desc: 'Students must complete the required aviation medical examination to ensure they are physically fit for flying.' },
    { title: 'English Proficiency', desc: 'Pilots should be able to read, write, understand, and communicate effectively in English, as it is the international language of aviation.' },
    { title: 'Age Requirement', desc: 'Candidates should satisfy the minimum age requirement specified by DGCA for the issue of a Private Pilot Licence.' },
];

const skillsYouLearn = [
    { title: 'Flight Planning', desc: 'Students learn how to prepare a flight by analyzing routes, weather, fuel requirements, aircraft performance, and operational limitations.' },
    { title: 'Air Navigation', desc: 'Navigation training teaches pilots how to determine aircraft position, follow planned routes, interpret aeronautical charts, and navigate safely under different conditions.' },
    { title: 'Aviation Meteorology', desc: 'Understanding weather is essential for safe flying. Students learn to interpret forecasts, identify weather hazards, and make informed operational decisions.' },
    { title: 'Aircraft Systems', desc: 'Pilots develop an understanding of aircraft engines, fuel systems, electrical systems, flight controls, and other essential components.' },
    { title: 'Radio Communication', desc: 'Students learn standard aviation phraseology and communication procedures used when interacting with Air Traffic Control.' },
    { title: 'Decision Making', desc: 'Safe pilots continuously assess risks and make informed decisions before and during flight.' },
];

const groundSchoolSubjects = [
    'Air Regulations',
    'Air Navigation',
    'Aviation Meteorology',
    'Aircraft Technical Knowledge',
    'Flight Planning',
    'Human Performance',
    'Aviation Safety',
    'Radio Telephony Basics',
    'Aircraft Performance',
    'Operational Procedures',
];

const flightTrainingActivities = [
    'Aircraft inspection',
    'Taxiing',
    'Straight and level flight',
    'Climbs',
    'Descents',
    'Medium turns',
    'Steep turns',
    'Stalls and recovery',
    'Take-offs',
    'Landings',
    'Circuit practice',
    'Navigation flights',
    'Solo flying',
    'Emergency procedures',
];

const whatCanYouDo = [
    'Fly aircraft for personal travel.',
    'Carry passengers without receiving payment for pilot services.',
    'Fly recreationally.',
    'Participate in flying clubs.',
    'Build flying experience.',
    'Continue training toward advanced pilot licences.',
];

const pplVsCpl = [
    { feature: 'Purpose', ppl: 'Personal Flying', cpl: 'Professional Flying' },
    { feature: 'Paid Flying', ppl: 'Not Allowed', cpl: 'Allowed (subject to licensing and employment)' },
    { feature: 'Airline Career', ppl: 'No', cpl: 'Yes' },
    { feature: 'Flight Training', ppl: 'Basic', cpl: 'Advanced' },
    { feature: 'Career Opportunities', ppl: 'Recreational Aviation', cpl: 'Airlines, Charter, Cargo, Corporate Aviation' },
    { feature: 'Licence Level', ppl: 'Entry-Level', cpl: 'Professional' },
];

const internalLinks = [
    { label: 'Commercial Pilot Licence (CPL)', href: '/commercial-pilot-license' },
    { label: 'DGCA Full Form', href: '/dgca-full-form' },
    { label: 'DGCA Ground Classes', href: '/dgca-ground-classes' },
    { label: 'How to Become a Pilot After 12th', href: '/how-to-become-a-pilot-after-12th' },
    { label: 'Pilot Training in India', href: '/pilot-training-in-india' },
    { label: 'CPL Eligibility', href: '/cpl-eligibility' },
    { label: 'CPL Syllabus', href: '/cpl-syllabus' },
    { label: 'ATPL Full Form', href: '/atpl-full-form' },
    { label: 'RTR Full Form', href: '/rtr-full-form' },
];

const pplSteps = [
    {
        step: '1',
        icon: '✅',
        title: 'Check Your Eligibility',
        desc: 'Before starting training, ensure you meet the eligibility requirements set by the Directorate General of Civil Aviation (DGCA). You should also choose a reputable flying training organization that provides quality instruction and follows DGCA standards.',
    },
    {
        step: '2',
        icon: '🩺',
        title: 'Complete the Required Medical Examination',
        desc: 'Medical fitness is an important part of pilot training. Candidates must undergo the required aviation medical examination to confirm they are physically and mentally fit to operate an aircraft safely.',
        listIntro: 'Medical assessments typically evaluate:',
        list: ['Vision', 'Hearing', 'Cardiovascular health', 'General physical fitness', 'Overall medical suitability for flying'],
    },
    {
        step: '3',
        icon: '📖',
        title: 'Enroll in Ground School',
        desc: 'Ground school provides the theoretical knowledge every pilot needs before and during flight training.',
        listIntro: 'Students study topics such as:',
        list: ['Air Regulations', 'Air Navigation', 'Aviation Meteorology', 'Aircraft Technical Knowledge', 'Flight Planning', 'Human Performance', 'Aviation Safety', 'Radio Communication'],
        closing: 'A strong understanding of these subjects supports both flight training and licensing examinations.',
    },
    {
        step: '4',
        icon: '🛩️',
        title: 'Begin Flight Training',
        desc: 'Practical flight instruction starts with basic aircraft familiarization and gradually progresses to more advanced flying exercises.',
        listIntro: 'Training generally includes:',
        list: ['Aircraft pre-flight inspection', 'Taxiing procedures', 'Take-off and landing', 'Straight and level flight', 'Climbs and descents', 'Turning techniques', 'Stall recognition and recovery', 'Navigation exercises', 'Solo flying', 'Emergency procedures'],
        closing: 'Each lesson builds confidence while reinforcing safe flying practices.',
    },
    {
        step: '5',
        icon: '📝',
        title: 'Pass the Required Tests',
        desc: 'Before a licence is issued, students must successfully complete the required theoretical, practical, and skill assessments as prescribed by the applicable aviation authority.',
    },
    {
        step: '6',
        icon: '🏆',
        title: 'Receive Your Private Pilot Licence',
        desc: 'After meeting all training, examination, and regulatory requirements, eligible candidates can receive their Private Pilot Licence, allowing them to fly aircraft within the privileges of the licence.',
    },
];

const pplBenefits = [
    { title: 'Learn to Fly Safely', desc: 'PPL training develops the knowledge, discipline, and practical skills required for safe aircraft operation.' },
    { title: 'Experience the Freedom of Flying', desc: 'A PPL allows you to fly for personal travel and recreational purposes while enjoying greater flexibility than commercial transportation.' },
    { title: 'Build a Strong Aviation Foundation', desc: 'Students gain a solid understanding of navigation, weather, aircraft systems, communication procedures, and aviation regulations.' },
    { title: 'Prepare for Advanced Pilot Training', desc: 'Many pilots use a PPL as a stepping stone toward a Commercial Pilot Licence (CPL) or additional aviation ratings.' },
];

const lifeSkills = ['Leadership', 'Decision-making', 'Situational awareness', 'Communication', 'Time management', 'Confidence', 'Responsibility'];

const pplLimitations = [
    'Work as a commercial airline pilot.',
    'Receive payment for flying passengers or cargo.',
    'Conduct commercial aviation operations.',
    'Operate flights requiring professional pilot certification.',
];

const licenceComparison = [
    { licence: 'SPL (Student Pilot Licence)', purpose: 'Entry-level training', commercial: 'No', progression: 'First stage before practical training' },
    { licence: 'PPL (Private Pilot Licence)', purpose: 'Personal and recreational flying', commercial: 'No', progression: 'Builds foundational flying experience' },
    { licence: 'CPL (Commercial Pilot Licence)', purpose: 'Professional flying', commercial: 'Yes', progression: 'Required for most commercial pilot jobs' },
    { licence: 'ATPL (Airline Transport Pilot Licence)', purpose: 'Advanced airline operations', commercial: 'Yes', progression: 'Highest level of pilot licence for airline captains' },
];

const commonMistakes = [
    { title: 'Choosing a Flying School Based Only on Cost', desc: 'Training quality, instructor experience, aircraft availability, and student support are just as important as fees.' },
    { title: 'Ignoring Medical Requirements', desc: 'Completing your aviation medical assessment early helps identify any issues before investing significant time and money in training.' },
    { title: 'Underestimating Ground School', desc: 'Strong theoretical knowledge improves both flight safety and practical performance.' },
    { title: 'Inconsistent Practice', desc: 'Regular study and flying help reinforce learning and build confidence more effectively than long gaps between sessions.' },
];

const whyWeOne = [
    'Professional career counselling',
    'DGCA Ground Classes',
    'Experienced aviation faculty',
    'Updated study materials',
    'Personalized mentoring',
    'Mock tests and academic support',
    'Guidance for pilot training pathways',
    'Admission assistance',
    'Ongoing support from training to career planning',
];

const quickAnswers = [
    {
        q: 'Can a PPL Holder Carry Passengers?',
        a: 'Yes. A Private Pilot Licence generally allows pilots to carry passengers on private flights, provided all applicable aviation regulations and licence privileges are followed. However, a PPL does not permit charging passengers for pilot services or operating commercial flights.',
    },
    {
        q: 'Can You Become an Airline Pilot with Only a PPL?',
        a: 'No. A Private Pilot Licence provides valuable flying experience but is not sufficient for a professional airline career. To become an airline pilot in India, aspiring pilots generally progress toward a Commercial Pilot Licence (CPL) and later gain additional qualifications and experience required by airlines.',
    },
    {
        q: 'Is a PPL Worth It?',
        a: 'For many aviation enthusiasts, earning a Private Pilot Licence is a lifelong dream. It offers the opportunity to experience flight independently while developing strong aviation knowledge and practical flying skills. If your long-term goal is to become a commercial pilot, a PPL can provide valuable exposure to aviation and help you build confidence before advancing to professional training. Depending on your career objectives, some training pathways may also allow students to progress directly toward a CPL.',
    },
    {
        q: 'What is PPL?',
        a: 'A Private Pilot Licence (PPL) is a licence that allows individuals to fly aircraft for private and recreational purposes. It requires ground training, flight training, medical fitness, and successful completion of applicable licensing requirements.',
    },
    {
        q: 'Can You Earn Money with a PPL?',
        a: 'No. A Private Pilot Licence does not authorize commercial flying or paid pilot services. Professional pilots must obtain a Commercial Pilot Licence (CPL) and meet additional regulatory requirements.',
    },
    {
        q: 'Is PPL the First Step to Becoming a Commercial Pilot?',
        a: 'For many aspiring pilots, yes. A PPL provides foundational flying knowledge and experience, although some students choose integrated training pathways leading directly to a CPL.',
    },
];

const faqs = [
    { q: 'What is the full form of PPL?', a: 'PPL stands for Private Pilot Licence (Private Pilot License). It allows individuals to fly aircraft for private and recreational purposes.' },
    { q: 'What is the difference between a PPL and a CPL?', a: 'A PPL is intended for non-commercial flying, while a CPL qualifies pilots for professional flying careers, subject to meeting licensing and employer requirements.' },
    { q: 'Can I become an airline pilot after getting a PPL?', a: 'A PPL alone is not enough. Aspiring airline pilots must continue their training and obtain a Commercial Pilot Licence (CPL), along with any additional qualifications required for airline employment.' },
    { q: 'Is a medical examination required for a PPL?', a: 'Yes. Pilots must meet the applicable aviation medical standards before a licence can be issued.' },
    { q: 'Is a Private Pilot Licence recognized internationally?', a: "A PPL is generally recognized within the framework of aviation regulations, but the ability to fly in another country depends on that country's licensing rules and any applicable validation or conversion requirements." },
];

// ─── Small reusable bits ────────────────────────────────────────────────────

function BulletList({ items, dark = false }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className={`flex items-start gap-2 text-sm ${dark ? 'text-white/80' : 'text-gray-600'}`}>
                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PPLPage() {
    return (
        <Layout
            title="PPL Full Form: Everything You Need to Know About a Private Pilot Licence (PPL)"
            description="PPL stands for Private Pilot Licence (Private Pilot License). Learn what a PPL is, eligibility, skills, subjects, the step-by-step process, benefits, limitations, and PPL vs CPL vs ATPL."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    {/* <div className="section-tag">Full Form Guide</div> */}
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        PPL Full Form: Everything You Need to Know About a <span className="text-av-orange">Private Pilot Licence (PPL)</span>
                    </h1>
                </ScrollReveal>
            </div>

            {/* ── What is the Full Form of PPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            What is the Full Form of <span className="text-av-orange">PPL?</span>
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            PPL stands for Private Pilot Licence (Private Pilot License). It is an aviation licence that allows an individual to fly an aircraft for personal, recreational, and non-commercial purposes. In India, a Private Pilot Licence is issued by the Directorate General of Civil Aviation (DGCA) after a candidate completes the required ground training, flight training, medical examinations, and licensing requirements.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            A PPL is often the first step into aviation and provides the knowledge and flying experience needed before progressing to advanced licences such as the Commercial Pilot Licence (CPL) or Airline Transport Pilot Licence (ATPL).
                        </p>
                    </ScrollReveal>

                    {/* PPL at a Glance */}
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">PPL at a Glance</h3>
                        <div className="overflow-x-auto rounded-2xl shadow border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Feature</th>
                                        <th className="px-5 py-4 text-left">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pplAtGlance.map((row, i) => (
                                        <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.feature}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What is a PPL ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            What is a <span className="text-av-orange">Private Pilot Licence (PPL)?</span>
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 space-y-4">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                A Private Pilot Licence (PPL) is an internationally recognized pilot qualification that allows an individual to legally operate an aircraft for private use. Unlike a Commercial Pilot Licence, a PPL does not authorize pilots to receive payment for flying passengers or cargo.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                The licence demonstrates that a pilot has acquired the essential theoretical knowledge, practical flying skills, and safety awareness required to operate an aircraft responsibly.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                During PPL training, students develop a strong foundation in aviation by learning how aircraft systems work, how to interpret weather conditions, navigate safely, communicate with Air Traffic Control (ATC), and make informed decisions during flight.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                For many aviation enthusiasts, obtaining a PPL is a lifelong achievement. For aspiring airline pilots, it serves as an important stepping stone toward professional pilot training.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why is a PPL Important + Who Should Apply ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Why is a PPL Important?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Every professional pilot begins by mastering the fundamentals of aviation. A Private Pilot Licence introduces students to these essential concepts while helping them build confidence in real flying conditions.
                            </p>
                            <p className="text-gray-700 text-sm font-semibold mb-3">A PPL helps you:</p>
                            <div className="mb-4">
                                <BulletList items={pplHelpsYou} />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Rather than simply teaching students how to fly, a PPL develops the discipline, situational awareness, and responsibility expected of every pilot.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={150}>
                        <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-4">Who Should Apply for a PPL?</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                A Private Pilot Licence is suitable for individuals who want to:
                            </p>
                            <div className="mb-4">
                                <BulletList items={whoShouldApply} dark />
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Whether your dream is to become an airline captain or simply enjoy the freedom of flying, a PPL provides the essential first step.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        {/* <div className="section-tag">Eligibility</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Eligibility for a <span className="text-av-orange">Private Pilot Licence</span>
                        </h2>
                        <p className="text-white/70 mt-3 text-sm max-w-2xl mx-auto">
                            To begin PPL training in India, candidates should generally meet the applicable DGCA requirements. Typical eligibility includes:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eligibilitySections.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <h4 className="font-montserrat font-bold text-av-orange mb-3 text-sm">{item.title}</h4>
                                    <p className="text-white/80 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-white/60 text-xs max-w-2xl mx-auto">
                            As regulations may change, applicants should always verify the latest requirements before beginning training.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Skills You Learn ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        {/* <div className="section-tag">Skills</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Skills You Learn During <span className="text-av-orange">PPL Training</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm max-w-2xl mx-auto">
                            Flying an aircraft requires much more than controlling the flight controls. Throughout PPL training, students develop technical knowledge, practical abilities, and professional habits that contribute to safe aviation operations.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillsYouLearn.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full card-hover hover:border-av-orange/30">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                            PPL training helps students strengthen critical thinking and situational awareness in changing flight conditions.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Ground School Subjects + Flight Training Activities ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <ScrollReveal>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">What Subjects Are Covered in PPL Ground School?</h3>
                            <p className="text-gray-500 text-xs mb-4">Ground school provides the theoretical knowledge that supports practical flight training. Students generally study:</p>
                            <BulletList items={groundSchoolSubjects} />
                            <p className="text-gray-500 text-xs leading-relaxed mt-4">
                                A strong understanding of these subjects improves both examination performance and real-world flying skills.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={150}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-full">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">What Happens During Flight Training?</h3>
                            <p className="text-gray-500 text-xs mb-4">
                                After completing the initial ground training, students begin practical flight instruction under the supervision of qualified flight instructors. Training generally includes:
                            </p>
                            <BulletList items={flightTrainingActivities} />
                            <p className="text-gray-500 text-xs leading-relaxed mt-4">
                                Each lesson builds confidence while reinforcing safe operating practices.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── What Can You Do With a PPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 text-center">
                            What Can You Do With a <span className="text-av-orange">Private Pilot Licence?</span>
                        </h2>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-8">
                            A Private Pilot Licence offers several privileges within the limits of applicable aviation regulations. PPL holders may:
                        </p>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                            <BulletList items={whatCanYouDo} />
                            <p className="text-gray-500 text-sm leading-relaxed mt-4">
                                However, a PPL does not permit commercial operations or employment as a professional pilot.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── PPL vs CPL ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        {/* <div className="section-tag">Comparison</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL vs CPL: What&apos;s the <span className="text-av-orange">Difference?</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Many aspiring pilots are unsure whether they should pursue a PPL or go directly toward a Commercial Pilot Licence.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Feature</th>
                                        <th className="px-5 py-4 text-left">PPL</th>
                                        <th className="px-5 py-4 text-left">CPL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pplVsCpl.map((row, i) => (
                                        <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.feature}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.ppl}</td>
                                            <td className="px-5 py-3 text-av-orange font-medium">{row.cpl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-gray-600 text-sm max-w-3xl mx-auto">
                            If your goal is to become an airline pilot, a Commercial Pilot Licence is ultimately required. A PPL can provide valuable foundational experience, although some students choose integrated CPL training pathways depending on their career goals.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Expert Insight ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8 md:p-10 text-white">
                            {/* <div className="section-tag">Expert Insight</div> */}
                            <h3 className="font-montserrat font-bold text-white text-xl md:text-2xl mb-4">Is a PPL Worth It?</h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-4">
                                For students who genuinely enjoy flying, a Private Pilot Licence is much more than a certificate—it is an opportunity to develop disciplined flying habits, understand aviation principles, and experience aircraft operations firsthand.
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                At We One Aviation, we encourage students to define their long-term aviation goals before selecting a training pathway. Those aiming for a professional airline career should understand how a PPL fits into the broader journey toward obtaining a Commercial Pilot Licence, while recreational flyers can benefit from the flexibility and enjoyment that a PPL offers.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Internal Linking Opportunities ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2 text-center">Related Reading</h3>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-8">
                            To strengthen topical authority and improve user navigation, naturally link this page to:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {internalLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="bg-white border border-gray-200 text-av-blue text-xs font-semibold px-4 py-2 rounded-full hover:bg-av-blue hover:text-white transition-all"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Step-by-Step Process ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        {/* <div className="section-tag">The Process</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Step-by-Step Process to Get a <span className="text-av-orange">Private Pilot Licence (PPL)</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm max-w-3xl mx-auto">
                            Obtaining a Private Pilot Licence (PPL) is a structured process that combines aviation theory, practical flight training, and regulatory compliance. Each stage helps aspiring pilots build the knowledge and skills needed to fly safely and confidently.
                        </p>
                    </ScrollReveal>

                    <div className="space-y-6 mt-12">
                        {pplSteps.map((s) => (
                            <ScrollReveal key={s.step}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                    <div className="flex md:flex-col items-center md:items-center gap-3 md:w-24 flex-shrink-0">
                                        <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg">{s.step}</div>
                                        <div className="text-3xl">{s.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-montserrat font-bold text-av-blue text-lg mb-2">Step {s.step}: {s.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{s.desc}</p>
                                        {s.list && (
                                            <>
                                                <p className="text-gray-700 text-sm font-semibold mb-2">{s.listIntro}</p>
                                                <div className="mb-3">
                                                    <BulletList items={s.list} />
                                                </div>
                                            </>
                                        )}
                                        {s.closing && (
                                            <p className="text-gray-500 text-sm leading-relaxed">{s.closing}</p>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        {/* <div className="section-tag">Benefits</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            What Are the Benefits of a <span className="text-av-orange">PPL?</span>
                        </h2>
                        <p className="text-white/70 mt-3 text-sm max-w-2xl mx-auto">
                            A Private Pilot Licence offers several advantages for aviation enthusiasts and aspiring professionals.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pplBenefits.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <h4 className="font-montserrat font-bold text-av-orange mb-3 text-sm">{item.title}</h4>
                                    <p className="text-white/80 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={400} className="mt-6">
                        <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
                            <h4 className="font-montserrat font-bold text-av-orange mb-3 text-sm">Develop Valuable Life Skills</h4>
                            <p className="text-white/70 text-xs mb-3">Pilot training improves:</p>
                            <BulletList items={lifeSkills} dark />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-white/60 text-sm max-w-2xl mx-auto">
                            These skills are valuable both inside and outside aviation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Limitations ── */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 text-center">
                            Limitations of a <span className="text-av-orange">Private Pilot Licence</span>
                        </h2>
                        <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-8">
                            Understanding what a PPL does not allow is just as important as understanding its privileges.
                        </p>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                            <p className="text-gray-700 text-sm font-semibold mb-3">With a PPL, you generally cannot:</p>
                            <BulletList items={pplLimitations} />
                            <p className="text-gray-500 text-sm leading-relaxed mt-4">
                                Pilots who wish to pursue aviation as a profession typically continue toward obtaining a Commercial Pilot Licence (CPL).
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── PPL vs SPL vs CPL vs ATPL ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        {/* <div className="section-tag">Licence Levels</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL vs SPL vs CPL vs <span className="text-av-orange">ATPL</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Understanding the different pilot licences helps aspiring aviators choose the right training pathway.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Licence</th>
                                        <th className="px-5 py-4 text-left">Purpose</th>
                                        <th className="px-5 py-4 text-left">Commercial Flying</th>
                                        <th className="px-5 py-4 text-left">Typical Progression</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {licenceComparison.map((row, i) => (
                                        <tr key={row.licence} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.licence}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.purpose}</td>
                                            <td className="px-5 py-3 text-av-orange font-medium">{row.commercial}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.progression}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                            Each licence represents a different stage of professional development within aviation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Quick Answers ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        {/* <div className="section-tag">Quick Answers</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            More About the <span className="text-av-orange">Private Pilot Licence</span>
                        </h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        {quickAnswers.map((item, i) => (
                            <ScrollReveal key={item.q} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.q}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Common Mistakes ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        {/* <div className="section-tag">Avoid These</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Common Mistakes Students Should <span className="text-av-orange">Avoid</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Starting pilot training is exciting, but avoiding common mistakes can make the journey smoother.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {commonMistakes.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full card-hover hover:border-av-orange/30">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Choose We One Aviation ── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        {/* <div className="section-tag">Why Us</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Choose <span className="text-av-orange">We One Aviation?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm max-w-2xl mx-auto">
                            Choosing the right aviation academy is one of the most important decisions in your pilot journey. At We One Aviation, we support aspiring pilots through every stage of their aviation education by providing:
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8">
                            <div className="grid sm:grid-cols-2 gap-3">
                                {whyWeOne.map((item) => (
                                    <div key={item} className="flex items-start gap-2 text-white/80 text-sm">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                            Our goal is to help students build the knowledge, confidence, and discipline required for long-term success in aviation.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        {/* <div className="section-tag">FAQ</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 50}>
                                <details className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer">
                                    <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                                        {i + 1}. {faq.q}
                                        <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        {/* <div className="section-tag">Start Your Journey</div> */}
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Your <span className="text-av-orange">Private Pilot Licence?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            Join We One Aviation — support at every stage of your aviation education, from DGCA ground classes to flight training guidance and career planning.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Free Counselling →
                            </Link>
                            <Link href="/commercial-pilot-license" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Explore CPL Course
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}