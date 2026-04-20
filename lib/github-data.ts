import { journalEntries, type JournalEntry } from "@/data/journal-entries";

type RepositoryConfig = {
  owner: string;
  name: string;
  label: string;
  themes: string[];
  narrative: string;
};

type GithubRepoResponse = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  updated_at: string;
  homepage: string | null;
  topics?: string[];
};

type GithubUserResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  location: string | null;
};

type GithubSearchResponse = {
  items: Array<{
    id: number;
    title: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    state: string;
    repository_url: string;
    comments: number;
    pull_request?: {
      html_url: string;
    };
  }>;
};

type GithubCommitResponse = Array<{
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
      name: string;
    };
  };
  author: {
    login: string;
  } | null;
}>;

export type ActivityKind = "pr" | "issue" | "commit" | "journal";

export type GithubActivity = {
  id: string;
  kind: ActivityKind;
  title: string;
  summary: string;
  url: string;
  date: string;
  status: string;
  repo: {
    fullName: string;
    label: string;
  };
};

export type GithubRepoCard = {
  fullName: string;
  label: string;
  url: string;
  description: string;
  language: string | null;
  stars: number | null;
  forks: number | null;
  openIssues: number | null;
  updatedAt: string | null;
  topics: string[];
  themes: string[];
  narrative: string;
  status: "live" | "fallback";
};

export type GithubSignal = {
  label: string;
  value: number;
  suffix?: string;
  note: string;
};

export type GithubDataset = {
  meta: {
    generatedAt: string;
    source: "live" | "fallback" | "mixed";
    tokenUsed: boolean;
  };
  profile: {
    login: string;
    name: string;
    avatarUrl: string | null;
    url: string;
    bio: string;
    followers: number | null;
    publicRepos: number | null;
    location: string | null;
  };
  repos: GithubRepoCard[];
  pullRequests: GithubActivity[];
  issues: GithubActivity[];
  commits: GithubActivity[];
  journalEntries: JournalEntry[];
  activity: GithubActivity[];
  timeline: Array<{
    repo: GithubRepoCard;
    items: GithubActivity[];
  }>;
  signals: GithubSignal[];
  themes: Array<{
    label: string;
    count: number;
  }>;
  weeklyDigest: {
    entries: JournalEntry[];
    summary: string;
  };
};

export const trackedRepositories: RepositoryConfig[] = [
  {
    owner: "bitcoindevkit",
    name: "bdk-dart",
    label: "BDK Dart",
    themes: ["BDK", "Wallet architecture", "Mobile bindings"],
    narrative:
      "bdk-dart is one of the repos teaching me how wallet ideas become app-facing decisions. It keeps pulling me into the space where product feel, API shape, and Bitcoin understanding have to line up.",
  },
  {
    owner: "bitcoindevkit",
    name: "bdk-ffi",
    label: "BDK FFI",
    themes: ["FFI", "API clarity", "Cross-language surfaces"],
    narrative:
      "bdk-ffi sharpens a different part of my judgment. It makes me slow down around interface boundaries, naming, and the way good Rust-side decisions survive once they cross into other languages.",
  },
  {
    owner: "j-kon",
    name: "root_wallet",
    label: "Root Wallet",
    themes: ["Root Wallet", "Product building", "Descriptors"],
    narrative:
      "Root Wallet is where I stop letting Bitcoin learning stay abstract. It is the lane where wallet intuition, upstream open-source understanding, and user-facing product discipline have to meet in one concrete thing.",
  },
];

