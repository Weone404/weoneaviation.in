import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'Air Navigation', highlight: 'All Details 2025', sub: "Master Air Navigation for DGCA CPL & PPL exams — expert-led classes in Delhi" },
];

const navigationTypes = [
    { icon: '👁️', title: 'Visual Navigation (Pilotage)', desc: 'Navigating by visual reference to landmarks on the ground.' },
    { icon: '✏️', title: 'Dead Reckoning (DR)', desc: 'Calculating current position based on a known past position, speed, heading, and elapsed time.' },
    { icon: '📡', title: 'Radio Navigation (VOR, ADF, DME)', desc: 'Using ground-based radio navigation aids to determine position and track.' },
    { icon: '🛰️', title: 'GPS Navigation and Satellite Systems', desc: 'Using satellite-based positioning systems for accurate en-route and approach navigation.' },
    { icon: '🗺️', title: 'RNAV (Area Navigation)', desc: 'Allowing aircraft to fly on any desired flight path within coverage of ground-based aids or satellites.' },
    { icon: '🖥️', title: 'Flight Management Systems (FMS)', desc: 'Automated navigation systems that manage the complete flight plan from takeoff to landing.' },
];

const courseFeatures = [
    { feature: 'Expert Trainers', detail: 'DGCA-certified instructors with airline experience' },
    { feature: 'Full DGCA Syllabus Coverage', detail: 'From Time/Distance/Speed formulas to Radio Aids' },
    { feature: 'Live Flight Planning', detail: 'With actual VFR/IFR charts, NOT just theory' },
    { feature: 'Simulator Sessions', detail: 'Practice navigation scenarios and in-flight re-routing' },
    { feature: 'Notes & Question Bank', detail: 'Includes DGCA pattern questions & mock tests' },
    { feature: 'Guaranteed Results', detail: 'High success rate in DGCA Navigation Paper' },
];

const modules = [
    { num: '01', title: 'Introduction to Navigation', topics: 'Great Circle, Rhumb Line, Air Position, Fixes' },
    { num: '02', title: 'Time & Direction Calculations', topics: 'UTC, LMT, ZT, Magnetic/True bearings' },
    { num: '03', title: 'Map Reading & Charts', topics: 'Mercator and Lambert charts, VFR/IFR chart usage' },
    { num: '04', title: 'Dead Reckoning (DR) Navigation', topics: 'Wind triangle, Groundspeed, True Airspeed, ETA' },
    { num: '05', title: 'Radio Navigation Aids', topics: 'VOR, ADF, DME, ILS, MLS — real-time plotting' },
    { num: '06', title: 'GPS & RNAV Techniques', topics: 'Satellite Navigation, WAAS, RAIM, RNP concepts' },
    { num: '07', title: 'Flight Planning Techniques', topics: 'Alternate airports, Notams, Met conditions, Airspace classifications' },
];

const whatYouLearn = [
    'How to read aeronautical maps',
    'How to measure direction and distance',
    'How to plan a flight and estimate time',
    'How to use navigation tools like VOR, ADF, DME, and GPS',
    'How to communicate position with Air Traffic Control (ATC)',
    'How to stay on course even in poor visibility',
];

const whoCanEnroll = [
    { icon: '✈️', title: 'CPL Students', desc: 'Preparing for Navigation Paper (Paper 2) of DGCA exams.' },
    { icon: '🛩️', title: 'PPL Students', desc: 'Wanting accurate flight planning skills for real-world flying.' },
    { icon: '🏫', title: 'Flying School Cadets', desc: 'Under DGCA syllabus at any approved flying school.' },
    { icon: '🏆', title: 'ATPL / Airline-Bound Candidates', desc: 'Aspiring ATPL or airline-bound candidates wanting advanced navigation skills.' },
];

