import Link from 'next/link';
import Layout from './Layout';
import Breadcrumb from './Breadcrumb';
import business from '../data/local-seo/business-location.json';

const COURSES = [
  {
    title: 'DGCA Ground Classes',
    href: '/dgca-ground-classes',
    summary: 'Preparation for the five DGCA written papers; RTR (A) preparation is described separately. Classroom and online options are listed on the course page.',
  },
  {
    title: 'Commercial Pilot Licence (CPL)',
    href: '/commercial-pilot-license',
    summary: 'The CPL guide covers eligibility, examinations, medical requirements and the flying-training stages.',
  },
  {
    title: 'Private Pilot Licence (PPL)',
    href: '/courses/ppl',
    summary: 'The PPL course page explains the private-pilot pathway and its training scope.',
  },
  {
    title: 'ATPL Ground Preparation',
    href: '/courses/atpl',
    summary: 'Ground-subject guidance for pilots progressing toward an Airline Transport Pilot Licence.',
  },
];

const ACADEMY_LINKS = [
  { label: 'About the academy', href: '/about-us' },
  { label: 'Pilot training in Delhi', href: '/pilot-training-in-delhi' },
  { label: 'The Dwarka classroom', href: '/pilot-training-in-dwarka' },
  { label: 'Contact and apply', href: '/contact' },
];

export default function LocalitySearchPage({ locality }) {
  const faqs = [
    {
      question: `Does We One Aviation have a classroom or branch in ${locality.name}?`,
      answer: `The verified classroom address on the website is in Dwarka, New Delhi. The available sources do not establish a branch, office, campus or instructor in ${locality.name}.`,
    },
    {
      question: `Which pilot-training options can I explore from ${locality.name}?`,
      answer: 'The website describes DGCA ground classes, CPL guidance and ATPL ground preparation. Check the linked course pages or contact the academy for current delivery options; this locality page does not promise a local class.',
    },
    {
      question: 'Where does the flying portion of pilot training take place?',
      answer: 'We One Aviation says it arranges flight training with partner flying schools. The flying takes place at those schools, not at the Dwarka classroom or at the locality named on this page.',
    },
  ];
  return (
    <Layout
      title={locality.metaTitle}
      description={locality.metaDescription}
      canonical={locality.canonicalPath}
      noindex
    >
      <main className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb />
          <header className="rounded-2xl bg-av-blue px-6 py-10 text-white md:px-12">
            <p className="text-sm uppercase tracking-wide text-av-orange">{locality.name} · {locality.district}, Delhi</p>
            <h1 className="mt-3 font-montserrat text-3xl font-black md:text-5xl">
              {locality.metaH1 || `Pilot Training Near ${locality.name}`}
            </h1>
            <p className="mt-5 max-w-3xl text-white/85">
              {locality.introduction || (
                `The verified record identifies ${locality.name} in ${locality.district}, Delhi. ` +
                'It does not establish a local academy facility or a dedicated service arrangement.'
              )}
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">What the locality record verifies</h2>
            <p className="mt-3 text-gray-600">
              The source records identify {locality.name} in {locality.district}, Delhi and list the postal entries below.
              These records explain the geographic reference only; they do not establish a We One Aviation location or
              define which nearby students use classroom or online teaching.
            </p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Detail
                label="Locality name"
                value={locality.name}
                source={locality.fieldSources?.locality?.source || locality.source}
                confidence={locality.fieldSources?.locality?.confidence || locality.geographicConfidence}
              />
              {locality.district && (
                <Detail
                  label="GeoNames district cross-reference"
                  value={locality.district}
                  source={locality.fieldSources?.district?.source || 'geonames-admin2'}
                  confidence={locality.fieldSources?.district?.confidence || 'medium'}
                />
              )}
              {locality.state && (
                <Detail
                  label="State / territory"
                  value={locality.state}
                  source={locality.fieldSources?.state?.source || 'supplied-pdf'}
                  confidence={locality.fieldSources?.state?.confidence || 'high'}
                />
              )}
              {locality.postalCodes.length > 0 && (
                <Detail
                  label="Supporting PIN codes"
                  value={locality.postalCodes.join(', ')}
                  source="supplied-pdf"
                  confidence="high"
                />
              )}
            </dl>
            {locality.postOfficeNames.length > 0 && (
              <>
                <h3 className="mt-6 font-semibold text-av-blue">Post-office names in the source records</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {locality.postOfficeNames.map((office) => (
                    <li key={office} className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">{office}</li>
                  ))}
                </ul>
              </>
            )}
            {locality.geoNamesPlaceNames.length > 0 && (
              <p className="mt-4 text-sm text-gray-600">
                GeoNames place-name cross-references: {locality.geoNamesPlaceNames.join('; ')}. These are source entries,
                not a verified list of separate settlements.
              </p>
            )}
            <p className="mt-4 text-xs text-gray-500">
              PDF source page{locality.sourcePages.length === 1 ? '' : 's'}: {locality.sourcePages.join(', ') || 'not recorded'}.
              {' '}City is not independently identified in these source records.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">The actual training location and delivery</h2>
            <p className="mt-3 text-gray-600">
              We One Aviation lists its classroom at {business.address.street}, {business.address.city},
              {' '}{business.address.state} {business.address.postalCode}. That is in Dwarka, not {locality.name}.
              The website says students outside Delhi can join online batches. It does not publish a locality-by-locality
              service boundary, distance or travel time.
            </p>
            <p className="mt-3 text-gray-600">
              The academy teaches DGCA ground subjects and arranges flight training with partner flying schools.
              The flying happens at those schools; the academy states that it does not own aircraft or simulators.
              Students considering training from {locality.name} can ask the academy whether current classroom or online
              arrangements suit their circumstances; this page does not promise a local class, enrollment or travel option.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {COURSES.map((course) => (
                <article key={course.href} className="rounded-xl border border-gray-200 p-4">
                  <h3 className="font-semibold text-av-blue">{course.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{course.summary}</p>
                  <Link href={course.href} className="mt-3 inline-block text-sm font-semibold text-av-blue underline">
                    View course information
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm text-gray-600">
              CPL applicants can review the published{' '}
              <Link href="/commercial-pilot-license-eligibility" className="font-semibold text-av-blue underline">
                eligibility requirements
              </Link>
              {' '}before contacting the academy. Course pages remain the source of truth for course-specific information.
            </p>
            <ul className="mt-5 flex flex-wrap gap-4">
              {ACADEMY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-semibold text-av-blue underline">{item.label}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link href="/contact" className="inline-flex rounded-lg bg-av-orange px-5 py-3 font-bold text-white">
                Ask about training options
              </Link>
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">About We One Aviation Academy</h2>
            <p className="mt-3 text-gray-600">
              We One Aviation Academy provides DGCA ground-subject preparation and guidance about pilot training.
              Its stated scope is to arrange flight training with partner flying schools; it does not operate an aircraft
              fleet or promise airline employment.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/pilot-training-in-delhi" className="font-semibold text-av-blue underline">Pilot training in Delhi</Link>
              <Link href="/pilot-training-in-dwarka" className="font-semibold text-av-blue underline">The Dwarka classroom and training scope</Link>
              <Link href="/contact" className="font-semibold text-av-blue underline">Ask about current course delivery</Link>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">Questions about training options</h2>
            <div className="mt-4 space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-av-blue">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

function Detail({ label, value, source, confidence }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 font-semibold text-gray-900">{value}</dd>
      <dd className="mt-1 text-xs text-gray-500">Source: {source}; confidence: {confidence}</dd>
    </div>
  );
}
