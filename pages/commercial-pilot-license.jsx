import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    tag: 'Most Popular Course',
    title: 'Commercial Pilot',
    highlight: 'License (CPL)',
    sub: "Fly for airlines – India's most comprehensive CPL training program",
  },
];

const syllabus = [
  {
    phase: 'Phase 1: Ground School',
    duration: '3-4 months',
    topics: ['Air Navigation', 'Meteorology', 'Air Regulations', 'Technical General', 'RTR (Radio Telephony)', 'Aviation Medicine'],
  },
  {
    phase: 'Phase 2: PPL Training',
    duration: '4-5 months',
    topics: ['Solo flights', 'Cross-country flying', 'Night flying', 'Basic instrument flying', 'Emergency procedures', 'PPL skill test'],
  },
  {
    phase: 'Phase 3: CPL Flying',
    duration: '8-10 months',
    topics: ['Instrument Rating (IR)', 'Multi-engine rating', 'Advanced navigation', 'CPL skill test', 'Type rating prep', 'Airline interview prep'],
  },
];

const eligibility = [
  { label: 'Age', desc: 'Candidate Must Be Atleast 18 Years For Getting Commercial Pilot License.' },
  { label: 'Education', desc: 'The qualifications to become a pilot include passing 12th grade with Mathematics and Physics.' },
  { label: 'Dgca Class 1-2 Medical', desc: 'The qualification of becoming a pilot requires the candidate to have no physical issues and to qualify for DGCA Class 1 and Class 2 medical examinations.' },
  { label: 'Total Flight Hours', desc: 'Candidate must have completed a minimum of 200 hours of flight time by DGCA.' },
  { label: 'Pilot-in-Command (PIC) Hours', desc: 'This should include 100 hours of flight time as Pilot-in-Command (PIC).' },
  { label: 'Instrument Flying Training', desc: 'At least 10 hours of instruction in flying with instruments is required.' },
  { label: 'Simulator Training', desc: '5 hours of training on a flight sim must be done.' },
  {
    label: 'Nationality & Language Proficiency',
    desc: 'The qualification required to become a pilot includes holding Indian citizenship or being an OCI. Candidates must also demonstrate proficiency in English, both written and verbal.',
  },
  { label: 'Background Check', desc: 'Candidates applying for commercial pilot training must have no history of crime.' },
];

const medicalChecks = [
  { icon: '👁️', title: 'Vision Test', desc: 'Checks distant and near vision (should be 6/6 with or without correction). Color blindness test using the Ishihara test.' },
  { icon: '🎧', title: 'Hearing Test', desc: 'Assesses hearing ability using Pure Tone Audiometry (PTA).' },
  { icon: '❤️', title: 'Cardiovascular Examination', desc: 'ECG (Electrocardiogram) to check heart function. Blood pressure monitoring.' },
  { icon: '🧠', title: 'Neurological Examination', desc: 'Evaluates reflexes, balance, and coordination. MRI or CT scan if necessary.' },
  { icon: '🩺', title: 'General Physical Check-up', desc: 'Height, weight, and BMI assessment. Examination of lungs, liver, kidney, and other vital organs.' },
  { icon: '🩸', title: 'Blood & Urine Tests', desc: 'Checks for diabetes, cholesterol, liver/kidney function, and infections.' },
  { icon: '🧠', title: 'Psychological & Mental Health Assessment', desc: 'Evaluates stress management and mental well-being.' },
];

const feeTable = [
  { num: 1, category: 'DGCA Class 2 Medical Test', cost: '₹3,000 – ₹6,000' },
  { num: 2, category: 'DGCA Class 1 Medical Test', cost: '₹5,000 – ₹10,000' },
  { num: 3, category: 'Computer Number Registration', cost: '₹2,000 – ₹2,500' },
  { num: 4, category: 'DGCA Exam Fees (per paper)', cost: '₹2,500 – ₹3,000' },
  { num: 5, category: 'CPL Ground School Fees', cost: '₹1,50,000 – ₹3,00,000' },
  { num: 6, category: 'Flying Training (200 hours)', cost: '₹35,00,000 – ₹45,00,000' },
  { num: 7, category: 'Simulator Training', cost: '₹2,00,000 – ₹5,00,000' },
  { num: 8, category: 'Flight School Admission Fees', cost: '₹1,00,000 – ₹2,00,000' },
  { num: 9, category: 'License Issuance & Other DGCA Fees', cost: '₹50,000 – ₹1,00,000' },
  { num: 10, category: 'Visa & Travel (If Training Abroad)', cost: '₹2,00,000 – ₹5,00,000' },
];

