import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-av-blue text-white">
      {/* Top CTA */}
      <div className="bg-gradient-to-r from-av-orange to-orange-600 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">Ready to Take Flight?</h2>
          <p className="text-white/90 mb-6 text-sm md:text-base">
            Join India's most trusted aviation training academy. Get free career counselling today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-av-orange font-bold px-8 py-3 rounded-full hover:bg-av-blue hover:text-white transition-all shadow-lg text-sm"
            >
              Get Free Counselling
            </Link>
            <a
              href="https://wa.me/919355611996"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-av-orange transition-all text-sm"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — We One Aviation */}
        <div>
          <h4 className="font-montserrat font-bold text-av-orange text-base mb-3">We One Aviation</h4>
          <div className="border-t border-dashed border-white/20 mb-5" />
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            We One Aviation is a leading pilot training academy dedicated to helping aspiring aviators build
            successful careers. CPL training, international flight programs, expert mentorship, and placement support.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1AokxHk8Yv/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-av-orange flex items-center justify-center transition-colors"
              aria-label="We One Aviation Facebook"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/we_one_aviation?igsh=aTJ0YnphMGs3b2Fl&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-av-orange flex items-center justify-center transition-colors"
              aria-label="We One Aviation Instagram"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.79.263-1.473.557-2.115 1.2-.643.642-.937 1.325-1.2 2.115-.267.788-.468 1.658-.528 2.936C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.263.79.557 1.473 1.2 2.115.642.643 1.325.937 2.115 1.2.788.267 1.658.468 2.936.528C8.333 23.992 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.79-.263 1.473-.557 2.115-1.2.643-.642.937-1.325 1.2-2.115.267-.788.468-1.658.528-2.936.064-1.28.079-1.687.079-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.263-.79-.557-1.473-1.2-2.115-.642-.643-1.325-.937-2.115-1.2-.788-.267-1.658-.468-2.936-.528C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.561.217.96.477 1.382.898.421.421.681.82.898 1.381.164.422.354 1.056.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.561-.477.96-.898 1.382-.421.421-.82.681-1.381.898-.422.164-1.056.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.561-.217-.96-.477-1.382-.898-.421-.421-.681-.82-.898-1.381-.164-.422-.354-1.056-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.561.477-.96.898-1.382.421-.421.82-.681 1.381-.898.422-.164 1.056-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="font-montserrat font-bold text-av-orange text-base mb-3">Quick Links</h4>
          <div className="border-t border-dashed border-white/20 mb-5" />
          <ul className="space-y-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about-us' },
              { label: 'Training Programs', href: '/courses' },
              { label: 'Blog', href: '/blogs' },
              { label: 'Contact', href: '/contact' },
              { label: 'Sitemap', href: '/sitemap' },
            ].map((item) => (
              <li key={item.href} className="flex items-center gap-2">
                {/* chain-link icon */}
                <svg className="w-4 h-4 text-white/50 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                <Link
                  href={item.href}
                  className="text-white/70 hover:text-av-orange text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — How to reach us */}
        <div>
          <h4 className="font-montserrat font-bold text-av-orange text-base mb-3">How to reach us?</h4>
          <div className="border-t border-dashed border-white/20 mb-5" />
          <div className="space-y-4 text-sm text-white/70">
            {/* Address */}
            <div className="flex gap-3 items-start">
              <span className="text-av-orange mt-0.5 text-base">📍</span>
              <span>C-404, 3rd Floor, Near Ramphal Chowk<br />Sector-7, Dwarka, New Delhi - 110075</span>
            </div>
            {/* Phone 1 */}
            <div className="flex gap-3 items-center">
              <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
                </svg>
              </span>
              <a href="tel:+919355611996" className="hover:text-av-orange transition-colors">+91-9355611996</a>
            </div>
            {/* Phone 2 */}
            <div className="flex gap-3 items-center">
              <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" />
                </svg>
              </span>
              <a href="tel:+919355566991" className="hover:text-av-orange transition-colors">+91-9355566991</a>
            </div>
            {/* Email */}
            <div className="flex gap-3 items-center">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              <a href="mailto:weoneaviation8@gmail.com" className="hover:text-av-orange transition-colors">
                weoneaviation8@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 4 — Our Location */}
        <div>
          <h4 className="font-montserrat font-bold text-av-orange text-base mb-3">Our Location</h4>
          <div className="border-t border-dashed border-white/20 mb-5" />
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-md">
            <a
              href="https://maps.google.com/?cid=10157212043930371020"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google Maps"
              className="block"
            >
              <img
                src="/map-preview.webp"
                alt="We One Aviation Location - Sector-7, Dwarka, New Delhi"
                className="w-full h-44 object-cover hover:opacity-90 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-white/40 text-xs">
          <span>© 2024 WeOne Aviation Academy. All Rights Reserved.</span>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-av-orange transition-all">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-av-orange transition-all">Terms of Service</Link>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/we_one_aviation?igsh=aTJ0YnphMGs3b2Fl&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-av-orange transition-all"
                aria-label="We One Aviation Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1AokxHk8Yv/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-av-orange transition-all"
                aria-label="We One Aviation Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}