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
  ACADEMY, FTO, CPL_HOURS, CPL_COST, PARIKSHA, EXAM_RULES, DGCA_PAPERS, inr,
} from '../lib/facts';

/*
 * /pilot-training-abroad — new 2026-09-16.
 *
 * WHY IT EXISTS. Keyword 43 on the owner's priority list, noted there as
 * matching this academy's actual strength. Five country pages exist under
 * /flying-school/ with no parent above them, so they competed with each other
 * for the generic term exactly as the six airline cadet pages did before the
 * cadet hub was built.
 *
 * WHY THIS VERSION IS DEFENSIBLE. Every page on this subject compares cost and
 * weather. The decision-relevant fact that almost none of them lead with is
 * that a licence issued by another country's regulator is not an Indian
 * licence. If you intend to fly commercially in India, conversion is a step
 * with its own time and cost, and it sits outside every training quote you will
 * be shown. That single fact reorders the comparison.
 *
 * The second honest half: the reason people go abroad is usually throughput,
 * not quality — and throughput is measurable in India too. DGCA weights
 * aircraft utilisation and student-to-aircraft ratio at 40% of its own FTO
 * ranking, so a reader can check whether an Indian school actually has the
 * problem they are trying to escape before buying a plane ticket.
 *
 * WHAT IS DELIBERATELY NOT HERE. Country-by-country fee figures. They were
 * removed from /pilot-training-in-india in this branch for being untraceable,
 * and reintroducing them here would undo that. No conversion fee or timeline
 * either: we could not source one, and inventing it would be the exact failure
 * this page is written to correct.
 */

const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/pilot-training-abroad';

const destinations = [
  { country: 'United States', href: '/flying-school/usa', regulator: 'FAA' },
  { country: 'Australia', href: '/flying-school/australia', regulator: 'CASA' },
  { country: 'Canada', href: '/flying-school/canada', regulator: 'Transport Canada' },
  { country: 'South Africa', href: '/flying-school/south-africa', regulator: 'SACAA' },
  { country: 'India, for comparison', href: '/flying-school/india', regulator: 'DGCA' },
];

const unchanged = [
  `The written papers. ${DGCA_PAPERS.length} DGCA papers at ${EXAM_RULES.theory.passMark}% each are required for an Indian licence whether you fly in Arizona or in Gondia. They are sat on the DGCA Pariksha portal, from anywhere, against a computer number.`,
  `The flying hours. ${CPL_HOURS.total} hours as pilot of an aeroplane, flown within the ${CPL_HOURS.recencyYears} years before you apply. Training overseas does not reduce the figure.`,
  'The medical. An Indian licence needs a DGCA medical from a DGCA-approved examiner, in addition to whatever medical the training country required.',
  'RTR (A), examined separately in India under its own rules.',
  'The licence application itself, made to DGCA through eGCA.',
];

const beforeYouGo = [
  { q: 'What exactly does conversion involve for this licence, and who pays for it?', why: 'Ask the school, in writing. A quote that ends at the foreign licence has stopped one step short of what you actually need.' },
  { q: 'How many aircraft, and how many students per aircraft?', why: `This is usually the real reason to go abroad, so test it. DGCA weights ${FTO.ranking.parameters[1].name} at ${FTO.ranking.parameters[1].weight}% of its own ranking of Indian schools — the single heaviest parameter — so you can check whether the Indian option you are rejecting actually has the problem you think it has.` },
  { q: 'What is the visa, and what happens to my training if it lapses?', why: 'A student visa has conditions and an expiry. Training does not pause politely around it.' },
  { q: 'What is excluded from the fee?', why: 'Accommodation, food, ground transport, examination and medical charges, and the conversion. A headline figure that excludes five of those is not comparable to an Indian one that includes two.' },
  { q: 'What happens if I stop partway, and what is refundable?', why: 'Get it in writing before any money crosses a border, because recovering it afterwards is a different problem entirely.' },
  { q: 'Which currency is the fee fixed in, and who carries the exchange risk?', why: 'A rupee estimate for a dollar-denominated course is an estimate of today only.' },
];

