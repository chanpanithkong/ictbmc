import Link from "next/link";
import { Suspense } from "react";
import { MapPin } from "lucide-react";
import { company, socialLinks } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/shared/logo";
import { SocialIcon } from "@/components/shared/social-icon";
import { CurrentYear } from "@/components/shared/current-year";

const columns = [
  { title: "Company", links: footerNav.company },
  { title: "Solutions", links: footerNav.solutions },
  { title: "Products", links: footerNav.products },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-400">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
      />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{company.tagline}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="size-4 shrink-0 text-accent-400" aria-hidden />
            {company.location}
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socialLinks.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${company.name} on ${s.label}`}
                    className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <SocialIcon name={s.icon} className="size-4" />
                  </a>
                </li>
              ) : (
                <li key={s.label}>
                  <span
                    title={`${s.label} — coming soon`}
                    className="inline-flex size-9 items-center justify-center rounded-full text-slate-600 ring-1 ring-white/5"
                  >
                    <SocialIcon name={s.icon} className="size-4" />
                    <span className="sr-only">{s.label} (coming soon)</span>
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer ${col.title}`}>
              <h2 className="text-sm font-semibold text-white">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="focus-ring rounded text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright ©{" "}
            <Suspense fallback={null}>
              <CurrentYear />
            </Suspense>{" "}
            {company.name}. All rights reserved.
          </p>
          <p className="text-slate-500">Software · Consulting · Infrastructure · Support</p>
        </div>
      </div>
    </footer>
  );
}
