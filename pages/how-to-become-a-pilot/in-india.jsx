import Layout from '../../components/Layout';
import StructuredData from '../../components/StructuredData';
import { generateHowToSchema } from '../../lib/schema';
import { papersSummary, cplHoursSummary, CPL_HOURS, EDUCATION, MEDICAL, LICENCES } from '../../lib/facts';
import QuickAnswer from '../../components/QuickAnswer';
import SummaryBox from '../../components/SummaryBox';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import Breadcrumb from '../../components/Breadcrumb';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';

/*
 * The nine steps below are drawn from what this page already stated in prose —
 * the education, age, medical, hours, instrument-rating, examination and
 * skill-test requirements listed further down. Nothing here is new fact.
 *
 * This page previously carried NO HowTo schema, deliberately: it was a
 * narrative overview with no visible step list, and schema describing steps a
 * reader cannot see is the mismatch that earns a manual action. Adding the
 * visible list is what makes the schema legitimate, so the list comes first
 * and the schema is generated FROM it.
 */
const pilotSteps = [
  { title: 'Clear 10+2 with Physics and Mathematics', desc: 'The DGCA requires Class 10+2 with Physics and Mathematics from a recognised Board, with a minimum of 50%. Students from a Biology or Commerce stream clear both subjects as private candidates through NIOS and then apply.' },
  { title: 'Book your DGCA medical before you spend anything else', desc: 'A DGCA-approved examiner checks that you meet the fitness standards the licence requires. Do this first. Finding a disqualifying condition after paying a flying-school deposit is the most expensive mistake in the process, and it is entirely avoidable.' },
  { title: 'Choose your training route — India or abroad', desc: 'Training in India means DGCA-direct licensing with no conversion step. Training abroad usually means a larger fleet, more predictable weather and faster completion, followed by conversion on return. Both routes end at the same Indian licence.' },
  { title: 'Get a DGCA computer number and join ground classes', desc: 'The computer number is the prerequisite for sitting the DGCA papers. Ground classes then cover the theory those papers test, and a school teaching to the current syllabus saves you a full examination cycle.' },
  { title: 'Clear the DGCA written examinations', desc: 'You prepare and sit the CPL subject papers. They are cleared individually rather than in a single sitting, so plan the order around your flying schedule instead of attempting everything at once.' },
  { title: 'Join a flying school and begin flight training', desc: 'Training runs from dual instruction through first solo to cross-country and night flying. This is the longest and most expensive stage, and weather and aircraft availability drive the timeline more than anything you control.' },
  { title: 'Build the required flying hours', desc: 'A CPL requires a minimum of 200 total flying hours, including the solo time the DGCA prescribes. The hours must fall inside the five years immediately preceding your licence application, so plan the application date alongside the flying.' },
  { title: 'Complete the Instrument Rating', desc: 'You must hold an Instrument Rating before the CPL is issued. It covers flight solely by reference to instruments, which is the condition most commercial flying is actually conducted in.' },
  { title: 'Pass the CPL skill test and apply for the licence', desc: 'A DGCA examiner assesses your competency on an approved aircraft. Once you clear it and your paperwork, medical and radio licence are all current, you apply to the DGCA for issue of the Commercial Pilot Licence.' },
];

// Generated from the SAME array the page renders — schema and markup cannot drift.
const howToSchema = generateHowToSchema({
  name: 'How to become a pilot in India',
  description: 'The route to a Commercial Pilot Licence in India: 10+2 with Physics and Mathematics, the DGCA medical, choosing a training route, ground classes and the DGCA written papers, flight training and the required hours, the Instrument Rating, and the CPL skill test.',
  url: 'https://weoneaviation.in/how-to-become-a-pilot/in-india',
  steps: pilotSteps,
});

/*
 * Disjoint from this route's pageFaqs entries and from the nine pilotSteps
 * rendered below — these answer the decisions AROUND the process, not the
 * process itself.
 */
