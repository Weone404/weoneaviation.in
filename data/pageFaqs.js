const existingFaqRoutes = new Set([
  '/', '/faqs', '/faq', '/air-arabia', '/blogs/pilot-training-delhi', '/blogs', '/blogs/[id]', '/commercial-pilot-license', '/courses/dgca-ground-classes', '/dgca-ground-classes', '/doubt',
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
  '/privacy-policy', '/terms', '/sitemap', '/404',
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
      ['Can a PPL lead to further pilot training?', 'A PPL does not permit commercial flying, but it can be an early step toward additional flight training and a higher pilot licence.'],
    ],
  },
  '/courses/atpl': {
    title: 'ATPL Training FAQs',
    questions: [
      ['Who can start ATPL preparation?', 'ATPL preparation is intended for pilots who hold a commercial pilot licence and are progressing through the experience, examinations, and ratings required for airline command.'],
      ['How long does ATPL training take?', 'The complete progression toward an ATPL commonly spans 36 months or more because it includes flight-hour building, advanced theory, simulator work, and airline experience.'],
      ['What does ATPL preparation cost?', 'The ATPL preparation component is commonly around ₹15-25 lakh, while the full progression cost varies with flight hours, type rating, simulator, and employer pathway.'],
      ['Which subjects are taught for ATPL?', 'Training covers advanced navigation, air law, meteorology, aircraft performance, flight planning, human factors, aircraft systems, communications, and multi-crew operations.'],
      ['What job progression follows ATPL training?', 'An ATPL supports progression toward airline command after the required flight experience, ratings, examinations, and operator requirements have been completed.'],
    ],
  },
  '/advanced-atpl-pilot-training': {
    title: 'ATPL Training FAQs',
    questions: [
      ['Who can start ATPL preparation?', 'ATPL preparation is intended for pilots who hold a commercial pilot licence and are progressing through the experience, examinations, and ratings required for airline command.'],
      ['How long does ATPL training take?', 'The complete progression toward an ATPL commonly spans 36 months or more because it includes flight-hour building, advanced theory, simulator work, and airline experience.'],
      ['What does ATPL preparation cost?', 'The ATPL preparation component is commonly around ₹15-25 lakh, while the full progression cost varies with flight hours, type rating, simulator, and employer pathway.'],
      ['Which subjects are taught for ATPL?', 'Training covers advanced navigation, air law, meteorology, aircraft performance, flight planning, human factors, aircraft systems, communications, and multi-crew operations.'],
      ['What job progression follows ATPL training?', 'An ATPL supports progression toward airline command after the required flight experience, ratings, examinations, and operator requirements have been completed.'],
    ],
  },
  '/private-pilot-license-ppl-course-details': {
    title: 'Private Pilot License Course FAQs',
    questions: [
      ['What is a Private Pilot License used for?', 'A Private Pilot License allows you to fly single-engine aircraft for non-commercial purposes, including leisure and personal aviation. It is also a foundation for progressing toward a Commercial Pilot License.'],
      ['How many flying hours are included in this PPL program?', 'The program covers at least 40 hours of flight training, including dual instruction, solo flying, navigation flights, cross-country training, and night flying.'],
      ['What are the eligibility requirements for this PPL course?', 'The page lists 10+2 in any stream as the educational eligibility level. It also mentions medical guidance, but it does not specify a DGCA medical class on this page.'],
      ['How long does PPL training take?', 'The expected duration is approximately 6 to 12 months. Weather, aircraft availability, scheduling, examination progress, and individual performance can affect the actual timeline.'],
      ['How much does the PPL course cost?', 'The indicative course fee is ₹6-10 lakh. The final cost depends on the flying school, aircraft, flying hours, medicals, examinations, and any additional training required.'],
      ['What subjects and practical training are included?', 'The syllabus includes air regulations, aviation meteorology, air navigation, aircraft technical knowledge, human performance, pre-solo training, solo circuits, cross-country navigation, night flying, radio telephony, and skill-test preparation.'],
    ],
  },
  '/airline-preparation-course': {
    title: 'Airline Preparation Course FAQs',
    questions: [
      ['Who is the Airline Preparation Course in Dwarka designed for?', 'The course is designed for people preparing for aviation careers across roles such as pilots, cabin crew, ground staff, aviation management, and other airline professions.'],
      ['What does the Airline Preparation Course cover?', 'The program combines theoretical learning with practical preparation, including industry-relevant modules, simulator sessions, industry visits, exam preparation, communication development, and aviation career guidance.'],
      ['What are the admission requirements?', 'Applicants are expected to have completed high school or an equivalent qualification, meet the applicable age requirements, communicate effectively in English, maintain the required physical fitness, and have a basic understanding of mathematics and physics. Some programs may also include an assessment or interview.'],
      ['Where is the course conducted?', 'The course is offered by We One Aviation in Dwarka, Delhi, with online and classroom options mentioned on the page.'],
      ['How does the course prepare students for airline employment?', 'The program includes practical training, simulator exposure, industry visits, experienced faculty, networking opportunities, global aviation preparation, and placement assistance.'],
      ['How can I prepare for the course examination?', 'The page recommends understanding the exam format, reviewing course materials, creating a study schedule, practising sample questions, taking mock exams, seeking instructor guidance, using additional resources, and maintaining a healthy routine.'],
    ],
  },
  '/emirates-cadet-pilot-program': {
    title: 'Emirates Cadet Pilot Program FAQs',
    questions: [
      ['What is the Emirates Cadet Pilot Program?', 'It is an Emirates Flight Training Academy pathway that takes candidates with no prior flying experience through ground school, flight training, simulator sessions, Multi-Crew Cooperation training, and jet orientation toward an airline pilot career.'],
      ['Where is Emirates cadet training conducted?', 'Training is conducted at the Emirates Flight Training Academy in Dubai South, Dubai World Central. The academy describes its own airport, air traffic control tower, training facilities, simulator facilities, and campus accommodation.'],
      ['What are the current international entry requirements?', 'EFTA currently lists an international school-leaver route for applicants aged 18-21 with at least an 80% high-school score, Mathematics and Physics, English requirements, a minimum height of 160 cm, BMI of 29 or less, and IELTS 6.0 or an accepted TOEFL score. Degree holders are listed as 21-26 with a minimum 3.0 GPA in a scientific or engineering major and the same English requirement.'],
      ['What does the Emirates cadet curriculum include?', 'The site describes a two-year programme covering flight training, training materials, simulator and Multi-Crew Cooperation work, and preparation from zero flying hours toward the level of a first officer.'],
      ['How much does the Emirates Flight Training Academy programme cost?', 'The current EFTA admissions page lists a full training fee of USD 220,500 including VAT. It says the fee covers training, materials, student visa, accommodation, uniform, meals, ATPL and MCC certificates, and UAE GCAA-approved CPL with multi-instrument rating; medical insurance is excluded.'],
      ['Is there sponsorship for UAE nationals?', 'EFTA lists a separate UAE National Scholarship Programme and says selected UAE nationals may receive fully sponsored training. This is a separate national-cadet route, not a general sponsorship promise for international applicants.'],
    ],
  },
  '/qatar-airways-cadet-pilot-program': {
    title: 'Qatar Airways Cadet Pilot Program FAQs',
    questions: [
      ['What is the Qatar Airways Cadet Pilot Program?', 'It is a structured pathway described on this page as training selected candidates from the ground up to become First Officers with Qatar Airways. The programme focuses on academic performance, flight training, leadership, communication, safety, and operational discipline.'],
      ['Who can apply for the Qatar Airways Cadet Pilot Program?', 'This page lists an age range of 18-26, high-school completion with strong grades in Mathematics, English, and Physics, fluent English, Class 1 medical fitness, and nationality requirements that may prioritize Qatari nationals while occasionally opening international positions. Confirm the current official intake criteria before applying.'],
      ['Is previous flying experience required?', 'No. The page describes the programme as a zero-to-ATPL pathway designed for candidates without prior flying experience.'],
      ['Where does Qatar Airways cadet training take place?', 'The page identifies Qatar Aeronautical Academy in Doha as the main training base and says some batches may complete parts of training in the UK, Australia, or South Africa depending on the phase and capacity. Confirm the current locations with the official programme before relying on them.'],
      ['What does the Qatar Airways cadet programme focus on?', 'The listed focus areas are academic excellence, advanced flight training, leadership and communication skills, safety, and operational discipline.'],
      ['What facilities are available during training?', 'The page lists modern flight simulators, advanced training aircraft, experienced instructors, and a multicultural aviation training environment.'],
    ],
  },
  '/spice-jet': {
    title: 'SpiceJet Cadet Pilot Programme FAQs',
    questions: [
      ['What does the SpiceJet Cadet Pilot Programme offer?', 'The page describes a pathway toward an Indian DGCA Commercial Pilot License and a Q400 or B737 Type Rating, with a Letter of Intent for a First Officer role described as being handed out on joining. Confirm the current offer directly with SpiceJet before relying on it.'],
      ['What are the eligibility requirements listed for the SpiceJet cadet programme?', 'The page lists Indian nationality or OCI status, age 17-35, minimum height of 158 cm, fluent English, a valid Indian passport, 10+2 with at least 60% in English, Physics, and Mathematics, and Class II medical clearance under DGCA guidelines.'],
      ['What selection stages are included?', 'The four-stage selection process includes the COMPASS aptitude test, Complex Control Task, psychometric test, and personal interview. The page lists durations of 90 minutes, 10 minutes, 60 minutes, and 10 minutes respectively.'],
      ['What training phases are included?', 'The programme includes pre-flying ground school and single-engine CPL and instrument-rating training, SpiceJet airline induction training, and Q400 or B737 Type Rating with technical ground school and full-flight simulator training.'],
      ['How many training hours are listed?', 'The programme lists 140 hours of pre-flying ground school, 200 hours at the flying academy, and 240 hours of post-flying ground school.'],
      ['What fee instalments are listed for the programme?', 'The page lists four instalments of ₹10 lakh, ₹30 lakh, ₹25 lakh, and ₹24.50 lakh plus taxes. It also lists separate application and selection-process fees. SpiceJet’s current official cadet page is presently marked “Coming Soon,” so confirm these amounts and payment terms before applying.'],
    ],
  },
  '/airindia-pilot-preparation': {
    title: 'Air India Pilot Interview Preparation FAQs',
    questions: [
      ['Who is the Air India Pilot Interview Preparation course for?', 'The programme is designed for CPL holders preparing for airline recruitment and Type Rated pilots, including A320 and B737 pilots, targeting Air India fleet opportunities.'],
      ['Which Air India selection stages does the preparation cover?', 'The programme covers psychometric or ADAPT-style assessments, group discussions, and personal interviews including HR and technical rounds.'],
      ['What training is provided for CPL holders?', 'The CPL track includes ADAPT and psychometric test strategies, group discussion practice, HR and technical interview preparation, airline knowledge, SOP awareness, confidence building, and realistic mock assessments.'],
      ['How does the programme support Type Rated pilots?', 'Type Rated pilots receive aircraft-specific technical interview preparation, scenario-based line-operation questions, HR interview coaching, airline SOP and CRM preparation, and airline-level mock interviews.'],
      ['What are the available batch formats?', 'The page lists limited-seat training with weekend and weekday batches, plus online and classroom options.'],
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
      ['What training formats and batches are available?', 'The page lists JFO 2026 preparation with online and classroom options, limited seats, and weekday or weekend batches.'],
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
    ],
  },
  '/flying-school/india': {
    title: 'Pilot Training in India FAQs',
    questions: [
      ['What pilot-training programme is described for India?', 'The page describes a DGCA Commercial Pilot License programme with Multi-Engine Instrument Rating, including approximately 200 flying hours and a pathway from SPL through CPL, instrument, and multi-engine training.'],
      ['What are the duration and fee estimates for pilot training in India?', 'The page lists an estimated duration of 14-16 months and an indicative course fee of ₹58-60 lakh. Actual cost and duration depend on the FTO, aircraft availability, weather, examinations, and additional hours.'],
      ['What are the eligibility requirements for CPL training in India?', 'The page lists 17+ years for beginning the route, 10+2 with Physics and Mathematics or an equivalent qualification, DGCA Class 1 Medical certification, a valid passport, and a Police Clearance Certificate.'],
      ['What are the main stages of Indian CPL training?', 'The listed stages are DGCA theory ground school, SPL and oral examination, solo flight training, hour building and progress checks, followed by multi-engine instrument training and DGCA skill tests.'],
      ['Which aircraft may be used for training in India?', 'The page lists Cessna 172, Tecnam, Piper Archer, Tecnam P-Mentor, and Diamond DA42 aircraft for single-engine, cross-country, instrument, and multi-engine training.'],
      ['Why choose India for pilot training?', 'The page highlights DGCA-recognised licensing, no international visa requirement, modern fleets, experienced instructors, training close to home, and more than 300 potential flying days at selected locations.'],
    ],
  },
  '/flying-school/usa': {
    title: 'Pilot Training in the USA FAQs',
    questions: [
      ['What training pathway is offered in the USA?', 'The page describes an FAA-approved pathway from PPL to Instrument Rating, CPL, optional Flight Instructor Rating, and 1,500-hour flight building, with approximately 250 flying hours and a listed duration of about 1.6 years.'],
      ['Why choose FAA flight training in the USA?', 'The page highlights FAA licensing, more than 300 sunny flying days in key locations, modern aircraft, international-airport training environments, and a pathway accepted in more than 100 countries.'],
      ['What aircraft are available for USA flight training?', 'The listed aircraft include Cessna 152, Cessna 172 glass-cockpit aircraft, Tecnam P2006T, Tecnam P2008, Piper PA-34 Seneca, Piper Archer, and instrument-training simulators.'],
      ['What exclusive benefits are listed for the USA programme?', 'The page describes a 40-hour PPL challenge with possible free IR training, near-airport accommodation, a potential full scholarship after CPL, and free post-CPL flight-hour building up to 1,500 hours, subject to eligibility and terms.'],
      ['What is the career roadmap after USA flight training?', 'The roadmap progresses from PPL to Instrument Rating, CPL, optional instructor rating, 1,500-hour flight building, and applications for airline roles worldwide.'],
      ['Who is the USA programme intended for?', 'The page targets students seeking a fast-track aviation career, aspiring international pilots, graduates wanting FAA credentials, and Indian students looking for structured training abroad.'],
    ],
  },
  '/flying-school/australia': {
    title: 'Pilot Training in Australia FAQs',
    questions: [
      ['What pilot-training programme is offered in Australia?', 'The page describes a CASA-accredited CPL programme with Multi-Engine Instrument Rating and Instructor Rating, combined with a Diploma in Aviation and approximately 221 flight hours.'],
      ['How long does pilot training in Australia take?', 'The listed programme duration is approximately 13-14 months, although weather, aircraft availability, examinations, visa processing, and individual progress can affect completion time.'],
      ['What are the Australia programme fee and eligibility details?', 'The page lists an indicative fee of AUD 119,000-125,000, eligibility from age 17, 10+2 with Physics and Mathematics, and IELTS 5.5/6.0 requirements.'],
      ['What are the training phases in Australia?', 'The programme progresses through Recognition of Prior Learning, PPL training, CPL and hour building, and Multi-Engine Instrument Rating with simulator and aircraft instrument training.'],
      ['What visa and medical requirements are listed?', 'The page identifies the Australian Student Visa Subclass 500 and requires CASA Class 1 medical certification. It also recommends completing DGCA Class 1 and Class 2 medicals and theory preparation before departure.'],
      ['How can an Australian CASA licence be used in India?', 'The page describes returning to India for DGCA licence conversion after completing the CASA training, subject to meeting the current DGCA conversion requirements, examinations, documents, and checks.'],
    ],
  },
  '/flying-school/canada': {
    title: 'Pilot Training in Canada FAQs',
    questions: [
      ['What type of pilot training is available in Canada?', 'The Canada page presents international pilot-training options for students seeking professional flight training, commercial licensing, and an overseas aviation pathway.'],
      ['Why do students consider Canada for flight training?', 'The page discusses Canada as an international training destination with structured flight-school programmes, aviation education, and the opportunity to gain experience in a regulated aviation environment.'],
      ['What should students compare before choosing a Canadian flight school?', 'Students should compare regulator approval, licence type, aircraft availability, instructor experience, weather and airport operations, total flying hours, accommodation, visa requirements, and the process for converting or using the licence in India.'],
      ['Can Indian students convert a Canadian licence to a DGCA licence?', 'International licence conversion may be possible, but students must complete the current DGCA examination, documentation, verification, medical, and flight-check requirements applicable to the licence.'],
      ['What affects the cost and duration of training in Canada?', 'The total cost and timeline depend on the licence pursued, aircraft hourly rates, weather, airport availability, examination attempts, accommodation, visa expenses, and any additional flying hours.'],
      ['What documents should students prepare for Canadian training?', 'Students should expect to prepare identity and academic documents, passport and visa paperwork, medical records, financial documents, and the forms required by the selected flight school and aviation authorities.'],
    ],
  },
  '/flying-school/south-africa': {
    title: 'Pilot Training in South Africa FAQs',
    questions: [
      ['What pilot-training programme is offered in South Africa?', 'The page describes a SACAA Commercial Pilot License programme with Multi-Engine Instrument Rating and Instructor Rating, requiring approximately 200-210 flying hours.'],
      ['How long and how much does the South Africa programme take?', 'The page lists an estimated duration of 14-15 months and a fee range of ZAR 860,000-995,000. Actual cost and completion time depend on the selected school, weather, aircraft, examinations, and additional hours.'],
      ['What are the eligibility requirements for training in South Africa?', 'The page lists age 17+, 10+2 with Physics and Mathematics, and SACAA and DGCA Class 1 medical requirements. Students must also complete the relevant visa, English-language, and school admission requirements.'],
      ['What are the training stages in South Africa?', 'The programme progresses through PPL training, night rating and pilot-in-command hour building, instrument and multi-engine training, and final CPL and instrument-rating tests.'],
      ['Which aircraft and locations are listed?', 'The page lists Cessna 172, Cessna 152, Cessna 150, PA-34 Seneca, Piper Archer, and Diamond DA42 aircraft, with training locations including Cape Town, Secunda, Durban, Johannesburg, and Grand Central Airport.'],
      ['How does DGCA conversion work after South African training?', 'The page describes returning to India to convert the SACAA CPL into a DGCA CPL, subject to current DGCA conversion requirements, examinations, documentation, medical requirements, and applicable checks.'],
    ],
  },
  '/best-flight-schools-in-usa': {
    title: 'Best Flight Schools in the USA FAQs',
    questions: [
      ['What makes a flight school in the USA a good choice for Indian students?', 'Look for FAA approval, a modern and well-maintained fleet, low student-to-aircraft ratios, consistent flying weather, experienced instructors, and a clear pathway from PPL through CPL and instrument rating.'],
      ['What should I compare across shortlisted US flight schools?', 'Compare aircraft type and availability, average weather-cancellation rates, hourly rental and instructor rates, total course cost, accommodation options, and how quickly students typically complete their hours.'],
      ['Do all US flight schools offer the same training pathway?', 'No. Most follow the general FAA route of PPL, Instrument Rating, and CPL, but the number of aircraft, simulator access, scheduling flexibility, and optional flight-instructor or 1,500-hour building support vary by school.'],
      ['How do I check whether a US flight school is genuinely FAA-approved?', 'Ask for the school’s FAA Part 61 or Part 141 certification details and verify them independently rather than relying only on marketing claims, since approval status affects both training quality and visa eligibility.'],
      ['What red flags should I watch for when picking a flight school?', 'Be cautious of vague fee breakdowns, no clarity on aircraft downtime or maintenance, no named instructors, and no transparent policy on refunds or extra hours if training runs longer than expected.'],
      ['How can WeOne Aviation help me choose the right school?', 'Our counsellors compare shortlisted US flight schools on cost, fleet, weather, and support, and help match the option to your budget, timeline, and career goals before you commit.'],
    ],
  },
  '/courses': {
    title: 'Pilot Training Courses FAQs',
    questions: [
      ['What pilot-training courses does WeOne Aviation offer?', 'The courses page lists Commercial Pilot License, Private Pilot License, DGCA Ground Classes, international flight training in the USA and South Africa, and scholarship opportunities.'],
      ['What are the main CPL course details?', 'The listed CPL pathway takes approximately 18-24 months, includes 200 flying hours, requires 10+2 with Physics and Mathematics, and is presented as a DGCA India programme costing approximately ₹40-50 lakh.'],
      ['What are the PPL course details?', 'The listed PPL programme takes approximately 6-12 months, includes around 40-50 flying hours, accepts 10+2 from any stream, and is shown at approximately ₹7.5-10 lakh.'],
      ['What do the DGCA Ground Classes cover?', 'The ground programme covers Air Navigation, Meteorology, Air Regulations, Technical General, Technical Specific, RTR preparation, mock tests, past papers, and doubt-clearing sessions.'],
      ['What international training options are listed?', 'The page lists FAA flight training in the USA and SACAA training in South Africa, with guidance for international training and DGCA licence conversion after returning to India.'],
      ['What eligibility and medical requirements are shown?', 'The page lists minimum ages of 17 for PPL and 18 for CPL, 10+2 with Physics and Mathematics, DGCA Class 1 and Class 2 medical examinations, English proficiency, and the applicable flying-hour requirements.'],
    ],
  },
  '/cost-transparency': {
    title: 'Pilot Training Cost Transparency FAQs',
    questions: [
      ['What is the estimated total CPL training cost?', 'The page gives an estimated total of ₹40-55 lakh for CPL training, covering the main medical, documentation, ground-school, flying, simulator, and related training expenses.'],
      ['What medical and documentation costs are listed?', 'The breakdown includes DGCA Class 2 and Class 1 medical tests, DGCA Computer Number registration, and document verification and processing.'],
      ['Which CPL training costs are included in the standard package?', 'The page lists ground classes, DGCA exam registration and fees, 200+ flying hours, 50+ simulator hours, instructors, study materials, mock tests, aircraft fuel, maintenance, and training documentation.'],
      ['What expenses may be charged separately?', 'Potential additional expenses include Type Rating, MCC, FRTOL, food, transport, internet, extra flying hours, simulator re-bookings, accommodation upgrades, and licence conversion.'],
      ['What payment options are available?', 'The page lists full payment discounts, semester-based payments, monthly instalments, bank education loans, scholarships, and hybrid cash-and-loan plans.'],
      ['What can increase the final training cost?', 'The final cost can increase because of failed exam attempts, additional flying hours, extra simulator time, medical retesting, weather-related extensions, accommodation upgrades, and optional ratings.'],
    ],
  },
  '/credentials': {
    title: 'Academy Credentials and Verification FAQs',
    questions: [
      ['What credential is published on the WeOne Aviation credentials page?', 'The page publishes WeOne Aviation Academy’s DGCA approval status as its primary accreditation and verification credential.'],
      ['How long has WeOne Aviation been operating?', 'The page publishes the academy’s founded year and years of operation using the academy data maintained on the site.'],
      ['What does the DGCA approval claim represent?', 'The page identifies the academy as a DGCA-approved aviation training institute and links that status to the Directorate General of Civil Aviation.'],
      ['How can I request credential verification?', 'Verification enquiries can be sent to info@weoneaviation.in using the contact information published on the page.'],
      ['What information is deliberately excluded from the page?', 'The page states that unsupported certification, trade-body, and partnership claims have been removed rather than published without evidence.'],
      ['When was the credentials page last updated?', 'The page currently displays a manually maintained last-updated label of August 19, 2026.'],
    ],
  },
  '/lead-magnets/cpl-cost-breakdown': {
    title: 'CPL Cost Breakdown Guide FAQs',
    questions: [
      ['What countries does the CPL cost guide compare?', 'The guide compares Commercial Pilot License costs in India, the USA, Australia, and Canada, including estimated fees, duration, advantages, and training considerations.'],
      ['What India CPL cost is shown in the guide?', 'The India estimate is ₹40-55 lakh, with a listed duration of 18-24 months and a breakdown covering medicals, ground school, exams, flying, simulators, ratings, accommodation, and materials.'],
      ['What international costs are listed?', 'The guide lists approximate ranges of $100,000-130,000 for the USA, A$80,000-100,000 for Australia, and C$90,000-120,000 for Canada. These are estimates and should be confirmed with the selected school.'],
      ['Which hidden costs should students plan for?', 'The guide identifies exam re-attempts, extra flying hours, simulator re-bookings, medical renewals, training extensions, accommodation upgrades, living costs, and international licence conversion fees.'],
      ['What payment options are discussed?', 'The guide discusses full payment discounts, semester payments, education loans, monthly instalments, and merit-based scholarships.'],
      ['What does the downloadable PDF provide?', 'The PDF is intended to provide a detailed fee comparison, hidden-cost checklist, cost tables, and payment-plan information for India and international training routes.'],
    ],
  },
  '/lead-magnets/pre-admission-checklist': {
    title: 'Pilot Training Pre-Admission Checklist FAQs',
    questions: [
      ['What eligibility should I check before pilot-training admission?', 'The checklist includes age, 10+2 with Physics and Mathematics, English proficiency, medical fitness, and Indian citizenship or valid visa status.'],
      ['Which documents should students gather before admission?', 'The checklist includes birth certificate, 10th and 12th certificates, Aadhaar, passport where available, PAN, identity and address proof, bank passbook, domicile and character certificates, and passport-size photographs.'],
      ['Which DGCA medical examinations are listed?', 'The checklist covers DGCA Class 2 and Class 1 medicals. It lists eye, hearing, colour-vision, blood-pressure, blood and urine testing for Class 2, with ECG, chest X-ray, laboratory work, and psychological evaluation added for Class 1.'],
      ['What is the DGCA Computer Number registration process?', 'The checklist directs students to create a DGCA account, upload medical and educational documents, submit personal and training details, pay the registration fee, and obtain the unique Computer Number used for DGCA examinations.'],
      ['What financial preparation is recommended?', 'Students should finalise the total training cost, arrange the first payment, seek loan approval if needed, identify sponsors, agree on the academy payment plan, and organise financial documents.'],
      ['What should students confirm at the admission meeting?', 'The checklist recommends confirming original documents, medical certificates, admission terms, accommodation, first-day timing, instructor contact details, payment schedule, curriculum, training plan, and start date.'],
    ],
  },
  '/commercial-pilot-license-admission-process': {
    title: 'CPL Admission Process FAQs',
    questions: [
      ['What is the first step in the CPL admission process?', 'The first step is checking age, education, medical fitness, and English proficiency before applying for professional pilot training.'],
      ['What are the main CPL eligibility requirements?', 'The page lists training from age 17, CPL issuance after age 18, 10+2 with Physics and Mathematics, Class 2 followed by Class 1 medical certification, English proficiency, and the applicable flying-hour requirements.'],
      ['How should I choose a DGCA-approved flying school?', 'The page recommends checking DGCA approval, instructor experience, modern aircraft and simulators, and whether the school provides complete ground and flight training.'],
      ['What happens during ground training and DGCA exams?', 'Students study Air Navigation, Meteorology, Air Regulations, Technical General, and Technical Specific before completing the required DGCA written examinations.'],
      ['How many flight hours are required in the admission guide?', 'The guide describes 200 flight hours, including solo, cross-country, instrument, and night flying, with logbook maintenance throughout the training.'],
      ['What does the final CPL application involve?', 'Applicants submit their logbook and supporting documents to DGCA, complete Class 1 medical revalidation, and apply for CPL issuance after meeting the licensing requirements.'],
    ],
  },
  '/commercial-pilot-license-eligibility': {
    title: 'CPL Eligibility FAQs',
    questions: [
      ['At what age can CPL training begin?', 'The page states that training can begin at 17, while the Commercial Pilot License is issued after the candidate completes the 18th birthday.'],
      ['What education is required for CPL eligibility?', 'Candidates need 10+2 or an equivalent qualification with Physics and Mathematics. Students without these subjects may complete them through NIOS or another authorised institution.'],
      ['Which medical certificates are required?', 'The page states that applicants must obtain a DGCA-recognised Class 2 Medical Certificate followed by a Class 1 Medical Certificate, which is mandatory for CPL issuance.'],
      ['How many flying hours are required for a CPL?', 'The page lists a minimum of 200 flying hours, including 100 hours as Pilot-in-Command, 20 hours of cross-country flying, 10 hours of instrument flying, and 5 hours of night flying.'],
      ['Is English proficiency required?', 'Yes. Candidates must be able to read, write, and understand English, and the page identifies English Language Proficiency testing as part of the eligibility process.'],
      ['What is the role of the Student Pilot License?', 'The Student Pilot License is an early licensing step. The page lists a minimum age of 16, an aviation-subject oral or written examination, and a Class 2 medical examination for SPL eligibility.'],
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
      ['How does WeOne Aviation teach Technical General?', 'The page describes aircraft models, system diagrams, animations, real-aircraft visits, interactive sessions, recorded lectures, DGCA-style mock tests, and question-bank practice.'],
    ],
  },
  '/full-form-of-cpl-commercial-pilot-license': {
    title: 'CPL Full Form FAQs',
    questions: [
      ['What is the full form of CPL in aviation?', 'In aviation, CPL stands for Commercial Pilot License. It allows a qualified pilot to fly aircraft professionally for airlines, cargo operators, charter companies, and other commercial services.'],
      ['What are the main steps to obtain an aviation CPL?', 'The page lists applying for a DGCA Computer Number, completing Class 1 and Class 2 medical examinations, joining DGCA Ground Classes, clearing the six DGCA subject examinations, completing 200 flying hours, and applying for the licence.'],
      ['Which DGCA subjects are listed for CPL preparation?', 'The listed subjects are Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, and RTR (Aero).'],
      ['What can a pilot do after obtaining a CPL?', 'CPL holders can apply to airlines as First Officers, work with cargo, charter, or business-jet operators, and later pursue an ATPL for progression toward airline command.'],
      ['Does CPL have meanings outside aviation?', 'Yes. The page lists meanings in marketing, technology, law, sports, military, logistics, payroll, medicine, and other fields. The correct meaning depends on the context.'],
      ['How is an aviation CPL different from the other CPL meanings?', 'The aviation meaning is a professional pilot licence issued under aviation regulations, while other uses refer to marketing measurements, sports leagues, legal terms, programming concepts, military ranks, or medical terminology.'],
    ],
  },
  '/cbse-full-form': {
    title: 'CBSE Full Form FAQs',
    questions: [
      ['What is the full form of CBSE?', 'CBSE stands for Central Board of Secondary Education, a national school education board in India.'],
      ['What does the CBSE curriculum cover?', 'The page describes CBSE education from foundational classes through senior secondary school, including languages, Mathematics, Science, Social Science, vocational subjects, technology, and skill-based options.'],
      ['Why do students choose CBSE?', 'The page highlights a common syllabus across India, NCERT textbooks, conceptual learning, competitive-exam alignment, global reach, transferable schooling, and broad recognition by Indian and international institutions.'],
      ['What subjects are available in CBSE Classes 11 and 12?', 'The listed streams include Science, Commerce, and Humanities, with subjects such as Physics, Chemistry, Biology, Mathematics, Accountancy, Economics, History, Geography, Political Science, Psychology, and English.'],
      ['How does the CBSE grading system work?', 'The page lists grade bands for Classes 10 and 12, including A1, A2, B1, B2, C1, C2, D, and failing E grades based on marks ranges.'],
      ['How can students check CBSE results?', 'The page lists official result websites, SMS, and DigiLocker as ways to access provisional marksheets and certificates using the required roll-number and identity details.'],
    ],
  },
  '/icse-full-form': {
    title: 'ICSE Full Form FAQs',
    questions: [
      ['What is the full form of ICSE?', 'ICSE stands for Indian Certificate of Secondary Education, the Class 10 examination conducted by the Council for the Indian School Certificate Examinations, or CISCE.'],
      ['What is CISCE?', 'CISCE stands for the Council for the Indian School Certificate Examinations. The page identifies it as the organisation responsible for conducting ICSE and related school examinations.'],
      ['What are the main features of the ICSE curriculum?', 'The page describes a detailed English-medium curriculum with strong emphasis on languages, Science, Mathematics, Arts, Humanities, projects, internal assessment, practical learning, and application-based study.'],
      ['What are the advantages of studying under ICSE?', 'The page highlights strong English skills, detailed subject knowledge, project-based learning, global recognition, broad subject choices, communication development, and preparation for competitive and international examinations.'],
      ['What are the challenges of ICSE education?', 'The listed challenges include a broad syllabus, higher project and internal-assessment workload, fewer schools, difficult transitions to other boards, higher private-school costs, and less emphasis on regional languages.'],
      ['How does ICSE compare with CBSE?', 'The page compares ICSE’s detailed, language- and application-focused curriculum with CBSE’s more concise, concept-focused, nationally available, and competitive-exam-oriented approach.'],
    ],
  },
  '/commercial-pilot-license-salary': {
    title: 'Commercial Pilot License Salary FAQs',
    questions: [
      ['What is the starting salary after obtaining a CPL in India?', 'The page lists an entry-level First Officer or Co-Pilot salary of approximately INR 1.5-3 lakh per month. Regional airlines and charter operators may offer different starting packages.'],
      ['How much can an experienced airline captain earn in India?', 'The page lists approximately INR 6-10 lakh per month for experienced captains at leading domestic airlines. International routes and major overseas carriers may offer higher packages.'],
      ['What factors affect a commercial pilot salary?', 'The page identifies airline type, aircraft type, flight experience, location, and additional roles such as training captain, instructor, or examiner as major salary factors.'],
      ['How much can commercial pilots earn abroad?', 'The page lists approximate international ranges from ₹3.3-6.6 lakh per month for new pilots and ₹8.3-16.6 lakh or more per month for experienced captains, depending on country, aircraft, employer, and exchange rates.'],
      ['What additional benefits may pilots receive?', 'The listed benefits include health and life insurance, family travel benefits, housing or accommodation allowances, retirement plans, and training or upskilling opportunities.'],
      ['Does a CPL guarantee a particular salary?', 'No. A CPL is required for professional pilot roles, but actual compensation depends on employer, aircraft, location, experience, flight hours, ratings, and the role offered.'],
    ],
  },
  '/commercial-pilot-license-syllabus': {
    title: 'Commercial Pilot License Syllabus FAQs',
    questions: [
      ['What subjects are included in the CPL ground syllabus?', 'The page lists Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, and Radio Telephony or RTR as the main ground-training subjects.'],
      ['What does the Air Navigation syllabus cover?', 'Air Navigation includes flight planning, radio navigation, instrument flying, GPS, and the techniques needed to plan and conduct flights safely.'],
      ['What is included in the practical flight syllabus?', 'The practical modules include basic manoeuvres, take-offs and landings, straight-and-level flight, turns, climbs, descents, cross-country flights, instrument flying, night flying, and solo flying.'],
      ['How many flight hours are required for the CPL syllabus?', 'The page states that students need at least 200 hours of flight training, including the required solo, cross-country, and instrument-flight components.'],
      ['How are students prepared for DGCA examinations?', 'The page describes classroom sessions, online resources, mock tests, and instructor-led preparation designed around DGCA ground subjects.'],
      ['Why are both ground and flight training necessary?', 'Ground training provides the theoretical knowledge for safe operations and DGCA examinations, while flight training develops the practical skills needed to operate an aircraft and complete the CPL requirements.'],
    ],
  },
  '/your-guide-on-how-to-become-a-pilot-in-india': {
    title: 'How to Become a Pilot in India FAQs',
    questions: [
      ['What are the basic requirements to become a pilot in India?', 'The page lists 10+2 with Physics and Mathematics, a Class 2 Medical Certificate, English fluency, and compliance with DGCA requirements as the starting eligibility criteria.'],
      ['What are the main steps to become a commercial pilot?', 'The guide covers eligibility, joining a pilot-training programme, ground training, flight training, completing DGCA examinations and flying requirements, obtaining a commercial pilot licence, and building experience after licensing.'],
      ['What subjects are taught during ground training?', 'Ground training covers aviation regulations, meteorology, navigation, and aircraft systems before the student progresses to practical flight training.'],
      ['What happens during flight training?', 'Students learn basic and advanced manoeuvres, aircraft operation, and solo flying under the supervision of certified flight instructors.'],
      ['What can pilots do after obtaining a commercial pilot licence?', 'After obtaining a commercial pilot licence, pilots can build experience through flight instruction, aerial surveys, charter operations, or co-pilot roles before applying for larger airline opportunities.'],
      ['Which additional pilot courses are listed?', 'The page lists Private Pilot Licence, Commercial Pilot Licence, Multi-Engine Rating, Instrument Rating, and Airline Transport Pilot Licence as training and qualification options along the pilot-career pathway.'],
    ],
  },
  '/blogs/aviation-course-after-12th': {
    title: 'Aviation Courses After 12th FAQs',
    questions: [
      ['Which aviation courses can students pursue after 12th?', 'The page discusses pilot training and other aviation-career pathways available after school, with eligibility and course choice depending on the role a student wants to pursue.'],
      ['What education is normally needed for commercial pilot training?', 'The page presents Physics and Mathematics at the 10+2 level as the key academic subjects for the commercial-pilot route, along with the applicable medical and licensing requirements.'],
      ['What pilot-training stages follow 12th?', 'Students generally move through medical assessment, documentation, ground training, DGCA examinations, flying-school selection, flight training, and the relevant pilot-license skill test.'],
      ['How much can aviation training cost after 12th?', 'The page includes examples of aviation-training costs and explains that the final amount varies by programme, flying hours, school, location, and additional requirements. Students should request a current written quote.'],
      ['What careers are available after aviation training?', 'Possible pathways include commercial airline pilot, private pilot, flight instructor, cabin crew, airport operations, aviation management, and other airline-sector roles depending on the qualification completed.'],
      ['How should students choose an aviation course?', 'Students should compare eligibility, medical requirements, regulator approval, course duration, total fees, practical training, placement support, and the career outcome associated with each programme.'],
    ],
  },
  '/blogs/dgca-exam-guide': {
    title: 'DGCA Exam Guide FAQs',
    questions: [
      ['How many DGCA written examinations are described in the guide?', 'The article describes nine written examinations for the commercial pilot licence route, covering subjects such as navigation, meteorology, regulations, technical knowledge, RTR, instruments, aviation medicine, and principles of flight.'],
      ['What subjects are included in the DGCA exam guide?', 'The listed subjects include Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, Radio Telephony, Instruments and Electronics, Aviation Medicine, and Principles of Flight.'],
      ['What exam format is described?', 'The article describes multiple-choice examinations with a stated passing score of 70% and up to six attempts per subject. Candidates should confirm current DGCA rules before relying on these details.'],
      ['How should students prepare for DGCA examinations?', 'The guide recommends starting early, studying alongside flying training, reviewing the syllabus, using structured materials, and practising mock tests and question banks.'],
      ['Why are DGCA ground classes useful?', 'Ground classes help students understand the syllabus, practise examination-style questions, clear doubts, and build a systematic preparation routine for the theory papers.'],
      ['Can students prepare for DGCA exams while flying?', 'Yes. The article recommends beginning ground-school preparation alongside flying training so that theory and practical flying progress together.'],
    ],
  },
  '/student-pilot-license-spl': {
    title: 'SPL Training FAQs',
    questions: [
      ['Who is eligible for a Sport Pilot License?', 'SPL applicants generally must meet the applicable minimum age, medical, language, and training requirements for recreational light-sport flying.'],
      ['How long does SPL training take?', 'SPL training can often be completed in about 3 to 6 months, depending on flying availability, weather, and student progress.'],
      ['What is the approximate SPL course fee?', 'The indicative SPL training range is ₹2-4 lakh, subject to aircraft type, flying hours, school charges, and examination requirements.'],
      ['What does the SPL syllabus cover?', 'The syllabus includes basic air regulations, navigation and weather, aircraft familiarisation, normal and emergency procedures, dual flying, solo circuits, and skill-test preparation.'],
      ['Can SPL training lead to further pilot licences?', 'Yes. SPL can provide foundational flying experience before progressing to the additional training and requirements for higher-level pilot licences.'],
    ],
  },
  '/how-to-become-a-pilot/after-12th': {
    title: 'Becoming a Pilot After 12th: FAQs',
    questions: [
      ['Which subjects are required in 12th to become a pilot?', 'For the Indian pilot licence route, students generally need Physics and Mathematics in 10+2, commonly with the required minimum marks under DGCA rules.'],
      ['What is the minimum age to begin pilot training?', 'Students can begin planning and completing early steps before 18, but the applicable age requirements differ for training, examinations, and the final skill test.'],
      ['What are the entrance steps after 12th?', 'The usual sequence is medical assessment, DGCA documentation and examinations, ground training, selection of a DGCA-approved flying school, flying hours, and the final skill test.'],
      ['How much does pilot training cost after 12th?', 'A complete commercial pilot licence route in India is commonly around ₹40-70 lakh, while other licence types and international routes have different costs. Exact fees depend on the school and hours flown.'],
      ['How long does it take to become a commercial pilot?', 'Many students complete the training pathway in approximately 18 to 24 months, but exams, weather, medicals, and aircraft availability can affect the timeline.'],
    ],
  },
  '/how-to-become-a-pilot/in-india': {
    title: 'Becoming a Pilot in India: FAQs',
    questions: [
      ['What is the first step to becoming a pilot in India?', 'Start by checking 10+2 Physics and Mathematics eligibility and completing the relevant DGCA medical assessment before committing to a training route.'],
      ['How many DGCA exams are required to become a pilot?', 'Candidates must clear the DGCA subjects applicable to their licence, including navigation, meteorology, air regulations, technical knowledge, and radio telephony requirements.'],
      ['How much does pilot training cost in India?', 'A full pilot training pathway is commonly estimated at ₹40-70 lakh, including flying and associated training costs. Actual fees vary by school, location, and additional hours.'],
      ['How long is the pilot training timeline?', 'A realistic pilot training timeline in India is often 18 to 24 months, although exam attempts, weather, aircraft availability, and regulatory processing can extend it.'],
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