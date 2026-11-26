import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Longer copy used on the Services page */
  details: string;
  capabilities: string[];
}

export interface Solution {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  points: string[];
}

export type ProductCategory =
  | "Hospitality"
  | "Retail & Sales"
  | "Finance"
  | "Education"
  | "Healthcare"
  | "People & HR"
  | "Operations";

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  icon: LucideIcon;
  headline: string;
  summary: string;
  description: string;
  highlights: string[];
  features: string[];
  benefits: string[];
  challenges: string[];
  solution: string;
  workflow: WorkflowStep[];
  /** Labels used by the illustrative UI mockup */
  mockup: {
    modules: string[];
    metrics: { label: string; value: string }[];
    tableTitle: string;
    rows: [string, string, string][];
  };
}

export type ProjectCategory =
  | "Software Development"
  | "Business Systems"
  | "Web Applications"
  | "IT Infrastructure"
  | "Digital Transformation";

export type ProjectStatus = "Concept" | "Prototype" | "In Design";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  details: string;
  stack: string[];
  status: ProjectStatus;
  /** Demo entries are illustrative and do not represent real client work */
  isDemo: boolean;
  visual: "dashboard" | "table" | "network" | "flow" | "web";
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Industry {
  title: string;
  description: string;
  icon: LucideIcon;
}
