import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import QuickAnswer from '../components/QuickAnswer';
import PeopleAlsoAsk from '../components/PeopleAlsoAsk';
import LeadForm from '../components/LeadForm';
import Link from 'next/link';
import {
    LICENCES, EDUCATION, CPL_HOURS, DGCA_PAPERS, papersSummary, RTR,
    MEDICAL_STANDARDS as MED, EXAM_RULES, PARIKSHA, EGCA, CPL_COST, inr, ACADEMY,
} from '../lib/facts';

/*
 * /your-guide-on-how-to-become-a-pilot-in-india — rebuilt 2026-09-15.
 *
 * WHY THIS URL. Six pages on this site chase "how to become a pilot". The
 * handoff says pick the cluster winner from data before any 301, and the data
 * picks this one: it ranks 27th for "how to become a pilot" (14,800/mo) and
 * 40th for "how to become a pilot in india" (6,600/mo), ahead of the others.
 * So this becomes the hub. No 301s are issued here — consolidating the rest of
 * the cluster is a separate decision that needs Search Console data, and
 * merging pages that still earn impressions is how sites lose traffic.
 *
 * THE ANGLE THAT IS ACTUALLY DIFFERENT. Every competing page answers "how long
 * does it take" with "18 to 24 months" and cites nothing. No rule sets a
 * duration. What the rules DO fix is a set of floors — ages, 200 hours, how
 * long a passed paper counts for, how long a medical lasts, how long a computer
 * number takes. This page builds the timeline out of those floors, then says
 * plainly which part varies and why nobody can quote it honestly. That is a
 * better answer than a number, and it is defensible.
 *
 * Everything renders from lib/facts.js. Do not type a figure into this file.
 */

const CANONICAL = 'https://weoneaviation.in/your-guide-on-how-to-become-a-pilot-in-india';
const CHECKED_ON = '15 September 2026';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');
const ATPL = LICENCES.find((l) => l.code === 'ATPL');

