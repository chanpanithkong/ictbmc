import {
  Award,
  Gem,
  Handshake,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

export const mission =
  "To empower businesses and organizations through reliable, innovative, and practical technology solutions that improve efficiency, productivity, and digital capabilities.";

export const vision =
  "To become a trusted technology partner for businesses and organizations by delivering quality technology services, innovative solutions, and sustainable digital transformation.";

export const whoWeAre =
  "ICT BMC is a technology solutions provider committed to helping businesses and organizations improve their operations through modern software, technology consulting, digital solutions, and IT support.";

export const coreValues: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Innovation",
    description: "We look for better, simpler ways to solve problems with technology.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "We are honest, transparent and accountable in every engagement.",
    icon: ShieldCheck,
  },
  {
    title: "Client Focus",
    description: "Every recommendation starts from our clients' real needs and goals.",
    icon: Target,
  },
  {
    title: "Quality",
    description: "We build carefully, test thoroughly and deliver work we stand behind.",
    icon: Gem,
  },
  {
    title: "Reliability",
    description: "We do what we say and support what we deliver.",
    icon: Award,
  },
  {
    title: "Continuous Improvement",
    description: "We keep learning, refining and improving our solutions and ourselves.",
    icon: RefreshCw,
  },
];

export const whyChooseUs: { title: string; description: string }[] = [
  {
    title: "Client-focused solutions",
    description: "Solutions shaped by your objectives, processes and budget.",
  },
  {
    title: "Customized software development",
    description: "Software tailored to how your organization actually works.",
  },
  {
    title: "Practical and scalable technology",
    description: "Right-sized today, ready to grow with you tomorrow.",
  },
  {
    title: "Professional technical support",
    description: "Responsive assistance before, during and after go-live.",
  },
  {
    title: "Modern technology",
    description: "Proven, modern tools and frameworks — no unnecessary complexity.",
  },
  {
    title: "Commitment to quality",
    description: "Structured testing and review at every stage of delivery.",
  },
  {
    title: "Long-term partnership",
    description: "We aim to be the technology partner you rely on for years.",
  },
];

export const approach: { phase: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    phase: "01",
    title: "Listen first",
    description:
      "We start by understanding your organization, your people and the problems worth solving — before proposing any technology.",
    icon: Handshake,
  },
  {
    phase: "02",
    title: "Design for fit",
    description:
      "We recommend and design solutions that match your workflows, team capacity and budget, avoiding unnecessary complexity.",
    icon: Target,
  },
  {
    phase: "03",
    title: "Deliver with care",
    description:
      "We build, test and deploy in clear stages, keeping you informed and involved throughout.",
    icon: Gem,
  },
  {
    phase: "04",
    title: "Support for the long term",
    description:
      "After go-live we stay on hand to maintain, improve and extend your systems as your business evolves.",
    icon: RefreshCw,
  },
];
