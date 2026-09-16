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
  ACADEMY, FTO, PARIKSHA, EXAM_RULES, DGCA_PAPERS, CPL_HOURS, LICENCES, MIN_AGE,
  EDUCATION, MEDICAL_STANDARDS as MED, CPL_COST, RTR, papersSummary, inr,
} from '../lib/facts';

/*
 * /pilot-training-in-delhi — REWRITTEN 2026-09-16.
 *
 * WHY IT WAS REWRITTEN RATHER THAN EDITED. This was the worst page on the site
 * by claims density, and it targets keyword 27 on the owner's priority list,
 * marked there as critical local SEO. A content audit rendering every page
 * surfaced it. What it carried:
 *
 *   - "Only 20 students per batch" and "Limited seats available" — batch size,
 *     which the owner asked on 15 Sep to keep off the site entirely.
 *   - "INR 40 - 60 Lakh" as the cost of training, with a four-line breakdown
 *     (flying INR 35-50 Lakh, simulator INR 3-5 Lakh). Every one of those was
 *     removed from the rest of the site in this branch as untraceable.
 *   - "Practice in full motion flight simulators" — the academy owns no
 *     simulators, and scripts/check-claims.js bans the claim outright.
 *   - "Graduates have joined major airlines, cargo operations and private
 *     aviation companies worldwide"; "Soon, you'll be landing jobs with the
 *     coolest airlines"; "Direct Airline Pathway ... secure airline jobs
 *     quickly" — placement claims, three separate ones.
 *   - "our pro instructors — real pilots with real experience" and
 *     "DGCA-qualified aviation instructors ... who have served as pilots in
 *     India" — contradicts ACADEMY.scope, which states no pilots are employed.
 *   - "Top flying schools like We One Aviation" — positions a ground school as
 *     a flying school.
 *   - "Scholarship provided to every student"; "Full Scholarship After CPL";
 *     "1500-Hour Flight Building at No Extra Cost" — offers we cannot verify.
 *   - Durations throughout, and "become a pilot in as little as 15 months".
 *   - Named airlines as destinations (IndiGo, Air India, SpiceJet, FedEx,
 *     Blue Dart).
 *   - Copy like "chill above the city" and "without any tension", on a page
 *     about a decision that costs tens of lakhs.
 *
 * WHAT REPLACES IT, and why it is stronger rather than merely safer. Delhi has
 * one genuinely decisive, sourced fact that no competitor page states: DGCA's
 * published list of approved Flying Training Organisations contains no flying
 * base in Delhi or anywhere in the NCR. So "pilot training in Delhi" cannot
 * mean flying in Delhi, for anybody, and any Delhi address implying otherwise
 * is arranging it elsewhere — including us. What Delhi IS unusually good for is
 * everything either side of the flying, because three DGCA institutions sit in
 * the city. That is the honest, useful and defensible version of this page.
 *
 * RELATIONSHIP TO /pilot-training-in-dwarka. That page is hyper-local and
 * answers "what is at Sector 7". This one is city-wide and answers "what does
 * training in Delhi actually mean". They cross-link rather than repeat.
 *
 * components/Citypagetemplate is now unused. It was used only by this page. Do
 * not reintroduce it here without rebuilding the claims that lived in its props.
 */

const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/pilot-training-in-delhi';
const CEO = PARIKSHA.authority;
const NCR_CENTRES = [...MED.centres.airForce, ...MED.centres.civil].filter((c) => /Delhi|Gurugram/.test(c.city));
const TOTAL_CENTRES = MED.centres.airForce.length + MED.centres.civil.length;

