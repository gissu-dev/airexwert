import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { RoadmapDocument } from "@/components/roadmap-document";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Sky Pals Dispatch Roadmap | WertWorks",
  description:
    "The official pre-launch roadmap for Sky Pals Dispatch inspection, mapping, site-documentation, and future technical drone operations in Northeastern Pennsylvania.",
  openGraph: {
    title: "Sky Pals Dispatch Roadmap",
    description:
      "Inspection services first, a readiness-based August 2026 launch target, and responsible long-term technical drone goals."
  }
};

const roadmap = readFileSync(
  join(process.cwd(), "SKY_PALS_ROADMAP.md"),
  "utf8",
).replace(/â€”/g, "—");

export default function SkyPalsRoadmapPage() {
  return (
    <>
      <PageIntro
        eyebrow="Official roadmap"
        title="The path to launching Sky Pals Dispatch responsibly."
        description="Inspection, mapping, site documentation, and custom technical drone services come first. Every launch date remains subject to legal, safety, insurance, equipment, financial, and operational readiness."
      />

      <section className="section-shell pt-4">
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>Pre-launch</Badge>
              <Badge variant="amber">Target: August 24, 2026</Badge>
              <Badge variant="outline">Readiness dependent</Badge>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Founded by Airex Wert. FAA Part 107 certification is complete, with
              the temporary certificate held while the permanent certificate is pending.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/aerial-planning">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Planning overview
              </Link>
            </Button>
            <Button asChild>
              <a href="https://skypalsdispatch.com" target="_blank" rel="noreferrer">
                Visit Sky Pals Dispatch
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <RoadmapDocument markdown={roadmap} />
      </section>
    </>
  );
}
