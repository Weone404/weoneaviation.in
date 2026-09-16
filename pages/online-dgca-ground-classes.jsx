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
  ACADEMY, DGCA_PAPERS, EXAM_RULES, PARIKSHA, SYLLABUS, RTR, FTO, EDUCATION, inr, papersSummary,
} from '../lib/facts';

/*
 * /online-dgca-ground-classes — new 2026-09-16.
 *
 * WHY IT EXISTS. Keyword 33 on the owner's priority list, noted there as
 * growing online demand and a rival target. The academy teaches online and had
 * no page for the term; /dgca-ground-classes covers the service generally and
 * never addresses the online question a searcher is actually asking.
 *
 * WHAT MAKES IT MORE THAN A SERVICE PAGE. The question behind "online DGCA
 * ground classes" is really "can I do this properly without being in a
 * classroom, and is anything lost?" That has an honest, checkable answer, and
 * it is a genuinely reassuring one: every part of the DGCA examination process
 * is already location-independent. The portal is online, the computer number
 * application is online, DigiLocker allots it immediately, the papers are a
 * computer-based test, and the syllabus and DGCA's own book list are published.
 * Nothing in the regulation prefers a classroom.
 *
 * And the honest counterweight, which is the whole point of the page: what
 * cannot be done online is the flying, and no ground school — online or not —
 * is on DGCA's approved list, because that list covers organisations that
 * operate aircraft.
 *
 * CLAIMS DISCIPLINE. No batch size, no timings, no course duration, no fee, no
 * pass rate, no placement. The owner asked that operational detail stay off the
 * site, and a page about online classes is exactly where it would creep back
 * in. Do not add it.
 */

const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/online-dgca-ground-classes';

const alreadyOnline = [
  { what: 'The computer number application', detail: `Applied for online, from anywhere, from age ${PARIKSHA.basics.minAge}. Through DigiLocker it is allotted immediately; the manual route takes ${PARIKSHA.processing.days} working days. No medical certificate and no flying school are needed for it.` },
  { what: 'Booking the papers', detail: `Done on the DGCA Pariksha portal against that computer number, at ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} in an Online On-Demand Examination, paid through Bharatkosh.` },
  { what: 'The examination itself', detail: 'A computer-based test with multiple-choice questions. The format does not change according to how you prepared for it.' },
  { what: 'The syllabus', detail: 'Published by DGCA rather than set by any institute, so what has to be learned is identical whoever teaches it and wherever you sit.' },
  { what: 'Results and the licence application', detail: 'Results come through the portal; the licence application itself is made on eGCA, which is a separate portal from Pariksha and is also online.' },
];

const notOnline = [
  'The flying. Two hundred hours in an actual aeroplane at a flying training organisation, and no part of that is remote.',
  'The medical. A DGCA medical is conducted in person at an approved centre — Class 2 to begin with, Class 1 for a Commercial Pilot Licence.',
  `${RTR.name}. Examined separately under its own rules, and it includes a practical component.`,
  'The skill test at the end, conducted by an authorised examiner.',
];

const honest = [
  'A ground school is not on DGCA’s approved list, online or offline. That list covers organisations that operate aircraft. If any coaching institute calls itself DGCA approved, ask which list it appears on and go and look.',
  'Online or classroom changes how you are taught. It changes nothing about the threshold: ' + EXAM_RULES.theory.passMark + '% per paper, set by regulation, marked by DGCA.',
  'Nobody can promise you a pass. The paper is DGCA’s and so is the marking.',
];

const peopleAlsoAsk = [
  {
    q: 'Are online DGCA ground classes as good as classroom ones?',
    a: `For the part that ground school covers, the honest answer is that the format is not what the regulation cares about. Every step of the DGCA examination process is already location-independent: the computer number is applied for online, the papers are booked on DGCA's own portal and sat as a computer-based test, the syllabus is published by DGCA rather than by any institute, and each of the ${DGCA_PAPERS.length} papers needs ${EXAM_RULES.theory.passMark}% on its own whoever taught you. What online cannot cover is the flying, the medical and ${RTR.name}, none of which any ground school covers anyway.`,
  },
  {
    q: 'Can I clear the DGCA exams studying online?',
    a: `Yes. There is no regulation requiring classroom attendance for the written papers, and the examination is a computer-based test against a published syllabus. The papers are cleared one at a time rather than in a single sitting, which suits self-paced study.`,
  },
  {
    q: 'Do I need to join a flying school before starting the DGCA papers?',
    a: `No, and starting first is usually the cheapest decision in the whole plan. The computer number application needs no medical certificate and no flying school. But count backwards from your licence application rather than forwards from today: ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl}`,
  },
  {
    q: 'What does the DGCA exam cost if I study online?',
    a: `The same as it costs anyone. ${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand, paid to the government through Bharatkosh. Those are DGCA's fees and no institute sets or discounts them.`,
  },
  {
    q: 'Is an online ground school DGCA approved?',
    a: FTO.groundSchoolNote,
  },
];

