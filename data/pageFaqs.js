const existingFaqRoutes = new Set([
  '/', '/faqs', '/faqs', '/air-arabia', '/blogs', '/blogs/[id]', '/commercial-pilot-license', '/dgca-ground-classes', '/dgca-ground-classes', '/doubt',
  '/courses/atpl', '/student-pilot-license-spl',
  '/commercial-pilot-license-eligibility',
  '/dgca-computer-number', '/dgca-full-form',
  '/dgca-ground-classes-in-india', '/dgca-pariksha', '/egca-login',
  '/how-to-become-a-pilot-after-12th', '/lead-magnets', '/lead-magnets/dgca-exam-checklist',
  '/pilot-training-in-india',
  '/ppl-full-form', '/rtr-full-form-meaning-importance-and-complete-guide', '/student-checklists',
  '/pilot-training-in-delhi', '/pilot-training-in-dwarka',
  /*
   * Added 2026-09-15. Each of these renders its own FAQ section and its own
   * FAQPage node. Without this gate Layout injected a second FAQ block and a
   * second FAQPage node underneath it, so the page shipped two competing
   * FAQPage nodes and a visibly duplicated block. Any new page that writes
   * its own FAQs must be listed here in the same commit.
   */
  '/cadet-pilot-program', '/dgca-class-2-class-1-medical',
  '/blogs/aviation-jobs-besides-pilot', '/faq',
  '/how-to-choose-an-aviation-academy', '/commercial-pilot-license-salary',
  '/full-form-of-cpl-commercial-pilot-license',
  '/icse-full-form', '/cbse-full-form',
  '/how-long-does-it-take-to-become-a-pilot', '/pilot-training-abroad', '/online-dgca-ground-classes', '/cpl-flight-training',
  '/pilot-training-in-sri-lanka',
  '/commercial-pilot-license-admission-process', '/blogs/dgca-exam-guide',
  '/pilot-career-counselling',
  '/ame-aircraft-maintenance-engineer',
  /*
   * Added 2026-09-16. These twelve emit their own FAQPage node as a hand-written
   * object rather than through generateFAQSchema, so the earlier audit — which
   * grepped for generateFAQSchema — missed every one of them. Each was shipping
   * TWO FAQPage nodes and, worse, four generic fallback questions that nobody
   * wrote for that page, rendered underneath its real ones.
   *
   * When auditing this gate in future, grep for the FAQPage type as well as for
   * generateFAQSchema. A page can emit the node either way.
   */
  '/blogs/how-pilots-build-hours',
  '/blogs/cpl-training-india-vs-abroad',
  '/blogs/cpl-simulator-hours-dgca-rules',
  '/blogs/cpl-cross-country-flight-requirement-india',
  '/blogs/cpl-night-flying-hours-requirement-india',
  '/blogs/flying-instructor-rating-for-pilots-in-india',
  '/blogs/instrument-rating-for-pilots-in-india',
  '/blogs/multi-engine-rating-for-pilots-in-india',
  '/blogs/type-rating-for-pilots-in-india',
  '/blogs/mcc-training-for-pilots-in-india',
  '/blogs/cpl-vs-atpl-difference-india',
  '/blogs/become-pilot-without-physics-and-maths-class-12',
  '/commercial-pilot-license-syllabus',
  /*
   * /commercial-pilot-license-salary joined this gate on 2026-09-15 when it was
   * rebuilt with its own FAQs. Its old routeContent entry was deleted in the
   * same edit: every answer in it restated a salary figure from the page as it
   * then stood — 1.5-3 lakh entry, 6-10 lakh captain, four per-country bands —
   * and none of those figures had a source. Leaving them here would have kept
   * them shipping in an FAQPage node after the page itself had dropped them.
   */
  '/privacy-policy', '/terms', '/sitemap', '/404',
]);

