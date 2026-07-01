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
    <div id="download" className="grid gap-3 sm:grid-cols-3">
      <Button
        asChild
        variant="outline"
        className="h-auto min-h-12 px-4 py-3 text-center text-base leading-5"
      >
        <Link href={profile.resumeDownloadPath} download>
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Download resume
        </Link>
      </Button>
      <Button
        type="button"
        onClick={copySummary}
        className="h-auto min-h-12 px-4 py-3 text-center text-base leading-5"
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Clipboard className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy resume summary"}
      </Button>
      <Button
        asChild
        variant="amber"
        className="h-auto min-h-12 px-4 py-3 text-center text-base leading-5"
      >
        <Link href="/contact">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Contact me
        </Link>
      </Button>
    </div>
  );
}
