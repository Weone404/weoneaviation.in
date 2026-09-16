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
  ACADEMY, MEDICAL_STANDARDS as MED, PARIKSHA, EXAM_RULES, DGCA_PAPERS,
  papersSummary, RTR, LICENCES, EDUCATION, inr,
} from '../lib/facts';

/*
 * /pilot-training-in-dwarka — new 2026-09-15.
 *
 * WHY IT EXISTS. Keywords 34 and 35 of the owner's priority list are "best
 * pilot training academy in dwarka" and "pilot training institute in dwarka",
 * described there as the Sector-7 battle. The academy IS in Dwarka Sector 7 and
 * had no Dwarka page at all — the word appeared only in body copy elsewhere.
 * Highest commercial intent gap on the list, and the only one that is literally
 * the company's own address.
 *
 * HOW IT AVOIDS CANNIBALISING /pilot-training-in-delhi. That page is city-wide
 * and template-driven. This one is hyper-local and answers a different
 * question: not "can I train in Delhi" but "what can I actually complete
 * without leaving Delhi". They cross-link rather than repeat each other.
 *
 * WHAT MAKES IT DEFENSIBLE RATHER THAN A THIN LOCATION PAGE. Three DGCA
 * institutions a Delhi student needs are physically in Delhi, and no competitor
 * page says so:
 *   - The Central Examination Organisation, R.K. Puram — where a computer
 *     number application is scrutinised, where an original Board Verification
 *     Certificate has to reach, and where a rejection can be appealed in person
 *     on Tuesdays and Thursdays between 3 and 5 pm.
 *   - Four of DGCA's thirteen approved aeromedical centres are in Delhi NCR.
 *   - The Association of Indian Universities, Kotla Marg — for the equivalence
 *     certificate an international-board candidate needs.
 * That is a genuine local advantage, it is entirely sourced, and it is useful
 * whether or not the reader ever enrols here.
 *
 * CLAIMS DISCIPLINE. No batch size, no class timings, no fee, no pass rate, no
 * placement. The owner asked that operational detail stay off the site, and the
 * "only 20 students per batch" line was removed from the Delhi page earlier in
 * this branch as unverified. Do not reintroduce any of it.
 */

const LAST_UPDATED = '15 September 2026';
const LAST_UPDATED_ISO = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/pilot-training-in-dwarka';

const NCR_CENTRES = [...MED.centres.boardingCentres, ...MED.centres.civil].filter((c) => /Delhi|Gurugram/.test(c.city));
const CEO = PARIKSHA.authority;

const inDelhi = [
  {
    body: 'The Central Examination Organisation of DGCA',
    where: CEO.address,
    why: `This is where a computer number application is scrutinised, where an original Board Verification Certificate addressed to CEO has to be on file for your application to proceed, and where a complete rejection can be appealed — by email to ${PARIKSHA.rejection.appeal.email}, by post, or in person on ${PARIKSHA.rejection.appeal.inPerson.replace(', at the same address.', '.')}`,
  },
  {
    body: 'DGCA-approved aeromedical centres',
    where: NCR_CENTRES.map((c) => `${c.name}, ${c.city}`).join(' · '),
    why: `Four of the ${MED.centres.boardingCentres.length + MED.centres.civil.length} centres on DGCA's list are in Delhi and the NCR, so neither the Class 2 you need to start nor the Class 1 the Commercial Pilot Licence requires means travelling. ${MED.centres.listNote}`,
  },
  {
    body: 'The Association of Indian Universities',
    where: `AIU House, ${PARIKSHA.aiu.body.replace('Association of Indian Universities, ', '')}`,
    why: `${PARIKSHA.aiu.whenNeeded} ${PARIKSHA.aiu.diploma}`,
  },
];

