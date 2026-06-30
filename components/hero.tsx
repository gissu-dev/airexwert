"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  FolderOpen,
  MapPin,
  Mail,
  Plane,
  Radar,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type CommandTarget = {
  id: string;
  label: string;
  title: string;
  status: string;
  purpose: string;
  x: string;
  y: string;
  icon: LucideIcon;
  tone: "ready" | "building" | "training" | "planning";
  primaryCta: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
};

const commandTargets: CommandTarget[] = [
  {
    id: "hire",
    label: "Hire Airex",
    title: "Hire Airex",
    status: "Ready",
    purpose:
      "Resume, projects, job opportunities, aviation-adjacent roles, and applied tech roles.",
    x: "50%",
    y: "30%",
    icon: Briefcase,
    tone: "ready",
    primaryCta: {
      label: "View Resume",
      href: "/resume",
      icon: Briefcase
    },
    secondaryCta: {
      label: "View Projects",
      href: "/projects",
      icon: FolderOpen
    }
  },
  {
    id: "automation",
    label: "Automation Work",
    title: "Automation Work",
    status: "Building",
    purpose:
      "Bots, dashboards, job search tools, workflow helpers, Discord bots, and practical automation.",
    x: "31%",
    y: "62%",
    icon: Workflow,
    tone: "building",
    primaryCta: {
      label: "View Automation",
      href: "/automation-bots",
      icon: Bot
    }
  },
  {
    id: "aviation",
    label: "Aviation Path",
    title: "Aviation Path",
    status: "Training Direction",
    purpose:
      "Aviation maintenance background, sim practice, flight training roadmap, and corporate/business aviation goal.",
    x: "66%",
    y: "48%",
    icon: Plane,
    tone: "training",
    primaryCta: {
      label: "View Aviation",
      href: "/aviation",
      icon: Plane
    }
  },
  {
    id: "aerial",
    label: "Drone Business Planning",
    title: "Drone Business Planning",
    status: "In Development",
    purpose:
      "Keystone Aerial Services concept, equipment planning, Part 107/licensing boundaries, and NEPA use-case research.",
    x: "72%",
    y: "72%",
    icon: Radar,
    tone: "planning",
    primaryCta: {
      label: "View Aerial Planning",
      href: "/drone-services",
      icon: Radar
    }
  }
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,14,23,0.96),rgba(7,13,24,0.9))]">
      <div className="absolute inset-0 radar-grid opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(31,214,154,0.09),transparent_34%),linear-gradient(245deg,rgba(245,158,11,0.07),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.86fr] lg:gap-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge variant="secondary" className="mb-5">
            <MapPin className="mr-2 h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {profile.regionShort}
          </Badge>
          <p className="text-sm font-semibold uppercase text-primary/90">
            {profile.name}
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            {profile.brandName}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-xl leading-8 text-slate-200 sm:text-2xl">
            {profile.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            A personal hub for who Airex is, what he is building, and where
            employers, aviation contacts, automation projects, and future aerial
            planning conversations should go next.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/resume">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                View Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                View Projects
              </Link>
            </Button>
            <Button asChild size="lg" variant="amber">
              <Link href="/contact">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-muted-foreground">
            <Radar className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Use the command radar to route yourself to the right part of the
            site: hiring, automation, aviation, or drone business planning.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <CommandRadar />
        </motion.div>
      </div>
    </section>
  );
}

