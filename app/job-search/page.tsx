import { PageIntro } from "@/components/page-intro";
import { JobDashboard } from "@/components/job-dashboard/job-dashboard";

export const metadata = {
  title: "Job Search Dashboard | WertWorks",
  description:
    "Local-only WertWorks job search dashboard for tracking companies, roles, statuses, notes, application dates, follow-ups, and CSV export without scraping or auto-apply.",
  openGraph: {
    title: "Job Search Dashboard | WertWorks",
    description:
      "A private-feeling local tracker for job leads, applications, interviews, and follow-ups."
  }
};

export default function JobSearchPage() {
  return (
    <>
      <PageIntro
        eyebrow="Job Search Dashboard"
        title="A private-feeling tracker for job leads, applications, interviews, and follow-ups."
        description="This MVP stores data in your browser with LocalStorage. It does not scrape Indeed or LinkedIn and it does not auto-apply. The structure is ready for authentication and cloud sync later."
      />
      <section className="section-shell pt-4">
        <JobDashboard />
      </section>
    </>
  );
}
