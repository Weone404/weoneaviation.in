import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'Air Regulations', highlight: 'Complete Guide', sub: 'Complete Guide for DGCA Exams and Pilot Training — We One Aviation Academy' },
];

const designedTo = [
    'Prevent collisions and airspace conflicts',
    'Define how aircraft should be flown (rules of the air)',
    'Establish pilot licensing and medical standards',
    'Regulate aircraft maintenance and airworthiness',
    'Enforce duty time limits for crew',
    'Protect passengers, property, and the environment',
];

const syllabusTopics = [
    {
        title: 'ICAO – International Civil Aviation Organization',
        points: ['Objectives', 'Structure', 'Functions', 'Annexes (especially Annex 1, 2, 6, 8, 9, 11, 12)'],
    },
    {
        title: 'Chicago Convention (1944)',
        points: ['Freedoms of the Air', 'Sovereignty of Airspace', 'ICAO Doc 7300'],
    },
    {
        title: 'DGCA Structure & Role',
        points: ['Formation', 'Duties and Powers', 'CARs (Civil Aviation Requirements)'],
    },
    {
        title: 'Rules of the Air (ROTA)',
        points: ['Visual Flight Rules (VFR)', 'Instrument Flight Rules (IFR)', 'Right of Way, Collision Avoidance', 'Signals, Lights, Markings'],
    },
    {
        title: 'Airspace Classification',
        points: ['Controlled/Uncontrolled Airspace', 'Flight Information Regions (FIR)', 'Control Zones (CTR)', 'Terminal Control Area (TMA)', 'Area Control Centre (ACC)'],
    },
    {
        title: 'Licensing Rules',
        points: ['Eligibility for PPL, CPL, ATPL', 'Renewal, Validity, Endorsements', 'Flight Duty Time Limitations (FDTL)'],
    },
    {
        title: 'Flight Duty Time Limitations (FDTL)',
        points: ['Maximum Duty Hours', 'Rest Periods'],
    },
    {
        title: 'Aircraft Documents & Responsibilities',
        points: ['Journey Log', 'Certificate of Registration (C of R)', 'Certificate of Airworthiness (C of A)'],
    },
    {
        title: 'Emergency Procedures and Communication Failures',
        points: [],
    },
    {
        title: 'Air Traffic Services',
        points: ['ATC roles', 'Flight Plans', 'ATIS, METAR, NOTAM'],
    },
];

const importantDocs = [
    { doc: 'CARs (Civil Aviation Requirements)', desc: 'DGCA regulations that must be followed by all Indian aviation operators' },
    { doc: 'AIP (Aeronautical Information Publication)', desc: 'Contains details of airports, rules, and services' },
    { doc: 'NOTAM (Notice to Airmen)', desc: 'Temporary changes or important alerts' },
    { doc: 'METAR/TAF', desc: 'Meteorological updates for aviation' },
    { doc: 'Flight Plan', desc: 'Mandatory for IFR and cross-country flights' },
];

const icaoAnnexes = [
    { annex: 'Annex 2', title: 'Rules of the Air' },
    { annex: 'Annex 6', title: 'Operation of Aircraft' },
    { annex: 'Annex 11', title: 'Air Traffic Services' },
];

const pilotResponsibilities = [
    'Ensuring the aircraft is airworthy',
    'Carrying all documents on board',
    'Following ATC instructions',
    'Avoiding restricted/prohibited zones',
    'Logging flight time correctly',
    'Declaring emergencies appropriately',
];

const prepTips = [
    'Start with ICAO & DGCA basics',
    'Focus on Annex 2 and CARs',
    'Memorize classifications, signals, documents',
    'Practice mock tests & previous year DGCA question papers',
    'Stay updated with new CAR revisions on DGCA website',
];

