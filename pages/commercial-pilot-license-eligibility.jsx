import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '17+', label: 'Minimum Age', icon: '🎂' },
    { num: '10+2', label: 'Education Required', icon: '🎓' },
    { num: '200 hrs', label: 'Flying Hours', icon: '✈️' },
    { num: 'DGCA', label: 'Approved Authority', icon: '🏛️' },
];

const eligibilitySteps = [
    { step: '01', icon: '🎂', title: 'Age Requirement', short: '17 years minimum' },
    { step: '02', icon: '📚', title: 'Educational Qualification', short: '10+2 with Physics & Maths' },
    { step: '03', icon: '🩺', title: 'Medical Fitness', short: 'Class 1 & 2 Certificate' },
    { step: '04', icon: '🗣️', title: 'Language Proficiency', short: 'English (ELP Test)' },
    { step: '05', icon: '🌍', title: 'Nationality', short: 'Open to all nationalities' },
    { step: '06', icon: '🪪', title: 'Student Pilot License', short: 'SPL required first' },
    { step: '07', icon: '✈️', title: 'Flying Hours', short: 'Minimum 200 hours' },
];

const flyingHours = [
    { label: 'Total Flying Hours', hours: '200 hours (minimum)', highlight: true },
    { label: 'Pilot-in-Command (PIC)', hours: '100 hours' },
    { label: 'Cross-Country Flying', hours: '20 hours' },
    { label: 'Instrument Flying', hours: '10 hours' },
    { label: 'Night Flying', hours: '5 hours' },
];

const splRequirements = [
    'Be at least 16 years old',
    'Students must pass an oral/written examination on aviation subjects.',
    'Pass a Class 2 medical exam',
];

