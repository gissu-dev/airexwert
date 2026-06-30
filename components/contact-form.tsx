"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
  "Job opportunity",
  "Aerial services planning",
  "Automation/bot project",
  "Aviation/networking",
  "General"
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState("");

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
        const message = String(data.get("message") ?? "").trim();
        setStatus("loading");
        window.setTimeout(() => {
          if (message.length < 10) {
            setStatus("error");
            return;
          }
          setStatus("success");
          setReason(reasons[0]);
          setMessage("");
          form.reset();
        }, 450);
      }}
    >
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
          placeholder="Share the opportunity, project, or context."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full sm:w-fit" disabled={status === "loading"}>
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "loading" ? "Preparing" : "Send Message"}
      </Button>
      {status === "success" ? (
        <p
          className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-sm leading-6 text-primary"
          role="status"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Message captured locally for this MVP. Connect this form to Resend,
          Formspree, or a Vercel server action when ready.
        </p>
      ) : null}
      {status === "error" ? (
        <p
          className="flex items-start gap-2 rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm leading-6 text-red-100"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Add a little more context before sending.
        </p>
      ) : null}
    </form>
  );
}
