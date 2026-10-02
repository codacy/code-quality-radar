// Glossary terms. Each entry maps to a real facet in the tool dataset via
// `source`, so "Top N X tools" counts and lists are derived, never hand-kept.
//
// source.type → how to test a tool for this capability:
//   category   → tool.category === key
//   detection  → tool.detection[key]
//   workflow   → tool.workflowStages[key]
//   ai         → tool.aiCapabilities[key]
//   compliance → tool.complianceBool[key]
//   deployment → tool.deployment[key]
//   apiCli     → tool.apiCli[key]

// Content dates for the glossary, in ISO 8601. These feed `datePublished` /
// `dateModified` on each term page's Article JSON-LD. They are content dates,
// not build dates: bump GLOSSARY_UPDATED only when a definition's substance
// changes, never on a redeploy, or the freshness signal becomes a lie.
// A single entry can override either with its own `published` / `updated`.
export const GLOSSARY_PUBLISHED = "2026-09-07";
export const GLOSSARY_UPDATED = "2026-10-02";

export const GLOSSARY_GROUPS = [
  "Tool categories",
  "Security scanning",
  "Code quality",
  "AI review & fixes",
  "Rules & repo support",
  "Developer workflow",
  "AI capabilities",
  "Security & compliance",
  "Deployment",
  "Automation & access",
];

