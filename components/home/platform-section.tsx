import { CircleCheck } from "lucide-react";
import { getI18n } from "@/lib/i18n/server";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlatformHub } from "@/components/diagrams/platform-hub";

export async function PlatformSection() {
  const { dict } = await getI18n();
  const t = dict.home.platform;
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16" aria-labelledby="platform-title">
      <div aria-hidden className="bg-grid-light mask-radial absolute inset-0" />
      <div className="relative container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div data-reveal>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={<span id="platform-title">{t.title}</span>}
            description={t.description}
          />
          <ul className="mt-8 space-y-4">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-navy-900">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                <span className="font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <PlatformHub nodes={t.nodes} hub={t.hub} hubSub={t.hubSub} label={t.diagramAria} />
        </div>
      </div>
    </section>
  );
}
