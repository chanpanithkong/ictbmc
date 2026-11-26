import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { revealDelay } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section className="relative bg-surface py-24 sm:py-28" aria-labelledby="services-title">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <SectionHeading
              eyebrow="Services"
              title={<span id="services-title">Comprehensive Technology Services.</span>}
              description="End-to-end expertise across software, systems, infrastructure and support — delivered by one accountable partner."
            />
          </div>
          <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
            All services
            <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div key={service.slug} data-reveal style={revealDelay(i % 4)}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