const peopleAlsoAsk = [
  {
    q: 'Is a DGCA licence recognised outside India?',
    a: 'It is an Indian licence, and other authorities convert rather than accept it — the same way the DGCA converts a foreign one. If you intend to fly abroad long-term, research that authority conversion path before you choose where to train.',
  },
  {
    q: 'Does the five-year rule apply to the theory papers too?',
    a: 'No. The five-year window in paragraph 1(e) governs flight time, not cleared papers. Papers do not lapse the same way. What it means in practice is that the flying should follow the theory without a long gap, not the reverse.',
  },
  {
    q: 'Can I work while training?',
    a: 'During ground classes, many students do — we run online and classroom batches partly for that reason. During the flying phase it is harder: flying is scheduled around weather and aircraft availability, not around your calendar.',
  },
  {
    q: 'What does an Instrument Rating add?',
    a: 'It permits flight by sole reference to instruments, which is the condition most commercial flying is actually conducted in. It is required before the CPL is issued, so treat it as part of the licence rather than an optional extra.',
  },
  {
    q: 'How do I know a flying school is genuine?',
    a: 'Ask for the approval, the aircraft availability per student, and what happens to your money if the school stops operating. Our credentials page sets out the seven questions worth asking any academy, including us.',
  },
];

export default function InIndia() {
  return (
    <Layout title="How to Become a Pilot in India 2024 | Complete DGCA Guide | We One Aviation" description="Complete guide on becoming a commercial pilot in India. DGCA requirements, CPL eligibility, flying schools, fees, career prospects and salary in 2024.">
      <StructuredData data={howToSchema} />

      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center pt-16">
        <Image
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
          alt="Air travel and runway scene representing pilot training and aviation careers in India"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">India Guide</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">
            How to Become a Pilot <span className="text-av-orange">in India</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm">DGCA requirements, flying schools, costs & career guide 2024</p>
        </div>
      </div>

      <section className="pt-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb />

          <QuickAnswer
            question="How do you become a pilot in India?"
            answer={`You clear 10+2 with Physics and Mathematics, pass the ${MEDICAL.short}, clear the DGCA written papers, then build ${CPL_HOURS.total} hours of flight time at a flying school and pass the CPL skill test. The Commercial Pilot Licence issues at ${LICENCES.find((l) => l.code === 'CPL').minAge}.`}
          />

          <SummaryBox
            title="The requirements, in one place"
            items={[
              `Education: ${EDUCATION.requirement} (${EDUCATION.clause})`,
              `Minimum age for the CPL: ${LICENCES.find((l) => l.code === 'CPL').minAge} years, Schedule II, Section J`,
              `Flight time: ${cplHoursSummary()}`,
              `Written papers: ${papersSummary()} — cleared individually, not in one sitting`,
              'RTR (A): examined separately under its own 2025 Rules, required for licence issue',
              'Instrument Rating: required before the CPL is issued',
              `Medical: a ${MEDICAL.short}`,
            ]}
          />

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What makes the Indian route different?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            One thing above all: no conversion step. A licence earned in India is issued by the DGCA directly, so the day you finish is the day you hold an Indian licence. Train abroad and you finish with a foreign licence plus a conversion process still ahead of you — Indian papers and a medical to Indian standards.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            What you trade for that is pace. Indian flying schools contend with monsoon months and aircraft availability, and both stretch the calendar in ways a brochure timeline rarely reflects. Neither route is simply better; they fail in different places, and the right answer depends on whether your constraint is time or paperwork.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What actually sets the timeline?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Not the theory. The written papers are cleared individually across exam cycles, and a student working steadily gets through them. The flying is what moves — {CPL_HOURS.total} hours accumulate at the speed of weather, serviceable aircraft and instructor availability, none of which you control.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            There is a deadline hidden inside that. Paragraph 1(e) requires the {CPL_HOURS.total} hours to fall within the {CPL_HOURS.recencyYears} years immediately preceding your licence application. Hours logged before that window stop counting. Students who pause after building most of their time — for money, for a job, for family — are the ones this rule catches, and the cost is measured in hours re-flown.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Where does the money actually go?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Overwhelmingly into flying. Ground classes, examination fees, the medical and the computer number are real costs but small ones beside the hours. That is why the order matters: every concept you settle in a classroom is one you are not working out with a meter running. Our{' '}
            <Link href="/cost-transparency" className="text-av-orange font-semibold hover:underline">cost transparency page</Link>{' '}
            breaks the line items down, and{' '}
            <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold hover:underline">CPL eligibility</Link>{' '}
            covers the conditions in full.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <ScrollReveal>
              <div className="section-tag">Overview</div>
              <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-4 underline-orange">
                Pilot Training in India – Overview
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                India is one of the fastest-growing aviation markets in the world, and the demand for commercial pilots has never been higher. The Directorate General of Civil Aviation (DGCA) is the regulatory body governing pilot training in India.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                To become a commercial pilot in India, you must obtain a Commercial Pilot License (CPL) issued by the DGCA. This requires clearing 9 written exams, completing 200+ flying hours, and passing a CPL skill test conducted by a DGCA examiner.
              </p>
            </ScrollReveal>

            {/* Routes */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Training Routes Available in India</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: 'Train in India', icon: '🇮🇳', pros: ['Lower cost (₹40-70L)', 'DGCA-direct licensing', 'No conversion required', 'Family proximity', 'Multiple school options'], cons: ['Limited aircraft fleet', 'Weather disruptions', 'Longer wait times'] },
                  { title: 'Train Abroad', icon: '🌍', pros: ['Better fleet & infrastructure', 'Faster training completion', 'International exposure', 'Better weather', 'Quality education'], cons: ['Higher cost (₹50-90L)', 'License conversion needed', 'Away from family', 'Currency risk'] },
                ].map(route => (
                  <div key={route.title} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                    <h4 className="font-montserrat font-bold text-av-blue mb-3 flex items-center gap-2">{route.icon} {route.title}</h4>
                    <div className="space-y-1">
                      {route.pros.map(p => <div key={p} className="text-green-600 text-xs flex items-center gap-2"><span>✓</span>{p}</div>)}
                      {route.cons.map(c => <div key={c} className="text-red-400 text-xs flex items-center gap-2"><span>✗</span>{c}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* DGCA Requirements */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">DGCA CPL Requirements</h3>
              <div className="space-y-3">
                {[
                  ['Education', '10+2 with Physics & Maths (minimum 50%)'],
                  ['Age', 'Minimum 18 years at time of CPL skill test'],
                  ['Medical', 'DGCA medical certificate (valid throughout)'],
                  ['Flying Hours', 'Minimum 200 total flying hours (including 100 solo)'],
                  ['Instrument Rating', 'Must hold Instrument Rating (IR) before CPL'],
                  ['DGCA Written Exams', `Must clear the five written papers: ${papersSummary()}`],
                  ['RTR (A)', 'Examined separately, under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025'],
                  ['Skill Test', 'CPL skill test by DGCA examiner on approved aircraft'],
                ].map(([req, desc]) => (
                  <div key={req} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-av-orange font-semibold text-sm w-40 flex-shrink-0">{req}</div>
                    <div className="text-gray-600 text-sm">{desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Step-by-step route — the visible list the HowTo schema describes */}
            <ScrollReveal>
              <section aria-labelledby="pilot-steps-heading">
                <h2 id="pilot-steps-heading" className="font-montserrat text-xl font-bold text-av-blue mb-2">
                  How do you become a pilot in India, step by step?
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Nine stages take you from a Class 12 marksheet to a Commercial Pilot Licence. The order matters more than most students expect: the medical comes second for a reason, and the flying hours carry an expiry that catches people who leave a gap before applying.
                </p>
                <ol className="space-y-3 mb-4">
                  {pilotSteps.map((step, i) => (
                    <li key={step.title} id={`step-${i + 1}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-av-orange text-white font-montserrat font-bold text-sm flex items-center justify-center" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-montserrat font-bold text-av-blue text-sm mb-1">{step.title}</span>
                        <span className="block text-gray-600 text-sm leading-relaxed">{step.desc}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </ScrollReveal>

            {/* Indian Airlines Hiring */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Airlines Hiring in India</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['IndiGo Airlines', 'Air India', 'SpiceJet', 'GoFirst', 'Vistara', 'Air Asia India', 'Alliance Air', 'Star Air', 'Blue Dart Aviation'].map(airline => (
                  <div key={airline} className="bg-av-blue rounded-xl p-3 text-center text-white text-xs font-medium">✈ {airline}</div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Get Free Counselling" /></ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-3">Career Progression in India</h4>
                {/*
                  Rupee figures removed. The academy cannot substantiate what any
                  individual earns, and scripts/check-claims.js treats a
                  per-month figure sitting beside an outcome word as a claim.
                  The rank ladder is factual and survives; the numbers do not.
                */}
                {[['Trainee Pilot', 'Entry'], ['First Officer', 'Right seat'], ['Senior FO', 'By hours'], ['Captain', 'Left seat'], ['Senior Captain', 'Command, wide-body']].map(([role, sal]) => (
                  <div key={role} className="flex justify-between py-2 border-b border-white/20 last:border-0 text-sm">
                    <span className="text-white/80">{role}</span>
                    <span className="font-bold">{sal}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <PeopleAlsoAsk items={peopleAlsoAsk} />
        </div>
      </section>

    </Layout>
  );
}
