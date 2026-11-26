import Link from "@/components/i18n/link";
import { Suspense } from "react";
import { MapPin } from "lucide-react";
import { socialLinks } from "@/data/company";
import { getFooterNav } from "@/data/navigation";
import { getI18n } from "@/lib/i18n/server";
import { getCompany } from "@/lib/i18n/content";
import { format } from "@/lib/i18n/format";
import { Logo } from "@/components/shared/logo";
import { SocialIcon } from "@/components/shared/social-icon";
import { CurrentYear } from "@/components/shared/current-year";

export async function Footer() {
  const { locale, dict } = await getI18n();
  const company = getCompany(locale);
  const footerNav = getFooterNav(dict);
  const columns = [
    { title: dict.footer.company, links: footerNav.company },
    { title: dict.footer.solutions, links: footerNav.solutions },
    { title: dict.footer.products, links: footerNav.products },
  ];
  const [copyBefore, copyAfter] = format(dict.footer.copyright, { company: company.name }).split("{year}");

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-400">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
      />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo label={dict.nav.homeAria} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{company.tagline}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="size-4 shrink-0 text-accent-400" aria-hidden />
            {company.location}
          </p>
          <ul className="mt-6 flex gap-2" aria-label={dict.footer.socialAria}>
            {socialLinks.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={format(dict.footer.socialOn, { company: company.name, network: s.label })}
                    className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <SocialIcon name={s.icon} className="size-4" />
                  </a>
                </li>
              ) : (
                <li key={s.label}>
                  <span
                    title={`${s.label} — ${dict.footer.comingSoon}`}
                    className="inline-flex size-9 items-center justify-center rounded-full text-slate-600 ring-1 ring-white/5"
                  >
                    <SocialIcon name={s.icon} className="size-4" />
                    <span className="sr-only">
                      {s.label} ({dict.footer.comingSoon})
                    </span>
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {columns.map((col) => (
            <nav key={col.title} aria-label={format(dict.footer.footerNav, { title: col.title })}>
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
            {copyBefore}
            <Suspense fallback={null}>
              <CurrentYear locale={locale} />
            </Suspense>
            {copyAfter}
          </p>
          <p className="text-slate-500">{dict.footer.strapline}</p>
        </div>
      </div>
    </footer>
  );
}
