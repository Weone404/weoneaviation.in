import { AVIATION_EVIDENCE_RECORDS } from './aviation-evidence.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from './geography/global-pilot.js';
import { AVIATION_REGULATORY_CONTEXTS } from './aviation-regulatory-contexts.js';

const REVIEWED_AT = '2026-10-03';
const AVIATION_GUIDE_INTENT = Object.freeze({
  slug: 'pilot-training',
  jurisdictionPolicy: 'local-authority',
});

const AVIATION_MARKET_FACTS = [
  {
    slug: 'ahmedabad',
    facts: [
      { text: 'The airport operator locates Sardar Vallabhbhai Patel International Airport in Hansol, 9 km north of central Ahmedabad.', evidenceId: 'aviation:airport:ahmedabad-svp' },
      { text: 'The operator describes four terminals and 45 aircraft parking bays at the Ahmedabad airport.', evidenceId: 'aviation:airport:ahmedabad-svp' },
      { text: 'The Ahmedabad airport has a single 3,505 m runway, according to its operator.', evidenceId: 'aviation:airport:ahmedabad-svp' },
    ],
    trainingNote: 'The cited airport source documents airport infrastructure, not a city FTO. No local flying-school relationship is inferred; verify any provider in DGCA’s current approved-FTO list.',
    localConsiderations: 'The airport is in Hansol, rather than in central Ahmedabad. Airport facilities establish aviation infrastructure, not the location of a flight school or the availability of pilot training.',
    localFaq: { question: 'How many terminals and aircraft parking bays does the airport operator report?', factIndex: 1 },
  },
  {
    slug: 'hyderabad',
    facts: [
      { text: 'GMR Hyderabad International Airport Limited says it was mandated to build and operate Rajiv Gandhi International Airport, Hyderabad.', evidenceId: 'aviation:airport:hyderabad-rgia' },
      { text: 'The operator states Rajiv Gandhi International Airport was inaugurated on 14 March 2008.', evidenceId: 'aviation:airport:hyderabad-rgia' },
      { text: 'DGCA’s 30 March 2026 roster lists Flytech Aviation Academy at Nadergul Aerodrome, Hyderabad, with validity through 17 November 2027; Nadergul is regional context, not Hyderabad city-centre infrastructure.', evidenceId: 'aviation:fto:flytech-nadergul' },
    ],
    trainingNote: 'The DGCA roster places Flytech Aviation Academy at Nadergul Aerodrome, not in Hyderabad city centre. Its roster validity date is not confirmation of current course availability or admissions.',
    localConsiderations: 'Keep Rajiv Gandhi International Airport and the Nadergul training base distinct. Neither airport operations nor the independent FTO listing establishes a We One Aviation facility, partner, or local course.',
    localFaq: { question: 'When does the airport operator say Rajiv Gandhi International Airport was inaugurated?', factIndex: 1 },
  },
  {
    slug: 'lucknow',
    facts: [
      { text: 'Lucknow International Airport Limited states that it operates Chaudhary Charan Singh International Airport under a 50-year AAI concession.', evidenceId: 'aviation:airport:lucknow-ccsia' },
      { text: 'The operator reports commercial airport operations began on 2 November 2020.', evidenceId: 'aviation:airport:lucknow-ccsia' },
      { text: 'DGCA’s 30 March 2026 roster lists IGRUA at Fursatganj Airfield, Amethi; this is regional Uttar Pradesh training context, not a Lucknow-city FTO.', evidenceId: 'aviation:fto:igrua-fursatganj' },
    ],
    trainingNote: 'The cited DGCA FTO is at Fursatganj Airfield in Amethi, not Lucknow. Treat it as a separate regional option and confirm current courses and admissions directly with IGRUA.',
    localConsiderations: 'Keep the distinction between Lucknow airport infrastructure and IGRUA’s Fursatganj location. The published IGRUA listing does not make that organization a We One Aviation partner.',
    localFaq: { question: 'When does the airport operator say commercial operations began?', factIndex: 1 },
  },
  {
    slug: 'kolkata',
    facts: [
      { text: 'AAI describes Netaji Subhas Chandra Bose International Airport relative to Kolkata’s east bank of the Hooghly.', evidenceId: 'aviation:airport:kolkata' },
      { text: 'AAI states that the Kolkata airport site is 154 km upstream from the Bay of Bengal.', evidenceId: 'aviation:airport:kolkata' },
      { text: 'The DGCA roster lists Chetak Aviation and Pioneer Flying Academy at Panagarh Airport, a regional West Bengal location rather than Kolkata city.', evidenceId: 'aviation:fto:panagarh-chetak-pioneer' },
    ],
    trainingNote: 'The cited DGCA flight-training organizations are at Panagarh Airport, not in Kolkata. This is regional state context only; confirm the precise operating base and current approval before considering training.',
    localConsiderations: 'Do not treat a West Bengal FTO listing at Panagarh as a Kolkata-city training facility. AAI’s geographic description of Kolkata airport is local aviation context, not proof of a training base.',
    localFaq: { question: 'How does AAI describe Kolkata airport’s position relative to the Hooghly?', factIndex: 0 },
  },
  {
    slug: 'thiruvananthapuram',
    facts: [
      { text: 'The airport operator says Thiruvananthapuram International Airport was established in 1932 and was Kerala’s first airport.', evidenceId: 'aviation:airport:thiruvananthapuram' },
      { text: 'The operator reports 4.9 million passengers and 33,316 aircraft movements in FY 2024–25.', evidenceId: 'aviation:airport:thiruvananthapuram' },
      { text: 'The operator describes separate domestic and international terminals and locates the airport about 3.7 km west of the city centre.', evidenceId: 'aviation:airport:thiruvananthapuram' },
      { text: 'DGCA’s 30 March 2026 approved-FTO inventory lists Rajiv Gandhi Academy for Aviation Technology at International Airport, Thiruvananthapuram.', evidenceId: 'aviation:fto:rajiv-gandhi-aviation-technology' },
      { text: 'DGCA CAR Appendix B lists HQ SAC (U) IAF, Akkulam for Class 1 renewals; it is not an initial-issue centre.', evidenceId: 'aviation:medical:thiruvananthapuram-akkulam-renewal' },
    ],
    trainingNote: 'DGCA lists Rajiv Gandhi Academy for Aviation Technology at the international airport. A roster entry is not confirmation of current admissions, course availability, or any relationship with We One Aviation.',
    localConsiderations: 'The airport’s FY 2024–25 activity figures are historical annual totals, not current flight schedules. The cited medical entry is specifically for renewals, not initial issue.',
    localFaq: { question: 'What passenger and aircraft-movement totals did the operator report for FY 2024–25?', factIndex: 1 },
  },
  {
    slug: 'ranchi',
    facts: [
      { text: 'AAI identifies Birsa Munda Airport in Ranchi, Jharkhand.', evidenceId: 'aviation:airport:ranchi-birsa-munda' },
      { text: 'Jharkhand Tourism describes Jharkhand Flying Institute (Gliding) in Ranchi and Deoghar.', evidenceId: 'aviation:organization:jharkhand-flying-institute' },
      { text: 'The Jharkhand Tourism page says the full-time GPL course flies at Deoghar Airfield; it does not identify a CPL FTO at Ranchi airport.', evidenceId: 'aviation:organization:jharkhand-flying-institute' },
    ],
    trainingNote: 'The cited Jharkhand Flying Institute information concerns gliding/GPL activity and places the full-time course flights at Deoghar Airfield. It is not evidence of a CPL flight school at Ranchi airport.',
    localConsiderations: 'Ranchi airport and the state tourism page’s gliding information describe distinct aviation facilities and activity. Confirm course, licence and airfield details with the named organization and DGCA.',
    localFaq: { question: 'Where does the tourism source say the full-time GPL course flies?', factIndex: 2 },
  },
  {
    slug: 'dehradun',
    facts: [
      { text: 'AAI identifies Jolly Grant Airport, Dehradun, and provides an airport director contact.', evidenceId: 'aviation:airport:dehradun-jolly-grant' },
      { text: 'DGCA’s Class 1 inventory dated 27 August 2026 lists Dr Deepak Gaur (Retd AVM), Vasant Vihar, Dehradun.', evidenceId: 'aviation:medical:dehradun-class1' },
      { text: 'The DGCA medical listing advises confirmation of current scope and appointment availability before travel.', evidenceId: 'aviation:medical:dehradun-class1' },
    ],
    trainingNote: 'The sources cited here establish airport and medical-list context; they do not establish a local flying-training organization. Use DGCA’s current approved-FTO roster to assess any school separately.',
    localConsiderations: 'A Class 1 examiner listing is not a guarantee of appointment availability or that every examination type is offered. Contact the examiner and check DGCA’s current inventory before making travel plans.',
    localFaq: { question: 'Which Class 1 medical listing is recorded for Dehradun?', factIndex: 1 },
  },
  {
    slug: 'srinagar',
    facts: [
      { text: 'AAI eAIP effective 1 October 2026 places Srinagar city about 12 km north of the airfield.', evidenceId: 'aviation:airport:srinagar' },
      { text: 'The same AAI eAIP gives Srinagar aerodrome elevation as 5,487 ft.', evidenceId: 'aviation:airport:srinagar' },
      { text: 'DGCA’s Class 2 and Class 3 inventories list Dr Raja’s Clinic, Srinagar; the reviewed Class 1 inventory did not list a Srinagar city entry.', evidenceId: 'aviation:medical:srinagar-clinic' },
    ],
    trainingNote: 'The sources cited here cover airport and medical-reference context. They do not verify a city FTO; confirm current training-organization approval with DGCA before evaluating a provider.',
    localConsiderations: 'The Class 2/Class 3 clinic listing is not a Class 1 approval. The absence of a Srinagar entry in one reviewed Class 1 inventory is a dated-source limitation, not proof that no such facility exists.',
    localFaq: { question: 'How far from the airfield does the AAI eAIP place Srinagar city?', factIndex: 0 },
  },
  {
    slug: 'amritsar',
    facts: [
      { text: 'AAI eAIP effective 1 October 2026 names Sri Guru Ram Dass Jee International Airport.', evidenceId: 'aviation:airport:amritsar' },
      { text: 'The AAI eAIP states the Amritsar aerodrome is 11 km from the city.', evidenceId: 'aviation:airport:amritsar' },
      { text: 'The same AAI eAIP includes an Airport Director contact for the aerodrome.', evidenceId: 'aviation:airport:amritsar' },
    ],
    trainingNote: 'The AAI eAIP establishes airport context but does not identify a local FTO in the facts used here. Check DGCA’s current approved-FTO inventory before treating any school as an active training option.',
    localConsiderations: 'The AAI distance is stated as airport-to-city distance. The AIP’s airport record is not evidence of a flying school, local pilot-training course, or academy presence.',
    localFaq: { question: 'How far from Amritsar city does the AAI eAIP place the aerodrome?', factIndex: 1 },
  },
  {
    slug: 'agra',
    facts: [
      { text: 'AAI eAIP effective 1 October 2026 describes Agra Airport as a joint-use defence and civil aerodrome about 10 km west of Agra.', evidenceId: 'aviation:airport:agra' },
      { text: 'The AAI eAIP states civil movements are permitted from local sunrise to 2000 IST.', evidenceId: 'aviation:airport:agra' },
      { text: 'DGCA CAR Appendix B lists Air Force Station Agra for Class 1 renewals only, not as an initial-issue centre.', evidenceId: 'aviation:medical:agra-renewal' },
    ],
    trainingNote: 'Agra’s cited airport is joint-use defence and civil infrastructure. The listed Air Force medical station is for renewals; neither fact establishes a civilian flight-training organization.',
    localConsiderations: 'Civil airport movement hours and the medical renewal listing have different scopes. Confirm current civil access, training approvals and the applicable medical route with the responsible authorities.',
    localFaq: { question: 'What civil movement hours does the Agra eAIP specify?', factIndex: 1 },
  },
  {
    slug: 'dubai',
    facts: [
      { text: 'Dubai Airports identifies Dubai International Airport as its Dubai airport in the page’s structured information.', evidenceId: 'aviation:airport:dubai' },
      { text: 'Emirates Flight Training Academy places its campus at Dubai South, Dubai World Central, distinct from Dubai International Airport.', evidenceId: 'aviation:organization:emirates-flight-training-academy' },
      { text: 'The academy describes an ATPL programme and training facilities; its provider page does not establish GCAA approval.', evidenceId: 'aviation:organization:emirates-flight-training-academy' },
    ],
    trainingNote: 'Emirates Flight Training Academy describes its campus at Dubai South/Dubai World Central, not at Dubai International Airport. Its own page is not evidence of GCAA approval and does not establish any relationship with We One Aviation.',
    localConsiderations: 'Dubai International Airport and the academy campus at Dubai World Central are distinct aviation sites. Verify current program details and approval scope directly with GCAA and the provider.',
    localFaq: { question: 'Where does Emirates Flight Training Academy place its campus?', factIndex: 1 },
  },
  {
    slug: 'london',
    facts: [
      { text: 'NATS eAIP identifies London Heathrow as aerodrome EGLL.', evidenceId: 'aviation:airport:london-heathrow' },
      { text: 'The eAIP places London Heathrow 12 NM west of London.', evidenceId: 'aviation:airport:london-heathrow' },
      { text: 'The eAIP records Heathrow’s aerodrome elevation as 83 ft.', evidenceId: 'aviation:airport:london-heathrow' },
      { text: 'The eAIP places the EGLL aerodrome reference point at the midpoint of runway 09L/27R.', evidenceId: 'aviation:airport:london-heathrow' },
      { text: 'The eAIP identifies Heathrow Airport Limited under AD Administration; the cited edition is effective 1 October 2026.', evidenceId: 'aviation:airport:london-heathrow' },
    ],
    trainingNote: 'The cited eAIP documents Heathrow airport information, not a London flight-training organisation. Check the UK CAA register directly for any training provider and its approval scope.',
    localConsiderations: 'Heathrow is 12 NM west of London according to the eAIP; this page uses it as regional aviation context and does not imply the airport is in central London or that We One Aviation serves locally.',
    localFaq: { question: 'Which runway midpoint is cited for the EGLL aerodrome reference point?', factIndex: 3 },
  },
  {
    slug: 'manchester',
    facts: [
      { text: 'NATS eAIP identifies Manchester Airport as aerodrome EGCC.', evidenceId: 'aviation:airport:manchester' },
      { text: 'The eAIP places Manchester Airport 7.5 NM southwest of Manchester.', evidenceId: 'aviation:airport:manchester' },
      { text: 'The eAIP records Manchester Airport’s aerodrome elevation as 257 ft.', evidenceId: 'aviation:airport:manchester' },
      { text: 'The eAIP places the EGCC aerodrome reference point at the midpoint of runway 05L/23R.', evidenceId: 'aviation:airport:manchester' },
      { text: 'The eAIP identifies Manchester Airport PLC under AD Administration; the cited edition is effective 1 October 2026.', evidenceId: 'aviation:airport:manchester' },
    ],
    trainingNote: 'The cited eAIP documents airport information, not a Manchester flight-training organisation. Check the UK CAA register directly for any training provider and its approval scope.',
    localConsiderations: 'The eAIP places the airport southwest of Manchester. Airport infrastructure is regional context, not evidence of a local We One Aviation service or a training place.',
    localFaq: { question: 'Which runway midpoint is cited for the EGCC aerodrome reference point?', factIndex: 3 },
  },
  {
    slug: 'birmingham',
    facts: [
      { text: 'NATS eAIP identifies Birmingham Airport as aerodrome EGBB.', evidenceId: 'aviation:airport:birmingham' },
      { text: 'The eAIP places Birmingham Airport 5.5 NM east-southeast of Birmingham.', evidenceId: 'aviation:airport:birmingham' },
      { text: 'The eAIP records Birmingham Airport’s aerodrome elevation as 339 ft.', evidenceId: 'aviation:airport:birmingham' },
      { text: 'The eAIP places the EGBB aerodrome reference point at the runway intersection with taxiways Lima and Tango.', evidenceId: 'aviation:airport:birmingham' },
      { text: 'The eAIP lists Birmingham Airport under AD Administration; the cited edition is effective 1 October 2026.', evidenceId: 'aviation:airport:birmingham' },
    ],
    trainingNote: 'The cited eAIP documents airport information, not a Birmingham flight-training organisation. Check the UK CAA register directly for any training provider and its approval scope.',
    localConsiderations: 'The eAIP places the airport east-southeast of Birmingham. Airport infrastructure is regional context, not evidence of a local We One Aviation service or a training place.',
    localFaq: { question: 'Which taxiways meet at the EGBB aerodrome reference point?', factIndex: 3 },
  },
  {
    slug: 'edinburgh',
    facts: [
      { text: 'NATS eAIP identifies Edinburgh Airport as aerodrome EGPH.', evidenceId: 'aviation:airport:edinburgh' },
      { text: 'The eAIP places Edinburgh Airport 5 NM west of Edinburgh.', evidenceId: 'aviation:airport:edinburgh' },
      { text: 'The eAIP records Edinburgh Airport’s aerodrome elevation as 112 ft.', evidenceId: 'aviation:airport:edinburgh' },
      { text: 'The eAIP places the EGPH aerodrome reference point at the centre of runway 06/24.', evidenceId: 'aviation:airport:edinburgh' },
      { text: 'The eAIP identifies Edinburgh Airport Ltd under AD Administration; the cited edition is effective 1 October 2026.', evidenceId: 'aviation:airport:edinburgh' },
    ],
    trainingNote: 'The cited eAIP documents airport information, not an Edinburgh flight-training organisation. Check the UK CAA register directly for any training provider and its approval scope.',
    localConsiderations: 'The eAIP places the airport west of Edinburgh. Airport infrastructure is regional context, not evidence of a local We One Aviation service or a training place.',
    localFaq: { question: 'Which runway centre is cited for the EGPH aerodrome reference point?', factIndex: 3 },
  },
];

