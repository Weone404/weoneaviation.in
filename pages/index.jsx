import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import CourseCard from '../components/CourseCard';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import SpecialOfferBanner from '../components/Specialofferbanner'
import Passresultsslider from '../components/Passresultsslider';
import PartnerLogos from '../components/Partnerlogos';

const courses = [
  { icon: '✈️', title: 'Commercial Pilot License (CPL)', duration: '18-24 months', eligibility: '10+2 (PCM)', href: '/commercial-pilot-license', highlight: true },
  { icon: '🏆', title: 'ATPL', duration: '6 months', eligibility: 'CPL holder', href: '/courses/atpl' },
  { icon: '📚', title: 'DGCA Ground Classes', duration: '6-12 months', eligibility: '10+2 (PCM)', href: '/dgca-ground-classes' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'First Officer, IndiGo Airlines', quote: 'We One Aviation transformed my dream into reality. The DGCA ground classes and simulator training were exceptional.', img: 'RS' },
  { name: 'Priya Mehta', role: 'CPL Holder, Batch 2023', quote: 'The faculty here is world-class. I got my CPL in just 20 months and now flying with a regional airline.', img: 'PM' },
  { name: 'Arjun Singh', role: 'Cadet Pilot, Air India', quote: 'Best aviation academy in India. Their international tie-ups and placement support is unmatched.', img: 'AS' },
];

const stats = [
  { num: '3500', label: 'Pilots Trained', icon: '👨‍✈️' },
  { num: '16+', label: 'Years of Excellence', icon: '🏆' },
  { num: '98%', label: 'Success Rate', icon: '📈' },
  { num: '25+', label: 'Partner Airlines', icon: '✈️' },
];

const cities = [
  { name: 'Delhi', slug: 'pilot-training-in-delhi' },
  { name: 'Mumbai', slug: 'pilot-training-in-mumbai' },
  { name: 'Bangalore', slug: 'pilot-training-in-bangalore' },
  { name: 'Hyderabad', slug: 'pilot-training-in-hyderabad' },
  { name: 'Chennai', slug: 'pilot-training-in-chennai' },
  { name: 'Pune', slug: 'pilot-training-in-pune' },
  { name: 'Kolkata', slug: 'pilot-training-in-kolkata' },
  { name: 'Jaipur', slug: 'pilot-training-in-jaipur' },
  { name: 'Nagpur', slug: 'pilot-training-in-nagpur' },
  { name: 'Kerala', slug: 'pilot-training-in-kerala' },
];

const dgcaSubjects = [
  {
    num: '1',
    title: 'Air Navigation',
    desc: 'Air Navigation is the science of safely guiding an aircraft from one point to another using various navigational aids, instruments, and calculations. But do you know the secret behind how pilots navigate even in zero visibility? Discover the advanced techniques that make it possible—',
    link: '/air-navigation',
    linkText: 'click to explore more! 🚀',
  },
  {
    num: '2',
    title: 'Air Regulations',
    desc: 'Air Regulations are the rules every pilot must follow to ensure safe and legal flying. These laws cover everything from airspace restrictions to communication protocols and flight operations. Want to know how these regulations shape a pilot\'s journey and why they are crucial for your aviation career?',
    link: '/air-regulations',
    linkText: 'Click to find out more! ✈️',
  },
  {
    num: '3',
    title: 'Aviation Meteorology',
    desc: 'Aviation Meteorology helps pilots understand weather conditions that affect flight safety and performance. In this subject, students learn about weather phenomena and how they impact aviation operations.',
    link: '/aviation-meteorology',
    linkText: 'Explore more →',
  },
  {
    num: '4',
    title: 'Technical General (Aircraft & Engines)',
    desc: 'This subject covers the fundamental workings of aircraft and their engines, helping pilots understand how their machines operate. Key topics include aircraft systems, powerplants, and airworthiness.',
    link: '/technical-general',
    linkText: 'Explore more →',
  },
  {
    num: '5',
    title: 'Radio Telephony (RTR)',
    desc: 'Radio Telephony (RTR) is the backbone of pilot communication with Air Traffic Control (ATC). This subject teaches proper phraseology, emergency communications, and ATC procedures.',
    link: '/rtr-a',
    linkText: 'Explore more →',
  },
  {
    num: '6',
    title: 'Technical Specific (Type of Aircraft)',
    desc: 'This subject focuses on the technical details of specific aircraft models, ensuring pilots understand their assigned aircraft inside and out. Key topics include aircraft systems, limitations, and emergency procedures.',
    link: '/contact',
    linkText: 'Explore more →',
  },
];

