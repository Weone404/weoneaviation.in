import Layout from '../components/Layout';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import QuickAnswer from '../components/QuickAnswer';
import SummaryBox from '../components/SummaryBox';
import PeopleAlsoAsk from '../components/PeopleAlsoAsk';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import { generateFAQSchema } from '../lib/schema';
import {
  ACADEMY, LICENCES, EDUCATION, DGCA_PAPERS, RTR, CPL_HOURS, EXAM_RULES,
  PARIKSHA, EGCA, MEDICAL_STANDARDS as MED, FTO, inr,
} from '../lib/facts';

/*
 * /commercial-pilot-license-admission-process — rewritten 2026-09-17.
 *
 * WHAT WAS WRONG. The page led with a statistic block saying "17+ Minimum Age"
 * and body copy saying training starts at 17 and the licence is issued at 18.
 * Schedule II says 16 for a Student Pilot Licence and 18 for a Commercial
 * Pilot Licence; 17 is the Private Pilot Licence age and belongs to neither
 * sentence. The page also carried no FAQs, no answer-first block, no sources
 * and a HowTo node as its only structured data, which Google stopped using for
 * rich results. Several steps were written in broken English.
 *
 * WHAT IT IS NOW. The real sequence, in the order that saves money, with every
 * figure rendering from lib/facts.js. The ordering itself is the value: the
 * computer number needs no medical and no school, so it comes first; the
 * medical comes before any deposit; the school is chosen against DGCA's own
 * published ranking rather than a brochure.
 *
 * NOT HERE, DELIBERATELY. Our own fees, batch sizes or timings. Any admission
 * "deadline" — there is none, sessions are published by DGCA and listed on
 * /dgca-pariksha. Any promise about what happens after the licence.
 */

const CANONICAL = 'https://weoneaviation.in/commercial-pilot-license-admission-process';
const LAST_UPDATED = '17 September 2026';

const cpl = LICENCES.find((l) => l.code === 'CPL');
const spl = LICENCES.find((l) => l.code === 'SPL');