const peopleAlsoAsk = [
  {
    q: 'Is it better to do pilot training abroad or in India?',
    a: `They differ structurally rather than in quality, and the difference that matters most is rarely the one people compare. Train in India and DGCA issues the licence directly, so there is no conversion step. Train abroad and the licence is issued by that country's regulator — FAA, CASA, Transport Canada, SACAA — and has to be converted before you can fly commercially in India, which costs time and money that sits outside every training quote. Against that, larger fleets and better year-round weather overseas often mean hours accumulate faster, and throughput is usually the real reason people go.`,
  },
  {
    q: 'Do I still need to clear DGCA exams if I train abroad?',
    a: `Yes, for an Indian licence. The ${DGCA_PAPERS.length} DGCA written papers at ${EXAM_RULES.theory.passMark}% each are a requirement of the Indian licence, not of the training, and they are sat on DGCA's own portal from anywhere against a computer number. Many students clear them in India before they leave, which is the cheapest use of the waiting time.`,
  },
  {
    q: 'Does training abroad reduce the 200 hours?',
    a: `No. ${CPL_HOURS.total} hours is a requirement of the Indian licence and no jurisdiction changes it. What can change is how quickly you fly them.`,
  },
  {
    q: 'Which country is cheapest for pilot training?',
    a: `We do not publish a country cost ranking, and you should be sceptical of anyone who does. Private flying schools publish very little, currency moves, and the figures circulating online cannot be traced to a document. The one publicly comparable price anywhere in this market is ${CPL_COST.benchmark.school}, a government academy in India, which publishes ${CPL_COST.benchmark.feeLabel}. Compare written quotes line by line instead, and put the conversion in the total.`,
  },
  {
    q: 'Is a foreign pilot licence valid in India?',
    a: 'Not as it stands for commercial flying in India. The licence is issued by the regulator of the country you trained in; an Indian commercial licence is issued by DGCA. Converting between them is a defined step, and it belongs in your plan and your budget from the beginning rather than being discovered at the end.',
  },
];

