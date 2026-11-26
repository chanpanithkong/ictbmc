import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { PageHero } from "@/components/shared/page-hero";
import { IconTile } from "@/components/ui/icon-tile";
import { CheckList } from "@/components/ui/check-list";
import { ButtonLink } from "@/components/ui/button";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/shared/cta-section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, IT consulting, business management systems, web applications, IT infrastructure, database management, IT support and digital transformation services.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Technology Services | ICT BMC", url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Comprehensive <span className="text-gradient">Technology Services.</span>
          </>
        }
        description="From strategy and software to infrastructure and support, we provide the technology services organizations need to operate efficiently and grow with confidence."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Quick index */}
      <nav aria-label="Services on this page" className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:top-[72px]">
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
            className={cn("scroll-mt-14 py-20 sm:py-24", i % 2 === 1 && "bg-surface")}
          >
            <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div data-reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <div className="flex items-center gap-4">
                  <IconTile icon={s.icon} size="lg" />
                  <span className="font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 id={`${s.slug}-title`} className="mt-6 text-3xl font-semibold tracking-tight text-navy-900">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.description}</p>
                <p className="mt-4 leading-relaxed text-slate-600">{s.details}</p>
                <ButtonLink
                  href={`/contact?service=${encodeURIComponent(contactCategory(s.slug))}`}
                  variant="link"
                  size="none"
                  className="mt-6"
                >
                  Discuss this service
                  <ArrowRight />
                </ButtonLink>
              </div>
              <div
                data-reveal
                className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 sm:p-10"
              >
                <div className="bg-grid-dark mask-radial absolute inset-0" aria-hidden />
                <div
                  aria-hidden
                  className="absolute -right-16 -bottom-16 size-64 rounded-full bg-brand-600/30 blur-3xl"
                />
                <div className="relative">
                  <p className="eyebrow text-accent-400">What&apos;s included</p>
                  <CheckList items={s.capabilities} tone="dark" className="mt-6" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <ProcessSection />
      <CtaSection title="Not sure which service you need?" description="Tell us about your challenge and we'll recommend the right combination of services for your organization." />
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
