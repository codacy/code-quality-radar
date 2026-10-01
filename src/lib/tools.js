import raw from "../data/tools.public.json";

function findLatestVerifiedOn(node) {
  let latest = null;
  const walk = (n) => {
    if (Array.isArray(n)) {
      for (const v of n) walk(v);
    } else if (n && typeof n === "object") {
      for (const [k, v] of Object.entries(n)) {
        if (k === "verified_on" && typeof v === "string") {
          if (!latest || v > latest) latest = v;
        } else {
          walk(v);
        }
      }
    }
  };
  walk(node);
  return latest;
}

export const CATEGORY_LABELS = {
  "appsec-platform": "Code Security Platform",
  "agent-coding-tool": "Agent Coding Tool",
  "quality-platform": "Quality Platform",
  "pr-review": "PR Review",
};

export const GIT_PROVIDER_FACETS = [
  { key: "github_cloud", label: "GitHub" },
  { key: "github_enterprise_server", label: "GitHub Enterprise Server" },
  { key: "gitlab_cloud", label: "GitLab" },
  { key: "gitlab_self_managed", label: "GitLab Self-Managed" },
  { key: "bitbucket_cloud", label: "Bitbucket" },
  { key: "bitbucket_data_center", label: "Bitbucket Data Center" },
  { key: "azure_devops", label: "Azure DevOps" },
];

export const WORKFLOW_STAGE_FACETS = [
  { key: "ide_realtime", label: "Real-Time IDE Feedback" },
  { key: "ai_agent_guardrail_mcp", label: "AI Agent Guardrail (MCP)" },
  { key: "local_cli_precommit", label: "Local CLI / Pre-Commit" },
  { key: "pr_inline_review", label: "PR Inline Review" },
  { key: "merge_gate_blocking", label: "Merge Gate Blocking" },
  { key: "full_repo_scan", label: "Full Repo Scan" },
  { key: "scheduled_continuous_rescan", label: "Scheduled / Continuous Rescan" },
  { key: "runtime_production", label: "Runtime / Production Monitoring" },
];

// `group` sub-divides the tool-page table. The array order is deliberately left
// as it was, since buildTags and the home-page filters read it by position; the
// table groups rows by `group` and keeps this order within each group.
export const DETECTION_FACETS = [
  { key: "sast", label: "SAST", group: "Security" },
  { key: "taint_dataflow_analysis", label: "Taint / Data-Flow Analysis", group: "Security" },
  { key: "secrets_detection", label: "Secrets Detection", group: "Security" },
  { key: "secrets_validation", label: "Secrets Validation", group: "Security" },
  { key: "sca_dependencies", label: "SCA (Dependencies)", group: "Security" },
  { key: "reachability_analysis", label: "Reachability Analysis", group: "Security" },
  { key: "malicious_package_detection", label: "Malicious Package Detection", group: "Security" },
  { key: "license_compliance", label: "License Compliance", group: "Security" },
  { key: "sbom_generation", label: "SBOM Generation", group: "Security" },
  { key: "iac_scanning", label: "IaC Scanning", group: "Security" },
  { key: "container_scanning", label: "Container Scanning", group: "Security" },
  { key: "cloud_posture_cspm", label: "Cloud Posture (CSPM)", group: "Security" },
  { key: "dast_api_scanning", label: "DAST / API Scanning", group: "Security" },
  { key: "code_smells_maintainability", label: "Code Smells & Maintainability", group: "Code quality" },
  { key: "complexity_metrics", label: "Complexity Metrics", group: "Code quality" },
  { key: "duplication_detection", label: "Duplication Detection", group: "Code quality" },
  { key: "dead_unused_code", label: "Dead / Unused Code", group: "Code quality" },
  { key: "test_coverage_tracking", label: "Test Coverage Tracking", group: "Code quality" },
  { key: "diff_new_code_coverage", label: "Diff / New-Code Coverage", group: "Code quality" },
  { key: "architecture_governance", label: "Architecture Governance", group: "Code quality" },
  { key: "technical_debt_quantification", label: "Technical Debt Quantification", group: "Code quality" },
  { key: "behavioral_delivery_analytics", label: "Behavioral Delivery Analytics", group: "Code quality" },
  { key: "ai_logic_bug_detection", label: "AI Logic Bug Detection", group: "AI review & fixes" },
  { key: "pr_summaries_walkthroughs", label: "PR Summaries & Walkthroughs", group: "AI review & fixes" },
  { key: "custom_rule_authoring", label: "Custom Rule Authoring", group: "Rules & repo support" },
  { key: "autofix_suggestions", label: "Autofix Suggestions", group: "AI review & fixes" },
  { key: "autofix_agentic_prs", label: "Autofix via Agentic PRs", group: "AI review & fixes" },
  { key: "ai_triage_false_positive_filtering", label: "AI Triage / False-Positive Filtering", group: "AI review & fixes" },
  { key: "monorepo_support", label: "Monorepo Support", group: "Rules & repo support" },
];

