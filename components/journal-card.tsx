"use client";

import { motion } from "framer-motion";
import type { JournalEntry } from "@/data/journal-entries";

type JournalCardProps = {
  entry: JournalEntry;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function JournalCard({ entry }: JournalCardProps) {
  return (
    <motion.article
      className="journal-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.18 }}
    >
      <div className="journal-header">
        <span className="kind-pill kind-journal">{entry.type.replace("-", " ")}</span>
        <span className="activity-date">{formatDate(entry.date)}</span>
      </div>

      <h3>{entry.title}</h3>
      <p>{entry.summary}</p>

      <div className="journal-meta">
        <div className="journal-line">
          <strong>Insight</strong>
          <span>{entry.learned}</span>
        </div>
        {entry.confused ? (
          <div className="journal-line">
            <strong>Still watching</strong>
            <span>{entry.confused}</span>
          </div>
        ) : null}
        <div className="journal-line">
          <strong>Next</strong>
          <span>{entry.next}</span>
        </div>
      </div>

      {entry.link ? (
        <a
          className="journal-link"
          href={entry.link}
          target="_blank"
          rel="noreferrer"
        >
          Open related work
        </a>
      ) : null}
    </motion.article>
  );
}
