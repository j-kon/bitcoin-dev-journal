import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const metadataBase =
  process.env.DEPLOY_TARGET === "github-pages"
    ? "https://j-kon.github.io/bitcoin-dev-journal/"
    : "https://bitcoin-dev-journal.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBase),
  title: "Bitcoin Dev Journal",
  description:
    "A dark, animated Bitcoin Dev Journal product demo that turns open-source learning and contribution into visible proof of work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-glow page-glow-left" aria-hidden="true" />
        <div className="page-glow page-glow-right" aria-hidden="true" />
        <Link href="#content" className="skip-link">
          Skip to content
        </Link>
        {children}
      </body>
    </html>
  );
}
