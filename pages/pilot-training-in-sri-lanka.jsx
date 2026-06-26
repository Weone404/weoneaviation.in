/**
 * Pilot Training in Sri Lanka
 * Destination-specific page for international pilot training opportunities
 * Benefits: Internal linking, location-specific SEO, user experience
 */

import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=75&fm=webp',
    tag: 'International Opportunity',
    title: 'Pilot Training',
    alt: 'Professional pilot training center for Sri Lankan students - International CPL courses',
    highlight: 'in Sri Lanka',
    sub: 'International Flying School partnerships for CPL, PPL & ATPL training',
  },
];

const programs = [
  {
    title: 'CPL Training Program',
    description: 'Complete Commercial Pilot License training with international exposure',
    duration: '18-24 months',
    details: ['DGCA theory from India', 'Flight training in Sri Lanka or abroad', '200+ flight hours', 'Airline placement support'],
  },
  {
    title: 'PPL Program',
    description: 'Private Pilot License - Your first step to becoming a professional pilot',
    duration: '6-12 months',
    details: ['International standard training', 'Flexible batch schedules', 'Ground school + flight training', 'Career guidance included'],
  },
  {
    title: 'DGCA Ground Classes',
    description: 'Comprehensive preparation for DGCA exams from expert instructors',
    duration: '4-6 months',
    details: ['Online + offline modes', 'Mock tests & doubt sessions', 'Expert faculty', '95% pass rate'],
  },
];

const advantages = [
  { icon: '🌍', title: 'International Exposure', desc: 'Train with global standards and make international connections' },
  { icon: '💰', title: 'Cost-Effective', desc: 'Competitive fees with flexible payment options and scholarships' },
  { icon: '🎓', title: 'DGCA Recognized', desc: 'All training recognized by DGCA India for license conversion' },
  { icon: '✈️', title: 'Career Ready', desc: '100% placement assistance with airlines and aviation companies' },
  { icon: '👨‍🏫', title: 'Expert Trainers', desc: 'Learn from experienced commercial pilots and certified instructors' },
  { icon: '📱', title: '24/7 Support', desc: 'Continuous career guidance and mentor support throughout your journey' },
];

export default function PilotTrainingSriLanka() {
  return (
    <>
      <Head>
        <title>Pilot Training in Sri Lanka – CPL, PPL & DGCA Ground Classes | We One Aviation</title>
        <meta name="description" content="DGCA-recognized pilot training for Sri Lankan students. CPL, PPL, and DGCA ground classes with international flying school partnerships. Affordable fees, expert faculty." />
        <link rel="canonical" href="https://www.weoneaviation.in/pilot-training-in-sri-lanka" />
        <meta property="og:title" content="Pilot Training in Sri Lanka – We One Aviation Academy" />
        <meta property="og:description" content="International pilot training programs for Sri Lankan students with DGCA recognition and international flying school partnerships." />
        <meta property="og:url" content="https://www.weoneaviation.in/pilot-training-in-sri-lanka" />
      </Head>

      <Layout
        title="Pilot Training in Sri Lanka – CPL, PPL & DGCA Ground Classes | We One Aviation"
        description="DGCA-recognized pilot training for Sri Lankan students. CPL, PPL, and DGCA ground classes with international flying school partnerships."
      >
        <HeroSlider customSlides={heroSlides} />

        {/* H1 Section */}
        <div className="bg-av-orange py-4 text-center">
          <h1 className="text-white font-bold text-xl px-4">
            Pilot Training in Sri Lanka – DGCA-Approved CPL & PPL Courses
          </h1>
          <p className="text-white/90 font-medium text-sm px-4 mt-1">
            Train with international partners and get DGCA-recognized certifications
          </p>
        </div>

        {/* Introduction */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4">
                Why Choose We One Aviation for Sri Lankan Pilots?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We One Aviation Academy provides DGCA-recognized pilot training specifically tailored for students from Sri Lanka and the South Asian region. With international partnerships, expert faculty, and proven placement success, we help you achieve your aviation dreams.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Programs */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-2">
                Pilot Training <span className="text-av-orange">Programs</span>
              </h2>
              <p className="text-gray-500 text-sm">Choose the program that matches your aviation goals</p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((prog, i) => (
                <ScrollReveal key={prog.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-full">
                    <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">{prog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{prog.description}</p>
                    <div className="bg-av-light px-3 py-2 rounded-lg mb-4">
                      <p className="text-av-blue font-semibold text-xs">Duration: {prog.duration}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {prog.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-av-orange flex-shrink-0">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="block text-center bg-av-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">
                      Enquire Now
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">
                Why We One <span className="text-av-orange">Aviation?</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {advantages.map((adv, i) => (
                <ScrollReveal key={adv.title} delay={i * 80}>
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm card-hover">
                    <div className="text-3xl mb-3">{adv.icon}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{adv.title}</h3>
                    <p className="text-gray-500 text-sm">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-montserrat text-3xl font-bold text-white mb-4">
                Ready to Start Your Aviation Career?
              </h2>
              <p className="text-white/70 mb-8 text-sm">
                Get free career counselling from our aviation experts and learn about admission requirements, fees, and scholarship opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
              >
                Book Free Counselling Session →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 px-4 bg-av-light text-center">
          <p className="text-av-blue font-semibold mb-4">
            Need more information about pilot training in Sri Lanka?
          </p>
          <Link href="/courses" className="inline-block text-av-orange font-semibold hover:underline text-sm">
            Explore All Pilot Training Courses →
          </Link>
        </section>
      </Layout>
    </>
  );
}
