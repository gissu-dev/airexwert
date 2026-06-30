import Link from "next/link";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone
} from "lucide-react";
import { profile, profileEditNotes } from "@/data/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const isPlaceholderEmail = profile.email.endsWith("example.com");

const rows = [
  {
    label: "Location",
    value: profile.location,
    icon: MapPin
  },
  {
    label: "Email",
    value: isPlaceholderEmail ? `Add email in ${profileEditNotes.contactFile}` : profile.email,
    href: isPlaceholderEmail ? undefined : `mailto:${profile.email}`,
    icon: Mail
  },
  {
    label: "Phone",
    value:
      profile.phone === "Add phone number"
        ? `Add phone in ${profileEditNotes.contactFile}`
        : profile.phone,
    href:
      profile.phone === "Add phone number"
        ? undefined
        : `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
    icon: Phone
  },
  {
    label: "Discord",
    value:
      profile.discord === "Add Discord username or invite"
        ? `Add Discord in ${profileEditNotes.contactFile}`
        : profile.discord,
    icon: MessageSquare
  },
  {
    label: "Resume",
    value: profile.resumeDownloadPath,
    href: profile.resumeDownloadPath,
    icon: FileText
  }
];

export function ContactDetails({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="bg-card/75">
      <CardContent className={compact ? "p-5" : "p-6"}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Profile contact</h2>
          <Badge variant="secondary">Public data</Badge>
        </div>
        <div className="mt-5 grid gap-3">
          {rows.map((row) => {
            const Icon = row.icon;
            const content = (
              <span className="flex min-w-0 items-start gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 transition-colors hover:bg-white/[0.055]">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="mt-1 block break-words text-sm text-foreground">
                    {row.value}
                  </span>
                </span>
              </span>
            );

            return row.href ? (
              <Link key={row.label} href={row.href} className="focus-ring rounded-md">
                {content}
              </Link>
            ) : (
              <div key={row.label}>{content}</div>
            );
          })}
        </div>

        {(profile.githubUrl || profile.linkedinUrl) ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.githubUrl ? (
              <Link
                href={profile.githubUrl}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring"
              >
                <Github className="h-4 w-4 text-primary" aria-hidden="true" />
                GitHub
              </Link>
            ) : null}
            {profile.linkedinUrl ? (
              <Link
                href={profile.linkedinUrl}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring"
              >
                <Linkedin className="h-4 w-4 text-primary" aria-hidden="true" />
                LinkedIn
              </Link>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
