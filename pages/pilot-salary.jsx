import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import FAQSection from '../components/FAQSection';
import Layout from '../components/Layout';
import QuickAnswer from '../components/QuickAnswer';
import StructuredData from '../components/StructuredData';

const SITE_URL = 'https://weoneaviation.in';
const PAGE_URL = `${SITE_URL}/pilot-salary`;
const PUBLISHED_ON = '2026-10-30';
const PAGE_MODIFIED = '2026-10-31';
const PAGE_TITLE = 'Pilot Salary Worldwide: By Country, Rank & Experience';
const PAGE_DESCRIPTION = 'Compare official pilot pay data by country and role, learn what affects earnings, and understand why a CPL does not guarantee a pilot job or salary.';
const SOURCES_CHECKED_ON = '31 October 2026';

const countryData = [
  {
    country: 'United States',
    pageHref: '/pilot-salary-in-usa',
    currency: 'USD',
    figure: 'US$226,600 per year',
    label: 'Median annual wage for airline pilots, copilots and flight engineers; US$122,670 for commercial pilots.',
    period: 'May 2024',
    note: 'Separate occupation groups reported by the BLS, not a rank-by-rank airline pay scale. These are US national wage benchmarks, not guaranteed offers.',
    source: 'U.S. Bureau of Labor Statistics',
    href: 'https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm',
  },
  {
    country: 'United Kingdom',
    pageHref: '/pilot-salary-in-uk',
    currency: 'GBP',
    figure: 'No verified airline-specific range',
    label: 'ONS occupation earnings do not provide a current airline pay scale by pilot rank.',
    period: `2025 provisional occupation data; checked ${SOURCES_CHECKED_ON}.`,
    note: 'A broad occupation table is not a First Officer or Captain salary. No UK pay figure is presented without a matching, current source.',
    source: 'UK Office for National Statistics',
    href: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/occupation4digitsoc2010ashetable14',
  },
  {
    country: 'Canada',
    pageHref: '/pilot-salary-in-canada',
    currency: 'CAD',
    figure: 'C$52.00 per hour',
    label: 'National median wage for the Job Bank airplane-pilot occupation.',
    period: 'Reference period 2023–2024; Job Bank updated 19 November 2025.',
    note: 'An hourly occupation-level wage, not a monthly or annual salary and not specific to First Officer or Captain rank.',
    source: 'Government of Canada Job Bank',
    href: 'https://www.jobbank.gc.ca/marketreport/wages-occupation/18147/ca',
  },
  {
    country: 'Australia',
    pageHref: '/pilot-salary-in-australia',
    currency: 'AUD',
    figure: 'No pilot-only figure shown',
    label: 'Jobs and Skills Australia reports earnings for a wider Air Transport Professionals group.',
    period: 'The profile reports May 2025 earnings for the broader occupation group.',
    note: 'That group includes roles beyond pilots. Its weekly figure should not be presented as an Australian pilot salary.',
    source: 'Jobs and Skills Australia',
    href: 'https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-anzsco/2311-air-transport-professionals',
  },
  {
    country: 'India',
    pageHref: '/airline-pilot-salary-in-india',
    currency: 'INR',
    figure: 'No comparable public pay scale found',
    label: 'Public airline recruitment information reviewed does not provide a pilot salary scale.',
    period: `Official recruitment information checked ${SOURCES_CHECKED_ON}.`,
    note: 'The India-specific salary pages explain the limits of public evidence. A CPL is a licence, not an employment offer.',
    source: 'Air India Pilot Careers',
    href: 'https://pilotcareers.airindia.com/',
  },
  {
    country: 'United Arab Emirates',
    pageHref: '/pilot-salary-in-uae',
    currency: 'AED',
    figure: 'No comparable public figure found',
    label: 'No pilot-specific government wage statistic or public airline pay scale was verified for this comparison.',
    period: `Reviewed ${SOURCES_CHECKED_ON}.`,
    note: 'An individual airline offer may set out salary, allowances, benefits and contract terms; those terms are not a country-wide average.',
    source: 'UAE General Civil Aviation Authority (GCAA) — licensing information',
    href: 'https://www.gcaa.gov.ae/en/',
  },
];

