import { ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Timeline } from "@/components/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { timeline, values } from "@/data/timeline";

export const metadata = {
  title: "About WertWorks",
  description:
    "About WertWorks and Airex Wert: Army aviation maintenance background, direct support experience, technical projects, and a practical path toward aviation, drones, and automation.",
  openGraph: {
    title: "About WertWorks",
    description:
      "The professional story behind WertWorks: aviation discipline, direct support work, and applied technology projects."
  }
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title={`${profile.brandName} is the project hub for a practical builder with aviation discipline and a service mindset.`}
        description={`${profile.name} is based in Northeastern Pennsylvania near the Wilkes-Barre area. His path combines U.S. Army aviation maintenance background, current direct support and mental health work, and a growing body of technology projects focused on drones, automation, bots, and career systems.`}
      />

      <section className="section-shell pt-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Professional story</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Airex brings a grounded mix of military aviation exposure,
                  people-focused work, and hands-on technical learning. The Army
                  aviation maintenance background shaped how he thinks about
                  systems: procedures matter, accountability matters, and small
                  misses can become larger problems if they are ignored.
                </p>
                <p>
                  His current mental health and direct support experience adds a
                  human layer to that technical mindset. It requires patience,
                  steady communication, and reliability in environments where
                  people need consistency more than flash.
                </p>
                <p>
                  The long-term direction is clear: build toward professional
                  aviation, responsible drone services, automation tools, bots,
                  and practical technology projects that help people operate
                  with more clarity.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Timeline"
              title="The path so far, and the direction ahead."
            />
            <div className="mt-8">
              <Timeline items={timeline} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.035]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Values"
            title="The operating habits behind the work."
            description="These values are intentionally plain. They are the difference between a nice-looking portfolio and a person you can trust with a real task."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <Card key={value.title} className="bg-card/75">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
