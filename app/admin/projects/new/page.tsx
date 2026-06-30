import { PageIntro } from "@/components/page-intro";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata = {
  title: "New Project | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function NewProjectPage() {
  return (
    <>
      <PageIntro
        eyebrow="Admin / Projects"
        title="Add a new project."
        description="Save as draft until the public project card and case study are ready."
      />
      <section className="section-shell pt-4">
        <ProjectForm />
      </section>
    </>
  );
}