const inDelhi = [
  {
    stage: 'The computer number',
    where: `DGCA's Central Examination Organisation, ${CEO.address}`,
    detail: `Every written paper is booked against one, and it is a separate online application. Through DigiLocker it is allotted immediately; the manual route takes ${PARIKSHA.processing.days} working days. A rejection can be appealed in person here — ${PARIKSHA.rejection.appeal.inPerson.replace(', at the same address.', '.')}`,
  },
  {
    stage: 'The written examinations',
    where: 'Online, on the DGCA Pariksha portal, from anywhere',
    detail: `${DGCA_PAPERS.length} papers — ${papersSummary()} — each needing ${EXAM_RULES.theory.passMark}% on its own rather than an aggregate, at ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} on demand. ${PARIKSHA.calendar2026.regular.length} regular sessions a year plus ${PARIKSHA.calendar2026.olode.length} on-demand ones.`,
  },
  {
    stage: 'The medical',
    where: `${NCR_CENTRES.length} of DGCA's ${TOTAL_CENTRES} approved centres are in Delhi and the NCR`,
    detail: `${NCR_CENTRES.map((c) => `${c.name}, ${c.city}`).join(' · ')}. Class 2 to begin and Class 1 for a Commercial Pilot Licence, so neither means travelling. ${MED.timingAdvice}`,
  },
  {
    stage: 'Equivalence, for international-board candidates',
    where: `Association of Indian Universities, Kotla Marg`,
    detail: `${PARIKSHA.aiu.whenNeeded} ${PARIKSHA.aiu.diploma} CBSE, ICSE and state-board candidates do not need this.`,
  },
  {
    stage: 'The flying',
    where: 'Not in Delhi. Not anywhere in the NCR.',
    detail: `DGCA's published list of approved Flying Training Organisations — ${FTO.count} of them as on ${FTO.listAsOf} — contains no flying base in Delhi, ${FTO.noBaseIn.slice(1).join(', ')}. The approved bases sit across ${FTO.statesWithBases.length} states. This is the part of training that happens elsewhere, and it is where almost all the cost sits.`,
  },
];

const peopleAlsoAsk = [
  {
    q: 'Can you do pilot training in Delhi?',
    a: `Most of it, and not the flying. DGCA's approved-FTO list has no flying base in Delhi or anywhere in the NCR, so no one trains pilots to fly within the city — any Delhi address advertising flight training is arranging it elsewhere, including us. What Delhi is unusually good for is everything either side of it: the Central Examination Organisation that issues computer numbers and hears appeals is at ${CEO.address}, ${NCR_CENTRES.length} of DGCA's ${TOTAL_CENTRES} approved medical centres are in Delhi and the NCR, the written papers are sat online from anywhere, and the equivalence body for international-board candidates is on Kotla Marg.`,
  },
  {
    q: 'Is there a DGCA-approved flying school in Delhi?',
    a: `Not on DGCA's list as read on ${LAST_UPDATED}. The approved bases are spread across ${FTO.statesWithBases.length} states including ${FTO.statesWithBases.slice(0, 6).join(', ')}. Delhi's airspace and airport traffic make a training base impractical, which is why the list looks the way it does.`,
  },
  {
    q: 'What does pilot training in Delhi cost?',
    a: `No Indian government body publishes a market price and private flying schools publish nothing, so the ranges circulating online — this page carried one until 16 September 2026 — cannot be traced to a document. What can be shown: ${CPL_COST.benchmark.school}, a government academy, publishes ${CPL_COST.benchmark.feeLabel}, and DGCA charges ${inr(PARIKSHA.fees.regularPerPaper)} per examination paper. Get any private quote in writing and compare it line by line.`,
  },
  {
    q: 'What are the eligibility requirements to become a pilot in Delhi?',
    a: `The same as anywhere in India, because they are set by regulation rather than by city. ${EDUCATION.requirement} Minimum age ${MIN_AGE.CPL} for a Commercial Pilot Licence, ${MIN_AGE.SPL} for a Student Pilot Licence. ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each. ${CPL_HOURS.total} hours as pilot of an aeroplane. A Class 1 medical, and ${RTR.name}.`,
  },
  {
    q: 'What should I do first if I am in Delhi?',
    a: `Book the Class 2 medical, because it is the cheapest gate and the only one that can end the plan outright. Then apply for a computer number — it needs no medical certificate and no flying school — and start the written papers. Both of those are done without leaving the city and before committing to a flying school anywhere.`,
  },
];

