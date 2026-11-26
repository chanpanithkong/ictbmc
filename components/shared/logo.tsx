"use client";

import { useId } from "react";
import Link from "@/components/i18n/link";
import { cn } from "@/lib/utils";

/**
 * Logo mark: a microchip (processor with circuit pins) on a blue→cyan tile,
 * with a glowing core node — signals technology and connected systems.
 * The same artwork is used for app/icon.svg (favicon).
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-9 shrink-0", className)}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="16" cy="16" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id}-bg)`} />
      <rect width="32" height="32" rx="8" fill={`url(#${id}-glow)`} />
      {/* circuit pins */}
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M13 9.5V6.5M19 9.5V6.5M13 22.5v3M19 22.5v3M9.5 13h-3M9.5 19h-3M22.5 13h3M22.5 19h3" />
      </g>
      {/* chip body */}
      <rect x="9.5" y="9.5" width="13" height="13" rx="3" fill="none" stroke="#fff" strokeWidth="1.8" />
      {/* core */}
      <rect x="13.25" y="13.25" width="5.5" height="5.5" rx="1.4" fill="#fff" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  label = "ICT Banteay Meanchey — Home",
}: {
  tone?: "dark" | "light";
  className?: string;
  label?: string;
}) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn("focus-ring inline-flex items-center gap-2.5 rounded-md", className)}
    >
      <LogoMark />
      <span className="flex flex-col leading-none" aria-hidden>
        <span className={cn("text-[19px] font-bold tracking-tight", dark ? "text-white" : "text-navy-900")}>
          ICT
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase",
            dark ? "text-accent-400" : "text-brand-600",
          )}
        >
          Banteay Meanchey
        </span>
      </span>
    </Link>
  );
}
