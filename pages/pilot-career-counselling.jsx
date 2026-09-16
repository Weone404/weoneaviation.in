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
  ACADEMY, EDUCATION, MIN_AGE, LICENCES, MEDICAL_STANDARDS as MED, PARIKSHA,
  DGCA_PAPERS, EXAM_RULES, CPL_HOURS, FTO, CPL_COST, PILOT_SUPPLY, RTR, inr, papersSummary,
} from '../lib/facts';

/*
 * /pilot-career-counselling — new 2026-09-16.
 *
 * WHY IT EXISTS. Keyword 50 on the owner's priority list, and the only one of
 * the fifty that matched a service the academy actually offers with no page for
 * it. It was blocked from 15 September until the owner confirmed two things on
 * 16 September: the counselling is free of cost, and it guides end to end.
 * Those two facts are the only service claims on this page. Everything else is
 * the regulatory substance a session is about, taken from lib/facts.js.
 *
 * WHY IT IS NOT A CONTACT PAGE WITH A NEW TITLE. A page that says "free
 * counselling, call us" earns nothing and deserves nothing. This one publishes
 * the actual agenda — the eight decisions a prospective pilot has to make, in
 * the order that wastes the least money, each with the figure or rule behind
 * it. A reader who never contacts us still leaves better informed, which is the
 * only honest basis for asking them to get in touch.
 *
 * It also states plainly what counselling cannot do, including the government's
 * own position that there is no pilot shortage in India but there is a shortage
 * of commanders. A counselling page that implies a guaranteed career would be
 * the same class of claim as the guaranteed Emirates interview removed from
 * this site on 15 September.
 *
 * CLAIMS DISCIPLINE. Free and end-to-end are the owner's own words, given on
 * 16 September. Do NOT add session length, batch size, timings, fees, pass
 * rates, placement, or any number of students counselled. None of it is
 * substantiated and the owner has asked that operational detail stay off the
 * site.
 */

const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/pilot-career-counselling';
const CPL = LICENCES.find((l) => l.code === 'CPL');

/* The agenda. Eight decisions, in the order that wastes the least money. */
const agenda = [
  {
    step: 'Whether you clear the education gate at all',
    detail: `${EDUCATION.requirement} ${EDUCATION.altRoute} This is first because it is the only one that can add a year at the front of the plan, and it is the one people most often discover late.`,
    link: { href: '/commercial-pilot-license-eligibility', label: 'CPL eligibility, gate by gate' },
  },
  {
    step: 'Whether the medical is likely to be a problem',
    detail: `Class 2 to begin, Class 1 for a Commercial Pilot Licence, at one of DGCA's ${MED.centres.airForce.length + MED.centres.civil.length} approved centres. ${MED.timingAdvice} We are not doctors and cannot assess you; what we can do is make sure you book it before you spend anything large, rather than after.`,
    link: { href: '/dgca-class-2-class-1-medical', label: 'Class 1 and Class 2 medical' },
  },
  {
    step: 'Which licence you are actually aiming at',
    detail: `${LICENCES.map((l) => `${l.name} from age ${l.minAge}`).join(', ')}. Most people mean a Commercial Pilot Licence when they say "become a pilot", but not everyone does, and the answer changes the cost by an order of magnitude.`,
    link: { href: '/your-guide-on-how-to-become-a-pilot-in-india', label: 'The full route, stage by stage' },
  },
  {
    step: 'Getting the computer number started early',
    detail: `It needs no medical certificate and no flying school, it can be applied for from age ${PARIKSHA.basics.minAge}, and through DigiLocker it is allotted immediately. Starting it early costs nothing and saves months. ${PARIKSHA.processing.days} working days on the manual route.`,
    link: { href: '/dgca-computer-number', label: 'The computer number guide' },
  },
  {
    step: 'Planning the written papers around their expiry',
    detail: `${DGCA_PAPERS.length} papers — ${papersSummary()} — at ${EXAM_RULES.theory.passMark}% each, ${inr(PARIKSHA.fees.regularPerPaper)} per paper. ${EXAM_RULES.paperValidity.planningNote} That sentence alone has saved people a re-sit.`,
    link: { href: '/dgca-pariksha', label: 'DGCA Pariksha and the session calendar' },
  },
  {
    step: 'Choosing a flying school on evidence rather than a brochure',
    detail: `DGCA publishes the approved list — ${FTO.count} organisations as on ${FTO.listAsOf} — and ranks them, weighting ${FTO.ranking.parameters[1].name} at ${FTO.ranking.parameters[1].weight}%, which covers aircraft utilisation and the student-to-aircraft ratio. That is what decides whether your ${CPL_HOURS.total} hours take eighteen months or four years, and almost nobody asks about it.`,
    link: { href: '/how-to-choose-an-aviation-academy', label: 'How to check an academy before you pay' },
  },
  {
    step: 'Reading a quote line by line',
    detail: `Private schools publish very little, so the figures circulating online cannot be traced to a document. The one publicly comparable price is ${CPL_COST.benchmark.school}'s published ${CPL_COST.benchmark.feeLabel}. Bring a quote and we will go through what it excludes — that is often the useful hour.`,
    link: { href: '/cost-transparency', label: 'What can and cannot be shown about cost' },
  },
  {
    step: 'Being honest about what comes after the licence',
    detail: `The Ministry of Civil Aviation's published position is: "${PILOT_SUPPLY.statement}" So the licence does not make you scarce, the first job is competitive, and the large step in pay comes with command. Better to know that before you commit than after.`,
    link: { href: '/commercial-pilot-license-salary', label: 'Pilot pay: what is published and what is not' },
  },
];

