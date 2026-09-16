import Link from 'next/link';
import { SYLLABUS, EXAM_RULES, PARIKSHA, DGCA_PAPERS, inr } from '../lib/facts';

/**
 * DgcaPaperFacts — the sourced block that every DGCA subject page shares.
 *
 * WHY A COMPONENT. Four subject pages (/air-navigation, /aviation-meteorology,
 * /air-regulations, /technical-general) all need the same four things: the
 * published syllabus for that paper, the books DGCA itself names for that
 * subject, the pass mark, and what the paper costs to sit. Written four times
 * they drift apart within a month. Written once they cannot.
 *
 * THE HONEST LABELLING, which is the fiddly part. DGCA's published examination
 * syllabus that could be retrieved from a government server is the ATPL one —
 * CAR Section 7, Series 'B', Part VI. The CPL paper LIST comes from Schedule
 * II and is DGCA_PAPERS. Those are different documents describing different
 * paper sets, and the ATPL set includes papers the CPL set does not. So the
 * syllabus block is labelled as the ATPL syllabus wherever it is shown, never
 * relabelled as the CPL one, and the component says so on the page rather than
 * only in this comment. See lib/facts.js SYLLABUS for the full reasoning.
 *
 * PROPS
 *   paper      — the ATPL syllabus paper name, exactly as SYLLABUS.atpl.papers
 *                spells it. Pass null where no ATPL paper matches.
 *   bookSubject— the subject name as SYLLABUS.studyMaterial.cpl spells it.
 *   note       — optional line explaining a mismatch between the two.
 */
