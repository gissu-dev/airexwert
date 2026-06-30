"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import {
  jobPriorities,
  jobPriorityLabels,
  jobStatusLabels,
  jobStatuses,
  type Job
} from "@/data/jobs";
import { createEmptyJob, findJobById, saveJob } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type JobFormProps = {
  jobId?: string;
};

export function JobForm({ jobId }: JobFormProps) {
  const router = useRouter();
  const [job, setJob] = useState<Job>(() => createEmptyJob());
  const [loaded, setLoaded] = useState(!jobId);
  const [notFound, setNotFound] = useState(false);

  const mode = jobId ? "edit" : "new";

  useEffect(() => {
    if (!jobId) {
      return;
    }

    const existing = findJobById(jobId);

    if (!existing) {
      setNotFound(true);
      setLoaded(true);
      return;
    }

    setJob(existing);
    setLoaded(true);
  }, [jobId]);

  const timestampLabel = useMemo(() => {
    if (mode === "new") {
      return "Timestamps will be created on save.";
    }

    return `Created ${formatTimestamp(job.createdAt)}. Updated ${formatTimestamp(
      job.updatedAt
    )}.`;
  }, [job.createdAt, job.updatedAt, mode]);

  if (!loaded) {
    return (
      <Card className="bg-card/75">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Loading job...
        </CardContent>
      </Card>
    );
  }

  if (notFound) {
    return (
      <Card className="bg-card/75">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <p className="text-sm text-muted-foreground">
            This local job record does not exist in the current browser.
          </p>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/admin/jobs">Back to jobs</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        const saved = saveJob(job);
        setJob(saved);
        router.push(`/admin/jobs/${saved.id}/edit`);
        router.refresh();
      }}
    >
      <Card className="bg-card/75">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>{mode === "new" ? "Full Add Job" : "Edit job"}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Job records are stored locally for Phase 2 and stay inside admin
                routes.
              </p>
            </div>
            <Badge variant={job.status === "offer" ? "amber" : "secondary"}>
              {jobStatusLabels[job.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                value={job.title}
                placeholder="Role title"
                required
                onChange={(event) =>
                  setJob((current) => ({ ...current, title: event.target.value }))
                }
              />
            </Field>
            <Field label="Company" htmlFor="company">
              <Input
                id="company"
                value={job.company}
                placeholder="Company name"
                required
                onChange={(event) =>
                  setJob((current) => ({ ...current, company: event.target.value }))
                }
              />
            </Field>
            <Field label="Location" htmlFor="location">
              <Input
                id="location"
                value={job.location}
                placeholder="Remote / Wilkes-Barre / ..."
                onChange={(event) =>
                  setJob((current) => ({ ...current, location: event.target.value }))
                }
              />
            </Field>
            <Field label="Pay" htmlFor="pay">
              <Input
                id="pay"
                value={job.pay}
                placeholder="$ / hourly / salary"
                onChange={(event) =>
                  setJob((current) => ({ ...current, pay: event.target.value }))
                }
              />
            </Field>
            <Field label="Job URL" htmlFor="jobUrl">
              <Input
                id="jobUrl"
                value={job.jobUrl}
                placeholder="https://..."
                onChange={(event) =>
                  setJob((current) => ({ ...current, jobUrl: event.target.value }))
                }
              />
            </Field>
            <Field label="Source" htmlFor="source">
              <Input
                id="source"
                value={job.source}
                placeholder="LinkedIn, Indeed, referral..."
                onChange={(event) =>
                  setJob((current) => ({ ...current, source: event.target.value }))
                }
              />
            </Field>
            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={job.status}
                onChange={(event) =>
                  setJob((current) => ({
                    ...current,
                    status: event.target.value as Job["status"]
                  }))
                }
              >
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {jobStatusLabels[status]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Priority" htmlFor="priority">
              <Select
                id="priority"
                value={job.priority}
                onChange={(event) =>
                  setJob((current) => ({
                    ...current,
                    priority: event.target.value as Job["priority"]
                  }))
                }
              >
                {jobPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {jobPriorityLabels[priority]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Dates and next action</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Date saved" htmlFor="dateSaved">
            <Input
              id="dateSaved"
              type="date"
              value={job.dateSaved}
              onChange={(event) =>
                setJob((current) => ({ ...current, dateSaved: event.target.value }))
              }
            />
          </Field>
          <Field label="Date applied" htmlFor="dateApplied">
            <Input
              id="dateApplied"
              type="date"
              value={job.dateApplied}
              onChange={(event) =>
                setJob((current) => ({ ...current, dateApplied: event.target.value }))
              }
            />
          </Field>
          <Field label="Interview date" htmlFor="interviewDate">
            <Input
              id="interviewDate"
              type="date"
              value={job.interviewDate}
              onChange={(event) =>
                setJob((current) => ({ ...current, interviewDate: event.target.value }))
              }
            />
          </Field>
          <Field label="Follow-up date" htmlFor="followUpDate">
            <Input
              id="followUpDate"
              type="date"
              value={job.followUpDate}
              onChange={(event) =>
                setJob((current) => ({ ...current, followUpDate: event.target.value }))
              }
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Next action" htmlFor="nextAction">
              <Input
                id="nextAction"
                value={job.nextAction}
                placeholder="Follow up, send resume, prep interview..."
                onChange={(event) =>
                  setJob((current) => ({ ...current, nextAction: event.target.value }))
                }
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Contact and resume</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Contact name" htmlFor="contactName">
            <Input
              id="contactName"
              value={job.contactName}
              onChange={(event) =>
                setJob((current) => ({ ...current, contactName: event.target.value }))
              }
            />
          </Field>
          <Field label="Contact email" htmlFor="contactEmail">
            <Input
              id="contactEmail"
              type="email"
              value={job.contactEmail}
              onChange={(event) =>
                setJob((current) => ({ ...current, contactEmail: event.target.value }))
              }
            />
          </Field>
          <Field label="Contact phone" htmlFor="contactPhone">
            <Input
              id="contactPhone"
              value={job.contactPhone}
              onChange={(event) =>
                setJob((current) => ({ ...current, contactPhone: event.target.value }))
              }
            />
          </Field>
          <Field label="Resume used" htmlFor="resumeUsed">
            <Input
              id="resumeUsed"
              value={job.resumeUsed}
              placeholder="General resume, tech resume..."
              onChange={(event) =>
                setJob((current) => ({ ...current, resumeUsed: event.target.value }))
              }
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={job.notes}
            placeholder="Add notes, requirements, contacts, interview prep, or follow-up context."
            onChange={(event) =>
              setJob((current) => ({ ...current, notes: event.target.value }))
            }
          />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">{timestampLabel}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/admin/jobs">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4" aria-hidden="true" />
            Save job
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function formatTimestamp(value: string) {
  if (!value) {
    return "unknown";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
