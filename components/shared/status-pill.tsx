import { cn } from "@/lib/utils";

const positive = /^(paid|approved|served|ready|complete|ok|available|confirmed|checked in|redeemed)$/i;
const negative = /overdue|reorder|expired/i;

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const tone = positive.test(status) ? "pos" : negative.test(status) ? "neg" : "mid";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap",
        tone === "pos" && "bg-emerald-500/10 text-emerald-600",
        tone === "neg" && "bg-rose-500/10 text-rose-600",
        tone === "mid" && "bg-amber-500/10 text-amber-700",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "pos" && "bg-emerald-500",
          tone === "neg" && "bg-rose-500",
          tone === "mid" && "bg-amber-500",
        )}
      />
      {status}
    </span>
  );
}
