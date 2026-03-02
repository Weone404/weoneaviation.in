import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'RTR (Aero)', highlight: 'Radio Telephony License', sub: 'The License Every Professional Pilot Needs — We One Aviation Academy' },
];

const whyMandatory = [
    'Know standard aviation phraseology',
    'Can handle radio failures or emergency calls',
    'Understand aircraft call signs, squawk codes, and radar vectors',
    'Communicate professionally with ATC in both normal and high-pressure scenarios',
];

const examParts = [
    { part: 'Part I', desc: 'Practical Communication Test (ATC simulation and phraseology usage)', mode: 'Oral' },
    { part: 'Part II', desc: 'Viva on rules, regulations, procedures, and emergency communication', mode: 'Oral' },
];

const syllabus = [
    'Standard phraseology used in Indian and international airspace',
    'VHF/UHF radio communication handling',
    'Emergency callouts (Mayday, Pan-Pan)',
    'Position reports, taxi clearances, and enroute communication',
    'Knowledge of ICAO Annex 10, Indian Telegraph Rules',
    'Meteorological terms and Q codes (QNH, QFE, QDM, etc.)',
    'Radio equipment handling, call signs, and procedures',
];

const howWeTeach = [
    'One-on-one mock viva sessions.',
    'Daily phraseology drills and script-based simulations.',
    'Group discussions for confidence building.',
    'Voice clarity training and callout practice.',
    'Access to past RTR questions and exam feedback.',
];

const whoNeeds = [
    { icon: '✈️', title: 'Commercial Pilot License (CPL) Applicants', desc: 'RTR is mandatory for all CPL candidates flying in Indian airspace.' },
    { icon: '🛩️', title: 'Private Pilots', desc: 'Intending to fly solo in controlled airspace across India.' },
    { icon: '🌍', title: 'Foreign License Holders', desc: 'Converting their CPL to India must clear RTR as part of the process.' },
    { icon: '🎓', title: 'Flight Instructors and Cadet Pilots', desc: 'Applying for type rating require a valid RTR license.' },
];

export default function RTRAero() {
    return (
        <Layout title="RTR (Aero) License — Radio Telephony for DGCA CPL Pilots | WeOne Aviation" description="Complete RTR (Aero) training at We One Aviation Academy. Prepare for Radio Telephony Restricted exam with mock vivas, phraseology drills and expert ATC instructors in Delhi.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                RTR (Aero) – The License Every Professional Pilot Needs
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                When it comes to becoming a licensed commercial pilot in India, clearing the RTR exam is just as important as passing your DGCA ground subjects or logging flying hours. At We One Aviation, we help students understand the real-world relevance of RTR and prepare them thoroughly to ace this vital qualification.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['WPC / DGCA', 'Issued By'], ['2 Parts', 'Exam Format'], ['Oral', 'Exam Mode'], ['Mandatory', 'For All Pilots']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is RTR */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is RTR (Aero)?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                RTR (Aero) stands for <span className="font-semibold text-av-blue">Radio Telephony Restricted (Aeronautical)</span> — a government-issued license that authorizes pilots to legally operate aircraft radio communication equipment in Indian airspace.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                It is issued by the <span className="font-semibold text-av-blue">Wireless Planning and Coordination (WPC) Wing</span> under the Ministry of Communications, and is mandatory for all pilots who intend to:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {['Communicate with ATC (Air Traffic Control),', 'Operate aircraft radios in controlled airspace,', 'Fly in Indian commercial or general aviation sectors.'].map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Why Mandatory */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why is RTR Mandatory for Pilots?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Clear and precise radio communication is the lifeline of aviation safety. RTR ensures that pilots:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {whyMandatory.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm font-semibold mb-10">
                                Simply put, you can't fly commercially without an RTR license in India.
                            </p>

                            {/* Exam Format */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">RTR Exam Format – What to Expect</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                The RTR exam is conducted by WPC and DGCA, and is divided into two parts:
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">Part</th>
                                            <th className="p-3 text-left text-xs font-semibold">Description</th>
                                            <th className="p-3 text-left text-xs font-semibold">Mode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examParts.map((row, i) => (
                                            <tr key={row.part} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-av-blue font-semibold text-xs">{row.part}</td>
                                                <td className="p-3 text-gray-600 text-xs">{row.desc}</td>
                                                <td className="p-3 text-av-orange font-semibold text-xs">{row.mode}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-500 text-xs mb-2">Passing both parts is compulsory.</p>
                            <p className="text-gray-500 text-xs mb-10">The exam tests your confidence, clarity, and command over real-world aviation communication.</p>

                            {/* RTR Syllabus */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">RTR Syllabus Highlights</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Here's what you'll be trained on at We One Aviation Academy:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {syllabus.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* How We Teach */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How We One Aviation Prepares You for RTR</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                At We One Aviation, we provide intensive RTR training through experienced instructors and ex-ATC professionals.
                            </p>
                            <ul className="space-y-2 mb-4">
                                {howWeTeach.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm font-semibold mb-10">
                                Our goal? To make you not just exam-ready, but airspace-ready.
                            </p>

                            {/* Who Needs RTR */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Needs RTR?</h3>
                            <div className="space-y-3 mb-6">
                                {whoNeeds.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                The RTR license is not just another test — it's your gateway to safe, professional communication in the skies. At We One Aviation, we ensure you're confident, clear, and competent when you take that mic in your hand — because in aviation, every word matters.
                            </p>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Join RTR (Aero) Classes Now</h3>
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
                            <LeadForm title="Join RTR (Aero) Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Who Needs RTR</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ CPL applicants</li>
                                    <li>✓ Private Pilots (controlled airspace)</li>
                                    <li>✓ Foreign license converters</li>
                                    <li>✓ Flight instructors</li>
                                    <li>✓ Cadet pilots (type rating)</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Exam Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">RTR (Aero) Exam Format:</p>
                                <div className="text-2xl font-montserrat font-black">2 Parts</div>
                                <div className="text-white/70 text-xs mt-1">Both Parts Oral / Viva</div>
                                <div className="text-white/70 text-xs mt-1">WPC & DGCA Conducted</div>
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