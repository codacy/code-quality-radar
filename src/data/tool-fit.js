// "Who it's for" on each tool page, and the answer to its "When should you
// choose X?" FAQ, from one source so the two never drift apart:
//
//   bestFor        completes "Best for …": the team and situation the tool suits
//   goodFitIf      2 to 3 buyer situations where it fits
//   alternativesIf 2 to 3 situations where another tool may fit better
//
// Editorial copy written from each tool's documented strengths and limitations
// and its capability data. It shows both sides and avoids put-downs; the detail
// stays in the capability tables. Re-check an entry whenever its tool's data
// changes.
export const TOOL_FIT = {
  aikido: {
    bestFor: "teams that want code, cloud, container and runtime security from one vendor, starting on a free plan",
    goodFitIf: [
      "You want SCA, SAST, secrets, license, IaC and malware scanning on the free plan",
      "You also need cloud posture, container scanning and runtime protection in the same product",
      "You want fixes and triage handled for you, with AI AutoFix pull requests and automatic triage",
    ],
    alternativesIf: [
      "You need complexity or duplication metrics",
      "You need fully offline use without an add-on, since that needs the separately priced Aikido Machine",
    ],
  },
  "chatgpt-codex": {
    bestFor: "teams already using OpenAI's coding agent that want code review and security review in the same product",
    goodFitIf: [
      "Your pull requests are on GitHub",
      "You want security findings validated in an isolated environment before you see them, with evidence and an attack path",
      "You want review rules kept in version-controlled AGENTS.md files",
    ],
    alternativesIf: [
      "You need pull request review on GitLab, Bitbucket or Azure DevOps",
      "You need dependency, secrets or IaC scanning",
      "You need predictable review costs, since usage is billed from shared credits",
    ],
  },
  checkmarx: {
    bestFor: "enterprises and regulated organizations that want many scan types from one vendor, in one risk view",
    goodFitIf: [
      "You want SAST, SCA, IaC, container, API, secrets and DAST scanning from a single vendor",
      "You need supply-chain policies that cover typosquatting, account takeover and similar attacks",
      "You want to block builds on policy conditions such as EPSS score, malware or license",
    ],
    alternativesIf: [
      "You want published, self-serve pricing",
      "You need reachability analysis for languages beyond Python, Java, JavaScript and C#",
    ],
  },
  "claude-code": {
    bestFor: "teams that write code with Claude and want it reviewed while it is written, before a pull request exists",
    goodFitIf: [
      "Your developers already work in Claude Code",
      "You want findings checked by verifier agents before they are reported",
      "You want review rules written in plain language in a REVIEW.md file",
    ],
    alternativesIf: [
      "You need review results to block merges without extra CI work",
      "Your code is on Bitbucket or Azure DevOps",
      "You need dependency scanning",
    ],
  },
  codacy: {
    bestFor: "teams that want AI code review, code quality and code security from one configuration, without setting up CI",
    goodFitIf: [
      "You want quality, security, coverage and AI review results from one setup across 40+ languages",
      "Your developers use AI coding agents and you want free IDE guardrails for the code they write",
      "You want pricing per developer, with no scan or line-of-code limits",
    ],
    alternativesIf: [
      "You must self-host or run air-gapped",
      "Your code is in Azure DevOps Repos",
      "You need SSO, audit logs or SBOM export on a self-serve plan",
    ],
  },
  codeant: {
    bestFor: "teams that want AI pull request review and security scanning in one product, across all the major git platforms",
    goodFitIf: [
      "You want AI review, SAST, SCA, secrets, IaC and multi-cloud CSPM in one product",
      "You want the same checks in the IDE, in git hooks and on the pull request",
      "Your code is on GitHub, GitLab, Bitbucket or Azure DevOps, including their self-hosted editions",
    ],
    alternativesIf: [
      "You need SSO without moving to the Enterprise plan",
      "You need published installation and sizing guides for on-premises or air-gapped deployment",
      "You need a published list of supported languages for each capability",
    ],
  },
  coderabbit: {
    bestFor: "teams that want AI pull request review backed by deterministic linters and SAST, on any major git platform",
    goodFitIf: [
      "You want 57 configurable linters and SAST tools run alongside the AI review, skipping any you already run in CI",
      "You want review in the IDE, the CLI and Slack as well as on the pull request",
      "Your team uses AI coding agents such as Claude Code, Codex or Cursor and wants review in the same loop",
    ],
    alternativesIf: [
      "You need full pull request reviews on a free plan",
      "You need high review volume per developer, since reviews are rate-limited per hour",
      "You need security scanning without a paid add-on",
    ],
  },
  codescene: {
    bestFor: "teams with large, long-lived codebases that want to find where technical debt costs the most",
    goodFitIf: [
      "You want hotspots, change coupling and knowledge risks drawn from git history",
      "You need to explain technical debt in business terms, such as maintenance cost and refactoring payoff",
      "You want AI coding agents held to a maintainability target through a local MCP server",
    ],
    alternativesIf: [
      "You need security scanning of any kind",
      "Your repositories don't have much git history yet",
      "You need audit logs",
    ],
  },
  corgea: {
    bestFor: "teams whose main security concern is business-logic and auth flaws, starting on a free plan",
    goodFitIf: [
      "You want business-logic and auth vulnerability detection included from the free plan",
      "You need PII and PHI scanning alongside secrets detection",
      "Your developers use AI coding agents and you want a security checkpoint for them through MCP",
    ],
    alternativesIf: [
      "You need code quality features such as coverage or technical debt tracking",
      "You need cloud posture (CSPM) scanning",
      "You need real-time findings in the IDE as you type",
    ],
  },
  "cursor-bugbot": {
    bestFor: "teams that already use Cursor and want review, fixes and merges handled in the same product",
    goodFitIf: [
      "Your developers work in the Cursor editor",
      "You want findings fixed by a cloud agent that pushes a fix branch",
      "You want layered team and repository rules, with an audit of which ones applied",
    ],
    alternativesIf: [
      "You need an on-premises deployment",
      "You need dependency, secrets or IaC scanning",
      "You need findings to block merges by default",
    ],
  },
  deepsource: {
    bestFor: "teams that want code quality and dependency security with fixes attached, without changing their CI",
    goodFitIf: [
      "You want reachability analysis to show whether a vulnerable dependency is actually called",
      "You want Autofix pull requests for both code issues and dependency upgrades",
      "You want to turn it on without YAML or CI changes",
    ],
    alternativesIf: [
      "You need predictable costs, since AI review and dependency scanning are billed by usage",
      "Your code is on a self-hosted git platform and you don't want to run DeepSource Enterprise Server",
    ],
  },
  "gemini-code-assist": {
    bestFor: "enterprises already on Google Cloud for which certifications and data handling decide the shortlist",
    goodFitIf: [
      "You need a broad certification set, including ISO 27001, 27017, 27018 and 27701 and SOC 1, 2 and 3",
      "You want a commitment that your code isn't used for training without permission",
      "You need network isolation such as VPC Service Controls and Private Google Access",
    ],
    alternativesIf: [
      "You want to sign up self-serve, since new subscriptions now go through Google Cloud sales",
      "You need review findings to block a merge",
      "You need IaC, container or test coverage capabilities",
    ],
  },
  "github-advanced-security": {
    bestFor: "teams whose code lives on GitHub and who want security scanning where developers already work",
    goodFitIf: [
      "Your code is on GitHub",
      "You want CodeQL, secret scanning and push protection in the same pull requests, rulesets and Actions",
      "You want Copilot Autofix without a Copilot subscription",
    ],
    alternativesIf: [
      "Your code is on GitLab, Bitbucket or Azure DevOps",
      "You need DAST, container image scanning or dependency reachability",
      "You need private-repository scanning without buying the paid add-ons",
    ],
  },
  greptile: {
    bestFor: "teams that want AI review with whole-repository context, not just the diff",
    goodFitIf: [
      "You want review informed by a code graph and a self-updating knowledge base",
      "You want reviews that write and run tests and browser flows, with logs and screenshots attached (T-Rex, in beta)",
      "You want per-directory configuration with clear precedence rules",
    ],
    alternativesIf: [
      "Your code is on Azure DevOps",
      "You need dependency, IaC, container or dedicated secrets scanning",
      "You want flat per-seat costs, since reviews draw on credits with overage billed per credit",
    ],
  },
  qlty: {
    bestFor: "GitHub teams that want one configuration for linting, security scanning and coverage, with the same checks locally and in CI",
    goodFitIf: [
      "Your code is on GitHub",
      "You want the same checks on a developer's machine, in git hooks and in CI",
      "You want published self-serve pricing on every plan",
    ],
    alternativesIf: [
      "Your code is on GitLab, Bitbucket or Azure DevOps",
      "You need an AI reviewer or PR walkthroughs",
      "You need SAML SSO",
    ],
  },
  qodo: {
    bestFor: "teams that want AI review that checks more than code style, across all the major git platforms",
    goodFitIf: [
      "You want separate review agents for bugs, breaking changes, ticket compliance and duplicated logic",
      "You keep rules in files like AGENTS.md or CLAUDE.md and want review to use them",
      "You need cloud, single-tenant or air-gapped deployment",
    ],
    alternativesIf: [
      "You need dependency, IaC, container or DAST scanning",
      "You need native merge blocking",
      "You need predictable review costs, since billing is credit-based",
    ],
  },
  semgrep: {
    bestFor: "security teams that want to write their own rules, and teams that want reachability-based dependency scanning",
    goodFitIf: [
      "You want an open-source engine that scans without a build step",
      "You want to write rules in YAML that look like the code they match",
      "You want secrets validated against 630+ credential types without sending tokens to the vendor",
    ],
    alternativesIf: [
      "You need container scanning, CSPM or DAST",
      "You want code, dependency and secrets scanning under a single Teams license",
      "You need code quality checks",
    ],
  },
  snyk: {
    bestFor: "teams for which dependency risk is the main problem and fixes matter as much as alerts",
    goodFitIf: [
      "You want fix and upgrade pull requests with a breakage-risk estimate",
      "You want code, dependency, container, IaC, secrets and DAST scanning in one model",
      "You need auditor-ready compliance reports such as PCI DSS, ISO 27001 and OWASP Top 10",
    ],
    alternativesIf: [
      "You need API access or SSO on the Team plan",
      "You need code quality metrics such as complexity, duplication or coverage",
      "You need SAST that runs entirely on-premises",
    ],
  },
  sonarqube: {
    bestFor: "teams that need broad language coverage, including legacy languages, and a choice between SaaS and self-hosting",
    goodFitIf: [
      "You need 40+ languages, including COBOL, ABAP and other mainframe languages on Enterprise",
      "You want to choose between SaaS and a self-managed server, or start with the free Community Build",
      "You want architecture rules that track structural debt in large codebases",
    ],
    alternativesIf: [
      "You want SCA and advanced SAST in the base plan",
      "You need more than 50,000 lines of private code on the free plan",
    ],
  },
  veracode: {
    bestFor: "enterprises and regulated organizations with legacy code that need policy-driven security testing",
    goodFitIf: [
      "Your code includes legacy languages such as COBOL, RPG, PL/SQL or Visual Basic 6",
      "You need policies that gate releases, including PCI templates",
      "You want SAST, SCA, DAST and manual penetration testing from one vendor",
    ],
    alternativesIf: [
      "Your code is on GitHub Enterprise Server or GitLab Self-Managed",
      "You want published pricing or a free tier",
    ],
  },
};
