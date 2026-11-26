import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({
  items,
  tone = "light",
  className,
  columns = 1,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "light" ? "bg-brand-50 text-brand-600" : "bg-accent-500/15 text-accent-300",
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={cn("text-sm leading-relaxed", tone === "light" ? "text-slate-700" : "text-slate-300")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
