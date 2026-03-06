import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1920&q=80', tag: 'About WeOne Aviation', title: 'India\'s Most Trusted', highlight: 'Aviation Academy', sub: 'A legacy of 15+ years in shaping the next generation of pilots' },
  { id: 2, image: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1920&q=80', tag: 'Our Mission', title: 'Excellence in', highlight: 'Pilot Training', sub: 'DGCA approved, internationally recognized training with world-class faculty' },
];

const team = [
  { name: 'Capt. Rajiv Verma', role: 'Chief Flying Instructor', exp: '25+ years, Boeing 737 rated', img: 'RV' },
  { name: 'Capt. Anjali Nair', role: 'Ground Training Head', exp: '18+ years, DGCA Examiner', img: 'AN' },
  { name: 'Capt. Suresh Kumar', role: 'Simulator Instructor', exp: '20+ years, Airbus A320 rated', img: 'SK' },
  { name: 'Dr. Mehak Sharma', role: 'Aviation Medical Advisor', exp: 'DGCA AME, 15+ years', img: 'MS' },
];

export default function About() {
  return (
    <Layout title="About WeOne Aviation Academy | DGCA Approved Pilot Training Institute" description="Learn about WeOne Aviation Academy - India's premier DGCA-approved pilot training institute with 15+ years of excellence and 500+ pilots trained.">
      <HeroSlider customSlides={heroSlides} />

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <img src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80" alt="Aviation Academy" className="rounded-2xl shadow-2xl w-full h-72 object-cover" />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="section-tag">Our Story</div>
            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
              15+ Years of Aviation Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Founded in 2009, WeOne Aviation Academy started with a simple mission: to make quality pilot training accessible to every Indian aspiring to fly. From a small ground school in Delhi, we have grown into India's most respected aviation training institute.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              We are DGCA approved and have international tie-ups with partner flying schools in the USA (Florida), Canada (Ontario), Australia (Queensland), and Europe (Germany). Our integrated approach combines theoretical knowledge with practical flight training.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[['500+', 'Pilots'], ['50+', 'Airlines'], ['98%', 'Pass Rate']].map(([num, label]) => (
                <div key={label} className="text-center p-4 bg-av-light rounded-xl">
                  <div className="font-montserrat text-xl font-black text-av-orange">{num}</div>
                  <div className="text-av-blue text-xs font-medium">{label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Our Mission', text: 'To empower every aspiring pilot with world-class training, cutting-edge simulators, and personalized mentorship to build successful aviation careers.' },
            { icon: '🔭', title: 'Our Vision', text: 'To be India\'s #1 aviation academy globally recognized for producing highly skilled, safety-conscious, and professional pilots.' },
            { icon: '💎', title: 'Our Values', text: 'Safety first. Integrity always. Excellence in training. We uphold the highest standards of aviation education and professional conduct.' },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center card-hover">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-montserrat font-bold text-av-blue mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="section-tag">Our Experts</div>
            <h2 className="font-montserrat text-3xl font-bold text-av-blue">
              Meet Our <span className="text-av-orange">Expert Instructors</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 text-center">
                  <div className="h-32 bg-gradient-to-br from-av-blue to-av-navy flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-av-orange flex items-center justify-center text-white text-xl font-bold font-montserrat">
                      {member.img}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-montserrat font-bold text-av-blue">{member.name}</h4>
                    <div className="text-av-orange text-xs font-semibold mt-1">{member.role}</div>
                    <div className="text-gray-400 text-xs mt-2">{member.exp}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 px-4 bg-av-blue">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <div className="section-tag">Recognitions</div>
            <h2 className="font-montserrat text-3xl font-bold text-white mb-10">Approvals & Accreditations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['DGCA Approved', 'ICAO Aligned', 'ISO 9001:2015', 'Ministry of Civil Aviation', 'International IATA Partner', 'EASA Compliant Training'].map(item => (
                <div key={item} className="glass rounded-full px-5 py-2.5 text-white text-sm font-medium border border-white/20">
                  ✓ {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <LeadForm title="Talk to Our Aviation Experts" />
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
