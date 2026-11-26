import { Building2, Puzzle, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { revealDelay } from "@/lib/utils";

const features = [
  {
    title: "Business Technology",
    description: "Modern technology solutions designed to improve business operations.",
    icon: Building2,
  },
  {
    title: "Digital Transformation",
    description: "Helping organizations modernize their processes through digital technology.",
    icon: Sparkles,
  },
  {
    title: "Custom Solutions",
    description: "Technology solutions tailored to your organization's requirements.",
    icon: Puzzle,
  },
];

export function IntroSection() {
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="intro-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div data-reveal>
            <SectionHeading
              eyebrow="Who we help"
              title={<span id="intro-title">Technology Solutions Built Around Your Business.</span>}
            />
          </div>
          <p data-reveal className="text-lg leading-relaxed text-slate-600 lg:pb-1">
            Every business has unique challenges. We work closely with our clients to understand their needs and
            deliver technology solutions that improve efficiency, productivity, and long-term growth.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} data-reveal style={revealDelay(i)} className="group relative bg-white p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"
              />
              <IconTile icon={f.icon} size="lg" />
              <h3 className="mt-6 text-xl font-semibold text-navy-900">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
