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
  ACADEMY, FTO, PARIKSHA, EXAM_RULES, DGCA_PAPERS, papersSummary, RTR,
  LICENCES, EDUCATION, CPL_HOURS, MEDICAL_STANDARDS as MED, CPL_COST, inr,
} from '../lib/facts';

/*
 * /how-to-choose-an-aviation-academy — new 2026-09-15.
 *
 * WHY IT EXISTS. "Best aviation academy near me" carries 16,630 mapped monthly
 * searches and is the largest remaining term on the owner's keyword list with
 * no honest home. The legacy database post at /blogs/69f1a52df3ae4e86333eac32
 * ("Best Aviation Academy Near Me - Start Your Career in Aviation Today")
 * answered it the way every competitor does: by nominating itself. That page
 * 301s here in the same commit.
 *
 * WHY THIS ANSWER IS DEFENSIBLE AND THEIRS IS NOT. There is a public answer to
 * "is this academy any good", and almost nobody points readers at it. DGCA
 * publishes the list of Flying Training Organisations it has approved, with
 * approval numbers, validity dates and fleet registrations, and since
 * September 2025 it also publishes a ranking of them against five weighted
 * parameters, refreshed twice a year. A reader can check both in ten minutes.
 *
 * THE UNCOMFORTABLE HALF, WHICH IS THE POINT. That list covers organisations
 * that conduct flying training. A classroom ground school is not on it —
 * including this one. Saying so out loud is what makes the page trustworthy,
 * and it is the only version of this page We One Aviation can publish without
 * claiming something it cannot substantiate. It costs nothing real: a reader
 * who wants a flying school was never going to buy ground classes, and a
 * reader who needs ground classes now knows why to believe the rest.
 *
 * WHAT IS DELIBERATELY NOT HERE.
 *   - The names and order of the ranked FTOs. The ranking is republished twice
 *     a year; printing the order guarantees the page misleads someone later.
 *   - Any "top 10 academies" list. We do not have a defensible basis for one,
 *     and the reader already has DGCA's.
 *   - Fees, batch size, timings, pass rates, placement. Owner's standing rule.
 *
 * SOURCES are in lib/facts.js under FTO, with the date each was read.
 */

const LAST_UPDATED = '15 September 2026';
const LAST_UPDATED_ISO = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/how-to-choose-an-aviation-academy';

const totalCentres = MED.centres.airForce.length + MED.centres.civil.length;

/* The requirements that do not move whichever academy a student picks. */
const unchanged = [
  {
    what: 'The written papers',
    detail: `${DGCA_PAPERS.length} papers — ${papersSummary()} — each needing ${EXAM_RULES.theory.passMark}% on its own rather than an aggregate, under ${EXAM_RULES.car.citation}, ${EXAM_RULES.theory.clause}. ${RTR.note}`,
  },
  {
    what: 'The examination itself',
    detail: `Booked on DGCA's own Pariksha portal against a computer number, at ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} in an on-demand one, paid to the government. No academy sets, marks or influences it.`,
  },
  {
    what: 'The flying hours',
    detail: `${CPL_HOURS.total} hours as pilot of an aeroplane for a Commercial Pilot Licence, flown within the ${CPL_HOURS.recencyYears} years before you apply. An academy cannot shorten this and neither can a flying school.`,
  },
  {
    what: 'The medical',
    detail: `A DGCA medical at one of the ${totalCentres} approved centres on DGCA's own list. Class 2 to begin, Class 1 for a Commercial Pilot Licence. The centre is approved by DGCA, not chosen by your academy.`,
  },
  {
    what: 'The education gate',
    detail: `${EDUCATION.requirement} ${EDUCATION.altRoute}`,
  },
  {
    what: 'The minimum ages',
    detail: LICENCES.map((l) => `${l.code} ${l.minAge}`).join(', ') + ' — set by the Aircraft Rules, 1937, Schedule II, and not negotiable anywhere.',
  },
];

