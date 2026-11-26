import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/types";
import { IconTile } from "@/components/ui/icon-tile";
import { getI18n } from "@/lib/i18n/server";

export async function SolutionCard({ solution }: { solution: Solution }) {
  const { dict } = await getI18n();
  return (
    <Link
      href={solution.href}
      className="group focus-ring relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:ring-accent-400/40"
    >
      <span
        aria-hidden
        className="absolute -top-16 -right-16 size-40 rounded-full bg-brand-600/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-600/25"
      />
      <div className="flex items-start justify-between">
        <IconTile icon={solution.icon} tone="dark" />
        <ArrowUpRight
          aria-hidden
          className="size-5 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-300"
        />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{solution.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{solution.description}</p>
      <span className="mt-5 text-sm font-medium text-accent-300">{dict.common.learnMoreShort}</span>
    </Link>
  );
}
