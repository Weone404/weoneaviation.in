import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '14-16 Months', label: 'Course Duration', icon: '📅' },
    { num: '200 Hrs', label: 'Flying Hours', icon: '✈️' },
    { num: '₹58-60 Lakhs', label: 'Course Fee', icon: '💰' },
    { num: 'DGCA', label: 'Certification', icon: '🏅' },
];

const quickDetails = [
    { sr: 1, topic: 'Program', details: 'CPL with Multi Engine Instrument Rating (CPL-MEIR)' },
    { sr: 2, topic: 'Duration', details: '14–16 Months' },
    { sr: 3, topic: 'Flying Hours', details: '200 Hours (SPL to CPL including IR and Multi-Engine)' },
    { sr: 4, topic: 'Course Fee', details: 'INR 58 Lakhs – 60 Lakhs' },
    { sr: 5, topic: 'Eligibility', details: '17+ years, 10+2 (Physics & Math), DGCA Class 1 Medical' },
    { sr: 6, topic: 'Certification', details: 'DGCA Commercial Pilot Licence (CPL)' },
];

const advantages = [
    {
        num: '1',
        icon: '🏅',
        title: 'DGCA Training',
        desc: 'Training is fully aligned with Indian aviation standards and DGCA regulations. The DGCA CPL is recognised for both domestic airline careers and international licence conversions.',
    },
    {
        num: '2',
        icon: '🛩️',
        title: 'Modern Fleet',
        desc: 'Train on Cessna 172, Tecnam, Piper Archer, and Diamond aircraft with advanced avionics. India\'s DGCA-approved FTOs operate modern, well-maintained fleets designed for thorough pilot development.',
    },
    {
        num: '3',
        icon: '☀️',
        title: '300+ Flying Days',
        desc: 'Key training locations like Rajasthan (320+ days), Gujarat (300+ days), and Maharashtra (270+ days) offer excellent flying conditions and diverse terrain for real-world exposure.',
    },
    {
        num: '4',
        icon: '🏠',
        title: 'Close to Home',
        desc: 'Quality training facilities are available across India, allowing you to train in familiar surroundings without the added complexity and costs of relocating internationally.',
    },
    {
        num: '5',
        icon: '👨‍✈️',
        title: 'Experienced Instructors',
        desc: 'India\'s DGCA-approved FTOs employ experienced instructors with strong backgrounds in commercial aviation. Their guidance ensures you build the right skills and confidence from day one.',
    },
    {
        num: '6',
        icon: '🔄',
        title: 'Seamless Licence Readiness',
        desc: 'The DGCA CPL directly qualifies graduates for airline recruitment in India. The training is designed to meet national aviation standards, providing students with quality knowledge and airline readiness.',
    },
];

const trainingStages = [
    {
        num: '1',
        code: 'Theory',
        title: 'DGCA Theory Ground Class',
        duration: '3–4 Months',
        hours: 'N/A',
        focus: ['Air Navigation', 'Air Meteorology', 'Air Regulations', 'Technical General', 'Technical Specific'],
    },
    {
        num: '2',
        code: 'SPL',
        title: 'SPL + Oral Exam',
        duration: '1–2 Months',
        hours: '0 Hrs',
        focus: ['Radio Telephony (RT) Basics', 'Pre-Flight Briefings & Safety Checks', 'Oral Exam Preparation'],
    },
    {
        num: '3',
        code: 'Solo',
        title: 'Solo Flight Training',
        duration: '2 Months',
        hours: '15–20 Hrs',
        focus: ['Circuit flying', 'Take-offs and landings', 'Basic manoeuvres', 'Radio communication practice', 'Emergency procedures'],
    },
    {
        num: '4',
        code: 'CPL',
        title: 'Hour Building + Checks',
        duration: '6 Months',
        hours: '20–185 Hrs',
        focus: ['Cross-country flights', 'Navigation exercises', 'Instrument flying', 'Flight planning', 'Progress checks with CFI'],
    },
    {
        num: '5',
        code: 'MEIR',
        title: 'Multi-Engine Rating + Checks',
        duration: '2 Months',
        hours: '185–200 Hrs',
        focus: ['Asymmetric flight handling', 'Engine failure drills', 'Multi-engine instrument flying', 'Emergency procedures', 'DGCA skill test and endorsement'],
    },
];

