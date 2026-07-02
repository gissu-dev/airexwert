import { FieldNotesShowcase } from "@/components/field-notes-showcase";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Field Notes",
  description:
    "Field Notes from WertWorks: build logs, website notes, bot development notes, aviation thoughts, automation ideas, career notes, project lessons, tools, and occasional place reflections.",
  openGraph: {
    title: "Field Notes | WertWorks",
    description:
      "A working archive for what Airex Wert is building, learning, testing, and thinking through."
  }
};

export default function FieldNotesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Field Notes"
        title="Field Notes"
        description="A personal build-log and notes archive for what is being built, tested, revised, and learned across WertWorks."
      />

      <FieldNotesShowcase />
    </>
  );
}
