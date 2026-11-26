import {
  Briefcase,
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Store,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    title: "Restaurants",
    description: "Ordering, kitchen, table and inventory systems for food & beverage businesses.",
    icon: UtensilsCrossed,
  },
  {
    title: "Retail",
    description: "Point-of-sale, stock control and customer management for shops and outlets.",
    icon: Store,
  },
  {
    title: "Hotels",
    description: "Reservations, front desk, housekeeping and billing for hospitality operators.",
    icon: Hotel,
  },
  {
    title: "Education",
    description: "Student information, academic records and administration for schools.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description: "Patient records, appointments and billing workflows for clinics and hospitals.",
    icon: HeartPulse,
  },
  {
    title: "Financial Services",
    description: "Loan, pawn and accounting systems with clear audit trails and reporting.",
    icon: Landmark,
  },
  {
    title: "Small and Medium Enterprises",
    description: "Affordable, scalable systems that grow alongside your business.",
    icon: Users,
  },
  {
    title: "Professional Services",
    description: "Client, project, document and appointment management for service firms.",
    icon: Briefcase,
  },
  {
    title: "Institutions",
    description: "Information management and digital workflows for public and private institutions.",
    icon: Building2,
  },
];
