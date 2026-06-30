"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, ArrowUpRight, Edit, Plus } from "lucide-react";
import {
  jobStatusLabels,
  jobStatuses,
  type Job,
  type JobStatus
} from "@/data/jobs";
import {
  archiveJob,
  createEmptyJob,
  filterAndSortJobs,
  getJobCounts,
  getNextActionJobs,
  readJobs,
  saveJob,
  updateJobStatus,
  type JobsSort
} from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const sortLabels: Record<JobsSort, string> = {
  newest: "Newest",
  follow_up: "Follow-up date",
  priority: "Priority"
};

export function JobsAdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeStatus, setActiveStatus] = useState<JobStatus>("saved");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<JobsSort>("newest");
  const [quickDraft, setQuickDraft] = useState<Job>(() => createEmptyJob());

  useEffect(() => {
    setJobs(readJobs());
  }, []);

  const counts = useMemo(() => getJobCounts(jobs), [jobs]);
  const nextActions = useMemo(() => getNextActionJobs(jobs), [jobs]);
  const visibleJobs = useMemo(
    () =>
      filterAndSortJobs({
        jobs,
        status: activeStatus,
        query,
        sort
      }),
    [activeStatus, jobs, query, sort]
  );

  function refreshJobs() {
    setJobs(readJobs());
  }

  function saveQuickJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveJob(quickDraft);
    setQuickDraft(createEmptyJob());
    refreshJobs();
  }

  function updateQuickDraft<Key extends keyof Job>(key: Key, value: Job[Key]) {
    setQuickDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Jobs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Private local tracker for saved roles, applications, interviews, and
            follow-ups.
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/jobs/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Full Add Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Total saved" value={counts.saved} />
        <Stat label="Total applied" value={counts.applied} />
        <Stat label="Total interviewing" value={counts.interviewing} />
        <Stat label="Follow-ups due" value={counts.followUpsDue} />
      </div>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Next Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {nextActions.length ? (
            nextActions.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.035] p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold">
                    {job.nextAction || "Follow up"} - {job.company || "Company"}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {job.title || "Untitled role"}
                    {job.followUpDate ? ` / due ${job.followUpDate}` : ""}
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href={`/admin/jobs/${job.id}/edit`}>Open</Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No upcoming actions yet. Add a next action or follow-up date to a job.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 lg:grid-cols-2" onSubmit={saveQuickJob}>
            <Field label="Title" htmlFor="quick-title">
              <Input
                id="quick-title"
                value={quickDraft.title}
                required
                placeholder="Role title"
                onChange={(event) => updateQuickDraft("title", event.target.value)}
              />
            </Field>
            <Field label="Company" htmlFor="quick-company">
              <Input
                id="quick-company"
                value={quickDraft.company}
                required
                placeholder="Company"
                onChange={(event) => updateQuickDraft("company", event.target.value)}
              />
            </Field>
            <Field label="Job URL" htmlFor="quick-jobUrl">
              <Input
                id="quick-jobUrl"
                value={quickDraft.jobUrl}
                placeholder="https://..."
                onChange={(event) => updateQuickDraft("jobUrl", event.target.value)}
              />
            </Field>
            <Field label="Status" htmlFor="quick-status">
              <Select
                id="quick-status"
                value={quickDraft.status}
                onChange={(event) =>
                  updateQuickDraft("status", event.target.value as JobStatus)
                }
              >
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {jobStatusLabels[status]}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="lg:col-span-2">
              <Field label="Notes" htmlFor="quick-notes">
                <Textarea
                  id="quick-notes"
                  className="min-h-[90px]"
                  value={quickDraft.notes}
                  placeholder="Paste requirements, context, or quick notes."
                  onChange={(event) => updateQuickDraft("notes", event.target.value)}
                />
              </Field>
            </div>
            <div className="lg:col-span-2">
              <Button type="submit">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {jobStatuses.map((status) => {
            const active = activeStatus === status;
            const count = jobs.filter((job) => job.status === status).length;

            return (
              <Button
                key={status}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                className={cn("shrink-0", active && "shadow-radar")}
                onClick={() => setActiveStatus(status)}
              >
                {jobStatusLabels[status]}
                <span className="text-xs opacity-75">{count}</span>
              </Button>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="grid gap-2">
            <Label htmlFor="job-search">Search title/company</Label>
            <Input
              id="job-search"
              value={query}
              placeholder="Search jobs"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-sort">Sort</Label>
            <Select
              id="job-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as JobsSort)}
            >
              {(Object.keys(sortLabels) as JobsSort[]).map((sortKey) => (
                <option key={sortKey} value={sortKey}>
                  {sortLabels[sortKey]}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleJobs.map((job) => (
          <JobAdminCard
            key={job.id}
            job={job}
            onArchive={() => {
              archiveJob(job.id);
              refreshJobs();
            }}
            onStatusChange={(status) => {
              updateJobStatus(job.id, status);
              refreshJobs();
            }}
          />
        ))}
      </div>

      {!visibleJobs.length ? (
        <Card className="bg-card/75">
          <CardContent className="p-6 text-sm text-muted-foreground">
            No jobs match this tab and search.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function JobAdminCard({
  job,
  onArchive,
  onStatusChange
}: {
  job: Job;
  onArchive: () => void;
  onStatusChange: (status: JobStatus) => void;
}) {
  return (
    <Card className="bg-card/75">
      <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{job.title || "Untitled role"}</h3>
            <Badge variant={job.status === "offer" ? "amber" : "secondary"}>
              {jobStatusLabels[job.status]}
            </Badge>
            <Badge variant={job.priority === "high" ? "amber" : "outline"}>
              {job.priority}
            </Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">
            {job.company || "Company"}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {[job.pay, job.location].filter(Boolean).join(" / ") || "Pay/location not set"}
          </p>
          <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
            <span>Next action: {job.nextAction || "Add next action"}</span>
            <span>Follow-up: {job.followUpDate || "No follow-up date"}</span>
          </div>
          {job.notes ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{job.notes}</p>
          ) : null}
          {job.jobUrl ? (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Job post
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <Select
            value={job.status}
            onChange={(event) => onStatusChange(event.target.value as JobStatus)}
            aria-label={`Change status for ${job.title || "job"}`}
          >
            {jobStatuses.map((status) => (
              <option key={status} value={status}>
                {jobStatusLabels[status]}
              </option>
            ))}
          </Select>
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/jobs/${job.id}/edit`}>
              <Edit className="h-4 w-4" aria-hidden="true" />
              Edit
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onArchive}
            disabled={job.status === "archived"}
          >
            <Archive className="h-4 w-4" aria-hidden="true" />
            Archive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-card/75">
      <CardContent className="p-4">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="mt-1 text-xs uppercase text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
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
