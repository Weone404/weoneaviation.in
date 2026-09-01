import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import FAQSection from './FAQSection';
import StructuredData from './StructuredData';
import { buildBreadcrumbItems } from './Breadcrumb';
import { generateBreadcrumbSchema } from '../lib/schema';
import { getPageFAQs } from '../data/pageFaqs';

const ContactPopup = dynamic(() => import('./ContactPopup'), { ssr: false });

export default function Layout({ children, title, description, robots, noindex = false }) {
  const router = useRouter();
  const canonicalPath = router.asPath ? router.asPath.split('?')[0] : '/';

  // ✅ FIXED: Changed from www to non-www (site redirects www → non-www)
  const canonicalUrl = `https://weoneaviation.in${canonicalPath === '/' ? '/' : canonicalPath}`;
  const isAdminPage = router.pathname.startsWith('/admin');
  const pageFAQs = isAdminPage ? null : getPageFAQs(router.pathname);
  const resolvedRobots = robots ?? (noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  /*
   * BreadcrumbList for every route.
   *
   * components/Breadcrumb.jsx used to emit this, which meant the site shipped
   * it on the four pages that happened to render the visible nav and nowhere
   * else — 71 routes with no site-architecture signal at all. Layout wraps
   * every page and already knows the path, so it owns the node now and the
   * visible component owns the markup. Both read the same
   * buildBreadcrumbItems() helper, so they cannot disagree.
   *
   * Skipped where a trail would be meaningless or unwanted: the homepage,
   * whose trail is just "Home", and /admin, which is noindex anyway.
   */
  const breadcrumbItems = buildBreadcrumbItems(canonicalPath);
  const breadcrumbSchema = (!isAdminPage && breadcrumbItems.length > 1)
    ? generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
        name: item.label,
        url: `https://weoneaviation.in${item.href}`,
      })))
    : null;
  /*
   * The Organization node USED TO BE BUILT HERE and emitted on every page, in
   * parallel with the one _document.jsx builds from lib/schema.js. Two nodes
   * described the same entity on every URL and had already drifted apart:
   * this copy said @type Organization and addressLocality "New Delhi", the
   * lib/schema.js copy says EducationalOrganization and "Delhi".
   *
   * Removed rather than reconciled. lib/schema.js is the single owner, it
   * carries the stronger type for a training academy, and _document.jsx
   * renders on every page too — so coverage is unchanged and there is now one
   * description of the entity instead of two contradictory ones.
   * Do not reintroduce an Organization node here.
   */

  return (
    <>
      <Head>
        <title>{title || 'We One Aviation Academy - Pilot Training in India'}</title>
        {/*
          Every tag here carries a `key`. next/head only deduplicates head
          elements that share one — without keys, a page that declares its own
          canonical or og:url gets BOTH its tag and this one. /, /credentials
          and /pilot-training-in-sri-lanka were each emitting two og:url values,
          which leaves crawlers to pick one. Page-level overrides must use these
          same key names to replace rather than duplicate.
        */}
        <meta key="description" name="description" content={description || "We One Aviation Academy offers DGCA pilot training courses including CPL, PPL, ATPL in India. Ground classes and flight-training placement from a DGCA institute in Dwarka, New Delhi."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="robots" name="robots" content={resolvedRobots} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />

        {/* OG. og:type, og:image and all twitter:* live in _document.jsx —
            they are page-independent, so emitting them here too would double them. */}
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:title" property="og:title" content={title || 'We One Aviation Academy'} />
        <meta key="og:description" property="og:description" content={description || 'DGCA pilot training in India'} />

        {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      {pageFAQs && <FAQSection faqs={pageFAQs.faqs} title={pageFAQs.title} />}
      <Footer />
      <FloatingButtons />
      {!isAdminPage && <ContactPopup />}
    </>
  );
}
