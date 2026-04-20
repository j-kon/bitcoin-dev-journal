export type JournalEntry = {
  id: string;
  date: string;
  repoFullName: string;
  type:
    | "review"
    | "reading"
    | "reflection"
    | "concept"
    | "shipping"
    | "issue-context";
  title: string;
  summary: string;
  learned: string;
  confused?: string;
  next: string;
  tags: string[];
  link?: string;
  relatedGitHubUrls?: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    id: "journal-bdk-ffi-review-974",
    date: "2026-04-19T11:10:00.000Z",
    repoFullName: "bitcoindevkit/bdk-ffi",
    type: "review",
    title: "Reviewed PR #974 in bdk-ffi",
    summary:
      "Mapped the FFI surface before reacting to the diff so the review stayed anchored in interface clarity instead of surface noise.",
    learned:
      "The useful review move was not just spotting what changed, but seeing which naming and shape decisions would be hardest to undo later.",
    confused:
      "I had to slow down around where Rust-side intent gets flattened once it crosses the FFI boundary.",
    next:
      "Keep logging review notes in a way that shows how reading other people’s code sharpens my judgment before I write more of my own.",
    tags: ["review", "ffi", "api clarity", "bdk"],
    link: "https://github.com/bitcoindevkit/bdk-ffi/pull/974",
    relatedGitHubUrls: ["https://github.com/bitcoindevkit/bdk-ffi/pull/974"],
  },
  {
    id: "journal-bdk-dart-issue-context",
    date: "2026-04-18T18:30:00.000Z",
    repoFullName: "bitcoindevkit/bdk-dart",
    type: "issue-context",
    title: "Explored issue context before opening a change in bdk-dart",
    summary:
      "Read through the issue thread and the surrounding product flow first so the eventual code could respond to the real problem instead of the first phrasing of it.",
    learned:
      "Issue exploration is part of contribution, not dead time before contribution. A lot of the quality comes from that stage.",
    confused:
      "The boundary between demo-layer UX and core wallet abstractions still takes deliberate reading before it feels obvious.",
    next:
      "Capture more of the narrowing process so later PRs show the thinking that happened before the patch existed.",
    tags: ["issue exploration", "bdk", "wallet architecture"],
    link: "https://github.com/bitcoindevkit/bdk-dart/issues/55",
    relatedGitHubUrls: ["https://github.com/bitcoindevkit/bdk-dart/issues/55"],
  },
  {
    id: "journal-bip86-reading",
    date: "2026-04-17T08:40:00.000Z",
    repoFullName: "j-kon/root_wallet",
    type: "reading",
    title: "Read BIP-86 with Root Wallet design questions in mind",
    summary:
      "Used BIP-86 to tighten my mental model around single-key taproot paths and connect the reading back to the wallet product work I am actually doing.",
    learned:
      "Reading clicked more once I treated it like input for product decisions instead of isolated theory.",
    confused:
      "I still want to sharpen how BIP-level ideas show up in the practical tradeoffs of app-facing wallet systems.",
    next:
      "Turn the notes into a reusable journal entry so later implementation choices can point back to the exact concept trail.",
    tags: ["bip-86", "taproot", "root wallet", "learning in public"],
  },
  {
    id: "journal-descriptor-reflection",
    date: "2026-04-16T21:15:00.000Z",
    repoFullName: "j-kon/root_wallet",
    type: "concept",
    title: "Wrote a reflection on descriptor checksums",
    summary:
      "Took a concept that had felt fuzzy and wrote it down in plain language so it would stay usable instead of fading after the first moment of understanding.",
    learned:
      "A written reflection is often the step that turns borrowed understanding into my own understanding.",
    next:
      "Keep turning confusing wallet concepts into short public notes that can support later implementation and explain the work more clearly.",
    tags: ["descriptors", "reflection", "wallet concepts"],
  },
  {
    id: "journal-root-wallet-shipping",
    date: "2026-04-15T17:05:00.000Z",
    repoFullName: "j-kon/root_wallet",
    type: "shipping",
    title: "Shipped a Root Wallet improvement tied to upstream learning",
    summary:
      "Closed the loop between app-building work and upstream Bitcoin study so product progress did not live in a separate story from open-source progress.",
    learned:
      "The strongest product changes happen when I can point to the Bitcoin concept or code-reading trail that informed them.",
    next:
      "Make each shipped product improvement legible as part of the same proof-of-work trail as PR reviews, issues, and reading notes.",
    tags: ["root wallet", "shipping", "product building"],
    link: "https://github.com/j-kon/root_wallet",
    relatedGitHubUrls: ["https://github.com/j-kon/root_wallet"],
  },
];
