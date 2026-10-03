const REVIEWED_AT = '2026-10-03';
const DGCA_FTO_AS_OF = '2026-03-30';
const DGCA_CLASS1_AS_OF = '2026-08-27';

const SOURCES = {
  airSewa: {
    name: 'AirSewa, Ministry of Civil Aviation',
    url: 'https://airsewa.gov.in/#/home',
    publisher: 'Ministry of Civil Aviation, Government of India',
    sourceDate: null,
    checkedAt: REVIEWED_AT,
    note: 'Airport-selector presence is not proof of airport operator, current scheduled service, or local training.',
  },
  dgcaFto: {
    name: 'DGCA list of approved Flying Training Organisations',
    url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf',
    publisher: 'Directorate General of Civil Aviation',
    sourceDate: DGCA_FTO_AS_OF,
    checkedAt: REVIEWED_AT,
  },
  dgcaClass1: {
    name: 'DGCA Class 1 medical-centre inventory',
    url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/medical/class1/Class1.pdf',
    publisher: 'Directorate General of Civil Aviation',
    sourceDate: DGCA_CLASS1_AS_OF,
    checkedAt: REVIEWED_AT,
  },
  dgcaClass2: {
    name: 'DGCA empanelled Class 2 medical examiner inventory',
    url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/medical/class2/Class2.pdf',
    publisher: 'Directorate General of Civil Aviation',
    sourceDate: DGCA_CLASS1_AS_OF,
    checkedAt: REVIEWED_AT,
  },
  dgcaClass3: {
    name: 'DGCA empanelled Class 3 medical examiner inventory',
    url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/medical/class3/Class3.pdf',
    publisher: 'Directorate General of Civil Aviation',
    sourceDate: DGCA_CLASS1_AS_OF,
    checkedAt: REVIEWED_AT,
    note: 'The listed examiner does not imply a training provider or We One Aviation presence.',
  },
  dgcaCar: {
    name: 'DGCA Civil Aviation Requirements, Section 7, Series C, Part I',
    url: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq',
    publisher: 'Directorate General of Civil Aviation',
    sourceDate: null,
    checkedAt: REVIEWED_AT,
    note: 'Appendix B distinguishes Air Force renewal stations from initial-issue centres.',
  },
  weOneAbout: {
    name: 'About We One Aviation Academy',
    url: 'https://weoneaviation.in/about-us',
    publisher: 'We One Aviation Academy',
    sourceDate: null,
    checkedAt: REVIEWED_AT,
  },
  weOneIndia: {
    name: 'Pilot training in India',
    url: 'https://weoneaviation.in/pilot-training-in-india',
    publisher: 'We One Aviation Academy',
    sourceDate: null,
    checkedAt: REVIEWED_AT,
  },
  weOneOnline: {
    name: 'Online DGCA ground classes',
    url: 'https://weoneaviation.in/online-dgca-ground-classes',
    publisher: 'We One Aviation Academy',
    sourceDate: '2026-09-16',
    checkedAt: REVIEWED_AT,
  },
};

const NOT_VERIFIED_AIRPORT =
  'A city-specific airport operator, airport location, facilities, and current scheduled-aviation facts were not verified from an accessible official airport source in this pass. This is an evidence gap, not evidence that an airport or service does not exist.';
const NOT_VERIFIED_FTO =
  `No city-specific DGCA-approved FTO or flight-training activity was verified in the DGCA list dated ${DGCA_FTO_AS_OF}. This dated roster result is not proof that no provider or activity exists.`;
const NOT_VERIFIED_MEDICAL =
  'No city-specific medical examiner or facility fact is asserted from this review. DGCA inventory lookup is not evidence of absence; confirm the current applicable list and scope before travel.';
const GENERAL_PATHWAY =
  'We One Aviation states that its physical classroom is in Dwarka, Delhi, students outside Delhi can join online batches, and flying is arranged with partner schools and takes place at the selected school. Those general statements do not establish city-specific access, an enrolment pathway, a local partner, or a local facility.';

function evidence(fact, source, sourceDate = source.sourceDate, note) {
  return {
    fact,
    source: source.url,
    sourceName: source.name,
    sourcePublisher: source.publisher,
    sourceDate,
    checkedAt: REVIEWED_AT,
    ...(note ? { note } : {}),
  };
}

