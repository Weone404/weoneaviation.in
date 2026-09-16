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
  ACADEMY, CPL_HOURS, EXAM_RULES, DGCA_PAPERS, PARIKSHA, FTO, EDUCATION,
  MEDICAL_STANDARDS as MED, LICENCES, RTR, papersSummary, inr,
} from '../lib/facts';

/*
 * /how-long-does-it-take-to-become-a-pilot — new 2026-09-16.
 *
 * WHY IT EXISTS. Keyword 45 on the owner's priority list, flagged there as a
 * high-volume timeline query and a rival target. The site answered it only
 * inside an FAQ on another page.
 *
 * WHY THIS VERSION IS DEFENSIBLE. Every competitor answers with a duration —
 * "18 to 24 months", "2 to 3 years" — and not one of them can source it,
 * because no regulation sets a duration. What the regulations set are FLOORS
 * and EXPIRY WINDOWS, and those are the two things that actually shape a
 * timeline. The floors say how little time it can take; the expiry windows say
 * how long you can stretch it before work you have already done goes stale.
 *
 * The genuinely useful insight, and the one nobody publishes: the binding
 * constraint is not the regulation at all. It is aircraft availability at your
 * flying school. DGCA itself weights "Operational Aspects" — aircraft
 * utilisation and student-to-aircraft ratio — at 40% of its FTO ranking,
 * which is the regulator saying in public that this is what decides throughput.
 * So the page ends by telling the reader the one question to ask a school, and
 * that answer predicts their timeline better than any article can.
 *
 * WHAT IS DELIBERATELY NOT HERE. A number of months. We do not have one and
 * nobody does. Also no batch timings or course duration for this academy — the
 * owner's standing rule.
 */

const LAST_UPDATED = '16 September 2026';
const LAST_UPDATED_ISO = '2026-09-16';
const CANONICAL = 'https://weoneaviation.in/how-long-does-it-take-to-become-a-pilot';

const floors = [
  { what: 'Minimum age', detail: `${LICENCES.map((l) => `${l.code} at ${l.minAge}`).join(', ')}. If you are 16, the calendar itself is a floor: nothing makes a Commercial Pilot Licence possible before ${LICENCES.find((l) => l.code === 'CPL').minAge}.`, rule: 'Aircraft Rules, 1937, Schedule II' },
  { what: 'Flying hours', detail: `${CPL_HOURS.total} hours as pilot of an aeroplane. The components sit inside that total rather than adding to it: ${CPL_HOURS.components.map((c) => `${c.hours} hours ${c.label}`).join(', ')}.`, rule: `Schedule II, ${CPL_HOURS.clause}` },
  { what: 'Written papers', detail: `${DGCA_PAPERS.length} papers — ${papersSummary()} — each needing ${EXAM_RULES.theory.passMark}% on its own. They are cleared one at a time, so the constraint is how many examination sessions fall inside your window.`, rule: `${EXAM_RULES.car.citation}, ${EXAM_RULES.theory.clause}` },
  { what: 'Examination sessions', detail: `${PARIKSHA.calendar2026.regular.length} regular sessions and ${PARIKSHA.calendar2026.olode.length} on-demand sessions a year. A failed paper does not cost you a month, it costs you a cycle.`, rule: 'DGCA Pariksha calendar' },
  { what: 'Computer number', detail: `Immediate through DigiLocker; ${PARIKSHA.processing.days} working days on the manual route once the application is complete. It needs no medical certificate and no flying school, which is why it should be the first thing you start.`, rule: 'DGCA Central Examination Organisation' },
  { what: 'Recency of hours', detail: `The ${CPL_HOURS.total} hours must be flown within the ${CPL_HOURS.recencyYears} years before you apply, and not less than 15 hours as pilot-in-command in the six months before applying.`, rule: `Schedule II, ${CPL_HOURS.clause}` },
];

const expiries = [
  { what: 'Written paper passes', detail: EXAM_RULES.paperValidity.general, extra: EXAM_RULES.paperValidity.cplAtpl, rule: `${EXAM_RULES.car.citation}, ${EXAM_RULES.paperValidity.clause}` },
  { what: 'Flying hours', detail: `Hours older than ${CPL_HOURS.recencyYears} years do not count towards the ${CPL_HOURS.total}.`, extra: 'Someone who flies 120 hours, stops for six years and returns has lost them.', rule: `Schedule II, ${CPL_HOURS.clause}` },
  { what: 'Medical certificate', detail: 'A medical is valid for a defined period and then has to be renewed, so a long gap means paying for it twice.', extra: MED.classOrder.advice, rule: MED.car.citation },
];

