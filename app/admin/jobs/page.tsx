import { PageIntro } from "@/components/page-intro";
import { JobsAdminDashboard } from "@/components/admin/jobs-admin-dashboard";

export const metadata = {
  title: "Admin Jobs | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminJobsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Admin / Jobs"
        title="Private jobs tracker."
        description="Track saved roles, applications, interviews, follow-ups, next actions, and contacts without showing job data publicly."
      />
      <section className="section-shell pt-4">
        <JobsAdminDashboard />
      </section>
    </>
  );
}
