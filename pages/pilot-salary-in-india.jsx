import Link from 'next/link';
import BlogPostLayout from '../components/BlogPostLayout';
import { H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, listJoin } from '../lib/blogKit';

const DATE_PUBLISHED = '2026-10-14';
const DATE_MODIFIED = '2026-10-14';
const HEADING = 'Pilot Salary in India: Complete 2026 Guide';
const DESCRIPTION = 'A practical guide to pilot salary in India, salary bands by career stage, airline comparisons, training investment, and the CPL-to-employment pathway.';

const salaryOverview = [
  { stage: 'Student pilot / training phase', range: '₹0', note: 'Training is a cost, not a salary. Cadet and sponsorship models vary and the contract must be read before signing.' },
  { stage: 'Junior first officer', range: '₹1.2L–₹3.5L / month', note: 'Entry-level rates vary by airline, aircraft type, fixed pay versus flying-hour components and roster size.' },
  { stage: 'Senior first officer', range: '₹3.5L–₹6.5L / month', note: 'The band expands with fleet, hours, aircraft type, and the airline’s pay structure.' },
  { stage: 'Captain', range: '₹6L–₹12L+ / month', note: 'Captain earnings rise materially as command, fleet and seniority improve.' },
  { stage: 'Senior captain / check captain', range: '₹12L–₹18L+ / month', note: 'Top-of-scale pay is highly airline-dependent and can include incentives and allowances.' },
];

const careerStages = [
  { title: 'Student Pilot / CPL Phase', salary: '₹0', description: 'No income while paying for training; the cost should be treated as an investment and a financing decision.' },
  { title: 'First Officer – Entry Level', salary: '₹1.2L–₹3.5L / month', description: 'The first airline job is the most variable stage, because pay depends on contract type, fleet and hours flown.' },
  { title: 'First Officer – Experienced', salary: '₹3.5L–₹6.5L / month', description: 'Salaries increase with seniority, route mix and the airline’s pay model.' },
  { title: 'Captain – Narrow Body', salary: '₹6L–₹9L / month', description: 'Captains receive a large jump in pay after command upgrade and fleet assignment.' },
  { title: 'Captain – Wide Body / Senior', salary: '₹9L–₹15L / month', description: 'Carry a stronger premium linked to aircraft type and seniority.' },
  { title: 'Command / Check Captain', salary: '₹12L–₹18L+ / month', description: 'These roles combine command authority, higher responsibility and additional allowances.' },
];

const airlineRows = [
  { airline: 'IndiGo', aircraft: 'A320 / A321', salary: '₹1.5L–₹4.5L / month (FO)', note: 'Large narrow-body network with a strong base pay and variable hours component.' },
  { airline: 'Air India', aircraft: 'A320 / B787 / A350', salary: '₹2.5L–₹7L+ / month', note: 'Pay varies by fleet, rank and contract, with wide-body exposure usually commanding a premium.' },
  { airline: 'Air India Express', aircraft: 'A320', salary: '₹1.8L–₹5L / month', note: 'Typically competitive with a narrow-body base and variable flying-hour linked components.' },
  { airline: 'Akasa Air', aircraft: '737 MAX', salary: '₹2L–₹6L+ / month', note: 'Earnings depend on fleet allocation, seniority and whether the contract is fixed or hour-linked.' },
  { airline: 'Alliance Air', aircraft: 'ATR / regional', salary: '₹1.2L–₹3.5L / month', note: 'Regional operations often start lower than network-carrier pay.' },
];

const costRows = [
  { item: 'DGCA Class 1 medical', estimate: '₹10,000–₹30,000' },
  { item: 'DGCA computer number and exam fee', estimate: '₹10,000–₹20,000' },
  { item: 'Ground school and exam prep', estimate: '₹1.5L–₹3.5L' },
  { item: 'Flight training and flying hours', estimate: '₹30L–₹60L+' },
  { item: 'Type rating / aircraft conversion', estimate: '₹10L–₹25L+' },
  { item: 'Total training investment', estimate: '₹40L–₹90L+' },
];

