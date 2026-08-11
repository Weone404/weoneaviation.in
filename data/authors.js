/**
 * data/authors.js
 *
 * The academy's named subject-matter experts, in one place, so an article can
 * be attributed to a real person with verifiable credentials.
 *
 * WHY (GEO audit 2026-08-11): the site already published these four names and
 * their DGCA licence numbers on /credentials and in the homepage Person schema
 * — but they appeared on only 2 of 40 pages and authored nothing. Thirty-eight
 * pages of technical aviation content carried no attributable expert at all.
 * Attribution is one of the strongest E-E-A-T signals available, and it costs
 * nothing here because the credentials are already documented.
 *
 * IMPORTANT: these details must stay factually accurate. If someone leaves, or
 * a licence number changes, update it here and on /credentials together — the
 * two must agree, since /credentials is the page that substantiates the claim.
 */

export const authors = {
  rajesh: {
    key: 'rajesh',
    name: 'Capt. Rajesh Kumar',
    jobTitle: 'CPL Training Director',
    identifier: 'DGCA/LIC/1998-456',
    knowsAbout: ['Commercial Pilot License (CPL)', 'Instrument Rating', 'Flight training methodology'],
    description:
      'Retired Air India Captain with 22 years of commercial flying experience. Leads CPL ground theory and flight training methodology at We One Aviation Academy.',
  },

  priya: {
    key: 'priya',
    name: 'Ms. Priya Sharma',
    jobTitle: 'DGCA Ground Classes Coordinator',
    identifier: 'DGCA/LIC/2012-782',
    knowsAbout: ['Air Navigation', 'Aviation Meteorology', 'Air Regulations'],
    description:
      'Active SpiceJet First Officer and certified DGCA ground instructor, specialising in DGCA theory examination preparation.',
  },

  vikas: {
    key: 'vikas',
    name: 'Capt. Vikas Patel',
    jobTitle: 'Simulator Training Lead',
    identifier: 'DGCA/LIC/2008-334',
    knowsAbout: ['Simulator training', 'Type rating preparation', 'Airline operations'],
    description:
      'IndiGo Captain with 16 years of airline experience, leading simulator and type-rating preparation.',
  },

  anil: {
    key: 'anil',
    name: 'Dr. Anil Verma',
    jobTitle: 'Aviation Medical Adviser',
    identifier: 'AME/2005-123',
    knowsAbout: ['DGCA Class 1 medical', 'DGCA Class 2 medical', 'Aviation medicine'],
    description:
      'DGCA-authorised Aviation Medical Examiner with 18 years of experience assessing pilot medical fitness.',
  },
};

export default authors;
