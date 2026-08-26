import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function CostTransparency() {
  return (
    <>
      <Head>
        <title>Pilot Training Cost Transparency | Complete Fee Breakdown | We One Aviation</title>
        <meta name="description" content="Complete cost transparency: All-in pilot training fees, payment options, what's included, hidden costs to watch out for, and honest pricing breakdown." />
      </Head>

      <Layout title="Complete Cost Transparency - Pilot Training Fees" description="Honest breakdown of all pilot training costs, payment options, and transparency on what's included vs. additional expenses.">
        
        {/* Hero */}
        <div className="relative h-80 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-orange to-orange-700">
          <div className="relative z-10 text-center px-4">
            <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white mb-4">
              Cost Transparency
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Honest breakdown of all costs, hidden expenses, and payment options
            </p>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Intro */}
            <ScrollReveal>
              <div className="bg-orange-50 rounded-2xl border-l-4 border-orange-500 p-8">
                <p className="text-gray-800 text-lg leading-relaxed">
                  We believe in complete transparency about training costs. Below is a detailed breakdown of every expense, what's included, what's optional, and what you might not expect. <strong>No hidden fees. No surprises.</strong>
                </p>
              </div>
            </ScrollReveal>

            {/* Complete Cost Breakdown */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border-2 border-av-orange p-8">
                <h2 className="font-montserrat font-bold text-2xl text-av-blue mb-8">
                  💰 Complete CPL Training Cost Breakdown
                </h2>

                <div className="space-y-4">
                  {[
                    { category: 'Medical & Documentation', items: [
                      { desc: 'DGCA medical test', cost: '₹5,000 - ₹10,000', included: '✓' },
                      { desc: 'DGCA medical test', cost: '₹5,000 - ₹10,000', included: '✓' },
                      { desc: 'DGCA Computer Number Registration', cost: '₹2,000 - ₹3,000', included: '✓' },
                      { desc: 'Document verification & processing', cost: '₹1,000 - ₹2,000', included: '✓' },
                    ]},
                    { category: 'Ground School', items: [
                      { desc: 'Ground Class Tuition (9 subjects)', cost: '₹1,50,000 - ₹2,50,000', included: '✓' },
                      { desc: 'DGCA Exam Fees (9 papers @ ₹3,000)', cost: '₹25,000 - ₹30,000', included: '✓' },
                      { desc: 'Study Materials & Books', cost: '₹30,000 - ₹50,000', included: '~' },
                      { desc: 'Mock Test & Practice Papers', cost: '₹10,000 - ₹20,000', included: '✓' },
                    ]},
                    { category: 'Flight Training (Core)', items: [
                      { desc: 'Flying Training (200+ hours)', cost: '₹30,00,000 - ₹40,00,000', included: '✓' },
                      { desc: 'Simulator Training (50+ hours)', cost: '₹2,50,000 - ₹3,50,000', included: '✓' },
                      { desc: 'Instructor Fees (included in flight hours)', cost: 'Included', included: '✓' },
                      { desc: 'Aircraft Maintenance (fuel, wear)', cost: 'Included in hourly rate', included: '✓' },
                    ]},
                    { category: 'Rating & Certifications', items: [
                      { desc: 'Instrument Rating (IR)', cost: '₹3,00,000 - ₹4,50,000', included: '~' },
                      { desc: 'Type Rating (A320/B737)', cost: '₹1,00,000 - ₹2,00,000', included: '✗' },
                      { desc: 'Multi-Crew Cooperation (MCC)', cost: '₹50,000 - ₹1,00,000', included: '✗' },
                      { desc: 'FRTOL (Flight Radio License)', cost: '₹2,000 - ₹5,000', included: '✗' },
                    ]},
                    { category: 'Accommodation & Living', items: [
                      { desc: 'Hostel/PG Accommodation (18-24 months)', cost: '₹4,00,000 - ₹8,00,000', included: '~' },
                      { desc: 'Food & Meals (24 months)', cost: '₹2,00,000 - ₹3,00,000', included: '✗' },
                      { desc: 'Transport & Travel', cost: '₹1,00,000 - ₹2,00,000', included: '✗' },
                      { desc: 'Internet & Mobile', cost: '₹20,000 - ₹30,000', included: '✗' },
                    ]},
                  ].map((section, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-bold text-av-blue mb-4 pb-3 border-b-2 border-gray-200">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div>
                              <p className="text-gray-900 font-medium text-sm">{item.desc}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-av-orange font-bold text-sm">{item.cost}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.included === '✓' ? '✓ Included' : item.included === '~' ? '~ Optional' : '✗ Extra'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-av-orange flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-900">Total Training Cost:</p>
                  <p className="text-3xl font-black text-av-orange">₹40-55 Lakhs</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  ✓ = Included in standard package | ~ = Optional add-on | ✗ = Extra cost (not included)
                </p>
              </div>
            </ScrollReveal>

            {/* What's Actually Included */}
            <ScrollReveal>
              <div className="bg-green-50 rounded-2xl border-l-4 border-green-500 p-8">
                <h2 className="font-montserrat font-bold text-2xl text-green-900 mb-6">
                  ✓ What's Included in Your Training Fee
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    'DGCA Ground Classes (9 subjects)',
                    'DGCA Exam Registration & Fees',
                    'All 200+ Flying Hours',
                    'All 50+ Simulator Hours',
                    'Professional Instructors',
                    'Study Materials & Books',
                    'Mock Tests & Practice Papers',
                    'Instructor Feedback & Guidance',
                    'Aircraft Fuel & Maintenance',
                    'Flight Planning Tools',
                    'Safety Equipment',
                    'Training Records & Documentation',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                      <p className="text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Hidden Costs Section */}
            <ScrollReveal>
              <div className="bg-yellow-50 rounded-2xl border-l-4 border-yellow-500 p-8">
                <h2 className="font-montserrat font-bold text-2xl text-yellow-900 mb-6">
                  ⚠️ Hidden Costs (Watch Out For These)
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { cost: 'Exam Re-attempts', desc: 'If you fail a DGCA paper (₹3,000 per paper)', impact: 'Medium' },
                    { cost: 'Flying Hour Overages', desc: 'If you need more than 200 hours (₹1.5-2L per 10 hrs)', impact: 'High' },
                    { cost: 'Simulator Extra Hours', desc: 'Practice beyond included 50 hours (₹5K per hour)', impact: 'Low' },
                    { cost: 'Medical Extension', desc: 'Retaking medical tests if initial fails (₹5-10K)', impact: 'Low' },
                    { cost: 'Training Extension', desc: 'If timeline extends due to weather (₹20-30K/month)', impact: 'High' },
                    { cost: 'Accommodation Upgrade', desc: 'Better hostel/PG (₹5-10K/month extra)', impact: 'Medium' },
                    { cost: 'Type Rating', desc: 'A320/B737 certification (₹1-2L)', impact: 'High' },
                    { cost: 'License Conversion', desc: 'If training abroad, DGCA conversion (₹50-100K)', impact: 'Medium' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-yellow-200">
                      <p className="font-bold text-gray-900 mb-1">{item.cost}</p>
                      <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        item.impact === 'High' ? 'bg-red-100 text-red-700' :
                        item.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.impact} Risk
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Payment Options */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border-2 border-av-blue p-8">
                <h2 className="font-montserrat font-bold text-2xl text-av-blue mb-8">
                  💳 Payment Options & Plans
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { plan: 'Full Payment', benefit: '5-10% discount', timeline: 'Before course starts', details: 'Save ₹2-5 Lakhs' },
                    { plan: 'Semester-Based', benefit: 'Split into 4 parts', timeline: 'Every 6 months', details: '₹10-15L per semester' },
                    { plan: 'Monthly Installment', benefit: 'Flexible spread', timeline: '24-month plan', details: '₹1.7-2.3L per month' },
                    { plan: 'Bank Education Loan', benefit: 'Loan up to ₹50L', timeline: 'Apply via bank', details: '11-14% interest rate' },
                    { plan: 'Scholarship Program', benefit: 'Up to 50% waiver', timeline: 'Merit-based selection', details: 'Apply during admission' },
                    { plan: 'Hybrid Plan', benefit: 'Part cash + loan', timeline: 'Customizable', details: 'Best for most students' },
                  ].map((opt, i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                      <p className="font-bold text-av-blue mb-2 text-lg">{opt.plan}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2">
                          <span className="text-av-orange font-bold">•</span>
                          <span className="text-sm text-gray-700">{opt.benefit}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-av-orange font-bold">•</span>
                          <span className="text-sm text-gray-700">{opt.timeline}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-av-orange font-bold">•</span>
                          <span className="text-sm text-gray-700">{opt.details}</span>
                        </div>
                      </div>
                      <button className="text-av-orange text-sm font-bold hover:underline">
                        Learn more →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Cost Comparison */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                <h2 className="font-montserrat font-bold text-2xl text-av-blue mb-6">
                  📊 Cost Comparison: Different Training Options
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-av-light">
                        <th className="p-3 text-left font-bold text-av-blue">Training Option</th>
                        <th className="p-3 text-left font-bold text-av-blue">Total Cost</th>
                        <th className="p-3 text-left font-bold text-av-blue">Duration</th>
                        <th className="p-3 text-left font-bold text-av-blue">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { option: 'CPL in India (We One)', cost: '₹40-55L', duration: '18-24 mo', best: 'Budget-conscious students' },
                        { option: 'PPL + CPL in India', cost: '₹50-65L', duration: '22-28 mo', best: 'Building strong foundation' },
                        { option: 'CPL in USA', cost: '₹80-110L', duration: '12-18 mo', best: 'International experience' },
                        { option: 'CPL in Australia', cost: '₹70-90L', duration: '12-15 mo', best: 'Good balance' },
                        { option: 'CPL + Type Rating', cost: '₹55-75L', duration: '20-26 mo', best: 'Fast-track to airline jobs' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-bold text-gray-900">{row.option}</td>
                          <td className="p-3 text-av-orange font-bold">{row.cost}</td>
                          <td className="p-3 text-gray-600">{row.duration}</td>
                          <td className="p-3 text-gray-600 text-xs">{row.best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>

            {/* ROI Calculation */}
            <ScrollReveal>
              <div className="bg-blue-50 rounded-2xl border-l-4 border-blue-500 p-8">
                <h2 className="font-montserrat font-bold text-2xl text-blue-900 mb-6">
                  📈 Return on Investment (ROI) Calculation
                </h2>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-3">Average Pilot Salary in India:</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• <strong>Trainee Pilot:</strong> ₹50,000 - ₹1,00,000/month</p>
                      <p>• <strong>First Officer (FO):</strong> ₹2,00,000 - ₹4,00,000/month</p>
                      <p>• <strong>Senior First Officer:</strong> ₹4,00,000 - ₹6,00,000/month</p>
                      <p>• <strong>Captain:</strong> ₹6,00,000 - ₹10,00,000+/month</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">ROI Example (Conservative):</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Investment: ₹50 Lakhs | First Officer salary: ₹2.5L/month average
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Break-even:</strong> ~24 months (2 years) | <strong>Lifetime earning potential:</strong> ₹5-10+ Crores
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Financial Tips */}
            <ScrollReveal>
              <div className="bg-purple-50 rounded-2xl border-l-4 border-purple-500 p-8">
                <h2 className="font-montserrat font-bold text-2xl text-purple-900 mb-6">
                  💡 Money-Saving Tips
                </h2>
                <ul className="space-y-3">
                  {[
                    'Pay full amount upfront if possible - get 5-10% discount',
                    'Explore scholarship programs during admission',
                    'Take educational loan early - spreads payments easily',
                    'Avoid flying hour overages by maintaining focus & consistency',
                    'Skip optional ratings (Type Rating) until hired by airline',
                    'Share accommodation with classmates - split hostel costs',
                    'Join group study for exams - reduces tuition costs',
                    'Minimize exam re-attempts by studying thoroughly',
                    'Avoid medical re-tests by maintaining fitness standards',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold text-lg">💰</span>
                      <p className="text-gray-800 text-sm">{tip}</p>
                    </div>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-av-blue to-av-navy">
          <section className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl text-white mb-4">
              Need a Personalized Cost Estimate?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Get a detailed, personalized quote based on your situation and training options.
            </p>
            <Link href="/contact" className="inline-block bg-av-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-105">
              📞 Get Free Quote
            </Link>
          </section>
        </section>

      </Layout>
    </>
  );
}
