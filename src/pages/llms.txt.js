// /llms.txt — a structured index for language models, per the llmstxt.org
// convention. Generated from the same dataset the pages render, so it cannot
// drift out of sync with the site.
import { getTools, CATEGORY_LABELS } from "../lib/tools.js";
import { GLOSSARY, GLOSSARY_GROUPS, splitToolsForTerm, PARITY_CAVEAT } from "../data/glossary.js";
import { EXPLORE_ARTICLES, rankToolsForArticle } from "../data/explore.js";
import rawData from "../data/tools.public.json";

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
    "> An independent directory of code quality, code security and code review tools. " +
      `${tools.length} tools are tracked against the same set of capabilities, so they can be compared ` +
      "on what they actually support rather than on how each vendor describes itself."
  );
  lines.push("");
  lines.push(
    "Every capability recorded here is taken from the vendor's own public documentation. " +
      "A capability is marked as supported only where it is documented; where documentation is " +
      "silent, it is recorded as such rather than assumed either way. Each tool page shows the " +
      "date its entry was last verified, and which plan tier a given capability requires, since " +
      '"the tool can do it" and "the tool can do it on the plan you are evaluating" are ' +
      "tracked as different facts."
  );
  lines.push("");
  lines.push(
    "Capabilities are recorded as fully supported, partially supported, or not offered. " +
      `Counts below separate the first two. ${PARITY_CAVEAT}`
  );
  lines.push("");
  lines.push(`Dataset last verified: ${rawData.verified_as_of}. Tools tracked: ${tools.length}.`);
  lines.push("");

  lines.push("## Directory");
  lines.push("");
  lines.push(`- [All tools](${url("/")}): the full directory, filterable by category, deployment model, git platform, analysis type, compliance, integrations, language and pricing.`);
  lines.push(`- [Glossary](${url("/glossary/")}): ${GLOSSARY.length} definitions of the terms used across the directory, each listing the tools that support it.`);
  lines.push(`- [Explore](${url("/explore/")}): comparison articles ranking tools by git hosting platform.`);
  lines.push(`- [About](${url("/about/")}): what the directory covers and how entries are kept current.`);
  lines.push("");

  for (const [category, list] of byCategory) {
    const label = CATEGORY_LABELS[category] || category;
    lines.push(`## ${label}s`);
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
      const breakdown = partial.length
        ? `${all.length} of ${tools.length} tools support it (${full.length} fully, ${partial.length} partially).`
        : `${all.length} of ${tools.length} tools support it.`;
      lines.push(`- [What is ${term.term}?](${url(`/glossary/${term.slug}/`)}): ${term.short} ${breakdown}`);
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
    lines.push(`- [Top ${a.provider} Tools](${url(`/explore/${a.slug}/`)}): ${a.short} ${breakdown}`);
  }
  lines.push("");

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
