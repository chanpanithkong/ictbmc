import { ArrowRight, CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DashboardMockup } from "@/components/shared/dashboard-mockup";

const pillars = ["Custom Software", "Business Systems", "IT Consulting", "Infrastructure & Support"];

export function Hero() {
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
            <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-[11px] whitespace-nowrap text-white">ICT BMC</span>
            Your Trusted Technology Partner for Business Growth
          </p>
          <h1 className="mt-7 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Technology That <span className="text-gradient">Empowers</span> Your Business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-400">
            We design, develop, and deliver technology solutions that help businesses streamline operations,
            improve efficiency, and grow with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/solutions" size="lg">
              Explore Our Solutions
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghostDark">
              Let&apos;s Talk
            </ButtonLink>
          </div>
          <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3">
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                <CircleCheck className="size-4 text-accent-400" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
