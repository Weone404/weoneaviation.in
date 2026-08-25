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

export default { LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL, ATPL_HOURS_GUIDANCE, ACADEMY };
