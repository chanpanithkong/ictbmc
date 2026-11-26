import type { ProcessStep } from "@/types";
import { cn, revealDelay } from "@/lib/utils";
import { getI18n } from "@/lib/i18n/server";
import { format, localizeNumber } from "@/lib/i18n/format";

/** Horizontal timeline on large screens, vertical on small screens. */
export async function ProcessTimeline({ steps, tone = "dark" }: { steps: ProcessStep[]; tone?: "dark" | "light" }) {
  const { locale, dict } = await getI18n();
  const dark = tone === "dark";
  // Static class names so Tailwind can detect them
  const colsByCount: Record<number, string> = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6", 7: "lg:grid-cols-7" };
  const cols = colsByCount[steps.length] ?? "lg:grid-cols-5";
  return (
    <ol className={cn("relative grid lg:gap-6", cols)}>
      <span
        aria-hidden
        className={cn(
          "absolute top-6 right-[7%] left-[7%] hidden h-px lg:block",
          dark
            ? "bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-accent-400/0"
            : "bg-gradient-to-r from-brand-200/0 via-brand-300 to-brand-200/0",
        )}
      />
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li
            key={step.title}
            data-reveal
            style={revealDelay(i)}
            className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
          >
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn("absolute top-12 bottom-0 left-6 w-px lg:hidden", dark ? "bg-white/10" : "bg-slate-200")}
              />
            )}
            <span
              className={cn(
                "relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1",
                dark ? "bg-navy-800 text-accent-300 ring-white/10" : "bg-white text-brand-600 shadow-sm ring-slate-200",
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="lg:mt-6">
              <p className={cn("font-mono text-xs", dark ? "text-accent-400" : "text-brand-600")}>
                {format(dict.common.step, { n: localizeNumber(String(i + 1).padStart(2, "0"), locale) })}
              </p>
              <h3 className={cn("mt-1 text-base font-semibold", dark ? "text-white" : "text-navy-900")}>
                {step.title}
              </h3>
              <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-slate-400" : "text-slate-600")}>
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