export const GLOSSARY = [
  // ---------------------------------------------------------------- categories
  {
    slug: "appsec-platform",
    term: "Code Security Platform",
    group: "Tool categories",
    source: { type: "category", key: "appsec-platform" },
    short:
      "A consolidated code security product that covers several scanning types, typically SAST, SCA, secrets, IaC and containers, under one risk model.",
    long: [
      "A code security platform bundles the scanners a security team would otherwise buy separately, and, more importantly, normalizes their output into a single severity model, one policy engine and one queue of findings.",
      "The case for a platform is consolidation. Five separate scanners mean five dashboards, five sets of false positives and no shared idea of which issue matters most, while a platform can rank a dependency CVE, a hardcoded secret and a misconfigured Terraform bucket on the same scale.",
      "The case against is depth. A platform's individual scanners are not always as strong as a dedicated tool in the same area, so teams with one dominant risk, such as a large dependency surface or heavy infrastructure-as-code, sometimes get more from a specialist there and accept the extra dashboard.",
    ],
    lookFor: [
      "Whether findings from different scanners share one severity model, or each scanner keeps its own",
      "Which scanners are included in the base price versus sold as add-on modules",
      "Whether the platform can gate a pull request, or only report after the fact",
      "How much of the noise reduction is automated triage versus your team tuning rules",
    ],
  },
  {
    slug: "quality-platform",
    term: "Code Quality Platform",
    group: "Tool categories",
    source: { type: "category", key: "quality-platform" },
    short:
      "A code quality product centered on maintainability, code smells, complexity, duplication and test coverage, usually with security scanning layered on.",
    long: [
      "Quality platforms grade a codebase on how expensive it will be to keep changing: complexity, duplication, dead code, coverage gaps and style drift. Most now also carry SAST and dependency scanning, which is what makes them overlap with code security platforms.",
      "The distinguishing behavior is the gate on new code. A quality platform is generally designed to let existing debt sit while holding every new pull request to a standard, so a large legacy codebase can adopt one without an unshippable backlog on day one.",
    ],
    lookFor: [
      "Whether quality gates can apply to changed lines only, rather than the whole repository",
      "Coverage ingestion: which report formats, and whether diff coverage is supported",
      "How the overall grade is calculated, and whether you can change its thresholds",
      "Language depth, since breadth of language support rarely means equal analysis depth",
    ],
  },
  {
    slug: "pr-review-tool",
    term: "PR Review Tool",
    group: "Tool categories",
    source: { type: "category", key: "pr-review" },
    short:
      "A tool whose primary surface is the pull request: it reads the diff in context and leaves review comments, usually AI-generated.",
    long: [
      "PR review tools sit on the merge step rather than the whole repository. They read a diff alongside surrounding code, related files and often issue-tracker context, then post line-level comments the way a human reviewer would.",
      "Unlike a linter, the output is argued rather than pattern-matched, which is also the risk. These tools trade determinism for context, so the practical questions are comment precision, how much reviewer time they actually save, and whether developers start ignoring them.",
    ],
    lookFor: [
      "Signal-to-noise on real pull requests during a trial, not on a demo repository",
      "Whether the tool learns from resolved or dismissed comments",
      "How much repository context it reads beyond the diff itself",
      "Whether it can block a merge or only comment",
    ],
  },
  {
    slug: "agent-coding-tool",
    term: "AI Coding Agent",
    group: "Tool categories",
    source: { type: "category", key: "agent-coding-tool" },
    short:
      "A general-purpose AI coding agent that writes and edits code, with review or security scanning as one capability among many.",
    long: [
      "These are coding assistants first. Review and security features exist, but they sit beside code generation, refactoring and terminal work rather than being the product's center of gravity.",
      "They matter in this directory because they are increasingly the thing producing the code that everything else has to review, and because their review capabilities are real, if narrower and less consistently documented than a dedicated scanner's.",
    ],
    lookFor: [
      "Whether security review is a documented feature or an emergent model behavior",
      "How the tool handles code confidentiality and training-data exclusion",
      "Whether findings can reach CI, or only exist inside the editor session",
      "Cost model, since most are seat plus usage credits, which is hard to forecast",
    ],
  },

  // ---------------------------------------------------------- detection facets
  {
    slug: "sast",
    term: "SAST",
    group: "Security scanning",
    source: { type: "detection", key: "sast" },
    short:
      "Static Application Security Testing: analyzing source code for security flaws without running it.",
    long: [
      "SAST parses your code, usually into an AST or an intermediate representation, and matches it against rules describing insecure patterns: SQL injection, XSS, command injection, unsafe deserialization, weak cryptography and so on. Because it never executes anything, it can run on every commit and reach code paths a test suite never triggers.",
      "That is also its weakness. Without runtime facts, a SAST engine has to reason about what could happen, so it tends to over-report. False-positive rate and whether findings arrive somewhere developers already work decide much of whether a SAST tool gets used. The opposite failure matters as much: a tool tuned to stay quiet can also miss real vulnerabilities, so check what it catches on your code, not only how little noise it makes.",
    ],
    lookFor: [
      {
        label: "Data flow across files",
        text: "Following untrusted input across functions and files is what separates an exploitable injection from a string that only looks dangerous. Cross-file analysis costs more time and memory, so ask whether it also runs on pull request scans or only on scheduled full scans.",
      },
      {
        label: "Accuracy on your own code",
        text: "Trial each tool on a repository you know well, ideally an old commit with vulnerabilities you have since fixed, and count both the noise and the known flaws it misses. AI false-positive filtering cuts noise, but check what it sets aside too.",
      },
      {
        label: "Depth in your main languages",
        text: "A long supported-language list helps a codebase that mixes many languages, but says little about how well each is analyzed. Check that the languages and frameworks you ship most have dedicated security rules, and whether the engine reads source directly or needs a working build.",
      },
      {
        label: "Rules for your own frameworks",
        text: "Internal APIs, wrappers and sanitizers need rules no vendor ships, and custom rules are often gated to higher tiers. Pattern and query rules can be tested and behave the same on every run, while natural-language rules for AI review are quicker to write but less predictable.",
      },
      {
        label: "Findings where developers already work",
        text: "Pull request comments, IDE warnings and a check that can fail the merge get flaws fixed before they ship, though that check needs a bypass path for false positives. Combined quality, dependency and security results are simpler to act on, while a specialist engine may go deeper on SAST.",
      },
    ],
    picks: [
      {
        slug: "semgrep",
        comment: "An open-source engine with taint tracking and YAML rules that resemble the code they match, so rules for in-house frameworks are practical to write. Cross-file analysis needs the Pro Engine on Teams and runs only on full scans.",
      },
      {
        slug: "github-advanced-security",
        comment: "CodeQL's semantic analysis and taint tracking live inside GitHub pull requests and rulesets, with custom query packs and Copilot Autofix. CodeQL scanning is free on public repositories, private code needs the Code Security add-on, and only GitHub is supported.",
      },
      {
        slug: "checkmarx",
        comment: "For enterprise AppSec teams, its graph-based SAST needs no compilation, shows source-to-sink attack vectors and supports custom queries written in its Query Editor. Pricing is quote-only, with no published tiers.",
      },
      {
        slug: "snyk",
        comment: "Snyk Code's data-flow analysis draws on AI-learned sources, sinks and sanitizers, and the free plan includes real-time scanning in the IDE. Custom sanitizer rules for Snyk Code need Ignite or Enterprise.",
      },
      {
        slug: "sonarqube",
        comment: "Security rules sit alongside code quality across 40+ languages, some Enterprise-only, with free pull request gating and a free self-managed Community Build. Taint tracking is offered too, but check whether it needs Advanced SAST, which is sold separately.",
      },
      {
        slug: "corgea",
        comment: "AI-native SAST aimed at business-logic and auth flaws, with cross-file taint tracking and false-positive classification that shows its reasoning, all from the Free tier. It covers 11 languages for SAST, so check yours are on the list.",
      },
      {
        slug: "veracode",
        comment: "Built for enterprise and regulated programs, it scans compiled or packaged applications, maps findings to CWE and covers legacy languages such as COBOL and RPG. Licensing is quote-only and sold per product.",
      },
      {
        slug: "codacy",
        comment: "Code security, code quality and AI review come together in one platform, with SAST from Opengrep, Gosec, SpotBugs and other analyzers plus custom rules and opt-in AI false-positive scoring on the Team plan. It does no taint or data-flow analysis.",
      },
      {
        slug: "aikido",
        comment: "SAST across 13 languages ships on the free plan next to dependency, secrets, IaC and malware scanning. Data-flow analysis runs inside its credit-metered AI Deep Review on Pro, and custom rules are not offered.",
      },
      {
        slug: "deepsource",
        comment: "Bug-risk and security checks from 18 core analyzers run on every commit and pull request, with Quality Gates that can fail the check and an air-gapped Enterprise option. Custom rules are limited to plugging in third-party SARIF tools.",
      },
      {
        slug: "coderabbit",
        comment: "Its AI pull request review runs Semgrep, Opengrep and other analyzers from Pro, with ast-grep custom rules. Tracing untrusted input to sinks needs AI Deep Scan, a separately billed add-on.",
      },
      {
        slug: "qlty",
        comment: "Semgrep, Bandit, Brakeman and PMD run through a free CLI locally, in git hooks and in CI, with custom Semgrep and ast-grep rules. Qlty Cloud, which adds pull request comments and gates, works with GitHub only.",
      },
      {
        slug: "codeant",
        comment: "Its Code Security plan, sold separately from AI review, pairs OWASP Top 10 2021 rules across nine categories with dependency, secrets and IaC scanning on all four major Git providers. There is no taint or data-flow analysis behind the rules.",
      },
      {
        slug: "chatgpt-codex",
        comment: "OpenAI's Codex Security agent covers full repositories and can fail CI by severity, while its cloud scans validate findings in isolation before surfacing them. It needs a Pro, Business, Enterprise or Edu plan, and cloud scanning is a research preview.",
      },
      {
        slug: "claude-code",
        comment: "Agentic security review on Pro finds injection, SSRF, auth bypass and weak crypto, and verifier agents reproduce findings before they are reported. Scans are nondeterministic, and the managed review check on Team and Enterprise never blocks a merge by itself.",
      },
      {
        slug: "greptile",
        comment: "Opengrep pattern-matching rules and AI review grounded in the whole repository graph both run on the free Starter plan. Findings, though, are reported per pull request rather than from a full codebase scan.",
      },
      {
        slug: "cursor-bugbot",
        comment: "Bugbot points out security issues in pull request diffs, and findings open straight in Cursor or in a Cloud Agent that pushes a fix branch. Security Agents, which scan the wider codebase, need a Team or Enterprise plan.",
      },
      {
        slug: "qodo",
        comment: "Multi-agent pull request review includes compliance checks that look for SQL injection, XSS, CSRF and exposed secrets in each diff. Security analysis stops at these LLM checks on changed code.",
      },
      {
        slug: "gemini-code-assist",
        comment: "Its GitHub pull request review, in preview, flags injection, CSRF, IDOR and input-validation issues in changed code, with inline suggestions you can commit directly. There is no merge-blocking check, and new subscriptions go through Google Cloud sales.",
      },
    ],
  },
  {
    slug: "taint-dataflow-analysis",
    term: "Taint Analysis (Data-Flow)",
    group: "Security scanning",
    source: { type: "detection", key: "taint_dataflow_analysis" },
    short:
      "Tracing untrusted input from where it enters the program (source) to where it could do damage (sink).",
    long: [
      "Taint analysis is the main difference between a data-flow SAST engine and a pattern matcher. It follows a value across assignments, function calls and files, asking whether attacker-controlled data can reach a dangerous operation without being sanitized along the way.",
      "The payoff is precision: a hardcoded string passed to a SQL query is not a vulnerability, and taint analysis knows the difference. It costs build time and needs per-framework modeling to know which functions count as sources and sinks, which is why fast pattern-based rules still have a place for simple checks and team conventions.",
    ],
    lookFor: [
      "Whether analysis crosses file and function boundaries, or stops at one function",
      "Framework coverage for your stack, since modeling is per-framework work",
      "Whether the tool shows the full source-to-sink path in the finding",
      "Scan-time impact on large repositories",
    ],
  },
  {
    slug: "secrets-detection",
    term: "Secrets Detection",
    group: "Security scanning",
    source: { type: "detection", key: "secrets_detection" },
    short:
      "Finding credentials (API keys, tokens, private keys, connection strings) committed to code, config files or git history.",
    long: [
      "Secrets scanning combines known-format patterns (provider key prefixes) with entropy heuristics for opaque strings. The strongest implementations scan git history too, since a secret deleted in a later commit is still exposed in the objects.",
      "Detection is the easy half. A leaked key stays dangerous until it is rotated, so the operationally useful question is what happens after the alert: push protection that blocks the commit, or a ticket someone closes without rotating anything.",
    ],
    lookFor: [
      "Whether full git history is scanned, or only the current working tree",
      "Push protection, since blocking the secret before it lands beats alerting after",
      "Custom pattern support for your own internal token formats",
      "How generic high-entropy strings are handled without drowning you in noise",
    ],
  },
  {
    slug: "secrets-validation",
    term: "Secrets Validation",
    group: "Security scanning",
    source: { type: "detection", key: "secrets_validation" },
    short:
      "Checking whether a detected secret is actually live, usually by calling the provider, instead of just reporting that it looks like a key.",
    long: [
      "A repository can hold hundreds of strings shaped like credentials, such as expired keys, test fixtures, rotated tokens and documentation examples. Validation queries the issuing provider to sort the genuinely active ones from the noise.",
      "This is the difference between a list of 400 possible secrets and a list of 6 that need rotating this afternoon. It is a comparatively rare capability, and worth checking which providers a tool can actually verify against.",
    ],
    lookFor: [
      "Which providers can be verified, since coverage is usually partial",
      "Whether validation happens automatically or on demand",
      "How the tool avoids leaking the secret further while checking it",
      "Whether inactive findings are suppressed or just deprioritised",
    ],
  },
  {
    slug: "sca",
    term: "SCA",
    group: "Security scanning",
    source: { type: "detection", key: "sca_dependencies" },
    short:
      "Software Composition Analysis: identifying third-party dependencies and matching them against known vulnerability databases.",
    long: [
      "SCA reads your manifests and lockfiles, builds a dependency tree including transitive packages, and cross-references it with advisory sources such as CVE, GHSA and vendor feeds. Most of a modern application is dependencies, so this is usually where the raw finding count lives.",
      "The interesting variable is not whether a tool does SCA (most do) but what it does with the volume. Reachability analysis, exploit-maturity signals and auto-remediation pull requests are what make the output actionable rather than a standing backlog.",
    ],
    lookFor: [
      "Ecosystem coverage for your package managers, including transitive depth",
      "Whether fix guidance names a specific safe version",
      "Automatic upgrade pull requests, and how noisy they are",
      "Advisory freshness and whether the vendor curates beyond public feeds",
    ],
  },
  {
    slug: "reachability-analysis",
    term: "Reachability Analysis",
    group: "Security scanning",
    source: { type: "detection", key: "reachability_analysis" },
    short:
      "Determining whether your code actually calls the vulnerable function inside a flagged dependency.",
    long: [
      "Many dependency CVEs are unreachable in practice: the package is installed, but the affected function is never invoked from your code. Reachability analysis builds a call graph to check, and can cut the actionable list substantially.",
      "It is one of the most effective ways to reduce SCA noise, but not a free pass. Static call graphs can miss code reached through reflection, dynamic loading or configuration, a function that is unreachable today can become reachable in the next release, and some compliance regimes expect known vulnerabilities to be patched either way. Language coverage is also usually narrow, so treat an unreachable label as a prioritization signal rather than proof.",
    ],
    lookFor: [
      "Which languages support it, since coverage is usually narrow",
      "Whether reachability covers transitive dependencies or only direct ones",
      "Whether unreachable findings are suppressed, or just ranked lower",
      "Whether the call path is shown so you can verify the conclusion",
    ],
  },
  {
    slug: "malicious-package-detection",
    term: "Malicious Package Detection",
    group: "Security scanning",
    source: { type: "detection", key: "malicious_package_detection" },
    short:
      "Catching deliberately hostile dependencies: typosquats, packages published from hijacked maintainer accounts, and packages that run malicious code when installed.",
    long: [
      "This is a different problem from vulnerability scanning. A CVE is a mistake in legitimate code; a malicious package is an attack, often live for hours before removal, and frequently designed to execute during install rather than at runtime.",
      "Because the window is short, early detection depends on behavioral signals and fast-moving threat feeds. Public advisory databases do list known malicious packages, but usually after the package has been reported and pulled, so a tool that relies on them alone catches this class late rather than early.",
    ],
    lookFor: [
      "Whether detection is behavioral or purely advisory-feed based",
      "How quickly new malicious packages appear in the tool's data",
      "Whether install scripts and postinstall hooks are inspected",
      "Rescan cadence, since a clean package today can be hijacked tomorrow",
    ],
  },
  {
    slug: "license-compliance",
    term: "License Compliance",
    group: "Security scanning",
    source: { type: "detection", key: "license_compliance" },
    short:
      "Identifying the licenses of your dependencies and flagging ones that conflict with your policy.",
    long: [
      "Every dependency carries license obligations, and some, copyleft terms in particular, can impose requirements on how you distribute your own software. License scanning identifies each package's license, usually via SPDX identifiers, and checks it against an allowlist or blocklist.",
      "This is legal risk rather than security risk, which is why it tends to be a procurement or compliance requirement rather than an engineering one. It matters most when distributing software to customers, though network copyleft licenses such as the AGPL also cover software offered as a hosted service.",
    ],
    lookFor: [
      "Whether policies can be configured per license category and per repository",
      "Detection of transitive dependency licenses, not just direct ones",
      "How dual-licensed and unlicensed packages are handled",
      "Whether a merge can be blocked on a policy violation",
    ],
  },
  {
    slug: "sbom-generation",
    term: "SBOM Generation",
    group: "Security scanning",
    source: { type: "detection", key: "sbom_generation" },
    short:
      "Producing a machine-readable inventory of everything in a build, usually in CycloneDX or SPDX format.",
    long: [
      "A Software Bill of Materials lists every component and version in a piece of software so that, when the next widely-exploited dependency vulnerability lands, an organization can answer 'are we affected' in minutes rather than weeks.",
      "SBOMs have moved from good practice to procurement requirement in regulated sectors and government supply chains, and vendors that generate them sometimes charge for it as an add-on or a higher tier. An SBOM is only as useful as the process around it: one generated for a procurement form and never refreshed will not answer 'are we affected' on the day it matters.",
    ],
    lookFor: [
      "Which formats are supported, since CycloneDX and SPDX are the two that matter",
      "Whether SBOMs can be generated per build and stored historically",
      "Signing and attestation support, if you need supply-chain provenance",
      "Whether an existing SBOM can be imported and scanned",
    ],
  },
  {
    slug: "iac-scanning",
    term: "IaC Scanning",
    group: "Security scanning",
    source: { type: "detection", key: "iac_scanning" },
    short:
      "Checking infrastructure-as-code files (Terraform, CloudFormation, Kubernetes manifests, Dockerfiles) for insecure configuration before it is applied.",
    long: [
      "A large share of cloud security incidents trace back to configuration rather than application code: a public storage bucket, an over-permissive IAM role, an unencrypted volume. IaC scanning catches these in the pull request that would have created them.",
      "The leverage comes from reuse: a single misconfigured module can be copied across dozens of environments, and fixing the template fixes all of them at once. The limit is that it only sees what is in code. Resources created in the console, drift after deployment and settings that depend on runtime values are outside its view, which is the gap cloud posture scanning covers.",
    ],
    lookFor: [
      "Format coverage for your stack, including Helm charts and Kustomize if relevant",
      "Whether Terraform modules and variables are resolved, or files read in isolation",
      "Custom policy support, and in which language (Rego, YAML, proprietary)",
      "Whether findings map to CIS benchmarks or your compliance framework",
    ],
  },
  {
    slug: "container-scanning",
    term: "Container Scanning",
    group: "Security scanning",
    source: { type: "detection", key: "container_scanning" },
    short:
      "Inspecting container images for vulnerable OS packages, application dependencies and unsafe build practices.",
    long: [
      "A container image bundles a base OS layer, system packages and your application. Scanning walks each layer and reports known vulnerabilities, which most often live in the base image rather than anything your team wrote.",
      "The practical output is usually a base-image upgrade recommendation. Tools differ in whether they can tell you which findings come from a layer you control versus one you inherited, a distinction that decides whether the report is actionable.",
    ],
    lookFor: [
      "Whether findings are attributed to the layer that introduced them",
      "Registry integration for scanning images already deployed",
      "Base image upgrade recommendations rather than raw CVE lists",
      "Whether the scan runs in CI before push, or only on stored images",
    ],
  },
  {
    slug: "cspm",
    term: "CSPM",
    group: "Security scanning",
    source: { type: "detection", key: "cloud_posture_cspm" },
    short:
      "Cloud Security Posture Management: continuously auditing live cloud accounts for misconfiguration and policy drift.",
    long: [
      "CSPM connects to your cloud provider's APIs and evaluates what is actually deployed, not what your Terraform says should be deployed. It catches drift, console changes and resources created outside your IaC pipeline entirely.",
      "It overlaps with IaC scanning but answers a different question. IaC scanning asks 'is this template safe to apply'; CSPM asks 'is what is running right now safe'. Tools in this directory that offer it usually do so as a lighter-weight feature than a dedicated cloud security platform.",
    ],
    lookFor: [
      "Which cloud providers and services are covered",
      "Whether it detects drift from your declared infrastructure",
      "Scan frequency, and whether findings tie back to the owning team",
      "Depth compared to a dedicated CSPM product, if that is your main need",
    ],
  },
  {
    slug: "dast",
    term: "DAST",
    group: "Security scanning",
    source: { type: "detection", key: "dast_api_scanning" },
    short:
      "Dynamic Application Security Testing: probing a running application from the outside, the way an attacker would.",
    long: [
      "DAST sends real requests to a deployed application or API and observes the responses, finding issues that only exist at runtime: authentication flaws, misconfigured headers, injection points reachable through the actual request path.",
      "Because it tests the running system, a DAST finding is usually genuine, since you have a request that demonstrates it. The trade-off is that it needs a deployed environment, runs slower than static analysis, and only covers the surface it can reach.",
    ],
    lookFor: [
      "API scanning support via OpenAPI or GraphQL schemas, not just web crawling",
      "How authenticated scanning is configured and maintained",
      "Whether it can run against ephemeral preview environments in CI",
      "Scan duration, which usually rules out running it on every commit",
    ],
  },
  {
    slug: "code-smells",
    term: "Code Smell Detection",
    group: "Code quality",
    source: { type: "detection", key: "code_smells_maintainability" },
    short:
      "Flagging code that works but will be expensive to maintain, such as long methods, deep nesting, poor naming and structural anti-patterns.",
    long: [
      "Code smells are not bugs. They are signals that a piece of code will be harder than necessary to understand and change, which is where a large share of engineering time goes.",
      "The value depends entirely on whether the rules match your team's standards. An aggressive default ruleset applied to a mature codebase produces thousands of findings nobody will action, which is why new-code-only gating matters so much here.",
    ],
    lookFor: [
      "Whether rules can be tuned or disabled per repository",
      "New-code-only enforcement so existing debt does not block delivery",
      "How findings are prioritized beyond raw severity",
      "Whether the tool explains why something is a problem, not just that it is",
    ],
  },
  {
    slug: "complexity-metrics",
    term: "Complexity Metrics",
    group: "Code quality",
    source: { type: "detection", key: "complexity_metrics" },
    short:
      "Measuring how convoluted code is, typically cyclomatic or cognitive complexity per function.",
    long: [
      "Cyclomatic complexity counts independent paths through a function; cognitive complexity weights that by how hard the structure is for a human to follow. Both are proxies for how likely code is to hide a defect and how painful it will be to test.",
      "Complexity is most useful as a trend and as a gate ('no new function above this threshold') rather than as a score to chase. Absolute numbers vary too much between languages and problem domains to compare across teams.",
    ],
    lookFor: [
      "Which metric is used, and whether the threshold is configurable",
      "Function-level reporting rather than only file or repository averages",
      "Whether complexity can fail a build or only appear on a dashboard",
      "Trend tracking over time, which is more useful than a snapshot",
    ],
  },
  {
    slug: "duplication-detection",
    term: "Duplication Detection",
    group: "Code quality",
    source: { type: "detection", key: "duplication_detection" },
    short:
      "Finding copy-pasted or near-identical code blocks across a codebase.",
    long: [
      "Duplicated logic means a fix applied in one place silently leaves the other copies broken. Detection works on token sequences rather than raw text, so reformatting and renamed variables do not hide a clone.",
      "Not all duplication is worth removing, since a premature abstraction can be worse than two similar functions. The metric is most useful for spotting large, repeated blocks that clearly drifted from a common origin.",
    ],
    lookFor: [
      "Whether near-duplicates are detected or only exact copies",
      "Configurable minimum block size to control noise",
      "Cross-file and cross-directory detection",
      "Whether generated code and test fixtures can be excluded",
    ],
  },
  {
    slug: "dead-code",
    term: "Dead Code Detection",
    group: "Code quality",
    source: { type: "detection", key: "dead_unused_code" },
    short:
      "Identifying code that is never reached or referenced, such as unused functions, unreachable branches and orphaned files.",
    long: [
      "Dead code costs review time, slows builds and misleads anyone reading the codebase. It accumulates naturally as features are removed and refactors leave remnants behind.",
      "Accurate detection is harder than it sounds in dynamic languages, where reflection, dependency injection and string-based dispatch can reference code in ways static analysis cannot see. Expect to verify before deleting.",
    ],
    lookFor: [
      "How the tool handles reflection and dynamic invocation",
      "Whether public API surface is excluded from dead-code reporting",
      "Confidence levels on findings rather than a flat list",
      "Support for excluding entry points and framework-called methods",
    ],
  },
  {
    slug: "test-coverage-tracking",
    term: "Test Coverage Tracking",
    group: "Code quality",
    source: { type: "detection", key: "test_coverage_tracking" },
    short:
      "Ingesting coverage reports from your test runs and tracking which lines are exercised by tests.",
    long: [
      "The tool does not run your tests; your CI does. The tool then ingests the report your test runner emits (lcov, Cobertura, JaCoCo and similar) and turns it into trends, gates and per-file views.",
      "Coverage is a weak proxy for test quality: it tells you code was executed, not that anything meaningful was asserted. It is nonetheless useful as a floor, particularly when applied to new code rather than the repository total.",
    ],
    lookFor: [
      "Which report formats are supported for your language and runner",
      "Whether coverage can gate a merge, and at what granularity",
      "Handling of multi-module and monorepo report merging",
      "Historical trend retention",
    ],
  },
  {
    slug: "diff-coverage",
    term: "Diff Coverage (New Code)",
    group: "Code quality",
    source: { type: "detection", key: "diff_new_code_coverage" },
    short:
      "Measuring coverage only on the lines changed in a pull request, rather than across the whole codebase.",
    long: [
      "Total coverage on a large legacy codebase is a number nobody can move. Diff coverage asks a tractable question instead: were the lines you just wrote tested?",
      "This is what makes coverage enforceable on a legacy codebase. A team can require 80% coverage on new code from day one without first backfilling tests for a decade of existing code. The trade-off is that code nobody touches stays untested, and stable, rarely changed modules can be among the most critical, so the overall number only rises as fast as the codebase turns over.",
    ],
    lookFor: [
      "Whether the threshold for new code is separately configurable",
      "How added versus modified lines are counted",
      "Whether the gate blocks the merge or only reports",
      "Behavior on pull requests that contain no testable changes",
    ],
  },
  {
    slug: "architecture-governance",
    term: "Architecture Governance",
    group: "Code quality",
    source: { type: "detection", key: "architecture_governance" },
    short:
      "Enforcing structural rules about which parts of a codebase are allowed to depend on which others.",
    long: [
      "Architectural intent, such as layering, module boundaries, or 'the domain layer must not import the web layer', is normally documented in a diagram nobody checks. Governance tooling turns those rules into assertions that fail a build when violated.",
      "Enforced rules stop an architecture eroding one pragmatic import at a time. They also need upkeep, since rules that lag behind a deliberate design change block legitimate refactors until someone updates them, so they work best when owned by the team that owns the design. Relatively rare as a capability, and generally found in tools focused on long-lived codebases.",
    ],
    lookFor: [
      "How rules are expressed, and whether they live in version control",
      "Whether violations fail CI or only appear in a report",
      "Support for gradually adopting rules on an existing codebase",
      "Visualization of current dependencies versus intended structure",
    ],
  },
  {
    slug: "technical-debt-quantification",
    term: "Technical Debt Quantification",
    group: "Code quality",
    source: { type: "detection", key: "technical_debt_quantification" },
    short:
      "Expressing accumulated code quality problems as an estimated cost, typically remediation time or a letter grade.",
    long: [
      "Quantification converts a list of findings into a single figure a non-engineer can reason about: 40 days of remediation effort, or a grade of C. The point is to make debt discussable in planning conversations where issue counts do not land.",
      "Treat the absolute number as a rough estimate and the trend as the more reliable signal. Remediation-time figures rest on fixed per-issue assumptions that are unlikely to match your team, while the direction of travel over months is genuinely informative.",
    ],
    lookFor: [
      "Whether the model is transparent enough to explain to stakeholders",
      "Trend tracking rather than a point-in-time score",
      "Whether estimates can be calibrated to your team",
      "How new debt is separated from inherited debt",
    ],
  },
  {
    slug: "behavioral-code-analysis",
    term: "Behavioral Code Analysis",
    group: "Code quality",
    source: { type: "detection", key: "behavioral_delivery_analytics" },
    short:
      "Using version-control history, not just the current code, to find hotspots, coupling and delivery risk.",
    long: [
      "Behavioral analysis reads the git log as evidence. Files that change constantly and are also complex are hotspots: statistically, that is where defects concentrate. Files that keep changing together reveal hidden coupling no import graph shows.",
      "It also surfaces organizational signals that code analysis alone cannot see, such as knowledge concentrated in one engineer who is about to leave, or a module edited by six teams at once. That information lives in the history, not the source.",
    ],
    lookFor: [
      "How much history is needed before the analysis is meaningful",
      "Whether hotspots combine change frequency with complexity, or only one",
      "Change-coupling detection across files and modules",
      "Whether author-level analytics is acceptable to your team and works council",
    ],
  },
  {
    slug: "ai-logic-bug-detection",
    term: "AI Logic Bug Detection",
    group: "AI review & fixes",
    source: { type: "detection", key: "ai_logic_bug_detection" },
    short:
      "Using an AI model to find bugs that no fixed rule describes, such as off-by-one errors, inverted conditions, the wrong variable used or broken business logic.",
    long: [
      "Rule-based analysis finds known-shaped problems. It cannot tell you that a function returns the wrong value for an edge case, or that a refactor inverted a condition, because no rule describes 'wrong'. Model-based review can reason about intent and catch that class.",
      "It is also the least deterministic capability in this directory. The same diff can produce different comments on different runs, and confident-sounding wrong findings are the main cost. Evaluate on your own pull requests.",
    ],
    lookFor: [
      "Precision on real pull requests, measured by comments accepted versus dismissed",
      "Whether the tool cites the reasoning behind a finding",
      "Consistency across repeated runs of the same diff",
      "Whether findings are separated from deterministic scanner output",
    ],
  },
  {
    slug: "pr-summaries",
    term: "PR Summaries & Walkthroughs",
    group: "AI review & fixes",
    source: { type: "detection", key: "pr_summaries_walkthroughs" },
    short:
      "Automatically generated descriptions of what a pull request changes, sometimes with a guided file-by-file walkthrough.",
    long: [
      "A summary gives a reviewer the shape of a change before they read it: what moved, what is risky, where to look first. On large pull requests this can shorten the time to a first meaningful review.",
      "It helps most where PR hygiene is weakest, such as sparse descriptions, large diffs or unfamiliar areas of the codebase. It does not improve the change itself, and a generated summary describes what changed rather than why, which only the author can supply.",
    ],
    lookFor: [
      "Whether summaries are posted automatically or on request",
      "Handling of very large diffs, where context limits start to bite",
      "Whether generated text overwrites or preserves the author's description",
      "Walkthrough quality on multi-file architectural changes",
    ],
  },
  {
    slug: "custom-rule-authoring",
    term: "Custom Rule Authoring",
    group: "Rules & repo support",
    source: { type: "detection", key: "custom_rule_authoring" },
    short:
      "Writing your own analysis rules for conventions, internal frameworks or organization-specific risks.",
    long: [
      "Every codebase has rules no vendor ships: use this internal HTTP client, never call that deprecated helper, all handlers must check this permission. Custom rules turn tribal knowledge and repeated review comments into automated checks.",
      "Authoring cost largely decides whether custom rules get written. A rule language you can learn in an afternoon tends to get used; one requiring a compiler plugin and a week of study is used less, even though it can express checks a simpler language cannot.",
    ],
    lookFor: [
      "The rule language and how steep the learning curve really is",
      "Whether rules live in your repository and go through code review",
      "Testing support for rules before rolling them out",
      "Whether custom rules are available on your plan tier",
    ],
  },
  {
    slug: "autofix-suggestions",
    term: "Autofix Suggestions",
    group: "AI review & fixes",
    source: { type: "detection", key: "autofix_suggestions" },
    short:
      "Proposing a concrete code change that resolves a finding, usually as a one-click suggestion in the pull request.",
    long: [
      "A finding tells you something is wrong; an autofix tells you what to write instead. For mechanical issues (formatting, simple refactors, known-safe API swaps, dependency version bumps), this collapses remediation to a click.",
      "Quality varies sharply by issue class. Deterministic transformations are reliable; model-generated fixes for logic or security issues need review, because a fix that silences the scanner without addressing the underlying flaw is worse than the original finding.",
    ],
    lookFor: [
      "Which issue types have fixes, and whether they are deterministic or generated",
      "Whether fixes apply as review suggestions you can accept inline",
      "Bulk application across many findings at once",
      "Whether the fix is re-scanned to confirm it resolved the issue",
    ],
  },
  {
    slug: "agentic-autofix-prs",
    term: "Autofix Pull Requests",
    group: "AI review & fixes",
    source: { type: "detection", key: "autofix_agentic_prs" },
    short:
      "The tool opens its own pull request containing a fix, rather than suggesting an edit inside yours.",
    long: [
      "This goes a step beyond inline suggestions: the tool branches, edits, sometimes runs your tests, and raises a pull request for review. It suits work that spans multiple files or arrives on a schedule, like dependency upgrades.",
      "The operational question is volume. An agent that opens a pull request per finding will bury your review queue, so batching, scheduling and scoping controls matter as much as the quality of each fix.",
    ],
    lookFor: [
      "Batching and scheduling controls to limit pull request volume",
      "Whether the agent runs your test suite before opening the PR",
      "Scoping, meaning which repositories and issue classes it is allowed to touch",
      "How its pull requests are attributed and reviewed",
    ],
  },
  {
    slug: "ai-triage",
    term: "AI Triage (False-Positive Filtering)",
    group: "AI review & fixes",
    source: { type: "detection", key: "ai_triage_false_positive_filtering" },
    short:
      "Using a model to assess which raw findings are real and worth acting on, and suppressing or deprioritising the rest.",
    long: [
      "Scanners over-report by design, since they would rather flag a maybe than miss a real issue. Triage sits on top, reading each finding in the context of surrounding code to judge whether it is genuinely exploitable or reachable.",
      "It is a direct answer to one of the main reasons security tools get abandoned. The risk is symmetrical: a triage layer that wrongly suppresses a real vulnerability has done more damage than the noise it removed, so look for transparency over silent filtering.",
    ],
    lookFor: [
      "Whether suppressed findings remain visible and auditable",
      "Explanations for each triage decision rather than a bare confidence score",
      "Measured false-negative rate, not just noise reduction claims",
      "Whether triage decisions can be overridden and learned from",
    ],
  },
  {
    slug: "monorepo-support",
    term: "Monorepo Support",
    group: "Rules & repo support",
    source: { type: "detection", key: "monorepo_support" },
    short:
      "Handling a repository containing many projects: per-directory configuration, ownership and scoped analysis.",
    long: [
      "In a monorepo, one repository holds many services owned by different teams with different languages and standards. A tool that treats it as a single unit produces one undifferentiated finding list and one meaningless quality grade.",
      "Real support means scoping analysis to changed paths, applying different configuration per subdirectory, and routing findings to the owning team. Without it, adoption stalls because nobody feels responsible for the shared number.",
    ],
    lookFor: [
      "Per-directory configuration and quality gates",
      "Analysis scoped to changed paths rather than the whole tree",
      "Ownership routing, typically via CODEOWNERS",
      "Pricing model, since some tools bill a monorepo as a single project, others by size",
    ],
  },

  // ------------------------------------------------------------------ workflow
  {
    slug: "ide-realtime-feedback",
    term: "Real-Time IDE Feedback",
    group: "Developer workflow",
    source: { type: "workflow", key: "ide_realtime" },
    short:
      "Surfacing findings inside the editor as code is written, before anything is committed.",
    long: [
      "The cheapest moment to fix a defect is the moment it is written, while the developer still has the full context in their head. IDE integration moves detection to that point instead of waiting for CI.",
      "The constraint is latency. Analysis has to return in the time between keystrokes, so editor-side checks are usually a faster subset of what the platform runs server-side, which means the IDE being quiet does not guarantee CI will be.",
    ],
    lookFor: [
      "Which editors are supported, including AI-native ones if your team uses them",
      "Whether it works offline or needs a round-trip to the vendor",
      "Whether IDE rules are the same as CI rules, or a reduced set",
      "Whether organization configuration syncs automatically to each developer",
    ],
  },
  {
    slug: "ai-agent-guardrails",
    term: "AI Agent Guardrails",
    group: "Developer workflow",
    source: { type: "workflow", key: "ai_agent_guardrail_mcp" },
    short:
      "Checking code from AI coding agents while it is being written, through an MCP server, agent hooks or a plugin.",
    long: [
      "When an agent writes code, the traditional review loop arrives far too late: hundreds of lines can land before anyone looks. Guardrails give the agent access to the scanner directly, so it can check and correct its own output mid-task.",
      "MCP has become a common interface for this, though some tools do the same job through agent hooks or a plugin. The practical effect is that the agent's tool call, rather than the pull request, becomes the first quality gate, which matters more as the share of AI-written code rises.",
    ],
    lookFor: [
      "Which agents and clients are supported",
      "Whether the agent can auto-remediate or only read findings",
      "What the integration sends to the vendor, and whether that is acceptable",
      "Whether guardrail checks match the rules enforced later in CI",
    ],
  },
  {
    slug: "local-cli",
    term: "Local Analysis (Pre-Commit)",
    group: "Developer workflow",
    source: { type: "workflow", key: "local_cli_precommit" },
    short:
      "Running the analysis itself on a developer's machine, from the command line or a git hook, without waiting for CI.",
    long: [
      "A CLI closes the feedback loop from minutes to seconds and makes the tool scriptable, useful for pre-commit hooks, custom pipelines and debugging why CI disagrees with your machine.",
      "It also matters for confidentiality: a CLI that analyzes fully locally never sends source code anywhere, which is sometimes the only way a tool passes review in a regulated environment.",
    ],
    lookFor: [
      "Whether analysis is genuinely local or a thin client for a cloud API",
      "Parity between CLI results and server results",
      "Pre-commit framework integration",
      "Whether the CLI is available on the free tier",
    ],
  },
  {
    slug: "pr-inline-review",
    term: "Inline PR Comments",
    group: "Developer workflow",
    source: { type: "workflow", key: "pr_inline_review" },
    short:
      "Posting findings as comments on the specific lines of a pull request, rather than in a separate dashboard.",
    long: [
      "Findings that live in a dashboard get looked at during audits. Findings that appear as a comment on the line the developer just changed get fixed during review, because they arrive where the work is already happening.",
      "Where findings appear often matters as much for adoption as what the tool detects. The failure mode is volume: a tool that leaves forty comments on a routine pull request will be muted within two weeks.",
    ],
    lookFor: [
      "Whether comments are scoped to changed lines only",
      "Deduplication across pushes so the same comment is not repeated",
      "Whether resolved comments stay resolved after a force-push",
      "Per-severity control over what is worth commenting on",
    ],
  },
  {
    slug: "merge-gate",
    term: "Quality Gates (Merge Blocking)",
    group: "Developer workflow",
    source: { type: "workflow", key: "merge_gate_blocking" },
    short:
      "Preventing a pull request from merging while it violates a defined quality or security threshold.",
    long: [
      "A gate is what turns advice into policy. Implemented as a required status check, it stops a merge when a condition fails: a new critical vulnerability, coverage below threshold on new code, a license violation.",
      "Gates only survive if they are trusted. A gate that fires on false positives gets bypass permissions handed out within a month, at which point it is theater, so tune the threshold before enforcing it, not after.",
    ],
    lookFor: [
      "Granularity, by severity, issue type or repository",
      "New-code-only conditions so legacy debt does not block delivery",
      "Documented, audited bypass process for genuine emergencies",
      "How the gate behaves when the scan itself fails or times out",
    ],
  },
  {
    slug: "full-repo-scan",
    term: "Full Repo Scan",
    group: "Developer workflow",
    source: { type: "workflow", key: "full_repo_scan" },
    short:
      "Analyzing an entire repository rather than only the diff, establishing a complete baseline.",
    long: [
      "Diff analysis tells you about today's change. A full scan tells you the state of everything, which is what you need for a security baseline, a compliance report or a first look at an unfamiliar codebase.",
      "Full scans are slower and produce the intimidating initial number, so most teams run them on a schedule and gate on diffs, using the baseline for reporting and the diff for enforcement.",
    ],
    lookFor: [
      "Scan duration on a repository the size of yours",
      "Whether a full scan requires CI configuration or runs from the cloud",
      "How the initial baseline can be accepted so only new issues are actioned",
      "Any repository size or lines-of-code limits on your plan",
    ],
  },
  {
    slug: "continuous-rescanning",
    term: "Scheduled Rescans",
    group: "Developer workflow",
    source: { type: "workflow", key: "scheduled_continuous_rescan" },
    short:
      "Re-analyzing code on a schedule even when nothing has changed, to catch newly published vulnerabilities.",
    long: [
      "Your dependencies do not have to change for your risk to change. A package that was clean at merge time becomes vulnerable the moment an advisory is published, and commit-triggered scanning alone will never notice.",
      "Continuous rescanning closes that gap. For a stable service that is rarely deployed, sometimes one running a critical workload, it is frequently the only thing watching for new CVEs at all, unless someone monitors an SBOM of the deployed build. The cost is alerts landing on repositories nobody is actively working on, so routing needs thought.",
    ],
    lookFor: [
      "Rescan frequency, and whether it is configurable",
      "How alerts are routed when nobody is actively working on the repository",
      "Whether rescanning covers deployed artifacts as well as source",
      "Which plan tier includes it, since this is frequently gated",
    ],
  },
  {
    slug: "runtime-monitoring",
    term: "Runtime Monitoring",
    group: "Developer workflow",
    source: { type: "workflow", key: "runtime_production" },
    short:
      "Observing the application in production to detect or block attacks and confirm which vulnerabilities are actually exposed.",
    long: [
      "Runtime context answers the question static analysis cannot: is this vulnerable code path actually reachable in the deployed system, behind authentication, or exposed to the internet? That reorders a backlog fast.",
      "Some tools go further and block malicious requests in-process. That is a different operational commitment from scanning, since it sits in the request path, so latency and failure behavior become your concern.",
    ],
    lookFor: [
      "Whether it observes only or actively blocks",
      "Deployment model (sidecar, agent or in-process library) and its overhead",
      "Whether runtime signals feed back into finding prioritization",
      "Failure behavior if the runtime component becomes unavailable",
    ],
  },

  // ------------------------------------------------------------------------ AI
  {
    slug: "ai-code-review",
    term: "AI Code Review",
    group: "AI capabilities",
    source: { type: "ai", key: "has_ai_review_engine" },
    short:
      "Using a language model to review changes contextually, rather than matching them against fixed rules.",
    long: [
      "A model reads the diff along with surrounding code and comments on what it finds: naming, missed edge cases, logic that contradicts the stated intent of the change. It covers ground no ruleset describes.",
      "It complements rather than replaces deterministic analysis. Static rules are repeatable and auditable; model review is broader but variable. Teams that get value from it typically run both and keep the outputs visually distinct.",
    ],
    lookFor: [
      "Which model is used, and whether that is disclosed at all",
      "Whether review context includes linked issues and repository history",
      "Comment precision measured on your own pull requests",
      "Whether AI findings are labeled separately from scanner findings",
    ],
  },
  {
    slug: "byo-model",
    term: "Bring Your Own Model",
    group: "AI capabilities",
    source: { type: "ai", key: "byo_model_byok" },
    short:
      "Pointing the tool at your own model deployment or LLM API key instead of the vendor's hosted inference.",
    long: [
      "Bring-your-own-model routes inference through infrastructure you control, such as your Azure OpenAI deployment, your Bedrock account or a self-hosted open-weights model. Your code goes to your tenancy rather than the vendor's. Some vendors call this BYOK, meaning your own LLM API key, which is a different thing from customer-managed encryption keys.",
      "This is usually a compliance requirement rather than a preference: it keeps inference inside an existing data-processing agreement and an audited boundary. Where it is offered it is often limited to enterprise plans, and worth confirming exactly which features still work when enabled.",
    ],
    lookFor: [
      "Which providers and models are supported",
      "Whether all AI features work with your model, or only a subset",
      "Who bears inference cost and how that changes the total price",
      "Whether prompts and responses still transit the vendor's systems",
    ],
  },
  {
    slug: "mcp-server",
    term: "MCP Server",
    group: "AI capabilities",
    source: { type: "ai", key: "mcp_server" },
    short:
      "Exposing the tool's capabilities over Model Context Protocol so AI agents can call it directly.",
    long: [
      "MCP is an open protocol that lets an AI agent discover and invoke external tools. A vendor shipping an MCP server means an agent can request a scan, read findings and act on them as part of its own loop, without a bespoke integration.",
      "In practice this is how a scanner becomes part of an agentic workflow rather than only a downstream gate, since the agent can check its work before proposing it. It supplements a CI gate rather than replacing one: the check only happens if the agent is set up to call it, and the agent's token becomes another credential with access to your findings.",
    ],
    lookFor: [
      "Which operations the server exposes, from read-only findings to scanning and remediation",
      "Which agent clients are known to work with it",
      "Authentication model and what scope the agent's token carries",
      "Whether MCP access is included in your plan tier",
    ],
  },
  {
    slug: "ai-usage-governance",
    term: "AI Code Governance",
    group: "AI capabilities",
    source: { type: "ai", key: "ai_usage_governance_inventory" },
    short:
      "Tracking and setting policy over AI-generated code entering your codebase.",
    long: [
      "As AI writes a growing share of committed code, organizations increasingly need to answer governance questions about it: how much of this release was model-generated, was it reviewed to the same standard, does any of it violate our policies.",
      "Note the distinction that matters when comparing tools: governing the code the AI wrote is a different capability from inventorying which AI tools your developers use. Both get marketed as AI governance; only the first tells you anything about your codebase.",
    ],
    lookFor: [
      "Whether it governs generated code or merely inventories AI tooling",
      "How AI-authored code is identified in the first place",
      "Whether policies can be enforced at merge time",
      "Reporting suitable for an audit or board-level question",
    ],
  },
  {
    slug: "chat-with-reviewer",
    term: "Conversational Review",
    group: "AI capabilities",
    source: { type: "ai", key: "chat_with_reviewer" },
    short:
      "Replying to the tool's findings conversationally to ask why, push back, or request an alternative fix.",
    long: [
      "A finding you disagree with is normally a dead end: dismiss it, or argue with a dashboard. Conversational review lets a developer ask why the tool flagged something and get reasoning back in the pull request thread.",
      "It changes the interaction from verdict to discussion, which reduces the resentment that makes teams disable tools. It also gives the vendor a signal about which findings developers reject and why.",
    ],
    lookFor: [
      "Where the conversation happens: a PR thread, an IDE panel or a separate app",
      "Whether the tool can revise or withdraw a finding after discussion",
      "Whether context persists across a conversation or resets each message",
      "Whether dismissals feed back into future analysis",
    ],
  },
  {
    slug: "feedback-learning",
    term: "Learning From Feedback",
    group: "AI capabilities",
    source: { type: "ai", key: "learns_from_feedback" },
    short:
      "Adapting future findings based on which comments your team accepted, fixed or dismissed.",
    long: [
      "Every dismissed finding is a signal. A tool that records those decisions can stop repeating rejected findings and start matching your team's actual standards rather than a vendor default.",
      "Without it, tuning stays manual, often meaning the same rule suppressed in every new repository. With it, precision should improve over weeks of use, which is worth verifying rather than assuming. The risk runs the other way too: if a team dismisses valid findings under deadline pressure, the tool can learn to stop raising them.",
    ],
    lookFor: [
      "Whether learning is per-repository, per-organization or global",
      "How long adaptation takes to show measurable effect",
      "Whether learned suppressions are visible and reversible",
      "Whether your feedback trains models shared with other customers",
    ],
  },
  {
    slug: "code-excluded-from-training",
    term: "Code Excluded From Training",
    group: "AI capabilities",
    source: { type: "ai", key: "code_excluded_from_training" },
    short:
      "A vendor's documented commitment that your source code is not used to train its own or a third party's models.",
    long: [
      "Any AI review tool sends your source to a model. The question every security review asks is what happens to it afterwards: retained, logged, used as training data, or discarded after inference.",
      "Look for this in the contract and the sub-processor list, not the marketing page. 'We do not train on your code' is a meaningful commitment only if it also binds the model provider sitting behind the vendor.",
    ],
    lookFor: [
      "Whether the guarantee extends to the underlying model provider",
      "Retention period for prompts and responses",
      "Whether it is contractual or a policy the vendor can change",
      "Zero-retention or enterprise inference endpoints, where offered",
    ],
  },

  // ---------------------------------------------------------------- compliance
  {
    slug: "audit-logs",
    term: "Audit Logs",
    group: "Security & compliance",
    source: { type: "compliance", key: "audit_logs" },
    short:
      "An immutable record of who did what in the tool, such as settings changed, findings dismissed or gates bypassed.",
    long: [
      "Audit logs answer questions after the fact: who suppressed this vulnerability, who disabled that gate, who added an external user. For SOC 2 and ISO 27001 they are table stakes rather than a nice-to-have.",
      "The security-relevant events here are the suppressions and bypasses. A dismissed critical finding with no attached record of who dismissed it and why is a genuine gap, not an administrative one.",
    ],
    lookFor: [
      "Retention period, and whether it satisfies your compliance framework",
      "Export to your SIEM, via API or streaming",
      "Whether finding dismissals and gate bypasses are captured, not just logins",
      "Whether logs are tamper-evident",
    ],
  },
  {
    slug: "sso-saml",
    term: "SSO (SAML)",
    group: "Security & compliance",
    source: { type: "compliance", key: "sso_saml" },
    short:
      "Authenticating users through your identity provider rather than tool-specific credentials.",
    long: [
      "Single sign-on centralizes access: one identity provider, one offboarding action, MFA enforced in one place. Without it, every tool becomes an account someone has to remember to revoke when an engineer leaves.",
      "It is also the classic enterprise-tier paywall. Budget for it, because the price step from the plan you want to the plan with SSO is frequently the largest single jump in these products' pricing.",
    ],
    lookFor: [
      "SAML 2.0 and OIDC support, and which identity providers are tested",
      "Just-in-time provisioning, and whether SCIM deprovisioning exists",
      "Whether SSO can be enforced for all users rather than offered optionally",
      "Which plan tier it requires",
    ],
  },
  {
    slug: "rbac",
    term: "Role-Based Access Control",
    group: "Security & compliance",
    source: { type: "compliance", key: "rbac" },
    short:
      "Controlling what each user can see and change through defined roles rather than blanket access.",
    long: [
      "RBAC keeps the blast radius small: a developer sees their team's repositories, a security lead sets policy, an auditor reads without changing anything. It is what makes a tool safe to roll out organization-wide.",
      "The capability everyone checks too late is who can dismiss a finding or bypass a gate. If that is available to every user by default, your policy is advisory regardless of how the gates are configured.",
    ],
    lookFor: [
      "Whether roles are predefined or genuinely customizable",
      "Repository- and team-level scoping, not just organization-wide roles",
      "Which roles may dismiss findings or bypass gates",
      "Whether role assignment can be driven from your identity provider",
    ],
  },
  {
    slug: "compliance-reporting",
    term: "Compliance Reporting & Exports",
    group: "Security & compliance",
    source: { type: "compliance", key: "compliance_reporting_exports" },
    short:
      "Generating evidence for auditors: control coverage, scan history, finding status mapped to a framework.",
    long: [
      "Auditors want evidence that scanning happened consistently, that findings were triaged, and that exceptions were approved. Assembling that by hand each audit cycle is slow and error-prone; generating it from the tool that did the scanning is much faster.",
      "The valuable feature is mapping to a named framework, such as SOC 2, ISO 27001 or PCI DSS, so a control maps to evidence directly rather than through a spreadsheet you maintain.",
    ],
    lookFor: [
      "Which frameworks are mapped out of the box",
      "Export formats, and whether the report is point-in-time or historical",
      "Whether exceptions and their approvals are included",
      "API access so evidence collection can be automated",
    ],
  },

  // ---------------------------------------------------------------- deployment
  {
    slug: "cloud-saas",
    term: "Cloud (SaaS) Deployment",
    group: "Deployment",
    source: { type: "deployment", key: "cloud" },
    short:
      "The vendor hosts and operates the tool; your code is analyzed on their infrastructure.",
    long: [
      "SaaS is the most common deployment model: nothing to run, updates arrive continuously, and nobody on your team has to operate the scanner. For teams without a hard rule on where source code can go, it is usually the lowest-effort option.",
      "The trade-off is that source code is sent to and processed by a third party, which is the main question in regulated environments, and a vendor outage can hold up merges if its check is required. Where SaaS passes a security review, it is usually on the strength of data-residency guarantees and a training-exclusion commitment, not the vendor's security posture alone.",
    ],
    lookFor: [
      "Data residency options if you have jurisdictional requirements",
      "Uptime SLA, and whether an outage blocks your merges",
      "What is retained after analysis, and for how long",
      "Certifications backing the vendor's own security claims",
    ],
  },
  {
    slug: "self-hosted",
    term: "Self-Hosted (On-Premises) Deployment",
    group: "Deployment",
    source: { type: "deployment", key: "selfHosted" },
    short:
      "Running the tool on infrastructure you control, so source code never leaves your environment.",
    long: [
      "Self-hosting keeps code inside your perimeter. For defense, finance, healthcare and anyone with a hard data-residency rule, it is frequently the only deployment that passes review, which makes it a hard filter rather than a preference.",
      "The cost is ownership: you run the upgrades, the database, the scaling and the incident response. Check carefully whether a vendor's self-hosted edition is a first-class product or a legacy option kept alive for existing customers, because those age very differently.",
    ],
    lookFor: [
      "Whether the self-hosted edition reaches feature parity with the cloud one",
      "Whether it is actively developed or maintained for legacy customers only",
      "Infrastructure requirements and realistic operational burden",
      "How vulnerability and rule updates reach an installation you control",
    ],
  },
  {
    slug: "air-gapped",
    term: "Air-Gapped (Offline) Deployment",
    group: "Deployment",
    source: { type: "deployment", key: "airGapped" },
    short:
      "Running the tool fully offline, with no internet connection at all, in an environment physically isolated from outside networks.",
    long: [
      "Air-gapped is stricter than self-hosted. The installation cannot phone home for license checks, telemetry, rule updates or vulnerability feeds, so everything must be transferable through an offline update bundle.",
      "This is classified and critical-infrastructure territory. Ask specifically how the vulnerability database is refreshed offline, because a scanner with a stale advisory feed reports confidently on last quarter's threat landscape.",
    ],
    lookFor: [
      "How vulnerability data and rules are updated without network access",
      "Whether licensing works fully offline",
      "Which features silently degrade, since AI review usually cannot work at all",
      "Documented installation procedure rather than a bespoke engagement",
    ],
  },

  // ------------------------------------------------------------ access / automation
  {
    slug: "rest-api",
    term: "REST API",
    group: "Automation & access",
    source: { type: "apiCli", key: "rest_api" },
    short:
      "Programmatic access to findings, configuration and scan results over HTTP.",
    long: [
      "An API is what lets a tool become part of your systems rather than another destination to visit: findings into your own dashboards, configuration managed as code, evidence collection automated for audits.",
      "It is also your exit route. A tool with a complete API is one whose data you can extract if you switch vendors, which is worth weighing at purchase rather than at renewal.",
    ],
    lookFor: [
      "Coverage, meaning whether everything in the UI is reachable from the API",
      "Rate limits, and whether they permit a full data export",
      "Authentication model and token scoping",
      "Versioning and deprecation policy",
    ],
  },
  {
    slug: "cli",
    term: "CLI",
    group: "Automation & access",
    source: { type: "apiCli", key: "cli" },
    short:
      "Command-line interface: a client you run from a terminal or a script to start scans and pull results, in any environment.",
    long: [
      "A CLI makes the tool portable across CI systems. Rather than depending on a maintained plugin for one specific platform, you run a binary, which works identically on a laptop, a self-hosted runner and whatever CI you migrate to next.",
      "It is also the fallback when a first-party integration does not exist for your platform, and the fastest way to debug a discrepancy between local and CI results.",
    ],
    lookFor: [
      "Whether the CLI can run analysis locally or only orchestrate a cloud scan",
      "Exit codes suitable for failing a build",
      "Output formats, such as SARIF and JSON, for piping into other tools",
      "Distribution: binary, container image, package manager",
    ],
  },
  {
    slug: "webhooks",
    term: "Webhooks",
    group: "Automation & access",
    source: { type: "apiCli", key: "webhooks" },
    short:
      "Outbound HTTP callbacks that notify your systems when a scan completes or a finding appears.",
    long: [
      "Webhooks invert the integration: instead of polling an API for changes, your systems get told. That is how findings reach a Slack channel, open a Jira ticket, or trigger an incident workflow within seconds.",
      "For anything time-sensitive, such as a critical vulnerability in a production service, push beats poll. Check the delivery guarantees, because a silently dropped webhook is an alert nobody knows they missed.",
    ],
    lookFor: [
      "Which events can be subscribed to, and at what granularity",
      "Retry behavior and delivery guarantees",
      "Payload signing so receivers can verify authenticity",
      "Whether payloads carry enough detail to avoid an API round-trip",
    ],
  },
];

