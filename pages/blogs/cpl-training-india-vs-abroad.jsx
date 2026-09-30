import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  ACADEMY, CPL_HOURS, DGCA_PAPERS, RTR, EXAM_RULES, PARIKSHA, CPL_COST,
  FTO, FOREIGN_LICENCE, MEDICAL_STANDARDS, COST_NOTE,
} from '../../lib/facts';

/*
 * Replaces the static post at /blogs/3 ("CPL Training in India vs Abroad",
 * Dec 2024), which is redirected to this URL in the same commit.
 *
 * WHY THIS IS A SEPARATE PAGE rather than a merge into /pilot-training-abroad.
 * That page answers "should I train abroad at all" for any destination. This
 * one answers a comparison query — India versus abroad for a CPL specifically —
 * which is a different search and has a different answer shape: a table of what
 * actually differs, and the conversion arithmetic that decides it.
 *
 * WHAT CARRIED OVER from /blogs/3: the monsoon and fleet-size point, the
 * refusal to print an unsourced cost range, the IGRUA reference, and the
 * "how many aircraft are flying" reframing. All of it was correct.
 *
 * WHAT IS NEW: the conversion requirements, which /blogs/3 gestured at without
 * specifics. They are now in FOREIGN_LICENCE — CAR Section 7 Series 'G' Part I —
 * so this page can state exactly what converting costs a candidate in
 * examinations, a skill test, a radio certificate and a currency rule.
 *
 * DO NOT add a cost range for training abroad. None is published by any
 * authority in any of the usual destination countries in a form we can cite,
 * and COST_NOTE explains why the Indian ones are not printed either.
 */

const DATE_PUBLISHED = '2024-12-05';
const DATE_MODIFIED = '2026-09-30';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-training-india-vs-abroad';

const differences = [
  {
    factor: 'Which licence you end up holding',
    india: 'A DGCA licence. No conversion step at the end.',
    abroad: 'That country’s licence. Converting it to an Indian licence is a separate project with its own examinations, skill test and radio certificate.',
  },
  {
    factor: 'Visa',
    india: 'None needed.',
    abroad: 'A student visa, with its own timeline and its own risk if the course overruns.',
  },
  {
    factor: 'Weather',
    india: 'Flying is interrupted by the monsoon across much of the country.',
    abroad: 'Often better year-round flying weather, which is a real advantage and the honest reason most people go.',
  },
  {
    factor: 'How fast hours accumulate',
    india: `Decided by fleet size and how many students share each aircraft. DGCA publishes a ranking in which ${FTO.ranking.parameters[1].name} carries ${FTO.ranking.parameters[1].weight}% — so this is checkable before you commit.`,
    abroad: 'Usually a larger fleet per student. Rarely published in a form you can verify from India.',
  },
  {
    factor: 'The written examinations',
    india: `${DGCA_PAPERS.length} DGCA papers at ${EXAM_RULES.theory.passMark}% each, whichever school you attend.`,
    abroad: `Two DGCA conversion papers instead of ${DGCA_PAPERS.length} — Air Regulations and a composite Navigation and Meteorology paper. This is the one genuine advantage of a foreign licence.`,
  },
  {
    factor: 'The medical',
    india: 'An Indian assessment, which you need anyway.',
    abroad: 'That country’s medical for training, plus the Indian assessment for the Indian licence. Two processes, two fees.',
  },
  {
    factor: 'What a quote shows you',
    india: 'Tuition, flying and ratings. Statutory DGCA charges stay separate.',
    abroad: 'The same — with the conversion steps almost never included in the number you are shown.',
  },
];

const conversionSteps = [
  {
    step: 'Two written papers',
    detail: `${FOREIGN_LICENCE.examinations[0].papers.join(' and ')}. ${FOREIGN_LICENCE.examinations[0].note}`,
  },
  {
    step: 'A skill test in India',
    detail: FOREIGN_LICENCE.skillTest,
  },
  {
    step: 'A radio certificate from a different ministry',
    detail: `${FOREIGN_LICENCE.radioTelephony[0]}, and on that basis DGCA issues the Flight Radio Telephone Operator licence. A Signals (Practical) examination goes with it.`,
  },
  {
    step: 'A current rating, proved where it was issued',
    detail: `${FOREIGN_LICENCE.currency.rule} ${FOREIGN_LICENCE.currency.where}`,
  },
  {
    step: 'Any hours shortfall, made up',
    detail: FOREIGN_LICENCE.hoursShortfall,
  },
];

