import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Flight Training Abroad', title: 'Best Flight Schools', highlight: 'in U.S.A', sub: 'Complete Your 250 Hrs of Flying Within 1.6 Years From U.S.A' },
];

const whyUSA = [
    { icon: '🌍', title: 'Globally Recognized FAA License', desc: 'The Federal Aviation Administration (FAA) license is highly respected worldwide and accepted by airlines in over 100 countries.' },
    { icon: '☀️', title: 'Ideal Flying Weather', desc: 'With over 300 sunny days a year in key training locations, students enjoy more consistent flying schedules, leading to faster course completion.' },
    { icon: '✈️', title: 'Modern Aircraft & Technology', desc: 'Students train on Cessna 172 Glass Cockpit aircraft, gaining hands-on experience with the latest avionics used by major airlines.' },
    { icon: '🚀', title: 'Direct Airline Pathway', desc: 'U.S. flight schools offer structured programs designed to help you progress from Private Pilot License (PPL) to Commercial Pilot License (CPL) and beyond—often in under 18 months.' },
];

const exclusiveBenefits = [
    { num: '1', title: '40-Hour PPL Challenge', desc: 'Complete your PPL within 40 hours, and your Instrument Rating (IR) training will be free, saving you thousands of dollars.' },
    { num: '2', title: 'FAA-Approved Flying School at an International Airport', desc: 'Our partner schools are FAA-approved and located at international airports. You\'ll train in a live air traffic environment from Day 1.' },
    { num: '3', title: 'On-Campus Accommodation', desc: 'Stay in student-friendly housing located near the airport for a safe and comfortable experience.' },
    { num: '4', title: 'Full Scholarship After CPL', desc: 'Qualify for a 100% scholarship for advanced flight training after completing your CPL. Visit our office to check your eligibility and terms.' },
    { num: '5', title: '1500 Hours Flight Building – FREE', desc: 'After earning your CPL, build up to 1,500 flight hours at no additional cost — a major advantage, as most airlines require 1,500 hours for hiring.' },
    { num: '6', title: 'Train on Advanced Aircraft', desc: 'Fly Cessna 172 Glass Cockpit aircraft with GPS and autopilot systems — the same technology used by professional airline pilots.' },
];

const careerRoadmap = [
    { step: '01', title: 'Private Pilot License (PPL)', desc: 'Learn the basics of flying.' },
    { step: '02', title: 'Instrument Rating (IR)', desc: 'Master navigation in low-visibility conditions.' },
    { step: '03', title: 'Commercial Pilot License (CPL)', desc: 'Become eligible for professional flying.' },
    { step: '04', title: 'Flight Instructor Rating (Optional)', desc: 'Earn while building hours.' },
    { step: '05', title: '1,500-Hour Flight Building', desc: 'Gain required experience for airline interviews.' },
    { step: '06', title: 'Apply for Airline Jobs Worldwide', desc: 'With FAA credentials, your career options are global.' },
];

const whoShouldChoose = [
    'Students aiming for fast-track aviation careers',
    'Aspiring pilots wanting to fly internationally',
    'Graduates seeking FAA licenses and job-ready training',
    'Indian students looking for cost-effective, high-quality training',
];

