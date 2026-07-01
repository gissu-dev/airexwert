import { FieldNotesAdminList } from "@/components/admin/field-notes-admin-list";
import { LogoutButton } from "@/components/admin/logout-button";
import { PageIntro } from "@/components/page-intro";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Field Notes | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminFieldNotesPage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Field Notes"
        title="Manage Field Notes."
        description="Write drafts, publish build logs, and keep personal notes organized without editing source files."
      />

      <section className="section-shell pt-0">
        <LogoutButton />
      </section>

      <section className="section-shell pt-4">
        <FieldNotesAdminList />
      </section>
    </>
  );
}
