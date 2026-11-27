import { ArrowRight } from "lucide-react";
import { getI18n } from "@/lib/i18n/server";
import { getServices } from "@/lib/i18n/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { revealDelay } from "@/lib/utils";

export async function ServicesSection() {
  const { locale, dict } = await getI18n();
  const h = dict.home;
  const services = getServices(locale);
  return (
    <section className="relative bg-surface py-14 sm:py-16" aria-labelledby="services-title">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <SectionHeading
              eyebrow={h.servicesEyebrow}
              title={<span id="services-title">{h.servicesTitle}</span>}
              description={h.servicesDescription}
            />
          </div>
          <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
            {h.allServices}
            <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
