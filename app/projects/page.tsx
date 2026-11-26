import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { CtaSection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore demo projects illustrating the software development, business systems, web applications, IT infrastructure and digital transformation work ICT BMC can deliver.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | ICT BMC", url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Solutions We Can <span className="text-gradient">Build for You.</span>
          </>
        }
        description="A selection of demo concepts across software development, business systems, web applications, IT infrastructure and digital transformation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <section className="bg-surface py-16 sm:py-20" aria-label="Project portfolio">
        <div className="container-page">
          <div
            role="note"
            className="mb-10 flex gap-3 rounded-2xl bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200"
          >
            <Info className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
            <p>
              <strong className="font-semibold">About these projects:</strong> all entries below are{" "}
              <strong className="font-semibold">demo concepts</strong> created to illustrate the types of solutions
              ICT BMC can deliver. They do not represent actual clients, engagements or results. Real case studies
              will be published here with client permission.
            </p>
          </div>
          <ProjectExplorer />
        </div>
      </section>
      <CtaSection
        title="Have a project in mind?"
        description="Tell us what you want to achieve and we'll help you scope, design and deliver it."
        secondary={{ label: "Our Services", href: "/services" }}
      />
    </>
  );
}
