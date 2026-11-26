import { getI18n } from "@/lib/i18n/server";
import { getDeliveryProcess } from "@/lib/i18n/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessTimeline } from "@/components/shared/process-timeline";

export async function ProcessSection({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, dict } = await getI18n();
  const h = dict.home;
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
            eyebrow={h.processEyebrow}
            title={<span id="process-title">{h.processTitle}</span>}
            description={h.processDescription}
          />
        </div>
        <div className="mt-16">
          <ProcessTimeline steps={getDeliveryProcess(locale)} tone={tone} />
        </div>
      </div>
    </section>
  );
}
