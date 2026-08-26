import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Montserrat, Poppins } from 'next/font/google';

/*
 * Self-hosted via next/font instead of a <link> to fonts.googleapis.com.
 *
 * WHY (GEO audit 2026-08-11): mobile Lighthouse put the homepage at LCP 8.6s
 * with a performance score of 64, and the LCP element is the hero heading —
 * text, not an image. Text paint was blocked behind a third-party stylesheet
 * costing 880ms. next/font emits @font-face rules into the app's own CSS and
 * serves the files from this origin: no blocking request, no extra connection.
 *
 * `display: 'swap'` keeps text visible during the swap period instead of
 * holding the paint. Weights are pinned to the ones actually used — each extra
 * weight is another file to download.
 *
 * These expose CSS variables rather than class names so `body` and the Tailwind
 * `font-montserrat` / `font-poppins` utilities can both reference them without
 * wrapping the tree in an extra <div>. See tailwind.config.js.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const FloatingDoubtChat = dynamic(
  () => import('../components/FloatingDoubtChat'),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };
    const animateRing = () => {
      ringX += (mouseX - ringX - 18) * 0.15;
      ringY += (mouseY - ringY - 18) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeChild(cursor);
      document.body.removeChild(ring);
    };
  }, []);

  const hideFloatingChat = router.pathname === '/doubt';

  /*
   * /admin/* is operator tooling and must never be indexed. It is declared here
   * rather than on the pages themselves: each admin page returns early while it
   * checks auth, and those early returns skip the page's own <Head>, so the
   * prerendered HTML shipped no robots tag at all — /admin/login carried a
   * noindex in source that never reached the output. _app renders on every
   * branch, so the tag is always present. robots.txt Disallow only stops
   * crawling; it does not stop a linked URL being indexed without a fetch.
   */
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute && (
        <Head>
          <meta key="robots" name="robots" content="noindex, nofollow" />
        </Head>
      )}
      {/* Publish the font variables on :root so both globals.css and the
          Tailwind font utilities can reach them without a wrapper element. */}
      <style jsx global>{`
        :root {
          --font-montserrat: ${montserrat.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>

      {/* ✅ Dante AI Chatbot */}
      {/* <Script
        id="dante-ai-chatbot"
        src="https://agents.dante-ai.com/embed.js"
        data-agent-id="645ae293-e07a-4ac5-9e83-fe39a10eab64"
        data-widget-key="wk_wA3D3okDcOsllaNW95HNgYW-CMoe_Uj1"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      /> */}

      {/* ✅ Tecmicra CRM Tracker */}
      <Script
        id="tecmicra-tracker"
        src="https://tecmicra.com/CRM-Dev/webhook/tracker.php?key=d8db0fcdb4e926af15d2cbce1ce2d1a734c398ab2ef39aef3d4230be8050f721"
        strategy="lazyOnload"
        async
      />

      <Component {...pageProps} />
    </>
  );
}