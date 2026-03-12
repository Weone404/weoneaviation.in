import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const pplEligibility = [
    { criteria: 'Age', details: 'Minimum 17 years' },
    { criteria: 'Education', details: '10+2 with Physics & Mathematics' },
    { criteria: 'Medical Fitness', details: 'Class 2 Medical Certificate (DGCA approved)' },
    { criteria: 'Nationality', details: 'Indian or foreign nationals (as per DGCA rules)' },
];

const pplSubjects = [
    'Air Regulations',
    'Aviation Meteorology',
    'Air Navigation',
    'Aircraft General and Technical Knowledge',
    'Radio Telephony',
];

const pplCost = [
    { type: 'Ground Classes', cost: '₹60,000 – ₹1,00,000' },
    { type: 'Flying Training (40-50 hrs)', cost: '₹7,00,000 – ₹9,00,000' },
    { type: 'Medical & Exam Fees', cost: '₹20,000 – ₹40,000' },
    { type: 'Total Cost', cost: '₹7.5 – ₹10 Lakhs' },
];

const pplDuration = [
    { type: 'Full-time (Regular)', duration: '6 to 12 months' },
    { type: 'Part-time (Weekend)', duration: '8 to 18 months' },
];

const pplCareerScope = [
    'Fly for personal or leisure purposes',
    'Build flying hours for CPL (Commercial Pilot License)',
    'Pursue aviation as a hobby or sport',
    'Join aviation clubs and flying groups',
    'Fly family/friends in non-commercial aircraft',
];

const pplVsCpl = [
    { aspect: 'Purpose', ppl: 'Personal / Recreational Flying', cpl: 'Commercial Flying for Pay' },
    { aspect: 'Flight Hours Required', ppl: '40–50 hours', cpl: '200+ hours' },
    { aspect: 'Medical Required', ppl: 'Class 2 Medical', cpl: 'Class 1 Medical' },
    { aspect: 'Age Requirement', ppl: '17 years', cpl: '18 years' },
    { aspect: 'Can Carry Passengers?', ppl: 'Yes (non-commercial)', cpl: 'Yes (commercial)' },
    { aspect: 'Can Earn Money Flying?', ppl: 'No', cpl: 'Yes' },
    { aspect: 'DGCA Exams Required', ppl: 'Basic subjects', cpl: 'Full 6-subject DGCA exam' },
    { aspect: 'Average Cost (India)', ppl: '₹7.5 – ₹10 Lakhs', cpl: '₹35 – ₹55 Lakhs' },
];

