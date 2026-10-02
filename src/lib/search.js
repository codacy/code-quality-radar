// One search behavior for every search box on the site: the home-page tool
// search, the searchable filter groups, the glossary and the docs sidebar.
//
// At build time each searchable item becomes a list of phrases (its name,
// labels, description and any synonyms), normalized and packed into a
// data-search attribute by packPhrases(). In the browser, createSearch() reads
// those attributes back and answers queries in three passes, keeping the first
// one that finds anything:
//
//   1. The query as typed, ignoring case, accents and punctuation, so
//      "on prem", "on-prem" and "onprem" are the same search.
//   2. Every word of the query, in any order, so "self-managed gitlab" finds
//      what "gitlab self-managed" finds.
//   3. Close spellings, for words that appear nowhere on the page. Only words
//      of 5 letters or more, and never ones with digits, so SAST is never read
//      as DAST and ISO 27002 never as ISO 27001. Callers show the correction.
//
// Search only filters. It never reorders results.
import { KEEP_TOGETHER } from "../data/search-synonyms.js";

const PHRASE_SEPARATOR = "|";

/** Lower-case, accents stripped, punctuation as spaces. "+" and "#" stay, for C++ and C#. */
export function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9+#]+/g, " ")
    .trim();
}

/** Build-time: the data-search attribute value for one item. */
export function packPhrases(phrases) {
  const seen = new Set();
  for (const phrase of phrases) {
    const p = normalize(phrase);
    if (p) seen.add(p);
  }
  return [...seen].join(PHRASE_SEPARATOR);
}

const compact = (s) => s.replace(/ /g, "");

// Compact matching ignores the spaces between words, so "onprem" finds
// "on prem" and "soc2" finds "soc 2". The match has to begin where a word
// begins, or "ghas" would be found in "throu-gh as". Very short queries skip
// it, since they would match almost anywhere.
const MIN_COMPACT = 4;
const MIN_FUZZY = 5;

function toPhrase(text) {
  const starts = new Set();
  let offset = 0;
  for (const word of text.split(" ")) {
    starts.add(offset);
    offset += word.length;
  }
  return { text, compact: compact(text), starts };
}

function containsText(phrase, text) {
  if (phrase.text.includes(text)) return true;
  const c = compact(text);
  if (c.length < MIN_COMPACT) return false;
  for (let at = phrase.compact.indexOf(c); at !== -1; at = phrase.compact.indexOf(c, at + 1)) {
    if (phrase.starts.has(at)) return true;
  }
  return false;
}

// Optimal string alignment distance: edits, plus swapping two neighboring
// letters, which is the most common typo ("pyhton").
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2 = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let d = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2] + 1);
      row.push(d);
      if (d < best) best = d;
    }
    if (best > max) return max + 1;
    prev2 = prev;
    prev = row;
  }
  return prev[b.length];
}

/**
 * A search over a fixed list of items, each given as its packed data-search
 * value. Returns a function that takes the raw query and gives back:
 *   null when the query is empty (everything matches),
 *   otherwise { hits: Set of item indexes, correction: string | null }.
 * `correction` is set only when the hits come from close spellings, and holds
 * the query as it was read, for a "Showing results for …" note.
 */
const keepTogether = KEEP_TOGETHER.map(normalize);

export function createSearch(packedItems) {
  const items = packedItems.map((packed) =>
    String(packed || "")
      .split(PHRASE_SEPARATOR)
      .filter(Boolean)
      .map(toPhrase)
  );
  const allPhrases = items.flat();

  const wordCounts = new Map();
  for (const phrase of allPhrases) {
    for (const w of phrase.text.split(" ")) wordCounts.set(w, (wordCounts.get(w) || 0) + 1);
  }
  const vocabulary = [...wordCounts.keys()];

  const appearsAnywhere = (word) => allPhrases.some((p) => containsText(p, word));

  // Words close to a misspelled one, most common first. A word can also be
  // the start of a longer one, so "sonarcu" still finds "sonarqube".
  function closeWords(word) {
    if (word.length < MIN_FUZZY || /\d/.test(word)) return [];
    const max = word.length >= 8 ? 2 : 1;
    let bestDistance = max + 1;
    let best = [];
    for (const v of vocabulary) {
      if (v.length < MIN_FUZZY - 1 || /\d/.test(v)) continue;
      const whole = editDistance(word, v, max);
      const start = v.length > word.length ? editDistance(word, v.slice(0, word.length), max) : whole;
      const d = Math.min(whole, start);
      if (d > max || d > bestDistance) continue;
      if (d < bestDistance) {
        bestDistance = d;
        best = [];
      }
      best.push(v);
    }
    return best.sort((a, b) => wordCounts.get(b) - wordCounts.get(a));
  }

  // Passes 1 and 2. `words` holds, for each query word, the spellings that
  // count as that word. Pass 2 is skipped when `splittable` is false.
  function find(phraseText, words, splittable = true) {
    const hits = new Set();
    if (phraseText) {
      items.forEach((phrases, i) => {
        if (phrases.some((p) => containsText(p, phraseText))) hits.add(i);
      });
      if (hits.size) return hits;
    }
    if (splittable && (words.length > 1 || !phraseText)) {
      items.forEach((phrases, i) => {
        if (words.every((alts) => alts.some((w) => phrases.some((p) => containsText(p, w))))) hits.add(i);
      });
    }
    return hits;
  }

  return function search(rawQuery) {
    const query = normalize(rawQuery);
    if (!query) return null;
    const words = query.split(" ");
    const splittable = !keepTogether.some((name) => ` ${query} `.includes(` ${name} `));

    const hits = find(query, words.map((w) => [w]), splittable);
    if (hits.size) return { hits, correction: null };

    // Pass 3, only for words found nowhere on the page. A query whose words
    // all exist, just never together, has no typo to fix.
    const unknown = words.filter((w) => !appearsAnywhere(w));
    if (!unknown.length) return { hits, correction: null };
    const fixed = words.map((w) => (unknown.includes(w) ? closeWords(w) : [w]));
    if (fixed.some((alts) => !alts.length)) return { hits, correction: null };

    const correction = fixed.map((alts) => alts[0]).join(" ");
    const fuzzyHits = find(fixed.every((alts) => alts.length === 1) ? correction : null, fixed);
    return { hits: fuzzyHits, correction: fuzzyHits.size ? correction : null };
  };
}

/** The "No exact matches…" note, built as nodes so the query is never parsed as HTML. */
export function renderCorrection(el, rawQuery, correction) {
  if (!el) return;
  el.replaceChildren();
  el.hidden = !correction;
  if (!correction) return;
  const typed = document.createElement("b");
  typed.textContent = rawQuery.trim();
  const read = document.createElement("b");
  read.textContent = correction;
  el.append("No exact matches for “", typed, "”. Showing results for “", read, "”.");
}
