import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Radar } from "lucide-react";
import { siteConfig } from "@/data/site";
import { profile, profileEditNotes } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Radar className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>{profile.brandName}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            {profile.tagline} Personal portfolio and project hub for{" "}
            {profile.name}.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            {siteConfig.location}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <div className="mt-4 grid gap-2 text-sm">
            {siteConfig.nav.slice(1, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Next step</h2>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Contact {profile.name}{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
            {profile.email.endsWith("example.com") ? (
              <span className="inline-flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Add email in {profileEditNotes.contactFile}
              </span>
            ) : (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {profile.email}
              </a>
            )}
            {profile.githubUrl ? (
              <a
                href={profile.githubUrl}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                GitHub
              </a>
            ) : null}
            {profile.linkedinUrl ? (
              <a
                href={profile.linkedinUrl}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Linkedin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                LinkedIn
              </a>
            ) : null}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Aerial services are in development; future capabilities depend on
            equipment, licensing, location, insurance, and project requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}
