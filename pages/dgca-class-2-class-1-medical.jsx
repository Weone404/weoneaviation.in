import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import Link from 'next/link';
import { MEDICAL_STANDARDS as MED, LICENCES, ACADEMY } from '../lib/facts';

/*
 * /dgca-class-2-class-1-medical — restored and rewritten 2026-09-11.
 *
 * This route was 301'd to /commercial-pilot-license-eligibility in the 2026-08
 * claims pass: the Class 1 / Class 2 distinction was the page's whole subject
 * and could not be sourced, so retiring the URL beat leaving it asserting
 * something the copy no longer said. The CAR behind the distinction has since
 * been found, so the page is back — every statement below renders from
 * lib/facts.js MEDICAL_STANDARDS, which carries the sourcing note.
 *
 * WHAT THIS PAGE MUST NEVER DO. We do not conduct medicals, book them, or
 * influence their outcome, and nothing here may suggest otherwise — see the
 * facility patterns in scripts/check-claims.js. No pass rates. No exhaustive
 * list of disqualifying conditions, because a partial list read as complete is
 * how a reader talks themselves out of a career. No page can tell someone
 * whether they will clear a medical; the examiner does that.
 *
 * The centres list moves. MEDICAL_STANDARDS.centresAsOf is the date it was
 * read, and it is printed on the page so a reader can judge its age.
 */

const CANONICAL = 'https://weoneaviation.in/dgca-class-2-class-1-medical';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
const CHECKED_ON = longDate(MED.verifiedOn);

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Medical', title: 'Class 1 and Class 2', highlight: 'Medical', sub: 'Which licence needs which class, how long each lasts, and where DGCA says you can get it done' },
];