const peopleAlsoAsk = [
  {
    q: 'Is CPL training cheaper in India or abroad?',
    a: `Nobody can answer that from published figures, and this page will not pretend otherwise. ${COST_NOTE} The one comparable published number is ${CPL_COST.benchmark.school}'s course fee of ${CPL_COST.benchmark.feeLabel}, and even that has a list of exclusions. What you can compare honestly is the structure: an Indian course ends with the licence you need, while a foreign course ends with a licence plus a conversion project that no brochure prices.`,
  },
  {
    q: 'Do I have to convert a foreign CPL to fly in India?',
    a: `Yes. ${FOREIGN_LICENCE.why} The requirements are in ${FOREIGN_LICENCE.car.citation}.`,
  },
  {
    q: 'How many DGCA exams do I take if I train abroad?',
    a: `Two, not ${DGCA_PAPERS.length}: ${FOREIGN_LICENCE.examinations[0].papers.join(' and ')}. That is a real advantage of holding a foreign licence, and it is worth stating accurately rather than burying it under vague claims that foreign training is "DGCA recognised" — DGCA does not recognise foreign training as a category, it issues an Indian licence on application.`,
  },
  {
    q: 'Do my flying hours from abroad count in India?',
    a: `Your logbook is your logbook. What matters is the total against Schedule II, which requires ${CPL_HOURS.total} hours for a Commercial Pilot Licence. ${FOREIGN_LICENCE.hoursShortfall}`,
  },
  {
    q: 'How many DGCA-approved flying schools are there in India?',
    a: `${FTO.count} on DGCA's published list as on ${FTO.listAsOf}, across ${FTO.statesWithBases.length} states. Worth reading before concluding that going abroad is the only way to get a fleet with capacity.`,
  },
];

