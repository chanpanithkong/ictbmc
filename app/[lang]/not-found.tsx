import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { dict } = await getI18n();
  const t = dict.notFound;
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-900 pt-24">
      <title>{dict.meta.notFoundTitle}</title>
      <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden />
      <div className="container-page text-center">
        <p className="font-mono text-sm text-accent-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-400">{t.description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            {t.backHome}
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="ghostDark">
            {t.browseProducts}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
