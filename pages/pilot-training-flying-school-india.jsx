import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { ACADEMY } from '../lib/facts';
import { generateFAQSchema } from '../lib/schema';

const canonicalUrl = 'https://weoneaviation.in/pilot-training-flying-school-india/';

const roadmapSteps = [
  {
    num: '1',
    title: '10+2 Qualification (Physics & Math)',
    text: 'Aspiring pilots usually begin by completing Class 12 with Physics and Mathematics. Students who did not take these subjects can still qualify by clearing them through a recognised open-school route, such as NIOS.',
  },
  {
    num: '2',
    title: 'DGCA Computer Number',
    text: 'A DGCA computer number is required before appearing for written exams and taking the next step in the licensing pathway. This is issued through the official DGCA-linked application process.',
  },
  {
    num: '3',
    title: 'Medical Examinations (Class 2 & Class 1)',
    text: 'Medical fitness is mandatory in the CPL pathway. Candidates typically complete Class 2 medical examinations before training and may later meet the stricter Class 1 requirement for licence issue.',
  },
  {
    num: '4',
    title: 'DGCA Written Exams (Ground School)',
    text: 'Before moving to flight training, aspirants prepare for the DGCA written papers covering Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific, plus RTR (A) preparation.',
  },
  {
    num: '5',
    title: '200 Hours Flying Training (Partner FTO)',
    text: 'The practical flying stage is completed at a DGCA-approved flying training organisation. This phase includes dual training, solo flying, navigation, instrument work and other requirements under the selected FTO.',
  },
  {
    num: '6',
    title: 'Commercial Pilot Licence (CPL) Issued',
    text: 'After examinations, medical fitness, required flight hours, and the relevant checks are completed, the DGCA can issue the Commercial Pilot Licence (CPL).',
  },
];

const eligibilityRows = [
  ['Education', '10+2 or equivalent with Physics and Mathematics from a recognised Board or University.'],
  ['Alternative route', 'Students from a non-physics / non-maths background can still qualify by clearing Physics and Mathematics through NIOS or an equivalent recognised open-school route.'],
  ['Age', 'Minimum age is 16 to obtain a Student Pilot Licence; 18 is required for CPL issue.'],
  ['Medical', 'Candidates must meet DGCA medical fitness requirements and complete Class 2 and Class 1 medical evaluations as required by the pathway.'],
  ['English', 'Applicants should have the ability to read, write, speak and understand English, which is essential for flight operations and radio communication.'],
  ['Exams', 'Candidates must clear the DGCA written examinations and complete the required flying training and licence process.'],
];

const groundSubjects = [
  {
    title: 'Air Navigation',
    text: 'Air Navigation covers flight planning, route guidance, radio aids, position fixing, maps and navigational calculations used during normal and instrument operations.',
  },
  {
    title: 'Aviation Meteorology',
    text: 'Aviation Meteorology helps students understand weather systems, clouds, winds, pressure, visibility and how weather conditions affect flight planning and safety.',
  },
  {
    title: 'Air Regulations',
    text: 'Air Regulations covers the rules of the air, licensing requirements, operational procedures, airspace structure and the legal framework governing aviation activity.',
  },
  {
    title: 'Technical General',
    text: 'Technical General introduces aircraft systems, engines, structures and fundamentals that help pilots understand how aircraft operate and perform.',
  },
  {
    title: 'Technical Specific',
    text: 'Technical Specific focuses on the aircraft type or system details relevant to the selected training and licence pathway.',
  },
  {
    title: 'RTR (A) – Radio Telephony Restricted',
    text: 'RTR (A) preparation focuses on aeronautical communication, phraseology, radio procedures and the confidence needed for safe ATC interaction.',
  },
];

