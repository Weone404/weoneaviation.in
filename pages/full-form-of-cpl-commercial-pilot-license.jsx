import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const cplQuickTable = [
    { industry: 'Aviation', fullForm: 'Commercial Pilot License' },
    { industry: 'Marketing', fullForm: 'Cost Per Lead' },
    { industry: 'Technology', fullForm: 'C Programming Language / Common Public License' },
    { industry: 'Law', fullForm: 'Criminal Procedure Law / Civil Procedure Law' },
    { industry: 'Sports', fullForm: 'Caribbean Premier League / Canadian Premier League' },
    { industry: 'Military', fullForm: 'Corporal' },
    { industry: 'Logistics', fullForm: 'Certified Professional Logistician' },
    { industry: 'Software', fullForm: 'Certified Professional Leader' },
    { industry: 'Payroll', fullForm: 'Certified Payroll Ledger' },
    { industry: 'Medical', fullForm: 'Cerebrospinal Protein Levels' },
    { industry: 'Laser Technology', fullForm: 'Continuous Path Laser' },
    { industry: 'Biology', fullForm: 'Chlorophyll Protein Ligand' },
];

const cplAviationKeyPoints = [
    'Required to work as a commercial pilot',
    'Approved by DGCA in India',
    'Requires ground training + flying hours',
    'Can lead to ATPL (Airline Transport Pilot License)',
];

const cplSteps = [
    { step: 'Step 1', desc: 'Apply For DGCA Computer Number From dgcapariksha Portal' },
    { step: 'Step 2', desc: 'Clear Your Class-1 and Class 2 Medical Test By DGCA Doctors' },
    { step: 'Step 3', desc: 'Join DGCA Ground Classes From We One Aviation Academy' },
    { step: 'Step 4', desc: 'Clear DGCA Exam of Six Subjects.' },
    { step: 'Step 5', desc: 'Complete Your 200 Hrs. Of Flying from Any Country.' },
    { step: 'Step 6', desc: 'Obtain your Commercial Pilot License (CPL).' },
];

const dgcaSubjects = [
    'Air Navigation',
    'Aviation Meteorology',
    'Air Regulations',
    'Technical General',
    'Technical Specific',
    'RTR (Aero) – Radio Telephony Restricted (Aeronautical)',
];

const cplAfterLicense = [
    'You can apply to commercial airlines as a First Officer (co-pilot).',
    'You can work for cargo companies, business jet operators, or charter services.',
    "You're also eligible to pursue ATPL (Airline Transport Pilot License) later, which is needed to become a Captain.",
];

const cplTeams = [
    'St Kitts and Nevis Patriots',
    'Jamaica Tallawahs',
    'Guyana Amazon Warriors',
    'Barbados Royals',
    'Trinidad and Tobago Knight Riders',
    'St Lucia Kings',
];

const cplChampions = [
    { year: '2013', team: 'Jamaica Tallawahs', opponent: 'defeated Guyana Amazon Warriors' },
    { year: '2014', team: 'Barbados Tridents', opponent: 'defeated Guyana Amazon Warriors' },
    { year: '2015', team: 'Trinbago Knight Riders', opponent: 'defeated Barbados Tridents' },
    { year: '2016', team: 'Jamaica Tallawahs', opponent: 'defeated Guyana Amazon Warriors' },
    { year: '2017', team: 'Trinbago Knight Riders', opponent: 'defeated St Kitts & Nevis Patriots' },
    { year: '2018', team: 'Trinbago Knight Riders', opponent: 'defeated Guyana Amazon Warriors' },
    { year: '2019', team: 'Barbados Tridents', opponent: 'defeated Guyana Amazon Warriors' },
    { year: '2020', team: 'Trinbago Knight Riders', opponent: 'defeated St Lucia Zouks' },
    { year: '2021', team: 'St Kitts & Nevis Patriots', opponent: 'defeated St Lucia Kings' },
    { year: '2022', team: 'Jamaica Tallawahs', opponent: 'defeated Barbados Royals' },
    { year: '2023', team: 'Guyana Amazon Warriors', opponent: 'defeated Trinbago Knight Riders' },
    { year: '2024', team: 'St Lucia Kings', opponent: 'defeated Guyana Amazon Warriors' },
];

const whyMattersTable = [
    { industry: 'Aviation', meaning: 'Commercial Pilot License', why: 'Required for flying aircraft professionally' },
    { industry: 'Marketing', meaning: 'Cost Per Lead', why: 'Tracks ad campaign cost efficiency' },
    { industry: 'Law', meaning: 'Criminal/Civil Procedure Law', why: 'Ensures legal processes are fair' },
    { industry: 'Technology', meaning: 'C Language / License', why: 'Core of modern software & open-source' },
    { industry: 'Sports', meaning: 'Cricket & Soccer Leagues', why: 'Global entertainment & regional pride' },
    { industry: 'Military', meaning: 'Corporal Rank', why: 'Leadership in armed forces' },
    { industry: 'Logistics', meaning: 'Certified Logistician', why: 'Recognized in global supply chain careers' },
    { industry: 'Healthcare', meaning: 'Protein Level', why: 'Vital for diagnosing brain diseases' },
];

