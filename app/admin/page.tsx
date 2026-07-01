import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { Briefcase, FileText, FolderKanban } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Card, CardContent } from "@/components/ui/card";

const adminCards = [
  {
    title: "Projects",
    description: "Add, edit, publish, feature, archive, and delete project records.",
    href: "/admin/projects",
    icon: FolderKanban,
    active: true
  },
  {
    title: "Jobs",
    description: "Private tracker for saved roles, applications, interviews, and follow-ups.",
    href: "/admin/jobs",
    icon: Briefcase,
    active: true
  },
  {
    title: "Site content coming soon",
    description: "Future controls for homepage and page copy.",
    href: "#",
    icon: FileText,
    active: false
  }
];

export const metadata = {
  title: "Admin | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminPage() {
  await requireAdmin();  

return (
    <>
      <PageIntro
        eyebrow="Admin"
        title="Private local dashboard."
        description="Phase 1 uses browser-local project storage so the admin can be functional without Supabase environment variables."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-5 md:grid-cols-3">
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
              <Link key={card.title} href={card.href} className="focus-ring rounded-lg">
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
