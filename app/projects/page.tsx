import { PageIntro } from "@/components/page-intro";
import { ProjectShowcase } from "@/components/project-showcase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projectCategories, projects } from "@/data/projects";

export const metadata = {
  title: "Projects | WertWorks",
  description:
    "WertWorks project showcase across automation, bots, drone/aerial planning, websites, checklist systems, and job search tools.",
  openGraph: {
    title: "WertWorks Projects",
    description:
      "Automation, bots, drone/aerial planning, websites, checklist systems, and job search tooling from Airex Wert."
  }
};

export default function ProjectsPage() {
  const publishedProjects = projects.filter((project) => project.status === "published");

  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="The organized hub for everything WertWorks is building."
        description="Projects are grouped by practical use: Discord bots, automation tools, job-search systems, websites, aviation-inspired systems, and future aerial planning. Case studies only link when they are actually ready."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectCategories.map((category) => {
            const count = publishedProjects.filter(
              (project) => project.category === category
            ).length;

            return (
              <Card key={category} className="bg-card/75">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold">{category}</h2>
                    <Badge variant={count ? "default" : "secondary"}>
                      {count} {count === 1 ? "project" : "projects"}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {getCategoryDescription(category)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10">
          <ProjectShowcase />
        </div>
      </section>
    </>
  );
}

function getCategoryDescription(category: string) {
  switch (category) {
    case "Discord Bots":
      return "Server utilities, reminders, command flows, and Discord automation work.";
    case "Automation Tools":
      return "Small tools that reduce repeated manual work and keep next actions visible.";
    case "Job Search Tools":
      return "Personal dashboards, application tracking, resume workflows, and interview notes.";
    case "Websites":
      return "Portfolio structure, project hubs, forms, site builds, and useful web interfaces.";
    case "Aviation Systems":
      return "Checklist-inspired workflows shaped by aviation and maintenance discipline.";
    case "Aerial Planning":
      return "Future aerial-services roadmap, launch requirements, and planning boundaries.";
    default:
      return "Practical project work and documentation.";
  }
}
