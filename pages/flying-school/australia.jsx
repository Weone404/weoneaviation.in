import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: 'Varies', label: 'Provider Schedule', icon: '📅' },
    { num: 'Confirm', label: 'Flight-hour Requirements', icon: '✈️' },
    { num: 'Request quote', label: 'Current Provider Fee', icon: '💰' },
    { num: 'CASA', label: 'Australian Regulator', icon: '🏅' },
];

const quickDetails = [
    { sr: 1, topic: 'Program', details: 'No Australia-specific partner programme is confirmed here; check current school offerings directly' },
    { sr: 2, topic: 'Duration', details: 'Confirm the current schedule with the selected flying school' },
    { sr: 3, topic: 'Flight Hours', details: 'Confirm requirements with CASA and the selected school' },
    { sr: 4, topic: 'Certification', details: 'Confirm the licence and qualification awarded with the school and regulator' },
    { sr: 5, topic: 'Eligibility', details: 'Confirm current entry requirements with the selected school' },
    { sr: 6, topic: 'Visa', details: 'Check current requirements with Australian authorities' },
];

const advantages = [
    {
        num: '1',
        icon: '🏅',
        title: 'CASA Certification',
        desc: 'Check the selected school’s current approval with CASA and confirm the licence privileges and conversion requirements with the relevant regulators.',
    },
    {
        num: '2',
        icon: '🎓',
        title: 'Academic Qualifications',
        desc: 'Qualifications included in a training pathway vary by provider. Confirm the award, eligibility, and terms directly with the school.',
    },
    {
        num: '3',
        icon: '🛩️',
        title: 'Advanced Infrastructure',
        desc: 'Aircraft, simulators, and facilities vary by school. Confirm current equipment and included training directly with the provider.',
    },
    {
        num: '4',
        icon: '💼',
        title: 'Student Work Rights',
        desc: 'Check current visa, study, and work conditions with the Australian authorities before making plans.',
    },
    {
        num: '5',
        icon: '☀️',
        title: 'Excellent Flying Conditions',
        desc: 'Weather and training schedules depend on location and provider. Request current operating information from the selected school.',
    },
    {
        num: '6',
        icon: '🔄',
        title: 'DGCA Conversion Requirements',
        desc: 'DGCA assesses licence conversion under its current requirements. Confirm the applicable process with DGCA and the selected school.',
    },
];

const trainingSteps = [
    { step: '01', title: 'DGCA Medicals', desc: 'Complete your DGCA medical certification and join DGCA Ground Classes to clear theory exams.' },
    { step: '02', title: 'DGCA Theory', desc: 'Complete ground theory preparation and clear DGCA theory examinations before departure.' },
    { step: '03', title: 'Choose Flight School', desc: 'Check a selected school’s current approval with CASA and verify its written course offering, facilities, and terms.' },
    { step: '04', title: 'Medical Requirements', desc: 'Confirm current medical requirements with CASA and the selected school.' },
    { step: '05', title: 'Admission Documents', desc: 'Confirm admission documents and any required enrolment confirmation directly with the school.' },
    { step: '06', title: 'Visa Requirements', desc: 'Check current study and visa requirements with the Australian authorities.' },
    { step: '07', title: 'Course Content', desc: 'Request the current syllabus and schedule from the selected school.' },
    { step: '08', title: 'Flight Training', desc: 'Training sequence, flight hours, facilities, and schedule depend on the selected school and regulator requirements.' },
    { step: '09', title: 'DGCA Conversion', desc: 'Check current licence-conversion requirements directly with DGCA before selecting an overseas training route.' },
];