const fallbackDataset: GithubDataset = {
  meta: {
    generatedAt: "2026-04-19T00:00:00.000Z",
    source: "fallback",
    tokenUsed: false,
  },
  profile: {
    login: "j-kon",
    name: "Jaykon",
    avatarUrl: null,
    url: "https://github.com/j-kon",
    bio: "Learning, reviewing, contributing, and building through the BDK ecosystem while using Root Wallet to make Bitcoin wallet concepts concrete.",
    followers: null,
    publicRepos: null,
    location: null,
  },
  repos: [
    {
      fullName: "bitcoindevkit/bdk-dart",
      label: "BDK Dart",
      url: "https://github.com/bitcoindevkit/bdk-dart",
      description:
        "The Dart-facing part of the BDK ecosystem that keeps turning wallet ideas into practical app decisions for me.",
      language: "Dart",
      stars: null,
      forks: null,
      openIssues: null,
      updatedAt: "2026-04-17T09:45:00.000Z",
      topics: ["wallet", "dart", "bitcoin"],
      themes: ["BDK", "Wallet architecture", "Mobile bindings"],
      narrative:
        "This repo matters to my journey because it pulls Bitcoin understanding into the product layer. It keeps teaching me how wallet abstractions need to feel once they reach a real app surface.",
      status: "fallback",
    },
    {
      fullName: "bitcoindevkit/bdk-ffi",
      label: "BDK FFI",
      url: "https://github.com/bitcoindevkit/bdk-ffi",
      description:
        "A repo that keeps forcing me to think carefully about boundaries, naming, and how clean wallet infrastructure survives across language layers.",
      language: "Rust",
      stars: null,
      forks: null,
      openIssues: null,
      updatedAt: "2026-04-16T13:10:00.000Z",
      topics: ["ffi", "rust", "bitcoin"],
      themes: ["FFI", "API clarity", "Cross-language surfaces"],
      narrative:
        "This is one of the places shaping my review discipline. It makes invisible work like interface reading, naming judgment, and architecture sensitivity feel worth documenting.",
      status: "fallback",
    },
    {
      fullName: "j-kon/root_wallet",
      label: "Root Wallet",
      url: "https://github.com/j-kon/root_wallet",
      description:
        "My wallet product lane, where Bitcoin learning stops being abstract and has to survive real user-facing decisions.",
      language: "Dart",
      stars: null,
      forks: null,
      openIssues: null,
      updatedAt: "2026-04-18T20:05:00.000Z",
      topics: ["wallet", "flutter", "bitcoin"],
      themes: ["Root Wallet", "Product building", "Descriptors"],
      narrative:
        "I built Root Wallet because I wanted a place where Bitcoin learning, wallet intuition, and app-building discipline could pressure each other in public.",
      status: "fallback",
    },
  ],
  pullRequests: [
    {
      id: "fallback-pr-review",
      kind: "pr",
      title: "Tightened review notes around a BDK FFI pull request",
      summary:
        "Mapped the FFI surface first so feedback could focus on naming, intent, and API shape instead of surface-level noise.",
      url: "https://github.com/bitcoindevkit/bdk-ffi/pulls",
      date: "2026-04-18T15:20:00.000Z",
      status: "Reviewed",
      repo: {
        fullName: "bitcoindevkit/bdk-ffi",
        label: "BDK FFI",
      },
    },
    {
      id: "fallback-pr-root-wallet",
      kind: "pr",
      title: "Shipped a Root Wallet improvement after narrowing the actual bug",
      summary:
        "Used issue exploration and wallet-flow tracing to reduce the fix to the part that really mattered.",
      url: "https://github.com/j-kon/root_wallet",
      date: "2026-04-17T12:10:00.000Z",
      status: "Shipped",
      repo: {
        fullName: "j-kon/root_wallet",
        label: "Root Wallet",
      },
    },
  ],
  issues: [
    {
      id: "fallback-issue-context",
      kind: "issue",
      title: "Explored issue context before proposing a change",
      summary:
        "Read earlier discussion, traced assumptions, and narrowed the work before turning it into code.",
      url: "https://github.com/bitcoindevkit/bdk-dart/issues",
      date: "2026-04-16T10:00:00.000Z",
      status: "Context",
      repo: {
        fullName: "bitcoindevkit/bdk-dart",
        label: "BDK Dart",
      },
    },
  ],
  commits: [
    {
      id: "fallback-commit-root-wallet",
      kind: "commit",
      title: "Committed a Root Wallet change tied to descriptor learning",
      summary:
        "Closed the loop between product work and upstream Bitcoin concepts instead of treating them as separate tracks.",
      url: "https://github.com/j-kon/root_wallet",
      date: "2026-04-18T20:05:00.000Z",
      status: "Commit",
      repo: {
        fullName: "j-kon/root_wallet",
        label: "Root Wallet",
      },
    },
  ],
  journalEntries,
  activity: [],
  timeline: [],
  signals: [],
  themes: [
    { label: "BDK", count: 2 },
    { label: "Wallet architecture", count: 2 },
    { label: "Descriptors", count: 1 },
    { label: "API clarity", count: 1 },
    { label: "Root Wallet", count: 1 },
    { label: "Learning in public", count: 1 },
  ],
  weeklyDigest: {
    entries: [],
    summary: "",
  },
};