const howToGet = [
  {
    title: 'Choose a Right Ground Classes',
    desc: 'At First, You Have to Choose a Right Ground Classes Like We One Aviation Academy Which Gives You Advance Pilot Training and Support You Till You will Not Make Commercial air Pilot.',
  },
  {
    title: 'Prepare For Dgca Exam',
    desc: 'After Taking Admission in Dgca Ground Classes, You Have to Prepare Yourself For Dgca Exam for Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific and Radio Telephony (RTR).',
  },
  {
    title: 'Join Flight Training Academy',
    desc: 'After Clear Dgca Exam, You Have To Join Flight Training And Complete 200 Hrs of Flying From Any Flying Schools.',
  },
];

const prepTips = [
  'Attend ground classes regularly and use DGCA-approved study materials (e.g., books by authors like R.K. Bali or Oxford Aviation Academy manuals).',
  'Practice with past question papers and mock tests.',
  'Focus on understanding concepts rather than rote memorization, as questions can be application-based.',
];

const salaryData = [
  {
    level: 'Starting Salary (Beginners)',
    range: '₹1.5 – 3 Lakh/month',
    annual: '₹18 – 36 Lakh/year',
    desc: "If you're just starting out with a CPL, you might not earn a lot right away. In India, new pilots (called First Officers or Junior Pilots) can make around ₹1.5 lakh to ₹3 lakh per month. That's about ₹18 lakh to ₹36 lakh per year.",
  },
  {
    level: 'Mid-Level Salary (With Some Experience)',
    range: '₹5 – 10 Lakh/month',
    annual: '₹60 Lakh – 1.2 Crore/year',
    desc: 'After a few years of flying—say 4 to 10 years—your salary goes up. You might become a Senior First Officer or even a Captain. At this stage, pilots in India can earn between ₹5 lakh to ₹10 lakh per month.',
  },
  {
    level: 'Top-Level Salary (Senior Pilots)',
    range: '₹12 – 25 Lakh/month',
    annual: '₹1.5 Crore – 3 Crore/year',
    desc: "If you've been flying for a long time (over 10–20 years) and work for a big airline, Senior Captains flying big planes can earn ₹12 lakh to ₹25 lakh per month—or even more!",
  },
];

const perks = [
  'Free or cheap flights for themselves and their families.',
  'Health insurance and retirement plans.',
  'Hotel stays and travel allowances when they fly to other places.',
  'A fancy uniform and a job that feels adventurous!',
];

