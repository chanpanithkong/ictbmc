import { getI18n } from "@/lib/i18n/server";
import { getSolutions } from "@/lib/i18n/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { SolutionCard } from "@/components/shared/solution-card";
import { revealDelay } from "@/lib/utils";

export async function SolutionsSection() {
  const { locale, dict } = await getI18n();
  const h = dict.home;
  const solutions = getSolutions(locale);
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-14 sm:py-16" aria-labelledby="solutions-title">
      <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 -z-10 size-[480px] rounded-full bg-brand-600/20 blur-3xl"
      />
      <div className="container-page">
        <div data-reveal>
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow={h.solutionsEyebrow}
            title={<span id="solutions-title">{h.solutionsTitle}</span>}
            description={h.solutionsDescription}
          />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <div key={s.slug} data-reveal style={revealDelay(i % 3)}>
              <SolutionCard solution={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