const flyingSchools = [
  {
    flag: '🇮🇳',
    country: 'India',
    course: 'Commercial Pilot License (CPL)',
    duration: '12-18 months',
    fees: '₹35-45 Lakhs (approx.)',
    highlights: 'DGCA , state-of-the-art simulators, extensive flight hours',
    href: '/flying-school/india',
  },
  {
    flag: '🇺🇸',
    country: 'USA',
    course: 'FAA CPL & ATPL Training',
    duration: '12-14 months',
    fees: '$80,000 - $100,000',
    highlights: 'Largest flight training network in the USA, guaranteed instructor job opportunities',
    href: '/flying-school/usa',
  },
  {
    flag: '🇬🇧',
    country: 'UK',
    course: 'EASA ATPL Integrated Program',
    duration: '24 months',
    fees: '£90,000 - £120,000',
    highlights: 'Airline-focused training, fast-track to commercial airlines',
    href: '/contact',
  },
  {
    flag: '🇦🇺',
    country: 'Australia',
    course: 'CASA CPL & ATPL',
    duration: '12-18 months',
    fees: 'AUD $90,000 - $120,000',
    highlights: 'High-quality flight training with a focus on international airline careers',
    href: '/flying-school/australia',
  },
  {
    flag: '🇿🇦',
    country: 'South Africa',
    course: 'SACAA CPL & ATPL',
    duration: '12-15 months',
    fees: '$60,000 - $80,000',
    highlights: 'Affordable pilot training, international pilot job opportunities',
    href: '/flying-school/south-africa',
  },
  {
    flag: '🇨🇦',
    country: 'Canada',
    course: 'Transport Canada CPL & ATPL',
    duration: '18-24 months',
    fees: 'CAD $90,000 - $110,000',
    highlights: 'High international reputation, direct airline placement programs',
    href: '/flying-school/canada',
  },
];

const enrollSteps = [
  {
    step: 'First Step',
    title: 'Complete Class 10 & 12 with Physics & Maths',
    desc: 'You need to complete Class 10 and Class 12 with Physics and Maths. Commerce and Arts students can also qualify by completing Physics and Maths from NIOS (National Institute of Open Schooling).',
    cta: null,
  },
  {
    step: 'Second Step',
    title: 'Join Ground School & Ground Classes',
    desc: 'Enroll in a recognized Ground School and attend Ground Classes to build your theoretical knowledge in subjects like Air Navigation, Meteorology, Air Regulations, and Technical General — essential for clearing DGCA exams.',
    cta: null,
  },
  {
    step: 'Third Step',
    title: 'Join a Flying School',
    desc: 'After clearing your DGCA ground exams, join a DGCA-approved Flying School to complete your required flying hours. You must log a minimum of 200 hours of flight training to become eligible for a Commercial Pilot License (CPL).',
    cta: null,
  },
];