const careerBenefits = [
    'Clear DGCA exam with confidence',
    'Excel in airline interviews & simulator tests',
    'Ability to navigate in low visibility or emergencies',
    'Higher confidence in solo and cross-country flying',
    'Readiness for international aviation standards (ICAO)',
];

export default function AirNavigation() {
    return (
        <Layout title="Air Navigation Course — DGCA CPL/PPL | WeOne Aviation Academy 2025" description="Best Air Navigation course in India for DGCA CPL & PPL exams. DGCA-approved training in Delhi with expert instructors, live flight planning, simulator sessions and full syllabus coverage.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Air Navigation — All Details 2025
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Looking for the best Air Navigation course in India? Whether you're preparing for your <span className="font-semibold text-av-blue">Commercial Pilot License (CPL)</span> or <span className="font-semibold text-av-blue">Private Pilot License (PPL)</span>, mastering Air Navigation is essential for every <span className="font-semibold text-av-blue">pilot</span>'s success in both DGCA exams and real-world flying.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                At We One Aviation Academy, we offer comprehensive, practical, DGCA-approved Air Navigation training in Delhi. We combine real-time navigation tools, expert faculty, and hands-on practice that goes beyond the textbook.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['Paper 2', 'DGCA Exam'], ['CPL / PPL', 'Eligibility'], ['Delhi', 'Location'], ['100%', 'Pass Rate']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is Air Navigation */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is Air Navigation?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Air Navigation is the process of determining your position, deciding where you want to go, and safely guiding the aircraft there. You'll learn to use maps, measure distances, correct for wind, and utilize navigation tools such as GPS, VORs, and compasses.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Whether flying by day or night, in clear skies or clouds, good navigation keeps you on track and safe.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Air Navigation is the process of determining the position, planning the route, and guiding the aircraft from one point to another safely and efficiently. It involves:
                            </p>
                            <div className="space-y-3 mb-10">
                                {navigationTypes.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Why Our Course Stands Out */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Why Our Air Navigation Course Stands Out</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Here's what makes We One Aviation the preferred choice for air navigation training in India:
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">Feature</th>
                                            <th className="p-3 text-left text-xs font-semibold">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseFeatures.map((row, i) => (
                                            <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-av-blue font-semibold text-xs">{row.feature}</td>
                                                <td className="p-3 text-gray-600 text-xs">{row.detail}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Topics Covered */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Topics Covered in Air Navigation Course</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                We cover the full <span className="font-semibold text-av-blue">DGCA</span> Navigation syllabus in a practical, simplified way:
                            </p>
                            <p className="text-gray-600 text-sm font-semibold mb-5">Module-Wise Breakdown:</p>
                            <div className="space-y-4 mb-10">
                                {modules.map((m) => (
                                    <div key={m.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{m.num}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{m.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs">{m.topics}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* What You Will Learn */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">What You Will Learn in Our Air Navigation Course</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Our course covers both the basics and advanced parts of navigation, including:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {whatYouLearn.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Who Can Enroll */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Who Can Enroll in Air Navigation Course?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">Perfect for:</p>
                            <div className="space-y-3 mb-10">
                                {whoCanEnroll.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Career Benefits */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Career Benefits After Navigation Training</h3>
                            <ul className="space-y-2 mb-10">
                                {careerBenefits.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Join Air Navigation Classes Now</h3>
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
                            <LeadForm title="Join Air Navigation Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Who Can Enroll</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ CPL students (Navigation Paper 2)</li>
                                    <li>✓ PPL students</li>
                                    <li>✓ Flying school cadets</li>
                                    <li>✓ ATPL / airline-bound candidates</li>
                                    <li>✓ 10+2 with Physics & Maths</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Full DGCA Navigation Syllabus:</p>
                                <div className="text-2xl font-montserrat font-black">7 Modules</div>
                                <div className="text-white/70 text-xs mt-1">VFR/IFR Charts + Simulator</div>
                                <div className="text-white/70 text-xs mt-1">DGCA Mock Tests Included</div>
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