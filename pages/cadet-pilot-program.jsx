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
  LICENCES, CPL_HOURS, DGCA_PAPERS, papersSummary, RTR, EDUCATION,
  MEDICAL_STANDARDS as MED, EXAM_RULES, PARIKSHA, CPL_COST, EGCA, inr, ACADEMY,
} from '../lib/facts';

/*
 * /cadet-pilot-program — new 2026-09-15. Backlog item 2.3.
 *
 * WHAT THIS REPLACES. This URL was a 301 to /emirates-cadet-pilot-program, so
 * every generic "cadet pilot program" search — keyword 32 on the owner's
 * priority list, flagged there as heavily targeted by Golden Epaulettes — was
 * being pushed onto one airline's page. Six airline pages existed with no
 * parent above them, competing with each other for the generic term. The
 * redirect is removed in this commit and this hub takes the URL.
 *
 * THE DESIGN DECISION THAT KEEPS IT HONEST AND DURABLE. This page publishes NO
 * airline-specific terms: no fees, no intake dates, no selection quotas, no
 * bond figures. Those change every intake, they are the airline's to state,
 * and a page carrying them is wrong within months — which is exactly why
 * competitor cadet pages age so badly.
 *
 * What it publishes instead is the thing that does NOT change and that almost
 * every page on this subject obscures: a cadet programme does not alter the
 * licence. The DGCA requirements are identical whichever route you take. Same
 * Schedule II hours, same papers at the same pass mark, same Class 1 medical,
 * same RTR, same English proficiency. What a cadet programme changes is
 * selection, how training is funded and sequenced, and who arranges it.
 *
 * That framing is defensible indefinitely, it is genuinely useful to someone
 * choosing, and it makes the six airline pages the place to go for specifics
 * rather than competitors for the generic term.
 *
 * CLAIMS DISCIPLINE. No guarantee of employment, ours or an airline's. No
 * salary. No pass rates. See scripts/check-claims.js.
 */

const LAST_UPDATED = '15 September 2026';
const LAST_UPDATED_ISO = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/cadet-pilot-program';

const CPL = LICENCES.find((l) => l.code === 'CPL');

/* The six airline-specific pages this hub sits above. */
const programmes = [
  { airline: 'IndiGo', href: '/indigo-pilot-preparation', note: 'Preparation for the IndiGo selection process.' },
  { airline: 'Air India', href: '/airindia-pilot-preparation', note: 'Preparation for the Air India selection process.' },
  { airline: 'Emirates', href: '/emirates-cadet-pilot-program', note: 'The Emirates cadet route.' },
  { airline: 'Qatar Airways', href: '/qatar-airways-cadet-pilot-program', note: 'The Qatar Airways cadet route.' },
  { airline: 'SpiceJet', href: '/spice-jet', note: 'The SpiceJet route and what it involves.' },
  { airline: 'Air Arabia', href: '/air-arabia', note: 'The Air Arabia route and what it involves.' },
];

/* Identical on both routes, because the regulator does not care how you paid. */
const unchanged = [
  { item: 'Flying hours', detail: `${CPL_HOURS.total} hours, flown within the ${CPL_HOURS.recencyYears} years before you apply — Schedule II, ${CPL_HOURS.clause}.` },
  { item: 'Written papers', detail: `${DGCA_PAPERS.length} papers — ${papersSummary()} — each needing ${EXAM_RULES.theory.passMark}% on its own.` },
  { item: 'Radio telephony', detail: `${RTR.name}, required for the licence and examined separately.` },
  { item: 'Medical', detail: `A Class 1 for the Commercial Pilot Licence. ${MED.classes[0].validity}` },
  { item: 'Education', detail: EDUCATION.requirement },
  { item: 'Age', detail: `${CPL.minAge} to hold a Commercial Pilot Licence, under Schedule II, ${CPL.section}.` },
  { item: 'English proficiency', detail: 'Level 4 or above, checked before the licence application will proceed.' },
  { item: 'The licence application', detail: `Made on eGCA — ${EGCA.cplIssuance.service} — against the same six prerequisites either way.` },
];

