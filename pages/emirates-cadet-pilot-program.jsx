import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Cadet Program', title: 'Emirates Cadet', highlight: 'Pilot Program', sub: 'Turn Your Dream of Flying for Emirates into Reality' },
];

const trainingIncludes = [
    'Ground school',
    'Flight training',
    'Simulator sessions',
    'Multi-Crew Cooperation (MCC)',
];

const academyFacilities = [
    'Diamond DA42 and Cirrus SR22 aircraft',
    'Full-flight simulators',
    'Glass cockpit-equipped aircraft',
    'Experienced international instructors',
];

const eligibility = [
    { icon: '🎂', label: 'Age', desc: 'Minimum 17 years old' },
    { icon: '🎓', label: 'Education', desc: 'Completed high school with strong grades in Math, Physics, and English' },
    { icon: '🗣️', label: 'English Proficiency', desc: 'IELTS score of 6.0+ or equivalent' },
    { icon: '🩺', label: 'Medical Fitness', desc: 'Must pass a Class 1 Aviation Medical Exam' },
    { icon: '✈️', label: 'Prior Experience', desc: 'No Prior Flight Experience Required' },
];

const trainingPhases = [
    { phase: 'Ground School', desc: 'Aviation theory, air law, meteorology, navigation, aircraft systems' },
    { phase: 'Flight Training', desc: 'Hands-on training with SR22 and DA42 aircraft at EFTA' },
    { phase: 'Simulator Training', desc: 'Jet transition, MCC training on advanced flight simulators' },
    { phase: 'Jet Orientation', desc: 'Specific Emirates fleet procedures and safety training' },
];

const keyBenefits = [
    'Guaranteed job interview with Emirates upon successful completion',
    'World-class training facilities',
    'Fast-track to becoming an airline pilot',
    'Exposure to real-world aviation from day one',
    'Potential to fly A380 or B777 aircraft in future',
];

export default function EmiratesCadet() {
    return (
        <Layout title="Emirates Cadet Pilot Program – Complete Guide | WeOne Aviation Academy" description="Complete guide to the Emirates Cadet Pilot Program. Learn about eligibility, training phases, costs, facilities at EFTA and how to apply for this prestigious aviation pathway.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="section-tag">Cadet Program</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Emirates Cadet Pilot Program
                            </h1>
                            <h2 className="font-montserrat text-xl font-semibold text-av-orange mb-4">
                                Turn Your Dream of Flying for Emirates into Reality
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Have you ever dreamed of flying a Boeing 777 or Airbus A380 with Emirates — one of the world's most prestigious airlines? The Emirates Cadet Pilot Program is your golden opportunity to transform that dream into a lifelong career.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                This highly prestigious program grooms passionate, driven individuals into fully qualified Commercial Airline Pilots, ready to fly Emirates' modern fleet across the globe.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['17+ Years', 'Min Age'], ['Zero to CPL', 'Training Level'], ['Dubai, UAE', 'Training Base'], ['Class 1', 'Medical Required']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is the Program */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is the Emirates Cadet Pilot Program?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                The Emirates Cadet Pilot Program is a specialized aviation training pathway created by Emirates Airline, based in Dubai, UAE, to prepare the next generation of world-class airline pilots.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                This program takes candidates with zero flying experience and transforms them into First Officers, trained to operate some of the largest and most advanced aircraft in the sky.
                            </p>
                            <p className="text-gray-600 text-sm font-semibold mb-3">The training includes:</p>
                            <ul className="space-y-2 mb-4">
                                {trainingIncludes.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 text-xs mb-10">
                                — all conducted to meet Emirates' exceptionally high operational standards.
                            </p>

                            {/* Where Training Conducted */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Where is the Training Conducted?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                All training is conducted at the <span className="font-semibold text-av-blue">Emirates Flight Training Academy (EFTA)</span>, located at Dubai World Central (DWC). The academy offers world-class facilities, including:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {academyFacilities.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Eligibility */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Can Apply?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Emirates is selective. To be eligible, applicants usually need to meet the following requirements:
                            </p>
                            <div className="space-y-4 mb-4">
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
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                <span className="font-semibold text-av-blue">Bonus:</span> UAE nationals have dedicated pathways under Emirati Cadet Pilot sponsorship programs.
                            </p>

                            {/* Training Curriculum */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Does the Training Include?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                The Emirates Cadet Pilot training curriculum is comprehensive and world-class:
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">Phase</th>
                                            <th className="p-3 text-left text-xs font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainingPhases.map((row, i) => (
                                            <tr key={row.phase} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-av-blue font-semibold text-xs">{row.phase}</td>
                                                <td className="p-3 text-gray-600 text-xs">{row.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-500 text-xs mb-10">
                                Upon completion, cadets are awarded a <span className="font-semibold text-av-blue">Commercial Pilot License (CPL)</span> with <span className="font-semibold text-av-blue">Multi-Engine Instrument Rating (MEIR)</span>.
                            </p>

                            {/* Costs */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Are the Costs?</h3>
                            <ul className="space-y-2 mb-10">
                                {[
                                    'Emirates fully sponsors selected Emirati nationals.',
                                    'For international students, cost details may vary and should be confirmed directly with Emirates Flight Training Academy. Estimated costs range from $100,000 to $170,000 depending on modules, housing, and services.',
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Key Benefits */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Key Benefits of the Emirates Cadet Pilot Program</h3>
                            <ul className="space-y-2 mb-10">
                                {keyBenefits.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* After Training */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Happens After Training?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Once cadets graduate and receive their CPL and type rating, they may be absorbed into Emirates' roster of First Officers, subject to vacancies and performance. Many cadets move on to fly long-haul routes, operating global flights alongside senior Captains.
                            </p>

                            {/* How to Apply */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How to Apply?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                You can apply online through the official Emirates Flight Training Academy website:{' '}
                                <a href="https://emiratesflighttrainingacademy.com" target="_blank" rel="noopener noreferrer" className="text-av-orange font-semibold hover:underline">
                                    https://emiratesflighttrainingacademy.com
                                </a>
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Prepare your academic documents, identification, and be ready for aptitude assessments, interviews, and medical screening.
                            </p>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Start Your Emirates Cadet Journey</h3>
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
                            <LeadForm title="Apply for Emirates Cadet Program" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Eligibility at a Glance</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ Age: 17+ years</li>
                                    <li>✓ 12th with Math, Physics & English</li>
                                    <li>✓ IELTS 6.0+ (English proficiency)</li>
                                    <li>✓ Class 1 Medical Certificate</li>
                                    <li>✓ No prior flying experience needed</li>
                                    <li>✓ Zero to CPL + MEIR training</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Program Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Emirates Cadet Pilot Program:</p>
                                <div className="text-2xl font-montserrat font-black">Zero to CPL</div>
                                <div className="text-white/70 text-xs mt-1">Emirates Flight Training Academy, Dubai</div>
                                <div className="text-white/70 text-xs mt-1">CPL + Multi-Engine Instrument Rating</div>
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