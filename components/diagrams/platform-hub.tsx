import { BarChart3, Boxes, ShoppingCart, Users, UserRound, Wallet, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/shared/logo";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Nodes = Dictionary["home"]["platform"]["nodes"];

/**
 * Hub-and-spoke diagram: six business modules connected to one central
 * platform, with animated data-flow lines. HTML nodes over an SVG canvas so
 * labels stay crisp and wrap naturally in both languages.
 */
export function PlatformHub({ nodes, hub, hubSub, label }: { nodes: Nodes; hub: string; hubSub: string; label: string }) {
  const items: { label: string; icon: LucideIcon }[] = [
    { label: nodes.sales, icon: ShoppingCart },
    { label: nodes.inventory, icon: Boxes },
    { label: nodes.finance, icon: Wallet },
    { label: nodes.reports, icon: BarChart3 },
    { label: nodes.hr, icon: Users },
    { label: nodes.customers, icon: UserRound },
  ];
  const R = 39; // node ring radius, % of container
  const points = items.map((_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });

  return (
    <figure role="img" aria-label={label} className="relative mx-auto aspect-square w-full max-w-[540px]">
      {/* glow */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gradient-to-tr from-brand-500/25 via-accent-400/15 to-transparent blur-3xl" />

      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        {/* orbit rings */}
        <circle cx="50" cy="50" r={R} fill="none" stroke="#cbd5e1" strokeWidth="0.25" strokeDasharray="0.8 1.2" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="#bfdbfe" strokeWidth="0.25" />
        <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
          <circle cx="50" cy="50" r="47" fill="none" stroke="#e2e8f0" strokeWidth="0.2" strokeDasharray="0.4 3" />
        </g>
        {/* spokes with animated data flow */}
        {points.map((p, i) => (
          <g key={i}>
            <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="#dbeafe" strokeWidth="0.9" strokeLinecap="round" />
            <line
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="url(#hub-line)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="2 4"
              className="animate-flow"
              style={{ animationDelay: `${i * -0.25}s` }}
            />
          </g>
        ))}
        {/* ring connections between neighbours */}
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="0.3"
        />
      </svg>

      {/* central hub */}
      <div className="absolute top-1/2 left-1/2 flex aspect-square w-[37%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy-900 p-5 text-center shadow-2xl ring-8 shadow-brand-900/30 ring-white">
        <div aria-hidden className="bg-grid-dark absolute inset-0 rounded-full opacity-60" />
        <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-600/40 to-accent-500/20" />
        <LogoMark className="relative size-10 sm:size-12" />
        <p className="relative mt-2 text-xs leading-snug font-semibold text-white sm:text-sm">{hub}</p>
        <p className="relative mt-1 hidden max-w-[85%] text-xs leading-snug text-accent-300 xl:block">{hubSub}</p>
      </div>

      {/* module nodes */}
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="absolute flex w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl bg-white px-2 py-2.5 text-center shadow-lg ring-1 shadow-brand-900/10 ring-slate-200 sm:py-3"
            style={{ left: `${points[i].x}%`, top: `${points[i].y}%` }}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-cyan-50 text-brand-600 ring-1 ring-brand-100 sm:size-9">
              <Icon className="size-4 sm:size-[18px]" aria-hidden strokeWidth={1.75} />
            </span>
            <span className="text-xs leading-tight font-semibold text-navy-900 sm:text-sm">{item.label}</span>
          </div>
        );
      })}
    </figure>
  );
}