const differences = [
  { dimension: 'How you get in', cadet: 'An airline selection process, run by the airline, usually before training begins', self: 'You choose a flying school and enrol' },
  { dimension: 'Who chooses the flying school', cadet: 'Generally the airline or its nominated partner', self: 'You do, and you carry the consequences of that choice' },
  { dimension: 'How it is funded', cadet: 'Structured by the airline — arrangements vary by programme and change between intakes', self: 'You fund it, in the sequence you choose' },
  { dimension: 'Sequence', cadet: 'Usually a defined pathway with type-specific training at the end', self: 'You decide the order, and stages can run in parallel' },
  { dimension: 'What happens at the end', cadet: 'Varies entirely by programme and by the airline’s requirement at that time', self: 'You hold a licence and apply where you choose' },
  { dimension: 'The DGCA licence itself', cadet: 'Identical', self: 'Identical' },
];

const askBefore = [
  'Is this intake actually open right now, confirmed on the airline’s own careers page rather than a third-party listing?',
  'What exactly does the published figure cover, and what is billed separately — the same seven questions you would ask any flying school?',
  'What happens if you need more than the hours in the programme, and at whose cost?',
  'What are the obligations if you withdraw partway, or if the airline changes its requirement before you finish?',
  'Is the flying done in India or abroad, and if abroad, what is involved in converting the licence on return?',
  'Is there any commitment period after training, and on what terms is it written down?',
  'What is the position if you do not clear a stage — is there a retake, and who pays for it?',
];

const peopleAlsoAsk = [
  {
    q: 'What is a cadet pilot programme?',
    a: 'An airline-structured pathway into flying for that airline: selection first, then a defined training route, often with the flying school chosen for you and funding arranged through the programme. It is a route to a licence and a role, not a different kind of licence.',
  },
  {
    q: 'Is a cadet programme better than doing a CPL yourself?',
    a: 'Neither is better in the abstract, and the honest comparison is about control and certainty rather than quality. A cadet programme trades your choice of school and sequence for structure and a defined pathway. Self-sponsored training keeps every decision with you, including the ones that go wrong. The licence you end up holding is the same document under the same rules.',
  },
  {
    q: 'Does a cadet programme mean a guaranteed airline job?',
    a: 'That depends entirely on what the specific programme commits to in writing, and airlines vary and change their terms between intakes. Treat any page — including any coaching institute’s — that states a guarantee on an airline’s behalf with suspicion, and read the airline’s own terms.',
  },
  {
    q: 'Do cadet pilots still have to pass the DGCA exams?',
    a: `Yes, and this is the most misunderstood part. ${DGCA_PAPERS.length} written papers at ${EXAM_RULES.theory.passMark}% each, ${CPL_HOURS.total} flying hours, a Class 1 medical, ${RTR.name} and English proficiency. A cadet programme changes how you get there. It changes nothing about what DGCA requires.`,
  },
  {
    q: 'What does a cadet pilot programme cost in India?',
    a: `Programme costs are the airline's to publish and they change between intakes, so no figure is quoted here. For a reference point on what full ab-initio training costs when an authority has to publish the detail: ${CPL_COST.benchmark.school}, ${CPL_COST.benchmark.status.toLowerCase()}, publishes ${CPL_COST.benchmark.feeLabel} for its ${CPL_COST.benchmark.course} course, with uniform, hostel, messing and DGCA fees charged on top.`,
  },
];

