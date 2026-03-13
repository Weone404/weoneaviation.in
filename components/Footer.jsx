import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-av-blue text-white">
      {/* Top CTA */}
      <div className="bg-gradient-to-r from-av-orange to-orange-600 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">Ready to Take Flight?</h2>
          <p className="text-white/90 mb-6 text-sm md:text-base">Join India's most trusted aviation training academy. Get free career counselling today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="bg-white text-av-orange font-bold px-8 py-3 rounded-full hover:bg-av-blue hover:text-white transition-all shadow-lg text-sm">
              Get Free Counselling
            </Link>
            <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-av-orange transition-all text-sm">
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0012 2a1.5 1.5 0 00-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div>
              <div className="font-montserrat font-bold text-white text-lg leading-none">We One Aviation</div>
              <div className="text-av-orange text-xs tracking-widest uppercase">Training Academy</div>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            India's premier aviation training institute, helping aspiring pilots achieve their dreams since 2015., internationally recognized.
          </p>
          <div className="flex gap-3">
            {['facebook', 'instagram', 'youtube', 'linkedin'].map(s => (
              <a key={s} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-av-orange transition-all text-xs font-bold uppercase">
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Courses */}


        {/* Quick Links */}
        <div>
          <h4 className="font-montserrat font-bold text-sm uppercase tracking-widest mb-5 text-av-orange">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'About Us', href: '/about-us' },
              { label: 'Blogs', href: '/blogs' },
              { label: 'Contact', href: '/contact' },
              { label: 'Sitemap', href: '/sitemap' },
            ].map(c => (
              <li key={c.href}>
                <Link href={c.href} className="text-white/60 hover:text-av-orange text-sm transition-all hover:translate-x-1 inline-block">
                  → {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-montserrat font-bold text-sm uppercase tracking-widest mb-5 text-av-orange">Contact Us</h4>
          <div className="space-y-4 text-sm text-white/60">
            <div className="flex gap-3">
              <span className="text-av-orange mt-0.5">📍</span>
              <span>C-404 , 3rd Floor , Ramphal Chowk , Dwarka , sector - 7 , New Delhi , Delhi - 110077</span>
            </div>
            <div className="flex gap-3">
              <span className="text-av-orange">📞</span>
              <a href="tel:+919355611996" className="hover:text-av-orange transition-all">+91 93556 11996 , +91 9355566991</a>
            </div>
            <div className="flex gap-3">
              <span className="text-av-orange">✉️</span>
              <a href="mailto:info@weoneaviation.in" className="hover:text-av-orange transition-all">info@weoneaviation.in</a>
            </div>

            {/* Google Map Embed */}
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="We One Aviation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.0724!3d28.5934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3a1b3a1b3a%3A0x1b3a1b3a1b3a1b3a!2sRamphal%20Chowk%2C%20Sector%207%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%20110077!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Open in Google Maps link */}
          </div>
          <a
            href="https://maps.google.com/?q=Ramphal+Chowk,+Sector+7,+Dwarka,+New+Delhi,+Delhi+110077"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-av-orange hover:text-white transition-all text-xs font-semibold mt-1"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Open in Google Maps →
          </a>
        </div>
      </div>

      {/* Pilot Training Cities */}


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