const rankRows = [
  {
    rank: 'Student pilot',
    whatChanges: 'Training is usually an education expense, not paid employment. Cadet or sponsored arrangements have separate written terms.',
    evidence: 'No universal pilot salary.',
  },
  {
    rank: 'Newly qualified CPL holder',
    whatChanges: 'A licence permits eligible commercial flying; it does not itself provide a job, a roster or a salary.',
    evidence: 'No salary until an employer hires the pilot.',
  },
  {
    rank: 'First Officer',
    whatChanges: 'Pay depends on the operator, aircraft, country, contract and roster. Published national statistics may combine ranks.',
    evidence: 'No consistent global First Officer band.',
  },
  {
    rank: 'Senior First Officer',
    whatChanges: 'Experience and seniority can affect pay, but titles and upgrade criteria differ between operators.',
    evidence: 'Compare the actual offer and occupation definition.',
  },
  {
    rank: 'Captain',
    whatChanges: 'Command responsibility usually changes the role and compensation structure; upgrade timing is employer-specific.',
    evidence: 'No universal Captain salary.',
  },
  {
    rank: 'Senior Captain / training captain',
    whatChanges: 'Fleet, command seniority, training duties and additional responsibilities may affect total compensation.',
    evidence: 'Check the employer’s current contract terms.',
  },
];

const roleCards = [
  {
    title: 'Commercial airline pilot',
    text: 'Airline pilot pay may combine fixed pay, flight-time or duty-related pay, and contractual allowances. Public government statistics are useful benchmarks where available, but they do not reveal an individual airline’s offer or guarantee a particular rank.',
  },
  {
    title: 'Private and business jet pilot',
    text: 'Compensation can depend on the aircraft, operator, schedule, travel requirements and whether the role is employed directly or through a management company. Comparable public salary data is limited, so check the written role and contract.',
  },
  {
    title: 'Cargo pilot',
    text: 'Cargo operations can involve different rosters, aircraft and night duties from passenger airlines. Do not assume cargo pilots receive a fixed premium; compare published employer terms for the same country, rank and aircraft category.',
  },
  {
    title: 'Helicopter pilot',
    text: 'Helicopter work spans several sectors, including offshore, emergency services, tourism and utility operations. Licence, mission experience, location and employer requirements differ enough that one worldwide salary figure would be misleading.',
    href: '/helicopter-pilot-salary-in-india',
    linkLabel: 'Read the India helicopter pilot salary evidence',
  },
  {
    title: 'Flight instructor',
    text: 'Instructor pay may be structured around employment terms, teaching duties or flying activity. A pilot building hours as an instructor should confirm how the role is paid and what work is guaranteed rather than relying on an industry-wide estimate.',
    href: '/flight-instructor-salary-in-india',
    linkLabel: 'Read the India flight instructor salary evidence',
  },
];

const salaryFactors = [
  ['Airline or operator', 'Employer pay scales, benefits, hiring needs and contract terms differ.'],
  ['Country and tax rules', 'Currency, taxation, cost of living and employment law affect take-home value.'],
  ['Aircraft type and fleet', 'Fleet assignment can affect qualifications, duties and the terms attached to a role.'],
  ['Flying hours and roster', 'Where compensation includes variable pay, roster and eligible duty can change the total.'],
  ['Experience and seniority', 'Experience can support progression, but promotion and pay steps depend on the employer.'],
  ['Rank and responsibility', 'First Officer, Captain and training duties are different jobs, not interchangeable salary labels.'],
  ['Employment contract', 'Check fixed pay, variable pay, allowances, benefits, deductions, bonds and currency in writing.'],
];

const sources = [
  {
    label: 'U.S. Bureau of Labor Statistics — Airline and Commercial Pilots, May 2024 wage data',
    href: 'https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm',
  },
  {
    label: 'UK Office for National Statistics — ASHE Table 14, occupation by four-digit SOC',
    href: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/occupation4digitsoc2010ashetable14',
  },
  {
    label: 'Government of Canada Job Bank — Airplane pilot wages; updated 19 November 2025',
    href: 'https://www.jobbank.gc.ca/marketreport/wages-occupation/18147/ca',
  },
  {
    label: 'Jobs and Skills Australia — Air Transport Professionals profile; May 2025 earnings data',
    href: 'https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-anzsco/2311-air-transport-professionals',
  },
  {
    label: 'Air India Pilot Careers — official recruitment information',
    href: 'https://pilotcareers.airindia.com/',
  },
];

