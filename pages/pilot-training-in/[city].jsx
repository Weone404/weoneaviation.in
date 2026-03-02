import Layout from '../../components/Layout';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

const cities = {
  delhi: { name: 'Delhi', state: 'Delhi NCR', airfields: ['Safdarjung Airport', 'Indira Gandhi International Airport vicinity', 'Palam Air Force Station area'], img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' },
  mumbai: { name: 'Mumbai', state: 'Maharashtra', airfields: ['Juhu Aerodrome', 'Chhatrapati Shivaji Maharaj International', 'Pune Airfield (nearby)'], img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80' },
  bangalore: { name: 'Bangalore', state: 'Karnataka', airfields: ['HAL Airport', 'Jakkur Aerodrome', 'Kempegowda International Airport'], img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80' },
  hyderabad: { name: 'Hyderabad', state: 'Telangana', airfields: ['Begumpet Airport', 'Rajiv Gandhi International Airport', 'Hakimpet Air Force Station'], img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80' },
  chennai: { name: 'Chennai', state: 'Tamil Nadu', airfields: ['Chennai International Airport', 'Tambaram Air Force Station', 'Nearby Madurai Airfield'], img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80' },
  pune: { name: 'Pune', state: 'Maharashtra', airfields: ['Pune Airport (Lohegaon)', 'Baramati Aerodrome', 'Kolhapur Airport (nearby)'], img: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=800&q=80' },
  kolkata: { name: 'Kolkata', state: 'West Bengal', airfields: ['Netaji Subhas Chandra Bose International', 'Dum Dum Aerodrome', 'Behala Flying Club'], img: 'https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?w=800&q=80' },
  jaipur: { name: 'Jaipur', state: 'Rajasthan', airfields: ['Jaipur International Airport', 'Sanganer Airport', 'Nearby Kota Airfield'], img: 'https://images.unsplash.com/photo-1477587458883-47145ed94a0f?w=800&q=80' },
  nagpur: { name: 'Nagpur', state: 'Maharashtra', airfields: ['Dr. Babasaheb Ambedkar International Airport', 'Sonegaon Air Force Station', 'MRO Hub – ideal training location'], img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80' },
  kerala: { name: 'Kerala', state: 'Kerala', airfields: ['Cochin International Airport', 'Calicut International Airport', 'Trivandrum International Airport'], img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80' },
  gujarat: { name: 'Gujarat', state: 'Gujarat', airfields: ['Sardar Vallabhbhai Patel International', 'Surat Airport', 'Vadodara Airport', 'Bhavnagar Aerodrome'], img: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80' },
  haryana: { name: 'Haryana', state: 'Haryana', airfields: ['Chandigarh International Airport', 'Hisar Airport', 'Ambala Air Force Station'], img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80' },
  punjab: { name: 'Punjab', state: 'Punjab', airfields: ['Amritsar International Airport', 'Chandigarh International Airport', 'Pathankot Air Force Station'], img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
};

export async function getStaticPaths() {
  return {
    paths: Object.keys(cities).map(city => ({ params: { city } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const cityData = cities[params.city] || null;
  return { props: { cityData, citySlug: params.city } };
}

export default function CityPage({ cityData, citySlug }) {
  if (!cityData) {
    return (
      <Layout title="City Not Found">
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-montserrat text-4xl font-black text-av-blue mb-4">City Not Found</h1>
            <Link href="/" className="text-av-orange hover:underline">← Go Back Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { name, state, airfields, img } = cityData;

  const nearbyFAQs = [
    { q: `How can I become a pilot in ${name}?`, a: `To become a pilot in ${name}, you need to enroll in a DGCA-approved flying school, clear 9 DGCA written exams, complete 200+ flying hours, and pass the CPL skill test. WeOne Aviation Academy provides free career counselling and can guide you through the entire process from ${name}.` },
    { q: `What are the best pilot training schools near ${name}?`, a: `WeOne Aviation Academy is the most trusted DGCA-approved aviation training partner for students from ${name}, ${state}. We offer CPL, PPL, ATPL, SPL, and DGCA ground classes with international training options.` },
    { q: `How much does pilot training cost for students from ${name}?`, a: `Pilot training costs vary by program: PPL costs ₹6-10 Lakh, CPL in India costs ₹40-70 Lakh, and CPL abroad costs ₹50-90 Lakh. We offer EMI options and scholarship guidance for students from ${name}.` },
    { q: `What is the eligibility to become a pilot from ${name}?`, a: `Students from ${name} need to have completed 10+2 with Physics and Mathematics (50% minimum), be at least 17 years old, and clear the DGCA Class 1 medical examination. Contact us for personalized eligibility assessment.` },
  ];

  return (
    <Layout
      title={`Pilot Training in ${name} | Best Aviation Academy | WeOne Aviation`}
      description={`Looking for pilot training in ${name}? WeOne Aviation offers DGCA-approved CPL, PPL, ATPL training for ${name} students. Free career counselling. 500+ pilots trained.`}
    >
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden flex items-center justify-center pt-16"
        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">Pilot Training in {name}</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">
            Pilot Training in <span className="text-av-orange">{name}</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm">DGCA Approved Aviation Training for {name}, {state} Students</p>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <div className="section-tag">Overview</div>
              <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-4 underline-orange">
                Best Pilot Training for {name} Students
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                WeOne Aviation Academy is the most trusted aviation training partner for aspiring pilots from {name}, {state}. We have helped hundreds of students from {name} achieve their dream of becoming professional pilots through our comprehensive DGCA-approved training programs.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Students from {name} can choose to train at our partner flying schools across India or internationally in the USA, Canada, Australia, and Europe. Our expert counsellors based in {name} will guide you through every step of your aviation journey.
              </p>
            </ScrollReveal>

            {/* Courses */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Courses Available for {name} Students</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Commercial Pilot License (CPL)', href: '/courses/cpl', fee: '₹40-70 Lakh', duration: '18-24 months' },
                  { title: 'Private Pilot License (PPL)', href: '/courses/ppl', fee: '₹6-10 Lakh', duration: '6-12 months' },
                  { title: 'ATPL Training', href: '/courses/atpl', fee: '₹15-25 Lakh', duration: '36+ months' },
                  { title: 'DGCA Ground Classes', href: '/courses/dgca-ground-classes', fee: '₹1.5-2.5 Lakh', duration: '6-12 months' },
                ].map(course => (
                  <Link key={course.title} href={course.href}
                    className="card-hover block p-5 rounded-xl border border-gray-200 bg-white hover:border-av-orange hover:bg-orange-50 transition-all">
                    <h4 className="font-montserrat font-bold text-av-blue text-sm mb-2">{course.title}</h4>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>⏱ {course.duration}</span>
                      <span className="text-av-orange font-semibold">{course.fee}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            {/* Nearby Airfields */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Nearby Airports & Airfields</h3>
              <div className="space-y-2">
                {airfields.map((af, i) => (
                  <div key={af} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="text-av-orange">✈</span> {af}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">FAQs – Pilot Training in {name}</h3>
              <div className="space-y-4">
                {nearbyFAQs.map(faq => (
                  <div key={faq.q} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-av-blue p-4 text-white text-sm font-semibold font-montserrat">{faq.q}</div>
                    <div className="p-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Other Cities */}
            <ScrollReveal>
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Pilot Training in Other Cities</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(cities).filter(([slug]) => slug !== citySlug).map(([slug, c]) => (
                  <Link key={slug} href={`/pilot-training-in/${slug}`}
                    className="bg-gray-100 hover:bg-av-orange hover:text-white text-gray-700 text-xs font-medium px-4 py-2 rounded-full transition-all">
                    {c.name}
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}>
              <LeadForm title={`Enquire from ${name}`} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-4">Why WeOne Aviation?</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  {['DGCA Approved & Recognized', '500+ Pilots Trained', '98% First Attempt Pass Rate', 'International Training Options', '100% Placement Support', 'EMI & Scholarship Available', 'Expert Faculty (Ex-Airline Pilots)', 'Free Career Counselling'].map(point => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="text-av-orange">✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
