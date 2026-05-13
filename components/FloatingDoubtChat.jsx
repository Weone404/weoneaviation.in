// components/FloatingDoubtChat.jsx
import { useState, useRef, useEffect } from "react";
import { askDoubt, formatAnswer, QUICK_QUESTIONS } from "../lib/doubtApi";

function cleanForSpeech(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^[-•]\s/gm, "")
        .replace(/^\d+\.\s/gm, "")
        .replace(/#+ /g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/\n+/g, ". ")
        .replace(/\.{2,}/g, ".")
        .trim();
}

function speakText(text, onEnd) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = cleanForSpeech(text);
    if (!clean) return;
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 0.92;
    utter.pitch = 1.05;
    utter.lang = "en-IN";
    const voices = window.speechSynthesis.getVoices();
    const best = voices.find(v =>
        v.lang.startsWith("en") &&
        (v.name.includes("Google") || v.name.includes("Neural") || v.name.includes("Wavenet"))
    ) || voices.find(v => v.lang.startsWith("en-IN"))
        || voices.find(v => v.lang.startsWith("en"));
    if (best) utter.voice = best;
    if (onEnd) utter.onend = onEnd;
    window.speechSynthesis.speak(utter);
}

function stopSpeaking() {
    if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
}

export default function FloatingDoubtChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{
        role: "assistant",
        text: "👋 Hi! I'm your DGCA study assistant. Ask me anything about aviation!",
        id: 1,
    }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [historyForApi, setHistory] = useState([]);
    const [speakingId, setSpeakingId] = useState(null);
    const [unread, setUnread] = useState(0);

    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading, open]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.speechSynthesis.onvoiceschanged = () => { };
        return () => stopSpeaking();
    }, []);

    async function sendMessage(questionText) {
        const q = String(questionText || input).trim();
        if (!q || loading) return;
        stopSpeaking();
        setSpeakingId(null);
        setInput("");
        const userMsg = { role: "user", text: q, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);
        try {
            const { answer } = await askDoubt(q, null, historyForApi, "chat");
            const botId = Date.now() + 1;
            setMessages(prev => [...prev, { role: "assistant", text: answer, id: botId }]);
            setHistory(prev => [...prev, { question: q, answer }]);
            if (!open) setUnread(u => u + 1);
            setSpeakingId(botId);
            speakText(answer, () => setSpeakingId(null));
        } catch {
            setMessages(prev => [...prev, {
                role: "assistant",
                text: "⚠️ Something went wrong. Please try again.",
                id: Date.now() + 1,
                isError: true,
            }]);
        } finally {
            setLoading(false);
        }
    }

    function toggleSpeak(msg) {
        if (speakingId === msg.id) { stopSpeaking(); setSpeakingId(null); }
        else { setSpeakingId(msg.id); speakText(msg.text, () => setSpeakingId(null)); }
    }

    function clearChat() {
        stopSpeaking();
        setSpeakingId(null);
        setMessages([{ role: "assistant", text: "Chat cleared! Ask me anything.", id: Date.now() }]);
        setHistory([]);
    }

    return (
        <>
            <style>{CSS}</style>

            {/* Floating Button */}
            <button
                className={`fdc-trigger ${open ? "fdc-trigger--open" : ""}`}
                onClick={() => setOpen(v => !v)}
                aria-label="Toggle doubt chat"
            >
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {/* Tooltip label */}
                        <span className="fdc-label">Ask AI</span>
                    </>
                )}
                {!open && unread > 0 && <span className="fdc-badge">{unread}</span>}
            </button>

            {/* Chat Panel — opens upward and to the left of the button */}
            <div className={`fdc-panel ${open ? "fdc-panel--open" : ""}`}>

                {/* Header */}
                <div className="fdc-header">
                    <div className="fdc-header-left">
                        <div className="fdc-avatar">🤖</div>
                        <div>
                            <div className="fdc-title">DGCA Study Assistant</div>
                            <div className="fdc-sub"><span className="fdc-dot" />AI Online</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                        <button className="fdc-icon-btn" onClick={clearChat} title="Clear">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                            </svg>
                        </button>
                        <button className="fdc-icon-btn" onClick={() => setOpen(false)} title="Close">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="fdc-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`fdc-row ${msg.role === "user" ? "fdc-row--user" : "fdc-row--bot"}`}>
                            {msg.role === "assistant" && <div className="fdc-msg-av">🤖</div>}
                            <div className="fdc-bwrap">
                                <div
                                    className={`fdc-bubble ${msg.role === "user" ? "fdc-bubble--user" : "fdc-bubble--bot"} ${msg.isError ? "fdc-bubble--err" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: formatAnswer(msg.text) }}
                                />
                                {msg.role === "assistant" && !msg.isError && (
                                    <button
                                        className={`fdc-speak ${speakingId === msg.id ? "fdc-speak--on" : ""}`}
                                        onClick={() => toggleSpeak(msg)}
                                    >
                                        {speakingId === msg.id ? "⏹ Stop" : "🔊"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="fdc-row fdc-row--bot">
                            <div className="fdc-msg-av">🤖</div>
                            <div className="fdc-typing">
                                <span /><span /><span />
                            </div>
                        </div>
                    )}

                    {messages.length === 1 && !loading && (
                        <div className="fdc-quick">
                            {QUICK_QUESTIONS.slice(0, 4).map(q => (
                                <button key={q} className="fdc-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
                            ))}
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="fdc-input-area">
                    <div className="fdc-input-row">
                        <textarea
                            ref={inputRef}
                            className="fdc-textarea"
                            placeholder="Ask any DGCA question..."
                            value={input}
                            rows={1}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
                            }}
                        />
                        <button
                            className="fdc-send"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                    <div className="fdc-hint">Enter to send · Shift+Enter for new line</div>
                </div>
            </div>
        </>
    );
}

const CSS = `
  /* ── Trigger button ── */
  .fdc-trigger {
    position: fixed;
    bottom: 160px;
    right: 24px;
    z-index: 99999;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(79,70,229,0.55);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .fdc-trigger:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(79,70,229,0.65); }
  .fdc-trigger--open { background: #1e293b; box-shadow: 0 2px 12px rgba(0,0,0,0.5); }

  /* Tooltip label beside button */
  .fdc-label {
    position: absolute;
    right: 60px;
    background: #1e293b;
    color: #e2e8f0;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid #334155;
    white-space: nowrap;
    pointer-events: none;
    font-family: 'Sora', sans-serif;
    letter-spacing: 0.3px;
  }

  .fdc-badge {
    position: absolute;
    top: -3px; right: -3px;
    background: #ef4444;
    color: white;
    font-size: 10px;
    font-weight: 700;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid #060810;
    font-family: sans-serif;
  }

  /* ── Chat panel ── */
  /* Only width and height changed: 360px→320px, 500px→400px. All positions unchanged. */
  .fdc-panel {
    position: fixed;
    bottom: 224px;
    right: 24px;
    z-index: 99998;
    width: 320px;
    height: 400px;
    background: #0a0d14;
    border: 1px solid #1e293b;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Sora', sans-serif;
    box-shadow: 0 24px 64px rgba(0,0,0,0.75);
    transform: scale(0.9) translateY(20px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s;
    transform-origin: bottom right;
  }
  .fdc-panel--open {
    transform: scale(1) translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  /* ── Header ── */
  .fdc-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid #1e293b;
    background: #0d1117;
    flex-shrink: 0;
  }
  .fdc-header-left { display: flex; align-items: center; gap: 8px; }
  .fdc-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
  }
  .fdc-title { font-size: 12px; font-weight: 600; color: #f1f5f9; }
  .fdc-sub {
    font-size: 10px; color: #4ade80;
    display: flex; align-items: center; gap: 4px; margin-top: 1px;
  }
  .fdc-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #22c55e; display: inline-block;
    animation: fdcPulse 2s infinite;
  }
  .fdc-icon-btn {
    background: none; border: 1px solid #1e293b;
    color: #475569; width: 24px; height: 24px;
    border-radius: 6px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .fdc-icon-btn:hover { border-color: #374151; color: #94a3b8; }

  /* ── Messages ── */
  .fdc-messages {
    flex: 1; overflow-y: auto;
    padding: 10px 8px;
    display: flex; flex-direction: column; gap: 8px;
    scrollbar-width: thin; scrollbar-color: #1e293b transparent;
  }
  .fdc-messages::-webkit-scrollbar { width: 3px; }
  .fdc-messages::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }

  .fdc-row { display: flex; gap: 6px; align-items: flex-start; animation: fdcUp 0.2s ease; }
  .fdc-row--user { flex-direction: row-reverse; }
  @keyframes fdcUp { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }

  .fdc-msg-av {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0;
  }

  .fdc-bwrap { display: flex; flex-direction: column; gap: 3px; max-width: 80%; }
  .fdc-row--user .fdc-bwrap { align-items: flex-end; }

  .fdc-bubble {
    padding: 7px 10px; border-radius: 12px;
    font-size: 12px; line-height: 1.5;
  }
  .fdc-bubble--bot {
    background: #111827; border: 1px solid #1e293b;
    border-top-left-radius: 3px; color: #cbd5e1;
  }
  .fdc-bubble--user {
    background: linear-gradient(135deg, #1d4ed8, #4f46e5);
    color: white; border-top-right-radius: 3px;
  }
  .fdc-bubble--err { border-color: #7f1d1d !important; background: #1c0a0a !important; }
  .fdc-bubble strong { color: #93c5fd; }
  .fdc-bubble ul { padding-left: 14px; margin: 4px 0; }
  .fdc-bubble li { margin: 2px 0; color: #94a3b8; font-size: 11px; }
  .fdc-bubble p  { margin: 3px 0; }
  .fdc-bubble p:first-child { margin-top: 0; }
  .fdc-bubble p:last-child  { margin-bottom: 0; }

  .fdc-speak {
    background: none; border: 1px solid #1e293b;
    color: #4b5563; padding: 2px 7px;
    border-radius: 20px; font-size: 10px;
    cursor: pointer; transition: all 0.15s;
    font-family: inherit;
  }
  .fdc-speak:hover { border-color: #6366f1; color: #a5b4fc; }
  .fdc-speak--on { border-color: #0ea5e9; color: #38bdf8; animation: fdcPulse 1.5s infinite; }
  @keyframes fdcPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

  /* ── Typing indicator ── */
  .fdc-typing {
    background: #111827; border: 1px solid #1e293b;
    border-radius: 12px; border-top-left-radius: 3px;
    padding: 9px 12px;
    display: flex; gap: 4px; align-items: center;
  }
  .fdc-typing span {
    width: 5px; height: 5px; border-radius: 50%;
    background: #4f46e5; display: inline-block;
    animation: fdcBounce 1.2s infinite;
  }
  .fdc-typing span:nth-child(2) { animation-delay:.2s; background:#0ea5e9; }
  .fdc-typing span:nth-child(3) { animation-delay:.4s; background:#22c55e; }
  @keyframes fdcBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }

  /* ── Quick questions ── */
  .fdc-quick { display: flex; flex-direction: column; gap: 4px; }
  .fdc-quick-btn {
    background: #0f172a; border: 1px solid #1e293b;
    color: #64748b; padding: 5px 9px;
    border-radius: 7px; font-size: 11px;
    cursor: pointer; text-align: left;
    transition: all 0.15s; font-family: inherit;
    line-height: 1.4;
  }
  .fdc-quick-btn:hover { border-color: #4f46e5; color: #a5b4fc; background: #1e1b4b22; }

  /* ── Input area ── */
  .fdc-input-area {
    padding: 8px 10px; border-top: 1px solid #1e293b;
    background: #0d1117; flex-shrink: 0;
  }
  .fdc-input-row { display: flex; gap: 6px; align-items: flex-end; }
  .fdc-textarea {
    flex: 1; background: #111827; border: 1px solid #1e293b;
    color: #e2e8f0; padding: 8px 10px;
    border-radius: 9px; font-size: 12px;
    font-family: inherit; resize: none; outline: none;
    min-height: 34px; max-height: 90px;
    transition: border-color 0.2s; line-height: 1.5;
  }
  .fdc-textarea:focus { border-color: #4f46e5; }
  .fdc-textarea::placeholder { color: #374151; }

  .fdc-send {
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    border: none; color: white;
    width: 34px; height: 34px; border-radius: 9px;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
    flex-shrink: 0; transition: opacity 0.2s;
  }
  .fdc-send:hover:not(:disabled) { opacity: 0.85; }
  .fdc-send:disabled { opacity: 0.35; cursor: not-allowed; }

  .fdc-hint {
    margin-top: 5px; font-size: 10px;
    color: #374151; text-align: center;
    font-family: inherit;
  }

  /* ── Mobile ── */
  @media (max-width: 480px) {
    .fdc-trigger { bottom: 152px; right: 16px; width: 48px; height: 48px; }
    .fdc-panel   { width: calc(100vw - 24px); right: 12px; bottom: 212px; height: 380px; }
    .fdc-label   { display: none; }
  }
`;