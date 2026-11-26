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
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 right-0 -z-10 h-[480px] w-[680px] max-w-full rounded-full bg-gradient-to-bl from-brand-600/30 via-accent-500/10 to-transparent blur-3xl"
      />
      <div className="container-page">
        {breadcrumbs && (
          <nav aria-label={dict.nav.breadcrumb} className="mb-8">
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
        <div className={aside ? "grid items-center gap-14 lg:grid-cols-2" : undefined}>
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 text-accent-400">
              <span aria-hidden className="h-px w-6 bg-accent-400/60" />
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-slate-400">{description}</p>
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