const feeRows = [
  ['DGCA Ground Classes', 'Varies by course format, duration and coaching package. Current terms should be confirmed in writing before enrolling.'],
  ['Medical Examinations', 'Medical assessments are separate and depend on the exam centre, medical category and appointment scheduling.'],
  ['200 Hours Flying', 'This is the largest training element and depends on chosen FTO, aircraft availability, weather conditions and total time flown.'],
  ['DGCA Exam & License Fees', 'Examination, application and licence-related charges are separate and should be checked with the current DGCA process before making payment.'],
  ['Type Rating (Post-CPL Optional)', 'Type rating is a separate post-CPL training step for airline operating on a specific aircraft type and is not included in the basic CPL training route.'],
];

const durationStages = [
  {
    title: 'Foundation and paperwork',
    detail: 'Begin with Class 12 eligibility, DGCA computer number application, and the medical process. This part is usually early and can shape the rest of the timeline.',
  },
  {
    title: 'Ground school',
    detail: 'Students prepare for DGCA written exams and RTR (A), which are essential academic milestones before the flight stage.',
  },
  {
    title: 'Flying training',
    detail: 'The practical stage depends on aircraft availability, weather, runway access, and the selected FTO schedule. These factors can change the completion date.',
  },
  {
    title: 'Licence issue and onward aviation training',
    detail: 'Once the required flight hours and checks are complete, the CPL can be issued and the next stage may include airline preparation or a type rating.',
  },
];

const comparisonRows = [
  ['Structure', 'Cadet programs are usually structured and airline-linked; conventional CPL training is more independent and student-led.', 'Conventional CPL is usually flexible and chosen by students who want to manage their own training path.'],
  ['Cost', 'Cadet programs often involve a higher upfront cost and a more defined training package.', 'Conventional CPL lets students compare schools, aircraft and training costs in a more open-market approach.'],
  ['Selection', 'Cadet programs typically involve airline or sponsor selection before or during training.', 'Conventional CPL usually does not depend on a single airline pipeline or selection batch.'],
  ['Flexibility', 'Cadet programs are more structured and may be less flexible if a student wants to change the path mid-training.', 'Conventional CPL allows more choice over flying school, timeline and sequencing.'],
];

const academyTips = [
  'Check the programme structure and whether it is theoretical-only coaching, flight-training guidance, or a broader career pathway.',
  'Review the academy’s claimed role carefully: DGCA ground classes and exam preparation are separate from the practical flying phase carried out at an approved FTO.',
  'Confirm the selected FTO, availability of aircraft, training schedule, weather restrictions and the actual cost breakdown in writing before making a payment.',
  'Confirm the training route, medical process and current DGCA rules directly with the relevant examiners and training organisations, rather than relying on assumptions or outdated information.',
];

const whyChooseUs = [
  {
    title: 'Ground school focus',
    text: 'We One Aviation provides DGCA ground-subject preparation and exam support for students preparing for the written papers and relevant aviation theory stages.',
  },
  {
    title: 'RTR (A) preparation',
    text: 'Students can prepare for radio telephony communication and aeronautical phraseology in a structured way alongside the main ground-subject preparation.',
  },
  {
    title: 'FTO guidance',
    text: 'The academy helps students understand the practical flight-training journey and how to evaluate suitable flying training organisations.',
  },
  {
    title: 'Career direction',
    text: 'Students can receive guidance around airline pathways, cadet opportunities and the practical route from theory training to licence issue and beyond.',
  },
];

