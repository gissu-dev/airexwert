import { PageIntro } from "@/components/page-intro";
import { JobForm } from "@/components/admin/job-form";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "New Job | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default async function NewJobPage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Jobs"
        title="Full Add Job."
        description="Capture every field for a private job lead, application, interview, or follow-up."
      />
      <section className="section-shell pt-4">
        <JobForm />
      </section>
    </>
  );
}
