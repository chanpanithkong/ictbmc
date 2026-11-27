import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { CtaSection } from "@/components/shared/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/projects", { title: dict.meta.projectsTitle, description: dict.meta.projectsDescription });
}

export default async function ProjectsPage() {
  const { dict } = await getI18n();
  const t = dict.projects;
  return (
    <>
      <PageHero
        aside={<PageSlideshow page="projects" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.projects }]}
      />
      <section className="bg-surface py-14 sm:py-16" aria-label={t.portfolioAria}>
        <div className="container-page">
          <div
            role="note"
            className="mb-10 flex gap-3 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200"
          >
            <Info className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
            <p>
              <strong className="font-semibold">{t.noteStrong}</strong> {t.noteA}{" "}
              <strong className="font-semibold">{t.noteDemo}</strong> {t.noteB}
            </p>
          </div>
          <ProjectExplorer />
        </div>
      </section>
      <CtaSection
        title={t.ctaTitle}
        description={t.ctaDescription}
        secondary={{ label: dict.common.ourServices, href: "/services" }}
      />
    </>
  );
}
