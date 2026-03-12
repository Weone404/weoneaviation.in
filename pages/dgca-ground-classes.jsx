import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Most Popular Course', title: 'DGCA Ground', highlight: 'Classes', sub: "India's best DGCA Ground Classes — delivering 100% results every year" },
];

const subjects = [
  {
    num: '1', icon: '🗺️', title: 'Air Navigation',
    short: 'Learn to navigate aircraft using maps, coordinates, instruments, and GPS.',
    book: 'Teaches how to calculate direction, distance, time, and fuel for safe and accurate flying.',
    detail: 'Learn to plan and conduct flights using maps, charts, and navigation instruments. Covers topics like basic navigation, map reading, compass errors, radio aids (VOR, NDB, DME), flight planning, and airspace classifications.',
    href: '/air-navigation',
  },
  {
    num: '2', icon: '⛅', title: 'Aviation Meteorology',
    short: 'Study weather conditions and how they affect flying.',
    book: 'Covers clouds, wind patterns, storms, pressure systems, and how to read weather charts for flight planning.',
    detail: 'Covers atmospheric structure, weather systems, wind patterns, thunderstorms, icing, visibility, climatology, and interpreting METAR/TAF weather reports.',
    href: '/aviation-meteorology',
  },
  {
    num: '3', icon: '📋', title: 'Air Regulations',
    short: 'Understand the rules and laws of aviation in India and worldwide.',
    book: 'Includes DGCA rules, ICAO guidelines, airspace classifications, and pilot responsibilities.',
    detail: 'Learn aviation laws, licensing requirements, CAR (Civil Aviation Requirements), rules of the air, and flight time/duty limits.',
    href: '/air-regulations',
  },
  {
    num: '4', icon: '⚙️', title: 'Technical General',
    short: 'Learn how an aircraft works – its engine, systems, and parts.',
    book: 'Explains engines, hydraulics, electrical systems, instruments, and basic aerodynamics.',
    detail: 'Understand the science and mechanics of flight — including aerodynamics, engines, structures, electrical and hydraulic systems, instruments, and fire protection.',
    href: '/technical-general',
  },
  {
    num: '5', icon: '🛩️', title: 'Technical Specific',
    short: "Know the exact aircraft you'll fly during training.",
    book: 'Covers aircraft systems, performance, and checklists for the specific trainer aircraft (e.g., Cessna 172).',
    detail: 'Focus on aircraft type used for training — covers systems, limitations, procedures, and emergency operations.',
    href: '/contact',
  },
  {
    num: '6', icon: '📻', title: 'Radio Telephony (RTR)',
    short: 'Learn how to communicate with ATC using aviation radio language.',
    book: 'Includes standard phrases, procedures, emergency communication, and mock RT exercises.',
    detail: null,
    href: '/rtr-a',
  },
];

const dgcaDoes = [
  { icon: '📜', title: 'Issues Licenses', desc: 'To pilots, aircraft engineers, and flight instructors.' },
  { icon: '🛡️', title: 'Ensures Safety', desc: 'Makes sure all aircraft, airports, and airlines follow safety standards.' },
  { icon: '🏫', title: 'Approves Flying Schools', desc: 'Only DGCA-approved schools can train pilots in India.' },
  { icon: '📝', title: 'Conducts Exams', desc: 'Organizes theory exams (called DGCA Ground Exams) for student pilots.' },
];

const benefits = [
  'Easy-to-learn syllabus',
  'Doubt clearing in every class',
  'Learn directly from professional pilots and instructors',
  'Free access to books and notes',
  'Interaction with other aspiring aviators',
  'No paperwork burden — we help with computer number registration, DGCA medicals, exam forms, and visa processing',
];

const eligibility = [
  {
    icon: '🎓', title: 'Educational Qualification',
    points: [
      'You must have passed Class 12th (10+2) or equivalent from a recognized board.',
      'Subjects Required: Physics and Mathematics are mandatory.',
      'Students from Science stream are preferred.',
      'Note: If you have not studied Physics and Math in 12th, you can still become eligible by appearing for these subjects through the National Institute of Open Schooling (NIOS).',
    ],
  },
  {
    icon: '🎂', title: 'Minimum Age',
    points: [
      'You must be at least 17 years old to enroll in ground classes.',
      'However, to apply for a Commercial Pilot License (CPL), you must be 18 years or above.',
    ],
  },
  {
    icon: '🩺', title: 'Medical Fitness',
    points: [
      'You must obtain a DGCA Class 2 Medical Certificate before starting your ground classes.',
      'Eventually, a Class 1 Medical Certificate is required for flying and CPL issuance.',
      'Medical certificates must be issued by DGCA-approved doctors only.',
    ],
  },
  {
    icon: '🗣️', title: 'English Proficiency',
    points: [
      'You should be able to read, write, and understand English fluently, as aviation communication and study material are in English.',
    ],
  },
  {
    icon: '❤️', title: 'Passion & Dedication',
    points: [
      'A strong interest in aviation, willingness to study technical subjects, and discipline are essential to succeed in DGCA Ground Classes and clear the DGCA exams.',
    ],
  },
];

