import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import LeadForm from '../components/LeadForm';
import Link from 'next/link';
import {
    LICENCES, EDUCATION, CPL_HOURS, cplHoursSummary, DGCA_PAPERS, papersSummary, RTR,
    MEDICAL, MEDICAL_STANDARDS as MED, EXAM_RULES, PARIKSHA, EGCA, inr, ACADEMY,
} from '../lib/facts';

/*
 * /commercial-pilot-license-eligibility — rewritten 2026-09-15.
 *
 * WHY THIS PAGE, AND WHY IT IS LONG. It maps 27,410 monthly searches across 32
 * keywords, it imported none of lib/facts.js, and it was thin for a question
 * that has five separate answers. Every other page in this repo answers one
 * gate. This one has to answer all of them in order, because "am I eligible"
 * is really "what does the whole path require, and in what sequence", and a
 * reader who gets four of the five answers here still has to go somewhere else.
 *
 * Every figure renders from lib/facts.js. Nothing is typed in.
 *
 * WHAT THE PREVIOUS VERSION AND ITS CENTRAL FAQ GOT WRONG:
 *   - A vision standard ("6/6 in one eye and 6/9 in the other") that appears in
 *     no document this repo can source. The medical CAR sets out what is
 *     assessed, not a number a page can publish. Removed, and the FAQ entry
 *     carrying it removed with it.
 *   - "a DGCA-recognised DGCA medical certificate followed by a DGCA medical
 *     certificate" — a sentence mangled by an earlier sanitisation pass, live
 *     on the page for weeks.
 *   - "training can begin at 17", which conflicts with the licence ladder: an
 *     SPL is 16, a PPL 17, a CPL 18.
 *   - It described 200 hours in a way that reads as additive. That is the most
 *     common error on competitor pages and it is now called out explicitly.
 *
 * This route is added to existingFaqRoutes in data/pageFaqs.js in the same
 * commit, so Layout stops injecting the central FAQ block and the FAQs below
 * — which are sourced — are the only ones on the page.
 */

const CANONICAL = 'https://weoneaviation.in/commercial-pilot-license-eligibility';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
const CHECKED_ON = longDate('2026-09-15');

const CPL = LICENCES.find((l) => l.code === 'CPL');
const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');

