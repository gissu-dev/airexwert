import Link from "next/link";
import { ArrowRight, Bot, Briefcase, Plane, Radar } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { focusAreas, quickStats } from "@/data/site";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata = {
  description:
    "WertWorks is Airex Wert's personal site for automation, aviation goals, drone operations planning, bots, job tools, and practical applied technology projects.",
  openGraph: {
    title: "WertWorks | Automation, Aviation & Applied Tech",
    description:
      "A serious technical portfolio for aviation-minded automation, drones, and applied technology."
  }
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="section-shell">
        <SectionHeader
          eyebrow="Core signals"
          title={`${profile.brandName} is built around aviation discipline, service experience, and useful technology.`}
          description="The site presents a real career direction: veteran background, aviation maintenance mindset, direct support work, drone operations planning, and automation projects."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.035]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Direction"
            title="A practical portfolio for aviation, drones, automation, and career growth."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {focusAreas.map((area) => (
              <SkillCard key={area.title} {...area} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Current builds"
            title="Projects with useful next steps."
            description="No fake client logos or inflated claims. Each project card states the problem, solution, tech, status, and what comes next."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/projects">
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Card key={project.slug} className="bg-card/75">
                <CardContent className="p-6">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {project.solution}
                  </p>
                  <Link
                    href={`/projects#${project.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    View case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="section-shell">
          <div className="grid gap-5 lg:grid-cols-4">
            {[
              {
                title: "Aviation",
                text: "Flight training roadmap, aircraft and sim interest, systems mindset, and long-term corporate/business aviation direction.",
                href: "/aviation",
                icon: Plane
              },
              {
                title: "Aerial planning",
                text: "Keystone Aerial concept development with roadmap, equipment planning, licensing boundaries, and local NEPA use-case research.",
                href: "/drone-services",
                icon: Radar
              },
              {
                title: "Automation",
                text: "Bots, dashboards, forms, resume tools, job workflows, and local service intake ideas.",
                href: "/automation-bots",
                icon: Bot
              },
              {
                title: "Resume",
                text: "Structured employer-facing resume content built from local data for easy updates.",
                href: "/resume",
                icon: Briefcase
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.075]"
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open section
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
