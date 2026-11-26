import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { company, contact, officeLocation } from "@/data/company";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact ICT BMC to discuss custom software, business management systems, IT consulting or technical support for your business.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact ICT BMC", url: "/contact" },
};

const channels: { label: string; value: string; href?: string; icon: LucideIcon }[] = [
  { label: "Email", value: contact.email, href: contact.email && `mailto:${contact.email}`, icon: Mail },
  { label: "Phone", value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, "")}`, icon: Phone },
  {
    label: "WhatsApp",
    value: contact.whatsapp && `+${contact.whatsapp}`,
    href: contact.whatsapp && `https://wa.me/${contact.whatsapp}`,
    icon: MessageCircle,
  },
  { label: "Office address", value: contact.address || company.location, href: officeLocation.linkUrl, icon: MapPin },
  { label: "Business hours", value: contact.hours, icon: Clock },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s Build the Right Technology Solution{" "}
            <span className="text-gradient">for Your Business.</span>
          </>
        }
        description="Whether you need custom software, a business management system, IT consulting, or technical support, our team is ready to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-surface py-16 sm:py-20" aria-label="Contact information and form">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-xl font-semibold text-navy-900">Get in touch</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Reach out through any of the channels below, or send us a message using the form.
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
                          <p className="text-sm text-slate-400 italic">To be announced</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <figure className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
              <iframe
                src={officeLocation.embedUrl}
                title="ICT BMC office location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block aspect-[4/3] w-full border-0 bg-slate-100"
              />
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                  <MapPin className="size-4 shrink-0 text-brand-600" aria-hidden />
                  {contact.address || company.location}
                </span>
                <a
                  href={officeLocation.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex shrink-0 items-center gap-1 rounded text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Open in Maps
                  <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </figcaption>
            </figure>
          </div>

          <Suspense fallback={<div className="min-h-[640px] animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
