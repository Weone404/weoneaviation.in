import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const pplMainTable = [
    { stands: 'Private Pilot License', category: 'Aviation', meaning: 'A license that allows individuals to fly an aircraft privately (non-commercially).' },
    { stands: 'People', category: 'Internet Slang / Chat', meaning: 'Informal abbreviation used in texting, chat, and social media.' },
    { stands: 'Public Performance License', category: 'Music / Media Law', meaning: 'A license allowing businesses to play copyrighted music publicly.' },
    { stands: 'Pay Per Lead', category: 'Digital Marketing / Advertising', meaning: 'A pricing model where payment is made based on leads generated.' },
    { stands: 'Punjab Power Corporation Limited', category: 'Government / Utility', meaning: 'A former state electricity board in Punjab, India.' },
    { stands: 'PPL Corporation', category: 'Corporate / Energy', meaning: 'A major utility holding company based in the U.S. (New York Stock Exchange: PPL).' },
    { stands: 'Phonographic Performance Limited', category: 'Music Licensing (India)', meaning: 'An Indian music licensing company managing performance rights.' },
    { stands: "People's Progress Party (PPL)", category: 'Politics (Papua New Guinea)', meaning: 'A political party in Papua New Guinea.' },
    { stands: 'Pale-Pale Lichenin (PPL)', category: 'Biochemistry / Science', meaning: 'An enzyme used in scientific research.' },
    { stands: 'Persons Per Litre', category: 'Environmental Science', meaning: 'A unit sometimes used in water quality or air testing.' },
    { stands: 'Proprietary Product Listing', category: 'Business / Retail', meaning: 'A product list maintained for in-house/private label products.' },
    { stands: 'Parallel Programming Library', category: 'Computer Science / Software', meaning: 'A software library used for parallel processing.' },
];

const pplOtherTable = [
    { form: 'Power Plant Limited', context: 'Energy / Industrial Sector' },
    { form: 'Perfectly Proper Language', context: 'Linguistics / AI Language Models' },
    { form: 'Personalized Program Learning', context: 'Education / E-learning' },
    { form: 'Physical Properties Laboratory', context: 'Research / Science Labs' },
    { form: "People's Power League", context: 'Historical / Political Movements' },
    { form: 'Prepaid Lease', context: 'Finance / Real Estate' },
];

const pplEligibility = [
    { criteria: 'Age', details: 'Minimum 17 years' },
    { criteria: 'Education', details: '10+2 with Physics & Mathematics' },
    { criteria: 'Medical Fitness', details: 'Class 2 Medical Certificate (DGCA approved)' },
    { criteria: 'Nationality', details: 'Indian or foreign nationals (as per DGCA rules)' },
];

const pplSubjects = [
    'Air Regulations',
    'Aviation Meteorology',
    'Air Navigation',
    'Aircraft General and Technical Knowledge',
    'Radio Telephony',
];

const pplCost = [
    { type: 'Ground Classes', cost: '₹60,000 – ₹1,00,000' },
    { type: 'Flying Training (40-50 hrs)', cost: '₹7,00,000 – ₹9,00,000' },
    { type: 'Medical & Exam Fees', cost: '₹20,000 – ₹40,000' },
    { type: 'Total Cost', cost: '₹7.5 – ₹10 Lakhs' },
];

const pplDuration = [
    { type: 'Full-time (Regular)', duration: '6 to 12 months' },
    { type: 'Part-time (Weekend)', duration: '8 to 18 months' },
];

const pplCareerScope = [
    'Fly for personal or leisure purposes',
    'Build flying hours for CPL (Commercial Pilot License)',
    'Pursue aviation as a hobby or sport',
    'Join aviation clubs and flying groups',
    'Fly family/friends in non-commercial aircraft',
];

const musicPPLTable = [
    { country: 'India', org: 'PPL India (Phonographic Performance Limited India)', purpose: 'Manages public performance rights of record labels' },
    { country: 'UK', org: 'PPL UK (Phonographic Performance Ltd UK)', purpose: 'Collects royalties for performers and record companies' },
];

