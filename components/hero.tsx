"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  Download,
  FolderOpen,
  Mail,
  MapPin,
  Plane,
  Radar,
  Route
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

const telemetry = [
  { label: "Focus", value: "Automation" },
  { label: "Track", value: "Aviation" },
  { label: "Region", value: "NEPA" }
];

type RadarTarget = {
  id: string;
  label: string;
  href: string;
  signal: string;
  description: string;
  x: string;
  y: string;
  icon: LucideIcon;
};

const radarTargets: RadarTarget[] = [
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    signal: "Build pipeline",
    description:
      "Automation, bots, drone planning, aviation tools, websites, and job systems.",
    x: "58%",
    y: "28%",
    icon: FolderOpen
  },
  {
    id: "automation",
    label: "Automation",
    href: "/automation-bots",
    signal: "Workflow tools",
    description:
      "Discord bots, dashboards, form automation, and small tools that reduce friction.",
    x: "33%",
    y: "62%",
    icon: Bot
  },
  {
    id: "drone",
    label: "Drone Services",
    href: "/drone-services",
    signal: "NEPA aerial planning",
    description:
      "Building toward professional aerial documentation and inspection support.",
    x: "70%",
    y: "68%",
    icon: Radar
  },
  {
    id: "aviation",
    label: "Aviation",
    href: "/aviation",
    signal: "Training direction",
    description:
      "Flight training roadmap, systems mindset, and long-term business aviation goals.",
    x: "45%",
    y: "41%",
    icon: Plane
  }
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,14,23,0.96),rgba(7,13,24,0.9))]">
      <div className="absolute inset-0 radar-grid opacity-35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(31,214,154,0.10),transparent_34%),linear-gradient(245deg,rgba(245,158,11,0.08),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_0.86fr] lg:gap-14 lg:py-20">
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
            Army veteran with aviation maintenance background, current direct
            support experience, and a builder mindset focused on drones,
            workflow automation, bots, and practical technology.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/projects">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                View Projects
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Me
              </Link>
            </Button>
            <Button asChild size="lg" variant="amber">
              <Link href={profile.resumeDownloadPath}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </Link>
            </Button>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {telemetry.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
              >
                <div className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex items-start gap-3 text-sm text-muted-foreground">
            <span className="mt-2 h-px w-10 shrink-0 bg-primary/70" />
            <Link
              href="/drone-services"
              className="inline-flex items-center gap-2 font-medium leading-6 text-primary hover:text-primary/80"
            >
              Building toward professional aerial services in Northeastern
              Pennsylvania
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <CommandVisual />
        </motion.div>
      </div>
    </section>
  );
}

function CommandVisual() {
  const [activeTarget, setActiveTarget] = useState<RadarTarget>(radarTargets[0]);
  const ActiveIcon = activeTarget.icon;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a1420]/90 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-5"
      aria-label="Interactive WertWorks operations radar"
    >
      <div className="absolute inset-0 radar-grid opacity-25" aria-hidden="true" />
      <div className="relative grid gap-4">
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.045] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Radar className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">
                Operations Display
              </div>
              <div className="text-xs text-muted-foreground">
                route planning / automation / readiness
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs text-primary sm:flex">
            <span className="h-2 w-2 rounded-full bg-primary" />
            INTERACTIVE
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.72fr]">
          <RadarPanel
            activeTarget={activeTarget}
            onTargetChange={setActiveTarget}
          />
          <div className="grid gap-4">
            <div className="rounded-md border border-primary/25 bg-primary/[0.08] p-4 shadow-radar">
              <ActiveIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <div className="mt-4 text-xs font-semibold uppercase text-primary/90">
                Selected target
              </div>
              <h3 className="mt-1 text-base font-semibold text-foreground">
                {activeTarget.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {activeTarget.description}
              </p>
              <Button asChild size="sm" variant="outline" className="mt-4 w-full">
                <Link href={activeTarget.href}>
                  Open {activeTarget.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <SystemCard icon={Route} label="Signal" value={activeTarget.signal} />
            <SystemCard
              icon={Activity}
              label="Mode"
              value="Clickable radar contacts"
            />
          </div>
        </div>

        <div className="rounded-md border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex items-center justify-between text-xs uppercase text-muted-foreground">
            <span>Route / workflow map</span>
            <span>NEPA</span>
          </div>
          <svg
            viewBox="0 0 480 120"
            className="h-28 w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 88 C92 32 150 102 214 54 S334 28 454 80"
              stroke="rgba(245,158,11,0.72)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M26 88 C92 32 150 102 214 54 S334 28 454 80"
              stroke="rgba(31,214,154,0.28)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {[26, 214, 454].map((x, index) => (
              <circle
                key={x}
                cx={x}
                cy={index === 0 ? 88 : index === 1 ? 54 : 80}
                r="6"
                fill={index === 1 ? "#1fd69a" : "#f59e0b"}
              />
            ))}
            <g stroke="rgba(255,255,255,0.12)">
              <path d="M0 30 H480" />
              <path d="M0 60 H480" />
              <path d="M0 90 H480" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function RadarPanel({
  activeTarget,
  onTargetChange
}: {
  activeTarget: RadarTarget;
  onTargetChange: (target: RadarTarget) => void;
}) {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-md border border-white/10 bg-black/25 p-4 sm:min-h-[330px]">
      <div className="relative aspect-square w-full max-w-[330px] overflow-hidden rounded-full border border-primary/35 bg-[radial-gradient(circle,rgba(31,214,154,0.14)_0%,rgba(31,214,154,0.045)_42%,rgba(2,6,12,0.6)_72%)]">
        <div className="absolute inset-6 rounded-full border border-primary/20" aria-hidden="true" />
        <div className="absolute inset-14 rounded-full border border-primary/[0.16]" aria-hidden="true" />
        <div className="absolute inset-[38%] rounded-full border border-primary/[0.22]" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/[0.18]" aria-hidden="true" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/[0.18]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 animate-radar-spin bg-[conic-gradient(from_0deg,transparent_0deg,rgba(31,214,154,0)_292deg,rgba(31,214,154,0.44)_346deg,transparent_360deg)]" aria-hidden="true" />
        {radarTargets.map((target) => {
          const active = target.id === activeTarget.id;
          const Icon = target.icon;
          return (
            <button
              key={target.id}
              type="button"
              className="focus-ring absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/35 bg-background/80 text-primary shadow-[0_0_18px_rgba(31,214,154,0.22)] transition-all hover:scale-110 hover:border-primary hover:bg-primary/[0.15]"
              style={{ left: target.x, top: target.y }}
              aria-label={`Select radar target: ${target.label}`}
              aria-pressed={active}
              onClick={() => onTargetChange(target)}
            >
              <span
                className={
                  active
                    ? "absolute inset-[-7px] rounded-full border border-accent/[0.55]"
                    : "absolute inset-[-5px] rounded-full border border-primary/[0.15]"
                }
                aria-hidden="true"
              />
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          );
        })}
        <div className="pointer-events-none absolute inset-0 rounded-full border border-primary/20" aria-hidden="true" />
      </div>
    </div>
  );
}

function SystemCard({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-4 text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