const faqs = [
  {
    question: 'How much do pilots earn worldwide?',
    answer: 'There is no reliable single worldwide average. Governments publish different measures for different occupations and pay periods, while many airlines do not publish their pilot pay scales. Compare a dated source for the country, job and rank you mean.',
  },
  {
    question: 'What is the average pilot salary by country?',
    answer: 'A single comparable country average is not available from the sources used here. The U.S. and Canada publish occupation-level wage benchmarks, UK occupation data does not provide an airline-rank salary scale, Australia reports a broader air-transport occupation group, and no comparable public pilot figure was verified for India or the UAE.',
  },
  {
    question: 'Does completing a CPL guarantee a pilot job or salary?',
    answer: 'No. A CPL is a licence, not an employment contract. Hiring depends on vacancies, selection, experience, ratings and employer requirements; salary begins only under an actual paid role and its written terms.',
  },
  {
    question: 'Is a pilot salary figure gross or take-home pay?',
    answer: 'It depends on the source. Check whether a published figure is a wage, gross salary, net pay, or total compensation, and whether it includes allowances, variable pay or benefits. The sources on this page are labelled by the measure they publish; some do not specify gross or net.',
  },
  {
    question: 'Do pilots get paid during flight training?',
    answer: 'Do not assume so. Training is commonly a cost to the student, while cadet, sponsored or employed training arrangements vary. Read the specific programme or employment agreement for any stipend, repayment or bond terms.',
  },
  {
    question: 'How should I compare monthly and annual pilot salaries?',
    answer: 'Compare the same currency, country, occupation, rank and pay basis. An annual wage and an hourly median are different measures; converting one into another without knowing paid hours, roster and allowances can create a false comparison.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED_ON,
  dateModified: PAGE_MODIFIED,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  image: `${SITE_URL}/assets/Flighs/airplan.webp`,
  author: {
    '@type': 'Organization',
    name: 'We One Aviation Academy',
    url: `${SITE_URL}/`,
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'We One Aviation Academy',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/Logo.webp` },
  },
  citation: sources.map((source) => ({
    '@type': 'CreativeWork',
    name: source.label,
    url: source.href,
  })),
};

const sectionHeading = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue';
const sectionText = 'mt-4 max-w-4xl leading-7 text-gray-700';
const sourceLink = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

function SalaryCountryCard({ country }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-montserrat text-lg font-bold text-av-blue">{country.country}</h3>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold tracking-wide text-av-orange">
          {country.currency}
        </span>
      </div>
      <p className="mt-4 text-xl font-black leading-snug text-av-blue">{country.figure}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{country.label}</p>
      <p className="mt-3 text-xs font-semibold text-gray-500">{country.period}</p>
      <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-6 text-gray-600">{country.note}</p>
      {country.href ? (
        <a
          href={country.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-block text-sm ${sourceLink}`}
        >
          Source: {country.source}
        </a>
      ) : (
        <p className="mt-4 text-sm font-semibold text-gray-500">Source note: public sources reviewed for this page</p>
      )}
      {country.pageHref && (
        <Link href={country.pageHref} className={`mt-3 inline-block text-sm ${sourceLink}`}>
          Read the {country.country} pilot salary guide
        </Link>
      )}
    </article>
  );
}

