import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'Technical General', highlight: 'All Details 2025', sub: 'The backbone of your pilot training — understand how your aircraft truly works' },
];

const topicSections = [
    {
        num: '1', title: 'Aircraft Structure and Materials',
        points: [
            'Fuselage, wings, tailplane, and landing gear.',
            'Types of materials used in aircraft construction (aluminium, composites, etc.)',
            'Load distribution and structural integrity',
        ],
    },
    {
        num: '2', title: 'Aerodynamics and Flight Controls',
        points: [
            'Lift, drag, thrust, and weight',
            'Stability and control',
            'Primary and secondary flight control systems',
        ],
    },
    {
        num: '3', title: 'Engines and Propulsion',
        points: [
            'Piston vs. Jet Engines',
            'Turboprop and turbojet functioning',
            'Engine cooling, lubrication, and ignition systems',
            'Propeller pitch and RPM control',
        ],
    },
    {
        num: '4', title: 'Aircraft Systems',
        points: [
            'Fuel systems and fuel management',
            'Hydraulic systems for brakes and landing gear',
            'Electrical systems and alternators',
            'Propeller pitch and RPM control systems',
        ],
    },
    {
        num: '5', title: 'Instruments and Avionics',
        points: [
            'Gyroscopic and pressure instruments',
            'Glass cockpits and digital displays',
            'Autopilot and flight management systems (FMS)',
        ],
    },
    {
        num: '6', title: 'Landing Gear and Brakes',
        points: [
            'Retractable vs. fixed gear',
            'Anti-skid systems',
            'Shock absorption and wheel types',
        ],
    },
    {
        num: '7', title: 'Fire Detection and Protection',
        points: [
            'Types of extinguishers used in aviation',
            'Fire zones and suppression systems',
            'Warning systems and emergency protocols',
        ],
    },
];

const whyCrucial = [
    { icon: '🎯', title: 'Enhanced Situational Awareness', desc: 'Know exactly what\'s happening when a system fails.' },
    { icon: '🧠', title: 'Smarter Decision-Making', desc: 'Respond to abnormal situations calmly and correctly.' },
    { icon: '📡', title: 'Better Communication', desc: 'Speak the language of engineers, ATC, and ground crew.' },
    { icon: '📝', title: 'Exam Readiness', desc: 'Essential for clearing the DGCA CPL/PPL exams with confidence.' },
];

const howWeTeach = [
    'Visual-based learning using aircraft models, system diagrams, and animations.',
    'Visits to real aircraft for practical exposure to components.',
    'Regular mock tests based on DGCA standards.',
    'Interactive whiteboard sessions & recorded lectures.',
    'Access to latest DGCA question bank.',
];

export default function TechnicalGeneral() {
    return (
        <Layout title="Technical General — DGCA CPL/PPL All Details 2025 | WeOne Aviation Academy" description="Complete guide to Technical General for DGCA CPL & PPL exams. Covers aircraft structure, aerodynamics, engines, systems, instruments, landing gear and fire protection at We One Aviation Academy.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Technical General All Details – 2025
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                At We One Aviation, the Technical General subject is the backbone of your pilot training journey. Whether you're preparing for a <span className="font-semibold text-av-blue">Commercial Pilot License (CPL)</span> or <span className="font-semibold text-av-blue">Private Pilot License (PPL)</span>, mastering Technical General ensures you're not just flying the aircraft — you're understanding how it works.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['CPL / PPL', 'Eligibility'], ['7 Modules', 'Topics Covered'], ['Core Subject', 'CPL Syllabus'], ['100%', 'Pass Rate']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What Is Technical General */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Is Technical General in Pilot Training?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Technical General covers the mechanical, structural, and system-related aspects of an aircraft. This subject is essential for understanding what makes an airplane fly, how its systems operate, and how pilots can troubleshoot or prevent mechanical failures in real-world flight situations.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                It bridges the gap between theory and practice, helping future pilots confidently operate, monitor, and respond to the aircraft's technical behavior.
                            </p>

                            {/* Key Topics */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Key Topics Covered in Technical General</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Here's a detailed breakdown of what students learn in this subject at We One Aviation:
                            </p>
                            <div className="space-y-4 mb-10">
                                {topicSections.map((section) => (
                                    <div key={section.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{section.num}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{section.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {section.points.map((pt) => (
                                                <div key={pt} className="flex items-start gap-2 text-gray-600 text-xs">
                                                    <span className="text-av-orange flex-shrink-0">▸</span>{pt}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Crucial */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Why Technical General is Crucial for Every Pilot</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Technical General forms the backbone of safe flight operations. Here's why every serious pilot must master this subject:
                            </p>
                            <div className="space-y-3 mb-10">
                                {whyCrucial.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* How We Teach */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">How We One Aviation Teaches It Better</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                At We One Aviation, we don't just teach Technical General — we bring it to life.
                            </p>
                            <ul className="space-y-2 mb-6">
                                {howWeTeach.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Whether you're aiming for your CPL, PPL, or ATPL in the future, our expert instructors will ensure your technical base is rock solid.
                            </p>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Join Technical General Classes</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    We One Aviation Academy is Delhi's most trusted name for DGCA Ground Classes. Join us and take the first step toward the skies! ✈️
                                </p>
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Book Free Counselling
                                </Link>
                            </div>

                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Join Technical General Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Key Topics</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ Aircraft Structure & Materials</li>
                                    <li>✓ Aerodynamics & Flight Controls</li>
                                    <li>✓ Engines & Propulsion</li>
                                    <li>✓ Aircraft Systems</li>
                                    <li>✓ Instruments & Avionics</li>
                                    <li>✓ Landing Gear & Brakes</li>
                                    <li>✓ Fire Detection & Protection</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Full DGCA Technical General Syllabus:</p>
                                <div className="text-2xl font-montserrat font-black">CPL / PPL</div>
                                <div className="text-white/70 text-xs mt-1">Aircraft Models & Diagrams</div>
                                <div className="text-white/70 text-xs mt-1">DGCA Question Bank Included</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Counselling
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
}