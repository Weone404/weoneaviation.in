export default function SummaryBox({ title = 'Key Takeaways', items = [] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-av-sky/20 bg-av-light/70 p-5 mb-8">
      <h3 className="text-lg font-semibold text-av-blue mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-av-orange">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
