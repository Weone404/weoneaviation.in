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
import { ACADEMY, CPL_HOURS, FTO, EXAM_RULES, MEDICAL_STANDARDS as MED, CPL_COST, PARIKSHA, inr } from '../lib/facts';

/*
 * /cpl-flight-training — new 2026-09-16.
 *
 * WHY IT EXISTS. Keyword 42 on the owner's priority list, "CPL flight training
 * — practical training phase", noted as a rival target. The site had deep blog
 * posts on individual components of the 200 hours — the simulator cap, the
 * 300 NM cross-country, night flying, multi-engine, instrument rating — and no
 * page above them explaining how the 200 hours are actually built. The parts
 * existed with no whole, the same structural gap the cadet pages had.
 *
 * WHY IT IS DEFENSIBLE. Schedule II paragraph 1(e) is precise and almost
 * universally misreported. The components sit INSIDE the 200-hour total; they
 * are not additions to it. Competitor pages routinely present them as a list
 * that sums to more than 200 and leave a reader budgeting for hours they do
 * not need. Stating the containment correctly, with the clause for each row, is
 * worth more than another description of what flight training feels like.
 *
 * The second sourced point: the constraint on this phase is not regulation but
 * aircraft availability, and DGCA says so itself by weighting Operational
 * Aspects at 40% of its FTO ranking.
 *
 * WHAT IS DELIBERATELY NOT HERE. An hourly rate or a phase cost. Untraceable,
 * and removed from every other page in this branch for that reason.
 */

const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/cpl-flight-training';

const deepDives = [
  { label: 'The simulator cap: how much of the instrument time can be flown on the ground', href: '/blogs/cpl-simulator-hours-dgca-rules' },
  { label: 'The 300 nautical mile cross-country flight, condition by condition', href: '/blogs/cpl-cross-country-flight-requirement-india' },
  { label: 'The five hours of night flying, and the ten take-offs and landings inside them', href: '/blogs/cpl-night-flying-hours-requirement-india' },
  { label: 'Instrument Rating: what it is and why CPL holders need one', href: '/blogs/instrument-rating-for-pilots-in-india' },
  { label: 'Multi-engine rating: a class rating, not a type rating', href: '/blogs/multi-engine-rating-for-pilots-in-india' },
  { label: 'Flying Instructor Rating: the route that keeps you flying and earning in India', href: '/blogs/flying-instructor-rating-for-pilots-in-india' },
];

const peopleAlsoAsk = [
  {
    q: 'What does CPL flight training actually consist of?',
    a: `${CPL_HOURS.total} hours as pilot of an aeroplane, flown within the ${CPL_HOURS.recencyYears} years before you apply. The important part, and the part most pages get wrong: the named components sit INSIDE that total rather than adding to it. ${CPL_HOURS.components.map((c) => `${c.hours} hours ${c.label}`).join(', ')}. Add them up and you get far less than ${CPL_HOURS.total}; the balance is general flying. You do not fly ${CPL_HOURS.total} hours and then a further hundred.`,
  },
  {
    q: 'How much of the 200 hours can be done in a simulator?',
    a: `Very little, and this is where quotes mislead. Of the ${CPL_HOURS.components.find((c) => c.label === 'Instrument time').hours} hours of instrument time required inside the total, not more than 5 may be flown on an approved simulator. Everything else must be flown in an actual aeroplane. Simulator-heavy training is a feature of what comes after the licence, not of the licence itself.`,
  },
  {
    q: 'What is the 300 nautical mile flight?',
    a: `A single cross-country flight required inside the ${CPL_HOURS.components.find((c) => c.label === 'Cross-country as PIC').hours} hours of cross-country pilot-in-command time, covering at least 300 nautical miles with full-stop landings at two different aerodromes. It is the flight most students remember, and the conditions attached to it are specific enough to be worth reading before you plan it.`,
  },
  {
    q: 'What decides how long the flying phase takes?',
    a: `Not the regulation. Aircraft availability and the student-to-aircraft ratio at your school, and how many days a year the weather allows flying. DGCA weights ${FTO.ranking.parameters[1].name} at ${FTO.ranking.parameters[1].weight}% of its own ranking of approved flying schools — the heaviest of its five parameters — which is the regulator saying in public that this is what separates one school from another.`,
  },
  {
    q: 'Do I need to finish the DGCA exams before flight training?',
    a: `No, and the two run in parallel at most schools. What you should not do is leave the papers until the end: they can be started before you join anywhere, they need no medical certificate, and ${EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.planningNote.slice(1)}`,
  },
];

