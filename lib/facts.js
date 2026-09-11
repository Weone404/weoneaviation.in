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
 * DO NOT ADD: the Class 1 / Class 2 medical split (unsourced — the standard
 * sits in a DGCA medical CAR that could not be retrieved), the DGCA theory
 * pass mark (unsourced), or any salary figure.
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
  streetAddress: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka',
  addressLocality: 'New Delhi',
  postalCode: '110077',
  addressCountry: 'India',
  phone: '+91-9355611996',
  whatsapp: 'https://wa.me/919355611996',
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

  /**
   * Board Verification Certificate. The three addressing cases are the part
   * candidates get wrong, and they are quoted from User Manual para 2.5.4.C.
   */
  bvc: {
    whoNeedsIt: 'Every NEW candidate, for the Class 10 and Class 12 (or diploma) marksheets. OLD candidates are not asked for it.',
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
    statement: 'On meeting the requirements, the computer number is issued within 15 working days of submission of the application.',
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

export default { LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL, ATPL_HOURS_GUIDANCE, ACADEMY, PARIKSHA };
