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
  ACADEMY, AVIATION_CAREERS, PARIKSHA, EXAM_RULES, DGCA_PAPERS, CPL_HOURS,
  EDUCATION, MIN_AGE, CPL_COST, PILOT_SUPPLY, inr,
} from '../lib/facts';

/*
 * /ame-aircraft-maintenance-engineer — new 2026-09-16.
 *
 * WHY IT EXISTS. AME carries roughly 27,100 monthly searches and the site
 * covered it in one section of /blogs/aviation-jobs-besides-pilot. It is the
 * largest sourceable gap left after the 50-keyword list was closed, and the
 * competitor who owns this territory (VFTI) ranks first for the bare term.
 *
 * WHY IT IS HONEST FOR US TO PUBLISH. We do not train AMEs and this page says
 * so plainly. What it offers instead is the thing a 17-year-old choosing
 * between the two routes actually needs and cannot easily get: the DGCA
 * requirements for both, side by side, from the same regulator's own documents,
 * with the subject difference that decides eligibility stated explicitly.
 *
 * THE FACT THAT CARRIES THE PAGE. An AME candidate needs Physics, CHEMISTRY and
 * Mathematics. A pilot needs Physics and Mathematics. DGCA states both
 * requirements side by side in its own rejection-reasons document for computer
 * numbers. A student who dropped Chemistry has closed the AME door and not the
 * pilot one, and almost nobody tells them that before they choose subjects.
 *
 * WHAT IS DELIBERATELY NOT HERE. AME course fees at private institutes, salary
 * figures, placement claims, and the number of AME institutes. None is
 * sourceable, and the salary rules that govern the rest of this site apply here
 * too. The DGCA examination fees below ARE sourced and are the regulator's own.
 *
 * SOURCE for everything on this page: lib/facts.js AVIATION_CAREERS, read from
 * DGCA Pariksha's AME FAQ and its rejection-reasons document on 15 Sep 2026.
 */

const AME = AVIATION_CAREERS.licensed[0];
const LAST_UPDATED = '16 September 2026';
const CANONICAL = 'https://weoneaviation.in/ame-aircraft-maintenance-engineer';

const sameAsPilot = [
  { what: 'The portal', detail: `AME candidates register and book on the same DGCA Pariksha portal as pilots, through the same Central Examination Organisation.` },
  { what: 'The computer number', detail: `The same prerequisite. Nothing can be booked without one, and it is a separate online application rather than part of the exam booking.` },
  { what: 'Government fees, not institute fees', detail: `${inr(AME.examFeeRegular)} per module in a regular session and ${inr(AME.examFeeOlode)} in an Online On-Demand Examination, paid to the government. Compare that with ${inr(PARIKSHA.fees.regularPerPaper)} and ${inr(PARIKSHA.fees.olodePerPaper)} for a pilot paper.` },
  { what: 'A minimum age, and no maximum', detail: `${AME.minAge} to register. ${AME.maxAge}` },
];

const differences = [
  { aspect: 'School subjects required', ame: AME.education, pilot: EDUCATION.requirement },
  { aspect: 'Minimum age', ame: `${AME.minAge}`, pilot: `${MIN_AGE.SPL} for a Student Pilot Licence, ${MIN_AGE.CPL} for a Commercial Pilot Licence` },
  { aspect: 'DGCA examination fee', ame: `${inr(AME.examFeeRegular)} per module, ${inr(AME.examFeeOlode)} on demand`, pilot: `${inr(PARIKSHA.fees.regularPerPaper)} per paper, ${inr(PARIKSHA.fees.olodePerPaper)} on demand` },
  { aspect: 'Modules or papers per session', ame: `Up to ${AME.modulesPerSession} modules in a session`, pilot: `${DGCA_PAPERS.length} papers in total, cleared one at a time at ${EXAM_RULES.theory.passMark}% each` },
  { aspect: 'Flying hours', ame: 'None. This is a ground engineering licence.', pilot: `${CPL_HOURS.total} hours as pilot of an aeroplane for a CPL` },
  { aspect: 'Governed by', ame: AME.governedBy, pilot: 'Aircraft Rules, 1937, Schedule II, and the Civil Aviation Requirements for flight crew' },
  { aspect: 'What the licence lets you do', ame: AME.what, pilot: 'Fly an aeroplane for hire or reward, once the licence is issued' },
  { aspect: 'The biggest cost', ame: 'Training at an institute. We cannot source a figure and do not print one.', pilot: `The flying. ${CPL_COST.benchmark.school} publishes ${CPL_COST.benchmark.feeLabel} for an ab-initio course including the ${CPL_HOURS.total} hours.` },
];

