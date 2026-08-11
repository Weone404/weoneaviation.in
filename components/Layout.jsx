import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ContactPopup from './ContactPopup';
import Head from 'next/head';
import SpecialOfferBanner from './Specialofferbanner';
import { useRouter } from 'next/router';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const canonicalPath = router.asPath ? router.asPath.split('?')[0] : '/';

  // Canonical uses the bare (non-www) host to match the live 200 origin and the
  // 301 in next.config.js. Keep every URL on this one hostname.
  const canonicalUrl = `https://weoneaviation.in${canonicalPath === '/' ? '/' : canonicalPath}`;
  const isAdminPage = router.pathname.startsWith('/admin');

  // Site-wide BreadcrumbList — auto-built from the URL path so AI answer engines
  // and Google understand where every cited page sits in the hierarchy.
  // Homepage is skipped (index.jsx ships its own richer breadcrumb).
  const segments = canonicalPath.split('/').filter(Boolean);
  const breadcrumbSchema =
    segments.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://weoneaviation.in/' },
            ...segments.map((seg, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: decodeURIComponent(seg)
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              item: `https://weoneaviation.in/${segments.slice(0, i + 1).join('/')}`,
            })),
          ],
        }
      : null;

  return (
    <>
      <Head>
        {/*
          Every tag below carries a `key`. next/head deduplicates by key, so if a
          page renders its own <Head> with the same key, the page's value REPLACES
          this one instead of both being emitted. Without keys the homepage was
          shipping two <link rel="canonical">, two og:url and two og:title tags
          (found in the 2026-08-11 GEO audit). Keep keys on anything a page might
          legitimately want to override.
        */}
        <title>{title || 'WeOne Aviation Academy - Pilot Training in India'}</title>
        <meta key="description" name="description" content={description || "WeOne Aviation Academy offers DGCA approved pilot training courses including CPL, PPL, ATPL in India. Join India's most trusted aviation training institute."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="robots" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link key="canonical" rel="canonical" href={canonicalUrl} />

        {/* OG */}
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:title" property="og:title" content={title || 'WeOne Aviation Academy'} />
        <meta key="og:description" property="og:description" content={description || 'DGCA approved pilot training in India'} />
        <meta key="og:type" property="og:type" content="website" />
        {/* FIX 2: was /og-image.jpg (relative) — social bots need absolute URLs */}
        <meta key="og:image" property="og:image" content="https://weoneaviation.in/og-cover.jpg" />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />

        {breadcrumbSchema && !isAdminPage && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SpecialOfferBanner />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingButtons />
      {!isAdminPage && <ContactPopup />}
    </>
  );
}