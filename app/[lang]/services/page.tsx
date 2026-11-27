import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/i18n/content";
import { localizeNumber } from "@/lib/i18n/format";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { IconTile } from "@/components/ui/icon-tile";
import { CheckList } from "@/components/ui/check-list";
import { ButtonLink } from "@/components/ui/button";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/shared/cta-section";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/services", { title: dict.meta.servicesTitle, description: dict.meta.servicesDescription });
}

export default async function ServicesPage() {
  const { locale, dict } = await getI18n();
  const t = dict.services;
  const services = getServices(locale);
  return (
    <>
      <PageHero
        aside={<PageSlideshow page="services" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.services }]}
      />

      {/* Quick index */}
      <nav aria-label={t.indexAria} className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:top-[72px]">
        <div className="container-page">
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="focus-ring block rounded-full px-3 py-1.5 text-sm whitespace-nowrap text-slate-600 hover:bg-slate-100 hover:text-navy-900"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-white">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={cn("scroll-mt-14 border-b border-slate-100 py-12 last:border-0 sm:py-14", i % 2 === 1 && "bg-surface")}
          >
            <div className="container-page grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
              <div data-reveal>
                <div className="flex items-center gap-4">
                  <IconTile icon={s.icon} size="lg" />
                  <span className="font-mono text-sm text-slate-400">{localizeNumber(String(i + 1).padStart(2, "0"), locale)}</span>
                </div>
                <h2 id={`${s.slug}-title`} className="mt-5 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.description}</p>
                <p className="mt-4 leading-relaxed text-slate-600">{s.details}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {s.link && (
                    <ButtonLink href={s.link} size="sm">
                      {t.viewWebsites}
                      <ArrowRight />
                    </ButtonLink>
                  )}
                  <ButtonLink
                    href={`/contact?service=${encodeURIComponent(contactCategory(s.slug))}`}
                    variant="link"
                    size="none"
                  >
                    {t.discuss}
                    <ArrowRight />
                  </ButtonLink>
                </div>
              </div>
              <div
                data-reveal
                className={cn(
                  "rounded-2xl p-6 ring-1 sm:p-8",
                  i % 2 === 1 ? "bg-white ring-slate-200" : "bg-surface ring-slate-200/70",
                )}
              >
                <p className="eyebrow text-brand-600">
                  <span aria-hidden className="h-px w-6 bg-brand-600/50" />
                  {t.included}
                </p>
                <CheckList items={s.capabilities} className="mt-5" />
              </div>
            </div>
          </section>
        ))}
      </div>

      <ProcessSection />
      <CtaSection title={t.ctaTitle} description={t.ctaDescription} />
    </>
  );
}

function contactCategory(slug: string) {
  const map: Record<string, string> = {
    "custom-software-development": "Custom Software Development",
    "it-consulting": "IT Consulting",
    "business-management-systems": "Business Management Systems",
    "web-application-development": "Web Development",
    "it-infrastructure-networking": "IT Infrastructure",
    "database-information-management": "Other",
    "it-support-maintenance": "IT Support",
    "digital-transformation": "Digital Transformation",
  };
  return map[slug] ?? "Other";
}
