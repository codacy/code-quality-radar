// How each glossary term reads inside generated headings and sentences.
// Term names vary in shape (acronyms, plurals, adjectives, verb phrases), so
// dropping the bare name into a fixed template produces lines such as "What
// is Audit Logs?" or "Top 19 CLI tools". Each entry instead says:
//
//   question  the page H1, e.g. "What are audit logs?"
//   with      what follows "…code review tools" in a list heading, e.g.
//             "with a CLI" or "that can run air-gapped"
//   does      optional: the verb phrase for "How many tools …?". Derived from
//             `with` when omitted: "with X" becomes "offer X", "that X" becomes "X".
//   tools     optional: a short noun for list headings, used only where the
//             capability names a kind of tool ("SAST tools", "DAST tools"). Terms
//             without it get the long form, so "CLI" never reads as "CLI tools".
//   plural, singular   category terms only, e.g. "code security platforms"
//   notSameAs optional: terms readers confuse with this one, each with the difference
//
// Keyed by slug, so renaming a term never breaks its phrasing. A term with no
// entry falls back to its bare name and the build logs a warning.

export const PHRASING = {
  // ------------------------------------------------------------ tool categories
  "appsec-platform": { question: "What is a code security platform?", singular: "code security platform", plural: "code security platforms" },
  "quality-platform": { question: "What is a code quality platform?", singular: "code quality platform", plural: "code quality platforms" },
  "pr-review-tool": { question: "What is a PR review tool?", singular: "PR review tool", plural: "PR review tools" },
  "agent-coding-tool": { question: "What is an AI coding agent?", singular: "AI coding agent", plural: "AI coding agents" },

  // ---------------------------------------------------------- security scanning
  sast: { question: "What is SAST?", with: "with SAST", tools: "SAST tools" },
  "taint-dataflow-analysis": { question: "What is taint analysis?", with: "with taint analysis" },
  "secrets-detection": { question: "What is secrets detection?", with: "with secrets detection", tools: "secrets detection tools" },
  "secrets-validation": { question: "What is secrets validation?", with: "with secrets validation" },
  sca: { question: "What is SCA?", with: "with SCA", tools: "SCA tools" },
  "reachability-analysis": { question: "What is reachability analysis?", with: "with reachability analysis" },
  "malicious-package-detection": { question: "What is malicious package detection?", with: "with malicious package detection", tools: "malicious package detection tools" },
  "license-compliance": { question: "What is license compliance?", with: "with license compliance checks", tools: "license compliance tools" },
  "sbom-generation": { question: "What is SBOM generation?", with: "with SBOM generation", tools: "SBOM generation tools" },
  "iac-scanning": { question: "What is IaC scanning?", with: "with IaC scanning", tools: "IaC scanning tools" },
  "container-scanning": { question: "What is container scanning?", with: "with container scanning", tools: "container scanning tools" },
  cspm: { question: "What is CSPM?", with: "with CSPM" },
  dast: { question: "What is DAST?", with: "with DAST", tools: "DAST tools" },

  // ---------------------------------------------------------------- code quality
  "code-smells": { question: "What is code smell detection?", with: "with code smell detection", tools: "code smell detection tools" },
  "complexity-metrics": { question: "What are complexity metrics?", with: "with complexity metrics" },
  "duplication-detection": { question: "What is duplication detection?", with: "with duplication detection", tools: "duplication detection tools" },
  "dead-code": { question: "What is dead code detection?", with: "with dead code detection", tools: "dead code detection tools" },
  "test-coverage-tracking": { question: "What is test coverage tracking?", with: "with test coverage tracking", tools: "test coverage tools" },
  "diff-coverage": { question: "What is diff coverage?", with: "with diff coverage" },
  "architecture-governance": { question: "What is architecture governance?", with: "with architecture governance" },
  "technical-debt-quantification": { question: "What is technical debt quantification?", with: "that quantify technical debt" },
  "behavioral-code-analysis": { question: "What is behavioral code analysis?", with: "with behavioral code analysis" },

  // ------------------------------------------------------------ AI review & fixes
  "ai-logic-bug-detection": { question: "What is AI logic bug detection?", with: "with AI logic bug detection" },
  "pr-summaries": { question: "What are PR summaries and walkthroughs?", with: "with PR summaries and walkthroughs" },
  "autofix-suggestions": { question: "What are autofix suggestions?", with: "with autofix suggestions" },
  "agentic-autofix-prs": { question: "What are autofix pull requests?", with: "that open autofix pull requests" },
  "ai-triage": { question: "What is AI triage?", with: "with AI triage" },

  // ------------------------------------------------------- rules & repo support
  "custom-rule-authoring": { question: "What is custom rule authoring?", with: "with custom rules", does: "let you write custom rules" },
  "monorepo-support": { question: "What is monorepo support?", with: "with monorepo support" },

  // ----------------------------------------------------------- developer workflow
  "ide-realtime-feedback": { question: "What is real-time IDE feedback?", with: "with real-time IDE feedback" },
  "ai-agent-guardrails": {
    question: "What are AI agent guardrails?",
    with: "with AI agent guardrails",
    notSameAs: [
      {
        slug: "mcp-server",
        text: "An MCP server is one way to connect an agent to the tool, and it can also just serve findings on request. Guardrails are about checking the agent's code while it works, through an MCP server, agent hooks or a plugin.",
      },
    ],
  },
  "local-cli": {
    question: "What is local analysis?",
    with: "that run analysis locally",
    notSameAs: [
      {
        slug: "cli",
        text: "A CLI is any command-line client, including one that only starts a scan in the vendor's cloud. Local analysis means the scan itself runs on your machine.",
      },
    ],
  },
  "pr-inline-review": { question: "What are inline PR comments?", with: "that post inline PR comments" },
  "merge-gate": { question: "What are quality gates?", with: "with quality gates", does: "can block a merge with a quality gate" },
  "full-repo-scan": { question: "What is a full repo scan?", with: "with full repo scans", does: "can scan a full repository" },
  "continuous-rescanning": { question: "What are scheduled rescans?", with: "with scheduled rescans" },
  "runtime-monitoring": { question: "What is runtime monitoring?", with: "with runtime monitoring" },

  // -------------------------------------------------------------- AI capabilities
  "ai-code-review": { question: "What is AI code review?", with: "with AI code review", tools: "AI code review tools" },
  "byo-model": { question: "What does bring your own model mean?", with: "that let you bring your own model" },
  "mcp-server": {
    question: "What is an MCP server?",
    with: "with an MCP server",
    notSameAs: [
      {
        slug: "ai-agent-guardrails",
        text: "AI agent guardrails are about checking an agent's code while it works, which some tools do through hooks or a plugin instead of MCP. An MCP server can also simply let an agent read findings or start a scan.",
      },
    ],
  },
  "ai-usage-governance": { question: "What is AI code governance?", with: "with AI code governance" },
  "chat-with-reviewer": { question: "What is conversational review?", with: "with conversational review" },
  "feedback-learning": { question: "What is learning from feedback?", with: "that learn from feedback" },
  "code-excluded-from-training": { question: "What does “code excluded from training” mean?", with: "that exclude your code from training" },

  // -------------------------------------------------------- security & compliance
  "audit-logs": { question: "What are audit logs?", with: "with audit logs" },
  "sso-saml": { question: "What is SAML SSO?", with: "with SAML SSO" },
  rbac: { question: "What is role-based access control?", with: "with role-based access control" },
  "compliance-reporting": { question: "What is compliance reporting?", with: "with compliance reporting" },

  // ------------------------------------------------------------------ deployment
  "cloud-saas": { question: "What is cloud (SaaS) deployment?", with: "offered as a cloud (SaaS) service", does: "are offered as a cloud (SaaS) service" },
  "self-hosted": { question: "What is self-hosted (on-premises) deployment?", with: "that can be self-hosted" },
  "air-gapped": { question: "What is air-gapped (offline) deployment?", with: "that can run air-gapped" },

  // ---------------------------------------------------------- automation & access
  "rest-api": { question: "What is a REST API?", with: "with a REST API" },
  cli: {
    question: "What is a CLI?",
    with: "with a CLI",
    notSameAs: [
      {
        slug: "local-cli",
        text: "Local analysis is about where the scan runs, on a developer's machine before code is pushed. A CLI may only start a scan in the vendor's cloud or fetch results.",
      },
    ],
  },
  webhooks: { question: "What are webhooks?", with: "with webhooks" },
};