const faqs = [
  { q: 'Why is there no flying school in Delhi?', a: `DGCA's approved-FTO list shows bases across ${FTO.statesWithBases.length} states and none in Delhi or the NCR. Delhi's controlled airspace and the traffic at IGI make a training base impractical. The practical consequence is that a Delhi student completes the papers, the computer number and the medical locally, then travels for the hours.` },
  { q: 'What can I finish without leaving Delhi?', a: 'The computer number, all the written papers, the medical, and — for international-board candidates — the equivalence certificate. Only the flying happens elsewhere.' },
  { q: 'Does We One Aviation run a flying school in Delhi?', a: ACADEMY.scope },
  { q: 'Where exactly are you in Delhi?', a: `${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}. Phone ${ACADEMY.phone}, email ${ACADEMY.email}. Teaching from Dwarka since ${ACADEMY.foundedYear}.` },
  { q: 'How long does pilot training take?', a: 'No Indian regulation sets a duration, and this page used to quote one. What the rules set are floors and expiry windows; what actually decides your timeline is aircraft availability at your flying school. Our page on how long it takes sets out every floor, every expiry, and the one question to ask a school.' },
  { q: 'Which licences can I prepare for from Delhi?', a: `The ground-school side of the whole ladder: ${LICENCES.map((l) => l.code).join(', ')}. The flying is the part that happens at a flying training organisation.` },
  { q: 'Is Delhi a good place to start?', a: `For the administrative half of the process it is arguably the best in the country, and that is a real advantage rather than a slogan — three DGCA institutions a student needs are in this city. For the flying it is neutral, because everybody travels.` },
  { q: 'Do I need Physics and Maths?', a: `${EDUCATION.requirement} ${EDUCATION.altRoute}` },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training in Delhi: What the City Can and Cannot Give You',
  description: "DGCA's approved-FTO list has no flying base in Delhi or the NCR, so training in Delhi never means flying in Delhi. What the city does have: the Central Examination Organisation, four approved medical centres and the equivalence body.",
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'Pilot training in Delhi',
  keywords: 'pilot training in delhi, pilot training institute in delhi, best pilot training academy in delhi, dgca ground classes in delhi, flying school in delhi, aviation academy in delhi',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
    { '@type': 'CreativeWork', name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
    { '@type': 'CreativeWork', name: MED.sources[3].label, url: MED.sources[3].url },
  ],
};

const localSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': CANONICAL,
  name: ACADEMY.name,
  url: ACADEMY.url,
  telephone: ACADEMY.phone,
  email: ACADEMY.email,
  foundingDate: String(ACADEMY.foundedYear),
  description: ACADEMY.scope,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ACADEMY.streetAddress,
    addressLocality: ACADEMY.addressLocality,
    postalCode: ACADEMY.postalCode,
    addressRegion: 'Delhi',
    addressCountry: ACADEMY.addressCountry,
  },
  areaServed: [{ '@type': 'Place', name: 'Delhi NCR' }, { '@type': 'Country', name: 'India' }],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function PilotTrainingInDelhi() {
  return (
    <Layout
      title="Pilot Training in Delhi: What the City Can and Cannot Give You"
      description="No DGCA-approved flying base exists in Delhi or the NCR — so training in Delhi never means flying in Delhi. What the city does have, and why it still helps."
    >
      <StructuredData data={[localSchema, articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Delhi, honestly</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Pilot Training in Delhi
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            No approved flying base exists in this city. That sounds like bad news and mostly is not &mdash; here is what
            Delhi actually gives you.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                DGCA&rsquo;s approved-organisation list, examination fees and medical centre list read on {LAST_UPDATED}.{' '}
                <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="Delhi, in one view"
                items={[
                  `No DGCA-approved flying base in Delhi or the NCR — ${FTO.count} approved organisations sit across ${FTO.statesWithBases.length} other states`,
                  `DGCA's Central Examination Organisation is at ${CEO.address}`,
                  `${NCR_CENTRES.length} of DGCA's ${TOTAL_CENTRES} approved medical centres are in Delhi and the NCR`,
                  `The ${DGCA_PAPERS.length} written papers are sat online from anywhere, at ${inr(PARIKSHA.fees.regularPerPaper)} each`,
                  'The equivalence body for international-board candidates is on Kotla Marg',
                  'The flying, and almost all of the cost, happens outside the city',
                ]}
              />

              <h2 id="the-fact" className={H2}>The fact that decides what this page can honestly say</h2>
              <p className={P}>
                DGCA publishes the list of Flying Training Organisations it has approved &mdash; {FTO.count} of them as on{' '}
                {FTO.listAsOf}, with each approval number, its validity dates, every flying base and the fleet by
                registration. Read the base column end to end and Delhi does not appear. Neither does{' '}
                {FTO.noBaseIn.slice(1).join(', ')}.
              </p>
              <p className={P}>
                So &ldquo;pilot training in Delhi&rdquo; cannot mean flying in Delhi, for anybody. Any Delhi address
                advertising flight training is arranging it somewhere else &mdash; and that includes us. It is not sinister;
                it is simply what the list says, and you should know it before you pay anyone.
              </p>
              <p className={P}>
                What that leaves is more useful than it sounds, because the rest of the process is unusually concentrated
                in this city.
              </p>

              <h2 id="stages" className={H2}>What happens where, stage by stage</h2>
              <div className="space-y-4 mb-6">
                {inDelhi.map((x) => (
                  <div key={x.stage} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{x.stage}</p>
                    <p className="text-av-orange text-xs font-semibold leading-relaxed mb-2">{x.where}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{x.detail}</p>
                  </div>
                ))}
              </div>
              <p className={P}>
                Four of those five happen without leaving Delhi. For the Sector 7 specifics &mdash; addresses, appeal
                timings at R.K. Puram, which medical centres are nearest &mdash; see{' '}
                <Link href="/pilot-training-in-dwarka" className={A}>pilot training in Dwarka</Link>.
              </p>

              <h2 id="order" className={H2}>The order that wastes the least money from Delhi</h2>
              <ol className="space-y-3 mb-6">
                {[
                  `Confirm the education gate. ${EDUCATION.requirement} If you did not take both subjects, the bridge route adds time at the front of the plan and finding out late is the expensive version.`,
                  `Book the Class 2 medical at one of the Delhi or NCR centres. Cheapest gate, and the only one that can end the plan outright.`,
                  `Apply for a computer number. No medical certificate needed, no flying school needed, immediate through DigiLocker.`,
                  `Start the written papers at ${inr(PARIKSHA.fees.regularPerPaper)} each — but count backwards from your licence application so the passes do not expire before you finish flying.`,
                  `Only then choose a flying school, on DGCA's published list and ranking rather than on a brochure. That is the decision with tens of lakhs attached.`,
                ].map((t, i) => (
                  <li key={t.slice(0, 30)} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{t}
                  </li>
                ))}
              </ol>
              <p className={P}>
                How to check a school before paying is on{' '}
                <Link href="/how-to-choose-an-aviation-academy" className={A}>this page</Link>; what the whole route looks
                like is on <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>the route guide</Link>;
                and <Link href="/how-long-does-it-take-to-become-a-pilot" className={A}>how long it takes</Link> explains
                why nobody can honestly give you a number of months.
              </p>

              <h2 id="removed" className={H2}>What this page used to say, and no longer does</h2>
              <p className={P}>
                Worth stating rather than quietly deleting. Until 16 September 2026 this page carried a batch size, a
                cost of &ldquo;INR 40&ndash;60 Lakh&rdquo; with a four-line breakdown, full-motion simulators, three
                separate promises about landing airline jobs, and a claim that our instructors are working pilots. None of
                it could be substantiated: the cost ranges trace to no published document, we own no simulators, hiring is
                the airline&rsquo;s decision, and {ACADEMY.scope.charAt(0).toLowerCase()}{ACADEMY.scope.slice(1)}
              </p>
              <p className={P}>
                On cost, what can be shown is on <Link href="/cost-transparency" className={A}>our cost page</Link>:{' '}
                {CPL_COST.benchmark.school} publishes {CPL_COST.benchmark.feeLabel}, and DGCA&rsquo;s own examination
                charge is {inr(PARIKSHA.fees.regularPerPaper)} a paper. Everything else in this market is quoted privately
                and should be got in writing.
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
