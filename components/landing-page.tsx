"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import {
  entryTypes,
  exportItems,
  flowSteps,
  githubLayers,
  missionReasons,
  navItems,
  pipelineCards,
  summaryUses,
  weeklyInputs,
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

      <section className="hero-section">
        <Reveal className="hero-copy">
          <p className="section-eyebrow">Public proof-of-work journal</p>
          <h1>Bitcoin Dev Journal</h1>
          <p className="hero-subtitle">
            A dark, living product demo for Bitcoin developers who want their
            real work to stay visible.
          </p>
          <p className="hero-body">
            This proposal is still rooted in my own Bitcoin open-source path:
            learning in public, reviewing pull requests, tracing issues before
            writing code, contributing around the BDK ecosystem, and building
            Root Wallet while turning invisible progress into proof of work.
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
            title="Bitcoin Dev Project already pushes developers toward action, but a lot of meaningful work still disappears."
            intro="Reading code, reviewing pull requests, tracing issue context, understanding wallet internals, and getting unstuck on a concept are all part of real progress. Without intentional logging, they vanish from the public record."
          />
          <p>
            That leaves a missing evidence layer right where the Bitcoin
            open-source pipeline needs one most. Developers lose a durable story
            of momentum. Reviewers and funders lose visibility into the work
            that happens before the most obvious artifact appears.
          </p>
        </article>

        <aside className="callout-card">
          <p className="callout-label">Why this matters</p>
          <h3>Action is already happening. The memory of it is not.</h3>
          <p>
            Bitcoin Dev Journal does not replace contribution. It gives the
            contribution path a durable public memory that stays useful to the
            builder, the reviewer, and the person deciding what to fund next.
          </p>
        </aside>
      </Reveal>

      <section id="concept" className="section-stack">
        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="Why I care"
            title="I’m proposing this from inside the work, not from a distance."
            intro="My own progress has come through learning in public, reading through code until it stops feeling opaque, reviewing pull requests before I feel fully ready, exploring issue threads before I propose fixes, and building Root Wallet while sharpening Bitcoin wallet intuition."
          />
          <div className="two-column">
            <div className="body-stack">
              <p>
                A lot of that work matters long before there is a clean trophy
                artifact at the end. Sometimes the real win is finally
                understanding descriptors, narrowing a bug correctly, or seeing
                the tradeoff buried inside a review thread.
              </p>
              <p>
                The journal is a practical way to preserve that layer without
                inflating it. It turns quiet, compounding progress into
                something visible enough to learn from and strong enough to show
                publicly.
              </p>
            </div>

            <ul className="stack-list">
              {whyICarePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="content-grid">
          <Reveal className="surface-card" delay={0.08}>
            <SectionHeading
              eyebrow="What it is"
              title="A public learning journal for Bitcoin open-source developers."
              intro="Bitcoin Dev Journal helps developers log what they read, reviewed, contributed, explored, misunderstood, and eventually understood. It keeps the useful human context attached to the work."
            />
            <p>
              The point is not to create a vanity feed. The point is to keep a
              practical, reusable trail that can support reflection, public
              updates, and funding applications without forcing someone to
              reconstruct months of invisible effort from memory.
            </p>
          </Reveal>

          <Reveal id="flow" className="surface-card" delay={0.14}>
            <SectionHeading
              eyebrow="Core flow"
              title="Log. Share. Get funded."
              intro="The product stays simple on purpose: capture the work, make it legible, and turn it into evidence when opportunity shows up."
            />
            <div className="flow-grid">
              {flowSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="flow-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <span className="flow-index">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal id="proof" className="surface-card proof-shell">
        <SectionHeading
          eyebrow="Live proof of work"
          title="GitHub-fed activity turns the proposal into a live portfolio of open-source work."
          intro="This section is built to be static-export friendly for GitHub Pages. The site fetches GitHub data at build time, renders it into the page, and falls back gracefully when a token or API access is unavailable."
        />

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

        <div className="proof-layout">
          <div className="proof-main">
            <div className="panel-label-row">
              <p className="callout-label">Activity feed</p>
              <span className="timeline-chip">
                {filteredActivity.length} item{filteredActivity.length === 1 ? "" : "s"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRepo}
                className="activity-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                {filteredActivity.map((item, index) => (
                  <motion.a
                    key={item.id}
                    className="activity-card"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="activity-topline">
                      <span className={`kind-pill kind-${item.kind}`}>
                        {formatActivityKind(item.kind)}
                      </span>
                      <span className="activity-date">{formatDate(item.date)}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="activity-footer">
                      <span>{item.repo.label}</span>
                      <strong>{item.status}</strong>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="proof-side">
            <div className="surface-inset">
              <p className="callout-label">Contribution timeline</p>
              <div className="timeline-stack">
                {filteredTimeline.map((group) => (
                  <div key={group.repo.fullName} className="timeline-group">
                    <div className="timeline-header">
                      <h3>{group.repo.label}</h3>
                      <span>{group.items.length}</span>
                    </div>
                    {group.items.length > 0 ? (
                      <ul>
                        {group.items.slice(0, 4).map((item) => (
                          <li key={item.id}>
                            <span className={`timeline-dot kind-${item.kind}`} />
                            <div>
                              <strong>{item.title}</strong>
                              <small>{formatDate(item.date)}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="empty-copy">
                        No recent build-time items surfaced for this repo yet.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="Featured repositories"
          title="Repository cards that make the open-source lane legible at a glance."
          intro="Each repo becomes part of the story: what the repo is, why it matters to this proposal, and where the work fits into the larger Bitcoin journey."
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
          eyebrow="BDP pipeline fit"
          title="The journal acts like connective memory across learn, contribute, and get funded."
          intro="Bitcoin Dev Project already centers action. Bitcoin Dev Journal makes that action legible over time so each stage of the pipeline strengthens the next instead of resetting the story from zero."
        />
        <div className="tri-grid">
          {pipelineCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="info-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -5 }}
            >
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </motion.article>
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-card">
        <SectionHeading
          eyebrow="What developers log"
          title="Entries that turn quiet progress into durable signal."
          intro="The product is not only about shipped code. It is about showing the route to shipped code in a way that stays honest and useful."
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
          title="A builder profile that mixes narrative identity with live GitHub proof."
          intro="The goal is not a vanity dashboard. The goal is a public page that feels human, credible, and anchored in real work."
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
              Building Root Wallet, contributing around the BDK ecosystem, and
              learning in public.
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
                <h3>Recent public signals</h3>
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

      <div className="content-grid">
        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="Contribution signals"
            title="Patterns matter as much as isolated wins."
            intro="A serious proof-of-work product should show not just isolated events, but the shape of the work over time."
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
            eyebrow="Themes"
            title="Work themes start to emerge once the trail is visible."
            intro="Even before every contribution looks large, the pattern becomes clear: BDK, wallet architecture, descriptors, Root Wallet, and the steady habit of learning in public."
          />
          <ul className="tag-cloud">
            {githubData.themes.map((theme) => (
              <li key={theme.label}>
                {theme.label}
                <span>{theme.count}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="content-grid">
        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="Weekly summary"
            title="AI only matters here if it turns raw work into a clean narrative."
            intro="This should not read like an AI gimmick. The journal already contains the substance. The summary step simply organizes it into something you can actually reuse."
          />
          <div className="summary-shell">
            <div className="surface-inset">
              <p className="callout-label">Weekly entries</p>
              <ul className="stack-list">
                {weeklyInputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="surface-inset">
              <p className="callout-label">Narrative summary</p>
              <p>
                This week focused on strengthening wallet intuition through both
                review and implementation work. I spent time around BDK-facing
                code and interfaces, read BIP-86 with a clearer descriptor
                lens, shaped Root Wallet work using that context, and wrote
                down the parts that would otherwise disappear once the immediate
                task was over.
              </p>
              <ul className="tag-list">
                {summaryUses.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal id="export" className="surface-card">
          <SectionHeading
            eyebrow="Grant application export"
            title="The journal becomes an evidence layer, not a memory test."
            intro="When it is time to apply for support, the timeline and narrative are already there."
          />
          <ul className="stack-list">
            {exportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="content-grid">
        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="GitHub integration"
            title="GitHub can supply the raw activity, but the journal adds the missing human layer."
            intro="Repos, pull requests, issues, and commits show that something happened. The journal captures the reasoning around it so the work becomes legible as growth, not just output."
          />
          <div className="integration-grid">
            <div className="surface-inset">
              <p className="callout-label">Auto-imported</p>
              <ul className="stack-list compact-list">
                <li>Repos touched</li>
                <li>Pull requests and issue threads</li>
                <li>Commit history and timestamps</li>
                <li>Repository descriptions and metadata</li>
              </ul>
            </div>
            <div className="surface-inset highlight-inset">
              <p className="callout-label">Added by the journal</p>
              <ul className="stack-list compact-list">
                {githubLayers.map((layer) => (
                  <li key={layer}>{layer}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="surface-card">
          <SectionHeading
            eyebrow="Why BDP should ship this"
            title="It strengthens the pipeline without changing the mission."
            intro="Bitcoin Dev Journal reinforces the same path BDP already cares about. It simply turns that path into a better interface for learning, contribution, and funding."
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
      </div>

      <Reveal className="closing-card">
        <p className="section-eyebrow">Closing pitch</p>
        <h2>
          Bitcoin Dev Journal helps Bitcoin developers turn scattered learning
          and contribution into visible proof of work.
        </h2>
        <p>
          It gives the Bitcoin open-source journey a product-grade public
          memory: useful to the developer, useful to reviewers, and useful when
          it is time to fund the next stage of the work.
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
