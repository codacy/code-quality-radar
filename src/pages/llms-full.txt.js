// /llms-full.txt — every tool's full capability record in one plain-text file,
// the companion to /llms.txt (an index of links). A language model that fetches
// this one file gets what the 20 tool pages show, without crawling them.
//
// It mirrors the tool pages and adds nothing they don't render: facet notes,
// plan tiers, plans, languages, integrations and "Who it's for". Fields the pages
// deliberately never render (languages.notes, commercial._verified) stay out.
import {
  getAllSlugs,
  getToolDetail,
  tierLabelFor,
  UMBRELLA,
  WORKFLOW_STAGE_FACETS,
  DETECTION_FACETS,
  DETECTION_GROUPS,
  AI_CAPABILITY_FACETS,
  COMPLIANCE_BOOL_FACETS,
  GIT_PROVIDER_FACETS,
  API_CLI_FACETS,
  PRICING_MODEL_LABELS,
} from "../lib/tools.js";
import { TOOL_FIT } from "../data/tool-fit.js";
import { PARITY_CAVEAT } from "../data/glossary.js";
import { AUTHOR } from "../data/author.js";
import { PUBLISHER } from "../data/publisher.js";

const STATUS = { yes: "Yes", partial: "Partial", no: "No", unknown: "Unknown" };

// Same rule as the tool page: a free-text field holding the literal "unknown"
// is an undocumented value, never something to print.
const known = (v) => (typeof v === "string" ? v.trim() !== "" && v.trim().toLowerCase() !== "unknown" : Boolean(v));
const valueOf = (cell) => {
  const v = cell && typeof cell === "object" ? cell.v : cell;
  return v in STATUS ? v : "unknown";
};
const sentence = (s) => (/[.!?]$/.test(s) ? s : `${s}.`);

/** One section of facets: supported and partial ones with their notes, the rest named in a line each. */
function facetSection(title, facets, cells) {
  const out = [`### ${title}`, ""];
  const by = { yes: [], partial: [], no: [], unknown: [] };
  for (const f of facets) by[valueOf(cells?.[f.key])].push(f);
  for (const v of ["yes", "partial"]) {
    for (const f of by[v]) {
      const cell = cells?.[f.key];
      const tier = tierLabelFor(cell);
      const note = cell && typeof cell === "object" && known(cell.note) ? ` ${sentence(cell.note)}` : "";
      out.push(`- ${f.label}: ${STATUS[v]}.${tier ? ` Plan: ${sentence(tier)}` : ""}${note}`);
    }
  }
  if (by.no.length) out.push(`- Not offered: ${by.no.map((f) => f.label).join(", ")}.`);
  if (by.unknown.length) out.push(`- Unclear in the documentation: ${by.unknown.map((f) => f.label).join(", ")}.`);
  out.push("");
  return out;
}

