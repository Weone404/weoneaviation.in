import Layout from '../../components/Layout';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';
import QuickAnswer from '../../components/QuickAnswer';
import SummaryBox from '../../components/SummaryBox';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import StructuredData from '../../components/StructuredData';
import { generateFAQSchema } from '../../lib/schema';

/*
 * REWRITTEN FROM A 16-LINE STUB.
 *
 * The previous version rendered CoursePageTemplate with a props object and
 * three claims scripts/check-claims.js exists to stop:
 *   - "FFS (Full Flight Simulator) training" and "Boeing 737 & A320 type
 *     rating prep" — the academy owns no simulator and no aircraft; the flying
 *     happens at partner schools.
 *   - "all 14 EASA/DGCA ATPL subjects" — an EASA affiliation claim.
 *   - "1500 hours" as a flat minimum. Schedule II, Section M is the instrument,
 *     and the sourcing note in scripts/check-claims.js records it as AMENDED
 *     TWICE — G.S.R. 22(E) of 7 Jan 2020 rewrote the experience figures
 *     (500->250, 200->100, 1000->500, 100->75, 10->20 hours) and G.S.R. 731(E)
 *     of 10 Oct 2023 touched para 4(e). The note says re-check before citing
 *     either. So this page cites the ONE Section M figure the amendments left
 *     alone — the minimum age of 21 — and tells the reader to confirm the
 *     current experience table rather than printing a number we cannot stand
 *     behind. That is more useful to a pilot than a stale figure stated
 *     confidently.
 */

const LAST_UPDATED = 'August 24, 2026';
const LAST_UPDATED_ISO = '2026-08-24';

const groundSubjects = [
  { subject: 'Air Law (international operations)', covers: 'ICAO Annexes, differences filing, and the rules that apply once a flight leaves Indian airspace.' },
  { subject: 'Advanced Air Navigation', covers: 'Long-range navigation, RNAV and RNP concepts, great-circle work and position fixing over oceanic tracks.' },
  { subject: 'Jet Meteorology', covers: 'Jet streams, clear-air turbulence, tropopause behaviour and the weather products used for long-haul planning.' },
  { subject: 'Aircraft Performance (transport category)', covers: 'Balanced field length, obstacle clearance, engine-out planning and the performance classes for large aeroplanes.' },
  { subject: 'Mass and Balance', covers: 'Loading limits, centre-of-gravity envelopes and the trim consequences of a shifting load in flight.' },
  { subject: 'Flight Planning', covers: 'Fuel policy, alternate selection, ETOPS thinking, and the paperwork a commander signs before a sector.' },
  { subject: 'Principles of Flight (transport category)', covers: 'High-speed aerodynamics, Mach effects, swept-wing behaviour and stall protection systems.' },
  { subject: 'Aircraft Systems and Instruments', covers: 'Pressurisation, hydraulics, electrics, EFIS and the failure logic behind each.' },
  { subject: 'Human Factors and CRM', covers: 'Workload management, error chains, fatigue, and the crew-resource practices that break those chains.' },
  { subject: 'Communications', covers: 'Standard phraseology across HF, VHF and CPDLC, and the discipline that keeps a busy frequency usable.' },
  { subject: 'Multi-crew operations', covers: 'Task sharing, monitoring, and the two-pilot procedures that define an airline flight deck.' },
];

const peopleAlsoAsk = [
  {
    q: 'What is the minimum age for an ATPL in India?',
    a: 'Twenty-one. Schedule II, Section M of the Aircraft Rules, 1937 sets the minimum age for an Airline Transport Pilot Licence (Aeroplanes) at 21 years. The section was amended in 2020 and again in 2023, but the age was left untouched by both.',
  },
  {
    q: 'Do I need a CPL before starting ATPL preparation?',
    a: 'In practice, yes. ATPL theory assumes you already hold a Commercial Pilot Licence and are building command experience. Most pilots sit the ATPL papers while flying the line as a First Officer rather than before their first airline job.',
  },
  {
    q: 'How many flying hours does an ATPL require?',
    a: 'The experience table lives in Schedule II, Section M, and it has been amended twice since 2018 — most substantially by G.S.R. 22(E) in January 2020. Any figure quoted from an older source may be out of date. Confirm the current requirement against the notified Schedule before you plan around it.',
  },
  {
    q: 'Can I sit the ATPL papers before I have the hours?',
    a: 'The theory and the experience are separate gates. Pilots routinely clear the written papers while still accumulating command time, then apply once the experience is in place. Sequencing it that way keeps the theory fresh and shortens the wait at the end.',
  },
  {
    q: 'Does We One Aviation provide the flying for an ATPL?',
    a: 'No. We teach the ground subjects and prepare pilots for the written examinations. The flying, the type rating and the simulator time sit with the operator or the flying school. We are honest about that line because it decides who you talk to next.',
  },
];

