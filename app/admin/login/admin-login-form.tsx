"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function getSafeNext(value: string | null) {
  if (!value) {
    return "/admin";
  }

  if (value !== "/admin" && !value.startsWith("/admin/")) {
    return "/admin";
  }

  if (value.startsWith("/admin/login")) {
    return "/admin";
  }

  return value;
}

export function AdminLoginForm() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const next = getSafeNext(searchParams.get("next"));
  const notAdmin = searchParams.get("error") === "not-admin";
  const setupMissing = searchParams.get("setup") === "missing";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    window.location.href = next;
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card/75 p-6 shadow-radar">
      <div className="mb-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          WertWorks Admin
        </p>

        <h1 className="mt-2 text-2xl font-semibold">Private dashboard</h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Log in with your Supabase admin account to manage the site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {setupMissing ? (
          <p className="rounded-md border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
            Supabase environment variables are missing.
          </p>
        ) : null}

        {notAdmin ? (
          <p className="rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            This account is not allowed to access the admin dashboard.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