const aircraftList = [
    {
        name: 'Cessna 152',
        type: 'Two-Seater, Single Engine',
        usedFor: 'PPL',
        description: 'A compact American aircraft with tricycle landing gear, ideal for new pilots.',
        benefits: 'Low-cost training, easy handling, widely used for basic flying lessons.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    },
    {
        name: 'Cessna 172 Skyhawk',
        type: 'Four-Seater, Single Engine',
        usedFor: 'PPL / CPL',
        description: 'The world\'s most popular training aircraft featuring a glass cockpit with GPS and autopilot.',
        benefits: 'Advanced avionics training, glass cockpit experience, widely accepted by airlines.',
        image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=800&q=80',
    },
    {
        name: 'Tecnam P2006T',
        type: 'Four-Seater, Twin Engine',
        usedFor: 'Multi-Engine Rating',
        description: 'A modern Italian twin-engine aircraft designed for multi-engine training with advanced avionics.',
        benefits: 'Multi-engine experience, fuel-efficient, prepares pilots for airline twin-engine operations.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    },
    {
        name: 'Tecnam P2008',
        type: 'Two-Seater, Single Engine',
        usedFor: 'PPL / Hour Building',
        description: 'A lightweight modern aircraft ideal for hour building and basic pilot training.',
        benefits: 'Fuel-efficient, modern design, ideal for solo and cross-country flying.',
        image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    },
    {
        name: 'Piper PA-34 Seneca',
        type: 'Six-Seater, Twin Engine',
        usedFor: 'Multi-Engine / CPL',
        description: 'A reliable twin-engine aircraft used for advanced commercial pilot training and instrument flying.',
        benefits: 'High performance, twin-engine proficiency, ideal for CPL and IFR training.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    },
    {
        name: 'Piper Archer / PA-28',
        type: 'Four-Seater, Single Engine',
        usedFor: 'PPL / CPL / Hour Building',
        description: 'A versatile and robust training aircraft widely used across U.S. flight schools for all training phases.',
        benefits: 'Cost-efficient hour building, sturdy build, excellent visibility from cockpit.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    },
    {
        name: 'Redbird / Elite Simulators',
        type: 'Full Flight Simulator',
        usedFor: 'IR / Instrument Training',
        description: 'State-of-the-art flight simulators used for instrument rating training, emergency procedures, and cockpit familiarization.',
        benefits: 'Risk-free practice, cost-effective instrument training, realistic cockpit environment.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    },
];

const trainingBenefits = [
    { icon: '✅', title: 'Designed for Students', desc: 'Each aircraft is selected for its safety, simplicity, and beginner-friendly controls.' },
    { icon: '✅', title: 'Cost-Efficient Hour Building', desc: 'Aircraft like the Cessna 152 and Piper Archer help you complete required hours affordably.' },
    { icon: '✅', title: 'Modern Glass Cockpit Training', desc: 'Get hands-on with GPS navigation and digital flight displays, just like airline jets.' },
    { icon: '✅', title: 'Multi-Engine Readiness', desc: 'Aircraft like Tecnam P2006 and Piper Seneca prepare you for twin-engine operations and airline career paths.' },
];

export default function USAFlightTraining() {
    const [activeAircraft, setActiveAircraft] = useState(0);

    return (
        <Layout title="Best Flight Schools in USA – FAA Pilot Training | WeOne Aviation Academy" description="Complete 250 hours of flying in 1.6 years from the USA. FAA-approved flight training in the United States with We One Aviation Academy. PPL, CPL, IR and multi-engine rating training.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Flight Training Abroad</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Best Flight Schools in U.S.A
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Dreaming of becoming an airline pilot and flying high across international skies? The fastest and most trusted route to a global aviation career is through FAA-approved flight training in the United States.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                At We One Aviation Academy, we proudly partner with top flying schools in the U.S.A to provide Indian students with world-class pilot training, exclusive benefits, and a direct pathway to airlines.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['250 Hours', 'Flying Hours'], ['1.6 Years', 'Duration'], ['FAA License', 'Certification'], ['100+ Countries', 'License Accepted']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Why Choose USA */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why Choose Flight Training in the USA?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                The United States is globally recognized for its modern aviation infrastructure, advanced aircraft, and world-class flight training standards. It's one of the few countries where you can complete 250 flying hours in minimal time, under a globally accepted FAA training system.
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
                                <p className="text-av-orange font-bold text-sm">⚡ Limited Seats Available – Apply Now!</p>
                            </div>

                            {/* Exclusive Benefits */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Exclusive Benefits at We One Aviation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                At We One Aviation, we don't just offer pilot training — we offer a career-building experience backed by exclusive advantages designed for your success.
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
                                <p className="text-av-orange font-bold text-sm">⚡ Limited Seats Available – Apply Now!</p>
                            </div>

                            {/* Career Roadmap */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Your Career Roadmap: Step-by-Step Pilot Training in the USA</h3>
                            <div className="space-y-3 mb-10">
                                {careerRoadmap.map((item) => (
                                    <div key={item.step} className="flex gap-4 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0 w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-av-orange font-bold text-xs">{item.step}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Who Should Choose */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Should Choose Pilot Training in the USA?</h3>
                            <ul className="space-y-2 mb-10">
                                {whoShouldChoose.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Aircraft Used */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">List of Aircraft Used for Flight Training in the USA & Their Benefits</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Top flight schools in the USA — including our partnered academies — use modern, well-maintained aircraft that are equipped with advanced flight instruments and are widely used by aviation authorities across the globe for professional pilot training.
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
                                        <img
                                            src={aircraftList[activeAircraft].image}
                                            alt={aircraftList[activeAircraft].name}
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
                                    We One Aviation Academy is India's most trusted partner for USA flight training. Get expert guidance, FAA license pathway support, and direct airline career preparation. ✈️
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
                                <h4 className="font-montserrat font-bold mb-4">Key Benefits</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ FAA License — 100+ countries</li>
                                    <li>✓ 250 hours in 1.6 years</li>
                                    <li>✓ 40-hr PPL Challenge (Free IR)</li>
                                    <li>✓ On-campus accommodation</li>
                                    <li>✓ 1,500 hrs flight building FREE</li>
                                    <li>✓ 100% CPL scholarship option</li>
                                    <li>✓ Glass cockpit aircraft training</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Training Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">USA FAA Pilot Training:</p>
                                <div className="text-2xl font-montserrat font-black">250 Hours</div>
                                <div className="text-white/70 text-xs mt-1">Complete in Just 1.6 Years</div>
                                <div className="text-white/70 text-xs mt-1">International Airport Training</div>
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