export default function PilotSalaryPage() {
  return (
    <Layout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      includeDefaultFAQs={false}
    >
      <StructuredData data={articleSchema} />

      <>
        <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-10 text-white md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-av-orange">
                  Worldwide pilot pay guide
                </p>
                <h1 className="font-montserrat text-4xl font-black leading-tight md:text-6xl">
                  Pilot Salary: How Much Do Pilots Earn?
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                  Compare dated official wage data where it exists, understand differences by country and role,
                  and learn why a licence or online salary estimate is not a job offer.
                </p>
                <p className="mt-4 text-sm text-white/60">
                  Evidence checked {SOURCES_CHECKED_ON}. Figures are not guaranteed earnings.
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <Image
                  src="/assets/Flighs/airplan.webp"
                  alt="Commercial passenger aircraft cruising above a cloud layer"
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-av-navy/90 to-transparent p-5 pt-16">
                  <p className="font-montserrat text-sm font-bold text-white md:text-base">
                    One profession. Different countries, contracts and pay measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <Breadcrumb />
            <QuickAnswer
              question="What is a pilot's salary worldwide?"
              answer="There is no reliable single worldwide average: official sources define occupations and pay periods differently. For example, the U.S. BLS reports May 2024 median annual wages of US$226,600 for airline pilots, copilots and flight engineers, and US$122,670 for commercial pilots. Canada's Job Bank reports a C$52 hourly median for airplane pilots. These are dated benchmarks, not job offers."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['No world average', 'Country datasets use different job definitions and pay periods.'],
                ['Rank matters', 'A CPL does not equal an airline job or a First Officer salary.'],
                ['Read the contract', 'Fixed pay, variable pay, allowances and benefits are not the same measure.'],
                ['Check the date', 'Use the source period and update date, not an undated web estimate.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <h2 className="font-montserrat font-bold text-av-blue">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="countries" className="bg-gray-50 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="section-tag">Country comparison</p>
            <h2 className={sectionHeading}>What do official sources say about pilot pay by country?</h2>
            <p className={sectionText}>
              These figures are not a like-for-like global league table. They use different currencies,
              occupation groups and pay periods; some are national wage statistics and others are career
              guidance. Read each source note before comparing them, and do not treat any figure as a
              guaranteed salary.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {countryData.map((country) => (
                <SalaryCountryCard key={country.country} country={country} />
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-gray-600">
              No worldwide or country-level average is calculated here. The Australian figure is intentionally
              not presented as a pilot salary because its official occupation group includes non-pilot roles.
            </p>
          </div>
        </section>

        <section id="rank-experience" className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="section-tag">Rank and experience</p>
            <h2 className={sectionHeading}>How does pilot salary change by rank and experience?</h2>
            <p className={sectionText}>
              Career progression can change duties and compensation, but there is no universal worldwide
              salary ladder. Pilot titles, promotion rules and published statistics vary, so the table below
              explains the stages without assigning unsupported salary bands.
            </p>
            <div className="mt-7 overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">Pilot salary by rank and experience: role descriptions and evidence notes</caption>
                <thead className="bg-av-blue text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-montserrat">Career stage</th>
                    <th scope="col" className="px-5 py-4 font-montserrat">What changes</th>
                    <th scope="col" className="px-5 py-4 font-montserrat">Evidence note</th>
                  </tr>
                </thead>
                <tbody>
                  {rankRows.map((row) => (
                    <tr key={row.rank} className="border-t border-gray-200 odd:bg-white even:bg-gray-50">
                      <th scope="row" className="px-5 py-4 align-top font-bold text-av-blue">{row.rank}</th>
                      <td className="px-5 py-4 align-top leading-6 text-gray-700">{row.whatChanges}</td>
                      <td className="px-5 py-4 align-top leading-6 text-gray-600">{row.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              Experience does not guarantee a promotion or a particular pay rise. For India-specific guidance
              about pilot salary claims and CPL-to-employment uncertainty, read the{' '}
              <Link href="/blogs/pilot-salary-in-india" className={sourceLink}>India salary guide</Link>.
            </p>
          </div>
        </section>

        <section id="pilot-jobs" className="bg-gray-50 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="section-tag">Pilot roles</p>
            <h2 className={sectionHeading}>Do airline, private, cargo and helicopter pilots earn the same?</h2>
            <p className={sectionText}>
              No single pay figure applies across pilot jobs. Aircraft, operating sector, roster, employer,
              country and contract can all differ, and public statistics may group unlike roles together.
              Use role-specific employer terms or a government dataset with a clearly stated occupation.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {roleCards.map((role) => (
                <article key={role.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="font-montserrat text-lg font-bold text-av-blue">{role.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{role.text}</p>
                  {role.href && (
                    <Link href={role.href} className={`mt-4 inline-block text-sm ${sourceLink}`}>
                      {role.linkLabel}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="salary-factors" className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-tag">What affects earnings?</p>
            <h2 className={sectionHeading}>Which factors affect a pilot's salary?</h2>
            <p className={sectionText}>
              A salary is an employment term, not a standard feature of a licence. When reviewing an offer,
              compare the same country, role and rank, then separate fixed pay from variable pay and benefits.
              The details below explain why two online figures may not describe the same thing.
            </p>
            <dl className="mt-7 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-5">
              {salaryFactors.map(([factor, explanation]) => (
                <div key={factor} className="grid gap-1 py-4 md:grid-cols-[220px_1fr] md:gap-6">
                  <dt className="font-montserrat font-bold text-av-blue">{factor}</dt>
                  <dd className="text-sm leading-6 text-gray-600">{explanation}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="monthly-annual" className="bg-av-blue px-4 py-12 text-white md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-tag">Understand the number</p>
            <h2 className="font-montserrat text-2xl font-bold text-white md:text-3xl">
              How should you compare pilot salary per month and per year?
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-white/80">
              Check the source’s own unit and pay basis before comparing. The U.S. BLS figures above are
              annual occupation medians; Canada Job Bank publishes an hourly median; UK occupation data
              does not establish an airline-rank salary. None should be silently converted into monthly take-home pay without
              the hours, roster, deductions, allowances and contract needed to support that calculation.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ['Gross or net?', 'Confirm whether the figure is before tax, after deductions, or not specified.'],
                ['Base or total?', 'Separate basic salary from allowances, variable pay, pension and benefits.'],
                ['Which period?', 'Keep annual, hourly and weekly measures labelled; do not imply they are equivalent.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-white/15 bg-white/5 p-5">
                  <h3 className="font-montserrat font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="become-pilot" className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="section-tag">Career pathway</p>
            <h2 className={sectionHeading}>How do you become a commercial airline pilot?</h2>
            <p className={sectionText}>
              The route depends on the country’s aviation regulator and each employer’s selection criteria.
              In India, the pathway includes eligibility, medical and examination requirements, flight training
              and licence issue; an airline role requires a separate hiring decision.
            </p>
            <ol className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ['Check eligibility and medical requirements', 'Confirm the current rules with the aviation authority before committing to training.'],
                ['Complete required theory and examinations', 'In India, review the DGCA route and exam requirements before booking a programme.'],
                ['Train with an appropriate flying organisation', 'Verify approvals, training terms, availability and the full written cost.'],
                ['Apply for jobs and meet operator requirements', 'Selection, ratings, experience and employment terms are set by the employer.'],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4 rounded-2xl border border-gray-200 p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-orange-50 font-montserrat font-black text-av-orange">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-montserrat font-bold text-av-blue">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-6 text-gray-600">
              Explore the India route in our{' '}
              <Link href="/blogs/how-to-become-an-airline-pilot-in-india" className={sourceLink}>airline pilot guide</Link>
              {' '}and our overview of{' '}
              <Link href="/commercial-pilot-license-salary" className={sourceLink}>commercial pilot salary and CPL guidance in India</Link>.
            </p>
          </div>
        </section>

        <section id="cpl-and-investment" className="bg-gray-50 px-4 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <p className="section-tag">Employment reality</p>
              <h2 className={sectionHeading}>Does a CPL guarantee a pilot job or salary?</h2>
              <p className={sectionText}>
                No. A CPL demonstrates that a pilot holds a licence; it does not promise a vacancy, selection,
                a start date or a salary. Hiring depends on the employer’s needs and criteria, and pay is set
                by the actual employment agreement.
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                For the India-specific explanation, see{' '}
                <Link href="/commercial-pilot-license-salary" className={sourceLink}>what is and is not published about CPL-related salary</Link>
                {' '}and the{' '}
                <Link href="/blogs/pilot-salary-in-india" className={sourceLink}>guide to reading India pilot-pay claims</Link>.
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <p className="section-tag">Plan responsibly</p>
              <h2 className={sectionHeading}>How should training investment be compared with potential earnings?</h2>
              <p className={sectionText}>
                Compare verified training costs with a conservative plan that does not assume immediate
                employment or a particular salary. Include financing, living expenses, training duration and
                uncertainty between licence issue and a paid role; do not claim a payback period from
                unsourced salary figures.
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                See our{' '}
                <Link href="/cost-transparency" className={sourceLink}>cost transparency page</Link>
                {' '}and{' '}
                <Link href="/blogs/pilot-training-cost-in-india" className={sourceLink}>published pilot training costs in India</Link>
                {' '}for figures that can be checked.
              </p>
            </article>
          </div>
        </section>

        <section id="sources" className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <p className="section-tag">Evidence and limitations</p>
            <h2 className={sectionHeading}>Which sources support this pilot salary comparison?</h2>
            <p className={sectionText}>
              Sources were checked on {SOURCES_CHECKED_ON}. Use the dates and definitions shown by each
              publisher: the U.S. and Canada report occupation wages, UK data does not establish an airline-rank
              salary, and Australia’s cited profile covers a broader occupation group. Where a source does not publish a
              pilot-specific comparable value, this page does not substitute an estimate.
            </p>
            <ul className="mt-6 space-y-3">
              {sources.map((source) => (
                <li key={source.href} className="text-sm leading-6 text-gray-700">
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className={sourceLink}>
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Pilot Salary: Frequently Asked Questions" includeSchema={false} />
      </>
    </Layout>
  );
}
