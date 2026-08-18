import Layout from '../../components/Layout';
import PdfLeadMagnet from '../../components/PdfLeadMagnet';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function CostBreakdownGuide() {
  return (
    <>
      <Head>
        <title>CPL Training Cost Breakdown India vs Abroad - Free PDF | WeOne Aviation</title>
        <meta name="description" content="Free CPL cost breakdown guide comparing India vs USA vs Australia pilot training. Detailed fee breakdown, hidden costs, and payment options." />
      </Head>

      <Layout title="CPL Cost Breakdown: India vs Abroad" description="Complete cost breakdown for Commercial Pilot License training in India vs USA vs Australia. All-in fees, hidden costs, and payment plans.">
        
        {/* Hero */}
        <div className="relative h-80 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-orange to-orange-700">
          <div className="relative z-10 text-center px-4">
            <div className="section-tag mb-3" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>Free Download</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4">
              CPL Cost Breakdown Guide
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Complete fee comparison: India vs USA vs Australia vs Canada
            </p>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            
            {/* Left: Content Preview */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  The cost of pilot training varies dramatically based on location, facilities, and training scope. This guide breaks down all expenses so you can make an informed decision.
                </p>

                {/* Cost Summary Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { location: '🇮🇳 India (Weone Aviation)', cost: '₹40-55 Lakhs', duration: '18-24 months', pros: 'Affordable, DGCA-direct, family close' },
                    { location: '🇺🇸 USA (Florida)', cost: '$100-130K', duration: '12-18 months', pros: 'Best infrastructure, faster completion' },
                    { location: '🇦🇺 Australia (Queensland)', cost: 'A$80-100K', duration: '12-15 months', pros: 'Good weather, quality facilities' },
                    { location: '🇨🇦 Canada (Ontario)', cost: 'C$90-120K', duration: '14-18 months', pros: 'International recognition, structured' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-br from-av-light to-white rounded-lg p-4 border border-gray-200">
                      <p className="font-bold text-av-blue mb-1">{item.location}</p>
                      <p className="text-xl font-black text-av-orange mb-1">{item.cost}</p>
                      <p className="text-xs text-gray-600 mb-2">Duration: {item.duration}</p>
                      <p className="text-xs text-gray-500">{item.pros}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Detailed Breakdown - India */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border-2 border-av-blue p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    💰 Detailed Cost Breakdown - India (Weone Aviation)
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { item: 'DGCA Medical Tests (Class 2 + Class 1)', cost: '₹15,000 - ₹20,000' },
                      { item: 'DGCA Ground School Fees', cost: '₹1,50,000 - ₹2,50,000' },
                      { item: 'DGCA Exam Fees (9 papers × ₹3,000)', cost: '₹25,000 - ₹30,000' },
                      { item: 'Flying Training (200+ hours)', cost: '₹30,00,000 - ₹40,00,000' },
                      { item: 'Simulator Training (50+ hours)', cost: '₹2,50,000 - ₹3,50,000' },
                      { item: 'Instrument Rating (IR) Add-on', cost: '₹3,00,000 - ₹4,50,000' },
                      { item: 'Type Rating (Optional, A320/B737)', cost: '₹1,00,000 - ₹2,00,000' },
                      { item: 'Accommodation & Travel (18-24 months)', cost: '₹5,00,000 - ₹8,00,000' },
                      { item: 'Books, Materials, Miscellaneous', cost: '₹50,000 - ₹75,000' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700">{row.item}</span>
                        <span className="font-bold text-av-orange">{row.cost}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-av-orange flex justify-between">
                    <span className="font-bold text-lg text-gray-900">Total:</span>
                    <span className="font-black text-2xl text-av-orange">₹40-55 Lakhs</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Hidden Costs Section */}
              <ScrollReveal>
                <div className="bg-yellow-50 rounded-xl border-l-4 border-yellow-400 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-yellow-900 mb-4">
                    ⚠️ Hidden Costs (Don't Get Caught Off Guard)
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Exam re-attempts (if you fail a paper)',
                      'Flying hour overages (if you need extra hours)',
                      'Simulator re-bookings (practice beyond included hours)',
                      'Medical certificate renewals',
                      'Training extension fees (if timeline extends)',
                      'Hostel/PG upgrades (better accommodation)',
                      'Food & living expenses (highly variable)',
                      'License transfer/conversion fees (if training abroad)',
                    ].map((cost, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-yellow-600 font-bold">•</span>
                        {cost}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Payment Options */}
              <ScrollReveal>
                <div className="bg-gradient-to-br from-av-light to-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    💳 Payment Options & Plans
                  </h3>
                  <div className="space-y-3">
                    {[
                      { plan: 'Pay in Full', benefit: '5-10% discount (₹2-5 Lakhs savings)', timeline: 'Before course starts' },
                      { plan: 'Semester Basis', benefit: 'Split into 3-4 payments', timeline: 'As training progresses' },
                      { plan: 'Bank Loans', benefit: 'Axis, ICICI, SBI offer education loans', timeline: 'High interest ~11-14%' },
                      { plan: 'Installment Plans', benefit: 'Pay monthly over 24 months', timeline: 'Flexible payment schedule' },
                      { plan: 'Scholarships', benefit: 'Up to 50% waiver for merit', timeline: 'Apply during admission' },
                    ].map((opt, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                        <p className="font-bold text-av-blue mb-1">{opt.plan}</p>
                        <p className="text-sm text-gray-600 mb-1">{opt.benefit}</p>
                        <p className="text-xs text-gray-500">{opt.timeline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Cost Comparison Chart */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    📊 International Cost Comparison
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-av-light">
                        <th className="p-2 text-left font-bold text-av-blue">Country</th>
                        <th className="p-2 text-left font-bold text-av-blue">Total Cost (INR)</th>
                        <th className="p-2 text-left font-bold text-av-blue">Duration</th>
                        <th className="p-2 text-left font-bold text-av-blue">Pros</th>
                        <th className="p-2 text-left font-bold text-av-blue">Cons</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {[
                        { country: '🇮🇳 India', cost: '₹40-55L', dur: '18-24m', pro: 'Affordable', con: 'Weather delays' },
                        { country: '🇺🇸 USA', cost: '₹80-110L', dur: '12-18m', pro: 'Best infrastructure', con: 'Visa hassle' },
                        { country: '🇦🇺 Australia', cost: '₹70-90L', dur: '12-15m', pro: 'Good balance', con: 'Far from home' },
                        { country: '🇨🇦 Canada', cost: '₹85-120L', dur: '14-18m', pro: 'Quality training', con: 'Cold weather' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 font-bold">{row.country}</td>
                          <td className="p-2 text-av-orange font-bold">{row.cost}</td>
                          <td className="p-2">{row.dur}</td>
                          <td className="p-2 text-green-600 text-xs">{row.pro}</td>
                          <td className="p-2 text-red-600 text-xs">{row.con}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>

            </div>

            {/* Right: Download Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PdfLeadMagnet
                  title="Get Cost Breakdown PDF"
                  description="Download the complete cost breakdown guide with comparison charts, hidden costs, and payment plans."
                  pdfFileName="CPL-Cost-Breakdown-Guide.pdf"
                  icon="💰"
                  dark={false}
                />

                {/* CTA */}
                <div className="mt-6 p-4 bg-av-orange/10 rounded-xl text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    Want a personalized cost estimate?
                  </p>
                  <Link href="/contact" className="inline-block bg-av-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold">
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

      </Layout>
    </>
  );
}
