import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Custom cursor
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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

  return (
    <>
      {/* Google Tag Manager - Head Script */}
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

      {/* Google Tag Manager - Body Noscript Fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KDLQQFKP"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <Component {...pageProps} />
    </>
  );
}