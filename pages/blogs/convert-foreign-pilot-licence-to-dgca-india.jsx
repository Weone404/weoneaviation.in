import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { FOREIGN_LICENCE, DGCA_PAPERS, RTR, EDUCATION, MEDICAL, ACADEMY } from '../../lib/facts';

/*
 * New topic, not a rewrite. FOREIGN_LICENCE in lib/facts.js (verified
 * 2026-09-17, from CAR Section 7 Series G Part I) was until now used only
 * inside pages/pilot-training-in-sri-lanka.jsx, folded into a country page.
 * The mechanics it carries — the two-paper conversion exam, the currency
 * test on the foreign rating, the separate RTR(A) route — deserve their own
 * page: this is the question a student or parent actually types once they
 * are weighing training abroad against training in India, and neither
 * /pilot-training-abroad (a decision/quote page) nor the country pages
 * (each scoped to its own regulator) spell out the DGCA side in full.
 *
 * FAQPage schema is inlined here rather than via data/pageFaqs.js, which
 * this post is not permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-19';
const DATE_MODIFIED = '2026-09-19';
const CANONICAL = 'https://weoneaviation.in/blogs/convert-foreign-pilot-licence-to-dgca-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Convert a Foreign Pilot Licence to an Indian DGCA Licence',
  description:
    'A foreign CPL or ATPL does not let you fly commercially in India. What CAR Section 7 Series G actually requires to convert it into a DGCA licence — the written papers, the currency test, the skill test and the RTR(A) step most guides leave out.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Licensing',
  keywords: 'convert foreign pilot licence to DGCA, foreign CPL to Indian CPL conversion, DGCA licence conversion process, FAA licence to DGCA, train abroad fly in India',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [
    { '@type': 'CreativeWork', name: `${FOREIGN_LICENCE.car.citation} — ${FOREIGN_LICENCE.car.title}`, url: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq' },
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937 — rule 41 and Schedule II (DGCA)', url: 'https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/aircraftRules/aircraftRules.html' },
  ],
};

const peopleAlsoAsk = [
  {
    q: 'Can I fly commercially in India on my foreign pilot licence?',
    a: `No. ${FOREIGN_LICENCE.why}`,
  },
  {
    q: 'How many DGCA papers do I need to clear to convert a foreign CPL?',
    a: `Two — Air Regulations and a composite paper covering Air Navigation and Aviation Meteorology — not the full ${DGCA_PAPERS.length}-paper set an Indian-trained CPL candidate sits. An ATPL conversion adds an oral examination on top of its two written papers.`,
  },
  {
    q: 'What happens if my foreign rating is not current?',
    a: `${FOREIGN_LICENCE.currency.ifNotCurrent.join(', then ')}. ${FOREIGN_LICENCE.currency.ifNotCurrentNote}`,
  },
  {
    q: 'Do I need an Indian RTR(A) if I already hold a foreign radio licence?',
    a: `Yes. ${FOREIGN_LICENCE.radioNote}`,
  },
  {
    q: 'Is it cheaper to train abroad and convert, or train in India from the start?',
    a: 'Nobody can give you a sourced total for either path — see our pilot training cost guide for why the market figures in circulation cannot be traced to a published document. What can be shown is the extra steps a conversion adds: two written papers, a skill test, RTR(A), and the Indian medical, all after the foreign course is already paid for.',
  },
  {
    q: 'Can DGCA refuse to convert my foreign licence?',
    a: `Yes. ${FOREIGN_LICENCE.verification} ${FOREIGN_LICENCE.falseDocuments}`,
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

const generalBar = [
  { area: 'Age', requirement: FOREIGN_LICENCE.general[0] },
  { area: 'Education', requirement: `${FOREIGN_LICENCE.general[1]} — ${EDUCATION.requirement}` },
  { area: 'Medical', requirement: `${FOREIGN_LICENCE.general[2]}. ${MEDICAL.long}` },
  { area: 'Flying experience', requirement: `${FOREIGN_LICENCE.general[3]} ${FOREIGN_LICENCE.hoursShortfall}` },
];

const examTable = FOREIGN_LICENCE.examinations.map((e) => ({
  licence: e.licence,
  papers: e.papers.join('; '),
  note: e.note,
}));

const currencyOptions = [
  { path: 'Rating is current', what: FOREIGN_LICENCE.currency.definition.join(' Or '), where: FOREIGN_LICENCE.currency.where },
  { path: 'Rating is not current', what: FOREIGN_LICENCE.currency.ifNotCurrent.join(', then '), where: FOREIGN_LICENCE.currency.ifNotCurrentNote },
];

const tocHeadings = [
  { id: 'why', title: 'Why a foreign licence needs converting at all' },
  { id: 'general-bar', title: 'The four general requirements' },
  { id: 'papers', title: 'The written papers, by licence' },
  { id: 'currency', title: 'The currency test on your foreign rating' },
  { id: 'skill-test', title: 'The skill test and rating endorsement' },
  { id: 'rtr', title: 'RTR(A): the step people forget' },
  { id: 'sequence', title: 'A realistic sequence' },
  { id: 'verification', title: 'Verification, and what false documents cost you' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const related = [
  { lead: 'For how a Commercial and an Airline Transport licence actually differ, see', anchor: 'our CPL vs ATPL guide', href: '/blogs/cpl-vs-atpl-difference-india' },
  { lead: 'For what training costs in India, and why the abroad comparisons rarely trace to a source, read', anchor: 'the pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'The Level 4 English requirement referenced in a CPL application is covered in', anchor: 'our English Language Proficiency guide', href: '/blogs/english-language-proficiency-test-for-pilots-in-india' },
  { lead: 'For the licence itself once your papers and skill test are behind you, see', anchor: 'the Commercial Pilot Licence course page', href: '/commercial-pilot-license' },
  { lead: 'The six-month ground syllabus that prepares you for the two conversion papers is on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function ConvertForeignPilotLicenceToDgcaIndia() {
  return (
    <BlogPostLayout
      title="How to Convert a Foreign Pilot Licence to an Indian DGCA Licence"
      description="A foreign CPL or ATPL cannot be used to fly commercially in India. What CAR Section 7 Series G actually requires: the written papers, the currency test on your rating, the skill test and the RTR(A) step."
      schema={[articleSchema, faqSchema]}
      heading="How to Convert a Foreign Pilot Licence to an Indian DGCA Licence"
      category="Licensing"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'How do I convert a foreign pilot licence to a DGCA licence?',
        answer: `${FOREIGN_LICENCE.why} You must meet DGCA's age, education, medical and flying-experience requirements under Schedule II, clear two written papers (Air Regulations and a composite Navigation/Meteorology paper for a CPL), pass a skill test with a DGCA-approved examiner in India, and separately obtain an Indian RTR(A). Ratings not current in the last 24 months need an additional technical exam and endorsement training.`,
      }}
      summaryTitle="The conversion, in five lines"
      summaryItems={[
        'A foreign licence is that country’s licence — it does not permit commercial flying on an Indian-registered aircraft',
        'Two written papers for a CPL conversion, not the full five-paper Indian set',
        'An ATPL conversion adds an oral examination to its two written papers',
        'The foreign rating must be current — 10 hours as PIC in 24 months, or a recent check — or you sit an extra technical exam and endorsement training',
        'RTR(A) is a separate certificate from a different ministry, and it is the step most guides leave out',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/convert-foreign-pilot-licence-to-dgca-india/hero-two-licences-one-desk.webp"
        width={1200}
        height={630}
        alt="A foreign pilot licence booklet and a set of Indian DGCA examination papers laid side by side on a desk, representing the conversion process from a foreign licence to an Indian one"
        promptId="59"
      />

      <h2 id="why" className={H2}>Why a foreign licence needs converting at all</h2>
      <p>
        {FOREIGN_LICENCE.why} That single sentence, from {FOREIGN_LICENCE.car.citation}, is the whole
        reason this page exists. A student who trains in the United States, Canada, Australia, South
        Africa or Sri Lanka and comes home with a foreign Commercial Pilot Licence has not finished the
        India side of the process — they have started a second, shorter one.
      </p>
      <p>
        DGCA does not treat every foreign licence identically either. The requirement is issued under{' '}
        {FOREIGN_LICENCE.car.issuedUnder}, and it applies specifically to pilots holding licences and
        ratings issued by a Contracting State — a country that is party to the Chicago Convention and
        whose licensing DGCA accepts as meeting ICAO standards. {FOREIGN_LICENCE.car.provenanceNote}
      </p>

      <h2 id="general-bar" className={H2}>The four general requirements</h2>
      <p>
        Before DGCA looks at a single paper or a single flying hour, four things have to be true, and
        they are the same four that apply to a candidate trained entirely in India.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The four general requirements for converting a foreign licence</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Area</th>
              <th scope="col" className={TH}>What DGCA requires</th>
            </tr>
          </thead>
          <tbody>
            {generalBar.map((r, i) => (
              <tr key={r.area} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.area}</td>
                <td className={TD}>{r.requirement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The experience row catches families off guard the most. A course sold abroad against that
        country&rsquo;s own minimum hours does not lower what Schedule II asks for in India — the
        shortfall gets flown, in the issuing country or in India, before conversion can proceed.
      </p>

      <h2 id="papers" className={H2}>The written papers, by licence</h2>
      <p>
        This is the part every conversion guide gets wrong by omission: a converting candidate does not
        sit the same paper set as someone trained in India from the start. The Indian CPL route means{' '}
        {DGCA_PAPERS.length} subjects. Conversion means two, for a CPL.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA written examinations required to convert a foreign licence, by licence type</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Licence</th>
              <th scope="col" className={TH}>Papers with CEO</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {examTable.map((e, i) => (
              <tr key={e.licence} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{e.licence}</td>
                <td className={TD}>{e.papers}</td>
                <td className={TD}>{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A Private Pilot, microlight, glider, balloon, light sport aircraft or gyroplane conversion is
        different again — the full examination set laid down for that licence in Schedule II applies,
        with no reduced conversion paper. {FOREIGN_LICENCE.skillTest}
      </p>

      <BlogImagePlaceholder
        src="/blog/convert-foreign-pilot-licence-to-dgca-india/two-paper-vs-five-paper.webp"
        width={1200}
        height={800}
        alt="Two small stacks of examination papers of very different heights, one of two papers for a licence conversion and one of five papers for a full Indian CPL, shown side by side for comparison"
        promptId="60"
      />

      <h2 id="currency" className={H2}>The currency test on your foreign rating</h2>
      <p>
        {FOREIGN_LICENCE.currency.rule} DGCA does not take the rating&rsquo;s face validity on trust —
        it asks whether you have actually been flying it recently, and where that flying has to have
        happened matters as much as how much of it there was.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What happens depending on whether your foreign rating is current</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>If your rating is&hellip;</th>
              <th scope="col" className={TH}>What that means</th>
            </tr>
          </thead>
          <tbody>
            {currencyOptions.map((c, i) => (
              <tr key={c.path} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{c.path}</td>
                <td className={TD}>{c.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{FOREIGN_LICENCE.currency.where}</p>
      <p>
        Students who finish a foreign course and then spend a year clearing conversion papers before
        applying sometimes discover their currency window has closed in the meantime. Plan the
        conversion timeline around this rule, not around when the papers happen to get cleared.
      </p>

      <h2 id="skill-test" className={H2}>The skill test and rating endorsement</h2>
      <p>
        {FOREIGN_LICENCE.skillTest} {FOREIGN_LICENCE.ratings.endorsement}
      </p>
      <p>{FOREIGN_LICENCE.ratings.instrumentRating}</p>
      <p>
        A current flying instructor rating from a Contracting State can carry across too, into an
        Assistant Flight Instructor or Flight Instructor rating on the Indian licence — subject to the
        experience Schedule II sets for that rating and a competency check before a DGCA-approved
        examiner or Flight Operations Inspector within the six months before applying.
      </p>

      <h2 id="rtr" className={H2}>RTR(A): the step people forget</h2>
      <p>{FOREIGN_LICENCE.radioNote}</p>
      <ul className="list-disc pl-5 space-y-2 my-4 text-gray-700">
        {FOREIGN_LICENCE.radioTelephony.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p>
        {RTR.note} A candidate who already holds a foreign radio operator qualification still goes
        through this Indian route — the two are issued by different regulators and one does not stand
        in for the other.
      </p>

      <h2 id="sequence" className={H2}>A realistic sequence</h2>
      <p>
        Nothing here is a fixed DGCA timetable — the CAR does not mandate an order — but the
        dependencies between the pieces point to a sensible one: confirm your rating is current, or
        plan for the endorsement route if it is not; register on eGCA and book the two written papers;
        book the Indian medical assessment early, since a disqualifying finding is cheaper to learn
        about before the rest is arranged; start the Certificate of Proficiency application for
        RTR(A) in parallel, since it runs on its own timetable at a different ministry; and schedule
        the skill test only once the papers and the medical are both in hand, since a DGCA-approved
        examiner is checking a candidate who is otherwise ready to hold the licence.
      </p>

      <h2 id="verification" className={H2}>Verification, and what false documents cost you</h2>
      <p>{FOREIGN_LICENCE.verification}</p>
      <p>{FOREIGN_LICENCE.falseDocuments}</p>
      <p>
        {FOREIGN_LICENCE.applyTo} {FOREIGN_LICENCE.fees}
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka, and the two conversion papers — Air Regulations
        and the composite Navigation/Meteorology paper — sit inside the same syllabus we teach a
        candidate training in India from the start. A student returning from a foreign course does not
        need to repeat everything they already studied abroad; they need focused preparation for the
        specific papers DGCA sets for a conversion, and a clear view of the RTR(A) and medical steps
        that run alongside it.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
