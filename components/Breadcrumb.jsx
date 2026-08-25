import Link from 'next/link';
import { useRouter } from 'next/router';

const labelMap = {
  'pilot-training-in': 'Locations',
  'flying-school': 'Flying schools',
  'courses': 'Courses',
  'blogs': 'Blogs',
  'about-us': 'About us',
  'contact': 'Contact',
  'credentials': 'Credentials',
  'privacy-policy': 'Privacy policy',
  'terms': 'Terms',
  'cpl': 'Commercial Pilot Licence (CPL)',
  'ppl': 'Private Pilot Licence (PPL)',
  'atpl': 'Airline Transport Pilot Licence (ATPL)',
  'ppl-full-form': 'Private Pilot Licence (PPL)',
  'student-pilot-license-spl': 'Student Pilot Licence (SPL)',
  'commercial-pilot-license': 'Commercial Pilot Licence (CPL)',
  'commercial-pilot-license-eligibility': 'CPL eligibility',
  'commercial-pilot-license-syllabus': 'CPL syllabus',
  'commercial-pilot-license-salary': 'CPL salary',
  'commercial-pilot-license-admission-process': 'CPL admission process',
  'dgca-ground-classes': 'DGCA ground classes',
  'dgca-ground-classes-in-india': 'DGCA ground classes in India',
  'dgca-pariksha': 'DGCA Pariksha',
  'dgca-computer-number': 'DGCA computer number',
  'dgca-full-form': 'DGCA full form',
  'how-to-become-a-pilot': 'How to become a pilot',
  'how-to-become-a-pilot-after-12th': 'How to become a pilot after 12th',
  'after-12th': 'After 12th',
  'in-india': 'In India',
  'lead-magnets': 'Free guides',
  'airline-preparatory-classes': 'Airline preparatory classes',
  'airline-preparation-course': 'Airline preparation course',
  'cost-transparency': 'Cost transparency',
  'student-checklists': 'Student checklists',
  'faqs': 'FAQs',
  'rtr-a': 'RTR (A)',
  'sitemap': 'Sitemap',
  'air-navigation': 'Air Navigation',
  'air-regulations': 'Air Regulations',
  'aviation-meteorology': 'Aviation Meteorology',
  'technical-general': 'Technical General',
};

/*
 * Shared trail builder. Layout imports this to emit BreadcrumbList on EVERY
 * route; this component imports it to render the visible nav on the handful of
 * pages that show one. One source of truth means the markup a reader sees and
 * the schema a crawler reads never disagree.
 */
export function buildBreadcrumbItems(path, override = null) {
  const clean = (path || '/').split('?')[0].split('#')[0];
  const segments = clean.split('/').filter(Boolean);
  const trail = override || segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join('/')}`,
    label: labelMap[segment] || formatSegment(segment),
  }));
  return [{ href: '/', label: 'Home' }, ...trail];
}

function formatSegment(segment) {
  if (!segment) return 'Home';
  const decoded = decodeURIComponent(segment).replace(/[-_]/g, ' ');
  return decoded.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumb({ override = null }) {
  const router = useRouter();
  const path = (router.asPath || '/').split('?')[0];
  const items = buildBreadcrumbItems(path, override);

  /*
   * NO StructuredData HERE ANY MORE. Layout.jsx emits the BreadcrumbList for
   * every route from the same buildBreadcrumbItems() helper, which is how all
   * 75 pages got the node instead of the four that happened to render this
   * component. Emitting it here as well would ship two BreadcrumbList nodes on
   * exactly those four pages. This component is the visible nav only.
   */
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index === 0 ? (
                <Link href={item.href} className="text-av-blue hover:underline">{item.label}</Link>
              ) : (
                <>
                  <span className="text-gray-400">/</span>
                  {item.href && item.href !== path ? (
                    <Link href={item.href} className="text-av-blue hover:underline">{item.label}</Link>
                  ) : (
                    <span className="text-gray-700">{item.label}</span>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
