"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";

const reasons = [
  "Job opportunity",
  "Automation / bot project",
  "Website project",
  "Job tool idea",
  "Aerial planning conversation",
  "General contact"
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedReason = params.get("reason");
    const requestedMessage = params.get("message");

    if (requestedReason && reasons.includes(requestedReason)) {
      setReason(requestedReason);
    }

    if (requestedMessage) {
      setMessage(requestedMessage);
    }
  }, []);

  return (
    <form
      className="grid gap-5 rounded-lg border border-white/10 bg-card/75 p-5 shadow-2xl shadow-black/20 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const reason = String(data.get("reason") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();

        if (message.length < 10) {
          setStatus("error");
          setMailtoHref("");
          return;
        }

        const subject = `WertWorks contact: ${reason}`;
        const body = [
          `Name: ${name}`,
          `Email: ${email}`,
          `Reason: ${reason}`,
          "",
          message
        ].join("\n");

        setMailtoHref(
          `mailto:${profile.email}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`
        );
        setStatus("ready");
      }}
    >
      <div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Send a message</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This prepares an email draft so you can review everything before it
          sends.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reason">Reason</Label>
        <Select
          id="reason"
          name="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        >
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Share the opportunity, project, planning question, or context."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMailtoHref("");
            }
          }}
          required
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="w-full sm:w-fit">
          <Send className="h-4 w-4" aria-hidden="true" />
          Prepare email
        </Button>
        <p className="text-xs leading-5 text-muted-foreground">
          Opens a draft addressed to {profile.email}.
        </p>
      </div>

      {status === "ready" && mailtoHref ? (
        <p
          className="flex flex-col gap-3 rounded-md border border-primary/20 bg-primary/10 px-3 py-3 text-sm leading-6 text-primary sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <span>Email draft is ready. Review it in your mail app before sending.</span>
          <Button asChild variant="outline" size="sm">
            <a href={mailtoHref}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Open email draft
            </a>
          </Button>
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className="flex items-start gap-2 rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm leading-6 text-red-100"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Add a little more context before preparing the email.
        </p>
      ) : null}
    </form>
  );
}
