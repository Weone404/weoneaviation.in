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
  ACADEMY, SRI_LANKA as SL, FOREIGN_LICENCE as FL, CPL_HOURS, DGCA_PAPERS,
  EXAM_RULES, PARIKSHA, MEDICAL_STANDARDS as MED, FTO, inr,
} from '../lib/facts';

/*
 * /pilot-training-in-sri-lanka — rewritten from nothing 2026-09-17.
 *
 * WHAT WAS HERE BEFORE, and why none of it survived. 2,141 rendered
 * characters carrying, in order: "DGCA-recognized" as a property of training
 * done abroad, "200+ flight hours" as a feature of our own programme, "expert
 * faculty", "affordable fees", "scholarships", "proven placement success",
 * "24/7 support", and "All training recognized by DGCA India for license
 * conversion". That last one is not marketing, it is wrong: DGCA does not
 * recognise foreign training, it issues an Indian licence on application, and
 * the application has named examinations attached to it. A student who
 * believed our sentence and budgeted accordingly would have been ambushed.
 *
 * It also addressed the wrong reader. It was written at Sri Lankan students
 * coming to us. The query it ranks for is Indians asking whether to train in
 * Sri Lanka. Both intents are served now, but the page answers the second.
 *
 * WHAT THE REWRITE IS BUILT ON. Two regulators, both read on 17 September 2026.
 * CAASL's own pages for who it lists as flying training organisations and what
 * a Sri Lankan CPL requires. And DGCA's CAR Section 7 Series 'G' Part I for
 * exactly what converting that licence into an Indian one takes — the two
 * written papers, the skill test in India, the radio certificate from the
 * Ministry of Communications, the currency rule on the foreign rating, and the
 * hours-shortfall rule. All of it renders from lib/facts.js, where the
 * provenance notes live.
 *
 * WHAT MUST NEVER COME BACK. Any suggestion that we operate, partner with,
 * represent or place students into a school in Sri Lanka. We do not, we earn
 * nothing if anyone goes, and the page says so in its own voice. No fee
 * figures for Sri Lankan training: none is published by a regulator and every
 * number in circulation is a blog quoting a blog. No Sri Lankan flying-hour
 * figure until CAASL Implementing Standard 72 Appendix 3 has actually been
 * read. No placement or scholarship claims, ever.
 */

const CANONICAL = 'https://weoneaviation.in/pilot-training-in-sri-lanka';
const LAST_UPDATED = '17 September 2026';

const peopleAlsoAsk = [
  {
    q: 'Can I become a pilot in India by training in Sri Lanka?',
    a: `You can train in Sri Lanka and you can be licensed there by the ${SL.regulator.name}, but that licence is a Sri Lankan licence. To fly commercially in India you then apply to DGCA for an Indian licence on the basis of it. For a Commercial Pilot Licence that application means two written papers with the Central Examination Organisation — Air Regulations, and a composite paper on Air Navigation and Aviation Meteorology — a skill test in India before a DGCA-approved examiner, a radio telephony certificate from the Ministry of Communications, and a Signals (Practical) examination. It is a real project, and it sits outside every training quote you will be shown.`,
  },
  {
    q: 'Is pilot training in Sri Lanka recognised by DGCA?',
    a: 'DGCA does not "recognise" foreign training as a category, and any page telling you it does is telling you something the regulation does not say. What DGCA does is issue an Indian licence on the basis of a licence issued by another Contracting State, against published requirements. Sri Lanka is a Contracting State, so the route exists. The route is not the same thing as recognition.',
  },
  {
    q: 'How many flying schools are there in Sri Lanka?',
    a: `${SL.regulator.short} lists ${SL.ftoList.names.length} flying training organisations on its current-status page, which was last updated ${SL.ftoList.asOf}, with a separate status document for each one dated ${SL.ftoList.statusDocsDated}. ${SL.ftoList.caution}`,
  },
  {
    q: 'Do the flying hours I do in Sri Lanka count in India?',
    a: `Your logged hours are your logged hours. What matters is the total against Schedule II of the Indian Aircraft Rules, 1937, which requires ${CPL_HOURS.total} hours for a Commercial Pilot Licence. ${FL.hoursShortfall}`,
  },
  {
    q: 'Does We One Aviation arrange pilot training in Sri Lanka?',
    a: `No. ${SL.forIndianStudents.whatWeDo}`,
  },
];

