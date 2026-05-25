import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

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

        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

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

        {/*
          EducationalOrganization schema lives here — it describes the business
          itself, not any specific page, so _document.jsx is the right place.

          FIXED: aggregateRating removed. 3500 is pilots trained, not reviews.
          Putting a fake reviewCount here is against Google's structured data
          guidelines and can result in a manual penalty. Add it back only when
          you have real verified reviews (Google Business, Trustpilot, etc.)
          and use the actual count from that platform.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'We One Aviation Academy',
              alternateName: 'WeOne Aviation',
              url: 'https://www.weoneaviation.in',
              logo: 'https://www.weoneaviation.in/Logo.webp',
              image: 'https://www.weoneaviation.in/og-cover.jpg',
              description:
                "India's premier DGCA-approved pilot training institute since 2009. CPL, PPL, ATPL courses. 3500+ pilots trained.",
              foundingDate: '2009',
              telephone: '+91-9355611996',
              email: 'info@weoneaviation.in',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'C-404, 3rd Floor, Sector-7, Near Ramphal Chowk',
                addressLocality: 'Dwarka',
                addressRegion: 'New Delhi',
                postalCode: '110077',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '28.5921',
                longitude: '77.0460',
              },
              accreditedBy: {
                '@type': 'Organization',
                name: 'Directorate General of Civil Aviation (DGCA)',
                url: 'https://www.dgca.gov.in',
              },
              sameAs: [
                'https://www.facebook.com/share/1AokxHk8Yv/',
                'https://www.instagram.com/we_one_aviation',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Pilot Training Courses',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'Commercial Pilot License (CPL)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'DGCA Ground Classes' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'ATPL Training' } },
                ],
              },
            }),
          }}
        />

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