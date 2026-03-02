import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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

  return <Component {...pageProps} />;
}
