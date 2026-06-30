import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { Button } from "@/components/ui/button";
import { automationIdeas, automationSkills } from "@/data/skills";

export const metadata = {
  title: "Automation and Bots | WertWorks",
  description:
    "WertWorks automation and bot projects covering Discord bots, workflow automation, dashboards, forms, resume tools, job trackers, and website automation.",
  openGraph: {
    title: "Automation and Bots | WertWorks",
    description:
      "Applied automation, bots, dashboards, and workflow tools built around practical problems."
  }
};

export default function AutomationBotsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Automation / Bots"
        title="Small tools that reduce friction and keep the next action visible."
        description="The work here is practical: Discord bots, workflow automation, simple dashboards, form automation, resume and job tools, and website automation for clear operational problems."
      />

      <section className="section-shell pt-4">
        <SectionHeader
          eyebrow="Capabilities"
          title="Services and skills around focused automation."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {automationSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.035]">
        <div className="section-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Automation Ideas I'm Building"
              title="Useful MVPs before bigger systems."
              description="These ideas are intentionally small enough to finish and useful enough to justify expanding."
            />
            <Button asChild variant="outline" className="w-fit">
              <Link href="/job-search">
                Open job tracker
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {automationIdeas.map((idea) => (
              <SkillCard key={idea.title} {...idea} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
