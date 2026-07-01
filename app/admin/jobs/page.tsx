import { JobsAdminDashboard } from "@/components/admin/jobs-admin-dashboard";
import { LogoutButton } from "@/components/admin/logout-button";
import { PageIntro } from "@/components/page-intro";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Jobs | WertWorks",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminJobsPage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Jobs"
        title="Private jobs tracker."
        description="Track saved roles, applications, interviews, follow-ups, next actions, and contacts without showing job data publicly."
      />

      <section className="section-shell pt-0">
        <LogoutButton />
      </section>

      <section className="section-shell pt-4">
        <JobsAdminDashboard />
      </section>
    </>
  );
}