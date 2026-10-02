// Build time: what each searchable item can be found by, packed into the
// data-search attribute that src/lib/search.js matches in the browser.
// Synonyms come from src/data/search-synonyms.js.
import { packPhrases } from "./search.js";
import {
  GIT_PROVIDER_FACETS,
  WORKFLOW_STAGE_FACETS,
  DETECTION_FACETS,
  AI_CAPABILITY_FACETS,
  COMPLIANCE_BOOL_FACETS,
  API_CLI_FACETS,
  DEPLOYMENT_FACETS,
  PRICING_BOOL_FACETS,
  PRICING_MODEL_LABELS,
} from "./tools.js";
import { glossarySlugFor } from "../data/glossary.js";
import { labelAliases, termAliases } from "../data/search-synonyms.js";

// Facet groups whose labels are glossary terms, so their synonyms come from
// the term. Same order as the filters.
const TERM_FACET_GROUPS = [
  ["deployment", DEPLOYMENT_FACETS, (t) => t.deployment],
  ["workflow", WORKFLOW_STAGE_FACETS, (t) => t.workflowStages],
  ["detection", DETECTION_FACETS, (t) => t.detection],
  ["ai", AI_CAPABILITY_FACETS, (t) => t.aiCapabilities],
  ["compliance", COMPLIANCE_BOOL_FACETS, (t) => t.complianceBool],
  ["apiCli", API_CLI_FACETS, (t) => t.apiCli],
];

/**
 * A tool card: everything the home-page filters know about the tool, so a
 * search finds what a filter would. Supported means yes or partial, the same
 * as the filters. `allLanguages` is every language label in the directory,
 * since a tool with no fixed language list matches every language filter.
 */
export function toolSearch(t, allLanguages = []) {
  const phrases = [t.name, t.vendor, ...labelAliases(t.name), t.description];
  const add = (label, aliases = []) => phrases.push(label, ...labelAliases(label), ...aliases);

  add(t.categoryLabel, termAliases(glossarySlugFor("category", t.category)));
  for (const [type, defs, values] of TERM_FACET_GROUPS) {
    for (const f of defs) if (values(t)[f.key]) add(f.label, termAliases(glossarySlugFor(type, f.key)));
  }
  for (const f of GIT_PROVIDER_FACETS) if (t.gitProviders[f.key]) add(f.label);
  for (const f of PRICING_BOOL_FACETS) if (t[f.key]) add(f.label);
  for (const m of t.pricingModels) add(PRICING_MODEL_LABELS[m] || m);
  const languages = t.anyLanguage ? allLanguages : t.languages;
  for (const v of [...languages, ...t.certifications, ...t.ides, ...t.ciSystems, ...t.issueTrackers, ...t.chatNotifications]) add(v);
  return packPhrases(phrases);
}

/** A glossary card: the term, its synonyms, its group and its short definition. */
export function termSearch(term) {
  return packPhrases([term.term, ...termAliases(term.slug), term.group, term.short]);
}

/** A plain label, such as a filter option or a sidebar entry, plus its synonyms. */
export function labelSearch(label, ...extra) {
  return packPhrases([label, ...labelAliases(label), ...extra]);
}
