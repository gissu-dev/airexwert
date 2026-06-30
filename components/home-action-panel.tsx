"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clipboard,
  Download,
  FolderOpen,
  Mail,
  Plane,
  Radar,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Intent = {
  id: string;
  label: string;
  title: string;
  description: string;
  bestFor: string;
  icon: LucideIcon;
  reason: string;
  starter: string;
  steps: string[];
  primary: {
    label: string;
    href: string;
    icon: LucideIcon;
    download?: boolean;
  };
  secondary: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
};

const intents: Intent[] = [
  {
    id: "hiring",
    label: "Hiring",
    title: "Employer or recruiter path",
    description:
      "Get the fastest employer-facing view: resume, project evidence, and a focused contact route.",
    bestFor: "Job opportunities, interviews, aviation-adjacent roles, and applied tech roles.",
    icon: FolderOpen,
    reason: "Job opportunity",
    starter:
      "Hi Airex, I wanted to reach out about a job opportunity. The role is related to...",
    steps: ["Download resume", "Review projects", "Send role context"],
    primary: {
      label: "Download resume",
      href: profile.resumeDownloadPath,
      icon: Download,
      download: true
    },
    secondary: {
      label: "View projects",
      href: "/projects",
      icon: FolderOpen
    }
  },
  {
    id: "automation",
    label: "Automation",
    title: "Automation or bot project path",
    description:
      "Start with the practical systems work: dashboards, forms, Discord bots, and workflow tools.",
    bestFor: "Small tools, internal workflows, intake forms, Discord bots, and cleanup systems.",
    icon: Bot,
    reason: "Automation/bot project",
    starter:
      "Hi Airex, I want to talk about an automation or bot project. The workflow I want to improve is...",
    steps: ["View automation examples", "Define the workflow", "Send project context"],
    primary: {
      label: "View automation",
      href: "/automation-bots",
      icon: Bot
    },
    secondary: {
      label: "View related builds",
      href: "/projects",
      icon: FolderOpen
    }
  },
  {
    id: "aerial",
    label: "Aerial Planning",
    title: "Future aerial work planning path",
    description:
      "Review the responsible launch roadmap for a NEPA-focused aerial services concept in development.",
    bestFor:
      "Future property documentation, mapping, inspection support, and emergency support use-case planning.",
    icon: Radar,
    reason: "Aerial services planning",
    starter:
      "Hi Airex, I want to discuss future aerial work planning. The location or use case I have in mind is...",
    steps: ["Read the roadmap", "Check capability boundaries", "Discuss future fit"],
    primary: {
      label: "View drone roadmap",
      href: "/drone-services",
      icon: Radar
    },
    secondary: {
      label: "View projects",
      href: "/projects",
      icon: FolderOpen
    }
  },
  {
    id: "aviation",
    label: "Aviation",
    title: "Aviation and networking path",
    description:
      "Go straight to aviation background, training direction, systems thinking, and resume context.",
    bestFor: "Aviation contacts, mentorship, flight training conversations, and career direction.",
    icon: Plane,
    reason: "Aviation/networking",
    starter:
      "Hi Airex, I wanted to connect about aviation. The opportunity or conversation is about...",
    steps: ["Review aviation direction", "Open resume", "Send aviation context"],
    primary: {
      label: "View aviation path",
      href: "/aviation",
      icon: Plane
    },
    secondary: {
      label: "Download resume",
      href: profile.resumeDownloadPath,
      icon: Download
    }
  }
];

function contactHref(reason: string, starter: string) {
  const params = new URLSearchParams({
    reason,
    message: starter
  });

  return `/contact?${params.toString()}`;
}

export function HomeActionPanel() {
  const [activeId, setActiveId] = useState(intents[0].id);
  const [copied, setCopied] = useState(false);
  const active = intents.find((intent) => intent.id === activeId) ?? intents[0];
  const ActiveIcon = active.icon;
  const PrimaryIcon = active.primary.icon;
  const SecondaryIcon = active.secondary.icon;

  useEffect(() => {
    setCopied(false);
  }, [activeId]);

  async function copyStarter() {
    try {
      await navigator.clipboard.writeText(active.starter);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="start-here"
      className="border-b border-white/10 bg-white/[0.025]"
    >
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-primary/90">
              Start here
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Choose the reason you are here and get the right next step.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              The homepage now works like a routing layer: hiring, automation,
              aerial planning, and aviation visitors can move directly to the
              relevant page or open a pre-filled contact path.
            </p>

            <div
              className="mt-7 grid gap-2 sm:grid-cols-2"
              role="tablist"
              aria-label="Homepage action paths"
            >
              {intents.map((intent) => {
                const Icon = intent.icon;
                const activeTab = intent.id === active.id;

                return (
                  <button
                    key={intent.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab}
                    className={cn(
                      "focus-ring flex min-h-14 items-center gap-3 rounded-md border px-3 py-3 text-left text-sm font-semibold transition-colors",
                      activeTab
                        ? "border-primary/45 bg-primary/[0.12] text-foreground"
                        : "border-white/10 bg-white/[0.035] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
                    )}
                    onClick={() => setActiveId(intent.id)}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{intent.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-card/80 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {active.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/10 p-5 sm:p-6 md:border-b-0 md:border-r">
                <div className="text-xs font-semibold uppercase text-muted-foreground">
                  Best for
                </div>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {active.bestFor}
                </p>

                <div className="mt-6 grid gap-2">
                  {active.steps.map((step) => (
                    <div
                      key={step}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button asChild>
                    <Link
                      href={active.primary.href}
                      download={active.primary.download ? true : undefined}
                    >
                      <PrimaryIcon className="h-4 w-4" aria-hidden="true" />
                      {active.primary.label}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={active.secondary.href}>
                      <SecondaryIcon className="h-4 w-4" aria-hidden="true" />
                      {active.secondary.label}
                    </Link>
                  </Button>
                </div>

                <div className="mt-5 rounded-md border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground">
                        Contact starter
                      </div>
                      <p className="mt-2 text-sm leading-6 text-foreground">
                        {active.starter}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={copyStarter}
                    >
                      <Clipboard className="h-4 w-4" aria-hidden="true" />
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>

                <Button asChild variant="amber" className="mt-4 w-full">
                  <Link href={contactHref(active.reason, active.starter)}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Open focused contact form
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
