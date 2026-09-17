import Layout from '../../components/Layout';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';
import QuickAnswer from '../../components/QuickAnswer';
import SummaryBox from '../../components/SummaryBox';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import ScrollReveal from '../../components/ScrollReveal';
import StructuredData from '../../components/StructuredData';
import { generateFAQSchema } from '../../lib/schema';
import {
  ACADEMY, DGCA_PAPERS, RTR, EXAM_RULES, PARIKSHA, SYLLABUS, inr,
} from '../../lib/facts';

/*
 * /blogs/dgca-exam-guide — rewritten 2026-09-17.
 *
 * THE CORE PROBLEM WAS INTENT. The URL says "dgca exam guide". The page was a
 * "DGCA full form / what the DGCA does" explainer, with a BlogPosting headline
 * to match. So it ranked, where it ranked at all, for a query it did not
 * answer — and /dgca-full-form already covers that subject properly. A reader
 * arriving here wants the examination: how many papers, what the pass mark is,
 * when the sessions are, what it costs, and what happens if they fail one.
 *
 * SECOND PROBLEM: the prose. Whole paragraphs were in broken English with
 * random capitalisation ("If Your Dream To Become a Pilot Then You Need a
 * License..."). That is a quality signal to both readers and answer engines.
 *
 * THIRD: unsourced institutional facts — a founding year, a headquarters
 * description — presented as a stat block. None of it was cited and none of it
 * answered the query, so it is gone rather than patched.
 *
 * WHAT IT IS NOW. An examination guide, rendering from lib/facts.js: the five
 * papers, the 70% per-subject rule, both validity windows, the fee schedule,
 * the 2026 session calendar with DGCA's own caveat that it is tentative, the
 * booking rules, the oral pass marks by licence, and the honest boundary on
 * the syllabus — DGCA publishes the paper list, and this page does not invent
 * a topic-by-topic syllabus it cannot source.
 */

const DATE_PUBLISHED = '2025-01-02';
const DATE_MODIFIED = '2026-09-17';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-exam-guide';
const LAST_UPDATED = '17 September 2026';

const peopleAlsoAsk = [
  {
    q: 'How many DGCA exams are there, and what is the pass mark?',
    a: `${DGCA_PAPERS.length} written papers for a Commercial Pilot Licence: ${DGCA_PAPERS.join(', ')}. ${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject} ${RTR.name} is required for the licence but examined separately, so it is not a sixth paper.`,
  },
  {
    q: 'What does the DGCA exam cost?',
    a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} per paper on demand. ${PARIKSHA.fees.serviceCharge} Payment is made to the Government of India, not to a coaching institute.`,
  },
  {
    q: 'When are the DGCA exams held in 2026?',
    a: `Four regular sessions: ${PARIKSHA.calendar2026.regular.map((s) => s.dates).join('; ')}. ${PARIKSHA.calendar2026.tentative}`,
  },
  {
    q: 'How long do cleared DGCA papers stay valid?',
    a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} ${EXAM_RULES.paperValidity.planningNote}`,
  },
  {
    q: 'What happens if I fail a DGCA paper?',
    a: `You retake that paper on its own. ${EXAM_RULES.theory.perSubject} There is no aggregate mark, so a strong paper cannot carry a weak one — and equally, a failed paper does not affect the ones you have already cleared.`,
  },
];

