import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ContactPopup from './ContactPopup';
import Head from 'next/head';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title || 'WeOne Aviation Academy - Pilot Training in India'}</title>
        <meta name="description" content={description || 'WeOne Aviation Academy offers DGCA approved pilot training courses including CPL, PPL, ATPL in India. Join India\'s most trusted aviation training institute.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://weoneaviation.in" />
        {/* OG */}
        <meta property="og:title" content={title || 'WeOne Aviation Academy'} />
        <meta property="og:description" content={description || 'DGCA approved pilot training in India'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingButtons />
      <ContactPopup />
    </>
  );
}
