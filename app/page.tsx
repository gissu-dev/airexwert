import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { quickStats } from "@/data/site";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata = {
  description:
    "WertWorks is Airex Wert's personal portfolio for automation, websites, bots, job tools, practical technology, and future drone/aerial planning.",
  openGraph: {
    title: "WertWorks | Automation, Websites, Bots & Job Tools",
    description:
      "A practical technical portfolio for automation, websites, bots, job tools, and future aerial planning."
  }
};

export default function HomePage() {
  const publishedProjects = projects.filter((project) => project.status === "published");
  const manuallyFeaturedProjects = publishedProjects.filter(
    (project) => project.featured
  );
  const featuredProjects = (
    manuallyFeaturedProjects.length ? manuallyFeaturedProjects : publishedProjects
  ).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="section-shell">
        <SectionHeader
          eyebrow="Snapshot"
          title={`${profile.brandName} is built around practical tools, useful websites, and automation that solves real problems.`}
          description="The site presents a focused portfolio direction: veteran background, checklist discipline, direct support work, automation projects, job tools, websites, bots, and future aerial planning."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="section-shell">
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
              return (
                <Card key={project.slug} className="bg-card/75">
                  <CardContent className="p-6">
                    <FolderKanban className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.shortDescription || "Add description here."}
                    </p>
                    <Link
                      href={project.caseStudyUrl || `/projects/${project.slug}`}
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
        </div>
      </section>
    </>
  );
}
