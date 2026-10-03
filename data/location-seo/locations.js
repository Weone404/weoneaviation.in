import {
  DGCA_CLASS1_AIR_FORCE_RENEWAL_NOTE,
  DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS,
  DGCA_CLASS1_CAR_SOURCE,
  DGCA_CLASS1_CENTRE_SOURCE,
  DGCA_CLASS1_CENTRES_AS_OF,
  DGCA_CLASS1_CIVIL_CENTRES,
} from './medical-centres.js';

export const LOCATION_SITEMAP_SLUGS = [
  'delhi',
  'dwarka',
  'mumbai',
  'bengaluru',
];

export const INDIA_HUB_LOCATION_GUIDE_SLUGS = [
  'mumbai',
  'bengaluru',
];

export const INDIA_CITY_MEDICAL_REFERENCE_SLUGS = [
  'mumbai',
  'pune',
  'bengaluru',
  'chennai',
  'hyderabad',
];

const cityServiceRejectionReasons = {
  'pilot-school':
    'We One Aviation does not operate a flying school; flight training is arranged with partner schools.',
  'dgca-ground-classes':
    'The academy documents its classroom in Dwarka and online batches for students outside Delhi, but no city-specific classroom or cohort is verified here.',
  'commercial-pilot-training':
    'The available city-specific evidence concerns DGCA medical centres, not a distinct local commercial-training offer; a separate page would repeat the pilot-training pathway.',
  'cpl-training':
    'The available city-specific evidence concerns DGCA medical centres, not a distinct local CPL-training offer; a separate page would repeat the pilot-training pathway.',
};

