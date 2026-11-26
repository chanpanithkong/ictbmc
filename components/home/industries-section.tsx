import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { revealDelay } from "@/lib/utils";

export function IndustriesSection() {
  return (
    <section className="bg-surface py-24 sm:py-28" aria-labelledby="industries-title">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow="Industries"
            title={<span id="industries-title">Industries We Can Support.</span>}
            description="Our solutions are designed to adapt to the needs of organizations across a wide range of sectors."
          />
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              data-reveal
              style={revealDelay(i % 3)}
              className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition-shadow hover:shadow-lg hover:shadow-brand-900/5"
            >
              <IconTile icon={ind.icon} />
              <div>
                <h3 className="font-semibold text-navy-900">{ind.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{ind.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
