import Link from "next/link";
import { ArrowRight, Briefcase, FolderOpen, Mail } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildAreas,
  currentStatusGroups,
  featureRoutes,
  quickStats
} from "@/data/site";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata = {
  description:
    "WertWorks is Airex Wert's personal hub for automation tools, Discord bots, websites, field notes, career systems, aviation-inspired workflows, and future aerial planning.",
  openGraph: {
    title: "WertWorks | Practical Systems, Bots, Websites & Automation",
    description:
      "A practical project hub for automation tools, Discord bots, websites, field notes, career systems, and future aerial planning."
  }
};

export default function HomePage() {
  const publishedProjects = projects.filter((project) => project.status === "published");
  const featuredProjects = publishedProjects
    .filter(
      (project) =>
        project.featured &&
        project.id !== "keystone-aerial-services-aerial-planning"
    )
    .slice(0, 3);
  const flagshipProject = publishedProjects.find(
    (project) => project.id === "keystone-aerial-services-aerial-planning"
  );

  return (
    <>
      <Hero />

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Feature routing"
            title="Start with the route that matches why you are here."
            description="WertWorks has several active and developing tracks. This section keeps the about page, projects, field notes, resume, and contact routes easy to scan."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/projects">
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {featureRoutes.map((route) => {
            const Icon = route.icon;

            return (
              <Card key={route.title} className="group bg-card/75">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.08] text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{route.title}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase leading-5 text-primary/90">
                    For {route.audience}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {route.description}
                  </p>
                  <div className="mt-5 grid gap-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={route.primaryHref}>
                        {route.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Link
                      href={route.secondaryHref}
                      className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Related route
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="What I'm building"
            title="A cleaner project hub for practical systems."
            description="The work is grouped by use: bots, websites, career systems, aviation-inspired workflows, and future aerial planning."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {buildAreas.map((area) => {
              const Icon = area.icon;

              return (
                <Link key={area.title} href={area.href} className="focus-ring rounded-lg">
                  <Card className="group h-full bg-card/75 hover:border-primary/20">
                    <CardContent className="p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-semibold">{area.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {area.description}
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
          eyebrow="Snapshot"
          title={`${profile.brandName} connects background, projects, tools, and future planning into one system.`}
          description="The site is not officially launched yet. These signals explain the direction without turning in-development work into fake launch claims."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title} className="group h-full bg-card/75 hover:border-primary/20">
                <CardContent className="p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="section-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Flagship and featured work"
              title="A real business in development, supported by practical project work."
              description="Sky Pals Dispatch is the primary build. Other featured projects show the tools, systems, and technical work supporting the broader direction."
            />
            <Button asChild variant="outline" className="w-fit">
              <Link href="/projects">
                Open project hub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {flagshipProject ? (
            <div className="mt-10">
              <FeaturedProjectCard project={flagshipProject} />
            </div>
          ) : null}

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Current status"
          title="Active work, in-progress pieces, and future planning are separated."
          description="This keeps the site useful without making the aerial side or unfinished tools sound more complete than they are."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {currentStatusGroups.map((group) => (
            <Card key={group.label} className="bg-card/75">
              <CardContent className="p-6">
                <Badge variant={group.label === "Future" ? "amber" : "default"}>
                  {group.label}
                </Badge>
                <ul className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <Card className="bg-card/75">
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="secondary">Next step</Badge>
                <h2 className="mt-4 text-3xl font-semibold">
                  Choose the most useful next route.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Review the project hub, read the employer-facing resume, or
                  start a focused conversation about a role, tool, website, bot,
                  or aerial planning question.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild>
                  <Link href="/projects">
                    <FolderOpen className="h-4 w-4" aria-hidden="true" />
                    View my work
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/resume">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                    Read my resume
                  </Link>
                </Button>
                <Button asChild variant="amber">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Start a conversation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
