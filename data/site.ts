import {
  Bot,
  ClipboardCheck,
  Crosshair,
  Globe2,
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
    { href: "/about", label: "Background" },
    { href: "/projects", label: "Projects" },
    { href: "/automation-bots", label: "Automation" },
    { href: "/drone-services", label: "Aerial Planning" },
    { href: "/resume", label: "Resume" },
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
    title: "Automation and bots",
    description: "Building practical tools, Discord bots, and workflow helpers.",
    icon: Bot
  },
  {
    title: "Websites and tools",
    description: "Creating clean sites, forms, dashboards, and job-search systems.",
    icon: Globe2
  },
  {
    title: "Aerial planning",
    description: "Developing future drone/aerial planning with clear launch boundaries.",
    icon: Crosshair
  },
  {
    title: "Systems mindset",
    description: "Army aviation maintenance background applied as checklist discipline.",
    icon: Wrench
  }
];

export const focusAreas = [
  {
    title: "Automation portfolio",
    description:
      "Bots, dashboards, workflow helpers, and small tools built around practical daily problems.",
    icon: Bot
  },
  {
    title: "Practical technology",
    description:
      "Useful software over novelty: websites, trackers, forms, and systems that reduce friction.",
    icon: ClipboardCheck
  },
  {
    title: "Background discipline",
    description:
      "Army aviation maintenance experience shows up as checklist thinking, accountability, and systems awareness.",
    icon: Wrench
  }
];
