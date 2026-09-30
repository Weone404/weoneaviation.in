import Link from 'next/link';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import business from '../../data/local-seo/business-location.json';

const usefulLinks = [
  { label: 'DGCA ground classes', href: '/dgca-ground-classes' },
  { label: 'Commercial Pilot Licence (CPL)', href: '/commercial-pilot-license' },
  { label: 'Private Pilot Licence (PPL)', href: '/courses/ppl' },
  { label: 'ATPL ground preparation', href: '/courses/atpl' },
  { label: 'About the academy', href: '/about-us' },
  { label: 'Pilot training in Delhi', href: '/pilot-training-in-delhi' },
  { label: 'The Dwarka classroom', href: '/pilot-training-in-dwarka' },
  { label: 'Contact and apply', href: '/contact' },
];

export default function PilotTrainingNearHub() {
  return (
    <Layout
      title="Pilot Training for Delhi Students: Service Area and Classroom | We One Aviation"
      description="Where We One Aviation teaches, how its online batches work, and what students across Delhi and nearby areas should know before enquiring."
      canonical="/pilot-training-near"
      noindex
    >
      <main className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb />
          <header className="rounded-2xl bg-av-blue px-6 py-10 text-white md:px-12">
            <p className="text-sm uppercase tracking-wide text-av-orange">Training location and service information</p>
            <h1 className="mt-3 font-montserrat text-3xl font-black md:text-5xl">Pilot Training for Delhi Students: Where Training Happens</h1>
            <p className="mt-5 max-w-3xl text-white/85">
              Students across Delhi and nearby areas considering pilot training can enquire about current classroom and
              online options. The academy&apos;s stated classroom location is{' '}
              {business.address.street}, Dwarka, {business.address.city},
              {' '}{business.address.state} {business.address.postalCode}. Students outside Delhi can join online batches.
              No neighborhood service-area boundary is published, and postal listings do not establish a local office,
              campus, instructor or class.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">Course information and next steps</h2>
            <ul className="mt-4 flex flex-wrap gap-4">
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-semibold text-av-blue underline">{item.label}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              The course pages are authoritative for eligibility, syllabus and delivery. Contact the academy to confirm
              current options; no locality-level class, travel or nearby facility is implied.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">Locality pages require service evidence</h2>
            <p className="mt-3 text-gray-600">
              No separate locality page is currently published. Nearby localities are being reviewed as geographic
              research candidates, not as claimed service areas. The academy has not documented locality boundaries,
              locality-specific student evidence or a distinct local training offer. Postal records are not used to
              select these candidates or generate pages from locality names.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