const whyImportant = [
    {
        icon: '✈️',
        field: 'In Aviation (Private Pilot License)',
        points: [
            'It lets you fly a small plane legally.',
            "It's the first step to become a commercial pilot.",
            'Helps you learn how to fly safely.',
        ],
    },
    {
        icon: '🎵',
        field: 'In Music (Phonographic Performance Limited)',
        points: [
            'Protects music artists and pays them when their songs are used.',
            'Needed by shops, radio stations, and events to play music legally.',
        ],
    },
    {
        icon: '📚',
        field: 'In Education (Personalized/Project Learning)',
        points: [
            'Helps students learn in their own way.',
            'Encourages teamwork and problem-solving.',
            'Makes learning more fun and practical.',
        ],
    },
    {
        icon: '🧪',
        field: 'In Chemistry (Phenylpropanolamine)',
        points: [
            'A chemical once used in cold medicine.',
            'Still studied in science for learning about compounds.',
        ],
    },
    {
        icon: '💬',
        field: 'In Chat (People)',
        points: [
            '"PPL" is short for "people" in texting.',
            'Makes chatting faster and easier.',
        ],
    },
    {
        icon: '🏢',
        field: 'In Business (PPL Corporation)',
        points: [
            'A big company that supplies electricity in the USA.',
            'Important for homes, offices, and factories.',
        ],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PPLPage() {
    return (
        <Layout
            title="PPL Full Form – What is PPL in Aviation, Chat, Business and More – 2025?"
            description="PPL Full Form means different things in every field. In Aviation PPL stands for Private Pilot License. Know all PPL full forms in Chat, Music, Marketing, Chemistry, Education, Business and more."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="section-tag">Full Form Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        PPL Full Form – What is PPL in Aviation, Chat, Business and More?
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">2025 Complete Guide</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        PPL Meaning Different in Every Field. So If You Land On This Page Then Here You Will Get Knowledge of all PPL Full Form. The full form of PPL in Aviation is <strong className="text-white">Private Pilot License</strong>. There is More Different field Like Marketing, Internet Slang, Music, Government Sector Have Different Full Form of PPL. So Just Relax, And Know All The Full Form of PPL.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── What is The Full Form of PPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">All Full Forms</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is The Full Form of <span className="text-av-orange">PPL?</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Lets Breakdown and The Full Form of Every PPL.</p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-4 py-3 text-left">PPL Stands For</th>
                                        <th className="px-4 py-3 text-left">Category / Field</th>
                                        <th className="px-4 py-3 text-left">Meaning / Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pplMainTable.map((row, i) => (
                                        <tr key={row.stands} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 font-semibold text-av-blue">{row.stands}</td>
                                            <td className="px-4 py-3 text-av-orange font-medium">{row.category}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.meaning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Other Different Full Forms ── */}
            <section className="py-10 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">More Full Forms</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Other Different Full Form of <span className="text-av-orange">PPL?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            There is More Full Form Of PPL Thats Use Less But its Necessary To Know if Your Moto is To Knowing About All PPL Full Form.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow max-w-2xl mx-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-4 py-3 text-left">PPL Full Form</th>
                                        <th className="px-4 py-3 text-left">Context</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pplOtherTable.map((row, i) => (
                                        <tr key={row.form} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 font-semibold text-av-blue">{row.form}</td>
                                            <td className="px-4 py-3 text-gray-600">{row.context}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Section Header ── */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Detailed Explanations</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL Full Form in Different Fields <span className="text-av-orange">in Details</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Here is All PPL Full Form Meaning in Details and You Will Get To Know About PPL Full Form. Lets Start And Explore All Full Form of PPL.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── 1. Aviation – Private Pilot License ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">1) Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            PPL Full Form in Aviation – <span className="text-av-orange">Private Pilot License Explained</span>
                        </h2>
                        <p className="text-white/70 mt-3 max-w-3xl text-sm leading-relaxed">
                            If you are dreaming of flying high and becoming a pilot, you've probably come across the term PPL. In the aviation world, <strong className="text-white">PPL stands for Private Pilot License</strong>. It is the first and foundational step toward a professional flying career or even just pursuing flying as a hobby.
                        </p>
                        <p className="text-white/60 mt-2 text-sm">In this article, we'll explore the meaning, eligibility, requirements, course duration, cost, and career scope of PPL in detail.</p>
                    </ScrollReveal>

                    {/* What is PPL */}
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">What is PPL in Aviation?</h3>
                                <p className="text-av-orange font-semibold text-sm mb-3">PPL Full Form = Private Pilot License</p>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    A Private Pilot License (PPL) is an internationally recognized certificate that allows the holder to fly an aircraft privately (not for commercial purposes). It is issued by the country's aviation regulatory authority, such as:
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        'DGCA (India) – Directorate General of Civil Aviation',
                                        'FAA (USA) – Federal Aviation Administration',
                                        'EASA (Europe) – European Union Aviation Safety Agency',
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-white/60 text-xs mt-4">The license enables individuals to fly single-engine aircraft for personal or recreational purposes, with or without passengers.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="space-y-5">
                                {/* Subjects */}
                                <div className="glass rounded-2xl p-6">
                                    <h4 className="font-montserrat font-bold text-white mb-3">Subjects of PPL (Private Pilot License)</h4>
                                    <ul className="space-y-2">
                                        {pplSubjects.map(s => (
                                            <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Flying Training Requirements */}
                                <div className="glass rounded-2xl p-6">
                                    <h4 className="font-montserrat font-bold text-white mb-3">PPL Flying Training Requirements:</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'Total Flight Hours: Minimum 40 to 50 hours',
                                            '20 hours of dual flying (with instructor)',
                                            '10 hours of solo flying',
                                            '5 hours of cross-country flying',
                                            'Conducted on single-engine aircraft like Cessna 152 or 172',
                                        ].map(item => (
                                            <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Eligibility, Cost, Duration, Career */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Eligibility */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Eligibility Criteria for PPL in India</h4>
                                <p className="text-white/60 text-xs mb-3">To apply for a PPL in India under DGCA, you must meet the following requirements:</p>
                                <div className="space-y-3">
                                    {pplEligibility.map(row => (
                                        <div key={row.criteria} className="bg-white/10 rounded-lg p-3">
                                            <p className="text-av-orange font-semibold text-xs">{row.criteria}</p>
                                            <p className="text-white/80 text-xs mt-0.5">{row.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Cost */}
                        <ScrollReveal delay={100}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Cost of PPL Training in India</h4>
                                <div className="space-y-3">
                                    {pplCost.map((row, i) => (
                                        <div key={row.type} className={`rounded-lg p-3 ${i === pplCost.length - 1 ? 'bg-av-orange/30 border border-av-orange/50' : 'bg-white/10'}`}>
                                            <p className={`font-semibold text-xs ${i === pplCost.length - 1 ? 'text-av-orange' : 'text-white/70'}`}>{row.type}</p>
                                            <p className="text-white font-bold text-sm mt-0.5">{row.cost}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Duration */}
                        <ScrollReveal delay={200}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">PPL Course Duration &amp; Schedule</h4>
                                <div className="space-y-3 mb-4">
                                    {pplDuration.map(row => (
                                        <div key={row.type} className="bg-white/10 rounded-lg p-3">
                                            <p className="text-av-orange font-semibold text-xs">{row.type}</p>
                                            <p className="text-white font-bold text-sm mt-0.5">{row.duration}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/50 text-xs">Duration may vary based on weather, student progress, and flying availability.</p>
                            </div>
                        </ScrollReveal>

                        {/* Career Scope */}
                        <ScrollReveal delay={300}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-3">Career Scope After PPL</h4>
                                <p className="text-white/60 text-xs mb-3">A PPL is not valid for commercial flying, but it opens doors to several opportunities:</p>
                                <ul className="space-y-2">
                                    {pplCareerScope.map(item => (
                                        <li key={item} className="flex items-start gap-2 text-white/80 text-xs">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── 2. Education ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">2) Education</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL Full Form in Education – <span className="text-av-orange">Personalized/Project-Based/Peer Program Learning</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl text-sm leading-relaxed">
                            In the field of education, PPL can have multiple meanings depending on the teaching methodology or context. Below are the most common and relevant full forms of PPL in education:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'PPL – Personalized Program Learning',
                                desc: 'Personalized Program Learning refers to an educational approach tailored to the individual needs, pace, interests, and learning styles of each student. It aims to provide flexible, student-centered learning experiences using technology, adaptive tools, and personal goal setting.',
                                features: ['Customized lesson plans', 'Self-paced learning', 'Individual progress tracking', 'Focus on strengths and weaknesses'],
                                usedIn: ['E-learning platforms', 'Modern schools and colleges', 'Learning apps and LMS (Learning Management Systems)'],
                            },
                            {
                                title: 'PPL – Project-Based Learning',
                                desc: 'In some institutions, PPL stands for Project-Based Learning, an approach where students gain knowledge by actively exploring real-world challenges and projects.',
                                features: ['Practical learning through projects', 'Enhances problem-solving and critical thinking', 'Often interdisciplinary', 'Encourages teamwork and innovation'],
                                usedIn: [],
                            },
                            {
                                title: 'PPL – Peer Program Learning',
                                desc: 'Peer Program Learning (or Peer-to-Peer Learning) is a collaborative educational model where students learn from and teach each other. It improves communication, leadership, and subject mastery.',
                                features: ['Peer teaching or tutoring', 'Student-led discussions', 'Collaborative learning environment'],
                                usedIn: [],
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <h3 className="font-montserrat font-bold text-av-blue mb-3">{item.title}</h3>
                                    <p className="text-av-orange font-semibold text-xs mb-2">Meaning:</p>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                                    <p className="text-av-blue font-semibold text-xs mb-2">Key Features:</p>
                                    <ul className="space-y-1 mb-3 flex-grow">
                                        {item.features.map(f => (
                                            <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {item.usedIn.length > 0 && (
                                        <>
                                            <p className="text-av-blue font-semibold text-xs mb-2">Used In:</p>
                                            <ul className="space-y-1">
                                                {item.usedIn.map(u => (
                                                    <li key={u} className="flex items-start gap-2 text-xs text-gray-500">
                                                        <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{u}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. Organic Chemistry ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">3) Organic Chemistry</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL Full Form in Organic Chemistry – <span className="text-av-orange">Phenylpropanolamine</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl text-sm leading-relaxed">
                            In organic chemistry, the full form of PPL often refers to <strong>Phenylpropanolamine</strong>, a synthetic organic compound with the chemical formula C9H13NO. It is also known by other names such as PPA and was commonly used in the pharmaceutical industry.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">PPL – Phenylpropanolamine</h3>
                                <p className="text-av-orange font-semibold text-sm mb-3">Chemical Information:</p>
                                <div className="space-y-3">
                                    {[
                                        { label: 'IUPAC Name', value: '(R)-1-Phenyl-2-propanolamine' },
                                        { label: 'Molecular Formula', value: 'C9H13NO' },
                                        { label: 'Molar Mass', value: '~151.21 g/mol' },
                                        { label: 'Structure', value: 'Contains a phenyl group attached to a propanolamine chain' },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-start gap-3 p-3 bg-av-light rounded-lg border border-av-sky/20">
                                            <span className="text-av-orange font-bold flex-shrink-0 text-sm">•</span>
                                            <p className="text-sm text-gray-600"><strong className="text-av-blue">{item.label}:</strong> {item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">Uses of PPL (Phenylpropanolamine)</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Decongestant', desc: 'Used to treat nasal congestion and cold symptoms. It works by narrowing blood vessels in the nasal passages.' },
                                        { title: 'Appetite Suppressant', desc: 'Formerly used in weight-loss medications. Suppresses appetite by acting on the central nervous system.' },
                                        { title: 'Sympathomimetic Agent', desc: 'Mimics the action of the sympathetic nervous system. Has effects similar to adrenaline (epinephrine).' },
                                    ].map(item => (
                                        <div key={item.title} className="bg-white/10 rounded-xl p-4">
                                            <p className="text-av-orange font-semibold text-sm mb-1">{item.title}:</p>
                                            <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── 4. Music / Media Law ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">4) Music / Media Law</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL Full Form in Music/Media Law – <span className="text-av-orange">Phonographic Performance Limited</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl text-sm leading-relaxed">
                            In the field of music and media law, PPL stands for <strong>Phonographic Performance Limited</strong>. It is a music licensing company that represents record companies and performers, managing the rights to play recorded music in public.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">What is PPL in Music/Media Law?</h3>
                                <p className="text-av-orange font-semibold text-sm mb-1">Full Form: PPL = Phonographic Performance Limited</p>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                    PPL is an organization that grants licenses for the public performance and broadcasting of sound recordings. It ensures that music producers, record labels, and artists are fairly paid whenever their music is played in:
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        'Public places (restaurants, gyms, shops, etc.)',
                                        'Radio and TV broadcasts',
                                        'Events and live performances',
                                        'Online platforms (streaming, video use)',
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">PPL in India vs UK</h3>
                                <div className="overflow-x-auto rounded-xl">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-white/10 text-white">
                                                <th className="px-3 py-3 text-left">Country</th>
                                                <th className="px-3 py-3 text-left">Organization Name</th>
                                                <th className="px-3 py-3 text-left">Purpose</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {musicPPLTable.map((row, i) => (
                                                <tr key={row.country} className={i % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}>
                                                    <td className="px-3 py-3 font-semibold text-av-orange">{row.country}</td>
                                                    <td className="px-3 py-3 text-white/80 text-xs">{row.org}</td>
                                                    <td className="px-3 py-3 text-white/70 text-xs">{row.purpose}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── 5–11. Remaining Fields ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">More Fields</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL in <span className="text-av-orange">Other Fields</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                num: '5',
                                icon: '⚡',
                                title: 'PPL in Business/Companies – Pennsylvania Power and Light (PPL Corporation)',
                                items: [
                                    { label: 'Full Form', value: 'Pennsylvania Power and Light' },
                                    { label: 'Meaning', value: 'A utility company in the USA that supplies electricity and energy services.' },
                                    { label: 'Use', value: 'Serves millions of homes and businesses with reliable power.' },
                                    { label: 'Ticker Symbol', value: 'PPL (NYSE)' },
                                ],
                            },
                            {
                                num: '6',
                                icon: '💬',
                                title: 'PPL in Chat/Internet Slang – People',
                                items: [
                                    { label: 'Full Form', value: 'People' },
                                    { label: 'Meaning', value: 'Common abbreviation used in texting, chatting, or social media.' },
                                    { label: 'Example', value: '"I love meeting new ppl at events."' },
                                ],
                            },
                            {
                                num: '7',
                                icon: '🏗️',
                                title: 'PPL in Construction/Engineering – Project Product List',
                                items: [
                                    { label: 'Full Form', value: 'Project Product List' },
                                    { label: 'Meaning', value: 'A document listing all products or materials required for a project.' },
                                    { label: 'Use', value: 'Used in construction, project management, and engineering documentation.' },
                                ],
                            },
                            {
                                num: '8',
                                icon: '⚖️',
                                title: 'PPL in Law – Public Performance License',
                                items: [
                                    { label: 'Full Form', value: 'Public Performance License' },
                                    { label: 'Meaning', value: 'A legal license allowing public performance of copyrighted content (especially music, films).' },
                                    { label: 'Use', value: 'Required by DJs, restaurants, event planners, etc.' },
                                ],
                            },
                            {
                                num: '9',
                                icon: '🩺',
                                title: 'PPL in Medicine – Purified Protein Derivative (Tuberculin PPL Test)',
                                items: [
                                    { label: 'Full Form', value: 'Purified Protein Derivative' },
                                    { label: 'Meaning', value: 'A medical test for detecting tuberculosis exposure.' },
                                    { label: 'Use', value: 'Injected under the skin (Mantoux test) and checked for reaction.' },
                                ],
                            },
                            {
                                num: '10',
                                icon: '🚀',
                                title: 'PPL in Space Tech – Pre-Programmed Launch',
                                items: [
                                    { label: 'Full Form', value: 'Pre-Programmed Launch' },
                                    { label: 'Meaning', value: 'A sequence used in automated systems for initiating space vehicle launches.' },
                                    { label: 'Use', value: 'Found in aerospace systems and space agency protocols.' },
                                ],
                            },
                            {
                                num: '11',
                                icon: '📄',
                                title: 'PPL in Documentation – Printed Pages Limit',
                                items: [
                                    { label: 'Full Form', value: 'Printed Pages Limit' },
                                    { label: 'Meaning', value: 'The maximum number of pages allowed in a printed or PDF document.' },
                                    { label: 'Use', value: 'Relevant in publishing, school assignments, and e-doc regulations.' },
                                ],
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={item.num} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{item.num}</div>
                                        <span className="text-2xl">{item.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-4 text-sm leading-snug">{item.title}</h3>
                                    <div className="space-y-2 flex-grow">
                                        {item.items.map(row => (
                                            <div key={row.label} className="flex items-start gap-2">
                                                <span className="text-av-orange font-bold text-xs flex-shrink-0 mt-0.5">•</span>
                                                <p className="text-xs text-gray-500"><strong className="text-av-blue">{row.label}:</strong> {row.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why is PPL Important ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Importance</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Why is PPL <span className="text-av-orange">Important?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {whyImportant.map((item, i) => (
                            <ScrollReveal key={item.field} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-white mb-3 text-sm">{item.field}</h3>
                                    <ul className="space-y-2">
                                        {item.points.map(p => (
                                            <li key={p} className="flex items-start gap-2 text-white/70 text-xs">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="text-white/80 text-sm leading-relaxed max-w-3xl mx-auto">
                                PPL is important in different fields because it helps people fly safely, use music legally, learn better, and protect rights. It has different meanings, but in every case, <strong className="text-av-orange">it plays an important role.</strong>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}