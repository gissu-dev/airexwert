import { PageIntro } from "@/components/page-intro";
import { ProjectShowcase } from "@/components/project-showcase";

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
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="A clear project pipeline with problems, solutions, and next steps."
        description="These are practical builds and planning tracks. The goal is not to overstate polish or activity, but to show direction, technical judgment, and steady execution."
      />
      <section className="section-shell pt-4">
        <ProjectShowcase />
      </section>
    </>
  );
}