const careerOptions = [
  {
    num: '1', title: 'Airline Pilot', icon: '✈️',
    what: 'Fly big planes like Airbus or Boeing, taking people to their destinations safely.',
    where: 'Airlines like IndiGo, Air India, SpiceJet, Vistara, or international ones if you gain more experience.',
    growth: 'Start as a First Officer, and after years of flying (usually 5–10 years), you can become a Captain.',
    salary: 'Beginners earn ₹1.5 lakh to ₹3 lakh per month. Senior pilots can make ₹10 lakh or more monthly.',
  },
  {
    num: '2', title: 'Cargo Pilot', icon: '📦',
    what: 'Fly cargo planes for companies that deliver items across India or globally.',
    where: 'Companies like Blue Dart Aviation, Amazon Air, or logistics firms like FedEx and DHL.',
    growth: 'Fewer passengers mean less pressure, and you might fly at night or to unique places.',
    salary: 'Similar to airline pilots—₹2 lakh to ₹5 lakh per month to start, growing with experience.',
  },
  {
    num: '3', title: 'Charter Pilot', icon: '🛩️',
    what: "Fly smaller planes to places that big airlines don't go, like hill stations or private airstrips.",
    where: 'Private aviation companies, rich clients, or tourism agencies.',
    growth: 'You get to meet interesting people and visit offbeat locations.',
    salary: '₹1 lakh to ₹4 lakh per month, depending on demand and hours flown.',
  },
  {
    num: '4', title: 'Flight Instructor', icon: '🎓',
    what: 'Teach students how to fly planes and help them get their own CPL.',
    where: 'Flight schools like IGRUA, Bombay Flying Club, or private academies.',
    growth: "You build more flying hours while earning, and it's a stable job.",
    salary: '₹1 lakh to ₹3 lakh per month, plus extra hours can boost your income.',
  },
  {
    num: '5', title: 'Corporate Pilot', icon: '💼',
    what: 'Fly private jets or small planes for business leaders.',
    where: 'Large Indian companies like Reliance, Tata, or multinational firms.',
    growth: 'Fewer flights, more predictable schedules, and sometimes better pay.',
    salary: '₹2 lakh to ₹6 lakh per month, depending on the company.',
  },
  {
    num: '6', title: 'Agricultural Pilot', icon: '🌾',
    what: 'Fly small planes to spray crops with water, fertilizers, or pesticides.',
    where: 'Rural areas or companies that support farmers.',
    growth: 'You fly low and help grow food for the country!',
    salary: '₹1 lakh to ₹2.5 lakh per month.',
  },
  {
    num: '7', title: 'Aerial Survey Pilot', icon: '🛰️',
    what: 'Fly over areas to collect data for maps, construction, or research.',
    where: 'Government projects, survey companies, or environmental groups.',
    growth: 'You contribute to science and planning.',
    salary: '₹1.5 lakh to ₹4 lakh per month.',
  },
  {
    num: '8', title: 'Emergency Services Pilot (Air Ambulance)', icon: '🚑',
    what: 'Transport sick or injured people to hospitals quickly.',
    where: 'Hospitals, NGOs, or private ambulance services.',
    growth: 'You help people in need.',
    salary: '₹2 lakh to ₹5 lakh per month.',
  },
];

