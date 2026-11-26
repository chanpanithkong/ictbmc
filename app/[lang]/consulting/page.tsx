import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { ArrowRight } from "lucide-react";
import { getConsultingProcess, getConsultingServices } from "@/lib/i18n/content";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ButtonLink } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaSection } from "@/components/shared/cta-section";
import { revealDelay } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/consulting", { title: dict.meta.consultingTitle, description: dict.meta.consultingDescription });
}

const consultHref = `/contact?service=${encodeURIComponent("IT Consulting")}`;

export default async function ConsultingPage() {
  const { locale, dict } = await getI18n();
  const t = dict.consulting;
  const consultingServices = getConsultingServices(locale);
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.solutions, href: "/solutions" },
          { label: dict.nav.consulting },
        ]}
        actions={
          <>
            <ButtonLink href={consultHref} size="lg">
              {t.discussNeeds}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#consulting-process" size="lg" variant="ghostDark">
              {t.ourProcess}
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white py-24 sm:py-28" aria-labelledby="consulting-services-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow={t.servicesEyebrow}
              title={<span id="consulting-services-title">{t.servicesTitle}</span>}
              description={t.servicesDescription}
            />
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {consultingServices.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={revealDelay(i % 4)}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/5"
              >
                <IconTile icon={c.icon} />
                <h3 className="mt-5 font-semibold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="consulting-process"
        className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28"
        aria-labelledby="consulting-process-title"
      >
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              tone="dark"
              eyebrow={t.processEyebrow}
              title={<span id="consulting-process-title">{t.processTitle}</span>}
              description={t.processDescription}
            />
          </div>
          <div className="mt-16">
            <ProcessTimeline steps={getConsultingProcess(locale)} />
          </div>
        </div>
      </section>

      <CtaSection
        title={t.ctaTitle}
        description={t.ctaDescription}
        primary={{ label: t.discussNeeds, href: consultHref }}
        secondary={{ label: dict.common.viewServices, href: "/services" }}
      />
    </>
  );
}
