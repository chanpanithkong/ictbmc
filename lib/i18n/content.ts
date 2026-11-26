/**
 * Localized content getters. English data lives in data/*.ts; Khmer text in
 * data/kh/*.ts is layered on top by slug (or by index for ordered lists).
 * Missing Khmer entries fall back to English.
 */
import type { Locale } from "./config";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { consultingProcess, deliveryProcess } from "@/data/process";
import { industries } from "@/data/industries";
import { consultingServices } from "@/data/consulting";
import * as aboutEn from "@/data/about";
import { company, contact } from "@/data/company";
import {
  aboutKh,
  companyKh,
  consultingProcessKh,
  consultingServicesKh,
  deliveryProcessKh,
  industriesKh,
  servicesKh,
  solutionsKh,
} from "@/data/kh/general";
import { productsKh } from "@/data/kh/products";
import { projectsKh } from "@/data/kh/projects";

const isKh = (locale: Locale) => locale === "kh";

function bySlug<T extends { slug: string }, O>(items: T[], overlay: Record<string, O>, locale: Locale): T[] {
  return isKh(locale) ? items.map((item) => ({ ...item, ...overlay[item.slug] })) : items;
}

function byIndex<T, O>(items: T[], overlay: O[], locale: Locale): T[] {
  return isKh(locale) ? items.map((item, i) => ({ ...item, ...overlay[i] })) : items;
}

export const getServices = (locale: Locale) => bySlug(services, servicesKh, locale);
export const getSolutions = (locale: Locale) => bySlug(solutions, solutionsKh, locale);
export const getProducts = (locale: Locale) => bySlug(products, productsKh, locale);
export const getProduct = (locale: Locale, slug: string) => getProducts(locale).find((p) => p.slug === slug);
export const getProjects = (locale: Locale) => bySlug(projects, projectsKh, locale);
export const getDeliveryProcess = (locale: Locale) => byIndex(deliveryProcess, deliveryProcessKh, locale);
export const getConsultingProcess = (locale: Locale) => byIndex(consultingProcess, consultingProcessKh, locale);
export const getIndustries = (locale: Locale) => byIndex(industries, industriesKh, locale);
export const getConsultingServices = (locale: Locale) => byIndex(consultingServices, consultingServicesKh, locale);

export function getAbout(locale: Locale) {
  if (!isKh(locale)) return aboutEn;
  return {
    mission: aboutKh.mission,
    vision: aboutKh.vision,
    whoWeAre: aboutKh.whoWeAre,
    coreValues: byIndex(aboutEn.coreValues, aboutKh.coreValues, locale),
    whyChooseUs: byIndex(aboutEn.whyChooseUs, aboutKh.whyChooseUs, locale),
    approach: byIndex(aboutEn.approach, aboutKh.approach, locale),
  };
}

/** Company text + contact details in the requested language */
export function getCompany(locale: Locale) {
  const kh = isKh(locale);
  return {
    ...company,
    name: kh ? companyKh.name : company.name,
    tagline: kh ? companyKh.tagline : company.tagline,
    shortDescription: kh ? companyKh.shortDescription : company.shortDescription,
    overview: kh ? companyKh.overview : [...company.overview],
    location: kh ? companyKh.location : company.location,
    nameMeaning: kh ? companyKh.nameMeaning : company.nameMeaning,
    address: kh && contact.address ? companyKh.address : contact.address,
  };
}
