"use client";

import Link from "next/link";
import { Check, Clipboard, FileDown, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function ResumeActions({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div id="download" className="flex flex-col gap-3 sm:flex-row">
      <Button asChild variant="outline">
        <Link href={profile.resumeDownloadPath} download>
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Download Resume
        </Link>
      </Button>
      <Button type="button" onClick={copySummary}>
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Clipboard className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy resume summary"}
      </Button>
      <Button asChild variant="amber">
        <Link href="/contact">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Contact me
        </Link>
      </Button>
    </div>
  );
}
