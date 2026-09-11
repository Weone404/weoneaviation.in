import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * Every other rating post on this site (Instrument Rating, Type Rating, MCC)
 * mentions in passing that Schedule II caps how much simulator time counts
 * towards the CPL instrument-time requirement — but none of them, nor the
 * ground-school or cost pillar posts, answer the direct question a student
 * actually searches: how many of the 200 hours can be a simulator. This post
 * owns that question specifically.
 *
 * All hour figures come from lib/facts.js CPL_HOURS — nothing here is
 * retyped from a competitor page or estimated. No FAQPage or BreadcrumbList
 * via data/pageFaqs.js — that file is off limits to this routine, so the
 * FAQPage schema is built inline from peopleAlsoAsk below.
 */
const DATE_PUBLISHED = '2026-09-11';
const DATE_MODIFIED = '2026-09-11';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-simulator-hours-dgca-rules';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Can Simulator Hours Count Towards Your CPL in India? DGCA Rules Explained',
  description:
    'How much of the 200-hour CPL requirement can be flown on a simulator under Schedule II, why the cap exists, and how that differs from the simulator-heavy training that comes after the licence.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'CPL flying hours',
  keywords: 'CPL simulator hours India, DGCA simulator rules, CPL 200 hours simulator, instrument time simulator cap, Schedule II simulator hours',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const hoursTable = CPL_HOURS.components.map((c) => ({
  label: c.label,
  hours: `${c.hours} hours`,
  clause: c.clause,
  note: c.note,
}));

const afterCpl = [
  {
    stage: 'CPL flight time (Schedule II, Section J)',
    simUse: `Capped — only up to ${CPL_HOURS.components.find((c) => c.label === 'Instrument time')?.hours || 10} instrument hours are eligible, and of those, not more than 5 may be on an approved simulator`,
    link: null,
  },
  {
    stage: 'Instrument Rating',
    simUse: 'A separate qualification taken after the CPL, with its own procedural syllabus flown largely under a hood or in a simulator — not counted inside the 200-hour CPL total',
    link: { href: '/blogs/instrument-rating-for-pilots-in-india', label: 'our Instrument Rating guide' },
  },
  {
    stage: 'Type Rating',
    simUse: 'Aircraft-specific ground school followed by full-flight simulator training and a skill test, arranged after the licence is issued',
    link: { href: '/blogs/type-rating-for-pilots-in-india', label: 'our Type Rating guide' },
  },
  {
    stage: 'Multi-Crew Cooperation (MCC)',
    simUse: 'Run entirely in a full-flight simulator, since the course exists to train the two-pilot working method rather than handling of a single aircraft',
    link: { href: '/blogs/mcc-training-for-pilots-in-india', label: 'our MCC training guide' },
  },
];

