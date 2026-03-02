import Layout from '../../components/Layout';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

export default function InIndia() {
  return (
    <Layout title="How to Become a Pilot in India 2024 | Complete DGCA Guide | WeOne Aviation" description="Complete guide on becoming a commercial pilot in India. DGCA requirements, CPL eligibility, flying schools, fees, career prospects and salary in 2024.">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex items-center justify-center pt-16"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">India Guide</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">
            How to Become a Pilot <span className="text-av-orange">in India</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm">DGCA requirements, flying schools, costs & career guide 2024</p>
        </div>
      </div>

      <section className="py-20 px-4">
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
                  ['Medical', 'DGCA Class 1 medical certificate (valid throughout)'],
                  ['Flying Hours', 'Minimum 200 total flying hours (including 100 solo)'],
                  ['Instrument Rating', 'Must hold Instrument Rating (IR) before CPL'],
                  ['DGCA Written Exams', 'Must clear all 9 CPL subjects (Air Nav, Met, Regs, Tech Gen, Tech Specific, RTR, Medicine, Human Factors, Radio Telephony)'],
                  ['Skill Test', 'CPL skill test by DGCA examiner on approved aircraft'],
                ].map(([req, desc]) => (
                  <div key={req} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-av-orange font-semibold text-sm w-40 flex-shrink-0">{req}</div>
                    <div className="text-gray-600 text-sm">{desc}</div>
                  </div>
                ))}
              </div>
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
                <h4 className="font-montserrat font-bold mb-3">Pilot Salary in India 2024</h4>
                {[['Trainee Pilot', '₹25-40K/month'], ['First Officer', '₹1.8-3 LPM'], ['Senior FO', '₹3-5 LPM'], ['Captain', '₹5-8 LPM'], ['Senior Captain', '₹8-15 LPM']].map(([role, sal]) => (
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
    </Layout>
  );
}