function evidenceById(id) {
  const item = AVIATION_EVIDENCE_RECORDS.find((record) => record.id === id);
  if (!item) throw new Error(`Aviation market page references missing evidence "${id}".`);
  return item;
}

function sourceReference(item) {
  return {
    title: item.name,
    publisher: item.source,
    href: item.sourceUrl,
    sourceDate: item.sourceDate,
    evidenceId: item.id,
  };
}

function hierarchyFor(location) {
  const byId = new Map(GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [record.id, record]));
  const hierarchy = [];
  const visited = new Set();
  let current = location;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    hierarchy.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : null;
  }
  return hierarchy;
}

function createRelationshipStatement(location) {
  return `We One Aviation’s published information documents its physical classroom in Dwarka, Delhi, and describes online DGCA ground classes for students outside Delhi. This page is informational: it does not claim a ${location.name} branch, classroom, instructor, flying school/FTO, flying base, local partner, student cohort, or local review. The site describes flight training as a separate stage at the selected flying school; contact the academy to confirm any online-class availability.`;
}

function localPathwayText(location, regulatoryContext) {
  if (location.countryCode === 'IN') {
    return `For a pilot licence in India, the applicable regulator is DGCA. The airport and training references on this ${location.name} page are local aviation context, not a licence decision or a promise of a training place. Check current DGCA eligibility, examinations and medical requirements, then independently verify an approved flying training organisation and its operating base.`;
  }
  return `Pilot licensing in ${location.country} is governed by ${regulatoryContext.authority}, not by India’s DGCA. This page provides local aviation context only; confirm licence conversion, eligibility, examinations, medical requirements and approved training routes directly with ${regulatoryContext.authority}.`;
}