export default function AirRegulations() {
    return (
        <Layout title="Air Regulations – Complete Guide for DGCA Exams | WeOne Aviation Academy" description="Complete guide to Air Regulations for DGCA CPL/PPL exams. Covers ICAO, Chicago Convention, DGCA structure, Rules of the Air, airspace classification, licensing rules and more.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Air Regulations – Complete Guide for DGCA Exams and Pilot Training
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Air Regulations refer to the set of rules and procedures governing civil aviation to ensure safe, efficient, and orderly air navigation. In India, these rules are laid down by the Directorate General of Civil Aviation (DGCA) under the Ministry of Civil Aviation.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                They cover aspects like licensing, aircraft operations, airworthiness, safety norms, crew duties, airspace usage, and compliance with international standards (ICAO).
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['CPL / PPL', 'Eligibility'], ['ICAO & DGCA', 'Standards'], ['6 Papers', 'DGCA Exam'], ['Core Subject', 'CPL Syllabus']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What Are Air Regulations */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Are Air Regulations?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Air Regulations are a set of official rules, procedures, and legal guidelines that govern all aspects of civil aviation. These regulations ensure that aircraft operate safely, efficiently, legally, and harmoniously in national and international airspace.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">They are designed to:</p>
                            <ul className="space-y-2 mb-10">
                                {designedTo.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Air Regulations in DGCA CPL Syllabus */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Air Regulations in DGCA CPL Syllabus</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                If you're preparing for the Commercial Pilot License (CPL) examination in India, Air Regulation is a core theoretical subject. It ensures that every aspiring pilot is well-versed with national and international aviation law and responsibilities in the airspace.
                            </p>
                            <p className="text-gray-600 text-sm font-semibold mb-5">Topics Covered:</p>
                            <div className="space-y-4 mb-10">
                                {syllabusTopics.map((section) => (
                                    <div key={section.title} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="bg-av-blue p-4">
                                            <h4 className="font-montserrat font-bold text-white text-sm">{section.title}</h4>
                                        </div>
                                        {section.points.length > 0 && (
                                            <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {section.points.map((pt) => (
                                                    <div key={pt} className="flex items-center gap-2 text-gray-600 text-xs">
                                                        <span className="text-av-orange">▸</span>{pt}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Important Civil Aviation Documents */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Important Civil Aviation Documents</h3>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">Document</th>
                                            <th className="p-3 text-left text-xs font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importantDocs.map((row, i) => (
                                            <tr key={row.doc} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-av-blue font-semibold text-xs">{row.doc}</td>
                                                <td className="p-3 text-gray-600 text-xs">{row.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ICAO and Its Importance */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">ICAO and Its Importance</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The International Civil Aviation Organization (ICAO) is a UN body that standardizes global aviation. Its Annexes form the backbone of aviation law worldwide. For instance:
                            </p>
                            <div className="space-y-3 mb-4">
                                {icaoAnnexes.map((item) => (
                                    <div key={item.annex} className="flex gap-3 items-center text-sm text-gray-600">
                                        <span className="w-20 flex-shrink-0 font-semibold text-av-blue">{item.annex}</span>
                                        <span className="text-av-orange">–</span>
                                        <span>{item.title}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                India, as a member state, follows ICAO SARPs (Standards and Recommended Practices) while tailoring its own regulations through the DGCA.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">India's aviation law is based on:</p>
                            <ul className="space-y-1 mb-10">
                                {['Aircraft Act, 1934', 'Aircraft Rules, 1937'].map((item) => (
                                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 text-xs mb-10">
                                These are the legislative foundations of all aviation regulations, updated over time through CARs and DGCA orders.
                            </p>

                            {/* Pilot Legal Responsibilities */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Pilot Legal Responsibilities</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">As a licensed pilot, you're responsible for:</p>
                            <ul className="space-y-2 mb-4">
                                {pilotResponsibilities.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Failure to comply with Air Regulations can result in license suspension, penalties, or even criminal liability.
                            </p>

                            {/* Prep Tips */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Tips to Prepare for Air Regulation Exam (DGCA)</h3>
                            <ul className="space-y-2 mb-10">
                                {prepTips.map((tip, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Enroll in Air Regulations Classes Now</h3>
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
                            <LeadForm title="Join Air Regulations Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Key Topics</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ ICAO & Chicago Convention</li>
                                    <li>✓ DGCA Structure & CARs</li>
                                    <li>✓ Rules of the Air (VFR/IFR)</li>
                                    <li>✓ Airspace Classification</li>
                                    <li>✓ Licensing Rules (PPL/CPL/ATPL)</li>
                                    <li>✓ FDTL & Crew Duty Limits</li>
                                    <li>✓ Aircraft Documents</li>
                                    <li>✓ ATC & Flight Plans</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Full DGCA Air Regulations Syllabus:</p>
                                <div className="text-2xl font-montserrat font-black">CPL / PPL</div>
                                <div className="text-white/70 text-xs mt-1">ICAO + DGCA Standards</div>
                                <div className="text-white/70 text-xs mt-1">Mock Tests & Question Bank</div>
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