export const AI_CAPABILITY_FACETS = [
  { key: "has_ai_review_engine", label: "AI Review Engine" },
  { key: "byo_model_byok", label: "BYO Model / BYOK" },
  { key: "mcp_server", label: "MCP Server" },
  { key: "ai_usage_governance_inventory", label: "AI Usage Governance" },
  { key: "chat_with_reviewer", label: "Chat With Reviewer" },
  { key: "learns_from_feedback", label: "Learns From Feedback" },
  { key: "code_excluded_from_training", label: "Code Excluded From Training" },
];

export const COMPLIANCE_BOOL_FACETS = [
  { key: "audit_logs", label: "Audit Logs" },
  { key: "sso_saml", label: "SSO / SAML" },
  { key: "rbac", label: "Role-Based Access Control" },
  { key: "compliance_reporting_exports", label: "Compliance Reporting Exports" },
];

export const API_CLI_FACETS = [
  { key: "rest_api", label: "REST API" },
  { key: "cli", label: "CLI" },
  { key: "webhooks", label: "Webhooks" },
];

export const BEST_FIT_BUYER_LABELS = {
  indie: "Indie developers",
  startup: "Startups",
  "mid-market": "Mid-market teams",
  enterprise: "Enterprise",
  regulated: "Regulated industries",
};

const TIER_FALLBACK_LABELS = {
  free: "Free",
  team: "Team",
  business: "Business",
  enterprise: "Enterprise",
};

export const PRICING_MODEL_LABELS = {
  "quote-only": "Quote-based / Enterprise",
  "usage-credits": "Usage-based credits",
  "per-developer-seat": "Per developer seat",
  "per-contributing-developer": "Per contributing developer",
  "per-lines-of-code": "Per lines of code",
};

// Free-text integration/compliance fields are written independently per vendor doc,
// so the same real thing shows up phrased several ways. This is a best-effort merge,
// not a controlled vocabulary — most entries are left as vendors wrote them.
const VALUE_SYNONYMS = {
  "vs code": "VS Code",
  "visual studio code": "VS Code",
  "gitlab ci/cd": "GitLab CI/CD",
  "gitlab ci": "GitLab CI/CD",
  "azure devops pipelines": "Azure Pipelines",
  "azure pipelines": "Azure Pipelines",
  "soc 2 type 2": "SOC 2 Type II",
  "soc 2 type ii": "SOC 2 Type II",
  "jira cloud": "Jira",
  "jira server": "Jira",
  "jira (cloud and server)": "Jira",
  "github issues": "GitHub Issues",
  phpstorm: "PhpStorm",
  travisci: "Travis CI",
  "teamcity ci": "TeamCity",
  "jetbrains teamcity": "TeamCity",
  "jenkins/hudson": "Jenkins",
  "atlassian bamboo": "Bamboo",
};

