import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '14-15 Months', label: 'Course Duration', icon: '📅' },
    { num: '200-210 Hrs', label: 'Flying Hours', icon: '✈️' },
    { num: 'ZAR 860k-995k', label: 'Course Fee', icon: '💰' },
    { num: 'SACAA', label: 'Certification', icon: '🏅' },
];

const quickDetails = [
    { sr: 1, topic: 'Program', details: 'CPL with Multi Engine Instrument Rating (CPL-MEIR) + Instructor Rating (CFI)' },
    { sr: 2, topic: 'Duration', details: '14–15 Months' },
    { sr: 3, topic: 'Flying Hours', details: '200–210 Hours (Under SACAA regulations for DGCA conversion)' },
    { sr: 4, topic: 'Course Fee', details: 'ZAR 860k – 995k (Comprehensive training package)' },
    { sr: 5, topic: 'Eligibility', details: '17+ years, 10+2 (Physics & Math), SACAA & DGCA Class 1 Medical' },
    { sr: 6, topic: 'Certification', details: 'SACAA CPL — valid for DGCA conversion' },
];

const advantages = [
    {
        num: '1',
        icon: '🏅',
        title: 'SACAA Training',
        desc: 'Training follows internationally recognised SACAA standards, providing a globally credible Commercial Pilot Licence. The SACAA CPL is valid for DGCA conversion, giving Indian students a clear pathway back to airline careers in India.',
    },
    {
        num: '2',
        icon: '🌍',
        title: 'Diverse Flying Environments',
        desc: 'South Africa\'s varied terrain and airspace — from coastal Cape Town to the highveld of Johannesburg — build strong real-world flying skills that prepare students for complex commercial operations worldwide.',
    },
    {
        num: '3',
        icon: '☀️',
        title: '300+ Flying Days',
        desc: 'With Johannesburg averaging 320 flying days per year and Cape Town at 300+, South Africa offers excellent weather conditions for fast, uninterrupted course completion throughout the year.',
    },
    {
        num: '4',
        icon: '💰',
        title: 'Cost-Effective Training',
        desc: 'South Africa offers competitive pricing compared to many international pilot training destinations. The comprehensive ZAR-denominated fee structure makes it one of the more affordable routes to a globally recognised CPL.',
    },
    {
        num: '5',
        icon: '🛩️',
        title: 'Modern Training Fleets',
        desc: 'Train on a wide range of well-maintained aircraft including Cessna 172, PA-34 Seneca, Piper Archer, and Diamond DA42, with experienced instructors guiding you through every stage of the program.',
    },
    {
        num: '6',
        icon: '🔄',
        title: 'Easy DGCA Conversion',
        desc: 'The SACAA CPL is structured to align with DGCA conversion requirements, allowing Indian students to return home and convert their licence smoothly to begin their airline career in India.',
    },
];

const trainingStages = [
    {
        num: '1',
        code: 'PPL',
        title: 'Private Pilot License',
        duration: '6 Months',
        hours: '0–65 Hrs',
        focus: ['Basic flight principles', 'Take-offs & landings', 'Circuit Training', 'Solo flight', 'Navigation exercises', 'Emergency Procedures'],
    },
    {
        num: '2',
        code: 'Night + Hour Building',
        title: 'Night Rating & PIC Hours',
        duration: '4 Months',
        hours: '65–165 Hrs',
        focus: ['Night flying operations', 'Solo cross-country navigation', 'Instrument familiarisation', 'PIC Hours'],
    },
    {
        num: '3',
        code: 'IR + ME',
        title: 'Instrument Rating & Multi-Engine',
        duration: '3 Months',
        hours: '160–205 Hrs',
        focus: ['Multi-engine handling', 'Instrument Flight Procedures', 'Precision Approaches', 'Simulator Training', 'IFR operations'],
    },
    {
        num: '4',
        code: 'CPL + IR Tests',
        title: 'Commercial Pilot License & Skill Tests',
        duration: '1 Month',
        hours: '205–210 Hrs',
        focus: ['Advanced navigation and instrument flying', 'Complex aircraft handling and flight management', 'CPL & IR flight tests and check rides'],
    },
];

