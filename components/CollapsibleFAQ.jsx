/*
 * Answers stay in the server-rendered HTML.
 *
 * The previous version gated the answer behind `{open && ...}`, so the text
 * existed only after a click. Answer engines that do not execute JavaScript
 * (GPTBot, ClaudeBot, PerplexityBot) saw the questions and none of the answers,
 * and robots.txt blocked /_next/ for the crawlers that could have rendered it.
 *
 * <details>/<summary> gives the same collapse behaviour natively: the answer is
 * present in the HTML, keyboard accessible, and needs no JavaScript at all.
 */
export default function CollapsibleFAQ({ question, answer, id }) {
  const answerId = `${id}-answer`;

  return (
    <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
      <summary className="w-full flex items-center justify-between gap-4 p-5 text-left font-montserrat font-bold text-av-blue text-sm hover:bg-orange-50 transition-colors cursor-pointer list-none">
        <span>{question}</span>
        <span className="text-av-orange text-xl flex-shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
      </summary>
      <div id={answerId} className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
        {answer}
      </div>
    </details>
  );
}
