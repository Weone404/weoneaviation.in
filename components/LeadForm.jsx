import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LeadForm({ title = 'Get Free Counselling', dark = false, compact = false }) {
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
        body: JSON.stringify({ ...form, source: router.pathname }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }

    const msg = encodeURIComponent(
      `Hello WeOne Aviation! 👋\n\nI'm interested in pilot training.\n\n` +
      `📛 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email || 'Not provided'}\n✈️ Course: ${form.course || 'Not selected'}\n💬 Message: ${form.message || 'Please guide me.'}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/919355566991?text=${msg}`, '_blank');
      setForm({ name: '', phone: '', email: '', course: '', message: '' });
    }, 800);
  };

  const inputBase = `w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-av-orange transition-all border`;
  const inputClass = dark
    ? `${inputBase} bg-white/10 border-white/20 text-white placeholder-white/50`
    : `${inputBase} bg-white border-gray-200 text-gray-800 placeholder-gray-400 hover:border-gray-300`;

  return (
    <div className={`rounded-2xl p-6 md:p-8 ${dark ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white shadow-2xl border border-gray-100'}`}>
      <h3 className={`font-montserrat font-bold text-xl mb-1 ${dark ? 'text-white' : 'text-av-blue'}`}>{title}</h3>
      <p className={`text-sm mb-5 ${dark ? 'text-white/60' : 'text-gray-400'}`}>Fill the form — our team will call you within 2 hours.</p>

      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
          ✅ Details saved! Redirecting to WhatsApp...
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm flex items-center gap-2">
          ⚠️ Opening WhatsApp now...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Full Name *" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
        <input type="tel" placeholder="Phone Number *" required value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        {!compact && (
          <input type="email" placeholder="Email Address" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
        )}
        <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
          className={`${inputClass} ${!form.course ? (dark ? 'text-white/50' : 'text-gray-400') : ''}`}>
          <option value="">Select Course (Optional)</option>
          <option value="Commercial Pilot License (CPL)">Commercial Pilot License (CPL)</option>
          <option value="Private Pilot License (PPL)">Private Pilot License (PPL)</option>
          <option value="ATPL">ATPL</option>
          <option value="Sport Pilot License (SPL)">Sport Pilot License (SPL)</option>
          <option value="DGCA Ground Classes">DGCA Ground Classes</option>
          <option value="Air India Adapt test Preparation">Air India Adapt test Preparation</option>
          <option value="IndiGo Adapt test Preparation">IndiGo Adapt test Preparation</option>
        </select>
        {!compact && (
          <textarea placeholder="Your Message (Optional)" value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} h-20 resize-none`} />
        )}
        <button type="submit" disabled={loading}
          className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 bg-av-orange hover:bg-orange-600 text-white ${loading ? 'opacity-60 cursor-wait' : 'hover:shadow-orange-400/30 hover:scale-[1.02]'}`}>
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving & Connecting...</>
          ) : <>📱 Send on WhatsApp</>}
        </button>
        <p className={`text-center text-xs ${dark ? 'text-white/40' : 'text-gray-300'}`}>
          🔒 Your data is saved securely • No Spam
        </p>
      </form>
    </div>
  );
}
