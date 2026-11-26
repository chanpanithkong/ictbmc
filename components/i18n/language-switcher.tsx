"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeCookie, localeMeta, switchLocalePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useI18n } from "./i18n-provider";
import { Flag } from "./flag";

/** KH / EN segmented switch with flags. Keeps the current page and remembers the choice in a cookie. */
export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={dict.nav.language}
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-white/5 p-1 ring-1 ring-white/15", className)}
    >
      {locales.map((l) => {
        const active = l === locale;
        const href = switchLocalePath(pathname, l);
        return (
          <NextLink
            key={l}
            href={href}
            hrefLang={localeMeta[l].hreflang}
            lang={localeMeta[l].htmlLang}
            aria-current={active ? "true" : undefined}
            title={localeMeta[l].label}
            onClick={(e) => {
              document.cookie = `${localeCookie}=${l}; path=/; max-age=31536000; samesite=lax`;
              // Keep the current #section when switching language
              if (window.location.hash) {
                e.preventDefault();
                router.push(href + window.location.hash);
              }
            }}
            className={cn(
              "focus-ring inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm",
              active ? "bg-white text-navy-900 shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <Flag locale={l} className={size === "lg" ? "h-4 w-6" : undefined} />
            <span aria-hidden>{localeMeta[l].short}</span>
            <span className="sr-only">{localeMeta[l].label}</span>
          </NextLink>
        );
      })}
    </div>
  );
}
