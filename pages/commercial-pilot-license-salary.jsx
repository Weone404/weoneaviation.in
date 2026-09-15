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
  ACADEMY, FDTL, CPL_HOURS, CPL_COST, PARIKSHA, EXAM_RULES, DGCA_PAPERS,
  LICENCES, inr,
} from '../lib/facts';

/*
 * /commercial-pilot-license-salary — rebuilt 2026-09-15.
 *
 * WHAT THIS PAGE USED TO BE. The highest-volume page on the site, 74,120
 * mapped monthly searches, answering "what does a commercial pilot earn" with
 * ₹1.5–3 lakh entry level, ₹6–10 lakh captain and per-country monthly bands
 * for the USA, Australia, the UAE and Singapore. None of it traced to
 * anything. Indian airlines do not publish pilot pay scales; the figures that
 * circulate online originate in each other, and repeating them would be
 * inventing a figure, which this site does not do.
 *
 * WHY THE HONEST VERSION IS A BETTER PAGE, NOT A WORSE ONE. There is exactly
 * one thing about Indian airline pilot pay that is published, and it happens
 * to be the thing that shapes it: a large part of the pay is flying-hour
 * linked, and DGCA caps flying hours by regulation. CAR Section 7 Series 'J'
 * Part III sets 35 hours in 7 days, 100 in 28, 300 in 90 and 1,000 in 365. So
 * the hour-linked component has a hard, checkable ceiling. No competitor
 * salary page carries this, because they are all busy quoting each other's
 * numbers.
 *
 * The page therefore answers the real question — "can I afford this, and what
 * will it give back" — with the side that IS knowable: the cost, which is
 * partly published, and the regulatory ceiling on flying. It says plainly that
 * we will not print an income figure, and why.
 *
 * DO NOT ADD a rupee salary figure to this page without a primary source and
 * the date it was read. "Several sites say X" is not a source. The owner's
 * standing rule also bars any salary claim tied to this academy's graduates.
 *
 * WATCH OUT: CAR Section 7 Series 'J' Part I carries the same four numbers and
 * applies to CABIN CREW. Part III is the flight crew one. See lib/facts.js.
 */

const LAST_UPDATED = '15 September 2026';
const LAST_UPDATED_ISO = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/commercial-pilot-license-salary';

/* What moves pilot pay. Structural, and true without a figure attached. */
const drivers = [
  {
    title: 'Rank',
    detail: 'A captain is paid materially more than a first officer at the same airline. The gap is the single largest step in a pilot’s earnings, and reaching it depends on the airline’s command upgrade criteria, which sit on top of the DGCA minimum rather than replacing it.',
  },
  {
    title: 'Hours flown',
    detail: `A large part of Indian airline pilot pay is flying-hour linked rather than fixed, so it moves with the roster and with how much the airline is flying. It cannot move past the regulatory ceiling: ${FDTL.limits.map((l) => `${l.hours} hours in ${l.period}`).join(', ')}.`,
  },
  {
    title: 'Fleet',
    detail: 'Wide-body operations generally pay more than narrow-body at the same carrier. Which fleet a pilot ends up on is the airline’s allocation, not the pilot’s choice, and it usually follows seniority.',
  },
  {
    title: 'Employment type',
    detail: 'Permanent, fixed-term and contract arrangements differ in what they pay and in what they include. Two pilots on the same aircraft can be on materially different terms.',
  },
  {
    title: 'The hiring cycle',
    detail: 'A licence does not carry a job. The gap between holding a CPL and being employed as a first officer varies with the hiring cycle, and in a slow cycle it is the largest single factor in what a new CPL holder earns, because the answer is nothing.',
  },
];

