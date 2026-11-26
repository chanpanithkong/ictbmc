import { ArrowRight, CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { getI18n } from "@/lib/i18n/server";

export async function Hero() {
  const { dict } = await getI18n();
  const h = dict.home;
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1100px] max-w-[200%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgb(37_99_235/0.35),transparent_65%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 py-1 pr-3 pl-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
            <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-xs whitespace-nowrap text-white">ICT</span>
            {h.heroPill}
          </p>
          <h1 className="mt-7 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            {h.heroTitleA} <span className="text-gradient">{h.heroTitleHighlight}</span> {h.heroTitleB}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-400">
            {h.heroDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/solutions" size="lg">
              {h.exploreOurSolutions}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghostDark">
              {dict.common.letsTalk}
            </ButtonLink>
          </div>
          <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3">
            {h.pillars.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                <CircleCheck className="size-4 text-accent-400" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <PageSlideshow page="home" />
        </div>
      </div>
    </section>
  );
}
