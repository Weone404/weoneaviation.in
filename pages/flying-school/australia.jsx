import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '13-14 Months', label: 'Program Duration', icon: '📅' },
    { num: '221 Hrs', label: 'Flight Hours', icon: '✈️' },
    { num: 'AUD 119k–125k', label: 'Program Fee', icon: '💰' },
    { num: 'CASA', label: 'Certification', icon: '🏅' },
];

const quickDetails = [
    { sr: 1, topic: 'Program', details: 'CPL with Multi Engine Instrument Rating (MEIR) + Instructor Rating (CFI)' },
    { sr: 2, topic: 'Duration', details: '13–14 Months' },
    { sr: 3, topic: 'Flight Hours', details: '221 Hours (CASA & DGCA Standards)' },
    { sr: 4, topic: 'Certification', details: 'CASA Licence + Diploma in Aviation' },
    { sr: 5, topic: 'Eligibility', details: '17+ years, 10+2 (Physics & Math), IELTS 5.5/6.0' },
    { sr: 6, topic: 'Visa', details: 'Australian Student Visa (Subclass 500)' },
];

const advantages = [
    {
        num: '1',
        icon: '🏅',
        title: 'CASA Certification',
        desc: 'Australia is known all over the world for providing top-class flight training through its CASA-accredited academies. CASA licences are globally recognised, giving you international credibility the moment you graduate.',
    },
    {
        num: '2',
        icon: '🎓',
        title: 'Diploma in Aviation',
        desc: 'Unlike many countries, Australia combines a professional Diploma in Aviation with your CPL flight training. This academic qualification adds enormous value to your profile and makes your credentials stand out globally.',
    },
    {
        num: '3',
        icon: '🛩️',
        title: 'Advanced Infrastructure',
        desc: 'Train on modern aircraft like the Diamond DA40, DA42, and Cessna 172 with state-of-the-art simulators. Australia provides the best facilities for flight training, including 40 hours of simulator training for MEIR.',
    },
    {
        num: '4',
        icon: '💼',
        title: 'Student Work Rights',
        desc: 'Australia\'s Student Visa (Subclass 500) allows you to work part-time (20 hrs/week) while completing your training, helping you manage your living expenses and gain professional exposure.',
    },
    {
        num: '5',
        icon: '☀️',
        title: 'Excellent Flying Conditions',
        desc: 'Locations like Brisbane (300 flying days/year), Gold Coast (295 days) and Lismore offer diverse weather patterns and airspace experience that thoroughly prepare you for real-world commercial operations.',
    },
    {
        num: '6',
        icon: '🔄',
        title: 'Easy DGCA Conversion',
        desc: 'After completing your CASA training, returning to India for DGCA licence conversion is straightforward. The CASA CPL with MEIR is designed to meet DGCA conversion requirements with minimal friction.',
    },
];

const trainingSteps = [
    { step: '01', title: 'DGCA Medicals', desc: 'Complete your DGCA Class 2 & 1 Medicals and join DGCA Ground Classes to clear theory exams.' },
    { step: '02', title: 'DGCA Theory', desc: 'Complete ground theory preparation and clear DGCA theory examinations before departure.' },
    { step: '03', title: 'Choose Flight School', desc: 'Select a CASA-approved Australian flight school with structured Diploma programs and modern aircraft.' },
    { step: '04', title: 'CASA Medicals', desc: 'Obtain your CASA Class 1 Medical Certificate — mandatory before commencing any flight training in Australia.' },
    { step: '05', title: 'Admission & COE', desc: 'Receive your official offer letter (COE) after acceptance into the Diploma of Aviation CPL-A program.' },
    { step: '06', title: 'Visa Application', desc: 'Apply for Subclass 500 Student Visa allowing you to live, study, and work part-time in Australia.' },
    { step: '07', title: 'Ground School', desc: 'Begin theoretical training under CASA curriculum — meteorology, navigation, flight rules, and human performance.' },
    { step: '08', title: 'Flight Training', desc: 'Progress through RPL → PPL → CPL → MEIR, completing 221 flight hours including solo, cross-country, and instrument flying.' },
    { step: '09', title: 'DGCA Conversion', desc: 'Return to India and convert your CASA licence into a DGCA licence by meeting conversion requirements and flight checks.' },
];

const trainingPhases = [
    {
        num: '1',
        code: 'RPL',
        title: 'Recognition of Prior Learning',
        duration: '0.5 Months',
        hours: '0 Hrs',
        focus: ['Initial Training', 'Basic Handling', 'Recognition Of Any Prior Experience'],
    },
    {
        num: '2',
        code: 'PPL',
        title: 'Private Pilot License',
        duration: '3–4 Months',
        hours: '0–55 Hrs',
        focus: ['Dual and Solo Flight', 'Basic Navigation', 'Solo Development'],
    },
    {
        num: '3',
        code: 'CPL',
        title: 'Commercial Pilot Licence + Hour Building',
        duration: '6–7 Months',
        hours: '55–180 Hrs',
        focus: ['Solo Cross-Country', 'Advanced Manoeuvres', 'Commercial Flight Preparation'],
    },
    {
        num: '4',
        code: 'MEIR',
        title: 'Multi-Engine + Instrument Rating',
        duration: '3 Months',
        hours: '180–221 Hrs',
        focus: ['40 Hrs Simulator + 21 Hrs Aircraft', 'Instrument Approaches', 'Final CPL/IR Flight Tests'],
    },
];

