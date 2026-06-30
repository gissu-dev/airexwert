import { Briefcase, Medal, Target } from "lucide-react";
import { ContactDetails } from "@/components/contact-details";
import { PageIntro } from "@/components/page-intro";
import { ResumeActions } from "@/components/resume-actions";
import { ResumeSection } from "@/components/resume-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { profile, profileEditNotes } from "@/data/profile";
import { resume } from "@/data/resume";

export const metadata = {
  title: "Resume | Airex Wert",
  description:
    "Employer-friendly resume for Airex Wert covering direct support experience, Army aviation maintenance background, technical skills, projects, and career direction.",
  openGraph: {
    title: "Airex Wert Resume | WertWorks",
    description:
      "Professional summary, experience, military aviation maintenance background, skills, and project direction."
  }
};

export default function ResumePage() {
  return (
    <>
      <PageIntro
        eyebrow="Resume"
        title={`${profile.name} - professional summary and career direction.`}
        description="Employer-facing resume content covering direct support work, Army aviation maintenance background, practical technology projects, and aviation-oriented career growth without overstated claims."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-5">
            <Card className="bg-card/75">
              <CardContent className="p-6">
                <Briefcase
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                />
                <h2 className="mt-5 text-2xl font-semibold">
                  Professional Summary
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {resume.summary}
                </p>
                <div className="mt-6">
                  <ResumeActions summary={resume.summary} />
                </div>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  Add the final resume PDF at{" "}
                  <span className="font-semibold text-foreground">
                    {profileEditNotes.resumeFile}
                  </span>{" "}
                  to enable the download button.
                </p>
              </CardContent>
            </Card>

            <ContactDetails compact />

            <ResumeSection title="Technical skills">
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </ResumeSection>
          </div>

          <div className="grid gap-5">
            <ResumeSection title="Experience">
              <div className="grid gap-6">
                {resume.experience.map((item) => (
                  <article key={item.role}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{item.role}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.organization}
                        </p>
                      </div>
                      <Badge variant="secondary">{item.timeframe}</Badge>
                    </div>
                    <ul className="mt-4 grid gap-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm leading-6 text-muted-foreground"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Military / aviation maintenance background">
              <div className="flex gap-4">
                <Medal className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <ul className="grid gap-2">
                  {resume.military.map((item) => (
                    <li key={item} className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ul className="grid gap-2">
                {resume.projects.map((project) => (
                  <li key={project} className="text-sm leading-6 text-muted-foreground">
                    {project}
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Career direction">
              <div className="flex gap-4">
                <Target className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                <ul className="grid gap-2">
                  {resume.careerGoals.map((goal) => (
                    <li key={goal} className="text-sm leading-6 text-muted-foreground">
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </ResumeSection>
          </div>
        </div>
      </section>
    </>
  );
}
