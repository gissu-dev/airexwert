import { FieldNoteForm } from "@/components/admin/field-note-form";
import { PageIntro } from "@/components/page-intro";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New Field Note | WertWorks Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default async function NewFieldNotePage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin / Field Notes"
        title="Add a new field note."
        description="Save as draft while writing, then publish when the note is ready for the public archive."
      />
      <section className="section-shell pt-4">
        <FieldNoteForm />
      </section>
    </>
  );
}
