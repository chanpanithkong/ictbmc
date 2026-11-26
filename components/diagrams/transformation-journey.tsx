import { ChartLine, Database, FileText, Network, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { format, localizeNumber } from "@/lib/i18n/format";
import { cn, revealDelay } from "@/lib/utils";

type Journey = Dictionary["solutions"]["journey"];

const icons: LucideIcon[] = [FileText, Database, Network, ChartLine];
/** Desktop stair-step offsets: each stage sits higher than the previous one */
const lift = ["lg:translate-y-36", "lg:translate-y-24", "lg:translate-y-12", "lg:translate-y-0"];

/**
 * Four-stage digital transformation figure. On large screens the stages climb
 * a growth curve; on small screens they become a vertical timeline.
 */
export function TransformationJourney({ t, locale }: { t: Journey; locale: string }) {
  return (
    <figure role="img" aria-label={t.diagramAria} className="relative">
      {/* growth curve (desktop) */}
      <svg
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 hidden h-[320px] w-full lg:block"
      >
        <defs>
          <linearGradient id="journey-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#64748b" />
            <stop offset="0.45" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="journey-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2563EB" stopOpacity="0.28" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 300 C 220 300, 300 230, 500 170 S 820 40, 1000 10 L1000 320 L0 320 Z" fill="url(#journey-fill)" />
        <path
          d="M0 300 C 220 300, 300 230, 500 170 S 820 40, 1000 10"
          fill="none"
          stroke="url(#journey-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M0 300 C 220 300, 300 230, 500 170 S 820 40, 1000 10"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          className="animate-flow"
        />
      </svg>

      {/* mobile timeline line */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-6 w-px bg-gradient-to-b from-slate-600 via-brand-500 to-accent-400 lg:hidden"
      />

      <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5 lg:pb-36">
        {t.stages.map((stage, i) => {
          const Icon = icons[i];
          const last = i === t.stages.length - 1;
          return (
            <li key={stage.title} data-reveal style={revealDelay(i)} className={cn("relative pl-16 lg:pl-0", lift[i])}>
              {/* node */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 left-0 inline-flex size-12 items-center justify-center rounded-2xl ring-1 lg:static lg:mb-5",
                  last
                    ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg ring-white/20 shadow-accent-500/30"
                    : "bg-navy-800 text-accent-300 ring-white/10",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div
                className={cn(
                  "rounded-2xl p-5 ring-1",
                  last ? "bg-navy-700 ring-accent-400/40 shadow-xl shadow-accent-500/10" : "bg-navy-800 ring-white/10",
                )}
              >
                <p className="font-mono text-xs text-accent-400">
                  {format(t.stage, { n: localizeNumber(i + 1, locale) })}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{stage.description}</p>
                {/* maturity bar */}
                <div aria-hidden className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                    style={{ width: `${25 * (i + 1)}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
