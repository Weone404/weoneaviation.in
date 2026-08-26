import Layout from '../../components/Layout';
import StructuredData from '../../components/StructuredData';
import { generateHowToSchema } from '../../lib/schema';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import QuickAnswer from '../../components/QuickAnswer';
import SummaryBox from '../../components/SummaryBox';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import Breadcrumb from '../../components/Breadcrumb';
import { LICENCES, CPL_HOURS, EDUCATION, MEDICAL, papersSummary, cplHoursSummary } from '../../lib/facts';

const steps = [
  { num: 1, title: 'Pass 12th with PCM', desc: 'You need Physics, Chemistry, and Maths in your 12th standard. A minimum of 50% marks is required for DGCA eligibility. Some foreign flying schools accept any 12th pass.' },
  { num: 2, title: 'Get DGCA Medical', desc: 'Before starting pilot training, you must clear the DGCA medical examination. This checks vision, hearing, cardiovascular health, and overall fitness. Schedule it early.' },
  { num: 3, title: 'Enroll in a DGCA-Approved Flying School', desc: 'Choose a DGCA-approved flying school like We One Aviation. Decide between training in India or abroad (USA, Canada, Australia, Europe).' },
  { num: 4, title: 'Complete Ground School Training', desc: 'You study the five DGCA written papers — Air Navigation, Aviation Meteorology, Air Regulations, Technical General, and more. Clear all written exams before progressing to flying.' },
  { num: 5, title: 'Complete 200+ Flying Hours', desc: 'Log a minimum of 200 flying hours as required by DGCA for CPL. This includes solo, cross-country, instrument, and night flying hours.' },
  { num: 6, title: 'Clear DGCA CPL Skill Test', desc: 'Appear for the DGCA CPL skill test (flight test) conducted by a DGCA examiner. Successfully demonstrate all flying maneuvers and procedures.' },
  { num: 7, title: 'Get Your CPL & Start Flying Career', desc: 'Receive your Commercial Pilot License from DGCA. Apply to airlines, appear for PABT, group discussion, and interview. Start as First Officer!' },
];

// Built from the SAME `steps` array the page renders, so schema and markup
// cannot drift apart.
const howToSchema = generateHowToSchema({
  name: 'How to become a pilot after 12th in India',
  description: 'The route from Class 12 to a Commercial Pilot Licence in India: subjects, the DGCA medical, ground school, the DGCA theory papers, flying hours and the CPL skill test.',
  url: 'https://weoneaviation.in/how-to-become-a-pilot/after-12th',
  steps,
});

/*
 * Kept disjoint from this route's pageFaqs entries. These are the questions a
 * Class 12 student actually asks first, and none of them repeats the step list.
 */
const peopleAlsoAsk = [
  {
    q: 'Do I need Chemistry, or only Physics and Maths?',
    a: 'The licence requirement is Physics and Mathematics — paragraph 1(b) of Schedule II, Section J. Chemistry is part of the usual PCM combination Indian schools offer, but it is the Physics and Maths the DGCA looks for.',
  },
  {
    q: 'I took Biology or Commerce. Is it over?',
    a: 'No. Students clear Physics and Mathematics as private candidates through NIOS and then apply. It adds a few months, not a barrier. Start it early, because the requirement arrives at the CPL stage regardless of how far along the flying is.',
  },
  {
    q: 'Can I start before my Class 12 results arrive?',
    a: 'You can start ground classes and book the medical. You cannot hold the licence: Section J requires you to be 18 on the date of application, and the DGCA needs your marksheet in hand. Most students use that gap to clear the theory.',
  },
  {
    q: 'Is training abroad faster than training in India?',
    a: 'Usually yes, mostly because of weather and aircraft availability rather than teaching. The trade-off is a conversion step on return — Indian papers and a medical to Indian standards. Budget the conversion time rather than treating a foreign licence as the finish line.',
  },
  {
    q: 'What is the single most common mistake at this stage?',
    a: 'Paying a flying school before booking the medical. A disqualifying condition found after a deposit is the most expensive discovery in this process, and it is entirely avoidable by reversing the order.',
  },
];

