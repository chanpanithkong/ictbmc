import { deliveryProcess } from "@/data/process";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";

export function ProcessSection({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section
      className={dark ? "relative isolate overflow-hidden bg-navy-900 py-24 sm:py-28" : "bg-surface py-24 sm:py-28"}
      aria-labelledby="process-title"
    >
      {dark && <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />}
      <div className="container-page">
        <div data-reveal>
          <SectionHeading
            tone={tone}
            eyebrow="How we work"
            title={<span id="process-title">A Clear, Proven Delivery Process.</span>}
            description="From the first conversation to long-term support, every engagement follows a structured process that keeps you informed and in control."
          />
        </div>
        <div className="mt-16">
          <ProcessTimeline steps={deliveryProcess} tone={tone} />
        </div>
      </div>
    </section>
  );
}
