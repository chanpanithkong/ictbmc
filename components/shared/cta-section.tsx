import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getI18n } from "@/lib/i18n/server";

export async function CtaSection({
  title,
  description,
  primary,
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  const { dict } = await getI18n();
  title ??= dict.cta.title;
  description ??= dict.cta.description;
  primary ??= { label: dict.common.letsTalk, href: "/contact" };
  if (secondary === undefined) secondary = { label: dict.common.exploreSolutions, href: "/solutions" };
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-16"
        >
          <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden />
          <div
            aria-hidden
            className="absolute -right-24 -bottom-24 -z-10 size-96 rounded-full bg-gradient-to-tr from-brand-600/50 to-accent-500/30 blur-3xl"
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">{description}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
                <ArrowRight />
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="ghostDark" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
