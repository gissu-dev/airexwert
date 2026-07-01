import { FieldNoteForm } from "@/components/admin/field-note-form";
import { PageIntro } from "@/components/page-intro";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Field Note | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default async function EditFieldNotePage({
  params
}: {
  params: { id: string };
}) {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Field Notes"
        title="Edit field note."
        description="Update the category, status, excerpt, content, tags, and publish details for this field note."
      />
      <section className="section-shell pt-4">
        <FieldNoteForm fieldNoteId={params.id} />
      </section>
    </>
  );
}
