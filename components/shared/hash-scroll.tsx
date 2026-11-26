"use client";

import { useEffect } from "react";

/**
 * Restores native anchor behaviour for direct loads like /services#it-consulting,
 * which can be lost while the page hydrates. Only scrolls — it never modifies
 * the DOM, so it cannot cause hydration mismatches.
 */
export function HashScroll() {
  useEffect(() => {
    if (window.location.hash.length <= 1) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) setTimeout(() => target.scrollIntoView({ behavior: "auto", block: "start" }), 0);
  }, []);
  return null;
}
