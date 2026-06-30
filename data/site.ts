import {
  Bot,
  Briefcase,
  ClipboardCheck,
  Crosshair,
  MapPin,
  Plane,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.brandName,
  personName: profile.name,
  location: profile.location,
  headline: profile.headline,
  tagline: profile.tagline,
  email: profile.email,
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/drone-services", label: "Aerial Planning" },
    { href: "/aviation", label: "Aviation" },
    { href: "/automation-bots", label: "Automation" },
    { href: "/resume", label: "Resume" },
    { href: "/job-search", label: "Job Search" },
    { href: "/contact", label: "Contact" }
  ]
};

export const quickStats = [
  {
    title: "Veteran background",
    description: "U.S. Army experience with a disciplined, mission-focused approach.",
    icon: ShieldCheck
  },
  {
    title: "Aviation maintenance",
    description: "Hands-on aviation maintenance mindset and systems awareness.",
    icon: Wrench
  },
  {
    title: "Automation and bots",
    description: "Building practical tools, Discord bots, and workflow helpers.",
    icon: Bot
  },
  {
    title: "Drone operations planning",
    description: "Developing a responsible NEPA-focused aerial services model.",
    icon: Crosshair
  },
  {
    title: "NEPA-based",
    description: "Local to the Wilkes-Barre area with a practical service mindset.",
    icon: MapPin
  }
];

export const focusAreas = [
  {
    title: "Aviation discipline",
    description:
      "Maintenance background, checklist thinking, and a long-term path toward professional aviation.",
    icon: Plane
  },
  {
    title: "Practical technology",
    description:
      "Useful software over novelty: dashboards, trackers, bots, and small tools that reduce friction.",
    icon: ClipboardCheck
  },
  {
    title: "Career growth",
    description:
      "A grounded portfolio for employers, aviation contacts, future aerial planning conversations, and project collaborators.",
    icon: Briefcase
  }
];
