import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '1971', label: 'Founded', icon: '🏛️' },
    { num: 'New Delhi', label: 'Headquarters', icon: '📍' },
    { num: 'dgca.gov.in', label: 'Official Website', icon: '🌐' },
    { num: 'MoCA', label: 'Works Under', icon: '✈️' },
];

const quickDetails = [
    { sr: 1, topic: 'Full Form', details: 'Directorate General of Civil Aviation' },
    { sr: 2, topic: 'Works Under', details: 'Ministry of Civil Aviation, Govt. of India' },
    { sr: 3, topic: 'Established In', details: '1971' },
    { sr: 4, topic: 'Headquarters', details: 'New Delhi (near Safdarjung Airport)' },
    { sr: 5, topic: 'Major Functions', details: 'Licensing, Certification, Regulations, Safety Oversight' },
    { sr: 6, topic: 'Official Website', details: 'dgca.gov.in' },
];

const functions = [
    {
        num: '1',
        icon: '🪪',
        title: 'Issuing Pilot Licenses',
        desc: "If Your Dream To Become a Pilot Then You Need a License of Commercial Pilot License, Private Pilot License And Without Approval of DGCA, you Can't Take These License. So Becoming a Pilot, You Have To Take All these License From Supreme of Aviation – DGCA. In fact, All pilot licenses in India — like CPL (Commercial Pilot License) or PPL (Private Pilot License), SPL (Student Pilot License), ATPL (Airline Transport Pilot License) — are issued by DGCA after exams and flying hour requirements are fulfilled.",
    },
    {
        num: '2',
        icon: '✈️',
        title: 'Aircraft Certification',
        desc: 'Before any airplane can fly in India, DGCA checks it to make sure everything is working properly And New Model Plane. They only allow the plane to fly if it is safe, New and ready to go.',
    },
    {
        num: '3',
        icon: '🏫',
        title: 'Monitoring Aviation Institutes',
        desc: 'No Any Aviation Academy Will Run Without the Permission Of DGCA – They Must Have Meet All The Eligibility Criteria That Given By DGCA. They Should Have DGCA Approved Instructors, training and aircraft meet national and international standards.',
    },
    {
        num: '4',
        icon: '🛡️',
        title: 'Ensuring Safety Standards',
        desc: 'DGCA sets the rules that airlines must follow. This includes safety protocols, maintenance checks, operational guidelines, and even how crew members are trained.',
    },
    {
        num: '5',
        icon: '📋',
        title: 'Handling Passenger Complaints',
        desc: "Believe it or not, if you've ever had a complaint about a flight delay or airline service, DGCA is the body that can hold the airline accountable.",
    },
    {
        num: '6',
        icon: '🔍',
        title: 'Investigating Incidents',
        desc: "In the rare case of a flight incident or emergency, DGCA steps in to investigate. They don't just look at what went wrong — they make sure it doesn't happen again.",
    },
];

