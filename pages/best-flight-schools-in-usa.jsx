import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import NextImage from 'next/image';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Flight Training Guide', title: 'Research Flight Schools', highlight: 'in the USA', sub: 'Compare provider terms and verify current licensing requirements' },
];

const whyUSA = [
    { icon: '🌍', title: 'Licence and Conversion', desc: 'Licence privileges and conversion requirements depend on the issuing and destination authorities. Verify current rules directly with the regulators.' },
    { icon: '☀️', title: 'Training Schedule', desc: 'Schedules depend on the selected school, weather, aircraft availability, and student progress. Request the provider’s current written schedule.' },
    { icon: '✈️', title: 'Aircraft and Equipment', desc: 'Aircraft and equipment vary by school. Confirm the provider’s current inventory, maintenance arrangements, and training plan.' },
    { icon: '🚀', title: 'Provider Selection', desc: 'Compare current school approval, programme availability, written fees, schedules, and licence-conversion requirements directly with providers.' },
];

const exclusiveBenefits = [
    { num: '1', title: 'Provider Approval', desc: 'Check a selected school’s current approval directly with the FAA and relevant authorities.' },
    { num: '2', title: 'Training Location', desc: 'Confirm the school’s airport, operating environment, and training location before making arrangements.' },
    { num: '3', title: 'Accommodation', desc: 'Ask the selected school whether accommodation is available and obtain its terms directly.' },
    { num: '4', title: 'Scholarship Terms', desc: 'No scholarship or complimentary training is promised on this page. Verify any written offer with its issuer.' },
    { num: '5', title: 'Flight-Hour Requirements', desc: 'Confirm current experience and flight-hour requirements with the licensing authority and selected school.' },
    { num: '6', title: 'Aircraft and Equipment', desc: 'Aircraft and equipment depend on the selected school; request its current inventory and training plan.' },
];

const careerRoadmap = [
    { step: '01', title: 'Private Pilot License (PPL)', desc: 'Learn the basics of flying.' },
    { step: '02', title: 'Instrument Rating (IR)', desc: 'Master navigation in low-visibility conditions.' },
    { step: '03', title: 'Commercial Pilot License (CPL)', desc: 'Become eligible for professional flying.' },
    { step: '04', title: 'Additional Ratings', desc: 'Confirm any rating requirements with the relevant authority and selected provider.' },
    { step: '05', title: 'Build Required Experience', desc: 'Confirm current experience requirements with the relevant licensing authority.' },
    { step: '06', title: 'Review Employment Requirements', desc: 'Employers set their own eligibility and recruitment requirements; a licence does not guarantee a job.' },
];

const whoShouldChoose = [
    'Students researching flight-training options and licensing requirements',
    'Applicants comparing provider approval and current programme availability',
    'Readers verifying fees, schedules, and facilities before applying',
    'Indian students checking licence-conversion requirements with DGCA',
];