const trainingSteps = [
    { step: '01', title: 'Medicals', desc: 'Obtain a valid DGCA Class 1 Medical from an authorised AME to confirm fitness for professional flying.' },
    { step: '02', title: 'DGCA Theory Class', desc: 'Attend DGCA-prescribed ground school covering Air Regulations, Navigation, Meteorology, Technical Subjects and Human Performance.' },
    { step: '03', title: 'DGCA Theory Exam', desc: 'Sit the DGCA written papers and clear the required theory exams to progress to practical training stages.' },
    { step: '04', title: 'RTR (Radio Telephony)', desc: 'Complete the RTR/RT licence course and exam to obtain mandatory aviation radio telephony endorsement.' },
    { step: '05', title: 'Choose Flight School', desc: 'Select a DGCA-approved FTO based on fleet, instructor experience, placement outcomes and student support services.' },
    { step: '06', title: 'SPL', desc: 'Apply for and obtain your Student Pilot Licence after initial training and checks — this authorises supervised solo flying.' },
    { step: '07', title: 'FRTOL', desc: 'Obtain the Flight Radio Telephony Operator\'s Licence from WPC after passing the RTR exam, authorising aircraft radio operation.' },
    { step: '08', title: 'Flight Training', desc: 'Complete structured practical training from PPL through hour-building to CPL (including IR/ME), with regular checks and final DGCA skill tests.' },
];

const locations = [
    { city: 'Maharashtra', days: '270+ Days', climate: 'Tropical & humid', icon: '🌊' },
    { city: 'Gujarat', days: '300+ Days', climate: 'Dry & clear', icon: '☀️' },
    { city: 'Rajasthan', days: '320+ Days', climate: 'Arid & sunny', icon: '🏜️' },
];

const fleet = [
    { name: 'Cessna 172', use: 'Single-engine four-seat trainer and cross-country aircraft, ideal for PPL training, night flying, and navigation practice. Perfect for students to gain real flight experience.' },
    { name: 'Tecnam (ME)', use: 'A modern twin-engine trainer used for Multi-Engine Rating and Instrument flight training, offering advanced avionics and an ideal platform for transitioning to complex aircraft operations.' },
    { name: 'Piper Archer', use: 'A reliable four-seat trainer equipped with modern avionics, ideal for PPL and CPL training. Known for its stable handling and performance for navigation, cross-country, and instrument flying.' },
    { name: 'Tecnam P-Mentor', use: 'A next-generation training aircraft featuring advanced glass cockpit avionics, ideal for ab-initio to CPL training. Efficient, safe, and designed for modern flight training.' },
    { name: 'Diamond DA42', use: 'Used for advanced multi-engine and instrument training. The DA42 features modern avionics and high performance, preparing students for complex flight operations and airline-level proficiency.' },
];