fallbackDataset.activity = [
  ...journalEntries.map((entry) => ({
    id: `journal-${entry.id}`,
    kind: "journal" as const,
    title: entry.title,
    summary: entry.learned,
    url: entry.link ?? `https://github.com/${entry.repoFullName}`,
    date: entry.date,
    status: "Journal",
    repo: {
      fullName: entry.repoFullName,
      label:
        trackedRepositories.find(
          (repo) => `${repo.owner}/${repo.name}` === entry.repoFullName,
        )?.label ?? entry.repoFullName.split("/")[1],
    },
  })),
  ...fallbackDataset.pullRequests,
  ...fallbackDataset.issues,
  ...fallbackDataset.commits,
].sort((a, b) => b.date.localeCompare(a.date));

fallbackDataset.timeline = fallbackDataset.repos.map((repo) => ({
  repo,
  items: fallbackDataset.activity.filter(
    (item) => item.repo.fullName === repo.fullName,
  ),
}));

fallbackDataset.signals = [
  {
    label: "Journal entries",
    value: journalEntries.length,
    note: "The part of my path that would be lost if I only showed GitHub links.",
  },
  {
    label: "Repos tracked",
    value: fallbackDataset.repos.length,
    note: "Core Bitcoin work plus the product lane in Root Wallet.",
  },
  {
    label: "Recent PRs",
    value: fallbackDataset.pullRequests.length,
    note: "Pull requests and review-shaped work currently surfaced in the demo.",
  },
  {
    label: "Learning notes",
    value: journalEntries.filter((entry) => entry.type !== "shipping").length,
    note: "Readings, reflections, and review notes that would otherwise disappear from the public record.",
  },
  {
    label: "Shipped artifacts",
    value:
      fallbackDataset.commits.length +
      journalEntries.filter((entry) => entry.type === "shipping").length,
    note: "Shipped work connected back to the learning trail.",
  },
];

fallbackDataset.weeklyDigest = {
  entries: journalEntries.slice(0, 4),
  summary:
    "This week felt like a clear snapshot of how my Bitcoin open-source path is taking shape. I reviewed a BDK FFI pull request with more attention to interface shape, explored issue context in bdk-dart before moving toward code, used BIP-86 reading to tighten my wallet mental model, and connected that learning back to Root Wallet so the ideas had to survive contact with a real product.",
};

function getRepoFullName(repositoryUrl: string) {
  return repositoryUrl.split("/repos/")[1] ?? repositoryUrl;
}

function getRepoConfig(fullName: string) {
  return (
    trackedRepositories.find(
      (repo) => `${repo.owner}/${repo.name}`.toLowerCase() === fullName.toLowerCase(),
    ) ?? null
  );
}

function toTitleCase(kind: ActivityKind) {
  if (kind === "pr") {
    return "Pull request";
  }

  if (kind === "issue") {
    return "Issue";
  }

  if (kind === "journal") {
    return "Journal";
  }

  return "Commit";
}