export function getGlossaryTerm(slug) {
  return GLOSSARY.find((t) => t.slug === slug) || null;
}

const SLUG_BY_SOURCE = new Map(GLOSSARY.map((t) => [`${t.source.type}:${t.source.key}`, t.slug]));

/** Glossary slug for a dataset facet, e.g. ("detection", "sast") → "sast". Null when no term covers it. */
export function glossarySlugFor(type, key) {
  return SLUG_BY_SOURCE.get(`${type}:${key}`) || null;
}

const DEPLOYMENT_KEYS = { cloud: "saas_cloud", selfHosted: "self_hosted", airGapped: "air_gapped" };
const RAW_GROUPS = {
  detection: "detection",
  workflow: "workflow_stages",
  ai: "ai_posture",
  compliance: "compliance",
};

/**
 * The dataset cell backing this term for one tool, given that tool's full
 * record. Returns null for terms with no per-tool cell (categories, api/cli),
 * so callers fall back to the tool's own description.
 */
export function facetCellFor(term, rawTool) {
  const { type, key } = term.source;
  if (type === "deployment") return rawTool?.deployment?.[DEPLOYMENT_KEYS[key]] || null;
  const group = RAW_GROUPS[type];
  if (!group) return null;
  return rawTool?.[group]?.[key] || null;
}

