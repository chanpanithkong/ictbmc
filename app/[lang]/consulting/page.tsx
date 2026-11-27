import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { ArrowRight } from "lucide-react";
import { getConsultingProcess, getConsultingServices } from "@/lib/i18n/content";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ButtonLink } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { AssessmentRadar } from "@/components/diagrams/assessment-radar";
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
        aside={<PageSlideshow page="consulting" />}
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

      <section className="bg-white py-14 sm:py-16" aria-labelledby="consulting-services-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow={t.servicesEyebrow}
              title={<span id="consulting-services-title">{t.servicesTitle}</span>}
              description={t.servicesDescription}
            />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Assessment radar */}
      <section className="relative overflow-hidden bg-surface py-14 sm:py-16" aria-labelledby="assessment-title">
        <div aria-hidden className="bg-grid-light mask-radial absolute inset-0" />
        <div className="relative container-page grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div data-reveal>
            <SectionHeading
              eyebrow={t.assessment.eyebrow}
              title={<span id="assessment-title">{t.assessment.title}</span>}
              description={t.assessment.description}
            />
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-navy-900">
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="h-0.5 w-6 rounded bg-[repeating-linear-gradient(90deg,#f59e0b_0_6px,transparent_6px_10px)]" />
                <span aria-hidden className="size-3 rounded-full bg-amber-500" />
                {t.assessment.current}
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden className="h-0.5 w-6 rounded bg-brand-600" />
                <span aria-hidden className="size-3 rounded-full border-2 border-brand-600 bg-white" />
                {t.assessment.target}
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-500 italic">{t.assessment.illustrative}</p>
          </div>
          <div data-reveal className="rounded-3xl bg-white p-3 shadow-xl ring-1 shadow-brand-900/5 ring-slate-200 sm:p-5">
            <AssessmentRadar axes={t.assessment.axes} label={t.assessment.diagramAria} />
          </div>
        </div>
      </section>

      <section
        id="consulting-process"
        className="relative isolate overflow-hidden bg-navy-900 py-14 sm:py-16"
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
          <div className="mt-12">
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
