"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, FolderOpen, Mail, MapPin, Radar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { coreMessage, featureRoutes } from "@/data/site";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,14,23,0.96),rgba(7,13,24,0.9))]">
      <div className="absolute inset-0 radar-grid opacity-20" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(31,214,154,0.1),transparent_34%),linear-gradient(245deg,rgba(245,158,11,0.08),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge variant="secondary" className="mb-5">
            <MapPin className="mr-2 h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {profile.regionShort}
          </Badge>
          <p className="text-sm font-semibold uppercase text-primary/90">
            {profile.name} / {profile.brandName}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Practical systems, bots, websites, and automation - built by Airex Wert.
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg leading-8 text-slate-200 sm:text-xl">
            WertWorks is my personal hub for automation projects, Discord bots,
            website builds, field notes, aviation-inspired workflows, and
            future aerial planning.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {coreMessage}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/projects">
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                View Projects
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resume">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                View Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="amber">
              <Link href="/contact">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Me
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
        >
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0a1420]/92 shadow-2xl shadow-black/35 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                  <Radar className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    WertWorks command center
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Organized routes through current and future work
                  </p>
                </div>
              </div>
              <Badge variant="amber">Not launched yet</Badge>
            </div>

            <div className="grid gap-3 p-4 sm:p-5">
              {featureRoutes.map((route) => {
                const Icon = route.icon;

                return (
                  <Link
                    key={route.title}
                    href={route.primaryHref}
                    className="group grid gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-primary/30 hover:bg-white/[0.06] focus-ring sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-primary group-hover:border-primary/25 group-hover:bg-primary/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">
                        {route.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {route.description}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                      {route.cta}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