const pilotJourneySteps = [
    { step: '01', title: 'Get Admission', desc: 'Get admission to a DGCA-approved flying school' },
    { step: '02', title: 'Medical Tests', desc: 'Pass Class 2 and Class 1 medical tests (as per DGCA norms)' },
    { step: '03', title: 'Clear DGCA Exams', desc: 'Clear DGCA exams (Air Navigation, Meteorology, Regulations, etc.)' },
    { step: '04', title: 'Log Flying Hours', desc: 'Log the minimum flying hours (typically 200 hours for CPL)' },
    { step: '05', title: 'Receive License', desc: 'Finally, receive your license from DGCA' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DGCAPage() {
    return (
        <Layout
            title="DGCA Full Form – What is DGCA in Aviation? | Directorate General of Civil Aviation"
            description="DGCA Full Form is Directorate General of Civil Aviation. Learn what DGCA does, its role in pilot licensing, aircraft certification, safety standards, and why it matters for India's aviation industry."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Aviation Authority</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        DGCA Full Form – What is DGCA in Aviation?
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        When You Will Take Flight Then Ever You Thinks Who is Behind The Flight safety, Rules and Operation In The skies? All Of These Operation, There is a Government organization Which Is DGCA.
                    </p>
                    <p className="text-white/60 max-w-xl mx-auto text-sm mb-6">Lets Start With Basic.</p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">The DGCA Full Form is</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">Directorate General of Civil Aviation</p>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed mt-4">
                        Lets Understand That What is DGCA and What is Their Role, Its Importance and Why its Matter The Most For India's aviation industry.
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

            {/* ── What is DGCA ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">About DGCA</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            What is DGCA?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            In simple terms, <strong>DGCA is the top regulatory authority for civil aviation in India.</strong> It operates under the Ministry of Civil Aviation and ensures that flying in India is safe, structured, and follows international norms.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Founded back in <strong>1971</strong>, DGCA has played a critical role in growing Indian aviation — from approving flying schools to making sure your plane is safe to fly before takeoff.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-5 text-white">
                            <p className="font-montserrat font-bold text-av-orange mb-1">DGCA Full Form in Aviation</p>
                            <p className="text-white text-lg font-semibold">Directorate General Of Civil Aviation</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">All Details in Short About DGCA</h3>
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

            {/* ── What Does DGCA Do ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Functions</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What Does <span className="text-av-orange">DGCA Do?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            You might be surprised to know that DGCA is involved in almost every aspect of flying — not just what happens in the cockpit. Let's break down their main functions:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {functions.map((fn, i) => (
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

            {/* ── Where is DGCA Located ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Location</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Where is <span className="text-av-orange">DGCA Located?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Headquarters</h3>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    DGCA's headquarters is located in <strong className="text-av-orange">New Delhi</strong>, just across from Safdarjung Airport — one of India's historic aviation sites.
                                </p>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <p className="text-av-orange font-semibold text-sm">Near Safdarjung Airport</p>
                                    <p className="text-white/60 text-xs mt-1">New Delhi, India</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <div className="text-4xl mb-4">🏢</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-3">Regional Offices</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    Moreover, it operates regional offices in major cities to keep local aviation activities in check.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Mumbai', 'Kolkata', 'Chennai', 'Hyderabad'].map(city => (
                                        <div key={city} className="flex items-center gap-2 bg-av-light rounded-lg px-4 py-3 border border-av-sky/20">
                                            <span className="text-av-orange">📍</span>
                                            <span className="font-semibold text-av-blue text-sm">{city}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── DGCA's Role in a Pilot's Career ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Pilot Career</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            DGCA's Role in a <span className="text-av-orange">Pilot's Career</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            If you're planning to become a pilot, you'll be dealing with DGCA from day one. Here's a quick overview of what your journey would look like:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        {pilotJourneySteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 100}>
                                <div className="glass rounded-2xl p-5 text-center h-full flex flex-col items-center">
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
                                In other words, <span className="text-av-orange">no DGCA = no legal pilot license in India.</span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Why DGCA is So Important ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Importance</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why DGCA is <span className="text-av-orange">So Important</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 card-hover hover:border-av-orange/30 h-full">
                                <div className="text-4xl mb-4">🏛️</div>
                                <h3 className="font-montserrat font-bold text-av-blue mb-3">More Than a Government Office</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    You might think of DGCA as just a government office — but its role is far more impactful. It doesn't just make rules; it makes sure everyone follows them to ensure your flight is safe every time you board an aircraft.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 card-hover hover:border-av-orange/30 h-full">
                                <div className="text-4xl mb-4">🌍</div>
                                <h3 className="font-montserrat font-bold text-av-blue mb-3">Aligned with ICAO Standards</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Additionally, DGCA works closely with <strong>ICAO (International Civil Aviation Organization)</strong> to make sure India stays aligned with global aviation standards.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-blue rounded-2xl shadow-sm p-7 h-full">
                                <div className="text-4xl mb-4">📈</div>
                                <h3 className="font-montserrat font-bold text-white mb-3">India's Fastest-Growing Aviation Market</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    This is especially important now, as <strong className="text-av-orange">India is becoming one of the world's fastest-growing aviation markets.</strong>
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
                            Want to Start Your <span className="text-av-orange">Pilot Training Journey?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Our aviation career counsellors will guide you through DGCA exams, medical tests, flying school selection, and everything you need to become a licensed pilot.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Contact Us →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}