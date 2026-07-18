export default function AuthorCard({ author = {}, reviewedBy = 'We One Aviation Academy', updatedAt = 'Recently updated', readingTime = '5 min read' }) {
  const name = author.name || 'We One Aviation Academy';
  const role = author.role || 'Pilot training advisor';
  const description = author.description || 'Provides verified guidance on DGCA exams, CPL training, and pilot career pathways.';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-av-orange">Author</p>
          <h3 className="text-lg font-semibold text-av-blue">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>Reviewed by {reviewedBy}</p>
          <p>{updatedAt}</p>
          <p>{readingTime}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-700">{description}</p>
    </div>
  );
}
