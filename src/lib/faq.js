// FAQ answers. An answer is either a plain string or a list of parts, so a long
// answer renders as short paragraphs and lists instead of one block of text:
//   "A paragraph."
//   { list: ["Item", { text: "Linked item", href: "/x/" }] }   → bulleted list
//   { links: [{ text: "Tool", href: "/tool/" }] }               → compact row of links
// The same parts produce the FAQPage JSON-LD answer, which allows simple HTML.

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const itemText = (i) => (typeof i === "string" ? i : i.text);

export const answerParts = (a) => (typeof a === "string" ? [a] : a);

/** Answer text for JSON-LD. Lists become HTML lists; links become their text. */
export function answerHtml(a, site) {
  return answerParts(a)
    .map((part) => {
      if (typeof part === "string") return `<p>${esc(part)}</p>`;
      const items = part.list ?? part.links;
      return `<ul>${items
        .map((i) => (typeof i !== "string" && i.href && site ? `<li><a href="${esc(new URL(i.href, site).href)}">${esc(i.text)}</a></li>` : `<li>${esc(itemText(i))}</li>`))
        .join("")}</ul>`;
    })
    .join("");
}

export function faqJsonLd(faqs, site) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: answerHtml(f.a, site) },
    })),
  };
}
