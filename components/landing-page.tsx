"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { JournalCard } from "@/components/journal-card";
import {
  entryTypes,
  missionReasons,
  navItems,
  whyICarePoints,
} from "@/components/site-data";
import {
  formatActivityKind,
  formatRelativeSource,
  type GithubActivity,
  type GithubDataset,
} from "@/lib/github-data";

type LandingPageProps = {
  githubData: GithubDataset;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function LandingPage({ githubData }: LandingPageProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>("all");

  const filteredRepos =
    selectedRepo === "all"
      ? githubData.repos
      : githubData.repos.filter((repo) => repo.fullName === selectedRepo);

  const filteredActivity =
    selectedRepo === "all"
      ? githubData.activity
      : githubData.activity.filter(
          (item) => item.repo.fullName === selectedRepo,
        );

  const filteredTimeline =
    selectedRepo === "all"
      ? githubData.timeline
      : githubData.timeline.filter(
          (group) => group.repo.fullName === selectedRepo,
        );

  const heroItems = githubData.activity.slice(0, 3);
  const profileFeed = githubData.activity.slice(0, 5);
  const proofItems = filteredActivity.slice(0, 6);
  const filteredJournalEntries = selectedRepo === "all"
    ? githubData.journalEntries
    : githubData.journalEntries.filter(
        (entry) => entry.repoFullName === selectedRepo,
      );
  const journalEntries = filteredJournalEntries.slice(0, 2);

  return (
    <main id="content" className="page-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            ₿
          </span>
          <span>
            <strong>Bitcoin Dev Journal</strong>
            <small>Public proof-of-work for builders</small>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Reveal className="quote-note" delay={0.04} y={12}>
        <p>
          “Transparency is your friend. Writing up your conclusions in a public
          place is valuable collateral that can forever serve as evidence of
          your progress.”
        </p>
        <span>Adam Jonas</span>
      </Reveal>

      <section className="hero-section">
        <Reveal className="hero-copy">
          <p className="section-eyebrow">Public proof-of-work journal</p>
          <h1>Bitcoin Dev Journal</h1>
          <p className="hero-subtitle">
            A public record of how I am learning, contributing, and building in Bitcoin open source.
          </p>
          <p className="hero-body">
            Shaped by my path through BDK, review work, issue exploration, and building Root Wallet to make Bitcoin wallet ideas concrete.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#proof">
              View Proof of Work
            </a>
            <a className="button button-secondary" href="#profile">
              See Public Profile Mockup
            </a>
          </div>

          <div className="source-strip">
            <span className="source-pill">{formatRelativeSource(githubData.meta.source)}</span>
            <span className="source-note">
              Generated {formatDateTime(githubData.meta.generatedAt)}
            </span>
          </div>
        </Reveal>

        <Reveal className="hero-dashboard-shell" delay={0.12}>
          <div className="hero-dashboard">
            <div className="dashboard-glow" aria-hidden="true" />
            <div className="dashboard-header">
              <div>
                <p className="callout-label">Live dashboard</p>
                <h2>Visible progress, not hidden effort</h2>
              </div>
              <span className="status-pill">
                {githubData.meta.tokenUsed
                  ? "Token enabled"
                  : githubData.meta.source === "fallback"
                    ? "Fallback-safe"
                    : "Public API"}
              </span>
            </div>

            <div className="metric-grid">
              {githubData.signals.map((signal) => (
                <motion.article
                  key={signal.label}
                  className="metric-card"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <p>{signal.label}</p>
                  <h3>
                    <CountUp value={signal.value} suffix={signal.suffix} />
                  </h3>
                  <span>{signal.note}</span>
                </motion.article>
              ))}
            </div>

            <div className="dashboard-panel">
              <div className="panel-label-row">
                <p className="callout-label">Recent contribution highlights</p>
                <span className="timeline-chip">
                  {githubData.repos.length} tracked repos
                </span>
              </div>
              <div className="highlight-list">
                {heroItems.map((item) => (
                  <a
                    key={item.id}
                    className="highlight-item"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{formatActivityKind(item.kind)}</span>
                    <strong>{item.title}</strong>
                    <small>
                      {item.repo.label} · {formatDate(item.date)}
                    </small>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal id="problem" className="content-grid" y={28}>
        <article className="surface-card">
          <SectionHeading
            eyebrow="The gap"
            title="A lot of the work shaping my path happens before there is an obvious artifact to point at."
            intro="Code reading, review, issue narrowing, and concept work are real progress. They just disappear unless I log them."
          />
          <p>
            Bitcoin Dev Journal is the structure I wanted for that middle layer between curiosity and contribution.
          </p>
        </article>

        <aside className="callout-card">
          <p className="callout-label">Why this matters</p>
          <h3>My path is not only the merged diff. It is the trail that leads to it.</h3>
          <p>
            The journal makes the thinking around the work visible enough to learn from, share, and fund.
          </p>
        </aside>
      </Reveal>

      <section id="concept" className="section-stack">
        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="Why I care"
            title="I’m proposing this from inside the work, not from a distance."
            intro="My path has been shaped by learning in public, reading code before I feel ready to change it, reviewing PRs to sharpen judgment, exploring issue context before proposing fixes, and building Root Wallet to make wallet concepts concrete."
          />
          <div className="two-column">
            <div className="body-stack">
              <p>
                A lot of the work shaping me has happened in that quiet middle layer: understanding descriptors, seeing why interface shape matters, or narrowing the real problem before touching a patch.
              </p>
              <p>
                Bitcoin Dev Journal grew out of wanting that layer to stay visible.
              </p>
            </div>

            <ul className="stack-list">
              {whyICarePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="surface-card" delay={0.08}>
          <SectionHeading
            eyebrow="What it is"
            title="A public learning journal shaped by the way I actually move through Bitcoin open source."
            intro="A place to log what I read, reviewed, explored, built, misunderstood, and eventually understood."
          />
          <p>
            Not a feed. A working record.
          </p>
        </Reveal>
      </section>

      <Reveal id="proof" className="surface-card proof-shell">
        <SectionHeading
          eyebrow="Live proof of work"
          title="These repositories are the actual trail of my work."
          intro="Tracked repos, recent changes, and the journal layer around them."
        />

        <div className="proof-summary-row">
          <div className="proof-mini-stats">
            <article className="proof-mini-card">
              <span>Repos</span>
              <strong>{filteredRepos.length}</strong>
            </article>
            <article className="proof-mini-card">
              <span>Recent items</span>
              <strong>{proofItems.length}</strong>
            </article>
            <article className="proof-mini-card">
              <span>Journal notes</span>
              <strong>{filteredJournalEntries.length}</strong>
            </article>
          </div>

          <div className="filter-row" role="tablist" aria-label="Repository filters">
            <button
              type="button"
              className={selectedRepo === "all" ? "filter-chip is-active" : "filter-chip"}
              onClick={() => setSelectedRepo("all")}
            >
              All repos
            </button>
            {githubData.repos.map((repo) => (
              <button
                key={repo.fullName}
                type="button"
                className={
                  selectedRepo === repo.fullName
                    ? "filter-chip is-active"
                    : "filter-chip"
                }
                onClick={() => setSelectedRepo(repo.fullName)}
              >
                {repo.label}
              </button>
            ))}
          </div>
        </div>

        <div className="proof-layout">
          <div className="proof-main">
            <div className="panel-label-row">
              <p className="callout-label">Recent activity</p>
              <span className="timeline-chip">
                {filteredActivity.length} total
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRepo}
                className="proof-feed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                {proofItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    className="proof-item"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="proof-item-top">
                      <span className={`kind-pill kind-${item.kind}`}>
                        {formatActivityKind(item.kind)}
                      </span>
                      <span className="activity-date">{formatDate(item.date)}</span>
                    </div>
                    <strong>{item.title}</strong>
                    <div className="proof-item-bottom">
                      <span>{item.repo.label}</span>
                      <small>{item.status}</small>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="proof-side">
            <div className="surface-inset proof-focus">
              <p className="callout-label">Repository focus</p>
              <div className="proof-focus-list">
                {filteredTimeline.map((group) => (
                  <div key={group.repo.fullName} className="repo-focus-card">
                    <div className="timeline-header">
                      <h3>{group.repo.label}</h3>
                      <span>{group.items.length}</span>
                    </div>
                    <p>{group.repo.narrative}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Reveal>

      <Reveal id="journal" className="surface-card">
        <SectionHeading
          eyebrow="Journal layer"
          title="This is the part GitHub does not capture."
          intro="Reading until something clicks. Narrowing the real problem. Writing until the understanding feels owned."
        />

        <div className="journal-grid">
          {journalEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="Why I built Root Wallet"
          title="I built Root Wallet because I did not want my Bitcoin learning to stay abstract."
          intro="I wanted a product lane where wallet concepts had to survive real app decisions."
        />
        <div className="two-column">
          <div className="body-stack">
            <p>
              Root Wallet is where upstream understanding and product decisions pressure each other.
            </p>
            <p>
              It is both a product and a learning instrument.
            </p>
          </div>
          <div className="surface-inset">
            <p className="callout-label">What Root Wallet gives me</p>
            <ul className="stack-list compact-list">
              <li>A place where wallet concepts have to survive user-facing decisions</li>
              <li>A concrete link between BDK learning and product building</li>
              <li>A way to test intuition instead of keeping it theoretical</li>
              <li>A public lane where upstream understanding can become shipped work</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="Featured repositories"
          title="These repos are chapters in my journey."
          intro="Each one matters because of what it is teaching me and what kind of contribution it pulls out of me."
        />
        <div className="repo-grid">
          {githubData.repos.map((repo, index) => (
            <motion.a
              key={repo.fullName}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="repo-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              whileHover={{ y: -6 }}
            >
              <div className="repo-topline">
                <span className="repo-name">{repo.fullName}</span>
                <span className="source-pill source-pill-small">
                  {repo.status === "live" ? "Live" : "Fallback"}
                </span>
              </div>
              <p className="repo-description">{repo.description}</p>
              <p className="repo-narrative">{repo.narrative}</p>
              <div className="repo-metrics">
                <span>{repo.language ?? "Unknown language"}</span>
                <span>{repo.stars === null ? "Stars live on build" : `${repo.stars} stars`}</span>
                <span>{repo.forks === null ? "Forks live on build" : `${repo.forks} forks`}</span>
              </div>
              <ul className="tag-list">
                {repo.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </motion.a>
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="What developers log"
          title="These are the entries that make my path legible."
          intro="Not just shipped code. The route to shipped code."
        />
        <div className="tri-grid">
          {entryTypes.map((entry, index) => (
            <motion.article
              key={entry.title}
              className="info-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              whileHover={{ y: -5 }}
            >
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </motion.article>
          ))}
        </div>
      </Reveal>

      <Reveal id="profile" className="surface-card profile-showcase">
        <SectionHeading
          eyebrow="Dynamic public profile"
          title="A builder profile that reads like my actual trail."
          intro="Less persona, more proof."
        />

        <div className="profile-shell">
          <aside className="profile-sidebar">
            {githubData.profile.avatarUrl ? (
              <img
                className="profile-avatar-image"
                src={githubData.profile.avatarUrl}
                alt={`${githubData.profile.name} GitHub avatar`}
              />
            ) : (
              <div className="profile-avatar-fallback" aria-hidden="true">
                J
              </div>
            )}
            <h3>{githubData.profile.name}</h3>
            <p className="profile-role">Bitcoin open-source contributor</p>
            <p className="profile-meta">
              Learning in public through BDK, review work, issue exploration, and Root Wallet.
            </p>
            <p className="profile-bio">{githubData.profile.bio}</p>
            <dl className="profile-stats">
              <div>
                <dt>Repos tracked</dt>
                <dd>
                  <CountUp value={githubData.repos.length} />
                </dd>
              </div>
              <div>
                <dt>Feed items</dt>
                <dd>
                  <CountUp value={githubData.activity.length} />
                </dd>
              </div>
              <div>
                <dt>Followers</dt>
                <dd>{githubData.profile.followers ?? "—"}</dd>
              </div>
              <div>
                <dt>Public repos</dt>
                <dd>{githubData.profile.publicRepos ?? "—"}</dd>
              </div>
            </dl>
            <a
              className="button button-secondary profile-link"
              href={githubData.profile.url}
              target="_blank"
              rel="noreferrer"
            >
              Open GitHub Profile
            </a>
          </aside>

          <div className="profile-feed">
            <div className="panel-label-row">
              <div>
                <p className="callout-label">Proof-of-work stream</p>
                <h3>Recent signals</h3>
              </div>
              <span className="status-pill">Builder-to-builder</span>
            </div>

            <div className="feed-list">
              {profileFeed.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="feed-item"
                >
                  <div className={`timeline-dot kind-${item.kind}`} />
                  <div>
                    <div className="feed-meta">
                      <span>{item.repo.label}</span>
                      <small>{formatDate(item.date)}</small>
                    </div>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="Contribution signals"
          title="The themes matter as much as the events."
          intro="BDK, wallet architecture, descriptors, API clarity, cross-language surfaces, Root Wallet, learning in public."
        />
        <div className="signal-grid">
          {githubData.signals.map((signal) => (
            <div key={signal.label} className="signal-card">
              <span>{signal.label}</span>
              <strong>
                <CountUp value={signal.value} suffix={signal.suffix} />
              </strong>
              <p>{signal.note}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="Why BDP should ship this"
          title="It strengthens the same path I am already walking."
          intro="This idea comes from inside the work, not outside it."
        />
        <div className="tri-grid compact-grid">
          {missionReasons.map((reason) => (
            <article key={reason.title} className="info-card">
              <h3>{reason.title}</h3>
              <p>{reason.detail}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="closing-card">
        <p className="section-eyebrow">Closing pitch</p>
        <h2>
          Bitcoin Dev Journal is the public shape of my path through Bitcoin open source.
        </h2>
        <p>
          Reading, review, issue exploration, contribution, and Root Wallet building, kept legible in one place.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#proof">
            Revisit Proof of Work
          </a>
          <a className="button button-secondary" href="#problem">
            Read the Problem
          </a>
        </div>
      </Reveal>
    </main>
  );
}