function localMedicalText(location, items, regulatoryContext) {
  const medical = items.filter(({ type }) => type === 'medical-centre');
  if (!medical.length) {
    return `This source set does not establish a ${location.name}-specific aviation medical centre or appointment. Check ${regulatoryContext.authority}’s current medical requirements and confirm any examiner’s scope directly; do not infer medical availability from an airport or a general city listing.`;
  }
  return medical.map(({ fact }) => fact).join(' ');
}

function localTrainingRecords(items) {
  return items.filter(({ type }) => [
    'flight-school',
    'flying-club',
    'aviation-college',
    'aviation-academy',
    'pilot-training-organization',
    'aviation-organization',
  ].includes(type));
}

function createPageContent(location, entry, items, hierarchy, regulatoryContext) {
  const facts = entry.facts;
  const relationshipStatement = createRelationshipStatement(location);
  const airports = items.filter(({ type }) => ['airport', 'aerodrome'].includes(type));
  const trainingOrganizations = localTrainingRecords(items);
  const localFAQs = [
    {
      question: `What does the cited source document about ${airports[0]?.name || location.name}?`,
      answer: facts.filter(({ evidenceId }) => evidenceId === airports[0]?.id)
        .map(({ text }) => text).join(' '),
    },
    {
      question: `Does the aviation evidence mean We One Aviation has a location in ${location.name}?`,
      answer: 'No. Airport, regulator, school and medical listings are independent local evidence; they do not establish a We One Aviation branch, classroom, partner or local service.',
    },
    {
      question: `Which authority should a student in ${location.name} check for pilot licensing?`,
      answer: `The recorded authority for ${location.country} is ${regulatoryContext.authority}. Confirm current licensing, training and medical rules directly with that authority.`,
    },
    {
      question: entry.localFaq.question,
      answer: facts[entry.localFaq.factIndex].text,
    },
  ];
  const localFacts = facts.map(({ text, evidenceId }) => ({ fact: text, evidenceId }));
  const sections = [
    {
      title: `Airport and aerodrome context in ${location.name}`,
      body: facts.filter(({ evidenceId }) => airports.some((item) => item.id === evidenceId))
        .map(({ text }) => text).join(' '),
      evidenceIds: [...new Set(facts
        .filter(({ evidenceId }) => airports.some((item) => item.id === evidenceId))
        .map(({ evidenceId }) => evidenceId))],
    },
    {
      title: `Training and medical evidence around ${location.name}`,
      body: [
        entry.trainingNote,
        ...facts.filter(({ evidenceId }) => !airports.some((item) => item.id === evidenceId))
          .map(({ text }) => text),
      ].join(' '),
      evidenceIds: [...new Set(facts
        .filter(({ evidenceId }) => !airports.some((item) => item.id === evidenceId))
        .map(({ evidenceId }) => evidenceId))],
    },
  ];
  if (!sections[1].evidenceIds.length) {
    sections[1].evidenceIds = [items.find(({ type }) => type === 'aviation-authority')?.id]
      .filter(Boolean);
  }
  const title = `Pilot training context: ${location.name} | We One Aviation`;
  const description = `${airports[0]?.name || location.name} and ${regulatoryContext.authority} licensing context. No local We One Aviation branch is claimed.`;
  const aviationAuthority = {
    name: regulatoryContext.authority,
    authority: regulatoryContext.authority,
    country: location.country,
    countryCode: location.countryCode,
    sourceUrl: regulatoryContext.source,
  };
  const sourceReferences = [
    ...new Map(items.map((item) => [item.id, sourceReference(item)])).values(),
    {
      title: `${regulatoryContext.authority} official information`,
      publisher: regulatoryContext.authority,
      href: regulatoryContext.source,
      sourceDate: null,
      evidenceId: items.find(({ type }) => type === 'aviation-authority')?.id || null,
    },
    {
      title: 'About We One Aviation Academy',
      publisher: 'We One Aviation Academy',
      href: 'https://weoneaviation.in/about-us',
      sourceDate: null,
      evidenceId: null,
    },
  ];
  const uniqueSourceReferences = [...new Map(
    sourceReferences.map((reference) => [reference.href, reference]),
  ).values()];
  const localAviationProfile = {
    locationOverview: `The cited aviation sources place ${airports.map(({ name }) => name).join(' and ')} in or in relation to ${location.name}; the source-specific geographic qualifications are given above.`,
    aviationEcosystem: facts.map(({ text }) => text).join(' '),
    majorAirports: airports.filter(({ type }) => type === 'airport').map(({ name, id }) => ({
      name,
      evidenceId: id,
    })),
    aerodromes: airports.filter(({ type }) => type === 'aerodrome').map(({ name, id }) => ({
      name,
      evidenceId: id,
    })),
    flightTrainingInfrastructure: entry.trainingNote,
    aviationOrganizations: trainingOrganizations.map(({ name, type, id }) => ({
      name,
      type,
      evidenceId: id,
    })),
    aviationAuthority,
    pilotTrainingPathway: localPathwayText(location, regulatoryContext),
    licenceContext: `This page does not determine a pilot licence. For ${location.country}, confirm the licence category, eligibility and approved training route with ${regulatoryContext.authority}.`,
    medicalRequirements: localMedicalText(location, items, regulatoryContext),
    examContext: `The cited aviation sources do not establish a ${location.name}-specific pilot examination venue. Confirm examination rules and approved test arrangements with ${regulatoryContext.authority}.`,
    localTrainingConsiderations: entry.localConsiderations,
    weOneRelationship: relationshipStatement,
    nextSteps: `Check ${regulatoryContext.authority} requirements, verify the approval and base of any local training provider, and contact We One Aviation separately to confirm whether its online DGCA ground-class format is currently available to you. Local airport activity does not establish a We One Aviation service.`,
    faqs: localFAQs,
    sourceReferences: uniqueSourceReferences,
  };
  const internalLinks = [
    {
      href: '/pilot-training-in-india',
      label: 'Read the Indian DGCA pilot-training pathway',
      context: 'For the separate Indian licensing route,',
    },
    {
      href: '/pilot-training-abroad',
      label: 'Compare pilot training abroad',
      context: 'For a comparison of training jurisdictions,',
    },
    {
      href: '/about-us',
      label: 'About We One Aviation Academy',
      context: 'For the academy’s published scope,',
    },
  ];
  const content = {
    pagePurpose: 'aviation-location-information',
    seoTitle: title,
    seoDescription: description,
    title,
    description,
    h1: `Pilot training and aviation infrastructure in ${location.name}`,
    introduction: `${facts[0].text} This guide separates verified local aviation facilities and training references from the licensing rules set by ${regulatoryContext.authority}; it does not represent a local We One Aviation branch or training service.`,
    localContext: entry.localConsiderations,
    localApplication: `Students researching pilot training from ${location.name} should distinguish local airport infrastructure, independent training providers, and the licensing route they intend to follow. ${entry.localConsiderations}`,
    trainingMode: 'Informational guidance only. Confirm local licensing and training requirements with the responsible aviation authority and independently verify each provider.',
    relationshipStatement,
    regulatoryContext: `The aviation authority recorded for ${location.country} is ${regulatoryContext.authority}. Its local rules are distinct from DGCA licensing in India.`,
    localFacts,
    sections,
    localAviationProfile,
    faqs: localFAQs,
    internalLinks,
    canonicalPath: `/${location.slug}/pilot-training`,
    schema: {
      pageType: 'WebPage',
      breadcrumbItems: hierarchy.map(({ name }) => name).concat('Pilot training'),
      faqItems: localFAQs,
    },
    indexabilityApproved: true,
    cta: {
      label: 'Ask about available online ground-class options',
      href: '/contact',
    },
  };
  return {
    content,
    localFAQs,
    localAviationProfile,
    sourceReferences: uniqueSourceReferences,
    sections,
  };
}

