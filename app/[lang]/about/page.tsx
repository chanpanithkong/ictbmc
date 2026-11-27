import type { Metadata } from "next";
import { ArrowRight, Eye, MapPin, Target } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/shared/cta-section";
import { ProcessSection } from "@/components/home/process-section";
import { revealDelay } from "@/lib/utils";
import { getI18n } from "@/lib/i18n/server";
import { getAbout, getCompany } from "@/lib/i18n/content";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { localizeNumber } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/about", { title: dict.meta.aboutTitle, description: dict.meta.aboutDescription });
}

export default async function AboutPage() {
  const { locale, dict } = await getI18n();
  const t = dict.about;
  const company = getCompany(locale);
  const { approach, coreValues, mission, vision, whoWeAre, whyChooseUs } = getAbout(locale);
  const num = (n: number) => localizeNumber(String(n).padStart(2, "0"), locale);

  return (
    <>
      <PageHero
        aside={<PageSlideshow page="about" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={company.tagline}
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.about }]}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">
              {dict.common.letsTalk}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="ghostDark">
              {dict.common.ourServices}
            </ButtonLink>
          </>
        }
      />

      {/* Who we are */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="who-title">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <SectionHeading eyebrow={t.whoEyebrow} title={<span id="who-title">{t.whoTitle}</span>} />
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{whoWeAre}</p>
            {company.overview.slice(1).map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
            <div className="mt-8 flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-slate-200">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <MapPin className="size-[18px]" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-navy-900">
                  {t.bmcQuestionA} <span className="text-brand-600">BMC</span> {t.bmcQuestionB}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{company.nameMeaning}</p>
              </div>
            </div>
          </div>
          <div data-reveal className="relative">
            <TechVisual layers={t.layers} />
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-surface py-14 sm:py-16" aria-label={t.missionVisionAria}>
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { label: t.mission, text: mission, icon: Target },
            { label: t.vision, text: vision, icon: Eye },
          ].map((item, i) => (
            <div
              key={item.label}
              data-reveal
              style={revealDelay(i)}
              className="relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-10"
            >
              <span
                aria-hidden
                className="absolute -top-20 -right-20 size-56 rounded-full bg-gradient-to-br from-brand-100 to-cyan-50 blur-2xl"
              />
              <div className="relative">
                <IconTile icon={item.icon} size="lg" />
                <h2 className="mt-6 text-2xl font-semibold text-navy-900">{item.label}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="values-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              align="center"
              eyebrow={t.valuesEyebrow}
              title={<span id="values-title">{t.valuesTitle}</span>}
            />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                style={revealDelay(i % 3)}
                className="rounded-2xl p-6 ring-1 ring-slate-200 transition-colors hover:bg-surface"
              >
                <IconTile icon={v.icon} />
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach timeline */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-14 sm:py-16" aria-labelledby="approach-title">
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="dark"
              eyebrow={t.approachEyebrow}
              title={<span id="approach-title">{t.approachTitle}</span>}
              description={t.approachDescription}
            />
          </div>
          <ol className="relative space-y-6 border-l border-white/10 pl-8">
            {approach.map((a, i) => (
              <li key={a.title} data-reveal style={revealDelay(i)} className="relative">
                <span
                  aria-hidden
                  className="absolute top-6 -left-[37px] size-2.5 rounded-full bg-accent-400 ring-4 ring-navy-900"
                />
                <div className="rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                  <div className="flex items-center gap-4">
                    <IconTile icon={a.icon} tone="dark" size="sm" />
                    <p className="font-mono text-xs text-accent-400">{localizeNumber(a.phase, locale)}</p>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-14 sm:py-16" aria-labelledby="why-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow={t.whyEyebrow}
              title={<span id="why-title">{t.whyTitle}</span>}
              description={t.whyDescription}
            />
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((w, i) => (
              <div key={w.title} data-reveal style={revealDelay(i % 4)} className="bg-white p-6">
                <p className="font-mono text-xs text-brand-600">{num(i + 1)}</p>
                <h3 className="mt-3 font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.description}</p>
              </div>
            ))}
            <div className="flex flex-col justify-between bg-gradient-to-br from-brand-600 to-accent-600 p-6 text-white">
              <p className="font-semibold">{t.whyCta}</p>
              <ButtonLink href="/contact" variant="white" size="sm" className="mt-6 self-start">
                {dict.common.getInTouch}
                <ArrowRight />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection tone="light" />
      <CtaSection />
    </>
  );
}

/** Abstract architecture illustration — connected layers of a business system */
function TechVisual({ layers: l }: { layers: Dictionary["about"]["layers"] }) {
  const layers = [
    { label: l.users, items: ["Web", "Mobile", "POS"] },
    { label: l.apps, items: ["Sales", "Finance", "HR", "Inventory"] },
    { label: l.data, items: ["Database", "Reports", "APIs"] },
    { label: l.infra, items: ["Network", "Servers", "Backup"] },
  ];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-3xl bg-navy-900 p-6 shadow-2xl shadow-brand-900/20 sm:p-8"
    >
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-20 -right-20 size-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="relative space-y-3">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
              <p className="font-mono text-xs tracking-widest text-accent-400 uppercase">{layer.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.items.map((it) => (
                  <span key={it} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-200 ring-1 ring-white/10">
                    {it}
                  </span>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center gap-16 py-1">
                <span className="h-3 w-px bg-accent-400/40" />
                <span className="h-3 w-px bg-accent-400/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