const faqs = [
  { q: 'What is the single biggest thing people miss about training abroad?', a: 'That the licence they finish with is not the licence they need. Conversion to a DGCA licence is a separate step with its own time and cost, and it sits outside the training fee they were quoted.' },
  { q: 'Can I do the DGCA papers before going abroad?', a: `Yes, and it is usually the best use of the time before departure. The computer number application needs no medical certificate and no flying school. Watch the expiry, though: ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl}` },
  { q: 'Why do people train abroad at all?', a: `Usually throughput — larger fleets and more flyable days, so hours accumulate faster. That is a real advantage. It is also testable in India before you commit, because DGCA publishes a ranking of approved flying schools in which ${FTO.ranking.parameters[1].name} carries ${FTO.ranking.parameters[1].weight}%.` },
  { q: 'How many DGCA-approved flying schools are there in India?', a: `${FTO.count} on DGCA's published list as on ${FTO.listAsOf}, across ${FTO.statesWithBases.length} states. Worth reading before concluding that abroad is the only option.` },
  { q: 'What does the DGCA examination cost, wherever I train?', a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} on demand, paid to the government through Bharatkosh. That is DGCA's fee, not a school's.` },
  { q: 'Does We One Aviation send students abroad?', a: ACADEMY.scope },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training Abroad: What the Quote Does Not Include',
  description: 'A licence issued by the FAA, CASA, Transport Canada or SACAA is not an Indian licence. Conversion is a step outside every training quote. What stays the same wherever you train, and the six questions to ask before paying.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'Pilot training abroad',
  keywords: 'pilot training abroad, pilot training outside india, cpl abroad, flying school abroad, pilot training in usa for indian students, licence conversion dgca',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
    { '@type': 'CreativeWork', name: FTO.sources[1].label, url: FTO.sources[1].url },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function PilotTrainingAbroad() {
  return (
    <Layout
      title="Pilot Training Abroad: What the Quote Does Not Include (2026)"
      description="A foreign licence is not an Indian licence — conversion sits outside every training quote. What stays the same wherever you train, and the six questions to ask before paying."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Training outside India</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Pilot Training Abroad
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            The comparison everyone makes is cost and weather. The one that decides it is the licence you finish holding.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                DGCA figures checked on {LAST_UPDATED}. <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="Before you compare anything"
                items={[
                  'A foreign licence is not an Indian licence. Conversion is a separate step with its own time and cost',
                  'That cost sits outside every training quote you will be shown',
                  `The ${DGCA_PAPERS.length} DGCA papers at ${EXAM_RULES.theory.passMark}% each are still required, and can be cleared in India first`,
                  `The ${CPL_HOURS.total} hours do not reduce. No jurisdiction changes an Indian licence requirement`,
                  `The usual real reason to go is throughput — and India's version is measurable: DGCA weights it at ${FTO.ranking.parameters[1].weight}% of its own ranking`,
                  `${FTO.count} DGCA-approved flying schools exist in India across ${FTO.statesWithBases.length} states`,
                ]}
              />

              <h2 id="licence" className={H2}>The step that is missing from the quote</h2>
              <p className={P}>
                Train in the United States and the FAA issues your licence. Train in Australia and it is CASA, in Canada
                Transport Canada, in South Africa the SACAA. None of those is a DGCA licence, and a DGCA licence is what
                permits you to fly commercially in India.
              </p>
              <p className={P}>
                Conversion is therefore not an optional extra or a formality &mdash; it is the last required step of the plan,
                and it is almost never inside the fee you are quoted. We are not going to print a conversion cost or a
                timeline here, because we could not trace one to a published document, and inventing a figure is precisely
                the failure this page exists to correct. What we will tell you is to <strong>ask the school what conversion
                involves for this specific licence, and get the answer in writing</strong> before you compare its price to an
                Indian one.
              </p>

              <h2 id="unchanged" className={H2}>What training abroad does not change</h2>
              <p className={P}>
                If the destination is an Indian commercial licence, these hold wherever the flying happens.
              </p>
              <ul className="space-y-2 mb-6">
                {unchanged.map((u) => (
                  <li key={u.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{u}
                  </li>
                ))}
              </ul>
              <p className={P}>
                The practical consequence is a good one: the written papers can be cleared in India before you leave, at{' '}
                {inr(PARIKSHA.fees.regularPerPaper)} a paper, which is the cheapest possible use of the months before
                departure. Mind the expiry &mdash; {EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}
                {EXAM_RULES.paperValidity.planningNote.slice(1)} How the timeline actually works is on{' '}
                <Link href="/how-long-does-it-take-to-become-a-pilot" className={A}>our page on how long it takes</Link>.
              </p>

              <h2 id="throughput" className={H2}>Test the reason you are going</h2>
              <p className={P}>
                Ask most people why they are training overseas and the honest answer is throughput: more aircraft, more
                flyable days, hours that accumulate instead of stalling. That is a real advantage and worth paying for. It is
                also testable before you buy a ticket.
              </p>
              <p className={P}>
                DGCA ranks approved Indian flying schools against five weighted parameters, and{' '}
                <strong>{FTO.ranking.parameters[1].name} carries {FTO.ranking.parameters[1].weight}%</strong> &mdash; the
                heaviest of the five &mdash; covering aircraft utilisation and the student-to-aircraft ratio. So you can check
                whether the Indian schools you are rejecting actually have the problem you are trying to escape, using the
                regulator's own assessment rather than a forum post. How to read that ranking is on{' '}
                <Link href="/how-to-choose-an-aviation-academy" className={A}>our page on checking an academy</Link>.
              </p>

              <h2 id="ask" className={H2}>Six questions before any money crosses a border</h2>
              <ol className="space-y-4 mb-6">
                {beforeYouGo.map((b, i) => (
                  <li key={b.q} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-av-blue text-sm mb-1">{b.q}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{b.why}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 id="destinations" className={H2}>Destination pages</h2>
              <ul className="space-y-2 mb-6">
                {destinations.map((d) => (
                  <li key={d.href} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <span>
                      <Link href={d.href} className={A}>{d.country}</Link> &mdash; licence issued by {d.regulator}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={P}>
                On cost, and why no country ranking appears here: private schools publish very little and currency moves, so
                the figures circulating online cannot be traced. The one publicly comparable price in this market is{' '}
                {CPL_COST.benchmark.school}&rsquo;s published {CPL_COST.benchmark.feeLabel}. Our{' '}
                <Link href="/cost-transparency" className={A}>cost page</Link> sets out what can be shown and the questions
                that make two quotes comparable.
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
