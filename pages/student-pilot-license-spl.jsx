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
  LICENCES, EDUCATION, MEDICAL_STANDARDS as MED, EXAM_RULES, PARIKSHA,
  DGCA_PAPERS, RTR, CPL_HOURS, inr, ACADEMY,
} from '../lib/facts';

/*
 * /student-pilot-license-spl
 *
 * HISTORY. Rewritten in August 2026 from a stub that described a "Sport Pilot
 * License" — light-sport aircraft, "no complex DGCA medicals", a fee band
 * mislabelled as a salary. Sport Pilot is a United States FAA category with no
 * Indian equivalent, so the page sold a licence DGCA does not issue on a URL
 * naming a different one. That correction stands and is restated below,
 * because it is still the most common error on this topic.
 *
 * DEEPENED 2026-09-15. Two things the August version could not say, because
 * the sources had not been found yet:
 *
 *   The medical. It said "a DGCA medical certificate is part of entering
 *   training", which was as far as the evidence went at the time. The medical
 *   CAR has since been read: an SPL requires a CLASS 2, and the page now names
 *   it, with its validity and where DGCA says it is conducted.
 *
 *   The examination. An SPL involves an ORAL examination with a pass mark of
 *   50% — CAR Section 7, Series 'B', Part I, Rev. 2 of 13 February 2019, para
 *   5.7(a). That figure appears on essentially no competitor page, and
 *   "student pilot license exam questions" is one of the highest-volume
 *   queries in this market. It is the reason this rebuild was prioritised.
 *
 * Everything renders from lib/facts.js. Do not retype a figure into this file.
 */

const LAST_UPDATED = '15 September 2026';
const LAST_UPDATED_ISO = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/student-pilot-license-spl';

const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');
const CPL = LICENCES.find((l) => l.code === 'CPL');
const SPL_ORAL = EXAM_RULES.oral.find((o) => o.licence.startsWith('SPL'));
const CLASS2 = MED.classes[1];

const licenceLadder = LICENCES.map((l) => ({
  licence: `${l.code} — ${l.name}`,
  age: `${l.minAge} years`,
  section: l.section,
  what: l.permits,
}));

const peopleAlsoAsk = [
  {
    q: 'What does SPL stand for in Indian aviation?',
    a: 'Student Pilot Licence. It is the first licence in the DGCA chain, issued under Schedule II, Section B of the Aircraft Rules, 1937. If you have read about a "Sport Pilot Licence", that is a United States FAA category and it does not exist under Indian rules.',
  },
  {
    q: 'What is the pass mark for the SPL examination?',
    a: `${SPL_ORAL.passMark}%. The SPL is assessed by oral examination, and the threshold is set by ${EXAM_RULES.car.citation}, ${SPL_ORAL.clause}. It is worth knowing that this is lower than the ${EXAM_RULES.theory.passMark}% required in each of the written papers later on, and lower than the ${EXAM_RULES.oral.find((o) => o.licence.startsWith('ATPL')).passMark}% required in the ATPL oral.`,
  },
  {
    q: 'Which medical do I need for a Student Pilot Licence?',
    a: `A ${CLASS2.cls}. ${CLASS2.licences[2]} sits in the Class 2 list. ${CLASS2.validity} A Class 1 is not required for the SPL — that is what the Commercial Pilot Licence needs.`,
  },
  {
    q: 'How old do you have to be to get an SPL in India?',
    a: `${SPL.minAge}. That is the earliest point at which a licence can be held. You can start clearing DGCA written papers even earlier in practice, because a computer number can be applied for from age ${PARIKSHA.basics.minAge}.`,
  },
  {
    q: 'Can I fly solo on a Student Pilot Licence?',
    a: `Yes. ${SPL.permits}`,
  },
  {
    q: 'Do I need 10+2 with Physics and Maths for an SPL?',
    a: `The 10+2 with Physics and Mathematics requirement — ${EDUCATION.clause} — attaches to the Commercial Pilot Licence, not to the Student Pilot Licence. For the DGCA examination side, a computer number for the PPL category is based on the Class 10 requirement, while every other flight crew category needs the 10+2 with Physics and Mathematics. If a CPL is your destination, you need those subjects eventually, so treat them as a requirement from day one.`,
  },
];

