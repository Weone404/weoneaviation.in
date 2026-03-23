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
          <p className="text-white/70 text-sm leading-relaxed">
            We One Aviation is a leading pilot training academy dedicated to helping aspiring aviators build
            successful careers. CPL training, international flight programs, expert mentorship, and placement support.
          </p>
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
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-av-orange transition-all">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-av-orange transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}