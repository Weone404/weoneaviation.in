import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ContactPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shown = sessionStorage.getItem('popupShown');
    if (shown) return;
    const timer = setTimeout(() => {
      const onScroll = () => {
        const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPct >= 30) {
          setShow(true);
          sessionStorage.setItem('popupShown', '1');
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'popup - ' + router.pathname }),
      });
      setSaved(true);
    } catch {}
    setLoading(false);
    const msg = encodeURIComponent(
      `Hello WeOne Aviation! 👋\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\nCourse: ${form.course || 'N/A'}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/919355611996?text=${msg}`, '_blank');
      setShow(false);
    }, 600);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={() => setShow(false)}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out forwards' }}>
        <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }`}</style>
        <div className="bg-gradient-to-r from-av-blue to-av-navy p-6 relative">
          <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-av-orange text-xs font-bold uppercase tracking-widest mb-1">🎓 Free Career Counselling</div>
          <h3 className="text-white font-montserrat text-xl font-bold">Start Your Pilot Journey!</h3>
          <p className="text-white/70 text-sm mt-1">Expert guidance from airline pilots. 100% free.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {saved && <div className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs">✅ Saved! Opening WhatsApp...</div>}
          <input type="text" placeholder="Full Name *" required value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
          <input type="tel" placeholder="Phone Number *" required value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
          <input type="email" placeholder="Email Address" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all" />
          <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-av-orange transition-all text-gray-600">
            <option value="">Select Course</option>
            <option>Commercial Pilot License (CPL)</option>
            <option>Private Pilot License (PPL)</option>
            <option>ATPL</option>
            <option>Sport Pilot License (SPL)</option>
            <option>DGCA Ground Classes</option>
          </select>
          <button type="submit" disabled={loading}
            className="w-full bg-av-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Saving...</> : '📱 Send on WhatsApp →'}
          </button>
          <p className="text-center text-xs text-gray-400">🔒 Your data is saved securely</p>
        </form>
      </div>
    </div>
  );
}