const peopleAlsoAsk = [
  {
    q: 'Is there a pilot training institute in Dwarka?',
    a: `Yes. ${ACADEMY.name} runs DGCA ground classes from ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}. To be precise about what that means: ${ACADEMY.scope}`,
  },
  {
    q: 'Can I complete the DGCA process without leaving Delhi?',
    a: `Most of it, yes, and that is unusual. The examination portal is online from anywhere. The Central Examination Organisation that processes computer numbers and hears appeals is at ${CEO.address}. Four of DGCA's ${MED.centres.boardingCentres.length + MED.centres.civil.length} approved medical centres are in Delhi and the NCR. The equivalence certificate body, for international-board candidates, is on Kotla Marg. The flying hours are the part that happens elsewhere, at a flying school.`,
  },
  {
    q: 'What is taught in DGCA ground classes in Dwarka?',
    a: `The ${DGCA_PAPERS.length} written papers a Commercial Pilot Licence requires: ${papersSummary()}. ${RTR.note} Each paper needs ${EXAM_RULES.theory.passMark}% on its own, under ${EXAM_RULES.car.citation}, ${EXAM_RULES.theory.clause}.`,
  },
  {
    q: 'Do I need to be in Dwarka to study with We One Aviation?',
    a: 'Classroom batches run in Dwarka. Students outside Delhi join online batches. The examinations themselves are booked on the DGCA Pariksha portal from anywhere, against a computer number.',
  },
  {
    q: 'Where is We One Aviation in Dwarka?',
    a: `${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}. Phone ${ACADEMY.phone}, email ${ACADEMY.email}.`,
  },
];

