import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
    setLoading(false);
    const msg = encodeURIComponent(
      `Hello WeOne Aviation! 👋\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\nCourse: ${form.course || 'N/A'}\nMessage: ${form.message || 'Please guide me.'}`
    );
    setTimeout(() => window.open(`https://wa.me/919355566991?text=${msg}`, '_blank'), 700);
  };

  return (
    <Layout title="Contact WeOne Aviation Academy | Get Free Counselling" description="Contact WeOne Aviation Academy for free pilot training counselling. Call, WhatsApp or visit our Delhi office.">
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-av-blue to-av-navy flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="section-tag mb-3">Get In Touch</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">Contact <span className="text-av-orange">Us</span></h1>
          <p className="text-white/70 mt-3 text-sm">We're here to guide your aviation journey</p>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-5">
            {[
              { icon: '📍', title: 'Our Office', info: 'C-404 , 3rd Floor , Ramphal Chowk , Dwarka , sectore - 7 , New Delhi , Delhi - 110077', action: null },
              { icon: '📞', title: 'Call Us', info: '+91 93555 66991', action: 'tel:+919355566991' },

              { icon: '✉️', title: 'Email', info: 'info@weoneaviation.in', action: 'mailto:info@weoneaviation.in' },
              { icon: '🕐', title: 'Office Hours', info: 'Mon–Sat: 9 AM – 7 PM\nSunday: 10 AM – 4 PM', action: null },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 card-hover">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-montserrat font-bold text-av-blue mb-1 text-sm">{item.title}</h4>
                    {item.action
                      ? <a href={item.action} className="text-gray-600 text-sm hover:text-av-orange transition-all whitespace-pre-line">{item.info}</a>
                      : <p className="text-gray-600 text-sm whitespace-pre-line">{item.info}</p>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={400}>
              <a href="https://wa.me/919355566991" target="_blank" rel="noopener noreferrer"
                className="block bg-green-500 text-white text-center py-3.5 rounded-2xl text-sm font-bold hover:bg-green-600 transition-all shadow-lg">
                💬 Open WhatsApp Chat
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200} className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-1">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-6">Your data is saved to our CRM. We'll call you within 2 hours.</p>

              {status === 'success' && (
                <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  ✅ Your enquiry has been saved! Opening WhatsApp...
                </div>
              )}
              {status === 'error' && (
                <div className="mb-5 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
                  ⚠️ Opening WhatsApp now...
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
                <input type="tel" placeholder="Phone Number *" required value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
                <input type="email" placeholder="Email Address" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
                <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all text-gray-600">
                  <option value="">Select Course</option>
                  <option>Commercial Pilot License (CPL)</option>
                  <option>Private Pilot License (PPL)</option>
                  <option>ATPL</option>
                  <option>Sport Pilot License (SPL)</option>
                  <option>DGCA Ground Classes</option>
                </select>
                <textarea placeholder="Your Message" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all h-28 resize-none" />
                <div className="sm:col-span-2">
                  <button type="submit" disabled={loading}
                    className="w-full bg-av-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2">
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                      : '📱 Send via WhatsApp'}
                  </button>
                  <p className="text-center text-xs text-gray-300 mt-3">🔒 Your data is saved securely to our system</p>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
