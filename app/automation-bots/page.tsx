import Link from "next/link";
import { ArrowRight, Bot, ClipboardList, FileText, Wrench } from "lucide-react";
import type { Project } from "@/data/projects";
import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { automationIdeas, automationSkills } from "@/data/skills";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Automation & Bots | WertWorks",
  description:
    "WertWorks automation and bot projects covering Discord bots, reminders, form organization, tracking, and website tools.",
  openGraph: {
    title: "Automation & Bots | WertWorks",
    description:
      "Practical Discord bots and workflow automations built around clear daily problems."
  }
};

const botProjectSlugs = ["kith-wave-bot", "kith-bot", "clocktower"];

const automationSystemTracks = [
  {
    title: "Form organization",
    description:
      "Structured intake ideas for websites, planning conversations, and future aerial workflows.",
    href: "/contact",
    icon: FileText
  },
  {
    title: "Reminders / tracking",
    description:
      "Recurring prompts, scheduled checks, and clear next-action tracking for repeated work.",
    href: "/projects#clocktower",
    icon: ClipboardList
  },
  {
    title: "Website tools",
    description:
      "Reusable content sections, contact paths, project data, and deployment-ready site foundations.",
    href: "/projects#website-builds",
    icon: Wrench
  }
];

export default function AutomationBotsPage() {
  const botProjects = botProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean) as Project[];
  const automationProjects = projects.filter(
    (project) =>
      project.status === "published" && project.category === "Automation Tools"
  );

  return (
    <>
      <PageIntro
        eyebrow="Automation & Bots"
        title="Small useful tools, Discord bots, and workflow automation."
        description="This page focuses on practical bots and automation systems: Discord utilities, reminders, form organization, tracking, and website tools."
      />

      <section className="section-shell pt-4">
        <SectionHeader
          eyebrow="Discord bot projects"
          title="Bot work with current status and next improvements."
          description="Details are kept honest. Where a command list or setup note is not finished yet, the card says so instead of inventing polish."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {botProjects.map((project) => (
            <BotProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Automation systems"
              title="Workflow ideas that support the project hub."
              description="These are practical automation directions rather than abstract service claims."
            />
            <Button asChild variant="outline" className="w-fit">
              <Link href="/projects">
                View project hub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {automationSystemTracks.map((track) => {
              const Icon = track.icon;

              return (
                <Link key={track.title} href={track.href} className="focus-ring rounded-lg">
                  <Card className="group h-full bg-card/75 hover:border-primary/20">
                    <CardContent className="p-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 className="mt-4 font-semibold">{track.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {track.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
          <SectionHeader
            eyebrow="Capabilities"
            title="Reusable automation capabilities."
            description="These are the skill areas that connect the bot projects, workflow automation, and website work."
          />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {automationSkills.map((skill) => {
            const Icon = skill.icon;

            return (
              <Card key={skill.title} className="bg-card/75">
                <CardContent className="p-5">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-semibold">{skill.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Automation ideas"
            title="Useful MVPs before bigger systems."
            description="These ideas are intentionally small enough to finish and useful enough to justify expanding."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {automationIdeas.map((idea) => {
              const Icon = idea.icon;

              return (
                <Card key={idea.title} className="bg-card/75">
                  <CardContent className="p-5">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold">{idea.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {idea.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {automationProjects.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {automationProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function BotProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group bg-card/75">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <Badge variant={project.stage === "Future planning" ? "amber" : "default"}>
            {project.stage}
          </Badge>
        </div>
        <h2 className="mt-5 text-lg font-semibold">{project.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {project.shortDescription || "Details to be added."}
        </p>

        <div className="mt-5">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Commands / features
          </div>
          <ul className="mt-2 grid gap-2">
            {(project.features.length ? project.features : ["Details to be added."])
              .slice(0, 4)
              .map((feature) => (
                <li key={feature} className="text-sm leading-6 text-foreground/[0.86]">
                  {feature}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-5">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Tech used
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(project.techUsed.length ? project.techUsed : ["Details to be added."]).map(
              (tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Next improvement
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {project.nextStep || "Details to be added."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