// ─── Quick Fact Card ───────────────────────────────────────────────────────────
function QuickFact({ val, label }) {
  return (
    <div className="bg-av-light rounded-xl p-3 text-center">
      <div className="font-montserrat font-bold text-av-blue text-xs leading-snug">{val}</div>
      <div className="text-gray-500 text-[10px] mt-1">{label}</div>
    </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner({ title, body, linkHref, linkLabel }) {
  return (
    <div className="bg-av-blue rounded-2xl p-5 sm:p-8 text-center my-8 sm:my-10">
      <h3 className="font-montserrat text-base sm:text-xl font-bold text-white mb-3 leading-snug">{title}</h3>
      <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-3">{body}</p>
      <p className="text-white/60 text-xs sm:text-sm mb-5">Join us and take the first step toward the skies! ✈️</p>
      <Link
        href={linkHref}
        className="inline-block bg-av-orange text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-xs sm:text-sm"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export default function CPL() {
  return (
    <Layout
      title="Commercial Pilot License (CPL) Training in India | WeOne Aviation"
      description="DGCA approved CPL training in India. Become a commercial pilot with WeOne Aviation Academy. Expert instructors, modern aircraft, 100% placement support."
    >
      <HeroSlider customSlides={heroSlides} />

      {/* ── Page body ── */}
      <section className="py-8 px-3 sm:px-4 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto">

          {/*
            Layout grid:
            • xs–md  : single column, sidebar rendered FIRST (order-first) so lead form
                       appears near the top on mobile.
            • lg+    : 2/3 main content | 1/3 sticky sidebar
          */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

            {/* ══════════════ SIDEBAR ══════════════ */}
            {/*
              - On mobile/tablet it sits ABOVE the main copy (order-first).
              - On lg it moves to the right column and sticks.
            */}
            <aside className="order-first lg:order-none lg:col-span-1 space-y-5 sm:space-y-6 lg:self-start lg:sticky lg:top-24">
              <ScrollReveal delay={200}>
                <LeadForm title="Apply for CPL" />
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-av-blue rounded-2xl p-5 sm:p-6 text-white">
                  <h4 className="font-montserrat font-bold mb-4 text-sm sm:text-base">Eligibility Criteria</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                    <li>✓ 10+2 with Physics &amp; Maths</li>
                    <li>✓ Minimum 17 years of age</li>
                    <li>✓ DGCA Medical Class 1</li>
                    <li>✓ English language proficiency</li>
                    <li>✓ Valid passport (for intl. training)</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-av-orange rounded-2xl p-5 sm:p-6 text-white">
                  <h4 className="font-montserrat font-bold mb-2 text-sm sm:text-base">Career After CPL</h4>
                  <p className="text-white/80 text-xs sm:text-sm mb-3">Average starting salary for First Officers:</p>
                  <div className="text-2xl sm:text-3xl font-montserrat font-black">₹1.8 – 2.5 LPM</div>
                  <div className="text-white/70 text-[11px] sm:text-xs mt-1">Senior Captain: ₹5–8 LPM</div>
                  <a
                    href="https://wa.me/919355611996"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-xs sm:text-sm hover:bg-gray-100 transition-all"
                  >
                    Get Career Counselling
                  </a>
                </div>
              </ScrollReveal>
            </aside>

            {/* ══════════════ MAIN CONTENT ══════════════ */}
            <main className="lg:col-span-2 min-w-0">
              <ScrollReveal>

                {/* ── Overview ── */}
                <div className="section-tag">CPL Program</div>
                <h2 className="font-montserrat text-xl sm:text-3xl font-bold text-av-blue mb-3 sm:mb-4 underline-orange leading-tight">
                  Commercial Pilot License (CPL) Training
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3 text-xs sm:text-sm">
                  The Commercial Pilot License (CPL) is the gateway to an airline career. Our DGCA-approved CPL program is
                  designed to take you from ground school to the cockpit of a commercial aircraft. With 500+ hours of
                  combined ground and flight training, you'll be fully prepared for airline interviews and line flying.
                </p>
                <p className="text-gray-600 leading-relaxed mb-5 sm:mb-6 text-xs sm:text-sm">
                  We offer training in India as well as international options in the USA, Canada, and Australia. Our
                  experienced flight instructors ensure every student meets ICAO standards and DGCA requirements.
                </p>

                {/* Quick Facts — 2 cols always, 4 on sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-7 sm:mb-8">
                  <QuickFact val="18–24 months" label="Duration" />
                  <QuickFact val="200 hours" label="Min Flight Hours" />
                  <QuickFact val="10+2 PCM" label="Eligibility" />
                  <QuickFact val="₹40–70 Lakh" label="Course Fee" />
                </div>

                {/* ── Syllabus ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-3 sm:mb-5">
                  Training Syllabus
                </h3>
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  {syllabus.map((phase) => (
                    <div key={phase.phase} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between bg-av-blue p-3 sm:p-4 gap-2">
                        <h4 className="font-montserrat font-bold text-white text-[11px] sm:text-sm leading-snug">
                          {phase.phase}
                        </h4>
                        <span className="text-av-orange text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                          {phase.duration}
                        </span>
                      </div>
                      {/* Topics: 1 col on xs, 2 on sm, 3 on md */}
                      <div className="p-3 sm:p-4 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
                        {phase.topics.map((t) => (
                          <div key={t} className="flex items-start gap-1.5 text-gray-600 text-[11px] sm:text-xs">
                            <span className="text-av-orange flex-shrink-0 leading-tight">▸</span>
                            <span className="leading-snug">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Eligibility ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-3 sm:mb-5">
                  Eligibility Criteria
                </h3>
                <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
                  {eligibility.map((item) => (
                    <li key={item.label} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600">
                      <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span>
                        <span className="font-semibold text-av-blue">{item.label} –</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ── CPL Fees ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-2">
                  Commercial Pilot Course (CPL) Fees in India
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  Cost to become a pilot in India depends on flying schools from where you will do flying. Below is a
                  breakdown of all CPL course fees from classes to cockpit.
                </p>

                {/* DGCA Medical */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  1) DGCA Class 1-2 Medical Test
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  At first you have to clear DGCA Class 1-2 Medical from any DGCA Medical Doctor. Doctors check the
                  candidate's health to ensure they meet the physical and mental fitness standards required for flying.
                </p>

                {/* Medical checks: 1 col xs, 2 col sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                  {medicalChecks.map((check) => (
                    <div key={check.title} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600">
                      <span className="flex-shrink-0 text-base">{check.icon}</span>
                      <span className="leading-snug">
                        <span className="font-semibold text-av-blue">{check.title}: </span>
                        {check.desc}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  💰 <span className="font-semibold text-av-blue">DGCA Medical Fees (Approximate):</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Class 1 Medical: ₹5,000 – ₹10,000</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">Class 2 Medical: ₹3,000 – ₹6,000</p>

                {/* DGCA Exam */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  2) DGCA CPL Exams and Fees
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2">
                  You have to give 6 papers of the DGCA Exam. There are two processes: Regular Exam (4 times a year)
                  and On-Demand Exam (flexible, as per candidate's choice).
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  Regular DGCA Exam fees: ₹2,500/subject · On-Demand DGCA Exam fees: ₹5,000/paper.
                </p>

                {/* Ground Classes */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  3) DGCA Ground Classes
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2">
                  The right ground classes help you crack the DGCA Exam quickly with proper guidance.
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  Average fees of DGCA Ground Classes: ₹2.5 Lakh.
                </p>

                {/* Flying Training */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  4) Flying Training Duration and Fees
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  The CPL course takes around 8–10 months to complete. It includes 80 hours of classroom sessions and
                  200 hours of training, covering Simulator Training and Flying Training. Most flying schools charge on
                  an hourly basis. Candidates must have around ₹40 lakh ready for flying before joining a flight school.
                </p>

                {/* Fee Table — horizontally scrollable on small screens */}
                <p className="text-xs sm:text-sm font-semibold text-av-blue mb-3">
                  CPL Course Fees Breakdown (India):
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200 mb-2 w-full">
                  <table className="w-full text-xs min-w-[340px]">
                    <thead>
                      <tr className="bg-av-blue text-white">
                        <th className="p-2 sm:p-3 text-left font-semibold w-7 sm:w-8">#</th>
                        <th className="p-2 sm:p-3 text-left font-semibold">Expense Category</th>
                        <th className="p-2 sm:p-3 text-left font-semibold whitespace-nowrap">Approx Cost (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeTable.map((row, i) => (
                        <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-2 sm:p-3 text-gray-500">{row.num}</td>
                          <td className="p-2 sm:p-3 text-gray-700 leading-snug">{row.category}</td>
                          <td className="p-2 sm:p-3 text-av-orange font-semibold whitespace-nowrap">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-av-blue">
                        <td colSpan={2} className="p-2 sm:p-3 text-white font-bold text-xs sm:text-sm">
                          Total Estimated CPL Fees in India
                        </td>
                        <td className="p-2 sm:p-3 text-av-orange font-black text-xs sm:text-sm whitespace-nowrap">
                          ₹40L – ₹50L
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-6 sm:mb-8">
                  * May vary depending on the flight school and location.
                </p>

                {/* CTA 1 */}
                <CTABanner
                  title="Start Your Pilot Journey With We One Aviation Academy"
                  body="We One Aviation Academy is a premier pilot training institute dedicated to shaping future aviators. We offer world-class DGCA ground classes, commercial pilot training, and aviation courses designed to help you achieve your dream of flying."
                  linkHref="/contact"
                  linkLabel="Join Now"
                />

                {/* ── How to Get CPL ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-3 sm:mb-5">
                  How to Get a Commercial Pilot License in India
                </h3>
                <ol className="space-y-3 mb-6 sm:mb-8">
                  {howToGet.map((item, i) => (
                    <li key={item.title} className="flex gap-2.5 sm:gap-3 items-start text-xs sm:text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-snug">
                        <span className="font-semibold text-av-blue">{item.title} – </span>
                        {item.desc}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Prep Tips */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  Preparation Tips For DGCA Exam
                </h4>
                <ul className="space-y-2 mb-8 sm:mb-10">
                  {prepTips.map((tip, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600">
                      <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">–</span>
                      <span className="leading-snug">{tip}</span>
                    </li>
                  ))}
                </ul>

                {/* ── Salary ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-2">
                  Commercial Pilot License Salary
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  The salary of a commercial pilot depends on experience, employer, and aircraft type. Here's a step-by-step breakdown:
                </p>

                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  {salaryData.map((s) => (
                    <div key={s.level} className="rounded-xl border border-gray-100 overflow-hidden">
                      <div className="bg-av-blue p-3 sm:p-4 flex flex-wrap items-start sm:items-center justify-between gap-1 sm:gap-2">
                        <h4 className="font-montserrat font-bold text-white text-[11px] sm:text-sm leading-snug">
                          {s.level}
                        </h4>
                        <span className="text-av-orange font-bold text-[11px] sm:text-xs whitespace-nowrap">
                          {s.range}
                        </span>
                      </div>
                      <div className="p-3 sm:p-4 bg-white">
                        <p className="text-av-orange text-[11px] sm:text-xs font-semibold mb-1">{s.annual}</p>
                        <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Perks */}
                <h4 className="font-montserrat font-bold text-av-blue mb-2 sm:mb-3 text-xs sm:text-sm">
                  Extra Benefits Pilots Get
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">Besides the salary, pilots get some cool perks:</p>
                <ul className="space-y-2 mb-8 sm:mb-10">
                  {perks.map((perk, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600">
                      <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span className="leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* ── Career Opportunities ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-2">
                  Career Opportunities for CPL Holders in India
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  Getting a CPL in India opens the door to many exciting roles in aviation. Here's a look at the career
                  paths available to you.
                </p>

                {/* Career cards: 1 col on xs–sm, 2 col on md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {careerOptions.map((c) => (
                    <div key={c.num} className="rounded-xl border border-gray-100 p-3 sm:p-5">
                      <h4 className="font-montserrat font-bold text-av-blue mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm leading-snug">
                        <span className="text-base sm:text-lg">{c.icon}</span>
                        {c.num}. {c.title}
                      </h4>
                      <ul className="space-y-1 text-[11px] sm:text-xs text-gray-600">
                        <li className="leading-snug">
                          <span className="font-semibold text-av-blue">What You Do: </span>{c.what}
                        </li>
                        <li className="leading-snug">
                          <span className="font-semibold text-av-blue">Where You Work: </span>{c.where}
                        </li>
                        <li className="leading-snug">
                          <span className="font-semibold text-av-blue">Growth/Perks: </span>{c.growth}
                        </li>
                        <li className="text-av-orange font-semibold leading-snug">Salary: {c.salary}</li>
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA 2 */}
                <CTABanner
                  title="Start Your Commercial Flight Training With We One Aviation Academy"
                  body="We One Aviation Academy is a premier pilot training institute dedicated to shaping future aviators. We offer Ground Classes to Flight Training. Our budget-friendly ground classes help lots of people become a pilot."
                  linkHref="/flying-school"
                  linkLabel="Join Flight Training Now"
                />

                {/* ── Student Reviews ── */}
                <h3 className="font-montserrat text-base sm:text-xl font-bold text-av-blue mb-2">
                  Our Commercial Pilot Students Reviews
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Here are some of our students who became pilots through our academy and are now successful pilots in airlines.
                </p>

              </ScrollReveal>
            </main>

          </div>{/* /grid */}
        </div>
      </section>
    </Layout>
  );
}