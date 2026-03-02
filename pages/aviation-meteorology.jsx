import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'Aviation', highlight: 'Meteorology', sub: 'Understanding Weather for Safe Flying — DGCA-approved training at We One Aviation Academy' },
];

const meteorologyTopics = [
    { topic: 'Atmosphere', learn: 'Layers, temperature, pressure, density' },
    { topic: 'Winds & Jet Streams', learn: 'Surface winds, upper winds, wind shear' },
    { topic: 'Clouds & Rain', learn: 'Cloud types, fog, thunderstorms, rainfall' },
    { topic: 'Pressure Systems', learn: 'High/Low pressure, isobars, weather maps' },
    { topic: 'Temperature', learn: 'Lapse rates, inversion, air masses' },
    { topic: 'Icing & Turbulence', learn: 'Causes, types, avoidance' },
    { topic: 'Visibility & Fog', learn: 'Radiation fog, advection fog, low vis ops' },
    { topic: 'METAR & TAF', learn: 'Decoding aviation weather reports' },
    { topic: 'Weather Charts', learn: 'Synoptic charts, SIGMETs, wind charts' },
];

const helpsPilots = [
    'Plan safe routes',
    'Avoid turbulence, storms, and poor visibility',
    'Understand weather charts and METAR/TAF reports',
    'Make decisions during emergency weather situations',
];

const whyWeatherImportant = [
    'Safer flight operations',
    'Smoother journeys for passengers',
    'Better fuel and time planning',
    'Faster and smarter decision-making',
];

const whoShouldTake = [
    { icon: '✈️', title: 'CPL (Commercial Pilot License) Students', desc: 'Preparing for the DGCA Meteorology paper as part of their CPL ground school.' },
    { icon: '🛩️', title: 'PPL (Private Pilot License) Students', desc: 'Building essential weather knowledge for safe real-world flying.' },
    { icon: '📚', title: 'DGCA Ground School Learners', desc: 'Covering the full DGCA meteorology syllabus as part of their pilot training.' },
    { icon: '🏆', title: 'Airline Aspirants and Aviation Enthusiasts', desc: 'Anyone serious about flying professionally who needs in-depth weather knowledge.' },
];

const courseBenefits = [
    'Learn from experienced meteorology instructors',
    'Easy explanations using real-life aviation weather examples',
    'Focused on DGCA exam preparation',
    'Simulated weather briefings and report reading',
    'Certificate of Completion from We One Aviation Academy',
];

const courseDetails = [
    { label: 'Course Name', value: 'Aviation Meteorology' },
    { label: 'Duration', value: '2 to 4 weeks' },
    { label: 'Mode', value: 'Classroom / Online / Hybrid' },
    { label: 'Location', value: 'Dwarka Sector-7, Delhi' },
    { label: 'Website', value: 'www.weoneaviation.in' },
];

export default function AviationMeteorology() {
    return (
        <Layout title="Aviation Meteorology Course — DGCA CPL/PPL | WeOne Aviation Academy" description="DGCA-approved Aviation Meteorology course in Delhi. Learn weather patterns, METAR/TAF decoding, wind systems, turbulence and more for CPL & PPL exams at We One Aviation Academy.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Aviation Meteorology – Understanding Weather for Safe Flying
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                At We One Aviation Academy, our Aviation Meteorology course is specially designed to help students understand all types of weather conditions that affect flights — both on the ground and in the sky.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                Flying isn't just about handling the aircraft — it's about understanding the weather too. That's where aviation meteorology comes in. Whether you're training to become a pilot or already one, learning how weather works is essential for safe, informed flying.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['2–4 Weeks', 'Duration'], ['CPL / PPL', 'Eligibility'], ['Delhi', 'Location'], ['Online/Offline', 'Mode']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is Aviation Meteorology */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is Aviation Meteorology?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Aviation Meteorology is the study of weather and atmospheric conditions that impact aviation. It helps pilots:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {helpsPilots.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                In simple words, it's the science of flying with the weather — not against it.
                            </p>

                            {/* Why is Weather Training Important */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why is Weather Training Important for Pilots?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                As a <span className="font-semibold text-av-blue">Pilot</span>, you'll fly through different climates, seasons, and weather systems. Understanding weather means:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {whyWeatherImportant.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm font-semibold mb-10">Most importantly, it saves lives.</p>

                            {/* What You Will Learn */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">What Will You Learn in Our Aviation Meteorology Course?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Our course follows the full DGCA Meteorology syllabus and includes:
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">Topics</th>
                                            <th className="p-3 text-left text-xs font-semibold">What You'll Learn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meteorologyTopics.map((row, i) => (
                                            <tr key={row.topic} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-av-blue font-semibold text-xs">{row.topic}</td>
                                                <td className="p-3 text-gray-600 text-xs">{row.learn}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-500 text-xs mb-10">
                                Practical sessions with real-world weather maps, METAR decoding drills, and chart interpretation are included.
                            </p>

                            {/* Who Should Take */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Who Should Take This Course?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">This course is essential for:</p>
                            <div className="space-y-3 mb-4">
                                {whoShouldTake.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                If you're serious about flying professionally, meteorology for Pilots is not optional — it's essential.
                            </p>

                            {/* Benefits */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Benefits of Our Aviation Meteorology Course</h3>
                            <ul className="space-y-2 mb-10">
                                {courseBenefits.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Course Details */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Course Details</h3>
                            <div className="rounded-xl border border-gray-200 overflow-hidden mb-10">
                                {courseDetails.map((row, i) => (
                                    <div key={row.label} className={`flex gap-4 p-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <span className="font-semibold text-av-blue w-32 flex-shrink-0">{row.label}</span>
                                        <span className="text-gray-600">{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Enroll in Aviation Meteorology Now</h3>
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
                            <LeadForm title="Join Meteorology Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Who Should Enroll</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ CPL students</li>
                                    <li>✓ PPL students</li>
                                    <li>✓ DGCA ground school learners</li>
                                    <li>✓ Airline aspirants</li>
                                    <li>✓ Aviation enthusiasts</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Full DGCA Meteorology Syllabus:</p>
                                <div className="text-2xl font-montserrat font-black">2–4 Weeks</div>
                                <div className="text-white/70 text-xs mt-1">Classroom / Online / Hybrid</div>
                                <div className="text-white/70 text-xs mt-1">METAR & TAF Decoding Included</div>
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