const trainingSteps = [
    { step: '01', title: 'DGCA Medicals', desc: 'Complete your DGCA Class 2 & 1 Medicals and join reputed DGCA Ground Classes to clear theory exams.' },
    { step: '02', title: 'DGCA Theory Class', desc: 'Attend DGCA-prescribed ground school covering Air Regulations, Navigation, Meteorology, and Technical Subjects.' },
    { step: '03', title: 'Choose Flight School', desc: 'Select a SACAA-approved flight school in South Africa. Compare fleet, instructor experience, and training environment.' },
    { step: '04', title: 'Admission & Documentation', desc: 'Receive your Letter of Acceptance and all documents required for the South African Study Visa application.' },
    { step: '05', title: 'Study Visa Application', desc: 'Apply for your South African Study Visa, allowing you to legally stay and complete your pilot training program.' },
    { step: '06', title: 'SACAA Medicals', desc: 'On arrival, complete your SACAA Class 1 Medical with an aviation medical examiner before beginning flight training.' },
    { step: '07', title: 'ELP Test', desc: 'Take your English Language Proficiency assessment with the Chief Flying Instructor (CFI) before starting flight operations.' },
    { step: '08', title: 'Ground School', desc: 'Begin SACAA Ground School, covering Air Law, Navigation, Meteorology, and Human Performance, followed by written exams.' },
    { step: '09', title: 'Flight Training', desc: 'Complete structured practical training from PPL through Night Rating, IR, Multi-Engine, and final CPL skill tests.' },
    { step: '10', title: 'DGCA Conversion', desc: 'Return to India and convert your SACAA CPL into a DGCA CPL by meeting conversion requirements and clearing exams.' },
];

const schools = [
    { name: 'Flying School 01', location: 'Cape Town, South Africa', fleet: '28 Aircrafts', aircraft: 'Cessna (152, 172, 150), Piper Seneca (PA34), Tecnam', hours: '210 Hrs', duration: '15 Months' },
    { name: 'Flying School 02', location: 'Secunda, Margate, Brakpan', fleet: '40 Aircrafts', aircraft: 'Cessna 172, Piper Cherokee, Piper Seneca', hours: '200 Hrs', duration: '12 Months' },
    { name: 'Flying School 03', location: 'Durban, South Africa', fleet: '7 Aircrafts', aircraft: 'Cessna (172, 152), Piper Seneca (PA34), PA 140', hours: '200 Hrs', duration: '13–14 Months' },
    { name: 'Flying School 04', location: 'Johannesburg, South Africa', fleet: '21 Aircrafts', aircraft: 'Cessna 172, PA 28, Diamond DA-42, Piper Seneca PA-34', hours: '200 Hrs', duration: '12 Months' },
    { name: 'Flying School 05', location: 'Johannesburg, South Africa', fleet: '9 Aircrafts', aircraft: 'PA28, C172, Piper Seneca PA34', hours: '200 Hrs', duration: '14 Months' },
    { name: 'Flying School 06', location: 'Grand Central Airport', fleet: '30 Aircrafts', aircraft: 'Cessna (172, 182), Diamond DA42, PS (PA34)', hours: '200 Hrs', duration: '10–12 Months' },
    { name: 'Flying School 07', location: 'Johannesburg, South Africa', fleet: '22 Aircrafts', aircraft: 'Cessna 172, PA 28, PA 34, DV 20, DA42', hours: '200 Hrs', duration: '12 Months' },
];

const locations = [
    { city: 'Cape Town', days: '300 Days', climate: 'Humid climate, good visibility', icon: '🏔️' },
    { city: 'Secunda', days: '280 Days', climate: 'Clear Skies, Good for VFR', icon: '🌾' },
    { city: 'Durban', days: '250 Days', climate: 'Sunny, Humid, Mild winters', icon: '🌊' },
    { city: 'Johannesburg', days: '320 Days', climate: 'Sunny, good year-round conditions', icon: '🏙️' },
];