const faqs = [
  { q: 'Who should start ATPL preparation?', a: 'Pilots who hold a Commercial Pilot Licence and are working through the experience, examinations and ratings that airline command requires. It is not a first licence and it is not a route into aviation from scratch.' },
  { q: 'What is the minimum age for an ATPL in India?', a: 'Twenty-one years, under Schedule II, Section M of the Aircraft Rules, 1937. Two later amendments changed the experience figures in that section but left the age as it stands.' },
  { q: 'Which subjects does ATPL ground school cover?', a: 'Air Law for international operations, advanced air navigation, jet meteorology, transport-category performance, mass and balance, flight planning, principles of flight, aircraft systems and instruments, human factors and CRM, communications, and multi-crew operations.' },
  { q: 'How long does ATPL progression take?', a: 'Commonly three years or more end to end, because the licence waits on command experience rather than on classroom time. The theory itself is a far shorter commitment than the hours behind it.' },
  { q: 'What does ATPL preparation cost?', a: 'The ground-school component commonly runs around ₹15-25 lakh. Type rating, simulator time and hour-building sit outside that and vary with the operator and the aircraft.' },
  { q: 'Does an ATPL guarantee a captain position?', a: 'No. The licence is a requirement for command, not an appointment to it. Operators set their own command upgrade criteria on top of the regulatory minimum, and those move with fleet size and seniority.' },
];

const atplCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Airline Transport Pilot Licence (ATPL) Ground Preparation',
  description: 'ATPL (Aeroplanes) ground-subject preparation for pilots holding a Commercial Pilot Licence. Minimum age 21 under Schedule II, Section M of the Aircraft Rules, 1937. Covers air law, advanced navigation, jet meteorology, transport-category performance, flight planning, human factors and multi-crew operations.',
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  url: 'https://weoneaviation.in/courses/atpl',
  educationalCredentialAwarded: 'Preparation for the DGCA Airline Transport Pilot Licence (Aeroplanes) examinations',
  coursePrerequisites: 'A Commercial Pilot Licence, and a minimum age of 21 for licence issue (Aircraft Rules, 1937, Schedule II, Section M).',
  teaches: groundSubjects.map((s) => s.subject),
  timeRequired: 'P36M',
  offers: { '@type': 'AggregateOffer', lowPrice: 1500000, highPrice: 2500000, priceCurrency: 'INR' },
  provider: { '@type': 'EducationalOrganization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in' },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'blended',
    location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Dwarka, New Delhi', addressCountry: 'IN' } },
  },
};

