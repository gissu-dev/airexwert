import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "WertWorks | Practical Systems, Bots, Websites & Automation",
    template: "%s | WertWorks"
  },
  description:
    "WertWorks is the personal project hub of Airex Wert, a NEPA-based Army veteran building automation tools, Discord bots, websites, aviation-inspired workflows, field notes, and future aerial planning.",
  keywords: [
    "WertWorks",
    "Airex Wert",
    "Northeastern Pennsylvania",
    "Wilkes-Barre",
    "practical technology",
    "aerial planning",
    "automation",
    "Discord bots",
    "websites",
    "field notes",
    "Army veteran"
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: "WertWorks | Practical Systems, Bots, Websites & Automation",
    description:
      "Automation tools, Discord bots, websites, field notes, aviation-inspired workflows, and future aerial planning from Airex Wert.",
    url: profile.siteUrl,
    siteName: profile.brandName,
    images: [
      {
        url: "/images/wertworks-og.svg",
        width: 1200,
        height: 630,
        alt: "WertWorks automation radar and practical tech interface"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WertWorks | Practical Systems, Bots, Websites & Automation",
    description:
      "Automation tools, Discord bots, websites, field notes, aviation-inspired workflows, and future aerial planning from Airex Wert.",
    images: ["/images/wertworks-og.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen overflow-hidden bg-background">
          <div className="pointer-events-none fixed inset-0 -z-10 radar-grid opacity-40" />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(31,214,154,0.16),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.12),transparent_24%),linear-gradient(180deg,rgba(7,13,24,0.25),rgba(7,13,24,1))]" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
