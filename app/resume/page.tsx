import {
  Bot,
  Briefcase,
  ClipboardCheck,
  FileDown,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ContactDetails } from "@/components/contact-details";
import { PageIntro } from "@/components/page-intro";
import { ResumeActions } from "@/components/resume-actions";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";

export const metadata = {
  title: "Resume | Airex Wert",
  description:
    "Download Airex Wert's resume and find contact details, core strengths, and professional focus areas.",
  openGraph: {
    title: "Airex Wert Resume | WertWorks",
    description:
      "Downloadable resume, contact details, core strengths, and professional focus areas for Airex Wert.",
  },
};

const focusAreas = [
  {
    title: "Healthcare support",
    description:
      "Direct support, overnight reliability, clear documentation, calm communication, and safety awareness.",
    icon: Briefcase,
  },
  {
    title: "Operations mindset",
    description:
      "Retail leadership, aviation ground support, Army accountability, and checklist-based follow-through.",
    icon: ClipboardCheck,
  },
  {
    title: "Practical technical work",
    description:
      "Discord bots, project organization, portfolio systems, and small tools built around real workflows.",
    icon: Bot,
  },
];

export default function ResumePage() {
  return (
    <>
      <PageIntro
        eyebrow="Resume"
        title={`Download ${profile.name}'s resume and contact directly.`}
        description="This page keeps the resume itself as a downloadable file instead of showing the full document inline. Use it for the current resume, quick professional context, and direct contact details."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="grid gap-5">
            <Card className="bg-card/75">
              <CardContent className="p-6 sm:p-8">
                <FileDown className="h-9 w-9 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  Resume download
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  The downloadable resume is the source of truth for role history,
                  dates, and detailed experience. This page stays focused on the
                  next action: download the resume, copy the summary, or start a
                  contact thread.
                </p>
                <div className="mt-7">
                  <ResumeActions summary={resume.summary} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 md:grid-cols-3">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <Card key={area.title} className="bg-card/75">
                    <CardContent className="p-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h2 className="mt-4 font-semibold">{area.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {area.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-card/75">
              <CardContent className="p-6">
                <SectionHeader
                  eyebrow="Professional summary"
                  title="Short version before the download."
                  description={resume.summary}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-5">
            <ContactDetails compact />

            <Card className="bg-card/75">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Best next step</h2>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  For role follow-up, send the role title, location, schedule,
                  and whether you want the resume as an attachment or link.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/75">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Core strengths</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resume.skills.slice(0, 10).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/75">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Extra context</h2>
                </div>
                <ul className="mt-4 grid gap-2">
                  {resume.careerGoals.map((goal) => (
                    <li key={goal} className="text-sm leading-6 text-muted-foreground">
                      {goal}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
