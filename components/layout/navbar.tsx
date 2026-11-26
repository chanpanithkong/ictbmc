"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { ButtonLink } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy-900/85 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="relative">
                {item.children ? (
                  <DropdownItem item={item} active={isActive(pathname, item)} pathname={pathname} />
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item) ? "page" : undefined}
                    className={cn(
                      "focus-ring relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(pathname, item) ? "text-white" : "text-slate-300 hover:text-white",
                    )}
                  >
                    {item.label}
                    {isActive(pathname, item) && (
                      <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent-400" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Let&apos;s Talk
            <ArrowRight />
          </ButtonLink>
          <MobileMenu key={pathname} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // close when route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-solutions-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "focus-ring relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
          active ? "text-white" : "text-slate-300 hover:text-white",
        )}
      >
        {item.label}
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent-400" />}
      </button>
      <div
        id="nav-solutions-menu"
        className={cn(
          "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-2xl bg-navy-900/95 p-2 shadow-2xl ring-1 shadow-black/40 ring-white/10 backdrop-blur-xl">
          {item.children?.map((child) => (
            <li key={child.href + child.label}>
              <Link
                href={child.href}
                className="focus-ring block rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
              >
                <span className="block text-sm font-medium text-white">{child.label}</span>
                {child.description && (
                  <span className="mt-0.5 block text-xs text-slate-400">{child.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
