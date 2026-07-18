import {
  Bot,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Radar,
  Wrench
} from "lucide-react";

export const automationSkills = [
  {
    title: "Discord bots",
    description:
      "Command design, reminders, role utilities, moderation helpers, and community workflow tools.",
    icon: Bot
  },
  {
    title: "Workflow automation",
    description:
      "Small automations that reduce repeated steps and keep status, notes, and follow-ups visible.",
    icon: Wrench
  },
  {
    title: "Simple dashboards",
    description:
      "Focused dashboards for projects, contacts, aerial planning leads, and personal operations.",
    icon: LayoutDashboard
  },
  {
    title: "Form automation",
    description:
      "Structured intake, quote routing, response capture, and ready-to-integrate contact forms.",
    icon: FileText
  },
  {
    title: "Website automation",
    description:
      "Fast contact flows, repeatable content sections, and deployment-ready site foundations.",
    icon: MessageSquare
  }
];

export const automationIdeas = [
  {
    title: "Reminder bot",
    description:
      "Lightweight Discord or chat reminders for follow-up dates and recurring routines.",
    icon: Bot
  },
  {
    title: "Quote/contact form automation",
    description:
      "Capture project details and route requests for future aerial planning, website, or bot work.",
    icon: FileText
  },
  {
    title: "Future aerial work intake form",
    description:
      "Collect location, property type, requested documentation, timing, and licensing constraints for future planning.",
    icon: Radar
  }
];
