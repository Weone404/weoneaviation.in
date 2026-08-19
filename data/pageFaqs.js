const existingFaqRoutes = new Set([
  '/', '/faqs', '/faq', '/air-arabia', '/blogs/pilot-training-delhi', '/commercial-pilot-license', '/courses/dgca-ground-classes',
  '/dgca-class-2-class-1-medical', '/dgca-computer-number', '/dgca-full-form',
  '/dgca-ground-classes-in-india', '/dgca-pariksha', '/ecga-login-your-complete-guide',
  '/how-to-become-a-pilot-after-12th', '/lead-magnets', '/lead-magnets/dgca-exam-checklist',
  '/pilot-course-training-in-india', '/pilot-training-in-india',
  '/ppl-full-form', '/rtr-full-form-meaning-importance-and-complete-guide', '/student-checklists',
  '/pilot-training-in-andhra-pradesh', '/pilot-training-in-arunachal-pradesh',
  '/pilot-training-in-assam', '/pilot-training-in-bangalore', '/pilot-training-in-bihar',
  '/pilot-training-in-chhattisgarh', '/pilot-training-in-coimbatore', '/pilot-training-in-chennai',
  '/pilot-training-in-delhi', '/pilot-training-in-ghaziabad', '/pilot-training-in-goa',
  '/pilot-training-in-gurugram', '/pilot-training-in-gujarat', '/pilot-training-in-haryana',
  '/pilot-training-in-hyderabad', '/pilot-training-in-jaipur', '/pilot-training-in-kerala',
  '/pilot-training-in-kolkata', '/pilot-training-in-maharashtra', '/pilot-training-in-mumbai',
  '/pilot-training-in-nagpur', '/pilot-training-in-noida', '/pilot-training-in-pune',
  '/pilot-training-in-punjab', '/pilot-training-in-rajasthan', '/pilot-training-in-tamil-nadu',
]);

