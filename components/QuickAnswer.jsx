export default function QuickAnswer({ question, answer }) {
  if (!question || !answer) return null;

  return (
    <div className="rounded-2xl border border-av-sky/20 bg-av-light/70 p-5 mb-6" aria-label="Quick answer">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-av-blue mb-2">Quick Answer</p>
      <h2 className="text-lg font-semibold text-av-blue mb-2">{question}</h2>
      <p className="text-sm leading-relaxed text-gray-700">{answer}</p>
    </div>
  );
}