const cannot = [
  'We cannot promise you a job. We do not employ pilots, and hiring is the operator’s decision.',
  'We cannot promise you a pass. The papers are set and marked by DGCA, at ' + EXAM_RULES.theory.passMark + '% each.',
  'We cannot assess your medical fitness. That is a DGCA-approved examiner’s job, and the answer is worth having early.',
  'We cannot reduce the ' + CPL_HOURS.total + ' flying hours or the ' + DGCA_PAPERS.length + ' papers. Nobody can; they are set by regulation.',
  'We cannot tell you what you will earn. No Indian airline publishes a pilot pay scale.',
];

const bring = [
  'Your Class 12 marksheet, or your expected subjects if you are still in school',
  'Any flying school quote you already have, in writing',
  'Your date of birth, because several gates are age-bound',
  'Whether you have started a computer number or any medical already',
  'The question you have not been able to get a straight answer to anywhere else',
];

const peopleAlsoAsk = [
  {
    q: 'Is pilot career counselling free?',
    a: `Yes. ${ACADEMY.name} provides career counselling free of cost, and it covers the route end to end — from whether you clear the education gate, through the medical, the computer number, the ${DGCA_PAPERS.length} DGCA papers and choosing a flying school, to what the licence does and does not lead to. There is no charge and no obligation to enrol.`,
  },
  {
    q: 'What does a pilot career counselling session cover?',
    a: `The eight decisions a prospective pilot has to make, in the order that wastes the least money: the education gate, the medical, which licence you are aiming at, the computer number, planning the written papers around their expiry, choosing a flying school on DGCA's published list and ranking rather than on a brochure, reading a fee quote line by line, and what realistically follows the licence. Every one of those has a rule or a published figure behind it, and they are all set out on this site whether or not you ever contact us.`,
  },
  {
    q: 'Do I have to enrol after counselling?',
    a: 'No. It is free of cost and carries no obligation. A session where you decide this career is not for you is a good outcome, not a failed one — it is far cheaper to reach that conclusion in a conversation than after paying a flying school deposit.',
  },
  {
    q: 'Can my parents attend?',
    a: 'Yes, and it is usually a better conversation when they do. Most of what is discussed is money, timelines and risk, and those are family decisions. Bring any quote you already have in writing.',
  },
  {
    q: 'What can counselling not do?',
    a: `It cannot promise a job, a pass, a salary or a shorter route. ${ACADEMY.scope}`,
  },
];

const faqs = [
  { q: 'How much does career counselling cost at We One Aviation?', a: 'Nothing. It is free of cost.' },
  { q: 'What does "end to end" mean here?', a: `That the guidance covers the whole route rather than only the part we teach: the education gate, the medical classes and where they are done, the computer number, the ${DGCA_PAPERS.length} written papers, choosing a flying school, ${RTR.name}, the skill test and the licence application — and what realistically follows it.` },
  { q: 'I am still in Class 11 or 12. Is it too early?', a: `No, it is the best time. The one decision that cannot be undone cheaply is subject choice: ${EDUCATION.requirement} Getting that right while you still have the option costs nothing; fixing it later costs a year.` },
  { q: 'I am past the usual age. Is it too late?', a: `There is no upper age limit on the DGCA examination side — ${PARIKSHA.basics.maxAgeNote} What changes with age is the medical, which is assessed by a DGCA-approved examiner rather than by us, and the commercial reality of a shorter career runway. Worth discussing honestly rather than being told either yes or no by a website.` },
  { q: 'Do you counsel students who will not train with you?', a: 'Yes. It is free and there is no obligation, and a fair amount of what is useful in a session is about flying schools, which we do not run.' },
  { q: 'What should I bring?', a: bring.join('; ') + '.' },
  { q: 'Where and how does it happen?', a: `In person at ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}, or over the phone on ${ACADEMY.phone}, or by email at ${ACADEMY.email}.` },
  { q: 'Will you tell me what a pilot earns?', a: 'We will tell you what is published, which is not a salary — no Indian airline publishes a pay scale. What is published is the government’s position that there is no shortage of pilots but there is a shortage of commanders, and that is more useful for planning than any figure.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Career Counselling: The Eight Decisions, In Order',
  description: 'Free, end-to-end pilot career counselling from We One Aviation Academy — and the full agenda published in advance: the education gate, the medical, the computer number, the DGCA papers, choosing a flying school, and what follows the licence.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'Pilot career counselling',
  keywords: 'pilot career counselling, pilot career guidance, aviation career counselling india, free pilot counselling, pilot career counsellor delhi',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
    { '@type': 'CreativeWork', name: PILOT_SUPPLY.sources[0].label, url: PILOT_SUPPLY.sources[0].url },
  ],
};