const peopleAlsoAsk = [
  {
    q: 'What is an Aircraft Maintenance Engineer?',
    a: `${AME.what} In India the licence is issued by the Directorate General of Civil Aviation and governed by ${AME.governedBy}. It is a licensed role in the same sense a pilot licence is licensed — the regulator sets the entry requirements and examines you, rather than an employer deciding what counts.`,
  },
  {
    q: 'What subjects do I need for AME?',
    a: `${AME.education} That is the single most important line on this page, because it differs from the pilot requirement: ${EDUCATION.requirement} ${AME.differsBy}`,
  },
  {
    q: 'What is the minimum age for AME?',
    a: `${AME.minAge} to register as a candidate. ${AME.maxAge} That is a real difference from the pilot route, where a Commercial Pilot Licence cannot be held before ${MIN_AGE.CPL}.`,
  },
  {
    q: 'What does the DGCA AME examination cost?',
    a: `${inr(AME.examFeeRegular)} per module in a regular session and ${inr(AME.examFeeOlode)} per module in an Online On-Demand Examination, with up to ${AME.modulesPerSession} modules in a session. Those are DGCA's fees paid to the government, not an institute's course fee — the two are routinely confused when people compare AME to pilot training.`,
  },
  {
    q: 'AME or pilot — which is better?',
    a: `Neither is better; they are different jobs with different gates, and the gate usually decides it. If you did not take Chemistry at 10+2 you cannot meet the AME education requirement as DGCA states it, while the pilot requirement of Physics and Mathematics is still open to you. If you have all three subjects, both are open and the honest deciding questions are cost, and whether you want to fly the aircraft or be the person who signs it fit to.`,
  },
];