const peopleAlsoAsk = [
  {
    q: 'What is the salary of a commercial pilot in India?',
    a: 'There is no published answer. Indian airlines do not publish pilot pay scales, pay is negotiated and varies by rank, fleet, seniority, contract type and roster, and no public document exists that a figure could be checked against. Any page giving you an exact monthly number for a named airline is quoting something it cannot show you. What is published is the ceiling on flying hours that the hour-linked part of the pay sits under.',
  },
  {
    q: 'How many hours can an airline pilot fly in a year in India?',
    a: `A maximum of ${FDTL.limits[3].hours} hours of flight time in 365 consecutive days, under ${FDTL.citation}, ${FDTL.limits[3].clause}. The shorter limits are ${FDTL.limits.slice(0, 3).map((l) => `${l.hours} hours in ${l.period}`).join(', ')}. These are ceilings set for fatigue reasons, not targets, and most pilots fly below them.`,
  },
  {
    q: 'Does a captain earn more than a first officer?',
    a: 'Yes, and it is the largest step in the career. The qualification and the responsibility differ: a captain is pilot-in-command. What the gap is in rupees at any given airline is not published.',
  },
  {
    q: 'What does it cost to become a commercial pilot in India?',
    a: `This is the side of the arithmetic that can actually be checked, which is why it is the side to plan against. The one publicly comparable figure is ${CPL_COST.benchmark.school}, whose published course fee is ${CPL_COST.benchmark.feeLabel}. Private flying schools publish little. DGCA's own charges are separate and fixed: ${inr(PARIKSHA.fees.regularPerPaper)} per examination paper, plus the medical.`,
  },
  {
    q: 'Do pilots get paid during training?',
    a: 'No. Training is a cost, not an income. A cadet programme changes who funds it and when it is repaid, not whether it is paid for. Treat any arrangement described as "earn while you train" as a question to ask in writing before signing.',
  },
];

