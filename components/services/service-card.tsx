import Link from "@/components/i18n/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { IconTile } from "@/components/ui/icon-tile";
import { getI18n } from "@/lib/i18n/server";
import { format, localizeNumber } from "@/lib/i18n/format";

export async function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const { locale, dict } = await getI18n();
  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 hover:ring-brand-200">
      <div className="flex items-start justify-between">
        <IconTile icon={service.icon} />
        {index !== undefined && (
          <span className="font-mono text-xs text-slate-300" aria-hidden>
            {localizeNumber(String(index + 1).padStart(2, "0"), locale)}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-navy-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
      <Link
        href={service.link ?? `/services#${service.slug}`}
        className="focus-ring mt-5 inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        {dict.common.learnMore}
        <span className="sr-only"> {format(dict.common.aboutService, { title: service.title })}</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  );
}
