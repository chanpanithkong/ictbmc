import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { StatusPill } from "./status-pill";

/**
 * Illustrative product UI preview generated from product data.
 * `compact` is used inside cards; the full version on detail pages.
 */
export function ProductMockup({
  product,
  compact = false,
  className,
}: {
  product: Product;
  compact?: boolean;
  className?: string;
}) {
  const { mockup } = product;
  const Icon = product.icon;
  const bars = [42, 58, 50, 72, 64, 86, 76];

  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-xl bg-white text-left shadow-lg ring-1 shadow-slate-900/5 ring-slate-200",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="size-2 rounded-full bg-slate-300" />
        <span className="size-2 rounded-full bg-slate-300" />
        <span className="size-2 rounded-full bg-slate-300" />
        <span className="ml-2 truncate font-mono text-[9px] text-slate-400">{product.name}</span>
      </div>
      <div className="flex">
        <div
          className={cn(
            "shrink-0 border-r border-slate-100 bg-navy-900 py-3",
            compact ? "w-20 px-2" : "w-28 px-2.5 sm:w-36",
          )}
        >
          <div className="mb-3 flex items-center gap-1.5 px-1 text-accent-300">
            <Icon className="size-3.5" />
            <span className="truncate text-[9px] font-semibold text-white">{product.shortName}</span>
          </div>
          <ul className="space-y-0.5">
            {mockup.modules.slice(0, compact ? 5 : 7).map((m, i) => (
              <li
                key={m}
                className={cn(
                  "truncate rounded-md px-1.5 py-1 text-[9px]",
                  i === 0 ? "bg-brand-600/30 text-white" : "text-slate-400",
                )}
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("min-w-0 flex-1 space-y-2.5", compact ? "p-2.5" : "p-3 sm:p-4")}>
          <div className="grid grid-cols-3 gap-2">
            {mockup.metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-slate-50 p-2 ring-1 ring-slate-100">
                <p className="truncate text-[8px] text-slate-500 sm:text-[9px]">{m.label}</p>
                <p className={cn("font-semibold text-navy-900", compact ? "text-[11px]" : "text-xs sm:text-sm")}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
          {!compact && (
            <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-100">
              <div className="flex h-16 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent-400"
                    style={{ height: `${h}%`, opacity: 0.5 + i * 0.07 }}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="rounded-lg ring-1 ring-slate-100">
            <p className="border-b border-slate-100 px-2 py-1.5 text-[9px] font-semibold text-slate-700">
              {mockup.tableTitle}
            </p>
            <ul>
              {mockup.rows.slice(0, compact ? 3 : 4).map(([a, b, status]) => (
                <li
                  key={a}
                  className="flex items-center justify-between gap-2 border-b border-slate-50 px-2 py-1.5 text-[9px] last:border-0"
                >
                  <span className="truncate font-medium text-slate-700">{a}</span>
                  <span className="hidden truncate text-slate-500 sm:inline">{b}</span>
                  <StatusPill status={status} className="text-[8px]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