const routeContent = {
  '/about-us': {
    title: 'About WeOne Aviation Academy: FAQs',
    questions: [
      ['When was WeOne Aviation Academy established?', 'WeOne Aviation Academy has supported aspiring pilots since 2009 with DGCA-focused ground training, career counselling, and guidance for flying-school selection.'],
      ['What approvals and affiliations does WeOne Aviation Academy have?', 'Our programs are aligned with DGCA requirements and aviation standards. We explain the current approval and partner-school status for your selected training route before admission.'],
      ['Who teaches at the academy?', 'Students learn from experienced airline pilots, DGCA ground instructors, simulator instructors, and aviation medical advisors with practical industry experience.'],
      ['What facilities and support are available?', 'The academy provides structured ground classes, doubt-clearing support, career counselling, training-route guidance, and access to partner flying-school options in India and abroad.'],
    ],
  },
  '/contact': {
    title: 'Contact WeOne Aviation: FAQs',
    questions: [
      ['How quickly will WeOne Aviation respond to my enquiry?', 'A counsellor generally calls back within two hours during office hours. Enquiries received outside those hours are handled on the next working day.'],
      ['What is the best way to contact the academy?', 'You can submit the contact form, call +91 93555 66991, or start a WhatsApp conversation for course, medical, and admission guidance.'],
      ['What are the academy office hours?', 'The office is open Monday to Saturday from 9 AM to 7 PM and Sunday from 10 AM to 4 PM.'],
      ['Where is the WeOne Aviation office located?', 'Our office is at C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka, Delhi 110077.'],
    ],
  },
  '/courses/cpl': {
    title: 'CPL Training FAQs',
    questions: [
      ['Who is eligible for Commercial Pilot License training?', 'Applicants generally need 10+2 with Physics and Mathematics, the required DGCA medical certification, English proficiency, and the minimum age prescribed for the CPL skill test.'],
      ['How long does CPL training take?', 'A complete CPL pathway commonly takes around 18 to 24 months, depending on exam progress, weather, aircraft availability, and flying-school scheduling.'],
      ['What is the approximate CPL training fee in India?', 'The complete India pathway is commonly around ₹40-70 lakh, including flying, ground training, medicals, exams, and related charges. The final amount depends on the school and flying hours required.'],
      ['What does the CPL syllabus include?', 'The program combines DGCA ground subjects, navigation, meteorology, air regulations, technical subjects, radio telephony, instrument training, solo and cross-country flying, and the CPL skill test.'],
      ['What careers are available after earning a CPL?', 'CPL holders can build experience toward airline first-officer roles, instructing, charter, corporate, cargo, and other commercial aviation positions subject to employer and regulatory requirements.'],
    ],
  },
  '/courses/ppl': {
    title: 'PPL Training FAQs',
    questions: [
      ['What are the eligibility requirements for a Private Pilot License?', 'Applicants usually need to meet the minimum age, education, English, and DGCA Class 2 medical requirements applicable to PPL training.'],
      ['How long does a PPL course take?', 'Most students complete PPL training in about 6 to 12 months, though weather, aircraft availability, and individual progress can change the timeline.'],
      ['How much does PPL training cost?', 'A PPL in India commonly costs approximately ₹7.5-10 lakh, including ground classes, flying, medicals, and examination-related expenses.'],
      ['What subjects are covered in PPL training?', 'PPL preparation covers air regulations, aviation meteorology, air navigation, aircraft technical knowledge, and radio telephony alongside practical flying.'],
      ['Can a PPL lead to an airline career?', 'A PPL does not permit commercial flying, but it can be an early step toward additional training and the CPL pathway.'],
    ],
  },
  '/courses/atpl': {
    title: 'ATPL Training FAQs',
    questions: [
      ['Who can start ATPL preparation?', 'ATPL preparation is intended for pilots who hold a CPL and are progressing through the experience, examinations, and ratings required for airline command.'],
      ['How long does ATPL training take?', 'The complete progression toward an ATPL commonly spans 36 months or more because it includes flight-hour building, advanced theory, simulator work, and airline experience.'],
      ['What does ATPL preparation cost?', 'The ATPL preparation component is commonly around ₹15-25 lakh, while the full progression cost varies with flight hours, type rating, simulator, and employer pathway.'],
      ['Which subjects are taught for ATPL?', 'Training covers advanced navigation, air law, meteorology, aircraft performance, flight planning, human factors, aircraft systems, communications, and multi-crew operations.'],
      ['What job progression follows ATPL training?', 'An ATPL supports progression toward airline command after the required flight experience, ratings, examinations, and operator requirements have been completed.'],
    ],
  },
  '/student-pilot-license-spl': {
    title: 'SPL Training FAQs',
    questions: [
      ['Who is eligible for a Sport Pilot License?', 'SPL applicants generally must meet the applicable minimum age, medical, language, and training requirements for recreational light-sport flying.'],
      ['How long does SPL training take?', 'SPL training can often be completed in about 3 to 6 months, depending on flying availability, weather, and student progress.'],
      ['What is the approximate SPL course fee?', 'The indicative SPL training range is ₹2-4 lakh, subject to aircraft type, flying hours, school charges, and examination requirements.'],
      ['What does the SPL syllabus cover?', 'The syllabus includes basic air regulations, navigation and weather, aircraft familiarisation, normal and emergency procedures, dual flying, solo circuits, and skill-test preparation.'],
      ['Can SPL training be followed by PPL or CPL training?', 'Yes. SPL can provide foundational flying experience before progressing to the additional requirements for a PPL and, later, a CPL.'],
    ],
  },
  '/courses/dgca-ground-classes': {
    title: 'DGCA Ground Classes FAQs',
    questions: [
      ['Who should join DGCA ground classes?', 'Students preparing for DGCA pilot-licensing examinations, including aspiring CPL and PPL candidates, can join structured ground classes for subject guidance and exam preparation.'],
      ['How long do DGCA ground classes take?', 'The schedule is commonly 6 to 12 months depending on the subjects selected, exam attempts, batch timetable, and the student’s preparation level.'],
      ['What subjects are covered?', 'Classes cover subjects such as Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, and Radio Telephony as applicable to the licence.'],
      ['Do ground classes include flying training?', 'Ground classes prepare students for the theoretical examinations. Flying hours must be completed separately through a DGCA-approved flying school.'],
      ['How do DGCA ground classes help with exams?', 'Faculty-led lessons, revision, doubt clearing, mock tests, and exam-focused study plans help students understand the syllabus and prepare systematically.'],
    ],
  },
  '/how-to-become-a-pilot/after-12th': {
    title: 'Becoming a Pilot After 12th: FAQs',
    questions: [
      ['Which subjects are required in 12th to become a pilot?', 'For the Indian CPL route, students generally need Physics and Mathematics in 10+2, commonly with the required minimum marks under DGCA rules.'],
      ['What is the minimum age to begin pilot training?', 'Students can begin planning and completing early steps before 18, but the applicable age requirements differ for training, examinations, and the CPL skill test.'],
      ['What are the entrance steps after 12th?', 'The usual sequence is medical assessment, DGCA documentation and examinations, ground training, selection of a DGCA-approved flying school, flying hours, and the CPL skill test.'],
      ['How much does pilot training cost after 12th?', 'A complete CPL route in India is commonly around ₹40-70 lakh, while PPL and international routes have different costs. Exact fees depend on the school and hours flown.'],
      ['How long does it take to become a commercial pilot?', 'Many students complete the CPL pathway in approximately 18 to 24 months, but exams, weather, medicals, and aircraft availability can affect the timeline.'],
    ],
  },
  '/how-to-become-a-pilot/in-india': {
    title: 'Becoming a Pilot in India: FAQs',
    questions: [
      ['What is the first step to becoming a pilot in India?', 'Start by checking 10+2 Physics and Mathematics eligibility and completing the relevant DGCA medical assessment before committing to a training route.'],
      ['How many DGCA exams are required for a CPL?', 'CPL candidates must clear the DGCA subjects applicable to their licence, including navigation, meteorology, air regulations, technical knowledge, and radio telephony requirements.'],
      ['How much does pilot training cost in India?', 'A full CPL pathway is commonly estimated at ₹40-70 lakh, including flying and associated training costs. Actual fees vary by school, location, and additional hours.'],
      ['How long is the pilot training timeline?', 'A realistic India CPL timeline is often 18 to 24 months, although exam attempts, weather, aircraft availability, and regulatory processing can extend it.'],
      ['Can students train abroad and convert the licence in India?', 'Yes, international training is possible, but pilots must complete the applicable DGCA conversion, examination, documentation, and verification requirements.'],
    ],
  },
  '/pilot-training-in-sri-lanka': {
    title: 'Pilot Training in Sri Lanka: FAQs',
    questions: [
      ['Can Indian students pursue pilot training in Sri Lanka?', 'Indian students may explore Sri Lankan flight-training options subject to the school’s admission rules, visa requirements, medical standards, and the DGCA conversion pathway.'],
      ['What is the cost of pilot training in Sri Lanka?', 'Costs vary by aircraft, flying hours, accommodation, exchange rates, and school. WeOne Aviation can help compare a Sri Lankan quote with Indian and other international routes.'],
      ['How long does training in Sri Lanka take?', 'The timeline depends on the licence, weather, aircraft availability, and student progress; a complete CPL route commonly takes around 18 to 24 months.'],
      ['What should I check before selecting a Sri Lankan flying school?', 'Confirm regulator approval, aircraft availability, instructor credentials, transparent hourly rates, refund terms, student visa support, and the documentation needed for Indian licence conversion.'],
      ['Does WeOne Aviation help with Sri Lanka training options?', 'WeOne Aviation provides route counselling and can help students evaluate partner-school options, documentation, costs, and the next steps for their intended licence.'],
    ],
  },
};

function fallbackContent(pathname) {
  const topic = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'aviation';
  const label = topic.replace(/\b\w/g, (letter) => letter.toUpperCase());
  return {
    title: `${label}: Frequently Asked Questions`,
    questions: [
      [`What is ${label} about?`, `${label} covers a focused part of aviation education or pilot career planning. WeOne Aviation explains the relevant requirements, preparation, and next steps for this topic.`],
      [`Who should learn about ${label}?`, `Students and aviation professionals researching ${topic} can use this guide to understand the terminology, eligibility, preparation, and practical decisions involved.`],
      [`What requirements apply to ${label}?`, `Requirements depend on the licence, examination, authority, or career route involved. Confirm the current DGCA or applicable regulator rules before applying.`],
      [`How can WeOne Aviation help with ${label}?`, `Our counsellors can clarify the training route, documents, expected timeline, and suitable course options for your ${topic} goal.`],
    ],
  };
}

export function getPageFAQs(pathname) {
  if (existingFaqRoutes.has(pathname) || pathname === '/pilot-training-in/[city]') return null;
  const content = routeContent[pathname] || fallbackContent(pathname);
  return { title: content.title, faqs: content.questions.map(([question, answer]) => ({ question, answer })) };
}

export { existingFaqRoutes };