const faqItems = [
  {
    q: 'What is the first step to becoming a pilot in India?',
    a: 'The typical route starts with Class 12 with Physics and Mathematics, followed by the DGCA computer number, medical requirements, ground school, flight training and the CPL application process.',
  },
  {
    q: 'Do I need Physics and Maths after Class 12?',
    a: 'Yes, for the standard CPL pathway, Physics and Mathematics are required. Students who did not study them can still qualify by clearing the subjects through a recognised open-school route such as NIOS.',
  },
  {
    q: 'What subjects are covered in DGCA ground classes?',
    a: 'The main written papers are Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific, with RTR (A) preparation handled separately from the written papers.',
  },
  {
    q: 'How long does pilot training take?',
    a: 'The full route varies by the individual’s progress and the selected FTO. In practice, the pathway can take around 18 to 24 months or longer depending on weather, aircraft availability, exam timing, and training pace.',
  },
  {
    q: 'Does We One Aviation operate a flying school?',
    a: 'No. We One Aviation teaches DGCA ground subjects and supports students with guidance on FTO selection. Flight training is carried out through a suitable approved flying training organisation, not in the academy classroom.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training in India: Courses, Eligibility, Fees & CPL Roadmap',
  description: 'Complete guide to pilot training in India, including CPL eligibility after Class 12, DGCA ground classes, costs, training duration, cadet versus conventional pathways, and how We One Aviation supports students.',
  mainEntityOfPage: canonicalUrl,
  author: {
    '@type': 'Organization',
    name: 'We One Aviation',
    url: 'https://weoneaviation.in/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'We One Aviation',
    url: 'https://weoneaviation.in/',
  },
  inLanguage: 'en-IN',
  dateModified: '2026-10-14',
  image: `${ACADEMY.url}/Logo.webp`,
};

const headingClass = 'mb-4 font-montserrat text-2xl font-bold text-av-blue';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';
const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

export default function PilotTrainingFlyingSchoolIndia() {
  return (
    <Layout
      title="Pilot Training in India: Courses, Eligibility, Fees & CPL Roadmap | We One Aviation"
      description="Comprehensive guide to pilot training in India. Learn CPL eligibility after 12th, DGCA ground classes, flight training costs, timelines, and career steps with We One Aviation."
      canonical={canonicalUrl}
      includeDefaultFAQs={false}
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqItems)]} />

      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 pb-16 pt-28 text-white sm:pt-36 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-av-orange">Pilot training in India</p>
          <h1 className="mb-5 max-w-3xl font-montserrat text-3xl font-black leading-tight md:text-5xl xl:max-w-4xl">
            Pilot Training in India: Courses, Eligibility, Fees & CPL Roadmap
          </h1>
          <p className="max-w-3xl text-base leading-7 text-white/80">
            Pilot training in India follows a clear series of academic, medical and flight-training steps. Students begin with the academic requirements, move into DGCA ground preparation, then complete the flying stage at an approved flying training organisation before applying for the Commercial Pilot Licence.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">
            We One Aviation supports students with DGCA ground classes, RTR (A) preparation, career guidance and practical advice on choosing the right FTO. The academy does not operate a flying school or aircraft fleet, and practical flying is carried out through a suitable approved partner organisation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
              Contact the academy
            </Link>
            <Link href="/dgca-ground-classes" className="inline-flex rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
              View DGCA ground classes
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:py-16">
        <section>
          <h2 className={headingClass}>How to Become a Pilot in India</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roadmapSteps.map((step) => (
              <article key={step.num} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-av-orange/15 font-bold text-av-blue">
                  {step.num}
                </div>
                <h3 className="mb-2 text-lg font-bold text-av-blue">{step.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className={headingClass}>Pilot Training Eligibility After Class 12</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
              <thead className="bg-white text-av-blue">
                <tr>
                  <th className="px-5 py-4 font-bold">Criteria</th>
                  <th className="px-5 py-4 font-bold">Requirement</th>
                </tr>
              </thead>
              <tbody>
                {eligibilityRows.map(([criteria, requirement], index) => (
                  <tr key={criteria} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-t border-gray-200 px-5 py-4 font-semibold text-av-blue align-top">{criteria}</td>
                    <td className="border-t border-gray-200 px-5 py-4 leading-6 align-top">{requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className={headingClass}>Commercial Pilot Licence (CPL) Pathway</h2>
          <p className={paragraphClass}>
            A Commercial Pilot Licence pathway in India combines academic readiness, DGCA written-paper preparation, medical fitness, and successful completion of the required flight training. The practical flying stage is separate from the academy’s classroom-based theory coaching and must be completed at an approved flying training organisation.
          </p>
          <p className={paragraphClass}>
            Ground preparation covers the written papers and related aviation theory. Flight training is then completed under the chosen FTO, where students build the required 200 hours, meet the relevant aircraft and operational requirements, and complete the checks required before CPL issuance.
          </p>
          <div className="rounded-2xl border-l-4 border-av-orange bg-orange-50 p-5 text-sm leading-7 text-gray-700">
            <strong className="text-av-blue">Important Distinction:</strong> We One Aviation focuses on DGCA ground classes, RTR (A) guidance, exam preparation and student counselling. Practical flying and aircraft-based training happen through the selected partner FTO and are not delivered in the academy classroom.
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/commercial-pilot-license" className={linkClass}>See the CPL pathway page</Link>
            <Link href="/courses" className={linkClass}>View available training routes</Link>
          </div>
        </section>

        <section>
          <h2 className={headingClass}>DGCA Ground Classes and Exam Preparation</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {groundSubjects.map((subject) => (
              <article key={subject.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-av-blue">{subject.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{subject.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-gray-600">
            We One Aviation provides guidance for these subjects and related exam preparation. Students can also review the academy’s dedicated ground-class page: <Link href="/dgca-ground-classes" className={linkClass}>DGCA ground classes</Link>.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className={headingClass}>Pilot Training Fees in India</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
              <thead className="bg-white text-av-blue">
                <tr>
                  <th className="px-5 py-4 font-bold">Category</th>
                  <th className="px-5 py-4 font-bold">Typical expenditure range / note</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map(([label, value], index) => (
                  <tr key={label} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-t border-gray-200 px-5 py-4 font-semibold text-av-blue align-top">{label}</td>
                    <td className="border-t border-gray-200 px-5 py-4 leading-6 align-top">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 pb-5 pt-4 text-xs leading-6 text-gray-600">
            Fee amounts vary by provider, aircraft availability, weather delays and the selected route. Confirm all current charges in writing before paying any deposit or making a scheduling commitment.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>How Long Does Pilot Training Take?</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {durationStages.map((stage) => (
              <article key={stage.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-av-blue">{stage.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{stage.detail}</p>
              </article>
            ))}
          </div>
          <p className={paragraphClass}>
            Student timelines are influenced by exam schedule, weather conditions, aircraft maintenance, runway availability and training pace. A realistic estimate depends on how quickly the student completes each stage and how consistently the chosen FTO can schedule flying hours.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className={headingClass}>Cadet Pilot Programs vs. Conventional CPL</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
              <thead className="bg-white text-av-blue">
                <tr>
                  <th className="px-5 py-4 font-bold">Comparison point</th>
                  <th className="px-5 py-4 font-bold">Cadet pilot program</th>
                  <th className="px-5 py-4 font-bold">Conventional CPL</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([point, cadet, conventional], index) => (
                  <tr key={point} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-t border-gray-200 px-5 py-4 font-semibold text-av-blue align-top">{point}</td>
                    <td className="border-t border-gray-200 px-5 py-4 leading-6 align-top">{cadet}</td>
                    <td className="border-t border-gray-200 px-5 py-4 leading-6 align-top">{conventional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 pb-5 pt-4 text-sm leading-7 text-gray-600">
            For students exploring the broader training landscape, <Link href="/courses" className={linkClass}>see current course pathways</Link> before deciding the route that best matches your budget, timeline and goals.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>How to Choose an Aviation Training Academy</h2>
          <ol className="space-y-4">
            {academyTips.map((tip, index) => (
              <li key={tip} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-av-blue text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-gray-600">{tip}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className={headingClass}>Why Choose We One Aviation?</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-av-blue">{item.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className={headingClass}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm" open={q === 'What is the first step to becoming a pilot in India?'}>
                <summary className="cursor-pointer list-none font-semibold text-av-blue">{q}</summary>
                <p className="mt-3 text-sm leading-6 text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