function CommandRadar() {
  const [activeId, setActiveId] = useState(commandTargets[0].id);
  const active =
    commandTargets.find((target) => target.id === activeId) ?? commandTargets[0];
  const ActiveIcon = active.icon;
  const PrimaryIcon = active.primaryCta.icon;
  const SecondaryIcon = active.secondaryCta?.icon;
  const hasSecondaryCta = Boolean(active.secondaryCta);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a1420]/90 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute inset-0 radar-grid opacity-20" aria-hidden="true" />
      <div className="relative grid gap-4">
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
              <Radar className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">
                WertWorks Command Radar
              </div>
              <div className="text-xs text-muted-foreground">
                Select a visitor path
              </div>
            </div>
          </div>
          <Badge variant={active.tone === "planning" ? "amber" : "default"}>
            {active.status}
          </Badge>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-center rounded-md border border-white/10 bg-black/[0.18] px-4 py-5 sm:px-6">
            <div className="relative aspect-square w-full max-w-[235px] overflow-hidden rounded-full border border-primary/30 bg-[radial-gradient(circle,rgba(31,214,154,0.13)_0%,rgba(31,214,154,0.04)_44%,rgba(2,6,12,0.64)_74%)] sm:max-w-[280px]">
              <div className="absolute inset-5 rounded-full border border-primary/20" aria-hidden="true" />
              <div className="absolute inset-12 rounded-full border border-primary/[0.14]" aria-hidden="true" />
              <div className="absolute inset-[39%] rounded-full border border-primary/[0.2]" aria-hidden="true" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/[0.16]" aria-hidden="true" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/[0.16]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 origin-center animate-radar-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(31,214,154,0)_292deg,rgba(31,214,154,0.34)_344deg,transparent_360deg)]" aria-hidden="true" />
              {commandTargets.map((target) => {
                const Icon = target.icon;
                const selected = target.id === active.id;

                return (
                  <button
                    key={target.id}
                    type="button"
                    className={cn(
                      "focus-ring absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background/85 transition-all hover:scale-105",
                      selected
                        ? "border-accent text-accent shadow-[0_0_24px_rgba(245,158,11,0.34)]"
                        : "border-primary/35 text-primary shadow-[0_0_16px_rgba(31,214,154,0.18)] hover:border-primary"
                    )}
                    style={{ left: target.x, top: target.y }}
                    aria-label={`Select ${target.label}`}
                    aria-pressed={selected}
                    onClick={() => setActiveId(target.id)}
                  >
                    <span
                      className={cn(
                        "absolute rounded-full border",
                        selected
                          ? "inset-[-7px] border-accent/45"
                          : "inset-[-4px] border-primary/[0.16]"
                      )}
                      aria-hidden="true"
                    />
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                );
              })}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-primary/20" aria-hidden="true" />
            </div>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <ActiveIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">
                    {active.title}
                  </h2>
                  <Badge variant={active.tone === "planning" ? "amber" : "secondary"}>
                    {active.status}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {active.purpose}
                </p>
              </div>
            </div>

            <div
              className={cn(
                "mt-5 grid gap-3",
                hasSecondaryCta && "sm:grid-cols-2"
              )}
            >
              <Button asChild className="h-auto min-h-11 px-4 py-2.5 text-center leading-tight">
                <Link href={active.primaryCta.href}>
                  <PrimaryIcon className="h-4 w-4" aria-hidden="true" />
                  {active.primaryCta.label}
                </Link>
              </Button>
              {active.secondaryCta ? (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-11 px-4 py-2.5 text-center leading-tight"
                >
                  <Link href={active.secondaryCta.href}>
                    {SecondaryIcon ? (
                      <SecondaryIcon className="h-4 w-4" aria-hidden="true" />
                    ) : null}
                    {active.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className="grid gap-2 sm:grid-cols-2"
          role="group"
          aria-label="Command radar paths"
        >
          {commandTargets.map((target) => {
            const Icon = target.icon;
            const selected = target.id === active.id;

            return (
              <button
                key={target.id}
                type="button"
                className={cn(
                  "focus-ring flex min-h-12 min-w-0 items-center gap-3 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors",
                  selected
                    ? "border-primary/45 bg-primary/[0.12] text-foreground"
                    : "border-white/10 bg-white/[0.035] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
                )}
                aria-pressed={selected}
                onClick={() => setActiveId(target.id)}
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 leading-5">{target.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-md border border-amber-400/20 bg-amber-400/[0.08] px-3 py-2 text-xs leading-5 text-amber-100/90">
          Drone business planning is in development. Future capabilities depend
          on equipment, licensing, insurance, location, and project requirements.
        </div>
      </div>
    </div>
  );
}