const faqs = [
  { q: 'What is the pass mark for the DGCA written examinations?', a: `${EXAM_RULES.theory.statement} (${EXAM_RULES.theory.clause}) ${EXAM_RULES.theory.perSubject}` },
  { q: 'Which five subjects are examined?', a: `${DGCA_PAPERS.join(', ')}. ${SYLLABUS.cpl.rtrNote}` },
  { q: 'Is RTR part of the DGCA papers?', a: `No. ${RTR.note} It is examined under the ${RTR.instrument}.` },
  { q: 'Where do I register for the examination?', a: `On the DGCA Pariksha portal, ${PARIKSHA.portal}. ${PARIKSHA.basics.definition} ${PARIKSHA.basics.validity}` },
  { q: 'Is there a minimum or maximum age to register?', a: `Minimum ${PARIKSHA.basics.minAge}. ${PARIKSHA.basics.maxAgeNote}` },
  { q: 'Can I apply for more than one session at a time?', a: `${PARIKSHA.booking.onePerSession} ${PARIKSHA.booking.specificAircraft}` },
  { q: 'How many exam centres can I choose?', a: `${PARIKSHA.booking.centreChoices}. ${PARIKSHA.booking.centreNote}` },
  { q: 'How is the fee paid?', a: `${PARIKSHA.booking.payment} ${PARIKSHA.fees.serviceCharge}` },
  { q: 'What is the on-demand exam and why does it cost more?', a: `It is an additional route to sitting a paper outside the four regular sessions, at ${inr(PARIKSHA.fees.olodePerPaper)} per paper against ${inr(PARIKSHA.fees.regularPerPaper)} in a regular session. The pass mark and the paper are the same; what you are paying for is the timing.` },
  { q: 'What is the pass mark for the oral examinations?', a: `It varies by licence: ${EXAM_RULES.oral.map((o) => `${o.licence} — ${o.passMark}%`).join('; ')}.` },
  { q: 'Can I retake a failed ATPL oral?', a: EXAM_RULES.oralRetake.statement },
  { q: 'Where is the detailed syllabus for each paper?', a: SYLLABUS.cpl.detailBoundary },
  { q: 'Do I need a medical certificate to sit the exams?', a: 'No. The computer number registration and the written examinations need no medical certificate and no flying school. The medical is required for the licence, not for the papers — which is why registering early costs nothing and waiting costs a session.' },
  { q: 'Does We One Aviation conduct the DGCA examination?', a: `No. DGCA conducts it through its Central Examination Organisation. ${ACADEMY.scope}` },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'DGCA Exam Guide: Papers, Pass Mark, Fees and 2026 Sessions',
  description: 'The DGCA written examinations explained from the regulation — the five CPL papers, the 70% per-subject pass mark, both validity windows, the fee schedule, the 2026 session calendar, the booking rules and the oral pass marks by licence.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA examinations',
  keywords: 'dgca exam guide, dgca exam pass mark, dgca exam fees, dgca exam dates 2026, dgca papers, dgca pariksha, cpl exam india',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization',
    name: ACADEMY.name,
    url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [
    { '@type': 'CreativeWork', name: `${EXAM_RULES.car.section}, ${EXAM_RULES.car.series} ${EXAM_RULES.car.part}, ${EXAM_RULES.car.revision} dated ${EXAM_RULES.car.dated} — ${EXAM_RULES.car.title}`, url: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq' },
    { '@type': 'CreativeWork', name: 'DGCA Pariksha — candidate registration and examination portal', url: PARIKSHA.portal },
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function DGCAExamGuide() {
  return (
    <Layout
      title="DGCA Exam Guide: Papers, Pass Mark, Fees and 2026 Sessions"
      description="The DGCA written examinations from the regulation — five CPL papers, 70% per subject, both validity windows, fees, the 2026 session calendar and the booking rules."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">DGCA examinations</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            DGCA Exam Guide
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Five papers, seventy per cent each, no aggregate. Everything below comes from the regulation or the portal.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <Breadcrumb />
            <p className="text-xs text-gray-500 mb-5">
              Checked on {LAST_UPDATED}. <a href="#sources" className={A}>Sources below</a>.
            </p>

            <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

            <SummaryBox
              title="The rules in five lines"
              items={[
                `${DGCA_PAPERS.length} papers for a CPL, ${EXAM_RULES.theory.passMark}% in each, and no aggregate to rescue a weak subject`,
                `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand, paid to the Government of India`,
                `${PARIKSHA.calendar2026.regular.length} regular sessions a year, plus on-demand sessions`,
                `Papers expire: ${EXAM_RULES.paperValidity.general.replace(/\.$/, '')} — five years for a CPL or ATPL`,
                `${RTR.name} is separate and clears on its own timetable`,
              ]}
            />

            <h2 id="papers" className={H2}>The papers</h2>
            <p className={P}>
              {SYLLABUS.cpl.paperCount} subjects are examined for a Commercial Pilot Licence. The list is set by
              Schedule II of the Aircraft Rules, 1937 — not by any school, and not by the coaching market.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {DGCA_PAPERS.map((p, i) => (
                <div key={p} className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-av-blue text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-av-blue text-sm">{p}</span>
                </div>
              ))}
            </div>
            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{SYLLABUS.cpl.rtrNote}</p>
            </div>

            <h2 id="pass-mark" className={H2}>The pass mark, and why it has no aggregate</h2>
            <p className={P}>{EXAM_RULES.theory.statement} ({EXAM_RULES.theory.clause})</p>
            <p className={P}>{EXAM_RULES.theory.perSubject}</p>
            <p className={P}>
              The practical consequence is that a paper is a self-contained project. Failing one costs you that paper
              and nothing else; clearing four brilliantly does not help with the fifth.
            </p>

            <h2 id="validity" className={H2}>Papers expire — plan backwards</h2>
            <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{EXAM_RULES.paperValidity.general}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{EXAM_RULES.paperValidity.cplAtpl}</p>
              <p className="text-gray-700 text-sm leading-relaxed font-semibold">{EXAM_RULES.paperValidity.planningNote}</p>
            </div>
            <p className={P}>
              This is the single most expensive thing on this page to get wrong. A candidate who clears all five early
              and then takes a long time over the flying hours can find the first paper has lapsed by the time the
              licence application goes in. Diarise the expiry of your <em>first</em> pass, not just your next attempt.
            </p>

            <h2 id="fees" className={H2}>What it costs</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className={TH}>Item</th>
                    <th className={TH}>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 text-gray-700 font-semibold">Per paper, regular session</td>
                    <td className="p-3 text-gray-700 font-semibold whitespace-nowrap">{inr(PARIKSHA.fees.regularPerPaper)}</td>
                  </tr>
                  <tr className="bg-av-light">
                    <td className="p-3 text-gray-700 font-semibold">Per paper, on demand</td>
                    <td className="p-3 text-gray-700 font-semibold whitespace-nowrap">{inr(PARIKSHA.fees.olodePerPaper)}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-gray-700 font-semibold">Oral paper</td>
                    <td className="p-3 text-gray-700 font-semibold whitespace-nowrap">{inr(PARIKSHA.fees.oralPerPaper)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={P}>{PARIKSHA.fees.oralNote} {PARIKSHA.fees.serviceCharge}</p>
            <p className={P}>
              These are DGCA&rsquo;s fees, paid to the government. They are entirely separate from what any ground
              school charges, and a coaching fee that claims to include them should say so in writing.
            </p>

            <h2 id="sessions" className={H2}>The 2026 sessions</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className={TH}>Session</th>
                    <th className={TH}>Dates</th>
                  </tr>
                </thead>
                <tbody>
                  {PARIKSHA.calendar2026.regular.map((s, i) => (
                    <tr key={s.session} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                      <td className="p-3 text-gray-700 font-semibold whitespace-nowrap">{s.session}</td>
                      <td className="p-3 text-gray-600">{s.dates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{PARIKSHA.calendar2026.tentative}</p>
            </div>

            <h2 id="booking" className={H2}>The booking rules</h2>
            <ul className="space-y-1.5 mb-4">
              {[
                PARIKSHA.booking.onePerSession,
                PARIKSHA.booking.centreNote,
                PARIKSHA.booking.specificAircraft,
                PARIKSHA.booking.deadline,
                PARIKSHA.booking.noChanges,
                PARIKSHA.booking.payment,
              ].map((b) => (
                <li key={b} className="flex gap-2 items-start text-sm text-gray-600">
                  <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{b}
                </li>
              ))}
            </ul>

            <h2 id="oral" className={H2}>The oral examinations</h2>
            <p className={P}>
              The written papers are not the whole examination. Oral pass marks differ by licence, which surprises
              candidates who assume seventy per cent applies everywhere.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className={TH}>Licence or rating</th>
                    <th className={TH}>Pass mark</th>
                    <th className={TH}>Clause</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAM_RULES.oral.map((o, i) => (
                    <tr key={o.licence} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                      <td className="p-3 text-gray-700 font-semibold align-top">{o.licence}</td>
                      <td className="p-3 text-gray-700 align-top whitespace-nowrap">{o.passMark}%</td>
                      <td className="p-3 text-gray-500 align-top whitespace-nowrap">{o.clause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={P}>{EXAM_RULES.oralRetake.statement} ({EXAM_RULES.oralRetake.clause})</p>

            <h2 id="syllabus" className={H2}>Why there is no topic list on this page</h2>
            <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
              <p className="text-gray-600 text-sm leading-relaxed">{SYLLABUS.cpl.detailBoundary}</p>
            </div>

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

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Link href="/dgca-pariksha" className="p-4 border border-gray-200 rounded-xl hover:border-av-orange transition-all">
                <p className="font-bold text-av-blue text-sm mb-1">DGCA Pariksha</p>
                <p className="text-xs text-gray-600">The portal, in full</p>
              </Link>
              <Link href="/dgca-computer-number" className="p-4 border border-gray-200 rounded-xl hover:border-av-orange transition-all">
                <p className="font-bold text-av-blue text-sm mb-1">Computer number</p>
                <p className="text-xs text-gray-600">Register before anything else</p>
              </Link>
              <Link href="/rtr-a" className="p-4 border border-gray-200 rounded-xl hover:border-av-orange transition-all">
                <p className="font-bold text-av-blue text-sm mb-1">RTR (A)</p>
                <p className="text-xs text-gray-600">The separate radio examination</p>
              </Link>
            </div>

            <div className="bg-av-blue rounded-2xl p-8">
              <h3 className="font-montserrat text-xl font-bold text-white mb-3">Preparing for the papers?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {ACADEMY.scope} The counselling is free and covers how to sequence the papers against the medical and
                the flying, so you are not waiting on one to start the other.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dgca-ground-classes" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                  DGCA ground classes
                </Link>
                <Link href="/pilot-career-counselling" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                  Free career counselling
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
