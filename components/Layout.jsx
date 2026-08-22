import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import StructuredData from './StructuredData';
import FAQSection from './FAQSection';
import { getPageFAQs } from '../data/pageFaqs';

const ContactPopup = dynamic(() => import('./ContactPopup'), { ssr: false });

const DEFAULT_KEYWORDS = "CBSE Full Form, ICSE Full Form, DGCA Full Form, PPL Full Form, CPL Full Form, RTR Full Form, Atpl Full Form, Commercial Pilot License, Pilot course, commercial pilot, commercial pilot license salary, Pilot training, commercial pilot course, commercial pilot licence course, cpl course fees, commercial pilot training, commercial pilot eligibility, commercial pilot training in india, cpl licence cost, commercial pilot license course in india, commercial pilot fees, commercial pilot course eligibility, commercial pilot license syllabus, Commercial Pilot License Admission Process, how to become a pilot, how to become a pilot in india, how to become a pilot after 12th, Private Pilot License, pilot course fees, pilot training fees, qualifications to become a pilot, best pilot schools, eligibility for become a pilot, pilot syllabus, pilot training eligibility, eligibility for pilot course, ppl syllabus, pilot course syllabus, ppl pilot salary, private pilot license syllabus, Pilot training in India, Pilot training in Hyderabad, Pilot training in Mumbai, Pilot Training in Chennai, Pilot Training in Bangalore, Pilot training in kerala, Pilot training in Delhi, Pilot Training in Pune, Pilot training institute in Kolkata, pilot training in coimbatore, Pilot training in Gujarat, Pilot training in goa, Pilot Training in Gurgaon, Pilot training in tamil nadu, Pilot Training in Rajasthan, Pilot Training in Haryana, Pilot Training in Punjab, Pilot Training in Andhra Pradesh, Pilot Training in Arunachal Pradesh, Pilot training in Assam, Pilot Training in Bihar, Pilot Training in Chhattisgarh, Pilot Training in Himachal Pradesh, Pilot Training in Noida, Pilot Training in Ghaziabad, Pilot Training in Nagpur, Pilot Training in Maharashtra, Pilot Training in Jaipur, Airline Transport Pilot License, atpl, atpl license, airline transport license, atp licence, airline transport pilot licence cost, atpl cost, atpl requirements, atpl training, atpl pilot salary, Student Pilot License, spl, student pilot certificate, student pilot license cost, spl pilot training fees, student pilot license requirements, student pilot license eligibility, student pilot license fees, spl eligibility, spl fees, Pilot Training Course, DGCA, DGCA Ground Class, ground class, dgca pariksha, pariksha dgca, dgca exam, dgca central examination organization, pilot exam, dgca pariksha portal, dgca exam fees, dgca exam for pilot, dgca exam eligibility, dgca pilot exam, what is dgca exam, dgca exam date, dgca cpl exam, dgca exams for cpl, www pariksha dgca, how to apply for dgca exam, dgca exam age limit, dgca exam schedule, dgca pariksha com, aviation exam in india, dgca entrance exam, e pariksha dgca, egca login, egca, egca dgca, dgca login, edgca, ecga, egca full form, egca registration, DGCA Ground Class in dwarka, DGCA Ground Class in delhi";

export default function Layout({ children, title, description, keywords, robots, noindex = false }) {
  const router = useRouter();
  const canonicalPath = router.asPath ? router.asPath.split('?')[0] : '/';

  // ✅ FIXED: Changed from www to non-www (site redirects www → non-www)
  const canonicalUrl = `https://weoneaviation.in${canonicalPath === '/' ? '/' : canonicalPath}`;
  const isAdminPage = router.pathname.startsWith('/admin');
  const pageFAQs = isAdminPage ? null : getPageFAQs(router.pathname);
  const resolvedRobots = robots ?? (noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://weoneaviation.in/#organization',
    name: 'We One Aviation Academy',
    legalName: 'We One Aviation Academy',
    url: 'https://weoneaviation.in',
    logo: 'https://weoneaviation.in/Logo.webp',
    description: 'DGCA approved pilot training institute in India offering CPL, PPL, ATPL and aviation career guidance.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka',
      addressLocality: 'New Delhi',
      postalCode: '110077',
      addressCountry: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9355611996',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
    ],
    email: 'info.weoneaviation@gmail.com',
    /*
     * Kept identical to the list in _document.jsx. Both files emit an
     * Organization node on every page, so when their `sameAs` arrays disagree
     * the page ships two contradictory descriptions of the same entity — the
     * worst of both worlds for entity resolution. Change them together.
     *
     * (The duplication itself is worth collapsing to one owner; it is recorded
     * in GEO-AUDIT-REPORT.md rather than restructured here.)
     */
    sameAs: [
      'https://www.facebook.com/share/1AokxHk8Yv/',
      'https://www.instagram.com/we_one_aviation',
      'https://www.linkedin.com/company/weoneaviation',
    ],
  };

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
        <meta key="description" name="description" content={description || "We One Aviation Academy offers DGCA approved pilot training courses including CPL, PPL, ATPL in India. Ground classes and flight-training placement from a DGCA-approved institute in Dwarka, New Delhi."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="robots" name="robots" content={resolvedRobots} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />

        {/* OG. og:type, og:image and all twitter:* live in _document.jsx —
            they are page-independent, so emitting them here too would double them. */}
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:title" property="og:title" content={title || 'We One Aviation Academy'} />
        <meta key="og:description" property="og:description" content={description || 'DGCA approved pilot training in India'} />

        <link rel="icon" href="/favicon.ico" />
        <StructuredData data={organizationSchema} />
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