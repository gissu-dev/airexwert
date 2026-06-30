import { PageIntro } from "@/components/page-intro";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata = {
  title: "Edit Project | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <>
      <PageIntro
        eyebrow="Admin / Projects"
        title="Edit project."
        description="Update project details, case study content, links, status, and featured placement."
      />
      <section className="section-shell pt-4">
        <ProjectForm projectId={params.id} />
      </section>
    </>
  );
}