const tocHeadings = [
  { id: 'short-answer', title: 'Can simulator hours count towards a CPL?' },
  { id: 'breakdown', title: 'How the 200-hour requirement breaks down' },
  { id: 'why-capped', title: 'Why only 5 hours of simulator time count' },
  { id: 'after-cpl', title: 'Simulator use after the CPL is issued' },
  { id: 'choosing', title: 'What to check before enrolling' },
  { id: 'misconceptions', title: 'Common misconceptions' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const peopleAlsoAsk = [
  {
    q: 'Does simulator time count as pilot-in-command hours for CPL?',
    a: `No. Schedule II, Section J, paragraph 1(e)(i) requires ${CPL_HOURS.components.find((c) => c.label === 'Pilot-in-command')?.hours} hours as pilot-in-command, and that clause is written around actual flight time in an aeroplane. Simulator sessions have no bearing on this component at all — they are only relevant to the instrument-time requirement below.`,
  },
  {
    q: 'How many simulator hours are allowed inside the CPL 200-hour total?',
    a: `Up to 5, and only as part of the ${CPL_HOURS.components.find((c) => c.label === 'Instrument time')?.hours}-hour instrument-time requirement under paragraph 1(e)(iii). That is 5 hours out of a 200-hour total — a small fraction, not a training track you can lean on to shorten the course.`,
  },
  {
    q: 'Do Type Rating and MCC simulator hours count towards the CPL?',
    a: 'No. Both are separate qualifications taken after the CPL is issued, arranged with a DGCA-approved training organisation, and neither adds to or draws from the 200-hour CPL total. They exist to prepare you for a specific aircraft or a multi-pilot flight deck, not to satisfy the licence itself.',
  },
  {
    q: 'Can cross-country or night flying hours be done on a simulator?',
    a: `No. Paragraphs 1(e)(ii) and 1(e)(iv) — the cross-country and night flying components — are not eligible for simulator substitution under Schedule II. Only the instrument-time component carries a simulator allowance, and it is capped at 5 of its ${CPL_HOURS.components.find((c) => c.label === 'Instrument time')?.hours} hours.`,
  },
  {
    q: 'Does more simulator time in a course mean a cheaper CPL?',
    a: 'Only within that 5-hour cap — a simulator hour is genuinely cheaper than an aircraft hour, which is exactly why some quotes lean on it. Beyond the cap it has no bearing on your licence hours at all, so a school padding a syllabus with simulator sessions is not shortening your 200-hour requirement, only its own costs.',
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
  { lead: 'For the separate qualification that most simulator hours actually go towards, read', anchor: 'our Instrument Rating guide', href: '/blogs/instrument-rating-for-pilots-in-india' },
  { lead: 'For how a Type Rating uses full-flight simulator training after the licence, see', anchor: 'our Type Rating guide', href: '/blogs/type-rating-for-pilots-in-india' },
  { lead: 'For where simulator hours sit inside the full training budget, see', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'For the DGCA ground classes that come before any of this', anchor: 'see our ground classes page', href: '/dgca-ground-classes' },
  { lead: 'For the licence itself and how it is structured', anchor: 'see the commercial pilot licence page', href: '/commercial-pilot-license' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} whitespace-nowrap`;

export default function CplSimulatorHoursDgcaRules() {
  return (
    <BlogPostLayout
      title="Can Simulator Hours Count Towards Your CPL in India? DGCA Rules Explained"
      description="How much of the 200-hour CPL requirement can be a simulator under Schedule II, why the cap exists, and how it differs from the simulator-heavy training that follows the licence."
      schema={[articleSchema, faqSchema]}
      heading="Can Simulator Hours Count Towards Your CPL in India? DGCA Rules Explained"
      category="CPL flying hours"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'Can simulator hours count towards a CPL in India?',
        answer: `Only a small part of one component. Schedule II, Section J requires ${CPL_HOURS.total} total flight hours, and the only simulator allowance sits inside the instrument-time requirement: of those ${CPL_HOURS.components.find((c) => c.label === 'Instrument time')?.hours} hours, not more than 5 may be on an approved simulator. Every other component — pilot-in-command, cross-country and night flying — must be flown in an actual aeroplane.`,
      }}
      summaryTitle="The simulator cap, in one view"
      summaryItems={[
        `CPL total requirement: ${CPL_HOURS.total} hours, Schedule II Section J paragraph 1(e)`,
        `Instrument-time component: ${CPL_HOURS.components.find((c) => c.label === 'Instrument time')?.hours} hours, of which up to 5 may be on an approved simulator`,
        'Pilot-in-command, cross-country and night flying components: no simulator allowance at all',
        `That means at most 5 of the ${CPL_HOURS.total} hours can be a simulator — 2.5% of the total`,
        'Instrument Rating, Type Rating and MCC are separate, simulator-heavy qualifications taken after the CPL — none of them draw from or add to the 200-hour total',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/cpl-simulator-hours/hero-simulator-and-aircraft.webp"
        width={1200}
        height={630}
        alt="A flight simulator device on the left and a small single-engine training aircraft on the right, representing the split between simulator and actual flight hours in CPL training"
        promptId="48"
      />

      <h2 id="short-answer" className={H2}>Can simulator hours count towards a CPL in India?</h2>
      <p>
        Only in one narrow place. Every commercial pilot licence in India is issued against Schedule
        II, Section J of the Aircraft Rules, 1937, and paragraph 1(e) sets a {CPL_HOURS.total}-hour
        total. Inside that total, the only component that allows any simulator time at all is
        instrument time — and even there, the allowance is capped well below the full requirement.
      </p>
      <p>
        That single fact is worth being precise about, because it is easy to hear &ldquo;simulator
        hours count&rdquo; and assume it applies more broadly than it does. It does not reduce your
        pilot-in-command hours, your cross-country requirement or your night flying. Those stay exactly
        as written, flown in an actual aeroplane.
      </p>
      <p>
        The question comes up because the word &ldquo;simulator&rdquo; is attached to so much of a
        pilot&rsquo;s later training — type ratings, MCC, recurrent checks — that it is natural to
        assume the same logic reaches back into the licence itself. It does not reach back very far.
        The CPL is, by design, mostly a real-aircraft licence with one small, precisely bounded
        exception, and knowing exactly where that exception sits is what stops a syllabus quote from
        being misread.
      </p>

      <h2 id="breakdown" className={H2}>How the 200-hour CPL requirement breaks down</h2>
      <p>
        The {CPL_HOURS.total} hours are not one undifferentiated total — Schedule II specifies four
        components inside it, each with its own clause. Only one of the four carries any simulator
        allowance.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">CPL flying hour components under Schedule II, Section J, paragraph 1(e)</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Component</th>
              <th scope="col" className={TH}>Hours</th>
              <th scope="col" className={TH}>Clause</th>
              <th scope="col" className={TH}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {hoursTable.map((c, i) => (
              <tr key={c.label} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.label}</td>
                <td className={TDN}>{c.hours}</td>
                <td className={TDN}>{c.clause}</td>
                <td className={TD}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Read the instrument-time row again: 10 hours, of which not more than 5 may be on an approved
        simulator. Every other row — pilot-in-command, cross-country and night flying — carries no
        such allowance in the notified Schedule. A syllabus that logs simulator time against any of
        those three is not following Schedule II as written.
      </p>
      <p>
        It also matters that this is a total, not a set of additions. The {CPL_HOURS.total} hours are
        the whole requirement, and the four rows above sit inside it rather than stacking on top of
        it — a distinction some competitor pages get backwards, usually by describing pilot-in-command,
        cross-country, instrument and night hours as though a student flies all of them separately on
        top of a base {CPL_HOURS.total}. They do not. The rows overlap by design: a single
        cross-country flight, for instance, can simultaneously count towards pilot-in-command time
        and towards the {CPL_HOURS.total}-hour total. The simulator allowance sits only inside the
        smallest of the four rows.
      </p>

      <h2 id="why-capped" className={H2}>Why only 5 hours of simulator time count</h2>
      <p>
        The instrument-time requirement exists to test whether you can control an aeroplane using
        only the instrument panel, with outside visual reference removed. A capable simulator or
        flight training device reproduces enough of that instrument scan to be a genuinely useful
        substitute for part of it — which is exactly why the Schedule allows some.
      </p>
      <p>
        Pilot-in-command time, cross-country navigation and night flying are different in kind. They
        test judgement and handling in the actual aircraft — real weight, real weather, real
        consequences of a wrong decision — in a way no device fully replicates. That is the
        distinction the Schedule draws, and it is why the simulator allowance sits only where it
        does.
      </p>
      <p>
        In practical terms: out of {CPL_HOURS.total} hours, at most 5 can be a simulator. That is 2.5%
        of the total. It is a real allowance, and worth using if your school has a good device, but
        it is not a route to a materially shorter or cheaper licence.
      </p>

      <BlogImagePlaceholder
        src="/blog/cpl-simulator-hours/cpl-hours-proportion.webp"
        width={1200}
        height={800}
        alt="A large circle representing 200 hours with a small distinct wedge marked out to show the 5 simulator hours as a tiny fraction of the total"
        promptId="49"
      />

      <h2 id="after-cpl" className={H2}>Simulator use after the CPL is issued</h2>
      <p>
        The confusion usually starts here: the training that follows a CPL is genuinely
        simulator-heavy, and it is easy to assume that pattern extends backward into the licence
        itself. It does not. Once the CPL is issued, several separate qualifications rely on a
        simulator far more than the 5-hour allowance above — but none of them are part of the
        200-hour CPL total, because they are not the CPL.
      </p>
      <p>
        The reason the pattern flips so sharply after the licence is issued is that the purpose of
        the training changes. The CPL tests whether you can fly an aeroplane at all, across a range
        of real conditions, which is inherently something a device can only partly substitute for.
        Everything after it — a specific aircraft&rsquo;s systems, a two-pilot flight deck&rsquo;s
        procedures — is exactly the kind of repeatable, procedural training a simulator is built for,
        which is why the balance shifts so completely once the base licence is behind you.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">How simulator time is used before and after the CPL is issued</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>How simulator time is used</th>
            </tr>
          </thead>
          <tbody>
            {afterCpl.map((r, i) => (
              <tr key={r.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.stage}</td>
                <td className={TD}>
                  {r.simUse}
                  {r.link ? (
                    <>
                      {' '}— see{' '}
                      <Link href={r.link.href} className="text-av-orange font-semibold underline">
                        {r.link.label}
                      </Link>.
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Notice the shape of that table: the CPL itself is almost entirely a real-aircraft licence,
        with one small, clearly bounded simulator allowance. Everything simulator-heavy comes after
        it, as its own separate qualification with its own approval process and its own cost — not
        as a way of finishing the CPL faster.
      </p>

      <h2 id="choosing" className={H2}>What to check about a school&rsquo;s simulator before enrolling</h2>
      <p>
        A flying school offering simulator sessions as part of your CPL syllabus is not doing
        anything wrong — the 5-hour allowance is real and worth using. What matters is whether the
        syllabus respects the cap or quietly exceeds it, and whether the device itself is one the
        school can actually show is approved rather than a generic training aid described loosely as
        a &ldquo;simulator&rdquo; in a brochure. Four questions expose the answer before you pay for
        anything:
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Which component is the simulator time being logged against — is it explicitly the instrument-time requirement, or left unspecified?</li>
        <li>How many of the syllabus&rsquo;s simulator hours are being counted towards the CPL total, and does that number stop at 5?</li>
        <li>Is the device an approved simulator or training device recognised for this purpose, and can the school show that approval?</li>
        <li>Is any simulator time being offered <em>beyond</em> the cap billed and logged separately, as practice rather than as licence hours?</li>
      </ul>
      <p>
        A school that answers all four plainly is running a syllabus that matches Schedule II. One
        that is vague about which hours count towards what is a syllabus worth double-checking before
        you commit fees to it.
      </p>

      <h2 id="misconceptions" className={H2}>Common misconceptions about simulator hours</h2>
      <p>
        &ldquo;More simulator time means a cheaper CPL&rdquo; is the most common one, and it is only
        true up to the cap. A simulator hour genuinely costs less than an aircraft hour, so a school
        has a real incentive to schedule as much of your instrument time on the device as the
        Schedule allows — that is a legitimate saving. Simulator time beyond that 5-hour ceiling does
        not reduce your CPL hours at all; it is either additional practice you are paying for on top
        of the 200, or it belongs to a different qualification entirely.
      </p>
      <p>
        The second misconception is treating &ldquo;simulator training&rdquo; as one undifferentiated
        thing across a pilot&rsquo;s whole path. A 5-hour allowance inside a student licence, a
        procedural syllabus for a separate{' '}
        <Link href="/blogs/instrument-rating-for-pilots-in-india" className="text-av-orange font-semibold underline">
          Instrument Rating
        </Link>{' '}
        and a full-flight simulator syllabus for a{' '}
        <Link href="/blogs/type-rating-for-pilots-in-india" className="text-av-orange font-semibold underline">
          Type Rating
        </Link>{' '}
        are three different things, governed by three different requirements, at three different
        points in a career. Confusing them is how students end up expecting a CPL quote to include
        training that is not the CPL at all — a pattern covered in more detail on{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className="text-av-orange font-semibold underline">
          our pilot training cost breakdown
        </Link>.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. We arrange
        flight training with partner flying schools rather than operating aircraft or simulators
        ourselves, which is exactly why we point students at clauses rather than at a device — the
        Schedule is the same wherever you fly, and knowing it before you enrol is what lets you read
        a syllabus correctly.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
