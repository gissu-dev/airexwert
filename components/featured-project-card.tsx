import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Crosshair,
  ExternalLink,
  Flame,
  Radar
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Card className="relative overflow-hidden border-primary/25 bg-[linear-gradient(135deg,rgba(31,214,154,0.11),rgba(13,18,29,0.94)_42%,rgba(245,158,11,0.08))] shadow-2xl shadow-black/30">
      <div className="absolute inset-0 radar-grid opacity-20" aria-hidden="true" />
      <CardContent className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="amber">Flagship project</Badge>
            <Badge>Pre-launch business</Badge>
            <Badge variant="outline">Website live</Badge>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Founded and independently developed by Airex Wert
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            {project.shortDescription}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            The website and operating concept are being built now. The initial
            business will focus on inspection and documentation services. Fire-service
            applications are a later goal to explore after the core operation is established.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="https://skypalsdispatch.com" target="_blank" rel="noreferrer">
                Visit Sky Pals Dispatch
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/aerial-planning/roadmap">
                Read the official roadmap
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-xl border border-white/10 bg-black/25 p-6">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-primary/5" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 h-px w-[30rem] -translate-x-1/2 -translate-y-1/2 rotate-[-32deg] bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden="true" />

          <div className="relative flex h-full min-h-[19rem] flex-col justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-radar">
              <Radar className="h-6 w-6" aria-hidden="true" />
            </span>

            <div className="grid gap-3">
              <MissionLine icon={Crosshair} label="Launch focus" value="Inspection services" />
              <MissionLine icon={Flame} label="Later exploration" value="Fire-service use cases" />
              <MissionLine icon={Building2} label="Next business gate" value="LLC formation" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MissionLine({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-background/75 p-3 backdrop-blur">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
