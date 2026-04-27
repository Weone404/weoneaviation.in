import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Critical Meta ── */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ── Security Headers ── */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://www.googletagmanager.com; frame-src https://www.googletagmanager.com;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* ── Theme ── */}
        <meta name="theme-color" content="#0a2342" />

        {/* ── DNS Prefetch ── */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* ── Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

        {/* ── Icons & Manifest ── */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/assets/logo.webp" />
        <link rel="manifest" href="/manifest.json" />

        {/* ── Open Graph Defaults ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Site Name" />
        <meta property="og:image" content="/assets/logo.webp" />

        {/* ── Twitter Card Defaults ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/logo.webp" />

        {/* ── Third-party Styles ── */}
        <link rel="stylesheet" href="https://unpkg.com/react-quill@2.0.0/dist/quill.snow.css" />

        {/* ── Google Tag Manager ── */}
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
        {/* ── Google Tag Manager (noscript) ── */}
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