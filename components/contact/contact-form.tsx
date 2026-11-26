"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { contactFormConfig, contactServiceOptions } from "@/data/company";
import { getProduct } from "@/data/products";
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

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  else if (v.fullName.trim().length < 2) e.fullName = "Name must be at least 2 characters.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address (e.g. name@company.com).";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.service) e.service = "Please select a service category.";
  if (!v.message.trim()) e.message = "Please tell us a little about your needs.";
  else if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  else if (v.message.length > 2000) e.message = "Message must be 2,000 characters or fewer.";
  return e;
}

const fieldOrder: (keyof Fields)[] = ["fullName", "company", "email", "phone", "service", "message"];

export function ContactForm() {
  const params = useSearchParams();
  const product = getProduct(params.get("product") ?? "");
  const presetService = params.get("service") ?? "";

  const initial: Fields = {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    service: (contactServiceOptions as readonly string[]).includes(presetService) ? presetService : "",
    message: product ? `I'd like to request a demo of the ${product.name}.` : "",
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
    if (touched[name]) setErrors(validate(next));
  };

  const blur = (name: keyof Fields) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
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
          Thank you, {values.fullName.trim().split(" ")[0]}!
        </h2>
        {isDemo ? (
          <>
            <p className="mt-3 leading-relaxed text-slate-600">Your form passed validation successfully.</p>
            <p className="mx-auto mt-6 flex max-w-md gap-3 rounded-xl bg-amber-50 p-4 text-left text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
              <Info className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
              <span>
                <strong className="font-semibold">Demo mode:</strong> this website is a frontend-only demo, so your
                message was <strong className="font-semibold">not sent</strong> to a server. Please contact ICT BMC
                directly using the details on this page.
              </span>
            </p>
          </>
        ) : (
          <p className="mt-3 leading-relaxed text-slate-600">
            Your message has been received. Our team will get back to you as soon as possible.
          </p>
        )}
        <Button variant="secondary" className="mt-8" onClick={reset}>
          Send another message
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
      onSubmit={onSubmit}
      aria-busy={loading}
      className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-10"
    >
      <h2 className="text-2xl font-semibold text-navy-900">Send us a message</h2>
      <p className="mt-2 text-sm text-slate-600">
        Fields marked <span className="text-rose-600">*</span> are required.
      </p>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-xl bg-rose-50 p-4 text-sm text-rose-900 ring-1 ring-rose-200 outline-none"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden />
          Something went wrong while sending your message. Please try again, or contact us directly.
        </div>
      )}

      <fieldset disabled={loading} className="mt-8 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-navy-900">
            Full Name <span className="text-rose-600">*</span>
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
            Company Name
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
            Email <span className="text-rose-600">*</span>
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
            Phone Number
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
            Service Category <span className="text-rose-600">*</span>
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
              Select a service…
            </option>
            {contactServiceOptions.map((o) => (
              <option key={o} value={o} className="text-navy-900">
                {o}
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
              Message <span className="text-rose-600">*</span>
            </label>
            <span className={cn("text-xs", values.message.length > 2000 ? "text-rose-600" : "text-slate-400")}>
              {values.message.length}/2000
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
            placeholder="Tell us about your business, your challenges and what you would like to achieve."
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
            Demo form: submissions are validated in your browser only and are not sent to a server.
          </p>
        ) : (
          <span />
        )}
        <Button type="submit" size="lg" disabled={loading} className="shrink-0">
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send aria-hidden />
            </>
          )}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {loading ? "Sending your message…" : ""}
      </p>
    </form>
  );
}
