import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", dark ? "text-accent-400" : "text-brand-600")}>
          <span
            aria-hidden
            className={cn("h-px w-6", dark ? "bg-accent-400/60" : "bg-brand-600/50")}
          />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
            dark ? "text-slate-400" : "text-slate-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
