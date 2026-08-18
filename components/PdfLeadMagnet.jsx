import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PdfLeadMagnet({ 
  title = 'Get Your Free Guide', 
  description = 'Enter your email to download this exclusive PDF guide.',
  pdfFileName = 'guide.pdf',
  dark = false,
  icon = '📄'
}) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // 1. Save lead to database
      const res = await fetch('/api/save-lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email, 
          pdfTitle: title,
          source: router.pathname 
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');

      // 2. Trigger PDF download
      setStatus('success');
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `/pdfs/${pdfFileName}`;
        link.download = pdfFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset form
        setForm({ name: '', email: '' });
      }, 500);
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-av-orange transition-all border`;
  const inputClass = dark
    ? `${inputBase} bg-white/10 border-white/20 text-white placeholder-white/50`
    : `${inputBase} bg-white border-gray-200 text-gray-800 placeholder-gray-400`;

  return (
    <div className={`rounded-2xl p-6 md:p-8 max-w-md mx-auto ${dark ? 'bg-gradient-to-br from-av-blue/20 to-av-navy/20 border border-white/10 backdrop-blur-md' : 'bg-gradient-to-br from-av-light to-white shadow-lg border border-gray-100'}`}>
      {/* Header */}
      <div className="text-center mb-5">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className={`font-montserrat font-bold text-lg ${dark ? 'text-white' : 'text-av-blue'}`}>
          {title}
        </h3>
        <p className={`text-sm mt-2 ${dark ? 'text-white/60' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {/* Success Message */}
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm text-center">
          ✅ Check your email! PDF downloading now...
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm text-center">
          ❌ Something went wrong. Please try again.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Your Full Name *" 
          required 
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} 
          className={inputClass} 
          disabled={loading}
        />
        
        <input 
          type="email" 
          placeholder="Your Email Address *" 
          required 
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} 
          className={inputClass}
          disabled={loading}
        />

        <button 
          type="submit" 
          disabled={loading || status === 'success'}
          className={`w-full font-bold py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2 ${
            status === 'success'
              ? 'bg-green-500 text-white cursor-not-allowed'
              : `bg-av-orange hover:bg-orange-600 text-white ${loading ? 'opacity-60 cursor-wait' : 'hover:shadow-lg hover:scale-[1.02]'}`
          }`}
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Preparing...</>
          ) : status === 'success' ? (
            <>✅ Downloaded!</>
          ) : (
            <>📥 Get PDF Now</>
          )}
        </button>

        <p className={`text-center text-xs ${dark ? 'text-white/40' : 'text-gray-500'}`}>
          🔒 We never spam • Unsubscribe anytime
        </p>
      </form>

      {/* Trust Badges */}
      <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/10 flex justify-center gap-3 text-xs">
        <span className={dark ? 'text-white/50' : 'text-gray-500'}>✓ Free</span>
        <span className={dark ? 'text-white/50' : 'text-gray-500'}>✓ Instant Download</span>
        <span className={dark ? 'text-white/50' : 'text-gray-500'}>✓ No Credit Card</span>
      </div>
    </div>
  );
}
