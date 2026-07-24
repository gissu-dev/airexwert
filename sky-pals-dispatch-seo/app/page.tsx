import type { Metadata } from "next";
import { ArrowDown, HeartHandshake, MessageCircle, Route, ShieldCheck } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { featureCards } from "@/data/services";
import { processSteps } from "@/data/site";

const homepageTitle =
  "Drone Services in Wilkes-Barre & Scranton, PA | Sky Pals Dispatch";
const homepageDescription =
  "FAA Part 107 drone photography, roof documentation, inspections, mapping, and aerial imagery across Wilkes-Barre, Scranton, and Northeastern Pennsylvania.";

export const metadata: Metadata = {
  title: {
    absolute: homepageTitle,
  },
  description: homepageDescription,
  alternates: {
    canonical: "https://skypalsdispatch.com/",
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "https://skypalsdispatch.com/",
    siteName: "Sky Pals Dispatch",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1254,
        height: 1254,
        alt: "Official Sky Pals Dispatch logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sky Pals Dispatch",
  alternateName: "Sky Pals",
  url: "https://skypalsdispatch.com",
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sky Pals Dispatch",
  url: "https://skypalsdispatch.com",
  logo: "https://skypalsdispatch.com/brand/sky-pals-dispatch-logo.png",
};

const reasons = [
  { icon: HeartHandshake, title: "Human communication", body: "Plain language and a real conversation before technical details." },
  { icon: Route, title: "Purposeful planning", body: "A defined question, sensible scope, and useful output for each project." },
  { icon: ShieldCheck, title: "Capability with care", body: "Responsible planning, clear expectations, and no inflated promises." },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <Hero />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            align="center"
            eyebrow="Aerial services"
            title="Big views. Useful answers."
            description="Sky Pals provides practical aerial imagery and documentation for properties, project teams, inspections, and site-planning needs. Every service starts with the outcome you need—not a flight for flight’s sake."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              tone="dark"
              eyebrow="Why Sky Pals"
              title="Friendly by nature. Focused on useful work."
              description="Skypals Dispatch combines a memorable public-facing brand with a straightforward service approach: understand the goal, plan responsibly, and provide aerial material people can actually use."
            />
            <div className="mt-8 grid gap-4">
              {reasons.map(({ icon: Icon, title, body }) => (
                <article key={title} className="flex gap-4 rounded-2xl bg-white/10 p-5">
                  <Icon className="h-6 w-6 shrink-0 text-sunbeam" />
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-7 text-ink sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.24em] text-slateblue">How a project moves forward</p>
            <div className="mt-7 grid gap-0">
              {processSteps.map((step, index) => (
                <div key={step.title} className="grid grid-cols-[42px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sunbeam text-sm font-black">{index + 1}</span>
                    {index < processSteps.length - 1 && <span className="h-full w-px bg-sky-200" />}
                  </div>
                  <div className="pb-7">
                    <h3 className="font-black">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <MessageCircle className="mx-auto h-9 w-9 text-coral" />
          <SectionHeader
            align="center"
            eyebrow="Start with the view you need"
            title="Tell us what a better view would help you see."
            description="Share the property, site, inspection question, or project goal. Sky Pals will use that context to shape the right aerial service and a clear next step."
          />
          <ArrowDown className="mx-auto mt-7 h-6 w-6 text-slateblue" aria-hidden="true" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