const faqs = [
  { q: 'Is SPL the same as a Sport Pilot Licence?', a: 'No, and this is the most common error on the subject. SPL in India is the Student Pilot Licence under Schedule II, Section B of the Aircraft Rules, 1937. Sport Pilot is a United States FAA certificate category. DGCA does not issue one.' },
  { q: 'What does a Student Pilot Licence actually permit?', a: `${SPL.permits}` },
  { q: 'What is the minimum age for an SPL?', a: `${SPL.minAge} years, under the Aircraft Rules, 1937, Schedule II, ${SPL.section}.` },
  { q: 'Is there an upper age limit?', a: `Not on the DGCA examination side — ${PARIKSHA.basics.maxAgeNote} What varies with age is how long a medical assessment stays valid.` },
  { q: 'How is the SPL examination conducted?', a: `As an oral examination, with a pass mark of ${SPL_ORAL.passMark}% set by ${EXAM_RULES.car.citation}, ${SPL_ORAL.clause}. This is separate from the ${DGCA_PAPERS.length} written papers that a Commercial Pilot Licence requires later, which are computer-based and carry a ${EXAM_RULES.theory.passMark}% threshold each.` },
  { q: 'Which medical certificate does an SPL need?', a: `A ${CLASS2.cls}, valid ${CLASS2.validity.toLowerCase()} It is conducted by ${CLASS2.conductedBy.toLowerCase()}` },
  { q: 'Where can I get the medical done?', a: `DGCA publishes a list of approved centres — ${MED.centres.boardingCentres.length + MED.centres.civil.length} of them as of ${MED.centresAsOf}, four in Delhi and the NCR. ${MED.centres.listNote}` },
  { q: 'What comes after an SPL?', a: `A Private Pilot Licence at ${PPL.minAge}, then a Commercial Pilot Licence at ${CPL.minAge}. The CPL is the one that permits flying for payment, and it requires ${CPL_HOURS.total} hours of flying, ${DGCA_PAPERS.length} written papers and ${RTR.name}.` },
  { q: 'Do I need a computer number for the SPL?', a: `The computer number is the identity used for DGCA flight crew examinations, and it can be applied for from age ${PARIKSHA.basics.minAge}. Getting it early is sensible: on the DigiLocker route it is allotted immediately, and on the manual route it takes ${PARIKSHA.processing.days} working days.` },
  { q: 'What does the SPL stage cost?', a: `DGCA's own examination fees are ${inr(PARIKSHA.fees.regularPerPaper)} per written paper in a regular session, and ${inr(PARIKSHA.fees.oralPerPaper)} for an oral paper on the second and third attempt. Flying school charges, the medical and training itself are set by the school and the medical centre, not by DGCA.` },
];

const splCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Student Pilot Licence (SPL) in India: Age, Medical, Examination and What It Permits',
  description: 'SPL is the Student Pilot Licence, the first licence DGCA issues — minimum age 16 under Schedule II Section B, a Class 2 medical, and an oral examination with a 50% pass mark.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Pilot licences',
  keywords: 'student pilot licence, spl full form, spl licence india, student pilot license exam questions, spl eligibility, spl medical, spl age limit',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { name: 'Aircraft Rules, 1937, Schedule II, Section B — the Student Pilot Licence and its minimum age', url: 'https://www.indiacode.nic.in/handle/123456789/1362' },
    { name: `${EXAM_RULES.car.citation} — oral examination pass marks`, url: EXAM_RULES.car.where },
    { name: `${MED.car.citation} — the Class 2 medical`, url: MED.sources[2].url },
    { name: MED.sources[3].label, url: MED.sources[3].url },
    { name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
  ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white text-left';
const TD = 'px-4 py-3 align-top text-sm text-gray-600 border-b border-gray-100';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function StudentPilotLicence() {
  return (
    <Layout
      title="Student Pilot Licence (SPL) India: Age 16, Medical, Exam"
      description="SPL is the Student Pilot Licence — minimum age 16 under Schedule II Section B, a Class 2 medical, and an oral exam with a 50% pass mark. What it permits and what it does not."
    >
      <StructuredData data={[splCourseSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Student Pilot Licence</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Student Pilot Licence (SPL) in India
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            The first licence in the chain, the earliest point at which you can formally begin, and the one stage almost every
            guide describes vaguely.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              <p className="text-xs text-gray-500 mb-5">
                Checked against the Aircraft Rules, the DGCA examination and medical CARs and the Pariksha portal on {LAST_UPDATED}.
                Every figure is <a href="#sources" className={A}>sourced below</a>.
              </p>

              <QuickAnswer
                question="What is an SPL, and what does a Student Pilot Licence allow?"
                answer={`SPL stands for Student Pilot Licence — the first licence the DGCA issues. Schedule II, Section B of the Aircraft Rules, 1937 sets a minimum age of ${SPL.minAge}. It requires a ${CLASS2.cls} medical and is assessed by an oral examination with a ${SPL_ORAL.passMark}% pass mark. It permits flight training including solo flying under instructor authorisation, but never carrying passengers and never flying for payment.`}
              />

              <SummaryBox
                title="SPL at a glance"
                items={[
                  'Full form: Student Pilot Licence — not Sport Pilot, which is a United States FAA category with no Indian equivalent',
                  `Minimum age: ${SPL.minAge} (Aircraft Rules, 1937, Schedule II, ${SPL.section})`,
                  `Medical: ${CLASS2.cls}, valid ${CLASS2.validity.toLowerCase()}`,
                  `Examination: oral, pass mark ${SPL_ORAL.passMark}% (${EXAM_RULES.car.citation}, ${SPL_ORAL.clause})`,
                  `Permits: ${SPL.permits}`,
                  `Next: a Private Pilot Licence at ${PPL.minAge}, then a Commercial Pilot Licence at ${CPL.minAge}`,
                  `Computer number for DGCA examinations: available from age ${PARIKSHA.basics.minAge}`,
                ]}
              />

              <h2 id="what-it-is" className={H2}>What an SPL is, and the name that confuses everyone</h2>
              <p className={P}>
                The Student Pilot Licence is the first of four licences in the Indian chain. It is what makes you a student pilot in
                the regulator&rsquo;s eyes rather than a passenger sitting in the left seat, and it is the licence that allows an
                instructor to authorise your first solo flight.
              </p>
              <p className={P}>
                Before anything else, the disambiguation. Search &ldquo;SPL&rdquo; and a large share of the results describe a
                <em> Sport</em> Pilot Licence — light-sport aircraft, simplified medical requirements, lower hour counts. That is a
                United States FAA certificate category. DGCA does not issue it, no Indian rule creates it, and a page telling you
                otherwise is describing a licence you cannot obtain here.
              </p>

              <h2 id="ladder" className={H2}>Where the SPL sits in the licence chain</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr><th className={TH}>Licence</th><th className={TH}>Minimum age</th><th className={TH}>Schedule II</th><th className={TH}>What it permits</th></tr>
                  </thead>
                  <tbody>
                    {licenceLadder.map((r) => (
                      <tr key={r.licence} className={r.licence.startsWith('SPL') ? 'bg-av-light' : ''}>
                        <td className={`${TD} font-semibold text-av-blue`}>{r.licence}</td>
                        <td className={TD}>{r.age}</td>
                        <td className={TD}>{r.section}</td>
                        <td className={TD}>{r.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Reading that table is the fastest way to understand the whole career. Each rung is a separate licence with its own
                minimum age, and the SPL is the only one you can hold at {SPL.minAge}. The gap between the SPL and the CPL is{' '}
                {CPL.minAge - SPL.minAge} years, which is time most students can be using rather than waiting through.
              </p>

              <h2 id="medical" className={H2}>The medical: Class 2, not Class 1</h2>
              <p className={P}>
                This is where most SPL pages stop at &ldquo;a DGCA medical is required&rdquo;. The class matters, because the two
                are different examinations with different validity and different consequences.
              </p>
              <div className="rounded-2xl border-2 border-av-orange p-5 mb-4">
                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">{CLASS2.cls} — what the SPL requires</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-2"><span className="font-semibold text-av-blue">Valid for:</span> {CLASS2.validity}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-2"><span className="font-semibold text-av-blue">Conducted by:</span> {CLASS2.conductedBy}</p>
                <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold text-av-blue">Also covers:</span> the Private Pilot Licence, microlight licences and Flight Radio Telephone Operator Licences.</p>
              </div>
              <p className={P}>
                A Class 1 is what the Commercial Pilot Licence requires, and it is the stricter of the two. Here is the part worth
                acting on: {MED.classOrder.advice}
              </p>
              <p className={P}>
                The examination covers {MED.examination.groups.join(', ').toLowerCase()}. {MED.examination.note} The full picture,
                including DGCA&rsquo;s list of {MED.centres.boardingCentres.length + MED.centres.civil.length} approved centres, is on our{' '}
                <Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical guide</Link>.
              </p>

              <h2 id="exam" className={H2}>The SPL examination, and its pass mark</h2>
              <p className={P}>
                The SPL is assessed by an <strong>oral examination</strong>, and the threshold is published: a candidate needs{' '}
                <strong>{SPL_ORAL.passMark}%</strong>, under {EXAM_RULES.car.citation}, {SPL_ORAL.clause}.
              </p>
              <p className={P}>
                That figure is worth holding onto, because almost nothing written about student pilot examinations states it, and
                because it puts the rest of the journey in proportion. The oral thresholds are not all the same, and neither is the
                written one.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr><th className={TH}>Examination</th><th className={TH}>Pass mark</th><th className={TH}>Clause</th></tr>
                  </thead>
                  <tbody>
                    {EXAM_RULES.oral.map((o) => (
                      <tr key={o.licence} className={o.licence.startsWith('SPL') ? 'bg-av-light' : ''}>
                        <td className={`${TD} font-semibold text-av-blue`}>{o.licence} — oral</td>
                        <td className={TD}>{o.passMark}%</td>
                        <td className={TD}>{o.clause}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className={`${TD} font-semibold text-av-blue`}>Written papers, each subject</td>
                      <td className={TD}>{EXAM_RULES.theory.passMark}%</td>
                      <td className={TD}>{EXAM_RULES.theory.clause}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={P}>
                The written papers are a separate track entirely. They are the {DGCA_PAPERS.length} DGCA subjects a Commercial Pilot
                Licence requires — {DGCA_PAPERS.join(', ')} — each needing {EXAM_RULES.theory.passMark}% on its own, booked on the
                Pariksha portal against a computer number. {EXAM_RULES.theory.perSubject}
              </p>

              <h2 id="start-early" className={H2}>What you can start before you turn {SPL.minAge}</h2>
              <p className={P}>
                The most useful thing on this page for a school student: almost none of the DGCA examination machinery waits for an
                age gate the way the licence does.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  `A computer number can be applied for from age ${PARIKSHA.basics.minAge} — the same age as the SPL itself — and it needs no flying school, no logbook and no medical certificate.`,
                  `Written papers can be cleared as soon as you hold that number, at ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session.`,
                  `${EDUCATION.requirement} is the education gate for a CPL, so if you are still choosing subjects at school, choose those two.`,
                  `A pass in a written paper counts for five years towards a CPL or ATPL, so clearing papers very early is not free — ${EXAM_RULES.paperValidity.planningNote.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.planningNote.slice(1)}`,
                ].map((t) => (
                  <li key={t.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600"><span className="text-av-orange font-bold flex-shrink-0">→</span>{t}</li>
                ))}
              </ul>

              <h2 id="after" className={H2}>What comes after the SPL</h2>
              <p className={P}>
                A Private Pilot Licence at {PPL.minAge}, which still does not permit flying for payment, and then the Commercial
                Pilot Licence at {CPL.minAge}, which does. The CPL is the one with the substantial requirements attached:{' '}
                {CPL_HOURS.total} hours of flying inside the {CPL_HOURS.recencyYears} years before you apply,{' '}
                {DGCA_PAPERS.length} written papers, {RTR.name} examined separately, and a Class 1 medical.
              </p>
              <p className={P}>
                Our <Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility guide</Link> sets out all five
                requirements with the rule behind each, and{' '}
                <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>the full route</Link> shows the order to do
                them in and which stages can run in parallel.
              </p>

              <PeopleAlsoAsk items={peopleAlsoAsk} />

              <section className="mt-10">
                <h2 id="faqs" className={H2}>Student Pilot Licence: frequently asked questions</h2>
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
              <p className={P}>Read on {LAST_UPDATED}. Where a figure could not be traced to one of these, it is not on this page.</p>
              <ul className="space-y-2 mb-8">
                {splCourseSchema.citation.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <p className="text-white/80 text-sm leading-relaxed mb-3">{ACADEMY.scope}</p>
                <p className="text-white/60 text-xs leading-relaxed mb-4">
                  If you are {SPL.minAge} or close to it, the two things worth doing now are the medical and the computer number.
                  Both are cheap, both are yours to keep, and both remove a dependency from everything that follows.
                </p>
                <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                  Talk to a counsellor
                </Link>
              </div>
            </ScrollReveal>
          </article>

          <aside className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Ask about the SPL route" /></ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">SPL in four numbers</h4>
                <p className="text-white/90 text-sm font-semibold">{SPL.minAge}</p>
                <p className="text-white/70 text-xs mb-3">minimum age</p>
                <p className="text-white/90 text-sm font-semibold">{SPL_ORAL.passMark}%</p>
                <p className="text-white/70 text-xs mb-3">oral examination pass mark</p>
                <p className="text-white/90 text-sm font-semibold">{CLASS2.cls}</p>
                <p className="text-white/70 text-xs mb-3">the medical it requires</p>
                <p className="text-white/90 text-sm font-semibold">{CPL.minAge - SPL.minAge} years</p>
                <p className="text-white/70 text-xs">from an SPL to a CPL by age alone</p>
                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                  Ask a question
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Next steps</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical</Link></li>
                  <li><Link href="/dgca-computer-number" className={A}>Get a computer number</Link></li>
                  <li><Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link></li>
                  <li><Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>The full route</Link></li>
                  <li><Link href="/ppl-full-form" className={A}>Private Pilot Licence</Link></li>
                  <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
