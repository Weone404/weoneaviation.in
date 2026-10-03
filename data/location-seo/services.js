export const SERVICES = [
  {
    slug: 'pilot-school',
    name: 'Pilot school',
    shortName: 'Pilot school guidance',
    searchIntent:
      'Informational research about flying schools and how they differ from DGCA ground-class academies.',
    titleTemplate: 'Pilot School Information in {city}, {state} | We One Aviation',
    descriptionTemplate:
      'Understand the difference between DGCA ground classes and flying schools in {city}, {state}. We One Aviation arranges flight training with partner schools; it does not operate a flying school.',
    h1Template: 'Pilot School Information for {city}',
    indexable: false,
    regulatoryJurisdiction: 'India',
    serviceExplanation:
      'A flying school conducts flight training. We One Aviation teaches DGCA ground subjects and can arrange flight training with partner flying schools; it does not operate a flying school.',
    dgcaPathway:
      'The CPL pathway includes DGCA written papers and separate flight training at a flying training organisation. The academy’s ground teaching and partner-arranged flying are distinct stages.',
    eligibility:
      'Eligibility depends on the licence sought and the selected flying training organisation. The CPL educational requirement is Class 10+2 with Physics and Mathematics from a recognised Board or University; confirm current admission terms with the relevant provider.',
    trainingProcess: [
      { title: 'Check the licensing route', description: 'Review the applicable licence, education and medical requirements before committing to a training plan.' },
      { title: 'Complete ground preparation', description: 'Prepare for the applicable DGCA written papers; RTR (A) is a separate examination.' },
      { title: 'Select a flying training organisation', description: 'Flight training takes place at the selected school, not at a We One Aviation classroom.' },
    ],
    flightTrainingApplicable: true,
    flightTrainingPathway:
      'We One Aviation can arrange flight training with partner flying schools. The flying is conducted at the selected school; We One Aviation does not operate a flying school.',
    whyThisOption:
      'Use this information to distinguish a ground-school academy from a flying training organisation before comparing providers. It does not represent a local flying school or promise admission or a licence.',
    relatedServices: ['pilot-training', 'dgca-ground-classes', 'cpl-training'],
  },
  {
    slug: 'pilot-training',
    name: 'Pilot training guidance',
    shortName: 'Pilot training',
    searchIntent:
      'Students comparing the pilot-training pathway, local ground preparation and where flight training takes place.',
    titleTemplate: 'Pilot Training in {city}, {state} | We One Aviation',
    descriptionTemplate:
      'Explore pilot-training guidance for {city}, {state}: DGCA ground preparation at the documented Dwarka classroom and flight training arranged with partner schools.',
    h1Template: 'Pilot Training Guidance for {city}',
    indexable: true,
    regulatoryJurisdiction: 'India',
    serviceExplanation:
      'Pilot training for a commercial licence combines regulatory eligibility, DGCA written examinations and flight training at a flying training organisation. We One Aviation teaches DGCA ground subjects and arranges flight training with partner schools.',
    dgcaPathway:
      'The CPL theory stage includes five DGCA written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is examined separately.',
    eligibility:
      'For a CPL, the stated educational requirement is Class 10+2 with Physics and Mathematics from a recognised Board or University, alongside the applicable age, medical, examination and flight-training requirements. Check current DGCA rules before applying.',
    trainingProcess: [
      { title: 'Check eligibility and medical requirements', description: 'Confirm the education, age and DGCA medical steps for the licence you intend to pursue.' },
      { title: 'Apply for the DGCA computer number and prepare for examinations', description: 'The written papers are separate from the flying stage; RTR (A) is handled separately.' },
      { title: 'Choose a flying training organisation', description: 'Complete the required flying at the selected organisation. We One Aviation arranges this stage with partner schools.' },
      { title: 'Complete applicable licence requirements', description: 'Submit the required examination, medical, flight and skill-test documentation to DGCA under current rules.' },
    ],
    flightTrainingApplicable: true,
    flightTrainingPathway:
      'Flight training is a separate stage from classroom or online ground preparation. We One Aviation arranges it with partner flying schools; flying takes place at the selected school.',
    whyThisOption:
      'This pathway information separates the Dwarka classroom and online ground-preparation options from the flying stage, so students can assess the stages and providers independently.',
    relatedServices: ['dgca-ground-classes', 'commercial-pilot-training', 'cpl-training'],
  },
  {
    slug: 'dgca-ground-classes',
    name: 'DGCA ground classes',
    shortName: 'DGCA ground classes',
    searchIntent:
      'Students seeking DGCA written-paper preparation and verified classroom or online delivery information.',
    titleTemplate: 'DGCA Ground Classes in {city}, {state} | We One Aviation',
    descriptionTemplate:
      'Learn about DGCA ground classes in {city}, {state}. Classroom batches are held at the academy’s Dwarka address; online availability is described on the course page.',
    h1Template: 'DGCA Ground Classes for {city}',
    indexable: true,
    regulatoryJurisdiction: 'India',
    serviceExplanation:
      'DGCA ground classes prepare students for the DGCA written papers. We One Aviation teaches the ground subjects; DGCA sets the examinations and licensing requirements. RTR (A) preparation is described separately from the written papers.',
    dgcaPathway:
      'The five written papers are Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is a separate examination and is not one of those five papers.',
    eligibility:
      'The course page does not state an additional academy admission qualification. For CPL issue, the published educational requirement is Class 10+2 with Physics and Mathematics from a recognised Board or University; ground-class enrolment alone does not issue a licence.',
    trainingProcess: [
      { title: 'Review the papers and current DGCA requirements', description: 'Identify the applicable written papers and check the current DGCA examination rules.' },
      { title: 'Choose an available class format', description: 'Classroom batches are held at the documented Dwarka address; the site states students outside Delhi can join online batches.' },
      { title: 'Prepare and sit the examinations', description: 'DGCA administers the examinations. RTR (A) is prepared and examined separately.' },
    ],
    flightTrainingApplicable: false,
    flightTrainingPathway:
      'Flight training is not part of a DGCA ground class. Students pursuing a CPL complete the separate flying stage at a flying training organisation; We One Aviation arranges this with partner schools.',
    whyThisOption:
      'This option is specifically for theory preparation. The academy’s published offer distinguishes ground teaching from DGCA examinations and from flight training at a flying school.',
    relatedServices: ['pilot-training', 'commercial-pilot-training', 'cpl-training'],
  },
  {
    slug: 'commercial-pilot-training',
    name: 'Commercial pilot training guidance',
    shortName: 'Commercial pilot training',
    searchIntent:
      'Prospective commercial pilots researching DGCA ground preparation, licensing stages and partner-arranged flight training.',
    titleTemplate: 'Commercial Pilot Training in {city}, {state} | We One Aviation',
    descriptionTemplate:
      'Review the commercial-pilot training pathway for {city}, {state}. We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools.',
    h1Template: 'Commercial Pilot Training Guidance for {city}',
    indexable: true,
    regulatoryJurisdiction: 'India',
    serviceExplanation:
      'Commercial pilot training for a CPL includes eligibility and medical checks, DGCA theory examinations, required flight training and the applicable skill test. We One Aviation provides DGCA ground-subject preparation and arranges the flying stage with partner schools.',
    dgcaPathway:
      'CPL theory covers five DGCA written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is examined separately.',
    eligibility:
      'The CPL educational requirement is Class 10+2 with Physics and Mathematics from a recognised Board or University. Candidates must also meet the applicable age, medical, examination and flight-training requirements under current DGCA rules.',
    trainingProcess: [
      { title: 'Confirm the CPL requirements', description: 'Review education, age and medical requirements before selecting a training sequence.' },
      { title: 'Prepare for the theory examinations', description: 'Study the five DGCA written papers; RTR (A) is a separate examination.' },
      { title: 'Select a flying training organisation', description: 'We One Aviation can arrange flight training with partner schools, where the flying takes place.' },
      { title: 'Complete the remaining licence steps', description: 'Meet current DGCA flight-experience, skill-test and application requirements.' },
    ],
    flightTrainingApplicable: true,
    flightTrainingPathway:
      'The flying stage is completed at the selected flying training organisation, not at the We One Aviation classroom. The academy arranges flight training with partner schools.',
    whyThisOption:
      'The pathway is useful for comparing theory preparation and flight training as separate commitments. Ask the academy and selected flying school for their current written terms before enrolment.',
    relatedServices: ['pilot-training', 'dgca-ground-classes', 'cpl-training'],
  },
  {
    slug: 'cpl-training',
    name: 'Commercial Pilot Licence (CPL) training guidance',
    shortName: 'CPL training',
    searchIntent:
      'Prospective CPL candidates researching eligibility, DGCA papers, ground preparation and the separate flying stage.',
    titleTemplate: 'CPL Training in {city}, {state} | We One Aviation',
    descriptionTemplate:
      'Understand CPL ground preparation and the separate flying stage for students in {city}, {state}. Flight training is arranged with partner flying schools.',
    h1Template: 'CPL Training Guidance for {city}',
    indexable: true,
    regulatoryJurisdiction: 'India',
    serviceExplanation:
      'A Commercial Pilot Licence pathway includes eligibility, medical assessment, DGCA written examinations, flight training and applicable skill tests. We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools.',
    dgcaPathway:
      'The CPL written papers are Air Navigation, Aviation Meteorology, Air Regulations, Technical General and Technical Specific. RTR (A) is required separately from those DGCA written papers.',
    eligibility:
      'The CPL educational requirement is Class 10+2 with Physics and Mathematics from a recognised Board or University. Age, medical fitness, examinations and flight-training requirements also apply; confirm current rules with DGCA.',
    trainingProcess: [
      { title: 'Review education, age and medical requirements', description: 'Check current DGCA requirements for the Commercial Pilot Licence before choosing a school.' },
      { title: 'Complete computer-number and theory steps', description: 'Prepare for the five DGCA written papers and the separate RTR (A) examination.' },
      { title: 'Arrange and complete flight training', description: 'Select a flying training organisation and complete flying there; We One Aviation can arrange this with partner schools.' },
      { title: 'Complete licence testing and application', description: 'Meet the current flight-experience, skill-test and documentation requirements for CPL issue.' },
    ],
    flightTrainingApplicable: true,
    flightTrainingPathway:
      'CPL flying is not conducted at the Dwarka classroom. It takes place at the selected flying school; We One Aviation arranges the flying stage with partner schools.',
    whyThisOption:
      'The CPL route makes the distinction between ground classes and aircraft training explicit. Students can compare the academy’s theory preparation with the selected flying school’s separate terms.',
    relatedServices: ['pilot-training', 'dgca-ground-classes', 'commercial-pilot-training'],
  },
];