const whyChoose = [
  { icon: '✅', title: 'Verified Instructors', desc: "Our All Instructors Are Already Pilot Those Really Help You in All Aviation Carrier. They Don't Only Teach You, They Share their Life experience of pilot with you and Give you Right Roadmap." },
  { icon: '✅', title: '100% Dgca Exam Results', desc: 'We One Aviation Academy is the Only Academy in India Who give 100% Results Every Years in Dgca Exam. Most of our students clear their DGCA exam on the first attempt.' },
  { icon: '✅', title: 'Latest Technology Classroom', desc: 'Our classrooms are equipped with modern technology that provides greater comfort for studying.' },
  { icon: '✅', title: '25% Scholarship Granted', desc: 'We Provide 25% Scholarship in Dgca Ground Classes To Every Students For Push Them Towards Their Dream of Pilot.' },
  { icon: '✅', title: 'Extra Class For Weak Students', desc: 'We provide extra classes for weak students to help them clear the DGCA exam quickly.' },
  { icon: '✅', title: 'Free Books and Notes', desc: 'We provide free books and notes to students, which help them a lot.' },
  { icon: '✅', title: '100% Placement Support', desc: 'We will support you until you become a pilot.' },
  { icon: '✅', title: 'Free Classes Until You Clear', desc: 'We One Aviation Academy is the Only Institute Which Give Free Classes to everyone Till They not Clear Dgca Exam.' },
];

const blogs = [
  {
    title: 'Pilot Training in Delhi',
    date: 'February 13, 2025',
    desc: 'Flight Simulator Practice in pilot training Course. DGCA Practice Paper, Private Pilot License (PPL) Course Fees, Full Form of CPL...',
    href: '/pilot-training-in-delhi',
  },
  {
    title: 'Private Pilot License (PPL) Course Fees',
    date: 'February 10, 2025',
    desc: 'Private Pilot License (PPL) Course Fees-2025. If Your Dream To Become a Pilot...',
    href: '/ppl-full-form',
  },
  {
    title: 'Full Form of CPL | Commercial Pilot License',
    date: 'January 28, 2025',
    desc: 'CPL Full Form: Meaning in Aviation, Cricket, Marketing, and More. Have you ever come across the term CPL and wondered what...',
    href: '/cpl-full-form',
  },
  {
    title: 'Master the DGCA CPL Exam: Complete Guide to Syllabus, Subjects, and Success Tips',
    date: 'January 21, 2025',
    desc: 'Comprehensive Guide to DGCA Exam Subjects. Master the DGCA CPL Exam with complete syllabus, subjects, and success tips.',
    href: '/blogs',
  },
  {
    title: 'Aviation Course After 12th: Detailed Fees and Admission Guide',
    date: 'January 2, 2025',
    desc: 'Discover top aviation courses after 12th with complete details on fees, eligibility, and career options.',
    href: '/how-to-become-a-pilot-after-12th',
  },
  {
    title: 'Aviation Academy',
    date: 'December 12, 2024',
    desc: 'We One Aviation Academy: Leading Aviation Training Institute. At WeOneAviation Academy, we turn your passion for aviation into a rewarding career.',
    href: '/blogs',
  },
];

const sidebarQuickLinks = [
  { label: 'Commercial Pilot License (CPL)', href: '/commercial-pilot-license' },
  { label: 'CPL Eligibility Criteria', href: '/commercial-pilot-license-eligibility' },
  { label: 'CPL Salary in India', href: '/commercial-pilot-license-salary' },
  { label: 'DGCA Exam (Pariksha)', href: '/dgca-pariksha' },
  { label: 'DGCA Computer Number', href: '/dgca-computer-number' },
  { label: 'DGCA Class 1 & 2 Medical', href: '/dgca-class-2-class-1-medical' },
  { label: 'Student Pilot License (SPL)', href: '/student-pilot-license-spl' },
  { label: 'How to Become a Pilot After 12th', href: '/how-to-become-a-pilot-after-12th' },
  { label: 'Flying School in India', href: '/flying-school/india' },
  { label: 'PPL Full Form', href: '/ppl-full-form' },
  { label: 'CPL Full Form', href: '/cpl-full-form' },
  { label: 'About Us', href: '/about-us' },
];

