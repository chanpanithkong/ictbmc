import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
        neutral: "bg-slate-100 text-slate-700",
        outline: "text-slate-600 ring-1 ring-slate-200",
        dark: "bg-white/10 text-slate-200 ring-1 ring-white/15",
        warning: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
