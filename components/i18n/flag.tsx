"use client";

import { useId } from "react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Inline SVG flags (flag emoji don't render on Windows).
 * KH → Cambodia (simplified Angkor Wat), EN → United Kingdom.
 */
export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const id = useId().replace(/:/g, "");
  const cls = cn("h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/20", className);

  if (locale === "kh") {
    return (
      <svg viewBox="0 0 30 20" aria-hidden className={cls} preserveAspectRatio="xMidYMid slice">
        <rect width="30" height="20" fill="#032EA1" />
        <rect y="5" width="30" height="10" fill="#E00025" />
        {/* Angkor Wat */}
        <g fill="#fff" stroke="#1a1a1a" strokeWidth="0.25" strokeLinejoin="round">
          <path d="M8.5 13.9h13v0.9h-13z" />
          <path d="M9.6 11.6h10.8v2.3H9.6z" />
          <path d="M10.4 11.6v-1.4l0.9-1.6 0.9 1.6v1.4z" />
          <path d="M17.8 11.6v-1.4l0.9-1.6 0.9 1.6v1.4z" />
          <path d="M12.9 11.6V9.2l0.8-1.3 0.8 1.3v2.4z" />
          <path d="M15.5 11.6V9.2l0.8-1.3 0.8 1.3v2.4z" />
          <path d="M14 11.6V8.3l1-2.4 1 2.4v3.3z" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" aria-hidden className={cls} preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id={`${id}-s`}>
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id={`${id}-t`}>
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-s)`}>
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
