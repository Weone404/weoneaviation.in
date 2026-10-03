export const DGCA_CLASS1_CENTRES_AS_OF = '27 August 2026';

export const DGCA_CLASS1_CENTRE_SOURCE = {
  label: `List of DGCA approved aeromedical evaluation centres, Class 1 Air Force medical examination centres, IAF boarding centres and DGCA empanelled Class 1 examiners, updated ${DGCA_CLASS1_CENTRES_AS_OF} (DGCA)`,
  url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/medical/class1/Class1.pdf',
};

export const DGCA_CLASS1_CAR_SOURCE = {
  label: "CAR Section 7, Series 'C', Part I, Issue II — Medical Requirements and Examination for Flight Crew / Air Traffic Controller Licences and Ratings (DGCA)",
  url: 'https://www.dgca.gov.in/digigov-portal/?dynamicPage=civilAviationRequirements%2F6%2F0%2FviewDynamicRulesReq',
};

export const DGCA_CLASS1_INITIAL_ISSUE_CENTRES = [
  'AFCME, New Delhi',
  'IAM, Bengaluru',
  'MEC (East), Jorhat',
  'DGCA-empanelled Aeromedical Evaluation Centre',
];

export const DGCA_CLASS1_INITIAL_ISSUE_CENTRE_DETAILS = [
  {
    name: 'Institute of Aerospace Medicine (IAM)',
    city: 'Bengaluru',
    sectionTitle: 'A separate initial-issue route in Bengaluru',
    context:
      'DGCA separately lists the Institute of Aerospace Medicine (IAM), Bengaluru among the restricted Class 1 initial-issue centres. Confirm your individual case against current DGCA guidance.',
  },
];

export const DGCA_CLASS1_AIR_FORCE_RENEWAL_NOTE =
  "Appendix 'B' of the CAR lists twenty Air Force medical examination centres. The first three are the boarding centres; the remaining Senior Medical Officer stations are used for renewals.";

export const DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS = [
  { name: 'Air Force Station Palam', city: 'New Delhi' },
  { name: 'No. 1 Aeromedical Training Centre, Air Force Station Hindan', city: 'Ghaziabad' },
  { name: 'Air Force Station Rajokri', city: 'New Delhi' },
  { name: '54 ASP, Air Force Station', city: 'Gurugram' },
  { name: 'Air Force Station', city: 'Agra' },
  { name: 'Air Force Station Chakeri', city: 'Kanpur' },
  { name: 'Air Force Station Cotton Green', city: 'Mumbai' },
  { name: 'Air Force Station Lohegaon', city: 'Pune' },
  { name: 'Air Force Station Thane', city: 'Mumbai' },
  { name: 'Air Force Station Tambaram', city: 'Chennai' },
  { name: 'Air Force Station Yelahanka', city: 'Bengaluru' },
  { name: 'Air Force Station Begumpet', city: 'Secunderabad' },
  { name: 'Air Force Station Hakimpet', city: 'Secunderabad' },
  { name: 'Air Force Station', city: 'Chandigarh' },
  { name: 'Air Force Station Barrackpore', city: 'Kolkata' },
  { name: 'HQ SAC (U) IAF, Akkulam', city: 'Thiruvananthapuram' },
  { name: 'SMC, HQ SWAC (U) IAF, Chiloda', city: 'Gandhinagar' },
];

export const DGCA_CLASS1_CIVIL_CENTRES = [
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
];
