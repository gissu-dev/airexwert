import { PageIntro } from "@/components/page-intro";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Edit Project | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  await requireAdmin();
  const { id } = await params;

  return (
    <>
      <PageIntro
        eyebrow="Admin / Projects"
        title="Edit project."
        description="Update project details, case study content, links, status, and featured placement."
      />
      <section className="section-shell pt-4">
        <ProjectForm projectId={id} />
      </section>
    </>
  );
}
