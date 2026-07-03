import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ContactPopup from './ContactPopup';
import FAQs from './FAQs';
import Head from 'next/head';
import SpecialOfferBanner from './Specialofferbanner';
import { useRouter } from 'next/router';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const canonicalPath = router.asPath ? router.asPath.split('?')[0] : '/';

  // FIX 1: was weoneaviation.in (no www) — must match live domain www.weoneaviation.in
  const canonicalUrl = `https://www.weoneaviation.in${canonicalPath === '/' ? '/' : canonicalPath}`;
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <>
      <Head>
        <title>{title || 'WeOne Aviation Academy - Pilot Training in India'}</title>
        <meta name="description" content={description || "WeOne Aviation Academy offers DGCA approved pilot training courses including CPL, PPL, ATPL in India. Join India's most trusted aviation training institute."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OG */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title || 'WeOne Aviation Academy'} />
        <meta property="og:description" content={description || 'DGCA approved pilot training in India'} />
        <meta property="og:type" content="website" />
        {/* FIX 2: was /og-image.jpg (relative) — social bots need absolute URLs */}
        <meta property="og:image" content="https://www.weoneaviation.in/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SpecialOfferBanner />
      <main className="min-h-screen">{children}</main>
      <FAQs />
      <Footer />
      <FloatingButtons />
      {!isAdminPage && <ContactPopup />}
    </>
  );
}