const qa = [
  {
    q: 'What is the starting salary of a pilot in India?',
    a: 'The starting pilot salary in India is highly dependent on the airline, aircraft type, contract structure and whether the pay is fixed or linked to hours flown. New first officers usually begin lower than captains and can see significant increases with experience and fleet upgrades.',
  },
  {
    q: 'Do pilots get paid during CPL training?',
    a: 'No. CPL training is a cost, not a wage. A student pays for flight training and associated fees while building hours toward the licence. Cadet programmes and sponsorship models are different and must be checked carefully in the contract.',
  },
  {
    q: 'How much does a captain earn in India?',
    a: 'Captain salaries in India can be materially above first officer pay and often start in the low single-digit lakhs per month for narrow-body commands, rising further for wide-body operations and senior check positions.',
  },
  {
    q: 'Why do pilot salary figures online differ so much?',
    a: 'They usually differ because they mix gross pay, fixed pay, hourly incentives, allowances and airline-specific contracts. Salary figures should be checked against the airline’s published terms, the aircraft flown and the pilot’s rank and seniority before trusting any number.',
  },
  {
    q: 'Is a pilot salary in India enough to recover training costs?',
    a: 'Training repayment depends on the pilot’s job outcome, aircraft assignment, route structure, time to command, and the contract terms. Some pilots recover their costs faster than others, while others spend years moving from training to a stable command seat.',
  },
];

