import type { ReactNode } from "react";
import type { Product } from "@/types";
import { getI18n } from "@/lib/i18n/server";
import { getCompany, getProduct } from "@/lib/i18n/content";
import { DashboardMockup } from "@/components/shared/dashboard-mockup";
import { ProductMockup } from "@/components/shared/product-mockup";
import { HeroSlideshow, type Slide } from "@/components/shared/hero-slideshow";
import {
  AnalyticsFigure,
  BenefitsFigure,
  ChatFigure,
  CodeFigure,
  DevicesFigure,
  MapFigure,
  NetworkFigure,
  RoadmapFigure,
  SecurityFigure,
  WorkflowFigure,
} from "./figures";

export type HeroPage =
  | "home"
  | "about"
  | "services"
  | "solutions"
  | "products"
  | "consulting"
  | "projects"
  | "contact"
  | "websites";

type FigureKey =
  | "dashboard"
  | "code"
  | "network"
  | "roadmap"
  | "security"
  | "analytics"
  | "workflow"
  | "devices"
  | "chat"
  | "map";

/** Which illustrations each page's hero rotates through */
const pageSlides: Record<HeroPage, FigureKey[]> = {
  home: ["dashboard", "code", "network"],
  about: ["roadmap", "network", "security"],
  services: ["code", "network", "chat"],
  solutions: ["dashboard", "workflow", "analytics"],
  products: [], // product screens, built below
  consulting: ["roadmap", "security", "analytics"],
  projects: ["devices", "code", "dashboard"],
  contact: ["chat", "map", "devices"],
  websites: ["devices", "code", "analytics"],
};

const showcaseProducts = ["restaurant-management-system", "pos-inventory-management-system", "hotel-management-system"];

/** Hero slideshow for a top-level page */
export async function PageSlideshow({ page }: { page: HeroPage }) {
  const compact = page !== "home";
  const { locale, dict } = await getI18n();
  const f = dict.figures;
  const company = getCompany(locale);

  const figure: Record<FigureKey, ReactNode> = {
    dashboard: <DashboardMockup />,
    code: <CodeFigure t={f} />,
    network: <NetworkFigure t={f} />,
    roadmap: <RoadmapFigure t={f} />,
    security: <SecurityFigure t={f} />,
    analytics: <AnalyticsFigure t={f} />,
    workflow: <WorkflowFigure t={f} />,
    devices: <DevicesFigure />,
    chat: <ChatFigure t={f} />,
    map: <MapFigure t={f} address={company.address || company.location} />,
  };

  let slides: Slide[];
  if (page === "products") {
    slides = showcaseProducts
      .map((slug) => getProduct(locale, slug))
      .filter((p): p is Product => !!p)
      .map((p) => ({
        id: p.slug,
        title: p.name,
        text: p.summary,
        content: (
          <div className="px-1 sm:px-4">
            <ProductMockup product={p} className="shadow-2xl shadow-black/40" />
          </div>
        ),
      }));
  } else {
    slides = pageSlides[page].map((key) => ({
      id: key,
      title: dict.slides[key].title,
      text: dict.slides[key].text,
      content: figure[key],
    }));
  }

  return <HeroSlideshow slides={slides} compact={compact} />;
}

/** Hero slideshow for a product detail page: UI preview, workflow, benefits */
export async function ProductSlideshow({ product }: { product: Product }) {
  const { dict } = await getI18n();
  const f = dict.figures;
  const d = dict.products.detail;
  const slides: Slide[] = [
    {
      id: "preview",
      title: d.previewTitle,
      text: d.previewDescription,
      content: (
        <div className="px-1 sm:px-4">
          <ProductMockup product={product} className="shadow-2xl shadow-black/40" />
        </div>
      ),
    },
    {
      id: "workflow",
      title: d.workflowTitle,
      text: product.workflow.map((w) => w.title).join(" → "),
      content: <WorkflowFigure t={f} steps={product.workflow.map((w) => w.title)} />,
    },
    {
      id: "benefits",
      title: d.benefitsTitle,
      text: dict.slides.benefits.text,
      content: <BenefitsFigure t={f} benefits={product.benefits} />,
    },
  ];
  return <HeroSlideshow slides={slides} compact />;
}