const faqs = [
    { q: 'What is the full form of PPL in aviation?', a: 'PPL stands for Private Pilot License. It is an aviation certificate that allows a person to fly an aircraft privately (non-commercially) after completing the required training and passing DGCA exams.' },
    { q: 'Is PPL valid for commercial flying?', a: 'No, PPL is not valid for commercial flying. To fly commercially and earn money as a pilot, you need a Commercial Pilot License (CPL).' },
    { q: 'Can I get a PPL after 12th standard?', a: 'Yes! If you have completed 10+2 with Physics and Mathematics, you are eligible to enroll for PPL training. You must also be at least 17 years old and hold a valid DGCA Class 2 Medical Certificate.' },
    { q: 'How many hours of flying are required for PPL?', a: 'A minimum of 40 to 50 flying hours are required for PPL. This includes 20 hours of dual flying (with an instructor), 10 hours of solo flying, and 5 hours of cross-country flights.' },
    { q: 'What is the cost of PPL training in India?', a: 'The total cost of PPL training in India ranges from ₹7.5 Lakhs to ₹10 Lakhs, which includes ground classes, flying hours, medical fees, and DGCA exam fees.' },
    { q: 'What is the difference between PPL and CPL?', a: 'PPL (Private Pilot License) allows you to fly for personal use only, while CPL (Commercial Pilot License) allows you to fly commercially and earn money as a professional pilot. CPL requires more flight hours, stricter medical standards, and more DGCA exams.' },
    { q: 'Which aircraft are used for PPL training?', a: 'PPL training is typically conducted on single-engine aircraft like the Cessna 152 or Cessna 172, which are ideal for learning basic flying skills.' },
    { q: 'Is PPL the first step to becoming an airline pilot?', a: 'Yes! PPL is generally considered the first step in a pilot\'s career journey. After PPL, you can pursue CPL, then build hours and eventually qualify for an ATPL (Airline Transport Pilot License) to fly for airlines.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PPLPage() {
    return (
        <Layout
            title="PPL Full Form in Aviation – Private Pilot License Complete Guide 2025"
            description="PPL Full Form in Aviation stands for Private Pilot License. Learn about PPL eligibility, subjects, cost, duration, career scope, and how it differs from CPL in India."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">Full Form Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        PPL Full Form in Aviation – <span className="text-av-orange">Private Pilot License</span>
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">2025 Complete Guide</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        In Aviation, <strong className="text-white">PPL stands for Private Pilot License</strong>. It is the first and most important step toward a professional flying career. Whether you want to fly for fun or build hours toward a CPL, the PPL is where every pilot's journey begins.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {['DGCA Approved', 'Min. 40 Flying Hours', 'Age 17+', '₹7.5 – ₹10 Lakhs'].map(tag => (
                            <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                ✓ {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── What is PPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">What is PPL?</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is PPL in <span className="text-av-orange">Aviation?</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">PPL Full Form = Private Pilot License — Here is Everything You Need To Know.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Private Pilot License Explained</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    A <strong className="text-av-blue">Private Pilot License (PPL)</strong> is an internationally recognized certificate that allows the holder to fly an aircraft privately — not for commercial purposes. It is issued by the country's aviation regulatory authority, such as:
                                </p>
                                <ul className="space-y-2 mb-4">
                                    {[
                                        'DGCA (India) – Directorate General of Civil Aviation',
                                        'FAA (USA) – Federal Aviation Administration',
                                        'EASA (Europe) – European Union Aviation Safety Agency',
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">•</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    The license enables individuals to fly single-engine aircraft for personal or recreational purposes, with or without passengers. It is the <strong className="text-av-blue">first stepping stone</strong> toward becoming a Commercial Pilot.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="space-y-5">
                                {/* Subjects */}
                                <div className="bg-av-blue rounded-2xl p-6 text-white">
                                    <h4 className="font-montserrat font-bold text-white mb-3">Subjects of PPL (Private Pilot License)</h4>
                                    <ul className="space-y-2">
                                        {pplSubjects.map((s, i) => (
                                            <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                                <span className="bg-av-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Flying Requirements */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">PPL Flying Training Requirements</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'Total Flight Hours: Minimum 40 to 50 hours',
                                            '20 hours of dual flying (with instructor)',
                                            '10 hours of solo flying',
                                            '5 hours of cross-country flying',
                                            'Conducted on single-engine aircraft like Cessna 152 or 172',
                                        ].map(item => (
                                            <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Eligibility, Cost, Duration, Career ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Details</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            PPL Eligibility, Cost, Duration & <span className="text-av-orange">Career Scope</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Eligibility */}
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Eligibility Criteria for PPL in India</h4>
                                <p className="text-white/60 text-xs mb-3">To apply for a PPL in India under DGCA, you must meet the following requirements:</p>
                                <div className="space-y-3">
                                    {pplEligibility.map(row => (
                                        <div key={row.criteria} className="bg-white/10 rounded-lg p-3">
                                            <p className="text-av-orange font-semibold text-xs">{row.criteria}</p>
                                            <p className="text-white/80 text-xs mt-0.5">{row.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Cost */}
                        <ScrollReveal delay={100}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">Cost of PPL Training in India</h4>
                                <div className="space-y-3">
                                    {pplCost.map((row, i) => (
                                        <div key={row.type} className={`rounded-lg p-3 ${i === pplCost.length - 1 ? 'bg-av-orange/30 border border-av-orange/50' : 'bg-white/10'}`}>
                                            <p className={`font-semibold text-xs ${i === pplCost.length - 1 ? 'text-av-orange' : 'text-white/70'}`}>{row.type}</p>
                                            <p className="text-white font-bold text-sm mt-0.5">{row.cost}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Duration */}
                        <ScrollReveal delay={200}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-4">PPL Course Duration & Schedule</h4>
                                <div className="space-y-3 mb-4">
                                    {pplDuration.map(row => (
                                        <div key={row.type} className="bg-white/10 rounded-lg p-3">
                                            <p className="text-av-orange font-semibold text-xs">{row.type}</p>
                                            <p className="text-white font-bold text-sm mt-0.5">{row.duration}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/50 text-xs">Duration may vary based on weather, student progress, and flying availability.</p>
                            </div>
                        </ScrollReveal>

                        {/* Career Scope */}
                        <ScrollReveal delay={300}>
                            <div className="glass rounded-2xl p-6 h-full">
                                <h4 className="font-montserrat font-bold text-white mb-3">Career Scope After PPL</h4>
                                <p className="text-white/60 text-xs mb-3">A PPL is not valid for commercial flying, but it opens doors to several opportunities:</p>
                                <ul className="space-y-2">
                                    {pplCareerScope.map(item => (
                                        <li key={item} className="flex items-start gap-2 text-white/80 text-xs">
                                            <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── PPL vs CPL ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Comparison</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            PPL vs CPL – <span className="text-av-orange">What is the Difference?</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Many students confuse PPL and CPL. Here is a clear comparison to help you understand the difference between a Private Pilot License and a Commercial Pilot License.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Aspect</th>
                                        <th className="px-5 py-4 text-left">PPL (Private Pilot License)</th>
                                        <th className="px-5 py-4 text-left">CPL (Commercial Pilot License)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pplVsCpl.map((row, i) => (
                                        <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.aspect}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.ppl}</td>
                                            <td className="px-5 py-3 text-av-orange font-medium">{row.cpl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="mt-8 text-center">
                        <p className="text-gray-600 text-sm mb-4">Want to go beyond PPL and become a commercial pilot?</p>
                        <Link href="/commercial-pilot-license" className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Learn About CPL →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Steps After PPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Next Steps</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Steps After PPL to Become an <span className="text-av-orange">Airline Pilot</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            PPL is just the beginning. Here's the full roadmap from PPL to flying for a major airline.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { step: '1', icon: '🪪', title: 'Get Your PPL', desc: 'Complete 40-50 hours of flying and pass basic DGCA subjects.' },
                            { step: '2', icon: '📝', title: 'Clear DGCA Exams', desc: 'Pass all 6 DGCA ground subjects: Navigation, Meteorology, Regulations, Technical & RTR.' },
                            { step: '3', icon: '🛩️', title: 'Complete 200 Hours', desc: 'Log minimum 200 flying hours at an approved flying school in India or abroad.' },
                            { step: '4', icon: '✈️', title: 'Get Your CPL', desc: 'After clearing DGCA exams and completing 200 hrs, apply for your Commercial Pilot License.' },
                            { step: '5', icon: '🏆', title: 'Join an Airline', desc: 'Apply for First Officer positions at airlines like IndiGo, Air India, SpiceJet and more.' },
                        ].map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center card-hover hover:border-av-orange/30 h-full">
                                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">{s.step}</div>
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{s.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked Questions About <span className="text-av-orange">PPL</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Everything You Want to Know About Private Pilot License</p>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 50}>
                                <details className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer">
                                    <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                                        {faq.q}
                                        <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Start Your Journey</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Your <span className="text-av-orange">Private Pilot License?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            Join We One Aviation Academy — India's most trusted pilot training institute. Get expert DGCA ground class coaching, flying school guidance, and full career support from PPL to airline cockpit.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Free Counselling →
                            </Link>
                            <Link href="/commercial-pilot-license" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Explore CPL Course
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}