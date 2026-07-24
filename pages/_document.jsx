import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import StructuredData from '../components/StructuredData';
import { generateOrganizationSchema, generateWebsiteSchema } from '../lib/schema';

const footerSocialLinks = [
  'https://www.facebook.com/share/1AokxHk8Yv/?mibextid=wwXIfr',
  'https://www.instagram.com/we_one_aviation?igsh=aTJ0YnphMGs3b2Fl&utm_source=qr',
];

const organizationSchema = generateOrganizationSchema({ sameAs: footerSocialLinks });
const websiteSchema = generateWebsiteSchema();

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0a2342" />

        {/*
          CANONICAL REMOVED FROM HERE INTENTIONALLY.
          _document.jsx renders on every page. A hardcoded canonical="/"
          would make /courses/cpl, /about-us, etc. all claim to be the
          homepage — a serious duplicate content signal to Google.
          Each page sets its own canonical inside its own <Head>.
          See pages/index.jsx for the homepage canonical.
        */}

        <meta name="keywords" content="pilot training, cpl, dgca ground classes, pilot course" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
        <link rel="dns-prefetch" href="//td.doubleclick.net" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//googleleads.g.doubleclick.net" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo.webp" />
        <link rel="manifest" href="/manifest.json" />

        {/* Global OG defaults — pages override og:title, og:description, og:url */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WeOne Aviation" />
        <meta property="og:image" content="https://www.weoneaviation.in/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="We One Aviation Academy — Best Pilot Training Institute in India" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.weoneaviation.in/og-cover.jpg" />
        <meta name="twitter:image:alt" content="We One Aviation Academy — Best Pilot Training Institute in India" />

        <StructuredData data={[organizationSchema, websiteSchema]} />

        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@2.0.0/dist/quill.snow.css"
        />

        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KDLQQFKP');`,
          }}
        />
      </Head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDLQQFKP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