function buildProductionLocation(location, entry, page, hierarchy) {
  const stateOrProvince = hierarchy.find(({ type }) => (
    ['state', 'province', 'region'].includes(type)
  ));
  const rejectedServices = {
    'pilot-school': 'This informational page does not establish a local We One Aviation flying school.',
    'dgca-ground-classes': 'A separate location-specific DGCA ground-class service relationship is not established by this aviation-information page.',
    'commercial-pilot-training': 'This page provides local context, not a separately verified commercial-training service.',
    'cpl-training': 'This page provides local context, not a separately verified CPL service relationship.',
  };
  const localSections = page.sections.map(({ title, body, evidenceIds }) => ({
    title,
    body,
    items: evidenceIds.map((evidenceId) => {
      const item = evidenceById(evidenceId);
      return { label: item.name, detail: item.fact || entry.trainingNote };
    }),
  }));
  const profile = page.localAviationProfile;
  localSections.push(
    {
      title: 'Aviation authority and pilot-licensing context',
      body: `${profile.pilotTrainingPathway} ${profile.licenceContext}`,
      items: [{
        label: profile.aviationAuthority.name,
        detail: `Official source: ${profile.aviationAuthority.sourceUrl}`,
      }],
    },
    {
      title: 'Medical and examination context',
      body: `${profile.medicalRequirements} ${profile.examContext}`,
      items: [
        { label: 'Medical requirements', detail: profile.medicalRequirements },
        { label: 'Examination context', detail: profile.examContext },
      ],
    },
    {
      title: 'Training infrastructure and organizations',
      body: profile.flightTrainingInfrastructure,
      items: profile.aviationOrganizations.length
        ? profile.aviationOrganizations.map(({ name, type, evidenceId }) => {
          const item = evidenceById(evidenceId);
          return { label: `${name} (${type})`, detail: item.fact || entry.trainingNote };
        })
        : [{ label: 'Local training status', detail: profile.flightTrainingInfrastructure }],
    },
    {
      title: 'Local training considerations and next steps',
      body: profile.localTrainingConsiderations,
      items: [
        { label: 'We One Aviation relationship', detail: profile.weOneRelationship },
        { label: 'Next steps', detail: profile.nextSteps },
      ],
    },
  );
  return {
    ...location,
    city: location.name,
    state: stateOrProvince?.name || location.country,
    stateSlug: stateOrProvince?.slug || location.countryCode.toLowerCase(),
    countrySlug: hierarchy.find(({ type }) => type === 'country')?.slug
      || location.countryCode.toLowerCase(),
    authorityPath: location.countryCode === 'IN'
      ? '/pilot-training-in-india'
      : '/pilot-training-abroad',
    authorityLabel: location.countryCode === 'IN'
      ? 'Pilot training in India'
      : 'Pilot training abroad',
    locationType: 'city',
    relationship: 'informational',
    relatedLocations: [],
    physicalAcademy: false,
    onlineTraining: false,
    flightTrainingGuidance: true,
    indexable: true,
    supportedServices: ['pilot-training'],
    rejectedServices,
    nearbyLocations: [],
    localFAQs: [],
    sourcePages: [
      '/pilot-training-in-india',
      '/pilot-training-abroad',
      '/about-us',
      '/dgca-ground-classes-in-india',
    ],
    sourceLinks: [...new Map(page.sourceReferences.map(({ title: label, href }) => [
      href,
      { label, href },
    ])).values()],
    localSections,
    serviceContent: { 'pilot-training': page.content },
  };
}

