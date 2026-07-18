export default function PeopleAlsoAsk({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" aria-label="People also ask">
      <h3 className="text-lg font-semibold text-av-blue mb-4">People also ask</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
            <summary className="cursor-pointer font-semibold text-av-blue list-none">{item.q}</summary>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
