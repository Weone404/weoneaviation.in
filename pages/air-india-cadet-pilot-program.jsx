import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import StructuredData from '../components/StructuredData';
import { generateFAQSchema } from '../lib/schema';

const faqItems = [
  { q: 'What is the minimum age for the Air India Cadet Pilot Programme?', a: 'Programme information referenced by this guide listed an age range of 18 to 30 years, but that figure could not be verified for a current intake. Check the official application conditions for the applicable age calculation date.' },
  { q: 'Can Commerce or Arts students apply for the Air India Cadet Pilot Programme?', a: 'Students who did not study Physics and Mathematics in Class 12 may be able to meet subject requirements through NIOS, but this route could not be confirmed against current Air India criteria. Verify eligibility with Air India before enrolling in additional subjects.' },
  { q: 'Is previous flying experience required?', a: 'No. The programme is designed for candidates without previous flying experience.' },
  { q: 'What is the minimum percentage required in Class 12?', a: 'Programme information referenced by this guide listed 60% overall and 60% individually in English, Physics and Mathematics. Those figures could not be verified for a current intake; confirm the latest conditions directly with Air India.' },
  { q: 'What is the total fee for the Air India Cadet Pilot Programme?', a: 'A current official total fee could not be verified for this guide. Request an intake-specific written cost breakdown, including any flying-hour, accommodation, travel, medical and type-rating charges.' },
  { q: 'How long does the Air India Cadet Pilot Programme take?', a: 'A current official duration could not be verified for this guide. Ask Air India for the expected timeline for the intake you are considering; actual completion can vary with training progress and operations.' },
  { q: 'Is a DGCA Class 1 medical certificate required?', a: 'Yes. Candidates must obtain the required medical clearance before commencing the relevant flight-training stage.' },
  { q: 'Where do Air India cadets complete their flying training?', a: 'The assigned provider and location may vary by intake. Confirm the school, training location and applicable terms directly with Air India before making travel or financial arrangements.' },
  { q: 'Can students complete DGCA ground classes before applying?', a: 'Students can begin developing their DGCA subject knowledge independently of the airline selection process. However, they should check Air India\'s current programme requirements before deciding which examinations or courses to complete.' },
  { q: 'Does selection guarantee a pilot job with Air India?', a: 'Candidates should carefully read the written programme terms to understand the commitments involved. Selection into training should not automatically be interpreted as an unconditional guarantee of employment.' },
  { q: 'Can I prepare for the Air India selection process at We One Aviation?', a: 'We One Aviation provides DGCA ground-subject preparation and aviation career guidance. Students can contact the academy to understand available classes and preparation options. Air India independently manages its cadet selection and recruitment.' },
  { q: 'Where can I apply for the Air India Cadet Pilot Programme?', a: 'Applications and current programme information are available through Air India\'s official cadet pilot website: https://cadetpilot.airindia.com/' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Air India Cadet Pilot Program 2026: Eligibility, Fees, Selection Process and Training Guide',
  description: 'Learn about the Air India Cadet Pilot Program 2026, including eligibility, fees, selection process, training, DGCA requirements and career opportunities.',
  image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&h=630&q=80',
  inLanguage: 'en-IN',
  datePublished: '2026-11-02',
  dateModified: '2026-11-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://weoneaviation.in/air-india-cadet-pilot-program' },
  author: { '@type': 'Organization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in/' },
  publisher: { '@type': 'Organization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in/' },
};

const toc = [
  { id: 'what-is-it', label: 'What Is the Air India Cadet Pilot Program?' },
  { id: 'eligibility-criteria', label: 'Eligibility Criteria 2026' },
  { id: 'fees', label: 'Fees in 2026' },
  { id: 'training-structure', label: 'Training Structure and Duration' },
  { id: 'training-locations', label: 'Training Locations' },
  { id: 'selection-process', label: 'Selection Process' },
  { id: 'apply', label: 'How to Apply' },
  { id: 'vs-cpl', label: 'Cadet Programme vs Conventional CPL' },
  { id: 'after-completion', label: 'After Completing the Programme' },
  { id: 'is-it-right', label: 'Is It Right for You?' },
  { id: 'faqs', label: 'FAQs' },
];

const relatedArticles = [
  { href: '/cadet-pilot-program', title: 'Cadet Pilot Programmes in India' },
  { href: '/commercial-pilot-license', title: 'Commercial Pilot Licence (CPL)' },
  { href: '/pilot-training-in-india', title: 'Pilot Training in India' },
  { href: '/dgca-ground-classes', title: 'DGCA Ground Classes' },
  { href: '/how-to-become-a-pilot-after-12th', title: 'How to Become a Pilot After 12th' },
  { href: '/blogs/dgca-exam-guide', title: 'DGCA Exam Guide' },
];

