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
  title: "Drone Services Planning | WertWorks",
  description:
    "WertWorks drone services planning for future aerial documentation, inspection support, mapping, and responsible commercial operations in Northeastern Pennsylvania.",
  openGraph: {
    title: "Drone Services Planning | WertWorks",
    description:
      "Building toward responsible aerial services in Northeastern Pennsylvania with clear equipment, licensing, and project requirement boundaries."
  }
};

const serviceAreas = [
  {
    title: "Thermal inspection",
    description:
      "Planning around thermal-capable use cases where equipment, training, and project requirements support responsible work.",
    icon: Thermometer
  },
  {
    title: "Roof/property inspection",
    description:
      "Aerial documentation for roofs, lots, structures, and properties where drone operations are appropriate.",
    icon: Home
  },
  {
    title: "Search/support use cases",
    description:
      "Support-oriented possibilities that require clear coordination, authority, equipment, and legal boundaries.",
    icon: Search
  },
  {
    title: "Mapping/documentation",
    description:
      "Visual records, site context, progress capture, and organized deliverables for property or project teams.",
    icon: Map
  },
  {
    title: "Emergency support potential",
    description:
      "Potential future support where conditions, permissions, and capabilities make drone operations useful.",
    icon: RadioTower
  },
  {
    title: "Commercial operations planning",
    description:
      "Building toward responsible commercial workflows, intake, safety checks, and repeatable client communication.",
    icon: ClipboardCheck
  }
];

export default function DroneServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Keystone Aerial"
        title="Building toward professional aerial services in Northeastern Pennsylvania."
        description="This page represents a drone business direction, not a claim that every service is currently active. The focus is responsible growth, clear boundaries, local usefulness, and practical operations planning."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Radar className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">
                Capability-first, claim-light.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The right drone service depends on the aircraft, sensors,
                licensing, airspace, site conditions, weather, client needs, and
                deliverables. This page is structured to grow with the business
                without pretending current capabilities are broader than they
                are.
              </p>
              <Badge variant="amber" className="mt-6 leading-5">
                Services and capabilities depend on equipment, licensing,
                location, and project requirements.
              </Badge>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Service directions"
              title="Use cases being evaluated and built toward."
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
