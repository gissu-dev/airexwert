import { Mail, Send } from "lucide-react";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Contact WertWorks",
  description:
    "Contact WertWorks and Airex Wert about job opportunities, drone services planning, automation or bot projects, aviation networking, and applied technology work.",
  openGraph: {
    title: "Contact WertWorks",
    description:
      "Start a professional conversation with Airex Wert about aviation, automation, drones, or applied technology."
  }
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={`Start a focused conversation with ${profile.name}.`}
        description="Use this form for job opportunities, drone service conversations, automation and bot projects, aviation networking, or general contact. The form is ready to connect to Resend, Formspree, or a Vercel server action later."
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
                Ready for job, aviation, drone, and automation conversations.
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
