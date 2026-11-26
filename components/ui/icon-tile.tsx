import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconTile({
  icon: Icon,
  tone = "light",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-xl",
        size === "sm" && "size-9 [&_svg]:size-4",
        size === "md" && "size-11 [&_svg]:size-5",
        size === "lg" && "size-14 [&_svg]:size-6",
        tone === "light"
          ? "bg-gradient-to-br from-brand-50 to-cyan-50 text-brand-600 ring-1 ring-brand-100"
          : "bg-gradient-to-br from-brand-500/20 to-accent-500/10 text-accent-300 ring-1 ring-white/10",
        className,
      )}
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