const warned = new Set();
function entryFor(term) {
  const entry = PHRASING[term.slug];
  if (!entry && !warned.has(term.slug)) {
    warned.add(term.slug);
    console.warn(`[glossary-phrasing] no phrasing for "${term.slug}", so its headings use the bare term name.`);
  }
  return entry || {};
}

export const isCategoryTerm = (term) => term.source?.type === "category";

/** The page H1, e.g. "What are audit logs?". */
export function questionFor(term) {
  return entryFor(term).question ?? `What is ${term.term}?`;
}

/** Tail of a list heading, e.g. "with a CLI" in "19 code quality, security and code review tools with a CLI". */
export function withPhraseFor(term) {
  return entryFor(term).with ?? `with ${term.term}`;
}

/** Verb phrase for "How many tools in the directory …?", e.g. "offer a CLI" or "can run air-gapped". */
export function doesPhraseFor(term) {
  const entry = entryFor(term);
  if (entry.does) return entry.does;
  const w = withPhraseFor(term);
  if (w.startsWith("with ")) return `offer ${w.slice(5)}`;
  if (w.startsWith("that ")) return w.slice(5);
  return w;
}

/** Short list-heading noun, e.g. "SAST tools", or null where the long form is clearer. */
export function toolsNounFor(term) {
  return entryFor(term).tools ?? null;
}

/** Category terms: "code security platforms". */
export function pluralFor(term) {
  return entryFor(term).plural ?? `${term.term.toLowerCase()}s`;
}

/** Category terms: "code security platform". */
export function singularFor(term) {
  return entryFor(term).singular ?? term.term.toLowerCase();
}

/** Terms readers confuse with this one, as [{ slug, text }]. */
export function notSameAsFor(term) {
  return entryFor(term).notSameAs ?? [];
}
