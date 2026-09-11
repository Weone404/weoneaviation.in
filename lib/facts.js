/**
 * lib/facts.js — single source of truth for the RECURRING facts this site states.
 *
 * WHY A SEPARATE MODULE FROM data/academy.js
 * ------------------------------------------
 * data/academy.js is deliberately scoped to first-party facts the academy
 * states about ITSELF (founding year, and the derived years-of-operation),
 * under a claims-gate rationale: only what can be substantiated lives there.
 * The facts below have a different provenance entirely — they come from the
 * Aircraft Rules, 1937 and from DGCA examination practice, and they are
 * verified by reading the notified Schedule rather than by asking the academy.
 * Mixing the two would blur which rule governs which number.
 *
 * So: academy.js stays the owner of first-party figures, this module owns the
 * regulatory ones, and it re-exports ACADEMY so a page needs exactly one
 * import to get everything.
 *
 * SOURCING BASIS — read scripts/check-claims.js before changing any number.
 * Aircraft Rules, 1937, Schedule II, continued in force by section 43(2) of
 * the Bharatiya Vayuyan Adhiniyam, 2024:
 *     Section B  Student Pilot's Licence          16 years
 *     Section E  Private Pilot's Licence (A)      17 years
 *     Section J  Commercial Pilot's Licence (A)   18 years; 1(e) = 200 hours
 *     Section M  Airline Transport Pilot (A)      21 years
 * Sections B, E and J: no post-2018 amendment found — safe to cite.
 * Section M: AMENDED TWICE (G.S.R. 22(E) 7 Jan 2020; G.S.R. 731(E) 10 Oct
 * 2023). The AGES were untouched by both; the EXPERIENCE FIGURES were not.
 * That is why ATPL below carries an age and no hours, and why
 * ATPL_HOURS_GUIDANCE exists instead of a number.
 *
 * DO NOT ADD: any salary figure. The Class 1 / Class 2 medical split was on
 * this list too; it came off on 2026-09-11 when the medical CAR was found.
 * It now lives in MEDICAL_STANDARDS below, with its sources. The DGCA theory pass mark WAS on this list; it came off on
 * 2026-09-11 when the CAR that sets it was read. It now lives in EXAM_RULES
 * below, with its clause. Take it from there, never from memory.
 */

import { FOUNDED_YEAR, YEARS_OF_OPERATION, YEARS_LABEL } from '../data/academy';

/** The licence ladder, in the order a student climbs it. */
export const LICENCES = [
  { code: 'SPL', name: 'Student Pilot Licence', minAge: 16, section: 'Section B',
    permits: 'Flight training, including solo flying under instructor authorisation. Never carrying passengers, never flying for payment.' },
  { code: 'PPL', name: 'Private Pilot Licence', minAge: 17, section: 'Section E',
    permits: 'Personal and recreational flying. Never flying for payment.' },
  { code: 'CPL', name: 'Commercial Pilot Licence', minAge: 18, section: 'Section J',
    permits: 'Flying for payment. Requires 200 hours of flight time.' },
  { code: 'ATPL', name: 'Airline Transport Pilot Licence', minAge: 21, section: 'Section M',
    permits: 'Acting as pilot-in-command of a commercial aeroplane.' },
];

export const MIN_AGE = LICENCES.reduce((acc, l) => ({ ...acc, [l.code]: l.minAge }), {});

/**
 * CPL flying experience, Schedule II Section J paragraph 1(e).
 * The 200 is a TOTAL. Every row beneath it sits INSIDE that total — they are
 * not additions to it, and stating them as additions is the most common error
 * on competitor pages.
 */
export const CPL_HOURS = {
  total: 200,
  recencyYears: 5,
  clause: 'Section J, para 1(e)',
  components: [
    { label: 'Pilot-in-command', hours: 100, clause: '1(e)(i)', note: 'of which not less than 15 hours in the six months before applying' },
    { label: 'Cross-country as PIC', hours: 20, clause: '1(e)(ii)', note: 'including one flight of at least 300 nautical miles with full-stop landings at two different aerodromes' },
    { label: 'Instrument time', hours: 10, clause: '1(e)(iii)', note: 'of which not more than 5 hours may be on an approved simulator' },
    { label: 'Night flying', hours: 5, clause: '1(e)(iv)', note: 'including at least 10 take-offs and 10 landings as pilot-in-command' },
  ],
};

/**
 * The DGCA written papers for a CPL.
 *
 * FIVE written papers. RTR (A) is NOT one of them — it is examined separately
 * under the Radio Telephone Operator (Restricted) Certificate and Licence
 * Rules, 2025 (G.S.R. 413(E), 25 June 2025), administered by the DGCA rather
 * than by WPC/DoT. Pages that said "9 DGCA subjects" or "all 9 CPL subjects"
 * were counting RTR, Aviation Medicine and Human Factors as separate DGCA
 * papers; nothing in the repo sources that, so those claims were corrected
 * rather than kept.
 */
export const DGCA_PAPERS = [
  'Air Navigation',
  'Aviation Meteorology',
  'Air Regulations',
  'Technical General',
  'Technical Specific',
];

export const RTR = {
  name: 'RTR (A)',
  examinedSeparately: true,
  instrument: 'Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025',
  note: 'Examined separately from the DGCA written papers, and required for CPL issue under Section J paragraph 1(g).',
};

export const EDUCATION = {
  requirement: 'Class 10+2 with Physics and Mathematics from a recognised Board or University',
  clause: 'Section J, para 1(b)',
  altRoute: 'Students from a Biology or Commerce stream clear both subjects as private candidates through NIOS and then apply.',
};

/**
 * Medical phrasing. Deliberately does not name a class — see the DO NOT ADD
 * note at the top of this file. Use these strings verbatim.
 */
