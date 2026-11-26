"use client";

import { useEffect } from "react";

/**
 * Single global observer that reveals any element marked with `data-reveal`
 * as it scrolls into view. Elements stay visible when JS is unavailable
 * because the hidden state is scoped to `html.js`.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])")
        .forEach((el) => io.observe(el));
    };
    scan();

    // Restore native anchor behaviour for direct loads like /services#it-consulting
    if (window.location.hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "auto", block: "start" }), 0);
    }

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