const faqs = [
  { q: 'Why does this page not give a salary figure?', a: 'Because a prospective student cannot verify one. Indian airlines do not publish pilot pay scales. The numbers circulating online are copied between websites and have no primary source behind them, and this site does not print a figure it cannot show you the origin of. An honest blank is worth more than a confident guess.' },
  { q: 'What about the figures this page used to show?', a: 'They were removed on 15 September 2026. The page carried entry-level and captain monthly bands for India and per-country bands for the USA, Australia, the UAE and Singapore. None traced to a primary source, so all of them went.' },
  { q: 'Is pilot pay fixed or variable?', a: `Substantially variable. A large part is linked to hours flown, which is why the regulatory ceiling matters: ${FDTL.limits.map((l) => `${l.hours} hours in ${l.period}`).join(', ')}, under the flight crew Flight Duty Time Limitations. A month with a light roster is a lighter month's pay.` },
  { q: 'What is the minimum weekly rest a pilot gets?', a: `${FDTL.weeklyRest} This was raised from 36 hours in the revision DGCA notified on 8 January 2024, which also redefined night as 0000 to 0600, cut night landings from a maximum of six to two, and capped night flight time at 8 hours. Operators had to comply by 1 June 2024.` },
  { q: 'Does We One Aviation guarantee a salary or a job?', a: ACADEMY.scope },
  { q: 'What should I plan against instead?', a: `The cost, which is partly published, and the requirements, which are entirely published: ${CPL_HOURS.total} hours of flying, ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each, a Class 1 medical, RTR (A), and a minimum age of ${LICENCES.find((l) => l.code === 'CPL').minAge} for the licence. Those are the numbers worth building a plan on.` },
  { q: 'Do overseas airlines pay more?', a: 'Commonly stated, and plausible given currency and tax differences, but we have no published pay scale to show you for any of them either. A comparison also has to account for the cost of living, the tax regime, the contract type, and the licence conversion needed to fly there at all — which is why a monthly figure alone would mislead even if it were sourced.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Commercial Pilot Salary in India: What Is Published and What Is Not',
  description: 'Indian airlines do not publish pilot pay scales. What is published is the ceiling on flying hours the hour-linked part of the pay sits under — 1,000 hours a year under the flight crew FDTL.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Pilot career',
  keywords: 'commercial pilot license salary, cpl salary in india, pilot salary in india, airline pilot salary india, pilot pay scale india, how much do pilots earn in india',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: FDTL.sources.map((c) => ({ '@type': 'CreativeWork', name: c.label, url: c.url })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CPLSalaryPage() {
  return (
    <Layout
      title="Commercial Pilot Salary in India: What Is Published, and What Is Not"
      description="Indian airlines do not publish pilot pay scales. What DGCA does publish is the ceiling on flying hours — 1,000 a year — that the hour-linked part of a pilot's pay sits under."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Pilot pay, honestly</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Commercial Pilot Salary in India
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Nobody publishes a pilot pay scale in India. Here is what is actually published instead &mdash; and why it
            tells you more than the numbers you have been reading.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              <p className="text-xs text-gray-500 mb-5">
                Flight duty limits read on {LAST_UPDATED} against the current CAR and the DGCA notification behind its
                latest revision. <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer
                question="What does a commercial pilot earn in India?"
                answer={`There is no published answer, and any page that gives you one to the lakh is quoting something it cannot show you. Indian airlines do not publish pilot pay scales; pay is negotiated and varies by rank, fleet, seniority, contract type and roster. What IS published is the regulation that governs the hour-linked part of it: under ${FDTL.citation}, a pilot may fly at most ${FDTL.limits[3].hours} hours in a year, ${FDTL.limits[1].hours} in 28 days and ${FDTL.limits[0].hours} in 7 days, with ${FDTL.weeklyRest.charAt(0).toLowerCase()}${FDTL.weeklyRest.slice(1, FDTL.weeklyRest.indexOf('(') - 1)}. Plan against the cost, which is partly published, rather than the income, which is not.`}
              />

              <SummaryBox
                title="What can and cannot be shown"
                items={[
                  'Cannot be shown: any airline pilot pay scale in India. None is published.',
                  `Can be shown: flying is capped at ${FDTL.limits[3].hours} hours in 365 days, ${FDTL.limits[2].hours} in 90, ${FDTL.limits[1].hours} in 28 and ${FDTL.limits[0].hours} in 7`,
                  'Can be shown: minimum weekly rest of 48 continuous hours including two local nights',
                  `Can be shown: the cost side — ${CPL_COST.benchmark.school} publishes ${CPL_COST.benchmark.feeLabel}, and DGCA charges ${inr(PARIKSHA.fees.regularPerPaper)} a paper`,
                  'True without a figure: a captain earns materially more than a first officer',
                  'True without a figure: a licence is not a job, and the wait varies with the hiring cycle',
                ]}
              />

              <h2 id="no-figure" className={H2}>Why there is no number on this page</h2>
              <p className={P}>
                Until 15 September 2026 this page carried monthly bands &mdash; an entry-level range, a captain range, and
                per-country figures for the USA, Australia, the UAE and Singapore. They have been removed, because not one
                of them could be traced to a primary source.
              </p>
              <p className={P}>
                That is not an accident of this page. Indian airlines do not publish pilot pay scales at all. Pay is set in
                individual contracts, it differs by rank, fleet, seniority, employment type and roster, and there is no
                public document a prospective student could check a figure against. The numbers that circulate online
                originate in each other: one site quotes a range, the next quotes the first, and after a few iterations
                everyone is citing everyone and nobody is citing anything.
              </p>
              <p className={P}>
                We are also the wrong people to tell you what you will earn. {ACADEMY.scope} Any earnings figure from us
                would be a claim about someone else&rsquo;s payroll.
              </p>

              <h2 id="ceiling" className={H2}>What is published: the ceiling on flying</h2>
              <p className={P}>
                Here is the useful part, and the part no other salary page will tell you. A large share of an Indian airline
                pilot&rsquo;s pay is linked to hours flown rather than fixed &mdash; which means the hour-linked component has
                a hard ceiling set by regulation, and that ceiling is public. Under {FDTL.citation}, applicable to{' '}
                {FDTL.appliesTo}:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">Period</th>
                      <th className="text-left p-3 font-montserrat">Maximum flight time</th>
                      <th className="text-left p-3 font-montserrat">Clause</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {FDTL.limits.map((l) => (
                      <tr key={l.period} className="border-t border-gray-200 odd:bg-gray-50">
                        <td className="p-3">{l.period}</td>
                        <td className="p-3 font-semibold text-av-blue whitespace-nowrap">{l.hours} hours</td>
                        <td className="p-3 whitespace-nowrap">{l.clause}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Read that {FDTL.limits[3].hours}-hour annual figure carefully. It is a <em>ceiling</em> imposed for fatigue
                reasons, not a target and not a typical year. Most pilots fly below it. But it does put a firm upper bound
                on the variable half of the pay, which is more than any quoted salary range can honestly claim to do.
              </p>
              <p className={P}>{FDTL.weeklyRest}</p>

              <h2 id="rev-2024" className={H2}>What changed in January 2024, and why it matters to pay</h2>
              <p className={P}>
                The current limits come from a revision DGCA notified on 8 January 2024, with operators required to comply
                by 1 June 2024. It tightened the rules in five ways:
              </p>
              <ul className="space-y-2 mb-6">
                {FDTL.rev2024.map((r) => (
                  <li key={r.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{r}
                  </li>
                ))}
              </ul>
              <p className={P}>
                Rest rules are a pay story as much as a safety one: a rule that increases mandatory rest reduces how much
                any one pilot can be rostered, which is exactly the point of it. If you are reading salary figures written
                before June 2024, they describe a rostering regime that no longer applies.
              </p>

              <h2 id="drivers" className={H2}>What actually moves a pilot&rsquo;s pay</h2>
              <p className={P}>
                None of this needs a rupee figure attached to be useful. These are the variables, and they are worth
                understanding before you sign anything.
              </p>
              <div className="space-y-4 mb-6">
                {drivers.map((d) => (
                  <div key={d.title} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{d.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>

              <h2 id="plan" className={H2}>Plan against the cost, not the income</h2>
              <p className={P}>
                The arithmetic that matters before you commit runs the other way round from the one people attempt. The
                income side is unknowable. The cost side is partly published, and it is knowable enough to decide on.
              </p>
              <p className={P}>
                The one publicly comparable training figure is {CPL_COST.benchmark.school}&rsquo;s published{' '}
                {CPL_COST.benchmark.feeLabel}. DGCA&rsquo;s own charges sit on top and are fixed:{' '}
                {inr(PARIKSHA.fees.regularPerPaper)} per examination paper in a regular session,{' '}
                {inr(PARIKSHA.fees.olodePerPaper)} on demand, plus the medical. The full picture, including what a quoted
                fee usually excludes, is on <Link href="/cost-transparency" className={A}>the cost page</Link>.
              </p>
              <p className={P}>
                And the requirements are entirely published: {CPL_HOURS.total} hours of flying, {DGCA_PAPERS.length} written
                papers at {EXAM_RULES.theory.passMark}% each, a Class 1 medical, RTR (A), and a minimum age of{' '}
                {LICENCES.find((l) => l.code === 'CPL').minAge}. Start from{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link>, and if you are
                choosing where to train, <Link href="/how-to-choose-an-aviation-academy" className={A}>how to check an
                aviation academy</Link> covers what you can verify before paying anyone.
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
              <p className={P}>Read on {LAST_UPDATED}. Everything on this page traces to one of these two documents.</p>
              <ul className="space-y-2 mb-8">
                {FDTL.sources.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.label}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <h3 className="font-montserrat text-lg font-bold text-white mb-2">The question behind the question</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Most people asking what a pilot earns are really asking whether the training is worth committing to. That
                  is a conversation about the cost, the timeline and your own circumstances, and it is one we will have
                  straight with you at {ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode} &mdash; phone{' '}
                  {ACADEMY.phone}, or {ACADEMY.email}. We will not put a salary number in front of you, because we do not
                  have one to give.
                </p>
              </div>
            </ScrollReveal>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <LeadForm />
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