export const MEDICAL = {
  short: 'DGCA medical certificate',
  long: 'DGCA-mandated medical fitness assessment',
  clause: 'Section J, para 1(c) — a certificate of physical fitness from an approved Medical Board',
  advice: 'Book the medical before committing money to a flying school. Finding a disqualifying condition after paying a deposit is an expensive way to learn it.',
};

/** ATPL experience: guidance, never a number. See the sourcing note above. */
export const ATPL_HOURS_GUIDANCE =
  'The ATPL experience table in Schedule II, Section M was amended by G.S.R. 22(E) of 7 January 2020 and again by G.S.R. 731(E) of 10 October 2023. Any hours figure quoted from an older source may be out of date — confirm against the current notified Schedule before planning around it.';

export const ACADEMY = {
  name: 'We One Aviation Academy',
  foundedYear: FOUNDED_YEAR,
  yearsOfOperation: YEARS_OF_OPERATION,
  yearsLabel: YEARS_LABEL,
  streetAddress: 'C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka',
  addressLocality: 'New Delhi',
  postalCode: '110077',
  addressCountry: 'India',
  phone: '+91-9667370747',
  whatsapp: 'https://wa.me/919667370747',
  email: 'info.weoneaviation@gmail.com',
  url: 'https://weoneaviation.in',
  /*
   * The honest scope statement. It is the same sentence public/llms.txt opens
   * with, and it is load-bearing: it is what keeps every page on the right
   * side of the claims gate about placement, fleet and simulators.
   */
  scope: 'We teach the DGCA ground subjects and arrange flight training with partner flying schools. We do not own aircraft or simulators, we do not employ pilots, and we do not place students into airline jobs — hiring decisions rest with the operator.',
};

/*
 * ── MEDICAL_STANDARDS: the Class 1 / Class 2 split, finally sourced ────────
 *
 * THIS WAS ON THE DO-NOT-ADD LIST UNTIL 2026-09-11. The 2026-08 claims pass
 * could not retrieve the DGCA medical CAR and, rather than guess, took the
 * split off the site entirely and 301'd /dgca-class-2-class-1-medical away.
 * That was the right call with the evidence available. The evidence has now
 * been found, so the page comes back — sourced, with the redirect removed.
 *
 * THE CHAIN, four documents, three of them on government servers:
 *
 *   Aircraft Rules, 1937, rule 39B (dgca.nic.in) — no licence or rating under
 *   rule 38 is issued or renewed unless the applicant is examined by an
 *   approved medical authority and meets the standards notified by the
 *   Director-General. The DG may also require a flight crew member to be
 *   examined at any time in the interest of the safety of operations. So the
 *   Rules create the duty; the standards themselves sit below, in the CAR.
 *
 *   Aircraft Rules, 1937, rule 39C, amended 27 December 2019 (Ministry of
 *   Civil Aviation) — the amendment raised the age limit for the validity of
 *   the Class 1 medical examination of pilots from forty years to sixty.
 *   This is what makes the "one year up to 60" figure below current rather
 *   than a stale pre-2020 number, and it is why any source still saying the
 *   annual/six-monthly boundary sits at 40 is out of date.
 *
 *   CAR Section 7, Series 'C', Part I, Rev. 6 dated 18 October 2022 —
 *   "Medical Requirements and Examination for Flight Crew / Air Traffic
 *   Controller Licences and Ratings". This is the document that maps each
 *   licence to a class, says who may examine, and sets the validity bands.
 *   Read from a copy of the DGCA-issued text; DGCA's own CAR library is
 *   served through a JavaScript portal that cannot be fetched. Its validity
 *   figure agrees with the rule 39C amendment, which is the corroboration.
 *
 *   List of DGCA Approved Aeromedical Evaluation Centers, Class 1 Air Force
 *   Medical Examination Centres, IAF Boarding Centres and DGCA Empanelled
 *   Class 1 Examiners, updated 27 August 2026, on DGCA's own public S3.
 *   That list moves. Re-check it before quoting it, and update centresAsOf.
 *
 * WHAT NOT TO WRITE. We do not conduct medicals, arrange them, or hold any
 * view on which centre is better. We state where DGCA says they happen. Do
 * not add pass rates, do not list disqualifying conditions as though the list
 * were exhaustive, and never tell a reader whether they will pass.
 */
