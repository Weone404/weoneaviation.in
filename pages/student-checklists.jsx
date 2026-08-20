import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

export default function StudentChecklistsHub() {
  const [expandedChecklist, setExpandedChecklist] = useState('pre-admission');

  const checklists = {
    'pre-admission': {
      title: 'Pre-Admission Checklist',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      description: 'Everything you need before joining pilot training',
      sections: [
        {
          name: 'Eligibility Verification',
          items: [
            '✓ Age: 18 years for a CPL; 16 for a Student Pilot Licence',
            '✓ Education: 10+2 (12th pass) with Physics & Math',
            '✓ English proficiency: Fluent in spoken & written',
            '✓ Medical fitness: No disqualifying conditions',
            '✓ Nationality: Indian citizen or visa holder',
          ]
        },
        {
          name: 'Documents Required',
          items: [
            '□ Birth Certificate (scanned + original)',
            '□ 10th & 12th Marksheet & Certificate',
            '□ Aadhar Card (color copy + original)',
            '□ Passport (if available)',
            '□ PAN Card (if applicable)',
            '□ Voter ID or Driver\'s License',
            '□ Bank Passbook (first 2 pages)',
            '□ Domicile Certificate',
            '□ Character Certificate',
            '□ Passport-size photos (10 copies)',
            '□ Address Proof (utility bill/rent)',
          ]
        },
        {
          name: 'Medical Clearance',
          items: [
            '□ DGCA Class 2 Medical Exam',
            '□ DGCA Class 1 Medical Exam',
            '□ Medical reports downloaded',
            '□ No disqualifying conditions',
            '□ Eye vision satisfactory',
            '□ Hearing test passed',
            '□ Color blindness test cleared',
          ]
        },
        {
          name: 'DGCA Registration',
          items: [
            '□ Visit dgcaonline.nic.in',
            '□ Create account with email & mobile',
            '□ Upload medical certificate',
            '□ Upload educational documents',
            '□ Fill personal & training details',
            '□ Pay registration fee (₹2,000-3,000)',
            '□ Receive DGCA Computer Number',
          ]
        },
        {
          name: 'Financial Preparation',
          items: [
            '□ Total training cost finalized',
            '□ First payment arranged',
            '□ Bank loan approval (if needed)',
            '□ Sponsors identified',
            '□ Payment plan agreed',
            '□ Financial documents ready',
          ]
        },
        {
          name: '24 Hours Before Admission',
          items: [
            '□ All documents photocopied (5 sets)',
            '□ Admit card printed',
            '□ Hostel address confirmed',
            '□ Travel plans finalized',
            '□ First payment transferred',
            '□ Emergency contacts informed',
            '□ Medical reports printed',
            '□ Confirmation call to academy',
          ]
        },
      ]
    },
    'during-training': {
      title: 'Student Success Checklist',
      icon: '🎓',
      color: 'from-purple-500 to-pink-500',
      description: 'Stay on track during your pilot training',
      sections: [
        {
          name: 'Monthly Milestones',
          items: [
            '□ Month 1: Ground school classes 80%+ attendance',
            '□ Month 2: Complete first mock tests',
            '□ Month 3: Air Navigation subject mastered',
            '□ Month 4: All ground subjects syllabus complete',
            '□ Month 5: First 20 flying hours completed',
            '□ Month 6: DGCA exams cleared',
            '□ Month 12: Flying training progressing well',
            '□ Month 18: Preparing for CPL skill test',
          ]
        },
        {
          name: 'Academic Performance',
          items: [
            '□ Attend 100% ground classes',
            '□ Complete all assignments on time',
            '□ Score 60%+ on mock tests',
            '□ Clear all 9 DGCA papers',
            '□ Maintain study schedule',
            '□ Ask instructors about weak topics',
            '□ Form study groups with peers',
            '□ Review previous year papers',
          ]
        },
        {
          name: 'Flying Training Progress',
          items: [
            '□ Complete 10 hours dual training',
            '□ Get solo authorization clearance',
            '□ Complete 50+ solo flying hours',
            '□ Finish night flying requirements',
            '□ Complete cross-country flights',
            '□ Achieve instrument rating',
            '□ Prepare for CPL skill test',
            '□ Get check ride recommendation',
          ]
        },
        {
          name: 'Health & Fitness',
          items: [
            '□ Maintain Class 1 medical fitness',
            '□ Do physical exercise regularly',
            '□ Sleep 7-8 hours daily',
            '□ No substance abuse',
            '□ Annual medical fitness check',
            '□ Mental health support if needed',
            '□ Eye care & vision maintenance',
          ]
        },
        {
          name: 'Financial Management',
          items: [
            '□ Pay fees on schedule',
            '□ Track all expenses',
            '□ Save receipts for reimbursement',
            '□ Discuss overages with academy',
            '□ Plan for additional costs',
            '□ Explore scholarship opportunities',
            '□ Manage budget wisely',
          ]
        },
        {
          name: 'Networking & Placement Prep',
          items: [
            '□ Connect with alumni pilots',
            '□ Attend airline career talks',
            '□ Build LinkedIn profile',
            '□ Join aviation forums',
            '□ Start interview prep (Month 12+)',
            '□ Research airline requirements',
            '□ Prepare portfolio/resume',
            '□ Network with airline recruiters',
          ]
        },
      ]
    },
    'post-training': {
      title: 'Post-Training Checklist',
      icon: '✈️',
      color: 'from-green-500 to-emerald-500',
      description: 'Launch your pilot career after training completion',
      sections: [
        {
          name: 'Certification & Licensing',
          items: [
            '□ Receive CPL from DGCA',
            '□ Download certificate from ECGA',
            '□ Obtain Type Rating (A320/B737)',
            '□ Get MCC (Multi-Crew Cooperation) certification',
            '□ Secure FRTOL (Flight Radio License)',
            '□ Verify all documents are valid',
            '□ Create digital backup of certificates',
            '□ Print & frame original CPL',
          ]
        },
        {
          name: 'Job Search Preparation',
          items: [
            '□ Update LinkedIn profile professionally',
            '□ Create CV highlighting flying hours',
            '□ List all certifications & ratings',
            '□ Prepare for airline interviews',
            '□ Study airline-specific procedures',
            '□ Practice group discussion skills',
            '□ Prepare personal success story',
            '□ Get recommendation letters',
          ]
        },
        {
          name: 'Airline Selection & Application',
          items: [
            '□ Research target airlines',
            '□ Check pilot recruitment timelines',
            '□ Prepare selection test practice',
            '□ Apply for cadet programs if eligible',
            '□ Apply for direct CPL entry positions',
            '□ Network with airline recruiters',
            '□ Attend career fairs',
            '□ Follow up on applications',
          ]
        },
        {
          name: 'First Airline Job',
          items: [
            '□ Receive job offer letter',
            '□ Complete background verification',
            '□ Submit clearance documents',
            '□ Report on joining date',
            '□ Complete orientation training',
            '□ Attend airline-specific ground school',
            '□ Complete simulator sessions',
            '□ Get line training (first flight)',
            '□ Achieve line pilot status',
          ]
        },
        {
          name: 'Career Development',
          items: [
            '□ Build flying hours (1,500+)',
            '□ Get promoted to Senior First Officer',
            '□ Study for Captain rating',
            '□ Complete ATPL groundschool',
            '□ Get ATPL license',
            '□ Progress to Captain seat',
            '□ Pursue continuous skill development',
            '□ Consider instructorship/check pilot role',
          ]
        },
        {
          name: 'Financial Planning',
          items: [
            '□ Calculate total training ROI',
            '□ Plan loan repayment schedule',
            '□ Build emergency savings fund',
            '□ Invest in professional development',
            '□ Get pilot-specific insurance',
            '□ Plan for career stability',
            '□ Build retirement savings',
          ]
        },
        {
          name: 'Ongoing Professional Growth',
          items: [
            '□ Complete recurrent training (annually)',
            '□ Maintain medical fitness yearly',
            '□ Attend aviation seminars',
            '□ Stay updated with DGCA regulations',
            '□ Build mentoring relationships',
            '□ Consider specialized training (TPIC, etc.)',
            '□ Network with aviation community',
            '□ Pursue international opportunities',
          ]
        },
      ]
    },
  };

  const currentChecklist = checklists[expandedChecklist];

  return (
    <>
      <Head>
        <title>Student Checklists - Pilot Training Progress Tracker | We One Aviation</title>
        <meta name="description" content="Complete checklists for pilot training journey: pre-admission, during training, and post-training success guides. Track your progress at every stage." />
      </Head>

      <Layout title="Student Checklists - Your Progress Guide" description="Comprehensive checklists for every stage of pilot training: pre-admission, during training, and launching your aviation career.">
        
        {/* Hero */}
        <div className="relative h-96 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-blue via-av-navy to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 bg-av-orange rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-av-blue rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white mb-4">
              Your Pilot Training Checklist
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Stay on track with checklists for every stage: before admission, during training, and launching your career
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
                ✓ Pre-Admission
              </div>
              <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
                ✓ During Training
              </div>
              <div className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-white text-xs">
                ✓ Post-Training
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Selector */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(checklists).map(([key, checklist]) => (
                <button
                  key={key}
                  onClick={() => setExpandedChecklist(key)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    expandedChecklist === key
                      ? 'border-av-orange bg-gradient-to-br ' + checklist.color + ' text-white shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{checklist.icon}</div>
                  <p className={`font-montserrat font-bold text-lg mb-1 ${expandedChecklist === key ? 'text-white' : 'text-av-blue'}`}>
                    {checklist.title}
                  </p>
                  <p className={`text-sm ${expandedChecklist === key ? 'text-white/80' : 'text-gray-600'}`}>
                    {checklist.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Checklist */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4 flex items-center gap-3">
                  <span className="text-4xl">{currentChecklist.icon}</span>
                  {currentChecklist.title}
                </h2>
                <p className="text-gray-600 text-lg">
                  {currentChecklist.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Checklist Items */}
            <div className="space-y-6">
              {currentChecklist.sections.map((section, idx) => (
                <ScrollReveal key={idx}>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
                    <h3 className="font-montserrat font-bold text-lg text-av-blue mb-4 pb-3 border-b-2 border-av-orange">
                      {section.name}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="text-av-orange font-bold text-lg leading-tight">▢</span>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Download & Print Note */}
            <ScrollReveal>
              <div className="mt-12 bg-blue-50 rounded-xl border-l-4 border-blue-500 p-6">
                <p className="text-blue-900 mb-3 font-bold">
                  💡 Pro Tip: Print this checklist and track your progress!
                </p>
                <p className="text-blue-800 text-sm">
                  Keep a physical copy of this checklist and mark items as you complete them. This helps you stay motivated and ensures you don't miss any critical steps in your pilot training journey.
                </p>
              </div>
            </ScrollReveal>

            {/* Related Resources */}
            <ScrollReveal>
              <div className="mt-12 bg-gradient-to-br from-av-light to-white rounded-xl border border-gray-200 p-8">
                <h3 className="font-montserrat font-bold text-xl text-av-blue mb-6">
                  📚 Related Resources
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/lead-magnets/dgca-exam-checklist" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                    <p className="font-bold text-av-blue mb-1">DGCA Exam Checklist</p>
                    <p className="text-xs text-gray-600 mb-2">Detailed pre-exam preparation guide</p>
                    <span className="text-av-orange text-sm font-bold">Download PDF →</span>
                  </Link>

                  <Link href="/lead-magnets/cpl-cost-breakdown" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                    <p className="font-bold text-av-blue mb-1">Cost Breakdown Guide</p>
                    <p className="text-xs text-gray-600 mb-2">Complete fee comparison & payment plans</p>
                    <span className="text-av-orange text-sm font-bold">Download PDF →</span>
                  </Link>

                  <Link href="/lead-magnets/" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                    <p className="font-bold text-av-blue mb-1">All Free Guides</p>
                    <p className="text-xs text-gray-600 mb-2">Download all pilot training resources</p>
                    <span className="text-av-orange text-sm font-bold">View Guides →</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat text-3xl font-bold text-av-blue text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Can I skip any items on the pre-admission checklist?', a: 'No, all items are required by DGCA. Skipping any could delay your admission or cause legal issues. Complete everything before joining.' },
                { q: 'What if I don\'t pass DGCA exams on first attempt?', a: 'You can retake individual papers. Most students pass on 2nd-3rd attempt. Use this checklist to track weak areas and improve.' },
                { q: 'How often should I check my progress?', a: 'Review the checklist monthly during training. Share progress updates with your instructors to stay accountable.' },
                { q: 'What\'s the most important thing during training?', a: 'Consistency. Regular practice, 100% attendance, and staying focused on milestones ensures success. Use this checklist to maintain discipline.' },
                { q: 'How long does the entire process take?', a: 'Typically 18-24 months from admission to CPL certification. Timeline varies based on your learning pace and aviation conditions.' },
                { q: 'Can I work while training?', a: 'Not recommended. Pilot training is intensive and requires full focus. Most students complete training faster with 100% dedication.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-av-orange transition-all">
                  <p className="font-bold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-av-blue to-av-navy">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl text-white mb-4">
              Ready to Start Your Pilot Journey?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Use these checklists to stay organized and track your progress at every stage of training.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="inline-block bg-av-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-105">
                📞 Get Free Counselling
              </Link>
              <Link href="/lead-magnets/" className="inline-block bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white">
                📥 Download Free Guides
              </Link>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
}
