/**
 * Illustration library for hero slideshows. All figures are decorative
 * (aria-hidden) — the slideshow caption carries the meaning. Values shown are
 * sample UI data, not real figures.
 */
import type { ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  CircleCheck,
  Cloud,
  Cpu,
  Headset,
  Laptop,
  Lock,
  MapPin,
  Monitor,
  Server,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type F = Dictionary["figures"];

/* ---------- shared frame ---------- */

export function FigureWindow({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-2xl bg-navy-800/80 shadow-2xl ring-1 shadow-black/40 ring-white/10 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" />
        {title && (
          <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-400">{title}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function Chip({ icon: Icon, children, tone = "accent" }: { icon: typeof Cpu; children: ReactNode; tone?: "accent" | "green" }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 pr-4 shadow-xl ring-1 shadow-black/25 ring-slate-200">
      <span
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
          tone === "green" ? "bg-emerald-50 text-emerald-600" : "bg-brand-50 text-brand-600",
        )}
      >
        <Icon className="size-[18px]" />
      </span>
      <div className="text-sm font-semibold text-navy-900">{children}</div>
    </div>
  );
}

/* ---------- 1. Code editor ---------- */

const codeLines: [string, string][][] = [
  [["text-fuchsia-300", "import"], ["text-slate-300", " { createInvoice } "], ["text-fuchsia-300", "from"], ["text-emerald-300", ' "@/billing"']],
  [],
  [["text-fuchsia-300", "export async function"], ["text-sky-300", " checkout"], ["text-slate-300", "(order) {"]],
  [["text-slate-500", "  // validate, save and notify"]],
  [["text-fuchsia-300", "  const"], ["text-slate-300", " total = order.items"]],
  [["text-slate-300", "    ."], ["text-sky-300", "reduce"], ["text-slate-300", "((sum, i) => sum + i.price, "], ["text-amber-300", "0"], ["text-slate-300", ");"]],
  [["text-fuchsia-300", "  await"], ["text-sky-300", " createInvoice"], ["text-slate-300", "({ order, total });"]],
  [["text-fuchsia-300", "  return"], ["text-slate-300", " { status: "], ["text-emerald-300", '"paid"'], ["text-slate-300", ", total };"]],
  [["text-slate-300", "}"]],
];

export function CodeFigure({ t }: { t: F }) {
  return (
    <div className="relative px-2 pt-6 pb-8 sm:px-6">
      <FigureWindow title="checkout.ts">
        <div className="flex font-mono text-[12px] leading-6 sm:text-[13px]">
          <div className="border-r border-white/5 px-3 py-4 text-right text-slate-600 select-none">
            {codeLines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden px-4 py-4 whitespace-pre">
            {codeLines.map((line, i) => (
              <div key={i}>
                {line.map(([cls, txt], j) => (
                  <span key={j} className={cls}>
                    {txt}
                  </span>
                ))}
                {line.length === 0 && " "}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-white/5 bg-black/20 px-4 py-2.5 font-mono text-[11px] text-emerald-300">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-400" />✓ {t.testsPassed}
        </div>
      </FigureWindow>
      <div className="absolute -top-1 right-0 hidden animate-float sm:block">
        <Chip icon={BadgeCheck} tone="green">
          {t.buildPassed}
        </Chip>
      </div>
      <div className="absolute right-8 -bottom-2 hidden animate-float sm:block" style={{ animationDelay: "1.5s" }}>
        <Chip icon={Zap}>{t.deployed}</Chip>
      </div>
    </div>
  );
}

/* ---------- 2. Network topology ---------- */

export function NetworkFigure({ t }: { t: F }) {
  const nodes = [
    { x: 50, y: 12, icon: Cloud, label: t.cloud, hl: true },
    { x: 50, y: 46, icon: ShieldCheck, label: t.firewall, hl: true },
    { x: 15, y: 50, icon: Server, label: t.servers },
    { x: 85, y: 50, icon: Building2, label: t.headOffice },
    { x: 22, y: 86, icon: Building2, label: `${t.branch} A` },
    { x: 50, y: 88, icon: Laptop, label: t.devices },
    { x: 78, y: 86, icon: Building2, label: `${t.branch} B` },
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [3, 6]];
  return (
    <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
      <div className="bg-grid-dark absolute inset-0 rounded-3xl opacity-70" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {links.map(([a, b], i) => (
          <g key={i}>
            <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#1e3a8a" strokeWidth="0.8" />
            <line
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="#22D3EE"
              strokeWidth="0.5"
              strokeDasharray="1.5 3"
              className="animate-flow"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * -0.2}s` }}
            />
          </g>
        ))}
      </svg>
      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-2xl shadow-lg ring-1",
                n.hl
                  ? "size-14 bg-gradient-to-br from-brand-500 to-accent-500 text-white ring-white/20 shadow-brand-600/40"
                  : "size-12 bg-navy-800 text-accent-300 ring-white/15",
              )}
            >
              <Icon className={n.hl ? "size-6" : "size-5"} strokeWidth={1.75} />
            </span>
            <span className="rounded-md bg-navy-900/80 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-slate-200">
              {n.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 3. Roadmap (Gantt) ---------- */

export function RoadmapFigure({ t }: { t: F }) {
  const bars = [
    { start: 0, span: 1.2, color: "from-amber-400 to-amber-300" },
    { start: 0.8, span: 1.3, color: "from-brand-500 to-brand-400" },
    { start: 1.8, span: 1.6, color: "from-accent-500 to-accent-400" },
    { start: 3.1, span: 0.9, color: "from-emerald-500 to-emerald-400" },
  ];
  return (
    <div className="px-1 sm:px-4">
      <FigureWindow title={t.roadmapTitle}>
        <div className="p-5">
          <div className="grid grid-cols-[6.5rem_1fr] gap-y-4 text-sm sm:grid-cols-[8rem_1fr]">
            <div />
            <div className="grid grid-cols-4 text-center text-xs text-slate-400">
              {t.quarters.map((q) => (
                <span key={q}>{q}</span>
              ))}
            </div>
            {t.phases.map((phase, i) => (
              <div key={phase} className="contents">
                <span className="flex items-center gap-2 font-medium text-slate-200">
                  <span className="font-mono text-xs text-accent-400">0{i + 1}</span>
                  <span className="truncate">{phase}</span>
                </span>
                <div className="relative h-9 rounded-lg bg-white/[0.03]">
                  <div className="absolute inset-0 grid grid-cols-4">
                    {[0, 1, 2, 3].map((c) => (
                      <span key={c} className="border-l border-white/5 first:border-0" />
                    ))}
                  </div>
                  <span
                    className={cn("absolute top-1.5 bottom-1.5 rounded-md bg-gradient-to-r shadow-lg", bars[i].color)}
                    style={{ left: `${(bars[i].start / 4) * 100}%`, width: `${(bars[i].span / 4) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <CircleCheck className="size-4" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[62%] rounded-full bg-gradient-to-r from-brand-500 to-accent-400" />
            </div>
            <span className="font-mono text-xs text-slate-300">62%</span>
          </div>
        </div>
      </FigureWindow>
    </div>
  );
}

/* ---------- 4. Security ---------- */

export function SecurityFigure({ t }: { t: F }) {
  return (
    <div aria-hidden className="relative mx-auto grid max-w-[540px] items-center gap-6 sm:grid-cols-[1fr_1.2fr]">
      <div className="relative mx-auto flex size-48 items-center justify-center sm:size-56">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent-400/40" />
        <div className="absolute inset-5 rounded-full border border-brand-500/30" />
        <svg viewBox="0 0 100 116" className="relative h-36 drop-shadow-[0_10px_30px_rgba(37,99,235,0.45)] sm:h-40">
          <defs>
            <linearGradient id="fig-shield" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path d="M50 4 L92 20 V54 C92 82 74 102 50 112 C26 102 8 82 8 54 V20 Z" fill="url(#fig-shield)" />
          <path d="M50 14 L82 26 V54 C82 76 68 92 50 100 C32 92 18 76 18 54 V26 Z" fill="#0B1120" opacity="0.25" />
        </svg>
        <Lock className="absolute size-12 text-white" strokeWidth={2} />
        <span className="absolute -bottom-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {t.secure}
        </span>
      </div>
      <ul className="space-y-3">
        {t.securityItems.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-4 py-3 text-sm font-medium text-slate-100 ring-1 ring-white/10"
          >
            <CircleCheck className="size-5 shrink-0 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 5. Analytics ---------- */

export function AnalyticsFigure({ t }: { t: F }) {
  const segments = [
    { v: 38, c: "#2563EB" },
    { v: 27, c: "#06B6D4" },
    { v: 20, c: "#60A5FA" },
    { v: 15, c: "#1e3a8a" },
  ];
  let acc = 0;
  const C = 2 * Math.PI * 36;
  const bars = [30, 45, 38, 55, 48, 66, 58, 74, 69, 82, 77, 90];
  return (
    <div className="px-1 sm:px-4">
      <FigureWindow title={t.revenueByBranch}>
        <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
          <div className="relative mx-auto size-40">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="36" fill="none" stroke="#ffffff14" strokeWidth="14" />
              {segments.map((s, i) => {
                const len = (s.v / 100) * C;
                const el = (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke={s.c}
                    strokeWidth="14"
                    strokeDasharray={`${len - 1.5} ${C}`}
                    strokeDashoffset={-acc}
                  />
                );
                acc += len;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">+18%</span>
              <span className="text-xs text-slate-400">{t.growth}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-4">
            <div className="grid grid-cols-3 gap-2">
              {["$84k", "1.2k", "94%"].map((v, i) => (
                <div key={i} className="rounded-lg bg-white/[0.05] p-2.5 ring-1 ring-white/5">
                  <div className="h-1.5 w-8 rounded bg-white/15" />
                  <p className="mt-2 text-base font-semibold text-white">{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3 ring-1 ring-white/5">
              <p className="mb-2 text-xs text-slate-400">{t.monthly}</p>
              <div className="flex h-20 items-end gap-1">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent-400"
                    style={{ height: `${h}%`, opacity: 0.45 + i * 0.045 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </FigureWindow>
    </div>
  );
}

/* ---------- 6. Workflow automation ---------- */

export function WorkflowFigure({ t, steps }: { t: F; steps?: string[] }) {
  const items = (steps ?? t.workflowSteps).slice(0, 5);
  return (
    <div aria-hidden className="relative mx-auto max-w-[560px] px-1 py-4 sm:px-4">
      <div className="bg-grid-dark absolute inset-0 rounded-3xl opacity-60" />
      <ol className="relative space-y-3">
        {items.map((step, i) => (
          <li key={step} className="relative flex items-center gap-4" style={{ marginLeft: `${(i % 2) * 12}%` }}>
            {i < items.length - 1 && (
              <span className="absolute top-12 left-6 h-6 w-px bg-gradient-to-b from-accent-400 to-transparent" />
            )}
            <span
              className={cn(
                "relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-semibold ring-1",
                i === items.length - 1
                  ? "bg-gradient-to-br from-emerald-500 to-accent-500 text-white ring-white/20"
                  : "bg-navy-800 text-accent-300 ring-white/15",
              )}
            >
              {i === items.length - 1 ? <CircleCheck className="size-5" /> : i + 1}
            </span>
            <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/10">
              <span className="truncate text-sm font-semibold text-white">{step}</span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-500/15 px-2 py-0.5 text-[11px] font-medium text-accent-300">
                <Zap className="size-3" />
                {t.automation}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- 7. Devices (responsive web app) ---------- */

export function DevicesFigure() {
  const screen = (compact: boolean) => (
    <div className="space-y-2 p-3">
      <div className="flex items-center justify-between">
        <span className="h-2 w-16 rounded bg-white/25" />
        <span className="size-5 rounded-full bg-gradient-to-br from-brand-500 to-accent-500" />
      </div>
      <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-3")}>
        {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
          <div key={i} className="rounded-md bg-white/[0.06] p-2 ring-1 ring-white/5">
            <span className="block h-1.5 w-8 rounded bg-white/20" />
            <span className="mt-2 block h-2.5 w-12 rounded bg-accent-400/60" />
          </div>
        ))}
      </div>
      <div className="flex h-16 items-end gap-1 rounded-md bg-white/[0.04] p-2">
        {[40, 62, 48, 75, 60, 88, 70].slice(0, compact ? 5 : 7).map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent-400" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400/80" />
            <span className="h-1.5 flex-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div aria-hidden className="relative mx-auto max-w-[560px] pt-4 pb-10">
      {/* laptop */}
      <div className="mr-[18%]">
        <div className="rounded-t-2xl bg-navy-800 p-2 ring-1 ring-white/15">
          <div className="overflow-hidden rounded-lg bg-navy-900 ring-1 ring-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
              <Monitor className="size-3.5 text-slate-500" />
              <span className="h-1.5 w-24 rounded bg-white/10" />
            </div>
            {screen(false)}
          </div>
        </div>
        <div className="mx-[-4%] h-3 rounded-b-xl bg-gradient-to-b from-slate-500 to-slate-700" />
      </div>
      {/* phone */}
      <div className="absolute right-[2%] bottom-0 w-[30%] animate-float rounded-[1.6rem] bg-navy-800 p-1.5 shadow-2xl ring-1 shadow-black/50 ring-white/20">
        <div className="overflow-hidden rounded-[1.2rem] bg-navy-900">
          <div className="flex items-center justify-center gap-1 py-1.5">
            <Smartphone className="size-3 text-slate-500" />
            <span className="h-1 w-8 rounded-full bg-white/15" />
          </div>
          {screen(true)}
        </div>
      </div>
    </div>
  );
}

/* ---------- 8. Support chat ---------- */

export function ChatFigure({ t }: { t: F }) {
  return (
    <div className="px-1 sm:px-4">
      <FigureWindow>
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <span className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <Headset className="size-4" />
            </span>
            <span className="text-sm font-semibold text-white">{t.support}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
            <CircleCheck className="size-3.5" /> {t.resolved}
          </span>
        </div>
        <div className="space-y-3 p-5 text-sm leading-relaxed">
          <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5 text-slate-200">{t.chatClient}</p>
          <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand-600 to-brand-500 px-4 py-2.5 text-white">
            {t.chatAgent}
          </p>
          <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-2.5 text-slate-200">{t.chatClient2}</p>
          <div className="flex gap-1 pl-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1.5 animate-pulse-dot rounded-full bg-slate-400" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
        </div>
      </FigureWindow>
    </div>
  );
}

/* ---------- 9. Office map ---------- */

export function MapFigure({ t, address }: { t: F; address: string }) {
  return (
    <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-[560px] overflow-hidden rounded-3xl bg-navy-800 ring-1 ring-white/10">
      <div className="bg-grid-dark absolute inset-0" />
      <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none">
        {/* rivers / roads */}
        <path d="M-10 230 C 80 200, 140 260, 220 220 S 340 150, 410 170" stroke="#1e3a8a" strokeWidth="14" strokeLinecap="round" />
        <path d="M120 -10 C 140 80, 100 170, 170 330" stroke="#334155" strokeWidth="7" />
        <path d="M300 -10 L 250 330" stroke="#334155" strokeWidth="5" />
        <path d="M-10 110 L 410 90" stroke="#334155" strokeWidth="4" />
        {/* blocks */}
        {[
          [30, 30, 60, 50],
          [200, 20, 70, 50],
          [320, 120, 60, 40],
          [40, 130, 50, 50],
          [180, 250, 50, 45],
          [300, 240, 70, 50],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#ffffff08" stroke="#ffffff10" />
        ))}
        {/* radius pulse */}
        <circle cx="205" cy="150" r="60" fill="#06B6D4" fillOpacity="0.08" stroke="#22D3EE" strokeOpacity="0.4" strokeDasharray="4 6" />
        <circle cx="205" cy="150" r="30" fill="#2563EB" fillOpacity="0.15" />
      </svg>
      {/* pin */}
      <div className="absolute top-[47%] left-[51%] -translate-x-1/2 -translate-y-full">
        <span className="flex size-14 animate-float items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-2xl shadow-brand-600/50 ring-4 ring-white/20">
          <MapPin className="size-6" />
        </span>
      </div>
      {/* label card */}
      <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xl sm:right-auto sm:max-w-[80%]">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Building2 className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{t.office}</p>
          <p className="truncate text-sm font-semibold text-navy-900">{address}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 10. Benefits card (product pages) ---------- */

export function BenefitsFigure({ t, benefits }: { t: F; benefits: string[] }) {
  return (
    <div className="px-1 sm:px-4">
      <FigureWindow title={t.benefitsTitle}>
        <ul className="grid gap-3 p-5 sm:grid-cols-2">
          {benefits.slice(0, 6).map((b, i) => (
            <li key={b} className="flex items-start gap-3 rounded-xl bg-white/[0.05] p-3 ring-1 ring-white/10">
              <span
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-lg",
                  i % 2 ? "bg-accent-500/15 text-accent-300" : "bg-brand-500/20 text-brand-300",
                )}
              >
                <CircleCheck className="size-4" />
              </span>
              <span className="text-sm leading-snug font-medium text-slate-100">{b}</span>
            </li>
          ))}
        </ul>
      </FigureWindow>
    </div>
  );
}
