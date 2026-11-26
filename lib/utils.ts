import type React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Inline style for staggered scroll-reveal delays */
export function revealDelay(index: number, step = 70) {
  return { "--reveal-delay": `${Math.min(index * step, 420)}ms` } as React.CSSProperties;
}