/* Questions whose answers can be checked against a document, not a brochure. */
const askThese = [
  {
    q: 'Which list are you on, and what is your approval number?',
    why: 'A flying school has a DGCA approval number and validity dates, both printed on DGCA’s published list. A ground school does not. Either answer is fine; an evasive one is not.',
  },
  {
    q: 'Where is your flying base, and is it on that list?',
    why: 'The list names every base an organisation is approved to fly from. A base that is not on it is not approved for your training, whatever the brochure shows.',
  },
  {
    q: 'What rank and category did you get in the latest DGCA ranking?',
    why: `DGCA ranked ${FTO.ranking.ranked} organisations in the ${FTO.ranking.latestEdition} edition. An unranked school is not automatically bad — ${FTO.ranking.exclusion.charAt(0).toLowerCase()}${FTO.ranking.exclusion.slice(1)} — but it should be able to tell you which of those two it is.`,
  },
  {
    q: 'How many aircraft do you have, and how many are flying today?',
    why: 'The fleet is on DGCA’s list by registration. Utilisation and student-to-aircraft ratio are inside the 40% Operational Aspects weight in the ranking, because they are what decides whether your 200 hours take eighteen months or four years.',
  },
  {
    q: 'Who pays for the DGCA examination fees and the medical?',
    why: `Those are government fees — ${inr(PARIKSHA.fees.regularPerPaper)} a paper and the medical charge at an approved centre. If a quote is silent on them, it is incomplete rather than cheap.`,
  },
  {
    q: 'What happens to my money if I stop after the ground papers?',
    why: 'Ask for it in writing before you pay anything. This single question separates the institutions that will answer plainly from the ones that will not.',
  },
  {
    q: 'What exactly are you promising about a job?',
    why: 'No academy and no flying school employs airline pilots. Anything phrased as a guaranteed job is a promise about somebody else’s hiring decision.',
  },
];

/* Claims that cannot be true, stated plainly so a reader can spot them. */
const redFlags = [
  'A guaranteed airline job, or a guaranteed interview presented as a job. Hiring is the airline’s decision and nobody else can commit it.',
  'A promised pass percentage in the DGCA papers. The examination is DGCA’s and the paper is marked by DGCA.',
  'A claim that flying hours can be reduced or waived. The hours are in the Aircraft Rules; an academy cannot amend them.',
  'A licence "in six months" with no explanation of how the flying fits. Ask how many aircraft, how many students and how many flyable days.',
  'A classroom coaching institute describing itself as DGCA approved without naming a list you can look up.',
  'A fee quote that does not separate the government fees from the institution’s own.',
];

const peopleAlsoAsk = [
  {
    q: 'How do I find the best aviation academy near me?',
    a: `Start by deciding which of two different things you are looking for, because they are checked in different ways. If you need flying hours, you need a Flying Training Organisation, and DGCA publishes the list of approved ones — ${FTO.count} as on ${FTO.listAsOf} — plus a ranking of them, refreshed ${FTO.ranking.frequency}. If you need the ${DGCA_PAPERS.length} written papers cleared, you need a ground school, and no equivalent public list exists, so you check it by asking questions whose answers can be verified against a document.`,
  },
  {
    q: 'Is there a DGCA approved flying school in Delhi?',
    a: `Not on DGCA's list as read on ${LAST_UPDATED}. No approved flying base appears in Delhi or the NCR — not Delhi itself, and not ${FTO.noBaseIn.slice(1).join(', ')}. The approved bases sit in states including ${FTO.statesWithBases.slice(0, 6).join(', ')}. A Delhi student can do the papers, the computer number and the medical in the city, and travels for the flying.`,
  },
  {
    q: 'What does "DGCA approved" actually mean?',
    a: FTO.groundSchoolNote,
  },
  {
    q: 'Does a better academy make the DGCA exam easier?',
    a: `No. Every paper is set and marked by DGCA and needs ${EXAM_RULES.theory.passMark}% on its own. What teaching changes is how prepared you are when you sit it, and how many attempts that takes. What it cannot change is the threshold.`,
  },
  {
    q: 'How is the DGCA FTO ranking calculated?',
    a: `Against five parameters with published weights: ${FTO.ranking.parameters.map((p) => `${p.name} ${p.weight}%`).join(', ')}. It is published ${FTO.ranking.frequency}; the ${FTO.ranking.latestEdition} edition ranked ${FTO.ranking.ranked} organisations in three categories.`,
  },
];