const trainingPhases = [
    {
        num: '1',
        code: 'RPL',
        title: 'Recognition of Prior Learning',
        duration: 'Confirm with provider',
        hours: 'Confirm with provider',
        focus: ['Initial Training', 'Basic Handling', 'Recognition Of Any Prior Experience'],
    },
    {
        num: '2',
        code: 'PPL',
        title: 'Private Pilot License',
        duration: 'Confirm with provider',
        hours: 'Confirm with provider',
        focus: ['Dual and Solo Flight', 'Basic Navigation', 'Solo Development'],
    },
    {
        num: '3',
        code: 'CPL',
        title: 'Commercial Pilot Licence + Hour Building',
        duration: 'Confirm with provider',
        hours: 'Confirm with provider',
        focus: ['Solo Cross-Country', 'Advanced Manoeuvres', 'Commercial Flight Preparation'],
    },
    {
        num: '4',
        code: 'MEIR',
        title: 'Multi-Engine + Instrument Rating',
        duration: 'Confirm with provider',
        hours: 'Confirm with provider',
        focus: ['40 Hrs Simulator + 21 Hrs Aircraft', 'Instrument Approaches', 'Final CPL/IR Flight Tests'],
    },
];

const locations = [
    { city: 'Location varies by school', days: 'Confirm current schedule', climate: 'Check local operating conditions', icon: '📍' },
];

