import Link from "@/components/i18n/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-g)" />
      <path d="M9 11.5h14M9 16h9M9 20.5h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="16" r="2" fill="#fff" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  label = "ICT BMC — Home",
}: {
  tone?: "dark" | "light";
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={label}
      className={cn("focus-ring inline-flex items-center gap-2.5 rounded-md", className)}
    >
      <LogoMark />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-tight",
          tone === "dark" ? "text-white" : "text-navy-900",
        )}
      >
        ICT <span className={tone === "dark" ? "text-accent-400" : "text-brand-600"}>BMC</span>
      </span>
    </Link>
  );
}