const routeContent = {
  '/about-us': {
  title: 'About We One Aviation Academy: FAQs',
  questions: [
    ['What does We One Aviation Academy provide?', 'We teach DGCA ground subjects and arrange flight training with partner flying schools. The academy does not own aircraft or simulators, operate a flying school, or place students into airline jobs.'],
    ['Where is the academy classroom?', 'The academy’s stated physical classroom is at C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi, Delhi 110077.'],
    ['Can students outside Delhi study with the academy?', 'Students outside Delhi can join online batches for DGCA ground-class preparation. This does not mean the academy has a physical classroom or branch in their city.'],
    ['Where does flight training take place?', 'Flight training is arranged with partner flying schools and takes place at the selected school, not at the Dwarka classroom. Confirm the current school, location, terms, and availability before applying.'],
    ['Does the academy operate a DGCA-approved flying training organisation?', 'No. The academy teaches ground subjects and does not operate aircraft or a flying school. Check any flying training organisation’s current status against DGCA’s published information.'],
    ['Where can I read about the CPL pathway and ground classes?', 'See the existing Commercial Pilot Licence pathway and DGCA ground-class pages for course and regulatory information.'],
  ],
},
  '/contact': {
  title: 'Contact We One Aviation: FAQs',
  questions: [
    ['How can I contact We One Aviation Academy?', 'Use the contact form, call the primary academy number +91 96673 70747, or message the WhatsApp and lead number +91 93556 11996. You can also write to info.weoneaviation@gmail.com.'],
    ['Where is the academy located?', 'The academy’s stated physical classroom is at C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi, Delhi 110077.'],
    ['Can I ask about online DGCA ground classes from outside Delhi?', 'Yes. The academy states that students outside Delhi can join online batches. Use the contact form or primary phone number to ask about current access.'],
    ['What should I include in a contact-form enquiry?', 'Select the course topic you are asking about and include the contact details needed for a reply. The form opens a WhatsApp message with the enquiry details.'],
    ['Does the academy publish response times or office hours?', 'No response-time estimate or office-hours schedule is stated on this page. Contact the academy directly to confirm current availability.'],
  ],
},
  '/courses/cpl': {
  title: 'CPL Training FAQs',
  questions: [
    ['Who is eligible for Commercial Pilot License training?', 'Applicants generally need 10+2 with Physics and Mathematics, the required DGCA medical certification, English proficiency, and the minimum age prescribed for the CPL skill test.'],
    ['How long does CPL training take?', 'There is no verified fixed timeline. Ground-class batches and flying-school schedules vary, so confirm the current timetable with the academy and selected flying school.'],
    ['What is the approximate CPL training fee in India?', 'There is no verified current total in this guide. Ask the academy and selected flying school for separate written quotes covering ground classes, examinations, flying, medicals, and other charges.'],
    ['What does the CPL syllabus include?', 'The program combines DGCA ground subjects, navigation, meteorology, air regulations, technical subjects, radio telephony, instrument training, solo and cross-country flying, and the CPL skill test.'],
    ['What careers are available after earning a CPL?', 'CPL holders can build experience toward airline first-officer roles, instructing, charter, corporate, cargo, and other commercial aviation positions subject to employer and regulatory requirements.'],
    ['How many flight hours are required for a CPL?', 'The Aircraft Rules, 1937 require a minimum of 200 hours as pilot of an aeroplane, including at least 100 hours as pilot-in-command, 20 hours of cross-country PIC time, 10 hours of instrument time, and 5 hours of night flying.'],
    ['What DGCA medical certification is needed for CPL?', 'Candidates need a DGCA medical certificate, which covers vision, hearing, cardiovascular, neurological, and general fitness standards required to hold a commercial licence.'],
    ['Can I complete my CPL flying training abroad?', 'Flight training may be arranged through a selected partner flying school. Confirm the current school, country, availability, terms, and applicable licence-conversion requirements before applying.'],
    ['How many DGCA exam papers are required for CPL?', 'Candidates clear five DGCA written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is examined separately, under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025, and is required for CPL issue.'],
  ],
},
  '/airline-preparation-course': {
  title: 'Airline Preparation Course FAQs',
  questions: [
    ['Who is the Airline Preparation Course in Dwarka designed for?', 'The course provides airline-career preparation and interview practice. Ask the academy about the current syllabus and intended participant profile.'],
    ['What does the Airline Preparation Course cover?', 'The course covers aviation-career preparation and interview practice. Confirm the current syllabus and any included activities directly with the academy.'],
    ['What are the admission requirements?', 'Applicants are expected to have completed high school or an equivalent qualification, meet the applicable age requirements, communicate effectively in English, maintain the required physical fitness, and have a basic understanding of mathematics and physics. Some programs may also include an assessment or interview.'],
    ['Where is the course conducted?', 'The academy’s physical classroom is in Dwarka, Delhi. Ask the academy to confirm the current delivery format and schedule.'],
    ['How does the course prepare students for airline employment?', 'The course provides interview preparation and career guidance. It does not guarantee employment; hiring decisions rest with each operator.'],
    ['How can I prepare for the course examination?', 'The page recommends understanding the exam format, reviewing course materials, creating a study schedule, practising sample questions, taking mock exams, seeking instructor guidance, using additional resources, and maintaining a healthy routine.'],
    ['Is the Airline Preparation Course certificate globally recognized?', 'The course provides a certificate of completion. The project does not identify an external recognition or accreditation authority; employers set their own recruitment requirements.'],
    ['Do international students need a visa for this course?', 'International students interested in enrolling are advised to ensure they meet the visa requirements applicable to studying in the country where the training is delivered.'],
    ['Does the course include an admissions test or interview?', 'Some intakes may require candidates to go through an admissions test or interview to assess their aptitude and commitment to a career in aviation.'],
  ],
},
  '/emirates-cadet-pilot-program': {
  title: 'Emirates Cadet Pilot Program FAQs',
  questions: [
    ['What is the Emirates Cadet Pilot Program?', 'It is a specialized training pathway created by Emirates Airline that takes candidates with zero flying experience through ground school, flight training, simulator sessions, and Multi-Crew Cooperation training toward becoming First Officers.'],
    ['Where is Emirates cadet training conducted?', 'All training is conducted at the Emirates Flight Training Academy (EFTA) at Dubai World Central, using Diamond DA42 and Cirrus SR22 aircraft, full-flight simulators, and glass-cockpit-equipped aircraft with international instructors.'],
    ['Who can apply for the Emirates Cadet Pilot Program?', 'Emirates publishes the fully sponsored National Cadet Pilot Programme as an Emiratisation programme, for UAE nationals. Emirates Flight Training Academy separately admits international cadets, who fund their own training. The baseline for any ab-initio route is school-leaving mathematics, physics and English, no prior flying experience, and a Class 1 medical accepted by the regulator that will issue the licence — which for training in Dubai is the UAE authority, not DGCA. Age bands and English test scores are published per intake; read them on the Emirates careers site rather than here.'],
    ['What does the Emirates cadet training curriculum include?', 'The program covers ground school (aviation theory, air law, meteorology, navigation, aircraft systems), hands-on flight training, simulator training including jet transition and MCC, and Emirates-specific jet orientation. Graduates receive a CPL with Multi-Engine Instrument Rating (MEIR).'],
    ['How much does the Emirates Flight Training Academy program cost?', 'The sponsored National Cadet Pilot Programme is published by Emirates as a fully sponsored route for UAE nationals. International cadets at the academy fund their own training. We do not print a figure: the fee is set and revised by the academy, and the range this page used to carry was not traceable to any Emirates document. Ask the academy directly, get it in writing, and ask what it excludes — accommodation, visa, medical, examinations, and licence conversion if you intend to fly in India.'],
    ['Does the Emirates cadet route guarantee a job or an interview?', 'No, and this page previously said it guaranteed an interview, which was wrong. Emirates\' own release inviting applicants to the academy states that candidates interested in opportunities with the airline are required to pass the selection process the airline puts in place. Completing the training qualifies you to be considered; it does not commit the airline to anything. What the route does offer is a structured ab-initio path, year-round flying weather, and a large academy fleet — which is what actually governs how quickly hours accumulate.'],
    ['What happens after completing the Emirates cadet program?', 'A graduate holds a licence, not a job, and must pass the airline\'s own selection to be hired. If the intention is to fly in India, the licence issued in the UAE has to be converted to a DGCA licence first — a step with its own time and cost that a headline training fee will not show, and one worth putting in the plan at the start rather than discovering at the end.'],
    ['How do I apply to the Emirates Cadet Pilot Program?', 'Applications are made directly through the official Emirates Flight Training Academy website, and candidates should be ready with academic documents, identification, and prepare for aptitude assessments, interviews, and medical screening.'],
  ],
},
  '/qatar-airways-cadet-pilot-program': {
  title: 'Qatar Airways Cadet Pilot Program FAQs',
  questions: [
    ['What is the Qatar Airways Cadet Pilot Program?', 'It is a structured pathway described on this page as training selected candidates from the ground up to become First Officers with Qatar Airways. The programme focuses on academic performance, flight training, leadership, communication, safety, and operational discipline.'],
    ['Who can apply for the Qatar Airways Cadet Pilot Program?', 'Qatar Airways runs a national cadet programme for Qatari nationals and opens international intakes separately rather than continuously, so which intake is open decides whether you are eligible at all. The baseline for an ab-initio route is school-leaving mathematics, physics and English and no prior flying experience. The medical is a Class 1 accepted by the Qatar Civil Aviation Authority, not a DGCA medical — this page used to say DGCA, which was wrong. Age bands, English scores and fees are published by the airline per intake and are not reproduced here, because a current set could not be verified against a Qatar Airways document.'],
    ['Is previous flying experience required?', 'No. The page describes the programme as a zero-to-ATPL pathway designed for candidates without prior flying experience.'],
    ['Where does Qatar Airways cadet training take place?', 'The page identifies Qatar Aeronautical Academy in Doha as the main training base and says some batches may complete parts of training in the UK, Australia, or South Africa depending on the phase and capacity. Confirm the current locations with the official programme before relying on them.'],
    ['What does the Qatar Airways cadet programme focus on?', 'The listed focus areas are academic excellence, advanced flight training, leadership and communication skills, safety, and operational discipline.'],
    ['What facilities are available during training?', 'The page lists modern flight simulators, advanced training aircraft, experienced instructors, and a multicultural aviation training environment.'],
    ['What training level does the program take candidates to?', 'The program is described as a zero-to-ATPL pathway, training candidates from no prior flying experience through to Airline Transport Pilot License level.'],
    ['Can We One Aviation help me prepare for the Qatar Airways cadet selection process?', 'Yes, We One Aviation Academy offers guidance for aspiring pilots preparing for cadet selection processes at top international airlines, including DGCA ground training and interview preparation.'],
  ],
},
  '/spice-jet': {
  title: 'SpiceJet Cadet Pilot Programme FAQs',
  questions: [
    ['What does the SpiceJet Cadet Pilot Programme offer?', 'The page describes a pathway toward an Indian DGCA Commercial Pilot License and a Q400 or B737 Type Rating, with a Letter of Intent for a First Officer role described as being handed out on joining.'],
    ['What are the eligibility requirements listed for the SpiceJet cadet programme?', 'The page lists Indian nationality or OCI status, age 17-35, minimum height of 158 cm, fluent English, a valid Indian passport, 10+2 with at least 60% in English, Physics, and Mathematics, and DGCA medical clearance under DGCA guidelines.'],
    ['What selection stages are included?', 'The four-phase selection process includes the COMPASS aptitude test, Complex Control Task (CCT), Psychometric Test, and Personal Interview, listed at 90, 10, 60, and 10 minutes respectively.'],
    ['What training phases are included?', 'The programme includes pre-flying ground school and single-engine CPL and instrument-rating training, SpiceJet airline induction training, and Q400 or B737 Type Rating with technical ground school and full-flight simulator training.'],
    ['How many training hours are listed?', 'The programme lists 140 hours of pre-flying ground school, 200 hours at the flying academy, and 240 hours of post-flying ground school.'],
    ['What fee instalments are listed for the programme?', 'The page lists four instalments of ₹10 lakh, ₹30 lakh, ₹25 lakh, and ₹24.50 lakh plus taxes. It also lists separate application and selection-process fees.'],
    ['What is the application fee to register for this programme?', 'A non-refundable application fee of ₹5,000 is payable at online registration, followed by a separate non-refundable selection process fee of ₹20,000 to proceed to the testing phases.'],
    ['Is a scholarship available for the SpiceJet cadet programme?', 'Yes, top-performing candidates can receive scholarships of up to ₹30 lakh based on 10+2 academic performance or JEE rank, applied across the 2nd, 3rd, and 4th fee instalments.'],
    ['Which programme variants does SpiceJet offer?', 'Candidates can choose the core Cadet Pilot Programme, or combine it with a BBA degree (for 10+2 students) or an MBA degree (for graduates), both from a UGC-recognised university.'],
    ['Is a Multi-Engine Rating required for this programme?', 'No, the page notes that SpiceJet does not require a Multi-Engine Rating for induction into its Q400/B737 fleet.'],
  ],
},
  '/airindia-pilot-preparation': {
    title: 'Air India Pilot Interview Preparation FAQs',
    questions: [
      ['Who is the Air India Pilot Interview Preparation course for?', 'The programme is designed for CPL holders preparing for airline recruitment and Type Rated pilots, including A320 and B737 pilots, targeting Air India fleet opportunities.'],
      ['Which Air India selection stages does the preparation cover?', 'The programme covers psychometric or ADAPT-style assessments, group discussions, and personal interviews including HR and technical rounds.'],
      ['What training is provided for CPL holders?', 'The CPL track includes ADAPT and psychometric test strategies, group discussion practice, HR and technical interview preparation, airline knowledge, SOP awareness, confidence building, and realistic mock assessments.'],
      ['How does the programme support Type Rated pilots?', 'Type Rated pilots receive aircraft-specific technical interview preparation, scenario-based line-operation questions, HR interview coaching, airline SOP and CRM preparation, and airline-level mock interviews.'],
      ['What are the available batch formats?', 'Contact the academy to confirm the current schedule, batch format, and availability.'],
      ['How does We One Aviation tailor the preparation to Air India?', 'The programme uses airline-professional mentorship, realistic mock assessments, personalized feedback, improvement plans, and preparation focused on Air India hiring patterns.'],
    ],
  },
  '/indigo-pilot-preparation': {
    title: 'IndiGo JFO Interview Preparation FAQs',
    questions: [
      ['Who should join IndiGo JFO interview preparation?', 'The programme is designed for fresh CPL holders entering airline recruitment, A320 Type Rated pilots targeting IndiGo fleet operations, airline interview candidates, and pilots seeking stronger group-discussion and personal-interview performance.'],
      ['Which stages of the IndiGo JFO selection process are covered?', 'Preparation covers ADAPT and psychometric assessments, group discussions, HR interviews, and technical interviews.'],
      ['What does the CPL holder preparation track include?', 'The CPL track includes cognitive and situational assessment strategies, simulated group discussions, HR and technical mock interviews, IndiGo airline knowledge, SOP basics, communication coaching, and confidence development.'],
      ['What is included for A320 Type Rated pilots?', 'The Type Rated track covers Airbus A320 systems and limitations, scenario-based airline questions, HR interview polishing, CRM and fatigue-management concepts, IndiGo SOP understanding, and panel-style mock interviews.'],
      ['What training formats and batches are available?', 'Contact the academy to confirm the current course format, schedule, and availability.'],
      ['How does the programme provide personalized preparation?', 'Airline pilot mentors conduct realistic mock tests and simulations, then provide individual feedback reports and an improvement plan based on each candidate’s performance.'],
    ],
  },
  '/airline-preparatory-classes/cass-compass': {
  title: 'CASS and COMPASS Preparation FAQs',
  questions: [
    ['What is the COMPASS aptitude test?', 'COMPASS is a computer-based pilot aptitude assessment covering verbal reasoning, numerical reasoning, spatial reasoning, abstract reasoning, working memory, attention, and concentration.'],
    ['What is included in the CASS assessment?', 'The page describes CASS preparation through aptitude modules, the Complex Control Task using joystick and rudder pedals, personality and psychometric assessment, and a personal interview.'],
    ['How long does the COMPASS test take?', 'The listed COMPASS aptitude battery takes approximately 90 minutes. Individual modules are timed and may include verbal, numerical, spatial, abstract reasoning, memory, and attention tasks.'],
    ['What does the Complex Control Task measure?', 'The CCT measures joystick tracking, rudder-pedal coordination, eye-hand-foot coordination, divided attention, and the ability to control a simulated aircraft while completing another task.'],
    ['How should candidates prepare for CASS and COMPASS?', 'The page recommends practising mental arithmetic, spatial orientation, memory recall, multitasking, joystick control, CRM principles, and honest, consistent responses in personality assessments.'],
    ['What happens after the CASS and COMPASS tests?', 'Candidates who progress through the aptitude, control, and personality stages attend a personal interview covering communication, motivation, aviation knowledge, situational judgment, and programme fit.'],
    ['How many modules make up the full COMPASS test?', 'The test includes 8 modules: Verbal Reasoning, Numerical Reasoning, Spatial Reasoning, Abstract Reasoning, Working Memory, Attention & Concentration, CCT, and Personality & Psychometric Profile.'],
    ['How many attempts are allowed for the COMPASS test?', 'The page lists a maximum of 1-2 attempts, making thorough preparation important before sitting the test.'],
    ['Who is eligible to take the COMPASS test for the cadet programme?', 'Eligibility listed includes 10+2 with Physics and Mathematics (minimum 50%), a DGCA medical certificate, age typically 17-26 years, English proficiency, and no prior flying experience required.'],
    ['Does We One Aviation offer COMPASS preparation coaching?', 'Yes, the page states We One Aviation Academy offers dedicated coaching covering all 8 COMPASS modules, CCT joystick practice, personality test strategy, and mock interview sessions.'],
  ],
},
  '/airline-preparatory-classes/interview-preparation': {
  title: 'Airline Pilot Interview Preparation FAQs',
  questions: [
    ['What types of airline pilot interviews are covered?', 'The guide covers HR panel interviews, technical aviation interviews, competency-based interviews using the STAR method, and group discussions or group exercises.'],
    ['Which airline interview topics should pilots prepare for?', 'Preparation includes motivation, personal background, aviation knowledge, aircraft systems, meteorology, air regulations, navigation, CRM, teamwork, decision-making, stress management, and airline-specific research.'],
    ['What is the STAR method for airline interviews?', 'STAR means Situation, Task, Action, and Result. Candidates use it to explain a real experience clearly while demonstrating competencies such as leadership, teamwork, decision-making, and handling pressure.'],
    ['How long can airline pilot interviews take?', 'The page lists approximate durations of 15-30 minutes for HR interviews, 20-45 minutes for technical interviews, 30-60 minutes for competency interviews, and 20-30 minutes for group discussions or exercises.'],
    ['How should candidates prepare for technical questions?', 'Candidates should revise weather and METAR reading, aircraft systems, air traffic procedures, navigation and heading calculations, VFR and IFR concepts, radio phraseology, and the aircraft type operated by the target airline.'],
    ['What common interview mistakes should pilots avoid?', 'The guide warns against vague answers, failing to research the airline, freezing on technical questions, appearing overconfident, criticising previous institutions, and ending without thoughtful questions for the panel.'],
    ['How much does body language matter in a pilot interview?', 'The guide notes that over 55% of communication is non-verbal, so eye contact, posture, hand gestures, facial expression, voice pace, and professional appearance are all evaluated alongside the answers given.'],
    ['Does interview preparation vary by airline?', 'Yes, the guide provides airline-specific likely questions and preparation tips for SpiceJet, IndiGo, Air India, Emirates, and Qatar Airways, since each airline has a distinct interview culture and focus.'],
    ['How long does the recommended interview preparation take?', 'The guide outlines a 4-week roadmap: understanding your own background and motivation, mastering the STAR method, building aviation knowledge, and conducting mock interviews with refinement.'],
    ['Does We One Aviation offer interview coaching?', 'Yes, We One Aviation Academy\'s Airline Preparatory Classes include dedicated interview coaching with personalised mock interviews, STAR answer structuring, airline-specific preparation, and expert feedback.'],
  ],
},
  '/airline-preparatory-classes/psychometry': {
  title: 'Pilot Psychometric Test Preparation FAQs',
  questions: [
    ['What is a pilot psychometric assessment?', 'A pilot psychometric assessment evaluates cognitive ability, personality, stress tolerance, teamwork, decision-making, spatial awareness, multitasking, and psychological suitability for airline operations.'],
    ['Which psychometric and aptitude tests are covered?', 'The page covers cognitive and aptitude tests, mental arithmetic, spatial orientation, multitasking, short-term memory, psychomotor coordination, personality assessment, and the personal interview stage.'],
    ['What is tested in a psychomotor or CCT assessment?', 'Psychomotor testing may use joystick and rudder-pedal tasks to assess tracking accuracy, hand-eye coordination, foot coordination, reaction control, and divided attention.'],
    ['How do airline assessment formats differ?', 'The guide compares assessment formats for SpiceJet, IndiGo, Air India, Emirates, and Qatar Airways. Each may use a different combination of aptitude, psychomotor, personality, group, and interview stages.'],
    ['How can I improve mental arithmetic and spatial reasoning?', 'The page recommends timed arithmetic, percentage and speed-distance-time practice, 3D rotation exercises, map and compass work, attitude-indicator study, and regular memory and multitasking drills.'],
    ['How should candidates answer personality tests?', 'Candidates should answer honestly and consistently rather than trying to produce artificial responses. The page recommends understanding CRM, teamwork, stress response, leadership, and safety-focused behaviour.'],
    ['How many attempts are typically allowed for a pilot psychometry test?', 'Most airlines allow only 1-2 attempts, which is why the page emphasises that structured preparation beforehand is critical.'],
    ['How long does a full psychometry assessment day take?', 'A complete selection day covering all phases — aptitude, psychomotor, personality, and interview — typically takes around 3-5 hours.'],
    ['Which assessment system does each airline use?', 'The page lists SpiceJet\'s COMPASS, IndiGo\'s ifly/DLR-PILAPT battery, Air India\'s ADAPT-based system, Emirates\' PILAPT, and Qatar Airways\' own aptitude-plus-simulator assessment.'],
    ['Does We One Aviation offer psychometry test coaching?', 'Yes, We One Aviation Academy\'s Airline Preparatory Classes include psychometry coaching, mock tests, CCT practice sessions, interview preparation, and DGCA ground classes.'],
  ],
},
  '/flying-school/india': {
  title: 'Pilot Training in India FAQs',
  questions: [
    ['What pilot-training programme is described for India?', 'The page is a provider-selection guide. Confirm current course options, eligibility, flight-hour requirements, schedules, aircraft, and fees with the relevant regulator and selected flying school.'],
    ['What are the duration and fee estimates for pilot training in India?', 'There is no verified fixed course price or completion timeline stated here. Request a current written quote and schedule from the selected flying school, including what is and is not included.'],
    ['What are the eligibility requirements for CPL training in India?', 'Eligibility and licensing requirements should be checked against current DGCA rules and confirmed with the selected flying school before enrolment.'],
    ['What are the main stages of Indian CPL training?', 'Training stages, course scope, and sequencing depend on current DGCA requirements and the selected flying school. Confirm the written training plan directly with the provider.'],
    ['Which aircraft may be used for training in India?', 'Aircraft types, availability, equipment, and maintenance arrangements vary by flying school. Ask the selected provider for its current written details.'],
    ['Why choose India for pilot training?', 'Compare regulator requirements, provider approval, training location, schedules, facilities, and written fee terms. Verify each school-specific detail directly with the relevant provider.'],
    ['What age do I need to be to start pilot training in India?', 'Check the current DGCA age requirements for the licence you intend to pursue before enrolling.'],
    ['Which locations in India offer the best flying conditions?', 'Weather and operating conditions vary by location and season. Ask the selected flying school for current, location-specific information before choosing a training base.'],
    ['How many flight training academies are listed on this page?', 'This page does not endorse or list specific flying academies. Use the current DGCA FTO information and verify each provider directly.'],
  ],
},
 '/flying-school/usa': {
  title: 'Pilot Training in the USA FAQs',
  questions: [
    ['What training pathway is offered in the USA?', 'This page is a general research guide and does not confirm a current USA-specific partner school or programme. Verify course scope, approvals, schedules, fees, and licensing rules with the selected school and relevant regulators.'],
    ['Why consider flight training in the USA?', 'Compare provider status, course scope, training location, current fees, schedule, and licence-conversion requirements. Verify current details directly with the school and relevant regulators.'],
    ['What aircraft are available for USA flight training?', 'Aircraft and simulator availability varies by school. Request the selected provider’s current inventory and written training plan.'],
    ['What benefits are included in a USA programme?', 'No scholarship, complimentary training, accommodation, or other benefit is confirmed on this page. Verify any written offer and its terms with the issuer.'],
    ['What is the career pathway after USA flight training?', 'Licence stages and employment requirements depend on the licensing authority and employer. Confirm the current requirements directly; completing training does not guarantee employment.'],
    ['Who is the USA guide intended for?', 'It is for readers researching provider approval, training scope, costs, schedules, and licence-conversion requirements before considering a school.'],
    ['Is a free instrument rating or flight-hour building included?', 'No free training or hour-building arrangement is confirmed here. Ask the provider for any current offer in writing and verify its terms before relying on it.'],
    ['How many flight hours will a USA programme require?', 'Flight-hour requirements depend on the licence and ratings sought and the applicable authority. Confirm current requirements with the regulator and selected school.'],
    ['Is accommodation provided during USA flight training?', 'Accommodation is not confirmed on this page. Ask the selected school directly whether it is available and request written terms.'],
  ],
},
  '/flying-school/australia': {
  title: 'Pilot Training in Australia FAQs',
  questions: [
    ['What pilot-training programme is available in Australia?', 'This page is a general research guide and does not confirm a current Australia-specific partner school or programme. Verify course scope and availability directly with a selected provider.'],
    ['How long does pilot training in Australia take?', 'No fixed course duration is verified here. Request the selected provider’s current written schedule and confirm what assumptions it uses.'],
    ['What are the Australia programme fee and eligibility details?', 'No current provider fee or programme-specific eligibility terms are verified here. Confirm written fees with the school and current requirements with the relevant authorities.'],
    ['What are the training phases in Australia?', 'Training stages and course scope depend on the selected provider. Request its current written course plan and verify any licence requirements with the relevant regulators.'],
    ['What visa and medical requirements are listed?', 'Visa and medical requirements depend on current rules and the intended programme. Confirm them with the relevant government authority and selected school.'],
    ['How can an Australian licence be used in India?', 'DGCA independently determines licence-conversion requirements. Confirm the current process and required documents with DGCA before choosing a training route.'],
    ['Can I work while studying on an Australian student visa?', 'Work conditions depend on current visa rules. Confirm them with the relevant Australian government authority before making plans.'],
    ['Which aircraft are used for training in Australia?', 'Aircraft and simulator availability varies by school. Request the selected provider’s current inventory and written training plan.'],
    ['Do I get an academic qualification along with a pilot licence in Australia?', 'No combined pilot-licence and academic qualification is confirmed on this page. Verify any qualification, issuer, and recognition claims with the provider and relevant authority.'],
    ['Which locations in Australia offer the best flying conditions?', 'Weather and operating conditions vary by location and season. Ask a selected school for current location-specific information.'],
  ],
},
  '/flying-school/canada': {
  title: 'Pilot Training in Canada FAQs',
  questions: [
    ['Who regulates flight training in Canada?', 'Regulatory responsibilities and current requirements should be checked with Transport Canada and the selected provider. This page does not confirm a Canada-specific partner school or programme.'],
    ['Can a Canadian licence be used in India?', 'DGCA independently determines licence-conversion requirements. Confirm the current process and required documents with DGCA before choosing a training route.'],
    ['How long does commercial training in Canada usually take?', 'No fixed course duration is verified here. Request the selected provider’s current written schedule and confirm its assumptions.'],
    ['What should I check before paying a deposit to a Canadian school?', 'Verify the school’s current approvals and programme availability with the relevant authorities. Ask the provider for written course scope, schedule, fees, facilities, and refund terms.'],
    ['What language and paperwork requirements apply in Canada?', 'Language, immigration, and admission requirements depend on the current rules and selected programme. Confirm them with the relevant authorities and provider.'],
    ['What paperwork should I assemble before applying?', 'Request the selected provider’s current admissions checklist and verify any immigration or medical requirements with the relevant authorities.'],
    ['Is training in Canada better than training in India?', 'Compare verified course scope, provider terms, location, costs, and licence-conversion requirements for your circumstances. This page does not recommend or confirm a particular Canadian programme.'],
  ],
},
  '/flying-school/south-africa': {
  title: 'Pilot Training in South Africa FAQs',
  questions: [
    ['What pilot-training programme is available in South Africa?', 'This page is a general research guide and does not confirm a current South Africa-specific partner school or programme. Verify course scope and availability directly with a selected provider.'],
    ['How long and how much does training in South Africa take?', 'No fixed course duration or provider fee is verified here. Request the selected provider’s current written schedule and itemized quote.'],
    ['What are the eligibility requirements for training in South Africa?', 'Eligibility, medical, visa, and language requirements depend on the current rules and selected programme. Confirm them with the relevant authorities and provider.'],
    ['What are the training stages in South Africa?', 'Training stages and course scope depend on the selected provider. Request its current written course plan and verify licence requirements with the relevant regulators.'],
    ['Which aircraft and locations are available?', 'Aircraft, facilities, and training locations vary by provider. Confirm current details directly with the selected school; this page does not verify particular schools or locations.'],
    ['How does DGCA conversion work after training in South Africa?', 'DGCA independently determines licence-conversion requirements. Confirm the current process and required documents with DGCA before choosing a training route.'],
    ['What English proficiency test is required before flying in South Africa?', 'Language requirements depend on the current rules and selected provider. Confirm them with the relevant authority and school.'],
    ['What visa is needed to train in South Africa?', 'Visa requirements depend on current rules and individual circumstances. Confirm them with the relevant government authority before making plans.'],
    ['How many flying academies are listed for South Africa?', 'This page does not endorse or list specific flying academies. Use the current regulator information and verify each provider directly.'],
    ['Which South African cities offer the most flying days per year?', 'Weather and operating conditions vary by location and season. Ask a selected school for current location-specific information.'],
  ],
},
 '/best-flight-schools-in-usa': {
  title: 'Best Flight Schools in the USA FAQs',
  questions: [
    ['What makes We One Aviation\'s USA flight training a good choice?', 'This page is a general research guide and does not confirm a current USA-specific partner school or programme. Verify provider details directly before making arrangements.'],
    ['How many flying hours and how long does the program take?', 'Flight-hour requirements and completion schedules depend on the licence sought, provider, and student progress. Confirm current requirements with the regulator and selected school.'],
    ['What aircraft do USA flight schools use?', 'Aircraft and simulator availability varies by school. Request the selected provider’s current inventory and written training plan.'],
    ['What benefits are included with a USA programme?', 'No scholarship, complimentary training, accommodation, or other benefit is confirmed on this page. Verify any written offer and its terms with the issuer.'],
    ['How do weather conditions affect training schedules?', 'Weather and operating conditions vary by location and season. Ask the selected provider for current location-specific information and schedule assumptions.'],
    ['Who may find this USA flight-school guide useful?', 'It is intended for readers researching provider approval, course scope, fees, schedules, facilities, and licence-conversion requirements before making arrangements.'],
  ],
},
  '/courses': {
  title: 'Pilot Training Courses FAQs',
  questions: [
    ['What pilot-training courses does We One Aviation offer?', 'The courses page lists Commercial Pilot License, Private Pilot License, DGCA Ground Classes, and information about partner-arranged flight training options.'],
    ['What are the main CPL course details?', 'CPL eligibility and licensing requirements are set by DGCA. Ground-class schedules, flying-school arrangements, and fees vary; confirm current details with the academy and selected flying school.'],
    ['What are the PPL course details?', 'PPL eligibility and licensing requirements are set by DGCA. Training schedules and fees depend on the selected flying school; request current written information from the provider.'],
    ['What do the DGCA Ground Classes cover?', 'The ground programme covers Air Navigation, Meteorology, Air Regulations, Technical General and Technical Specific, RTR (Radio Telephony) preparation, mock tests, past papers, and doubt-clearing sessions.'],
    ['What international training options are listed?', 'Flight training is arranged through partner flying schools. Confirm the current school, country, availability, price, schedule, and any licence-conversion requirements directly before applying.'],
    ['What eligibility and medical requirements are shown?', 'The page lists minimum ages of 17 for PPL and 18 for CPL, 10+2 with Physics and Mathematics, DGCA-mandated medical fitness assessments, English proficiency, and the applicable flying-hour requirements.'],
    ['Is there a scholarship available for pilot training?', 'No current scholarship terms are verified here. Contact the academy for any current written eligibility requirements and conditions.'],
    ['What is the earning potential after becoming a commercial pilot?', 'No Indian airline publishes a pilot pay scale, so no figure can be traced to a primary source — the rupee bands that used to be here were removed on 15 September 2026 for that reason. What is true without a figure: pay rises with command, a captain earns materially more than a first officer, and a large part of the pay is linked to hours flown, which DGCA caps at 1,000 hours a year. See the salary page for the full treatment.'],
    ['What are the phases of CPL training listed on this page?', 'The pathway includes ground-subject preparation and flight training through a selected flying school. Phase schedules vary by provider and student progress; confirm the current schedule directly.'],
  ],
},
  '/cost-transparency': {
  title: 'Pilot Training Cost Transparency FAQs',
  questions: [
    ['What is the estimated total CPL training cost?', 'No current total for private academy and flying-school fees is verified here. Request itemized written quotes from the relevant providers and confirm regulator charges from the official source.'],
    ['What medical and documentation costs are listed?', 'The breakdown includes DGCA-mandated medical fitness assessments, DGCA Computer Number registration, and document verification and processing.'],
    ['Which CPL training costs are included in the standard package?', 'There is no verified standard package defined here. Ask the academy and selected flying school for itemized written quotes that identify included and excluded services.'],
    ['What expenses may be charged separately?', 'Potential additional expenses include Type Rating, MCC, FRTOL, food, transport, internet, extra flying hours, simulator re-bookings, accommodation upgrades, and licence conversion.'],
    ['What payment options are available?', 'Payment options and terms depend on the provider. Confirm current terms in writing with the academy and selected flying school.'],
    ['What can increase the final training cost?', 'The final cost can increase because of failed exam attempts, additional flying hours, extra simulator time, medical retesting, weather-related extensions, accommodation upgrades, and optional ratings.'],
    ['How does CPL training in India compare in cost to training abroad?', 'Costs depend on the selected flying school, course scope, living costs, and conversion requirements. Request comparable, itemized quotes for the full route from each provider.'],
    ['What discount is offered for paying the full training fee upfront?', 'No current upfront-payment discount is verified here. Confirm any offer and its written terms directly with the provider.'],
    ['What is the expected return on investment for CPL training?', 'This answer used to give a break-even period of around 24 months, worked from a ₹50 lakh investment and an assumed first officer salary. It was removed on 15 September 2026: the salary input was not sourced, and a financial projection built on an unsourced number is worse than no projection, because it reads as arithmetic. What can honestly be said is that the cost side is partly knowable and the income side is not, so plan against the cost — and note that a licence does not carry a job, so the clock does not start on graduation.'],
    ['How can students compare CPL training costs?', 'Compare current itemized quotes, including what is included, excluded, payable to third parties, and subject to change. Do not rely on an unverified total or discount.'],
  ],
},
  '/credentials': {
  title: 'Academy Credentials and Verification FAQs',
  questions: [
    ['What information is published on the We One Aviation credentials page?', 'The page describes the academy’s Dwarka classroom, DGCA ground-subject teaching, online batches for students outside Delhi, and years in operation.'],
    ['How long has We One Aviation been operating?', 'The page publishes the academy\'s founded year and years of operation using the academy data maintained on the site.'],
    ['What is the academy’s relationship to DGCA?', 'DGCA sets the relevant examinations and licensing requirements. We One Aviation teaches DGCA ground subjects; this page does not claim that the academy is DGCA-approved or accredited.'],
    ['How can I request credential verification?', 'Verification enquiries can be sent to info.weoneaviation@gmail.com using the contact information published on the page.'],
    ['What information is deliberately excluded from the page?', 'The page states that unsupported certification, trade-body, and partnership claims have been removed rather than published without evidence.'],
    ['When was the credentials page last updated?', 'The page currently displays a manually maintained last-updated label of August 19, 2026.'],
    ['Where does We One Aviation conduct its DGCA ground classes?', 'The page\'s closing section states that DGCA ground classes are conducted in Dwarka, New Delhi.'],
  ],
},

 '/lead-magnets/cpl-cost-breakdown': {
  title: 'CPL Cost Breakdown Guide FAQs',
  questions: [
    ['What countries does the CPL cost guide compare?', 'The guide explains cost categories and the need to compare provider quotes. Country-specific prices and schedules are not verified in this guide.'],
    ['What India CPL cost is shown in the guide?', 'No current private-training total is verified here. Request itemized written quotes from the academy and selected flying school, and confirm regulator charges from official sources.'],
    ['What international costs are listed?', 'No current international price ranges are verified here. Confirm fees, schedules, living costs, visa requirements, and conversion costs directly with the relevant providers and authorities.'],
    ['Which hidden costs should students plan for?', 'The guide identifies exam re-attempts, extra flying hours, simulator re-bookings, medical renewals, training extensions, accommodation upgrades, living costs, and international licence conversion fees.'],
    ['What payment options are discussed?', 'Payment, finance, scholarship, and discount terms depend on each provider. Confirm any current offer in writing with its issuer.'],
    ['What does the downloadable PDF provide?', 'The PDF provides a checklist of cost categories and questions for comparing written provider quotes. It does not assert current course prices or schedules.'],
    ['What discount is available for paying the India training fee in full?', 'No current full-payment discount is verified here. Confirm any written offer directly with its issuer.'],
    ['What are the listed pros and cons of each training destination?', 'The guide recommends comparing provider approval, course scope, schedules, fees, living costs, visa requirements, and licence-conversion rules. These vary by school and jurisdiction.'],
    ['Is the CPL cost breakdown guide free to download?', 'Yes, the page offers the guide as a free, instant PDF download with no credit card required.'],
  ],
},
  '/lead-magnets/pre-admission-checklist': {
    title: 'Pilot Training Pre-Admission Checklist FAQs',
    questions: [
      ['What eligibility should I check before pilot-training admission?', 'The checklist includes age, 10+2 with Physics and Mathematics, English proficiency, medical fitness, and Indian citizenship or valid visa status.'],
      ['Which documents should students gather before admission?', 'The checklist includes birth certificate, 10th and 12th certificates, Aadhaar, passport where available, PAN, identity and address proof, bank passbook, domicile and character certificates, and passport-size photographs.'],
      ['What does the DGCA medical examination cover?', 'The checklist covers eye, hearing and colour-vision testing, blood pressure, blood and urine work, ECG, chest X-ray, laboratory investigations and a psychological evaluation. Which of these apply to you depends on the certificate you are being examined for, so confirm the scope with your DGCA examiner.'],
      ['What is the DGCA Computer Number registration process?', 'The checklist directs students to create a DGCA account, upload medical and educational documents, submit personal and training details, pay the registration fee, and obtain the unique Computer Number used for DGCA examinations.'],
      ['What financial preparation is recommended?', 'Students should finalise the total training cost, arrange the first payment, seek loan approval if needed, identify sponsors, agree on the academy payment plan, and organise financial documents.'],
      ['What should students confirm at the admission meeting?', 'The checklist recommends confirming original documents, medical certificates, admission terms, accommodation, first-day timing, instructor contact details, payment schedule, curriculum, training plan, and start date.'],
    ],
  },
  '/commercial-pilot-license-admission-process': {
  title: 'CPL Admission Process FAQs',
  questions: [
    ['What is the first step in the CPL admission process?', 'The first step is checking age, education, medical fitness, and English proficiency before applying for professional pilot training.'],
    ['What are the main CPL eligibility requirements?', 'The page lists training from age 17, CPL issuance after age 18, 10+2 with Physics and Mathematics, DGCA medical certification, English proficiency, and the applicable flying-hour requirements.'],
    ['How should I choose a DGCA flying school?', 'The page recommends checking DGCA approval, instructor experience, modern aircraft and simulators, and whether the school provides complete ground and flight training.'],
    ['What happens during ground training and DGCA exams?', 'Students study Air Navigation, Meteorology, Air Regulations, Technical General, and Technical Specific before completing the required DGCA written examinations.'],
    ['How many flight hours are required in the admission guide?', 'The guide describes 200 flight hours, including solo, cross-country, instrument, and night flying, with logbook maintenance throughout the training.'],
    ['What does the final CPL application involve?', 'Applicants submit their logbook and supporting documents to DGCA, complete DGCA medical revalidation, and apply for CPL issuance after meeting the licensing requirements.'],
    ['What does We One Aviation\'s own admission procedure include?', 'It includes initial counselling, document verification, application submission, help scheduling DGCA-mandated medical fitness assessments, and an orientation and enrollment session.'],
    ['What do I need to submit when enrolling at a flying school?', 'After selecting a school, you fill out its enrollment form, provide the required documents, and make your first fee payment to begin the process.'],
    ['Does We One Aviation help with financing CPL training?', 'No financing, scholarship, or EMI promise is stated here. Any current payment or financing offer must be confirmed in writing directly with the provider.'],
  ],
},
  '/air-navigation': {
  title: 'Air Navigation FAQs',
  questions: [
    ['What is Air Navigation in DGCA pilot training?', 'Air Navigation is a DGCA written subject for CPL and PPL candidates covering position fixing, flight planning, radio aids, navigation computers, and aircraft movement from departure to destination.'],
    ['Which navigation topics are covered?', 'The page covers visual navigation, dead reckoning, map reading, time and direction calculations, VOR, ADF, DME, ILS, GPS, RNAV, FMS, and flight planning.'],
    ['What is taught in dead reckoning navigation?', 'Dead reckoning includes wind triangles, groundspeed, true airspeed, estimated time of arrival, heading calculations, and estimating aircraft position from a known position, speed, heading, and elapsed time.'],
    ['Who should study Air Navigation?', 'The course is intended for CPL and PPL students, flying-school cadets, and ATPL or airline-bound candidates who need DGCA examination preparation and practical flight-planning skills.'],
    ['How does the Air Navigation course prepare students?', 'The page describes DGCA-certified instructors, live VFR and IFR chart work, simulator navigation sessions, notes, question banks, mock tests, and practical flight-planning exercises.'],
    ['Why is Air Navigation important after the examination?', 'Navigation knowledge supports solo and cross-country flying, ATC position reporting, low-visibility operations, flight planning, emergency decision-making, and international aviation standards.'],
    ['Where does Air Navigation sit among the DGCA CPL written subjects?', 'It is one of four written subjects required under Schedule II, Section J of the Aircraft Rules, 1937 — alongside Air Regulations, Meteorology, and Aircraft and Engines — plus a practical Signals examination.'],
    ['How many modules does the Air Navigation syllabus cover?', 'The course is structured into 7 modules, from an introduction to navigation and time/direction calculations through map reading, dead reckoning, radio aids, GPS/RNAV, and flight planning.'],
    ['Where are Air Navigation classes conducted?', 'We One Aviation Academy runs Air Navigation classes in Dwarka, New Delhi, combining navigation computers with live flight-planning exercises alongside the written syllabus.'],
  ],
},
  '/air-regulations': {
  title: 'Air Regulations FAQs',
  questions: [
    ['What are Air Regulations in pilot training?', 'Air Regulations are the legal rules and procedures governing civil aviation, aircraft operations, licensing, airworthiness, airspace use, crew responsibilities, and aviation safety.'],
    ['What topics are covered in the Air Regulations syllabus?', 'The page covers ICAO, the Chicago Convention, DGCA structure, Rules of the Air, VFR and IFR, airspace classification, licensing rules, flight-duty limitations, aircraft documents, emergency procedures, and air traffic services.'],
    ['Which aviation documents should students understand?', 'The listed documents include Civil Aviation Requirements, the Aeronautical Information Publication, NOTAMs, METAR and TAF reports, and flight plans.'],
    ['What airspace topics are included?', 'Students study controlled and uncontrolled airspace, Flight Information Regions, Control Zones, Terminal Control Areas, Area Control Centres, right of way, collision avoidance, signals, lights, and markings.'],
    ['Who should study Air Regulations?', 'The subject is intended for CPL and PPL candidates preparing for DGCA examinations and for pilots who need a working understanding of national and international aviation rules.'],
    ['How should students prepare for the DGCA Air Regulations paper?', 'The page recommends starting with ICAO and DGCA basics, focusing on Annex 2 and Civil Aviation Requirements, memorising classifications and documents, practising mock tests, and checking current DGCA revisions.'],
    ['What are a licensed pilot\'s legal responsibilities under Air Regulations?', 'Pilots are responsible for ensuring the aircraft is airworthy, carrying all required documents on board, following ATC instructions, avoiding restricted or prohibited zones, logging flight time correctly, and declaring emergencies appropriately.'],
    ['What is the legislative foundation of India\'s aviation law?', 'India\'s aviation law is based on the Aircraft Act, 1934 and the Aircraft Rules, 1937, which are updated over time through Civil Aviation Requirements and DGCA orders.'],
    ['What happens if a pilot fails to comply with Air Regulations?', 'Non-compliance can result in licence suspension, penalties, or even criminal liability.'],
  ],
},
  '/aviation-meteorology': {
  title: 'Aviation Meteorology FAQs',
  questions: [
    ['What is Aviation Meteorology?', 'Aviation Meteorology is the study of atmospheric and weather conditions that affect flight planning, aircraft performance, visibility, turbulence, safety, and in-flight decision-making.'],
    ['What topics are covered in the Aviation Meteorology course?', 'The syllabus covers the atmosphere, temperature, pressure, density, winds, jet streams, clouds, rainfall, pressure systems, icing, turbulence, fog, visibility, METAR, TAF, SIGMETs, and aviation weather charts.'],
    ['How does meteorology help pilots?', 'Weather knowledge helps pilots plan safer routes, avoid storms and turbulence, interpret weather reports, manage poor visibility, improve fuel and time planning, and make informed decisions during changing conditions.'],
    ['Who should take the Aviation Meteorology course?', 'The course is intended for CPL and PPL students, DGCA ground-school learners, airline aspirants, and aviation enthusiasts who need structured weather knowledge for training and operations.'],
    ['How long is the Aviation Meteorology course?', 'The page lists a duration of approximately 2-4 weeks, with classroom, online, and hybrid delivery options in Dwarka, Delhi.'],
    ['Does the course include practical weather training?', 'Yes. The page describes simulated weather briefings, METAR and TAF decoding drills, real-world weather maps, chart interpretation, and DGCA-focused question preparation.'],
    ['Where does Meteorology sit among the DGCA CPL written subjects?', 'It is one of four written subjects required under Schedule II, Section J of the Aircraft Rules, 1937 — alongside Air Regulations, Air Navigation, and Aircraft and Engines — plus a practical Signals examination.'],
    ['Do students receive a certificate after completing the course?', 'Yes, the page states students receive a Certificate of Completion from We One Aviation Academy after finishing the Aviation Meteorology course.'],
    ['What formats is the Aviation Meteorology course offered in?', 'The course is available in classroom, online, and hybrid formats at the academy\'s Dwarka Sector-7, Delhi location.'],
  ],
},
  '/rtr-a': {
  title: 'RTR Aero Licence FAQs',
  questions: [
    ['What is RTR (Aero)?', 'RTR (Aero) is the Radio Telephone Operator (Restricted) Certificate and Licence required to operate aircraft radio equipment in Indian airspace under current DGCA regulations.'],
    ['What are the eligibility requirements for RTR (Aero)?', 'The page lists a minimum age of 16, Class X or equivalent education, a six-week waiting period after failing an examination, and Government of India security clearance for non-Indian applicants.'],
    ['What is the RTR (Aero) examination structure?', 'The examination has a written paper followed by a practical test. The written paper covers regulations, radio principles, radio practice, and radio telephony.'],
    ['What does the RTR practical examination test?', 'The practical test uses a simulated environment to assess the phonetic alphabet, radio-telephone procedure, communication with mobile and base stations, message preparation, traffic exchange, weather information, position reporting, and distress communications.'],
    ['When can a candidate take the practical RTR examination?', 'A candidate must pass the written examination before taking the practical examination. The page states that the practical must be passed within three years of passing the written paper.'],
    ['Who needs an RTR (Aero) licence?', 'The page identifies CPL applicants, private pilots operating aircraft radio equipment, foreign licence holders converting to the Indian register, flight instructors, and cadet pilots as relevant candidates.'],
    ['Which rules currently govern RTR (Aero)?', 'Since 25 June 2025, RTR (Aero) is governed by the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025, notified under the Bharatiya Vayuyan Adhiniyam, 2024, and administered by the DGCA, replacing the earlier WPC route.'],
    ['Is anyone exempt from the RTR written examination?', 'Yes, the Director General may exempt qualified pilots of the Indian Air Force, Navy, Army, or Coast Guard, holders of a valid RTR certificate under the earlier 1954 Rules, and holders of an equivalent licence from a Commonwealth country or the Philippines.'],
    ['How does We One Aviation help students prepare for RTR (Aero)?', 'The academy offers one-on-one mock viva sessions, daily phraseology drills, script-based simulations, group discussions, voice clarity training, and access to past RTR questions and exam feedback.'],
  ],
},
  '/technical-general': {
  title: 'Technical General FAQs',
  questions: [
    ['What is Technical General in pilot training?', 'Technical General is the DGCA Aircraft and Engines subject covering aircraft structures, aerodynamics, propulsion, systems, instruments, avionics, and the principles of flight.'],
    ['Which topics are covered in Technical General?', 'The page covers aircraft structures and materials, aerodynamics and flight controls, piston and jet engines, aircraft systems, instruments and avionics, landing gear and brakes, and fire detection and protection.'],
    ['What aircraft systems do students study?', 'Students study fuel, hydraulic, electrical, cooling, lubrication, ignition, landing-gear, brake, propeller-pitch, RPM-control, fire-detection, and fire-suppression systems.'],
    ['Why is Technical General important for pilots?', 'Technical knowledge improves situational awareness during system failures, supports safer decision-making, improves communication with engineers and ground teams, and prepares candidates for DGCA examinations.'],
    ['Who should study Technical General?', 'The subject is intended for CPL and PPL candidates preparing for DGCA examinations and pilots who want a stronger understanding of the aircraft they operate.'],
    ['How does We One Aviation teach Technical General?', 'The page describes aircraft models, system diagrams, animations, real-aircraft visits, interactive sessions, recorded lectures, DGCA-style mock tests, and question-bank practice.'],
    ['Where does Technical General sit among the DGCA CPL written subjects?', 'It is the paper DGCA names Aircraft and Engines, one of four written subjects required under Schedule II, Section J of the Aircraft Rules, 1937, alongside Air Regulations, Air Navigation, and Meteorology.'],
    ['How many modules does the Technical General syllabus cover?', 'The syllabus is structured into 7 modules, covering aircraft structure and materials, aerodynamics and flight controls, engines and propulsion, aircraft systems, instruments and avionics, landing gear and brakes, and fire detection and protection.'],
    ['Do students get hands-on exposure to real aircraft?', 'Yes, the course includes visits to real aircraft for practical exposure to components, alongside aircraft models, system diagrams, and animations used in classroom teaching.'],
  ],
},
  '/your-guide-on-how-to-become-a-pilot-in-india': {
  title: 'How to Become a Pilot in India FAQs',
  questions: [
    ['What are the basic requirements to become a pilot in India?', 'The page lists 10+2 with Physics and Mathematics, a DGCA medical certificate, English fluency, and compliance with DGCA requirements as the starting eligibility criteria.'],
    ['What are the main steps to become a commercial pilot?', 'The guide covers eligibility, joining a pilot-training programme, ground training, flight training, completing DGCA examinations and flying requirements, obtaining a commercial pilot licence, and building experience after licensing.'],
    ['What subjects are taught during ground training?', 'Ground training covers aviation regulations, meteorology, navigation, and aircraft systems before the student progresses to practical flight training.'],
    ['What happens during flight training?', 'Students learn basic and advanced manoeuvres, aircraft operation, and solo flying under the supervision of certified flight instructors.'],
    ['What can pilots do after obtaining a commercial pilot licence?', 'After obtaining a commercial pilot licence, pilots can build experience through flight instruction, aerial surveys, charter operations, or co-pilot roles before applying for larger airline opportunities.'],
    ['Which additional pilot courses are listed?', 'The page lists Private Pilot Licence, Commercial Pilot Licence, Multi-Engine Rating, Instrument Rating, and Airline Transport Pilot Licence as training and qualification options along the pilot-career pathway.'],
    ['Why choose We One Aviation to become a pilot?', 'The page cites training programmes recognised in the industry, an emphasis on safety and professionalism, hands-on practical training, and interview preparation with career guidance.'],
  ],
},
  /*
   * '/blogs/aviation-course-after-12th' removed 2026-10-08. Its answers repeated
   * a physical-standards table and a "13% job growth" figure that no source
   * supports; the rewritten post emits its own FAQPage from peopleAlsoAsk.
   */
  /*
   * '/blogs/dgca-exam-guide' removed 2026-10-08. The route is gated in
   * existingFaqRoutes, so these "DGCA full form" answers never rendered, but they
   * still shipped in the shared bundle, including an unsourced founding year.
   */
  '/how-to-become-a-pilot/after-12th': {
  title: 'Becoming a Pilot After 12th: FAQs',
  questions: [
    ['Which subjects are required in 12th to become a pilot?', 'For the Indian pilot licence route, students need Physics, Chemistry, and Mathematics (PCM) in 12th, with a minimum of 50% marks required for DGCA eligibility. Some foreign flying schools accept any 12th pass.'],
    ['What is the minimum age to begin pilot training?', 'The page lists a minimum age of 17 years for PPL and 18 years for CPL, with different medical, education, and flight-hour requirements for each.'],
    ['What are the entrance steps after 12th?', 'The usual sequence is passing 12th with PCM, clearing the DGCA medical, enrolling in a DGCA flying school, completing ground school for the five DGCA written papers, logging the required 200 hours, clearing the DGCA CPL skill test, and receiving the CPL.'],
    ['How much does pilot training cost after 12th?', 'Ranges like these circulate widely and none of them could be traced to a published document — see the cost transparency page, which sets out what is actually publicly comparable: IGRUA, a government academy, publishes its course fee, and DGCA publishes its own examination charges. Private flying schools publish very little, so get any quote in writing and compare it line by line.'],
    ['How long does it take to become a commercial pilot?', 'There is no verified fixed timeline. Examination progress, student circumstances, weather, aircraft availability, and the selected flying-school schedule can affect the pathway.'],
    ['How many flight hours are required for PPL versus CPL?', 'The page lists a minimum of 40 flight hours for PPL and 200 hours for CPL, which for CPL includes solo, cross-country, instrument, and night flying.'],
    ['What happens after receiving a CPL?', 'After receiving the CPL from DGCA, candidates apply to airlines and go through PABT, group discussion, and interview stages before starting as a First Officer.'],
    ['Which DGCA medical certificate is needed for PPL versus CPL?', 'The page lists a DGCA medical certificate for PPL and a DGCA medical certificate for CPL, which should be scheduled early since it checks vision, hearing, cardiovascular health, and overall fitness.'],
  ],
},
  '/how-to-become-a-pilot/in-india': {
  title: 'Becoming a Pilot in India: FAQs',
  questions: [
    ['What is the first step to becoming a pilot in India?', 'Start by checking 10+2 Physics and Mathematics eligibility (minimum 50%) and completing the DGCA medical assessment before committing to a training route.'],
    ['How many DGCA exams are required to become a pilot?', 'You clear five DGCA written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is examined separately under its own 2025 Rules and is also required before the licence is issued. The papers are cleared individually rather than in one sitting.'],
    ['How much does pilot training cost in India?', 'Private training totals are not verified here. Request itemized current quotes from the academy and selected flying school, and check regulator charges from official sources.'],
    ['How long is the pilot training timeline?', 'There is no verified general timeline. Ask the academy and selected flying school for their current schedules and confirm the requirements with the relevant regulator.'],
    ['Can students train abroad and convert the licence in India?', 'Yes, international training is possible, but pilots must complete the applicable DGCA licence conversion process, which the page lists as a trade-off of training abroad.'],
    ['What should I compare when considering training in India versus abroad?', 'Compare the selected school’s approval, current availability, itemized fees, schedule, visa and living costs, and the applicable licence-conversion requirements. These differ by provider and regulator.'],
    ['Is an Instrument Rating required before getting a CPL?', 'Yes, the page states candidates must hold an Instrument Rating (IR) before receiving their CPL.'],
    ['What is the career progression for a pilot in India?', 'The usual ladder runs Trainee Pilot, First Officer, Senior First Officer, Captain and then Senior Captain on wide-body types. Movement between ranks depends on flying hours, type ratings and the operator. Pay varies by airline and experience, so we do not quote figures.'],
    ['Which airlines in India are listed as hiring pilots?', 'The page lists IndiGo, Air India, SpiceJet, GoFirst, Vistara, Air Asia India, Alliance Air, Star Air, and Blue Dart Aviation.'],
  ],
},
  '/pilot-training-in-sri-lanka': {
  title: 'Pilot Training in Sri Lanka: FAQs',
  questions: [
    ['Who is this Sri Lanka pilot training guide for?', 'This page is general information about checking overseas training options. It does not confirm a current Sri Lanka partner, programme, or intake.'],
    ['What pilot training programs are offered for Sri Lankan students?', 'No current Sri Lanka-specific programme or schedule is verified here. Contact the academy to ask whether an arrangement is currently available, and confirm requirements with the relevant regulators.'],
    ['Where does the flight training take place?', 'Flight training location depends on the selected flying school. No current Sri Lanka location is confirmed here; verify the provider and location before applying.'],
    ['Is the training recognized for DGCA licence conversion?', 'Licence conversion is assessed under current DGCA requirements. Confirm the applicable requirements with DGCA and the selected flying school before enrolling.'],
    ['What support is offered alongside the training programs?', 'The page lists airline interview preparation, career guidance, trainers who are experienced commercial pilots, and mentor support through the training.'],
    ['Are scholarships or flexible payment options available?', 'No current Sri Lanka-specific fees, scholarship, or payment terms are verified here. Confirm any written offer directly with its issuer.'],
    ['Does DGCA Ground Classes offer both online and offline modes?', 'Yes, the DGCA Ground Classes program is offered in both online and offline modes, including mock tests and doubt-clearing sessions.'],
  ],
},
  '/blogs/what-is-pilot-training-complete-guide': {
  title: 'Pilot Training in India: FAQs',
  questions: [
    ['Is pilot training a college degree?', 'No. A pilot licence is issued by the DGCA against written examinations, a medical fitness assessment and logged flight time. It carries no academic credit and no university awards it. Some students take an aviation degree alongside their licence, but the two are separate qualifications serving separate purposes.'],
    ['Can I start pilot training after 12th?', 'Yes, with Physics and Mathematics at 10+2 level. Students from Biology or Commerce streams clear both subjects as private candidates through NIOS and then apply. Ground classes can begin at 17; the Commercial Pilot Licence itself requires 18.'],
    ['What is the difference between PPL and CPL?', 'A Private Pilot Licence permits personal and recreational flying and never permits flying for payment. A Commercial Pilot Licence permits paid flying. PPL hours count towards the commercial flight-time total, which is why taking the PPL first costs little extra when it is planned properly.'],
    ['Do I need to clear the DGCA exams before I start flying?', 'Not strictly. Flight training can begin once the medical assessment and the DGCA computer number are in place. Most students clear the written papers first anyway, because ground study is far cheaper than an hour in an aircraft and weather-driven gaps in flying are the only study time you get.'],
    ['What is RTR (A), and is it one of the DGCA papers?', 'No. RTR (A) is the Radio Telephone Operator (Restricted) certificate, examined separately under its own rules and required for licence issue. Counting it among the written papers is the most common planning error students make, and it leads them to prepare for an examination structure that does not exist.'],
    ['Is pilot training in India cheaper than training abroad?', 'Not reliably, once conversion is counted. Ground study costs much the same either way. Flying rates vary by country, and overseas training adds visa costs, higher living expenses and a licence conversion on return. Compare the total cost to a usable Indian licence rather than the headline training fee.'],
    ['What happens if I fail a DGCA paper?', 'You retake it. Papers are cleared individually rather than in a single sitting, so a failed paper does not affect the ones you have already passed. At We One Aviation, students who do not clear a paper keep attending classes at no further cost until they do.'],
    ['Can commerce students become pilots?', 'Yes. The requirement is Physics and Mathematics at 10+2 level, not a science stream as such. Commerce and Biology students clear both subjects as private candidates through NIOS and then apply on the same footing as anyone else. It adds time rather than closing the door.'],
  ],
},
  '/blogs/commercial-pilot-training-programs-complete-guide': {
  title: 'Choosing a Commercial Pilot Training Program: FAQs',
  questions: [
    ['Do flying schools provide airline placement after CPL training?', 'No. A CPL is a licence, not a job offer. Airlines run their own selection - written screening, assessment, interview and a simulator check - and a type rating on the operator\'s aircraft sits between the licence and the seat. Treat any institute promising airline placement as describing something it does not control.'],
    ['What should I verify before paying a flying school deposit?', 'Approval status checked with the regulator rather than from a certificate image, the average total hours students actually logged to licence last year, how many finished within the quoted timeline, the student-to-aircraft ratio, and written fee terms covering inclusions, payment schedule and refunds. A school that will not answer these in writing has told you something.'],
    ['What does the student-to-aircraft ratio tell me?', 'It predicts how often you will actually fly, which decides your timeline more than the syllabus does. A large fleet photographed well means little if the student roll has grown faster than the fleet. Ask for both numbers and work out the ratio yourself.'],
    ['Is a DGCA flying school automatically a good one?', 'Approval is a floor, not a ranking. It confirms the organisation meets the regulatory standard to train; it says nothing about aircraft serviceability, instructor turnover, scheduling discipline or how long students take to finish. Every school worth considering is approved, so approval cannot be your deciding factor.'],
    ['Can I do ground classes at one institute and flying at another?', 'Yes, and many students do. The written papers are examined by the DGCA regardless of where you studied for them, so ground school and flying school are separable choices. Clearing theory before the expensive flying phase is often the cheaper sequence.'],
    ['What is an FTO, and how is it different from a ground school?', 'A Flying Training Organisation is approved to conduct flight training and put hours in your logbook. A ground school teaches the theory behind the written examinations and does not fly aircraft. Both stages are required; they are frequently run by different organisations.'],
    ['How do I check whether a school\'s stated timelines are realistic?', 'Ask for the completion record of the batch that enrolled two years ago, not the syllabus duration. Then ask how many aircraft were unserviceable on an average day last month, and how many flying days were lost to weather last season. Those three answers predict your own timeline.'],
    ['What happens to my training if a flying school loses approval midway?', 'Hours already logged and examinations already cleared remain yours - they sit with the DGCA and in your logbook, not with the school. What you can lose is prepaid fees, which is why payment schedules tied to training milestones are safer than large advances.'],
  ],
},
  '/blogs/flight-school-prerequisites-admission-guide': {
  title: 'Flight School Admission: FAQs',
  questions: [
    ['How long does a DGCA computer number application take?', 'Processing times vary with the volume the portal is handling, and the application is outside your control once submitted. What you can control is submitting it once, correctly. Apply well before the examination cycle you are aiming at rather than in the weeks before it, and start ground classes while it processes.'],
    ['Why do computer number applications get rejected?', 'Almost always a mismatch rather than a missing qualification. A name spelled differently between Class 10, Class 12 and Aadhaar, a date of birth that disagrees across records, or a scan too cropped or compressed to read. Lay the three documents side by side and compare them character by character before applying.'],
    ['Does my name have to match exactly across all my documents?', 'Yes, and this is worth resolving before you apply anywhere. An expanded initial, a dropped surname or a changed spelling will surface at the computer number stage and again at licence issue. Correcting a school record takes weeks; correcting it after a rejection costs those weeks plus a missed examination cycle.'],
    ['Can I do pilot training if I wear spectacles?', 'Vision that corrects to the required standard is assessed on the corrected result, so spectacles are not in themselves a barrier. Declare your prescription at the assessment rather than leaving it to be found. It surfaces either way, and a declaration made late reads very differently from one made openly.'],
    ['Can I apply to a flying school before my medical is complete?', 'You can enquire and shortlist, but do not pay. The medical is what determines whether the rest of the path is open to you, and a deposit paid before it is a deposit at risk. Sequence the medical first, then commit money.'],
    ['Do I need a passport for pilot training in India?', 'Not for training within India, though it is one of the identity documents a school may accept. You will need one if you train abroad or if you intend to convert or use your licence outside India later, and applying for it early costs nothing and removes a delay from a decision you may make later.'],
    ['What should a flying school admission letter actually specify?', 'The total fee and exactly what it includes, the payment schedule tied to training milestones rather than dates, the hourly rate for instruction beyond the syllabus minimum, refund conditions, and what happens if training is interrupted. Anything agreed verbally and absent from the letter does not exist.'],
    ['Can I start ground classes before I finish Class 12?', 'Many students do, in the gap between the final examinations and the results. It uses months that would otherwise be idle, and it means the written papers can be attempted as soon as the computer number is in place. The licence age applies at issue, not at enrolment.'],
  ],
},
  '/blogs/pilot-training-cost-in-india': {
  title: 'Pilot Training Cost: FAQs',
  questions: [
    ['Why is flying training so much more expensive than ground school?', 'Because an aircraft, its fuel, its maintenance and an instructor are all being consumed by the hour while you fly, and none of that scales across a class the way a ground lesson does. Ground school teaches thirty students at once; a training flight teaches one.'],
    ['Does the quoted fee cover the whole path to a licence?', 'Rarely. Most quotes cover flying to the syllabus minimum and stop there. The instrument rating is sometimes inside, a type rating never is, and living costs sit outside every school invoice. Ask what the fee does not include - it is a more useful question than what it does.'],
    ['What is the difference between airborne time and block time billing?', 'Block time is charged from engine start to engine shutdown, airborne time only from wheels-up to touchdown. Taxiing, holding and run-ups fall in the gap. Across two hundred hours that difference is substantial, and schools rarely volunteer which basis they use.'],
    ['Can I pay for pilot training in instalments?', 'Most schools accept a schedule rather than a lump sum. Ask for one tied to training milestones rather than to calendar dates, so that a disruption at the school does not leave you having paid for training you have not received.'],
    ['Is training abroad cheaper once everything is counted?', 'Not reliably. Hourly rates may look lower, and then living costs, visa expenses and DGCA conversion add back. Compare the total cost to a usable Indian licence rather than the headline training fee, and include the months you will spend on conversion after returning.'],
    ['How much should a family budget above the quoted fee?', 'Enough to absorb extra flying hours and several extra months of living costs, since both are more likely than not. A budget that only balances if nothing goes wrong is the most common reason students pause training partway through.'],
    ['Do scholarships meaningfully reduce the total?', 'A ground-school scholarship reduces the smallest of the three buckets, so it helps without transforming the total. What reduces the total materially is flying consistently and clearing the written papers before the expensive phase begins.'],
    ['What happens to my money if I stop training partway?', 'It depends entirely on what you signed. This is why refund conditions and a milestone-linked payment schedule matter more than a discount for paying in advance. Get both in writing before any large transfer.'],
  ],
},
  '/blogs/best-flying-school-in-india': {
  title: 'Choosing a Flying School: FAQs',
  questions: [
    ['Is DGCA approval enough to judge a flying school by?', 'No. Approval confirms the organisation meets the regulatory standard to train, which every school worth considering also meets. It says nothing about how often aircraft are serviceable, how long instructors stay, or how many students finish on time. Approval is where the shortlist starts, not where it ends.'],
    ['What is the DGCA FTO ranking and how should I use it?', 'It is published ranking information comparing approved Flying Training Organisations on measured criteria. Use it to build a shortlist, then verify the current position yourself - fleet serviceability and instructor retention move faster than a publication cycle, and a placing quoted without naming its edition is being quoted selectively.'],
    ['What single number best predicts how fast I will finish?', 'The ratio of serviceable aircraft to active students. It decides how often you fly, and flying frequency decides your timeline more than syllabus length, instructor quality or your own ability. Ask for both numbers and divide them yourself.'],
    ['How many flying days does weather typically cost at an Indian base?', 'It varies by region and season - fog in the north, monsoon in the west and east, heat limits in central India. There is no national figure worth quoting. Ask each shortlisted school how many days it lost last year and in which months; a school that tracks it will answer.'],
    ['Should I visit a flying school before enrolling?', 'If you can, and unannounced on a weekday morning rather than on a scheduled tour. What you are looking for is how many aircraft are flying, how many are in the hangar, and whether students are waiting around. Thirty minutes of that tells you more than any brochure.'],
    ['What should never appear in a flying school\'s marketing?', 'A guaranteed airline job, a placement percentage, or any promise about employment. Hiring decisions rest with the operator, so a school promising an outcome is promising something it does not control. Treat it as a signal about everything else it says.'],
    ['Does it matter whether maintenance is in-house or outsourced?', 'It affects turnaround, which affects serviceability, which affects how often you fly. In-house engineering usually returns an aircraft to line faster. Ask what the arrangement is and what the typical turnaround has been, rather than assuming either model is better.'],
    ['Can I keep ground school and flying school separate?', 'Yes, and many students do. The DGCA examines the written papers regardless of where you studied for them, so the two are separable decisions. Clearing theory first usually costs less overall, because ground study is a fraction of the price of an hour in an aircraft.'],
  ],
},
  '/blogs/dgca-ground-school-guide': {
  title: 'DGCA Ground School: FAQs',
  questions: [
    ['How many papers do I attempt in one examination cycle?', 'Two suits most students. Papers clear individually, so small groups across successive cycles spreads the load instead of concentrating it. Attempting all five at once is the most reliable way to turn a six-month ground phase into an eighteen-month one.'],
    ['Which paper should I start studying first?', 'Air Navigation, on day one. It is the most calculation-heavy paper and the one that punishes a late start hardest, because what it examines is speed rather than volume. Air Regulations can be left later - it is mostly memory work and responds well to a short intensive run.'],
    ['Is a failed paper recorded against my other papers?', 'No. Each paper stands alone, so a failure in one does not affect passes already secured or attempts in others. Keep attempting the remaining papers rather than pausing the whole plan while you re-prepare the failed one.'],
    ['How do I know whether I failed on knowledge or on time?', 'Ask yourself how many questions you left unanswered. Running out of time needs timed drills; wrong answers on questions you completed need the underlying concept. The two failures look identical on a result slip and need opposite responses, so diagnose before re-booking.'],
    ['Do I need to nominate an aircraft type before ground school?', 'Not to begin. You need it before Technical Specific, which is examined against the type named in your application. Most students settle it once their flying school is chosen, since the type they will train on is the natural nomination.'],
    ['Can I study for the DGCA papers entirely on my own?', 'Some students do, and it takes longer for most. What self-study rarely provides is timed mock tests marked by someone who has sat the paper, and a person to ask when a Navigation method will not come out. Those two things are what the six months buy.'],
    ['How much mathematics does ground school involve?', 'Enough that Class 12 Mathematics is a genuine requirement. Air Navigation is applied trigonometry and vector work; Technical General is applied physics. Neither exceeds school level, but both are examined at speed, which is a different skill from doing them slowly.'],
    ['Should I finish all papers before starting to fly?', 'Not necessarily. Flying can begin once your medical and computer number are in place, and the phases overlap well - weather cancellations become study time. What is usually unwise is the reverse: leaving all theory until after the flying, when you are paying rent at a flying school to revise.'],
  ],
},
};

function fallbackContent(pathname) {
  const topic = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'aviation';
  const label = topic.replace(/\b\w/g, (letter) => letter.toUpperCase());
  return {
    title: `${label}: Frequently Asked Questions`,
    questions: [
      [`What is ${label} about?`, `${label} covers a focused part of aviation education or pilot career planning. We One Aviation explains the relevant requirements, preparation, and next steps for this topic.`],
      [`Who should learn about ${label}?`, `Students and aviation professionals researching ${topic} can use this guide to understand the terminology, eligibility, preparation, and practical decisions involved.`],
      [`What requirements apply to ${label}?`, `Requirements depend on the licence, examination, authority, or career route involved. Confirm the current DGCA or applicable regulator rules before applying.`],
      [`How can We One Aviation help with ${label}?`, `Our counsellors can clarify the training route, documents, expected timeline, and suitable course options for your ${topic} goal.`],
    ],
  };
}

export function getPageFAQs(pathname) {
  if (
    existingFaqRoutes.has(pathname)
  ) return null;
  const content = routeContent[pathname] || fallbackContent(pathname);
  return { title: content.title, faqs: content.questions.map(([question, answer]) => ({ question, answer })) };
}

export { existingFaqRoutes };
