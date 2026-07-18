import { PageIntro } from "@/components/page-intro";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata = {
  title: "Projects | WertWorks",
  description:
    "Explore Sky Pals Dispatch, WertWorks automation, bots, websites, checklist systems, field notes, and career projects.",
  openGraph: {
    title: "WertWorks Projects",
    description:
      "Sky Pals Dispatch and practical automation, bot, website, checklist, and job-search projects from Airex Wert."
  }
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Real projects, active builds, and one business taking shape."
        description="Sky Pals Dispatch leads the collection as the flagship pre-launch business. The rest of the archive covers bots, automation, websites, career systems, and aviation-inspired work."
      />

      <section className="section-shell pt-4">
        <ProjectShowcase />
      </section>
    </>
  );
}
