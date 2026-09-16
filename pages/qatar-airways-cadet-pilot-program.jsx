import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import CadetHubLink from '../components/CadetHubLink';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Cadet Program', title: 'Qatar Airways', highlight: 'Cadet Pilot Program', sub: 'Your Gateway to the Skies — Quality! Results!' },
];

const programFocus = [
    'Academic excellence',
    'Advanced flight training',
    'Leadership and communication skills',
    'Safety and operational discipline',
];

const trainingFacilities = [
    'Modern flight simulators',
    'Advanced training aircraft',
    'Experienced, industry-leading instructors',
    'A multicultural aviation environment',
];

/*
 * CORRECTED 2026-09-15. Two problems with the version this replaces.
 *
 * The medical line said "Must pass a DGCA Aviation Medical Exam". That is wrong
 * on its face: a cadet programme run by a Qatari carrier trains under the Qatar
 * Civil Aviation Authority, not DGCA, so a DGCA medical is not what it asks
 * for. An Indian candidate planning to fly in India later needs a DGCA medical
 * too, but that is a separate step, not this one.
 *
 * The age band and English requirement carried no source. A search of Qatar
 * Airways' own careers material on 15 September 2026 did not surface a current
 * published criteria set; everything findable was a third-party coaching page
 * restating figures with no citation. We do not repeat those. Where the
 * requirement could not be verified, the entry now says so and points the
 * reader at the airline.
 */
const eligibility = [
    { icon: '🌍', label: 'Nationality', desc: 'Qatar Airways runs a national cadet programme for Qatari nationals. International intakes are opened separately and not continuously — which one is open is the first thing to check, because it decides whether you are eligible at all.' },
    { icon: '🎓', label: 'Education', desc: 'A school-leaving qualification with mathematics, physics and English is the usual baseline for an ab-initio cadet route.' },
    { icon: '🩺', label: 'Medical Fitness', desc: 'A Class 1 medical accepted by the regulator that will issue the licence. For a Qatari programme that is the Qatar Civil Aviation Authority, not DGCA. If you intend to fly in India afterwards, a DGCA Class 1 and a licence conversion are a separate step to budget for.' },
    { icon: '✈️', label: 'Prior Experience', desc: 'Ab-initio cadet routes are designed for candidates with no previous flying experience.' },
    { icon: '📄', label: 'Age, English scores and fees', desc: 'Published by the airline per intake, and not reproduced here. We could not verify a current set against a Qatar Airways document on 15 September 2026, and a figure we cannot source is worse than an honest blank. Read the criteria on the airline\u2019s own careers site before you apply or pay anyone to prepare you.' },
];

export default function QatarAirwaysCadet() {
    return (
        <Layout title="Qatar Airways Cadet Pilot Program – Complete Guide | We One Aviation Academy" description="Learn everything about the Qatar Airways Cadet Pilot Program — eligibility, training locations, program focus and how We One Aviation Academy can help you get selected.">
            <HeroSlider customSlides={heroSlides} asH1={false} />

            <CadetHubLink airline="Qatar Airways" />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Cadet Program</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Qatar Airways Cadet Pilot Program – Your Gateway to the Skies
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Dreaming of flying for one of the world's most prestigious airlines? The Qatar Airways Cadet Pilot Program offers a once-in-a-lifetime opportunity for aspiring aviators to launch their careers with a globally recognized airline known for excellence, innovation, and international prestige.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                This is more than just a training program — it's your direct runway to the cockpit of a Qatar Airways aircraft.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['18–26 Years', 'Age Limit'], ['Zero to ATPL', 'Training Level'], ['Doha, Qatar', 'Training Base'], ['DGCA', 'Medical Required']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is the Program */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is the Qatar Airways Cadet Pilot Program?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                The Qatar Airways Cadet Pilot Program is a structured and comprehensive training pathway designed to train and qualify future pilots — both Qatari nationals and selected international candidates — from the ground up.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Candidates are chosen through a rigorous selection process and trained to become First Officers with Qatar Airways.
                            </p>
                            <p className="text-gray-600 text-sm font-semibold mb-3">The program focuses on:</p>
                            <ul className="space-y-2 mb-10">
                                {programFocus.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Where Training Takes Place */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Where Does Training Take Place?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Training is conducted at the <span className="font-semibold text-av-blue">Qatar Aeronautical Academy (QAA)</span> in Doha — a state-of-the-art aviation institution offering:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {trainingFacilities.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Some batches may also complete parts of their training abroad — in the UK, Australia, or South Africa, depending on training phase and capacity.
                            </p>

                            {/* Eligibility */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Eligibility Criteria for the Qatar Airways Cadet Pilot Programme</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                To apply for the Qatar Airways Cadet Pilot Programme, candidates must meet the following:
                            </p>
                            <div className="space-y-4 mb-10">
                                {eligibility.map((item) => (
                                    <div key={item.label} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="text-xl">{item.icon}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{item.label}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Apply for Qatar Airways Cadet Program</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    We One Aviation Academy helps aspiring pilots prepare for cadet selection processes at top international airlines. Get expert guidance, DGCA ground training, and interview preparation. ✈️
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
                            <LeadForm title="Apply for Cadet Program" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Eligibility at a Glance</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ 12th with mathematics, English and physics</li>
                                    <li>✓ No prior flying experience needed</li>
                                    <li>✓ Ab-initio through to airline operation</li>
                                    <li>✓ Class 1 medical from the licensing regulator</li>
                                    <li>&mdash; National intake: Qatari nationals</li>
                                    <li>&mdash; International intakes: opened separately</li>
                                    <li>&mdash; Age bands, English scores, fees: per intake, at the source</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Program Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Qatar Airways Cadet Program:</p>
                                <div className="text-2xl font-montserrat font-black">Zero to ATPL</div>
                                <div className="text-white/70 text-xs mt-1">Qatar Aeronautical Academy, Doha</div>
                                <div className="text-white/70 text-xs mt-1">UK / Australia / South Africa Options</div>
                                <a href="https://wa.me/919667370747" target="_blank" rel="noopener noreferrer"
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