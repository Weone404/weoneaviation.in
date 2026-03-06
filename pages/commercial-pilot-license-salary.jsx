import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '₹1.5–3L', label: 'Entry-Level / Month', icon: '🛩️' },
    { num: '₹6–10L', label: 'Captain / Month', icon: '✈️' },
    { num: '$4K–20K+', label: 'Abroad / Month', icon: '🌍' },
    { num: 'CPL', label: 'Required License', icon: '🪪' },
];

const salaryFactors = [
    {
        icon: '🏢',
        title: 'Airline Type',
        desc: 'Pilots working for domestic airlines receive lower pay rates than those employed by international airlines.',
    },
    {
        icon: '✈️',
        title: 'Aircraft Type',
        desc: 'Pilots operate wide-body jets (Boeing 777 or Airbus A350) which generates a higher salary compared to pilots who operate smaller aircraft.',
    },
    {
        icon: '📈',
        title: 'Experience Level',
        desc: "A pilot's salary grows as their flight hours increase together with their professional experience.",
    },
    {
        icon: '🌍',
        title: 'Location',
        desc: 'Pilots who fly for Middle Eastern or Southeast Asian or European airlines tend to receive bigger salary packages than their Indian counterparts.',
    },
    {
        icon: '🏆',
        title: 'Additional Roles',
        desc: 'Training captains and instructors along with examiners may receive performance-based bonuses and additional payments through allowances.',
    },
];

