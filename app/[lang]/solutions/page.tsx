import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import Link from "@/components/i18n/link";
import { ArrowRight, LayoutDashboard, Lightbulb } from "lucide-react";
import { getSolutions } from "@/lib/i18n/content";
import { format, localizeNumber } from "@/lib/i18n/format";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { SectionHeading } from "@/components/ui/section-heading";
import { TransformationJourney } from "@/components/diagrams/transformation-journey";
import { IconTile } from "@/components/ui/icon-tile";
import { CheckList } from "@/components/ui/check-list";
import { ButtonLink } from "@/components/ui/button";
import { IndustriesSection } from "@/components/home/industries-section";
import { CtaSection } from "@/components/shared/cta-section";
import { revealDelay } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/solutions", { title: dict.meta.solutionsTitle, description: dict.meta.solutionsDescription });
}

export default async function SolutionsPage() {
  const { locale, dict } = await getI18n();
  const t = dict.solutions;
  const solutions = getSolutions(locale);
  return (
    <>
      <PageHero
        aside={<PageSlideshow page="solutions" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.solutions }]}
        actions={
          <>
            <ButtonLink href="/products" size="lg">
              {t.browseProducts}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/consulting" size="lg" variant="ghostDark">
              {dict.nav.consulting}
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white py-24 sm:py-28" aria-label={t.listAria}>
        <div className="container-page grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              data-reveal
              style={revealDelay(i % 2)}
              className="flex scroll-mt-4 flex-col rounded-3xl p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-xl hover:shadow-brand-900/5 sm:p-10"
            >
              <div className="flex items-center justify-between">
                <IconTile icon={s.icon} size="lg" />
                <span className="font-mono text-sm text-slate-300">{localizeNumber(String(i + 1).padStart(2, "0"), locale)}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-navy-900">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.description}</p>
              <CheckList items={s.points} className="mt-6 mb-8" />
              <Link
                href={s.href.startsWith("/solutions") ? "/contact" : s.href}
                className="focus-ring mt-auto inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {s.href.startsWith("/solutions") ? t.discuss : format(t.explore, { title: s.title })}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Transformation journey */}
      <section
        className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28"
        aria-labelledby="journey-title"
      >
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
        <div
          aria-hidden
          className="absolute -right-32 -bottom-32 -z-10 size-[520px] rounded-full bg-accent-500/15 blur-3xl"
        />
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              tone="dark"
              eyebrow={t.journey.eyebrow}
              title={<span id="journey-title">{t.journey.title}</span>}
              description={t.journey.description}
            />
          </div>
          <div className="mt-16">
            <TransformationJourney t={t.journey} locale={locale} />
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="bg-surface py-20" aria-label={t.pathsAria}>
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            {
              icon: LayoutDashboard,
              title: t.readyTitle,
              text: t.readyText,
              href: "/products",
              cta: t.readyCta,
            },
            {
              icon: Lightbulb,
              title: t.unsureTitle,
              text: t.unsureText,
              href: "/consulting",
              cta: t.unsureCta,
            },
          ].map((p) => (
            <Link
              key={p.href}
              href={p.href}
              data-reveal
              className="group focus-ring flex gap-5 rounded-3xl bg-white p-8 ring-1 ring-slate-200 transition-all hover:ring-brand-300"
            >
              <IconTile icon={p.icon} size="lg" />
              <div>
                <h2 className="text-xl font-semibold text-navy-900">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <IndustriesSection />
      <CtaSection />
    </>
  );
}
