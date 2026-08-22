import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import StructuredData from '../components/StructuredData';
import { generateOrganizationSchema, generateWebsiteSchema } from '../lib/schema';

/*
 * These become the organisation's `sameAs`, which is how a model ties this site
 * to the same real-world entity it encounters elsewhere. Each corroborating
 * profile strengthens that resolution, so the list should be as complete as the
 * academy's genuine presence allows.
 *
 * Two changes here (GEO audit 2026-08-11):
 *  - LinkedIn added. The company page was already linked from /credentials but
 *    was absent from the schema, so it contributed nothing.
 *  - The share/tracking query strings were stripped. `sameAs` matching is
 *    literal, and `?mibextid=…` / `?igsh=…` are per-share tokens, not the
 *    canonical profile URLs a knowledge graph records.
 */
const footerSocialLinks = [
  'https://www.facebook.com/share/1AokxHk8Yv/',
  'https://www.instagram.com/we_one_aviation',
  'https://www.linkedin.com/company/weoneaviation',
];

const twitterSite = process.env.NEXT_PUBLIC_TWITTER_SITE;
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

        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <link rel="dns-prefetch" href="//stats.g.doubleclick.net" />
        <link rel="dns-prefetch" href="//td.doubleclick.net" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//googleleads.g.doubleclick.net" />

        {/*
          Montserrat and Poppins are self-hosted through next/font in _app.jsx,
          so the render-blocking fonts.googleapis.com stylesheet that sat here is
          gone. It measured 880 ms on mobile, and the homepage LCP element is the
          hero heading — text — so first paint was waiting on exactly this.

          Playfair Display and DM Sans were requested here too but are only used
          under /admin (which loads its own stylesheet) and by Passresultsslider
          (which carries its own @import).

          The Material Icons stylesheet was removed outright: the `material-icons`
          class appears nowhere in pages/, components/ or styles/. It cost 163 ms
          of render-blocking time on every page to style nothing.
        */}

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/Logo.webp" />
        <link rel="manifest" href="/manifest.json" />

        {/* Global metadata defaults are intentionally minimal to avoid duplicate OG/Twitter tags across pages. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="We One Aviation" />
        <meta property="og:image" content="https://weoneaviation.in/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="We One Aviation Academy — Pilot Training Institute in India" />

        <meta name="twitter:card" content="summary_large_image" />
        {twitterSite ? <meta name="twitter:site" content={twitterSite} /> : null}
        <meta name="twitter:image" content="https://weoneaviation.in/og-cover.jpg" />
        <meta name="twitter:image:alt" content="We One Aviation Academy — Pilot Training Institute in India" />

        <StructuredData data={[organizationSchema, websiteSchema]} />

        {/*
          Quill's stylesheet was pulled from unpkg here, on every public page.
          Lighthouse (mobile) measured 887 ms of render-blocking time — the
          single largest blocker on the site — for an editor that only renders
          inside /admin/blog. It was also the second copy; _app.jsx imported the
          same file. /admin/blog now links its own from /vendor/quill.snow.css.
        */}

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KC7CGFHV');`,
          }}
        />
      </Head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KC7CGFHV"
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
