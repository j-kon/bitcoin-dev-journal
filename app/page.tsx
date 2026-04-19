import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import {
  activityFeed,
  entryTypes,
  exportItems,
  flowSteps,
  githubLayers,
  missionReasons,
  navItems,
  pipelineCards,
  profileStats,
  proofSignals,
  summaryUses,
  weeklyInputs,
  whyICarePoints,
} from "@/components/site-data";

export default function Home() {
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

      <section className="hero panel">
        <div className="hero-copy">
          <p className="section-eyebrow">Public proof-of-work journal</p>
          <h1>Bitcoin Dev Journal</h1>
          <p className="hero-subtitle">
            A public proof-of-work journal for Bitcoin developers.
          </p>
          <p className="hero-body">
            This proposal is shaped by my own path through Bitcoin open source:
            learning in public, reviewing pull requests, tracing issues before I
            write code, contributing around the BDK ecosystem, and building Root
            Wallet while trying to make invisible progress legible.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#concept">
              View Product Concept
            </a>
            <a className="button button-secondary" href="#profile">
              See Public Profile Mockup
            </a>
          </div>

          <ul className="signal-list" aria-label="Project signals">
            {proofSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>

        <div className="hero-preview" aria-label="Product preview">
          <div className="preview-card preview-card-primary">
            <div className="preview-label">This week</div>
            <h2>Visible progress, not hidden effort</h2>
            <ul>
              <li>2 pull requests reviewed</li>
              <li>BIP-86 notes published</li>
              <li>Root Wallet fix shipped</li>
            </ul>
          </div>

          <div className="preview-grid">
            <article className="preview-card">
              <div className="preview-label">Journal entry</div>
              <p>
                “Explored the issue context first. The real bug was narrower
                than the title suggested.”
              </p>
            </article>
            <article className="preview-card">
              <div className="preview-label">Funding export</div>
              <p>
                Timeline, repos, reviews, and weekly summaries already lined
                up.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="problem" className="content-grid">
        <article className="panel">
          <SectionHeading
            eyebrow="The gap"
            title="Bitcoin Dev Project pushes toward action, but a lot of real progress still disappears."
            intro="Many important steps in a developer journey happen quietly: reading through code, reviewing pull requests, tracing an issue before opening one, or finally understanding a concept that used to feel slippery. Unless that work is documented intentionally, it vanishes."
          />
          <p>
            That makes it harder for developers to show momentum honestly, and
            harder for others to recognize the discipline behind gradual
            progress. The result is a missing evidence layer right where the
            Bitcoin open-source pipeline needs one most.
          </p>
        </article>

        <aside className="panel callout-card">
          <p className="callout-label">Why this matters</p>
          <h3>Action is happening. The memory of it is not.</h3>
          <p>
            A good journal does not replace contribution. It makes the path
            toward contribution visible enough to support trust, reflection, and
            funding.
          </p>
        </aside>
      </section>

      <section id="concept" className="panel">
        <SectionHeading
          eyebrow="Why I care"
          title="I’m proposing this from inside the work, not from a distance."
          intro="My own progress in Bitcoin open source has come through learning in public, reading code until it stops feeling opaque, reviewing pull requests to sharpen judgment, exploring issues before making changes, and building Root Wallet while deepening my wallet intuition."
        />

        <div className="two-column">
          <div>
            <p>
              A lot of that work matters, but it does not always produce a
              clean artifact at the end of the day. Sometimes the real win is
              understanding why a change exists, spotting the tradeoffs in a PR,
              or writing down a concept clearly enough that it stops being
              fragile in your head.
            </p>
            <p>
              Bitcoin Dev Journal is a way to make that layer visible without
              dressing it up. It is a practical record of what a developer
              actually did, wrestled with, and learned on the road to stronger
              contributions.
            </p>
          </div>

          <ul className="stack-list">
            {whyICarePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <SectionHeading
            eyebrow="What it is"
            title="A public learning journal for Bitcoin open-source developers."
            intro="Bitcoin Dev Journal helps developers log what they read, reviewed, contributed, explored, misunderstood, and eventually understood. It keeps the useful human context attached to the work."
          />
          <p>
            The journal is not a vanity feed. It is a structured practice for
            recording progress in a way that stays useful later: for personal
            reflection, public accountability, or grant applications that need
            evidence beyond a few merged pull requests.
          </p>
        </article>

        <article id="flow" className="panel">
          <SectionHeading
            eyebrow="Core flow"
            title="Log. Share. Get funded."
            intro="The product flow stays simple on purpose: capture real work, turn it into a legible public trail, and make that trail portable when opportunities open up."
          />
          <div className="flow-grid">
            {flowSteps.map((step, index) => (
              <article className="flow-card" key={step.title}>
                <span className="flow-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <SectionHeading
          eyebrow="BDP pipeline fit"
          title="The journal acts like connective memory across learn, contribute, and get funded."
          intro="Bitcoin Dev Project already emphasizes action. Bitcoin Dev Journal makes the action legible over time, so each stage of the pipeline reinforces the next one instead of resetting the story from scratch."
        />
        <div className="pipeline-grid">
          {pipelineCards.map((card) => (
            <article className="pipeline-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <SectionHeading
          eyebrow="What developers log"
          title="Entries that turn real work into durable signal."
          intro="The journal should reflect the actual shape of Bitcoin open-source progress, from careful reading to shipped code."
        />
        <div className="card-grid">
          {entryTypes.map((entry) => (
            <article className="entry-card" key={entry.title}>
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="profile" className="profile-section panel">
        <SectionHeading
          eyebrow="Public profile mockup"
          title="A profile that reads like a builder’s trail, not a vanity dashboard."
          intro="This mockup shows the kind of public page a Bitcoin developer could share with mentors, collaborators, or a grant committee."
        />

        <div className="profile-shell">
          <aside className="profile-sidebar">
            <div className="profile-avatar" aria-hidden="true">
              J
            </div>
            <h3>Jaykon</h3>
            <p className="profile-role">Bitcoin open-source contributor</p>
            <p className="profile-meta">
              Building Root Wallet, contributing around the BDK ecosystem, and
              learning in public.
            </p>
            <dl className="stats-grid">
              {profileStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="profile-feed">
            <div className="feed-header">
              <div>
                <p className="callout-label">Recent activity</p>
                <h3>Proof-of-work stream</h3>
              </div>
              <span className="status-pill">Public</span>
            </div>

            <div className="activity-list">
              {activityFeed.map((item) => (
                <article className="activity-item" key={item.title}>
                  <div className="activity-kind">{item.kind}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <SectionHeading
            eyebrow="Weekly summary"
            title="AI is useful here only if it helps organize real work into a clean narrative."
            intro="This should not feel like a gimmick. The journal already contains the substance. A weekly summary simply condenses it into something usable for updates, applications, and reflection."
          />

          <div className="summary-shell">
            <div className="summary-input">
              <p className="callout-label">Weekly entries</p>
              <ul className="stack-list">
                {weeklyInputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="summary-output">
              <p className="callout-label">Narrative summary</p>
              <p>
                This week focused on tightening wallet intuition through both
                review and implementation work. I reviewed a pair of PRs with an
                eye toward API clarity, spent time with BIP-86 to clean up my
                taproot mental model, and used that context while shaping a Root
                Wallet improvement. I also wrote a note on descriptor checksums
                so the concept stays reusable instead of fading after the first
                moment of understanding.
              </p>
              <ul className="summary-tags">
                {summaryUses.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article id="export" className="panel export-card">
          <SectionHeading
            eyebrow="Grant application export"
            title="The journal becomes an evidence layer, not a memory test."
            intro="When a developer applies for support, the export should already contain the timeline and story that would otherwise be painful to reconstruct."
          />
          <ul className="stack-list">
            {exportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <SectionHeading
            eyebrow="GitHub integration"
            title="GitHub activity can be imported, but the journal adds the missing human layer."
            intro="Commits, pull requests, and reviews show what happened. The journal captures the thinking around it so the activity becomes more than a list of links."
          />
          <div className="github-shell">
            <div className="github-column">
              <p className="callout-label">Auto-imported</p>
              <ul className="stack-list compact-list">
                <li>Repos touched</li>
                <li>Pull requests opened</li>
                <li>Reviews left</li>
                <li>Commits and issue links</li>
              </ul>
            </div>
            <div className="github-column highlight-column">
              <p className="callout-label">Added by the journal</p>
              <ul className="stack-list compact-list">
                {githubLayers.map((layer) => (
                  <li key={layer}>{layer}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="panel">
          <SectionHeading
            eyebrow="Why BDP should ship this"
            title="It strengthens the pipeline without changing the mission."
            intro="Bitcoin Dev Journal supports the same developer path BDP already cares about. It simply makes the path more visible, more legible, and easier to support."
          />
          <div className="card-grid compact-grid">
            {missionReasons.map((reason) => (
              <article className="reason-card" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.detail}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="closing panel">
        <p className="section-eyebrow">Closing pitch</p>
        <h2>
          Bitcoin Dev Journal helps Bitcoin developers turn scattered learning
          and contribution into visible proof of work.
        </h2>
        <p>
          It gives the Bitcoin open-source journey a durable public memory:
          useful to the developer, useful to reviewers, and useful when it is
          time to fund the next stage of the work.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#profile">
            Revisit Profile Mockup
          </a>
          <a className="button button-secondary" href="#problem">
            Read the Problem
          </a>
        </div>
      </section>
    </main>
  );
}