const peopleAlsoAsk = [
  {
    q: 'How long does it take to become a pilot in India?',
    a: `No rule sets a duration, and any page quoting one cannot source it. What the regulations fix are floors — ${CPL_HOURS.total} flying hours, ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each, a minimum age of ${LICENCES.find((l) => l.code === 'CPL').minAge}, ${PARIKSHA.calendar2026.regular.length} regular examination sessions a year — and expiry windows that say how long you can stretch it before work goes stale. The variable that actually decides your timeline is aircraft availability at your flying school, and DGCA itself weights that at 40% of its ranking of flying schools.`,
  },
  {
    q: 'What is the fastest it can be done?',
    a: `Bounded by the floors rather than by effort. You cannot hold a Commercial Pilot Licence before ${LICENCES.find((l) => l.code === 'CPL').minAge}. You cannot log ${CPL_HOURS.total} hours faster than aircraft and weather allow. You cannot clear ${DGCA_PAPERS.length} papers in fewer sittings than the calendar offers. Beyond those, speed is a function of how much the school can fly you.`,
  },
  {
    q: 'Why do different websites give different timelines?',
    a: 'Because none of them is quoting a rule. The figures circulating — eighteen months, two years, three years — describe somebody’s experience at a particular school in a particular year, and they are repeated until they read like a standard. There is no standard.',
  },
  {
    q: 'What actually makes pilot training take longer?',
    a: `Three things, in order of how often they bite. Aircraft availability and the student-to-aircraft ratio at your school. Weather — the monsoon stops flying across much of India for weeks at a time. And re-sits: a failed paper costs a cycle rather than a week, because there are only ${PARIKSHA.calendar2026.regular.length} regular sessions a year.`,
  },
  {
    q: 'Can I clear the DGCA papers before joining a flying school?',
    a: `Yes, and it is the single best use of waiting time. The computer number application needs no medical certificate and no flying school, and papers are cleared one at a time. But mind the expiry: ${EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.planningNote.slice(1)}`,
  },
];

