import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA, EDUCATION, LICENCES, MIN_AGE, INDIGO_CADET, FOREIGN_LICENCE, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from commercial-pilot-license-eligibility (the whole eligibility list), become-pilot-without-physics-and-
 * maths-class-12 (the subject bridge) and igrua-admission-eligibility-fees (one institution's own cut-offs). This post
 * owns one question: is there a minimum Class 12 percentage? Pre-CPL audience: the parent question the standard names.
 * Sourcing: EDUCATION and PARIKSHA.education in lib/facts.js. No percentage appears in the sources cited there, so the
 * post says so as an absence in those documents. School, IGRUA and airline cut-offs are NOT stated: secondary pages
 * disagree on them (read 2026-10-25) and none could be fetched from a primary page, so they are described as varying.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'minimum-percentage-class-12-to-become-pilot-india';
const DATE_PUBLISHED = '2026-10-25';
const DATE_MODIFIED = '2026-10-25';

const PAR_EDU = PARIKSHA.education;
const rules = FOREIGN_LICENCE.sources.find((s) => s.label.startsWith('Aircraft Rules'));
const faq = PARIKSHA.sources[0];
const cpl = LICENCES.find((l) => l.code === 'CPL');

const peopleAlsoAsk = [
  {
    q: 'Is there a minimum percentage in Class 12 to become a pilot in India?',
    a: `Not in the rules we cite. The Aircraft Rules, 1937 (${EDUCATION.clause}) ask for ${EDUCATION.requirement}, and the Pariksha registration FAQ states the same subject condition. Neither document gives a percentage. A flying school or cadet programme may set its own.`,
  },
  {
    q: 'Can I become a pilot with 50% in Class 12?',
    a: `The DGCA rules we cite set no percentage, so the licence itself does not turn on your score. What matters is passing ${EDUCATION.requirement}. A particular school's admission cut-off is its own decision, so ask the school for its written requirement before you pay.`,
  },
  {
    q: 'Do Physics and Mathematics marks matter more than the total?',
    a: `DGCA's condition is about the subjects, not the total: ${lc(PAR_EDU.nonPpl)} Some institutions check marks subject by subject, which is why a school's own prospectus is the place to read the exact rule.`,
  },
  {
    q: 'Does a PPL need Class 12 marks?',
    a: `${PAR_EDU.ppl} A Private Pilot Licence has a minimum age of ${MIN_AGE.PPL}, against ${MIN_AGE.CPL} for the Commercial Pilot Licence.`,
  },
  {
    q: 'What if I did not study Physics and Mathematics in Class 12?',
    a: `${EDUCATION.altRoute} Our guide on the Physics and Mathematics bridge route explains the sequence.`,
  },
  {
    q: 'What documents prove my Class 12 result to DGCA?',
    a: `${PAR_EDU.documents} ${PAR_EDU.legibility}`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Minimum Percentage in Class 12 to Become a Pilot in India',
  description:
    'Whether DGCA sets a minimum Class 12 percentage for a pilot licence, what it asks for instead, and who actually sets marks cut-offs: schools, IGRUA and airline cadet programmes.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Eligibility',
  keywords: 'minimum percentage for pilot, 12th percentage for pilot India, pilot eligibility marks, CPL eligibility percentage, pilot after 12th marks',
});

const sources = [
  { label: rules.label, url: rules.url },
  { label: faq.label, url: faq.url },
  { label: INDIGO_CADET.source.label, url: INDIGO_CADET.source.url },
];

const related = [
  { lead: 'The subject bridge is explained in', anchor: 'the Physics and Mathematics post', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'One institution’s own marks rule is in', anchor: 'the IGRUA admission post', href: '/blogs/igrua-admission-eligibility-fees' },
  { lead: 'Minimum and maximum ages are in', anchor: 'the age limit post', href: '/blogs/age-limit-to-become-a-pilot-in-india' },
  { lead: 'What schools ask at admission is in', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
];

const tocHeadings = [
  { id: 'does-dgca-set-one', title: 'Does DGCA set a minimum percentage in Class 12?' },
  { id: 'what-it-asks', title: 'What does DGCA ask for instead of a percentage?' },
  { id: 'who-sets-cutoffs', title: 'Who does set a marks cut-off?' },
  { id: 'low-marks', title: 'What if your marks are low or the subjects are missing?' },
  { id: 'check-before-paying', title: 'How do you check a school’s marks rule before paying?' },
  { id: 'this-week', title: 'What to do this week' },
];

const whoRows = [
  { who: 'Aircraft Rules, 1937 (DGCA)', sets: `${EDUCATION.requirement} (${EDUCATION.clause}); no percentage in the text we cite` },
  { who: 'Pariksha registration (DGCA)', sets: `${PAR_EDU.nonPpl.replace(/\.$/, '')}; Class 10 for PPL` },
  { who: 'A flying school', sets: 'Its own admission rule. It varies by school and by intake, and DGCA does not publish it.' },
  { who: 'IGRUA', sets: 'Its own selection rule, revised each cycle. See the IGRUA admission post.' },
  { who: 'An airline cadet programme', sets: `Its own criteria. One published example asks for ${INDIGO_CADET.education}.` },
];

export default function MinimumPercentageClass12Pilot() {
  return (
    <BlogPostLayout
      title="Minimum Percentage in Class 12 to Become a Pilot"
      description="Is there a minimum Class 12 percentage to become a pilot in India? What DGCA asks for instead, and who actually sets marks cut-offs: schools, IGRUA and airlines."
      schema={[articleSchema, faqSchema]}
      heading="Minimum Percentage in Class 12 to Become a Pilot in India"
      category="Eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="5 min"
      quickAnswer={{
        question: 'Is there a minimum percentage in Class 12 to become a pilot in India?',
        answer: `The rules we cite set none. The Aircraft Rules, 1937 and DGCA's Pariksha registration FAQ ask for Class 12 passed with Physics and Mathematics from a recognised Board or University, and neither gives a percentage. Flying schools, IGRUA and airline cadet programmes can set their own marks cut-offs, which vary by intake.`,
      }}
      summaryTitle="Class 12 marks and the pilot licence"
      summaryItems={[
        `For a CPL, DGCA asks for ${lc(EDUCATION.requirement)} (${EDUCATION.clause}).`,
        'The DGCA documents we cite state a subject condition and no percentage.',
        PAR_EDU.ppl,
        'A marks cut-off, where one exists, belongs to the school or programme, and it varies by intake.',
        'Sources: the Aircraft Rules, 1937 and DGCA Pariksha FAQ, read on 25 October 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="25 October 2026"
    >
      <p>
        Your Class 12 result is out, the percentage is not what you hoped for, and a relative has
        told you pilots need at least 60%, or 70%, or whatever number they heard. Search the web for
        the minimum percentage in Class 12 to become a pilot and you will find a different figure on
        almost every page. This post separates what DGCA&rsquo;s own documents say from what a
        school, a government academy or an airline decides for itself.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/minimum-percentage-class-12-pilot/hero-marksheet-and-subjects.webp"
        width={1200}
        height={630}
        alt="A student holding a blank marksheet beside two upright books, one drawn in a different colour, with a small training aircraft in the distance"
        promptId="107"
      />

      <h2 id="does-dgca-set-one" className={H2}>Does DGCA set a minimum percentage in Class 12?</h2>
      <p>
        In the documents we cite, no. The Commercial Pilot Licence condition in the Aircraft Rules,
        1937 reads {EDUCATION.requirement.replace('Class ', '')} ({EDUCATION.clause} of Schedule II),
        and the Pariksha registration FAQ repeats the subject condition. Neither states a percentage.
        The licence turns on passing the right subjects, not on a score.
      </p>
      <p>
        You can read both yourself: the{' '}
        <Ext href={rules.url}>Aircraft Rules and Schedule II on the DGCA site</Ext> and the{' '}
        <Ext href={faq.url}>Pariksha computer number FAQ</Ext>. The Commercial Pilot Licence has a
        minimum age of {MIN_AGE.CPL}, and {lc(cpl.permits.replace(/\.$/, ''))}. Our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>{' '}
        lists every condition together.
      </p>

      <h2 id="what-it-asks" className={H2}>What does DGCA ask for instead of a percentage?</h2>
      <p>
        DGCA asks for a pass in the right subjects and proof you can show. {PAR_EDU.nonPpl} {PAR_EDU.ppl}
      </p>
      <ul className={UL}>
        <li>{PAR_EDU.documents}</li>
        <li>{PAR_EDU.legibility}</li>
        <li>A Biology or Commerce stream does not close the door: {lc(EDUCATION.altRoute)}</li>
      </ul>

      <BlogCta
        variant="mid"
        eyebrow="Subjects and documents"
        title="Sort the subject gap before the application"
        text="We teach the DGCA written subjects, and we can talk through which Class 12 subjects and documents you still need. A school's marks cut-off is its own decision and we cannot change it."
      />

      <h2 id="who-sets-cutoffs" className={H2}>Who does set a marks cut-off?</h2>
      <p>
        Institutions set marks cut-offs, not DGCA. A flying school, IGRUA or an airline cadet
        programme can each ask for more than the regulation does, and each changes its rule from one
        intake to the next. The table shows who decides what.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Who sets which Class 12 requirement for a pilot</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Who</th>
              <th scope="col" className={TH}>What it sets</th>
            </tr>
          </thead>
          <tbody>
            {whoRows.map((r, i) => (
              <tr key={r.who} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.who}</td>
                <td className={TD}>{r.sets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        We do not print a school cut-off here. Pages online quote figures that disagree with each
        other, and a figure that cannot be traced to the school or programme itself is not a source.
        For a government academy, read{' '}
        <Link href="/blogs/igrua-admission-eligibility-fees" className={LINK}>our IGRUA admission post</Link>.
        For an airline programme, read the airline&rsquo;s own page; the{' '}
        <Ext href={INDIGO_CADET.source.url}>IndiGo cadet page</Ext> is one example, last read{' '}
        {INDIGO_CADET.verifiedOn}, and criteria change by intake.
      </p>

      <BlogImagePlaceholder
        src="/blog/minimum-percentage-class-12-pilot/who-decides-the-cutoff.webp"
        width={1200}
        height={675}
        alt="Three plain doorways of different sizes in a row, each with a small blank card pinned beside it, and a student standing before the middle one"
        promptId="108"
      />

      <h2 id="low-marks" className={H2}>What if your marks are low or the subjects are missing?</h2>
      <p>
        Low marks do not stop a licence under the rules we cite, but a missing subject does. If
        Physics or Mathematics is absent from your Class 12, fix that first, because it is the
        condition DGCA actually checks.
      </p>
      <ul className={UL}>
        <li>
          Missing Physics or Mathematics: clear them as a private candidate and then apply, as
          explained in our{' '}
          <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={LINK}>
            Physics and Mathematics bridge guide
          </Link>.
        </li>
        <li>
          Still deciding on a Private Pilot Licence first: the minimum age is {MIN_AGE.PPL}, and the
          Class 10 requirement applies to it.
        </li>
        <li>
          Too young for a licence: see the{' '}
          <Link href="/blogs/age-limit-to-become-a-pilot-in-india" className={LINK}>age limit guide</Link>.
        </li>
      </ul>
      <p>
        Our <Link href="/courses/cpl" className={LINK}>CPL course page</Link> shows how ground
        subjects fit around flying training.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="check-before-paying" className={H2}>How do you check a school&rsquo;s marks rule before paying?</h2>
      <p>
        Ask the school to put its admission rule in writing before any deposit. A marks rule that
        exists should be stated plainly and applied to every applicant the same way.
      </p>
      <ol className={OL}>
        <li>Ask whether the school requires a total percentage, a per-subject percentage, or only a pass.</li>
        <li>Ask which intake the rule applies to and whether it changed since last year.</li>
        <li>Ask what happens to your deposit if you are not admitted.</li>
        <li>Keep both marksheets and both pass certificates ready, because DGCA needs them either way.</li>
      </ol>
      <p>
        The wider admission checklist is in our{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className={LINK}>
          flight school prerequisites guide
        </Link>.
      </p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Write down your Class 12 subjects and confirm Physics and Mathematics are both passed, then
        gather the marksheet and pass certificate for Class 10 and Class 12. Send any school you are
        considering a written question about its marks rule. The percentage question usually settles
        itself once you know who is asking for it.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