const pilotJourneySteps = [
  {
    icon: '🩺',
    title: 'Apply For Dgca Class-1-2 Medical',
    desc: 'You Have Do Your Medical Checkup From Any Approved Doctors. Below Is Full Process How To Get Dgca Class-1-2 Medical. If You Have Issue In Dgca Medical Then You Can Contact us For Dgca Medical',
    alert: 'Is Your Dgca Medical Test Taking Time?',
    alertDesc: 'Apply Dgca Medical Through We One Aviation Academy. Call On Us If You Can\'t Able For Dgca Medical. just Contact us for Dgca Medical',
  },
  {
    icon: '🖥️',
    title: 'Apply For Dgca Computer Number',
    desc: 'To start your journey as a pilot, obtaining a DGCA Computer Number is essential. This unique identification is required to appear for DGCA exams and progress in your aviation career.',
    alert: 'Worry About Computer Number?',
    alertDesc: 'if You Are Facing Any Issue While Applying Dgca Computer Numbers Then Contacts Us. Don\'t Be Tense About Aviation. We are Here To Solve Your All Aviation Query',
  },
  {
    icon: '📝',
    title: 'Clear Dgca Exam',
    desc: 'After Applying These Both, You Have To Book Your Exam Which is Conducted By Dgca Called Dgca Exam. In Dgca Exam , You Have To Give Paper of Six Subjects.',
    alert: 'Issue While Apply For Dgca Paper.',
    alertDesc: 'Can\'t Able To Apply Dgca Paper? Don\'t Worry Aviators, We One Aviation Is Here For Solve All your Aviation Problems. Just Contacts us',
  },
  {
    icon: '✈️',
    title: 'Apply For Flying Schools',
    desc: 'After Clear Dgca Exam, You Have To do 200hours of Flying From Any Flying Schools. Apply now For Do Flight Training From We One Aviation Academy.',
    alert: 'Worry About Loan For Flying schools?',
    alertDesc: 'We Provide 100% Loan For Flight Training From Any Country. If You Wants To do Premier Flight Training Then We One Aviation Is Solution For You.',
  },
];

const faqs = [
  {
    q: 'How long does it take to complete pilot training?',
    a: 'The duration varies depending on the type of pilot training: Private Pilot License (PPL): 6-12 months | Commercial Pilot License (CPL): 12-18 months | ATPL (Airline Transport Pilot License) Training: Additional experience after CPL',
  },
  {
    q: 'What is the salary of a commercial pilot?',
    a: 'Commercial pilot salaries vary by airline, experience, and aircraft type. Entry-level first officers can earn ₹1.5–3 lakh/month, while senior captains earn ₹5–10 lakh/month or more.',
  },
  {
    q: 'Can I get a scholarship for pilot training?',
    a: 'Yes! We One Aviation Academy offers up to 25% scholarship on select courses. Contact our counsellors to learn about available scholarships and loan assistance options.',
  },
  {
    q: 'Can I become a pilot if I wear glasses?',
    a: 'Yes, you can become a pilot if you wear glasses, provided your corrected vision meets DGCA Class 1 medical standards. Contact us for detailed medical eligibility guidance.',
  },
  {
    q: 'What are DGCA ground classes, and why are they important?',
    a: 'DGCA ground classes cover aviation subjects like Meteorology, Navigation, Air Regulations, and Technical General, preparing students for DGCA exams required for obtaining a pilot license.',
  },
  {
    q: 'What Are The Eligibility Criteria for Pilot Training?',
    a: 'Minimum age: 17 years for CPL | Educational qualification: 10+2 with Physics and Mathematics | Medical fitness: Class 1 Medical Certificate from a approved medical examiner',
  },
  {
    q: 'What is Pilot Training Institute?',
    a: 'Its Just Like A Training Institute or Some Aviation Academy Who Give You Education Or Coaching For Clear Dgca Exam Paper. As For Example If You Want to Become Doctor or Enginners Then After 12th, You Have To Clear NEET and IIT Mains Exam and Mostly Students Takes Coaching From Any Coaching Center For Clear This Exam Quickly With The Guidance of Great Teacher As Same As That If You Want To Fly High And Become a Pilot Then You Have To Clear Dgca Exam for Making Pilots. And We One Aviation As a Pilot Training Institute Provides You Coaching To Clear Dgca Exam.',
  },
];

