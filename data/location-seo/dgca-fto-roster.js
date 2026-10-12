export const DGCA_FTO_ROSTER_AS_OF = '2026-10-03';
export const DGCA_FTO_ROSTER_VERIFIED_AT = '2026-10-08';

export const DGCA_FTO_ROSTER_SOURCE = Object.freeze({
  publisher: 'Directorate General of Civil Aviation (DGCA)',
  title: 'List of DGCA Approved Flying Training Organisations (As on 03.10.2026)',
  url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf',
  sourceDate: DGCA_FTO_ROSTER_AS_OF,
  sourceDateBasis: 'The PDF heading states "As on 03.10.2026".',
  pdfCreatedAt: '2026-10-03T13:49:39Z',
  objectLastModifiedAt: '2026-10-06T09:06:41Z',
  verificationDate: DGCA_FTO_ROSTER_VERIFIED_AT,
});

export const DGCA_FTO_ROSTER_BASES = Object.freeze([
  { name: 'Academy of Carver Aviation Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Baramati', state: 'Maharashtra' }] },
  { name: 'Alchemist Aviation Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Jamshedpur', state: 'Jharkhand' }] },
  { name: 'Asia Pacific Flight Training Academy Ltd.', type: 'flight-school', bases: [
    { place: 'Shamshabad', state: 'Telangana', base: 'GMR HIAL Rajiv Gandhi International Airport, Shamshabad' },
    { place: 'Kalaburagi', state: 'Karnataka', base: 'Kalaburagi Airport, Gulbarga' },
  ] },
  { name: 'Ambitions Flying Club Pvt. Ltd.', type: 'flying-club', bases: [{ place: 'Karad', state: 'Maharashtra', base: 'Karad Airport, Karad-Satara Road' }] },
  { name: 'ARCA Global Aviation Private Limited', type: 'flight-school', bases: [{ place: 'Hyderabad', state: 'Telangana', base: 'Hangar 3, Begumpet Airport, Begumpet, Hyderabad' }] },
  { name: 'Avyanna Aviation Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Kishangarh', state: 'Rajasthan', base: 'Site-2, Kishangarh Airport, Ajmer' }] },
  { name: 'Aviation Connectivity and Infrastructure Developers Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Patna', state: 'Bihar', base: 'Patna Airport, Patna' }] },
  { name: 'Banasthali Vidyapith Gliding & Flying Club', type: 'flying-club', bases: [
    { base: 'Old Technical Block, Dharwad, Karnataka', status: 'AMBIGUOUS', reason: 'The organization name and the source-listed base locality conflict; do not assign it to Banasthali or Dharwad without resolving the source record.' },
  ] },
  { name: 'Bihar Flying Institute', type: 'pilot-training-organization', bases: [{ place: 'Tonk', state: 'Rajasthan', geographicType: 'district', base: 'Banasthali Aerodrome, District Tonk, Rajasthan' }] },
  { name: 'Blue Ray Aviation Pvt. Ltd.', type: 'flight-school', bases: [
    { base: 'Mehsana Airstrip, Ahmedabad, Gujarat', status: 'AMBIGUOUS', reason: 'The listed airstrip name and city field identify different locations.' },
    { base: 'Dhule Airstrip, Mumbai, Maharashtra', status: 'AMBIGUOUS', reason: 'The listed airstrip name and city field identify different locations.' },
  ] },
  { name: 'The Bombay Flying Club', type: 'flight-school', bases: [
    { place: 'Mumbai', state: 'Maharashtra', base: 'Juhu Airport, Mumbai, Maharashtra', statusNote: 'The same roster marks this organization non-operational since 15 June 2025.' },
    { base: 'Dhule Airstrip, Mumbai, Maharashtra', status: 'AMBIGUOUS', reason: 'The listed airstrip name and city field identify different locations.' },
  ] },
  { name: 'Chetak Aviation (A unit of Sultan Education Society)', type: 'flight-school', bases: [{ place: 'Aligarh', state: 'Uttar Pradesh', base: 'Dhanipur Airstrip, Aligarh, Uttar Pradesh' }] },
  { name: 'Chimes Aviation Academy', type: 'flight-school', bases: [
    { place: 'Sagar', state: 'Madhya Pradesh', geographicType: 'district', base: 'Dhana Airstrip, Sagar District, Madhya Pradesh' },
    { place: 'Neemuch', state: 'Madhya Pradesh', base: 'Neemuch Airstrip, Jaysingpura, Neemuch, Madhya Pradesh' },
  ] },
  { name: 'Dunes Aviation Academy (A unit of Ganpat Care Foundation)', type: 'flight-school', bases: [
    { place: 'Bhavnagar', state: 'Gujarat', base: 'GCF Hangar, Bhavnagar Airport, Bhavnagar, Gujarat' },
    { place: 'Bhilwara', state: 'Rajasthan', base: 'GCF Hangar, Hamirgarh Airstrip, Bhilwara, Rajasthan' },
  ] },
  { name: 'Ekvi Air Training Organisation Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Salem', state: 'Tamil Nadu', geographicType: 'district', base: 'Salem Airport, Kamlapuram, Salem District, Tamil Nadu' }] },
  { name: 'Falcon Aviation Academy', type: 'flight-school', bases: [
    { place: 'Ayodhya', state: 'Uttar Pradesh', base: 'Civil Airport, Ayodhya, Uttar Pradesh' },
    { place: 'Rewa', state: 'Madhya Pradesh', base: 'Rewa Airfield, Rewa, Madhya Pradesh' },
  ] },
  { name: 'Flytech Aviation Academy', type: 'flight-school', bases: [
    { place: 'Hyderabad', state: 'Telangana', geographicRelationship: 'regional-context', base: 'Nadergul Aerodrome, Hyderabad, Telangana' },
    { base: 'Nagarjuna Sagar Airfield, Guntur, Andhra Pradesh', status: 'AMBIGUOUS', reason: 'The roster associates an airfield name with a separate city label; the exact registry location is not established by this entry.' },
  ] },
  { name: 'FSTC Flying School Pvt. Ltd.', type: 'flight-school', bases: [
    { base: 'Chaudhary Bansi Lal Airport, Village Gujrani, Bhiwani, Haryana', status: 'AMBIGUOUS', reason: 'The source identifies both a village and a city/airport label; the exact registry record for the named base needs confirmation.' },
    { place: 'Narnaul', state: 'Haryana', base: 'Narnaul Airstrip, Haryana' },
  ] },
  { name: 'Garg Aviations Ltd.', type: 'flight-school', bases: [{ place: 'Kanpur', state: 'Uttar Pradesh', base: 'Civil Aerodrome, Kanpur, Uttar Pradesh' }] },
  { name: 'Government Aviation Training Institute', type: 'pilot-training-organization', bases: [
    { place: 'Dhenkanal', state: 'Odisha', base: 'Birasal Airstrip, Dhenkanal, Odisha' },
    { place: 'Bhubaneswar', state: 'Odisha', base: 'BPI Airport, Bhubaneswar, Odisha' },
  ] },
  { name: 'The Gujarat Flying Club', type: 'flying-club', bases: [
    { place: 'Vadodara', state: 'Gujarat', base: 'Civil Aerodrome, Harni Road, Vadodara, Gujarat' },
    { place: 'Amreli', state: 'Gujarat', base: 'Amreli Airstrip, Amreli, Gujarat' },
  ] },
  { name: 'Government Flying Training School', type: 'pilot-training-organization', bases: [{ place: 'Bengaluru', state: 'Karnataka', base: 'Jakkur Aerodrome, Bangalore, Karnataka' }] },
  { name: 'Haryana Institute of Civil Aviation', type: 'pilot-training-organization', bases: [
    { place: 'Karnal', state: 'Haryana', geographicType: 'district', base: 'Civil Aerodrome, Karnal, Haryana' },
    { place: 'Hisar', state: 'Haryana', base: 'Civil Aerodrome, Hisar, Haryana' },
    { place: 'Pinjore', state: 'Haryana', base: 'Civil Aerodrome, Pinjore, Haryana' },
  ] },
  { name: 'Indian Flying Academy (A unit of Shaurya Flight Sim Pvt. Ltd.)', type: 'flight-school', bases: [{ place: 'Khajuraho', state: 'Madhya Pradesh', base: 'Khajuraho Airport, Khajuraho, Madhya Pradesh' }] },
  { name: 'Indira Gandhi Rashtriya Uran Akademi', type: 'pilot-training-organization', bases: [
    { place: 'Fursatganj', state: 'Uttar Pradesh', base: 'Fursatganj Airfield, Raebareli, Amethi, Uttar Pradesh' },
    { place: 'Gondia', state: 'Maharashtra', base: 'Birsi Airport, Gondia, Maharashtra' },
    { place: 'Kalaburagi', state: 'Karnataka', base: 'Kalaburagi Airport, Gulbarga, Karnataka' },
  ] },
  { name: 'Jet Serve Aviation Pvt. Ltd.', type: 'flight-school', bases: [
    { place: 'Khajuraho', state: 'Madhya Pradesh', base: 'Flyola Aviation Academy, Khajuraho Airport, Madhya Pradesh' },
    { place: 'Jalgaon', state: 'Maharashtra', base: 'Flyola Aviation Academy, Jalgaon Airport, Maharashtra' },
  ] },
  { name: 'Jharkhand Flying Institute', type: 'pilot-training-organization', bases: [{ place: 'Dumka', state: 'Jharkhand', base: 'Dumka Airport, Dumka, Jharkhand' }] },
  { name: 'The Madhya Pradesh Flying Club Ltd.', type: 'flying-club', bases: [
    { place: 'Indore', state: 'Madhya Pradesh', base: 'Devi Ahilyabai Holkar Airport, Indore, Madhya Pradesh' },
    { place: 'Bhopal', state: 'Madhya Pradesh', base: 'Raja Bhoj Airport, Bairagarh, Bhopal, Madhya Pradesh' },
  ] },
  { name: 'Nagpur Flying Club', type: 'flying-club', bases: [
    { place: 'Nagpur', state: 'Maharashtra', base: 'Dr Babasaheb Ambedkar International Airport, Sonegaon Aerodrome, Nagpur, Maharashtra' },
    { place: 'Chandrapur', state: 'Maharashtra', base: 'Moorwa Airstrip, Chandrapur, Maharashtra' },
  ] },
  { name: 'National Flying Training Institute Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Gondia', state: 'Maharashtra', base: 'Birsi Airport, Paraswada, Gondia, Maharashtra' }] },
  { name: 'Orient Flight Aviation Academy', type: 'flight-school', bases: [{ place: 'Mysuru', state: 'Karnataka', base: 'Mysore Airport, Mandakally Post, Mysore, Karnataka' }] },
  { name: 'Patiala Aviation Club', type: 'flying-club', bases: [
    { place: 'Patiala', state: 'Punjab', base: 'Civil Aerodrome, Sangrur Road, Patiala, Punjab' },
    { place: 'Amritsar', state: 'Punjab', base: 'Sri Guru Ram Das Jee International Airport, Amritsar, Punjab' },
  ] },
  { name: 'Pioneer Flying Academy Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Aligarh', state: 'Uttar Pradesh', base: 'Dhanipur Airstrip, Aligarh, Uttar Pradesh' }] },
  { name: 'Rajiv Gandhi Academy for Aviation Technology', type: 'pilot-training-organization', bases: [{ place: 'Thiruvananthapuram', state: 'Kerala', base: 'International Airport, Thiruvananthapuram, Kerala' }] },
  { name: 'Redbird Flight Training Academy Pvt. Ltd.', type: 'flight-school', bases: [
    { place: 'Baramati', state: 'Maharashtra', base: 'Baramati Airport, Pune District, Maharashtra' },
    { place: 'Seoni', state: 'Madhya Pradesh', base: 'Suktara Airport, Seoni, Madhya Pradesh' },
    { place: 'North Lakhimpur', state: 'Assam', base: 'Lilabari Airport, North Lakhimpur District, Assam' },
    { place: 'Kalaburagi', state: 'Karnataka', base: 'Kalaburagi Airport, Gulbarga, Karnataka' },
    { place: 'Belagavi', state: 'Karnataka', base: 'Belagavi Airport, Belagavi, Karnataka' },
  ] },
  { name: 'Sha-Shib Flying Academy', type: 'flight-school', bases: [{ place: 'Guna', state: 'Madhya Pradesh', base: 'Guna Airport, Madhya Pradesh' }] },
  { name: 'Skynex Aero Pvt. Ltd.', type: 'flight-school', bases: [
    { place: 'Jalgaon', state: 'Maharashtra', base: 'Jalgaon Airport, Jalgaon, Maharashtra' },
    { place: 'Mahsana', state: 'Gujarat', base: 'Mahsana, Gujarat' },
  ] },
  { name: 'SVKM NMIMS Academy of Aviation', type: 'flight-school', bases: [{ place: 'Shirpur', state: 'Maharashtra', base: 'Shirpur Airstrip, District Dhule, Maharashtra' }] },
  { name: 'Telangana State Aviation Academy', type: 'pilot-training-organization', bases: [{ place: 'Hyderabad', state: 'Telangana', base: 'Begumpet Airport, Hyderabad, Telangana' }] },
  { name: 'Vision Flying Training Institute', type: 'flight-school', bases: [{ place: 'Amreli', state: 'Gujarat', base: 'VFTI Hangar, Amreli Airport, Chital Road, Amreli, Gujarat' }] },
  { name: 'Wings Aviation Pvt. Ltd.', type: 'flight-school', bases: [{ place: 'Hyderabad', state: 'Telangana', base: 'Begumpet Airport, Hyderabad, Telangana' }] },
]);