const schools = [
    { name: 'Flying School 01', location: 'Maharashtra, India', fleet: '17 Aircrafts', aircraft: 'Cessna 172, Tecnam (ME), Piper Archer', hours: '200 Hrs' },
    { name: 'Flying School 02', location: 'Gujarat, India', fleet: '10 Aircrafts', aircraft: 'Tecnam P-Mentor', hours: '200 Hrs' },
    { name: 'Flying School 03', location: 'Rajasthan / Gujarat, India', fleet: '18 Aircrafts', aircraft: 'Cessna 172, Diamond (DA42)', hours: '200 Hrs' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IndiaPilotTrainingPage() {
    return (
        <Layout
            title="Commercial Pilot Training in India – DGCA CPL with MEIR | AviationGuide"
            description="Explore Commercial Pilot Training in India with DGCA-approved FTOs, 200 flight hours, CPL-MEIR program, and a step-by-step guide to your pilot licence. Train close to home on modern aircraft."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">DGCA Approved Training</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot Training in India
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        The aviation industry in India is expanding at a rapid rate, providing aspiring pilots with a solid platform through DGCA flight schools and the Commercial Pilot Training course.
                    </p>
                    <p className="text-white/60 max-w-xl mx-auto text-sm mb-6">With modern aircraft and training equipment, India is an excellent place to start your flying journey.</p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Program Offered</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">CPL with Multi Engine Instrument Rating</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Let's explore the training structure, eligibility, stages, and why India is the right choice for your pilot career.
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

            {/* ── Why India ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Why India?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Why Choose India for Pilot Training?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            India offers <strong>globally recognised DGCA licences</strong> with a solid pathway to both domestic and international aviation careers. Training at home means lower overall costs, no visa complexity, and a familiar environment.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            With <strong>300+ flying days</strong> across major bases, modern fleets, and DGCA-approved FTOs, India provides everything you need to build a strong foundation as a commercial pilot.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="font-montserrat font-bold text-av-orange mb-1">Program Highlight</p>
                            <p className="text-white text-lg font-semibold">DGCA CPL + Multi-Engine Instrument Rating</p>
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
                            Check if you meet the requirements to begin your pilot training journey in India.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '🎂', title: 'Age', desc: 'Minimum 17 years to begin pilot training and 18 years for a Commercial Pilot License.' },
                            { icon: '📚', title: 'Education', desc: '10+2 with Physics & Math or equivalent is required. Non-science students can qualify via NIOS.' },
                            { icon: '🏥', title: 'Medical', desc: 'Must hold a valid DGCA Class 1 Medical Certificate issued by a DGCA medical examiner to ensure physical fitness for flying.' },
                            { icon: '🛂', title: 'Valid Passport', desc: 'A current passport is mandatory for identification and for students pursuing any part of their training abroad.' },
                            { icon: '📄', title: 'Police Clearance (PCC)', desc: 'A valid Police Clearance Certificate (PCC), valid for 6 months, is required to begin flight training at any Indian FTO.' },
                            { icon: '✅', title: 'Overall', desc: 'Meet all criteria above and you are ready to begin your CPL training journey at a DGCA-approved Flying Training Organization in India.' },
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
                            Benefits of Training <span className="text-av-orange">in India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            India's DGCA-approved training ecosystem offers a comprehensive, cost-effective path to your commercial pilot licence. Here's what makes it stand out:
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
                            Structured training program from ground theory to multi-engine rating.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainingStages.map((stage, i) => (
                            <ScrollReveal key={stage.code} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col hover:border-av-orange/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                            {stage.num}
                                        </div>
                                        <span className="font-montserrat font-black text-av-orange text-lg">{stage.code}</span>
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
                            Your Journey to <span className="text-av-orange">Pilot Training in India</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Follow these steps to begin your pilot training journey in India.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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
                                An 8-step structured path to your <span className="text-av-orange">DGCA CPL with MEIR — ready for Indian airline careers.</span>
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
                            Pilot Academies <span className="text-av-orange">in India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            DGCA-approved flying schools with modern fleets and experienced instructors.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {schools.map((school, i) => (
                            <ScrollReveal key={school.name} delay={i * 100}>
                                <div className={`rounded-2xl p-7 h-full flex flex-col ${i === 1 ? 'bg-av-blue text-white' : 'bg-white border border-gray-100 shadow-sm card-hover hover:border-av-orange/30'}`}>
                                    <div className="text-4xl mb-4">🏫</div>
                                    <h3 className={`font-montserrat font-bold text-xl mb-1 ${i === 1 ? 'text-white' : 'text-av-blue'}`}>{school.name}</h3>
                                    <p className={`text-sm mb-4 font-semibold ${i === 1 ? 'text-av-orange' : 'text-av-orange'}`}>{school.location}</p>
                                    <div className="space-y-2 flex-grow mb-6">
                                        {[
                                            { label: 'Duration', val: '14–16 Months' },
                                            { label: 'Fleet Size', val: school.fleet },
                                            { label: 'Aircraft', val: school.aircraft },
                                            { label: 'Flying Hours', val: school.hours },
                                        ].map(item => (
                                            <div key={item.label} className={`flex justify-between text-xs py-1.5 border-b ${i === 1 ? 'border-white/10' : 'border-gray-100'}`}>
                                                <span className={i === 1 ? 'text-white/60' : 'text-gray-400'}>{item.label}</span>
                                                <span className={`font-semibold ${i === 1 ? 'text-white' : 'text-av-blue'}`}>{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/contact" className={`inline-block text-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${i === 1 ? 'bg-av-orange text-white hover:bg-white hover:text-av-blue' : 'bg-av-blue text-white hover:bg-av-orange'}`}>
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
                            Popular Pilot Training <span className="text-av-orange">Locations in India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Choose from locations offering excellent weather conditions and flying days.
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
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Aircraft Fleet</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Types of Fleet for <span className="text-av-orange">Flight Training in India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Train on modern, well-maintained aircraft with advanced avionics.
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
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">DGCA-Approved Training</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Training is conducted in DGCA-approved Flying Training Organizations where students receive intensive ground school alongside actual flying experience in different weather conditions.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="bg-white/10 rounded-2xl p-7 h-full border border-white/20">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Highest National Standards</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    The training is designed to meet the highest standards of national aviation regulations, providing students with quality knowledge and the proficiency required for a professional aviation career.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-7 h-full">
                                <div className="text-4xl mb-4">🌍</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Airline Career Ready</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Upon completing the program, students are awarded a DGCA-approved CPL, opening up opportunities for airline careers in India as well as the rest of the world.
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
                            Ready to Start Your <span className="text-av-orange">Pilot Training in India?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Our aviation career counsellors will guide you through DGCA medicals, theory exams, flying school selection, and everything you need to become a licensed commercial pilot in India.
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