const otherFields = [
    {
        num: '5',
        icon: '🎓',
        title: 'CPL in Education: Credit for Prior Learning',
        desc: 'In education, CPL stands for Credit for Prior Learning. This is a system that allows students to earn academic credits for knowledge or skills they\'ve gained outside of formal education. For example, if you\'ve learned a skill through work experience, you might get credit for it in your course.',
    },
    {
        num: '6',
        icon: '💻',
        title: 'CPL in Programming: Combined Programming Language',
        desc: 'In the tech world, CPL stands for Combined Programming Language. This was an early programming language developed in the 1960s. Although it\'s not widely used today, it played a significant role in the evolution of modern programming languages.',
    },
    {
        num: '7',
        icon: '🧪',
        title: 'CPL in Chemical Industry: Cyclic Polylactate',
        desc: 'In the chemical industry, CPL stands for Cyclic Polylactate. This is a chemical compound used in various industrial applications, including the production of biodegradable plastics.',
    },
    {
        num: '8',
        icon: '🎮',
        title: 'CPL in Gaming: Counter-Strike Professional League',
        desc: 'In the gaming community, CPL refers to the Cyberathlete Professional League, which was one of the first major esports organizations. It was particularly famous for hosting competitive tournaments for games like Counter-Strike and Quake. Founded in 1997, the CPL played a pivotal role in popularizing esports and competitive gaming. Although the original CPL ceased operations in 2008, it laid the foundation for modern esports leagues and tournaments.',
    },
    {
        num: '9',
        icon: '⚖️',
        title: 'CPL in Law: Common Professional Examination',
        desc: 'In the legal field, CPL stands for Common Professional Examination. It is a qualification for non-law graduates who wish to become solicitors or barristers in the UK. The CPL serves as a conversion course, providing foundational legal knowledge to individuals without a law degree. The exam covers core subjects like contract law, criminal law, and constitutional law. After passing the CPL, candidates can proceed to the Legal Practice Course (LPC) or Bar Professional Training Course (BPTC).',
    },
    {
        num: '10',
        icon: '🖥️',
        title: 'CPL in Technology: Current Privilege Level',
        desc: 'In computing and cybersecurity, CPL stands for Current Privilege Level. It is a concept used in CPU architecture to define the access level of a running process. CPL determines what resources a process can access, such as memory or hardware. Lower CPL values indicate higher privileges. CPL is crucial for maintaining system security by restricting unauthorized access to critical resources.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CPLPage() {
    return (
        <Layout
            title="CPL Full Form: Meaning in Aviation, Cricket, Marketing, and More – 2025"
            description="CPL Full Form stands for different things in different fields. In Aviation CPL is Commercial Pilot License. Learn CPL full form in Cricket, Marketing, Defense, Law, Gaming, Technology and more."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Full Form Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        CPL Full Form: Meaning in Aviation, Cricket, Marketing, and More
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-4">2025 Complete Guide</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        Have you ever come across the term CPL and wondered what it means? Well, you're not alone! CPL is a three-letter acronym that stands for different things in various fields. From aviation to cricket, marketing to defense, the full form of CPL changes depending on the context. In this article, we'll explore the CPL full form in detail, its significance in different industries, and answer some common questions about it.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        But behind every definition of CPL lies a human story — a pilot chasing their dream to soar the skies, a marketer striving to connect with potential customers, or a gamer competing for glory in the virtual arena. Let's Start in!
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Intro Para ── */}
            <div className="bg-av-orange py-5 px-4 text-center">
                <p className="text-white font-semibold text-sm max-w-4xl mx-auto leading-relaxed">
                    CPL is a popular acronym that carries different meanings in various fields such as aviation, marketing, law, technology, sports, and healthcare. Whether you're an aspiring pilot, a digital marketer, a legal professional, or just someone curious, this guide will help you understand all possible full forms of CPL and their real-world significance.
                </p>
            </div>

            {/* ── What is the Full Form of CPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">All Full Forms</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is the Full Form of <span className="text-av-orange">CPL?</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">CPL stands for many things — here's a quick overview:</p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-3 text-left">Industry</th>
                                        <th className="px-5 py-3 text-left">CPL Full Form</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cplQuickTable.map((row, i) => (
                                        <tr key={row.industry} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.industry}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.fullForm}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CPL in Aviation Overview ── */}
            <section className="py-10 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL in Aviation – <span className="text-av-orange">Commercial Pilot License</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">CPL Is So Important in Aviation. Here Your Brothers is Explain you Everything. Just Keep calm.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <p className="text-white/80 text-sm leading-relaxed mb-5">
                                    CPL (Commercial Pilot License) is a certification that allows a person to fly aircraft professionally for passenger airlines, cargo, and charter services.
                                </p>
                                <p className="text-av-orange font-semibold text-sm mb-3">✈️ Key Points:</p>
                                <ul className="space-y-2 mb-5">
                                    {cplAviationKeyPoints.map(p => (
                                        <li key={p} className="flex items-start gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-av-orange/20 border border-av-orange/40 rounded-xl p-4">
                                    <p className="text-white text-sm">👉 It's the most recognized meaning of CPL worldwide — ideal for those aiming for a career in aviation.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">CPL Full Form in Different Fields</h3>
                                <div className="space-y-3">
                                    {[
                                        { num: '1', label: 'CPL in Aviation', value: 'Commercial Pilot License', icon: '✈️' },
                                        { num: '2', label: 'CPL in Cricket', value: 'Caribbean Premier League', icon: '🏏' },
                                        { num: '3', label: 'CPL in Marketing', value: 'Cost Per Lead', icon: '📊' },
                                        { num: '4', label: 'CPL in Defense', value: 'Corporal', icon: '🎖️' },
                                    ].map(item => (
                                        <div key={item.num} className="flex items-center gap-4 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                            <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{item.num}</div>
                                            <span className="text-xl">{item.icon}</span>
                                            <div>
                                                <p className="font-semibold text-av-blue text-sm">{item.label}</p>
                                                <p className="text-gray-500 text-xs">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Section Heading ── */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Detailed Explanations</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL Full Form in Different Fields <span className="text-av-orange">in Details</span>
                        </h2>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── 1. Aviation Detail ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">1) Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            CPL in Aviation: <span className="text-av-orange">Commercial Pilot License</span>
                        </h2>
                    </ScrollReveal>

                    {/* What is CPL */}
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">What is Commercial Pilot License?</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    A Commercial Pilot License (CPL) is an official license that allows a person to fly an aircraft professionally and earn money by doing so. This means you can fly passenger planes, cargo aircraft, charter flights, or even work for government and private airlines.
                                </p>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    It's one of the most important steps in becoming a professional pilot, and it's recognized all over the world.
                                </p>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    In the world of aviation, CPL stands for Commercial Pilot License. This is a crucial license for anyone who wants to fly commercial aircraft and get paid for it. Its Like a Driving License For Fly Pilot. There Are So Many Types of Pilot Licenses and Commercial Pilot License is one of Them.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="glass rounded-2xl p-8">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">How to Get a CPL in India:</h3>
                                <div className="space-y-3">
                                    {cplSteps.map((s, i) => (
                                        <div key={s.step} className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                            <div>
                                                <p className="text-av-orange font-semibold text-xs">{s.step}</p>
                                                <p className="text-white/80 text-sm">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/60 text-xs mt-4">A CPL allows pilots to work for airlines, cargo companies, or even private charters. It's the first step toward a thrilling career in the skies!</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* DGCA Subjects, Who Needs CPL, What Can You Do */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">List of Subjects in DGCA Exam for CPL:</h4>
                                <ul className="space-y-2">
                                    {dgcaSubjects.map(s => (
                                        <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 space-y-2 pt-4 border-t border-white/20">
                                    <p className="text-white/70 text-xs"><span className="text-av-orange font-semibold">Requirements:</span> To earn a CPL, candidates must complete a specified number of flight hours, pass written exams, and demonstrate proficiency in flying skills.</p>
                                    <p className="text-white/70 text-xs"><span className="text-av-orange font-semibold">Career Opportunities:</span> CPL holders can work as commercial pilots for airlines, cargo operators, charter services, or flight instructors.</p>
                                    <p className="text-white/70 text-xs"><span className="text-av-orange font-semibold">Difference from PPL:</span> A Private Pilot License (PPL) allows individuals to fly for personal use, while a CPL permits commercial operations.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Who needs a CPL?</h4>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    If your dream is to become a Pilot and Get Paid to Fly, whether it's for an airline like IndiGo, Air India, SpiceJet, or for cargo or private jets, you must have a CPL. Without this license, you're not legally allowed to fly for commercial purposes.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">What Can You Do With a CPL?</h4>
                                <p className="text-white/60 text-xs mb-3">Once you have a CPL:</p>
                                <ul className="space-y-2 mb-4">
                                    {cplAfterLicense.map(item => (
                                        <li key={item} className="flex items-start gap-2 text-white/80 text-xs">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-av-orange/20 border border-av-orange/40 rounded-xl p-4">
                                    <p className="text-av-orange font-semibold text-xs mb-1">In Short:</p>
                                    <p className="text-white/80 text-xs leading-relaxed">A CPL is your passport to becoming a professional pilot. It proves that you have the knowledge, skills, and flying experience to safely carry passengers or cargo.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── 2. Cricket – Caribbean Premier League ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">2) Cricket</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL in Cricket: <span className="text-av-orange">Caribbean Premier League</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-3xl text-sm leading-relaxed">
                            If you're a cricket fan, you've probably heard of the Caribbean Premier League (CPL). This is one of the most exciting T20 cricket leagues in the world. Founded in <strong>2013</strong>, the CPL features six teams from the Caribbean region:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">CPL Teams</h3>
                                <ul className="space-y-3">
                                    {cplTeams.map(team => (
                                        <li key={team} className="flex items-center gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                            <span className="text-av-orange text-lg">🏏</span>
                                            <span className="font-semibold text-av-blue text-sm">{team}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-xs mt-4 leading-relaxed">The league attracts top international players and is known for its high-energy matches and vibrant Atmosphere.</p>
                                <p className="text-gray-500 text-xs mt-2">Hard Hitter Kieron Pollard and Many other Westindies players play in this tournament.</p>
                                <div className="mt-4 bg-av-blue rounded-xl p-4">
                                    <p className="text-white text-sm"><strong className="text-av-orange">Most Recent Champions:</strong> The Saints Lucia Kings in Year 2024.</p>
                                    <p className="text-white/60 text-xs mt-1">Note: The Jamaica Tallawahs were replaced by the Antigua &amp; Barbuda Falcons in 2024.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">CPL Champion Team: A Year-by-Year Overview</h3>
                                <p className="text-gray-500 text-xs mb-4">Here's a look at the CPL champions Team from its Beginnings:</p>
                                <div className="overflow-x-auto rounded-xl">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-av-blue text-white">
                                                <th className="px-3 py-2 text-left">Year</th>
                                                <th className="px-3 py-2 text-left">Champion</th>
                                                <th className="px-3 py-2 text-left">Final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cplChampions.map((row, i) => (
                                                <tr key={row.year} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-3 py-2 font-bold text-av-orange">{row.year}</td>
                                                    <td className="px-3 py-2 font-semibold text-av-blue">{row.team}</td>
                                                    <td className="px-3 py-2 text-gray-500">{row.opponent}</td>
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

            {/* ── 3. Marketing ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-10">
                        <div className="section-tag">3) Marketing</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL in Marketing: <span className="text-av-orange">Cost Per Lead</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <div className="text-4xl mb-4">📊</div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    In the world of digital marketing, CPL stands for <strong className="text-av-blue">Cost Per Lead</strong>. This is a metric used to measure how much it costs to generate a potential customer (or lead) through online campaigns.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    For example, if a company spends $100 on an ad campaign and gets 10 leads, the CPL would be <strong className="text-av-orange">$10 per lead</strong>.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Marketers use CPL to evaluate the effectiveness of their campaigns and optimize their budgets. <strong>Lower CPL means better efficiency</strong> in acquiring customers.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* ── 4. Defense ── */}
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white">
                                <div className="section-tag mb-3">4) Defense</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">CPL in Defense: Corporal</h3>
                                <div className="text-4xl mb-4">🎖️</div>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    In the defense sector, CPL stands for <strong className="text-av-orange">Corporal</strong>. This is a rank in the armed forces, usually above a private and below a sergeant. A corporal is often responsible for leading a small team of soldiers and ensuring discipline and efficiency.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── 5–10. Other Fields ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">More Fields</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL in <span className="text-av-orange">Other Fields</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherFields.map((item, i) => (
                            <ScrollReveal key={item.num} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{item.num}</div>
                                        <span className="text-2xl">{item.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-3 text-sm leading-snug">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed flex-grow">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Knowing the CPL Full Form Matters ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Importance</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Knowing the CPL Full Form <span className="text-av-orange">Matters</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal className="mb-12">
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-3 text-left">Industry</th>
                                        <th className="px-5 py-3 text-left">CPL Meaning</th>
                                        <th className="px-5 py-3 text-left">Why It's Important</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {whyMattersTable.map((row, i) => (
                                        <tr key={row.industry} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.industry}</td>
                                            <td className="px-5 py-3 text-av-orange font-medium">{row.meaning}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.why}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    {/* Why is CPL Important */}
                    <ScrollReveal>
                        <div className="bg-gradient-to-br from-av-blue to-av-navy rounded-2xl p-8 text-center">
                            <div className="section-tag mb-4">Why is CPL Important?</div>
                            <p className="text-white/80 text-sm leading-relaxed max-w-3xl mx-auto">
                                The term CPL is important because it represents key concepts in different fields. Whether you're talking about a pilot's license, a cricket league, or a marketing metric, <strong className="text-av-orange">CPL plays a vital role in shaping industries and careers.</strong>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}