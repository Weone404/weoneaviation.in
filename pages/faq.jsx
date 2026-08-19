import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import { generateFAQSchema } from '../lib/schema';

const categories = [
  {
    id: 'general',
    title: 'General',
    faqs: [
      { question: 'What is WeOne Aviation Academy?', answer: 'WeOne Aviation Academy guides aspiring pilots through DGCA ground preparation, pilot-training route selection, medical readiness, flying-school choices, and aviation career planning.' },
      { question: 'Which students does WeOne Aviation support?', answer: 'We support students at different stages, from people exploring aviation after school to candidates preparing for DGCA examinations, flying training, airline selection, and advanced pilot qualifications.' },
      { question: 'Why choose WeOne Aviation for pilot-training guidance?', answer: 'Students receive structured counselling, DGCA-focused preparation, experienced aviation guidance, support with training decisions, and help comparing India and international pathways.' },
      { question: 'Does WeOne Aviation offer online and offline learning?', answer: 'Course delivery depends on the selected batch and program. Contact the academy to confirm the current online, classroom, hybrid, and doubt-clearing options.' },
      { question: 'How can I speak with an aviation counsellor?', answer: 'You can use the contact form, call the academy, or start a WhatsApp conversation. A counsellor can explain eligibility, course choices, documents, and the next step for your situation.' },
    ],
  },
  {
    id: 'courses',
    title: 'Courses & Eligibility',
    faqs: [
      { question: 'What pilot-training courses are available?', answer: 'WeOne Aviation provides guidance for Commercial Pilot License (CPL), Private Pilot License (PPL), Airline Transport Pilot License (ATPL), Sport Pilot License (SPL), and DGCA ground classes.' },
      { question: 'What are the usual CPL eligibility requirements?', answer: 'The Indian CPL route generally requires 10+2 with Physics and Mathematics, the applicable DGCA medical certification, English proficiency, and the minimum age prescribed for the CPL skill test.' },
      { question: 'What are the usual PPL eligibility requirements?', answer: 'PPL applicants generally need to meet the applicable minimum age, education, English, and DGCA Class 2 medical requirements. Requirements should be confirmed under current DGCA rules.' },
      { question: 'Who can begin ATPL preparation?', answer: 'ATPL preparation is intended for pilots who hold a CPL and are progressing through the examinations, flight experience, ratings, and operator requirements needed for airline command.' },
      { question: 'What are DGCA ground classes?', answer: 'DGCA ground classes prepare students for the theoretical subjects associated with pilot licensing, including navigation, meteorology, air regulations, technical knowledge, and radio telephony.' },
    ],
  },
  {
    id: 'fees-duration',
    title: 'Fees & Duration',
    faqs: [
      { question: 'How long does CPL training usually take?', answer: 'A complete CPL pathway commonly takes around 18 to 24 months, but examinations, weather, aircraft availability, medical processing, and flying-school schedules can affect the timeline.' },
      { question: 'How long does PPL training usually take?', answer: 'PPL training commonly takes about 6 to 12 months. The actual duration depends on weather, aircraft availability, the training schedule, and individual progress.' },
      { question: 'How long does ATPL progression take?', answer: 'The complete progression toward an ATPL commonly spans 36 months or more because it includes advanced theory, flight-hour building, simulator work, and airline experience.' },
      { question: 'What is the approximate cost of CPL training in India?', answer: 'The complete India CPL pathway is commonly discussed in the ₹40-70 lakh range, but the final cost depends on the flying school, aircraft, flying hours, location, and additional training required.' },
      { question: 'What is the approximate cost of PPL training?', answer: 'PPL training in India commonly falls around ₹7.5-10 lakh, including ground classes, flying, medicals, and examination-related expenses. Confirm the current quote before enrolment.' },
      { question: 'Do you offer EMI or loan assistance?', answer: 'EMI and loan guidance may be available through current academy or finance-partner arrangements. Please confirm the available lenders, eligibility, documents, interest, and repayment terms before making a decision.' },
      { question: 'Are scholarships available?', answer: 'Scholarship availability, eligibility, and terms can change by course and intake. Contact the academy for the current assessment process and written conditions.' },
    ],
  },
  {
    id: 'career',
    title: 'Career & Job Prospects',
    faqs: [
      { question: 'What can I do after earning a CPL?', answer: 'CPL holders can work toward airline first-officer roles, instructing, charter, corporate, cargo, and other commercial aviation opportunities, subject to employer and regulatory requirements.' },
      { question: 'Can a PPL lead to an airline career?', answer: 'A PPL does not permit commercial flying, but it can provide foundational experience before progressing through the additional training and licensing requirements for a CPL.' },
      { question: 'What does an ATPL enable a pilot to do?', answer: 'An ATPL supports progression toward acting as pilot in command of commercial aircraft after the required flight experience, ratings, examinations, and operator requirements are completed.' },
      { question: 'Does WeOne Aviation provide placement support?', answer: 'Career guidance may include airline preparation, interview readiness, route planning, and introductions or information about relevant opportunities. Confirm the current scope of support for your course.' },
      { question: 'What affects a pilot career and salary?', answer: 'Employers consider licence status, ratings, flight hours, aircraft experience, medical fitness, interview performance, language skills, market conditions, and the role being applied for.' },
    ],
  },
  {
    id: 'locations',
    title: 'Locations & City Training',
    faqs: [
      { question: 'Where can I complete pilot training?', answer: 'Students can compare flying-school options in India and international destinations. The right location depends on regulator approval, weather, aircraft availability, total cost, documentation, and personal circumstances.' },
      { question: 'Are there good pilot-training options in my city?', answer: 'Pilot-training options vary by city and nearby airfields. WeOne Aviation can help compare available schools, commute or relocation needs, training capacity, and the applicable licensing route.' },
      { question: 'What is the cost of pilot training in a city?', answer: 'City-specific costs depend on the selected school, aircraft hourly rate, fuel and airport charges, accommodation, flying hours, and extra attempts. Request a current written estimate for the city you are considering.' },
      { question: 'Does WeOne Aviation have a presence in every listed city?', answer: 'WeOne Aviation provides counselling for students across listed Indian cities and can discuss partner-school or training options. Confirm whether an in-person office, classroom, or flying partner is currently available in your city.' },
      { question: 'Can I train abroad and convert my licence in India?', answer: 'International training is possible, but returning pilots must complete the applicable DGCA conversion, examinations, documents, verification, and other regulatory requirements.' },
    ],
  },
  {
    id: 'application',
    title: 'Application Process & Documents',
    faqs: [
      { question: 'What is the usual application process?', answer: 'Start with a counselling call and eligibility review, complete the relevant medical and documentation steps, choose a course and training route, submit the required application, and follow the batch or flying-school admission process.' },
      { question: 'What documents are commonly needed for admission?', answer: 'Common documents may include identity and address proof, academic certificates, photographs, passport details where relevant, medical records, and regulator or school forms. The exact checklist depends on the course and destination.' },
      { question: 'Should I complete my medical before admission?', answer: 'Completing the relevant DGCA medical assessment early is strongly recommended so that you understand your eligibility before committing significant time or money to training.' },
      { question: 'Do I need Physics and Mathematics in 12th?', answer: 'Physics and Mathematics are generally required for the Indian CPL route. Students without the required subjects should ask about recognised ways to complete the academic requirement before applying.' },
      { question: 'Is hostel or accommodation available?', answer: 'Accommodation options depend on the selected batch, campus, flying school, and location. Please confirm whether hostel, partner accommodation, meals, transport, and related charges are available before enrolment.' },
      { question: 'What is the refund policy?', answer: 'Refund eligibility, deductions, transfer rules, and timelines depend on the specific course, batch, service, and written admission terms. Please request and review the current policy before paying any fee.' },
    ],
  },
];

