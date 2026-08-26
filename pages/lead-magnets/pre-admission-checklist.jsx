import Layout from '../../components/Layout';
import PdfLeadMagnet from '../../components/PdfLeadMagnet';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function PreAdmissionChecklist() {
  return (
    <>
      <Head>
        <title>Pre-Admission Checklist for Pilot Training - Free PDF | We One Aviation</title>
        <meta name="description" content="Free pre-admission checklist for pilot training. Complete documentation requirements, medical tests, eligibility criteria, and application process guide." />
      </Head>

      <Layout title="Pre-Admission Checklist for Pilot Training" description="Complete pre-admission checklist with all documents, medical tests, eligibility criteria needed for pilot training enrollment.">
        
        {/* Hero */}
        <header className="relative h-80 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-green to-emerald-700">
          <div className="relative z-10 text-center px-4">
            <div className="section-tag mb-3" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>Free Download</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4">
              Pre-Admission Checklist
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Everything you need before joining pilot training
            </p>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            
            {/* Left: Content Preview */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <div className="bg-green-50 rounded-xl border-l-4 border-green-500 p-6 mb-6">
                  <p className="font-bold text-green-900 mb-2">✅ This checklist ensures you're 100% ready before admission</p>
                  <p className="text-gray-700 text-sm">
                    Many students miss critical steps and face delays. Use this checklist to stay ahead and start training on time.
                  </p>
                </div>
              </ScrollReveal>

              {/* Phase 1: Eligibility Check */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    📋 Phase 1: Check Your Eligibility
                  </h3>
                  <div className="space-y-3">
                    {[
                      { criteria: 'Age', requirement: '✓ 16+ to start training; 18+ for a CPL', status: 'Your Age: _____' },
                      { criteria: 'Education', requirement: '✓ 10+2 (12th pass) with Physics & Math', status: 'Completed: ✓/✗' },
                      { criteria: 'English Proficiency', requirement: '✓ Fluent in spoken & written English', status: 'Status: _____' },
                      { criteria: 'Medical Fitness', requirement: '✓ No disqualifying medical conditions', status: 'Pre-check: _____' },
                      { criteria: 'Nationality', requirement: '✓ Indian citizen or valid visa holder', status: 'Verified: ✓/✗' },
                    ].map((item, i) => (
                      <div key={i} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <p className="font-bold text-gray-900">{item.criteria}</p>
                        <p className="text-gray-600 text-sm mb-1">{item.requirement}</p>
                        <p className="text-xs text-av-orange">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Phase 2: Documents Required */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    📄 Phase 2: Gather Original Documents
                  </h3>
                  <div className="space-y-2">
                    {[
                      '□ Birth Certificate (scanned + original)',
                      '□ 10th Marksheet & Certificate',
                      '□ 12th Marksheet & Certificate',
                      '□ Aadhar Card (color copy + original)',
                      '□ Passport (if available - scanned)',
                      '□ PAN Card (if applicable)',
                      '□ Voter ID or Driver\'s License',
                      '□ Bank Passbook (first 2 pages)',
                      '□ Domicile Certificate (state government)',
                      '□ Character Certificate (school/college principal)',
                      '□ Passport-size photos (10 copies, white background)',
                      '□ Address Proof (utility bill or rent agreement)',
                    ].map((doc, i) => (
                      <div key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-gray-400 mt-1">▢</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Phase 3: Medical Tests */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    🏥 Phase 3: Medical Clearance (Critical!)
                  </h3>
                  {/*
                    WAS a two-column panel contrasting the Class 2 and Class 1
                    medicals. With the class split removed both headings read
                    identically, so the comparison carried nothing and looked
                    broken. Merged into one panel: the test list and the cost
                    band are the parts a student can act on, and neither
                    depends on naming a class.
                  */}
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-4">
                    <p className="font-bold text-yellow-900 mb-2">What the DGCA medical examination covers</p>
                    <ul className="text-xs text-yellow-800 space-y-1">
                      <li>✓ Eye test (visual acuity)</li>
                      <li>✓ Hearing test</li>
                      <li>✓ Colour blindness test</li>
                      <li>✓ Blood pressure check</li>
                      <li>✓ Blood and urine tests</li>
                      <li>✓ ECG (heart check)</li>
                      <li>✓ Chest X-ray</li>
                      <li>✓ Laboratory work</li>
                      <li>✓ Psychological evaluation</li>
                      <li><strong>Cost: roughly ₹5,000&ndash;15,000, depending on the centre</strong></li>
                      <li><strong>Validity and scope: confirm with your DGCA-approved examiner</strong></li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    📌 <strong>Note:</strong> Disqualifying conditions include color blindness, poor eyesight, hearing problems, heart conditions, high blood pressure. Get checked first!
                  </p>
                </div>
              </ScrollReveal>

              {/* Phase 4: DGCA Registration */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    🔐 Phase 4: DGCA Computer Number Registration
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-900 mb-2">Required for registering for DGCA exams</p>
                      <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                        <li>Visit <a href="https://dgcaonline.nic.in" target="_blank" rel="noopener" className="text-blue-600 underline">dgcaonline.nic.in</a></li>
                        <li>Create account with email & mobile</li>
                        <li>Upload DGCA Medical certificate</li>
                        <li>Upload educational documents (10+2)</li>
                        <li>Fill personal & training details</li>
                        <li>Pay registration fee (₹2,000-3,000)</li>
                        <li>Receive unique DGCA Computer Number</li>
                        <li>Use this number for all exams</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Phase 5: Financial Readiness */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    💰 Phase 5: Financial Readiness
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-gray-900 mb-2">Budget Checklist:</p>
                      {[
                        '□ Total training cost finalized (₹40-55 Lakhs)',
                        '□ First payment arranged (usually ₹10-15 Lakhs)',
                        '□ Bank loan approval (if applicable)',
                        '□ Sponsors identified (parents, relatives)',
                        '□ Payment plan agreed with academy',
                        '□ Financial documents organized',
                      ].map((item, i) => (
                        <div key={i} className="text-gray-700 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Phase 6: Pre-Admission Meeting */}
              <ScrollReveal>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4">
                    🤝 Phase 6: Admission Meeting Checklist
                  </h3>
                  <div className="space-y-2">
                    {[
                      '□ Schedule admission meeting 1 week before start date',
                      '□ Bring all original documents + photocopies',
                      '□ Bring your DGCA medical certificates',
                      '□ Sign admission agreement & terms',
                      '□ Collect academy ID card',
                      '□ Get hostel/accommodation details',
                      '□ Know first day schedule & timing',
                      '□ Get instructor contact information',
                      '□ Understand payment schedule',
                      '□ Ask about curriculum & training plan',
                      '□ Confirm start date in writing',
                    ].map((item, i) => (
                      <div key={i} className="text-gray-700 text-sm">{item}</div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Final Checklist */}
              <ScrollReveal>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-400 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-green-900 mb-4">
                    ✅ Final Pre-Admission Checklist (24 Hours Before)
                  </h3>
                  <div className="space-y-2">
                    {[
                      '□ All documents photocopied (5 sets)',
                      '□ Admit card from academy printed',
                      '□ Hostel address & contact confirmed',
                      '□ Travel plans finalized',
                      '□ First payment transferred',
                      '□ Phone numbers saved (principal, coordinator)',
                      '□ Medical reports downloaded & printed',
                      '□ Packed: Originals, copies, ID, medical docs',
                      '□ Confirmed reporting time with academy',
                      '□ Emergency contact informed about start date',
                    ].map((item, i) => (
                      <div key={i} className="text-green-900 font-medium text-sm">{item}</div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Right: Download Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PdfLeadMagnet
                  title="Get Pre-Admission Checklist"
                  description="Download the complete checklist with all documents, medical requirements, and admission steps."
                  pdfFileName="Pre-Admission-Checklist.pdf"
                  icon="✅"
                  dark={false}
                />

                {/* CTA */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl text-center border border-green-200">
                  <p className="text-sm text-gray-700 mb-3">
                    Have more questions about admission?
                  </p>
                  <Link href="/contact" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold">
                    Book Free Counselling
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
