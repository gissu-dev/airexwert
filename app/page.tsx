import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          eyebrow="Snapshot"
          title={`${profile.brandName} is built around aviation discipline, service experience, and useful technology.`}
          description="The site presents a real career direction: veteran background, aviation maintenance mindset, direct support work, drone operations planning, and automation projects."
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
        </div>
      </section>
    </>
  );
}