export default function DgcaPaperFacts({ paper, bookSubject, note }) {
  const syllabus = paper ? SYLLABUS.atpl.papers.find((p) => p.paper === paper) : null;
  const books = bookSubject ? SYLLABUS.studyMaterial.cpl.find((b) => b.subject === bookSubject) : null;
  const isCplPaper = bookSubject && DGCA_PAPERS.includes(bookSubject);

  const H3 = 'font-montserrat text-lg font-bold text-av-blue mb-3';
  const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

  return (
    <section className="mt-12" aria-label="What DGCA publishes about this paper">
      <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-2 underline-orange">
        What DGCA publishes about this paper
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        Checked on {SYLLABUS.verifiedOn.split('-').reverse().join('/')}. Every figure below comes from a DGCA document, listed at
        the end of this block.
      </p>

      {/* The three numbers, extractable at a glance. */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-av-blue rounded-xl p-5 text-white">
          <p className="text-av-orange font-bold text-xs mb-1">Pass mark</p>
          <p className="text-3xl font-montserrat font-black mb-1">{EXAM_RULES.theory.passMark}%</p>
          <p className="text-white/70 text-xs leading-relaxed">in this subject on its own, not an aggregate</p>
        </div>
        <div className="bg-av-blue rounded-xl p-5 text-white">
          <p className="text-av-orange font-bold text-xs mb-1">Fee for this paper</p>
          <p className="text-3xl font-montserrat font-black mb-1">{inr(PARIKSHA.fees.regularPerPaper)}</p>
          <p className="text-white/70 text-xs leading-relaxed">regular session; {inr(PARIKSHA.fees.olodePerPaper)} on demand</p>
        </div>
        <div className="bg-av-blue rounded-xl p-5 text-white">
          <p className="text-av-orange font-bold text-xs mb-1">A pass counts for</p>
          <p className="text-3xl font-montserrat font-black mb-1">5 years</p>
          <p className="text-white/70 text-xs leading-relaxed">towards a CPL or ATPL</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-8">
        {EXAM_RULES.theory.statement} {EXAM_RULES.theory.perSubject} The threshold is set by {EXAM_RULES.car.citation},{' '}
        {EXAM_RULES.theory.clause}, and the five-year window by {EXAM_RULES.paperValidity.clause}. {EXAM_RULES.paperValidity.planningNote}
      </p>

      {syllabus ? (
        <>
          <h3 className={H3}>The published syllabus for this paper</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            These headings are DGCA&rsquo;s own, from {SYLLABUS.atpl.car} — the syllabus for the {SYLLABUS.atpl.licence}{' '}
            examination. {isCplPaper
              ? 'This subject also appears in the CPL paper list set out in Schedule II of the Aircraft Rules, 1937, so the ground covered overlaps closely — but the document below is the ATPL syllabus and is labelled as such, because DGCA’s topic-by-topic syllabus for the CPL could not be retrieved from a government server.'
              : 'It is labelled as the ATPL syllabus because that is what it is.'}
            {note ? ` ${note}` : ''}
          </p>
          <div className="border border-gray-200 rounded-xl p-5 mb-8">
            <p className="font-montserrat font-bold text-av-blue text-sm mb-3">{syllabus.paper}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {syllabus.topics.map((t) => (
                <li key={t} className="flex gap-2 items-start text-sm text-gray-600 leading-relaxed">
                  <span className="text-av-orange flex-shrink-0">–</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {books ? (
        <>
          <h3 className={H3}>The study material DGCA names for this subject</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            DGCA publishes its own list of study material for the PPL, CPL and ATPL examinations. These are the titles it names for{' '}
            {books.subject}. {SYLLABUS.studyMaterial.dgcaNote} In other words: recommended reading aligned to the syllabus, not a
            required or exhaustive list. We do not sell any of these and have no interest in which one you choose.
          </p>
          <div className="border border-gray-200 rounded-xl p-5 mb-4">
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {books.books.map((b) => (
                <li key={b} className="text-sm text-gray-600 leading-relaxed">{b}</li>
              ))}
            </ul>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-8">
            Named across every subject as well: {SYLLABUS.studyMaterial.common.join(', ')}.
          </p>
        </>
      ) : null}

      <h3 className={H3}>When you can sit it, and what it costs</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Papers are booked on the DGCA Pariksha portal against a computer number, and no medical certificate is needed to sit one.
        {' '}{PARIKSHA.booking.onePerSession} {PARIKSHA.booking.noChanges}
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="font-semibold text-av-blue text-xs mb-2">Regular sessions, 2026</p>
          <ul className="space-y-1">
            {PARIKSHA.calendar2026.regular.map((r) => (
              <li key={r.session} className="text-sm text-gray-600">{r.session} — {r.dates}</li>
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="font-semibold text-av-blue text-xs mb-2">Online On-Demand, 2026</p>
          <ul className="space-y-1">
            {PARIKSHA.calendar2026.olode.slice(0, 4).map((r) => (
              <li key={r.session} className="text-sm text-gray-600">{r.session} — {r.dates}</li>
            ))}
            <li className="text-xs text-gray-400">and {PARIKSHA.calendar2026.olode.length - 4} more through the year</li>
          </ul>
        </div>
      </div>
      <p className="text-gray-500 text-xs leading-relaxed mb-6">{PARIKSHA.calendar2026.tentative}</p>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        The full paper list, the honest note on what DGCA does and does not publish for the CPL, and the complete study material
        list are on our <Link href="/commercial-pilot-license-syllabus" className={A}>syllabus and study material page</Link>. The
        computer number that gates all of this is covered on our{' '}
        <Link href="/dgca-computer-number" className={A}>computer number guide</Link>.
      </p>

      <p className="font-semibold text-av-blue text-xs mb-2">Sources for this block</p>
      <ul className="space-y-1.5">
        {SYLLABUS.sources.map((s) => (
          <li key={s.url} className="flex gap-2 items-start text-xs text-gray-600">
            <span className="text-av-orange flex-shrink-0">–</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
          </li>
        ))}
        <li className="flex gap-2 items-start text-xs text-gray-600">
          <span className="text-av-orange flex-shrink-0">–</span>
          {EXAM_RULES.car.citation} — pass marks and the validity of a passed paper
        </li>
        <li className="flex gap-2 items-start text-xs text-gray-600">
          <span className="text-av-orange flex-shrink-0">–</span>
          {PARIKSHA.sources[3].label} — examination fees and the 2026 session dates
        </li>
      </ul>
    </section>
  );
}
