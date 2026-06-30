"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FolderOpen,
  MapPin,
  Plane,
  Radar,
  Workflow
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

const radarSignals = [
  { label: "Aviation", x: "60%", y: "28%", tone: "accent" },
  { label: "Automation", x: "34%", y: "62%", tone: "primary" },
  { label: "Drone Planning", x: "70%", y: "68%", tone: "primary" }
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,14,23,0.96),rgba(7,13,24,0.9))]">
      <div className="absolute inset-0 radar-grid opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(31,214,154,0.09),transparent_34%),linear-gradient(245deg,rgba(245,158,11,0.07),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_0.78fr] lg:gap-14 lg:py-20">
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
            support experience, and a builder mindset focused on automation,
            aviation, drone operations planning, bots, and practical technology.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#start-here">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                Start Here
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                View Projects
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
              View the aerial services planning roadmap
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          aria-hidden="true"
        >
          <RadarVisual />
        </motion.div>
      </div>
    </section>
  );
}

function RadarVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a1420]/90 p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-5">
      <div className="absolute inset-0 radar-grid opacity-20" />
      <div className="relative grid gap-4">
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
              <Radar className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">
                Operations Focus
              </div>
              <div className="text-xs text-muted-foreground">
                Aviation / automation / drone planning
              </div>
            </div>
          </div>
          <div className="hidden text-xs uppercase text-muted-foreground sm:block">
            NEPA
          </div>
        </div>

        <div className="flex justify-center rounded-md border border-white/10 bg-black/[0.18] px-4 py-5 sm:px-6 sm:py-6">
          <div className="relative aspect-square w-full max-w-[250px] overflow-hidden rounded-full border border-primary/30 bg-[radial-gradient(circle,rgba(31,214,154,0.13)_0%,rgba(31,214,154,0.04)_44%,rgba(2,6,12,0.64)_74%)] sm:max-w-[320px]">
            <div className="absolute inset-6 rounded-full border border-primary/20" />
            <div className="absolute inset-14 rounded-full border border-primary/[0.14]" />
            <div className="absolute inset-[39%] rounded-full border border-primary/[0.2]" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/[0.16]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/[0.16]" />
            <div className="pointer-events-none absolute inset-0 origin-center animate-radar-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(31,214,154,0)_292deg,rgba(31,214,154,0.36)_344deg,transparent_360deg)]" />
            {radarSignals.map((signal) => (
              <div
                key={signal.label}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: signal.x, top: signal.y }}
              >
                <span
                  className={
                    signal.tone === "accent"
                      ? "block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_16px_rgba(245,158,11,0.5)]"
                      : "block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_rgba(31,214,154,0.5)]"
                  }
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 rounded-full border border-primary/20" />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <SignalChip icon={Plane} label="Aviation" />
          <SignalChip icon={Workflow} label="Automation" />
          <SignalChip icon={Radar} label="Drone Planning" />
        </div>
      </div>
    </div>
  );
}

function SignalChip({
  icon: Icon,
  label
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      <span>{label}</span>
    </div>
  );
}
