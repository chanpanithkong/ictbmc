import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { contact, officeLocation } from "@/data/company";
import { getI18n } from "@/lib/i18n/server";
import { getCompany } from "@/lib/i18n/content";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/contact", { title: dict.meta.contactTitle, description: dict.meta.contactDescription });
}

export default async function ContactPage() {
  const { locale, dict } = await getI18n();
  const t = dict.contact;
  const company = getCompany(locale);
  const channels: { label: string; value: string; href?: string; icon: LucideIcon }[] = [
    { label: t.email, value: contact.email, href: contact.email && `mailto:${contact.email}`, icon: Mail },
    { label: t.phone, value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, "")}`, icon: Phone },
    {
      label: t.whatsapp,
      value: contact.whatsapp && `+${contact.whatsapp}`,
      href: contact.whatsapp && `https://wa.me/${contact.whatsapp}`,
      icon: MessageCircle,
    },
    { label: t.officeAddress, value: company.address || company.location, href: officeLocation.linkUrl, icon: MapPin },
    { label: t.hours, value: contact.hours, icon: Clock },
  ];
  return (
    <>
      <PageHero
        aside={<PageSlideshow page="contact" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[{ label: dict.nav.home, href: "/" }, { label: dict.nav.contact }]}
      />

      <section className="bg-surface pt-14 pb-10 sm:pt-16 sm:pb-12" aria-label={t.sectionAria}>
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-xl font-semibold text-navy-900">{t.getInTouch}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t.getInTouchText}
              </p>
              <ul className="mt-6 divide-y divide-slate-100">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                        <Icon className="size-[18px]" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{c.label}</p>
                        {c.value ? (
                          c.href ? (
                            <a
                              href={c.href}
                              className="focus-ring rounded text-sm font-medium break-words text-navy-900 hover:text-brand-700"
                              {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-navy-900">{c.value}</p>
                          )
                        ) : (
                          <p className="text-sm text-slate-400 italic">{t.tba}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Suspense fallback={<div className="min-h-[640px] animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* Wide map */}
      <section aria-label={t.mapTitle} className="bg-surface">
        <div className="relative">
          <div className="relative h-[340px] overflow-hidden border-t border-slate-200 sm:h-[440px] lg:h-[520px]">
            <iframe
              src={officeLocation.embedUrl}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 bg-slate-100"
            />
          </div>
        </div>
      </section>
    </>
  );
}
