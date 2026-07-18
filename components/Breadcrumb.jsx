import Link from 'next/link';
import { useRouter } from 'next/router';
import StructuredData from './StructuredData';
import { generateBreadcrumbSchema } from '../lib/schema';

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
};

function formatSegment(segment) {
  if (!segment) return 'Home';
  const decoded = decodeURIComponent(segment).replace(/[-_]/g, ' ');
  return decoded.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumb({ override = null }) {
  const router = useRouter();
  const path = (router.asPath || '/').split('?')[0];
  const segments = path.split('/').filter(Boolean);

  const trail = override || segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = labelMap[segment] || formatSegment(segment);
    return { href, label };
  });

  const items = [{ href: '/', label: 'Home' }, ...trail];

  const schemaItems = items.map((item, index) => ({
    name: item.label,
    url: `https://www.weoneaviation.in${item.href}`,
  }));

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(schemaItems)} />
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
