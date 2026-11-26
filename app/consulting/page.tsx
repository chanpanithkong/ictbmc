import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { consultingServices } from "@/data/consulting";
import { consultingProcess } from "@/data/process";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ButtonLink } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaSection } from "@/components/shared/cta-section";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = {
  title: "IT Consulting",
  description:
    "Expert IT consulting in Cambodia: IT strategy, technology assessment, software selection, system architecture, infrastructure and network planning, cybersecurity assessment and IT project management.",
  alternates: { canonical: "/consulting" },
  openGraph: { title: "IT Consulting | ICT BMC", url: "/consulting" },
};

const consultHref = `/contact?service=${encodeURIComponent("IT Consulting")}`;

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="IT Consulting"
        title={
          <>
            Expert Technology Guidance <span className="text-gradient">for Your Business.</span>
          </>
        }
        description="We help organizations identify technology opportunities, solve operational challenges, improve IT infrastructure, and implement practical solutions aligned with their business objectives."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "IT Consulting" },
        ]}
        actions={
          <>
            <ButtonLink href={consultHref} size="lg">
              Discuss Your Technology Needs
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#consulting-process" size="lg" variant="ghostDark">
              Our process
            </ButtonLink>
          </>
        }
      />

      <section className="bg-white py-24 sm:py-28" aria-labelledby="consulting-services-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow="Consulting services"
              title={<span id="consulting-services-title">How We Can Help.</span>}
              description="Independent, practical advice across strategy, systems, infrastructure and delivery."
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
              eyebrow="Consulting process"
              title={<span id="consulting-process-title">From Understanding to Ongoing Support.</span>}
              description="A structured five-step engagement that turns business challenges into practical, implemented solutions."
            />
          </div>
          <div className="mt-16">
            <ProcessTimeline steps={consultingProcess} />
          </div>
        </div>
      </section>

      <CtaSection
        title="Discuss Your Technology Needs."
        description="Share your goals and challenges with us. We will help you understand your options and recommend a practical path forward."
        primary={{ label: "Discuss Your Technology Needs", href: consultHref }}
        secondary={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