const faqs = [
  {
    q: 'Which is faster, training in India or abroad?',
    a: 'Neither, as a rule. Speed is decided by how many aircraft are flying and how many students share them, not by which country you are in. That is measurable for an Indian school before you pay, because DGCA ranks approved organisations on published parameters. For a school abroad you are usually taking the brochure’s word for it.',
  },
  {
    q: 'What is the single biggest thing people miss?',
    a: 'That the licence they finish with abroad is not the licence they need. Conversion has its own examinations, its own skill test in India, a radio certificate from the Ministry of Communications, and a currency rule on the foreign rating. None of it appears in a training quote.',
  },
  {
    q: 'What does DGCA mean by a "current" rating on a foreign licence?',
    a: `${FOREIGN_LICENCE.currency.definition.join(', or ')}. ${FOREIGN_LICENCE.currency.where} If it is not current when you apply, ${FOREIGN_LICENCE.currency.ifNotCurrent.join(' and ')} — ${FOREIGN_LICENCE.currency.ifNotCurrentNote.toLowerCase()}`,
  },
  {
    q: 'Can I clear the DGCA papers before I leave for training abroad?',
    a: `For a conversion you need the two conversion papers rather than the full set, and the computer number registration needs no medical certificate and no flying school, so the registration can be done from India first. Watch the validity: ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl}`,
  },
  {
    q: 'Do I still need an Indian medical if I train abroad?',
    a: `Yes. The Indian licence needs the Indian assessment — a Class 1 for a Commercial Pilot Licence, valid ${MEDICAL_STANDARDS.classes[0].validity.toLowerCase()} A medical certificate issued by another country’s regulator is that country’s certificate.`,
  },
  {
    q: 'Does We One Aviation send students abroad?',
    a: ACADEMY.scope,
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'CPL Training India vs Abroad 2026',
  description:
    'What genuinely differs between doing a CPL in India and doing it overseas — the licence you end up holding, the conversion requirements DGCA actually publishes, the two conversion papers instead of five, and the question that decides it either way.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot training abroad',
  keywords: 'cpl training india vs abroad, pilot training abroad vs india, cpl abroad for indian students, foreign cpl conversion dgca, flying school india or abroad',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [
    { '@type': 'CreativeWork', name: FOREIGN_LICENCE.sources[0].label, url: FOREIGN_LICENCE.sources[0].url },
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: FTO.sources[0].label, url: FTO.sources[0].url },
    { '@type': 'CreativeWork', name: `${CPL_COST.benchmark.school} published course fee`, url: CPL_COST.benchmark.source },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

export default function CPLTrainingIndiaVsAbroad() {
  return (
    <BlogPostLayout
      title="CPL Training India vs Abroad 2026: Cost, Conversion & Hours"
      description="What really differs between a CPL in India and one abroad: the licence you hold at the end, the DGCA conversion steps nobody prices, two exam papers instead of five, and the one question worth asking either way."
      schema={[articleSchema, faqSchema]}
      heading="CPL Training India vs Abroad 2026"
      category="Pilot training abroad"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'Should I do my CPL in India or abroad?',
        answer: `It depends on one thing more than cost: a course abroad ends with **that country's licence**, and flying commercially in India needs a **DGCA licence**. Converting means **two written papers**, a **skill test in India**, a **radio certificate** from the Ministry of Communications, and a **currency rule** on your foreign rating. None of that appears in a training quote.`,
      }}
      summaryTitle="India vs abroad, in one view"
      summaryItems={[
        'Train in India and you finish with the licence you need. Train abroad and you finish with a licence plus a conversion project',
        `Conversion is ${FOREIGN_LICENCE.examinations[0].papers.length} written papers instead of ${DGCA_PAPERS.length} — the one real advantage of a foreign licence`,
        `${CPL_HOURS.total} hours is the Indian requirement and it does not move. A shortfall is completed in the issuing State or in India`,
        `DGCA lists ${FTO.count} approved flying training organisations as on ${FTO.listAsOf} and ranks them on published parameters`,
        'No honest cost comparison exists, because no authority publishes a market price on either side',
      ]}
      tocHeadings={[
        { id: 'the-real-question', label: 'The question that actually decides it' },
        { id: 'differences', label: 'What genuinely differs' },
        { id: 'conversion', label: 'The conversion nobody prices' },
        { id: 'papers', label: 'Two papers instead of five' },
        { id: 'cost', label: 'Why no cost range appears here' },
        { id: 'throughput', label: 'The throughput argument, tested' },
        { id: 'medical', label: 'The medical, twice' },
        { id: 'decide', label: 'How to decide, in seven questions' },
        { id: 'sources', label: 'Sources' },
      ]}
    >
      <p className="rounded-xl border-l-4 border-av-orange bg-av-light px-4 py-3 text-sm text-gray-700">
        For students planning the 2026 cycle. Every figure on this page is current as of 30 September 2026.
        Check dgca.gov.in before you book anything.
      </p>

      <p>
        A Commercial Pilot Licence issued in another country is not an Indian licence, and that single fact
        reorders every comparison you have read. India requires {CPL_HOURS.total} hours under Schedule II of the
        Aircraft Rules, 1937 whichever country you fly them in &mdash; but the licence you hold at the end decides
        whether you are finished or whether a second licensing project is about to start.
      </p>

      <BlogImagePlaceholder
        src="/blog/cpl-training-india-vs-abroad/hero-two-routes.webp"
        width={1200}
        height={630}
        alt="Two training routes drawn side by side: an Indian flying school leading straight to a DGCA licence, and an overseas school leading to a foreign licence with a conversion step before the DGCA licence"
        promptId="83"
      />

      <h2 id="the-real-question" className={H2}>The question that actually decides it</h2>
      <p>
        The question is not which option is cheaper. It is what you are holding when the course ends. Train in
        India and you finish with a DGCA licence, which is the licence an Indian airline needs you to have. Train
        abroad and you finish with a licence issued by that country&rsquo;s regulator, which you then apply to
        convert. {FOREIGN_LICENCE.why}
      </p>
      <p>
        That conversion is a defined procedure with named examinations, not a formality &mdash; and it is almost
        never inside the number a school abroad quotes you. Everything else on this page follows from that.
      </p>

      <h2 id="differences" className={H2}>What genuinely differs</h2>
      <p>
        The differences between training in India and training abroad are narrower than most comparisons suggest,
        and they are not mostly about quality. Here is the honest version.
      </p>
      <div className="my-6 overflow-x-auto rounded-2xl border border-gray-100">
        <table className={`${TABLE} stack`}>
          <thead>
            <tr>
              <th className={TH}>Factor</th>
              <th className={TH}>Training in India</th>
              <th className={TH}>Training abroad</th>
            </tr>
          </thead>
          <tbody>
            {differences.map((d) => (
              <tr key={d.factor}>
                <td className={`${TD} font-semibold text-av-blue`} data-label="Factor">{d.factor}</td>
                <td className={TD} data-label="In India">{d.india}</td>
                <td className={TD} data-label="Abroad">{d.abroad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="conversion" className={H2}>The conversion nobody prices</h2>
      <p>
        The conversion requirements come from {FOREIGN_LICENCE.car.citation} &mdash; {FOREIGN_LICENCE.car.title}.
        It is issued under {FOREIGN_LICENCE.car.issuedUnder} These are the five things it asks of you, in the
        order they bite:
      </p>
      <ol className="my-6 space-y-3">
        {conversionSteps.map((s, i) => (
          <li key={s.step} className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-av-blue text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-gray-600">
              <strong className="text-av-blue">{s.step}.</strong> {s.detail}
            </span>
          </li>
        ))}
      </ol>
      <p>
        The currency rule is the one that catches people, and it is worth reading twice. Finish a course abroad,
        fly home, spend a year clearing papers, and the rating on that foreign licence can be stale by the time
        you apply &mdash; at which point the CAR sends you down a longer road. Plan the Indian steps around the
        24-month window on the rating, not the other way round. The full treatment is on our{' '}
        <Link href="/pilot-training-abroad" className={A}>pilot training abroad guide</Link>.
      </p>

      <h2 id="papers" className={H2}>Two papers instead of five</h2>
      <p>
        The examinations are where a foreign licence genuinely helps, and it is worth stating precisely.
        A candidate training in India sits {DGCA_PAPERS.length} DGCA papers &mdash; {DGCA_PAPERS.join(', ')} &mdash;
        at {EXAM_RULES.theory.passMark}% each. {EXAM_RULES.theory.perSubject}
      </p>
      <p>
        A candidate converting a foreign Commercial Pilot Licence sits two:{' '}
        {FOREIGN_LICENCE.examinations[0].papers.join(' and ')}. That is a real, material difference. It is also
        the reason vague claims that foreign training is &ldquo;DGCA recognised&rdquo; do so much damage: they
        replace a specific advantage a reader can plan around with a phrase that means nothing. DGCA does not
        recognise foreign training as a category. It issues an Indian licence on application, against published
        requirements.
      </p>
      <p>
        {RTR.name} sits outside both routes. {RTR.note}
      </p>

      <h2 id="cost" className={H2}>Why no cost range appears here</h2>
      <p>
        The cost comparison you have read is almost certainly unsourced. {COST_NOTE}
      </p>
      <div className="my-6 overflow-x-auto rounded-2xl border border-gray-100">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Figure</th>
              <th className={TH}>Amount</th>
              <th className={TH}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${TD} font-semibold text-av-blue`}>{CPL_COST.benchmark.school}, ab-initio to CPL</td>
              <td className={TD}>{CPL_COST.benchmark.feeLabel}</td>
              <td className={TD}>Published by a government academy</td>
            </tr>
            <tr>
              <td className={`${TD} font-semibold text-av-blue`}>DGCA examination, regular session</td>
              <td className={TD}>&#8377;{PARIKSHA.fees.regularPerPaper.toLocaleString('en-IN')} per paper</td>
              <td className={TD}>Statutory, paid to the government</td>
            </tr>
            <tr>
              <td className={`${TD} font-semibold text-av-blue`}>DGCA examination, on demand</td>
              <td className={TD}>&#8377;{PARIKSHA.fees.olodePerPaper.toLocaleString('en-IN')} per paper</td>
              <td className={TD}>Statutory, paid to the government</td>
            </tr>
            <tr>
              <td className={`${TD} font-semibold text-av-blue`}>Class 1 medical at an Air Force centre</td>
              <td className={TD}>{MEDICAL_STANDARDS.fees.rows[0].label}</td>
              <td className={TD}>Statutory, paid on Bharatkosh</td>
            </tr>
            <tr>
              <td className={`${TD} font-semibold text-av-blue`}>Training fees, India or abroad</td>
              <td className={TD}>Not published</td>
              <td className={TD}>Set by each school; ask in writing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {CPL_COST.benchmark.school} is the one price on either side of this comparison that comes from a document
        anybody can open, and even it excludes uniform, study material, examination and licence fees, hostel and
        messing. Our <Link href="/cost-transparency" className={A}>cost transparency page</Link> sets out what it
        does and does not cover, and <Link href="/blogs/pilot-training-cost-in-india" className={A}>the cost
        guide</Link> lists what a quote has to answer before it can be compared with another one.
      </p>

      <h2 id="throughput" className={H2}>The throughput argument, tested</h2>
      <p>
        The strongest honest argument for going abroad is throughput: a larger fleet, more flyable days, hours
        that accumulate faster. It is a real argument &mdash; and in India, unusually, it is testable before you
        spend anything.
      </p>
      <p>
        DGCA lists {FTO.count} approved flying training organisations as on {FTO.listAsOf}, across{' '}
        {FTO.statesWithBases.length} states, and ranks them on five weighted parameters.{' '}
        {FTO.ranking.parameters[1].name} carries {FTO.ranking.parameters[1].weight}% of that ranking, which is
        the closest thing to a published throughput measure that exists in this market. Read it before concluding
        that the fleet problem you are trying to escape is unavoidable in India.{' '}
        <Link href="/how-to-choose-an-aviation-academy" className={A}>How to check an aviation academy</Link>{' '}
        explains where to look it up.
      </p>
      <p>
        One geography note for Delhi readers: there is no approved flying base in{' '}
        {FTO.noBaseIn.join(', ')}. Ground school and flying happen in different places for almost every student
        from the capital, whichever country they fly in.
      </p>

      <h2 id="medical" className={H2}>The medical, twice</h2>
      <p>
        The medical is the quiet duplication in the abroad route. Training in another country needs that
        country&rsquo;s medical certificate; the Indian licence needs the Indian assessment. A Class 1 for a
        Commercial Pilot Licence is valid {MEDICAL_STANDARDS.classes[0].validity.toLowerCase()}
      </p>
      <p>
        {MEDICAL_STANDARDS.classOrder.advice} That advice holds whichever country you are considering &mdash; the
        assessment that ends a flying career ends it just as firmly after a deposit as before one. What the
        classes are, where they are conducted and what DGCA charges is on{' '}
        <Link href="/dgca-class-2-class-1-medical" className={A}>the medical page</Link>.
      </p>

      <h2 id="decide" className={H2}>How to decide, in seven questions</h2>
      <p>
        Two quotes are only comparable once both have answered the same questions. Ask these of any school, in
        either country, and get the answers in writing:
      </p>
      <ol className="my-6 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-gray-600">
        {CPL_COST.askYourSchool.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
      <p>
        Then add the two that only apply abroad: which regulator issues the licence at the end, and who pays for
        the conversion steps back in India. {CPL_COST.comparisonNote}
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />

      <h2 id="sources" className={H2}>Sources</h2>
      <ul className="my-6 space-y-2 text-sm text-gray-600">
        {articleSchema.citation.map((c) => (
          <li key={c.name}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
          </li>
        ))}
      </ul>
      <p>
        {ACADEMY.scope} We have no arrangement with any school outside India and earn nothing if you go, which is
        the only reason this comparison is worth reading. If you want it applied to your own situation, the{' '}
        <Link href="/pilot-career-counselling" className={A}>counselling is free</Link> and covers the whole
        route, end to end.
      </p>
    </BlogPostLayout>
  );
}