const medicalElements = [
    'The vision standards require 6/6 vision in one eye and 6/9 vision in the other yet correctable with eyeglasses.',
    'Hearing, blood pressure, ECG, and overall physical health',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CPLEligibilityPage() {
    return (
        <Layout
            title="Commercial Pilot License (CPL) Eligibility – Complete Guide 2025"
            description="Learn the complete CPL eligibility criteria in India. Age requirement, educational qualification, medical fitness, flying hours, Student Pilot License (SPL), and more."
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
                        Commercial Pilot License (CPL) Eligibility
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        The first essential step for someone who dreams about aviation as a profession is to earn a <strong className="text-white">Commercial Pilot License (CPL)</strong>. The CPL enables professional aircraft operation although it provides entry into airline and charter company and cargo service prestigious roles.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        Before starting a pilot training program students need to understand the specifications that will determine their admission. Here's a detailed overview of the eligibility to become a pilot and apply for a commercial pilot licence course in India.
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

            {/* ── Eligibility Overview ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">At a Glance</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CPL Eligibility <span className="text-av-orange">Requirements</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">All requirements a candidate must meet to apply for a Commercial Pilot Licence in India</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {eligibilitySteps.map((item, i) => (
                            <ScrollReveal key={item.step} delay={i * 70}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">{item.step}</div>
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.title}</h3>
                                    <p className="text-av-orange text-xs font-semibold">{item.short}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Detailed Sections ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-16">

                    {/* 1. Age Requirement */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <div className="section-tag">01 – Age</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                                Age Requirement
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                A candidate qualifying for a CPL in India needs to reach <strong>17 years old</strong> before applying for enrollment. The license processing begins at age 17 but the candidate will obtain it after completing their 18th birthday.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-center text-white">
                                <div className="text-5xl mb-3">🎂</div>
                                <p className="text-white/70 text-sm mb-1">Minimum Age to Apply</p>
                                <p className="font-montserrat text-5xl font-black text-av-orange">17</p>
                                <p className="text-white/60 text-xs mt-2">License issued after completing 18th birthday</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* 2. Educational Qualification */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <ScrollReveal delay={150}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Educational Requirements</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Qualification Level', value: '10+2 (Senior Secondary) or equivalent' },
                                        { label: 'Mandatory Subjects', value: 'Physics and Mathematics as core subjects' },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                            <p className="text-sm text-gray-600"><strong className="text-av-blue">{item.label}:</strong> {item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 bg-av-orange/10 border border-av-orange/30 rounded-xl p-4">
                                    <p className="text-av-orange font-semibold text-xs mb-1">⚠️ Don't Have Physics & Maths?</p>
                                    <p className="text-gray-600 text-xs leading-relaxed">
                                        Candidates who lack Physics and Math in their 10+2 education must separately take these courses either through <strong>NIOS (National Institute of Open Schooling)</strong> or any authorized educational institution. The standards for commercial pilot course eligibility require a specific academic background.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal>
                            <div className="section-tag">02 – Education</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                Educational Qualification
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                A solid academic base forms the essential foundation required to turn into a professional pilot. The educational requirement begins at the 10+2 (senior secondary) level alongside science subjects according to set criteria.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* 3. Medical Fitness */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <ScrollReveal>
                            <div className="section-tag">03 – Medical</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                Medical Fitness
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                High levels of physical along with mental fitness are required for safe aircraft operation. Each pilot candidate needs to obtain a medical certification from an examiner approved by the DGCA.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                The medical certification includes:
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                                    <div className="space-y-3 mb-5">
                                        {[
                                            { label: 'Class 2 Medical Certificate', note: 'Initial requirement for Student Pilot License' },
                                            { label: 'Class 1 Medical Certificate', note: 'Mandatory for CPL issuance' },
                                        ].map(item => (
                                            <div key={item.label} className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0 text-lg">🩺</span>
                                                <div>
                                                    <p className="font-semibold text-av-blue text-sm">{item.label}</p>
                                                    <p className="text-gray-500 text-xs">{item.note}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-av-blue font-semibold text-sm mb-3">The medical exam evaluates these specific elements:</p>
                                    <ul className="space-y-2">
                                        {medicalElements.map(e => (
                                            <li key={e} className="flex items-start gap-2 text-gray-600 text-xs">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{e}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* 4. Language Proficiency */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white">
                                <div className="text-4xl mb-4">🗣️</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Language Proficiency</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    English proficiency stands as a mandatory requirement because aviation communication and documentation as well as all examination materials operate in the English language.
                                </p>
                                <div className="bg-av-orange/20 border border-av-orange/40 rounded-xl p-4">
                                    <p className="text-av-orange font-semibold text-sm">ELP Test</p>
                                    <p className="text-white/70 text-xs mt-1">The DGCA potentially requires candidates to pass an <strong className="text-white">English Language Proficiency (ELP)</strong> test.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal>
                            <div className="section-tag">04 – Language</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                Language Proficiency
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                English proficiency stands as a mandatory requirement because aviation communication and documentation as well as all examination materials operate in the English language. The DGCA potentially requires candidates to pass an English Language Proficiency (ELP) test.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* 5. Nationality */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <div className="section-tag">05 – Nationality</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                Nationality and Citizenship
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                The Indian authorities do not require any specific nationality from applicants seeking a CPL license. Foreign nationals who seek a CPL in India must fulfill additional requirements which include getting security clearance alongside the conversion of their licenses obtained from foreign training programs.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <div className="text-4xl mb-4">🌍</div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                        <p className="text-sm text-gray-600"><strong className="text-av-blue">Indian Nationals:</strong> No specific nationality restriction</p>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                        <p className="text-sm text-gray-600"><strong className="text-av-blue">Foreign Nationals:</strong> Must obtain security clearance and convert foreign licenses as per DGCA rules</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </section>

            {/* ── Student Pilot License ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">06 – SPL</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Student Pilot License <span className="text-av-orange">(SPL)</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Candidates must first obtain a Student Pilot License (SPL) to enroll in the CPL program. The candidate needs to fulfill three requirements to obtain an SPL.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">SPL Requirements</h3>
                                <div className="space-y-4">
                                    {splRequirements.map((req, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                            <p className="text-white/80 text-sm leading-relaxed pt-0.5">{req}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-8">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">What SPL Enables</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Under this license students can start receiving <strong className="text-av-orange">supervised flying instruction</strong> for basic skills.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Flying Hours ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">07 – Flying Hours</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Flying Hours <span className="text-av-orange">Requirement</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                            The CPL eligibility requires candidates to complete at least <strong>200 hours of flying</strong>. These include:
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-5 py-3 text-left">Flying Type</th>
                                            <th className="px-5 py-3 text-left">Hours Required</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {flyingHours.map((row, i) => (
                                            <tr key={row.label} className={`${row.highlight ? 'bg-av-orange/10 font-bold' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                <td className={`px-5 py-3 ${row.highlight ? 'text-av-blue font-bold' : 'text-gray-600'}`}>{row.label}</td>
                                                <td className={`px-5 py-3 font-semibold ${row.highlight ? 'text-av-orange text-base' : 'text-av-blue'}`}>{row.hours}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full flex flex-col justify-center">
                                <div className="text-5xl mb-4 text-center">✈️</div>
                                <p className="font-montserrat text-white text-center text-5xl font-black text-av-orange mb-2">200+</p>
                                <p className="text-white/70 text-center text-sm mb-5">Total Flying Hours Required</p>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <p className="text-white/80 text-sm leading-relaxed text-center">
                                        Flying education must take place under <strong className="text-av-orange">DGCA-approved academic institutions</strong> which provide flight instruction.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Final Thoughts ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Final Thoughts</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">
                            Final <span className="text-av-orange">Thoughts</span>
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-3xl mx-auto">
                            Start a successful career in aviation with meeting all the commercial pilot eligibility requirements. All requirements including educational background coupled with medical fitness and language proficiency as well as flying hours are specifically designed to establish the best possible safety and professional standards.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-3xl mx-auto">
                            With meeting all requirements coupled with dedication to aviation you will proceed successfully toward obtaining your wings. Students should enroll in a respected flying school that holds <strong className="text-av-orange">DGCA approval</strong> because it will support them throughout the SPL and CPL education journey.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Start Your CPL Journey →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}