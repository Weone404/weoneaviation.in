import Layout from '../../components/Layout';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

const steps = [
  { num: 1, title: 'Pass 12th with PCM', desc: 'You need Physics, Chemistry, and Maths in your 12th standard. A minimum of 50% marks is required for DGCA eligibility. Some foreign flying schools accept any 12th pass.' },
  { num: 2, title: 'Get DGCA Class 1 Medical', desc: 'Before starting pilot training, you must clear the DGCA Class 1 medical examination. This checks vision, hearing, cardiovascular health, and overall fitness. Schedule it early.' },
  { num: 3, title: 'Enroll in a DGCA-Approved Flying School', desc: 'Choose a DGCA-approved flying school like WeOne Aviation. Decide between training in India or abroad (USA, Canada, Australia, Europe).' },
  { num: 4, title: 'Complete Ground School Training', desc: 'You\'ll study 9 DGCA subjects including Air Navigation, Meteorology, Air Regulations, Technical General, and more. Clear all written exams before progressing to flying.' },
  { num: 5, title: 'Complete 200+ Flying Hours', desc: 'Log a minimum of 200 flying hours as required by DGCA for CPL. This includes solo, cross-country, instrument, and night flying hours.' },
  { num: 6, title: 'Clear DGCA CPL Skill Test', desc: 'Appear for the DGCA CPL skill test (flight test) conducted by a DGCA examiner. Successfully demonstrate all flying maneuvers and procedures.' },
  { num: 7, title: 'Get Your CPL & Start Flying Career', desc: 'Receive your Commercial Pilot License from DGCA. Apply to airlines, appear for PABT, group discussion, and interview. Start as First Officer!' },
];

export default function After12th() {
  return (
    <Layout title="How to Become a Pilot After 12th | Complete Guide 2024 | WeOne Aviation" description="Complete guide on how to become a pilot after 12th standard in India. Eligibility, DGCA exams, flying hours, costs, and career path explained step-by-step.">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center pt-16"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">Complete Guide</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">
            How to Become a Pilot <span className="text-av-orange">After 12th</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm">Step-by-step guide for 12th standard students aspiring to fly</p>
        </div>
      </div>

      <section className="py-20 px-4">
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
                    <div>
                      <h3 className="font-montserrat font-bold text-av-blue mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Eligibility Table */}
            <ScrollReveal className="mt-10">
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Eligibility at a Glance</h3>
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
                      ['Medical', 'DGCA Class 2', 'DGCA Class 1'],
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
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Cost of Pilot Training in India</h3>
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
                  {[['CPL Course Details', '/courses/cpl'], ['PPL Course Details', '/courses/ppl'], ['DGCA Ground Classes', '/courses/dgca-ground-classes'], ['How to Become a Pilot in India', '/how-to-become-a-pilot/in-india']].map(([label, href]) => (
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
    </Layout>
  );
}