function normalizeListValue(raw) {
  const cut = raw.split(/[(;]/)[0].trim();
  const key = cut.toLowerCase();
  return VALUE_SYNONYMS[key] || cut;
}

function isSupportedValue(v) {
  return v === "yes" || v === "partial";
}

function isSupported(facet) {
  return isSupportedValue(facet?.v);
}

function hasTrial(trial) {
  if (!trial) return false;
  if (typeof trial === "object") return isSupportedValue(trial.v);
  const t = String(trial).toLowerCase();
  if (t === "unknown") return false;
  if (t.includes("no trial") || t.includes("no permanent free trial")) return false;
  return true;
}

export function tierLabelFor(cell) {
  if (!cell || typeof cell !== "object") return null;
  if (cell.tier_label) return cell.tier_label;
  if (cell.tier_note) return cell.tier_note.charAt(0).toUpperCase() + cell.tier_note.slice(1);
  if (!cell.tier || cell.tier === "n/a" || cell.tier === "free" || cell.tier === "unknown") return null;
  return TIER_FALLBACK_LABELS[cell.tier] || cell.tier;
}

function formatPrice(commercial) {
  const price = commercial?.entry_paid_price;
  if (typeof price === "string" && price.toLowerCase() !== "unknown") {
    const m = price.match(/\$[\d,.]+\s*\/\s*[a-zA-Z-]+\s*\/\s*(month|mo)\b/i);
    if (m) return m[0].replace(/\/\s*month/i, "/mo");
  }
  if (commercial?.free_tier?.v === "yes") return "Free tier available";
  const models = commercial?.pricing_models || [];
  if (models.length === 1 && models[0] === "quote-only") return "Quote-based pricing";
  return "Contact for pricing";
}

function boolMap(source, defs) {
  const out = {};
  for (const f of defs) out[f.key] = isSupported(source?.[f.key]);
  return out;
}

// Alongside the booleans above, keep the raw yes/partial/no/unknown value.
// A boolean cannot tell a first-class implementation apart from one that is
// narrow, tier-gated or kept alive for existing customers only, and generated
// copy that counts them together overstates what a tool actually does.
function valueMap(source, defs) {
  const out = {};
  for (const f of defs) out[f.key] = source?.[f.key]?.v || "unknown";
  return out;
}

function normalizedList(list) {
  const seen = new Map();
  for (const v of list || []) {
    const norm = normalizeListValue(v);
    if (!seen.has(norm)) seen.set(norm, true);
  }
  return Array.from(seen.keys());
}

function buildTags(tool) {
  const tags = [];
  if (isSupported(tool.ai_posture?.has_ai_review_engine)) tags.push("AI Code Review");
  for (const f of DETECTION_FACETS.slice(0, 7)) {
    if (isSupported(tool.detection?.[f.key])) tags.push(f.label);
  }
  if (isSupported(tool.deployment?.self_hosted)) tags.push("Self-Hosted");
  return tags.slice(0, 3);
}

export function getTools() {
  return raw.tools.map((tool) => {
    const deployment = {
      cloud: isSupported(tool.deployment?.saas_cloud),
      selfHosted: isSupported(tool.deployment?.self_hosted),
      airGapped: isSupported(tool.deployment?.air_gapped),
    };
    const gitProviders = {};
    for (const f of GIT_PROVIDER_FACETS) gitProviders[f.key] = isSupportedValue(tool.integrations?.git_providers?.[f.key]);

    const apiCli = {};
    apiCli.rest_api = isSupportedValue(tool.integrations?.api_cli?.rest_api);
    apiCli.cli = isSupportedValue(tool.integrations?.api_cli?.cli);
    apiCli.webhooks = isSupportedValue(tool.integrations?.api_cli?.webhooks);

    const commercial = tool.commercial || {};

    return {
      slug: tool.slug,
      name: tool.name,
      vendor: tool.vendor,
      description: tool.one_liner,
      category: tool.primary_job,
      categoryLabel: CATEGORY_LABELS[tool.primary_job] || tool.primary_job,
      languages: tool.languages?.list || [],
      initial: tool.name.charAt(0).toUpperCase(),

      deployment,
      gitProviders,
      workflowStages: boolMap(tool.workflow_stages, WORKFLOW_STAGE_FACETS),
      detection: boolMap(tool.detection, DETECTION_FACETS),
      aiCapabilities: boolMap(tool.ai_posture, AI_CAPABILITY_FACETS),
      aiModels: tool.ai_posture?.models_used || [],
      complianceBool: boolMap(tool.compliance, COMPLIANCE_BOOL_FACETS),
      certifications: normalizedList(tool.compliance?.certifications),
      apiCli,
      ides: normalizedList(tool.integrations?.ides),
      ciSystems: normalizedList(tool.integrations?.ci_systems),
      issueTrackers: normalizedList(tool.integrations?.issue_trackers),
      chatNotifications: normalizedList(tool.integrations?.chat_notifications),

      pricingModels: commercial.pricing_models || [],
      freeTier: commercial.free_tier?.v === "yes" || commercial.free_tier?.v === "partial",
      freeForOpenSource: isSupported(commercial.free_for_open_source),
      enterpriseQuoteOnly: isSupported(commercial.enterprise_quote_only),
      hasTrial: hasTrial(commercial.trial),
      priceLabel: formatPrice(commercial),

      tags: buildTags(tool),
      lastUpdated: findLatestVerifiedOn(tool) || raw.verified_as_of,

      values: {
        detection: valueMap(tool.detection, DETECTION_FACETS),
        workflow: valueMap(tool.workflow_stages, WORKFLOW_STAGE_FACETS),
        ai: valueMap(tool.ai_posture, AI_CAPABILITY_FACETS),
        compliance: valueMap(tool.compliance, COMPLIANCE_BOOL_FACETS),
        deployment: {
          cloud: tool.deployment?.saas_cloud?.v || "unknown",
          selfHosted: tool.deployment?.self_hosted?.v || "unknown",
          airGapped: tool.deployment?.air_gapped?.v || "unknown",
        },
        apiCli: {
          rest_api: tool.integrations?.api_cli?.rest_api || "unknown",
          cli: tool.integrations?.api_cli?.cli || "unknown",
          webhooks: tool.integrations?.api_cli?.webhooks || "unknown",
        },
        gitProviders: Object.fromEntries(
          GIT_PROVIDER_FACETS.map((f) => [f.key, tool.integrations?.git_providers?.[f.key] || "unknown"])
        ),
      },
    };
  });
}

function countBoolGroup(tools, accessor, defs) {
  const counts = {};
  for (const t of tools) {
    const obj = accessor(t);
    for (const f of defs) if (obj[f.key]) counts[f.key] = (counts[f.key] || 0) + 1;
  }
  return defs
    .map((f) => ({ key: f.key, label: f.label, count: counts[f.key] || 0 }))
    .sort((a, b) => b.count - a.count);
}

function countListGroup(tools, accessor) {
  const counts = {};
  for (const t of tools) {
    for (const v of accessor(t)) counts[v] = (counts[v] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

export function getFacetOptions(tools) {
  const categoryCount = {};
  for (const t of tools) categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  const categories = Object.entries(categoryCount)
    .map(([value, count]) => ({ key: value, label: CATEGORY_LABELS[value] || value, count }))
    .sort((a, b) => b.count - a.count);

  const deployment = [
    { key: "cloud", label: "Cloud", count: tools.filter((t) => t.deployment.cloud).length },
    { key: "selfHosted", label: "Self-Hosted / On-Prem", count: tools.filter((t) => t.deployment.selfHosted).length },
    { key: "airGapped", label: "Air-Gapped", count: tools.filter((t) => t.deployment.airGapped).length },
  ];

  const gitProviders = countBoolGroup(tools, (t) => t.gitProviders, GIT_PROVIDER_FACETS);
  const workflowStages = countBoolGroup(tools, (t) => t.workflowStages, WORKFLOW_STAGE_FACETS);
  const detectionTypes = countBoolGroup(tools, (t) => t.detection, DETECTION_FACETS);
  const aiCapabilities = countBoolGroup(tools, (t) => t.aiCapabilities, AI_CAPABILITY_FACETS);
  const complianceBool = countBoolGroup(tools, (t) => t.complianceBool, COMPLIANCE_BOOL_FACETS);
  const apiCli = countBoolGroup(tools, (t) => t.apiCli, API_CLI_FACETS);

  const languages = countListGroup(tools, (t) => t.languages);
  const certifications = countListGroup(tools, (t) => t.certifications);
  const ides = countListGroup(tools, (t) => t.ides);
  const ciSystems = countListGroup(tools, (t) => t.ciSystems);
  const issueTrackers = countListGroup(tools, (t) => t.issueTrackers);
  const chatNotifications = countListGroup(tools, (t) => t.chatNotifications);

  const pricingModelCount = {};
  for (const t of tools) for (const pm of t.pricingModels) pricingModelCount[pm] = (pricingModelCount[pm] || 0) + 1;
  const pricingModels = Object.entries(pricingModelCount)
    .map(([value, count]) => ({ key: value, label: PRICING_MODEL_LABELS[value] || value, count }))
    .sort((a, b) => b.count - a.count);

  const pricingBool = [
    { key: "freeTier", label: "Free Tier Available", count: tools.filter((t) => t.freeTier).length },
    { key: "freeForOpenSource", label: "Free for Open Source", count: tools.filter((t) => t.freeForOpenSource).length },
    { key: "hasTrial", label: "Free Trial Available", count: tools.filter((t) => t.hasTrial).length },
    { key: "enterpriseQuoteOnly", label: "Enterprise Plan Is Quote-Only", count: tools.filter((t) => t.enterpriseQuoteOnly).length },
  ];

  return {
    categories,
    deployment,
    gitProviders,
    workflowStages,
    detectionTypes,
    aiCapabilities,
    complianceBool,
    apiCli,
    languages,
    certifications,
    ides,
    ciSystems,
    issueTrackers,
    chatNotifications,
    pricingModels,
    pricingBool,
  };
}

// Full record for a single tool's detail page — keeps the per-facet notes and
// tier gating that the card/filter view-model above reduces to booleans.
export function getToolDetail(slug) {
  const tool = raw.tools.find((t) => t.slug === slug);
  if (!tool) return null;
  return {
    ...tool,
    categoryLabel: CATEGORY_LABELS[tool.primary_job] || tool.primary_job,
    priceLabel: formatPrice(tool.commercial),
    lastUpdated: findLatestVerifiedOn(tool) || raw.verified_as_of,
    tags: buildTags(tool),
  };
}

export function getAllSlugs() {
  return raw.tools.map((t) => t.slug);
}

export function getSimilarTools(tool, allTools, limit = 4) {
  return allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.primary_job)
    .slice(0, limit);
}