const faqs = [
  {
    q: 'Which authority issues a pilot licence in Sri Lanka?',
    a: `${SL.regulator.name}, ${SL.regulator.short}. ${SL.regulator.note}`,
  },
  {
    q: 'Which flying training organisations does CAASL list?',
    a: `As of ${SL.ftoList.asOf}: ${SL.ftoList.names.join(', ')}. ${SL.ftoList.caution}`,
  },
  {
    q: 'What does CAASL require for a Sri Lankan Commercial Pilot Licence?',
    a: `${SL.cplRequirements.items.join('; ')}. ${SL.cplRequirements.governedBy}`,
  },
  {
    q: 'Which DGCA examinations do I have to pass to convert a foreign CPL?',
    a: `${FL.examinations[0].papers.join(' and ')}. ${FL.examinations[0].note} An Airline Transport Pilot Licence conversion is ${FL.examinations[1].papers.join(' and ')}, plus an oral examination.`,
  },
  {
    q: 'What is the radio licence step people forget?',
    a: `${FL.radioTelephony.join('. ')}. ${FL.radioNote}`,
  },
  {
    q: 'What does DGCA mean by a "current" rating on a foreign licence?',
    a: `${FL.currency.definition.join(', or ')}. ${FL.currency.where}`,
  },
  {
    q: 'What happens if my foreign rating is not current when I apply?',
    a: `${FL.currency.ifNotCurrent.join(', and ')}. ${FL.currency.ifNotCurrentNote}`,
  },
  {
    q: 'Can I do the DGCA papers before I leave for Sri Lanka?',
    a: `For a conversion you need the two conversion papers rather than the full Indian paper set, and the computer number application needs no medical certificate and no flying school, so the registration step can be done from here. Watch the validity: ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl}`,
  },
  {
    q: 'What will the DGCA examination cost me?',
    a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} on demand, paid to the government through Bharatkosh. That is DGCA's fee and it has nothing to do with where you trained.`,
  },
  {
    q: 'Which medical do I need, the Sri Lankan one or the Indian one?',
    a: `Both, for their own purposes. CAASL requires its own Class 1 medical certificate for a Sri Lankan CPL. An Indian licence requires the Indian medical assessment of the appropriate class — ${MED.classes[0].validity} An Indian Class 1 is worth taking before you commit money anywhere, in any country.`,
  },
  {
    q: 'Is a Sri Lankan licence valid forever?',
    a: SL.cplRequirements.licenceValidity,
  },
  {
    q: 'What does DGCA do if the documents do not check out?',
    a: `${FL.verification} ${FL.falseDocuments}`,
  },
  {
    q: 'What does the conversion cost, and how long does it take?',
    a: `We do not publish either, because neither is honestly available. ${FL.fees} The timetable depends on examination sessions and examiner availability, and no authority publishes an expected duration. Any page quoting you a confident conversion cost and timeline has made both up.`,
  },
  {
    q: 'Is training abroad better than training in India?',
    a: `It is usually a throughput argument rather than a quality argument, and throughput is testable in India before you buy a ticket. DGCA lists ${FTO.count} approved flying training organisations as on ${FTO.listAsOf} and publishes a ranking of them in which ${FTO.ranking.parameters[0].name} carries ${FTO.ranking.parameters[0].weight}%. Read that first.`,
  },
  {
    q: 'Does We One Aviation have a partner school in Sri Lanka?',
    a: `No. ${ACADEMY.scope}`,
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training in Sri Lanka: The Licence, and What DGCA Then Requires',
  description:
    'Who regulates flying training in Sri Lanka, which organisations CAASL lists, what a Sri Lankan CPL requires, and exactly what DGCA requires to turn that licence into an Indian one — the two written papers, the skill test in India, the radio certificate, the currency rule and the hours-shortfall rule.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-17',
  articleSection: 'Pilot training abroad',
  keywords:
    'pilot training in sri lanka, cpl in sri lanka, flying school sri lanka, caasl, sri lanka pilot licence, foreign licence conversion dgca, convert cpl to dgca, pilot training abroad for indian students',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization',
    name: ACADEMY.name,
    url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [...FL.sources, ...SL.sources].map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const H3 = 'font-montserrat text-lg font-bold text-av-blue mb-2 mt-6';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

const contents = [
  ['regulator', 'Who regulates flying training in Sri Lanka'],
  ['schools', 'The organisations CAASL lists'],
  ['sl-cpl', 'What a Sri Lankan CPL requires'],
  ['conversion', 'Turning it into an Indian licence'],
  ['currency', 'The currency rule on your foreign rating'],
  ['hours', 'The hours question, answered from the Indian side'],
  ['unchanged', 'What stays the same wherever you train'],
  ['ask', 'What to ask before you pay anyone'],
  ['us', 'What we do, and what we do not'],
  ['faqs', 'Frequently asked questions'],
  ['sources', 'Sources'],
];

export default function PilotTrainingSriLanka() {
  return (
    <Layout
      title="Pilot Training in Sri Lanka: The Licence and the DGCA Conversion"
      description="Who regulates flying training in Sri Lanka, which organisations CAASL lists, and exactly what DGCA requires to turn a Sri Lankan licence into an Indian one. Every requirement cited."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Training outside India</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Pilot Training in Sri Lanka
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            The licence you finish with is Sri Lankan. This page is about what it takes to turn it into an Indian one
            — because that is the part the brochures leave out.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                CAASL pages and the DGCA conversion CAR read on {LAST_UPDATED}.{' '}
                <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="The five things that decide this"
                items={[
                  `${SL.regulator.short} issues the licence in Sri Lanka. DGCA issues licences in India. They are different licences`,
                  'Converting a foreign CPL means two DGCA written papers, a skill test in India, a radio certificate from the Ministry of Communications and a Signals (Practical) examination',
                  'Your foreign rating has to be current, and the flying that makes it current has to be done in the country that issued the licence',
                  `${CPL_HOURS.total} hours is the Indian requirement and it does not move. A shortfall is completed in the issuing State or in India`,
                  'No conversion cost or timeline is published by anyone. Treat a page that quotes you one as fiction',
                ]}
              />

              <div className="border border-gray-200 rounded-xl p-5 mt-8">
                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                  {contents.map(([id, label]) => (
                    <li key={id} className="text-gray-600"><a href={`#${id}`} className={A}>{label}</a></li>
                  ))}
                </ol>
              </div>

              {/* Regulator */}
              <h2 id="regulator" className={H2}>Who regulates flying training in Sri Lanka</h2>
              <p className={P}>{SL.regulator.note}</p>
              <p className={P}>
                That sounds obvious and it is where most of the confusion starts. A school in Colombo is regulated by
                Colombo, not by Delhi. Nothing it does can make its graduates Indian licence holders, and nothing it
                promises about DGCA is within its power to promise. What it can do is train you to a standard CAASL
                accepts, and CAASL can license you. What happens after that is between you and DGCA.
              </p>

              {/* Schools */}
              <h2 id="schools" className={H2}>The organisations CAASL lists</h2>
              <p className={P}>
                CAASL publishes a page titled &ldquo;Current Status of Flying Training Organizations&rdquo;. It was last
                updated on {SL.ftoList.asOf} and names {SL.ftoList.names.length} organisations, each linked to its own
                status document dated {SL.ftoList.statusDocsDated}.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th className={TH}>#</th>
                      <th className={TH}>Organisation, as CAASL names it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SL.ftoList.names.map((n, i) => (
                      <tr key={n} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                        <td className="p-3 text-gray-500 align-top w-10">{i + 1}</td>
                        <td className="p-3 text-gray-700 font-semibold align-top">{n}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">Read the status document, not the list</p>
                <p className="text-gray-600 text-sm leading-relaxed">{SL.ftoList.caution}</p>
              </div>
              <p className={P}>
                We have no relationship with any of them, we are not comparing them, and we will not tell you which to
                pick. The list is here so you can start from the regulator&rsquo;s page instead of an advertisement.
              </p>

              {/* Sri Lankan CPL */}
              <h2 id="sl-cpl" className={H2}>What a Sri Lankan CPL requires</h2>
              <p className={P}>
                CAASL publishes its own requirements. This is that list as it stood on {SL.cplRequirements.asOf}.
              </p>
              <ul className="space-y-1.5 mb-4">
                {SL.cplRequirements.items.map((i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{i}
                  </li>
                ))}
              </ul>
              <p className={P}>{SL.cplRequirements.governedBy} {SL.cplRequirements.process}</p>
              <p className={P}>
                <span className="font-semibold text-av-blue">One structural difference worth knowing.</span>{' '}
                {SL.cplRequirements.licenceValidity}
              </p>
              <p className={P}>{SL.cplRequirements.hoursNote}</p>

              {/* Conversion */}
              <h2 id="conversion" className={H2}>Turning it into an Indian licence</h2>
              <p className={P}>
                This is the section the page exists for. The requirements come from {FL.car.citation} —{' '}
                {FL.car.title} — issued under {FL.car.issuedUnder}
              </p>
              <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-5 mb-5">
                <p className="text-gray-700 text-sm leading-relaxed">{FL.why}</p>
              </div>

              <h3 className={H3}>First, the general bar</h3>
              <ul className="space-y-1.5 mb-4">
                {FL.general.map((g) => (
                  <li key={g} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{g}
                  </li>
                ))}
              </ul>

              <h3 className={H3}>Then the examinations, by licence</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th className={TH}>Converting</th>
                      <th className={TH}>What you sit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FL.examinations.map((e, i) => (
                      <tr key={e.licence} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                        <td className="p-3 text-gray-700 font-semibold align-top">{e.licence}</td>
                        <td className="p-3 text-gray-600 align-top">
                          {e.papers.join('; ')}. <span className="text-gray-500">{e.note}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Note what the first row does not say. A Commercial Pilot Licence conversion is two papers, not the full
                Indian paper set of {DGCA_PAPERS.length}. That is a real and material difference, and it is one of the
                few genuine advantages of holding a foreign licence — which makes it all the more worth stating
                accurately rather than burying under &ldquo;DGCA recognised&rdquo;.
              </p>

              <h3 className={H3}>Then the skill test</h3>
              <p className={P}>{FL.skillTest}</p>

              <h3 className={H3}>Then the radio certificate, which is a separate ministry</h3>
              <ul className="space-y-1.5 mb-4">
                {FL.radioTelephony.map((r) => (
                  <li key={r} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{r}
                  </li>
                ))}
              </ul>
              <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">{FL.radioNote}</p>
              </div>

              <h3 className={H3}>And the paperwork rules nobody mentions</h3>
              <p className={P}>{FL.verification}</p>
              <p className={P}>{FL.falseDocuments}</p>
              <p className={P}>{FL.applyTo} {FL.fees}</p>

              {/* Currency */}
              <h2 id="currency" className={H2}>The currency rule on your foreign rating</h2>
              <p className={P}>{FL.currency.rule} DGCA defines current as one of two things:</p>
              <ul className="space-y-1.5 mb-4">
                {FL.currency.definition.map((d) => (
                  <li key={d} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>{d}
                  </li>
                ))}
              </ul>
              <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">This one catches people</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{FL.currency.where}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  So finishing the course, flying home and then spending a year on the DGCA papers can leave the rating
                  stale by the time you apply. If it is not current, the CAR sends you down a longer road:{' '}
                  {FL.currency.ifNotCurrent.join(', and ')}. {FL.currency.ifNotCurrentNote}
                </p>
              </div>
              <p className={P}>
                The practical consequence is a sequencing decision, and it is the single most valuable thing on this
                page: plan the Indian steps around the 24-month window on the rating, not the other way round.
              </p>

              {/* Hours */}
              <h2 id="hours" className={H2}>The hours question, answered from the Indian side</h2>
              <p className={P}>
                Schedule II of the Aircraft Rules, 1937 requires {CPL_HOURS.total} hours for a Commercial Pilot Licence,
                broken down as follows.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th className={TH}>Requirement</th>
                      <th className={TH}>Hours</th>
                      <th className={TH}>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CPL_HOURS.components.map((c, i) => (
                      <tr key={c.label} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                        <td className="p-3 text-gray-700 font-semibold align-top">{c.label}</td>
                        <td className="p-3 text-gray-700 align-top whitespace-nowrap">{c.hours}</td>
                        <td className="p-3 text-gray-600 align-top">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">{FL.hoursShortfall}</p>
              </div>
              <p className={P}>
                Which is why the right question to a school abroad is never &ldquo;how many hours do I get&rdquo; but
                &ldquo;how many hours against Schedule II, and where do I fly the balance&rdquo;. A quote built to
                another country&rsquo;s minimum is a quote with a second invoice hiding behind it.
              </p>

              {/* Unchanged */}
              <h2 id="unchanged" className={H2}>What stays the same wherever you train</h2>
              <p className={P}>
                Four things do not care which country you fly in, and all four can be started from Delhi before you go
                anywhere.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-montserrat font-bold text-av-blue text-sm mb-1">The computer number</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    No medical certificate and no flying school needed. It is the registration that lets you sit the
                    examinations at all.{' '}
                    <Link href="/dgca-computer-number" className={A}>How it works</Link>.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-montserrat font-bold text-av-blue text-sm mb-1">The written examinations</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session,{' '}
                    {inr(PARIKSHA.fees.olodePerPaper)} on demand, {EXAM_RULES.theory.passMark}% to pass.{' '}
                    <Link href="/dgca-pariksha" className={A}>Papers and fees</Link>.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-montserrat font-bold text-av-blue text-sm mb-1">The Indian medical</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A Sri Lankan Class 1 is a Sri Lankan Class 1. The Indian licence needs the Indian assessment.{' '}
                    <Link href="/dgca-class-2-class-1-medical" className={A}>Classes, validity and centres</Link>.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-montserrat font-bold text-av-blue text-sm mb-1">The radio licence</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A certificate from the Ministry of Communications, then the DGCA licence on that basis.{' '}
                    <Link href="/rtr-a" className={A}>What RTR involves</Link>.
                  </p>
                </div>
              </div>
              <p className={P}>
                There is also a prior question worth asking honestly before any of this:{' '}
                <Link href="/pilot-training-abroad" className={A}>whether to train abroad at all</Link>. DGCA lists{' '}
                {FTO.count} approved flying training organisations in India as on {FTO.listAsOf} and ranks them on
                published parameters, so the throughput argument for going abroad is testable from your desk.
              </p>

              {/* Ask */}
              <h2 id="ask" className={H2}>What to ask before you pay anyone</h2>
              <p className={P}>{SL.forIndianStudents.theRealQuestion}</p>
              <ol className="space-y-2 mb-4 list-decimal list-inside">
                {SL.forIndianStudents.whatToAsk.map((q) => (
                  <li key={q} className="text-sm text-gray-600 leading-relaxed">{q}</li>
                ))}
              </ol>
              <p className={P}>
                Two quotes are only comparable once both have answered all eight. A lower headline number with the
                instrument rating billed separately, the hours set to another country&rsquo;s minimum and the conversion
                steps left out entirely is not a lower number.
              </p>

              {/* Us */}
              <h2 id="us" className={H2}>What we do, and what we do not</h2>
              <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{SL.forIndianStudents.whatWeDo}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{ACADEMY.scope}</p>
              </div>
              <p className={P}>
                An earlier version of this page said the opposite in several places, in the usual vocabulary: training
                described as recognised for conversion, career outcomes we are in no position to promise, and financial
                help nobody could confirm. None of it was sourced and the first of them was simply wrong about what the
                regulation says, so all of it is gone. If you were here before and planned around it, the conversion
                section above is what you actually needed to read.
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
              <p className={P}>
                Read on {LAST_UPDATED}. {FL.car.provenanceNote}
              </p>
              <ul className="space-y-2 mb-8">
                {articleSchema.citation.map((c) => (
                  <li key={c.name} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-8">
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Deciding between India and abroad?</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  The counselling is free and it is end to end. We have nothing to sell you in Sri Lanka and no
                  commission riding on the answer, which is precisely why the conversation is worth having before you
                  pay a deposit rather than after.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/pilot-career-counselling" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                    Free career counselling
                  </Link>
                  <Link href="/pilot-training-abroad" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                    Training abroad, generally
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </article>
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <LeadForm title="Ask About Training Abroad" />
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">The conversion, in short</h4>
                <p className="text-white/90 text-sm font-semibold">CPL</p>
                <p className="text-white/70 text-xs mb-3">Air Regulations + a composite Navigation and Meteorology paper</p>
                <p className="text-white/90 text-sm font-semibold">ATPL</p>
                <p className="text-white/70 text-xs mb-3">Air Regulations + a composite ATPL paper, and an oral</p>
                <p className="text-white/90 text-sm font-semibold">Both</p>
                <p className="text-white/70 text-xs">Skill test in India, radio certificate, Signals (Practical)</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Next steps</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/pilot-training-abroad" className={A}>Pilot training abroad</Link></li>
                  <li><Link href="/pilot-training-in-india" className={A}>Pilot training in India</Link></li>
                  <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                  <li><Link href="/dgca-pariksha" className={A}>DGCA Pariksha: papers and fees</Link></li>
                  <li><Link href="/dgca-class-2-class-1-medical" className={A}>DGCA Class 1 and Class 2 medical</Link></li>
                  <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
