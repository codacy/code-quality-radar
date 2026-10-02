// /llms.txt — a structured index for language models, per the llmstxt.org
// convention. Generated from the same dataset the pages render, so it cannot
// drift out of sync with the site.
import { getTools, CATEGORY_PLURALS, UMBRELLA } from "../lib/tools.js";
import { GLOSSARY, GLOSSARY_GROUPS, splitToolsForTerm, PARITY_CAVEAT } from "../data/glossary.js";
import { questionFor, doesPhraseFor, isCategoryTerm, pluralFor } from "../data/glossary-phrasing.js";
import { EXPLORE_ARTICLES, rankToolsForArticle } from "../data/explore.js";
import { AUTHOR } from "../data/author.js";
import { PUBLISHER } from "../data/publisher.js";

const SMALL_WORDS = new Set(["and", "or", "for", "of", "the", "a", "an", "in", "to"]);
const titleCase = (s) => s.replace(/\b[a-z][a-z-]*/g, (w, i) => (i > 0 && SMALL_WORDS.has(w) ? w : w[0].toUpperCase() + w.slice(1)));

export async function GET({ site }) {
  const base = (site?.href || "https://radar.codacy.com/").replace(/\/$/, "");
  const tools = getTools();
  const url = (path) => `${base}${path}`;

  const byCategory = new Map();
  for (const t of tools) {
    if (!byCategory.has(t.category)) byCategory.set(t.category, []);
    byCategory.get(t.category).push(t);
  }

  const lines = [];
  lines.push("# Review Radar");
  lines.push("");
  lines.push(
    `> A directory of ${UMBRELLA}, compared on what vendors document. ` +
      `${tools.length} tools are tracked against the same set of capabilities, so they can be compared ` +
      "on what they actually support rather than on how each vendor describes itself."
  );
  lines.push("");
  lines.push(
    "Every capability recorded here is taken from the vendor's own public documentation. " +
      "A capability is marked as supported only where it is documented; where the documentation " +
      "doesn't mention it, it is recorded as not available, with a note saying so, and the few " +
      "cases where the evidence is unclear are marked unknown. Each tool page shows the date its " +
      "entry was last verified, and each glossary page shows which plan tier a tool needs for " +
      'that capability, since "the tool can do it" and "the tool can do it on the plan you are ' +
      'evaluating" are tracked as different facts.'
  );
  lines.push("");
  lines.push(
    "Capabilities are recorded as fully supported, partially supported, or not offered. " +
      `Counts below separate the first two. ${PARITY_CAVEAT}`
  );
  lines.push("");
  lines.push(
    `Review Radar is published by ${PUBLISHER.name} (${PUBLISHER.url}). ${PUBLISHER.about}. ` +
      `${PUBLISHER.name} is also one of the tools listed, recorded against the same criteria as every other tool, ` +
      `and tool lists are not ranked. The directory is researched and maintained by ${AUTHOR.name}.`
  );
  lines.push("");
  const latest = tools.map((t) => t.lastUpdated).sort().at(-1);
  lines.push(`Most recent verification: ${latest}. Tools tracked: ${tools.length}.`);
  lines.push("");

  lines.push("## Directory");
  lines.push("");
  lines.push(`- [All tools](${url("/")}): the full directory, filterable by category, deployment model, git platform, analysis type, compliance, integrations, language and pricing.`);
  lines.push(`- [Glossary](${url("/glossary/")}): ${GLOSSARY.length} definitions of the terms used across the directory, each listing the tools that support it.`);
  lines.push(`- [Explore](${url("/explore/")}): comparison articles, one per git hosting platform, listing every tool that integrates with it. Lists are not ranked.`);
  lines.push(`- [About](${url("/about/")}): what the directory covers and how entries are kept current.`);
  lines.push(`- [Full tool records](${url("/llms-full.txt")}): every tool's complete capability record (notes, plan tiers, plans, integrations) in one plain-text file.`);
  lines.push("");

  for (const [category, list] of byCategory) {
    lines.push(`## ${titleCase(CATEGORY_PLURALS[category] || category)}`);
    lines.push("");
    for (const t of list.sort((a, b) => a.name.localeCompare(b.name))) {
      const mark = (label, v) => (v === "yes" ? label : v === "partial" ? `${label} (partial)` : null);
      const deploy = [
        mark("cloud", t.values.deployment.cloud),
        mark("self-hosted", t.values.deployment.selfHosted),
        mark("air-gapped", t.values.deployment.airGapped),
      ]
        .filter(Boolean)
        .join(", ");
      lines.push(
        `- [${t.name}](${url(`/${t.slug}/`)}): ${t.description} Deployment: ${deploy || "not documented"}. ` +
          `Pricing: ${t.priceLabel}. Last verified ${t.lastUpdated}.`
      );
    }
    lines.push("");
  }

  lines.push("## Glossary");
  lines.push("");
  for (const group of GLOSSARY_GROUPS) {
    const terms = GLOSSARY.filter((t) => t.group === group);
    if (!terms.length) continue;
    lines.push(`### ${group}`);
    lines.push("");
    for (const term of terms.sort((a, b) => a.term.localeCompare(b.term))) {
      const { all, full, partial } = splitToolsForTerm(term, tools);
      const breakdown = isCategoryTerm(term)
        ? `${all.length} of ${tools.length} tools are ${pluralFor(term)}.`
        : `${all.length} of ${tools.length} tools ${doesPhraseFor(term)}` +
          (partial.length ? ` (${full.length} fully, ${partial.length} partially).` : ".");
      lines.push(`- [${questionFor(term)}](${url(`/glossary/${term.slug}/`)}): ${term.short} ${breakdown}`);
    }
    lines.push("");
  }

  lines.push("## Explore");
  lines.push("");
  for (const a of EXPLORE_ARTICLES) {
    const ranked = rankToolsForArticle(a, tools);
    const full = ranked.filter((t) => !t.partial).length;
    const partial = ranked.length - full;
    const breakdown = partial
      ? `${ranked.length} tools integrate with it (${full} fully, ${partial} partially).`
      : `${ranked.length} tools integrate with it.`;
    lines.push(`- [Best ${titleCase(UMBRELLA)} for ${a.provider}](${url(`/explore/${a.slug}/`)}): ${a.short} ${breakdown}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [${AUTHOR.name}](${url(`/author/${AUTHOR.slug}/`)}): who maintains the directory. ${AUTHOR.bio}`);
  lines.push("");

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