const aircraftList = [
    {
        name: 'Provider-specific aircraft',
        type: 'Confirm with selected school',
        usedFor: 'Depends on programme',
        description: 'Aircraft and simulator availability varies by school. Confirm the current fleet and included training directly with the provider.',
        benefits: 'Verify aircraft, equipment, maintenance, and training scope in writing.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    },
];

const trainingBenefits = [
    { icon: '✅', title: 'Provider Approval', desc: 'Check each selected school’s current approval directly with the FAA.' },
    { icon: '✅', title: 'Training Schedule', desc: 'Request the school’s current written course schedule and completion assumptions.' },
    { icon: '✅', title: 'Aircraft and Equipment', desc: 'Confirm the provider’s current fleet, equipment, and maintenance arrangements.' },
    { icon: '✅', title: 'Licence Conversion', desc: 'Verify applicable licence-conversion requirements with DGCA before enrolling.' },
];

export default function USAFlightTraining() {
    const [activeAircraft, setActiveAircraft] = useState(0);

    return (
        <Layout title="Flight Training in the USA: Provider Checklist | We One Aviation" description="Review flight-training provider approval, schedules, written costs, and licence-conversion requirements for training in the USA. Verify current details directly with the selected school and regulators.">
            <HeroSlider customSlides={heroSlides} asH1={false} />

            {/* Overview */}
            <section className="py-20 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Flight Training Abroad</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Flight Training in the USA: Research Guide
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                This guide outlines questions to research before considering flight training in the USA. It does not confirm a current USA-specific partner school or programme.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                We One Aviation teaches DGCA ground subjects in Dwarka and arranges flight training through partner flying schools. Contact the academy to ask whether a USA-specific arrangement is currently available.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[[ 'Confirm with regulator', 'Flight-hour requirements'], ['Varies by provider', 'Schedule'], ['Confirm with FAA', 'School approval'], ['Confirm with regulators', 'Licence recognition']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Choose USA */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What to Verify When Researching USA Flight Training</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Verify the selected school’s current approval, programme availability, written fees, schedule, facilities, and licence-conversion requirements with the relevant providers and authorities.
                            </p>
                            <div className="space-y-4 mb-6">
                                {whyUSA.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-av-orange/10 border border-av-orange/30 rounded-xl p-4 mb-10 text-center">
                                <p className="text-av-orange font-bold text-sm">Verify current provider availability before applying.</p>
                            </div>

                            {/* Exclusive Benefits */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Questions to Ask a Selected Provider</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                This page does not confirm a current USA-specific partner or programme. Obtain written answers from the selected school before making arrangements.
                            </p>
                            <div className="space-y-4 mb-6">
                                {exclusiveBenefits.map((item) => (
                                    <div key={item.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{item.num}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{item.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-av-orange/10 border border-av-orange/30 rounded-xl p-4 mb-10 text-center">
                                <p className="text-av-orange font-bold text-sm">No seat availability or programme offer is confirmed here.</p>
                            </div>

                            {/* Career Roadmap */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Licence and Employment Considerations</h3>
                            <div className="space-y-3 mb-10">
                                {careerRoadmap.map((item) => (
                                    <div key={item.step} className="flex gap-4 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0 w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-av-orange font-bold text-xs">{item.step}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Who Should Choose */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who May Find This Research Guide Useful?</h3>
                            <ul className="space-y-2 mb-10">
                                {whoShouldChoose.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Aircraft Used */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Aircraft and Equipment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Aircraft and simulators differ by school. This page does not publish or confirm the fleet of any current partner.
                            </p>

                            {/* Aircraft Tabs */}
                            <div className="flex gap-4 mb-6">
                                {/* Tab List */}
                                <div className="w-48 flex-shrink-0 space-y-2">
                                    {aircraftList.map((aircraft, i) => (
                                        <button
                                            key={aircraft.name}
                                            onClick={() => setActiveAircraft(i)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeAircraft === i
                                                ? 'bg-av-blue text-white'
                                                : 'bg-gray-100 text-av-blue hover:bg-av-light'
                                                }`}
                                        >
                                            {aircraft.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="flex-1 border border-gray-200 rounded-2xl overflow-hidden">
                                    <div className="aspect-video overflow-hidden">
                                        <NextImage
                                            src={aircraftList[activeAircraft].image}
                                            alt={aircraftList[activeAircraft].name}
                                            width={1200}
                                            height={700}
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-montserrat font-bold text-av-blue text-base mb-3">{aircraftList[activeAircraft].name}</h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p><span className="font-semibold text-av-blue">Type –</span> {aircraftList[activeAircraft].type}</p>
                                            <p><span className="font-semibold text-av-blue">Used For –</span> {aircraftList[activeAircraft].usedFor}</p>
                                            <p><span className="font-semibold text-av-blue">Description –</span> {aircraftList[activeAircraft].description}</p>
                                            <p><span className="font-semibold text-av-blue">Benefits –</span> {aircraftList[activeAircraft].benefits}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Training Benefits */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-4">Benefits of Training on These Aircraft</h4>
                            <div className="space-y-3 mb-10">
                                {trainingBenefits.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="font-bold text-av-orange flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Start Your USA Flight Training Journey</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    We One Aviation Academy arranges USA flight training placements. Get expert guidance, FAA license pathway support, and direct airline career preparation. ✈️
                                </p>
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Contact Now
                                </Link>
                            </div>

                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Apply for USA Training" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Details to Verify</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ Current school approval</li>
                                    <li>✓ Written course scope and schedule</li>
                                    <li>✓ Itemized fees and refund terms</li>
                                    <li>✓ Aircraft and facility availability</li>
                                    <li>✓ Licence conversion requirements</li>
                                    <li>✓ Immigration requirements</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Before You Apply</h4>
                                <p className="text-white/80 text-sm mb-3">This guide does not confirm a current USA-specific training arrangement.</p>
                                <div className="text-lg font-montserrat font-black">Verify provider details</div>
                                <div className="text-white/70 text-xs mt-1">Confirm current schedules and terms directly.</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask About Current Options
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}