const contents = [
    ['which-class', 'Which class your licence needs'],
    ['validity', 'How long each medical lasts'],
    ['examination', 'What the examination covers'],
    ['centres', 'Where DGCA says you can get it done'],
    ['rules', 'The rules behind all of this'],
    ['order', 'The order to do things in'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const ncrCentres = [...MED.centres.airForce, ...MED.centres.civil].filter((c) => /Delhi|Gurugram/.test(c.city));

const faqs = [
    {
        q: 'Do I need a Class 1 or a Class 2 medical to start pilot training?',
        a: `A Class 2, to begin with. ${MED.classes[1].licences[2]} sits in the Class 2 list, and that is the licence you train on. The Class 1 is what the ${MED.classes[0].licences[0]} needs, so you will need one before the licence you are actually training towards. ${MED.timingAdvice}`,
    },
    {
        q: 'How long is a DGCA Class 1 medical valid?',
        a: `${MED.classes[0].validity} That age boundary is current because rule 39C of the Aircraft Rules, 1937 was amended on 27 December 2019 to raise it from forty years to sixty. Any source still saying the six-monthly band starts at 40 is quoting the pre-2020 rule.`,
    },
    {
        q: 'How long is a Class 2 medical valid?',
        a: MED.classes[1].validity,
    },
    {
        q: 'Where can I do my Class 1 medical in Delhi?',
        a: `Of the ${MED.centres.airForce.length + MED.centres.civil.length} centres on DGCA's list as of ${MED.centresAsOf}, ${ncrCentres.length} are in Delhi and the NCR: ${ncrCentres.map((c) => `${c.name} (${c.city})`).join(', ')}. ${MED.centres.listNote}`,
    },
    {
        q: 'Who is allowed to conduct the examination?',
        a: `Class 1: ${MED.classes[0].conductedBy} Class 2: ${MED.classes[1].conductedBy}`,
    },
    {
        q: 'What does the medical actually test?',
        a: `${MED.examination.groups.join(', ')}. ${MED.examination.standardsFrom} ${MED.examination.note}`,
    },
    {
        q: 'Can DGCA ask me to take a medical outside the normal schedule?',
        a: MED.rules.anyTime,
    },
    {
        q: 'Which medical does an air traffic controller need?',
        a: `${MED.classes[2].cls}. ${MED.classes[2].validity} It is set by the same CAR as the pilot classes.`,
    },
    {
        q: 'Does a Private Pilot Licence ever need a Class 1?',
        a: 'Yes, in one case: where instrument rating privileges are required. A Private Pilot Licence otherwise sits in the Class 2 list.',
    },
    {
        q: 'Will I pass?',
        a: `That is the one question this page will not answer, and you should be wary of any page that does. ${MED.examination.note} Book early, be honest with the examiner, and get the answer from the people DGCA authorises to give it.`,
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DGCA Class 1 and Class 2 Medical: What Each Licence Needs',
    description: 'Which pilot licence needs a Class 1 medical and which needs a Class 2, how long each assessment stays valid by age, what the examination covers, and the DGCA-approved centres where it is conducted.',
    inLanguage: 'en-IN',
    dateModified: MED.verifiedOn,
    articleSection: 'DGCA medical',
    keywords: 'dgca class 1 medical, dgca class 2 medical, class 1 medical validity, dgca medical centres, class 1 medical delhi, pilot medical india',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
        '@type': 'EducationalOrganization',
        name: ACADEMY.name,
        url: ACADEMY.url,
        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    citation: MED.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

const H2 = 'font-montserrat text-xl font-bold text-av-blue mb-3';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function DGCAMedical() {
    return (
        <Layout
            title="DGCA Class 1 and Class 2 Medical: Rules and Centres"
            description="Which licence needs a Class 1 and which a Class 2, how long each lasts, what the examination covers, and the DGCA-approved centres — every figure cited."
        >
            <StructuredData data={[articleSchema, faqSchema]} />
            <HeroSlider customSlides={heroSlides} asH1={false} />

            <section className="py-20 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Medical</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-3 underline-orange">
                                DGCA Class 1 and Class 2 Medical: What Each Licence Needs
                            </h1>

                            <p className="text-xs text-gray-500 mb-6">
                                Checked against the Aircraft Rules and the DGCA medical CAR on {CHECKED_ON}; the centres list is
                                DGCA&rsquo;s own, as it stood on {MED.centresAsOf}. Every figure is{' '}
                                <a href="#sources" className={A}>sourced below</a>.
                            </p>

                            <div className="bg-av-light border-l-4 border-av-orange rounded-xl p-5 mb-8">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    A Commercial or Airline Transport Pilot Licence needs a Class 1 medical. A Student or Private
                                    Pilot Licence needs a Class 2. A Class 1 stays valid for one year up to age 60 and six months
                                    after that; a Class 2 for two years up to age 50, then one year. DGCA lists{' '}
                                    {MED.centres.airForce.length + MED.centres.civil.length} approved centres, {ncrCentres.length} of
                                    them in Delhi and the NCR.
                                </p>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                                    {contents.map(([id, label]) => (
                                        <li key={id} className="text-gray-600"><a href={`#${id}`} className={A}>{label}</a></li>
                                    ))}
                                </ol>
                            </div>

                            {/* Which class */}
                            <h2 id="which-class" className={H2}>Which class your licence needs</h2>
                            <p className={P}>
                                This is the question the page exists for, and the answer is set by{' '}
                                {MED.car.citation} — {MED.car.title}. It is not a matter of opinion, and it does not vary between
                                flying schools.
                            </p>
                            <div className="space-y-5 mb-10">
                                {MED.classes.map((c) => (
                                    <div key={c.cls} className="border border-gray-200 rounded-xl p-5">
                                        <p className="font-montserrat font-bold text-av-blue text-base mb-3">{c.cls}</p>
                                        <p className="font-semibold text-av-blue text-xs mb-2">Required for</p>
                                        <ul className="space-y-1.5 mb-4">
                                            {c.licences.map((l) => (
                                                <li key={l} className="flex gap-2 items-start text-sm text-gray-600">
                                                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>{l}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-1">
                                            <span className="font-semibold text-av-blue">Valid for:</span> {c.validity}
                                        </p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            <span className="font-semibold text-av-blue">Conducted by:</span> {c.conductedBy}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Validity */}
                            <h2 id="validity" className={H2}>How long each medical lasts</h2>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Class</th>
                                            <th className={TH}>Period of validity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MED.classes.map((c, i) => (
                                            <tr key={c.cls} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top whitespace-nowrap">{c.cls}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.validity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                One detail worth checking against anything else you read: {MED.rules.validityAmendment} A page still
                                saying the six-monthly band starts at forty is quoting the rule as it stood before 2020.
                            </p>

                            {/* Examination */}
                            <h2 id="examination" className={H2}>What the examination covers</h2>
                            <p className={P}>The CAR groups the assessment into three heads.</p>
                            <div className="grid sm:grid-cols-3 gap-4 mb-4">
                                {MED.examination.groups.map((g) => (
                                    <div key={g} className="bg-av-blue rounded-xl p-5 text-white">
                                        <p className="font-montserrat font-bold text-sm">{g}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={P}>{MED.examination.standardsFrom} {MED.examination.note}</p>

                            {/* Centres */}
                            <h2 id="centres" className={H2}>Where DGCA says you can get it done</h2>
                            <p className={P}>
                                DGCA publishes the list of approved aeromedical evaluation centres and empanelled Class 1 examiners.
                                This is that list as it stood on {MED.centresAsOf}. {MED.centres.listNote} We have no role in it and
                                no view on which centre to choose.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Centre</th>
                                            <th className={TH}>Location</th>
                                            <th className={TH}>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MED.centres.airForce.map((c, i) => (
                                            <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{c.name}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.city}</td>
                                                <td className="p-3 text-gray-600 align-top">Air Force boarding centre</td>
                                            </tr>
                                        ))}
                                        {MED.centres.civil.map((c, i) => (
                                            <tr key={`${c.name}-${c.city}`} className={(i + MED.centres.airForce.length) % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{c.name}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.city}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                If you are training from Delhi, {ncrCentres.length} of the{' '}
                                {MED.centres.airForce.length + MED.centres.civil.length} are within reach without travel:{' '}
                                {ncrCentres.map((c) => c.name).join(', ')}.
                            </p>

                            {/* Rules */}
                            <h2 id="rules" className={H2}>The rules behind all of this</h2>
                            <div className="space-y-3 mb-10">
                                {[MED.rules.duty, MED.rules.anyTime, MED.rules.validityAmendment].map((r) => (
                                    <div key={r} className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4">
                                        <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order */}
                            <h2 id="order" className={H2}>The order to do things in</h2>
                            <p className={P}>{MED.timingAdvice}</p>
                            <p className={P}>
                                The licence ladder those classes attach to runs{' '}
                                {LICENCES.map((l) => `${l.code} from age ${l.minAge}`).join(', ')}. The{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number</Link> and the{' '}
                                <Link href="/dgca-pariksha" className={A}>written papers</Link> are a separate track and need no
                                medical certificate at all — a point worth knowing, because waiting for a medical before registering
                                for examinations costs students a session every year.
                            </p>

                            {/* FAQs */}
                            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.a}</p>
                                    </details>
                                ))}
                            </div>

                            {/* Sources */}
                            <h2 id="sources" className={H2}>Sources</h2>
                            <p className={P}>Read on {CHECKED_ON}. Where two of these disagree, the later one governs and this page says so.</p>
                            <ul className="space-y-2 mb-10">
                                {MED.sources.map((s) => (
                                    <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Not sure which medical to book first?</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    We do not conduct medicals and we have no influence over the result — that sits entirely with the
                                    examiner DGCA authorises. What we can do is tell you which class your intended licence needs, where
                                    the approved centres are, and how to sequence the medical against your ground classes and
                                    examinations so you are not waiting on one to start the other.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Talk to a counsellor
                                    </Link>
                                    <Link href="/dgca-ground-classes" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        DGCA ground classes
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Ask About the DGCA Medical" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">At a glance</h4>
                                <p className="text-white/90 text-sm font-semibold">Class 1</p>
                                <p className="text-white/70 text-xs mb-3">CPL and ATPL · 1 year to age 60, then 6-monthly</p>
                                <p className="text-white/90 text-sm font-semibold">Class 2</p>
                                <p className="text-white/70 text-xs mb-3">SPL and PPL · 2 years to age 50, then 1 year</p>
                                <p className="text-white/90 text-sm font-semibold">Class 3</p>
                                <p className="text-white/70 text-xs">Air traffic controllers</p>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">Approved centres in Delhi NCR</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    {ncrCentres.map((c) => (
                                        <li key={c.name}>✓ {c.name} — {c.city}</li>
                                    ))}
                                </ul>
                                <p className="text-white/50 text-xs mt-3">DGCA list as of {MED.centresAsOf}</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Next steps</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                                    <li><Link href="/dgca-pariksha" className={A}>DGCA Pariksha: papers and fees</Link></li>
                                    <li><Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link></li>
                                    <li><Link href="/student-pilot-license-spl" className={A}>Student Pilot Licence</Link></li>
                                    <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
