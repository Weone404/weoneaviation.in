import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

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

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDLQQFKP');
          `,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KDLQQFKP"
          height="0" width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* ✅ Dante AI Chatbot */}
      <Script
        id="dante-ai-chatbot"
        src="https://agents.dante-ai.com/embed.js"
        data-agent-id="645ae293-e07a-4ac5-9e83-fe39a10eab64"
        data-widget-key="wk_wA3D3okDcOsllaNW95HNgYW-CMoe_Uj1"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Component {...pageProps} />
    </>
  );
}