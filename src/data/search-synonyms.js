// Other words people type for the same thing. Search treats each one as if
// the name itself had been typed. Nothing here is shown on the page.
//
// Every synonym must name the same thing, never a neighboring one. On-prem is
// self-hosted, but it is not air-gapped. Bitbucket Server is not Bitbucket
// Data Center. A synonym also must not contain another capability's name,
// or searching that name pulls in the wrong tools: "self-hosted LLM" under
// Bring Your Own Model would make every BYOM tool match "self-hosted".
//
// Matching already ignores case, hyphens, spaces and word order, and finds
// words inside longer ones, so "onprem", "on-premises" and "postgres" need no
// entry here. Only add words the name and definition do not already contain.

// Keyed by glossary slug. Feeds the glossary search and the docs sidebar, and,
// through each term's facet, the home-page tool search.
export const TERM_ALIASES = {
  // ------------------------------------------------------------ tool categories
  "appsec-platform": ["AppSec platform", "application security platform"],
  "pr-review-tool": ["pull request review", "merge request review", "MR review", "review bot"],
  "agent-coding-tool": ["AI coding assistant", "agentic coding"],

  // ---------------------------------------------------------- security scanning
  sast: ["static application security testing", "static analysis"],
  "taint-dataflow-analysis": ["taint tracking", "dataflow analysis", "source to sink"],
  "secrets-detection": ["secret scanning", "credential scanning", "hardcoded secrets", "leaked credentials", "API key detection"],
  "secrets-validation": ["secret verification", "verified secrets"],
  sca: ["software composition analysis", "dependency scanning", "vulnerable dependencies", "open source vulnerabilities"],
  "reachability-analysis": ["reachable vulnerabilities"],
  "malicious-package-detection": ["malware packages", "malicious dependencies", "typosquatting"],
  "license-compliance": ["license scanning", "open source licenses", "copyleft"],
  "sbom-generation": ["software bill of materials", "CycloneDX", "SPDX"],
  "iac-scanning": ["infrastructure as code", "Terraform scanning", "CloudFormation scanning"],
  "container-scanning": ["container image scanning", "Docker image scanning"],
  cspm: ["cloud security posture management", "cloud misconfiguration"],
  dast: ["dynamic application security testing", "dynamic analysis", "API security testing"],

  // --------------------------------------------------------------- code quality
  "code-smells": ["maintainability", "linting", "linter", "static analysis"],
  "complexity-metrics": ["cyclomatic complexity", "cognitive complexity"],
  "duplication-detection": ["duplicate code", "copy paste detection", "code clones"],
  "dead-code": ["unused code", "unreachable code"],
  "test-coverage-tracking": ["code coverage", "coverage reports"],
  "diff-coverage": ["new code coverage", "patch coverage", "changed lines coverage"],
  "architecture-governance": ["architecture rules", "layering rules", "module boundaries"],
  "technical-debt-quantification": ["tech debt"],
  "behavioral-code-analysis": ["hotspots", "git history analysis", "change coupling", "bus factor"],

  // ---------------------------------------------------------- AI review & fixes
  "ai-logic-bug-detection": ["logic bugs", "business logic flaws"],
  "pr-summaries": ["pull request summary", "merge request summary", "MR summary", "PR description"],
  "custom-rule-authoring": ["custom rules", "custom checks", "custom queries"],
  "autofix-suggestions": ["auto fix", "fix suggestions", "auto remediation"],
  "agentic-autofix-prs": ["fix pull requests", "fix merge requests", "remediation PRs"],
  "ai-triage": ["noise reduction", "auto triage"],
  "monorepo-support": ["mono repo"],

  // --------------------------------------------------------- developer workflow
  "ide-realtime-feedback": ["IDE plugin", "IDE extension", "editor plugin"],
  "ai-agent-guardrails": ["agent guardrails", "agent hooks"],
  "local-cli": ["pre-commit hook", "git hook", "local scan"],
  "pr-inline-review": ["PR comments", "merge request comments", "MR comments", "review comments"],
  "merge-gate": ["merge check", "status check", "required check", "block merges"],
  "full-repo-scan": ["full scan", "repository scan", "baseline scan"],
  "continuous-rescanning": ["scheduled scans", "nightly scans", "periodic scans"],
  "runtime-monitoring": ["production monitoring"],

  // ------------------------------------------------------------ AI capabilities
  "ai-code-review": ["AI reviewer", "LLM code review", "AI PR review"],
  "byo-model": ["BYOM", "BYOK", "bring your own key", "own LLM", "custom model", "Azure OpenAI", "Amazon Bedrock"],
  "mcp-server": ["model context protocol"],
  "ai-usage-governance": ["AI-generated code governance", "AI-generated code tracking", "AI code policy"],
  "chat-with-reviewer": ["chat with the reviewer", "interactive review", "reply to the reviewer"],
  "feedback-learning": ["learns from feedback", "learnings", "review memory"],
  "code-excluded-from-training": ["no training on code", "not used for training", "training opt-out"],

  // ------------------------------------------------------ security & compliance
  "audit-logs": ["audit trail", "activity log"],
  "sso-saml": ["single sign-on", "Okta", "Entra ID", "Azure AD"],
  rbac: ["permissions", "user roles"],
  "compliance-reporting": ["compliance reports", "audit reports", "OWASP report", "PDF report", "CSV export"],

  // ----------------------------------------------------------------- deployment
  "cloud-saas": ["cloud hosted", "vendor hosted"],
  "self-hosted": ["on-premises", "self-managed", "private cloud", "VPC", "your own infrastructure", "customer hosted"],
  "air-gapped": ["disconnected", "no internet access", "isolated network", "offline install"],

  // -------------------------------------------------------- automation & access
  "rest-api": ["public API"],
  cli: ["command line", "command-line interface", "terminal"],
  webhooks: ["event callbacks"],
};

