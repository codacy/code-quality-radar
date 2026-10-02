// Per-tool comments for a page's tool list. An Explore article or glossary term
// can carry `picks`: one short comment per tool on how it fits that topic,
// loosely tied to the page's "What to look for" guidance. The order of `picks`
// carries no meaning: tool lists are shuffled on every page load (see
// src/components/Shuffle.astro), and the server order is alphabetical.
//
// A tool that supports the topic but has no comment yet (say, a new tool in the
// dataset) falls back to its default text, and the build logs a warning so it
// gets one.

export function attachComments(candidates, picks, pageId) {
  if (!picks?.length) return candidates;
  const comment = new Map(picks.map((p) => [p.slug, p.comment]));
  const slugs = new Set(candidates.map((t) => t.slug));
  for (const p of picks) {
    if (!slugs.has(p.slug)) console.warn(`[picks] ${pageId}: "${p.slug}" does not support this topic, so it is not listed.`);
  }
  for (const t of candidates) {
    if (!comment.has(t.slug)) console.warn(`[picks] ${pageId}: no comment for "${t.slug}", so its default text is shown.`);
  }
  return candidates.map((t) => ({ ...t, comment: comment.get(t.slug) ?? null }));
}

/** Full support before partial support, then alphabetical: the neutral server order. */
export function byBandThenName(a, b) {
  return Number(Boolean(a.partial)) - Number(Boolean(b.partial)) || a.name.localeCompare(b.name);
}

// "What to look for" items are { label, text } on rewritten pages, and plain
// strings on pages written before them. On rewritten pages the FAQ answer names
// the points and refers back to the section, rather than repeating it.
const COUNT_WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];
export function lookForFaq(items) {
  const n = COUNT_WORDS[items.length] || String(items.length);
  const labelled = items.every((l) => typeof l !== "string");
  return [
    labelled ? `${n} things, each explained under "What to look for" above:` : `${n} things:`,
    { list: items.map((l) => (typeof l === "string" ? l : l.label)) },
  ];
}

export const SHUFFLE_NOTE = "Shown in a random order that changes on every visit, so no tool gets an advantage from its position.";
