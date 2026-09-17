import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { LICENCES, MIN_AGE, CPL_HOURS, RTR, ACADEMY } from '../../lib/facts';

/*
 * New topic, 2026-09-17. Not covered anywhere on the site as its own subject —
 * every existing reference to the Bharatiya Vayuyan Adhiniyam, 2024 is a
 * one-line citation footnote (commercial-pilot-license-eligibility.jsx,
 * about-us.jsx and others cite it only to explain why the Aircraft Rules, 1937
 * are still good law). This post answers the question those footnotes raise
 * but never spell out: did the law actually change anything a student needs
 * to act on.
 *
 * SOURCING. Two facts here are already verified inside this repo and are
 * reused rather than re-derived — see the "REGULATORY SOURCING BASIS" comment
 * at the top of scripts/check-claims.js:
 *   - s.43(1) of the Bharatiya Vayuyan Adhiniyam, 2024 repeals the Aircraft
 *     Act, 1934; s.43(2) saves rules made under it, which is why the Aircraft
 *     Rules, 1937 (LICENCES, CPL_HOURS below) are still the operative text.
 *   - RTR(A) now sits under the Radio Telephone Operator (Restricted)
 *     Certificate and Licence Rules, 2025 (G.S.R. 413(E), 25 June 2025), made
 *     under the 2024 Act and administered by DGCA rather than WPC/DoT — see
 *     lib/facts.js RTR.
 * The commencement date (1 January 2025, notification S.O. 5646(E) of
 * 31 December 2024) and the Act's short title and number (16 of 2024) were
 * checked against multiple independent, mutually consistent sources during
 * this session; the primary text sits on India Code, linked below. Nothing
 * about penalties, offences or provisions outside licensing is stated here —
 * that detail was not read from a primary source this session, so it is left
 * out rather than summarised from secondary aggregators.
 *
 * No HowTo. FAQPage schema is inlined, not via data/pageFaqs.js. No
 * BreadcrumbList (Layout emits it).
 */
const DATE_PUBLISHED = '2026-09-17';
const DATE_MODIFIED = '2026-09-17';
const CANONICAL = 'https://weoneaviation.in/blogs/bharatiya-vayuyan-adhiniyam-pilot-licensing-india';
const INDIA_CODE_URL = 'https://www.indiacode.nic.in/handle/123456789/20589';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Bharatiya Vayuyan Adhiniyam, 2024: What It Changes (and Does Not) for Pilot Licensing in India',
  description:
    'The Aircraft Act, 1934 has been replaced. Whether that changes CPL, PPL, SPL or ATPL eligibility, what section 43(2) actually preserves, and the one licensing change that is real — where the RTR(A) exam now sits.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA guide',
  keywords: 'Bharatiya Vayuyan Adhiniyam 2024, Aircraft Act 1934 replaced, new aviation law India pilot licence, does CPL eligibility change 2024 act, RTR DGCA WPC transfer',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const actComparison = [
  { aspect: 'Short title', old: 'The Aircraft Act, 1934', now: 'The Bharatiya Vayuyan Adhiniyam, 2024 (Act No. 16 of 2024)' },
  { aspect: 'Status today', old: 'Repealed', now: 'In force' },
  { aspect: 'In force from', old: '1934', now: '1 January 2025' },
  { aspect: 'Rules made under the old Act — e.g. the Aircraft Rules, 1937', old: 'Aircraft Rules, 1937, Schedule II set licence ages, education and the 200-hour CPL table', now: 'The same Schedule II, continued in force by section 43(2) of the 2024 Act — not rewritten, not renumbered' },
  { aspect: 'RTR(A) radio licence', old: 'Examined under the older wireless-licensing framework, administered outside DGCA', now: `Examined under the ${RTR.instrument}, made under the 2024 Act and administered by DGCA` },
];

const licenceLadder = LICENCES.map((l) => ({
  code: l.code,
  name: l.name,
  age: l.minAge,
  status: 'Unaffected — set by Aircraft Rules, 1937, Schedule II, continued in force by s.43(2)',
}));