function createMedicalGuidanceLocation({
  slug,
  city,
  state,
  renewalCities = [city],
  localLead,
  localApplication,
  medicalLinkContext,
  localFAQ,
  indexabilityReview,
}) {
  const centres = DGCA_CLASS1_CIVIL_CENTRES.filter(
    (centre) => centre.city.toLowerCase() === city.toLowerCase(),
  );
  const renewalStations = DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS.filter(
    (station) => renewalCities.some(
      (renewalCity) => station.city.toLowerCase() === renewalCity.toLowerCase(),
    ),
  );

  if (!centres.length) {
    throw new Error(`No source-backed DGCA Class 1 medical centre is recorded for ${city}.`);
  }

  const centreDetails = centres
    .map(({ name, note }) => `${name} (${note})`)
    .join('; ');
  const medicalContext =
    `DGCA’s Class 1 medical-centre list, updated ${DGCA_CLASS1_CENTRES_AS_OF}, names ${centreDetails} in ${city}. The listed scope is specific to each centre. Check DGCA’s current list and confirm scope and appointment availability with the centre before travelling.`;
  const renewalLocations = [...new Set(renewalStations.map(({ city: stationCity }) => stationCity))];
  const renewalContext = renewalStations.length
    ? `${DGCA_CLASS1_AIR_FORCE_RENEWAL_NOTE} These station entries are for renewals and do not replace checking the applicable civil-centre scope above.`
    : null;
  const initialIssueContext = city === 'Bengaluru'
    ? 'DGCA separately lists the Institute of Aerospace Medicine (IAM), Bengaluru among the Class 1 initial-issue centres. The initial-issue route is restricted; confirm your individual case against current DGCA guidance.'
    : null;
  const indexable = !indexabilityReview;
  const rejectedServices = { ...cityServiceRejectionReasons };
  if (indexabilityReview?.reason) {
    rejectedServices['pilot-training'] = indexabilityReview.reason;
  }

  return {
    slug,
    city,
    state,
    country: 'India',
    stateSlug: state.toLowerCase().replace(/\s+/g, '-'),
    countrySlug: 'india',
    authorityPath: '/pilot-training-in-india',
    authorityLabel: 'Pilot training in India',
    locationType: 'city',
    relationship: 'informational',
    relatedLocations: [],
    physicalAcademy: false,
    onlineTraining: true,
    flightTrainingGuidance: true,
    indexable,
    supportedServices: indexable ? ['pilot-training'] : [],
    rejectedServices,
    ...(indexabilityReview ? { indexabilityReview } : {}),
    nearbyLocations: [],
    medicalCentres: centres.map(({ name, note }) => ({ name, scope: note })),
    medicalCentresAsOf: DGCA_CLASS1_CENTRES_AS_OF,
    localSections: [
      {
        title: `DGCA-listed civil Class 1 medical centres in ${city}`,
        body: `The DGCA inventory dated ${DGCA_CLASS1_CENTRES_AS_OF} lists the following civil centre${centres.length === 1 ? '' : 's'} for ${city}. Its scope is shown as published, not as a guarantee of appointment availability.`,
        items: centres.map(({ name, note }) => ({
          label: name,
          detail: `Listed scope: ${note}.`,
        })),
        closing:
          'These are independent medical facilities, not We One Aviation premises. Confirm the current DGCA list, your applicable examination type and appointment details directly before travelling.',
      },
      ...(renewalStations.length ? [{
        title: `Air Force Class 1 renewal entries listed for ${renewalLocations.join(' and ')}`,
        body: renewalContext,
        items: renewalStations.map(({ name, city: stationCity }) => ({
          label: name,
          detail: `Listed at ${stationCity}; the CAR identifies non-boarding Air Force stations as renewal centres.`,
        })),
      }] : []),
      ...(initialIssueContext ? [{
        title: 'A separate initial-issue route in Bengaluru',
        body: initialIssueContext,
      }] : []),
    ],
    localDescription:
      `This guide uses DGCA’s dated medical-centre inventory to compare the Class 1 medical entries relevant to students planning pilot training in ${city}. It does not claim a local academy or flying-school presence.`,
    localContext: medicalContext,
    trainingMode:
      'We One Aviation’s documented classroom is in Dwarka, Delhi. Its published information says students outside Delhi can join online ground-class batches. Flight training is arranged with partner flying schools and takes place at the selected school; no local academy classroom or flying base is claimed here.',
    localFAQs: [],
    sourcePages: [
      '/pilot-training-in-india',
      '/dgca-class-2-class-1-medical',
      '/about-us',
    ],
    sourceLinks: [
      {
        label: DGCA_CLASS1_CENTRE_SOURCE.label,
        href: DGCA_CLASS1_CENTRE_SOURCE.url,
      },
      ...(renewalStations.length ? [{
        label: DGCA_CLASS1_CAR_SOURCE.label,
        href: DGCA_CLASS1_CAR_SOURCE.url,
      }] : []),
    ],
    serviceContent: indexable ? {
      'pilot-training': {
        seoTitle: `Pilot Training Options for Students in ${city} | We One Aviation`,
        seoDescription:
          `Pilot-training guidance for students in ${city}: the Indian CPL pathway, online ground-class availability outside Delhi, and DGCA-listed Class 1 medical-centre information.`,
        h1: `Pilot Training Options for Students in ${city}`,
        breadcrumbLabel: `Pilot training options for ${city}`,
        introduction: localLead,
        localApplication: localApplication || medicalContext,
        localContext: medicalContext,
        trainingMode:
          'The academy’s documented classroom is in Dwarka, Delhi; online ground-class batches are stated to be available to students outside Delhi. Flight training is separate and takes place at a selected partner flying school, not at a local We One Aviation facility.',
        faqs: [localFAQ],
        internalLinks: [
          {
            context: 'For the national licensing stages and training model, read',
            label: 'pilot training in India',
            href: '/pilot-training-in-india',
          },
          {
            context: medicalLinkContext
              || 'For the current medical process and source notes, see',
            label: 'DGCA Class 1 and Class 2 medical guidance',
            href: '/dgca-class-2-class-1-medical',
          },
          {
            context: 'For CPL eligibility and the licence pathway, review',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'For the theory-preparation stage, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
        ],
        cta: { label: 'Ask about online ground-class options', href: '/contact' },
      },
    } : {},
  };
}

export const LOCATIONS = [
  {
    slug: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    stateSlug: 'delhi',
    countrySlug: 'india',
    authorityPath: '/pilot-training-in-delhi',
    locationType: 'city',
    relationship: 'physical',
    relatedLocations: ['dwarka'],
    physicalAcademy: true,
    onlineTraining: true,
    flightTrainingGuidance: true,
    indexable: true,
    supportedServices: [
      'pilot-training',
      'dgca-ground-classes',
      'commercial-pilot-training',
      'cpl-training',
    ],
    rejectedServices: {
      'pilot-school':
        'We One Aviation does not operate a flying school; flight training is arranged with partner schools.',
    },
    nearbyLocations: ['dwarka'],
    localSections: [
      {
        title: 'Delhi connects several DGCA administrative steps',
        body: 'The existing Delhi guide identifies the Central Examination Organisation, DGCA-listed medical centres across Delhi and the NCR, and the Association of Indian Universities as relevant to applicants in specific circumstances. The online examination portal can be used from elsewhere; these institutions do not make the city a flying-training base.',
      },
      {
        title: 'The flying stage is outside Delhi and the NCR',
        body: 'The Delhi authority guide reports that the DGCA approved-FTO list it reviewed has no base in Delhi or the NCR. We One Aviation arranges the flying stage with partner schools; flight training is conducted at the selected school, not at the Dwarka classroom.',
      },
    ],
    localDescription:
      'Delhi’s existing training guide covers the city-wide licensing context while identifying the academy’s classroom as the Dwarka address below. Flight training is arranged with partner schools and is not taught at this classroom.',
    localContext:
      'The existing Delhi guide describes the Central Examination Organisation, DGCA-approved aeromedical centres in Delhi and the NCR, and the Association of Indian Universities as relevant institutions for some students. It states that DGCA-listed flying bases are not in Delhi or the NCR.',
    trainingMode:
      'Classroom DGCA ground classes are held at the Dwarka address. The site says students outside Delhi can join online batches. Flight training is arranged with partner flying schools and takes place at the selected school.',
    localFAQs: [
      {
        question: 'Where does We One Aviation hold classroom classes in Delhi?',
        answer:
          'The documented classroom is at C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi 110077.',
      },
      {
        question: 'Does We One Aviation operate a flying school in Delhi?',
        answer:
          'No. We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools. Flight training takes place at the selected school.',
      },
    ],
    serviceContent: {
      'pilot-training': {
        introduction:
          'For students in Delhi, the pilot-training pathway combines DGCA ground preparation at the academy’s Dwarka classroom with flight training at a partner flying school. The Delhi guide explains which parts of the process can be completed in the city and which require training elsewhere.',
        localContext:
          'The Delhi pathway has locally relevant DGCA examination, medical and equivalence institutions. The academy’s classroom is in Dwarka; it is not a Delhi flying training organisation.',
        trainingMode:
          'DGCA ground classes are held in Dwarka. Online batches are stated to be available to students outside Delhi. Flight training is completed at a selected partner flying school.',
        faqs: [
          {
            question: 'Can the flying portion of pilot training be completed in Delhi?',
            answer:
              'The existing Delhi guide states that DGCA’s published approved flying-training organisation list has no base in Delhi or the NCR. We One Aviation arranges flight training with partner schools, where the flying takes place.',
          },
        ],
        internalLinks: [
          {
            context: 'For the city-level examination, medical and flying-base context, read',
            label: 'the Delhi pilot-training guide',
            href: '/pilot-training-in-delhi',
          },
          {
            context: 'For the national licensing pathway, see',
            label: 'pilot training in India',
            href: '/pilot-training-in-india',
          },
          {
            context: 'For CPL-specific licensing information, review',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'For a staged overview of the training route, read',
            label: 'the complete pilot-training guide',
            href: '/blogs/what-is-pilot-training-complete-guide',
          },
        ],
        cta: { label: 'Ask about current training options', href: '/contact' },
      },
      'dgca-ground-classes': {
        introduction:
          'We One Aviation holds classroom DGCA ground classes at its documented Dwarka address in Delhi. The classes prepare students for the DGCA written papers; flight training is a separate stage arranged with partner flying schools.',
        localContext:
          'The Dwarka classroom is the academy’s documented physical teaching location. Delhi-based students can also use the existing Delhi guide for information about relevant DGCA institutions in the city.',
        trainingMode:
          'Classroom batches are held in Dwarka. The site also states that students outside Delhi can join online batches.',
        faqs: [
          {
            question: 'Where are the Delhi classroom DGCA ground classes held?',
            answer:
              'They are held at C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi 110077.',
          },
        ],
        internalLinks: [
          {
            context: 'For subjects, class formats and enrolment information, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
          {
            context: 'For the city-wide licensing context, read',
            label: 'pilot training in Delhi',
            href: '/pilot-training-in-delhi',
          },
          {
            context: 'For the academy’s verified classroom details, see',
            label: 'pilot training in Dwarka',
            href: '/pilot-training-in-dwarka',
          },
          {
            context: 'For an explanation of the theory stage, read',
            label: 'the DGCA ground-school guide',
            href: '/blogs/dgca-ground-school-guide',
          },
          {
            context: 'For subject-specific preparation, explore',
            label: 'Aviation Meteorology',
            href: '/aviation-meteorology',
          },
        ],
        cta: { label: 'Ask about current class options', href: '/contact' },
      },
      'commercial-pilot-training': {
        introduction:
          'Commercial pilot training involves DGCA ground preparation and a separate flying stage. We One Aviation teaches ground subjects from its Dwarka classroom in Delhi and arranges flight training with partner flying schools; it does not operate a flying school.',
        localContext:
          'The Delhi guide explains local examination and medical steps alongside the flying stage, which is completed at an approved flying-training organisation outside Delhi and the NCR.',
        trainingMode:
          'Ground preparation is available in the Dwarka classroom, with online batches stated for students outside Delhi. Flight training is at the selected partner school.',
        faqs: [
          {
            question: 'Does commercial pilot training with We One Aviation include flying in Delhi?',
            answer:
              'No. We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools. Flight training takes place at the selected school, not at the Dwarka classroom.',
          },
        ],
        internalLinks: [
          {
            context: 'For licence stages and CPL details, read',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'Before planning an application, check',
            label: 'CPL eligibility',
            href: '/commercial-pilot-license-eligibility',
          },
          {
            context: 'For the theory component taught by the academy, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
          {
            context: 'For a detailed account of how the training stages fit together, read',
            label: 'the commercial pilot-training programme guide',
            href: '/blogs/commercial-pilot-training-programs-complete-guide',
          },
        ],
        cta: { label: 'Ask about the CPL pathway', href: '/contact' },
      },
      'cpl-training': {
        introduction:
          'The Delhi CPL pathway includes eligibility, DGCA examinations and flight training at a flying-training organisation. We One Aviation provides ground-subject preparation from Dwarka and arranges the flying stage with partner schools.',
        localContext:
          'The academy’s Dwarka classroom is its documented physical teaching location. The existing Delhi guide covers city-specific examination, medical and equivalence steps; it does not claim a local flying base.',
        trainingMode:
          'CPL ground preparation is taught in Dwarka, with online batches stated for students outside Delhi. Flight training occurs at the selected partner flying school.',
        faqs: [
          {
            question: 'Where does the CPL flying stage take place for Delhi students?',
            answer:
              'The flying stage takes place at the selected flying school. We One Aviation arranges flight training with partner schools and does not operate a flying school in Delhi.',
          },
        ],
        internalLinks: [
          {
            context: 'For licence requirements and the CPL pathway, read',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'For application stages, see',
            label: 'the CPL admission-process guide',
            href: '/commercial-pilot-license-admission-process',
          },
          {
            context: 'For the broader national route, read',
            label: 'pilot training in India',
            href: '/pilot-training-in-india',
          },
          {
            context: 'For a comparison of training cost components, read',
            label: 'the pilot-training cost guide',
            href: '/blogs/pilot-training-cost-in-india',
          },
        ],
        cta: { label: 'Ask about the CPL pathway', href: '/contact' },
      },
    },
    sourcePages: [
      '/pilot-training-in-delhi',
      '/pilot-training-in-dwarka',
      '/pilot-training-in-india',
      '/dgca-ground-classes',
    ],
  },
  {
    slug: 'dwarka',
    city: 'Dwarka',
    state: 'Delhi',
    country: 'India',
    stateSlug: 'delhi',
    countrySlug: 'india',
    authorityPath: '/pilot-training-in-dwarka',
    locationType: 'locality',
    relationship: 'physical',
    relatedLocations: ['delhi'],
    physicalAcademy: true,
    onlineTraining: true,
    flightTrainingGuidance: true,
    indexable: true,
    supportedServices: [
      'pilot-training',
      'dgca-ground-classes',
      'commercial-pilot-training',
      'cpl-training',
    ],
    rejectedServices: {
      'pilot-school':
        'We One Aviation does not operate a flying school; flight training is arranged with partner schools.',
    },
    nearbyLocations: [],
    localSections: [
      {
        title: 'The academy’s documented classroom is in Dwarka Sector 7',
        body: 'We One Aviation teaches DGCA ground subjects at its published Dwarka address. This physical classroom is the documented teaching location; it is not a flying school and does not provide the aircraft flight-training stage.',
      },
      {
        title: 'Dwarka students use the wider Delhi DGCA pathway',
        body: 'The city authority guide covers the Central Examination Organisation, medical-centre entries across Delhi and the NCR, and the Association of Indian Universities for candidates who need equivalence. Those steps are distinct from ground classes at the academy and flying at a selected flying training organisation.',
      },
    ],
    localDescription:
      'The academy teaches DGCA ground subjects at this documented Dwarka classroom. Flight training is arranged with partner flying schools and takes place at the selected school.',
    localContext:
      'The Dwarka page describes the classroom and the local DGCA-related steps available in Delhi. It distinguishes ground teaching at the academy from flying at a selected partner school.',
    trainingMode:
      'Classroom DGCA ground classes are held at the Dwarka address. The site says students outside Delhi can join online batches. Flight training is arranged with partner flying schools and takes place at the selected school.',
    localFAQs: [
      {
        question: 'Where is We One Aviation’s Dwarka classroom?',
        answer:
          'It is at C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi 110077.',
      },
      {
        question: 'Does the Dwarka classroom provide flight training?',
        answer:
          'No. We One Aviation teaches DGCA ground subjects at the Dwarka classroom and arranges flight training with partner flying schools. The flying takes place at the selected school.',
      },
    ],
    serviceContent: {
      'pilot-training': {
        introduction:
          'We One Aviation’s documented physical classroom is in Dwarka, where it teaches DGCA ground subjects. The academy also guides students through the wider pilot-training pathway and arranges flight training with partner flying schools; the flying does not take place at the classroom.',
        localContext:
          'The Dwarka authority page explains the academy’s actual classroom location and how Delhi-based examination, medical and equivalence steps fit into the pathway.',
        trainingMode:
          'Ground classes are held at the Dwarka address. Online batches are stated to be available to students outside Delhi. Flight training is completed at a selected partner flying school.',
        faqs: [
          {
            question: 'Can I complete the flying stage at the Dwarka academy?',
            answer:
              'No. The Dwarka classroom is for DGCA ground teaching. We One Aviation arranges flight training with partner flying schools, and the flying takes place at the selected school.',
          },
        ],
        internalLinks: [
          {
            context: 'For the academy’s classroom and local training details, read',
            label: 'pilot training in Dwarka',
            href: '/pilot-training-in-dwarka',
          },
          {
            context: 'For Delhi-wide licensing and examination context, see',
            label: 'pilot training in Delhi',
            href: '/pilot-training-in-delhi',
          },
          {
            context: 'For the nationwide pilot-training pathway, read',
            label: 'pilot training in India',
            href: '/pilot-training-in-india',
          },
          {
            context: 'For practical admission steps before selecting a flying school, see',
            label: 'the flying-school prerequisites guide',
            href: '/blogs/flight-school-prerequisites-admission-guide',
          },
        ],
        cta: { label: 'Ask about current training options', href: '/contact' },
      },
      'dgca-ground-classes': {
        introduction:
          'We One Aviation teaches DGCA ground subjects at its documented classroom in Dwarka, New Delhi. The classes prepare students for the DGCA written papers; RTR (A) preparation is described separately on the course page.',
        localContext:
          'C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, New Delhi 110077 is the classroom address published by the academy.',
        trainingMode:
          'Classroom batches are held at the Dwarka address. The site also states that students outside Delhi can join online batches.',
        faqs: [
          {
            question: 'Which DGCA ground classes are held in Dwarka?',
            answer:
              'We One Aviation prepares students for the DGCA written papers at its Dwarka classroom. RTR (A) preparation is handled separately from those papers.',
          },
        ],
        internalLinks: [
          {
            context: 'For the available theory subjects and class details, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
          {
            context: 'For online class information, read',
            label: 'online DGCA ground classes',
            href: '/online-dgca-ground-classes',
          },
          {
            context: 'For the documented classroom location, see',
            label: 'pilot training in Dwarka',
            href: '/pilot-training-in-dwarka',
          },
          {
            context: 'For exam preparation guidance, read',
            label: 'the DGCA exam guide',
            href: '/blogs/dgca-exam-guide',
          },
          {
            context: 'For the navigation subject, explore',
            label: 'Air Navigation',
            href: '/air-navigation',
          },
          {
            context: 'For meteorology subject preparation, explore',
            label: 'Aviation Meteorology',
            href: '/aviation-meteorology',
          },
        ],
        cta: { label: 'Ask about current class options', href: '/contact' },
      },
      'commercial-pilot-training': {
        introduction:
          'We One Aviation provides DGCA ground-subject preparation from its Dwarka classroom and guidance for the commercial-pilot pathway. Flight training is a distinct stage arranged with partner flying schools, not a service performed at the Dwarka classroom.',
        localContext:
          'The academy’s Dwarka page identifies its physical classroom and explains the Delhi-based examination, medical and equivalence steps relevant to some students.',
        trainingMode:
          'Ground preparation is available in the Dwarka classroom. Online batches are stated for students outside Delhi. Flight training takes place at the selected partner flying school.',
        faqs: [
          {
            question: 'Is We One Aviation a commercial flying school in Dwarka?',
            answer:
              'No. It teaches DGCA ground subjects and arranges flight training with partner flying schools. The academy does not operate a flying school or conduct flying at its Dwarka classroom.',
          },
        ],
        internalLinks: [
          {
            context: 'For CPL stages and licensing details, read',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'For the ground-training stage, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
          {
            context: 'For the verified classroom and local context, read',
            label: 'pilot training in Dwarka',
            href: '/pilot-training-in-dwarka',
          },
          {
            context: 'For how the academic and flying stages fit together, read',
            label: 'the commercial pilot-training programme guide',
            href: '/blogs/commercial-pilot-training-programs-complete-guide',
          },
        ],
        cta: { label: 'Ask about the commercial-pilot pathway', href: '/contact' },
      },
      'cpl-training': {
        introduction:
          'CPL ground preparation is taught at We One Aviation’s documented classroom in Dwarka. The CPL pathway also requires a separate flying stage, which the academy arranges with partner flying schools and which takes place at the selected school.',
        localContext:
          'The Dwarka classroom is the academy’s verified physical teaching location. Its CPL guide covers licensing stages; the local Dwarka page explains what the classroom does and does not provide.',
        trainingMode:
          'Ground classes are held in Dwarka, with online batches stated for students outside Delhi. Flight training is completed at the selected partner flying school.',
        faqs: [
          {
            question: 'Does CPL training in Dwarka include aircraft or simulator use at the academy?',
            answer:
              'No. We One Aviation states that it does not own aircraft or simulators. Flight training is arranged with partner flying schools and takes place at the selected school.',
          },
        ],
        internalLinks: [
          {
            context: 'For licence requirements and the CPL pathway, read',
            label: 'the Commercial Pilot Licence guide',
            href: '/commercial-pilot-license',
          },
          {
            context: 'For the course’s published CPL details, see',
            label: 'the CPL course page',
            href: '/courses/cpl',
          },
          {
            context: 'For the local classroom context, read',
            label: 'pilot training in Dwarka',
            href: '/pilot-training-in-dwarka',
          },
          {
            context: 'For theory-class details, see',
            label: 'DGCA ground classes',
            href: '/dgca-ground-classes',
          },
          {
            context: 'For the order of the admission steps, read',
            label: 'the flying-school prerequisites guide',
            href: '/blogs/flight-school-prerequisites-admission-guide',
          },
        ],
        cta: { label: 'Ask about the CPL pathway', href: '/contact' },
      },
    },
    sourcePages: [
      '/pilot-training-in-dwarka',
      '/pilot-training-in-delhi',
      '/commercial-pilot-license',
      '/dgca-ground-classes',
    ],
  },
  ...[
    {
      slug: 'mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      localLead:
        'For pilot-training applicants in Mumbai, DGCA distinguishes Nanavati’s initial/re-initial-only Class 1 scope from V M Medical Centre, Mirra’s Aeromedical Centre, which is listed for all classes. Separate Air Force entries are listed for renewals. None of these medical facilities is a We One Aviation location.',
      localApplication:
        'Because the two civil entries have different scopes, identify whether your case is initial, re-initial or another examination before choosing where to enquire. Check the current DGCA list and confirm the applicable route and appointment directly.',
      medicalLinkContext:
        'To check how initial, re-initial and renewal medical steps differ, read',
      localFAQ: {
        question: 'Is every Mumbai civil centre listed for all Class 1 examinations?',
        answer:
          'No. Dr. Balabhai Nanavati Hospital is listed for initial and re-initial Class 1 only. V M Medical Centre, Mirra’s Aeromedical Centre is listed for all classes. Confirm the current scope and appointment directly with the facility.',
      },
    },
    {
      slug: 'pune',
      city: 'Pune',
      state: 'Maharashtra',
      indexabilityReview: {
        status: 'not-approved',
        reason: 'The verified city-specific evidence is one all-classes civil medical-centre entry and one renewal-station entry. It does not establish a distinct local training offer or enough separate location context for an indexable pilot-training page.',
      },
      localLead:
        'DGCA lists Grant Medical Foundation, Ruby Hall Clinic as a civil Class 1 centre for all classes in Pune. The CAR separately lists Air Force Station Lohegaon for renewals; the entries describe different examination routes, not a local pilot academy.',
      localApplication:
        'The civil-centre listing and the Air Force renewal entry serve different documented roles. Before arranging travel, verify which listed route applies to the examination you need and confirm availability with the relevant centre.',
      medicalLinkContext:
        'Before planning a medical visit from Pune, review the DGCA examination steps in',
      localFAQ: {
        question: 'Which civil Class 1 centre does DGCA list for Pune?',
        answer:
          'The dated list names Grant Medical Foundation, Ruby Hall Clinic as an all-classes centre. It separately lists Air Force Station Lohegaon for renewals; confirm the appropriate route and current appointment availability before travelling.',
      },
    },
    {
      slug: 'bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      localLead:
        'Bengaluru’s DGCA entries distinguish Apollo Hospitals, listed as a civil centre for all classes, from IAM, which appears among the restricted Class 1 initial-issue centres. Air Force Station Yelahanka is a separate renewal entry.',
      localApplication:
        'If you are seeking an initial Class 1, check the restricted initial-issue route before comparing it with a general civil-centre listing or a renewal station. Confirm your individual case against current DGCA guidance.',
      medicalLinkContext:
        'For the distinction between an initial Class 1 and a renewal, read',
      localFAQ: {
        question: 'Where does DGCA list a Class 1 initial-issue centre in Bengaluru?',
        answer:
          'DGCA lists the Institute of Aerospace Medicine (IAM), Bengaluru among the restricted initial-issue centres. Apollo Hospitals is separately listed as a civil centre for all classes, and Air Force Station Yelahanka is a renewal entry. Confirm which route applies to your case.',
      },
    },
    {
      slug: 'chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      indexabilityReview: {
        status: 'not-approved',
        reason: 'The verified city-specific evidence is one all-classes civil medical-centre entry and one renewal-station entry. It does not establish a distinct local training offer or enough separate location context for an indexable pilot-training page.',
      },
      localLead:
        'For Chennai, DGCA lists Apollo APHC Block as a civil Class 1 centre for all classes, while the CAR lists Air Force Station Tambaram for renewals. These are independent medical listings and do not indicate a We One Aviation classroom or flying school.',
      localApplication:
        'The published entries distinguish a civil centre from an Air Force renewal station. Match the listed scope to your examination, then confirm current availability and process directly with the relevant centre.',
      medicalLinkContext:
        'To understand which medical route to confirm before contacting a listed centre, see',
      localFAQ: {
        question: 'Which civil Class 1 centre is listed for Chennai?',
        answer:
          'The DGCA inventory lists Apollo APHC Block, Chennai as a centre for all classes. Air Force Station Tambaram is a separate renewal entry in the CAR. Confirm scope and availability directly before making travel plans.',
      },
    },
    {
      slug: 'hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      renewalCities: ['Secunderabad'],
      indexabilityReview: {
        status: 'not-approved',
        reason: 'The verified city-specific evidence is one all-classes civil medical-centre entry plus renewal-station entries identified as Secunderabad. It does not establish a distinct local training offer or enough Hyderabad-specific context for an indexable pilot-training page.',
      },
      localLead:
        'DGCA lists Apollo Hospitals, Hyderabad as a civil Class 1 centre for all classes. The CAR separately names Air Force renewal stations at Secunderabad; the source labels those entries Secunderabad, not Hyderabad.',
      localApplication:
        'Keep the Hyderabad civil-centre entry distinct from the stations the CAR labels Secunderabad. Confirm the applicable examination route and location directly with DGCA and the named facility before making travel plans.',
      medicalLinkContext:
        'For checking the scope and location of a medical-centre entry before travelling, read',
      localFAQ: {
        question: 'Are the Secunderabad Air Force entries the same as Hyderabad’s civil centre listing?',
        answer:
          'No. DGCA lists Apollo Hospitals at Hyderabad as an all-classes civil centre. The CAR separately names Air Force Station Begumpet and Air Force Station Hakimpet at Secunderabad for renewal purposes; keep those source labels distinct and confirm the applicable route directly.',
      },
    },
  ].map(createMedicalGuidanceLocation),
];

export const LOCATION_RELATIONSHIPS = [
  'physical',
  'online',
  'service-area',
  'informational',
];

export const LOCATION_TYPES = ['city', 'locality'];
