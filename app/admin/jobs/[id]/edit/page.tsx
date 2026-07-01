import { PageIntro } from "@/components/page-intro";
import { JobForm } from "@/components/admin/job-form";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Edit Job | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

type EditJobPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  await requireAdmin();
  const { id } = await params;

  return (
    <>
      <PageIntro
        eyebrow="Admin / Jobs"
        title="Edit job."
        description="Update status, priority, dates, next action, contacts, resume used, notes, and job link."
      />
      <section className="section-shell pt-4">
        <JobForm jobId={id} />
      </section>
    </>
  );
}
