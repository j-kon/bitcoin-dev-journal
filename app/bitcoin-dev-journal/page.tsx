"use client";

import { useEffect } from "react";

export default function LegacyGitHubPagesPath() {
  useEffect(() => {
    const { search, hash } = window.location;
    window.location.replace(`/${search}${hash}`);
  }, []);

  return null;
}
