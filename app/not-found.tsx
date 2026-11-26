import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-900 pt-24">
      <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden />
      <div className="container-page text-center">
        <p className="font-mono text-sm text-accent-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-400">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="ghostDark">
            Browse products
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