const faqs = [
  { q: 'Is AME a DGCA licence?', a: `Yes. It is governed by ${AME.governedBy}, and candidates register and are examined through the same DGCA Central Examination Organisation that examines pilots.` },
  { q: 'Do I need Chemistry for AME?', a: `Yes, as DGCA states the requirement: ${AME.education} This is the difference from the pilot route that catches people out, and it is decided at 10+2 rather than later.` },
  { q: 'Can I do AME without Physics and Maths?', a: 'Not on the requirement as DGCA states it. The combination named is Physics, Chemistry and Mathematics, or the equivalent from a recognised board or university.' },
  { q: 'How many AME modules can I attempt in one session?', a: `Up to ${AME.modulesPerSession}.` },
  { q: 'Does an AME need flying hours?', a: `No. It is a ground engineering licence. That is the clearest structural difference from a Commercial Pilot Licence, which requires ${CPL_HOURS.total} hours of flying — and the flying is where almost all the cost of the pilot route sits.` },
  { q: 'Is there a shortage of AMEs in India?', a: `We cannot tell you, and we will not guess. What the government has published is about pilots rather than engineers: "${PILOT_SUPPLY.statement}" No equivalent statement about AME supply could be sourced, so this page does not make one.` },
  { q: 'Does We One Aviation train AMEs?', a: `No. ${ACADEMY.scope} This page exists because the DGCA requirements for both routes are public and a student choosing between them deserves to see them side by side — not because we are selling the AME route.` },
  { q: 'Where do I apply for the AME examination?', a: 'On the DGCA Pariksha portal, against a computer number, the same way a pilot candidate books written papers.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Aircraft Maintenance Engineer (AME) in India: DGCA Requirements',
  description: 'AME is a DGCA-licensed role governed by CAR 66. The age, subjects, examination fees and modules DGCA sets — and the Chemistry requirement that separates it from the pilot route and is decided at 10+2.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-16',
  articleSection: 'Aviation careers',
  keywords: 'ame, aircraft maintenance engineer, ame course, ame eligibility, ame dgca, ame vs pilot, ame full form, aircraft maintenance engineer india',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: AVIATION_CAREERS.sources.map((c) => ({ '@type': 'CreativeWork', name: c.label, url: c.url })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function AmePage() {
  return (
    <Layout
      title="AME (Aircraft Maintenance Engineer) in India: DGCA Requirements"
      description="AME is DGCA-licensed under CAR 66. The age, subjects, exam fees and modules the regulator sets — and the Chemistry requirement that separates it from the pilot route, decided at 10+2."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">The other licensed route</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Aircraft Maintenance Engineer (AME)
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            We do not train AMEs. We do have DGCA&rsquo;s requirements for both routes, side by side &mdash; including the
            one subject that quietly decides which doors stay open.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />
              <p className="text-xs text-gray-500 mb-5">
                DGCA requirements read on {LAST_UPDATED} from the regulator&rsquo;s own documents.{' '}
                <a href="#sources" className={A}>Sources below</a>.
              </p>

              <QuickAnswer question={peopleAlsoAsk[0].q} answer={peopleAlsoAsk[0].a} />

              <SummaryBox
                title="What DGCA sets for an AME"
                items={[
                  `Minimum age ${AME.minAge}. ${AME.maxAge}`,
                  AME.education,
                  `Examination fee ${inr(AME.examFeeRegular)} per module, ${inr(AME.examFeeOlode)} on demand — paid to the government`,
                  `Up to ${AME.modulesPerSession} modules in a session`,
                  `Governed by ${AME.governedBy}`,
                  'No flying hours. This is a ground engineering licence.',
                ]}
              />

              <h2 id="chemistry" className={H2}>The subject that decides it, and it is decided at 16</h2>
              <p className={P}>
                If you read nothing else here, read this. DGCA asks an AME candidate for{' '}
                <strong>Physics, Chemistry and Mathematics</strong>. It asks a pilot candidate for{' '}
                <strong>Physics and Mathematics</strong>. The regulator states both requirements side by side in its own
                document listing why computer number applications get rejected &mdash; so this is not an inference, it is
                DGCA setting out two different gates on one page.
              </p>
              <p className={P}>
                The consequence is quiet and permanent in the short term. A student who drops Chemistry at 10+2 has closed
                the AME door while leaving the pilot door open. Nobody tells them that at the point they choose subjects,
                and by the time it matters the choice is two years behind them. If you are still in Class 10 or 11 and
                either route interests you, keep all three subjects &mdash; it costs you nothing and it keeps both open.
              </p>
              <p className={P}>
                If you have already finished 10+2 without Chemistry, {EDUCATION.altRoute.charAt(0).toLowerCase()}
                {EDUCATION.altRoute.slice(1)} The same bridge logic applies, and it belongs at the front of your plan.
              </p>

              <h2 id="compare" className={H2}>AME and pilot, side by side</h2>
              <p className={P}>
                Both are DGCA-licensed. Both are examined by the same organisation, through the same portal, against a
                computer number. Almost everything else differs.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-av-blue text-white">
                    <tr>
                      <th className="text-left p-3 font-montserrat">&nbsp;</th>
                      <th className="text-left p-3 font-montserrat">AME</th>
                      <th className="text-left p-3 font-montserrat">Pilot (CPL)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {differences.map((d) => (
                      <tr key={d.aspect} className="border-t border-gray-200 odd:bg-gray-50">
                        <td className="p-3 font-semibold text-av-blue align-top">{d.aspect}</td>
                        <td className="p-3 align-top">{d.ame}</td>
                        <td className="p-3 align-top">{d.pilot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Notice the last row. The pilot route&rsquo;s dominant cost is the flying, and it is partly public &mdash;{' '}
                {CPL_COST.benchmark.school} publishes {CPL_COST.benchmark.feeLabel}. The AME route&rsquo;s dominant cost is
                institute training, and we could not source a figure for it, so none appears here. Treat any AME course fee
                you are quoted the way you should treat a flying school quote: get it in writing and ask what it excludes.
              </p>

              <h2 id="same" className={H2}>What is identical to the pilot route</h2>
              <div className="space-y-4 mb-6">
                {sameAsPilot.map((x) => (
                  <div key={x.what} className="border border-gray-200 rounded-xl p-5">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{x.what}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{x.detail}</p>
                  </div>
                ))}
              </div>
              <p className={P}>
                Because the portal is shared, the practical first step is the same for both: apply for a computer number.
                It needs no medical certificate, no institute and no flying school, and through DigiLocker it is allotted
                immediately. Our <Link href="/dgca-computer-number" className={A}>computer number guide</Link> covers the
                application, the rejection reasons and how an appeal works &mdash; all of which apply to AME candidates too.
              </p>

              <h2 id="honest" className={H2}>What this page will not tell you</h2>
              <p className={P}>
                No AME salary figure, no placement rate, no institute fee and no count of AME institutes. None of it is
                sourceable, and the same rule that keeps salary figures off our{' '}
                <Link href="/commercial-pilot-license-salary" className={A}>pilot salary page</Link> applies here. On
                whether there is an AME shortage: the Ministry of Civil Aviation has published a position on pilot supply
                &mdash; &ldquo;{PILOT_SUPPLY.statement}&rdquo; &mdash; and we could find no equivalent statement about
                engineers, so this page does not make one up.
              </p>
              <p className={P}>
                And plainly: {ACADEMY.scope} This page exists because the requirements are public and a student choosing
                between two routes deserves them side by side &mdash; not because we have an AME course to sell you. The
                other roles DGCA licences, including Flight Dispatcher, Flight Engineer, Flight Navigator and Air Traffic
                Controller, are set out on{' '}
                <Link href="/blogs/aviation-jobs-besides-pilot" className={A}>our aviation careers page</Link>.
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
              <p className={P}>Read on {LAST_UPDATED}. Both are DGCA&rsquo;s own documents.</p>
              <ul className="space-y-2 mb-8">
                {AVIATION_CAREERS.sources.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.label}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <h3 className="font-montserrat text-lg font-bold text-white mb-2">Still choosing between the two?</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our counselling is free and carries no obligation, and it is fine to use it to conclude that the pilot
                  route is not for you &mdash; that is a good outcome reached cheaply.{' '}
                  <Link href="/pilot-career-counselling" className="text-white font-semibold underline">What a session
                  covers</Link>, or call {ACADEMY.phone}.
                </p>
              </div>
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
