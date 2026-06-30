import Link from "next/link";
import {
  BadgeCheck,
  ClipboardCheck,
  Crosshair,
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
    title: "Property documentation planning",
    description:
      "Future visual documentation for properties, structures, lots, and progress records when launch requirements are met.",
    icon: Map
  },
  {
    title: "Inspection support concepts",
    description:
      "Planning around roof, site, or structure documentation where equipment, permissions, and scope support responsible work.",
    icon: Crosshair
  },
  {
    title: "Mapping and records",
    description:
      "Future organized deliverables for site context, progress capture, and visual records.",
    icon: FileText
  },
  {
    title: "Thermal use-case research",
    description:
      "Researching thermal-capable use cases with equipment, training, legal, and project boundaries clearly defined.",
    icon: Radar
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
      "Confirm licensing requirements, airspace awareness, operating limits, and compliance before presenting active services.",
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
  "Clarify service boundaries and future use cases.",
  "Complete licensing, insurance, and equipment decisions.",
  "Build safety checklists and client intake workflow.",
  "Document sample deliverables and operating process.",
  "Decide when the concept is ready for an official launch."
];

export default function AerialPlanningPage() {
  return (
    <>
      <PageIntro
        eyebrow="Aerial Planning"
        title="Future aerial services planning, not an active launch."
        description="This page organizes the roadmap for Keystone Aerial Services / aerial planning. It is for launch preparation, use-case research, equipment planning, licensing boundaries, safety process, and planning conversations."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Radar className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Launch status</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Aerial services are not officially launched yet. The current
                purpose is responsible planning: define what this could become,
                what must be true before launch, and what conversations are
                appropriate while the roadmap is still in development.
              </p>
              <Badge variant="amber" className="mt-6 leading-5">
                In development - future capabilities depend on equipment,
                licensing, insurance, location, safety process, and project
                requirements.
              </Badge>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild>
                  <Link href="#roadmap">View launch roadmap</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact?reason=Aerial%20planning%20conversation">
                    Start a planning conversation
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
              title="Possible future services being evaluated."
              description="These are planning categories, not active service offers. Each one depends on launch readiness and project-specific requirements."
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
            title="What needs to be ready before aerial work is presented as active."
            description="The roadmap separates planning conversations from commercial availability."
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
            title="A clear path from concept to responsible launch."
            description="This is the current planning sequence. It should evolve before any official aerial-services launch language is used."
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
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