export default function DGCAGroundClasses() {
  return (
    <Layout
      title="DGCA Ground Classes | Best Pilot Training Institute in India | WeOne Aviation"
      description="India's best DGCA Ground Classes delivering 100% results every year. 3000+ pilots trained. CPL ground school covering all DGCA subjects. Join WeOne Aviation Academy."
    >
      <HeroSlider customSlides={heroSlides} />

      {/* Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="section-tag">DGCA Ground Classes</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                DGCA Ground Classes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                India's best DGCA Ground Classes — delivering 100% results every year and having trained over 3,000 pilots across India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                DGCA Ground Classes are where students prepare for the DGCA exams. It's similar to regular coaching institutes like IIT or MBBS coaching — the only difference is that here you'll master all DGCA subjects required to obtain a{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  Commercial Pilot License (CPL)
                </Link>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                DGCA Ground Classes are classes where students prepare themselves for the{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exam
                </Link>. It's a normal coaching class, like IIT and MBBS coaching classes. The only difference is that after taking DGCA ground classes, you will master the DGCA exam, which is required to obtain a pilot license.
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[['6 Months', 'Course Duration'], ['6 Subjects', 'DGCA Papers'], ['17+ Years', 'Min Age'], ['25% Off', 'Scholarship']].map(([val, label]) => (
                  <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                    <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* What is DGCA */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Is DGCA?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                The Directorate General of Civil Aviation (DGCA) is the main government body that controls and regulates all aviation-related activities in India. Learn more on our{' '}
                <Link href="/dgca-full-form" className="text-av-orange font-semibold hover:underline">
                  DGCA Full Form
                </Link>{' '}
                page.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                It makes rules for flying, conducts{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exams
                </Link>, and issues pilot licenses.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                To become a pilot, you must follow DGCA regulations and clear DGCA exams. The first step is to obtain your{' '}
                <Link href="/dgca-computer-number" className="text-av-orange font-semibold hover:underline">
                  DGCA Computer Number
                </Link>.
              </p>

              {/* What Does DGCA Do */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">What Does DGCA Do?</h3>
              <div className="space-y-3 mb-10">
                {dgcaDoes.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Why Important */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">
                Why Are DGCA Ground Classes Important for Pilot Training?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                DGCA Ground Classes are the first step toward becoming a pilot. If your dream is to become a pilot, you must clear the{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exams
                </Link>{' '}
                — and to do that, these classes are essential.
              </p>
              <p className="text-gray-600 text-sm font-semibold mb-3">Benefits of DGCA Ground Classes:</p>
              <ul className="space-y-2 mb-10">
                {benefits.map((b, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Subjects */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Dgca Ground Classes Subjects For Dgca Exam
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                There Are Mainly 6 Subjects in{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA Exam
                </Link>.
              </p>
              <div className="space-y-4 mb-6">
                {subjects.map((s) => (
                  <div key={s.num} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between gap-3 bg-av-blue p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <h4 className="font-montserrat font-bold text-white text-sm">{s.num}. {s.title}</h4>
                      </div>
                      <Link
                        href={s.href}
                        className="text-av-orange text-xs font-semibold bg-white/10 hover:bg-av-orange hover:text-white px-3 py-1 rounded-full transition-all flex-shrink-0"
                      >
                        Learn More →
                      </Link>
                    </div>
                    <div className="p-4 bg-white space-y-1">
                      <p className="text-gray-600 text-xs">{s.short}</p>
                      <p className="text-gray-500 text-xs">📗 <span className="font-semibold">Book Focus:</span> {s.book}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DGCA CPL Subjects Syllabus */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mt-10 mb-5">
                DGCA CPL Subjects, Syllabus and Topics (with Explanation)
              </h3>
              <div className="space-y-3 mb-10">
                {subjects.filter(s => s.detail).map((s) => (
                  <div key={s.num} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {s.num}
                    </span>
                    <div>
                      <Link
                        href={s.href}
                        className="font-semibold text-av-blue hover:text-av-orange transition-colors mb-1 inline-block"
                      >
                        {s.title} →
                      </Link>
                      <p className="text-xs leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duration */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">
                Duration of DGCA Ground Classes
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                The duration of DGCA Ground Classes may vary between academies.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                At We One Aviation, our full DGCA syllabus is covered in 6 months.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                However, classes may be extended for students who do not clear exams on their first attempt. View our{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  CPL course page
                </Link>{' '}
                for the full training roadmap.
              </p>

              {/* Eligibility */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Eligibility for DGCA Ground Classes
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                To enroll in DGCA Ground Classes and begin your journey toward becoming a{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  Commercial Pilot
                </Link>, you must meet the following eligibility criteria:
              </p>
              <div className="space-y-4 mb-6">
                {eligibility.map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-av-blue p-4 flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="font-montserrat font-bold text-white text-sm">{item.title}</h4>
                    </div>
                    <div className="p-4 bg-white">
                      <ul className="space-y-1">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex gap-2 items-start text-xs text-gray-600">
                            <span className="text-av-orange font-bold flex-shrink-0">–</span>
                            {pt.includes('Commercial Pilot License (CPL)') ? (
                              <span>
                                {pt.split('Commercial Pilot License (CPL)')[0]}
                                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                                  Commercial Pilot License (CPL)
                                </Link>
                                {pt.split('Commercial Pilot License (CPL)')[1]}
                              </span>
                            ) : pt.includes('DGCA Class 2 Medical Certificate') ? (
                              <span>
                                {pt.split('DGCA Class 2 Medical Certificate')[0]}
                                <Link href="/dgca-class-2-class-1-medical" className="text-av-orange font-semibold hover:underline">
                                  DGCA Class 2 Medical Certificate
                                </Link>
                                {pt.split('DGCA Class 2 Medical Certificate')[1]}
                              </span>
                            ) : pt.includes('Class 1 Medical Certificate') ? (
                              <span>
                                {pt.split('Class 1 Medical Certificate')[0]}
                                <Link href="/dgca-class-2-class-1-medical" className="text-av-orange font-semibold hover:underline">
                                  Class 1 Medical Certificate
                                </Link>
                                {pt.split('Class 1 Medical Certificate')[1]}
                              </span>
                            ) : (
                              pt
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                If you meet these requirements, you're ready! Join us to begin your journey with We One Aviation Academy – Delhi's trusted name for DGCA Ground Classes and Pilot Training. Also read:{' '}
                <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold hover:underline">
                  CPL Eligibility Criteria
                </Link>.
              </p>

              {/* Why Choose */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Why Choose We One Aviation Academy For Dgca Ground Classes
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                We One Aviation Academy is Premier Pilot Training institute which Give You Flexibility in study and Fees Both. We are the only pilot training institute that delivers 100% results every year. There is More Reason for You to Join We One Aviation for Dgca Ground Classes.
              </p>
              <div className="space-y-3 mb-8">
                {whyChoose.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">{item.icon}</span>
                    <span>
                      <span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Book Seat CTA */}
              <div className="bg-av-blue rounded-2xl p-8 text-center mb-10">
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Book Your Seat Now</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                  We One Aviation Academy is the Only Academy in India Who give 100% Results Every Years in Dgca Exam. Join us and take the first step toward the skies! ✈️
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                >
                  Book Free Counselling For Pilot
                </Link>
              </div>

              {/* Latest Blogs */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Our Latest Blogs</h3>
              <div className="space-y-4 mb-10">
                {blogs.map((blog) => (
                  <div key={blog.title} className="rounded-xl border border-gray-100 p-5 hover:border-av-orange/30 transition-all">
                    <p className="text-gray-400 text-xs mb-1">{blog.date}</p>
                    <h4 className="font-montserrat font-bold text-av-blue text-sm mb-1">{blog.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-2">{blog.desc}</p>
                    <Link href={blog.href} className="text-av-orange text-xs font-semibold hover:underline">
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>

            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}>
              <LeadForm title="Join DGCA Ground Classes" />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-4">Eligibility Criteria</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>
                    <Link href="/commercial-pilot-license-eligibility" className="hover:text-av-orange transition-colors">
                      ✓ 10+2 with Physics &amp; Maths
                    </Link>
                  </li>
                  <li>✓ Minimum 17 years of age</li>
                  <li>
                    <Link href="/dgca-class-2-class-1-medical" className="hover:text-av-orange transition-colors">
                      ✓ DGCA Class 2 Medical
                    </Link>
                  </li>
                  <li>✓ English language proficiency</li>
                  <li>✓ Passion &amp; Dedication for aviation</li>
                </ul>
                <Link
                  href="/commercial-pilot-license-eligibility"
                  className="mt-4 block text-center text-xs text-av-orange font-semibold hover:underline"
                >
                  View Full CPL Eligibility →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                <p className="text-white/80 text-sm mb-3">All-inclusive DGCA Ground School:</p>
                <div className="text-2xl font-montserrat font-black">6 Months</div>
                <div className="text-white/70 text-xs mt-1">Full DGCA Syllabus Coverage</div>
                <div className="text-white/70 text-xs mt-1">25% Scholarship Available</div>
                <a
                  href="https://wa.me/919355611996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all"
                >
                  Get Free Counselling
                </a>
              </div>
            </ScrollReveal>

            {/* Quick Links Sidebar */}
            <ScrollReveal delay={500}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {sidebarQuickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-xs text-av-blue hover:text-av-orange transition-colors font-medium"
                      >
                        <span className="text-av-orange">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* DGCA Subjects Sidebar */}
            <ScrollReveal delay={600}>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-4">DGCA Subjects</h4>
                <ul className="space-y-2">
                  {subjects.map((s) => (
                    <li key={s.num}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-2 text-xs text-av-blue hover:text-av-orange transition-colors font-medium"
                      >
                        <span>{s.icon}</span>
                        {s.title}
                      </Link>
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