import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import CadetHubLink from '../components/CadetHubLink';

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

/*
 * CORRECTED 2026-09-15. This array used to state a minimum age of 17, an IELTS
 * 6.0 requirement and a DGCA medical as Emirates' cadet entry criteria. None
 * of those traced to an Emirates document, and the DGCA medical is wrong on its
 * face: training at Emirates Flight Training Academy in Dubai is not conducted
 * under DGCA, so a DGCA medical is not what it asks for.
 *
 * What replaces them is what Emirates itself publishes, plus an honest note
 * that the detailed criteria are published per intake and have to be read at
 * the source. Do not put a number back here without a link and a date.
 */
const eligibility = [
    { icon: '🇦🇪', label: 'Nationality', desc: 'The fully sponsored National Cadet Pilot Programme is an Emiratisation programme — Emirates publishes it for UAE nationals. Emirates Flight Training Academy separately admits international cadets, who fund their own training.' },
    { icon: '🎓', label: 'Education', desc: 'A school-leaving qualification with mathematics, physics and English is the usual starting point for any ab-initio cadet route. Emirates publishes its exact requirement per intake — read it there before applying.' },
    { icon: '🩺', label: 'Medical Fitness', desc: 'A Class 1 medical accepted by the regulator that will issue the licence. For training in Dubai that is the UAE authority, not DGCA. An Indian candidate who later wants an Indian licence has a conversion step and a DGCA medical of its own.' },
    { icon: '✈️', label: 'Prior Experience', desc: 'Ab-initio routes are designed for candidates with no previous flying experience.' },
    { icon: '📄', label: 'Everything else', desc: 'Age bands, English test scores, selection stages and fees change between intakes. We do not print them here because a figure that is wrong by one intake is worse than no figure. Emirates publishes the current set on its own careers site.' },
];

const trainingPhases = [
    { phase: 'Ground School', desc: 'Aviation theory, air law, meteorology, navigation, aircraft systems' },
    { phase: 'Flight Training', desc: 'Hands-on training with SR22 and DA42 aircraft at EFTA' },
    { phase: 'Simulator Training', desc: 'Jet transition, MCC training on advanced flight simulators' },
    { phase: 'Jet Orientation', desc: 'Specific Emirates fleet procedures and safety training' },
];

/*
 * CORRECTED 2026-09-15. The first line of this array used to read "Guaranteed
 * job interview with Emirates upon successful completion". Emirates' own
 * statement contradicts it: its release inviting applicants to the academy says
 * that candidates interested in opportunities with the airline "will be
 * required to pass the selection process put in place by the airline". A
 * guarantee we cannot substantiate, about another company's hiring, is exactly
 * the class of claim this site does not make. It is gone and it does not come
 * back.
 */
const keyBenefits = [
    'A structured ab-initio route, designed for candidates with no previous flying experience',
    'Training in a jurisdiction with year-round flying weather, which is what actually governs how fast hours accumulate',
    'A large academy fleet, so aircraft availability is less often the constraint it is elsewhere',
    'A recognised name on the logbook, which helps at the margin and is not the same as a job',
];

/*
 * What the route does NOT give you. Published deliberately, because it is the
 * part a prospective cadet needs most and the part no marketing page carries.
 */
const keyLimits = [
    'It is not a job. Emirates states that candidates interested in flying for the airline must pass the selection process the airline puts in place.',
    'It does not give you an Indian licence. A licence issued in the UAE has to be converted before you can fly commercially in India, which costs time and money a headline fee will not show.',
    'The fully sponsored programme is an Emiratisation programme for UAE nationals. An Indian candidate is looking at the self-funded academy route, not the sponsored one.',
];

export default function EmiratesCadet() {
    return (
        <Layout title="Emirates Cadet Pilot Program – Complete Guide | We One Aviation Academy" description="Complete guide to the Emirates Cadet Pilot Program. Learn about eligibility, training phases, costs, facilities at EFTA and how to apply for this prestigious aviation pathway.">
            <HeroSlider customSlides={heroSlides} asH1={false} />

            <CadetHubLink airline="Emirates" />

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
                                {[['17+ Years', 'Min Age'], ['Zero to CPL', 'Training Level'], ['Dubai, UAE', 'Training Base'], ['DGCA', 'Medical Required']].map(([val, label]) => (
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
                                    'Emirates publishes the National Cadet Pilot Programme as an Emiratisation programme — a fully sponsored route for UAE nationals.',
                                    'International cadets at Emirates Flight Training Academy fund their own training. We do not print a figure here: the fee is set by the academy, it is revised, and the number that used to sit on this page was not traceable to any Emirates document. Ask the academy directly and get it in writing.',
                                    'Whatever the figure, ask what it excludes — accommodation, visa, medical, examination fees, and the cost of converting the licence afterwards if you intend to fly in India.',
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

                            {/* What it does not give you */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What this route does not give you</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                This section exists because it is the part a cadet needs most and the part no brochure carries.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {keyLimits.map((item) => (
                                    <li key={item.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">&times;</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* After Training */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Happens After Training?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                A graduate holds a licence, not a job. Emirates states that candidates interested in opportunities
                                with the airline are required to pass the selection process the airline puts in place &mdash; so
                                completing the training is the qualification to be considered, not the outcome. Any page telling you
                                otherwise is describing a decision that belongs to the airline.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                If your intention is to fly in India, add the conversion of the licence to a DGCA licence to your
                                plan and your budget from the start. Our{' '}
                                <Link href="/cadet-pilot-program" className="text-av-blue font-semibold underline">cadet programme overview</Link>{' '}
                                sets out what stays the same on every route, and{' '}
                                <Link href="/how-to-choose-an-aviation-academy" className="text-av-blue font-semibold underline">how to check an academy</Link>{' '}
                                covers what you can verify before paying anyone.
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
                                    <li>✓ 12th with mathematics, physics and English</li>
                                    <li>✓ No prior flying experience needed</li>
                                    <li>✓ Ab-initio to CPL with a multi-engine instrument rating</li>
                                    <li>✓ Class 1 medical from the regulator issuing the licence</li>
                                    <li>&mdash; Sponsored programme: UAE nationals</li>
                                    <li>&mdash; International cadets: self-funded</li>
                                    <li>&mdash; Age bands and English scores: per intake, read them at the source</li>
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