async function fetchGithub<T>(path: string, token?: string): Promise<T | null> {
  try {
    const response = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "bitcoin-dev-journal-build",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function mergeRepoCard(
  fallbackRepo: GithubRepoCard,
  liveRepo: GithubRepoResponse | null,
): GithubRepoCard {
  if (!liveRepo) {
    return fallbackRepo;
  }

  return {
    ...fallbackRepo,
    url: liveRepo.html_url,
    description: liveRepo.description ?? fallbackRepo.description,
    language: liveRepo.language ?? fallbackRepo.language,
    stars: liveRepo.stargazers_count,
    forks: liveRepo.forks_count,
    openIssues: liveRepo.open_issues_count,
    updatedAt: liveRepo.updated_at,
    topics: liveRepo.topics ?? fallbackRepo.topics,
    status: "live",
  };
}

function createSearchActivity(
  item: GithubSearchResponse["items"][number],
  kind: ActivityKind,
): GithubActivity {
  const repoFullName = getRepoFullName(item.repository_url);
  const config = getRepoConfig(repoFullName);

  return {
    id: `${kind}-${item.id}`,
    kind,
    title: item.title,
    summary:
      kind === "pr"
        ? `${item.comments} comment${item.comments === 1 ? "" : "s"} around the change so far.`
        : `${item.comments} comment${item.comments === 1 ? "" : "s"} in the thread so far.`,
    url: item.html_url,
    date: item.updated_at || item.created_at,
    status: item.state === "open" ? "Open" : "Closed",
    repo: {
      fullName: repoFullName,
      label: config?.label ?? repoFullName.split("/")[1] ?? repoFullName,
    },
  };
}

function createCommitActivity(
  item: GithubCommitResponse[number],
  repo: GithubRepoCard,
): GithubActivity {
  const title = item.commit.message.split("\n")[0]?.trim() || "Commit";

  return {
    id: `commit-${item.sha}`,
    kind: "commit",
    title,
    summary: `Authored by ${item.commit.author.name} and surfaced from the tracked repository timeline.`,
    url: item.html_url,
    date: item.commit.author.date,
    status: "Commit",
    repo: {
      fullName: repo.fullName,
      label: repo.label,
    },
  };
}

function mergeSignals(data: GithubDataset): GithubSignal[] {
  return [
    {
      label: "Journal entries",
      value: data.journalEntries.length,
      note: "The part of my path that would be lost if I only showed GitHub links.",
    },
    {
      label: "Repos tracked",
      value: data.repos.length,
      note: "Tracked repositories that anchor the proof-of-work story.",
    },
    {
      label: "Recent PRs",
      value: data.pullRequests.length,
      note: "Pull requests surfaced from GitHub search at build time.",
    },
    {
      label: "Learning notes",
      value: data.journalEntries.filter((entry) => entry.type !== "shipping").length,
      note: "Readings, reflections, and review notes that strengthen the visible trail around my contributions.",
    },
    {
      label: "Shipped artifacts",
      value:
        data.commits.length +
        data.journalEntries.filter((entry) => entry.type === "shipping").length,
      note: "Commits and product improvements tied back to the learning path.",
    },
  ];
}

function mergeThemes(repos: GithubRepoCard[]) {
  const counts = new Map<string, number>();

  repos.forEach((repo) => {
    repo.themes.forEach((theme) => {
      counts.set(theme, (counts.get(theme) ?? 0) + 1);
    });
  });

  journalEntries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function createJournalActivity(entry: JournalEntry): GithubActivity {
  return {
    id: `journal-${entry.id}`,
    kind: "journal",
    title: entry.title,
    summary: entry.learned,
    url: entry.link ?? `https://github.com/${entry.repoFullName}`,
    date: entry.date,
    status: "Journal",
    repo: {
      fullName: entry.repoFullName,
      label:
        trackedRepositories.find(
          (repo) => `${repo.owner}/${repo.name}` === entry.repoFullName,
        )?.label ?? entry.repoFullName.split("/")[1],
    },
  };
}

export async function getGithubDataset(): Promise<GithubDataset> {
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_ACCESS_TOKEN ||
    process.env.GH_TOKEN ||
    "";
  const login = process.env.GITHUB_LOGIN || fallbackDataset.profile.login;

  const repoPaths = trackedRepositories.map(
    (repo) => `/repos/${repo.owner}/${repo.name}`,
  );
  const repoQuery = trackedRepositories
    .map((repo) => `repo:${repo.owner}/${repo.name}`)
    .join(" ");

  const [
    userResponse,
    pullRequestResponse,
    issueResponse,
    ...repoResponses
  ] = await Promise.all([
    fetchGithub<GithubUserResponse>(`/users/${login}`, token),
    fetchGithub<GithubSearchResponse>(
      `/search/issues?q=${encodeURIComponent(
        `is:pr author:${login} ${repoQuery}`,
      )}&sort=updated&order=desc&per_page=8`,
      token,
    ),
    fetchGithub<GithubSearchResponse>(
      `/search/issues?q=${encodeURIComponent(
        `is:issue involves:${login} ${repoQuery}`,
      )}&sort=updated&order=desc&per_page=6`,
      token,
    ),
    ...repoPaths.map((path) => fetchGithub<GithubRepoResponse>(path, token)),
  ]);

  const repos = fallbackDataset.repos.map((fallbackRepo, index) =>
    mergeRepoCard(fallbackRepo, repoResponses[index]),
  );

  const commitResponses = await Promise.all(
    repos.map((repo) =>
      fetchGithub<GithubCommitResponse>(
        `/repos/${repo.fullName}/commits?author=${encodeURIComponent(
          login,
        )}&per_page=3`,
        token,
      ),
    ),
  );

  const pullRequests =
    pullRequestResponse?.items
      .filter((item) =>
        trackedRepositories.some(
          (repo) =>
            `${repo.owner}/${repo.name}`.toLowerCase() ===
            getRepoFullName(item.repository_url).toLowerCase(),
        ),
      )
      .map((item) => createSearchActivity(item, "pr")) ??
    fallbackDataset.pullRequests;

  const issues =
    issueResponse?.items
      .filter((item) =>
        trackedRepositories.some(
          (repo) =>
            `${repo.owner}/${repo.name}`.toLowerCase() ===
            getRepoFullName(item.repository_url).toLowerCase(),
        ),
      )
      .map((item) => createSearchActivity(item, "issue")) ??
    fallbackDataset.issues;

  const commits = commitResponses.flatMap((response, index) => {
    if (!response || response.length === 0) {
      return [];
    }

    return response
      .filter((item) => item.author?.login === login || item.author === null)
      .map((item) => createCommitActivity(item, repos[index]));
  });

  const mergedCommits = commits.length > 0 ? commits : fallbackDataset.commits;
  const journalActivity = journalEntries.map(createJournalActivity);
  const activity = [...journalActivity, ...pullRequests, ...issues, ...mergedCommits].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const timeline = repos.map((repo) => ({
    repo,
    items: activity.filter((item) => item.repo.fullName === repo.fullName),
  }));

  const sourceFlags = repos.map((repo) => repo.status);
  const hasLiveRepo = sourceFlags.includes("live");
  const isAllLive =
    hasLiveRepo &&
    sourceFlags.every((flag) => flag === "live") &&
    pullRequestResponse !== null &&
    issueResponse !== null;

  const profile = userResponse
    ? {
        login: userResponse.login,
        name: userResponse.name ?? fallbackDataset.profile.name,
        avatarUrl: userResponse.avatar_url,
        url: userResponse.html_url,
        bio: userResponse.bio ?? fallbackDataset.profile.bio,
        followers: userResponse.followers,
        publicRepos: userResponse.public_repos,
        location: userResponse.location,
      }
    : fallbackDataset.profile;

  const dataset: GithubDataset = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: isAllLive ? "live" : hasLiveRepo ? "mixed" : "fallback",
      tokenUsed: Boolean(token),
    },
    profile,
    repos,
    pullRequests,
    issues,
    commits: mergedCommits,
    journalEntries,
    activity,
    timeline,
    signals: [],
    themes: mergeThemes(repos),
    weeklyDigest: {
      entries: journalEntries.slice(0, 4),
      summary:
        "This week reads like the kind of path I want this site to make visible. I moved between review, issue exploration, reading, and shipping, but the important part is how those threads kept informing each other. The journal shows not just what changed in GitHub, but what clicked, what stayed fuzzy, and how Root Wallet kept turning Bitcoin learning into concrete product decisions.",
    },
  };

  dataset.signals = mergeSignals(dataset);

  if (dataset.activity.length === 0) {
    return fallbackDataset;
  }

  return dataset;
}

export function formatRelativeSource(source: GithubDataset["meta"]["source"]) {
  if (source === "live") {
    return "Live GitHub build snapshot";
  }

  if (source === "mixed") {
    return "Mixed live plus fallback snapshot";
  }

  return "Fallback demo snapshot";
}

export function formatActivityKind(kind: ActivityKind) {
  return toTitleCase(kind);
}
