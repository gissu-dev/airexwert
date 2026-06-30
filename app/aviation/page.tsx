import { Building2, ClipboardCheck, Plane, Route, Wrench } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Aviation Direction | WertWorks",
  description:
    "Airex Wert's aviation direction through WertWorks: flight training roadmap, aviation systems mindset, aircraft and simulator interest, and long-term business aviation goals.",
  openGraph: {
    title: "Aviation Direction | WertWorks",
    description:
      "Flight training roadmap, aviation systems mindset, and professional aviation goals without overstated credentials."
  }
};

const roadmap = [
  "Confirm medical, budget, location, and scheduling realities.",
  "Choose a local training path and build a sustainable study cadence.",
  "Use simulators and checklists to strengthen procedures and radio confidence.",
  "Progress through training milestones without overstating licenses or ratings.",
  "Build professional aviation exposure and evaluate long-term business aviation paths."
];

const aviationSections = [
  {
    title: "Flight training roadmap",
    description:
      "A structured plan around readiness, study, local flight school options, scheduling, and realistic budget constraints.",
    icon: Route
  },
  {
    title: "Aircraft and sim interest",
    description:
      "Interest in aircraft systems, procedural practice, simulation, cockpit workflow, and learning by repetition.",
    icon: Plane
  },
  {
    title: "Aviation systems mindset",
    description:
      "Maintenance background creates respect for procedures, logs, risk controls, and systems thinking.",
    icon: Wrench
  },
  {
    title: "Business aviation direction",
    description:
      "Corporate and business aviation are long-term interests, approached as goals rather than current claims.",
    icon: Building2
  }
];

export default function AviationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Aviation"
        title="A professional aviation goal built on maintenance discipline and steady preparation."
        description="Airex is building toward aviation without claiming licenses or ratings he does not currently have. The focus is readiness, procedures, training, systems thinking, and long-term career growth."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <ClipboardCheck className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">
                Flight training roadmap
              </h2>
              <ol className="mt-6 grid gap-4">
                {roadmap.map((item, index) => (
                  <li key={item} className="flex gap-4">
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

          <div>
            <SectionHeader
              eyebrow="Mindset"
              title="Preparation, systems, and long-term direction."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {aviationSections.map((section) => (
                <SkillCard key={section.title} {...section} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
