import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Check,
  Code2,
  Gauge,
  Globe,
  GraduationCap,
  KeyRound,
  Languages,
  LayoutTemplate,
  LifeBuoy,
  Megaphone,
  PencilLine,
  PenTool,
  Plus,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { localizeNumber } from "@/lib/i18n/format";
import { absoluteUrl, cn, revealDelay } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ButtonLink } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaSection } from "@/components/shared/cta-section";
import { JsonLd } from "@/components/shared/json-ld";
import { company } from "@/data/company";
import { localizeHref } from "@/lib/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/websites", {
    title: dict.websites.metaTitle,
    description: dict.websites.metaDescription,
  });
}

const typeIcons: LucideIcon[] = [Building2, ShoppingCart, Megaphone, UtensilsCrossed, GraduationCap, KeyRound];
const includedIcons: LucideIcon[] = [Smartphone, Languages, Search, Gauge, PencilLine, Share2, Globe, LifeBuoy];
const processIcons: LucideIcon[] = [Search, LayoutTemplate, PenTool, Code2, Rocket, LifeBuoy];

const quoteHref = `/contact?service=${encodeURIComponent("Web Development")}`;

export default async function WebsitesPage() {
  const { locale, dict } = await getI18n();
  const t = dict.websites;
  const num = (n: number) => localizeNumber(String(n).padStart(2, "0"), locale);

  return (
    <>
      <PageHero
        aside={<PageSlideshow page="websites" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.services, href: "/services" },
          { label: dict.nav.websites },
        ]}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg">
              {t.startProject}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#packages" size="lg" variant="ghostDark">
              {t.viewPackages}
            </ButtonLink>
          </>
        }
      />

      {/* Website types */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="types-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow={t.typesEyebrow}
              title={<span id="types-title">{t.typesTitle}</span>}
              description={t.typesDescription}
            />
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.types.map((type, i) => (
              <article
                key={type.title}
                data-reveal
                style={revealDelay(i % 3)}
                className="group relative overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 hover:ring-brand-200"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <IconTile icon={typeIcons[i]} size="lg" />
                  <span className="font-mono text-xs text-slate-300" aria-hidden>
                    {num(i + 1)}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-navy-900">{type.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{type.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Included in every website */}
      <section
        className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28"
        aria-labelledby="included-title"
      >
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
        <div aria-hidden className="absolute -top-32 -right-32 -z-10 size-[480px] rounded-full bg-brand-600/20 blur-3xl" />
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              tone="dark"
              align="center"
              eyebrow={t.includedEyebrow}
              title={<span id="included-title">{t.includedTitle}</span>}
              description={t.includedDescription}
            />
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.included.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={revealDelay(i % 4)}
                className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]"
              >
                <IconTile icon={includedIcons[i]} tone="dark" />
                <h3 className="mt-5 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-4 bg-surface py-24 sm:py-28" aria-labelledby="packages-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              align="center"
              eyebrow={t.packagesEyebrow}
              title={<span id="packages-title">{t.packagesTitle}</span>}
              description={t.packagesDescription}
            />
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {t.packages.map((pkg, i) => {
              const featured = i === 1;
              return (
                <article
                  key={pkg.name}
                  data-reveal
                  style={revealDelay(i)}
                  className={cn(
                    "relative flex flex-col rounded-3xl p-8 ring-1",
                    featured
                      ? "bg-navy-900 text-white shadow-2xl ring-brand-500/40 shadow-brand-900/30 lg:-my-4 lg:py-12"
                      : "bg-white ring-slate-200",
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-4 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-lg">
                      {t.popular}
                    </span>
                  )}
                  <h3 className={cn("text-2xl font-bold", featured ? "text-white" : "text-navy-900")}>{pkg.name}</h3>
                  <p className={cn("mt-2", featured ? "text-slate-300" : "text-slate-600")}>{pkg.tagline}</p>
                  <p
                    className={cn(
                      "mt-6 border-y py-4 text-lg font-semibold",
                      featured ? "border-white/10 text-accent-300" : "border-slate-100 text-brand-700",
                    )}
                  >
                    {t.priceNote}
                  </p>
                  <ul className="mt-6 mb-8 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                            featured ? "bg-accent-500/20 text-accent-300" : "bg-brand-50 text-brand-600",
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className={cn("text-sm leading-relaxed", featured ? "text-slate-200" : "text-slate-700")}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={quoteHref}
                    variant={featured ? "primary" : "secondary"}
                    className="mt-auto w-full"
                  >
                    {t.quote}
                    <ArrowRight />
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="web-process-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading eyebrow={t.processEyebrow} title={<span id="web-process-title">{t.processTitle}</span>} />
          </div>
          <div className="mt-16">
            <ProcessTimeline
              tone="light"
              steps={t.process.map((step, i) => ({ ...step, icon: processIcons[i] }))}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-24 sm:py-28" aria-labelledby="faq-title">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <SectionHeading eyebrow={t.faqEyebrow} title={<span id="faq-title">{t.faqTitle}</span>} />
          </div>
          <div className="space-y-3">
            {t.faq.map((item, i) => (
              <details
                key={item.q}
                data-reveal
                style={revealDelay(i % 3)}
                className="group rounded-2xl bg-white ring-1 ring-slate-200 open:shadow-lg open:shadow-brand-900/5 open:ring-brand-200"
              >
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform group-open:rotate-45"
                  >
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={t.ctaTitle}
        description={t.ctaDescription}
        primary={{ label: t.startProject, href: quoteHref }}
        secondary={{ label: dict.nav.projects, href: "/projects" }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: t.metaTitle,
          serviceType: "Website design and development",
          description: t.metaDescription,
          provider: { "@type": "Organization", name: company.name },
          areaServed: { "@type": "Country", name: company.country },
          url: absoluteUrl(localizeHref(locale, "/websites")),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: t.packagesTitle,
            itemListElement: t.packages.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: `${t.metaTitle} — ${p.name}`, description: p.tagline },
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
