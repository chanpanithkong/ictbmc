"use client";

import Link from "@/components/i18n/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { getMainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

/** Re-mounted on route change (keyed by pathname), so it closes automatically. */
export function MobileMenu({ pathname }: { pathname: string }) {
  const { dict } = useI18n();
  const mainNav = getMainNav(dict);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const linkActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring inline-flex size-10 items-center justify-center rounded-full text-white ring-1 ring-white/15 hover:bg-white/10"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-white/10 bg-navy-900"
      >
        <nav aria-label={dict.nav.mobileAria} className="container-page py-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={linkActive(item.href) ? "page" : undefined}
                  className={cn(
                    "focus-ring flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium",
                    linkActive(item.href) ? "bg-white/5 text-white" : "text-slate-300 hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-3">
                    {item.children
                      .filter((c) => c.href !== item.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            aria-current={linkActive(child.href) ? "page" : undefined}
                            className={cn(
                              "focus-ring block rounded-lg px-3 py-2 text-sm",
                              linkActive(child.href) ? "text-white" : "text-slate-400 hover:text-white",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" size="lg" className="mt-8 w-full" onClick={() => setOpen(false)}>
            {dict.common.letsTalk}
            <ArrowRight />
          </ButtonLink>
          <div className="mt-6 flex justify-center">
            <LanguageSwitcher size="lg" />
          </div>
        </nav>
      </div>
    </div>
  );
}