function makeCity({
  slug,
  city,
  state,
  airport,
  ecosystem,
  medical,
  pathway = GENERAL_PATHWAY,
  localContent = [],
  matrix = 'REJECTED',
  decision = 'REJECTED',
  decisionReason,
  airportSources = [],
  ecosystemSources = [],
  medicalSources = [],
}) {
  const airportEvidence = airport
    ? (Array.isArray(airport) ? airport : [airport])
    : [evidence(NOT_VERIFIED_AIRPORT, SOURCES.airSewa, null)];
  const ecosystemEvidence = ecosystem
    ? (Array.isArray(ecosystem) ? ecosystem : [ecosystem])
    : [evidence(NOT_VERIFIED_FTO, SOURCES.dgcaFto)];
  const medicalEvidence = medical
    ? (Array.isArray(medical) ? medical : [medical])
    : [
      evidence(NOT_VERIFIED_MEDICAL, SOURCES.dgcaClass1),
    ];
  if (!medicalEvidence.some(({ source }) => source === SOURCES.dgcaClass2.url)) {
    medicalEvidence.push(evidence(
      'The current DGCA Class 2 examiner inventory is an authoritative lookup source, but its city roster was not transcribed here; no city-level result is asserted.',
      SOURCES.dgcaClass2,
      null,
    ));
  }
  const serviceMatrix = typeof matrix === 'string'
    ? {
      pilotTraining: matrix,
      dgcaGroundClasses: matrix === 'RESEARCH_ONLY' ? 'REJECTED' : matrix,
      commercialPilotTraining: matrix,
      cplTraining: matrix,
    }
    : matrix;
  const sources = [
    ...airportSources,
    ...ecosystemSources,
    ...medicalSources,
    SOURCES.weOneAbout,
    SOURCES.weOneIndia,
    SOURCES.weOneOnline,
  ];
  const uniqueSources = [...new Map(sources.map((source) => [source.url, source])).values()];
  const withCityRelevance = (items) => items.map((item) => ({
    ...item,
    cityRelevance: `${city}, ${state}; the geographic scope and limitations are stated in the fact.`,
  }));
  const pathwayEvidence = [
    evidence(pathway, SOURCES.weOneAbout, null),
    evidence(
      'The academy also describes online ground classes for students outside Delhi; no city-specific batch, local cohort, or guaranteed availability is stated.',
      SOURCES.weOneOnline,
    ),
  ];

  return {
    slug,
    city,
    state,
    country: 'India',
    relationship: 'informational',
    indexable: false,
    evidence: {
      airportContext: withCityRelevance(airportEvidence),
      aviationEcosystem: withCityRelevance(ecosystemEvidence),
      dgcaTraining: withCityRelevance(ecosystemEvidence),
      dgcaMedical: withCityRelevance(medicalEvidence),
      studentPathway: withCityRelevance(pathwayEvidence),
    },
    sources: uniqueSources,
    serviceMatrix,
    contentUniqueness: {
      localFacts: localContent,
      assessment: localContent.length >= 3
        ? 'Potential for a factual local aviation-options explainer; the evidence does not verify We One Aviation delivery or justify a city-service page.'
        : 'Fewer than three verified, relevant local facts support a distinct aviation-training page. Do not pad with airport presence, medical references, or city-name substitutions.',
    },
    indexabilityReview: {
      decision,
      reason: decisionReason
        || 'No city-specific We One Aviation service delivery, local cohort, local facility, verified local partner arrangement, or sufficiently distinct student pathway is established. Existing national guidance and generic online availability do not support a city-service landing page.',
      reviewedAt: REVIEWED_AT,
    },
  };
}

