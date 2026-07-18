import Link from "next/link";
import {
  BadgeCheck,
  ClipboardCheck,
  Crosshair,
  Flame,
  FileText,
  Map,
  Plane,
  Radar,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Aerial Planning | WertWorks",
  description:
    "WertWorks future aerial planning roadmap for launch requirements, equipment planning, Part 107, insurance, safety process, intake, operating area, and responsible boundaries.",
  openGraph: {
    title: "Aerial Planning | WertWorks",
    description:
      "Future aerial-services planning for Northeastern Pennsylvania. Not an active commercial drone-service launch."
  }
};

const possibleFutureServices = [
  {
    title: "Roof and exterior documentation",
    description:
      "Planned aerial visual inspection support for roofs, exteriors, and difficult-to-view areas, with scope and deliverables clearly defined.",
    icon: Crosshair
  },
  {
    title: "Property and site overviews",
    description:
      "Organized aerial imagery for properties, lots, access points, site context, and visual records.",
    icon: Map
  },
  {
    title: "Progress and recurring records",
    description:
      "Repeatable documentation for construction progress, exterior conditions, and projects that benefit from consistent viewpoints over time.",
    icon: FileText
  },
  {
    title: "Future fire-service exploration",
    description:
      "A later goal to test how drones may help fire services after the inspection business is established and the required training, policies, and agency relationships are understood.",
    icon: Flame
  }
];

const launchRequirements = [
  {
    title: "Equipment planning",
    description:
      "Select aircraft, batteries, storage, camera payload, thermal needs, maintenance routines, and field kit requirements.",
    icon: Wrench
  },
  {
    title: "Licensing / Part 107",
    description:
      "Part 107 certification is complete. Keep the temporary certificate available while the permanent certificate is pending, and document airspace checks for every mission.",
    icon: BadgeCheck
  },
  {
    title: "Insurance",
    description:
      "Define insurance requirements and project boundaries before any client-facing aerial work is offered.",
    icon: ShieldCheck
  },
  {
    title: "Safety process",
    description:
      "Create preflight checks, site risk review, weather boundaries, battery process, and emergency steps.",
    icon: ClipboardCheck
  },
  {
    title: "Client intake process",
    description:
      "Build a planning intake for location, scope, timing, airspace, property permission, deliverables, and constraints.",
    icon: FileText
  },
  {
    title: "Operating area",
    description: `Plan around ${profile.location} while keeping travel, weather, permissions, and local requirements visible.`,
    icon: Map
  }
];

const roadmap = [
  "Form the business and define clear ownership, scope, and launch boundaries.",
  "Complete licensing, insurance, equipment, and training decisions.",
  "Define the initial inspection services, client intake, deliverables, and operating procedures.",
  "Practice safe workflows and build sample inspection-style documentation.",
  "Launch the core inspection business, then explore fire-service use cases through research and local conversations."
];

export default function AerialPlanningPage() {
  return (
    <>
      <PageIntro
        eyebrow="Sky Pals Dispatch"
        title="Building an inspection-focused drone business."
        description="Sky Pals Dispatch is a pre-launch business founded and independently developed by Airex Wert. The website is live while LLC formation, inspection services, equipment readiness, operating procedures, and clear deliverables are developed."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Radar className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Pre-launch status</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Sky Pals Dispatch has a live website and a defined launch direction:
                practical aerial inspection support and organized visual documentation.
                Fire-service applications are a later area to explore, not a current
                service or agency affiliation.
              </p>
              <Badge variant="amber" className="mt-6 leading-5">
                Target launch: August 24, 2026 - only if LLC formation, equipment,
                insurance, training, procedures, financing, and operational-readiness
                gates are complete.
              </Badge>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/aerial-planning/roadmap">Read the official roadmap</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact?reason=Aerial%20planning%20conversation">
                    Start a Sky Pals conversation
                  </Link>
                </Button>
                <Button asChild variant="amber">
                  <Link href="/contact">Contact Airex</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="What this could become"
              title="Inspection services come first."
              description="The first business goal is useful aerial inspection support and documentation. Fire-service applications remain a later research and relationship-building goal."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {possibleFutureServices.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title} className="bg-card/75">
                    <CardContent className="p-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 className="mt-4 font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Launch requirements"
            title="What must be ready before inspection services are offered."
            description="The roadmap separates active business development from services that are not yet available."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {launchRequirements.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="bg-card/75">
                  <CardContent className="p-5">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-shell scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Roadmap"
            title="A clear path from pre-launch business to responsible operations."
            description="This high-level sequence begins with inspection services. The complete official roadmap documents the detailed launch gates, milestones, service boundaries, and longer-term goals."
          />
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Plane className="h-8 w-8 text-primary" aria-hidden="true" />
              <ol className="mt-6 grid gap-4">
                {roadmap.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
              <Button asChild className="mt-7 w-full">
                <Link href="/aerial-planning/roadmap">Open the complete roadmap</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
