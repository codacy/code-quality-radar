// Explore articles: editorial/comparison content, distinct from the glossary
// (which defines terms). Each article maps to a real dataset facet so its
// ranked list and counts are derived, never hand-maintained.
//
// Only one article type exists today — "best-of" pages for each git hosting
// platform, intended as SEO/paid-search landing pages matching a specific
// buyer query ("best code review tools for GitHub"). The shape leaves room
// for other editorial types (vs, alternatives, guides) later without a
// restructure, but only best-of is built and should be treated as real.

import { byBandThenName } from "../lib/picks.js";

export const EXPLORE_GROUPS = ["Best of"];

export const EXPLORE_ARTICLES = [
  {
    slug: "best-code-review-tools-for-github",
    type: "best-of",
    group: "Best of",
    provider: "GitHub",
    source: { key: "github_cloud" },
    short: "Code quality, security and code review tools that integrate with GitHub.",
    intro: [
      "GitHub is the most widely used git hosting platform, which also makes it the one with the widest selection of review and security tooling. Most tools here integrate as a GitHub App, reading pull requests and posting review comments, status checks and merge-gate decisions directly on the PR.",
      "GitHub also sells its own tooling, so a fair comparison includes it. Dependabot raises dependency alerts and upgrade pull requests, the paid Code Security and Secret Protection add-ons cover CodeQL static analysis and secret scanning with push protection, GitHub Code Quality flags maintainability and reliability issues, and Copilot code review adds AI review comments for teams on a Copilot plan. Staying first-party means one fewer vendor to approve, no extra app permissions and findings in a single place.",
      "On the other side, GitHub doesn't document test coverage tracking, complexity or duplication metrics, reachability analysis for dependency findings, or scanning for Terraform and container images, and teams that also host code on GitLab or Bitbucket need a separate setup there. Specialised tools are usually brought in for one of those gaps, or for more depth in a single area, at the cost of another vendor and another set of permissions. The useful comparison is capability by capability, against what your team actually needs.",
    ],
    lookFor: [
      "Whether the tool installs as a GitHub App (repo-scoped permissions) or asks for a personal access token with broader access",
      "Whether it duplicates a capability GitHub Advanced Security or Copilot already covers on your current plan",
      "GitHub Marketplace listing and pricing, if you'd rather billing go through GitHub directly",
      "Rate-limit behavior on large monorepos or high pull-request volume",
    ],
  },
  {
    slug: "best-code-review-tools-for-github-enterprise-server",
    type: "best-of",
    group: "Best of",
    provider: "GitHub Enterprise Server",
    source: { key: "github_enterprise_server" },
    short: "Code quality, security and code review tools that support a self-hosted GitHub Enterprise Server instance.",
    intro: [
      "GitHub Enterprise Server (GHES) is GitHub's self-hosted edition, run inside an organization's own network rather than on github.com. That single fact changes which tools are even eligible: a cloud-only scanner cannot reach a GHES instance behind a firewall unless the organization opens access for it, however well it integrates with GitHub.",
      "Tools that support GHES generally reach it in one of three ways: inbound access through a firewall allowlist for the vendor's IP addresses, an outbound connector the instance calls out through, or a self-hosted deployment of the tool inside the same network. Each trades setup effort against how much network access your security team has to approve. GitHub's own Code Security and Secret Protection add-ons are also sold for GHES and run inside the instance, which avoids the network question, though new features reach GHES on its own release cycle. Version compatibility applies to every option, since a tool built against the current GitHub API may not support an org running an older GHES release.",
    ],
    lookFor: [
      "Whether the tool needs inbound network access to GHES, or connects outbound instead",
      "Which GHES versions are certified to work, not just \"GitHub\" generically",
      "Whether the tool itself needs to run on-prem to reach an air-gapped GHES instance",
      "GitHub App support on GHES specifically, since some integrations are cloud-only",
    ],
  },
  {
    slug: "best-code-review-tools-for-gitlab",
    type: "best-of",
    group: "Best of",
    provider: "GitLab",
    source: { key: "gitlab_cloud" },
    short: "Code quality, security and code review tools that integrate with GitLab's merge request workflow.",
    intro: [
      "GitLab's review workflow is built around the merge request (MR) rather than the pull request, and its CI/CD pipelines are native to the platform rather than a bolted-on integration. Tools built for GitLab typically post findings as MR discussion threads and can participate directly in pipeline stages, rather than only reacting to a webhook after the fact.",
      "GitLab also ships its own security scanning, including SAST, secret detection, dependency scanning and container scanning. Some scanners run on every tier, but the merge request security widget, the security dashboard and vulnerability management need GitLab Ultimate. For a team already on Ultimate, that native set means no extra vendor and findings in the same merge request and pipeline as everything else. A third-party tool tends to earn its place elsewhere: a team on Free or Premium that doesn't want the Ultimate upgrade, a need for more depth in one area than GitLab's scanners offer, or one setup across GitLab and another git platform. Comparing capability by capability, with the Ultimate license cost included, gives a better answer than a general rule either way.",
    ],
    lookFor: [
      "Whether findings appear as MR discussion threads or only in a separate dashboard",
      "Whether the tool runs as a pipeline job (full log/artifact access) or purely via API/webhook",
      "Overlap with GitLab Ultimate's built-in SAST, dependency and secret scanning",
      "Support for merge trains and approval rules, if your team uses them",
    ],
  },
  {
    slug: "best-code-review-tools-for-gitlab-self-managed",
    type: "best-of",
    group: "Best of",
    provider: "GitLab Self-Managed",
    source: { key: "gitlab_self_managed" },
    short: "Code quality, security and code review tools that support a self-managed GitLab instance.",
    intro: [
      "Self-managed GitLab runs on infrastructure the organization controls, often chosen for data-residency or air-gap requirements that GitLab.com cannot satisfy. As with any self-hosted git platform, a tool's support for GitLab.com does not automatically mean it supports a self-managed instance behind a private network.",
      "The tools that do tend to fall into two groups: those offering their own self-hosted deployment so the whole pipeline stays inside the same network boundary, and cloud-hosted tools that support an outbound connection from a self-managed instance to the vendor's API.",
    ],
    lookFor: [
      {
        label: "A deployment model that fits",
        text: "Start with whether the instance can reach the internet. An air-gapped instance needs a reviewer or scanner with a documented offline install. A private but connected one can also use a cloud service through a broker or tunnel, which leaves less to run and upgrade, though code or results then leave your network.",
      },
      {
        label: "Where the AI model runs",
        text: "A self-hosted AI reviewer still has to send code to a language model. Check whether it can call a model endpoint you host, or whether prompts leave your network for the vendor's provider, since that can matter more than where the reviewer itself runs. A model you host keeps prompts in your network, but running it becomes your job, and review quality depends on the model you choose.",
      },
      {
        label: "Pipeline job or API connection",
        text: "A scanner that runs as a GitLab CI/CD job uses your own runners, though check whether the job sends code to a vendor's model API or uploads results to a vendor platform. A reviewer that works through webhooks and the API can comment and reply on merge requests without pipeline changes, but needs network paths to and from the instance, which your security team will want to approve.",
      },
      {
        label: "Compatibility with your GitLab release",
        text: "Self-managed instances are often pinned to an older release. During a trial or proof of concept, confirm merge request comments, status checks and approval rules work on the version you run, and ask how closely the self-hosted edition tracks the vendor's cloud release.",
      },
      {
        label: "The full cost of self-hosting",
        text: "Several vendors sell self-hosting only on enterprise contracts, sometimes with a seat minimum or no self-hosted trial, and the install itself can need Kubernetes, PostgreSQL and someone to run upgrades. Price that whole picture rather than the entry per-seat rate, including any GitLab tier an integration needs before it can display findings.",
      },
    ],
    picks: [
      {
        slug: "sonarqube",
        comment: "SonarQube Server runs inside a private network, and offline license activation suits isolated instances. One analysis covers quality and security, with quality gates on GitLab merge requests, though SCA is a separate subscription and paid editions are quote-only.",
      },
      {
        slug: "deepsource",
        comment: "Quality, security and coverage tracking come together in DeepSource Enterprise Server, which runs on Kubernetes and has a documented air-gapped install. Connecting a self-managed GitLab instance requires that edition, which is custom-priced.",
      },
      {
        slug: "qodo",
        comment: "Multi-agent AI review is the core of Qodo. On the Enterprise plan it installs on Kubernetes inside your network, air-gapped if needed, and can call a local LLM gateway, though dependency and IaC scanning are not included.",
      },
      {
        slug: "greptile",
        comment: "Reviews draw on a graph of the whole repository. Greptile's self-hosted Enterprise edition can run air-gapped with self-hosted LLMs, but must stay within 30 days of the cloud release, with a 30-day refund instead of a trial.",
      },
      {
        slug: "codescene",
        comment: "Deployed as a Docker container or Java JAR on your own infrastructure, CodeScene offers an offline mode for strict security requirements. It analyzes code health and Git history rather than security, so pair it with a dedicated security scanner.",
      },
      {
        slug: "codeant",
        comment: "CodeAnt combines AI merge request review with SAST, SCA, secrets, IaC and code quality checks. Its Enterprise plan adds on-premises, VPC or fully air-gapped deployment, though no install or sizing requirements are published.",
      },
      {
        slug: "coderabbit",
        comment: "Self-hosting CodeRabbit's AI review, which layers in 57 linters and SAST tools, requires the Enterprise plan and at least 500 seats. You can bring your own LLM provider, though license validation still needs an outbound connection.",
      },
      {
        slug: "semgrep",
        comment: "Semgrep's open-source engine can run offline as a GitLab CI/CD job with local rule files. The SaaS AppSec Platform adds merge request comments and triage, with on-premises repository support on Enterprise and a Network Broker for private networks.",
      },
      {
        slug: "aikido",
        comment: "Aikido covers SAST, secrets, SCA, IaC and containers, and can enforce results through GitLab merge request approval rules. Its Local Scanner on Pro still reports to Aikido Cloud, so fully offline use needs the separately priced Aikido Machine.",
      },
      {
        slug: "checkmarx",
        comment: "With nine first-party scanners and GitLab CI/CD pipeline templates, Checkmarx One suits enterprise AppSec programs, though the platform itself is vendor-hosted. On-premises scanning relies on the separate legacy CxSAST product, which covers SAST only.",
      },
      {
        slug: "snyk",
        comment: "Code, dependency, container and IaC scanning share one Snyk platform, and its checks can fail a GitLab merge request pipeline on severity. Scanning stays Snyk-hosted, with connectors such as the Broker Client running in your network on the Enterprise plan.",
      },
      {
        slug: "cursor-bugbot",
        comment: "Bugbot posts merge request findings with fix suggestions that open in Cursor, and on Enterprise it reaches a private GitLab instance over AWS PrivateLink or Cloudflare Tunnel. It is cloud-only, and each review is billed on top of seats.",
      },
      {
        slug: "corgea",
        comment: "Business-logic and auth flaws are the focus of Corgea's AI SAST, with inline merge request comments from the Growth plan. There is no self-hosted install, and even the single-tenant Enterprise option is Corgea-hosted.",
      },
      {
        slug: "claude-code",
        comment: "Self-managed GitLab support is partial: the GitLab CI/CD integration is a GitLab-maintained beta, and managed Code Review covers GitHub only. A local security plugin works from networks that block inbound traffic, but still needs outbound access to Claude models.",
      },
      {
        slug: "chatgpt-codex",
        comment: "On GitLab, Codex works only through CI jobs, since its PR reviewer is GitHub-only, and SARIF display needs GitLab Ultimate 19.2 or later. Codex Security, not on the Plus plan, can fail pipelines on severity and use Amazon Bedrock models.",
      },
      {
        slug: "gemini-code-assist",
        comment: "Gemini Code Assist carries ISO 27001 and SOC 2 certifications and IP indemnification, but pull request review is built around GitHub, so GitLab support is partial. It is cloud-only, and new subscriptions now go through Google Cloud sales.",
      },
    ],
  },
  {
    slug: "best-code-review-tools-for-bitbucket",
    type: "best-of",
    group: "Best of",
    provider: "Bitbucket",
    source: { key: "bitbucket_cloud" },
    short: "Code quality, security and code review tools that integrate with Bitbucket.",
    intro: [
      "Bitbucket is Atlassian's hosted git platform, most often chosen by teams already standardized on the Atlassian stack, using Jira for tracking, Bitbucket Pipelines for CI, and Confluence for docs. Review and security tools here typically integrate through the Bitbucket REST API and post findings as PR comments or build statuses on Pipelines.",
      "The ecosystem of third-party tools supporting Bitbucket is smaller than GitHub's or GitLab's, which narrows the field faster than it does for the bigger platforms. Jira integration is also a bigger differentiator here than on other platforms, since a Bitbucket-hosted team is disproportionately likely to already be running Jira.",
    ],
    lookFor: [
      "Native Bitbucket Pipelines integration versus a generic webhook that happens to work",
      "Jira integration quality, if findings need to become tracked tickets",
      "Whether the tool is listed on the Atlassian Marketplace",
      "Bitbucket-specific rate limits, which are stricter than GitHub's for some API categories",
    ],
  },
  {
    slug: "best-code-review-tools-for-bitbucket-data-center",
    type: "best-of",
    group: "Best of",
    provider: "Bitbucket Data Center",
    source: { key: "bitbucket_data_center" },
    short: "Code quality, security and code review tools that support Bitbucket Data Center, Atlassian's self-hosted edition.",
    intro: [
      "Bitbucket Data Center is Atlassian's self-hosted, clustered edition of Bitbucket, aimed at large enterprises with their own infrastructure and often a regulatory reason for keeping source code on-prem. It replaced the now end-of-life Bitbucket Server, and support for one does not imply support for the other, so check that a tool names Data Center specifically, not just \"Bitbucket Server\" from older documentation.",
      "Organizations run Data Center for different reasons, and the reason shapes the shortlist. Where the driver is keeping source code on-prem, a tool with its own self-hosted or air-gapped deployment is usually the realistic fit, since a cloud scanner would mean sending that code outside. Where Data Center was chosen for other reasons, such as existing infrastructure or a long-standing Atlassian setup, a cloud-hosted tool can work well if the instance is reachable from the vendor's network or through a connector, and it saves the team from running another self-hosted service.",
    ],
    lookFor: [
      "Whether documentation specifically names Data Center, rather than the retired Bitbucket Server",
      "Compatibility with a clustered, high-availability Bitbucket deployment",
      "Whether the scanning tool itself can be self-hosted or air-gapped to match",
      "SSO/SAML alignment with the same identity provider Data Center is configured against",
    ],
  },
  {
    slug: "best-code-review-tools-for-azure-devops",
    type: "best-of",
    group: "Best of",
    provider: "Azure DevOps",
    source: { key: "azure_devops" },
    short: "Code quality, security and code review tools that integrate with Azure DevOps Repos and Pipelines.",
    intro: [
      "Azure DevOps bundles source control (Repos), CI/CD (Pipelines), and work tracking (Boards) into one Microsoft-operated product, and is disproportionately common among teams already standardized on the Microsoft/.NET stack. Tools here typically integrate as an Azure DevOps extension from the Visual Studio Marketplace, or via a pipeline task that runs as a build step.",
      "Azure DevOps has one of the smaller pools of third-party tool support among the platforms tracked here. Several tools list Azure Pipelines as a supported CI system without listing Azure Repos as a supported git provider. The two are separate integration points, and a tool can support one without the other.",
    ],
    lookFor: [
      "Whether Azure Repos (source) is supported, not just Azure Pipelines (CI), since they're listed separately in most vendor docs",
      "Whether the integration is a pipeline task, a service hook, or a full Visual Studio Marketplace extension",
      "Work item linking to Azure Boards, if findings need to become tracked tasks",
      "Support for both Azure DevOps Services (cloud) and Azure DevOps Server (self-hosted), which are different products",
    ],
  },
];

export function getExploreArticle(slug) {
  return EXPLORE_ARTICLES.find((a) => a.slug === slug) || null;
}

/**
 * Tools for a best-of article: every tool documented as integrating with the
 * platform, full support first, then partial support, alphabetically within
 * each band. Pages shuffle this list on every load, so the order here is only
 * the neutral fallback for crawlers and readers without JavaScript.
 */
export function rankToolsForArticle(article, tools) {
  const key = article.source.key;
  const valueOf = (t) => t.values?.gitProviders?.[key] || "unknown";
  return tools
    .filter((t) => valueOf(t) === "yes" || valueOf(t) === "partial")
    .map((t) => ({ ...t, partial: valueOf(t) === "partial" }))
    .sort(byBandThenName);
}