const additionalBenefits = [
    { icon: '🏥', benefit: 'Health and life insurance' },
    { icon: '✈️', benefit: 'Travel perks for family' },
    { icon: '🏠', benefit: 'Housing or accommodation allowance' },
    { icon: '💰', benefit: 'Retirement and pension plans' },
    { icon: '📚', benefit: 'Training and upskilling opportunities' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CPLSalaryPage() {
    return (
        <Layout
            title="Commercial Pilot License Salary – 2025 | CPL Salary in India & Abroad"
            description="Discover the Commercial Pilot License salary in 2025. Complete breakdown of CPL salary in India and abroad, entry-level to captain pay, salary factors, and additional benefits."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Career</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot License Salary – 2025
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-5">
                        Thousands of aviators interested in pursuing flight careers ask about the <strong className="text-white">Commercial pilot license</strong> salary levels in India in comparison to foreign salaries. Getting your Commercial Pilot License (CPL) brings you more than flight experience because it leads to a satisfying career as well as financial benefits.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        Commercial pilot salary bases its amount on a combination of flight experience with the aircraft type and airline partnership and geographic location. A comprehensive breakdown on this page explains the earnings opportunities for CPL holders.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── What is a Commercial Pilot License Salary ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">About CPL Salary</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            What is a Commercial Pilot License Salary?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            After getting their <strong>CPL</strong> through training and certification pilots can obtain their commercial pilot license salary as monthly or yearly pay. Your career stage alongside your work location determines how much your commercial pilot license salary will be.
                        </p>
                        <div className="bg-av-blue rounded-2xl p-6 text-white">
                            <p className="text-av-orange font-semibold text-sm mb-2">Limited Seat – Join Now</p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Start your aviation journey today and unlock one of the highest-paying professional careers in India and abroad.
                            </p>
                            <Link href="/contact" className="inline-block mt-4 bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                                Enquiry Now →
                            </Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        {/* India Salary Overview Cards */}
                        <div className="space-y-5">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 hover:border-av-orange/30 transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">🛩️</span>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-av-blue">Entry-Level (First Officer / Co-Pilot)</h3>
                                        <p className="text-av-orange font-bold text-lg">INR 1.5 – 3 Lakhs / Month</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    A valid <strong>Commercial Pilot</strong> License allows freshers to begin their aviation career by piloting as First Officer or Co-Pilot. The starting salary paid by regional airlines and charter companies is normally lower than the standard amount until pilots build their skills through flying experience.
                                </p>
                            </div>

                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">✈️</span>
                                    <div>
                                        <h3 className="font-montserrat font-bold text-white">Experienced Captain</h3>
                                        <p className="text-av-orange font-bold text-lg">INR 6 – 10 Lakhs / Month</p>
                                    </div>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Flight experience alongside collecting sufficient flight hours enables pilots to advance their position to Captain. A Captain employed at a leading domestic Indian airline receives a monthly salary between INR 6 to 10 lakhs. The salary earnings for international routes and world-class carriers typically exceed the pay of domestic routes.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Salary Sections ── */}
            <section className="py-10 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Entry Level */}
                        <ScrollReveal>
                            <div className="section-tag">Entry Level</div>
                            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4">
                                Entry-Level Commercial Pilot <span className="text-av-orange">Salary in India</span>
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                A valid <strong>Commercial Pilot</strong> License allows freshers to begin their aviation career by piloting as First Officer or Co-Pilot. The typical salary for commercial pilots in India with their license that maintains an average range between <strong className="text-av-orange">INR 1.5 to 3 lakhs per month</strong> in their first role. The starting salary paid by regional airlines and charter companies is normally lower than the standard amount until pilots build their skills through flying experience.
                            </p>
                        </ScrollReveal>

                        {/* Experienced */}
                        <ScrollReveal delay={150}>
                            <div className="section-tag">Experienced</div>
                            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4">
                                Experienced Commercial <span className="text-av-orange">Pilot Salary</span>
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Flight experience alongside collecting sufficient flight hours enables pilots to advance their position to Captain. A Captain employed at a leading domestic Indian airline receives a monthly salary between <strong className="text-av-orange">INR 6 to 10 lakhs</strong>. The salary earnings for international routes and world-class carriers typically exceed the pay of domestic routes.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Factors Influencing Salary ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Salary Factors</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Factors Influencing <span className="text-av-orange">Commercial Pilot License Salary</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">These factors together establish the full compensation a pilot should receive:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {salaryFactors.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Salary Abroad ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">International</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Commercial Pilot <span className="text-av-orange">Salary Abroad</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <p className="text-white/80 text-sm leading-relaxed mb-5">
                                    Commercial <strong className="text-white">pilot license</strong> salaries are high in the USA and Australia as well as the UAE and Singapore.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-white/10 rounded-xl p-4">
                                        <p className="text-av-orange font-semibold text-sm mb-1">Newbie / Entry-Level Pilots</p>
                                        <p className="font-montserrat text-white font-black text-2xl">USD 4,000 – 8,000 / Month</p>
                                    </div>
                                    <div className="bg-av-orange/20 border border-av-orange/40 rounded-xl p-4">
                                        <p className="text-av-orange font-semibold text-sm mb-1">Experienced Captains</p>
                                        <p className="font-montserrat text-white font-black text-2xl">USD 10,000 – 20,000+ / Month</p>
                                        <p className="text-white/50 text-xs mt-1">According to aircraft assignments and workplace.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="space-y-4">
                                {[
                                    { flag: '🇺🇸', country: 'USA', pay: 'USD 10,000 – 20,000+' },
                                    { flag: '🇦🇺', country: 'Australia', pay: 'AUD 12,000 – 22,000+' },
                                    { flag: '🇦🇪', country: 'UAE', pay: 'USD 12,000 – 18,000+' },
                                    { flag: '🇸🇬', country: 'Singapore', pay: 'USD 8,000 – 16,000+' },
                                ].map((item, i) => (
                                    <div key={item.country} className="glass rounded-xl p-4 flex items-center gap-4">
                                        <span className="text-3xl">{item.flag}</span>
                                        <div>
                                            <p className="font-montserrat font-bold text-white">{item.country}</p>
                                            <p className="text-av-orange font-semibold text-sm">{item.pay} / Month</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Additional Benefits ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Benefits</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Additional <span className="text-av-orange">Benefits</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Besides the base salary, commercial pilots often receive benefits such as:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
                        {additionalBenefits.map((item, i) => (
                            <ScrollReveal key={item.benefit} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <p className="text-gray-600 text-sm font-semibold leading-relaxed">{item.benefit}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Conclusion</div>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-3xl mx-auto">
                            A commercial pilot license salary offers among the highest professional compensation because it provides exciting travel benefits along with elevated status and employment flexibility across different countries. The sizeable investment in pilot training yields equal benefits to the pilot.
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-3xl mx-auto">
                            Acquiring a CPL enables you to pursue flights either within India's borders or internationally thereby establishing a <strong className="text-av-orange">stable career with exciting opportunities.</strong>
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Start Your CPL Journey →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}