import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ContactPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
    setTimeout(() => setShow(true), 15000);
  };

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
    } catch { }
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
    <div
      onClick={closePopup}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '420px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          animation: 'slideUp 0.4s ease-out forwards',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .popup-input {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px 16px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            box-sizing: border-box;
            font-family: inherit;
            color: #1f2937;
          }
          .popup-input:focus { border-color: #f97316; }
          .popup-input::placeholder { color: #9ca3af; }
          .whatsapp-btn {
            width: 100%;
            background: #f97316;
            color: #fff;
            font-weight: 800;
            font-size: 15px;
            padding: 14px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            letter-spacing: 0.01em;
          }
          .whatsapp-btn:hover:not(:disabled) { background: #ea6c0a; transform: translateY(-1px); }
          .whatsapp-btn:disabled { opacity: 0.7; cursor: not-allowed; }
          .spin {
            width: 16px; height: 16px;
            border: 2.5px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            display: inline-block;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>

        {/* ── Header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2a5e 0%, #1a3f8f 60%, #0f2a5e 100%)',
          padding: '28px 24px 24px',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Close button */}
          <button
            onClick={closePopup}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,255,255,0.12)',
              border: 'none', borderRadius: '50%',
              width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Big headline */}
          <h2 style={{
            margin: 0,
            color: '#fff',
            fontWeight: 900,
            fontSize: 'clamp(1.7rem, 6vw, 2.3rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 16px rgba(0,0,0,0.3)',
          }}>
            Clear DGCA exam<br />
            <span style={{ color: '#FFA500' }}>&amp; Pay Nothing</span>
          </h2>

          <p style={{
            margin: '10px 0 0',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '13px',
            letterSpacing: '0.01em',
          }}>
            Expert guidance from airline pilots · 100% free
          </p>
        </div>

        {/* ── Form ── */}
        <div style={{ padding: '24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {saved && (
              <div style={{
                padding: '10px 14px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                color: '#15803d',
                fontSize: '13px',
              }}>
                ✅ Saved! Opening WhatsApp...
              </div>
            )}

            <input
              className="popup-input"
              type="text"
              placeholder="Full Name *"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="popup-input"
              type="tel"
              placeholder="Phone Number *"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              className="popup-input"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <select
              className="popup-input"
              value={form.course}
              onChange={e => setForm({ ...form, course: e.target.value })}
              style={{ color: form.course ? '#1f2937' : '#9ca3af' }}
            >
              <option value="">Select Course</option>
              <option>Commercial Pilot License (CPL)</option>
              <option>Private Pilot License (PPL)</option>
              <option>ATPL</option>
              <option>DGCA Ground Classes</option>
            </select>

            <button type="submit" disabled={loading} className="whatsapp-btn" style={{ marginTop: '4px' }}>
              {loading
                ? <><span className="spin" /> Saving...</>
                : <>📱 Send on WhatsApp →</>
              }
            </button>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              🔒 Your data is saved securely
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}