const fleet = [
    { name: 'Cessna 172', use: 'Single-engine four-seat trainer and cross-country aircraft, ideal for PPL training, night flying, and navigation practice.' },
    { name: 'Cessna 152', use: 'Light, two-seat trainer aircraft for initial flight training and first solo hours. Helps students build confidence in basic aircraft handling.' },
    { name: 'Cessna 150', use: 'A classic two-seat trainer used for initial flight training and circuit practice, perfect for mastering basic manoeuvres, take-offs, and landings.' },
    { name: 'PA-34 Seneca', use: 'Twin-engine trainer for IFR and advanced flight training. Students learn complex aircraft handling and multi-engine operations.' },
    { name: 'Piper Archer', use: 'A reliable four-seat trainer with modern avionics, ideal for PPL and CPL training. Known for stable handling and performance for navigation and instrument flying.' },
    { name: 'Diamond DA42', use: 'Used for advanced multi-engine and instrument training with modern avionics and high performance, preparing students for airline-level proficiency.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SouthAfricaPilotTrainingPage() {
    return (
        <Layout
            title="Commercial Pilot Training in South Africa – SACAA CPL with MEIR | AviationGuide"
            description="Explore Commercial Pilot Training in South Africa with SACAA-approved FTOs, 200-210 flight hours, CPL-MEIR program, and easy DGCA conversion. Cost-effective training with 300+ flying days."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">SACAA Approved Training</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot Training in South Africa
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        Specifically designed for aspiring pilots from India — SACAA-approved training from PPL to CPL, Multi Engine Rating, and Instrument Rating at leading South African flight schools with internationally recognised standards.
                    </p>
                    <p className="text-white/60 max-w-xl mx-auto text-sm mb-6">A SACAA CPL valid for DGCA conversion — opening a lucrative career in aviation.</p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Program Offered</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">CPL with MEIR + Instructor Rating (CFI)</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Let's explore the training structure, eligibility, stages, and why South Africa is the right choice for your pilot career.
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

            {/* ── Why South Africa ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Why South Africa?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why Choose South Africa for Pilot Training?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            South Africa offers <strong>cost-effective, world-class training with SACAA certification</strong> and excellent flying conditions year-round. With 300+ flying days and diverse terrain, it is one of the best international destinations for commercial pilot training.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            The <strong>SACAA CPL with MEIR</strong> is internationally recognised and can be converted to a DGCA CPL, giving Indian students a clear and efficient pathway to an airline career back home.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="font-montserrat font-bold text-av-orange mb-1">Program Highlight</p>
                            <p className="text-white text-lg font-semibold">SACAA CPL-MEIR + CFI Rating — DGCA Convertible</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">Course Overview at a Glance</h3>
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
                            Check if you meet the requirements to begin your pilot training journey in South Africa.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '🎂', title: 'Age', desc: 'Minimum 17 years to begin pilot training and 18 years for a Commercial Pilot License.' },
                            { icon: '📚', title: 'Education', desc: '10+2 with Physics & Math or equivalent is required. Non-science students can qualify via NIOS.' },
                            { icon: '🏥', title: 'Medical', desc: 'Must hold an SACAA Class 1 Medical and DGCA Class 1 Medical Certificate to qualify for Commercial Pilot Training.' },
                            { icon: '🛂', title: 'Visa', desc: 'South African Study Visa — which requires medicals for application — allowing full-time flight training in South Africa.' },
                            { icon: '🗣️', title: 'English (ELP)', desc: 'English Language Proficiency (ELP) assessment with the Chief Flying Instructor is required before commencing flight operations.' },
                            { icon: '✅', title: 'Overall', desc: 'Meet all criteria above and you are ready to begin your SACAA CPL training at a recognised South African flight school.' },
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
                            Benefits of Training <span className="text-av-orange">in South Africa</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            South Africa's SACAA-approved training ecosystem combines excellent flying conditions, modern fleets, and cost-effective fees. Here's what makes it stand out:
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

            {/* ── Training Stages ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Training Stages</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Flight Training <span className="text-av-orange">Stages & Progression</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Structured progression from PPL to CPL with Night Rating, Instrument Rating, and Multi-Engine.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainingStages.map((stage, i) => (
                            <ScrollReveal key={stage.code} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col hover:border-av-orange/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                            {stage.num}
                                        </div>
                                        <span className="font-montserrat font-black text-av-orange text-base leading-tight">{stage.code}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-sm mb-3">{stage.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-av-light text-av-blue text-xs font-semibold px-3 py-1 rounded-full border border-av-sky/20">{stage.duration}</span>
                                        <span className="bg-av-orange/10 text-av-orange text-xs font-semibold px-3 py-1 rounded-full">{stage.hours}</span>
                                    </div>
                                    <ul className="flex-grow space-y-2">
                                        {stage.focus.map(f => (
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
                            Your Journey to <span className="text-av-orange">Pilot Training in South Africa</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Follow these steps to begin your pilot training journey in South Africa.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        {trainingSteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 60}>
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
                                A 10-step structured path to your <span className="text-av-orange">SACAA CPL with MEIR — and seamless DGCA conversion back in India.</span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Pilot Academies ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Pilot Academies</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Pilot Academies <span className="text-av-orange">in South Africa</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            SACAA-approved flying schools with modern fleets and experienced instructors.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schools.map((school, i) => (
                            <ScrollReveal key={school.name} delay={i * 80}>
                                <div className={`rounded-2xl p-7 h-full flex flex-col ${i === 1 || i === 4 ? 'bg-av-blue' : 'bg-white border border-gray-100 shadow-sm card-hover hover:border-av-orange/30'}`}>
                                    <div className="text-4xl mb-4">🏫</div>
                                    <h3 className={`font-montserrat font-bold text-xl mb-1 ${i === 1 || i === 4 ? 'text-white' : 'text-av-blue'}`}>{school.name}</h3>
                                    <p className="text-av-orange text-sm font-semibold mb-4">{school.location}</p>
                                    <div className="space-y-2 flex-grow mb-6">
                                        {[
                                            { label: 'Duration', val: school.duration },
                                            { label: 'Fleet Size', val: school.fleet },
                                            { label: 'Aircraft', val: school.aircraft },
                                            { label: 'Flying Hours', val: school.hours },
                                        ].map(item => (
                                            <div key={item.label} className={`flex justify-between text-xs py-1.5 border-b ${i === 1 || i === 4 ? 'border-white/10' : 'border-gray-100'}`}>
                                                <span className={i === 1 || i === 4 ? 'text-white/60' : 'text-gray-400'}>{item.label}</span>
                                                <span className={`font-semibold ${i === 1 || i === 4 ? 'text-white' : 'text-av-blue'}`}>{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/contact" className={`inline-block text-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${i === 1 || i === 4 ? 'bg-av-orange text-white hover:bg-white hover:text-av-blue' : 'bg-av-blue text-white hover:bg-av-orange'}`}>
                                        Know More →
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Locations ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Locations</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Popular Pilot Training <span className="text-av-orange">Locations in South Africa</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Choose from locations offering excellent weather conditions and diverse flying environments.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {locations.map((loc, i) => (
                            <ScrollReveal key={loc.city} delay={i * 80}>
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
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Aircraft Fleet</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Types of Fleet for <span className="text-av-orange">Flight Training in South Africa</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Train on modern, well-maintained aircraft with experienced instructors.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fleet.map((aircraft, i) => (
                            <ScrollReveal key={aircraft.name} delay={i * 80}>
                                <div className={`rounded-2xl p-7 h-full flex flex-col ${i === 1 ? 'bg-av-blue' : 'bg-white border border-gray-100 shadow-sm card-hover hover:border-av-orange/30'}`}>
                                    <div className="text-4xl mb-4">✈️</div>
                                    <h3 className={`font-montserrat font-bold text-xl mb-3 ${i === 1 ? 'text-white' : 'text-av-blue'}`}>{aircraft.name}</h3>
                                    <p className={`text-sm leading-relaxed flex-grow ${i === 1 ? 'text-white/70' : 'text-gray-500'}`}>{aircraft.use}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Licence & Recognition ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Licence & Recognition</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Licence and <span className="text-av-orange">Recognition</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">🏅</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Globally Recognised Schools</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Training is provided by globally recognised flight schools in South Africa, offering advanced training in varying weather conditions and modern aircraft that adhere to both SACAA and DGCA requirements.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">☀️</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Excellent Flying Conditions</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    With favourable flying conditions throughout the year, students acquire strong flying skills and confidence across diverse environments — building the competence needed to become successful commercial pilots.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-7 h-full">
                                <div className="text-4xl mb-4">🔄</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">DGCA Conversion Ready</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    The SACAA CPL with MEIR is structured to enable students to convert their licence to a DGCA CPL upon returning to India, opening up airline career opportunities in India and across the world.
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
                        <div className="section-tag">Any Query About Pilot Training</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Start Your <span className="text-av-orange">Pilot Training in South Africa?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Our aviation career counsellors will guide you through DGCA medicals, SACAA school selection, visa application, and everything you need to become a licensed commercial pilot.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Talk to a Counsellor →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}