const locations = [
    { city: 'Gold Coast', days: '295 Days', climate: 'Coastal, warm & breezy', icon: '🏄' },
    { city: 'Brisbane', days: '300 Days', climate: 'Subtropical & mostly clear', icon: '☀️' },
    { city: 'Lismore', days: '280 Days', climate: 'Humid subtropical & mild', icon: '🌿' },
];

const fleet = [
    { name: 'Diamond DA42', use: 'Advanced multi-engine and instrument training with modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.' },
    { name: 'Cessna 182', use: 'Equipped with modern avionics, ideal for advanced CPL and cross-country training, offering stable handling, higher performance, and reliability for professional pilot development.' },
    { name: 'Piper Archer 44', use: 'A reliable four-seat trainer ideal for PPL and CPL training. Known for its stable handling and performance, it helps students master navigation, cross-country, and instrument flying skills.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AustraliaPilotTrainingPage() {
    return (
        <Layout
            title="Pilot Training in Australia – Commercial Pilot License (CPL) | CASA Accredited | AviationGuide"
            description="Explore Commercial Pilot Training in Australia with CASA-accredited academies, Diploma in Aviation, 221 flight hours, and easy DGCA licence conversion. Your complete guide to pilot training in Australia."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">CASA Accredited Training</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot Training in Australia
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        The aviation industry in Australia is known all over the world for providing top-class flight training facilities for international students through its CASA-accredited academies and Diploma in Aviation courses.
                    </p>
                    <p className="text-white/60 max-w-xl mx-auto text-sm mb-6">It is the ideal destination for flight trainees who want a successful flying career.</p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Program Offered</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">CPL with MEIR + Instructor Rating</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Let's understand the program structure, eligibility, training phases, and why Australia is the right choice for your pilot career.
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
                            Australia offers <strong>world-renowned aviation education with CASA certification</strong> and integrated academic qualifications. With its state-of-the-art aircraft and simulators, it provides the best facilities for flight training for international students.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            The <strong>Diploma in Aviation</strong> combined with your CPL adds a globally recognised academic credential to your professional pilot license — a unique advantage that very few countries offer.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="font-montserrat font-bold text-av-orange mb-1">Program Highlight</p>
                            <p className="text-white text-lg font-semibold">CASA CPL-MEIR + Diploma in Aviation</p>
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
                            { icon: '🎂', title: 'Age', desc: 'Minimum 17 years to begin pilot training and 18 years for a Commercial Pilot License.' },
                            { icon: '📚', title: 'Education', desc: '10+2 with Physics & Math or equivalent is required. Non-science students can qualify via NIOS.' },
                            { icon: '🗣️', title: 'English Proficiency', desc: 'IELTS 5.5 in each band and 6.0 overall is required for the Australian Student Visa.' },
                            { icon: '🏥', title: 'Medical', desc: 'Both CASA Class 1 and DGCA Class 1 medicals must be completed before commencing training.' },
                            { icon: '🛂', title: 'Visa', desc: 'Australian Student Visa (Subclass 500) allows students to study full-time and work part-time during training.' },
                            { icon: '✅', title: 'Overall', desc: 'Meet all criteria above and you are ready to begin your pilot training journey in Australia with a CASA-approved school.' },
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
                            Sequential advancement from RPL through to CPL with Multi-Engine Instrument Rating.
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
                                    <h4 className="font-montserrat font-bold text-white text-sm mb-2">{s.title}</h4>
                                    <p className="text-white/70 text-xs leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="font-montserrat font-bold text-white text-lg">
                                A structured 9-step path to your <span className="text-av-orange">CASA CPL with MEIR — and DGCA conversion back in India.</span>
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
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">CASA-Approved Training</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    The program is conducted in CASA-approved flight schools, providing a Commercial Pilot Licence with a Multi-Engine Instrument Rating (MEIR) that can be easily adapted for DGCA requirements in India.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">🌍</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Global Recognition</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    The CASA certification is recognised around the world. This gives budding pilots the confidence and recognition required for a successful career in the international aviation industry.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-7 h-full">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Designed for Indian Pilots</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    The program combines CASA flight training and a Diploma in Aviation, specifically designed for budding Indian pilots seeking a globally recognised qualification with a clear path to DGCA conversion.
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
                            Our aviation career counsellors will guide you through DGCA medicals, CASA school selection, visa application, and everything you need to become a licensed commercial pilot.
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