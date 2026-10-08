/**
 * lib/blogKit.js — shared building blocks for posts written to data/blog-standard.md.
 *
 * Added 2026-10-08 so every rewritten post builds its schema and styles the
 * same way instead of re-declaring them. Content facts never live here; they
 * come from lib/facts.js.
 */
import { ACADEMY } from './facts';

export const SITE = 'https://weoneaviation.in';

export const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
export const H3 = 'font-montserrat text-xl font-bold text-av-blue mt-8 mb-3';
export const TABLE = 'w-full text-left text-sm border-collapse';
export const TABLE_WRAP = 'overflow-x-auto my-6 rounded-2xl border border-gray-200';
export const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
export const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
export const TD_HEAD = `${TD} font-semibold text-av-blue`;
export const LINK = 'text-av-orange font-semibold underline';
export const UL = 'list-disc pl-5 space-y-3 text-gray-700';
export const OL = 'list-decimal pl-5 space-y-3 text-gray-700';
export const SCOPE = 'border-l-2 border-gray-300 pl-4 text-base text-gray-600';

/** Lower-case the first letter only, leaving acronyms such as DGCA or RTR alone. */
export const lc = (t = '') => (/^[A-Z]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));

/** Upper-case the first letter. */
export const uc = (t = '') => t.charAt(0).toUpperCase() + t.slice(1);

/** ['a', 'b', 'c'] -> "a, b and c" */
export function listJoin(items, word = 'and') {
  const a = items.filter(Boolean);
  if (a.length <= 1) return a.join('');
  return `${a.slice(0, -1).join(', ')} ${word} ${a[a.length - 1]}`;
}

/** BlogPosting node. `slug` is the part after /blogs/. */
export function articleSchemaFor({ slug, headline, description, datePublished, dateModified, section, keywords, image }) {
  const url = `${SITE}/blogs/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    inLanguage: 'en-IN',
    datePublished,
    dateModified,
    articleSection: section,
    keywords,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: { '@type': 'ImageObject', url: image ? `${SITE}${image}` : `${SITE}/Logo.webp` },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
      '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
      logo: { '@type': 'ImageObject', url: `${SITE}/Logo.webp` },
    },
  };
}

/** FAQPage node built from the same items PeopleAlsoAsk renders, so they cannot drift. */
export function faqSchemaFrom(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