const faqs = [
  { q: 'Which airlines run cadet or preparation routes covered on this site?', a: `${programmes.map((p) => p.airline).join(', ')}. Each has its own page here. Terms, intakes and fees are the airline's to state and change between intakes — always confirm on the airline's own careers page.` },
  { q: 'What is the minimum eligibility for a cadet programme?', a: `Airlines set their own selection criteria, and those vary. What does not vary is the DGCA baseline behind any route to a commercial licence: ${EDUCATION.requirement}, a Class 1 medical, ${DGCA_PAPERS.length} written papers and ${CPL_HOURS.total} flying hours.` },
  { q: 'Can I apply for a cadet programme after Class 12?', a: `Airline selection criteria differ. On the DGCA side, you can begin immediately: a computer number can be applied for from age ${PARIKSHA.basics.minAge} and needs no flying school and no medical certificate, so written papers can be underway while you are still deciding on a route.` },
  { q: 'If I am not selected, is that the end?', a: `No. The self-sponsored route leads to the same licence, and any DGCA papers you have already cleared still count — ${EXAM_RULES.paperValidity.cplAtpl.charAt(0).toLowerCase()}${EXAM_RULES.paperValidity.cplAtpl.slice(1)}` },
  { q: 'Does We One Aviation run a cadet programme or place students with airlines?', a: ACADEMY.scope },
  { q: 'What should I check before paying anything?', a: 'The seven questions on this page, and the airline’s own published terms rather than a summary of them. If a figure or a promise appears only on a third-party page, treat it as unverified.' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cadet Pilot Programmes in India: What Changes, and What DGCA Requires Either Way',
  description: 'What a cadet pilot programme is, how it compares with self-sponsored CPL training, the DGCA requirements that are identical on both routes, and the questions to ask an airline before committing.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  articleSection: 'Pilot career routes',
  keywords: 'cadet pilot program, cadet pilot programme india, airline cadet program, cadet vs cpl, indigo cadet, air india cadet, emirates cadet pilot',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { name: 'Aircraft Rules, 1937, Schedule II — licence requirements, identical on any route', url: 'https://www.indiacode.nic.in/handle/123456789/1362' },
    { name: `${EXAM_RULES.car.citation} — pass marks`, url: EXAM_RULES.car.where },
    { name: `${CPL_COST.benchmark.school} published course fees`, url: CPL_COST.benchmark.source },
  ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-4 mt-12 scroll-mt-24';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white text-left';
const TD = 'px-4 py-3 align-top text-sm text-gray-600 border-b border-gray-100';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CadetPilotProgram() {
  return (
    <Layout
      title="Cadet Pilot Programmes in India: How They Differ from a CPL"
      description="What a cadet pilot programme changes, what DGCA requires identically on either route, and the seven questions to ask an airline before you commit to one."
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Pilot career routes</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Cadet Pilot Programmes in India
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            What a cadet route actually changes — and the part almost every page on this subject leaves out.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              <p className="text-xs text-gray-500 mb-5">
                DGCA requirements checked on {LAST_UPDATED} and <a href="#sources" className={A}>sourced below</a>. Airline-specific
                terms are deliberately not quoted on this page — see why under &ldquo;what this page will not tell you&rdquo;.
              </p>

              <QuickAnswer
                question="What is a cadet pilot programme, and how does it differ from doing a CPL yourself?"
                answer={`A cadet pilot programme is an airline-structured route into flying for that airline: selection first, then a defined training pathway, usually with the flying school chosen for you and funding arranged through the programme. What it does not change is the licence. A cadet and a self-sponsored student both need ${CPL_HOURS.total} flying hours, ${DGCA_PAPERS.length} DGCA written papers at ${EXAM_RULES.theory.passMark}% each, a Class 1 medical, ${RTR.name} and English proficiency at Level 4. The route differs; the requirements do not.`}
              />

              <SummaryBox
                title="The short version"
                items={[
                  'A cadet programme changes selection, funding and sequence — not the licence',
                  `Every DGCA requirement is identical on both routes: ${CPL_HOURS.total} hours, ${DGCA_PAPERS.length} papers at ${EXAM_RULES.theory.passMark}%, Class 1 medical, ${RTR.name}, English at Level 4`,
                  'Airline terms, fees and intakes change between intakes — confirm them on the airline’s own careers page, never on a third-party summary',
                  'If you are not selected, DGCA papers you have already cleared still count towards the same licence',
                  `Six airline routes have their own pages here: ${programmes.map((p) => p.airline).join(', ')}`,
                ]}
              />

              <h2 id="unchanged" className={H2}>What does not change: the licence</h2>
              <p className={P}>
                This is the part most pages on this subject skate over, and it is the single most useful thing to understand before
                you choose. The Directorate General of Civil Aviation issues one Commercial Pilot Licence, under one set of rules,
                and it does not have a cadet version. Whichever route you take, all of this is identical.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead><tr><th className={TH}>Requirement</th><th className={TH}>Same on both routes</th></tr></thead>
                  <tbody>
                    {unchanged.map((u) => (
                      <tr key={u.item}>
                        <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{u.item}</td>
                        <td className={TD}>{u.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                The practical consequence is worth stating plainly: nothing about waiting for a cadet selection result stops you
                starting. A computer number can be applied for from age {PARIKSHA.basics.minAge}, needs no flying school and no
                medical certificate, and written papers cleared now count towards the same licence either way. Our{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>eligibility guide</Link> sets out all five
                requirements with the rule behind each.
              </p>

              <h2 id="differences" className={H2}>What does change</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead><tr><th className={TH}>&nbsp;</th><th className={TH}>Cadet programme</th><th className={TH}>Self-sponsored CPL</th></tr></thead>
                  <tbody>
                    {differences.map((d) => (
                      <tr key={d.dimension} className={d.dimension.includes('licence') ? 'bg-av-light' : ''}>
                        <td className={`${TD} font-semibold text-av-blue`}>{d.dimension}</td>
                        <td className={TD}>{d.cadet}</td>
                        <td className={TD}>{d.self}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={P}>
                Read down the table and the trade is clear enough: a cadet programme exchanges some of your control — over the
                school, the sequence and often the country you fly in — for structure and a defined pathway. Whether that is a good
                trade depends on the specific programme&rsquo;s written terms, which is why the next section matters more than any
                comparison article.
              </p>

              <h2 id="not-told" className={H2}>What this page will not tell you, and why</h2>
              <p className={P}>
                No fees, no intake dates, no selection quotas, no bond figures for any airline. Those are the airline&rsquo;s to
                publish, they change between intakes, and a page carrying them is out of date within months — which is precisely
                why so many cadet pages you will find are wrong.
              </p>
              <p className={P}>
                If you see a specific number for an airline programme on a coaching institute&rsquo;s page, check the date it was
                written and then check the airline&rsquo;s own careers page. If the two disagree, the airline is right. If the
                institute&rsquo;s page carries no date at all, that tells you something too.
              </p>

              <h2 id="ask" className={H2}>Seven questions to ask before you commit</h2>
              <p className={P}>
                Ask these of any programme, and ask for the answers in writing. They are the same discipline we suggest for
                comparing flying school quotes on our <Link href="/cost-transparency" className={A}>cost page</Link>.
              </p>
              <ol className="space-y-2 mb-6">
                {askBefore.map((q, i) => (
                  <li key={q.slice(0, 30)} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{q}
                  </li>
                ))}
              </ol>

              <h2 id="airlines" className={H2}>The airline routes covered here</h2>
              <p className={P}>
                Each of these has its own page. Treat them as orientation, and the airline&rsquo;s own careers page as the source of
                truth for anything current.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {programmes.map((p) => (
                  <Link key={p.href} href={p.href} className="border border-gray-200 rounded-xl p-4 hover:border-av-orange transition-colors">
                    <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{p.airline}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{p.note}</p>
                  </Link>
                ))}
              </div>

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
              <p className={P}>Read on {LAST_UPDATED}. Airline programme terms are not sourced here because they are not ours to state.</p>
              <ul className="space-y-2 mb-8">
                {articleSchema.citation.map((c) => (
                  <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                  </li>
                ))}
              </ul>

              <div className="bg-av-blue rounded-2xl p-6">
                <p className="text-white/80 text-sm leading-relaxed mb-3">{ACADEMY.scope}</p>
                <p className="text-white/60 text-xs leading-relaxed mb-4">
                  What we teach is the ground subjects behind the examination results every one of these routes needs. If you are
                  weighing a cadet offer, bring us the written terms and we will go through the seven questions with you.
                </p>
                <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                  Talk to a counsellor
                </Link>
              </div>
            </ScrollReveal>
          </article>

          <aside className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Ask about cadet routes" /></ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">Identical on either route</h4>
                <ul className="space-y-2 text-sm text-white/85">
                  <li>{CPL_HOURS.total} flying hours</li>
                  <li>{DGCA_PAPERS.length} written papers at {EXAM_RULES.theory.passMark}%</li>
                  <li>Class 1 medical</li>
                  <li>{RTR.name}</li>
                  <li>English proficiency Level 4</li>
                  <li>Minimum age {CPL.minAge} for the licence</li>
                </ul>
                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                  Ask a question
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Airline routes</h4>
                <ul className="space-y-2 text-sm">
                  {programmes.map((p) => (<li key={p.href}><Link href={p.href} className={A}>{p.airline}</Link></li>))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={500}>
              <div className="border border-gray-200 rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">The route either way</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link></li>
                  <li><Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>The full route</Link></li>
                  <li><Link href="/dgca-computer-number" className={A}>Start the exams first</Link></li>
                  <li><Link href="/cost-transparency" className={A}>What it costs</Link></li>
                </ul>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