function toolRecord(t, url) {
  const c = t.commercial || {};
  const mark = (label, cell) => {
    const v = valueOf(cell);
    return v === "yes" ? label : v === "partial" ? `${label} (partial)` : null;
  };
  const deployment = [
    mark("Cloud", t.deployment?.saas_cloud),
    mark("Self-hosted", t.deployment?.self_hosted),
    mark("Air-gapped", t.deployment?.air_gapped),
  ].filter(Boolean);
  const langList = t.languages?.list || [];
  const langCount = (typeof t.languages?.count_claimed === "number" ? t.languages.count_claimed : 0) || langList.length;

  const out = [`## ${t.name}`, ""];
  out.push(`- Page: ${url(`/${t.slug}/`)}`);
  out.push(`- Vendor: ${t.vendor}`);
  out.push(`- Category: ${t.categoryLabel}`);
  out.push(`- Summary: ${sentence(t.one_liner)}`);
  out.push(`- Last verified: ${t.lastUpdated}`);
  out.push(`- Price: ${t.priceLabel}`);
  const models = (c.pricing_models || []).map((m) => PRICING_MODEL_LABELS[m] || m);
  if (models.length) out.push(`- Pricing model: ${models.join(", ")}`);
  out.push(`- Free plan: ${c.free_tier?.v === "yes" ? "Yes" : c.free_tier?.v === "partial" ? "Partial" : "No"}`);
  out.push(`- Deployment: ${deployment.join(", ") || "Not documented"}`);
  out.push(
    `- Languages: ${
      t.anyLanguage
        ? "Any (no fixed list; works with any language its underlying model can read)"
        : langList.length
          ? `${langCount}+, including ${langList.join(", ")}`
          : "Not documented"
    }`
  );
  if (t.languages?.tier_gated_languages?.length) out.push(`- Languages that need a higher plan: ${t.languages.tier_gated_languages.join(", ")}`);
  out.push("");

  out.push(...facetSection("Workflow coverage", WORKFLOW_STAGE_FACETS, t.workflow_stages));
  for (const group of DETECTION_GROUPS) {
    out.push(...facetSection(group, DETECTION_FACETS.filter((f) => f.group === group), t.detection));
  }
  out.push(...facetSection("AI capabilities", AI_CAPABILITY_FACETS, t.ai_posture));
  if (t.ai_posture?.models_used?.length) out.push(`Models used: ${t.ai_posture.models_used.join(", ")}.`, "");
  out.push(...facetSection("Compliance and governance", COMPLIANCE_BOOL_FACETS, t.compliance));
  if (t.compliance?.certifications?.length) out.push(`Certifications: ${t.compliance.certifications.join(", ")}.`, "");
  if (t.compliance?.standards_mapping?.length) out.push(`Standards mapping: ${t.compliance.standards_mapping.join(", ")}.`, "");
  out.push(...facetSection("Git providers", GIT_PROVIDER_FACETS, t.integrations?.git_providers));
  out.push(...facetSection("API and CLI", API_CLI_FACETS, t.integrations?.api_cli));
  const lists = { ci_systems: "CI/CD systems", ides: "IDEs", issue_trackers: "Issue trackers", chat_notifications: "Chat and notifications" };
  const listLines = Object.entries(lists)
    .filter(([key]) => t.integrations?.[key]?.length)
    .map(([key, label]) => `- ${label}: ${t.integrations[key].join("; ")}`);
  if (listLines.length) out.push("### Other integrations", "", ...listLines, "");

  out.push("### Pricing and plans", "");
  if (known(c.entry_paid_price)) out.push(`- Entry price: ${c.entry_paid_price}`);
  if (known(c.minimum_seats)) out.push(`- Minimum seats: ${c.minimum_seats}`);
  const trial = typeof c.trial === "string" ? c.trial : c.trial?.note;
  if (known(trial)) out.push(`- Trial: ${trial}`);
  for (const plan of c.plans || []) {
    const parts = [`${plan.name}: ${known(plan.price) ? plan.price : "Contact for pricing"}`];
    if (known(plan.who_for)) parts.push(`for ${plan.who_for.replace(/^[A-Z](?=[a-z])/, (ch) => ch.toLowerCase())}`);
    let line = `- ${parts.join(", ")}.`;
    if (plan.key_inclusions?.length) line += ` Includes: ${plan.key_inclusions.join("; ")}.`;
    if (plan.key_limits?.length) line += ` Limits: ${plan.key_limits.join("; ")}.`;
    out.push(line);
  }
  out.push("");

  const fit = TOOL_FIT[t.slug];
  if (fit) {
    out.push("### Who it's for", "");
    out.push(`Best for ${sentence(fit.bestFor)}`);
    if (known(t.fit_signals?.best_fit_team_size)) out.push(sentence(t.fit_signals.best_fit_team_size.replace(/^./, (ch) => ch.toUpperCase())));
    out.push("", "A good fit if:", ...fit.goodFitIf.map((s) => `- ${s}`));
    out.push("", "Consider alternatives if:", ...fit.alternativesIf.map((s) => `- ${s}`), "");
  }
  return out;
}

export async function GET({ site }) {
  const base = (site?.href || "https://radar.codacy.com/").replace(/\/$/, "");
  const url = (path) => `${base}${path}`;
  const tools = getAllSlugs()
    .map(getToolDetail)
    .sort((a, b) => a.name.localeCompare(b.name));

  const lines = [
    "# Review Radar: full tool records",
    "",
    `> Every tool in the Review Radar directory of ${UMBRELLA}, with its full capability record as shown on its page. ` +
      `The index of pages is at ${url("/llms.txt")}.`,
    "",
    `Review Radar is published by ${PUBLISHER.name} (${PUBLISHER.url}). ${PUBLISHER.about}. ` +
      `${PUBLISHER.name} is also one of the tools listed, recorded against the same criteria as every other tool, ` +
      `and tool lists are not ranked. The directory is researched and maintained by ${AUTHOR.name}.`,
    "",
    "How to read a record:",
    "",
    "- Yes: the vendor's own public documentation describes the capability. \"Plan\" names the plan tier it needs, where the vendor gates it.",
    "- Partial: the documentation covers only part of the capability, a related capability, or a beta. The note says what is covered.",
    "- Not offered: the vendor's documentation doesn't describe it.",
    "- Unclear in the documentation: the evidence is ambiguous.",
    `- ${PARITY_CAVEAT}`,
    "- Tools are listed alphabetically. Review Radar does not rank them.",
    "",
    `Tools: ${tools.length}. Most recent verification: ${tools.map((t) => t.lastUpdated).sort().at(-1)}.`,
    "",
  ];
  for (const t of tools) lines.push(...toolRecord(t, url));

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
