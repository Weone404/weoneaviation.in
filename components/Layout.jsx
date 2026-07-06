import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ContactPopup from './ContactPopup';
import FAQs from './FAQs';
import Head from 'next/head';
import SpecialOfferBanner from './Specialofferbanner';
import { useRouter } from 'next/router';

const DEFAULT_KEYWORDS = "CBSE Full Form, ICSE Full Form, DGCA Full Form, PPL Full Form, CPL Full Form, RTR Full Form, Atpl Full Form, Commercial Pilot License, Pilot course, commercial pilot, commercial pilot license salary, Pilot training, commercial pilot course, commercial pilot licence course, cpl course fees, commercial pilot training, commercial pilot eligibility, commercial pilot training in india, cpl licence cost, commercial pilot license course in india, commercial pilot fees, commercial pilot course eligibility, commercial pilot license syllabus, Commercial Pilot License Admission Process, how to become a pilot, how to become a pilot in india, how to become a pilot after 12th, Private Pilot License, pilot course fees, pilot training fees, qualifications to become a pilot, best pilot schools, eligibility for become a pilot, pilot syllabus, pilot training eligibility, eligibility for pilot course, ppl syllabus, pilot course syllabus, ppl pilot salary, private pilot license syllabus, Pilot training in India, Pilot training in Hyderabad, Pilot training in Mumbai, Pilot Training in Chennai, Pilot Training in Bangalore, Pilot training in kerala, Pilot training in Delhi, Pilot Training in Pune, Pilot training institute in Kolkata, pilot training in coimbatore, Pilot training in Gujarat, Pilot training in goa, Pilot Training in Gurgaon, Pilot training in tamil nadu, Pilot Training in Rajasthan, Pilot Training in Haryana, Pilot Training in Punjab, Pilot Training in Andhra Pradesh, Pilot Training in Arunachal Pradesh, Pilot training in Assam, Pilot Training in Bihar, Pilot Training in Chhattisgarh, Pilot Training in Himachal Pradesh, Pilot Training in Noida, Pilot Training in Ghaziabad, Pilot Training in Nagpur, Pilot Training in Maharashtra, Pilot Training in Jaipur, Airline Transport Pilot License, atpl, atpl license, airline transport license, atp licence, airline transport pilot licence cost, atpl cost, atpl requirements, atpl training, atpl pilot salary, Student Pilot License, spl, student pilot certificate, student pilot license cost, spl pilot training fees, student pilot license requirements, student pilot license eligibility, student pilot license fees, spl eligibility, spl fees, Pilot Training Course, DGCA, DGCA Ground Class, ground class, dgca pariksha, pariksha dgca, dgca exam, dgca central examination organization, pilot exam, dgca pariksha portal, dgca exam fees, dgca exam for pilot, dgca exam eligibility, dgca pilot exam, what is dgca exam, dgca exam date, dgca cpl exam, dgca exams for cpl, www pariksha dgca, how to apply for dgca exam, dgca exam age limit, dgca exam schedule, dgca pariksha com, aviation exam in india, dgca entrance exam, e pariksha dgca, egca login, egca, egca dgca, dgca login, edgca, ecga, egca full form, egca registration, DGCA Ground Class in dwarka, DGCA Ground Class in delhi";

export default function Layout({ children, title, description, keywords }) {
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