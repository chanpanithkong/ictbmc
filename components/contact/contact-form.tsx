"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { contactFormConfig, contactServiceOptions } from "@/data/company";
import { getProduct } from "@/lib/i18n/content";
import { format, localizeNumber } from "@/lib/i18n/format";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Fields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{6,20}$/;

type ErrorMessages = Dictionary["contact"]["form"]["errors"];

function validate(v: Fields, m: ErrorMessages): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = m.nameRequired;
  else if (v.fullName.trim().length < 2) e.fullName = m.nameShort;
  if (!v.email.trim()) e.email = m.emailRequired;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = m.emailInvalid;
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = m.phoneInvalid;
  if (!v.service) e.service = m.serviceRequired;
  if (!v.message.trim()) e.message = m.messageRequired;
  else if (v.message.trim().length < 10) e.message = m.messageShort;
  else if (v.message.length > 2000) e.message = m.messageLong;
  return e;
}

const fieldOrder: (keyof Fields)[] = ["fullName", "company", "email", "phone", "service", "message"];

export function ContactForm() {
  const { locale, dict } = useI18n();
  const f = dict.contact.form;
  const params = useSearchParams();
  const product = getProduct(locale, params.get("product") ?? "");
  const presetService = params.get("service") ?? "";

  const initial: Fields = {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    service: (contactServiceOptions as readonly string[]).includes(presetService) ? presetService : "",
    message: product ? format(dict.products.detail.demoMessage, { name: product.name }) : "",
  };

  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const update = (name: keyof Fields, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next, f.errors));
  };

  const blur = (name: keyof Fields) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values, f.errors));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values, f.errors);
    setErrors(errs);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    const firstInvalid = fieldOrder.find((k) => errs[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      if (contactFormConfig.mode === "endpoint" && contactFormConfig.endpoint) {
        const res = await fetch(contactFormConfig.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, product: product?.name }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // Frontend demo: simulate a network request. Nothing is sent anywhere.
        await new Promise((r) => setTimeout(r, 1200));
      }
      setStatus("success");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  function reset() {
    setValues({ ...initial, message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const isDemo = contactFormConfig.mode === "demo" || !contactFormConfig.endpoint;

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="self-start rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200 outline-none sm:p-12"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-semibold text-navy-900">
          {format(f.thanks, { name: values.fullName.trim().split(" ")[0] })}
        </h2>
        {isDemo ? (
          <>
            <p className="mt-3 leading-relaxed text-slate-600">{f.validated}</p>
            <p className="mx-auto mt-6 flex max-w-md gap-3 rounded-xl bg-amber-50 p-4 text-left text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
              <Info className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
              <span>
                <strong className="font-semibold">{f.demoModeStrong}</strong> {f.demoModeA}{" "}
                <strong className="font-semibold">{f.demoModeNotSent}</strong> {f.demoModeB}
              </span>
            </p>
          </>
        ) : (
          <p className="mt-3 leading-relaxed text-slate-600">
            {f.received}
          </p>
        )}
        <Button variant="secondary" className="mt-8" onClick={reset}>
          {f.sendAnother}
        </Button>
      </div>
    );
  }

  const inputCls = (name: keyof Fields) =>
    cn(
      "mt-2 block w-full rounded-xl bg-white px-4 text-sm text-navy-900 ring-1 outline-none transition-shadow placeholder:text-slate-400 focus:ring-2 disabled:opacity-60",
      touched[name] && errors[name]
        ? "ring-rose-300 focus:ring-rose-500"
        : "ring-slate-200 hover:ring-slate-300 focus:ring-brand-500",
    );

  const errorText = (name: keyof Fields) =>
    touched[name] && errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
        <CircleAlert className="size-3.5 shrink-0" aria-hidden />
        {errors[name]}
      </p>
    ) : null;

  const aria = (name: keyof Fields) => ({
    "aria-invalid": touched[name] && errors[name] ? true : undefined,
    "aria-describedby": touched[name] && errors[name] ? `${name}-error` : undefined,
  });

  const loading = status === "loading";

  return (
    <form
      ref={formRef}
      noValidate
      method="post"
      onSubmit={onSubmit}
      aria-busy={loading}
      className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-10"
    >
      <h2 className="text-2xl font-semibold text-navy-900">{f.title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        {f.requiredA} <span className="text-rose-600">*</span> {f.requiredB}
      </p>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-xl bg-rose-50 p-4 text-sm text-rose-900 ring-1 ring-rose-200 outline-none"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden />
          {f.sendError}
        </div>
      )}

      <fieldset disabled={loading} className="mt-8 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">{f.detailsLegend}</legend>
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-navy-900">
            {f.fullName} <span className="text-rose-600">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => blur("fullName")}
            className={cn(inputCls("fullName"), "h-11")}
            {...aria("fullName")}
          />
          {errorText("fullName")}
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-navy-900">
            {f.company}
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            className={cn(inputCls("company"), "h-11")}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy-900">
            {f.email} <span className="text-rose-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            className={cn(inputCls("email"), "h-11")}
            {...aria("email")}
          />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy-900">
            {f.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={cn(inputCls("phone"), "h-11")}
            {...aria("phone")}
          />
          {errorText("phone")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="text-sm font-medium text-navy-900">
            {f.service} <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            onBlur={() => blur("service")}
            className={cn(inputCls("service"), "h-11 appearance-none pr-10", !values.service && "text-slate-400")}
            {...aria("service")}
          >
            <option value="" disabled>
              {f.selectService}
            </option>
            {contactServiceOptions.map((o) => (
              <option key={o} value={o} className="text-navy-900">
                {dict.contact.serviceOptions[o]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 bottom-3.5 size-4 text-slate-500" aria-hidden />
          </div>
          {errorText("service")}
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between">
            <label htmlFor="message" className="text-sm font-medium text-navy-900">
              {f.message} <span className="text-rose-600">*</span>
            </label>
            <span className={cn("text-xs", values.message.length > 2000 ? "text-rose-600" : "text-slate-400")}>
              {localizeNumber(values.message.length, locale)}/{localizeNumber(2000, locale)}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            placeholder={f.messagePlaceholder}
            className={cn(inputCls("message"), "resize-y py-3")}
            {...aria("message")}
          />
          {errorText("message")}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {isDemo ? (
          <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {f.demoNote}
          </p>
        ) : (
          <span />
        )}
        <Button type="submit" size="lg" disabled={loading} className="shrink-0">
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden />
              {f.sending}
            </>
          ) : (
            <>
              {f.submit}
              <Send aria-hidden />
            </>
          )}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {loading ? f.sendingSr : ""}
      </p>
    </form>
  );
}