// Keyed by a label exactly as the site shows it, case aside: tool names, git
// platforms, pricing, languages, IDEs, CI systems, trackers, chat tools and
// certifications.
export const LABEL_ALIASES = {
  // ----------------------------------------------------------------- tools
  "checkmarx one": ["CxOne", "CxSAST"],
  "github advanced security": ["GHAS", "CodeQL", "GitHub Code Security", "GitHub Secret Protection"],
  qlty: ["Code Climate"],
  qodo: ["CodiumAI", "PR-Agent", "Qodo Merge"],
  snyk: ["DeepCode", "Snyk Code", "Snyk Open Source"],
  sonarqube: ["SonarCloud", "SonarLint"],

  // ---------------------------------------------------------- git platforms
  github: ["GitHub.com"],
  "github enterprise server": ["GHES"],
  gitlab: ["GitLab.com"],
  "gitlab self-managed": ["self-managed GitLab"],
  bitbucket: ["Bitbucket Cloud"],
  "bitbucket data center": ["BBDC"],
  "azure devops": ["ADO", "Azure Repos", "VSTS"],

  // ---------------------------------------------------------------- pricing
  "free plan available": ["free tier", "freemium", "free version"],
  "free for open source": ["free for OSS", "open source projects"],
  "quote-based": ["contact sales", "custom pricing"],
  "per developer seat": ["per seat", "per user"],
  "per contributing developer": ["per committer", "active committer"],
  "usage-based credits": ["pay as you go", "usage-based pricing"],
  "per lines of code": ["per LOC"],

  // -------------------------------------------------------------- languages
  javascript: ["JS", "ECMAScript"],
  typescript: ["TS"],
  go: ["Golang"],
  python: ["py"],
  "c#": ["C sharp", "csharp"],
  "f#": ["F sharp", "fsharp"],
  "c++": ["cpp", "C plus plus"],
  "c/c++": ["cpp"],
  "objective-c": ["ObjC"],
  kubernetes: ["k8s"],
  "kubernetes/helm": ["k8s"],
  terraform: ["HCL"],
  "aws cloudformation": ["CFN"],
  cloudformation: ["CFN"],
  "azure resource manager": ["ARM templates"],
  "azure resource manager templates": ["ARM templates"],
  powershell: ["pwsh"],
  shell: ["shell script"],
  bash: ["shell script"],
  "ruby on rails": ["Rails"],
  sass: ["SCSS"],

  // ------------------------------------------------------------------- IDEs
  "jetbrains ides": ["IntelliJ"],
  neovim: ["nvim"],
  "vim/neovim": ["nvim"],

  // --------------------------------------------------------------------- CI
  "github actions": ["GHA"],
  "azure pipelines": ["Azure DevOps Pipelines"],

  // ------------------------------------------------------------ chat & email
  "microsoft teams": ["MS Teams"],

  // ---------------------------------------------------------- certifications
  "soc 2 type ii": ["SOC 2 Type 2"],
  "nist ssdf": ["Secure Software Development Framework"],
  "zero data retention": ["ZDR"],
};

// Product names built from words that also appear separately elsewhere. Search
// never splits these into separate words, because each is a different product
// from the one it sounds like: "Bitbucket Server" must not match tools that
// support Bitbucket and GitHub Enterprise Server.
export const KEEP_TOGETHER = ["Bitbucket Server", "Azure DevOps Server"];

/** Synonyms for a label as shown on the site, or an empty list. */
export function labelAliases(label) {
  return LABEL_ALIASES[String(label).toLowerCase()] || [];
}

/** Synonyms for a glossary term, or an empty list. */
export function termAliases(slug) {
  return TERM_ALIASES[slug] || [];
}
