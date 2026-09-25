import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { PILOT_SUPPLY, FTO, LICENCES, ACADEMY } from '../../lib/facts';

/*
 * New post, 2026-09-25. Every page on this site that mentions pilot demand —
 * the salary page, career counselling, AME — cites PILOT_SUPPLY as one fact
 * among several. None of them is actually about the question a prospective
 * student or parent asks first, before eligibility or cost: will there be a
 * job at the end of this. This page owns that question, using nothing beyond
 * PILOT_SUPPLY, FTO and LICENCES from lib/facts.js — the Ministry of Civil
 * Aviation's own Parliament answer, DGCA's own CPL-issuance figures, and the
 * licence ladder that explains what "commander" actually means.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema is
 * inlined here rather than via data/pageFaqs.js, which this post cannot edit.
 */
const DATE_PUBLISHED = '2026-09-25';
const DATE_MODIFIED = '2026-09-25';
const CANONICAL = 'https://weoneaviation.in/blogs/pilot-shortage-in-india';

const atpl = LICENCES.find((l) => l.code === 'ATPL');
const cpl = LICENCES.find((l) => l.code === 'CPL');

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "Is There a Pilot Shortage in India? What the Government's Own Numbers Say",
  description:
    "The Ministry of Civil Aviation's own Parliament answer on pilot supply, DGCA's yearly CPL-issuance figures, and what the real bottleneck — command, not entry — means for someone deciding whether to train.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot career guide',
  keywords: 'pilot shortage in india, is there a pilot shortage in india, CPL issued india, DGCA pilot licence data, airline pilot jobs india, pilot demand india 2026',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'Is there really a pilot shortage in India in 2026?',
    a: `Not for pilots as a group. The Ministry of Civil Aviation's own words, given to Parliament and published by PIB on 2 August 2024: "${PILOT_SUPPLY.statement}" That is the most direct official answer to this question, and it draws a line most pages never draw — between pilots overall and commanders on specific aircraft types.`,
  },
  {
    q: 'What is the difference between a pilot shortage and a commander shortage?',
    a: `A Commercial Pilot Licence (${cpl.name}) lets you be paid to fly, from age ${cpl.minAge}. Acting as pilot-in-command of a commercial aeroplane needs an ${atpl.name}, which requires age ${atpl.minAge} and years of experience built up after the CPL. The scarcity the government describes sits at that second, later stage — not at the point of qualifying to fly for the first time.`,
  },
  {
    q: 'How many Commercial Pilot Licences does DGCA issue each year?',
    a: `${PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')} between 2019 and mid-2024, on the DGCA figures given to Parliament. ${PILOT_SUPPLY.growthNote} ${PILOT_SUPPLY.cplIssuedNote}`,
  },
  {
    q: 'Will I definitely get an airline job right after my CPL?',
    a: `No page can honestly promise that, and the government's own figures explain why: more CPL holders are entering the market each year, so the first job is genuinely competitive even though pilots overall are not in short supply. ${PILOT_SUPPLY.whatItMeans}`,
  },
  {
    q: 'Does the number of flying schools in India tell you anything about job competition?',
    a: `Not directly. DGCA's list of approved Flying Training Organisations ran to ${FTO.count} organisations as of its most recent update, ranked twice a year on operational and safety criteria — that measures training capacity and quality, not how many seats airlines are hiring for. The CPL-issuance figures above are the closer proxy for how many new pilots enter the market each year.`,
  },
  {
    q: 'How does a CPL holder move toward a command role?',
    a: `By building pilot-in-command hours after the licence, typically through instructing, a type rating and Multi-Crew Cooperation training before a First Officer seat, then years of experience toward the age and hours an Airline Transport Pilot Licence needs. It is a career stage that comes well after the CPL, not an extension of training itself.`,
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: peopleAlsoAsk.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const related = [
  { lead: 'For what a CPL costs against what a career in it can return, read', anchor: 'our full pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'For the step-by-step route from Class 12 to an airline seat, see', anchor: 'our guide to becoming an airline pilot in India', href: '/blogs/how-to-become-an-airline-pilot-in-india' },
  { lead: 'For exactly where a CPL stops and command begins, read', anchor: 'our CPL vs ATPL comparison', href: '/blogs/cpl-vs-atpl-difference-india' },
  { lead: 'For how DGCA ranks the schools that produce these pilots, see', anchor: 'our guide to choosing a flying school', href: '/blogs/best-flying-school-in-india' },
  { lead: 'If you want this weighed against your own situation before committing money, our', anchor: 'free pilot career counselling', href: '/pilot-career-counselling' },
  { lead: 'For the ground-school stage every route above still has to clear, see', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: "What does the government actually say?" },
  { id: 'numbers', title: 'How many new pilots is India producing?' },
  { id: 'command', title: 'What is actually scarce: commanders' },
  { id: 'competitive', title: 'Why the first job still feels competitive' },
  { id: 'schools', title: 'Does the number of flying schools change this?' },
  { id: 'means', title: 'What this means if you are deciding whether to train' },
  { id: 'misconceptions', title: 'Misconceptions worth dropping' },
];

const cplIssuedRows = PILOT_SUPPLY.cplIssued;

const scarcityRows = [
  {
    level: 'Pilots and crew overall',
    status: 'Not in short supply, per the Ministry of Civil Aviation',
    detail: `${PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')} CPLs issued 2019 to mid-2024, with issuance more than doubling since — entry into the profession keeps widening.`,
  },
  {
    level: 'Commanders on certain aircraft types',
    status: 'In short supply, on the same government statement',
    detail: `Requires an ${atpl.name} — minimum age ${atpl.minAge} — and years of pilot-in-command experience built up after the CPL, not a document a new licence holder carries.`,
  },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function PilotShortageInIndia() {
  return (
    <BlogPostLayout
      title="Is There a Pilot Shortage in India? What the Government's Own Numbers Say"
      description="The Ministry of Civil Aviation's own Parliament answer on pilot supply, DGCA's yearly CPL-issuance data, and what the real bottleneck — command, not entry — means for anyone deciding whether to train."
      schema={[articleSchema, faqSchema]}
      heading="Is There a Pilot Shortage in India? What the Government's Own Numbers Say"
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'Is there a pilot shortage in India?',
        answer: `No — not for pilots overall. The Ministry of Civil Aviation told Parliament in 2024 that India has no shortage of pilots or crew, only a shortage of commanders on certain aircraft types. DGCA issued ${PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')} new Commercial Pilot Licences between 2019 and mid-2024, and issuance keeps growing — so the real bottleneck sits at command, not at entry.`,
      }}
      summaryTitle="The shortage question, in one view"
      summaryItems={[
        `Government's own words: "${PILOT_SUPPLY.statement}"`,
        `${PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')} CPLs issued in India, 2019 to mid-2024, on figures given to Parliament`,
        'CPL issuance has more than doubled over the last eight years, with record numbers in 2024 and 2025',
        `Command needs an ${atpl.name}, minimum age ${atpl.minAge} — a later career stage, not an extension of CPL training`,
        `${FTO.count} DGCA-approved Flying Training Organisations as of the latest published list — a measure of training capacity, not hiring demand`,
        'The honest frame: entry-level hiring is competitive because more pilots qualify every year; the real pay jump comes with command, not the licence',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/pilot-shortage-in-india/hero-many-aircraft-one-riser.webp"
        width={1200}
        height={630}
        alt="A row of several small single-engine training aircraft on an apron, with one aircraft standing on a slightly raised platform ahead of the others, representing many new pilots entering training while a narrower few advance to command"
        promptId="69"
      />

      <h2 id="answer" className={H2}>What does the government actually say about a pilot shortage?</h2>
      <p>
        Most pages answering this question quote a training academy, a hiring consultant, or each
        other. There is a more useful source: the Ministry of Civil Aviation, answering a question
        in Parliament, in a statement the Press Information Bureau published on 2 August 2024. Its
        own words: &ldquo;{PILOT_SUPPLY.statement}&rdquo;
      </p>
      <p>
        Read that sentence twice, because both halves matter. It does not say pilots are scarce. It
        says the opposite, for pilots and cabin crew as a group — and then draws a narrower line
        around one specific role, on specific aircraft types, where a real shortage does exist. That
        distinction is the whole answer to &ldquo;is there a pilot shortage in India,&rdquo; and it
        is also the reason two people can search that exact phrase and mean two different questions.
      </p>

      <h2 id="numbers" className={H2}>How many new pilots is India actually producing?</h2>
      <p>
        DGCA&rsquo;s own issuance figures, also given to Parliament, show a profession that keeps
        widening rather than one that is starved for entrants.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Commercial Pilot Licences issued in India by year</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Year</th>
              <th scope="col" className={`${TH} text-right`}>CPLs issued</th>
            </tr>
          </thead>
          <tbody>
            {cplIssuedRows.map((r, i) => (
              <tr key={r.year} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.year}</td>
                <td className={TDN}>{r.count.toLocaleString('en-IN')}</td>
              </tr>
            ))}
            <tr className="bg-av-blue/5 font-semibold">
              <td className={`${TD} font-bold text-av-blue`}>Total, 2019 to mid-2024</td>
              <td className={`${TDN} font-bold`}>{PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500">{PILOT_SUPPLY.cplIssuedNote}</p>

      <p>
        The trend continued past this table. {PILOT_SUPPLY.growthNote} That is not the profile of an
        industry unable to attract entrants — it is the profile of one issuing more licences almost
        every year, which is precisely why the first job after a CPL is a competition rather than a
        formality. More on that below.
      </p>

      <BlogImagePlaceholder
        src="/blog/pilot-shortage-in-india/cpl-issuance-growth-bars.webp"
        width={1200}
        height={800}
        alt="A simple bar chart of six vertical bars increasing in height from left to right, the final bar accented in orange, representing the year-on-year growth in new Commercial Pilot Licences issued in India"
        promptId="70"
      />

      <h2 id="command" className={H2}>What is actually scarce: commanders, not pilots</h2>
      <p>
        A Commercial Pilot Licence qualifies you to be paid to fly, from age {cpl.minAge}. It does
        not, on its own, qualify anyone to command a commercial aeroplane. That step needs an{' '}
        {atpl.name} — minimum age {atpl.minAge} — which is issued only after years of experience
        accumulated as a working pilot, First Officer time included. The government&rsquo;s
        &ldquo;shortage of commanders&rdquo; is a statement about that later, experience-gated stage,
        not about the supply of newly licensed pilots the table above tracks.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What is and is not in short supply, per the Ministry of Civil Aviation</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Level</th>
              <th scope="col" className={TH}>Status</th>
              <th scope="col" className={TH}>Why</th>
            </tr>
          </thead>
          <tbody>
            {scarcityRows.map((r, i) => (
              <tr key={r.level} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.level}</td>
                <td className={TD}>{r.status}</td>
                <td className={TD}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        This is also why the largest jump in a pilot&rsquo;s career, in responsibility and in pay,
        comes with command rather than with the CPL itself. We set out the licence-by-licence
        difference in full in{' '}
        <Link href="/blogs/cpl-vs-atpl-difference-india" className="text-av-orange font-semibold underline">
          our CPL vs ATPL guide
        </Link>
        {' '}— worth reading before assuming the CPL is the finish line rather than the entry point.
      </p>

      <h2 id="competitive" className={H2}>Why the first job still feels competitive</h2>
      <p>
        Both things are true at once, and neither contradicts the other. There is no shortage of
        pilots holding a CPL, and the first airline seat is still hard to get. That is what widening
        entry naturally produces: more qualified candidates competing for the same first-officer
        intakes, in an industry where the constrained resource is command experience, not the licence
        itself.
      </p>
      <p>
        Nothing about the eligibility rules, the flying hours, or the licence changes because of this
        — every requirement is the same whether ten students or ten thousand qualify in a given year.
        What changes is how much a strong training record, real flying-hour discipline, and a
        genuine type-rating or MCC plan matter once the licence is in hand. A CPL gets you into the
        market; what happens next is decided the same way it is in any field where entry has widened
        faster than the senior roles above it.
      </p>

      <h2 id="schools" className={H2}>Does the number of flying schools change this?</h2>
      <p>
        Not the way people assume. DGCA&rsquo;s own list of approved Flying Training Organisations
        ran to {FTO.count} organisations at its most recent update, ranked twice a year against
        operational, safety and compliance criteria. That list measures how much training capacity
        exists and how it is rated — it is not a count of airline vacancies, and a growing number of
        schools does not by itself mean a growing number of cockpit seats. The CPL-issuance figures
        above are the closer measure of how many new pilots actually enter the market each year; the
        FTO list answers a different question, which we cover fully in{' '}
        <Link href="/blogs/best-flying-school-in-india" className="text-av-orange font-semibold underline">
          our guide to choosing a flying school
        </Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/pilot-shortage-in-india/funnel-entry-to-command.webp"
        width={1200}
        height={675}
        alt="A wide funnel with many small aircraft silhouettes clustered at the top opening, narrowing down to a single point marked only by three simple horizontal stripes at the bottom, representing many new pilots entering training and a narrower few reaching a command role"
        promptId="71"
      />

      <h2 id="means" className={H2}>What this means if you are deciding whether to train</h2>
      <p>
        {PILOT_SUPPLY.whatItMeans}
      </p>
      <p>
        In practical terms: budget for a genuinely competitive first job rather than an automatic
        one, and plan your post-CPL years — instructing, building hours, a type rating, Multi-Crew
        Cooperation — as seriously as you plan the licence itself. Our{' '}
        <Link href="/blogs/how-to-become-an-airline-pilot-in-india" className="text-av-orange font-semibold underline">
          complete guide to becoming an airline pilot in India
        </Link>{' '}
        walks that whole sequence, and{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className="text-av-orange font-semibold underline">
          our training cost breakdown
        </Link>{' '}
        is the other half of the same decision — what the path costs, set against what it can
        realistically return.
      </p>

      <h2 id="misconceptions" className={H2}>Misconceptions worth dropping before you commit</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          <span className="font-semibold text-av-blue">&ldquo;There&rsquo;s a pilot shortage, so I&rsquo;m guaranteed a job.&rdquo;</span>{' '}
          The government&rsquo;s own statement says the opposite for pilots as a group. Treat the
          first job as competitive, because the numbers say it is.
        </li>
        <li>
          <span className="font-semibold text-av-blue">&ldquo;No shortage means it&rsquo;s a bad time to train.&rdquo;</span>{' '}
          Growing CPL issuance is a sign of a growing industry, not a shrinking one. It changes how
          hard the first job is to get, not whether the career itself is viable.
        </li>
        <li>
          <span className="font-semibold text-av-blue">&ldquo;More flying schools means more airline seats.&rdquo;</span>{' '}
          The two numbers measure different things. School capacity is not hiring demand.
        </li>
        <li>
          <span className="font-semibold text-av-blue">&ldquo;A CPL and an ATPL are basically the same milestone.&rdquo;</span>{' '}
          They sit on either side of the actual shortage the government describes. Command is a
          separate, later, experience-gated stage.
        </li>
      </ul>

      <h2 className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. Questions
        like this one — what the career actually looks like once the licence is issued, not just
        what the licence requires — are exactly what our free career counselling exists for, before
        any fee is discussed.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