const steps = [
  {
    n: '01',
    title: 'Confirm eligibility against Schedule II, not a brochure',
    body: `Age ${cpl.minAge} for the ${cpl.name} and ${spl.minAge} for the ${spl.name} — the licence you train on and the licence you are working towards have different minimum ages, and pages that print a single number for "pilot training" are collapsing the two. Education: ${EDUCATION.requirement} (${EDUCATION.clause}).`,
    extra: EDUCATION.altRoute,
    source: 'Aircraft Rules, 1937, Schedule II',
  },
  {
    n: '02',
    title: 'Register for the computer number — before anything else',
    body: `This is the step almost every sequence puts last, and it belongs first. Registration on ${PARIKSHA.portal} needs no medical certificate and no flying school. ${PARIKSHA.basics.definition} ${PARIKSHA.basics.validity}`,
    extra: `Minimum age to register is ${PARIKSHA.basics.minAge}. ${PARIKSHA.basics.maxAgeNote} ${PARIKSHA.basics.oneOnly}`,
    source: 'DGCA Pariksha',
  },
  {
    n: '03',
    title: 'Book the medical before you pay any deposit',
    body: MED.classOrder.advice,
    extra: `A Class 2 covers the Student Pilot Licence; a Class 1 is what the Commercial Pilot Licence needs. An initial Class 1 can only be done at ${MED.centres.initialIssueOnly.list.join(', ')}. DGCA charges ${MED.fees.rows[0].label} for a Class 1 and ${MED.fees.rows[2].label} for a Class 2 at the Air Force centres.`,
    source: MED.car.citation,
  },
  {
    n: '04',
    title: 'Choose the flying school against published evidence',
    body: `DGCA lists ${FTO.count} approved flying training organisations as on ${FTO.listAsOf}, across ${FTO.statesWithBases.length} states, and separately ranks them. ${FTO.ranking.parameters[1].name} carries ${FTO.ranking.parameters[1].weight}% of that ranking — which is the closest thing to an objective throughput measure anyone publishes.`,
    extra: `Worth knowing before you plan travel: there is no approved flying base in ${FTO.noBaseIn.join(', ')}. Ground school and flying happen in different places for almost every Delhi student.`,
    source: 'DGCA approved FTO list and ranking notice',
  },
  {
    n: '05',
    title: 'Clear the written examinations',
    body: `${DGCA_PAPERS.length} subjects: ${DGCA_PAPERS.join(', ')}. ${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject}`,
    extra: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand. ${EXAM_RULES.paperValidity.planningNote}`,
    source: `${EXAM_RULES.car.series} ${EXAM_RULES.car.part}, ${EXAM_RULES.car.revision} dated ${EXAM_RULES.car.dated}`,
  },
  {
    n: '06',
    title: 'Clear RTR (A), which is not one of the five',
    body: `${RTR.name} is examined separately from the DGCA written papers. ${RTR.note}`,
    extra: 'Students routinely discover this at the end. Treat it as its own project with its own timetable from the start.',
    source: RTR.instrument,
  },
  {
    n: '07',
    title: 'Fly the hours, and have the logbook validated as you go',
    body: `${CPL_HOURS.total} hours in total, flown within ${CPL_HOURS.recencyYears} years preceding the application. The breakdown is fixed by Schedule II and no school can shorten it.`,
    extra: 'Have the flying training organisation e-validate the logbook as hours accrue rather than in one batch at the end — a validation backlog at the end is a common and entirely avoidable delay.',
    source: `Aircraft Rules, 1937, Schedule II, ${CPL_HOURS.clause}`,
  },
  {
    n: '08',
    title: 'Apply on eGCA',
    body: 'The licence application is made on eGCA, and it checks six things against its own records before it will process a Commercial Pilot Licence.',
    extra: EGCA.joinPoint,
    source: `eGCA, ${EGCA.url}`,
  },
];

const peopleAlsoAsk = [
  {
    q: 'What is the admission process for a Commercial Pilot Licence in India?',
    a: `There is no single admission office. The sequence is: confirm eligibility under Schedule II of the Aircraft Rules, 1937 (age ${cpl.minAge} for the licence, ${EDUCATION.requirement.toLowerCase()}); register for a DGCA computer number on ${PARIKSHA.portal}, which needs no medical and no school; take the Class 1 medical before paying any school a deposit; choose a DGCA-approved flying training organisation; clear the ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each; clear RTR (A) separately; fly ${CPL_HOURS.total} hours with the logbook validated as you go; then apply on eGCA.`,
  },
  {
    q: 'What is the minimum age to start CPL training?',
    a: `${spl.minAge} for a ${spl.name}, which is the licence you actually train on, and ${cpl.minAge} for the ${cpl.name} itself. A Private Pilot Licence sits at ${LICENCES.find((l) => l.code === 'PPL').minAge}. Any page giving one age for "pilot training" has merged three different licences.`,
  },
  {
    q: 'Do I need to join a flying school before registering with DGCA?',
    a: `No, and doing it in that order costs students an examination session every year. ${PARIKSHA.basics.definition} The registration needs no medical certificate and no flying school.`,
  },
  {
    q: 'How many DGCA exams are there for CPL?',
    a: `${DGCA_PAPERS.length}: ${DGCA_PAPERS.join(', ')}. ${RTR.name} is required for the licence but examined separately, so it is not a sixth paper.`,
  },
  {
    q: 'Does We One Aviation run the flying training?',
    a: ACADEMY.scope,
  },
];

const faqs = [
  { q: 'Is there an admission deadline?', a: `Not for the licence itself. DGCA publishes examination sessions and the dates move; the current calendar is on our DGCA Pariksha page. A flying school has its own intake dates, which are the school's and not the regulator's. ${PARIKSHA.calendar2026.tentative}` },
  { q: 'What documents do I need to start?', a: 'Class 10 and Class 12 marksheets and pass certificates, a date-of-birth certificate, board verification certificates, address proof and Aadhaar, plus a photograph and signature to the exact specifications the portal sets. Get the name spelling identical to your Class 10 record on every portal — a mismatch is the most common avoidable delay.' },
  { q: 'What does the whole process cost?', a: `We publish only the figures a government body publishes. DGCA charges ${inr(PARIKSHA.fees.regularPerPaper)} per examination paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} on demand, and ${MED.fees.rows[0].label} for a Class 1 medical at an Air Force centre. Flying school fees are set by each school and vary; ask for the seven-question breakdown on our cost page before comparing two quotes.` },
  { q: 'Can I take the exams before I start flying?', a: `Yes, and it is usually the best use of the time. Watch the validity window though: ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl}` },
  { q: 'What if I fail a paper?', a: `You retake that paper on its own. ${EXAM_RULES.theory.perSubject} There is no aggregate to rescue a weak subject and no penalty attached to the subjects you have already cleared.` },
  { q: 'Which medical do I need, and when?', a: `${MED.classOrder.notMandatory} ${MED.classOrder.advice}` },
  { q: 'Is there a DGCA-approved flying school in Delhi?', a: `No. DGCA's approved list has no flying base in ${FTO.noBaseIn.join(', ')}. Ground school can be done in Delhi; the flying happens elsewhere. Anyone telling you otherwise is not reading the same list.` },
  { q: 'What does eGCA check before issuing the licence?', a: `Six things: ${EGCA.cplPrerequisites.join('; ')}.` },
  { q: 'How long does it take?', a: 'No authority publishes a figure and we will not invent one. It depends on examination sessions, weather, aircraft availability at your school and how promptly your logbook is validated. What is fixed is the list above and the validity windows attached to it.' },
  { q: 'What does We One Aviation actually do in this process?', a: `${ACADEMY.scope} The counselling is free and covers the route end to end — which licence you are aiming at, what to do first, and how to sequence the examinations against the medical.` },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CPL Admission Process in India: The Real Order of Steps',
  description: 'The Commercial Pilot Licence admission process in India, step by step and in the order that saves money — eligibility under Schedule II, the DGCA computer number, the medical, choosing an approved flying school, the five written papers, RTR, the hours and the eGCA application.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-17',
  articleSection: 'CPL admission',
  keywords: 'cpl admission process, commercial pilot license admission, dgca admission process, how to apply for cpl india, pilot training admission process',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: 'DGCA Pariksha — candidate registration and examination portal', url: PARIKSHA.portal },
    { '@type': 'CreativeWork', name: 'eGCA — DGCA electronic governance portal for licences', url: EGCA.url },
    { '@type': 'CreativeWork', name: MED.car.citation, url: MED.sources[2].url },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CPLAdmissionProcess() {
  return (
    <Layout
      title="CPL Admission Process in India: The Real Order of Steps"
      description="The Commercial Pilot Licence admission process, step by step and in the order that saves money — eligibility, computer number, medical, flying school, the five papers, RTR, hours and eGCA."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">CPL admission</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            The CPL Admission Process
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            There is no single admission office. There is a sequence — and doing it in the right order is worth more
            than any brochure.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                Checked against the Aircraft Rules, DGCA Pariksha, eGCA and the DGCA medical CAR on {LAST_UPDATED}.{' '}
                <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="The four things people get wrong"
                items={[
                  `Age: ${spl.minAge} for the licence you train on, ${cpl.minAge} for the one you are training towards — not one number`,
                  'The computer number comes first, not last. It needs no medical and no flying school',
                  'The medical comes before the deposit. Finding a disqualifying condition after paying is an expensive way to learn it',
                  `RTR (A) is not a sixth paper — it is examined separately and clears on its own timetable`,
                ]}
              />

              <h2 id="steps" className={H2}>The sequence, in order</h2>
              <p className={P}>
                Each step below carries the rule or portal it comes from. Nothing here is our procedure; it is the
                regulator&rsquo;s, arranged in the order that costs a candidate the least time and money.
              </p>

              <div className="space-y-5 mb-8">
                {steps.map((s) => (
                  <div key={s.n} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-av-blue text-white font-montserrat font-bold text-sm flex items-center justify-center">
                        {s.n}
                      </div>
                      <div>
                        <p className="font-montserrat font-bold text-av-blue text-base mb-2">{s.title}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{s.body}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{s.extra}</p>
                        <p className="text-xs text-gray-400">Source: {s.source}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 id="hours" className={H2}>What the {CPL_HOURS.total} hours are made of</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th className="text-left p-3 font-montserrat font-bold">Requirement</th>
                      <th className="text-left p-3 font-montserrat font-bold">Hours</th>
                      <th className="text-left p-3 font-montserrat font-bold">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CPL_HOURS.components.map((c, i) => (
                      <tr key={c.label} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                        <td className="p-3 text-gray-700 font-semibold align-top">{c.label}</td>
                        <td className="p-3 text-gray-700 align-top whitespace-nowrap">{c.hours}</td>
                        <td className="p-3 text-gray-600 align-top">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                These are minimums in Schedule II. No school shortens them, and a quote built on fewer hours is a quote
                with a second invoice behind it.
              </p>

              <h2 id="egca" className={H2}>What eGCA checks at the end</h2>
              <ul className="space-y-1.5 mb-4">
                {EGCA.cplPrerequisites.map((p) => (
                  <li key={p} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{p}
                  </li>
                ))}
              </ul>
              <p className={P}>
                It checks these against its own records rather than your word, which is why the logbook validation and
                the name spellings matter long before you reach this screen.
              </p>

              <PeopleAlsoAsk items={peopleAlsoAsk} />

              <section className="mt-10">
                <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <details key={f.q} className="border border-gray-200 rounded-xl p-4">
                      <summary className="font-semibold text-av-blue text-sm cursor-pointer">{f.q}</summary>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <h2 id="sources" className={H2}>Sources</h2>
              <ul className="space-y-2 mb-8">
                {articleSchema.citation.map((c) => (
                  <li key={c.name} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-8">
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Not sure where you are in this sequence?</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  The counselling is free and end to end. {ACADEMY.scope}
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
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <LeadForm title="Ask About Admission" />
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Each step in detail</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link></li>
                  <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                  <li><Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical</Link></li>
                  <li><Link href="/dgca-pariksha" className={A}>DGCA Pariksha: papers and fees</Link></li>
                  <li><Link href="/rtr-a" className={A}>RTR (A)</Link></li>
                  <li><Link href="/cpl-flight-training" className={A}>CPL flight training</Link></li>
                  <li><Link href="/egca-login" className={A}>eGCA login</Link></li>
                  <li><Link href="/student-checklists" className={A}>The full checklist</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
