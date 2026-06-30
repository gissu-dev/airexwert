import {
  ClipboardCheck,
  Home,
  Map,
  RadioTower,
  Radar,
  Search,
  Thermometer
} from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Aerial Services Planning | WertWorks",
  description:
    "WertWorks aerial services planning for future property documentation, inspection support, mapping, emergency support use cases, and responsible drone operations in Northeastern Pennsylvania.",
  openGraph: {
    title: "Aerial Services Planning | WertWorks",
    description:
      "Aerial services concept in development for Northeastern Pennsylvania with clear equipment, licensing, insurance, and project requirement boundaries."
  }
};

const serviceAreas = [
  {
    title: "Thermal use-case planning",
    description:
      "Exploring thermal-capable use cases where equipment, training, licensing, and project requirements would support responsible future work.",
    icon: Thermometer
  },
  {
    title: "Property documentation planning",
    description:
      "Planning how aerial documentation could support roofs, lots, structures, and property records when operations are appropriate.",
    icon: Home
  },
  {
    title: "Search/support use cases",
    description:
      "Exploring support-oriented possibilities that would require clear coordination, authority, equipment, insurance, and legal boundaries.",
    icon: Search
  },
  {
    title: "Mapping and documentation model",
    description:
      "Developing ideas for visual records, site context, progress capture, and organized deliverables for future projects.",
    icon: Map
  },
  {
    title: "Emergency support potential",
    description:
      "Researching where future drone operations could be useful only when permissions, capabilities, and conditions support it.",
    icon: RadioTower
  },
  {
    title: "Launch preparation",
    description:
      "Building toward responsible commercial workflows, intake, safety checks, equipment decisions, and launch requirements.",
    icon: ClipboardCheck
  }
];

export default function DroneServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Aerial Services Planning"
        title="Developing a NEPA-focused drone operations model."
        description="This area is currently in development. It represents launch planning, use-case research, and operational preparation, not a claim that commercial aerial work is currently being offered."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Radar className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">
                Responsible launch planning.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The drone business has not officially launched yet. This page is
                structured around roadmap, equipment planning, local market
                research, use cases, and operating boundaries so the concept can
                develop without overstating current capabilities.
              </p>
              <Badge variant="amber" className="mt-6 leading-5">
                This area is currently in development. Services and capabilities
                depend on equipment, licensing, location, insurance, and project
                requirements.
              </Badge>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Planning tracks"
              title="Use cases and launch requirements being evaluated."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {serviceAreas.map((area) => (
                <SkillCard key={area.title} {...area} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
