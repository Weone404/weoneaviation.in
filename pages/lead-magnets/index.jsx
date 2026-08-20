import Layout from '../../components/Layout';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

export default function LeadMagnetsHub() {
  const magnets = [
    {
      icon: '✅',
      title: 'DGCA Exam Checklist',
      description: 'Complete pre-exam & exam day checklist with timeline and common mistakes',
      topics: ['Pre-exam docs', 'Study prep', 'Subject checklist', 'Exam day schedule'],
      link: '/lead-magnets/dgca-exam-checklist',
      color: 'from-blue-500 to-cyan-500',
      label: 'Exam Prep'
    },
    {
      icon: '💰',
      title: 'CPL Cost Breakdown',
      description: 'Detailed cost comparison: India vs USA vs Australia vs Canada. All-in fees & hidden costs.',
      topics: ['Cost breakdown', 'Hidden fees', 'Payment plans', 'International comparison'],
      link: '/lead-magnets/cpl-cost-breakdown',
      color: 'from-orange-500 to-red-500',
      label: 'Budget Planning'
    },
    {
      icon: '✅',
      title: 'Pre-Admission Checklist',
      description: 'Everything needed before joining: documents, medical tests, DGCA registration, and more',
      topics: ['Documents', 'Medical tests', 'Eligibility', 'DGCA registration'],
      link: '/lead-magnets/pre-admission-checklist',
      color: 'from-green-500 to-emerald-500',
      label: 'Admission Ready'
    },
    {
      icon: '📚',
      title: 'Ultimate Pilot Guide (Coming Soon)',
      description: 'Complete step-by-step guide from "thinking about pilot training" to "getting hired by airline"',
      topics: ['Career paths', 'Timeline', 'Requirements', 'Placement'],
      link: '#',
      color: 'from-purple-500 to-pink-500',
      label: 'Career Path',
      comingSoon: true
    },
    {
      icon: '✈️',
      title: 'Airline Interview Prep (Coming Soon)',
      description: 'Interview questions, selection process, and tips used by IndiGo, Air India, SpiceJet',
      topics: ['Interview Q&A', 'Selection steps', 'Type rating prep', 'Success stories'],
      link: '#',
      color: 'from-indigo-500 to-blue-500',
      label: 'Interview Ready',
      comingSoon: true
    },
    {
      icon: '🧑‍⚕️',
      title: 'Medical Requirements Guide (Coming Soon)',
      description: 'DGCA medical standards, disqualifying conditions, and how to prepare for medical exam',
      topics: ['Class 1 medical', 'Class 2 medical', 'Disqualifiers', 'Exam prep'],
      link: '#',
      color: 'from-red-500 to-rose-500',
      label: 'Medical Info',
      comingSoon: true
    },
  ];

  return (
    <>
      <Head>
        <title>Free Pilot Training Guides & Checklists - Download PDFs | We One Aviation</title>
        <meta name="description" content="Free downloadable guides for pilot training: DGCA exam checklist, cost breakdown, pre-admission checklist, interview prep. Expert tips and practical checklists." />
      </Head>

      <Layout title="Free Pilot Training Guides & Checklists" description="Downloadable PDF guides for pilot training including exam checklists, cost breakdown, medical requirements and interview preparation.">
        
        {/* Hero */}
        <div className="relative h-96 overflow-hidden flex items-center justify-center pt-16 bg-gradient-to-br from-av-blue via-av-navy to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 bg-av-orange rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-av-blue rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white mb-4">
              Free Pilot Training Guides
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Download expert-created checklists and guides to prepare for your aviation journey. All free, no credit card required.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white text-sm">
                ✓ 100% Free
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white text-sm">
                ✓ Instant Download
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white text-sm">
                ✓ No Spam
              </div>
            </div>
          </div>
        </div>

        {/* Guide Cards */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {magnets.map((magnet, idx) => (
                <ScrollReveal key={idx}>
                  <Link href={magnet.link}>
                    <div className={`h-full rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer bg-white group ${magnet.comingSoon ? 'opacity-75' : ''}`}>
                      
                      {/* Header */}
                      <div className={`bg-gradient-to-r ${magnet.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                          {magnet.label}
                        </div>
                        <div className="text-5xl mb-2">{magnet.icon}</div>
                        <h3 className="font-montserrat font-bold text-xl group-hover:translate-x-2 transition-transform">
                          {magnet.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {magnet.description}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {magnet.topics.map((topic, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        {!magnet.comingSoon ? (
                          <div className="flex items-center gap-2 text-av-orange font-bold text-sm group-hover:gap-3 transition-all">
                            <span>Get Free PDF</span>
                            <span>→</span>
                          </div>
                        ) : (
                          <div className="text-gray-400 font-bold text-sm">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats & Trust Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stat: '5000+', label: 'Downloads', desc: 'Students using our guides' },
                                { stat: '4.9/5', label: 'Rating', desc: 'Average feedback score' },
              ].map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="text-center">
                    <div className="font-montserrat font-black text-4xl text-av-orange mb-2">
                      {item.stat}
                    </div>
                    <p className="font-bold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-av-light">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl text-av-blue text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Choose Guide', desc: 'Pick a guide that interests you' },
                { step: '2', title: 'Enter Email', desc: 'Quick 2-field form (name + email)' },
                { step: '3', title: 'Instant Download', desc: 'PDF downloads immediately' },
                { step: '4', title: 'Start Preparing', desc: 'Use checklist to prepare' },
              ].map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="relative">
                    <div className="bg-white rounded-xl p-6 border-2 border-av-orange text-center">
                      <div className="w-12 h-12 bg-av-orange text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                        {item.step}
                      </div>
                      <p className="font-bold text-gray-900 mb-2">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-av-orange text-2xl transform -translate-y-1/2">
                        →
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl text-av-blue text-center mb-8">
              FAQ
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Are these guides really free?', a: 'Yes! All guides are completely free. We just ask for your email so we can stay in touch with updates.' },
                { q: 'Do you sell my email to others?', a: 'Absolutely not. Your email is safe with us. We only send relevant pilot training updates (1-2 per week max).' },
                { q: 'Can I print the PDFs?', a: 'Yes! All PDFs are print-friendly. Print them out and use them as a physical checklist.' },
                { q: 'Do I need to pay later?', a: 'No strings attached. The guides are free gifts. Any paid courses are optional and separate.' },
                { q: 'How long are these guides?', a: 'Each guide is 4-6 pages. They\'re comprehensive but concise — designed to be used, not just read.' },
                { q: 'Can I share these with friends?', a: 'Each friend should download their own copy (takes 30 seconds). We\'ll send them to your friends\' emails too.' },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
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
              Start Your Pilot Journey Today
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Download a free guide and take the first step. Your aviation dreams start here.
            </p>
            <Link href="/lead-magnets/dgca-exam-checklist" className="inline-block bg-av-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:scale-105">
              ⬇️ Get Free Guides Now
            </Link>
          </div>
        </section>

      </Layout>
    </>
  );
}
