import { Bot, Briefcase, Globe2, Mail, Radar, Send, Wrench } from "lucide-react";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact WertWorks",
  description:
    "Contact WertWorks and Airex Wert about job opportunities, aerial services planning, automation, bot projects, websites, job tools, and applied technology work.",
  openGraph: {
    title: "Contact WertWorks",
    description:
      "Start a professional conversation with Airex Wert about automation, websites, bots, job tools, aerial planning, or applied technology."
  }
};

export default function ContactPage() {
  const contactReasons = [
    {
      title: "Job opportunity",
      description: "Roles, interviews, employer questions, and resume follow-up.",
      icon: Briefcase
    },
    {
      title: "Automation / bot project",
      description: "Discord bots, reminders, workflow tools, and small automations.",
      icon: Bot
    },
    {
      title: "Website project",
      description: "Portfolio pages, site structure, forms, and practical web builds.",
      icon: Globe2
    },
    {
      title: "Job tool idea",
      description: "Application tracking, resume workflow, interview notes, or follow-up systems.",
      icon: Wrench
    },
    {
      title: "Aerial planning conversation",
      description: "Future aerial-services planning, launch roadmap, and responsible boundaries.",
      icon: Radar
    }
  ];

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={`Start a focused conversation with ${profile.name}.`}
        description="Use this page for job opportunities, automation and bot projects, website work, job tool ideas, aerial planning conversations, or general contact. The form prepares an email draft while the backend connection is pending."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-5">
            <Card className="bg-card/75">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold">
                  Professional contact
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Clear context helps move faster. Include the role, project,
                  location, timing, budget range if relevant, and the best next
                  action.
                </p>
              </CardContent>
            </Card>
            <ContactDetails compact />
            <Card className="bg-card/75">
              <CardContent className="flex items-start gap-3 p-5 text-sm text-muted-foreground">
                <Send className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Best fit: job opportunities, websites, bots, job tools,
                automation, and aerial planning conversations.
              </CardContent>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactReasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <Card key={reason.title} className="bg-card/75">
                    <CardContent className="p-4">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h2 className="mt-3 text-sm font-semibold">{reason.title}</h2>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {reason.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
