import Link from "next/link";
import { Briefcase, FileText, FolderKanban, NotebookText } from "lucide-react";

import { LogoutButton } from "@/components/admin/logout-button";
import { PageIntro } from "@/components/page-intro";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin-auth";

const adminCards = [
  {
    title: "Projects",
    description: "Add, edit, publish, feature, archive, and delete project records.",
    href: "/admin/projects",
    icon: FolderKanban,
    active: true,
  },
  {
    title: "Jobs",
    description: "Private tracker for saved roles, applications, interviews, and follow-ups.",
    href: "/admin/jobs",
    icon: Briefcase,
    active: true,
  },
  {
    title: "Field Notes",
    description: "Write, draft, publish, archive, and delete Field Notes entries.",
    href: "/admin/field-notes",
    icon: NotebookText,
    active: true,
  },
  {
    title: "Site content coming soon",
    description: "Future controls for homepage and page copy.",
    href: "#",
    icon: FileText,
    active: false,
  },
];

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | WertWorks",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  await requireAdmin();

  return (
    <>
      <PageIntro
        eyebrow="Admin"
        title="Private WertWorks dashboard."
        description="Manage private site tools, project records, job tracking, and future admin-only content."
      />

      <section className="section-shell pt-0">
        <LogoutButton />
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {adminCards.map((card) => {
            const Icon = card.icon;

            const content = (
              <Card className="h-full bg-card/75 hover:border-primary/25">
                <CardContent className="p-6">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  <h2 className="mt-5 text-lg font-semibold">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );

            return card.active ? (
              <Link
                key={card.title}
                href={card.href}
                className="focus-ring rounded-lg"
              >
                {content}
              </Link>
            ) : (
              <div key={card.title} className="opacity-70">
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
