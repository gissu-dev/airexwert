import {
  Bot,
  Briefcase,
  ClipboardCheck,
  Crosshair,
  FileText,
  Globe2,
  LayoutDashboard,
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
    { href: "/projects", label: "Projects" },
    { href: "/automation-bots", label: "Automation & Bots" },
    { href: "/job-tools", label: "Job Tools" },
    { href: "/aerial-planning", label: "Aerial Planning" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" }
  ]
};

export const coreMessage =
  "Airex Wert builds practical systems: automation tools, Discord bots, websites, job-search tools, and aviation-inspired workflows - with future aerial planning in development.";

export const featureRoutes = [
  {
    title: "Employers / Hiring",
    audience: "Employers, recruiters, and hiring managers",
    description:
      "Resume, work background, operating style, and selected technical projects.",
    primaryHref: "/resume",
    secondaryHref: "/projects",
    cta: "View resume",
    icon: Briefcase
  },
  {
    title: "Automation & Bots",
    audience: "People reviewing bot and workflow automation work",
    description:
      "Discord bot projects, reminder utilities, workflow helpers, and practical automation systems.",
    primaryHref: "/automation-bots",
    secondaryHref: "/projects",
    cta: "Review bot work",
    icon: Bot
  },
  {
    title: "Job Tools",
    audience: "Anyone interested in the job-search operating system",
    description:
      "Job dashboard, application tracker, resume toolkit, cover letter workflow, and interview notes.",
    primaryHref: "/job-tools",
    secondaryHref: "/projects#personal-job-search-dashboard",
    cta: "Open job tools",
    icon: LayoutDashboard
  },
  {
    title: "Websites",
    audience: "People reviewing site builds and practical web systems",
    description:
      "Portfolio structure, project hubs, contact flows, reusable sections, and website foundations.",
    primaryHref: "/projects#website-builds",
    secondaryHref: "/contact?reason=Website%20project",
    cta: "View website work",
    icon: Globe2
  },
  {
    title: "Aerial Planning",
    audience: "Planning conversations only",
    description:
      "Launch roadmap, future service ideas, equipment planning, licensing boundaries, and safety process.",
    primaryHref: "/aerial-planning",
    secondaryHref: "/contact?reason=Aerial%20planning%20conversation",
    cta: "View launch roadmap",
    icon: Crosshair
  }
];

export const buildAreas = [
  {
    title: "Automation & Bots",
    description:
      "Discord bots, reminders, status updates, server utilities, and small automations.",
    href: "/automation-bots",
    icon: Bot
  },
  {
    title: "Websites & Tools",
    description:
      "Clean site structures, contact flows, project pages, forms, and useful web interfaces.",
    href: "/projects#website-builds",
    icon: Globe2
  },
  {
    title: "Job Search Systems",
    description:
      "Application tracking, resume organization, follow-up notes, and interview prep workflows.",
    href: "/job-tools",
    icon: LayoutDashboard
  },
  {
    title: "Aviation-Inspired Workflows",
    description:
      "Checklist thinking, handoff discipline, safety gates, and structured operating routines.",
    href: "/projects#aviation-checklist-automation",
    icon: ClipboardCheck
  },
  {
    title: "Aerial Planning",
    description:
      "Future aerial services planning with launch requirements clearly separated from active offers.",
    href: "/aerial-planning",
    icon: Crosshair
  }
];

export const currentStatusGroups = [
  {
    label: "Active",
    items: [
      "Personal website",
      "Discord bot documentation",
      "Job tools",
      "Automation systems"
    ]
  },
  {
    label: "In progress",
    items: [
      "Project case studies",
      "Resume page",
      "Contact system",
      "Website build documentation"
    ]
  },
  {
    label: "Future",
    items: [
      "Aerial services launch planning",
      "Part 107 and insurance readiness",
      "Equipment planning",
      "Client intake process"
    ]
  }
];

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
    description: "Developing future aerial planning with clear launch boundaries.",
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
    icon: FileText
  },
  {
    title: "Background discipline",
    description:
      "Army aviation maintenance experience shows up as checklist thinking, accountability, and systems awareness.",
    icon: Wrench
  }
];
