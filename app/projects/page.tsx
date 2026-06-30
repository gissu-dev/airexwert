import { PageIntro } from "@/components/page-intro";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata = {
  title: "Projects | WertWorks",
  description:
    "WertWorks project showcase across automation, bots, drone business planning, aviation systems thinking, websites, and job search tools.",
  openGraph: {
    title: "WertWorks Projects",
    description:
      "Automation, bots, drone planning, aviation concepts, websites, and job search tooling from Airex Wert."
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
