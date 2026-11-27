import type { ReactNode } from "react";
import Link from "@/components/i18n/link";
import { ChevronRight } from "lucide-react";
import { getI18n } from "@/lib/i18n/server";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
}

export async function PageHero({ eyebrow, title, description, breadcrumbs, actions, aside }: PageHeroProps) {
  const { dict } = await getI18n();
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-24 pb-12 sm:pt-28 sm:pb-14">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 right-0 -z-10 h-[480px] w-[680px] max-w-full rounded-full bg-gradient-to-bl from-brand-600/30 via-accent-500/10 to-transparent blur-3xl"
      />
      <div className="container-page">
        {breadcrumbs && (
          <nav aria-label={dict.nav.breadcrumb} className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
              {breadcrumbs.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 text-slate-600" aria-hidden />}
                  {b.href ? (
                    <Link href={b.href} className="focus-ring rounded hover:text-white">
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-slate-200">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={aside ? "grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14" : undefined}>
          <div className="max-w-3xl">
            <p className="eyebrow mb-4 text-accent-400">
              <span aria-hidden className="h-px w-6 bg-accent-400/60" />
              {eyebrow}
            </p>
            <h1 className="text-[2rem] leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-[2.875rem] lg:leading-[1.12]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-slate-400">{description}</p>
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="w-full lg:mx-auto lg:max-w-[520px]">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
