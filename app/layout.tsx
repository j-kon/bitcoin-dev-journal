import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://j-kon.github.io/bitcoin-dev-journal/"),
  title: "Bitcoin Dev Journal",
  description:
    "A public proof-of-work journal for Bitcoin developers shaped by learning in public, reviewing pull requests, and contributing around the BDK ecosystem.",
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