const fleet = [
    { name: 'Aircraft selected by provider', use: 'Aircraft availability, condition, and approved use vary by school. Confirm the current fleet directly with the selected provider.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AustraliaPilotTrainingPage() {
    return (
        <Layout
            title="Pilot Training in Australia: Provider and Conversion Guide | We One Aviation"
            description="A general guide to checking Australian flying-school approval, schedules, fees, visa conditions, and DGCA licence-conversion requirements. Confirm current information with providers and authorities."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Flight-training guide</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Pilot Training in Australia: Research Guide
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        This page provides general questions to ask when researching training in Australia. It does not confirm a current Australian partner school or programme.
                    </p>
                    <p className="text-white/60 max-w-xl mx-auto text-sm mb-6">It is the ideal destination for flight trainees who want a successful flying career.</p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Provider Information</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">Confirm current programmes with the selected school</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Verify the current provider, programme, schedule, fees, visa conditions, and licence-conversion rules before applying.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-lg font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── Why Australia ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Why Australia?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why Select Australia for Pilot Training?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Australian flight-training providers operate under applicable national rules. Approval, facilities, aircraft, and qualifications vary by school and must be verified directly.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Some providers may offer academic qualifications alongside flight training. Confirm the current qualification, accreditation, and terms directly with the provider.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="font-montserrat font-bold text-av-orange mb-1">Program Highlight</p>
                            <p className="text-white text-lg font-semibold">Confirm current programmes with the selected school</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">Program Overview at a Glance</h3>
                            <div className="overflow-x-auto rounded-xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Topic</th>
                                            <th className="px-4 py-3 text-left">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quickDetails.map((row, i) => (
                                            <tr key={row.topic} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3 text-gray-500">{row.sr}</td>
                                                <td className="px-4 py-3 font-semibold text-av-blue">{row.topic}</td>
                                                <td className="px-4 py-3 text-gray-600">{row.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Commercial Pilot <span className="text-av-orange">Eligibility</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Verify if you satisfy the criteria to commence your pilot training journey in Australia.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '🎂', title: 'Age', desc: 'A Student Pilot Licence, which allows flight training to begin, requires 16 years; a Commercial Pilot Licence requires 18 (Aircraft Rules, 1937, Schedule II, Sections B and J).' },
                            { icon: '📚', title: 'Education', desc: '10+2 with Physics & Math or equivalent is required. Non-science students can qualify via NIOS.' },
                            { icon: '🗣️', title: 'English Proficiency', desc: 'IELTS 5.5 in each band and 6.0 overall is required for the Australian Student Visa.' },
                            { icon: '🏥', title: 'Medical', desc: 'Both the CASA Class 1 Medical and the DGCA medical certificate must be completed before commencing training.' },
                            { icon: '🛂', title: 'Visa', desc: 'Australian Student Visa (Subclass 500) allows students to study full-time and work part-time during training.' },
                            { icon: '✅', title: 'Overall', desc: 'Check current eligibility and approval requirements directly with the school and CASA.' },
                        ].map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Advantages ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Advantages</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Train in <span className="text-av-orange">Australia?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Australia's aviation training ecosystem is one of the most comprehensive in the world. Here's what makes it stand out:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((fn, i) => (
                            <ScrollReveal key={fn.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {fn.num}
                                        </div>
                                        <span className="text-2xl">{fn.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-3">{fn.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{fn.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Training Phases ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Training Phases</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Flight Training <span className="text-av-orange">Phases & Advancement</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Training stages and course scope depend on the selected provider. Confirm the current written course plan directly.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainingPhases.map((phase, i) => (
                            <ScrollReveal key={phase.code} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col hover:border-av-orange/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                            {phase.num}
                                        </div>
                                        <span className="font-montserrat font-black text-av-orange text-xl">{phase.code}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-sm mb-3">{phase.title}</h3>
                                    <div className="flex gap-3 mb-4">
                                        <span className="bg-av-light text-av-blue text-xs font-semibold px-3 py-1 rounded-full border border-av-sky/20">{phase.duration}</span>
                                        <span className="bg-av-orange/10 text-av-orange text-xs font-semibold px-3 py-1 rounded-full">{phase.hours}</span>
                                    </div>
                                    <ul className="flex-grow space-y-2">
                                        {phase.focus.map(f => (
                                            <li key={f} className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed">
                                                <span className="text-av-orange mt-0.5">•</span>{f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Step-by-Step Journey ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Step-by-Step Guide</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Your Journey to <span className="text-av-orange">Pilot Training in Australia</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Navigate these steps to initiate your pilot training journey in Australia.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {trainingSteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 80}>
                                <div className="glass rounded-2xl p-5 h-full flex flex-col">
                                    <div className="w-12 h-12 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-lg mb-3 flex-shrink-0">
                                        {s.step}
                                    </div>
                                    <h3 className="font-montserrat font-bold text-white text-sm mb-2">{s.title}</h3>
                                    <p className="text-white/70 text-xs leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="font-montserrat font-bold text-white text-lg">
                                Steps to research a provider and verify licence requirements with CASA and DGCA.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Locations ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Locations</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Premier Pilot Training <span className="text-av-orange">Destinations in Australia</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Select from locations providing superior weather conditions and varied flying environments.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {locations.map((loc, i) => (
                            <ScrollReveal key={loc.city} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 card-hover hover:border-av-orange/30 h-full text-center">
                                    <div className="text-4xl mb-4">{loc.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">{loc.city}</h3>
                                    <div className="inline-block bg-av-orange/10 text-av-orange font-semibold text-sm px-4 py-1 rounded-full mb-3">
                                        {loc.days} Annual Flying Days
                                    </div>
                                    <p className="text-gray-500 text-sm">{loc.climate}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Aircraft Fleet ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Aircraft Fleet</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Aircraft Fleet Available for <span className="text-av-orange">Flight Training</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Train with contemporary, well-maintained aircraft featuring cutting-edge avionics.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {fleet.map((aircraft, i) => (
                            <ScrollReveal key={aircraft.name} delay={i * 100}>
                                <div className={`rounded-2xl p-7 h-full ${i === 1 ? 'bg-av-blue text-white' : 'bg-white border border-gray-100 shadow-sm card-hover hover:border-av-orange/30'}`}>
                                    <div className="text-4xl mb-4">✈️</div>
                                    <h3 className={`font-montserrat font-bold text-xl mb-3 ${i === 1 ? 'text-white' : 'text-av-blue'}`}>{aircraft.name}</h3>
                                    <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/70' : 'text-gray-500'}`}>{aircraft.use}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Licence & Acknowledgement ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Licence & Recognition</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Licence and <span className="text-av-orange">Acknowledgement</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">🏅</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Provider Approval</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Verify the selected school’s current CASA approval and ask DGCA about the applicable licence-conversion process. This page does not confirm an Australia-specific partner or programme.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">🌍</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Licence Recognition</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Licence privileges and recognition depend on the issuing and destination authorities. Confirm the current rules with the relevant regulators.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-7 h-full">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Designed for Indian Pilots</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Training packages and academic qualifications vary by provider. Request current written course details and verify conversion requirements with DGCA.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Begin Your Journey</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Start Your <span className="text-av-orange">Pilot Training in Australia?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            The academy teaches DGCA ground subjects in Dwarka and arranges flight training through partner schools. Contact the academy to ask whether an Australia-specific arrangement is currently available, and verify visa and licence requirements with the authorities.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Speak with a Counsellor →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}