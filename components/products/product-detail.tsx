import { AlertTriangle, ArrowRight, CircleCheck, Lightbulb } from "lucide-react";
import type { Product } from "@/types";
import { products } from "@/data/products";
import { PageHero } from "@/components/shared/page-hero";
import { ProductMockup } from "@/components/shared/product-mockup";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/shared/cta-section";
import { ProductCard, demoHref } from "./product-card";
import { revealDelay } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  return (
    <>
      {/* 1. Product hero */}
      <PageHero
        eyebrow={product.name}
        title={product.headline}
        description={product.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        actions={
          <>
            <ButtonLink href={demoHref(product)} size="lg">
              Request Demo
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#features" size="lg" variant="ghostDark">
              View features
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-brand-600/30 to-accent-500/20 blur-3xl"
            />
            <ProductMockup product={product} className="shadow-2xl shadow-black/40" />
          </div>
        }
      />

      {/* 2. Overview */}
      <section className="bg-white py-20 sm:py-24" aria-labelledby="overview-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div data-reveal>
            <SectionHeading eyebrow="Overview" title={<span id="overview-title">Product Overview</span>} />
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>{product.category}</Badge>
              {product.highlights.map((h) => (
                <Badge key={h} variant="outline">
                  {h}
                </Badge>
              ))}
            </div>
          </div>
          <div data-reveal className="space-y-4 text-lg leading-relaxed text-slate-600">
            <p>{product.description}</p>
            <p className="text-base">
              The {product.name} is configured to your organization during implementation, with optional
              customization and integration with your existing tools. ICT BMC provides onboarding, training
              and ongoing technical support.
            </p>
          </div>
        </div>
      </section>

      {/* 3 & 4. Challenges + solution */}
      <section className="bg-surface py-20 sm:py-24" aria-label="Business challenges and solution">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div data-reveal className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-10">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <AlertTriangle className="size-5" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-navy-900">Business Challenges</h2>
            <ul className="mt-6 space-y-4">
              {product.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-slate-600">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-reveal
            style={revealDelay(1)}
            className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 sm:p-10"
          >
            <div className="bg-grid-dark mask-radial absolute inset-0" aria-hidden />
            <div className="relative">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-600/25 text-accent-300 ring-1 ring-white/10">
                <Lightbulb className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-semibold text-white">Our Solution</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">{product.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key features */}
      <section id="features" className="bg-white py-20 sm:py-24" aria-labelledby="features-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow="Key features"
              title={<span id="features-title">Everything You Need in One Platform.</span>}
            />
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((f, i) => (
              <li
                key={f}
                data-reveal
                style={revealDelay(i % 4)}
                className="flex items-center gap-3 rounded-xl bg-surface px-4 py-4 ring-1 ring-slate-200/70"
              >
                <span className="font-mono text-xs text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-navy-900">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Benefits */}
      <section className="bg-surface py-20 sm:py-24" aria-labelledby="benefits-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              eyebrow="Benefits"
              title={<span id="benefits-title">What It Means for Your Business.</span>}
            />
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((b, i) => (
              <li
                key={b}
                data-reveal
                style={revealDelay(i % 3)}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              >
                <CircleCheck className="size-6 shrink-0 text-brand-600" aria-hidden />
                <span className="font-medium text-navy-900">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. UI preview */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-24" aria-labelledby="preview-title">
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden />
        <div className="container-page">
          <div data-reveal>
            <SectionHeading
              tone="dark"
              align="center"
              eyebrow="UI preview"
              title={<span id="preview-title">Designed for Everyday Use.</span>}
              description="A clean, intuitive interface that your team can learn quickly. Preview shown with sample data."
            />
          </div>
          <div data-reveal className="relative mx-auto mt-14 max-w-4xl">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-brand-600/30 to-accent-500/20 blur-3xl"
            />
            <ProductMockup product={product} />
            <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Modules">
              {product.mockup.modules.map((m) => (
                <li key={m}>
                  <Badge variant="dark">{m}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Workflow */}
      <section className="bg-white py-20 sm:py-24" aria-labelledby="workflow-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading eyebrow="Workflow" title={<span id="workflow-title">How It Works.</span>} />
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {product.workflow.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={revealDelay(i)}
                className="relative rounded-2xl bg-surface p-6 ring-1 ring-slate-200/70"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                {i < product.workflow.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-1/2 -right-3.5 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white p-0.5 text-brand-500 ring-1 ring-slate-200 md:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. CTA */}
      <CtaSection
        title={`See the ${product.name} in action.`}
        description="Request a personalized demo and we will walk you through the features that matter most to your business."
        primary={{ label: "Request Demo", href: demoHref(product) }}
        secondary={{ label: "All Products", href: "/products" }}
      />

      {/* Related */}
      <section className="bg-surface py-20 sm:py-24" aria-labelledby="related-title">
        <div className="container-page">
          <SectionHeading eyebrow="Explore more" title={<span id="related-title">Related Products</span>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
