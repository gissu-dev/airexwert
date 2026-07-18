import { CheckCircle2, Mail, Send } from "lucide-react";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact WertWorks",
  description:
    "Contact WertWorks and Airex Wert about job opportunities, aerial services planning, automation, bot projects, websites, and applied technology work.",
  openGraph: {
    title: "Contact WertWorks",
    description:
      "Start a professional conversation with Airex Wert about automation, websites, bots, aerial planning, or applied technology."
  }
};

export default function ContactPage() {
  const contactTopics = [
    "Job opportunities",
    "Bot projects",
    "Website work",
    "Aerial planning"
  ];

  const contextTips = [
    "What you are reaching out about.",
    "Any role, project, timeline, or location details.",
    "The best next step after the message."
  ];

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={`Contact ${profile.name}.`}
        description="Use this page for job opportunities, bot and automation projects, website work, aerial planning, or general follow-up."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-5">
            <Card className="bg-card/75">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold">
                  Professional contact
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Clear context helps move faster. A short message with the
                  reason, timing, and best next step is enough to start.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {contactTopics.map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <ContactDetails compact />

            <Card className="bg-card/75">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Helpful context</h2>
                </div>
                <ul className="mt-4 grid gap-3">
                  {contextTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