const rtrChange = [
  { aspect: 'Governing instrument', before: 'The older wireless-licensing rules for aeronautical radio telephony', now: `${RTR.instrument}` },
  { aspect: 'Administering authority', before: 'Outside DGCA, under the wireless-licensing framework', now: 'DGCA' },
  { aspect: 'Relationship to the DGCA written papers', before: 'Examined separately from the CPL papers', now: 'Still examined separately — RTR (A) is not one of the five CPL papers' },
];

const peopleAlsoAsk = [
  {
    q: 'Is the Aircraft Act, 1934 still valid in India?',
    a: 'No. It was repealed with effect from 1 January 2025, when the Bharatiya Vayuyan Adhiniyam, 2024 came into force. But its repeal does not empty out the rules made under it — section 43(2) of the new Act specifically keeps them in force, which is why the Aircraft Rules, 1937 are still the operative text for licence ages, education and flying-hour requirements.',
  },
  {
    q: 'Do I need a new licence or a new application because of the Bharatiya Vayuyan Adhiniyam?',
    a: 'No. The Act changed which statute the rules sit under, not the rules themselves or the process for getting a licence under them. A computer number, a DGCA medical assessment and a licence application go through exactly the same portals and forms as before.',
  },
  {
    q: 'Did the CPL 200-hour requirement or the age limits change under the new Act?',
    a: `No. ${CPL_HOURS.total} hours, and the age of ${MIN_AGE.CPL} for a Commercial Pilot Licence, come from the Aircraft Rules, 1937, Schedule II — and that Schedule was not rewritten. It continues in force exactly as it stood, under section 43(2) of the 2024 Act.`,
  },
  {
    q: 'Who examines the RTR(A) radio licence now?',
    a: `DGCA. ${RTR.note} That is the one genuine licensing change the 2024 Act brought for a prospective pilot — everything else about eligibility and the flying-hour table is unchanged.`,
  },
  {
    q: 'Did DGCA get replaced or restructured by the Bharatiya Vayuyan Adhiniyam?',
    a: 'No. DGCA remains the licensing and safety-oversight authority under the Ministry of Civil Aviation. The 2024 Act changed the statute some of its rule-making sits under; it did not create a new regulator or move pilot licensing to a different body.',
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
  { lead: 'For the full licence ladder and how Schedule II sets each stage, read', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'For how a Commercial and an Airline Transport licence differ under the same Schedule, see', anchor: 'our CPL vs ATPL guide', href: '/blogs/cpl-vs-atpl-difference-india' },
  { lead: 'The computer number process this Act left untouched is covered step by step in', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The six-month ground-school syllabus and scholarship are on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
  { lead: 'For what a Commercial Pilot Licence itself requires, see', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is the Bharatiya Vayuyan Adhiniyam, 2024?' },
  { id: 'replaced', title: 'Did it replace the Aircraft Act, 1934, and when?' },
  { id: 'eligibility', title: 'Does this change your CPL, PPL, SPL or ATPL eligibility?' },
  { id: 'rtr', title: 'What actually changed: the RTR (A) radio licence' },
  { id: 'regulator', title: 'Is DGCA still the regulator?' },
  { id: 'practical', title: 'What this means if you are starting training now' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function BharatiyaVayuyanAdhiniyamPilotLicensing() {
  return (
    <BlogPostLayout
      title="Bharatiya Vayuyan Adhiniyam 2024: Does It Change Pilot Licensing in India?"
      description="The Aircraft Act, 1934 has been replaced by the Bharatiya Vayuyan Adhiniyam, 2024. What that changes for CPL, PPL, SPL and ATPL eligibility, and the one real licensing change: where RTR (A) now sits."
      schema={[articleSchema, faqSchema]}
      heading="Bharatiya Vayuyan Adhiniyam, 2024: What It Changes (and Does Not) for Pilot Licensing in India"
      category="DGCA guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'Does the Bharatiya Vayuyan Adhiniyam, 2024 change pilot licence eligibility in India?',
        answer: `No. The Bharatiya Vayuyan Adhiniyam, 2024 replaced the Aircraft Act, 1934 from 1 January 2025, but section 43(2) keeps every rule made under the old Act in force — including the Aircraft Rules, 1937 that set CPL age, education and the 200-hour requirement. The one real change: RTR(A) licensing now sits with DGCA, not the Wireless Planning and Coordination Wing.`,
      }}
      summaryTitle="What changed, in one view"
      summaryItems={[
        'The Aircraft Act, 1934 was repealed and replaced by the Bharatiya Vayuyan Adhiniyam, 2024 (Act No. 16 of 2024), in force from 1 January 2025',
        'Section 43(2) of the new Act keeps every rule made under the old one in force — the repeal did not create a gap',
        `The Aircraft Rules, 1937, Schedule II — licence ages, the CPL education requirement and the ${CPL_HOURS.total}-hour table — continue exactly as before`,
        `SPL, PPL, CPL and ATPL minimum ages (${MIN_AGE.SPL}, ${MIN_AGE.PPL}, ${MIN_AGE.CPL} and ${MIN_AGE.ATPL}) are unaffected`,
        `${RTR.name} now sits under the ${RTR.instrument}, administered by DGCA rather than the old wireless-licensing framework`,
        'DGCA remains the licensing and examination authority for every other written paper, medical and computer number process',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/bharatiya-vayuyan-adhiniyam/hero-old-law-new-law.webp"
        width={1200}
        height={630}
        alt="A weathered old rulebook on the left transitioning into a clean modern document on the right, with a small training aircraft silhouette flying steadily above both, unaffected by the change beneath it"
        promptId="55"
      />

      <h2 id="what-is" className={H2}>What is the Bharatiya Vayuyan Adhiniyam, 2024?</h2>
      <p>
        It is the statute that now governs civil aviation in India — aircraft, aerodromes, air
        navigation and the licensing of the people who fly and maintain aircraft. Parliament passed
        it as Act No. 16 of 2024, and it took effect nationally on 1 January 2025, replacing the
        Aircraft Act, 1934, which had been the governing law for more than nine decades. The full
        text is published on India Code, the Government of India&rsquo;s statute repository.
      </p>
      <p>
        If you are researching pilot training right now, the reason this matters is simple: almost
        every page on this subject, this one included until this week, cited &ldquo;the Aircraft
        Act, 1934&rdquo; as the governing law. That citation is now technically out of date. Whether
        the <em>substance</em> behind it is out of date is a separate question, and it is the one
        this page actually answers.
      </p>

      <h2 id="replaced" className={H2}>Did it replace the Aircraft Act, 1934, and when?</h2>
      <p>
        Yes, in full. The new Act repeals the old one outright. What it does not do is leave a gap
        where the old Act&rsquo;s rules used to sit — and that distinction is the whole story for a
        prospective pilot.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The Aircraft Act, 1934 compared with the Bharatiya Vayuyan Adhiniyam, 2024</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Aspect</th>
              <th scope="col" className={TH}>Aircraft Act, 1934</th>
              <th scope="col" className={TH}>Bharatiya Vayuyan Adhiniyam, 2024</th>
            </tr>
          </thead>
          <tbody>
            {actComparison.map((r, i) => (
              <tr key={r.aspect} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.aspect}</td>
                <td className={TD}>{r.old}</td>
                <td className={TD}>{r.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The mechanism that keeps the old rules alive sits in the new Act itself: section 43 repeals
        the 1934 Act, and section 43(2) separately saves anything already done, or any rule,
        regulation or notification already made, under it — unless a specific provision conflicts
        with the new Act. In plain terms: the parent statute changed name and number; the rulebook
        made under it, including the one that actually sets licence requirements, did not.
      </p>

      <h2 id="eligibility" className={H2}>Does this change your CPL, PPL, SPL or ATPL eligibility?</h2>
      <p>
        No. The document that sets minimum age, the education requirement and the flying-hour table
        for every licence is the Aircraft Rules, 1937 — specifically Schedule II. That Schedule was
        not rewritten, renumbered or amended by the 2024 Act. It continues in force, word for word,
        under the section 43(2) savings clause above.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Pilot licence ladder and whether the 2024 Act changed each stage</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Licence</th>
              <th scope="col" className={`${TH} text-right`}>Minimum age</th>
              <th scope="col" className={TH}>Effect of the 2024 Act</th>
            </tr>
          </thead>
          <tbody>
            {licenceLadder.map((l, i) => (
              <tr key={l.code} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{l.code} — {l.name}</td>
                <td className={`${TD} text-right tabular-nums`}>{l.age}</td>
                <td className={TD}>{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The same holds for the {CPL_HOURS.total}-hour CPL table and every component inside it — the
        pilot-in-command time, the cross-country flight, the instrument hours and the night flying —
        and for the education requirement at 10+2 level. None of it moved. A school, a citation or a
        page that still names &ldquo;the Aircraft Act, 1934&rdquo; as the source of these numbers is
        using an outdated statute name for figures that are, substantively, still correct — which is
        a citation problem, not an eligibility problem.
      </p>

      <BlogImagePlaceholder
        src="/blog/bharatiya-vayuyan-adhiniyam/regulator-shift-rtr.webp"
        width={1200}
        height={800}
        alt="A simple radio handset icon with an arrow moving from a small transmission-tower icon on the left to a control-tower icon on the right, illustrating the RTR (A) radio licence moving to a new administering authority"
        promptId="56"
      />

      <h2 id="rtr" className={H2}>What actually changed: the RTR (A) radio licence</h2>
      <p>
        One licensing change is real, and it belongs to {RTR.name}, not to the pilot licence
        itself. {RTR.note} Radio telephony examination and certification used to sit outside DGCA
        entirely, administered under India&rsquo;s general wireless-licensing framework. Under the
        2024 Act, it moved.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">RTR (A) before and after the 2024 Act</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Aspect</th>
              <th scope="col" className={TH}>Before</th>
              <th scope="col" className={TH}>Now</th>
            </tr>
          </thead>
          <tbody>
            {rtrChange.map((r, i) => (
              <tr key={r.aspect} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.aspect}</td>
                <td className={TD}>{r.before}</td>
                <td className={TD}>{r.now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        For a student, the practical effect is administrative rather than substantive: {RTR.name}{' '}
        is now one more DGCA-administered process alongside the computer number and the five written
        papers, rather than a separate government department&rsquo;s process bolted onto the CPL
        path. It is still examined separately from those five papers — that has not changed.
      </p>

      <h2 id="regulator" className={H2}>Is DGCA still the regulator?</h2>
      <p>
        Yes, unchanged. The Directorate General of Civil Aviation remains the licensing and safety
        oversight authority for pilots, aircraft and flying training organisations, under the
        Ministry of Civil Aviation. The 2024 Act replaced the parent statute some of DGCA&rsquo;s
        rule-making sits under; it did not create a new regulator, transfer licensing to a different
        body, or change who issues a Commercial Pilot Licence.
      </p>

      <h2 id="practical" className={H2}>What this means if you are starting training now</h2>
      <p>
        Nothing on your side changes. The computer number application, the DGCA medical assessment,
        the five written papers and their pass mark, and the flying-hour requirements all continue
        exactly as they were before 1 January 2025. There is no new form created by this Act, no
        re-registration it requires of anyone already in training, and no reason to redo a step you
        have already completed.
      </p>
      <p>
        What is worth doing is treating the Act as a reason to double-check any source — a school&rsquo;s
        website, a forum post, a PDF you downloaded two years ago — that states a licence
        requirement without saying where it comes from. Not because the numbers are likely to be
        wrong, but because a source that cannot name the Aircraft Rules, 1937, Schedule II, or say
        which section of it applies, was probably never checked against the regulation in the first
        place. The Act being new is a good prompt to ask that question; it is not, on its own, a
        reason to expect a different answer.
      </p>
      <p>
        Full text of the Act is available on{' '}
        <a href={INDIA_CODE_URL} target="_blank" rel="noopener noreferrer" className="text-av-orange font-semibold underline">
          India Code
        </a>
        , the Government of India&rsquo;s official statute repository, for anyone who wants to read
        the savings clause directly rather than take a summary&rsquo;s word for it.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, against the
        same Aircraft Rules, 1937 this page describes — before and after the 2024 Act changed which
        statute keeps them in force. If a document you have been quoted a requirement from does not
        name its source, that is worth asking about before you rely on it.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
