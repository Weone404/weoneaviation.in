import Layout from '../../components/Layout';
import PdfLeadMagnet from '../../components/PdfLeadMagnet';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function CostBreakdownGuide() {
  return (
    <>
      <Head>
        <title>CPL Training Cost Breakdown India vs Abroad - Free PDF | We One Aviation</title>
        <meta name="description" content="A guide to comparing CPL training quotes, cost categories, and provider terms in India and abroad." />
      </Head>

      <Layout title="CPL Cost Guide: Comparing Provider Quotes" description="Learn how to compare itemized CPL training quotes, cost categories, and provider terms. Prices and schedules must be confirmed directly with providers.">
        
        {/* Hero */}
        <div className="relative h-80 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-orange to-orange-700">
          <div className="relative z-10 text-center px-4">
            <div className="section-tag mb-3" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>Free Download</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4">
              CPL Cost Breakdown Guide
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Compare written quotes and training terms
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
                  Private flying-school prices and schedules vary by provider. This guide identifies cost categories to check; it does not publish unverified country totals or represent current partner availability.
                </p>

                {/* Cost Summary Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { location: '🇮🇳 India', cost: 'Request current written quotes', duration: 'Confirm provider schedule', pros: 'Compare itemized scope and terms' },
                    { location: '🇺🇸 USA', cost: 'Request current written quotes', duration: 'Confirm provider schedule', pros: 'Verify provider status and terms' },
                    { location: '🇦🇺 Australia', cost: 'Request current written quotes', duration: 'Confirm provider schedule', pros: 'Verify provider status and terms' },
                    { location: '🇨🇦 Canada', cost: 'Request current written quotes', duration: 'Confirm provider schedule', pros: 'Verify provider status and terms' },
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
                    💰 CPL Cost Categories to Confirm
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { item: 'Medical examination', cost: 'Confirm with the examination provider' },
                      { item: 'DGCA ground classes', cost: 'Request a current written quote from the academy' },
                      { item: 'DGCA examination fees', cost: 'Check the current official Pariksha fee schedule' },
                      { item: 'Flying training', cost: 'Request a current written quote from the selected school' },
                      { item: 'Simulator training, if applicable', cost: 'Confirm scope and charges with the school' },
                      { item: 'Additional ratings, if applicable', cost: 'Confirm requirements and charges with the relevant provider' },
                      { item: 'Accommodation and travel', cost: 'Confirm location-specific costs independently' },
                      { item: 'Materials and other charges', cost: 'Request an itemized list of inclusions and exclusions' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700">{row.item}</span>
                        <span className="font-bold text-av-orange">{row.cost}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-av-orange flex justify-between">
                    <span className="font-bold text-lg text-gray-900">Total:</span>
                    <span className="font-black text-xl text-av-orange">No verified total; compare written quotes</span>
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
                      { plan: 'Payment terms', benefit: 'Confirm current terms directly with each provider', timeline: 'Obtain written terms before paying' },
                      { plan: 'Education finance', benefit: 'Check eligibility and terms with the lender', timeline: 'Lender criteria and rates vary' },
                      { plan: 'Scholarships or discounts', benefit: 'No current offer is verified here', timeline: 'Confirm any written offer with its issuer' },
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
                        { country: '🇮🇳 India', cost: 'Confirm with provider', dur: 'Confirm with provider', pro: 'Compare quote scope', con: 'Terms vary by school' },
                        { country: '🇺🇸 USA', cost: 'Confirm with provider', dur: 'Confirm with provider', pro: 'Verify school status', con: 'Confirm visa rules' },
                        { country: '🇦🇺 Australia', cost: 'Confirm with provider', dur: 'Confirm with provider', pro: 'Verify school status', con: 'Confirm visa rules' },
                        { country: '🇨🇦 Canada', cost: 'Confirm with provider', dur: 'Confirm with provider', pro: 'Verify school status', con: 'Confirm visa rules' },
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
                  description="Download a guide to comparing written quotes, cost categories, and provider terms."
                  pdfFileName="CPL-Cost-Breakdown-Guide.pdf"
                  icon="💰"
                  dark={false}
                />

                {/* CTA */}
                <div className="mt-6 p-4 bg-av-orange/10 rounded-xl text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    Want help comparing written quotes?
                  </p>
                  <Link href="/contact" className="inline-block bg-av-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold">
                    Contact the Academy
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
