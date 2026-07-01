"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

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
  "General contact",
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      reason: String(data.get("reason") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not send message.");
      }

      form.reset();
      setReason(reasons[0]);
      setMessage("");
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not send message.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-white/10 bg-card/75 p-5"
    >
      <div>
        <h2 className="text-xl font-semibold">Send a message</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This goes straight into the private WertWorks contact inbox. You can
          still email directly at {profile.email}.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="reason">Reason</Label>
        <Select
          id="reason"
          name="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        >
          {reasons.map((reasonOption) => (
            <option key={reasonOption} value={reasonOption}>
              {reasonOption}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={message}
          placeholder="Tell me what you need, what page/project this is about, or what kind of opportunity you want to discuss."
          rows={7}
          onChange={(event) => {
            setMessage(event.target.value);

            if (status !== "idle") {
              setStatus("idle");
              setError("");
            }
          }}
          required
        />
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Button
        type="submit"
        className="w-full sm:w-fit"
        disabled={status === "loading"}
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "loading" ? "Sending..." : "Send message"}
      </Button>

      {status === "success" ? (
        <p
          className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-3 text-sm leading-6 text-primary"
          role="status"
        >
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          Message sent. I’ll review it from the private admin side.
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className="flex items-start gap-2 rounded-md border border-red-400/25 bg-red-400/10 px-3 py-3 text-sm leading-6 text-red-100"
          role="alert"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      ) : null}
    </form>
  );
}