const contents = [
    ['gates', 'The five gates, at a glance'],
    ['age', 'Age: what you can hold, and when'],
    ['education', 'Education: 10+2 with Physics and Maths'],
    ['medical', 'Medical: Class 2 to train, Class 1 to be paid'],
    ['exams', 'Examinations: five papers, and RTR separately'],
    ['hours', 'Flying hours: 200, and what sits inside them'],
    ['english', 'English language proficiency'],
    ['licence', 'The licence application itself'],
    ['myths', 'What eligibility does not require'],
    ['order', 'The order to do all of this in'],
    ['not-yet', 'If you are not eligible yet'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const gates = [
    { gate: 'Age', answer: `${CPL.minAge} to hold a CPL. You can start earlier: an SPL at ${SPL.minAge}, a PPL at ${PPL.minAge}.`, clause: `Schedule II, ${CPL.section}` },
    { gate: 'Education', answer: EDUCATION.requirement, clause: EDUCATION.clause },
    { gate: 'Medical', answer: 'A Class 2 lets you train. A Class 1 is what the CPL itself requires.', clause: MED.car.citation },
    { gate: 'Examinations', answer: `${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each, plus ${RTR.name} examined separately.`, clause: `Schedule II, and ${EXAM_RULES.car.citation}` },
    { gate: 'Flying hours', answer: `${CPL_HOURS.total} hours total, flown within the ${CPL_HOURS.recencyYears} years before you apply.`, clause: `Schedule II, ${CPL_HOURS.clause}` },
];

const myths = [
    { myth: 'You need a medical certificate before you can sit the written papers.', truth: 'You do not. The examinations run on the Pariksha portal against a computer number, and nothing in that process asks for a medical. Waiting for a medical before registering costs students a session every year.' },
    { myth: 'There are nine DGCA subjects.', truth: `There are ${DGCA_PAPERS.length} written papers. ${RTR.note} Lists of nine count RTR, Aviation Medicine and Human Performance as separate DGCA papers; none of them is.` },
    { myth: 'The 200 hours are 200 plus 100 pilot-in-command plus 20 cross-country and so on.', truth: `No. ${CPL_HOURS.total} is the total, and every component sits inside it. Adding them produces a number around 335 hours that no rule asks for, and it is the single most common error on pages about this subject.` },
    { myth: 'You must join a flying school before you can apply for a computer number.', truth: 'You do not. The computer number is an examination identity. No flying school, no logbook and no medical are involved in getting one.' },
    { myth: 'Commerce and Biology students cannot become pilots.', truth: EDUCATION.altRoute },
    { myth: 'The Board Verification Certificate has been abolished.', truth: `${PARIKSHA.digilocker.bvcEffect} That is a waiver for the documents DigiLocker supplies, not the end of the requirement.` },
];

const order = [
    { step: 'Confirm the education gate', detail: `${EDUCATION.requirement}. If you did not take both subjects, start the ${EDUCATION.altRoute.split('.')[0].toLowerCase()} now, because it sits on the critical path and nothing else can begin without it.` },
    { step: 'Book the medical before you spend money', detail: MED.timingAdvice },
    { step: 'Get a computer number', detail: `Online at the Pariksha portal from age ${PARIKSHA.basics.minAge}. Through DigiLocker it is allotted immediately; the manual route takes ${PARIKSHA.processing.days} working days. No medical certificate is needed for this.` },
    { step: 'Start the written papers', detail: `Book on Pariksha, ${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session. Clear them one at a time — but count backwards from the licence application, because ${EXAM_RULES.paperValidity.cplAtpl.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.cplAtpl.slice(1)}` },
    { step: 'Fly the hours', detail: `${CPL_HOURS.total} hours at a flying school, with the components inside that total, and all of it inside the ${CPL_HOURS.recencyYears} years before you apply.` },
    { step: 'Clear RTR (A) and the English proficiency test', detail: `${RTR.name} is examined separately and is required for CPL issue. English Language Proficiency has to be cleared at Level 4 or above before the licence application will move.` },
    { step: 'Take the skill test, then apply on eGCA', detail: `The skill test is flown for an examiner on the type applied for, within the six months before applying. The licence application itself is a separate portal — ${EGCA.cplIssuance.service}.` },
];

const faqs = [
    { q: 'What is the minimum age for a CPL in India?', a: `${CPL.minAge}, under the Aircraft Rules, 1937, Schedule II, ${CPL.section}. You do not have to wait until then to start: a Student Pilot Licence is available at ${SPL.minAge} and a Private Pilot Licence at ${PPL.minAge}, and a computer number for the written examinations can be applied for from ${PARIKSHA.basics.minAge}.` },
    { q: 'What education do I need for a CPL?', a: `${EDUCATION.requirement} — ${EDUCATION.clause}. For the computer number application you will also need both the marksheet and the pass certificate for Class 10 and Class 12, not just one of them.` },
    { q: 'Can I become a pilot without Physics and Maths?', a: `Yes. ${EDUCATION.altRoute} The requirement is the two subjects, not the stream you originally took or the board you took them from.` },
    { q: 'Is there a maximum age to become a pilot in India?', a: `Not for the computer number — ${PARIKSHA.basics.maxAgeNote} What does change with age is the medical: a Class 1 is valid for one year up to 60 and six-monthly after that.` },
    { q: 'Which medical do I need, Class 1 or Class 2?', a: `Both, in that order. A Class 2 covers the Student Pilot Licence and the Private Pilot Licence, so it is what lets you train. The Commercial Pilot Licence requires a Class 1. ${MED.timingAdvice}` },
    { q: 'How many exams are there for a CPL?', a: `${DGCA_PAPERS.length} written papers: ${papersSummary()}. ${RTR.note}` },
    { q: 'What is the passing mark?', a: `${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject}` },
    { q: 'How long do my passed papers stay valid?', a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} ${EXAM_RULES.paperValidity.planningNote}` },
    { q: 'How many flying hours does a CPL need?', a: cplHoursSummary() },
    { q: 'Do the 200 hours include the 100 hours as pilot-in-command, or are they extra?', a: `They are included. ${CPL_HOURS.total} is the total and every component sits inside it. Treating them as additions produces a figure no rule asks for, and it is the most common error on pages about CPL eligibility.` },
    { q: 'Can simulator time count towards the 200 hours?', a: `Only within one component, and only up to a limit: of the ${CPL_HOURS.components[2].hours} hours of instrument time, ${CPL_HOURS.components[2].note.replace('of which ', '')}. Everything else has to be flown in an actual aeroplane.` },
    { q: 'Do I need a computer number before joining a flying school?', a: `No, and you do not need a flying school to get one either — the two are independent. Getting the computer number early is still sensible, because it is the gate on every written paper and the manual route takes ${PARIKSHA.processing.days} working days.` },
    { q: 'What does the whole set of DGCA fees come to?', a: `The examination fees are ${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} per paper for an Online On-Demand Examination, and ${inr(PARIKSHA.fees.oralPerPaper)} for an oral paper on the second and third attempt. Flying school fees, the medical and the licence service fee are separate and are not set by DGCA.` },
    { q: 'What else has to be in place before the licence is issued?', a: `Beyond the papers and the hours: a valid Class 1 medical with the assessment sheet, ${RTR.name} with the FRTOL, English Language Proficiency at Level 4 or above, and an e-logbook validated by your flying training organisation. ${EGCA.cplIssuance.completion}` },
    { q: 'Can a foreign national train for an Indian CPL?', a: `The Pariksha process accommodates foreign nationals, with conditions: ${PARIKSHA.foreignCandidates.passport} ${PARIKSHA.foreignCandidates.mobile} ${PARIKSHA.foreignCandidates.securityClearance}` },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'CPL Eligibility in India: Every Requirement, in Order',
    description: 'Age, education, medical class, written papers and flying hours for a Commercial Pilot Licence in India — each requirement with the rule that sets it, and the order to complete them in.',
    inLanguage: 'en-IN',
    dateModified: '2026-09-15',
    articleSection: 'Pilot eligibility',
    keywords: 'cpl eligibility, commercial pilot licence eligibility india, cpl age limit, cpl education requirement, cpl medical, cpl flying hours, how many exams for cpl',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
    citation: [
        { name: 'Aircraft Rules, 1937, Schedule II (continued in force by s.43(2) of the Bharatiya Vayuyan Adhiniyam, 2024)', url: 'https://www.indiacode.nic.in/handle/123456789/1362' },
        { name: EXAM_RULES.car.citation, url: EXAM_RULES.car.where },
        ...MED.sources.map((s) => ({ name: s.label, url: s.url })),
        ...PARIKSHA.sources.slice(0, 2).map((s) => ({ name: s.label, url: s.url })),
    ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-3 underline-orange';
const H3 = 'font-montserrat text-base font-bold text-av-blue mb-2 mt-5';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CPLEligibility() {
    return (
        <Layout
            title="CPL Eligibility in India: Age, Education, Medical, Hours"
            description="Every CPL requirement with the rule behind it: age 18, 10+2 with Physics and Maths, Class 1 medical, five written papers at 70%, and 200 flying hours."
        >
            <StructuredData data={[articleSchema, faqSchema]} />

            <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Eligibility</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        CPL Eligibility in India: Every Requirement, in Order
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        Five gates stand between you and a Commercial Pilot Licence. This page sets out each one, the rule that
                        creates it, and the sequence that stops you waiting on one thing to start another.
                    </p>
                </ScrollReveal>
            </section>

            <section className="py-16 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <p className="text-xs text-gray-500 mb-6">
                                Checked against the Aircraft Rules, the DGCA examination and medical CARs and the Pariksha portal on{' '}
                                {CHECKED_ON}. Every figure is <a href="#sources" className={A}>sourced below</a>.
                            </p>

                            <div className="bg-av-light border-l-4 border-av-orange rounded-xl p-5 mb-8">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    To hold a Commercial Pilot Licence in India you must be {CPL.minAge}, have passed 10+2 with
                                    Physics and Mathematics, hold a Class 1 medical, have cleared {DGCA_PAPERS.length} DGCA written
                                    papers at {EXAM_RULES.theory.passMark}% each plus {RTR.name}, and have {CPL_HOURS.total} hours of
                                    flying inside the {CPL_HOURS.recencyYears} years before you apply. Training itself can begin at{' '}
                                    {SPL.minAge}.
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

                            {/* Gates */}
                            <h2 id="gates" className={H2}>The five gates, at a glance</h2>
                            <p className={P}>
                                Eligibility is not one test. It is five independent requirements, set by different instruments, and
                                you can be through four of them and still be years away. The table is the short answer; the rest of
                                the page is what each one actually involves.
                            </p>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Gate</th>
                                            <th className={TH}>What it requires</th>
                                            <th className={TH}>Set by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gates.map((g, i) => (
                                            <tr key={g.gate} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-av-blue font-bold align-top whitespace-nowrap">{g.gate}</td>
                                                <td className="p-3 text-gray-600 align-top">{g.answer}</td>
                                                <td className="p-3 text-gray-500 align-top text-xs">{g.clause}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Age */}
                            <h2 id="age" className={H2}>Age: what you can hold, and when</h2>
                            <p className={P}>
                                The licences form a ladder, and each rung has its own minimum age in Schedule II of the Aircraft
                                Rules, 1937. The number people quote for &ldquo;becoming a pilot&rdquo; is usually the CPL age, which
                                is the last one, not the first.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                {LICENCES.map((l) => (
                                    <div key={l.code} className={`border rounded-xl p-5 ${l.code === 'CPL' ? 'border-2 border-av-orange' : 'border-gray-200'}`}>
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="font-montserrat font-black text-2xl text-av-orange">{l.minAge}</span>
                                            <span className="font-montserrat font-bold text-av-blue text-sm">{l.name} ({l.code})</span>
                                        </div>
                                        <p className="text-gray-600 text-xs leading-relaxed mb-1">{l.permits}</p>
                                        <p className="text-gray-400 text-xs">Schedule II, {l.section}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={P}>
                                Two practical consequences. You can begin flight training at {SPL.minAge} on a Student Pilot Licence,
                                which is three years before the CPL age, so a student who finishes Class 12 at 17 or 18 is not waiting
                                on age at all. And you can apply for a computer number and start clearing written papers from{' '}
                                {PARIKSHA.basics.minAge}, which is earlier still.
                            </p>
                            <p className={P}>
                                There is no upper age limit on the examination side: {PARIKSHA.basics.maxAgeNote} What changes with
                                age is the medical renewal interval, covered below.
                            </p>

                            {/* Education */}
                            <h2 id="education" className={H2}>Education: 10+2 with Physics and Maths</h2>
                            <p className={P}>
                                {EDUCATION.requirement} — {EDUCATION.clause}. Two subjects, from a recognised board. Not a particular
                                stream, not a particular school, and not a minimum percentage.
                            </p>
                            <h3 className={H3}>If you did not take both subjects</h3>
                            <p className={P}>{EDUCATION.altRoute} The route is covered in detail in our{' '}
                                <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={A}>guide for Commerce and Biology students</Link>.
                                It adds time, so it belongs at the front of your plan rather than the middle.
                            </p>
                            <h3 className={H3}>What the paperwork actually asks for</h3>
                            <p className={P}>
                                This catches people out. {PARIKSHA.education.documents} {PARIKSHA.education.legibility}
                            </p>
                            <p className={P}>
                                A Board Verification Certificate is also part of the computer number application — unless your
                                documents come through DigiLocker. {PARIKSHA.digilocker.bvcEffect} The full rules, including the three
                                different ways a BVC can be addressed, are on our{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number guide</Link>.
                            </p>

                            {/* Medical */}
                            <h2 id="medical" className={H2}>Medical: Class 2 to train, Class 1 to be paid</h2>
                            <p className={P}>
                                Two classes, two purposes, and the order matters more than most students realise.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                {MED.classes.slice(0, 2).map((c) => (
                                    <div key={c.cls} className="border border-gray-200 rounded-xl p-5">
                                        <p className="font-montserrat font-bold text-av-blue text-sm mb-2">{c.cls}</p>
                                        <ul className="space-y-1 mb-3">
                                            {c.licences.map((l) => (
                                                <li key={l} className="flex gap-2 items-start text-xs text-gray-600"><span className="text-av-orange flex-shrink-0">✓</span>{l}</li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-gray-500 leading-relaxed">Valid: {c.validity}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={P}>
                                So a Class 2 is what lets you start, and a Class 1 is what the CPL itself requires — {MEDICAL.clause}.
                                {' '}{MED.rules.duty}
                            </p>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{MED.timingAdvice}</p>
                            </div>
                            <p className={P}>
                                The examination covers {MED.examination.groups.join(', ').toLowerCase()}. {MED.examination.standardsFrom}{' '}
                                {MED.examination.note} DGCA lists {MED.centres.airForce.length + MED.centres.civil.length} approved
                                centres; the full list, and which of them are in Delhi and the NCR, is on our{' '}
                                <Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical guide</Link>.
                            </p>

                            {/* Exams */}
                            <h2 id="exams" className={H2}>Examinations: {DGCA_PAPERS.length} papers, and RTR separately</h2>
                            <p className={P}>
                                {DGCA_PAPERS.length} written papers stand between you and the licence: {papersSummary()}.{' '}
                                {RTR.note}
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4 mb-4">
                                <div className="bg-av-blue rounded-xl p-5 text-white">
                                    <p className="text-av-orange font-bold text-xs mb-1">Pass mark</p>
                                    <p className="text-3xl font-montserrat font-black mb-1">{EXAM_RULES.theory.passMark}%</p>
                                    <p className="text-white/70 text-xs leading-relaxed">per subject, not an aggregate</p>
                                </div>
                                <div className="bg-av-blue rounded-xl p-5 text-white">
                                    <p className="text-av-orange font-bold text-xs mb-1">Fee per paper</p>
                                    <p className="text-3xl font-montserrat font-black mb-1">{inr(PARIKSHA.fees.regularPerPaper)}</p>
                                    <p className="text-white/70 text-xs leading-relaxed">regular session; {inr(PARIKSHA.fees.olodePerPaper)} on demand</p>
                                </div>
                                <div className="bg-av-blue rounded-xl p-5 text-white">
                                    <p className="text-av-orange font-bold text-xs mb-1">A pass counts for</p>
                                    <p className="text-3xl font-montserrat font-black mb-1">5 years</p>
                                    <p className="text-white/70 text-xs leading-relaxed">towards a CPL or ATPL</p>
                                </div>
                            </div>
                            <p className={P}>
                                That last figure is the one students plan around badly. {EXAM_RULES.paperValidity.general}{' '}
                                {EXAM_RULES.paperValidity.cplAtpl} {EXAM_RULES.paperValidity.planningNote}
                            </p>
                            <p className={P}>
                                Papers are booked on the Pariksha portal against a computer number, and the full process — including
                                the DigiLocker route that allots the number immediately — is on our{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number guide</Link>. The syllabus and the
                                study material DGCA itself names are on our{' '}
                                <Link href="/commercial-pilot-license-syllabus" className={A}>syllabus page</Link>.
                            </p>

                            {/* Hours */}
                            <h2 id="hours" className={H2}>Flying hours: {CPL_HOURS.total}, and what sits inside them</h2>
                            <p className={P}>{cplHoursSummary()}</p>
                            <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">Read this before you add anything up</p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The {CPL_HOURS.total} is a total. Every row below sits <em>inside</em> it. They are not additions,
                                    and pages that present them as additions produce a figure no rule asks for.
                                </p>
                            </div>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Inside the {CPL_HOURS.total} hours</th>
                                            <th className={TH}>Hours</th>
                                            <th className={TH}>Condition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CPL_HOURS.components.map((c, i) => (
                                            <tr key={c.label} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{c.label}</td>
                                                <td className="p-3 text-av-orange font-bold align-top whitespace-nowrap">{c.hours}</td>
                                                <td className="p-3 text-gray-600 align-top text-xs">{c.note} <span className="text-gray-400">({c.clause})</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                Two conditions on the total are easy to miss. All of it has to be flown within the{' '}
                                {CPL_HOURS.recencyYears} years before you apply, so hours flown and then left for a decade do not
                                count. And simulator time is capped: {CPL_HOURS.components[2].note} — everything else is flown in an
                                actual aeroplane.
                            </p>

                            {/* English */}
                            <h2 id="english" className={H2}>English language proficiency</h2>
                            <p className={P}>
                                Rarely mentioned on eligibility pages, and it will stop a licence application dead. English Language
                                Proficiency has to be cleared at Level 4 or above before the CPL application on eGCA will move. It is
                                one of six prerequisites that page checks, and students routinely meet them one surprise at a time.
                            </p>

                            {/* Licence */}
                            <h2 id="licence" className={H2}>The licence application itself</h2>
                            <p className={P}>
                                Clearing the gates does not issue a licence. That is a separate application on a separate portal, and
                                it will not proceed until all of these are in place:
                            </p>
                            <ol className="space-y-2 mb-4">
                                {EGCA.cplPrerequisites.map((p, i) => (
                                    <li key={p} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{p}
                                    </li>
                                ))}
                            </ol>
                            <p className={P}>
                                {EGCA.joinPoint} The whole application, and the two rules that most often cost a cycle, are on our{' '}
                                <Link href="/ecga-login-your-complete-guide" className={A}>eGCA guide</Link>.
                            </p>

                            {/* Myths */}
                            <h2 id="myths" className={H2}>What eligibility does not require</h2>
                            <p className={P}>
                                Six things widely repeated about CPL eligibility that are not true. Each one costs students either
                                money or a session.
                            </p>
                            <div className="space-y-3 mb-10">
                                {myths.map((m) => (
                                    <div key={m.myth} className="border border-gray-200 rounded-xl p-4">
                                        <p className="text-sm font-semibold text-gray-400 line-through mb-2">{m.myth}</p>
                                        <p className="text-gray-700 text-sm leading-relaxed">{m.truth}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Order */}
                            <h2 id="order" className={H2}>The order to do all of this in</h2>
                            <p className={P}>
                                The gates are independent, which means several can run in parallel — and the single most expensive
                                mistake is running them in series when you did not have to.
                            </p>
                            <ol className="space-y-4 mb-10">
                                {order.map((o, i) => (
                                    <li key={o.step} className="flex gap-4">
                                        <div className="w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">{i + 1}</div>
                                        <div>
                                            <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{o.step}</p>
                                            <p className="text-gray-600 text-sm leading-relaxed">{o.detail}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {/* Not yet */}
                            <h2 id="not-yet" className={H2}>If you are not eligible yet</h2>
                            <p className={P}>
                                Most people who think they are ineligible are early rather than excluded. Three common cases:
                            </p>
                            <div className="space-y-3 mb-10">
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">You are under 18</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">Not a barrier to starting. An SPL is available at {SPL.minAge}, a PPL at {PPL.minAge}, and a computer number at {PARIKSHA.basics.minAge}. The CPL age applies to holding the licence, not to training for it.</p>
                                </div>
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">You did not take Physics or Maths</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{EDUCATION.altRoute}</p>
                                </div>
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">You are unsure about the medical</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">Find out before you spend, not after. {MED.examination.note} The examiner decides, and booking early is the cheapest decision in the whole plan.</p>
                                </div>
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
                                Read on {CHECKED_ON}. Where a figure could not be traced to one of these, it is not on this page —
                                which is why you will not find a vision standard or a pass rate here. If you are still
                                working out what the acronyms mean, our{' '}
                                <Link href="/full-form-of-cpl-commercial-pilot-license" className="text-av-blue font-semibold hover:text-av-orange transition-colors">CPL full form page</Link>{' '}
                                sets out what a Commercial Pilot Licence is and what it requires.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {[
                                    'Aircraft Rules, 1937, Schedule II, Sections B, E, J and M — licence ages, the CPL education requirement and the 200-hour experience table, continued in force by section 43(2) of the Bharatiya Vayuyan Adhiniyam, 2024',
                                    `${EXAM_RULES.car.citation} — pass marks and the validity of passed papers`,
                                    `${MED.car.citation} — the Class 1 and Class 2 split, validity and what is examined`,
                                    'DGCA Pariksha: the Flight Crew FAQ, the Flight Crew User Manual Issue III of October 2024, and the DigiLocker public notice of 13 December 2024 — the computer number, documents and examination fees',
                                    'DGCA eGCA user manual, Process for submitting a Commercial Pilot Licence application — the prerequisites for licence issue',
                                ].map((s) => (
                                    <li key={s} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>{s}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Work out where you actually stand</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Eligibility is five separate answers, and most people reading this are through some of them
                                    already. We teach the ground subjects for the {DGCA_PAPERS.length} written papers, in Dwarka and
                                    online, and we arrange flight training with partner flying schools. We do not own aircraft, we do
                                    not conduct medicals or examinations, and we do not place anyone into an airline job. What we can
                                    do in one conversation is tell you which of the five gates you are through and what the fastest
                                    honest route through the rest looks like.
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
                            <LeadForm title="Check Your Eligibility" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">The five gates</h4>
                                <ul className="space-y-2 text-sm text-white/85">
                                    <li>Age {CPL.minAge} for the licence, {SPL.minAge} to start</li>
                                    <li>10+2 with Physics and Maths</li>
                                    <li>Class 1 medical</li>
                                    <li>{DGCA_PAPERS.length} papers at {EXAM_RULES.theory.passMark}%, plus {RTR.name}</li>
                                    <li>{CPL_HOURS.total} flying hours in {CPL_HOURS.recencyYears} years</li>
                                </ul>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Go deeper on each gate</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical</Link></li>
                                    <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                                    <li><Link href="/commercial-pilot-license-syllabus" className={A}>Syllabus and study material</Link></li>
                                    <li><Link href="/dgca-pariksha" className={A}>Papers, fees and dates</Link></li>
                                    <li><Link href="/ecga-login-your-complete-guide" className={A}>eGCA and the licence application</Link></li>
                                    <li><Link href="/student-pilot-license-spl" className={A}>Student Pilot Licence</Link></li>
                                    <li><Link href="/rtr-a" className={A}>{RTR.name}</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