export default function ATPL() {
  return (
    <Layout
      title="ATPL Training in India: Eligibility, Subjects, Age 21 | We One Aviation"
      description="Airline Transport Pilot Licence preparation in India. Minimum age 21 under Schedule II, Section M of the Aircraft Rules, 1937. Ground subjects, prerequisites and what the licence does and does not give you."
    >
      <StructuredData data={[atplCourseSchema, generateFAQSchema(faqs)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-tag justify-center">Airline Transport Pilot Licence</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight">
            Airline Transport Pilot Licence (ATPL) Training in India
          </h1>
          <p className="text-white/70 text-sm mt-4 max-w-2xl mx-auto">
            The licence that lets you sit in the left seat of a commercial aeroplane as pilot-in-command.
          </p>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <ScrollReveal>
              <Breadcrumb />

              {/*
                Inverted pyramid. Age, prerequisite and scope sit above every
                paragraph of context, so an extraction pass that reads only the
                opening block still leaves with the parts that gate a pilot.
              */}
              <QuickAnswer
                question="What is an ATPL, and who can hold one in India?"
                answer="An ATPL (Aeroplanes) is the licence required to act as pilot-in-command of a commercial aeroplane. Schedule II, Section M of the Aircraft Rules, 1937 sets a minimum age of 21. In practice you hold a Commercial Pilot Licence first and build command experience towards it."
              />

              <SummaryBox
                title="ATPL at a glance"
                items={[
                  'Minimum age: 21 years (Aircraft Rules, 1937, Schedule II, Section M)',
                  'Prerequisite: a Commercial Pilot Licence, plus command experience',
                  'What it permits: acting as pilot-in-command of a commercial aeroplane',
                  'Ground subjects: air law, advanced navigation, jet meteorology, transport-category performance, mass and balance, flight planning, principles of flight, systems, human factors, communications, multi-crew operations',
                  'Typical progression: three years or more, paced by flying hours rather than classroom time',
                  'Ground-school fee band: commonly ₹15-25 lakh, excluding type rating and simulator time',
                  'Experience table: Section M was amended in 2020 and 2023 — confirm the current figures before planning around them',
                ]}
              />

              <p className="text-gray-500 text-xs mb-8">{`Last updated: ${LAST_UPDATED}`}</p>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is the minimum age for an ATPL in India?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Twenty-one years. Section M of Schedule II fixes it, and it is the one requirement in that section you can rely on without re-reading the amendments. The experience figures around it have moved; the age has not.
              </p>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How many flying hours does an ATPL need?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We are not going to print a number here, and the reason matters to you. The experience table in Section M was rewritten by G.S.R. 22(E) on 7 January 2020, and Section M paragraph 4(e) was amended again by G.S.R. 731(E) on 10 October 2023. Plenty of sites still quote the pre-2020 figures.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Check the current Schedule II text, or ask your operator, before you build a plan around an hours target. A pilot who schedules a licence application against a stale figure loses months, not minutes.
              </p>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What subjects does ATPL ground school cover?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                ATPL theory picks up where the CPL papers stop. The aircraft is bigger, the sectors are longer, and the flight deck has two pilots on it — every subject below reflects one of those three changes.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                <table className="w-full text-sm">
                  <caption className="sr-only">ATPL ground subjects and what each one covers</caption>
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th scope="col" className="p-3 text-left text-xs font-semibold">Subject</th>
                      <th scope="col" className="p-3 text-left text-xs font-semibold">What it covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groundSubjects.map((row, i) => (
                      <tr key={row.subject} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left align-top">{row.subject}</th>
                        <td className="p-3 text-gray-600 text-xs">{row.covers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Do you need a CPL before an ATPL?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Yes, in every practical sense. The ATPL sits on top of a Commercial Pilot Licence and the command experience that follows it. Most pilots clear the written papers while flying the line as a First Officer, then apply once the experience is in place. If you are still working towards a CPL, start there — our{' '}
                <Link href="/courses/cpl" className="text-av-orange font-semibold hover:underline">CPL training page</Link>{' '}
                sets out the 200-hour route.
              </p>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What does an ATPL not give you?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                It does not appoint you captain. Command upgrades belong to the operator, and airlines set their own criteria on top of the regulatory minimum — fleet size, seniority and route structure all move that bar.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                It also does not include a type rating. The rating for a specific aircraft is a separate course, usually run by the operator or a training organisation with that type on its approval. We teach the ground subjects; we do not own simulators or aircraft, and the flying sits with partner schools and employers.
              </p>

              <PeopleAlsoAsk items={peopleAlsoAsk} />

              <section className="mt-10">
                <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-6">ATPL training: frequently asked questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details key={faq.q} className="rounded-xl border border-gray-200 bg-white p-5">
                      <summary className="cursor-pointer font-montserrat font-bold text-av-blue text-sm list-none">{faq.q}</summary>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <aside className="bg-av-blue rounded-2xl p-8 text-center my-10">
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Working towards airline command?</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                  Talk to us about the ground subjects, the paper order that fits your roster, and where the current Section M experience table actually stands.
                </p>
                <a
                  href="https://wa.me/919355611996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                >
                  Talk to an instructor
                </a>
              </aside>
            </ScrollReveal>
          </article>

          <aside className="space-y-6">
            <ScrollReveal delay={200}>
              <LeadForm title="Ask about ATPL preparation" />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-4">Before you apply</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>✓ Minimum age 21 (Schedule II, Section M)</li>
                  <li>✓ Commercial Pilot Licence in hand</li>
                  <li>✓ Command experience toward the current Section M table</li>
                  <li>✓ A valid DGCA medical certificate</li>
                  <li>✓ English language proficiency</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="bg-av-light rounded-2xl p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-2">Not there yet?</h4>
                <p className="text-gray-600 text-sm mb-3">
                  The ATPL follows a CPL. Start with the commercial licence and the 200 hours behind it.
                </p>
                <Link href="/courses/cpl" className="text-av-orange font-semibold text-sm hover:underline">
                  CPL training in India →
                </Link>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