const AIRPORT = {
  ahmedabad: evidence(
    'The airport operator describes Sardar Vallabhbhai Patel International Airport as being in Hansol, 9 km north of central Ahmedabad, with four terminals and a 3,505 m runway. A live flight-status page was available, but no current route was verified.',
    { ...SOURCES.airSewa, name: 'Sardar Vallabhbhai Patel International Airport, operator information', url: 'https://svpia-ahmedabad.adaniairports.com/en/about-us' },
    null,
  ),
  chandigarh: evidence(
    'CHIAL identifies Chandigarh International Airport as located at Mohali, Punjab, and describes itself as a joint venture of AAI, GMADA, and Haryana HSVP. The Chandigarh–Mohali distinction is material; current route rows were not verified.',
    { ...SOURCES.airSewa, name: 'Chandigarh International Airport Limited, About Us', url: 'https://chial.org/about-us/' },
    null,
  ),
  jaipur: evidence(
    'Jaipur International Airport Limited describes itself as responsible for managing, operating, and developing Jaipur International Airport. A current flight route was not verified.',
    { ...SOURCES.airSewa, name: 'Jaipur International Airport Limited, About Us', url: 'https://jaipur.adaniairports.com/en/about-us' },
    null,
  ),
  lucknow: evidence(
    'Lucknow International Airport Limited states that it operates CCSIA under a 50-year AAI concession and began commercial operations on 2 November 2020. Current route rows were not verified.',
    { ...SOURCES.airSewa, name: 'Chaudhary Charan Singh International Airport, operator information', url: 'https://ccsia-lucknow.adaniairports.com/en/about-us' },
    null,
  ),
  kolkata: evidence(
    'AAI describes Kolkata airport in relation to the east bank of the Hooghly, 154 km upstream from the Bay of Bengal. AAI flight-details page returned no current results during this lookup; no route is asserted.',
    { ...SOURCES.airSewa, name: 'AAI Kolkata Airport', url: 'https://www.aai.aero/en/airports/kolkata' },
    null,
  ),
  thiruvananthapuram: evidence(
    'The airport operator states the airport was established in 1932, reports 4.9 million passengers and 33,316 aircraft movements in FY 2024–25, and places it about 3.7 km from the city centre. Its live status page did not expose route rows in this lookup.',
    { ...SOURCES.airSewa, name: 'Thiruvananthapuram International Airport, About Us', url: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
    'FY 2024-25',
  ),
  bhopal: evidence(
    'AAI places Raja Bhoj Airport in Gandhi Nagar, 15 km northwest of Bhopal city centre, on NH 12. AAI linked schedule documents dated 9 September 2026; the page warns timings are tentative and should be confirmed with airlines.',
    { ...SOURCES.airSewa, name: 'AAI Bhopal Airport', url: 'https://www.aai.aero/en/airports/bhopal' },
    '2026-09-09',
  ),
  indore: evidence(
    'AAI provides an Indore airport administration page. The schedule material reviewed was titled Final Summer Schedule 2025 and is stale for this October 2026 check; current scheduled service was not verified.',
    { ...SOURCES.airSewa, name: 'AAI Indore Airport', url: 'https://www.aai.aero/airports/contact-us/indore' },
    'Final Summer Schedule 2025',
  ),
  nagpur: evidence(
    'MADC states that it manages Nagpur airport and describes its modernisation through MIHAN India with AAI. AAI’s schedule endpoint did not expose a current schedule file in this lookup.',
    { ...SOURCES.airSewa, name: 'Maharashtra Airport Development Company, Nagpur Airport', url: 'https://madcindia.org/nagpur_airport' },
    null,
  ),
  mangaluru: evidence(
    'Mangaluru International Airport Limited says it manages, operates, and develops Mangaluru Airport at Kenjar/Bajpe. This establishes airport context, not a current scheduled route or pilot-training base.',
    { ...SOURCES.airSewa, name: 'Mangaluru International Airport Limited, About Us', url: 'https://mangaluru.adaniairports.com/about-us' },
    null,
  ),
  dehradun: evidence(
    'AAI identifies Jolly Grant Airport, Dehradun, and provides an AAI Airport Director contact. The AAI contact page showed 29 October 2025; no current scheduled route was verified.',
    { ...SOURCES.airSewa, name: 'AAI Dehradun Airport', url: 'https://www.aai.aero/en/airports/dehradun' },
    '2025-10-29',
  ),
  ranchi: evidence(
    'AAI identifies Birsa Munda Airport, Ranchi, Jharkhand. The AAI contact page showed 24 March 2026; no current scheduled route was verified.',
    { ...SOURCES.airSewa, name: 'AAI Ranchi Airport', url: 'https://www.aai.aero/en/airports/ranchi' },
    '2026-03-24',
  ),
  raipur: evidence(
    'AAI identifies Swami Vivekananda Airport, Raipur, Chhattisgarh. The AAI contact page showed 2 January 2026; no current scheduled route was verified.',
    { ...SOURCES.airSewa, name: 'AAI Raipur Airport', url: 'https://www.aai.aero/en/airports/raipur' },
    '2026-01-02',
  ),
  varanasi: evidence(
    'AAI identifies Lal Bahadur Shastri International Airport, Varanasi. No current scheduled route was verified from the airport page.',
    { ...SOURCES.airSewa, name: 'AAI Varanasi Airport', url: 'https://www.aai.aero/en/airports/varanasi' },
    null,
  ),
  amritsar: evidence(
    'AAI AIP identifies Sri Guru Ram Dass Jee International Airport, lists the Airport Director, AAI, and states the aerodrome is 11 km from Amritsar. AIP effective 1 October 2026.',
    { ...SOURCES.airSewa, name: 'AAI AIP, VIAR AD 2.1–2.2', url: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAR-en-GB.html' },
    '2026-10-01',
  ),
  srinagar: evidence(
    'AAI AIP identifies Srinagar Airport, places Srinagar city about 12 km north of the airfield, and gives aerodrome elevation as 5,487 ft. The contact field names an Air Force Station Srinagar ATC officer; this does not establish passenger-terminal management. AIP effective 1 October 2026.',
    { ...SOURCES.airSewa, name: 'AAI AIP, VISR AD 2.1–2.2', url: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VISR-en-GB.html' },
    '2026-10-01',
  ),
  jammu: evidence(
    'AAI AIP identifies Jammu Airport and an Air Force Station Satwari ATC officer in its contact field. It gives 8 km to Jammu Tawi Railway Station, not to the city centre. AIP effective 1 October 2026.',
    { ...SOURCES.airSewa, name: 'AAI AIP, VIJU AD 2.1–2.2', url: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIJU-en-GB.html' },
    '2026-10-01',
  ),
  agra: evidence(
    'AAI AIP describes Agra Airport as a joint-use defence and civil aerodrome about 10 km west of Agra, with civil movements from local sunrise to 2000 IST. The contact field identifies Air Force Station Agra. AIP effective 1 October 2026.',
    { ...SOURCES.airSewa, name: 'AAI AIP, VIAG AD 2.1–2.3', url: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAG-en-GB.html' },
    '2026-10-01',
  ),
  kanpur: evidence(
    'Airport identity, operator, and airport-to-city relationship were not verified in the current AAI AIP material reviewed. AirSewa includes a Kanpur label, which is insufficient to establish those details.',
    { ...SOURCES.airSewa, name: 'AAI eAIP contents and MoCA AirSewa', url: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/Menu-en-GB.html' },
    '2026-10-01',
  ),
};

const FTO = {
  lucknow: evidence(
    'IGRUA describes a DGCA-approved ab-initio to CPL course at Fursatganj Airfield, Amethi. This is regional Uttar Pradesh context, not a Lucknow-city FTO or a We One partner. Its 2026 entrance notice’s 13 April deadline has passed.',
    {
      name: 'IGRUA approved courses',
      url: 'https://igrua.gov.in/approved-courses',
      publisher: 'Indira Gandhi Rashtriya Uran Akademi',
      sourceDate: null,
      checkedAt: REVIEWED_AT,
    },
    null,
    'DGCA FTO inventory: https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf. Entrance notice: https://igrua.gov.in/igrua-entrance',
  ),
  kolkata: evidence(
    'The DGCA FTO inventory dated 30 March 2026 lists Chetak Aviation and Pioneer Flying Academy at Panagarh Airport, West Bengal. Panagarh is regional state context, not Kolkata-city training, and no relationship with We One is implied.',
    SOURCES.dgcaFto,
    DGCA_FTO_AS_OF,
    'The cited inventory identifies these entries on PDF pages 3 and 9.',
  ),
  thiruvananthapuram: evidence(
    'The DGCA FTO inventory dated 30 March 2026 lists Rajiv Gandhi Academy for Aviation Technology at International Airport, Thiruvananthapuram, Kerala. Listing does not verify current admissions, course availability, or any relationship with We One.',
    SOURCES.dgcaFto,
    DGCA_FTO_AS_OF,
    'The cited inventory identifies the entry on PDF page 9.',
  ),
};

const AVIATION_ECOSYSTEM = {
  ranchi: evidence(
    'Jharkhand Tourism describes Jharkhand Flying Institute (Gliding) in Ranchi and Deoghar and states that the full-time GPL course flies at Deoghar Airfield. This is gliding/GPL context, not a CPL FTO at Ranchi airport.',
    {
      name: 'Jharkhand Tourism, Aero Sports (Glider)',
      url: 'https://tourism.jharkhand.gov.in/destinationDetails/129',
      publisher: 'Department of Tourism, Government of Jharkhand',
      sourceDate: null,
      checkedAt: REVIEWED_AT,
    },
    null,
  ),
};

const MEDICAL = {
  chandigarh: [
    evidence(
      'DGCA CAR Appendix B lists Air Force Station, Chandigarh for Class 1 renewals. It is not presented as an initial-issue centre or a training facility.',
      SOURCES.dgcaCar,
      null,
    ),
  ],
  kolkata: [
    evidence(
      'DGCA CAR Appendix B lists Air Force Station Barrackpore for renewals. This is not an initial-issue centre and is not asserted as a Kolkata civil medical examiner.',
      SOURCES.dgcaCar,
      null,
    ),
  ],
  thiruvananthapuram: [
    evidence(
      'DGCA CAR Appendix B lists HQ SAC (U) IAF, Akkulam for Class 1 renewals. This is not an initial-issue centre or a We One Aviation facility.',
      SOURCES.dgcaCar,
      null,
    ),
  ],
  indore: [
    evidence(
      'DGCA Class 1 inventory dated 27 August 2026 lists Apollo Hospitals, Indore, Madhya Pradesh for all classes. Confirm current scope and appointment availability directly before travel.',
      SOURCES.dgcaClass1,
      DGCA_CLASS1_AS_OF,
    ),
  ],
  mangaluru: [
    evidence(
      'DGCA lists Dr CK Ranjan at Yenepoya Speciality Hospital, Mangalore, for Class 1, 2, and 3 in the inventories checked. Confirm current listing, scope, and appointment availability before travel.',
      SOURCES.dgcaClass1,
      DGCA_CLASS1_AS_OF,
    ),
    evidence('The DGCA Class 2 inventory also lists Dr CK Ranjan at Yenepoya Speciality Hospital, Mangalore.', SOURCES.dgcaClass2),
    evidence('The DGCA Class 3 inventory also lists Dr CK Ranjan at Yenepoya Speciality Hospital, Mangalore.', SOURCES.dgcaClass3),
  ],
  dehradun: [
    evidence(
      'DGCA lists Dr Deepak Gaur (Retd AVM), Vasant Vihar, Dehradun, in its Class 1, 2, and 3 inventories. Confirm current listing and appointment availability before travel.',
      SOURCES.dgcaClass1,
      DGCA_CLASS1_AS_OF,
    ),
    evidence('The DGCA Class 2 inventory also lists Dr Deepak Gaur (Retd AVM), Vasant Vihar, Dehradun.', SOURCES.dgcaClass2),
    evidence('The DGCA Class 3 inventory also lists Dr Deepak Gaur (Retd AVM), Vasant Vihar, Dehradun.', SOURCES.dgcaClass3),
  ],
  ranchi: [
    evidence('No Ranchi city entry was found in the DGCA Class 1, Class 2, or Class 3 inventories checked, and no dated FTO entry was verified. This is a snapshot limitation, not proof that no examiner or training exists.', SOURCES.dgcaClass1, DGCA_CLASS1_AS_OF),
  ],
  raipur: [
    evidence('DGCA lists Dr Chandra Vikas Rathore at Mahanadi Hospital and Research Centre, Raipur, in the Class 2 and Class 3 inventories. No Raipur city entry was found in the Class 1 inventory checked.', SOURCES.dgcaClass2),
    evidence('The DGCA Class 3 inventory also lists Dr Chandra Vikas Rathore at Mahanadi Hospital and Research Centre, Raipur.', SOURCES.dgcaClass3),
  ],
  varanasi: [
    evidence('No Varanasi city entry was found in the DGCA Class 1, Class 2, or Class 3 inventories checked. This is a dated-inventory result, not proof that no examiner exists.', SOURCES.dgcaClass1, DGCA_CLASS1_AS_OF),
  ],
  amritsar: [
    evidence('No Amritsar city entry was found in the DGCA Class 1, Class 2, or Class 3 inventories checked. This is a dated-inventory result, not proof that no examiner exists.', SOURCES.dgcaClass1, DGCA_CLASS1_AS_OF),
  ],
  srinagar: [
    evidence('DGCA lists Dr Raja’s Clinic, Srinagar, in the Class 2 and Class 3 inventories. No Srinagar city entry was found in the Class 1 inventory checked.', SOURCES.dgcaClass2),
    evidence('The DGCA Class 3 inventory also lists Dr Raja’s Clinic, Srinagar.', SOURCES.dgcaClass3),
  ],
  jammu: [
    evidence('No Jammu city entry was found in the DGCA Class 1, Class 2, or Class 3 inventories checked. An examiner address elsewhere in Jammu and Kashmir is not counted as a Jammu city listing.', SOURCES.dgcaClass1, DGCA_CLASS1_AS_OF),
  ],
  agra: [
    evidence('Air Force Station Agra is listed for Class 1 renewal. This is not presented as an initial-issue centre or a DGCA-empanelled civil examiner; no Agra city entry was found in the Class 2 or Class 3 inventories checked.', SOURCES.dgcaCar, null),
  ],
  kanpur: [
    evidence('No Kanpur city entry was found in the DGCA Class 1, Class 2, or Class 3 inventories checked. This is a dated-inventory result, not proof that no examiner exists.', SOURCES.dgcaClass1, DGCA_CLASS1_AS_OF),
  ],
};

const LOCAL_FACTS = {
  lucknow: [
    { fact: 'CCSIA’s operator reports a 50-year AAI concession.', source: 'https://ccsia-lucknow.adaniairports.com/en/about-us' },
    { fact: 'The operator states commercial operations began on 2 November 2020.', source: 'https://ccsia-lucknow.adaniairports.com/en/about-us' },
    { fact: 'IGRUA’s DGCA-approved ab-initio to CPL course is at Fursatganj Airfield, Amethi, not in Lucknow.', source: 'https://igrua.gov.in/approved-courses' },
    { fact: 'IGRUA’s 2026 entrance notice gave a 13 April 2026 application deadline, which has passed.', source: 'https://igrua.gov.in/igrua-entrance' },
  ],
  kolkata: [
    { fact: 'AAI describes Kolkata airport using its east-bank-of-the-Hooghly location and distance upstream from the Bay of Bengal.', source: 'https://www.aai.aero/en/airports/kolkata' },
    { fact: 'The DGCA FTO inventory lists Chetak Aviation and Pioneer Flying Academy at Panagarh Airport, not in Kolkata.', source: SOURCES.dgcaFto.url },
    { fact: 'DGCA CAR Appendix B identifies Barrackpore as a renewal station; it is not described as an initial-issue centre.', source: SOURCES.dgcaCar.url },
  ],
  thiruvananthapuram: [
    { fact: 'The airport operator states that the airport was established in 1932.', source: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
    { fact: 'The operator reports 4.9 million passengers in FY 2024–25.', source: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
    { fact: 'The operator reports 33,316 aircraft movements in FY 2024–25.', source: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
    { fact: 'The operator places the airport about 3.7 km from the city centre.', source: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
    { fact: 'The DGCA list includes Rajiv Gandhi Academy for Aviation Technology at the international airport.', source: SOURCES.dgcaFto.url },
  ],
  mangaluru: [
    { fact: 'Mangaluru International Airport Limited says it manages, operates, and develops Mangaluru Airport at Kenjar/Bajpe.', source: 'https://mangaluru.adaniairports.com/about-us' },
    { fact: 'DGCA lists Dr CK Ranjan at Yenepoya Speciality Hospital, Mangalore, in Class 1, 2, and 3 inventories.', source: SOURCES.dgcaClass1.url },
  ],
  dehradun: [
    { fact: 'AAI identifies Jolly Grant Airport, Dehradun, and provides an AAI Airport Director contact.', source: 'https://www.aai.aero/en/airports/dehradun' },
    { fact: 'DGCA lists Dr Deepak Gaur (Retd AVM), Vasant Vihar, Dehradun, in Class 1, 2, and 3 inventories.', source: SOURCES.dgcaClass1.url },
  ],
  ranchi: [
    { fact: 'AAI identifies Birsa Munda Airport in Ranchi, Jharkhand.', source: 'https://www.aai.aero/en/airports/ranchi' },
    { fact: 'Jharkhand Tourism describes Jharkhand Flying Institute (Gliding) in Ranchi and Deoghar; the full-time GPL course flies at Deoghar Airfield, not Ranchi airport.', source: 'https://tourism.jharkhand.gov.in/destinationDetails/129' },
  ],
  raipur: [
    { fact: 'AAI identifies Swami Vivekananda Airport in Raipur, Chhattisgarh.', source: 'https://www.aai.aero/en/airports/raipur' },
    { fact: 'DGCA lists Dr Chandra Vikas Rathore at Mahanadi Hospital and Research Centre, Raipur, in Class 2 and Class 3; no Raipur entry was found in Class 1.', source: SOURCES.dgcaClass2.url },
  ],
  varanasi: [
    { fact: 'AAI identifies Lal Bahadur Shastri International Airport, Varanasi.', source: 'https://www.aai.aero/en/airports/varanasi' },
  ],
  amritsar: [
    { fact: 'The AAI AIP names Sri Guru Ram Dass Jee International Airport and places it 11 km from Amritsar.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAR-en-GB.html' },
    { fact: 'The AAI AIP lists an Airport Director contact for the aerodrome.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAR-en-GB.html' },
  ],
  srinagar: [
    { fact: 'The AAI AIP places Srinagar city about 12 km north of the airfield and gives aerodrome elevation as 5,487 ft.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VISR-en-GB.html' },
    { fact: 'DGCA lists Dr Raja’s Clinic, Srinagar, in Class 2 and Class 3; no Srinagar city entry was found in Class 1.', source: SOURCES.dgcaClass2.url },
  ],
  jammu: [
    { fact: 'The AAI AIP names Jammu Airport and gives 8 km to Jammu Tawi Railway Station, not the city centre.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIJU-en-GB.html' },
  ],
  agra: [
    { fact: 'The AAI AIP describes Agra Airport as a joint-use defence and civil aerodrome about 10 km west of Agra.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAG-en-GB.html' },
    { fact: 'The AAI AIP states civil movements are permitted from local sunrise to 2000 IST.', source: 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/IN-AD%202.1VIAG-en-GB.html' },
    { fact: 'DGCA CAR lists Air Force Station Agra for Class 1 renewals only, not as an initial-issue centre.', source: SOURCES.dgcaCar.url },
  ],
};

const RESEARCH_ONLY = new Set([
  'lucknow',
  'kolkata',
  'thiruvananthapuram',
  'mangaluru',
  'dehradun',
  'ranchi',
  'raipur',
  'srinagar',
]);

const AIRSEWA_LABELS = {
  patna: 'Patna',
  bhubaneswar: 'Bhubaneswar',
  guwahati: 'Guwahati',
  coimbatore: 'Coimbatore',
  visakhapatnam: 'Visakhapatnam',
  panaji: 'Goa',
  surat: 'Surat',
  vadodara: 'Vadodara',
  nashik: 'Nasik',
  mysuru: 'Mysore',
};

const CITIES = [
  ['ahmedabad', 'Ahmedabad', 'Gujarat'],
  ['chandigarh', 'Chandigarh', 'Chandigarh'],
  ['jaipur', 'Jaipur', 'Rajasthan'],
  ['lucknow', 'Lucknow', 'Uttar Pradesh'],
  ['kolkata', 'Kolkata', 'West Bengal'],
  ['kochi', 'Kochi', 'Kerala'],
  ['thiruvananthapuram', 'Thiruvananthapuram', 'Kerala'],
  ['bhopal', 'Bhopal', 'Madhya Pradesh'],
  ['indore', 'Indore', 'Madhya Pradesh'],
  ['nagpur', 'Nagpur', 'Maharashtra'],
  ['patna', 'Patna', 'Bihar'],
  ['bhubaneswar', 'Bhubaneswar', 'Odisha'],
  ['guwahati', 'Guwahati', 'Assam'],
  ['coimbatore', 'Coimbatore', 'Tamil Nadu'],
  ['visakhapatnam', 'Visakhapatnam', 'Andhra Pradesh'],
  ['panaji', 'Panaji', 'Goa'],
  ['surat', 'Surat', 'Gujarat'],
  ['vadodara', 'Vadodara', 'Gujarat'],
  ['nashik', 'Nashik', 'Maharashtra'],
  ['mysuru', 'Mysuru', 'Karnataka'],
  ['mangaluru', 'Mangaluru', 'Karnataka'],
  ['dehradun', 'Dehradun', 'Uttarakhand'],
  ['ranchi', 'Ranchi', 'Jharkhand'],
  ['raipur', 'Raipur', 'Chhattisgarh'],
  ['varanasi', 'Varanasi', 'Uttar Pradesh'],
  ['amritsar', 'Amritsar', 'Punjab'],
  ['srinagar', 'Srinagar', 'Jammu and Kashmir'],
  ['jammu', 'Jammu', 'Jammu and Kashmir'],
  ['agra', 'Agra', 'Uttar Pradesh'],
  ['kanpur', 'Kanpur', 'Uttar Pradesh'],
];

export const INDIA_DEEP_VALIDATION = CITIES.map(([slug, city, state]) => {
  const lead = RESEARCH_ONLY.has(slug);
  const airport = AIRPORT[slug]
    ? [AIRPORT[slug]]
    : [evidence(
      AIRSEWA_LABELS[slug]
        ? `AirSewa's Ministry of Civil Aviation airport selector showed "${AIRSEWA_LABELS[slug]}". This identifies a portal label only, not the operator, current scheduled service, city airport boundary, or local training facility.`
        : 'A city-specific airport operator, airport location, facilities, and current scheduled-aviation facts were not verified from an accessible official airport source in this pass. This is an evidence gap, not evidence that an airport or service does not exist.',
      SOURCES.airSewa,
      null,
    )];
  const ecosystem = FTO[slug] || AVIATION_ECOSYSTEM[slug]
    ? [FTO[slug] || AVIATION_ECOSYSTEM[slug]]
    : [evidence(NOT_VERIFIED_FTO, SOURCES.dgcaFto)];
  const medical = MEDICAL[slug] || [
    evidence(NOT_VERIFIED_MEDICAL, SOURCES.dgcaClass1),
  ];

  return makeCity({
    slug,
    city,
    state,
    airport,
    ecosystem,
    medical,
    localContent: LOCAL_FACTS[slug] || [],
    matrix: lead
      ? {
        pilotTraining: 'RESEARCH_ONLY',
        dgcaGroundClasses: 'REJECTED',
        commercialPilotTraining: slug === 'ranchi' ? 'REJECTED' : 'RESEARCH_ONLY',
        cplTraining: slug === 'ranchi' ? 'REJECTED' : 'RESEARCH_ONLY',
      }
      : 'REJECTED',
    decision: lead ? 'RESEARCH_ONLY' : 'REJECTED',
    decisionReason: lead
      ? 'Primary sources provide a local or regional aviation, training, or medical research lead, but do not establish a city-specific We One Aviation service, class cohort, facility, verified partner relationship, or guaranteed student pathway. Keep non-indexable pending a distinct, independently useful content proposal and first-party service verification.'
      : undefined,
    airportSources: [AIRPORT[slug]?.source
      ? {
        name: AIRPORT[slug].sourceName,
        url: AIRPORT[slug].source,
        publisher: AIRPORT[slug].sourcePublisher,
        sourceDate: AIRPORT[slug].sourceDate,
        checkedAt: AIRPORT[slug].checkedAt,
      }
      : SOURCES.airSewa],
    ecosystemSources: FTO[slug]?.source === SOURCES.dgcaFto.url
      ? [SOURCES.dgcaFto]
      : FTO[slug]
        ? [
          { name: 'IGRUA approved courses', url: 'https://igrua.gov.in/approved-courses', publisher: 'Indira Gandhi Rashtriya Uran Akademi', sourceDate: null, checkedAt: REVIEWED_AT },
          { name: 'IGRUA entrance notice', url: 'https://igrua.gov.in/igrua-entrance', publisher: 'Indira Gandhi Rashtriya Uran Akademi', sourceDate: null, checkedAt: REVIEWED_AT },
          SOURCES.dgcaFto,
        ]
        : AVIATION_ECOSYSTEM[slug]
          ? [{ name: 'Jharkhand Tourism, Aero Sports (Glider)', url: 'https://tourism.jharkhand.gov.in/destinationDetails/129', publisher: 'Department of Tourism, Government of Jharkhand', sourceDate: null, checkedAt: REVIEWED_AT }, SOURCES.dgcaFto]
          : [SOURCES.dgcaFto],
    medicalSources: [
      SOURCES.dgcaCar,
      SOURCES.dgcaClass1,
      SOURCES.dgcaClass2,
      SOURCES.dgcaClass3,
    ],
  });
});

export const INDIA_DEEP_VALIDATION_SOURCES = Object.values(SOURCES);