export const MEDICAL_STANDARDS = {
  verifiedOn: '2026-09-11',
  centresAsOf: '27 August 2026',
  car: {
    citation: "Civil Aviation Requirement, Section 7, Series 'C', Part I, Rev. 6 dated 18 October 2022",
    title: 'Medical Requirements and Examination for Flight Crew / Air Traffic Controller Licences and Ratings',
  },
  rules: {
    duty: 'Aircraft Rules, 1937, rule 39B — no licence or rating under rule 38 is issued or renewed unless the applicant is examined by an approved medical authority and meets the medical standards notified by the Director-General.',
    anyTime: 'Under the same rule, the Director-General may require a flight crew member to undergo a medical examination at any time, where that is necessary in the interest of the safety of operations.',
    validityAmendment: 'Rule 39C was amended on 27 December 2019 to raise the age limit for the validity of the Class 1 medical examination of pilots from forty years to sixty.',
  },

  /** Which licence needs which class. This is the question the page exists for. */
  classes: [
    {
      cls: 'Class 1',
      licences: [
        'Commercial Pilot Licence (aeroplane and helicopter)',
        'Airline Transport Pilot Licence (aeroplane and helicopter)',
        'Private Pilot Licence, where instrument rating privileges are required',
      ],
      validity: 'One year up to the age of 60, and six-monthly thereafter. Six-monthly above 40 for single-crew operations.',
      conductedBy: 'Air Force medical centres, approved civil medical centres, and DGCA-empanelled Class 1 medical examiners.',
    },
    {
      cls: 'Class 2',
      licences: [
        'Private Pilot Licence (aeroplane and helicopter)',
        'Pilot Licence (microlight)',
        'Student Pilot Licence (aeroplane, helicopter, glider, balloon, microlight)',
        'Flight Radio Telephone Operator Licence and its variants',
      ],
      validity: 'Two years up to the age of 50, and one year thereafter.',
      conductedBy: 'Any DGCA-empanelled Class 1 medical examiner, and Class 2 medical examiners holding an MBBS with approved aviation medicine training.',
    },
    {
      cls: 'Class 3',
      licences: ['Air Traffic Controller licences and ratings'],
      validity: 'Four years up to the age of 40, two years above 40 and up to 50, and one year above 50.',
      conductedBy: 'As prescribed for the class in the same CAR.',
    },
  ],

  /** What the examination covers, at the level the CAR states it. */
  examination: {
    groups: ['Physical and mental', 'Visual and colour perception', 'Hearing'],
    standardsFrom: 'The standards follow ICAO Annex 1, Chapter 6, paragraphs 6.3.2 to 6.3.4.',
    note: 'The CAR sets out what is assessed. It does not publish a pass rate, and no honest page can tell you in advance whether you will clear it.',
  },

  /**
   * The approved centres, as DGCA listed them on the date in centresAsOf.
   * Four of the thirteen are in Delhi and the NCR, which is the practical
   * answer for a student reading this from Dwarka.
   */
  centres: {
    airForce: [
      { name: 'Air Force Central Medical Establishment (AFCME)', city: 'New Delhi' },
      { name: '5 Air Force Hospital, Medical Evaluation Cell (East)', city: 'Jorhat, Assam' },
      { name: 'Institute of Aerospace Medicine, Medical Evaluation Centre', city: 'Bengaluru' },
    ],
    civil: [
      { name: 'Dr. Balabhai Nanavati Hospital', city: 'Mumbai', note: 'Initial and re-initial Class 1 only' },
      { name: 'Indraprastha Apollo Hospital', city: 'New Delhi', note: 'All classes' },
      { name: 'Max Multi Specialty Centre', city: 'New Delhi', note: 'All classes' },
      { name: 'Medanta — The Medicity', city: 'Gurugram, Haryana', note: 'All classes' },
      { name: 'Apollo APHC Block', city: 'Chennai', note: 'All classes' },
      { name: 'Apollo Hospitals', city: 'Bengaluru', note: 'All classes' },
      { name: 'Apollo Hospitals', city: 'Hyderabad', note: 'All classes' },
      { name: 'Apollo Hospitals', city: 'Indore, Madhya Pradesh', note: 'All classes' },
      { name: 'Grant Medical Foundation, Ruby Hall Clinic', city: 'Pune', note: 'All classes' },
      { name: "V M Medical Centre, Mirra's Aeromedical Centre", city: 'Mumbai', note: 'All classes' },
    ],
    listNote: 'DGCA updates this list. Check the current version before travelling to a centre.',
  },

  /** The one piece of advice that is ours, not DGCA's, and is worth stating. */
  timingAdvice:
    'Book the medical before committing money to a flying school. A student pilot licence needs a Class 2, but the licence you are training towards needs a Class 1 — and finding a disqualifying condition after paying a deposit is an expensive way to learn it.',

  sources: [
    { label: 'Aircraft Rules, 1937, rule 39B — medical standards (DGCA)', url: 'http://dgca.nic.in/airrule/rule39b.htm' },
    { label: 'Amendment to rule 39C of the Aircraft Rules, 1937, 27 December 2019 (Ministry of Civil Aviation)', url: 'https://www.civilaviation.gov.in/node/3649' },
    { label: "CAR Section 7, Series 'C', Part I, Rev. 6, 18 October 2022 — Medical Requirements and Examination for Flight Crew", url: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq' },
    { label: 'List of DGCA approved aeromedical evaluation centres and empanelled Class 1 examiners, updated 27 August 2026 (DGCA)', url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/medical/class1/Class1.pdf' },
  ],
};

/*
 * ── CPL_COST: one published figure, and the structure around it ────────────
 *
 * WHY THIS EXISTS. Across this site the India CPL cost has been stated as
 * ₹40–55 lakh, ₹40–60 lakh, ₹40–70 lakh and ₹40–80 lakh, on different pages,
 * with no source behind any of them. A reader who checks two of our pages
 * finds two answers, and an answer engine quoting us quotes a number we
 * cannot defend.
 *
 * WHAT WAS ACTUALLY FINDABLE. No Indian government body publishes a market
 * price for CPL training — it is set by each flying training organisation.
 * Searched on 2026-09-11: DGCA, the Ministry of Civil Aviation, PIB and
 * parliamentary answers give FTO counts and licences issued, never fees. The
 * one authority that publishes its own price is IGRUA, the Indira Gandhi
 * Rashtriya Uran Akademi, a government academy under the Ministry of Civil
 * Aviation. That figure is below, with what it does and does not cover.
 *
 * WHAT IS DELIBERATELY NOT HERE. A "typical range" for private FTOs. Every
 * range in circulation traces to coaching blogs quoting each other. If We One
 * Aviation wants to publish one, it should come from written quotes the
 * academy has actually seen from its own partner schools, dated, and stated
 * as such — first-party data we can stand behind, not borrowed guesswork.
 *
 * Statutory examination fees are NOT duplicated here — they live in PARIKSHA
 * and change on a different schedule from school fees.
 */
export const CPL_COST = {
  verifiedOn: '2026-09-11',
  benchmark: {
    school: 'Indira Gandhi Rashtriya Uran Akademi (IGRUA)',
    status: 'Government flying academy under the Ministry of Civil Aviation',
    course: 'Ab-initio to CPL, fixed wing',
    fee: 5000000 + 500000,
    feeLabel: '₹55,00,000',
    source: 'https://igrua.gov.in/approved-courses',
    includes: [
      '465 hours of ground training across the DGCA subjects',
      '20 hours on a single-engine cockpit procedure trainer and 20 hours on a twin-engine simulator',
      '200 hours of flying, the figure the CPL requires',
      'Instrument Rating and multi-engine endorsement',
    ],
    excludes: [
      'About ₹2,50,000 for uniform, study material, navigation computer and headphones',
      'DGCA and RTR examination and licence fees, paid by the trainee directly',
      'Hostel at ₹2,000 per person per month',
      'Messing at roughly ₹15,000 per month',
      'University and examination fees, where a candidate also enrols for the BSc',
    ],
    gstNote: 'IGRUA states that no GST applies to this fee at present.',
  },

  /** What a quote has to answer before it can be compared with another one. */
  askYourSchool: [
    'What is the hourly rate, and is it fixed for the length of the course?',
    'What happens if I need more than the hours in the quote — at what rate?',
    'Is the Instrument Rating included, or billed separately?',
    'Is the multi-engine endorsement included?',
    'Does the fee cover ground school, or is that a separate enrolment?',
    'Are accommodation and food inside the number or outside it?',
    'What is refundable, and on what notice, if I stop partway?',
  ],
  comparisonNote:
    'Two quotes are only comparable once both answer the same seven questions. A lower headline number with the Instrument Rating billed separately is not a lower number.',
};

/*
 * ── EXAM_RULES: what it takes to pass, from the CAR rather than the portal ──
 *
 * PROVENANCE, and why this is a separate export from PARIKSHA. PARIKSHA holds
 * what the Central Examination Organisation publishes about applying and
 * booking. The numbers below come from a different instrument: the Civil
 * Aviation Requirement that governs the examinations themselves.
 *
 *   CAR Section 7 (Flight Crew Standards, Training and Licensing),
 *   Series 'B', Part I — eligibility criteria for examinations for the issue
 *   of crew licences. Rev. 2, dated 13 February 2019.
 *     para 5.6  70% in the theoretical knowledge examination of a subject
 *     para 5.7  oral examination pass marks, by licence
 *     para 6.7  how long a passed paper stays usable
 *
 * SOURCING STATUS — read this before changing anything here. DGCA's own CAR
 * library is served through a JavaScript portal that could not be fetched, so
 * the text was read from two independent copies of the DGCA-issued document:
 * Rev. 2 of 13 February 2019, and the older Rev. 3 of 7 September 2007. They
 * agree on the 70% (para 5.6 in the 2019 text, para 5.5 in the 2007 text),
 * which is why the figure moved out of the "unverified" list in
 * scripts/check-claims.js on 2026-09-11. They differ on paper validity, and
 * the 2019 text governs: the 2007 text gives a flat two and a half years,
 * while 2019 carves out five years for CPL and ATPL.
 *
 * Cite the CAR by its identity — section, series, part, revision and date —
 * never by linking whichever site happens to host a copy today.
 */
export const EXAM_RULES = {
  verifiedOn: '2026-09-11',
  car: {
    section: 'Section 7 — Flight Crew Standards, Training and Licensing',
    series: "Series 'B'",
    part: 'Part I',
    revision: 'Rev. 2',
    dated: '13 February 2019',
    title: 'Eligibility criteria for examinations for issue of crew licences',
    citation: "Civil Aviation Requirement, Section 7, Series 'B', Part I, Rev. 2 dated 13 February 2019",
    where: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq',
  },

  /** The written papers. One number, and it is per subject, not an average. */
  theory: {
    passMark: 70,
    clause: 'para 5.6',
    statement: 'A candidate who secures a minimum of 70% marks in the theoretical knowledge examination of a particular subject is declared PASS.',
    perSubject: 'The 70% applies to each subject on its own. There is no aggregate, and a strong paper does not carry a weak one.',
  },

  /** Oral examinations are a separate threshold, and it is not always 70%. */
  oral: [
    { licence: 'SPL — Student Pilot Licence', passMark: 50, clause: 'para 5.7(a)' },
    { licence: 'GPL — Glider Pilot Licence', passMark: 50, clause: 'para 5.7(c)' },
    { licence: 'ATPL — Airline Transport Pilot Licence', passMark: 70, clause: 'para 5.7(d)' },
    { licence: 'FIR and AFIR — Flying Instructor ratings', passMark: 70, clause: 'para 5.7(e)' },
  ],
  oralRetake: {
    licence: 'ATPL',
    clause: 'para 5.7(d)',
    statement: 'A candidate who fails the first ATPL oral examination may take two further chances, within two years of the date of that result.',
  },

  /** How long a pass is worth something — the rule students plan around badly. */
  paperValidity: {
    general: 'Theoretical knowledge papers must be completed within two and a half years immediately preceding the date of application.',
    cplAtpl: 'For the issue of a CPL or an ATPL, that period is five years.',
    clause: 'para 6.7',
    planningNote: 'Clearing papers years before you finish your flying hours is not free. Count backwards from the licence application, not forwards from the first paper.',
  },
};

/*
 * ── PARIKSHA: DGCA Central Examination Organisation, computer number and
 *    examination booking ─────────────────────────────────────────────────────
 *
 * PROVENANCE. Every value below was read out of one of the four PDFs listed in
 * PARIKSHA.sources on the date in PARIKSHA.verifiedOn. Nothing here comes from
 * a coaching site, a news article or a secondary summary. If a figure is not in
 * those four documents it is not in this object — that is the whole point of
 * the object existing.
 *
 * WHAT IS DELIBERATELY ABSENT
 *   - The help-desk telephone number. The FAQ copy retrieved on the verified
 *     date prints one; an earlier audit found a second FAQ copy in circulation
 *     that omits it. Two copies of the same document disagreeing is not a
 *     source, so the site publishes the email route and the portal Help Desk
 *     tab only. Do not add the number until one current official copy is the
 *     only copy.
 *   - The theory pass mark. Still unsourced — see the DO NOT ADD note at the
 *     top of this file. The 70% strings already on /dgca-pariksha predate this
 *     module and were left alone rather than silently blessed by it.
 *   - Any computer-number application fee. The FAQ and the User Manual describe
 *     a payment step for EXAMINATION applications only. Pages that showed a
 *     payment step inside the computer-number flow were wrong and were fixed.
 *
 * THE ONE APPARENT CONTRADICTION, RESOLVED. User Manual Issue III Rev 0
 * (October 2024) removed physical document submission and notary/gazetted
 * attestation — that removal is about the COMPUTER NUMBER application, which is
 * fully online. The Manual's examination-form chapter separately requires a new
 * candidate to send the generated application PDF with documents to CEO before
 * appearing. Two different applications, two different rules; state both, never
 * collapse them into one sentence.
 */
export const PARIKSHA = {
  verifiedOn: '2026-09-11',
  sources: [
    { label: 'Flight Crew Computer Number Registration — FAQ (DGCA Pariksha)', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=01BA8FB2105DBF5FA48E2F8D89E1E054' },
    { label: 'Flight Crew User Manual, Issue III Rev 0, October 2024 (DGCA Pariksha)', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=6F8C326FEC34C153B92877E1A963F221' },
    { label: 'Reasons for rejection of computer number applications (DGCA Pariksha)', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=E22FF074A3C07EB4C9DE58925F4BDAF8' },
    { label: 'Programme of Examinations 2026 (DGCA Pariksha)', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=027F234C1243D44B5BF5C787082CDCC8' },
    { label: 'Public notice on DigiLocker integration with the Pariksha portal, 13 December 2024', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=DB4CE5D03FC32F593DBAFD5CE65728E8' },
    { label: 'DGCA begins auto-generation of computer numbers for flight crew through Pariksha (PIB, 17 October 2025)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2180501&reg=3&lang=2' },
  ],

  portal: 'https://pariksha.dgca.gov.in',

  authority: {
    name: 'Central Examination Organisation (CEO), Directorate General of Civil Aviation',
    address: 'East Block III, Level III, Rama Krishna Puram, New Delhi 110066',
    email: 'ceo.dgca@nic.in',
    rule: 'Rule 41A, Aircraft Rules, 1937',
    qualificationRule: 'Rule 47A, Aircraft Rules, 1937 (Schedule II)',
  },

  /** What the number is, and the boundaries the FAQ draws around it. */
  basics: {
    definition: 'A unique identification number allotted to a candidate, used to identify that candidate through the DGCA online examination process.',
    validity: 'Lifetime — issued once and retained for the whole examination journey.',
    oneOnly: 'One computer number per candidate per flight crew category. Change the category in the profile rather than applying again.',
    minAge: 16,
    maxAge: null,
    maxAgeNote: 'No maximum age is prescribed.',
    loginAfterAllotment: 'Once allotted, the login ID becomes the computer number including its P- prefix.',
    oneEmailOneMobile: 'The same email address and mobile number cannot be used for more than one candidate.',
  },

  /** The "Apply For" categories, and the examinations CEO conducts. */
  categories: ['PPL', 'CPL', 'ATPL', 'FDEG', 'FE', 'FN', 'FATA'],
  examsConducted: ['FATA', 'FDEG', 'FE', 'FN', 'SFE', 'Pilot'],

  education: {
    nonPpl: 'For every flight crew category other than PPL: 10+2 passed with Physics and Mathematics from a recognised Board or University.',
    ppl: 'For PPL: the Class 10 requirement applies; the 10+2 Physics and Mathematics condition is stated for the non-PPL categories.',
    documents: 'Both the marksheet and the pass certificate are needed for Class 10 and for Class 12. Where a board issues no separate pass certificate, the marksheet must itself read "Marksheet CUM Certificate".',
    legibility: 'Marksheets and certificates must be legible and complete — blurred, cropped or partial scans are a listed rejection reason.',
  },

  /*
   * ── The DigiLocker route, and why the rest of this object is now the
   *    SECOND of two routes ──────────────────────────────────────────────
   *
   * Everything else in PARIKSHA describes the manual application, which is
   * what the Flight Crew User Manual Issue III (October 2024) documents. Two
   * later changes sit on top of it and the Manual has not caught up:
   *
   *   13 December 2024, public notice File No. DGCA-19012/47/2019-CEO-DGCA,
   *   effective 16 December 2024 — a candidate may fetch the Class X and XII
   *   marksheet and certificate straight from DigiLocker into the Pariksha
   *   portal, and for documents fetched that way the Board Verification
   *   Certificate is NOT required.
   *
   *   16 October 2025, announced by PIB on 17 October 2025 — auto-generation.
   *   The system allots the computer number immediately on successful
   *   submission, verifying the education record through DigiLocker instead
   *   of by hand. Phase I covered CBSE candidates who had passed Class 10 and
   *   Class 12; DGCA said it would extend to other recognised boards whose
   *   documents are in DigiLocker, and the portal's own registration page now
   *   speaks of recognised boards generally.
   *
   * WHY BOTH ROUTES STAY ON THE PAGE. The DigiLocker route needs Indian
   * nationality, both certificates present in DigiLocker, and an Aadhaar that
   * matches exactly. A student whose board is not yet in DigiLocker, or who is
   * a foreign national, or whose Aadhaar name differs by one letter, is on the
   * manual route with the BVC and the fifteen working days. Telling a reader
   * only about the fast route is how they find out the hard way.
   *
   * DO NOT write that the BVC has been abolished. It has not. It is waived
   * for the specific documents DigiLocker supplies, and nothing else.
   */
  digilocker: {
    available: true,
    label: 'Register with DigiLocker — auto computer number generation',
    since: '16 October 2025',
    bvcWaiverSince: '16 December 2024',
    bvcWaiverNotice: 'Public notice File No. DGCA-19012/47/2019-CEO-DGCA, dated 13 December 2024',
    allotment: 'The system allots the computer number immediately on successful submission, instead of after manual scrutiny.',
    bvcEffect: 'For the Class X and XII documents fetched from DigiLocker, a Board Verification Certificate is not required.',
    fetched: [
      'Class 10 and Class 12 records from the recognised board, where the board publishes to DigiLocker',
      'Name, date of birth, marks, address and other particulars, auto-filled from DigiLocker',
      'The Aadhaar-linked photograph',
    ],
    stillUpload: [
      'A recent photograph, which must match the DigiLocker photograph to at least 80%',
      'Your signature, to the specification in the Flight Crew User Manual',
    ],
    conditions: [
      'Indian nationality',
      'Class 10 and Class 12 both passed from recognised boards',
      'The board’s records are available in DigiLocker — Phase I covered CBSE, with other boards to follow as their documents come on',
      'The Aadhaar number and the details it carries match the DigiLocker data exactly',
    ],
    failureMode: 'Any mismatch or discrepancy may stop the system generating the computer number. The application then goes the manual way, with the Board Verification Certificate and the usual scrutiny.',
    whoStillGoesManual: 'Foreign nationals, candidates whose board is not yet in DigiLocker, candidates without a matching Aadhaar record, and anyone the automatic check rejects.',
    sources: [
      { label: 'DGCA begins auto-generation of computer numbers for flight crew through Pariksha (PIB, 17 October 2025)', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2180501&reg=3&lang=2' },
      { label: 'Public notice on DigiLocker integration with the Pariksha portal, 13 December 2024', url: 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=DB4CE5D03FC32F593DBAFD5CE65728E8' },
      { label: 'Register with DigiLocker — auto computer number generation (DGCA Pariksha portal)', url: 'https://pariksha.dgca.gov.in/Form/regwithdigi' },
    ],
  },

  /**
   * Board Verification Certificate. The three addressing cases are the part
   * candidates get wrong, and they are quoted from User Manual para 2.5.4.C.
   */
  bvc: {
    whoNeedsIt: 'Every NEW candidate on the manual route, for the Class 10 and Class 12 (or diploma) marksheets. OLD candidates are not asked for it, and neither is a candidate whose Class X and XII documents were fetched from DigiLocker — see the DigiLocker route above.',
    cases: [
      { addressedTo: 'CEO, or "To Whomsoever It May Concern"', action: 'The application is processed on the basis of the original BVC already being with CEO on the date the application is submitted.' },
      { addressedTo: 'The flying school (FTO)', action: 'Upload a copy of the BVC attested by the Chief Flying Instructor (CFI).' },
      { addressedTo: 'The candidate', action: 'Upload an attested or self-attested copy.' },
    ],
    noColourPhotocopies: 'Coloured photocopies of a BVC are not accepted.',
    internationalBoards: 'A candidate from an international board has the BVC emailed to ceo.dgca@nic.in from the board’s own official email address.',
    onlineVerification: 'Where a board verifies marksheets online, the verification details given in the form must actually work — records that cannot be accessed for verification are a listed rejection reason.',
  },

  aiu: {
    whenNeeded: 'When the basic qualification comes from an international school, board or university.',
    body: 'Association of Indian Universities, 16 Kotla Marg, New Delhi 110022',
    diploma: 'A diploma holder obtains the 10+2 equivalence certificate from the relevant State Directorate of Technical Education, not from AIU.',
  },

  name: {
    rule: 'Names are entered exactly as they appear on the Class 10 marksheet or the passport, whichever was issued later.',
    consequence: 'A spelling variation, a title, or a missing or extra middle name is a basic-detail mismatch and causes complete rejection.',
    alsoMatched: 'The father’s name and mother’s name are matched the same way, and must stay consistent across every uploaded document.',
  },

  dob: {
    proof: 'Only the Class 10 certificate and marksheet, or a birth certificate, are accepted as date-of-birth proof.',
    aadhaarNote: 'An Aadhaar card is not accepted as the date-of-birth proof.',
    exactness: 'The date must match the supporting document exactly, including the dd/mm/yyyy format. A difference of a single day causes rejection.',
  },

  addressProof: {
    rule: 'The permanent address entered must match the uploaded proof. A self-attested copy of any one of the following is accepted (User Manual para 2.5.5).',
    documents: ['Aadhaar card', 'Passport', 'Voter ID', 'Licence issued by DGCA', 'Ration card', 'Address proof issued by a State or Central Government authority'],
  },

  foreignCandidates: {
    passport: 'A valid passport is required before applying. Candidates from Nepal and Bhutan also need a passport.',
    passportAddress: 'The address in the passport is used as the candidate’s permanent address.',
    mobile: 'An Indian mobile number is mandatory before registering on the portal.',
    securityClearance: 'Every foreign national goes through the security clearance process, and files the Security Clearance Form (Annexure A) with the application.',
  },

  uploads: {
    photo: {
      size: '45 mm high × 35 mm wide, white background, no border, colour only, matt finish',
      face: 'The face occupies about 70% of the frame (roughly 35 mm × 25 mm)',
      age: 'Not more than 3 months old',
      format: 'JPG/JPEG',
      maxKb: 70,
    },
    signature: {
      size: '20 mm high × 45 mm wide, white background, no border',
      format: 'JPG/JPEG',
      maxKb: 20,
    },
    /** Everything else is PDF. JPEGs are rejected for these. */
    pdfLimits: [
      { documents: 'Class 10 and Class 12 marksheets and pass certificates', maxKb: 500 },
      { documents: 'Date-of-birth certificate, Class 10 and Class 12 board verification certificates, 10+2 equivalence, address proof, university certificate, Aadhaar, security clearance, experience, FATA authorisation, other certificates', maxKb: 100 },
      { documents: 'Logbook pages, passport, visa', maxKb: 200 },
    ],
    finalSubmit: 'Nothing can be added after Final Submit. A forgotten document cannot be uploaded afterwards, and the photograph and signature cannot be replaced by the candidate later.',
  },

  /** User Manual chapter 4, in the order the portal presents it. */
  steps: [
    { title: 'Open the correct registration tab', detail: 'NEW Candidate Registration on pariksha.dgca.gov.in. Read and accept the instructions before the form opens. Candidates who already held a UDAAN-era record use OLD Candidate Registration instead.' },
    { title: 'Enter the basic details exactly as on the Class 10 record', detail: 'Name, date of birth, father’s name and mother’s name as they appear on the Class 10 certificate. An Indian mobile number with the +91 prefix only. Submit, then enter the OTP sent to that number.' },
    { title: 'Activate the account within 24 hours', detail: 'The activation link emailed to the registered address is valid for 24 hours only; after that the candidate has to register again. Set a password of at least 8 characters with an uppercase letter, a lowercase letter, a numeral and a special character.' },
    { title: 'Fill the application through Candidate Login', detail: 'Correspondence and permanent address, the category applied for, nationality and any licence held, training and flying details, foreign study and AIU equivalence, passport and visa where applicable, and the education record with subjects.' },
    { title: 'Upload the documents', detail: 'Photograph and signature as JPG within their size limits; every other document as a PDF within its own limit. Check each file opens and is readable before moving on.' },
    { title: 'Preview, correct, then Final Submit', detail: 'Use BACK to fix anything wrong — this is the last chance. On Final Submit a PDF is generated and emailed, and a Temporary ID is issued.' },
    { title: 'Track the application', detail: 'Follow the Temporary ID through Candidate Login. The allotted computer number arrives by email, after which the login ID becomes P- followed by that number.' },
  ],

  processing: {
    days: 15,
    statement: 'On the manual route, the computer number is issued within 15 working days of submission of a complete application. On the DigiLocker route it is allotted immediately on successful submission.',
    partialNote: 'Where an application is partially rejected, the clock also depends on how long the candidate takes to submit the compliance.',
  },

  hardCopy: {
    computerNumber: 'No hard copy and no notary or gazetted-officer attestation. User Manual Issue III Rev 0 (October 2024) removed both from the computer-number process.',
    examinationForm: 'Separate rule: for the examination application, a new candidate’s generated application PDF with the requisite documents must reach the Central Examination Organisation, failing which the candidate cannot appear in that examination.',
  },

  rejection: {
    partial: {
      meaning: 'A fault in a supporting document or a non-basic field. The candidate corrects it through the login and resubmits under the same Temporary ID.',
      maxTimes: 3,
      escalation: 'An application can be partially rejected a maximum of three times; after that it is rejected completely.',
    },
    complete: {
      meaning: 'A mismatch in the basic details — name, father’s name, mother’s name, date of birth, gender, Aadhaar, year of passing, total marks or qualification.',
      consequence: 'The candidate applies again as a fresh applicant with the corrections. The same email and mobile number generate a new Temporary ID.',
    },
    notification: 'The reason for rejection is emailed to the registered address.',
    appeal: {
      whoTo: 'Director, Central Examination Organisation — where the reasons given for a complete rejection are not satisfactory.',
      email: 'ceo.dgca@nic.in',
      post: 'Central Examination Organisation (CEO) of DGCA, East Block III, Level III, Rama Krishna Puram, New Delhi 110066',
      inPerson: 'Tuesday and Thursday, 3 PM to 5 PM, at the same address.',
    },
  },

  /** The official list, condensed to one line per category, nothing invented. */
  rejectionReasons: [
    'The photograph is not uploaded as specified in the user manual.',
    'The signature is not uploaded as specified in the user manual.',
    'The date of birth does not match the supporting document, the proof is not uploaded as required, it is inconsistent across documents, or it is not legible.',
    'The candidate’s name, father’s name or mother’s name does not match the supporting documents, or is not consistent across them.',
    'The Class 10 or Class 12 marksheet is missing or not legible, or a Class 12 equivalence certificate is incomplete.',
    'Physics and Mathematics are not shown as passed (Physics, Chemistry and Mathematics for AME candidates).',
    'The qualification is not from a recognised board or university.',
    'The Board Verification Certificate is missing or incomplete, its marks do not match the marksheet, it is not legible, or the online verification record cannot be accessed.',
    'The permanent address does not match the uploaded proof, or the proof is not uploaded as required.',
    'An AIU equivalence certificate for Physics, Chemistry and Mathematics or for Class 10 is missing or not legible.',
    'Entries made in the online form do not match the supporting documents.',
    'Logbook pages or licence details are not legible.',
  ],

  /** Examination fees. Rupee figures only — format them with inr(). */
  fees: {
    regularPerPaper: 2500,
    olodePerPaper: 5000,
    oralPerPaper: 500,
    oralNote: 'The oral paper fee applies to the second and third attempt only.',
    serviceCharge: 'The bank may add a nominal service charge or applicable taxes on top of the fee.',
  },

  booking: {
    onePerSession: 'A candidate may apply only once in a particular session.',
    centreChoices: 2,
    centreNote: 'Two choices of centre are filled as Option 1 and Option 2; the second is used if the first cannot be allotted.',
    specificAircraft: 'In a given session a candidate is initially allowed only one specific-aircraft paper.',
    payment: 'Payment is made only through the Government of India NTRP portal Bharatkosh, by net banking, credit card or debit card.',
    deadline: 'Complete the payment by 2300 hrs on the closing date. A payment made later, whose success reaches CEO from Bharatkosh after 2359 hrs on the closing date, may not be treated as valid.',
    noChanges: 'Once the examination form is submitted successfully, no change is entertained and the fee is neither adjusted nor refunded — including where the application is rejected.',
  },

  refund: {
    eligibility: 'A refund is made only where the Bharatkosh transaction succeeded but no service was delivered to the candidate.',
    notEligible: 'There is no refund or adjustment where the service was availed, and none carried forward to a later session.',
    how: 'Login → Examination → Refund of Failed Transactions: pick the failed transaction ID, enter the bank details, sign the declaration, and upload the self-attested Bharatkosh receipt with an ID proof.',
    days: 90,
    daysNote: 'A refund application is processed within 90 days of applying online.',
  },

  profileUpdates: {
    selfService: ['Correspondence address', 'Email ID', 'Mobile number'],
    needsApproval: ['Date of birth', 'First, middle or last name', 'Father’s name', 'Mother’s name', 'Photograph', 'Signature', 'Permanent address', 'Passport details', 'Licence details', 'Category', 'Educational qualification'],
    note: 'An update needing verification generates a request ID, and the filled Profile Update Form is emailed as a PDF. Supporting documents must be uploaded with it.',
  },

  help: {
    email: 'help.pariksha.dgca@gov.in',
    portalDesk: 'The Help Desk tab on the Pariksha portal accepts queries directly.',
  },

  /**
   * 2026 sessions. DGCA prints these as tentative and says they can move for
   * gazetted holidays and festivals — say so wherever they are rendered, and
   * point the reader at the portal for the public notice.
   */
  calendar2026: {
    tentative: 'DGCA publishes these dates as tentative and subject to change for gazetted holidays, festivals and similar reasons. Confirm against the public notice on the Pariksha portal before planning travel.',
    regular: [
      { session: 'Exam 01', dates: '10–14 March 2026' },
      { session: 'Exam 02', dates: '16–20 June 2026' },
      { session: 'Exam 03', dates: '22–26 September 2026' },
      { session: 'Exam 04', dates: '15–19 December 2026' },
    ],
    olode: [
      { session: 'Session 1', dates: '21–23 January 2026' },
      { session: 'Session 2', dates: '4–6 February 2026' },
      { session: 'Session 3', dates: '22–24 April 2026' },
      { session: 'Session 4', dates: '20–22 May 2026' },
      { session: 'Session 5', dates: '15–17 July 2026' },
      { session: 'Session 6', dates: '19–21 August 2026' },
      { session: 'Session 7', dates: '28–30 October 2026' },
      { session: 'Session 8', dates: '18–20 November 2026' },
    ],
  },
};

/**
 * Rupees, grouped the Indian way: ₹2,500 and ₹1,00,000, never ₹100,000.
 *
 * Hand-rolled rather than Intl.NumberFormat('en-IN') on purpose. This renders
 * at build time on whatever Node the CI runner happens to ship; an ICU-light
 * build silently falls back to Western grouping, which would put ₹100,000 on a
 * fees table and look like a typo nobody could reproduce locally.
 */
export function inr(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return '';
  const neg = num < 0;
  const [whole, frac] = Math.abs(num).toFixed(2).split('.');
  // Last three digits stay together; everything before them groups in twos.
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}` : last3;
  return `${neg ? '-' : ''}₹${grouped}${frac === '00' ? '' : `.${frac}`}`;
}

// ─── Summary helpers ────────────────────────────────────────────────────────

/** e.g. "SPL 16, PPL 17, CPL 18, ATPL 21" */
export function agesSummary() {
  return LICENCES.map((l) => `${l.code} ${l.minAge}`).join(', ');
}

/** e.g. "Air Navigation, Aviation Meteorology, ... and Technical Specific" */
export function papersSummary() {
  const p = [...DGCA_PAPERS];
  const last = p.pop();
  return `${p.join(', ')} and ${last}`;
}

/** One sentence covering the whole CPL flying requirement. */
export function cplHoursSummary() {
  // Do not lowercase the label — it mangles the PIC acronym into "pic".
  const inside = CPL_HOURS.components.map((c) => `${c.hours} hours ${c.label}`).join(', ');
  return `${CPL_HOURS.total} hours total as pilot of an aeroplane, flown within the ${CPL_HOURS.recencyYears} years before you apply, including ${inside}.`;
}

/** One line per licence, for a SummaryBox or a table caption. */
export function licenceLadderSummary() {
  return LICENCES.map((l) => `${l.name} (${l.code}): minimum age ${l.minAge} — Aircraft Rules, 1937, Schedule II, ${l.section}`);
}

/* Named before export: eslint's import/no-anonymous-default-export warns on an
 * object literal in the default slot, and this is the one file in the repo
 * every page imports from. */
const FACTS = { LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL, MEDICAL_STANDARDS, ATPL_HOURS_GUIDANCE, ACADEMY, PARIKSHA, EXAM_RULES, CPL_COST };

export default FACTS;
