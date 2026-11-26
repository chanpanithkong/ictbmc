import type { Project } from "@/types";

/** Abstract illustration used as the project "image" placeholder. */
export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden bg-navy-900">
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-brand-600/30 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 size-36 rounded-full bg-accent-500/20 blur-2xl" />
      <div className="relative flex h-full items-center justify-center p-6">
        {visual === "dashboard" && (
          <div className="w-full max-w-[240px] space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-9 rounded-md bg-white/[0.06] ring-1 ring-white/10" />
              ))}
            </div>
            <div className="flex h-16 items-end gap-1 rounded-md bg-white/[0.04] p-2 ring-1 ring-white/10">
              {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent-400" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        )}
        {visual === "table" && (
          <div className="w-full max-w-[240px] overflow-hidden rounded-md ring-1 ring-white/10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-2 last:border-0">
                <span className="size-2 rounded-full bg-accent-400/70" />
                <span className="h-1.5 flex-1 rounded bg-white/15" />
                <span className="h-1.5 w-8 rounded bg-brand-400/50" />
              </div>
            ))}
          </div>
        )}
        {visual === "network" && (
          <svg viewBox="0 0 240 120" className="w-full max-w-[260px]" fill="none">
            <g stroke="#22D3EE" strokeOpacity="0.5">
              <path d="M120 20 L50 60 M120 20 L190 60 M50 60 L30 100 M50 60 L80 100 M190 60 L160 100 M190 60 L210 100 M120 20 L120 100" />
            </g>
            {[
              [120, 20, 9],
              [50, 60, 7],
              [190, 60, 7],
              [30, 100, 5],
              [80, 100, 5],
              [120, 100, 5],
              [160, 100, 5],
              [210, 100, 5],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#0B1120" stroke="#3B82F6" strokeWidth="2" />
            ))}
          </svg>
        )}
        {visual === "flow" && (
          <div className="flex w-full max-w-[260px] items-center justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <span className="flex size-10 items-center justify-center rounded-lg bg-white/[0.06] font-mono text-[10px] text-accent-300 ring-1 ring-white/15">
                  0{i + 1}
                </span>
                {i < 3 && <span className="mx-1 h-px w-6 bg-gradient-to-r from-brand-500 to-accent-400" />}
              </div>
            ))}
          </div>
        )}
        {visual === "web" && (
          <div className="w-full max-w-[240px] overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/10">
            <div className="flex gap-1 border-b border-white/5 px-2 py-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-white/20" />
              ))}
            </div>
            <div className="space-y-2 p-3">
              <span className="block h-2 w-2/3 rounded bg-white/20" />
              <span className="block h-1.5 w-full rounded bg-white/10" />
              <span className="block h-1.5 w-5/6 rounded bg-white/10" />
              <span className="mt-2 block h-4 w-16 rounded bg-brand-600/70" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