const comparisonRows = [
  ['Entry process', 'Airline selection', 'Independent enrolment'],
  ['Training arrangement', 'Programme-defined', 'Student-selected flying school'],
  ['Training sequence', 'Structured by the programme', 'Planned by the student and providers'],
  ['Flying location', 'Assigned training facility', 'Selected flying school'],
  ['Financial arrangement', 'Programme-specific payment terms', 'Depends on the chosen providers'],
  ['Airline involvement', 'Airline involved from the selection stage', 'Airline recruitment usually comes later'],
  ['Career outcome', 'Subject to programme terms and airline requirements', 'Depends on licence, experience and recruitment'],
];

export default function AirIndiaCadetPilotProgramPage() {
  return (
    <Layout
      title="Air India Cadet Pilot Program 2026: Eligibility & Fees"
      description="Explore the Air India Cadet Pilot Program 2026, including eligibility, fees, selection process, training duration, medical requirements and application steps."
      canonical="https://weoneaviation.in/air-india-cadet-pilot-program"
      includeDefaultFAQs={false}
      breadcrumbOverride={[
        { href: '/pilot-training-in-india', label: 'Pilot Training' },
        { href: '/air-india-cadet-pilot-program', label: 'Air India Cadet Pilot Program' },
      ]}
      socialImage={articleSchema.image}
      socialImageAlt="Commercial passenger aircraft flying above the clouds"
    >
      <StructuredData data={[articleSchema, generateFAQSchema(faqItems)]} />

      <div className="air-india-page">
        <header className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content container">
            <div className="hero-copy">
              <span className="eyebrow">Pilot training guide</span>
              <h1>Air India Cadet Pilot Program 2026: Eligibility, Fees, Selection Process and Complete Training Guide</h1>
              <p>
                A structured pathway for students who want to move toward a career with Air India,
                while understanding the eligibility, medical, training and financial commitments involved.
              </p>
              <div className="meta-row">
                <span>Last updated: Nov 2, 2026</span>
                <span>Estimated reading time: 9 min</span>
                <span>Category: Cadet pilot programmes</span>
              </div>
              <div className="hero-cta-row">
                <a href="#eligibility-criteria" className="primary-btn">Check eligibility</a>
                <Link href="/dgca-ground-classes" className="secondary-btn">Explore DGCA ground classes</Link>
              </div>
            </div>
            <div className="hero-card">
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial passenger aircraft flying above the clouds"
                width={1200}
                height={860}
                priority
              />
            </div>
          </div>
        </header>

        <div className="container content-grid">
          <main className="article-column">
            <article className="article-card">
              <p className="lead">
                Becoming an airline pilot is a goal that many students begin thinking about long before they finish school.
                For some, the interest starts with a fascination for aircraft. For others, it is the opportunity to build a career
                that combines technical knowledge, responsibility and the experience of flying.
              </p>

              <p>
                The Air India Cadet Pilot Program is one route aspiring pilots can consider when planning their entry into commercial
                aviation. Instead of independently choosing a flying school and arranging every stage of training, selected candidates
                follow a structured pathway designed around Air India&apos;s pilot requirements.
              </p>

              <p>
                However, getting selected is only one part of the journey. Applicants also need to understand the educational
                requirements, medical standards, assessment process, training arrangements and financial commitment involved.
              </p>

              <p>
                This guide explains how the Air India Cadet Pilot Program works, who can apply, what the selection process involves and
                what students should consider before committing to the programme.
              </p>

              <section id="what-is-it">
                <h2>What Is the Air India Cadet Pilot Program?</h2>
                <p>
                  The Air India Cadet Pilot Program is an airline-led training pathway for individuals who want to pursue a career as a
                  commercial airline pilot with Air India.
                </p>
                <p>
                  The programme is designed for candidates who do not necessarily have previous flying experience. Selected applicants undergo
                  a structured training process that includes the preparation and training required to obtain a Commercial Pilot Licence (CPL),
                  followed by aircraft type rating as specified by the programme.
                </p>
                <p>
                  One of the main differences between this route and conventional pilot training is the involvement of the airline from the
                  selection stage.
                </p>
                <p>
                  In a conventional CPL pathway, students generally select a flying school, arrange their training independently and apply
                  for airline opportunities after obtaining the required qualifications. Under a cadet programme, candidates first go through
                  the airline&apos;s selection process and, if successful, follow its prescribed training arrangement.
                </p>
                <p>
                  The programme is therefore worth exploring for students who prefer a more structured entry into airline pilot training.
                </p>
                <section id="how-it-works">
                  <h3>How Does the Programme Work?</h3>
                  <p>The general pathway involves the following stages:</p>
                  <ol>
                    <li>Submit an application through the official Air India Cadet Pilot Programme portal.</li>
                    <li>Complete the technical and non-technical assessments.</li>
                    <li>Attend the required interviews and evaluations.</li>
                    <li>Complete the necessary medical clearance.</li>
                    <li>Receive selection confirmation and programme-specific training instructions.</li>
                    <li>Begin the prescribed CPL training.</li>
                    <li>Complete the required licensing and aircraft type-rating stages.</li>
                  </ol>
                  <p>
                    The exact sequence, training arrangements and requirements should always be checked against the terms of the current intake.
                  </p>
                </section>
              </section>

              <section id="eligibility-criteria">
                <h2>Air India Cadet Pilot Program Eligibility Criteria 2026</h2>
                <p>
                  Before applying, candidates should check whether they satisfy the programme&apos;s eligibility requirements.
                </p>
                <p>
                  Air India&apos;s intake criteria are separate from the minimum requirements prescribed by the Directorate General of Civil
                  Aviation (DGCA) for issuing a commercial pilot licence. The current intake requirements should be confirmed with Air India.
                </p>
                <p className="verification-note">
                  Air India&apos;s live programme information could not be accessed during this review. Treat the details below as indicative,
                  not confirmed requirements for a current intake, and verify them on Air India&apos;s official programme portal before applying.
                </p>

                <h3>1. Age Requirement</h3>
                <p>
                  Applicants must generally be between 18 and 30 years of age under the published programme eligibility criteria.
                </p>
                <p>
                  Candidates should check the age calculation date specified in the application conditions before submitting their forms.
                </p>

                <h3>2. Educational Qualification</h3>
                <p>
                  Candidates must have completed their Class 12 education with at least 60% marks.
                </p>
                <p>The programme requires at least 60% individually in:</p>
                <ul>
                  <li>Physics</li>
                  <li>Mathematics</li>
                  <li>English</li>
                </ul>
                <p>
                  Students who completed Class 12 in Commerce or Arts without Physics and Mathematics may be able to meet the subject
                  requirements through the National Institute of Open Schooling (NIOS).
                </p>
                <p>
                  The required subjects and marks must satisfy Air India&apos;s current eligibility conditions.
                </p>

                <h3>3. Nationality</h3>
                <p>
                  The published eligibility criteria allow Indian citizens and Overseas Citizens of India (OCI) to apply.
                </p>
                <p>
                  Applicants should check the programme&apos;s latest documentation requirements to establish their eligibility.
                </p>

                <h3>4. English Language Proficiency</h3>
                <p>
                  A pilot must communicate clearly with instructors, other crew members and air traffic control.
                </p>
                <p>
                  Candidates are expected to demonstrate a good command of spoken and written English. This is relevant throughout the
                  selection process and during subsequent flight training.
                </p>

                <h3>5. Medical Fitness</h3>
                <p>
                  Medical fitness is an essential part of becoming a commercial pilot.
                </p>
                <p>
                  Candidates must meet the applicable DGCA Class 1 medical requirements before commencing the relevant flight-training stage.
                  Read more about the <Link href="/dgca-class-2-class-1-medical">DGCA Class 1 medical process</Link>.
                </p>
                <p>The medical assessment may include examinations relating to:</p>
                <ul>
                  <li>Eyesight and colour vision</li>
                  <li>Hearing</li>
                  <li>Cardiovascular health</li>
                  <li>General physical fitness</li>
                  <li>Blood pressure</li>
                  <li>Other medical parameters prescribed by DGCA</li>
                </ul>
                <p>
                  Students should consider checking their medical eligibility early rather than waiting until they have invested substantial
                  money in training.
                </p>
                <p>
                  Aviation medical decisions are made by the appropriate authorised medical examiners, not by a coaching institute.
                </p>

                <h3>6. Previous Flying Experience</h3>
                <p>
                  Previous flying experience is not a prerequisite for applying to the Air India Cadet Pilot Programme, according to its
                  published eligibility information.
                </p>
                <p>
                  This makes the programme relevant to students who are beginning their aviation journey after completing their education.
                </p>
              </section>

              <section id="fees">
                <h2>Air India Cadet Pilot Program Fees in 2026</h2>
                <p>
                  The financial commitment is one of the first things students and parents want to understand before considering a cadet programme.
                </p>
                <p>
                  Pilot training involves several stages, and the overall expense depends on the training arrangement, flying school, payment
                  schedule and additional requirements.
                </p>
                <p>
                    The current official fee information could not be confirmed during this review. Do not treat third-party estimates as
                    Air India&apos;s official programme fee; request a written cost breakdown for the relevant intake.
                </p>

                <h3>What Costs Should You Understand Before Applying?</h3>
                <p>
                  When reviewing a cadet programme&apos;s financial terms, ask for a written breakdown covering the following:
                </p>
                <div className="table-scroll" role="region" aria-label="Cadet programme expense categories" tabIndex={0}>
                  <table className="fee-table">
                    <thead>
                      <tr>
                        <th>Expense category</th>
                        <th>What to check</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>CPL ground training</td><td>Whether classroom and examination preparation are included</td></tr>
                      <tr><td>Flying training</td><td>Aircraft hours, training rates and additional-hour charges</td></tr>
                      <tr><td>Accommodation</td><td>Hostel, meals and other residential expenses</td></tr>
                      <tr><td>Travel</td><td>International travel and local transportation</td></tr>
                      <tr><td>Medical examinations</td><td>Initial and subsequent medical expenses</td></tr>
                      <tr><td>Examinations</td><td>Applicable examination and licensing charges</td></tr>
                      <tr><td>Licence conversion</td><td>Additional requirements if training takes place outside India</td></tr>
                      <tr><td>Type rating</td><td>Aircraft-specific training charges</td></tr>
                      <tr><td>Other expenses</td><td>Insurance, equipment, visa and administrative costs</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3>Is There a Payment Plan?</h3>
                <p>
                  Payment arrangements may depend on the intake and training arrangement. Ask Air India for the current written schedule
                  and conditions rather than assuming a particular instalment plan.
                </p>

                <h3>Questions to Ask Before Paying the Training Fee</h3>
                <p>Before making a financial commitment, students should understand:</p>
                <ol>
                  <li>What is the complete programme cost?</li>
                  <li>Which expenses are included in the quoted amount?</li>
                  <li>Are additional flying hours charged separately?</li>
                  <li>What happens if training takes longer than expected?</li>
                  <li>Are accommodation and travel expenses included?</li>
                  <li>What are the withdrawal and refund conditions?</li>
                  <li>What financial obligations apply if a candidate does not complete the programme?</li>
                </ol>
                <p>
                  A written explanation of these terms is much more useful than relying on a general fee estimate found online.
                </p>
              </section>

              <section id="training-structure">
                <h2>Air India Cadet Pilot Training Structure and Duration</h2>
                <p>
                  The programme may include commercial pilot training and aircraft-specific preparation. Confirm the stages and sequence for the
                  intake you are considering.
                </p>
                <p>Training can involve these components:</p>
                <ul>
                  <li>Commercial Pilot Licence training.</li>
                  <li>Aircraft type rating.</li>
                </ul>
                <p>
                  Ground instruction and practical flying may take place at different assigned facilities. Ask Air India which providers and
                  locations apply to your intake.
                </p>

                <h3>1. Ground Training</h3>
                <p>
                  Ground training provides the theoretical knowledge required for professional flying.
                </p>
                <p>
                  Students study subjects related to aircraft operation, <Link href="/air-navigation">Air Navigation</Link>,
                  <Link href="/aviation-meteorology"> Aviation Meteorology</Link>, aviation regulations and aircraft technical knowledge.
                </p>
                <p>
                  These subjects form the academic foundation of pilot training and are relevant to the DGCA examination and licensing process.
                </p>

                <h3>2. Flight Training</h3>
                <p>
                  After the relevant preparation and assessments, cadets undertake practical flying training at the designated facility.
                </p>
                <p>
                  Flight training develops the skills required to operate an aircraft safely under the supervision of qualified flight instructors.
                </p>
                <p>
                  The provider and location for practical flying are intake-specific; confirm them directly with Air India.
                </p>

                <h3>3. Commercial Pilot Licence</h3>
                <p>
                  A Commercial Pilot Licence is the professional licence required for commercial flying, subject to the applicable regulatory requirements.
                </p>
                <p>
                  Candidates must complete the necessary theoretical examinations, flying experience, medical requirements and other licensing conditions prescribed by DGCA.
                </p>

                <h3>4. Aircraft Type Rating</h3>
                <p>
                  After completing the applicable CPL training, cadets proceed to aircraft-specific training.
                </p>
                <p>
                  Type rating prepares a pilot to operate a particular aircraft type. It includes aircraft systems, operating procedures, simulator sessions and the required assessments.
                </p>
                <p>
                  The aircraft type and training arrangements depend on Air India&apos;s requirements and the programme terms applicable to the candidate.
                </p>

                <h3>How Long Does the Programme Take?</h3>
                <p>
                  The overall programme duration could not be confirmed from an accessible current official source during this review. Ask Air India
                  for the expected timeline for the intake you are considering. Completion time can vary with training progress, examinations,
                  flying schedules, weather, aircraft availability and other operational factors.
                </p>
                <p>
                  Candidates should confirm the expected timeline and the consequences of delays before accepting an offer.
                </p>
              </section>

              <section id="training-locations">
                <h2>Where Does Air India Conduct Cadet Pilot Training?</h2>
                <p>
                  Training location is another important consideration when comparing airline cadet programmes.
                </p>
                <p>
                  The training location and sequence should be confirmed directly with Air India for the relevant intake before making travel or
                  financial arrangements.
                </p>

                <h3>Confirm the Assigned Training Facility</h3>
                <p>
                  Ask which organisation will provide ground instruction and flight training, where each stage takes place and which regulator
                  oversees the training. Confirm the facility&apos;s current status and the terms that apply to your intake.
                </p>

                <h3>Domestic or International Training</h3>
                <p>
                  If any stage is outside India, ask about licence conversion, travel, accommodation, visa and any additional costs. Do not assume
                  a named school or location applies to your intake unless Air India confirms it in writing.
                </p>
              </section>

              <section id="selection-process">
                <h2>Air India Cadet Pilot Program Selection Process</h2>
                <p>
                  Getting selected for a cadet programme involves more than meeting the academic eligibility requirements.
                </p>
                <p>
                  Cadet selection may assess technical understanding, reasoning, communication and suitability for pilot training. Confirm Air
                  India&apos;s current stages and criteria in its own application instructions.
                </p>
                <p className="verification-note">
                  The exact assessment stages could not be verified against accessible current official programme information during this review.
                  The outline below is general; follow the instructions Air India gives for the intake you apply to.
                </p>

                <h3>1. Online Application</h3>
                <p>
                  The first step is submitting an application through the official programme portal.
                </p>
                <p>
                  Candidates should enter accurate personal and educational details and ensure that they meet the published eligibility requirements.
                </p>

                <h3>2. Technical Evaluation</h3>
                <p>
                  The technical assessment evaluates skills that are relevant to the demands of pilot training.
                </p>
                <p>Assessment areas can include:</p>
                <ul>
                  <li>Numerical reasoning</li>
                  <li>Critical thinking</li>
                  <li>Spatial awareness</li>
                  <li>Motor skills</li>
                  <li>Ability to perform under pressure</li>
                </ul>
                <p>
                  Candidates should become comfortable with basic mathematical reasoning, logical problems and tasks involving concentration and coordination.
                </p>

                <h3>3. Non-Technical Evaluation</h3>
                <p>
                  The non-technical assessment focuses on how candidates communicate, interact with others and respond in different situations.
                </p>
                <p>
                  This stage may involve group activities and interviews.
                </p>
                <p>
                  Good communication, teamwork, decision-making and the ability to remain composed are important qualities in aviation.
                </p>

                <h3>4. Interview and Further Assessment</h3>
                <p>
                  Candidates who progress through the assessment stages may be required to participate in additional interviews and evaluations as specified by Air India.
                </p>
                <p>
                  Applicants should prepare to explain their motivation for becoming a pilot, their understanding of airline operations and their reasons for choosing the cadet route.
                </p>

                <h3>5. Medical Clearance</h3>
                <p>
                  Medical clearance is essential before commencing the relevant flight-training stage.
                </p>
                <p>
                  Candidates must meet the applicable DGCA Class 1 medical requirements.
                </p>

                <h3>How Can You Prepare for the Selection Process?</h3>
                <p>Preparation should begin well before the assessment date.</p>
                <p>Some useful areas to work on include:</p>
                <ul>
                  <li>Basic mathematics and numerical reasoning.</li>
                  <li>English communication and comprehension.</li>
                  <li>Spatial awareness and logical thinking.</li>
                  <li>General knowledge of aviation.</li>
                  <li>Understanding of aircraft and flight operations.</li>
                  <li>Confidence during interviews.</li>
                  <li>Teamwork and decision-making.</li>
                </ul>
                <p>
                  Preparation cannot guarantee selection, as the final assessment and recruitment decisions rest entirely with Air India.
                </p>
              </section>

              <section id="apply">
                <h2>How to Apply for the Air India Cadet Pilot Programme</h2>
                <p>
                  Candidates interested in the programme should use Air India&apos;s official application portal rather than relying on third-party advertisements.
                </p>
                <p>A general application process involves the following steps:</p>

                <h3>Step 1: Review the Eligibility Requirements</h3>
                <p>Check the age, nationality, educational qualifications, subject marks and other programme conditions.</p>

                <h3>Step 2: Prepare Your Documents</h3>
                <p>Keep the relevant educational certificates, identity documents and other requested information ready.</p>

                <h3>Step 3: Visit the Official Programme Website</h3>
                <p>Access the Air India Cadet Pilot Programme website and review the current application instructions.</p>

                <h3>Step 4: Complete the Application</h3>
                <p>Fill in the required information carefully and submit the application according to the portal instructions.</p>

                <h3>Step 5: Attend the Assessments</h3>
                <p>Follow the communication received from Air India regarding technical and non-technical evaluations.</p>

                <h3>Step 6: Complete the Further Requirements</h3>
                <p>
                  Candidates who progress through selection must follow the subsequent medical, documentation and enrolment requirements.
                </p>

                <p>
                  Candidates can find the latest programme information and application instructions at:
                  <a href="https://cadetpilot.airindia.com/" target="_blank" rel="noopener noreferrer"> cadetpilot.airindia.com</a>
                </p>
                <p>
                  Application windows, selection stages and availability may change. Check the official portal for the latest information before applying.
                </p>
              </section>

              <section id="vs-cpl">
                <h2>Air India Cadet Pilot Programme vs Conventional CPL Training</h2>
                <p>
                  Students planning to become airline pilots often have two broad pathways to consider: joining an airline cadet programme or pursuing a Commercial Pilot Licence independently.
                </p>
                <p>
                  Both routes involve meeting the applicable DGCA licensing requirements, but the way students organise their training can be different.
                </p>

                <div className="table-scroll" role="region" aria-label="Cadet programme and conventional CPL comparison" tabIndex={0}>
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Comparison</th>
                        <th>Air India Cadet Programme</th>
                        <th>Conventional CPL Route</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(([label, left, right]) => (
                        <tr key={label}>
                          <td>{label}</td>
                          <td>{left}</td>
                          <td>{right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3>Which Route Should You Choose?</h3>
                <p>
                  There is no single answer that suits every student.
                </p>
                <p>
                  A cadet programme may appeal to candidates who prefer an airline-structured training pathway and are comfortable following its selection and training conditions.
                </p>
                <p>
                  <Link href="/commercial-pilot-license">Conventional CPL training</Link> may suit students who want greater flexibility in choosing their flying school, training location and schedule.
                </p>
                <p>
                  Before making a decision, compare the financial commitment, training arrangements, regulatory requirements and actual written terms.
                </p>
                <p>
                  Most importantly, understand that completing pilot training does not automatically guarantee an airline position unless the relevant written programme terms explicitly provide such a commitment.
                </p>
              </section>

              <section id="after-completion">
                <h2>What Happens After Completing the Air India Cadet Pilot Programme?</h2>
                <p>
                  Completing training is a significant achievement, but becoming an airline pilot involves meeting the applicable licensing, training and operational requirements.
                </p>
                <p>
                  Candidates must complete the required stages and assessments before they can perform the duties associated with their assigned role.
                </p>
                <p>
                  Depending on the programme&apos;s terms and Air India&apos;s operational requirements, successful candidates may proceed towards the relevant aircraft qualification and airline training stages.
                </p>

                <h3>From Training to Airline Operations</h3>
                <p>
                  The transition into airline operations involves more than learning how to fly an aircraft.
                </p>
                <p>Pilots must understand:</p>
                <ul>
                  <li>Standard operating procedures.</li>
                  <li>Aircraft systems and limitations.</li>
                  <li>Crew resource management.</li>
                  <li>Communication with air traffic control.</li>
                  <li>Emergency procedures.</li>
                  <li>Operational safety requirements.</li>
                </ul>
                <p>
                  Airline recruitment, induction and deployment remain subject to the applicable programme conditions and the airline&apos;s requirements.
                </p>
              </section>

              <section id="is-it-right">
                <h2>Is the Air India Cadet Pilot Programme Right for You?</h2>
                <p>
                  The programme is worth researching if you have completed your Class 12 education, meet the published eligibility criteria and want to follow an airline-led training pathway.
                </p>
                <p>
                  However, joining any cadet programme is a major educational and financial decision.
                </p>
                <p>
                  Before applying, consider your medical eligibility, academic preparation, financial resources and willingness to follow a structured training schedule.
                </p>
                <p>
                  It is equally important to understand the programme&apos;s actual written terms instead of relying only on advertisements or general information available online.
                </p>
                <p>
                  Students who are still comparing different pilot-training routes can read our guide on <Link href="/your-guide-on-how-to-become-a-pilot-in-india">how to become a pilot in India</Link> and how DGCA ground preparation and flying-school training fit together.
                </p>
              </section>

              <section id="how-we-help">
                <h2>How We One Aviation Can Help You Prepare for Your Pilot Training Journey</h2>
                <p>
                  Choosing a pilot-training pathway requires a clear understanding of the academic, licensing and practical requirements involved.
                </p>
                <p>
                  At We One Aviation Academy, we help aspiring pilots build their foundation through DGCA ground-subject preparation and guidance on the different stages of pilot training.
                </p>
                <p>
                  Our academy provides classroom instruction in Dwarka, New Delhi, and online learning options for students outside Delhi, subject to current batch availability.
                </p>

                <h3>DGCA Ground-Subject Preparation</h3>
                <p>
                  Students preparing for commercial pilot training can develop their theoretical understanding of important aviation subjects, including:
                </p>
                <ul>
                  <li>Air Navigation</li>
                  <li>Aviation Meteorology</li>
                  <li>Air Regulations</li>
                  <li>Technical General</li>
                  <li>Technical Specific</li>
                </ul>
                <p>
                  These subjects form an important part of the academic preparation required for the relevant DGCA examinations.
                </p>

                <h3>Guidance on Flight Training</h3>
                <p>
                  Flight training is a separate practical stage that must be completed through an appropriate flying school.
                </p>
                <p>
                  We One Aviation helps students understand available training pathways and arranges flight-training options through partner flying schools.
                </p>
                <p>
                  Students should confirm the selected school&apos;s current approval status, training availability, fees and terms before enrolling.
                </p>

                <h3>Aviation Career Guidance</h3>
                <p>
                  Students and parents often have questions about eligibility, medical requirements, course selection, training expenses and career opportunities.
                </p>
                <p>
                  Our team helps aspiring pilots understand these areas so that they can make informed decisions before committing to a particular pathway.
                </p>
                <p>
                  We One Aviation does not conduct Air India&apos;s cadet selection, make airline hiring decisions or guarantee admission into its programme.
                </p>
                <p>
                  If you are planning to apply for the Air India Cadet Pilot Programme, you can contact our academy for guidance on DGCA ground preparation and the broader pilot-training process.
                </p>
              </section>

              <section id="faqs">
                <h2>Frequently Asked Questions About the Air India Cadet Pilot Programme</h2>
                <div className="faq-list">
                  {faqItems.map(({ q, a }) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <div className="bottom-cta-box">
                <h2>Start Preparing for Your Aviation Career</h2>
                <p>
                  A career as a commercial pilot requires preparation, commitment and a clear understanding of the training process.
                </p>
                <p>
                  Whether you are considering the Air India Cadet Pilot Programme or planning to pursue a conventional CPL, understanding the DGCA requirements and choosing the right training pathway are important first steps.
                </p>
                <p>
                  We One Aviation Academy can help you understand the academic preparation involved and explore the different stages of your pilot-training journey.
                </p>
                <p className="cta-line">Contact We One Aviation to discuss DGCA ground classes, pilot-training pathways and current course availability.</p>
              </div>
            </article>
          </main>

          <aside className="sidebar-column">
            <nav className="toc-card" aria-label="Table of contents">
              <h3>In this guide</h3>
              <ul>
                {toc.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                ))}
              </ul>
            </nav>

            <div className="sidebar-card accent-card">
              <h3>Planning to become a commercial pilot?</h3>
              <p>
                Understanding DGCA subjects and licensing requirements is an important part of preparing for a professional flying career.
              </p>
              <Link href="/dgca-ground-classes" className="primary-btn block-btn">View DGCA ground classes</Link>
            </div>

            <div className="sidebar-card">
              <h3>Talk to an advisor</h3>
              <p>Get guidance on pilot training pathways, admission requirements and current course availability.</p>
              <Link href="/pilot-career-counselling" className="secondary-btn block-btn">Book a counselling call</Link>
            </div>

            <div className="sidebar-card">
              <h3>Related aviation guides</h3>
              <ul className="related-list">
                {relatedArticles.map((item) => (
                  <li key={item.href}><Link href={item.href}>{item.title}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .air-india-page {
          background: #f5f8fc;
          color: #112033;
        }

        .container {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(9, 29, 53, 0.75), rgba(20, 62, 108, 0.8)),
            url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(8, 18, 31, 0.6), rgba(8, 18, 31, 0.15));
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 32px;
          align-items: center;
          padding: 72px 0 64px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #dfeaf7;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .hero-copy h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
        }

        .hero-copy p {
          margin-top: 18px;
          color: #e8f0fa;
          font-size: 1.08rem;
          line-height: 1.75;
          max-width: 640px;
        }

        .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
          margin-top: 22px;
          color: #dfeaf7;
          font-size: 0.9rem;
        }

        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 26px;
        }

        .primary-btn,
        .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0.9rem 1.4rem;
          font-weight: 700;
          text-decoration: none;
          transition: 0.2s ease;
        }

        .primary-btn {
          background: #ffb703;
          color: #10233e;
          box-shadow: 0 10px 24px rgba(255, 183, 3, 0.28);
        }

        .secondary-btn {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translateY(-1px);
        }

        .hero-card {
          display: flex;
          justify-content: center;
        }

        .hero-card img {
          width: min(100%, 420px);
          height: 430px;
          object-fit: cover;
          border-radius: 26px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 32px rgba(3, 15, 30, 0.24);
        }

        .content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 28px;
          padding: 32px 0 72px;
          align-items: start;
        }

        .article-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px 28px;
          box-shadow: 0 22px 52px rgba(17, 32, 51, 0.08);
        }

        .article-card > p, .article-card li, .article-card td, .article-card th {
          font-size: 1.02rem;
          line-height: 1.8;
          color: #1d2d3e;
        }

        .lead {
          font-size: 1.18rem !important;
          color: #1a2d47 !important;
        }

        .verification-note {
          padding: 14px 16px;
          border-left: 4px solid #d99000;
          border-radius: 8px;
          background: #fff8e8;
          color: #45350f !important;
        }

        .article-card h2 {
          margin-top: 2.2rem;
          margin-bottom: 1rem;
          color: #0d223d;
          font-size: clamp(1.7rem, 2.8vw, 2.3rem);
          line-height: 1.2;
        }

        .article-card h3 {
          margin-top: 1.7rem;
          margin-bottom: 0.8rem;
          color: #173250;
          font-size: 1.35rem;
        }

        .article-card p {
          margin: 0 0 1rem;
        }

        .article-card ul,
        .article-card ol {
          margin: 0 0 1rem 1.3rem;
          padding-left: 0.5rem;
        }

        .article-card a {
          color: #0e5ad2;
          text-decoration: underline;
        }

        .article-card table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
        }

        .table-scroll {
          max-width: 100%;
          margin: 1rem 0 2rem;
          overflow-x: auto;
          border: 1px solid #d9e4f0;
          border-radius: 12px;
          -webkit-overflow-scrolling: touch;
        }

        .fee-table {
          min-width: 560px;
        }

        .comparison-table {
          min-width: 700px;
        }

        .article-card th,
        .article-card td {
          padding: 12px 14px;
          border: 1px solid #d9e4f0;
          vertical-align: top;
          text-align: left;
        }

        .article-card th {
          background: #eef5ff;
          color: #0d243d;
          font-weight: 700;
        }

        .faq-list details {
          border: 1px solid #d9e3f2;
          border-radius: 14px;
          padding: 0.8rem 1rem;
          margin-top: 0.8rem;
          background: #f8fbff;
        }

        .faq-list summary {
          cursor: pointer;
          font-weight: 700;
          color: #112a48;
        }

        .faq-list p {
          margin-top: 0.9rem;
          margin-bottom: 0;
        }

        .bottom-cta-box {
          margin-top: 2rem;
          background: linear-gradient(135deg, #eef5ff, #ecf9ff);
          border: 1px solid #d8e7ff;
          border-radius: 20px;
          padding: 24px 22px;
        }

        .bottom-cta-box h3 {
          margin: 0 0 0.8rem;
          color: #102944;
          font-size: 1.6rem;
        }

        .cta-line {
          margin-top: 0.8rem;
          font-weight: 700;
          color: #12304f;
        }

        .sidebar-column {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .toc-card,
        .sidebar-card {
          background: #ffffff;
          border: 1px solid #e0ebf7;
          border-radius: 18px;
          box-shadow: 0 10px 28px rgba(17, 32, 51, 0.05);
          padding: 20px 18px;
        }

        .toc-card h3,
        .sidebar-card h3 {
          margin: 0 0 12px;
          color: #112a48;
          font-size: 1.1rem;
        }

        .toc-card ul,
        .related-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .toc-card li + li,
        .related-list li + li {
          margin-top: 10px;
        }

        .toc-card a,
        .related-list a {
          color: #0f3a70;
          text-decoration: none;
          line-height: 1.6;
        }

        .toc-card a:hover,
        .related-list a:hover {
          text-decoration: underline;
        }

        .accent-card {
          background: linear-gradient(180deg, #eff7ff 0%, #ffffff 100%);
        }

        .block-btn {
          width: 100%;
          margin-top: 12px;
        }

        .sidebar-card p {
          margin: 0;
          line-height: 1.7;
          color: #1f3045;
        }

        @media (max-width: 980px) {
          .hero-content,
          .content-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-column {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .article-card {
            padding: 22px 18px;
          }

          .hero-content {
            padding-top: 52px;
            padding-bottom: 32px;
          }

          .meta-row {
            display: grid;
            gap: 8px;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}