const allFaqs = categories.flatMap((category) => category.faqs);

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCategories = useMemo(() => categories.map((category) => ({
    ...category,
    faqs: category.faqs.filter((faq) => !normalizedSearch || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedSearch)),
  })).filter((category) => category.faqs.length), [normalizedSearch]);

  return (
    <Layout
      title="Frequently Asked Questions | WeOne Aviation Academy"
      description="Find answers about WeOne Aviation Academy, pilot-training courses, DGCA eligibility, fees, duration, careers, locations, admissions, and documents."
    >
      <StructuredData data={generateFAQSchema(allFaqs.map(({ question, answer }) => ({ q: question, a: answer })))} />

      <section className="relative h-64 md:h-80 bg-gradient-to-br from-av-blue to-av-navy flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <div className="section-tag mb-3">WeOne Aviation Academy</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">Frequently Asked <span className="text-av-orange">Questions</span></h1>
          <p className="text-white/70 mt-3 text-sm">Clear answers for your pilot-training and aviation career journey</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <label htmlFor="faq-search" className="block font-montserrat font-bold text-av-blue text-sm mb-2">Search FAQs</label>
            <input
              id="faq-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search courses, fees, eligibility, locations..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all"
            />
          </ScrollReveal>

          <nav aria-label="FAQ categories" className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="px-4 py-2 rounded-full bg-av-light text-av-blue text-xs font-semibold hover:bg-av-orange hover:text-white transition-colors">
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <main>
        {filteredCategories.map((category) => (
          <div key={category.id} id={category.id}>
            <FAQSection faqs={category.faqs} title={category.title} includeSchema={false} idPrefix={category.id} />
          </div>
        ))}
        {!filteredCategories.length && (
          <p className="text-center text-gray-500 text-sm pb-16 px-4">No FAQs match your search. Please contact our counsellors for help.</p>
        )}
      </main>

      <section className="py-16 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl bg-av-blue p-8 md:p-10 text-center">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-3">Still have a question?</h2>
            <p className="text-white/70 text-sm mb-6">Speak with the WeOne Aviation team about your eligibility, course, and next step.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="bg-av-orange text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition-all">Contact Us</a>
              <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer" className="border border-white/40 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-av-blue transition-all">WhatsApp Us</a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
}
