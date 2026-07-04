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
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){
            var s = document.createElement("script");
            s.src = "https://tecmicra.com/CRM-Dev/webhook/tracker.php?key=d8db0fcdb4e926af15d2cbce1ce2d1a734c398ab2ef39aef3d4230be8050f721";
            s.async = true;
            document.head.appendChild(s);
          })();`,
        }}
      />

      <Component {...pageProps} />
    </>
  );
}