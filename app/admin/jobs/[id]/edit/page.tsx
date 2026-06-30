import { PageIntro } from "@/components/page-intro";
import { JobForm } from "@/components/admin/job-form";

export const metadata = {
  title: "Edit Job | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function EditJobPage({ params }: { params: { id: string } }) {
  return (
    <>
      <PageIntro
        eyebrow="Admin / Jobs"
        title="Edit job."
        description="Update status, priority, dates, next action, contacts, resume used, notes, and job link."
      />
      <section className="section-shell pt-4">
        <JobForm jobId={params.id} />
      </section>
    </>
  );
}
