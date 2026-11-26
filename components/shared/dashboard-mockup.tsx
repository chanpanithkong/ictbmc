import {
  BarChart3,
  Boxes,
  CircleCheck,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

/**
 * Decorative hero visual: an illustrative business dashboard with connected
 * systems. All values are sample UI data, not company statistics.
 */
export function DashboardMockup() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 81, 70, 88, 79, 92];
  return (
    <div className="relative mx-auto w-full max-w-[640px]" aria-hidden>
      {/* glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-brand-600/30 via-accent-500/15 to-transparent blur-3xl" />

      {/* connected systems network */}
      <svg
        viewBox="0 0 640 520"
        className="absolute inset-0 -z-10 h-full w-full text-accent-400/40"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1" strokeDasharray="3 5">
          <path d="M20 80 C 120 40, 200 160, 320 120" />
          <path d="M620 60 C 540 140, 600 260, 520 330" />
          <path d="M30 460 C 140 400, 220 500, 340 440" />
          <path d="M600 470 C 520 420, 470 500, 380 470" />
        </g>
        {[
          [20, 80],
          [620, 60],
          [30, 460],
          [600, 470],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" className="animate-pulse-dot" />
        ))}
      </svg>

      {/* main app window */}
      <div className="overflow-hidden rounded-2xl bg-navy-800/80 shadow-2xl ring-1 shadow-black/40 ring-white/10 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-slate-400">
            Business Dashboard
          </span>
        </div>
        <div className="flex">
          <div className="hidden w-14 flex-col items-center gap-4 border-r border-white/5 py-5 text-slate-500 sm:flex">
            <span className="rounded-lg bg-brand-600/20 p-2 text-accent-300">
              <LayoutDashboard className="size-4" />
            </span>
            <BarChart3 className="size-4" />
            <Boxes className="size-4" />
            <Users className="size-4" />
            <Wallet className="size-4" />
            <Settings className="size-4" />
          </div>
          <div className="flex-1 space-y-4 p-4 sm:p-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Revenue", "$84.2k", "+12.4%"],
                ["Orders", "1,284", "+8.1%"],
                ["Efficiency", "94%", "+3.2%"],
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/5">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">{value}</p>
                  <p className="mt-0.5 text-[10px] text-emerald-400">{delta}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-300">Performance overview</p>
                <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">12 months</span>
              </div>
              <svg viewBox="0 0 300 90" className="h-24 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#06B6D4" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 70 C 25 62, 40 66, 60 55 S 100 40, 125 46 S 165 30, 190 32 S 235 18, 260 20 S 290 10, 300 8 L300 90 L0 90Z"
                  fill="url(#area)"
                />
                <path
                  d="M0 70 C 25 62, 40 66, 60 55 S 100 40, 125 46 S 165 30, 190 32 S 235 18, 260 20 S 290 10, 300 8"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/5">
                <p className="mb-3 text-xs font-medium text-slate-300">Sales by month</p>
                <div className="flex h-16 items-end gap-1">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400"
                      style={{ height: `${h}%`, opacity: 0.45 + i * 0.045 }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-2 space-y-2 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/5">
                <p className="text-xs font-medium text-slate-300">Systems</p>
                {["Sales", "Inventory", "Finance"].map((s) => (
                  <div key={s} className="flex items-center justify-between text-[10px] text-slate-400">
                    {s}
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="absolute -bottom-6 -left-4 hidden animate-float items-center gap-3 rounded-xl bg-white p-3 pr-4 shadow-xl ring-1 shadow-black/20 ring-slate-200 sm:flex">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <CircleCheck className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-navy-900">Inventory synced</p>
          <p className="text-[10px] text-slate-500">All branches up to date</p>
        </div>
      </div>
      <div
        className="absolute -top-5 right-2 hidden animate-float items-center gap-3 rounded-xl bg-navy-900/90 p-3 pr-4 shadow-xl ring-1 ring-white/10 backdrop-blur sm:flex"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-600/25 text-accent-300">
          <Workflow className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Workflow automated</p>
          <p className="text-[10px] text-slate-400">Approval routed in seconds</p>
        </div>
      </div>
    </div>
  );
}
