import { PageIntro } from "@/components/page-intro";
import { ProjectsAdminList } from "@/components/admin/projects-admin-list";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Projects | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminProjectsPage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Projects"
        title="Manage project records."
        description="Create public case studies, keep drafts hidden, and archive old work without editing source files."
      />
      <section className="section-shell pt-4">
        <ProjectsAdminList />
      </section>
    </>
  );
}
