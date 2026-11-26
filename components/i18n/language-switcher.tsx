"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, localeCookie, localeMeta, switchLocalePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useI18n } from "./i18n-provider";

/** EN / KH segmented switch. Keeps the current page and remembers the choice in a cookie. */
export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={dict.nav.language}
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-white/5 p-0.5 ring-1 ring-white/15", className)}
    >
      <Globe aria-hidden className={cn("mx-1.5 text-slate-400", size === "sm" ? "size-3.5" : "size-4")} />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <NextLink
            key={l}
            href={switchLocalePath(pathname, l) + (typeof window !== "undefined" ? window.location.hash : "")}
            hrefLang={localeMeta[l].hreflang}
            lang={localeMeta[l].htmlLang}
            aria-current={active ? "true" : undefined}
            title={localeMeta[l].label}
            onClick={() => {
              document.cookie = `${localeCookie}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={cn(
              "focus-ring rounded-full font-semibold transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-1.5 text-sm",
              active ? "bg-white text-navy-900" : "text-slate-300 hover:text-white",
            )}
          >
            <span aria-hidden>{localeMeta[l].short}</span>
            <span className="sr-only">{localeMeta[l].label}</span>
          </NextLink>
        );
      })}
    </div>
  );
}
