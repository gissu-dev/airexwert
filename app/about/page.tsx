import { Bot, Briefcase, Globe2, Radar, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Timeline } from "@/components/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { timeline, values } from "@/data/timeline";

export const metadata = {
  title: "About / Background",
  description:
    "About WertWorks and Airex Wert: Army aviation maintenance background, direct support experience, automation projects, websites, bots, job tools, and future aerial planning.",
  openGraph: {
    title: "About / Background | WertWorks",
    description:
      "The background behind WertWorks: checklist discipline, service experience, practical technology, and useful project work."
  }
};

const backgroundHighlights = [
  {
    title: "Automation and bots",
    description:
      "Small tools, Discord bots, workflow helpers, and dashboards that reduce repeated manual work.",
    icon: Bot
  },
  {
    title: "Websites and forms",
    description:
      "Clean portfolio, local business, intake, and project pages with direct messaging and deploy-ready structure.",
    icon: Globe2
  },
  {
    title: "Job tools",
    description:
      "Trackers, resume tooling, application organizers, and career systems built around real search friction.",
    icon: Briefcase
  },
  {
    title: "Future aerial planning",
    description:
      "Drone/aerial planning is treated as a future capability with responsible launch requirements and clear boundaries.",
    icon: Radar
  }
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About / Background"
        title={`${profile.brandName} is a practical portfolio for automation, useful tech, websites, bots, job tools, and future aerial planning.`}
        description={`${profile.name} is based in Northeastern Pennsylvania near the Wilkes-Barre area. His Army aviation maintenance background supports the story through checklist discipline, systems thinking, and accountability, while the site itself focuses on practical technology work.`}
      />

      <section className="section-shell pt-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Background and operating style</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  WertWorks is centered on building practical things: automation
                  tools, bots, websites, job-search systems, and future aerial
                  planning workflows. Airex&apos;s Army aviation maintenance
                  background sits underneath that work as a mindset, not a
                  separate headline: procedures matter, accountability matters,
                  and small misses can become larger problems if ignored.
                </p>
                <p>
                  His current mental health and direct support experience adds a
                  human layer to that technical mindset. It requires patience,
                  steady communication, and reliability in environments where
                  people need consistency more than flash.
                </p>
                <p>
                  The direction is clear: keep building useful software,
                  websites, automation, bots, and career tools while planning
                  future drone/aerial work carefully enough that the boundaries,
                  requirements, and responsibilities are visible.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Timeline"
              title="How the background turns into the current build direction."
            />
            <div className="mt-8">
              <Timeline items={timeline} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {backgroundHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="bg-card/75">
                <CardContent className="p-5">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.035]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Values"
            title="The operating habits behind the work."
            description="These values are intentionally plain. They are the difference between a nice-looking portfolio and a person you can trust with a real task."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <Card key={value.title} className="bg-card/75">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