/* A Service node, because this page describes a service the academy provides. */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Pilot career counselling',
  serviceType: 'Career counselling for prospective pilots',
  description: 'End-to-end guidance on the DGCA pilot licence route, covering eligibility, the medical, the computer number, the written examinations, choosing a flying training organisation, and what follows the licence.',
  provider: {
    '@type': 'EducationalOrganization',
    name: ACADEMY.name,
    url: ACADEMY.url,
    telephone: ACADEMY.phone,
    email: ACADEMY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ACADEMY.streetAddress,
      addressLocality: ACADEMY.addressLocality,
      postalCode: ACADEMY.postalCode,
      addressRegion: 'Delhi',
      addressCountry: ACADEMY.addressCountry,
    },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free of cost, with no obligation to enrol' },
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function PilotCareerCounselling() {
  return (
    <Layout
      title="Pilot Career Counselling: Free, End to End | We One Aviation"
      description="Free pilot career counselling with the agenda published in advance — the education gate, the medical, the computer number, the DGCA papers, choosing a flying school, and what follows the licence."
    >
      <StructuredData data={[articleSchema, serviceSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Free, and no obligation</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Pilot Career Counselling
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Here is the whole agenda, in advance. If you read it and never call us, it has still done its job.
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
                title="What this is"
                items={[
                  'Free of cost, with no obligation to enrol',
                  'End to end: the whole licence route, not only the part we teach',
                  'In person in Dwarka, or by phone or email',
                  `Bring: your Class 12 marksheet, any quote in writing, and your date of birth`,
                  'Parents welcome — most of what is discussed is money, timelines and risk',
                  'What it is not: a promise of a job, a pass, a salary or a shorter route',
                ]}
              />

              <h2 id="agenda" className={H2}>The eight decisions, in the order that wastes the least money</h2>
              <p className={P}>
                Most counselling pages ask you to get in touch to find out what will be discussed. This one tells you now.
                Every item below has a rule or a published figure behind it, and each links to the page on this site that
                sets it out in full &mdash; so you can work through the whole thing yourself if you would rather.
              </p>
              <ol className="space-y-4 mb-6">
                {agenda.map((a, i) => (
                  <li key={a.step} className="flex gap-3 items-start">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-av-blue text-sm mb-1">{a.step}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-1">{a.detail}</p>
                      <Link href={a.link.href} className={`${A} text-xs`}>{a.link.label} &rarr;</Link>
                    </div>
                  </li>
                ))}
              </ol>
              <p className={P}>
                The order matters more than any single item. The two that end plans &mdash; the education gate and the medical
                &mdash; are the cheapest to check and the ones most often left until after money has been spent.
              </p>

              <h2 id="cannot" className={H2}>What counselling cannot do</h2>
              <p className={P}>
                Worth saying plainly, because a counselling page that implies otherwise is selling something it does not have.
              </p>
              <ul className="space-y-2 mb-6">
                {cannot.map((c) => (
                  <li key={c.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&times;</span>{c}
                  </li>
                ))}
              </ul>
              <p className={P}>
                And the honest frame around the whole career, from the Ministry of Civil Aviation itself:{' '}
                &ldquo;{PILOT_SUPPLY.statement}&rdquo; A licence does not make you scarce. Command does. That is the single
                most useful sentence in any conversation about this career, and it is better heard at the start than at the
                end.
              </p>

              <h2 id="bring" className={H2}>What to bring</h2>
              <ul className="space-y-2 mb-6">
                {bring.map((b) => (
                  <li key={b.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{b}
                  </li>
                ))}
              </ul>
              <p className={P}>
                The last one is the most useful. If there is a question you have asked three places and got three different
                answers to, bring that &mdash; and if we cannot source the answer either, we will say so rather than guess.
                That is the standard the rest of this site is written to.
              </p>

              <h2 id="scope" className={H2}>Being exact about who we are</h2>
              <p className={P}>{ACADEMY.scope}</p>
              <p className={P}>
                Which means a fair amount of a useful session is about flying schools we do not run and decisions we do not
                profit from. That is the point. We have been teaching the DGCA ground subjects from Dwarka Sector 7 since{' '}
                {ACADEMY.foundedYear}, and{' '}
                <Link href="/pilot-training-in-dwarka" className={A}>most of the DGCA machinery a Delhi student needs is
                already in this city</Link>.
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

              <div className="bg-av-blue rounded-2xl p-6">
                <h3 className="font-montserrat text-lg font-bold text-white mb-2">Free, and no obligation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode}. Phone {ACADEMY.phone} or write to{' '}
                  {ACADEMY.email}. Minimum age for a Commercial Pilot Licence is {MIN_AGE.CPL} &mdash; {CPL.permits.toLowerCase()}{' '}
                  &mdash; but there is no minimum age for a conversation about getting there.
                </p>
              </div>
            </ScrollReveal>
          </article>
          <aside className="lg:col-span-1">
            <div className="sticky top-28"><LeadForm title="Book free counselling" /></div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