const evidenceByLocation = new Map();
for (const item of AVIATION_EVIDENCE_RECORDS) {
  if (item.type === 'aviation-authority') continue;
  for (const id of [item.locationId, ...(item.relatedLocationIds || [])]) {
    const items = evidenceByLocation.get(id) || [];
    items.push(item);
    evidenceByLocation.set(id, items);
  }
}
const geographyBySlug = new Map(
  GLOBAL_GEOGRAPHIC_PILOT.records.map((location) => [location.slug, location]),
);

const candidatePages = AVIATION_MARKET_FACTS.map((entry) => {
  const location = geographyBySlug.get(entry.slug);
  if (!location) throw new Error(`No geographic record found for aviation market "${entry.slug}".`);
  const hierarchy = hierarchyFor(location);
  const allEvidence = evidenceByLocation.get(location.id) || [];
  const authorityEvidence = AVIATION_EVIDENCE_RECORDS.filter((item) => (
    item.type === 'aviation-authority' && item.countryCode === location.countryCode
  ));
  const items = [...new Map(
    [...allEvidence, ...authorityEvidence].map((item) => [item.id, item]),
  ).values()];
  const regulatoryContext = AVIATION_REGULATORY_CONTEXTS[location.country];
  const page = createPageContent(location, entry, items, hierarchy, regulatoryContext);
  const productionLocation = buildProductionLocation(location, entry, page, hierarchy);
  const serviceRelationship = {
    serviceSlug: 'pilot-training',
    type: 'informational',
    verified: true,
    source: 'https://weoneaviation.in/about-us',
    verifiedAt: REVIEWED_AT,
    verifiedFact: 'The academy’s published pages describe its Dwarka classroom, online DGCA ground classes for students outside Delhi, and a separate flying-training stage at the selected school.',
    physicalPresenceVerified: false,
    localServiceDeliveryVerified: false,
    statement: page.content.relationshipStatement,
  };
  const profileSnapshot = {
    slug: location.slug,
    name: location.name,
    body: [
      page.content.h1,
      page.content.introduction,
      page.content.relationshipStatement,
      page.content.regulatoryContext,
      ...page.content.localFacts.map(({ fact }) => fact),
      ...page.content.sections.flatMap(({ title, body }) => [title, body]),
      ...page.content.faqs.flatMap(({ question, answer }) => [question, answer]),
      JSON.stringify(page.localAviationProfile),
    ].join('\n'),
    locationNames: hierarchy.map(({ name }) => name),
    verifiedFacts: page.content.localFacts.map(({ fact }) => ({ text: fact, inherited: false })),
    faqs: page.content.faqs,
    sections: page.content.sections.map(({ title, body }) => ({ title, body, verified: true })),
    regulatoryText: regulatoryContext.authority,
  };
  return {
    entry,
    location,
    hierarchy,
    aviationEvidence: items,
    regulatoryContext,
    serviceRelationship,
    content: page.content,
    productionLocation,
    productionService: null,
    snapshot: profileSnapshot,
  };
});

const allSnapshots = candidatePages.map(({ snapshot }) => snapshot);
for (const market of candidatePages) {
  market.comparisons = allSnapshots.filter(({ slug }) => slug !== market.location.slug);
}

export const AVIATION_MARKET_PAGE_CANDIDATES = Object.freeze(
  candidatePages.map((candidate) => Object.freeze({
    ...candidate,
    productionService: Object.freeze({
      slug: 'pilot-training',
      indexable: true,
    }),
  })),
);
