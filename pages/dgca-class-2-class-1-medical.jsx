import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import Link from 'next/link';
import { MEDICAL_STANDARDS as MED, LICENCES, ACADEMY } from '../lib/facts';

/*
 * /dgca-class-2-class-1-medical — rewritten 2026-09-16 against Revision 7.
 *
 * This route was 301'd away in the 2026-08 claims pass because the Class 1 /
 * Class 2 distinction could not be sourced. It came back on 2026-09-11 on
 * Revision 6 of the medical CAR. On 2026-09-16 the owner supplied the DGCA
 * PDFs of Revision 7 (01.10.2025, effective 15.11.2025) and of the two
 * examiner-empanelment CARs, so the page now renders the current revision and
 * carries the fees, the booking step, the 45-day window, the appeal route and
 * the Class 2 investigation table, none of which the site had before.
 *
 * WHAT THIS PAGE MUST NEVER DO. We do not conduct medicals, book them, or
 * influence their outcome, and nothing here may suggest otherwise — see the
 * facility patterns in scripts/check-claims.js. No pass rates. No exhaustive
 * list of disqualifying conditions, because a partial list read as complete is
 * how a reader talks themselves out of a career. No page can tell someone
 * whether they will clear a medical; the examiner does that.
 *
 * THE EYESIGHT SECTION IS DELIBERATE. Revision 7 publishes no numeric vision
 * standard at all — it adopts ICAO Annex 1 Chapter 6 and the AICs by
 * reference. Saying that plainly is the honest answer to the most-searched
 * question on this subject, and it is worth more than a number we cannot
 * source. Do not replace it with a figure unless someone has read Annex 1 or
 * the AIC and the citation says so.
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
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Medical', title: 'Class 1 and Class 2', highlight: 'Medical', sub: 'Which licence needs which class, what it costs, where DGCA says you can get it done, and what happens if you are declared unfit' },
];

const contents = [
    ['which-class', 'Which class your licence needs'],
    ['validity', 'How long each medical lasts'],
    ['eyesight', 'What the CAR actually says about eyesight'],
    ['examination', 'What the examination covers'],
    ['class2-tests', 'The Class 2 investigations, by age'],
    ['fees', 'What DGCA charges'],
    ['booking', 'How to book, and the forms'],
    ['order', 'Class 2 first, or straight to Class 1'],
    ['centres', 'Where DGCA says you can get it done'],
    ['outcomes', 'Fit, fit with limitations, unfit'],
    ['timing', 'The 45-day window, and when you need an NOC'],
    ['appeal', 'If you are declared unfit'],
    ['examiners', 'Who counts as a DGCA medical examiner'],
    ['rules', 'The rules behind all of this'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const allCentres = [...MED.centres.boardingCentres, ...MED.centres.civil];
const ncrCentres = allCentres.filter((c) => /Delhi|Gurugram/.test(c.city));

const faqs = [
    {
        q: 'Do I need a Class 1 or a Class 2 medical to start pilot training?',
        a: `A Class 2 is what the Student Pilot Licence needs, and that is the licence you train on. The Class 1 is what the Commercial Pilot Licence needs, so you will need one before the licence you are actually training towards. ${MED.classOrder.advice}`,
    },
    {
        q: 'Is a Class 2 medical compulsory before the Class 1 initial?',
        a: `${MED.classOrder.notMandatory} ${MED.classOrder.ifYouDoClass2First}`,
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
        q: 'What eyesight do you need to be a pilot in India?',
        a: `${MED.examination.noNumbersInCar} ${MED.examination.standardsFrom} The practical answer is that vision and colour perception are assessed against the ICAO standard by a DGCA-empanelled examiner, corrective lenses are dealt with inside that standard rather than by a blanket bar, and the only person who can tell you where you stand is the examiner.`,
    },
    {
        q: 'What does a DGCA Class 1 medical cost?',
        a: `At the Indian Air Force centres, ${MED.fees.rows[0].label} for a Class 1, initial or renewal, and ${MED.fees.rows[2].label} for a Class 2 or Class 3. It is paid on the Bharatkosh portal before the examination. ${MED.fees.investigationCharges} ${MED.fees.privateExaminers}`,
    },
    {
        q: 'Where do I book the appointment?',
        a: `${MED.process.booking} The same portal carries the rest of your licensing file, which is why the computer number and the licence application live there too.`,
    },
    {
        q: 'Where can I do my Class 1 medical in Delhi?',
        a: `Of the centres on DGCA's list as of ${MED.centresAsOf}, ${ncrCentres.length} are in Delhi and the NCR: ${ncrCentres.map((c) => `${c.name} (${c.city})`).join(', ')}. ${MED.centres.listNote}`,
    },
    {
        q: 'Can I do the initial Class 1 at any empanelled examiner?',
        a: `No. ${MED.centres.initialIssueOnly.note} They are ${MED.centres.initialIssueOnly.list.join(', ')}. ${MED.centres.initialIssueOnly.routine}`,
    },
    {
        q: 'What tests are done in a Class 2 medical?',
        a: `For an initial examination: ${MED.class2Investigations.rows[0].tests}. The panel changes with age at renewal, and ${MED.class2Investigations.additional.charAt(0).toLowerCase()}${MED.class2Investigations.additional.slice(1)}`,
    },
    {
        q: 'What happens if I am declared temporarily unfit?',
        a: `You carry out no flying duties until a satisfactory final assessment is issued by DGCA. ${MED.timing.minorIllness}`,
    },
    {
        q: 'Can I appeal a permanent unfit decision?',
        a: `Yes. ${MED.appeal.trigger} ${MED.appeal.window} ${MED.appeal.how} ${MED.appeal.finality}`,
    },
    {
        q: 'Can I take my medical early, or a little late?',
        a: MED.timing.window,
    },
    {
        q: 'Who is allowed to conduct the examination?',
        a: `Class 1: ${MED.classes[0].conductedBy} Class 2: ${MED.classes[1].conductedBy}`,
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
        q: 'Are there DGCA medical examiners in Dwarka?',
        a: `DGCA's Class 1 examiner list carries ${MED.centres.dwarka.class1Examiners} empanelled Class 1 medical examiners with addresses in Dwarka — sectors ${MED.centres.dwarka.sectors.join(', ')} — and one more at Delhi International Airport. ${MED.centres.dwarka.note} ${MED.centres.listNote}`,
    },
    {
        q: 'How do I check whether a doctor is really a DGCA medical examiner?',
        a: `DGCA publishes the empanelled lists by name, with addresses, contact details and the date each empanelment runs to. They are linked in the sources on this page. ${MED.centres.class2ListCaution}`,
    },
    {
        q: 'Will I pass?',
        a: `That is the one question this page will not answer, and you should be wary of any page that does. ${MED.examination.note} Book early, be honest with the examiner, and get the answer from the people DGCA authorises to give it.`,
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DGCA Class 1 and Class 2 Medical: Rules, Fees, Centres and Appeals',
    description: 'Which pilot licence needs a Class 1 medical and which needs a Class 2, how long each assessment stays valid by age, what DGCA charges, what the examination covers, where it is conducted, and what happens if you are declared unfit. Every figure from CAR Section 7 Series C.',
    inLanguage: 'en-IN',
    dateModified: MED.verifiedOn,
    articleSection: 'DGCA medical',
    keywords: 'dgca class 1 medical, dgca class 2 medical, class 1 medical validity, dgca medical fees, dgca medical centres, class 1 medical delhi, pilot eyesight requirements india, pilot medical india',
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
            title="DGCA Class 1 and Class 2 Medical: Rules, Fees and Centres"
            description="Which licence needs a Class 1 and which a Class 2, how long each lasts, what DGCA charges, what the examination covers, the approved centres, and the appeal route — every figure cited to the CAR."
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
                                Read against {MED.car.citation}, effective {MED.car.effectiveFrom}, on {CHECKED_ON}; the centres
                                list is DGCA&rsquo;s own, as it stood on {MED.centresAsOf}. Every figure is{' '}
                                <a href="#sources" className={A}>sourced below</a>.
                            </p>

                            <div className="bg-av-light border-l-4 border-av-orange rounded-xl p-5 mb-8">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    A Commercial or Airline Transport Pilot Licence needs a Class 1 medical. A Student or Private
                                    Pilot Licence needs a Class 2. A Class 1 stays valid for one year up to age 60 and six months
                                    after that; a Class 2 for two years up to age 50, then one year. At the Air Force centres DGCA
                                    charges {MED.fees.rows[0].label} for a Class 1 and {MED.fees.rows[2].label} for a Class 2, and
                                    the appointment is booked on eGCA. The initial Class 1 can only be done at AFCME New Delhi, IAM
                                    Bengaluru, MEC (East) Jorhat or a DGCA-empanelled aeromedical evaluation centre.
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
                                This is the question the page exists for, and the answer is set by {MED.car.citation} —{' '}
                                {MED.car.title}. It is issued under {MED.car.issuedUnder} It is not a matter of opinion, and it does
                                not vary between flying schools.
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
                                        <p className="text-sm text-gray-600 leading-relaxed mb-1">
                                            <span className="font-semibold text-av-blue">Conducted by:</span> {c.conductedBy}
                                        </p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            <span className="font-semibold text-av-blue">Standards:</span> {c.icaoParas}
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
                                One detail worth checking against anything else you read: {MED.rules.validity39C} A page still
                                saying the six-monthly band starts at forty is quoting the rule as it stood before 2020.
                            </p>

                            {/* Eyesight */}
                            <h2 id="eyesight" className={H2}>What the CAR actually says about eyesight</h2>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-5 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.examination.noNumbersInCar}</p>
                            </div>
                            <p className={P}>
                                That is worth stating plainly, because &ldquo;pilot eyesight requirements&rdquo; is one of the most
                                searched questions in Indian aviation and most of the answers in circulation quote a specific number
                                and credit it to DGCA. {MED.examination.standardsFrom}
                            </p>
                            <p className={P}>
                                What follows from that: your vision and colour perception are assessed against the ICAO Annex 1
                                standard by a DGCA-empanelled examiner, not against a figure published in the Indian CAR. Corrective
                                lenses and refractive surgery are handled inside that standard and the AICs rather than by a blanket
                                bar, which is why the CAR&rsquo;s list of common recommendations includes eye investigations such as
                                optical coherence tomography and Humphrey visual field testing at the next renewal rather than an
                                automatic unfit. If you have a known eye condition, the useful step is a consultation with a
                                DGCA-empanelled Class 1 examiner before you spend anything on training — not a search result.
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
                            <p className={P}>The applicant is also required to be free from:</p>
                            <ul className="space-y-1.5 mb-4">
                                {MED.examination.freeFrom.map((f) => (
                                    <li key={f} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>{f}
                                    </li>
                                ))}
                            </ul>
                            <p className={P}>{MED.examination.freeFromQualifier} {MED.examination.note}</p>

                            {/* Class 2 investigations */}
                            <h2 id="class2-tests" className={H2}>The Class 2 investigations, by age</h2>
                            <p className={P}>
                                The Class 2 panel is published, which means you can walk into the examination knowing exactly what
                                will be done. This is {MED.class2Investigations.citation}.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Examination</th>
                                            <th className={TH}>Mandatory investigations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MED.class2Investigations.rows.map((r, i) => (
                                            <tr key={r.when} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{r.when}</td>
                                                <td className="p-3 text-gray-600 align-top">{r.tests}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>{MED.class2Investigations.additional} {MED.process.idCheck}</p>

                            {/* Fees */}
                            <h2 id="fees" className={H2}>What DGCA charges</h2>
                            <p className={P}>{MED.fees.note}</p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Class</th>
                                            <th className={TH}>Purpose</th>
                                            <th className={TH}>Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MED.fees.rows.map((r, i) => (
                                            <tr key={`${r.cls}-${r.purpose}`} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top whitespace-nowrap">{r.cls}</td>
                                                <td className="p-3 text-gray-600 align-top">{r.purpose}</td>
                                                <td className="p-3 text-gray-700 font-semibold align-top whitespace-nowrap">{r.label}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>{MED.fees.investigationCharges} {MED.fees.privateExaminers}</p>

                            {/* Booking */}
                            <h2 id="booking" className={H2}>How to book, and the forms</h2>
                            <p className={P}>{MED.process.booking}</p>
                            <div className="space-y-2 mb-4">
                                {MED.process.forms.map((f) => (
                                    <div key={f} className="border border-gray-200 rounded-xl p-3">
                                        <p className="text-gray-600 text-sm leading-relaxed">{f}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={P}>{MED.process.formsNote}</p>
                            <p className={P}>You sign and furnish a declaration covering:</p>
                            <ul className="space-y-1.5 mb-4">
                                {MED.process.declaration.map((d) => (
                                    <li key={d} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>{d}
                                    </li>
                                ))}
                            </ul>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.process.falseDeclaration}</p>
                            </div>
                            <p className={P}>{MED.process.confidentiality}</p>

                            {/* Order */}
                            <h2 id="order" className={H2}>Class 2 first, or straight to Class 1</h2>
                            <p className={P}>{MED.classOrder.notMandatory}</p>
                            <p className={P}>{MED.classOrder.ifYouDoClass2First} {MED.classOrder.investigationsRepeat}</p>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.classOrder.advice}</p>
                            </div>
                            <p className={P}>
                                The licence ladder those classes attach to runs{' '}
                                {LICENCES.map((l) => `${l.code} from age ${l.minAge}`).join(', ')}. The{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number</Link> and the{' '}
                                <Link href="/dgca-pariksha" className={A}>written papers</Link> are a separate track and need no
                                medical certificate at all — a point worth knowing, because waiting for a medical before registering
                                for examinations costs students a session every year.
                            </p>

                            {/* Centres */}
                            <h2 id="centres" className={H2}>Where DGCA says you can get it done</h2>
                            <div className="border border-av-orange rounded-xl p-5 mb-5">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">The initial Class 1 is restricted</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{MED.centres.initialIssueOnly.note}</p>
                                <ul className="space-y-1.5 mb-3">
                                    {MED.centres.initialIssueOnly.list.map((c) => (
                                        <li key={c} className="flex gap-2 items-start text-sm text-gray-600">
                                            <span className="text-av-orange font-bold flex-shrink-0">✓</span>{c}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">{MED.centres.initialIssueOnly.appealNote}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">{MED.centres.initialIssueOnly.fiveYearly}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{MED.centres.initialIssueOnly.routine}</p>
                            </div>
                            <p className={P}>
                                DGCA publishes the list of approved aeromedical evaluation centres and empanelled examiners. This is
                                that list as it stood on {MED.centresAsOf}. {MED.centres.listNote} We have no role in it and no view
                                on which centre to choose.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                <div className="bg-av-light border-l-4 border-av-orange rounded-r-xl p-4">
                                    <p className="text-gray-700 text-sm leading-relaxed">{MED.centres.dgcaCounts.class1Exam}</p>
                                </div>
                                <div className="bg-av-light border-l-4 border-av-orange rounded-r-xl p-4">
                                    <p className="text-gray-700 text-sm leading-relaxed">{MED.centres.dgcaCounts.class1Renewal}</p>
                                </div>
                            </div>
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
                                        {MED.centres.boardingCentres.map((c, i) => (
                                            <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{c.name}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.city}</td>
                                                <td className="p-3 text-gray-600 align-top">Air Force boarding centre</td>
                                            </tr>
                                        ))}
                                        {MED.centres.civil.map((c, i) => (
                                            <tr key={`${c.name}-${c.city}`} className={(i + MED.centres.boardingCentres.length) % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{c.name}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.city}</td>
                                                <td className="p-3 text-gray-600 align-top">{c.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                {MED.centres.airForceNote} The renewal stations are: {MED.centres.airForceOther.join('; ')}.
                            </p>
                            <p className={P}>
                                If you are training from Delhi, {ncrCentres.length} of the {allCentres.length} centres above are
                                within reach without travel: {ncrCentres.map((c) => c.name).join(', ')}.
                            </p>
                            <p className={P}>
                                Closer still, if you are in south-west Delhi: DGCA&rsquo;s Class 1 examiner list carries{' '}
                                {MED.centres.dwarka.class1Examiners} empanelled Class 1 medical examiners with addresses in Dwarka
                                itself — sectors {MED.centres.dwarka.sectors.slice(0, -1).join(', ')} and{' '}
                                {MED.centres.dwarka.sectors.slice(-1)} — and {MED.centres.dwarka.airport.charAt(0).toLowerCase()}
                                {MED.centres.dwarka.airport.slice(1)} {MED.centres.dwarka.note}
                            </p>

                            {/* Outcomes */}
                            <h2 id="outcomes" className={H2}>Fit, fit with limitations, unfit</h2>
                            <p className={P}>The assessment has four possible dispositions.</p>
                            <div className="grid sm:grid-cols-2 gap-3 mb-5">
                                {MED.disposition.outcomes.map((o) => (
                                    <div key={o} className="border border-gray-200 rounded-xl p-4">
                                        <p className="font-montserrat font-bold text-av-blue text-sm">{o}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={P}>
                                &ldquo;Fit with limitations&rdquo; is the one most people have never heard of, and it is the reason a
                                medical finding is not automatically the end of a career. The limitations the CAR names are:
                            </p>
                            <ul className="space-y-1.5 mb-4">
                                {MED.disposition.limitations.map((l) => (
                                    <li key={l} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>{l}
                                    </li>
                                ))}
                            </ul>
                            <p className={P}>Where the second applies, a qualified experienced pilot is one who:</p>
                            <ul className="space-y-1.5 mb-4">
                                {MED.disposition.experiencedPilot.map((e) => (
                                    <li key={e} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>{e}
                                    </li>
                                ))}
                            </ul>
                            <p className={P}>{MED.disposition.dateRule} {MED.disposition.grounded}</p>

                            {/* Timing */}
                            <h2 id="timing" className={H2}>The 45-day window, and when you need an NOC</h2>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.timing.window}</p>
                            </div>
                            <p className={P}>{MED.timing.nocWhen}</p>
                            <p className={P}>{MED.timing.minorIllness}</p>
                            <p className={P}>{MED.timing.earlyReview}</p>
                            <p className={P}>{MED.timing.renewalVenue}</p>

                            {/* Appeal */}
                            <h2 id="appeal" className={H2}>If you are declared unfit</h2>
                            <p className={P}>{MED.appeal.permanentUnfit}</p>
                            <p className={P}>
                                <span className="font-semibold text-av-blue">The appeal.</span> {MED.appeal.trigger}{' '}
                                {MED.appeal.window} {MED.appeal.how}
                            </p>
                            <p className={P}>The appeal has to carry:</p>
                            <ul className="space-y-1.5 mb-4">
                                {MED.appeal.documents.map((d) => (
                                    <li key={d} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>{d}
                                    </li>
                                ))}
                            </ul>
                            <p className={P}>{MED.appeal.venue} {MED.appeal.finality}</p>

                            {/* Examiners */}
                            <h2 id="examiners" className={H2}>Who counts as a DGCA medical examiner</h2>
                            <p className={P}>
                                Worth knowing, because the title gets used loosely. Empanelment is a DGCA process with a published
                                qualification bar, an interview before a board, and an inspection of the facility.
                            </p>
                            <div className="border border-gray-200 rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-base mb-2">Class 1 medical examiner</p>
                                <p className="text-xs text-gray-500 mb-3">{MED.examinerRequirements.class1.citation}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{MED.examinerRequirements.class1.qualification}</p>
                                <ul className="space-y-1.5">
                                    {MED.examinerRequirements.class1.other.map((o) => (
                                        <li key={o} className="flex gap-2 items-start text-sm text-gray-600">
                                            <span className="text-av-orange font-bold flex-shrink-0">–</span>{o}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border border-gray-200 rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-base mb-2">Class 2 medical examiner</p>
                                <p className="text-xs text-gray-500 mb-3">{MED.examinerRequirements.class2.citation}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{MED.examinerRequirements.class2.qualification}</p>
                                <ul className="space-y-1.5 mb-3">
                                    {MED.examinerRequirements.class2.other.map((o) => (
                                        <li key={o} className="flex gap-2 items-start text-sm text-gray-600">
                                            <span className="text-av-orange font-bold flex-shrink-0">–</span>{o}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-600 text-sm leading-relaxed">{MED.examinerRequirements.class2.penalties}</p>
                            </div>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.examinerRequirements.whyItMatters}</p>
                            </div>
                            <p className={P}>{MED.centres.class2ListStructure}</p>
                            <div className="border-2 border-av-orange rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">Check the date before you pay</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{MED.centres.class2ListCaution}</p>
                            </div>

                            {/* Rules */}
                            <h2 id="rules" className={H2}>The rules behind all of this</h2>
                            <div className="space-y-3 mb-10">
                                {[MED.rules.duty, MED.rules.anyTime, MED.rules.validity39C, MED.rules.atco].map((r) => (
                                    <div key={r} className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4">
                                        <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
                                    </div>
                                ))}
                            </div>

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
                            <p className={P}>
                                Read on {CHECKED_ON} from the DGCA-issued documents. Where two of these disagree, the later one
                                governs and this page says so.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {MED.sources.map((s) => (
                                    <li key={s.label} className="flex gap-2 items-start text-sm text-gray-600">
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
                                    examinations so you are not waiting on one to start the other. The counselling is free and covers
                                    the whole route, end to end.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/pilot-career-counselling" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Free career counselling
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
                                <p className="text-white/70 text-xs mb-3">CPL and ATPL · 1 year to age 60, then 6-monthly · {MED.fees.rows[0].label} at IAF centres</p>
                                <p className="text-white/90 text-sm font-semibold">Class 2</p>
                                <p className="text-white/70 text-xs mb-3">SPL and PPL · 2 years to age 50, then 1 year · {MED.fees.rows[2].label} at IAF centres</p>
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
                                    <li><Link href="/egca-login" className={A}>eGCA login and services</Link></li>
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