export default function After12th() {
  return (
    <Layout title="How to Become a Pilot After 12th | Complete Guide 2024 | We One Aviation" description="Complete guide on how to become a pilot after 12th standard in India. Eligibility, DGCA exams, flying hours, costs, and career path explained step-by-step.">
            <StructuredData data={howToSchema} />

      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center pt-16">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
          alt="Aircraft on a runway with a dramatic sunset sky during pilot training preparation"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">Complete Guide</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">
            How to Become a Pilot <span className="text-av-orange">After 12th</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm">Step-by-step guide for 12th standard students aspiring to fly</p>
        </div>
      </div>

      <section className="pt-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb />

          <QuickAnswer
            question="How do you become a pilot after 12th in India?"
            answer={`Clear 10+2 with Physics and Mathematics, book the ${MEDICAL.short}, join DGCA ground classes for the written papers, then build ${CPL_HOURS.total} hours at a flying school and pass the CPL skill test. The licence issues at 18 under Schedule II, Section J.`}
          />

          <SummaryBox
            title="What the licence actually requires"
            items={[
              `Education: ${EDUCATION.requirement} (${EDUCATION.clause})`,
              `Minimum age: ${LICENCES.find((l) => l.code === 'CPL').minAge} on the date you apply for the CPL — you can train earlier`,
              `Flying: ${cplHoursSummary()}`,
              `Written papers: ${papersSummary()}`,
              'RTR (A): examined separately, and required before the licence is issued',
              `Medical: a ${MEDICAL.short} — book this first, before spending on training`,
            ]}
          />

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What should you do first, the week results are out?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Book the medical. Not the flying school, not the ground classes — the medical. It is the cheapest step in the whole process and the only one that can end the plan outright, which makes doing it first the single highest-value decision available to you right now.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Students who reverse that order are the ones who lose real money. A flying-school deposit is not refundable because your eyesight turned out to be a problem, and finding out in month one instead of month six changes nothing except how much it costs you.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Which subjects do you need in Class 12?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Physics and Mathematics, from a recognised Board or University. That is what paragraph 1(b) of Schedule II, Section J asks for, and it is checked at the licence application rather than at the flying school gate — which is why students sometimes get most of the way through training before discovering a gap.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {EDUCATION.altRoute} If a commercial licence is the goal and your stream did not include both subjects, start that route now rather than after the flying. It is the cheapest correction available and it only gets more expensive the longer it waits.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Should you train in India or abroad?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Both routes end at the same Indian licence, so the question is really about time, weather and paperwork. Training in India means DGCA-direct licensing with no conversion step. Training abroad usually means more aircraft, more predictable flying weather and a faster path to the hours — followed by conversion when you return.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Neither is simply better. Read the country pages before deciding:{' '}
            <Link href="/flying-school/india" className="text-av-orange font-semibold hover:underline">India</Link>,{' '}
            <Link href="/flying-school/usa" className="text-av-orange font-semibold hover:underline">the USA</Link>,{' '}
            <Link href="/flying-school/canada" className="text-av-orange font-semibold hover:underline">Canada</Link>,{' '}
            <Link href="/flying-school/australia" className="text-av-orange font-semibold hover:underline">Australia</Link> and{' '}
            <Link href="/flying-school/south-africa" className="text-av-orange font-semibold hover:underline">South Africa</Link>.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How long does the whole thing take?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            The theory is the shorter half. What sets the timeline is the flying: {CPL_HOURS.total} hours accumulate at the speed of weather, aircraft availability and your own consistency. One detail catches people out — paragraph 1(e) requires those hours to fall inside the {CPL_HOURS.recencyYears} years immediately before you apply. Hours older than that stop counting, so a long gap between finishing training and filing the paperwork is expensive in a way nobody warns you about.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="section-tag">Roadmap</div>
              <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-6 underline-orange">
                Step-by-Step Pilot Training Roadmap
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 80}>
                  <div className="flex gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 card-hover">
                    <div className="flex-shrink-0 w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-montserrat font-bold">
                      {step.num}
                    </div>
                    <section>
                      <h3 className="font-montserrat font-bold text-av-blue mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </section>>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Eligibility Table */}
            <ScrollReveal className="mt-10">
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Who is eligible, at a glance?</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th className="px-4 py-3 text-left font-montserrat">Criteria</th>
                      <th className="px-4 py-3 text-left font-montserrat">PPL</th>
                      <th className="px-4 py-3 text-left font-montserrat">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Minimum Age', '17 years', '18 years'],
                      ['Education', '10+2 (any)', '10+2 PCM (50%)'],
                      ['Min Flight Hours', '40 hours', '200 hours'],
                      ['Duration', '6-12 months', '18-24 months'],
                    ].map(([crit, ppl, cpl], i) => (
                      <tr key={crit} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium text-av-blue">{crit}</td>
                        <td className="px-4 py-3 text-gray-600">{ppl}</td>
                        <td className="px-4 py-3 text-gray-600">{cpl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            {/* Cost Section */}
            <ScrollReveal className="mt-10">
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">What does pilot training cost in India?</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { course: 'PPL (India)', cost: '₹6-10 Lakh' },
                  { course: 'CPL (India)', cost: '₹40-70 Lakh' },
                  { course: 'CPL (Abroad)', cost: '₹50-90 Lakh' },
                ].map(item => (
                  <div key={item.course} className="bg-av-light rounded-xl p-5 text-center">
                    <div className="font-montserrat text-2xl font-black text-av-orange">{item.cost}</div>
                    <div className="text-av-blue text-sm font-medium mt-1">{item.course}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-3">* Fees vary by school and country. EMI and scholarships available. Contact us for exact current fees.</p>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Get Free Counselling" /></ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {[['CPL Course Details', '/courses/cpl'], ['PPL Course Details', '/ppl-full-form'], ['DGCA Ground Classes', '/dgca-ground-classes'], ['How to Become a Pilot in India', '/how-to-become-a-pilot/in-india']].map(([label, href]) => (
                    <Link key={href} href={href} className="block text-white/70 hover:text-av-orange text-sm py-1 transition-all hover:translate-x-1">
                      → {label}
                    </Link>
                  ))}
                </div>
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