const faqs = [
  { q: 'Which pilot courses can I start from Dwarka?', a: `The ground-school side of the whole ladder: ${LICENCES.map((l) => l.code).join(', ')}. What you cannot do from Dwarka, or from anywhere in Delhi, is the flying — that happens at a flying training organisation, and we arrange it with partner schools.` },
  { q: 'What qualification do I need before I start?', a: `${EDUCATION.requirement} — that is the requirement for a Commercial Pilot Licence. ${EDUCATION.altRoute}` },
  { q: 'How old do I have to be?', a: `${LICENCES.map((l) => `${l.code} from ${l.minAge}`).join(', ')}. A computer number for the DGCA examinations can be applied for from age ${PARIKSHA.basics.minAge}, and ${PARIKSHA.basics.maxAgeNote.charAt(0).toLowerCase()}${PARIKSHA.basics.maxAgeNote.slice(1)}` },
  { q: 'Where do I do the medical if I live in Delhi?', a: `At one of the DGCA-approved centres. ${NCR_CENTRES.length} of the ${MED.centres.boardingCentres.length + MED.centres.civil.length} on DGCA's list as of ${MED.centresAsOf} are in Delhi and the NCR: ${NCR_CENTRES.map((c) => `${c.name} (${c.city})`).join(', ')}. ${MED.classOrder.advice}` },
  { q: 'What do the DGCA examinations cost?', a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} per paper in an Online On-Demand Examination, paid through Bharatkosh. Those are DGCA's fees, not ours.` },
  { q: 'When are the 2026 examinations?', a: `Regular sessions: ${PARIKSHA.calendar2026.regular.map((r) => r.dates).join('; ')}. There are also ${PARIKSHA.calendar2026.olode.length} on-demand sessions across the year. ${PARIKSHA.calendar2026.tentative}` },
  { q: 'Does We One Aviation guarantee an airline job?', a: ACADEMY.scope },
  { q: 'How long has the academy been running?', a: `Since ${ACADEMY.foundedYear}, from Dwarka Sector 7.` },
];

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
  areaServed: [
    { '@type': 'Place', name: 'Dwarka, New Delhi' },
    { '@type': 'Place', name: 'Delhi NCR' },
    { '@type': 'Country', name: 'India' },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training in Dwarka: What You Can Complete Without Leaving Delhi',
  description: 'DGCA ground classes in Dwarka Sector 7, and the three DGCA institutions a Delhi student needs that are already in the city — the Central Examination Organisation at R.K. Puram, four approved medical centres, and the equivalence body on Kotla Marg.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Pilot training in Delhi',
  keywords: 'pilot training in dwarka, pilot training institute in dwarka, dgca ground classes dwarka, best pilot training academy in dwarka, aviation academy dwarka, pilot training delhi',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
    { name: MED.sources[3].label, url: MED.sources[3].url },
    { name: `${EXAM_RULES.car.citation} — pass marks`, url: EXAM_RULES.car.where },
  ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function PilotTrainingInDwarka() {
  return (
    <Layout
      title="Pilot Training in Dwarka, Delhi | DGCA Ground Classes"
      description="DGCA ground classes in Dwarka Sector 7 — and the three DGCA institutions a Delhi student needs that are already in the city, including four approved medical centres."
    >
      <StructuredData data={[localSchema, articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Dwarka, New Delhi</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Pilot Training in Dwarka
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            Ground classes from Sector 7 — and the part nobody tells a Delhi student: most of the DGCA process is already in
            this city.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              <p className="text-xs text-gray-500 mb-5">
                DGCA details checked on {LAST_UPDATED} against the Pariksha portal, the medical CAR and DGCA&rsquo;s centre list.
                Every figure is <a href="#sources" className={A}>sourced below</a>.
              </p>

              <QuickAnswer
                question="Is there a pilot training institute in Dwarka, and what can you do from here?"
                answer={`${ACADEMY.name} has run DGCA ground classes from ${ACADEMY.addressLocality}'s Sector 7 since ${ACADEMY.foundedYear}. Being in Delhi is a practical advantage rather than a slogan: the Central Examination Organisation that issues computer numbers and hears appeals is at R.K. Puram, four of DGCA's ${MED.centres.boardingCentres.length + MED.centres.civil.length} approved medical centres are in Delhi and the NCR, and the equivalence body for international-board candidates is on Kotla Marg. The flying hours are the one part that happens elsewhere.`}
              />

              <SummaryBox
                title="Dwarka, in short"
                items={[
                  `Address: ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}`,
                  `Phone ${ACADEMY.phone} · ${ACADEMY.email} · running since ${ACADEMY.foundedYear}`,
                  `Taught here: the ${DGCA_PAPERS.length} DGCA written papers, each needing ${EXAM_RULES.theory.passMark}%`,
                  'Classroom batches run in Dwarka; students elsewhere join online batches',
                  `DGCA's Central Examination Organisation: ${CEO.address}`,
                  `${NCR_CENTRES.length} of DGCA's ${MED.centres.boardingCentres.length + MED.centres.civil.length} approved medical centres are in Delhi and the NCR`,
                  'Flight training happens at partner flying schools, not in Dwarka',
                ]}
              />

              <h2 id="in-delhi" className={H2}>Three DGCA institutions already in your city</h2>
              <p className={P}>
                This is the part that actually matters about training from Delhi, and no competing page mentions it. Much of the
                machinery a student has to deal with is not in some other state — it is a metro ride away.
              </p>
              <div className="space-y-4 mb-6">
                {inDelhi.map((x) => (
                  <div key={x.body} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{x.body}</p>
                    <p className="text-av-orange text-xs font-semibold leading-relaxed mb-2">{x.where}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{x.why}</p>
                  </div>
                ))}
              </div>
              <p className={P}>
                The practical effect: a Dwarka student can get a computer number, sit the written papers, clear the medical and,
                if it ever comes to it, appeal a rejection in person — all without booking a train. The flying hours are the
                exception, and they are the reason a flying school sits outside the city.
              </p>

              <h2 id="what-we-teach" className={H2}>What is actually taught here</h2>
              <p className={P}>
                The {DGCA_PAPERS.length} DGCA written papers: {papersSummary()}. {RTR.note} Each paper carries its own{' '}
                {EXAM_RULES.theory.passMark}% threshold rather than an aggregate, so a strong paper does not carry a weak one.
              </p>
              <p className={P}>
                Being straight about the boundaries, because it is the thing most worth knowing before you choose any academy:{' '}
                {ACADEMY.scope}
              </p>
              <p className={P}>
                The syllabus for each paper, and the study material DGCA itself names, are on our{' '}
                <Link href="/commercial-pilot-license-syllabus" className={A}>syllabus page</Link>. Subject by subject:{' '}
                <Link href="/air-navigation" className={A}>Air Navigation</Link>,{' '}
                <Link href="/aviation-meteorology" className={A}>Aviation Meteorology</Link>,{' '}
                <Link href="/air-regulations" className={A}>Air Regulations</Link>,{' '}
                <Link href="/technical-general" className={A}>Technical General</Link> and{' '}
                <Link href="/rtr-a" className={A}>{RTR.name}</Link>.
              </p>

              <h2 id="order" className={H2}>The order to do things in, from Delhi</h2>
              <ol className="space-y-3 mb-6">
                {[
                  `Confirm the education gate. ${EDUCATION.requirement}. If you did not take both subjects, the bridge route adds time and belongs at the front of your plan.`,
                  `Book the medical at one of the Delhi or NCR centres. ${MED.classOrder.advice}`,
                  `Apply for a computer number — online, from age ${PARIKSHA.basics.minAge}, no medical certificate needed. Through DigiLocker it is allotted immediately; the manual route takes ${PARIKSHA.processing.days} working days.`,
                  `Start the written papers at ${inr(PARIKSHA.fees.regularPerPaper)} each, in any of the ${PARIKSHA.calendar2026.regular.length} regular sessions or ${PARIKSHA.calendar2026.olode.length} on-demand sessions a year.`,
                  'Fly the hours at a flying school. This is the part that happens outside Delhi, and the part with the real cost attached.',
                ].map((t, i) => (
                  <li key={t.slice(0, 30)} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{t}
                  </li>
                ))}
              </ol>
              <p className={P}>
                The full version, with the rule behind every stage, is on{' '}
                <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>our route guide</Link>, and every
                eligibility requirement is set out on{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>the CPL eligibility page</Link>. For Delhi more
                broadly rather than Dwarka specifically, see{' '}
                <Link href="/pilot-training-in-delhi" className={A}>pilot training in Delhi</Link>.
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
              <p className={P}>Read on {LAST_UPDATED}. Addresses and fees are DGCA&rsquo;s own; nothing about our classes is stated here that we cannot substantiate.</p>
              <ul className="space-y-2 mb-8">
                {articleSchema.citation.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <h3 className="font-montserrat text-lg font-bold text-white mb-2">Come and ask before you commit anywhere</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  We are at {ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode}. Bring a flying school quote,
                  or your Class 12 marksheet, or just the question you cannot get a straight answer to — that is the conversation
                  worth having, and it costs nothing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                    Talk to a counsellor
                  </Link>
                  <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </article>

          <aside className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Ask about Dwarka batches" /></ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">Find us</h4>
                <p className="text-white/90 text-sm leading-relaxed mb-3">{ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode}</p>
                <p className="text-white/90 text-sm font-semibold">{ACADEMY.phone}</p>
                <p className="text-white/70 text-xs mb-3">{ACADEMY.email}</p>
                <p className="text-white/70 text-xs">Running since {ACADEMY.foundedYear}</p>
                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                  Message on WhatsApp
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">DGCA medical centres in Delhi NCR</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  {NCR_CENTRES.map((c) => (<li key={c.name}>✓ {c.name} — {c.city}</li>))}
                </ul>
                <p className="text-white/50 text-xs mt-3">DGCA list as of {MED.centresAsOf}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Start here</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/commercial-pilot-license-eligibility" className={A}>Check your eligibility</Link></li>
                  <li><Link href="/dgca-class-2-class-1-medical" className={A}>The medical, explained</Link></li>
                  <li><Link href="/dgca-computer-number" className={A}>Get a computer number</Link></li>
                  <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                  <li><Link href="/cost-transparency" className={A}>What it costs</Link></li>
                  <li><Link href="/pilot-training-in-delhi" className={A}>Pilot training in Delhi</Link></li>
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