export default function Home() {


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to complete pilot training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PPL: 6-12 months | CPL: 12-18 months | ATPL: Additional experience after CPL."
        }
      },
      {
        "@type": "Question",
        "name": "What is the salary of a commercial pilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entry-level first officers earn ₹1.5–3 lakh/month, senior captains earn ₹5–10 lakh/month."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a scholarship for pilot training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We One Aviation Academy offers up to 25% scholarship on select courses. Contact our counsellors."
        }
      },
      {
        "@type": "Question",
        "name": "Can I become a pilot if I wear glasses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if your corrected vision meets DGCA Class 1 medical standards."
        }
      },
      {
        "@type": "Question",
        "name": "What are DGCA ground classes and why are they important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DGCA ground classes cover Meteorology, Navigation, Air Regulations, and Technical subjects required for a pilot license."
        }
      },
      {
        "@type": "Question",
        "name": "What are the eligibility criteria for pilot training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum age 17 years, 10+2 with Physics and Mathematics, Class 1 Medical Certificate from an approved examiner."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Pilot Training Institute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Pilot Training Institute like We One Aviation Academy provides coaching to clear DGCA exams required to become a professional pilot."
        }
      }
    ]
  };

  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "We One Aviation Academy",
    "url": "https://www.weoneaviation.in",
    "logo": "https://www.weoneaviation.in/logo.png",
    "description": "India's premier DGCA approved aviation training academy. CPL, PPL, ATPL, SPL courses. 3500+ pilots trained since 2009 with 98% pass rate.",
    "foundingDate": "2009",
    "telephone": "+919355611996",
    "email": "info@weoneaviation.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C-404, 3rd Floor, Ramphal Chowk, Dwarka, Sector-7",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110077",
      "addressCountry": "IN"
    },
    "accreditedBy": {
      "@type": "Organization",
      "name": "Directorate General of Civil Aviation (DGCA)",
      "url": "https://www.dgca.gov.in"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Aviation Courses at We One Aviation Academy",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Course",
          "name": "Commercial Pilot License (CPL)",
          "description": "DGCA approved CPL training. 18-24 months. Eligibility: 10+2 PCM.",
          "url": "https://www.weoneaviation.in/commercial-pilot-license",
          "provider": {
            "@type": "Organization",
            "name": "We One Aviation Academy"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Course",
          "name": "ATPL - Airline Transport Pilot License",
          "description": "Advanced ATPL training. 6 months. Eligibility: CPL holder.",
          "url": "https://www.weoneaviation.in/courses/atpl",
          "provider": {
            "@type": "Organization",
            "name": "We One Aviation Academy"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Course",
          "name": "DGCA Ground Classes",
          "description": "Comprehensive DGCA exam preparation. 6-12 months. Eligibility: 10+2 PCM.",
          "url": "https://www.weoneaviation.in/dgca-ground-classes",
          "provider": {
            "@type": "Organization",
            "name": "We One Aviation Academy"
          }
        }
      }
    ]
  };








  return (

    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
        />
      </Head>
      <Layout title="We One Aviation Academy | Best Pilot Training Institute in India" description="India's premier approved aviation training academy. CPL, PPL, ATPL, SPL courses. 3500 pilots trained. Free career counselling available.">
        {/* Hero */}
        <HeroSlider />


        {/* Tagline Banner */}
        <div className="bg-av-orange py-4 text-center">
          <p className="text-white font-semibold text-lg">
            Looking for the best pilot training institute in India? Get world-class flight training, approved courses, and expert guidance to kickstart your aviation career. Join now and become a certified pilot with top-notch training programs.
          </p>
          <Link href="/contact" className="inline-block mt-2 bg-white text-av-orange font-bold px-6 py-2 rounded-full text-sm hover:bg-av-blue hover:text-white transition-all">
            Contact Us →
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="bg-av-blue py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <ScrollReveal key={s.label} className="text-center">
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="font-montserrat text-2xl font-black text-av-orange">{s.num}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-white/80 text-sm font-semibold">We Deliver 3000+ Pilots To India Since 2011</span>
          </div>
          <div className="text-center mt-1">
            <span className="text-av-orange text-sm font-semibold">Clear Your Dgca Exam In First Attempt With We One Aviation Academy</span>
          </div>
        </div>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">About Us</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                India's Most Trusted Aviation Academy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We One Aviation Academy has been shaping the careers of aspiring pilots since 2009. We are a approved institution offering world-class pilot training programs with international tie-ups in USA, Canada, Australia, and Europe.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our expert faculty, modern simulators, and personalized mentoring ensure every student achieves their dream of becoming a professional pilot. With a 98% success rate and 3500 pilots trained, we are India's #1 choice for aviation training.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['DGCA ', 'International Tie-ups', '24/7 Support', 'Job Placement'].map(tag => (
                  <span key={tag} className="bg-av-light text-av-blue text-xs font-semibold px-4 py-2 rounded-full border border-av-sky/20">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <Link href="/about-us"
                className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                Learn More About Us →
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/GroundSchool.jpg"
                    alt="Pilot in cockpit training"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-av-orange rounded-xl p-4 shadow-xl">
                  <div className="font-montserrat text-white text-xl font-black">16+</div>
                  <div className="text-white/80 text-xs">Years of Excellence</div>
                </div>
                <div className="absolute -top-5 -right-5 glass bg-av-blue rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="font-montserrat text-av-orange text-xl font-black">DGCA</div>
                  <div className="text-white text-xs"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Courses */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Our Programs</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Choose Your <span className="text-av-orange">Aviation Career Path</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">From Private Pilot to Airline Captain – we have the right course for every aspiring aviator</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c, i) => (
                <ScrollReveal key={c.href} delay={i * 100}>
                  <CourseCard {...c} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <PartnerLogos />

        {/* Course Fee & Schedule Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Fee & Schedule</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                We One Aviation <span className="text-av-orange">Course Duration, Fee, & Schedule</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                There is Details of Pilot Courses, Fees and Schedule of Our Batches. We Generally Start 2 Batches in a Months For Aviation Students.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* DGCA CPL Ground Classes */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-av-orange/40 transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA CPL Ground Classes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    This is the main pilot course with exams conducted by DGCA, designed for theoretical preparation required to obtain a pilot's license.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div><span className="font-semibold text-av-blue">Fees:</span>2 Lakh to 2.95 Lakh <span className="text-av-orange font-semibold">( Scholarship)</span></div>
                    <div><span className="font-semibold text-av-blue">Course Duration:</span> 6 Months</div>
                    <div><span className="font-semibold text-av-blue">Mode:</span> Offline / Online</div>
                    <div><span className="font-semibold text-av-blue">Batch Start Date:</span> Every Months Of First Week and Third Week</div>
                  </div>
                  <Link href="/dgca-ground-classes" className="mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">
                    Course Details
                  </Link>
                </div>
              </ScrollReveal>


              {/* CPL Flight Training */}
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-av-orange/40 transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">🛩️</div>
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL Flight Training (India/Abroad)</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    After Clear the Dgca Exam, You Have To do Flying From India Or Abroad. 200 Hours of Flying is Must for Obtain Commercial Pilot Licence.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div><span className="font-semibold text-av-blue">Flying Duration:</span> 1 year (Abroad) / 1.5 Years (India)</div>
                    <div><span className="font-semibold text-av-blue">Flying Training Fees:</span> 55 to 65 lakh <span className="text-gray-400">(Depends on Country)</span></div>
                    <div><span className="font-semibold text-av-blue">Registration Date:</span> Every Month You Can Apply</div>
                  </div>
                  <Link href="/courses/cpl-flight-training" className="mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">
                    CPL Flight Training Details
                  </Link>
                </div>
              </ScrollReveal>

              {/* Full CPL Course */}
              <ScrollReveal delay={200}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">✈️</div>
                  <h3 className="font-montserrat text-xl font-bold text-white mb-3">Commercial Pilot Licence (CPL) Course</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    This Course is a full-fledged training program that includes both theoretical and practical flight training. We Are The Only Aviation Who provide All Solutions of Aviation Under One Roof
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-white/80">
                    <div><span className="font-semibold text-av-orange">Full Course Duration:</span> 2–3 Years (Depends on Country)</div>
                    <div><span className="font-semibold text-av-orange">Full Course Fees:</span> 50–55 lakh (Depends on Country)</div>
                    <div><span className="font-semibold text-av-orange">Batch Start Date:</span> Every First and Third Week of Month</div>
                  </div>
                  <Link href="/commercial-pilot-license" className="mt-auto inline-block text-center bg-av-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                    Course Details
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* DGCA Ground Classes Promo */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">DGCA Ground Classes</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot License
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ✈️ Dreaming of Becoming a Commercial Pilot? Get approved training, expert mentorship and hands-on flight experience.
              </p>
              <Link href="/commercial-pilot-license" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">
                Learn More
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="section-tag">Ground Classes</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Dgca-Cpl Ground Classes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                📖 Master Every DGCA Subject & Fly High! Our DGCA Ground Classes make learning easy & effective. Get trained by industry experts!
              </p>
              <Link href="/dgca-ground-classes" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">
                Learn More
              </Link>
            </ScrollReveal>
          </div>

          {/* Enroll in Flying School */}
          <div className="max-w-7xl mx-auto mt-12">
            <ScrollReveal className="bg-av-blue rounded-2xl p-8 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-white mb-3">Enroll in Flying School</h3>
              <p className="text-white/70 max-w-2xl mx-auto mb-6 text-sm">
                At Our Flying School, we train future pilots with state-of-the-art aircraft, expert instructors, and guaranteed career guidance.
              </p>
              <Link href="/flying-school/india" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                Learn More
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Why WeOne</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                What Makes Us <span className="text-av-orange">Different</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">All Your Aviation Needs Under One Roof</p>
              <p className="text-gray-500 mt-1 text-sm max-w-2xl mx-auto">
                At We One Aviation Academy, we don't just train pilots—we shape future aviation leaders. Here's why students trust us for their pilot training journey:
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '✅', title: 'Approved Training Programs', desc: 'Our courses meet all regulatory requirements to ensure a smooth path to becoming a professional pilot.' },
                { icon: '✅', title: 'Experienced Instructors & Mentors', desc: 'Learn from seasoned airline pilots and aviation experts who provide hands-on guidance.' },
                { icon: '✅', title: 'State-of-the-Art Training Facilities', desc: 'Get trained with modern simulators, advanced flight training devices, and real aircraft for a world-class experience.' },
                { icon: '✅', title: '100% Placement Assistance', desc: 'We help students secure jobs in leading airlines through industry connections and career support.' },
                { icon: '✅', title: 'Comprehensive CPL & DGCA Ground Classes', desc: 'Structured curriculum covering Air Navigation, Meteorology, Air Regulations, and Technical subjects.' },
                { icon: '✅', title: 'Flexible Payment & Loan Options', desc: 'Making your dream of becoming a pilot financially accessible with easy EMI and loan assistance.' },
                { icon: '✅', title: 'Personalized Learning Approach', desc: 'Small batch sizes, doubt-clearing sessions, and one-on-one mentorship to ensure better understanding.' },
                { icon: '✅', title: 'International Training Tie-Ups', desc: 'Get global exposure with flight training options in India and abroad.' },
                { icon: '✅', title: 'Proven Track Record of Success', desc: 'Hundreds of successful pilots flying with leading airlines, proving our commitment to excellence.' },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 100}>
                  <div className="card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-av-orange/30">
                    <div className="text-2xl mb-4">{f.icon}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="text-center mt-10">
              <p className="text-av-blue font-semibold text-lg">Join We One Aviation Academy and Take Off Towards a Successful Aviation Career! ✈️</p>
              <Link href="/contact" className="inline-block mt-4 bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                Contact Us
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* From Ground to Sky */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Premier Training</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                From Ground to Sky: <span className="text-av-orange">DGCA Exam Coaching & Flight Training</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Premier DGCA Ground Classes & Flying School for Aspiring Pilots. If You Are Wants To Become Pilot Then You Have to Start Your Carrers By Dgca Ground Classes and Ending By Flight Training. So Enroll Now In Our Course.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Dgca Ground Classes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    We one Aviation Academy is Oldest Pilot Training Institute. Which Gives 100% Results Every Years Since 2011. If Your Dream To Be a Pilot Then We One Aviation Academy is Best Institute Which Give Advance Training With So Many Flexibilites Of Timing and Fees.
                  </p>
                  <Link href="/contact" className="inline-block bg-av-blue text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">
                    Enquiry Now
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8">
                  <h3 className="font-montserrat text-xl font-bold text-white mb-4">Our Flying School</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    We Provide Flight Training From 20+ Countries. We Almost Provide Flight Training to 3000+ Students Across India. If You Wants To do Flight Training From Any Country Then You Can Contact Us. After Clear Dgca Exam You Can Apply Flight Training. All Institute Provide 200 Hours of Flying But We Provide You 225+ Hours of Flying.
                  </p>
                  <Link href="/contact" className="inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                    Enquiry Now
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* How to Become a Pilot - Step by Step */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Your Journey</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                How to Become a <span className="text-av-orange">Pilot in India</span>
              </h2>
              <p className="text-white/60 mt-2 text-sm">
                Steps By Step Guide To Become A Pilot. if You Are Just 12th Pass and Want To Become A Pilot Then Your Search End Here.
              </p>
            </ScrollReveal>

            {/* Enroll Steps */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {enrollSteps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 100}>
                  <div className="glass rounded-2xl p-6 text-center h-full">
                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">{i + 1}</div>
                    <div className="text-av-orange font-semibold text-xs uppercase tracking-wider mb-2">{s.step}</div>
                    <h3 className="font-montserrat font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Detailed Pilot Journey */}
            <ScrollReveal className="text-center mb-10">
              <h3 className="font-montserrat text-2xl font-bold text-white">
                Step By Step Guide for <span className="text-av-orange">Become a Pilot</span>
              </h3>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {pilotJourneySteps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 100}>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h4 className="font-montserrat font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{step.desc}</p>
                    <div className="bg-av-orange/20 border border-av-orange/30 rounded-xl p-4">
                      <p className="text-av-orange font-semibold text-sm mb-1">{step.alert}</p>
                      <p className="text-white/70 text-xs leading-relaxed">{step.alertDesc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* After 12th & International Routes */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'After 12th Standard',
                  steps: ['Pass 12th with PCM (Physics, Chemistry, Maths)', 'Clear DGCA Medical Class 1', 'Enroll in CPL program', 'Complete 200+ flying hours', 'Clear DGCA written exams', 'Get your CPL license'],
                  href: '/how-to-become-a-pilot-after-12th',
                },
                {
                  title: 'International Training Route',
                  steps: ['Get your PPL in India or abroad', 'Complete IR (Instrument Rating)', 'Accumulate flying hours overseas', 'Appear for DGCA RTR exam', 'License conversion to DGCA', 'Start airline career'],
                  href: '/how-to-become-a-pilot/in-india',
                },
              ].map(route => (
                <ScrollReveal key={route.title}>
                  <div className="glass rounded-2xl p-8 h-full">
                    <h3 className="font-montserrat text-xl font-bold text-white mb-6">{route.title}</h3>
                    <ol className="space-y-3">
                      {route.steps.map((step, i) => (
                        <li key={step} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                          <span className="text-white/80 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <Link href={route.href}
                      className="mt-6 inline-block text-av-orange text-sm font-semibold hover:underline">
                      Learn More →
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* DGCA Subjects */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">DGCA Subjects</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Master Yourself For Dgca Exam With All These <span className="text-av-orange">Subjects</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Subjects For DGCA Ground Classes</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dgcaSubjects.map((subject, i) => (
                <ScrollReveal key={subject.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {subject.num}
                      </div>
                      <h3 className="font-montserrat font-bold text-av-blue text-sm">{subject.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{subject.desc}</p>
                    <Link href={subject.link} className="text-av-orange text-xs font-semibold hover:underline">
                      {subject.linkText}
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Flying Schools Worldwide */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Global Flying Schools</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                🚀 Your Gateway to a Global Aviation Career – <span className="text-av-orange">Train at the Best Flying Schools Worldwide!</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm">
                🌍 Explore Our Top Flying Schools Across the World! ✈️ At WeOneAviation Academy, we collaborate with some of the best flying schools worldwide to provide aspiring pilots with world-class flight training. Whether you're looking for approved CPL training or internationally recognized pilot courses, our global network ensures you receive top-notch aviation education. Explore our Flight training centers in India, the USA, Canada, the UK, Australia, and South Africa, with structured courses designed for aspiring commercial pilots.
              </p>
              <p className="text-av-orange font-semibold mt-2 text-sm">🌟 Choose a Flight School That Matches Your Goals and Country Preference!</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flyingSchools.map((school, i) => (
                <ScrollReveal key={school.country} delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="text-4xl mb-3">{school.flag}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-3">
                      Flying School in {school.country}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4 flex-grow">
                      <p>✅ <span className="font-semibold">Course:</span> {school.course}</p>
                      <p>✅ <span className="font-semibold">Duration:</span> {school.duration}</p>
                      <p>✅ <span className="font-semibold">Fees:</span> {school.fees}</p>
                      <p>✅ <span className="font-semibold">Highlights:</span> {school.highlights}</p>
                    </div>
                    <Link href={school.href} className="inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">
                      Learn More
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Success Stories</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Our <span className="text-av-orange">Pilots Speak</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                What Our Previous Batch Students Think About Us — These are Genuine Reviews of Our Students Who Started Pilot Training From We One Aviation in Year 2024 and Clear Dgca Exam in Year 2025 With Our Expert Training.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 100}>
                  <div className="card-hover bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div className="flex items-center gap-1 text-av-orange mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-sm">★</span>)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {t.img}
                      </div>
                      <div>
                        <div className="font-semibold text-av-blue text-sm">{t.name}</div>
                        <div className="text-gray-400 text-xs">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Training Locations - India */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">Pan India Presence</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">
                Pilot Training Across <span className="text-av-orange">India</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {cities.map((city, i) => (
                <ScrollReveal key={city.name} delay={i * 60}>
                  <Link href={`/${city.slug}`}
                    className="card-hover block text-center p-4 rounded-xl border border-gray-200 bg-white hover:border-av-orange hover:text-av-orange hover:bg-orange-50 transition-all text-sm font-medium text-av-blue">
                    📍 {city.name}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <Passresultsslider />

        {/* Training Locations - World */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">Global Presence</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">
                Pilot Training Across <span className="text-av-orange">World</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { flag: '🇺🇸', country: 'USA', href: '/flying-school/usa' },
                { flag: '🇨🇦', country: 'Canada', href: '/flying-school/canada' },
                { flag: '🇮🇳', country: 'India', href: '/flying-school/india' },
                { flag: '🇱🇰', country: 'Sri Lanka', href: '/contact' },
                { flag: '🇲🇻', country: 'Maldives', href: '/contact' },
                { flag: '🇿🇦', country: 'South Africa', href: '/flying-school/south-africa' },
                { flag: '🇦🇺', country: 'Australia', href: '/flying-school/australia' },
                { flag: '🇳🇿', country: 'New Zealand', href: '/contact' },
              ].map((loc, i) => (
                <ScrollReveal key={loc.country} delay={i * 60}>
                  <Link
                    href={loc.href}
                    className="card-hover flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-av-orange hover:text-av-orange hover:bg-orange-50 transition-all text-sm font-medium text-av-blue"
                  >
                    <span className="text-xl">{loc.flag}</span>
                    <span>{loc.country}</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">FAQ</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                FAQ About <span className="text-av-orange">Pilot Training Institute</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Know Your Answers Here</p>
            </ScrollReveal>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal key={faq.q} delay={i * 60}>
                  <details className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer">
                    <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="text-center mt-8">
              <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                Ask Question
              </Link>
            </ScrollReveal>
          </div>
        </section>


        {/* Lead Form Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">Free Counselling</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                Take the First Step <span className="text-av-orange">Towards the Sky</span>
              </h2>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">
                Our aviation career counsellors will guide you through course selection, eligibility, fees, scholarships, and career prospects.
              </p>
              <div className="space-y-3">
                {['Free one-on-one career counselling', 'DGCA exam preparation guidance', 'International training options', 'Scholarship & loan assistance'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-av-orange">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-white/20 space-y-2 text-sm text-white/70">
                <p>📧 <span className="font-semibold text-white">Office Mail:</span> Weoneaviation8@gmail.com</p>
                <p>📍 <span className="font-semibold text-white">Office Address:</span> C-404 , 3rd floor, sector-7, near Ramphal Chowk Road, Palam Extension, Dwarka sector 7, Delhi, India 110077</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <h3 className="font-montserrat font-bold text-white text-center mb-4">BOOK Your SEAT FOR SCHOLARSHIP</h3>
                <p className="text-white/70 text-center text-sm mb-4">Join Dgca Ground Classes</p>
                <LeadForm dark />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </Layout>
    </>
  );
}