import Layout from '../../components/Layout';
import PdfLeadMagnet from '../../components/PdfLeadMagnet';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function DgcaExamChecklist() {
  const sections = [
    {
      title: '📋 Pre-Exam Documentation',
      items: [
        '□ DGCA Computer Number printout',
        '□ Valid government ID (Aadhaar/Passport)',
        '□ Hall ticket/Admit card',
        '□ Medical certificate (Class 1 or Class 2)',
        '□ Proof of address (utility bill)',
      ]
    },
    {
      title: '🧠 Study Preparation',
      items: [
        '□ Completed all 9 DGCA subjects',
        '□ Solved previous year papers (at least 3 sets)',
        '□ Marked weak topics for last-minute revision',
        '□ Created flashcards for key formulas',
        '□ Practiced mock tests (minimum 5)',
      ]
    },
    {
      title: '✈️ Subject Checklist',
      items: [
        '□ Air Navigation - Distance, bearing, wind calculations',
        '□ Aviation Meteorology - METAR, TAF, pressure patterns',
        '□ Air Regulations - Airspace, DGCA rules, safety protocols',
        '□ Technical General - Aircraft systems, engines, instruments',
        '□ Technical Specific - Aircraft-specific systems (Cessna 172)',
        '□ Flight Planning - Route planning, fuel calculations',
        '□ RTR - Radio Telephony Operator basics',
      ]
    },
    {
      title: '🎯 Exam Day Checklist (24 Hours Before)',
      items: [
        '□ Confirm exam center location & route',
        '□ Plan travel (leave 60 mins early)',
        '□ Prepare all original documents in a folder',
        '□ Set alarm for exam morning',
        '□ Eat light, balanced dinner (avoid heavy food)',
        '□ Sleep early (minimum 7-8 hours)',
        '□ Avoid last-minute cramming',
      ]
    },
    {
      title: '⏰ Exam Day Timeline',
      items: [
        '□ 06:00 AM - Wake up, light breakfast',
        '□ 06:30 AM - Get ready, check documents',
        '□ 07:00 AM - Leave for exam center',
        '□ 08:00 AM - Arrive at center, verification',
        '□ 08:30 AM - Exam starts',
        '□ 11:30 AM - Exam ends',
        '□ 12:00 PM - Celebrate! Rest & review',
      ]
    },
    {
      title: '🚫 Common Mistakes to Avoid',
      items: [
        '□ Arriving late (always come 30 mins early)',
        '□ Forgetting original ID/medical certificate',
        '□ Not reading questions carefully',
        '□ Spending too much time on one question',
        '□ Leaving questions unanswered (always attempt all)',
        '□ Panicking during exam (breathe & focus)',
      ]
    },
    {
      title: '📞 During Exam - Quick Tips',
      items: [
        '□ Read each question twice before answering',
        '□ Answer easy questions first',
        '□ Time management: 3 mins per question average',
        '□ Mark uncertain answers & come back later',
        "□ If stuck, make educated guess (don't leave blank)",
        '□ Use last 5 minutes for review',
      ]
    },
  ];

  return (
    <>
      <Head>
        <title>DGCA Exam Checklist PDF - Free Download | We One Aviation</title>
        <meta name="description" content="Download your free DGCA exam checklist. Complete preparation guide covering documentation, study prep, exam day timeline, and common mistakes to avoid." />
      </Head>

      <Layout title="DGCA Exam Checklist - Free PDF Download" description="Free DGCA exam checklist for pilots. Complete pre-exam preparation checklist, exam day timeline, and success tips.">
        
        {/* Hero */}
        <div className="relative h-80 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="relative z-10 text-center px-4">
            <div className="section-tag mb-3">Free Download</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4">
              DGCA Exam Checklist
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Complete preparation checklist to ace your DGCA written exams
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
                  Preparing for DGCA exams can be overwhelming. This free checklist breaks down everything you need to do before, during, and after your exam. Download it now and start your preparation with confidence!
                </p>

                <div className="bg-av-light rounded-2xl p-6 mb-8 border-l-4 border-av-orange">
                  <p className="font-bold text-av-blue mb-2">📌 What's Included:</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>✓ Pre-exam documentation checklist</li>
                    <li>✓ Complete study preparation guide</li>
                    <li>✓ All 7 DGCA subjects checklist</li>
                    <li>✓ Exam day timeline & schedule</li>
                    <li>✓ Common mistakes to avoid</li>
                    <li>✓ Quick exam day tips & tricks</li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* Detailed Checklist */}
              {sections.map((section, idx) => (
                <ScrollReveal key={idx}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
                    <h3 className="font-montserrat font-bold text-av-blue mb-4 text-lg">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                          <span className="text-av-orange font-bold mt-1">◆</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}

              {/* FAQ Section */}
              <ScrollReveal>
                <div className="bg-gradient-to-br from-av-light to-white rounded-xl border border-gray-200 p-8">
                  <h3 className="font-montserrat font-bold text-av-blue mb-6 text-xl">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {[
                      { q: 'When should I start exam preparation?', a: 'At least 3-4 months before your exam. Consistent preparation beats last-minute cramming.' },
                      { q: 'What if I fail one paper?', a: "You can retake individual papers. Most students pass on their 2nd-3rd attempt. Don't lose hope!" },
                      { q: 'How many hours of study per day?', a: 'Ideally 4-5 hours of focused study daily. Quality beats quantity.' },
                      { q: "What's the passing percentage?", a: 'DGCA requires 50% marks to pass each paper. Some academies target 60%+ for safety.' },
                    ].map((faq, i) => (
                      <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <p className="font-bold text-gray-900 mb-1">{faq.q}</p>
                        <p className="text-gray-600 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Download Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <PdfLeadMagnet
                  title="Get Your Free Checklist"
                  description="Enter your email to download the complete DGCA Exam Checklist PDF (printable)."
                  pdfFileName="DGCA-Exam-Checklist.pdf"
                  icon="✓"
                  dark={false}
                />

                {/* Additional CTA */}
                <div className="mt-6 p-4 bg-av-blue/10 rounded-xl text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    Want personalized exam prep guidance?
                  </p>
                  <Link href="/dgca-ground-classes" className="inline-block bg-av-blue text-white px-4 py-2 rounded-lg hover:bg-av-navy transition text-sm font-semibold">
                    Join Our Ground Classes
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