const faqs = [
  { q: 'Is there a minimum time set by DGCA?', a: 'No. DGCA sets minimum hours, minimum ages and pass marks. It does not set a course length, and no Indian regulation does.' },
  { q: 'How long are my DGCA paper passes valid?', a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} That is ${EXAM_RULES.car.citation}, ${EXAM_RULES.paperValidity.clause}.` },
  { q: 'Do old flying hours still count?', a: `Only if they fall within the ${CPL_HOURS.recencyYears} years before you apply. Older hours do not count towards the ${CPL_HOURS.total}, which is why a long break is expensive rather than merely slow.` },
  { q: 'What is the one question to ask a flying school about timelines?', a: `"How many hours does an average student fly per month here, and how many students share each aircraft?" DGCA weights ${FTO.ranking.parameters[1].name} at ${FTO.ranking.parameters[1].weight}% of its own ranking — aircraft utilisation and student-to-aircraft ratio — which is the regulator saying in public that this is what decides throughput.` },
  { q: 'Does the monsoon really matter?', a: 'Yes, and it is routinely left out of timeline estimates. Flying stops in bad weather, and much of India has a season of it. Ask a school how many flyable days it counts on in a year rather than accepting a months figure.' },
  { q: 'Should I do the papers first or the flying first?', a: `Start the papers first, because they need nothing else. But do not finish them years early: ${EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.planningNote.slice(1)}` },
  { q: 'Does a cadet programme make it faster?', a: 'It changes how you are selected and funded, not what the licence requires. The hours, the papers and the medical are identical. Where a cadet route can genuinely be faster is aircraft availability, because the programme has contracted for it.' },
  { q: 'How long does We One Aviation take?', a: ACADEMY.scope },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Long Does It Take to Become a Pilot in India?',
  description: 'No Indian regulation sets a duration for pilot training. What it sets are floors — 200 hours, five papers at 70%, minimum ages — and expiry windows. The variable that decides your timeline is aircraft availability, which DGCA weights at 40% of its own ranking of flying schools.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Pilot training timeline',
  keywords: 'how long does it take to become a pilot, how long to become a pilot in india, pilot training duration, cpl course duration, how many years to become a pilot',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: `${EXAM_RULES.car.citation} — pass marks and paper validity`, url: EXAM_RULES.car.where },
    { '@type': 'CreativeWork', name: FTO.sources[1].label, url: FTO.sources[1].url },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function HowLongToBecomeAPilot() {
  return (
    <Layout
      title="How Long Does It Take to Become a Pilot in India? (2026)"
      description="No regulation sets a duration. What it sets are floors — 200 hours, five papers at 70% — and expiry windows. The real variable is aircraft availability, which DGCA weights at 40% of its ranking."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Timelines, honestly</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            How Long Does It Take to Become a Pilot?
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Every site gives you a number. None of them can tell you where it comes from &mdash; because no rule sets one.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                Rules and figures checked on {LAST_UPDATED}. <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="What is fixed, and what is not"
                items={[
                  'Fixed by rule: minimum ages, 200 flying hours, five papers at 70% each',
                  `Fixed by calendar: ${PARIKSHA.calendar2026.regular.length} regular examination sessions and ${PARIKSHA.calendar2026.olode.length} on-demand sessions a year`,
                  `Expires: paper passes after two and a half years, five for a CPL or ATPL`,
                  `Expires: flying hours older than ${CPL_HOURS.recencyYears} years stop counting`,
                  'Not fixed anywhere: a course duration. No Indian regulation sets one',
                  `The real variable: aircraft availability — DGCA weights it at ${FTO.ranking.parameters[1].weight}% of its own ranking`,
                ]}
              />

              <h2 id="floors" className={H2}>The floors: how little time it can take</h2>
              <p className={P}>
                These are the things a regulation actually fixes. Nothing below can be shortened by paying more, choosing a
                better school or working harder.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">What</th>
                      <th className="text-left p-3 font-montserrat">The floor</th>
                      <th className="text-left p-3 font-montserrat">Where it comes from</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {floors.map((f) => (
                      <tr key={f.what} className="border-t border-gray-200 odd:bg-gray-50">
                        <td className="p-3 font-semibold text-av-blue align-top">{f.what}</td>
                        <td className="p-3">{f.detail}</td>
                        <td className="p-3 text-xs align-top">{f.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="expiry" className={H2}>The ceilings: how long you can stretch it</h2>
              <p className={P}>
                Less well known, and the reason some people pay for the same thing twice. Work you have already done does not
                keep indefinitely.
              </p>
              <div className="space-y-4 mb-6">
                {expiries.map((e) => (
                  <div key={e.what} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{e.what}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{e.detail} {e.extra}</p>
                    <p className="text-av-orange text-xs font-semibold mt-2">{e.rule}</p>
                  </div>
                ))}
              </div>
              <p className={P}>
                {EXAM_RULES.paperValidity.planningNote} That one line has saved people a re-sit and a fee more than once.
              </p>

              <h2 id="real-variable" className={H2}>The variable nobody puts in the estimate</h2>
              <p className={P}>
                Between the floor and the ceiling sits the thing that actually decides your answer, and it is not a regulation
                at all. It is how many aircraft your flying school has, how many students share them, and how many days a year
                the weather lets them fly.
              </p>
              <p className={P}>
                You do not have to take our word for that. DGCA ranks approved flying schools against five weighted parameters,
                and <strong>{FTO.ranking.parameters[1].name} carries {FTO.ranking.parameters[1].weight}%</strong> &mdash; the
                heaviest of the five &mdash; covering aircraft utilisation, the student-to-aircraft ratio and how long students
                actually take to complete their hours. That is the regulator stating in public that throughput is what
                separates one school from another.
              </p>
              <p className={P}>
                So the question worth asking, and the one almost nobody asks on a school visit: <em>how many hours does an
                average student fly here per month, and how many students share each aircraft?</em> A school that answers
                plainly is telling you your timeline. A school that changes the subject is also telling you your timeline.
                How to check the rest of what a school claims is on{' '}
                <Link href="/how-to-choose-an-aviation-academy" className={A}>our page on checking an academy</Link>.
              </p>

              <h2 id="order" className={H2}>The order that wastes the least time</h2>
              <ol className="space-y-3 mb-6">
                {[
                  `Confirm the education gate first. ${EDUCATION.requirement} If you did not take both subjects, the bridge route adds time at the front, and finding that out late is the most expensive ordering mistake there is.`,
                  `Book the Class 2 medical early. It is inexpensive relative to everything after it and it is the one result that can end the plan.`,
                  `Apply for a computer number. No medical certificate needed, no flying school needed, and through DigiLocker it is immediate.`,
                  `Start the written papers at ${inr(PARIKSHA.fees.regularPerPaper)} each — but count backwards from your expected licence application, not forwards from today, so the passes do not expire.`,
                  `Choose the flying school on aircraft availability rather than on the quoted course length. ${RTR.name} and the skill test come at the end.`,
                ].map((t, i) => (
                  <li key={t.slice(0, 30)} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{t}
                  </li>
                ))}
              </ol>
              <p className={P}>
                The stage-by-stage version is on <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>our route guide</Link>,
                and the gates themselves are set out on{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>the CPL eligibility page</Link>.
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
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </article>
          <aside className="lg:col-span-1">
            <div className="sticky top-28"><LeadForm /></div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