const contents = [
    ['route', 'The route, in one picture'],
    ['timeline', 'How long it actually takes'],
    ['stage1', 'Stage 1 — School, and the two subjects'],
    ['stage2', 'Stage 2 — The medical, before you spend'],
    ['stage3', 'Stage 3 — Computer number and the papers'],
    ['stage4', 'Stage 4 — Flying the hours'],
    ['stage5', 'Stage 5 — RTR, English and the skill test'],
    ['stage6', 'Stage 6 — The licence, and what comes after'],
    ['money', 'What it costs, and the one figure we can cite'],
    ['parallel', 'What you can run in parallel'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

/* Only floors the rules actually fix. Nothing here is an estimate. */
const floors = [
    { item: 'Computer number', floor: `${PARIKSHA.processing.days} working days on the manual route, immediate through DigiLocker`, fixedBy: 'DGCA Pariksha' },
    { item: 'Written papers', floor: `${PARIKSHA.calendar2026.regular.length} regular sessions a year, plus ${PARIKSHA.calendar2026.olode.length} on-demand sessions`, fixedBy: 'DGCA Programme of Examinations' },
    { item: 'A passed paper counts for', floor: 'Five years, towards a CPL or ATPL', fixedBy: `${EXAM_RULES.car.citation}, ${EXAM_RULES.paperValidity.clause}` },
    { item: 'Flying', floor: `${CPL_HOURS.total} hours, all flown inside the ${CPL_HOURS.recencyYears} years before you apply`, fixedBy: `Schedule II, ${CPL_HOURS.clause}` },
    { item: 'Class 1 medical lasts', floor: 'One year up to age 60', fixedBy: MED.car.citation },
    { item: 'Skill test', floor: 'Flown within the six months before applying', fixedBy: 'Schedule II, Section J, para 1(h)' },
    { item: 'Licence application', floor: `Fee payable within 48 hours of submission; the submission date is the date payment completes`, fixedBy: 'DGCA eGCA user manual' },
];

const stages = [
    {
        id: 'stage1', n: 1, title: 'School, and the two subjects',
        gate: EDUCATION.requirement,
        body: [
            `${EDUCATION.requirement} — ${EDUCATION.clause}. Two subjects from a recognised board. Not a stream, not a school, and no minimum percentage.`,
            EDUCATION.altRoute + ' It adds time, so it belongs at the front of a plan rather than the middle.',
            `For the paperwork later you will need both the marksheet and the pass certificate for Class 10 and Class 12. ${PARIKSHA.education.legibility}`,
        ],
        link: { href: '/blogs/become-pilot-without-physics-and-maths-class-12', label: 'The NIOS route for Commerce and Biology students' },
    },
    {
        id: 'stage2', n: 2, title: 'The medical, before you spend',
        gate: 'Class 2 to train, Class 1 for the licence',
        body: [
            'A Class 2 covers the Student Pilot Licence and the Private Pilot Licence, so it is what lets you begin. The Commercial Pilot Licence requires a Class 1.',
            MED.classOrder.advice,
            `The examination covers ${MED.examination.groups.join(', ').toLowerCase()}. ${MED.examination.note} DGCA lists ${MED.centres.boardingCentres.length + MED.centres.civil.length} approved centres, four of them in Delhi and the NCR.`,
        ],
        link: { href: '/dgca-class-2-class-1-medical', label: 'Class 1 and Class 2 medical, with the centre list' },
    },
    {
        id: 'stage3', n: 3, title: 'Computer number and the papers',
        gate: `${DGCA_PAPERS.length} papers at ${EXAM_RULES.theory.passMark}% each`,
        body: [
            `Everything examination-related runs on the Pariksha portal against a computer number, which you can apply for from age ${PARIKSHA.basics.minAge}. Register through DigiLocker and it is allotted immediately; the manual route takes ${PARIKSHA.processing.days} working days.`,
            `${DGCA_PAPERS.length} written papers: ${papersSummary()}. ${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject}`,
            `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand. Papers are cleared one at a time — but ${EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.planningNote.slice(1)}`,
        ],
        link: { href: '/dgca-computer-number', label: 'The computer number, end to end' },
    },
    {
        id: 'stage4', n: 4, title: 'Flying the hours',
        gate: `${CPL_HOURS.total} hours total`,
        body: [
            `${CPL_HOURS.total} hours as pilot of an aeroplane, flown within the ${CPL_HOURS.recencyYears} years before you apply — Schedule II, ${CPL_HOURS.clause}.`,
            `Inside that total: ${CPL_HOURS.components.map((c) => `${c.hours} hours ${c.label.toLowerCase()}`).join(', ')}. Inside, not added. Adding them produces a figure no rule asks for, and it is the most common error on pages about this.`,
            `Simulator time is capped: of the ${CPL_HOURS.components[2].hours} hours of instrument time, ${CPL_HOURS.components[2].note.replace('of which ', '')}.`,
        ],
        link: { href: '/commercial-pilot-license-eligibility', label: 'Every eligibility requirement, in order' },
    },
    {
        id: 'stage5', n: 5, title: 'RTR, English and the skill test',
        gate: 'Three things people forget',
        body: [
            `${RTR.name} is required for the licence and ${RTR.examinedSeparately ? 'examined separately from the DGCA written papers' : 'examined with them'}, under the ${RTR.instrument}.`,
            'English Language Proficiency has to be cleared at Level 4 or above. It appears on almost no guide to this subject and it will stop a licence application dead.',
            'The skill test is flown for an examiner on the type you are applying on, within the six months before you apply.',
        ],
        link: { href: '/rtr-a', label: `${RTR.name}, under the 2025 Rules` },
    },
    {
        id: 'stage6', n: 6, title: 'The licence, and what comes after',
        gate: `CPL at ${CPL.minAge}, ATPL at ${ATPL.minAge}`,
        body: [
            `The licence is a separate application on a separate portal: ${EGCA.cplIssuance.service}. It will not move until all six prerequisites are in place.`,
            `${EGCA.epl.what} It has covered the Commercial Pilot Licence since ${EGCA.epl.cplFrtolFrom} and the Airline Transport Pilot Licence since ${EGCA.epl.atplFrom}, and ${EGCA.epl.access.charAt(0).toLowerCase()}${EGCA.epl.access.slice(1)}`,
            `An ATPL comes later and has its own age: ${ATPL.minAge}. ${ATPL.permits}`,
        ],
        link: { href: '/egca-login', label: 'eGCA and the licence application' },
    },
];

const parallel = [
    'The computer number and the written papers need no medical certificate and no flying school. Start them while you are still deciding where to fly.',
    'The medical is the one thing to do first rather than in parallel, because a disqualifying finding changes the whole plan and it is cheaper to learn early than late.',
    `Papers and flying hours run alongside each other. The constraint is the five-year window: ${EXAM_RULES.paperValidity.cplAtpl.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.cplAtpl.slice(1)}`,
    'The NIOS route for Physics and Maths, if you need it, runs alongside everything else — but nothing downstream can finish without it.',
];

const faqs = [
    { q: 'How long does it take to become a pilot in India?', a: `No rule sets a duration, and any page quoting one without a source is guessing. What the rules fix are floors: ${CPL_HOURS.total} flying hours, ${PARIKSHA.calendar2026.regular.length} regular examination sessions a year plus ${PARIKSHA.calendar2026.olode.length} on-demand ones, a computer number in ${PARIKSHA.processing.days} working days or immediately through DigiLocker, and a skill test inside the six months before applying. What varies is flying-school throughput — aircraft availability, instructor availability and weather — and that is set by your school, not by DGCA. Ask your school for hours flown per student per month and you will have a better estimate than any article can give you.` },
    { q: 'What is the first step to becoming a pilot?', a: `Two things, in this order. Confirm you have or can get 10+2 with Physics and Mathematics. Then book the medical — ${MED.classOrder.advice.charAt(0).toLowerCase()}${MED.classOrder.advice.slice(1)}` },
    { q: 'How old do you have to be?', a: `To hold the licences: ${LICENCES.map((l) => `${l.code} at ${l.minAge}`).join(', ')}. To start, ${SPL.minAge} on a Student Pilot Licence, and you can apply for a computer number and begin clearing written papers from ${PARIKSHA.basics.minAge}.` },
    { q: 'Is there an upper age limit?', a: `Not on the examination side — ${PARIKSHA.basics.maxAgeNote} What changes with age is the medical renewal interval: a Class 1 is valid for one year up to 60 and six-monthly after that.` },
    { q: 'Can I become a pilot without Physics and Maths?', a: EDUCATION.altRoute },
    { q: 'How many exams do I have to pass?', a: `${DGCA_PAPERS.length} written papers — ${papersSummary()} — at ${EXAM_RULES.theory.passMark}% each, per subject rather than as an aggregate. ${RTR.note}` },
    { q: 'Do I need to join a flying school before I start the exams?', a: 'No. The two are independent. The computer number is an examination identity and needs no flying school, no logbook and no medical certificate. Starting the papers early is one of the few ways to compress the overall timeline.' },
    { q: 'What does it cost?', a: `The one figure that comes from an authority publishing its own price: ${CPL_COST.benchmark.school}, ${CPL_COST.benchmark.status}, publishes ${CPL_COST.benchmark.feeLabel} for its ${CPL_COST.benchmark.course} course. Private flying schools quote differently and no government body publishes a market rate, so treat any range you see online as unsourced until someone names the document.` },
    { q: 'Which licence do I actually need to fly for an airline?', a: `A Commercial Pilot Licence is the one that lets you be paid to fly — ${CPL.permits} An Airline Transport Pilot Licence comes later, at ${ATPL.minAge}, and is what lets you act as pilot-in-command of a commercial aeroplane.` },
    { q: 'Does We One Aviation place students into airline jobs?', a: ACADEMY.scope },
];

/*
 * ANSWER-FIRST AND PEOPLE-ALSO-ASK — ADDED 2026-09-16.
 *
 * WHY. From the Semrush positions export of 2026-09-15 this page holds 10
 * keywords and 24,260 of search volume, with "how to become a pilot" at 14,800
 * sitting at position 26, returning 11 visits a month. Every one of its ten
 * keywords shows an AI Overview. Article and FAQPage nodes were already here;
 * what was missing was the extractable answer at the top and a People-also-ask
 * block. Both are built from facts already on the page.
 */
const guidePaa = [
    {
        q: 'How do you become a pilot in India?',
        a: `Six stages, and the order matters more than the speed. Confirm 10+2 with Physics and Mathematics. Clear a Class 2 medical — the cheapest gate and the one that can stop everything. Apply for a computer number, which needs no medical certificate and no flying school. Clear the ${DGCA_PAPERS.length} DGCA written papers at ${EXAM_RULES.theory.passMark}% each. Fly ${CPL_HOURS.total} hours at a flying training organisation. Then the Class 1 medical, RTR (A) and the skill test, and the licence application on eGCA.`,
    },
    {
        q: 'What qualification do you need to become a pilot?',
        a: `${EDUCATION.requirement} ${EDUCATION.altRoute}`,
    },
    {
        q: 'How long does it take to become a pilot in India?',
        a: 'No rule sets a duration, and any figure quoted without a source is a guess. The regulations fix floors — 200 flying hours, the examination session calendar, the medical validity — not durations. What actually decides your timeline is your flying school: how many aircraft it has and how many students share them. Our page on how long it takes sets out every floor and every expiry window, and the one question to ask a school.',
    },
    {
        q: 'What is the first step to becoming a pilot?',
        a: `Two, in this order. Confirm the education gate. Then book the Class 2 medical, because it is inexpensive relative to everything after it and it is the one result that can end the plan. Only then start spending.`,
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Become a Pilot in India: Every Stage, and How Long Each One Fixes',
    description: 'The full route to a Commercial Pilot Licence in India — education, medical, computer number, written papers, 200 flying hours, RTR, English proficiency and the licence application — with the rule behind each stage and an honest answer on timelines.',
    inLanguage: 'en-IN',
    dateModified: '2026-09-15',
    articleSection: 'Pilot career guide',
    keywords: 'how to become a pilot in india, become a pilot, how long does it take to become a pilot, pilot training in india, steps to become a pilot, commercial pilot licence india',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
    citation: [
        { name: 'Aircraft Rules, 1937, Schedule II — licence ages, education and the 200-hour experience table', url: 'https://www.indiacode.nic.in/handle/123456789/1362' },
        { name: EXAM_RULES.car.citation, url: EXAM_RULES.car.where },
        { name: MED.car.citation, url: MED.sources[2].url },
        { name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
        { name: EGCA.sources[2].label, url: EGCA.sources[2].url },
        { name: `${CPL_COST.benchmark.school} published course fees`, url: CPL_COST.benchmark.source },
    ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-3 underline-orange';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function HowToBecomeAPilotHub() {
    return (
        <Layout
            title="How to Become a Pilot in India: The Complete Route (2026)"
            description="Every stage from Class 12 to a Commercial Pilot Licence, with the rule behind each one — and an honest answer to how long it takes, built from what the rules actually fix."
        >
            <StructuredData data={[articleSchema, faqSchema]} />

            <section className="px-4 pt-12 max-w-4xl mx-auto">
                <QuickAnswer question={guidePaa[0].q} answer={guidePaa[0].a} />
                <p className="text-gray-600 text-sm leading-relaxed mt-5">
                    Three questions come up before this one and each has its own page:{' '}
                    <Link href="/full-form-of-cpl-commercial-pilot-license" className="text-av-blue font-semibold hover:text-av-orange transition-colors">what CPL stands for and requires</Link>,{' '}
                    <Link href="/how-long-does-it-take-to-become-a-pilot" className="text-av-blue font-semibold hover:text-av-orange transition-colors">how long the whole route takes</Link>, and{' '}
                    <Link href="/pilot-career-counselling" className="text-av-blue font-semibold hover:text-av-orange transition-colors">free counselling if you would rather talk it through</Link>.
                </p>
            </section>

            <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Career Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        How to Become a Pilot in India
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        Six stages, each created by a different rule, and they do not run one after another. This is the whole
                        route, what each stage requires, and the honest answer to how long it takes.
                    </p>
                </ScrollReveal>
            </section>

            <section className="py-16 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <p className="text-xs text-gray-500 mb-6">
                                Checked against the Aircraft Rules, the DGCA examination and medical CARs, the Pariksha portal and
                                the eGCA user manuals on {CHECKED_ON}. Every figure is{' '}
                                <a href="#sources" className={A}>sourced below</a>.
                            </p>

                            <div className="bg-av-light border-l-4 border-av-orange rounded-xl p-5 mb-8">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    To fly for a living in India you need a Commercial Pilot Licence: 10+2 with Physics and
                                    Mathematics, a Class 1 medical, {DGCA_PAPERS.length} DGCA written papers at{' '}
                                    {EXAM_RULES.theory.passMark}% each, {RTR.name}, English proficiency at Level 4, and{' '}
                                    {CPL_HOURS.total} hours of flying — held from age {CPL.minAge}. Training itself can start at{' '}
                                    {SPL.minAge}, and the written papers from {PARIKSHA.basics.minAge}.
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

                            {/* Route */}
                            <h2 id="route" className={H2}>The route, in one picture</h2>
                            <p className={P}>
                                The licences form a ladder. Most people picture becoming a pilot as one long course; it is closer to
                                four separate qualifications, each with its own age, and a set of examinations running alongside them.
                            </p>
                            <div className="grid sm:grid-cols-4 gap-3 mb-10">
                                {LICENCES.map((l) => (
                                    <div key={l.code} className={`rounded-xl p-4 ${l.code === 'CPL' ? 'bg-av-orange text-white' : 'bg-av-blue text-white'}`}>
                                        <p className="font-montserrat font-black text-2xl">{l.minAge}</p>
                                        <p className="font-montserrat font-bold text-xs mb-1">{l.code}</p>
                                        <p className="text-white/70 text-xs leading-relaxed">{l.name}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline */}
                            <h2 id="timeline" className={H2}>How long it actually takes</h2>
                            <p className={P}>
                                Every other page answers this with a number. We are not going to, and it is worth explaining why:
                                no rule anywhere sets a duration for becoming a pilot. What the rules fix are floors — the things
                                that cannot go faster however much you pay. Everything else is your flying school&rsquo;s throughput.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>This part</th>
                                            <th className={TH}>Cannot go faster than</th>
                                            <th className={TH}>Fixed by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {floors.map((f, i) => (
                                            <tr key={f.item} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-av-blue font-semibold align-top">{f.item}</td>
                                                <td className="p-3 text-gray-600 align-top">{f.floor}</td>
                                                <td className="p-3 text-gray-500 align-top text-xs">{f.fixedBy}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-2 border-av-orange rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">The question to ask instead</p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The variable that decides your timeline is how many hours a student at your flying school
                                    actually flies per month — which depends on aircraft availability, instructor availability and
                                    weather, and varies between schools by a factor most students never find out until they have
                                    paid. Ask any school you are considering for hours flown per student per month, and for what
                                    happens to your slot when an aircraft goes unserviceable. Those two answers will tell you more
                                    about your timeline than any article, including this one.
                                </p>
                            </div>

                            {/* Stages */}
                            {stages.map((s) => (
                                <div key={s.id}>
                                    <h2 id={s.id} className={H2}>Stage {s.n} — {s.title}</h2>
                                    <p className="text-av-orange font-semibold text-sm mb-3">{s.gate}</p>
                                    {s.body.map((b) => (<p key={b.slice(0, 40)} className={P}>{b}</p>))}
                                    <p className="mb-10">
                                        <Link href={s.link.href} className={`${A} text-sm`}>{s.link.label} →</Link>
                                    </p>
                                </div>
                            ))}

                            {/* Money */}
                            <h2 id="money" className={H2}>What it costs, and the one figure we can cite</h2>
                            <p className={P}>
                                No Indian government body publishes a market price for pilot training — DGCA, the Ministry of Civil
                                Aviation, PIB and parliamentary answers give flying-school counts and licences issued, never fees.
                                One authority publishes its own price, and it is a government academy.
                            </p>
                            <div className="border border-gray-200 rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{CPL_COST.benchmark.school}</p>
                                <p className="text-gray-500 text-xs mb-3">{CPL_COST.benchmark.status}</p>
                                <p className="font-montserrat font-black text-3xl text-av-orange mb-3">{CPL_COST.benchmark.feeLabel}</p>
                                <p className="text-xs font-semibold text-av-blue mb-1">Covers</p>
                                <ul className="mb-3">{CPL_COST.benchmark.includes.map((i) => (<li key={i} className="text-xs text-gray-600">– {i}</li>))}</ul>
                                <p className="text-xs font-semibold text-av-blue mb-1">Charged separately</p>
                                <ul>{CPL_COST.benchmark.excludes.map((i) => (<li key={i} className="text-xs text-gray-600">– {i}</li>))}</ul>
                            </div>
                            <p className={P}>
                                Statutory examination fees are separate and small by comparison: {inr(PARIKSHA.fees.regularPerPaper)}{' '}
                                per paper in a regular session. Before comparing two schools, get both to answer the same questions —
                                the hourly rate, what happens if you need more than the quoted hours, and whether the Instrument
                                Rating and multi-engine endorsement are inside the number or outside it.
                            </p>
                            <p className={P}>
                                <Link href="/cost-transparency" className={A}>Our cost breakdown →</Link>
                            </p>

                            {/* Parallel */}
                            <h2 id="parallel" className={H2}>What you can run in parallel</h2>
                            <p className={P}>
                                The single most expensive mistake is doing these in series when they did not have to be.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {parallel.map((p) => (
                                    <li key={p.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">→</span>{p}
                                    </li>
                                ))}
                            </ul>

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
                            <p className={P}>Read on {CHECKED_ON}. Where a figure could not be traced to one of these, it is not on this page — which is why there is no duration in months anywhere above.</p>
                            <ul className="space-y-2 mb-10">
                                {articleSchema.citation.map((c) => (
                                    <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Work out your own timeline</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">{ACADEMY.scope}</p>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    What we can do in one conversation is tell you which stages you are already through, which can
                                    run in parallel, and what to ask a flying school before you pay a deposit.
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

                    <div className="space-y-6">
                        <ScrollReveal delay={200}><LeadForm title="Plan Your Route" /></ScrollReveal>
                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">The six stages</h4>
                                <ul className="space-y-2 text-sm text-white/85">
                                    {stages.map((s) => (<li key={s.id}>{s.n}. {s.title}</li>))}
                                </ul>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={400}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Go deeper</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/commercial-pilot-license-eligibility" className={A}>Every eligibility requirement</Link></li>
                                    <li><Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical</Link></li>
                                    <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                                    <li><Link href="/commercial-pilot-license-syllabus" className={A}>Syllabus and study material</Link></li>
                                    <li><Link href="/egca-login" className={A}>eGCA and the licence</Link></li>
                                    <li><Link href="/how-to-become-a-pilot-after-12th" className={A}>Straight after Class 12</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
            <section className="px-4 pb-16 max-w-4xl mx-auto">
                <PeopleAlsoAsk items={guidePaa} />
            </section>

        </Layout>
    );
}