const quickAnswer = {
  question: 'What is the average pilot salary in India?',
  answer: 'Pilot salary in India varies widely by rank, airline and aircraft type. New first officers typically start in the low to mid lakhs per month, while captains can earn several times more once they reach command seats and senior fleet assignments.',
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: HEADING,
  description: DESCRIPTION,
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://weoneaviation.in/pilot-salary-in-india' },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in/' },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'We One Aviation Academy',
    url: 'https://weoneaviation.in/',
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const tocHeadings = [
  { id: 'salary-overview', title: 'Salary overview' },
  { id: 'career-progression', title: 'Career progression' },
  { id: 'detailed-breakdown', title: 'Detailed salary breakdown' },
  { id: 'airline-comparison', title: 'Airline-wise salary comparison' },
  { id: 'components-deductions', title: 'Salary components and deductions' },
  { id: 'cpl-pathway', title: 'CPL-to-employment pathway' },
  { id: 'training-investment', title: 'Training investment and ROI' },
  { id: 'domestic-vs-overseas', title: 'Domestic vs. overseas careers' },
  { id: 'skills-and-qualifications', title: 'Skills and qualifications' },
  { id: 'we-one-training', title: 'How We One Aviation prepares you' },
  { id: 'faq', title: 'Frequently asked questions' },
  { id: 'sources', title: 'Sources and editorial transparency' },
];

const sources = [
  { label: 'DGCA flight duty time limits and pilot regulations', url: 'https://www.dgca.gov.in/' },
  { label: 'Ministry of Civil Aviation and pilot supply statements', url: 'https://www.civilaviation.gov.in/' },
  { label: 'Airline careers and recruitment pages', url: 'https://www.goindigo.in/' },
  { label: 'We One Aviation Academy course and training information', url: 'https://weoneaviation.in/' },
];

export default function PilotSalaryInIndiaPage() {
  return (
    <BlogPostLayout
      title="Pilot Salary in India | We One Aviation"
      description={DESCRIPTION}
      heading={HEADING}
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      quickAnswer={quickAnswer}
      summaryTitle="Quick facts"
      summaryItems={[
        'Training is a cost, not a wage, before a first airline job.',
        'Entry-level first officers typically earn far less than captains.',
        'Salary is shaped by rank, fleet, airline and whether pay is fixed or hour-linked.',
        'A robust training plan matters as much as salary assumptions.',
      ]}
      tocHeadings={tocHeadings}
      related={[
        { lead: 'Read the broader fundamentals on becoming a pilot in India in', anchor: 'How to become a pilot after 12th', href: '/how-to-become-a-pilot-after-12th' },
        { lead: 'See the training-cost breakdown in', anchor: 'Pilot training cost in India', href: '/blogs/pilot-training-cost-in-india' },
        { lead: 'Compare the route and timing in', anchor: 'DGCA ground classes', href: '/dgca-ground-classes' },
      ]}
      sources={sources}
      sourcesCheckedOn={DATE_MODIFIED}
      schema={[articleSchema, faqSchema]}
      bottomCta={{
        title: 'Need a realistic pilot career plan?',
        body: 'Talk to We One Aviation about the route, training investment and the qualifications that matter before you commit to a cadet or airline path.',
        href: '/contact',
        buttonLabel: 'Speak to an advisor',
      }}
    >
      <p>
        Pilot salary in India is shaped by more than a single number. The real picture includes rank, airline,
        aircraft type, seniority, roster and whether a significant share of pay is tied to flying hours. A strong
        decision should start with the route to employment, the salary structure and the practical cost of training.
      </p>
      <p>
        In India, a pilot does not begin earning at the moment a CPL is issued. Employment depends on airline
        recruitment, fleet allocation, type-rating conversion and the time needed to move from training into a line
        flying role. The work ahead is demanding, and the training is expensive; the right question is not just
        “what can I earn?” but “what is the realistic route to earning, and what does it cost to get there?”
      </p>

      <h2 id="salary-overview" className={H2}>Salary overview</h2>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Career stage</th>
              <th className={TH}>Indicative salary range</th>
              <th className={TH}>What drives the range</th>
            </tr>
          </thead>
          <tbody>
            {salaryOverview.map((row) => (
              <tr key={row.stage}>
                <td className={TD_HEAD}>{row.stage}</td>
                <td className={TD}>{row.range}</td>
                <td className={TD}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="career-progression" className={H2}>Career progression</h2>
      <div className="space-y-4 mt-6">
        {careerStages.map((stage, index) => (
          <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" key={stage.title}>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-av-blue text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <h3 className={H3 + ' mt-0 mb-0'}>{stage.title}</h3>
                  <span className="font-montserrat text-sm font-bold text-av-orange">{stage.salary}</span>
                </div>
                <p className="mt-2 text-base text-gray-700">{stage.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 id="detailed-breakdown" className={H2}>Detailed salary breakdown</h2>
      <p>
        A pilot’s salary is often made up of a fixed component, a flying-hours-linked component and a set of officers’
        allowances. For many new airline hires, the hour-linked element can be the largest cash-moving part of the
        package, which is why the route, aircraft type and roster matter so much.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Stage</th>
              <th className={TH}>Typical monthly band</th>
              <th className={TH}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={TD_HEAD}>Junior first officer</td>
              <td className={TD}>₹1.2L–₹3.5L</td>
              <td className={TD}>Entry-level hires usually have lower fixed pay and are more exposed to schedule-driven variance.</td>
            </tr>
            <tr>
              <td className={TD_HEAD}>Senior first officer</td>
              <td className={TD}>₹3.5L–₹6.5L</td>
              <td className={TD}>Experienced cockpit crew command a stronger package once they have a stable roster and more flying hours.</td>
            </tr>
            <tr>
              <td className={TD_HEAD}>Captain</td>
              <td className={TD}>₹6L–₹12L+</td>
              <td className={TD}>The command upgrade is the largest single earnings jump in a pilot’s career.</td>
            </tr>
            <tr>
              <td className={TD_HEAD}>Senior captain / check pilot</td>
              <td className={TD}>₹12L–₹18L+</td>
              <td className={TD}>Additional responsibility, fleet premiums and allowances can materially lift total compensation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="airline-comparison" className={H2}>Airline-wise salary comparison</h2>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Airline</th>
              <th className={TH}>Aircraft type</th>
              <th className={TH}>Indicative salary band</th>
              <th className={TH}>Pay driver</th>
            </tr>
          </thead>
          <tbody>
            {airlineRows.map((row) => (
              <tr key={row.airline}>
                <td className={TD_HEAD}>{row.airline}</td>
                <td className={TD}>{row.aircraft}</td>
                <td className={TD}>{row.salary}</td>
                <td className={TD}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600">
        These figures are indicative and vary according to rank, seniority, contractual terms and whether the package is
        fixed, hour-linked or includes additional allowances.
      </p>

      <h2 id="components-deductions" className={H2}>Salary components and deductions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className={H3 + ' mt-0'}>Fixed pay</h3>
          <p className="text-gray-700">A base monthly amount that is paid regardless of the roster, often with a smaller fixed component than the total headline figure suggests.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className={H3 + ' mt-0'}>Variable pay</h3>
          <p className="text-gray-700">A large portion can depend on flight hours, sector counts, night flying, aircraft type or performance-linked allowances.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className={H3 + ' mt-0'}>Statutory deductions</h3>
          <p className="text-gray-700">Income tax, provident fund contributions, professional and benefit deductions are common, reducing the take-home salary.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <h3 className={H3 + ' mt-0'}>Net take-home</h3>
          <p className="text-gray-700">The actual monthly cash available for living costs is often materially lower than the headline salary band or CTC figure.</p>
        </div>
      </div>

      <h2 id="cpl-pathway" className={H2}>CPL-to-employment pathway</h2>
      <div className="space-y-5">
        {[
          'Complete the Class 12 requirements and DGCA medical screening.',
          'Pass DGCA ground papers and obtain the necessary licence and training approvals.',
          'Complete flight training and build the required hours for a Commercial Pilot Licence.',
          'Complete the type rating and airline assessment process.',
          'Enter induction, line training and the first release to line operations as a first officer.',
          'Move from first officer to captain by meeting command, aircraft and airline seniority requirements.',
        ].map((item, index) => (
          <div key={item} className="flex gap-4 rounded-2xl border border-gray-200 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-av-orange text-sm font-bold text-white">
              {index + 1}
            </div>
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
      <p>
        The gap between licence and employment is real. Even with a CPL, pilots must still wait for the right opening,
        fleet assignment and airline-specific hiring cycle. That is one of the major reasons the early salary phase is
        both variable and slower than many online estimates suggest.
      </p>

      <h2 id="training-investment" className={H2}>Training investment and ROI</h2>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Cost category</th>
              <th className={TH}>Indicative cost</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((row) => (
              <tr key={row.item}>
                <td className={TD_HEAD}>{row.item}</td>
                <td className={TD}>{row.estimate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A realistic return-on-investment discussion requires the full cost picture: academy fees, flying hour costs,
        medical and DGCA paperwork, and type-rating costs. The payback period can vary significantly depending on how
        quickly the student moves from CPL to a line flying contract and then into a command upgrade.
      </p>

      <h2 id="domestic-vs-overseas" className={H2}>Domestic vs. overseas careers</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className={H3 + ' mt-0'}>Indian domestic airlines</h3>
          <p className="text-gray-700">Strong growth at some carriers, but salary levels and progression remain closely tied to fleet type, seniority and airline-specific recruitment patterns.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className={H3 + ' mt-0'}>Middle Eastern / Gulf carriers</h3>
          <p className="text-gray-700">Often higher headline pay for some ranks, but the total package should be checked carefully against allowances, tax exposure and contract commitments.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className={H3 + ' mt-0'}>North America / Europe</h3>
          <p className="text-gray-700">These markets can offer a different salary structure and often operate under a more mature airline pay system, but the route and visa requirements differ materially.</p>
        </div>
      </div>

      <h2 id="skills-and-qualifications" className={H2}>Skills and qualifications</h2>
      <ul className={UL}>
        <li>Strong communication and cockpit discipline.</li>
        <li>Sound decision-making under time pressure.</li>
        <li>Leadership, teamwork and resource management.</li>
        <li>Excellent situational awareness, safety mindset and professional resilience.</li>
      </ul>

      <h2 id="we-one-training" className={H2}>How We One Aviation prepares you for a pilot career</h2>
      <div className="rounded-3xl bg-av-blue p-6 text-white shadow-lg">
        <p className="mb-4 text-lg leading-relaxed">
          We One Aviation helps students plan the route to a pilot career with realistic guidance on training,
          DGCA requirements and the practical decisions behind salary and employment outcomes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dgca-ground-classes" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-av-blue transition hover:bg-gray-100">DGCA Ground Classes</Link>
          <Link href="/courses/cpl" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-av-blue transition hover:bg-gray-100">CPL Training in India</Link>
          <Link href="/cadet-pilot-program" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-av-blue transition hover:bg-gray-100">Cadet Pilot Program Preparation</Link>
          <Link href="/airline-preparation-course" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-av-blue transition hover:bg-gray-100">Airline Preparation and Simulator Familiarization</Link>
          <Link href="/contact" className="rounded-full border border-white px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-av-blue">Speak with the academy</Link>
        </div>
      </div>

      <h2 id="faq" className={H2}>Frequently asked questions</h2>
      <div className="space-y-3">
        {qa.map((item) => (
          <div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-4">
            <h3 className={H3 + ' mt-0'}>{item.q}</h3>
            <p className="text-gray-700">{item.a}</p>
          </div>
        ))}
      </div>

      <h2 id="sources" className={H2}>Sources and editorial transparency</h2>
      <ol className={OL}>
        {sources.map((item) => (
          <li key={item.label}>
            <a href={item.url} target="_blank" rel="noreferrer" className={LINK}>{item.label}</a>
          </li>
        ))}
      </ol>
      <p>
        This page is intended to help students interpret pilot salary information more accurately, not to replace a
        contractual offer. Salary should always be read in context: airline, aircraft, rank, seniority, allowances,
        deductions and training cost are all part of the real picture.
      </p>
    </BlogPostLayout>
  );
}
