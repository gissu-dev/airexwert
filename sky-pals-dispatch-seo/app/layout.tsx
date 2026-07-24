import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { siteConfig } from "@/data/site";

const homepageTitle =
  "Drone Services in Wilkes-Barre & Scranton, PA | Sky Pals Dispatch";
const homepageDescription =
  "FAA Part 107 drone photography, roof documentation, inspections, mapping, and aerial imagery across Wilkes-Barre, Scranton, and Northeastern Pennsylvania.";

export const metadata: Metadata = {
  metadataBase: new URL("https://skypalsdispatch.com"),
  applicationName: "Sky Pals Dispatch",
  title: {
    default: homepageTitle,
    template: "%s | Sky Pals Dispatch",
  },
  description: homepageDescription,
  keywords: siteConfig.seoKeywords,
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    type: "website",
    locale: "en_US",
    siteName: "Sky Pals Dispatch",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="focus-ring fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-bold text-white transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
