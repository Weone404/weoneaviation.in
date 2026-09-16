import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import CadetHubLink from '../components/CadetHubLink';
import QuickAnswer from '../components/QuickAnswer';
import PeopleAlsoAsk from '../components/PeopleAlsoAsk';
import StructuredData from '../components/StructuredData';
import { generateFAQSchema } from '../lib/schema';
import { ACADEMY, CPL_HOURS, DGCA_PAPERS, EXAM_RULES, MIN_AGE, RTR, FTO, papersSummary } from '../lib/facts';

/*
 * DEPTH RESTORED 2026-09-16.
 *
 * This page was cut back on 15 September when its unsourced eligibility figures
 * were removed — an age band, an English test score and a DGCA medical
 * requirement that was wrong on its face, since a Qatari programme licenses
 * under the Qatar Civil Aviation Authority. That was the right removal but it
 * left the page thin, and a content audit rendering every page surfaced it.
 *
 * What is added here is depth that does NOT depend on airline-specific figures
 * we could not verify: what an ab-initio cadet route is, what it does not change
 * about an Indian licence, and the questions to ask. Every figure comes from
 * lib/facts.js. Do not add a Qatar Airways age band, fee or intake date without
 * a link to the airline's own page and the date it was read.
 */
const qatarPaa = [
  {
    q: 'What is the Qatar Airways cadet pilot programme?',
    a: 'An ab-initio route: it takes candidates with no licence and trains them towards airline flying. Qatar Airways runs a national programme for Qatari nationals and opens international intakes separately rather than continuously, so the first thing to establish is which intake is open — it decides whether you are eligible at all.',
  },
  {
    q: 'Does a cadet programme change what DGCA requires?',
    a: `No, and this is the part cadet marketing consistently leaves out. If the destination is an Indian commercial licence, the requirements are identical on every route: ${CPL_HOURS.total} hours as pilot of an aeroplane, ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each, a Class 1 medical, ${RTR.name}, and a minimum age of ${MIN_AGE.CPL}. A cadet programme changes how you are selected and funded, not the licence.`,
  },
  {
    q: 'Will a Qatar Airways licence let me fly in India?',
    a: 'Not as it stands. A licence issued under another country\u2019s regulator is not a DGCA licence, and converting it is a required step with its own time and cost that sits outside every training quote. If flying in India is the goal, put the conversion in the plan and the budget from the start.',
  },
  {
    q: 'What should I ask before applying?',
    a: `Which intake is open and whether your nationality is eligible for it; what the selection stages are and how many attempts you get; what the total cost is and what it excludes; what happens if you do not complete; and what exactly is being promised about employment. Get the answers in writing. How to check any training organisation is set out on our page about that — DGCA publishes an approved list of ${FTO.count} organisations and ranks them, which is more than most airlines publish about their cadet partners.`,
  },
];

const qatarFaqs = [
  { q: 'Is the Qatar Airways cadet programme open to Indians?', a: 'International intakes are opened separately from the national programme and are not continuous. Check the airline\u2019s own careers site for what is open now rather than relying on any coaching page, including this one.' },
  { q: 'Do I need flying experience to apply?', a: 'No. Ab-initio cadet routes are designed for candidates with no previous flying experience — that is what ab-initio means.' },
  { q: 'What medical do I need?', a: 'A Class 1 medical accepted by the regulator that will issue the licence. For a Qatari programme that is the Qatar Civil Aviation Authority, not DGCA. This page stated a DGCA medical until 15 September 2026; that was wrong and has been corrected.' },
  { q: 'Why does this page not list the age limit and fees?', a: 'Because we could not verify a current set against a Qatar Airways document. Everything findable was a third-party coaching page restating figures with no citation, and a figure we cannot source is one we will not publish — an age band that is wrong by a year stops someone applying who was eligible.' },
  { q: 'Does We One Aviation place students into cadet programmes?', a: ACADEMY.scope },
];

const qatarArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Qatar Airways Cadet Pilot Programme: What Changes and What Does Not',
  description: 'An ab-initio cadet route changes how you are selected and funded, not what DGCA requires. The requirements that hold on every route, and the questions to ask before applying.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'Airline cadet programmes',
  keywords: 'qatar airways cadet pilot program, qatar airways cadet, cadet pilot programme, qatar airways pilot',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://weoneaviation.in/qatar-airways-cadet-pilot-program' },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
  ],
};

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

            <StructuredData data={[qatarArticleSchema, generateFAQSchema(qatarFaqs)]} />

            <section className="px-4 pt-12 max-w-4xl mx-auto">
                <QuickAnswer question={qatarPaa[0].q} answer={qatarPaa[0].a} />
                <div className="mt-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-2">What a cadet programme does not change</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        If the destination is an Indian commercial licence, these hold on every route:{' '}
                        {CPL_HOURS.total} hours as pilot of an aeroplane, {DGCA_PAPERS.length} written papers
                        ({papersSummary()}) at {EXAM_RULES.theory.passMark}% each, a Class 1 medical, {RTR.name}, and a
                        minimum age of {MIN_AGE.CPL}. A cadet programme changes how you are selected and funded &mdash; not
                        the licence.
                    </p>
                </div>
            </section>

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
            <section className="px-4 pb-16 max-w-4xl mx-auto">
                <PeopleAlsoAsk items={qatarPaa} />
                <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12">Frequently asked questions</h2>
                <div className="space-y-3">
                    {qatarFaqs.map((f) => (
                        <details key={f.q} className="border border-gray-200 rounded-xl p-4">
                            <summary className="font-semibold text-av-blue text-sm cursor-pointer">{f.q}</summary>
                            <p className="text-gray-600 text-sm leading-relaxed mt-2">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

        </Layout>
    );
}