const faqs = [
  { q: 'Is the 200 hours a total or a starting point?', a: `A total, and the components are contained within it. ${CPL_HOURS.clause} of Schedule II sets it out. A page that lists the components as additions to 200 has misread the clause, and the difference is tens of hours of flying you would be budgeting for unnecessarily.` },
  { q: 'What is the recency requirement?', a: `The hours must fall within the ${CPL_HOURS.recencyYears} years before you apply, and ${CPL_HOURS.components[0].note}. A long break does not merely slow you down; it can delete hours you have already paid for.` },
  { q: 'What medical do I need for the flying phase?', a: `A Class 2 medical to begin flight training, and a Class 1 for the Commercial Pilot Licence itself. ${MED.classOrder.advice}` },
  { q: 'Where does flight training happen in India?', a: `At one of DGCA's ${FTO.count} approved Flying Training Organisations, across ${FTO.statesWithBases.length} states as on ${FTO.listAsOf}. None of the approved flying bases is in Delhi or the NCR, so a Delhi student travels for this phase.` },
  { q: 'What does the flying phase cost?', a: `It is the single largest line in any pilot training budget and no Indian school publishes a rate we could trace. The one publicly comparable figure in this market is ${CPL_COST.benchmark.school}'s published course fee of ${CPL_COST.benchmark.feeLabel}, which includes the ${CPL_HOURS.total} hours. Compare written quotes line by line and ask specifically how hours beyond the syllabus minimum are billed.` },
  { q: 'Does We One Aviation provide the flying?', a: ACADEMY.scope },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CPL Flight Training in India: How the 200 Hours Are Actually Built',
  description: 'The named components of a CPL sit inside the 200-hour total, not on top of it. Each requirement with its Schedule II clause, the simulator cap, and what really decides how long the flying phase takes.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'CPL flight training',
  keywords: 'cpl flight training, cpl flying hours, 200 hours cpl, commercial pilot flight training india, cpl practical training, flying training cpl',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II, Section J — Commercial Pilot Licence (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
    { '@type': 'CreativeWork', name: FTO.sources[1].label, url: FTO.sources[1].url },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CplFlightTraining() {
  return (
    <Layout
      title="CPL Flight Training: How the 200 Hours Are Actually Built (2026)"
      description="The named components sit inside the 200-hour total, not on top of it. Every requirement with its Schedule II clause, the simulator cap, and what really decides the timeline."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">The flying phase</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            CPL Flight Training
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Two hundred hours, and the components sit inside that total &mdash; not on top of it. Most pages get this wrong.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                Schedule II and DGCA figures checked on {LAST_UPDATED}. <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="The flying phase, in one view"
                items={[
                  `${CPL_HOURS.total} hours as pilot of an aeroplane — a TOTAL, not a base`,
                  ...CPL_HOURS.components.map((c) => `Inside that total: ${c.hours} hours ${c.label} (${c.clause})`),
                  `Flown within the ${CPL_HOURS.recencyYears} years before you apply`,
                  `Not more than 5 of the instrument hours on an approved simulator`,
                  `Happens at one of DGCA's ${FTO.count} approved organisations — none of them based in Delhi or the NCR`,
                ]}
              />

              <h2 id="inside" className={H2}>The clause most pages misread</h2>
              <p className={P}>
                Schedule II, Section J, {CPL_HOURS.clause} sets {CPL_HOURS.total} hours as the requirement for a Commercial
                Pilot Licence, and then names what must be included within it. <strong>Within</strong> is the operative word.
                The rows below are carved out of the {CPL_HOURS.total}; they are not added to it.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">Inside the {CPL_HOURS.total} hours</th>
                      <th className="text-left p-3 font-montserrat">Hours</th>
                      <th className="text-left p-3 font-montserrat">Clause</th>
                      <th className="text-left p-3 font-montserrat">The condition attached</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {CPL_HOURS.components.map((c) => (
                      <tr key={c.label} className="border-t border-gray-200 odd:bg-gray-50">
                        <td className="p-3 font-semibold text-av-blue align-top">{c.label}</td>
                        <td className="p-3 whitespace-nowrap">{c.hours}</td>
                        <td className="p-3 text-xs whitespace-nowrap align-top">{c.clause}</td>
                        <td className="p-3">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Add the hours column up and it comes to well under {CPL_HOURS.total}. The balance is general flying. If a page
                or a counsellor presents these as additions, they are describing a much larger and much more expensive course
                than the rule requires &mdash; and the difference is real money, because this phase is billed by the hour.
              </p>

              <h2 id="simulator" className={H2}>How little of it can be a simulator</h2>
              <p className={P}>
                Of the {CPL_HOURS.components.find((c) => c.label === 'Instrument time').hours} hours of instrument time inside
                the total, <strong>not more than 5 may be flown on an approved simulator</strong>. Everything else is an actual
                aeroplane. This surprises people who have read about airline training, where simulators dominate &mdash; but
                that is what happens <em>after</em> the licence, on type. The full treatment is in{' '}
                <Link href="/blogs/cpl-simulator-hours-dgca-rules" className={A}>our page on the simulator cap</Link>.
              </p>

              <h2 id="timeline" className={H2}>What actually decides how long this phase takes</h2>
              <p className={P}>
                Not the regulation, which sets a floor and nothing more. It is aircraft availability, the number of students
                sharing each aircraft, and how many days a year the weather permits flying.
              </p>
              <p className={P}>
                DGCA says as much itself: in its ranking of approved flying schools,{' '}
                <strong>{FTO.ranking.parameters[1].name} carries {FTO.ranking.parameters[1].weight}%</strong>, the heaviest of
                five parameters, covering aircraft utilisation, student-to-aircraft ratio and how long students actually take
                to complete their hours. Before you choose a school, read{' '}
                <Link href="/how-to-choose-an-aviation-academy" className={A}>how to check one</Link>, and for the whole
                timeline question see{' '}
                <Link href="/how-long-does-it-take-to-become-a-pilot" className={A}>how long it takes</Link>.
              </p>

              <h2 id="deep" className={H2}>Each requirement in detail</h2>
              <ul className="space-y-2 mb-6">
                {deepDives.map((d) => (
                  <li key={d.href} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <Link href={d.href} className={A}>{d.label}</Link>
                  </li>
                ))}
              </ul>
              <p className={P}>
                Before any of this: the eligibility gates are on{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>the CPL eligibility page</Link>, the written
                papers on <Link href="/dgca-pariksha" className={A}>the Pariksha page</Link> at{' '}
                {inr(PARIKSHA.fees.regularPerPaper)} each, and the medical on{' '}
                <Link href="/dgca-class-2-class-1-medical" className={A}>the medical page</Link>. If you are weighing training
                overseas for this phase, <Link href="/pilot-training-abroad" className={A}>read this first</Link>.
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