const faqs = [
  { q: 'How many DGCA approved flying training organisations are there in India?', a: `${FTO.count} on DGCA's published list as on ${FTO.listAsOf}. The list is republished, so check it rather than any page quoting it — including this one. It names each organisation's approval number, validity dates, flying bases and fleet.` },
  { q: 'What can I check on DGCA’s list myself?', a: `${FTO.listColumns.join('; ')}. All of it is public and none of it depends on anybody's marketing.` },
  { q: 'Why is no flying school based in Delhi?', a: `DGCA's list shows approved flying bases across ${FTO.statesWithBases.length} states, and none of them in Delhi or the NCR. Delhi's airspace and airport traffic make a training base impractical. The practical consequence for a Delhi student is that ground school, computer number and medical happen locally and the flying does not.` },
  { q: 'Is an unranked flying school a bad one?', a: `Not necessarily. ${FTO.ranking.exclusion} A newly approved school can be perfectly sound; what matters is that it can tell you which reason applies to it.` },
  { q: 'What does an aviation academy cost, and what is a fair comparison?', a: `The one publicly comparable benchmark is ${CPL_COST.benchmark.school}, whose published figure is ${CPL_COST.benchmark.feeLabel}. Private schools publish little and figures vary widely, so treat any single number you see online as unverified. Compare quotes item by item, and keep the government fees separate: ${inr(PARIKSHA.fees.regularPerPaper)} per examination paper, plus the medical.` },
  { q: 'Does We One Aviation appear on the DGCA list?', a: `No, and it would be dishonest to imply otherwise. ${FTO.groundSchoolNote.split('—')[0].trim()}. ${ACADEMY.scope}` },
  { q: 'Can I judge an academy by its results claims?', a: 'You cannot verify them, which is the problem. A pass rate, a placement percentage and a salary figure are all unauditable by a prospective student. Requirements you can check against a published document are worth more than numbers you cannot.' },
  { q: 'What should I bring to a first meeting with any academy?', a: 'Your Class 12 marksheet, any quote you already have in writing, and the seven questions above. The useful meeting is the one where you ask; the unhelpful one is where you listen.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aviation Academy Near Me: How to Check One Before You Pay',
  description: 'DGCA publishes the list of approved flying training organisations and a ranking of them against five weighted parameters. How to use both, what they do not cover, and the questions to ask a ground school instead.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Choosing an aviation academy',
  keywords: 'best aviation academy near me, aviation academy near me, dgca approved flying school, best aviation academy in india, how to choose an aviation academy, fto ranking dgca, aviation academy in delhi',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: FTO.sources.map((c) => ({ '@type': 'CreativeWork', name: c.label, url: c.url })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const H3 = 'font-montserrat text-lg font-bold text-av-blue mb-2 mt-6';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function HowToChooseAnAviationAcademy() {
  return (
    <Layout
      title="Aviation Academy Near Me: How to Check One Before You Pay (2026)"
      description="DGCA publishes an approved flying school list and a twice-yearly ranking. How to read both, why no approved base is in Delhi, and the questions to ask a ground school instead."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Choosing where to train</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Aviation Academy Near Me: How to Check One Before You Pay
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Every academy says it is the best one. DGCA publishes something you can actually check — and this page tells you
            where we are not on it.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              <p className="text-xs text-gray-500 mb-5">
                DGCA&rsquo;s approved-organisation list and ranking read on {LAST_UPDATED}. Both are republished; check them
                yourself rather than trusting any page that quotes them, this one included.{' '}
                <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer
                question="How do you tell whether an aviation academy near you is worth the money?"
                answer={`Decide first which of two different things you need, because they are verified differently. For flying hours you need a Flying Training Organisation — DGCA publishes the approved list (${FTO.count} as on ${FTO.listAsOf}, with approval numbers, validity dates, bases and fleet registrations) and a ranking of them against five weighted parameters, refreshed ${FTO.ranking.frequency}. For the ${DGCA_PAPERS.length} written papers you need a ground school, and there is no equivalent public list — including for us — so you check one by asking questions whose answers can be held against a document. Everything DGCA requires of you stays the same whichever you choose.`}
              />

              <SummaryBox
                title="What is actually checkable"
                items={[
                  `DGCA's approved flying training organisation list: ${FTO.count} organisations as on ${FTO.listAsOf}`,
                  `Each entry shows approval number, validity dates, every flying base and the fleet by registration`,
                  `DGCA's FTO ranking: ${FTO.ranking.ranked} organisations in the ${FTO.ranking.latestEdition} edition, published ${FTO.ranking.frequency}`,
                  `Ranking weights: ${FTO.ranking.parameters.map((p) => `${p.name} ${p.weight}%`).join(', ')}`,
                  `No approved flying base in Delhi or the NCR — a Delhi student travels for the hours`,
                  `Ground schools are on no such list, ours included — ask the seven questions instead`,
                ]}
              />

              <h2 id="two-things" className={H2}>&ldquo;Aviation academy&rdquo; means two different things</h2>
              <p className={P}>
                This is where most of the confusion, and most of the wasted money, starts. The phrase covers two kinds of
                institution that do different work, cost different amounts and are checked in completely different ways.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">&nbsp;</th>
                      <th className="text-left p-3 font-montserrat">Flying Training Organisation</th>
                      <th className="text-left p-3 font-montserrat">Ground school</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold text-av-blue">What it does</td>
                      <td className="p-3">Flies the hours the licence requires, in its own aircraft</td>
                      <td className="p-3">Teaches the {DGCA_PAPERS.length} written papers for the DGCA examination</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-av-blue">On a DGCA list?</td>
                      <td className="p-3">Yes — named, with approval number and validity dates</td>
                      <td className="p-3">No public list exists, ours included</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold text-av-blue">Ranked by DGCA?</td>
                      <td className="p-3">Yes, {FTO.ranking.frequency}</td>
                      <td className="p-3">No</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="p-3 font-semibold text-av-blue">Where the money goes</td>
                      <td className="p-3">The overwhelming majority of the cost of a licence</td>
                      <td className="p-3">A small fraction of it</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="p-3 font-semibold text-av-blue">How you check it</td>
                      <td className="p-3">Against DGCA&rsquo;s published documents</td>
                      <td className="p-3">By asking questions and reading the written answers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Being exact about ourselves, because the rest of this page is worth nothing if we are not:{' '}
                {ACADEMY.scope}
              </p>

              <h2 id="fto-list" className={H2}>What DGCA publishes about flying schools</h2>
              <p className={P}>
                DGCA maintains a list of the flying training organisations it has approved &mdash; {FTO.count} of them as on{' '}
                {FTO.listAsOf}. It is not a marketing document and it is not filtered. For every organisation it shows:
              </p>
              <ul className="space-y-2 mb-6">
                {FTO.listColumns.map((c) => (
                  <li key={c} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{c}
                  </li>
                ))}
              </ul>
              <p className={P}>
                Two of those columns do more work than the rest. <strong>Validity dates</strong> tell you whether an approval is
                current, not merely whether it once existed. <strong>Fleet by registration</strong> lets you count the aircraft
                rather than accept a number from a brochure &mdash; and the aircraft count, set against the number of students
                enrolled, is what decides whether your {CPL_HOURS.total} hours take eighteen months or four years.
              </p>

              <h2 id="ranking" className={H2}>The ranking, and how to read it honestly</h2>
              <p className={P}>
                Since {FTO.ranking.notice.split('dated ')[1]}, DGCA has also ranked approved flying schools rather than only
                listing them. The ranking is published {FTO.ranking.frequency}; the {FTO.ranking.latestEdition} edition was
                released on {FTO.ranking.latestReleased} and ranked {FTO.ranking.ranked} organisations across{' '}
                {FTO.ranking.categories.map((c) => `${c.label} (${c.count})`).join(', ')}.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">Parameter</th>
                      <th className="text-left p-3 font-montserrat">Weight</th>
                      <th className="text-left p-3 font-montserrat">What it is really measuring</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {[
                      ['Operational Aspects', 40, 'Aircraft utilisation, student-to-aircraft ratio and how long students actually take to finish their hours'],
                      ['FTO Performance', 20, 'Throughput — whether the school completes what it enrols'],
                      ['Safety Standards', 20, 'Accident and incident record, and safety observations'],
                      ['Compliance Standards', 10, 'Whether the organisation keeps to what its approval requires'],
                      ['Assistant to Students', 10, 'Grievance resolution and assistance to students'],
                    ].map(([name, weight, meaning]) => (
                      <tr key={name} className="border-t border-gray-200 odd:bg-gray-50">
                        <td className="p-3 font-semibold text-av-blue">{name}</td>
                        <td className="p-3 whitespace-nowrap">{weight}%</td>
                        <td className="p-3">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Notice what carries the most weight. Forty per cent sits on operational aspects &mdash; how many aircraft are
                flying, how many students share them, how long the hours take. That is the thing prospective students almost
                never ask about and the thing that most often turns a two-year plan into a four-year one.
              </p>
              <p className={P}>
                Two cautions. An unranked school is not automatically a poor one: {FTO.ranking.exclusion.charAt(0).toLowerCase()}
                {FTO.ranking.exclusion.slice(1)} And a ranking is a snapshot &mdash; it is refreshed{' '}
                {FTO.ranking.frequency}, so read the current edition on DGCA&rsquo;s own site rather than a summary of it
                somewhere else. That is why this page does not print the order.
              </p>

              <h2 id="delhi" className={H2}>If you are searching from Delhi, read this part</h2>
              <p className={P}>
                On DGCA&rsquo;s list as read on {LAST_UPDATED}, there is no approved flying base in Delhi, and none anywhere in
                the National Capital Region &mdash; not {FTO.noBaseIn.slice(1).join(', ')}. The approved bases sit across{' '}
                {FTO.statesWithBases.length} states, including {FTO.statesWithBases.slice(0, 8).join(', ')}.
              </p>
              <p className={P}>
                So &ldquo;flying school near me&rdquo;, typed in Delhi, has no local answer, and any Delhi address advertising
                flight training is arranging it somewhere else. That is not sinister &mdash; it is what we do too &mdash; but you
                should know it before you pay, and you should ask where the aircraft actually are.
              </p>
              <p className={P}>
                What a Delhi student <em>can</em> complete locally is a great deal more than most people realise: the computer
                number, the written papers, the medical and, if necessary, an appeal in person. That is set out on{' '}
                <Link href="/pilot-training-in-dwarka" className={A}>the Dwarka page</Link>, with the addresses.
              </p>

              <h2 id="unchanged" className={H2}>What no academy changes</h2>
              <p className={P}>
                Before comparing institutions, it helps to know how little of the process any of them controls. These are set by
                DGCA and the Aircraft Rules and are identical wherever you enrol.
              </p>
              <div className="space-y-4 mb-6">
                {unchanged.map((u) => (
                  <div key={u.what} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{u.what}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{u.detail}</p>
                  </div>
                ))}
              </div>
              <p className={P}>
                An academy competes on one thing only: how well it prepares you for a standard it does not set. Any pitch that
                implies otherwise is describing something it cannot deliver.
              </p>

              <h2 id="ask" className={H2}>Seven questions, and why each one works</h2>
              <p className={P}>
                Each of these has an answer that can be checked against a document or held to later. That is the whole test.
              </p>
              <ol className="space-y-4 mb-6">
                {askThese.map((a, i) => (
                  <li key={a.q} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-av-blue text-sm mb-1">{a.q}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{a.why}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 id="red-flags" className={H2}>Claims that cannot be true</h2>
              <p className={P}>
                Not warning signs in a vague sense &mdash; statements that are false on their face, because the thing being
                promised belongs to somebody else.
              </p>
              <ul className="space-y-2 mb-6">
                {redFlags.map((r) => (
                  <li key={r.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&times;</span>{r}
                  </li>
                ))}
              </ul>

              <h3 className={H3}>On cost</h3>
              <p className={P}>
                The one publicly comparable figure is {CPL_COST.benchmark.school}&rsquo;s published{' '}
                {CPL_COST.benchmark.feeLabel}. Private schools publish little, the figures circulating online are mostly
                unsourced, and we do not print a range we cannot stand behind. Compare quotes line by line and keep the
                government&rsquo;s own charges &mdash; {inr(PARIKSHA.fees.regularPerPaper)} per examination paper, plus the
                medical &mdash; separate from what an institution charges. The detail is on{' '}
                <Link href="/cost-transparency" className={A}>our cost page</Link>.
              </p>

              <PeopleAlsoAsk items={peopleAlsoAsk} />

              <h2 id="where-next" className={H2}>Where to go from here</h2>
              <p className={P}>
                If you are choosing a flying school specifically, the longer treatment is at{' '}
                <Link href="/blogs/best-flying-school-in-india" className={A}>best flying school in India</Link>. If you are
                weighing a cadet programme against paying your own way, start with{' '}
                <Link href="/cadet-pilot-program" className={A}>cadet pilot programmes</Link>. If you are at the very
                beginning, <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>the route guide</Link>{' '}
                sets out the stages in order,{' '}
                <Link href="/pilot-career-counselling" className={A}>free counselling</Link> is there if you would rather
                talk it through, and{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link> tells you whether you
                clear the gates before you spend anything at all.
              </p>

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
              <p className={P}>
                Read on {LAST_UPDATED}. Both the list and the ranking are republished by DGCA; open them rather than relying on
                the figures quoted above.
              </p>
              <ul className="space-y-2 mb-8">
                {FTO.sources.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.label}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <h3 className="font-montserrat text-lg font-bold text-white mb-2">Bring us the quote you are unsure about</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  We are at {ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode}. If you have a flying school
                  quote in front of you and cannot tell what is missing from it, that is a useful hour whether or not you ever
                  enrol here. Phone {ACADEMY.phone} or write to {ACADEMY.email}.
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