/** Tools from the directory that have the capability this term describes. */
export function toolsForTerm(term, tools) {
  const { type, key } = term.source;
  const has = (t) => {
    switch (type) {
      case "category":
        return t.category === key;
      case "detection":
        return !!t.detection?.[key];
      case "workflow":
        return !!t.workflowStages?.[key];
      case "ai":
        return !!t.aiCapabilities?.[key];
      case "compliance":
        return !!t.complianceBool?.[key];
      case "deployment":
        return !!t.deployment?.[key];
      case "apiCli":
        return !!t.apiCli?.[key];
      default:
        return false;
    }
  };
  return tools.filter(has);
}

/** Raw yes/partial/no/unknown for this term on one tool (view-model shape). */
export function valueForTerm(term, tool) {
  const { type, key } = term.source;
  if (type === "category") return tool.category === key ? "yes" : "no";
  return tool.values?.[type]?.[key] || "unknown";
}

/**
 * Tools split by how completely they support the term. Any generated copy that
 * quotes a count should use this rather than a flat total — merging `partial`
 * into `yes` claims parity the dataset does not record.
 */
export function splitToolsForTerm(term, tools) {
  const all = toolsForTerm(term, tools);
  const partial = all.filter((t) => valueForTerm(term, t) === "partial");
  const full = all.filter((t) => valueForTerm(term, t) !== "partial");
  return { all, full, partial };
}

export const PARITY_CAVEAT =
  "Support is not the same as parity, since some implementations are narrower in scope, gated to a higher plan tier, or maintained only for existing customers. The note under each tool is what its own documentation describes.";