const faqs = [
  { q: 'Which subjects do DGCA ground classes cover?', a: `The ${DGCA_PAPERS.length} written papers: ${papersSummary()}. ${RTR.note}` },
  { q: 'Is the syllabus different for online study?', a: 'No. DGCA publishes the syllabus, so it is identical however you study. Our syllabus page sets out what DGCA specifies for each paper and the study material DGCA itself names.' },
  { q: 'How many attempts do I get?', a: 'Papers are cleared individually and a re-sit is a fresh booking with a fresh fee. What you have passed stands; what you have not, you sit again in a later session.' },
  { q: 'Can I switch between online and classroom?', a: 'Classroom batches run in Dwarka and students elsewhere study online. Which one you are in does not change what DGCA requires of you or how the examination is conducted.' },
  { q: 'Do I need Physics and Maths to start?', a: `${EDUCATION.requirement} ${EDUCATION.altRoute}` },
  { q: 'Does studying online delay my licence?', a: 'Not by itself. What governs the timeline is examination session availability and, far more, aircraft availability at your flying school once you get there.' },
  { q: 'What does We One Aviation actually provide?', a: ACADEMY.scope },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Online DGCA Ground Classes: What Can and Cannot Be Done Remotely',
  description: 'Every step of the DGCA examination process is already location-independent — the computer number, the booking, the computer-based test and the published syllabus. What online study cannot cover, and what no ground school covers either.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'DGCA ground classes',
  keywords: 'online dgca ground classes, dgca ground classes online, online cpl ground classes, dgca online coaching, dgca ground school online',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
    { '@type': 'CreativeWork', name: `${EXAM_RULES.car.citation} — pass marks and paper validity`, url: EXAM_RULES.car.where },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
  ],
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function OnlineDgcaGroundClasses() {
  return (
    <Layout
      title="Online DGCA Ground Classes: What Can Be Done Remotely (2026)"
      description="The computer number, the booking, the computer-based test and the syllabus are all already location-independent. What online study cannot cover — and what no ground school covers either."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Studying from anywhere</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Online DGCA Ground Classes
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            The useful question is not whether online works. It is which parts of becoming a pilot were ever in a classroom.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                DGCA process and fees checked on {LAST_UPDATED}. <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="What the regulation actually requires"
                items={[
                  'No rule requires classroom attendance for the DGCA written papers',
                  `The syllabus is published by DGCA, so it is identical whoever teaches it`,
                  `${DGCA_PAPERS.length} papers, each needing ${EXAM_RULES.theory.passMark}% on its own — no aggregate`,
                  `Fees are DGCA's: ${inr(PARIKSHA.fees.regularPerPaper)} regular, ${inr(PARIKSHA.fees.olodePerPaper)} on demand`,
                  'Not doable online, by anyone: the flying, the medical, RTR (A) practical, the skill test',
                  'No ground school is on DGCA’s approved list — that list is for organisations operating aircraft',
                ]}
              />

              <h2 id="already-online" className={H2}>Most of this was already online</h2>
              <p className={P}>
                This is the part that reframes the question. The DGCA examination process does not have a classroom in it
                anywhere &mdash; it has a portal, a computer number and a computer-based test. Studying online is not a
                workaround for a system built around attendance; it fits a system that was already location-independent.
              </p>
              <div className="space-y-4 mb-6">
                {alreadyOnline.map((x) => (
                  <div key={x.what} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{x.what}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{x.detail}</p>
                  </div>
                ))}
              </div>

              <h2 id="not-online" className={H2}>What cannot be done remotely &mdash; by anyone</h2>
              <p className={P}>
                Worth stating plainly, because it is the honest limit of any ground school and not a limitation of online
                study specifically. A classroom in Delhi cannot do these either.
              </p>
              <ul className="space-y-2 mb-6">
                {notOnline.map((n) => (
                  <li key={n.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&times;</span>{n}
                  </li>
                ))}
              </ul>

              <h2 id="honest" className={H2}>Three things to hold any online provider to</h2>
              <ul className="space-y-2 mb-6">
                {honest.map((h) => (
                  <li key={h.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{h}
                  </li>
                ))}
              </ul>
              <p className={P}>
                How to check any academy, online or otherwise, against documents rather than claims is set out on{' '}
                <Link href="/how-to-choose-an-aviation-academy" className={A}>our page on checking an academy</Link>.
              </p>

              <h2 id="what-to-study" className={H2}>What you will actually be studying</h2>
              <p className={P}>
                The {DGCA_PAPERS.length} papers: {papersSummary()}. {RTR.note} Each carries its own{' '}
                {EXAM_RULES.theory.passMark}% threshold rather than an aggregate, so a strong paper does not carry a weak one,
                and they are cleared one at a time &mdash; which is what makes self-paced study practical.
              </p>
              <p className={P}>
                Subject by subject: <Link href="/air-navigation" className={A}>Air Navigation</Link>,{' '}
                <Link href="/aviation-meteorology" className={A}>Aviation Meteorology</Link>,{' '}
                <Link href="/air-regulations" className={A}>Air Regulations</Link>,{' '}
                <Link href="/technical-general" className={A}>Technical General</Link> and{' '}
                <Link href="/rtr-a" className={A}>{RTR.name}</Link>. The published syllabus and the study material DGCA itself
                names are on <Link href="/commercial-pilot-license-syllabus" className={A}>the syllabus page</Link>
                {SYLLABUS && SYLLABUS.bookList ? ', including DGCA’s own book list' : ''}.
              </p>
              <p className={P}>
                The portal side &mdash; applying for a computer number, the session calendar, what a rejection looks like and
                how it is appealed &mdash; is on <Link href="/dgca-computer-number" className={A}>the computer number
                guide</Link> and <Link href="/dgca-pariksha" className={A}>the Pariksha page</Link>.
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
