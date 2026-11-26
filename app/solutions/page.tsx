import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Lightbulb } from "lucide-react";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/shared/page-hero";
import { IconTile } from "@/components/ui/icon-tile";
import { CheckList } from "@/components/ui/check-list";
import { ButtonLink } from "@/components/ui/button";
import { IndustriesSection } from "@/components/home/industries-section";
import { CtaSection } from "@/components/shared/cta-section";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business automation, business management systems, digital transformation, information management, IT infrastructure and custom software solutions for modern businesses.",
  alternates: { canonical: "/solutions" },
  openGraph: { title: "Technology Solutions | ICT BMC", url: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Smart Solutions for <span className="text-gradient">Modern Businesses.</span>
          </>
        }
        description="Explore our technology solutions designed to support businesses across different industries."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        actions={
          <>
            <ButtonLink href="/products" size="lg">
              Browse Products
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/consulting" size="lg" variant="ghostDark">
              IT Consulting
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white py-24 sm:py-28" aria-label="Our solutions">
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
                <span className="font-mono text-sm text-slate-300">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-navy-900">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.description}</p>
              <CheckList items={s.points} className="mt-6 mb-8" />
              <Link
                href={s.href.startsWith("/solutions") ? "/contact" : s.href}
                className="focus-ring mt-auto inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {s.href.startsWith("/solutions") ? "Discuss this solution" : `Explore ${s.title}`}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Paths */}
      <section className="bg-surface py-20" aria-label="Where to start">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            {
              icon: LayoutDashboard,
              title: "Need a ready-made system?",
              text: "Browse 12 configurable business management products for restaurants, retail, finance, HR, education, healthcare and more.",
              href: "/products",
              cta: "View software products",
            },
            {
              icon: Lightbulb,
              title: "Not sure where to start?",
              text: "Our IT consulting services help you assess your current situation and plan the right technology investments.",
              href: "/consulting",
              cta: "Explore IT consulting",
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
