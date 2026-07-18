import { PageIntro } from "@/components/page-intro";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata = {
  title: "Projects | WertWorks",
  description:
    "Explore Sky Pals Dispatch, WertWorks automation, bots, websites, checklist systems, and field notes.",
  openGraph: {
    title: "WertWorks Projects",
    description:
      "Sky Pals Dispatch and practical automation, bot, website, and checklist projects from Airex Wert."
  }
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Real projects, active builds, and one business taking shape."
        description="Sky Pals Dispatch leads the collection as the flagship pre-launch business. The rest of the archive covers bots, automation, websites, and aviation-inspired work."
      />

      <section className="section-shell pt-4">
        <ProjectShowcase />
      </section>
    </>
  );
}
