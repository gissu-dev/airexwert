"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Download,
  LayoutGrid,
  ListFilter,
  Plus,
  Search,
  Table2
} from "lucide-react";
import {
  type JobLead,
  type JobStatus,
  jobStatuses,
  starterJobLeads
} from "@/data/job-leads";
import { JobCard } from "@/components/job-dashboard/job-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const storageKey = "airexwert-job-leads";

type ViewMode = "kanban" | "table";
type StatusFilter = JobStatus | "All";
type JobDraft = Omit<JobLead, "id">;

const emptyDraft: JobDraft = {
  company: "",
  role: "",
  location: "",
  pay: "",
  link: "",
  status: "Interested",
  notes: "",
  dateApplied: "",
  followUpDate: ""
};

export function JobDashboard() {
  const [jobs, setJobs] = useState<JobLead[]>(starterJobLeads);
  const [draft, setDraft] = useState<JobDraft>(emptyDraft);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [view, setView] = useState<ViewMode>("kanban");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as JobLead[];
        setJobs(parsed);
      } catch {
        setJobs(starterJobLeads);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(storageKey, JSON.stringify(jobs));
    }
  }, [jobs, loaded]);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const statusMatch =
        statusFilter === "All" ? true : job.status === statusFilter;
      const searchMatch = normalizedQuery
        ? [
            job.company,
            job.role,
            job.location,
            job.pay,
            job.link,
            job.status,
            job.notes,
            job.dateApplied,
            job.followUpDate
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;
      return statusMatch && searchMatch;
    });
  }, [jobs, query, statusFilter]);

  const followUps = useMemo(() => {
    return jobs
      .filter((job) => job.followUpDate && job.status !== "Rejected")
      .sort((a, b) => a.followUpDate.localeCompare(b.followUpDate))
      .slice(0, 4);
  }, [jobs]);

  function addJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.company.trim() || !draft.role.trim()) {
      return;
    }

    const newJob: JobLead = {
      ...draft,
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `job-${Date.now()}`
    };

    setJobs((current) => [newJob, ...current]);
    setDraft(emptyDraft);
  }

  function updateDraft<Key extends keyof JobDraft>(
    key: Key,
    value: JobDraft[Key]
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateStatus(id: string, status: JobStatus) {
    setJobs((current) =>
      current.map((job) => (job.id === id ? { ...job, status } : job))
    );
  }

  function deleteJob(id: string) {
    setJobs((current) => current.filter((job) => job.id !== id));
  }

  function exportCsv() {
    const headers = [
      "Company",
      "Role",
      "Location",
      "Pay",
      "Link",
      "Status",
      "Notes",
      "Date applied",
      "Follow-up date"
    ];
    const rows = jobs.map((job) => [
      job.company,
      job.role,
      job.location,
      job.pay,
      job.link,
      job.status,
      job.notes,
      job.dateApplied,
      job.followUpDate
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "job-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[440px_1fr]">
      <Card className="h-fit bg-card/75">
        <CardHeader>
          <CardTitle>Add job lead</CardTitle>
          <CardDescription>
            Track a role manually. No scraping, no auto-apply, and no external sync.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={addJob}>
            <Field label="Company" htmlFor="company" className="sm:col-span-2">
              <Input
                id="company"
                value={draft.company}
                onChange={(event) => updateDraft("company", event.target.value)}
                required
              />
            </Field>
            <Field label="Role" htmlFor="role" className="sm:col-span-2">
              <Input
                id="role"
                value={draft.role}
                onChange={(event) => updateDraft("role", event.target.value)}
                required
              />
            </Field>
            <Field label="Location" htmlFor="location">
              <Input
                id="location"
                value={draft.location}
                onChange={(event) => updateDraft("location", event.target.value)}
              />
            </Field>
            <Field label="Pay" htmlFor="pay">
              <Input
                id="pay"
                value={draft.pay}
                onChange={(event) => updateDraft("pay", event.target.value)}
                placeholder="$ / hr, salary, or range"
              />
            </Field>
            <Field label="Link" htmlFor="link" className="sm:col-span-2">
              <Input
                id="link"
                type="url"
                value={draft.link}
                onChange={(event) => updateDraft("link", event.target.value)}
                placeholder="https://"
              />
            </Field>
            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={draft.status}
                onChange={(event) =>
                  updateDraft("status", event.target.value as JobStatus)
                }
              >
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Date applied" htmlFor="dateApplied">
              <Input
                id="dateApplied"
                type="date"
                value={draft.dateApplied}
                onChange={(event) =>
                  updateDraft("dateApplied", event.target.value)
                }
              />
            </Field>
            <Field label="Follow-up date" htmlFor="followUpDate">
              <Input
                id="followUpDate"
                type="date"
                value={draft.followUpDate}
                onChange={(event) =>
                  updateDraft("followUpDate", event.target.value)
                }
              />
            </Field>
            <Field label="Notes" htmlFor="notes" className="sm:col-span-2">
              <Textarea
                id="notes"
                value={draft.notes}
                onChange={(event) => updateDraft("notes", event.target.value)}
                placeholder="Requirements, contact, interview notes, next action."
              />
            </Field>
            <Button type="submit" className="sm:col-span-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Lead
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="bg-card/75">
          <CardContent className="p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
              <Field label="Search/filter" htmlFor="jobSearch">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="jobSearch"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="pl-9"
                    placeholder="Search company, role, notes, status..."
                  />
                </div>
              </Field>
              <Field label="Status" htmlFor="statusFilter">
                <Select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  className="min-w-44"
                >
                  <option value="All">All</option>
                  {jobStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={view === "kanban" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("kanban")}
                  aria-label="Kanban board view"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant={view === "table" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("table")}
                  aria-label="Table view"
                >
                  <Table2 className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button type="button" variant="outline" onClick={exportCsv}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">CSV</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Total leads" value={jobs.length} />
          <Metric
            label="Applied"
            value={jobs.filter((job) => job.status === "Applied").length}
          />
          <Metric
            label="Interviews"
            value={jobs.filter((job) => job.status === "Interview").length}
          />
          <Metric label="Follow-ups" value={followUps.length} />
        </div>

        {followUps.length ? (
          <Card className="bg-card/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListFilter className="h-5 w-5 text-accent" aria-hidden="true" />
                Follow-up reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {followUps.map((job) => (
                <div
                  key={job.id}
                  className="rounded-md border border-accent/20 bg-accent/[0.08] p-3"
                >
                  <div className="text-sm font-semibold">
                    {job.company} - {job.role}
                  </div>
                  <div className="mt-1 text-sm text-accent">
                    Follow up {job.followUpDate}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {filteredJobs.length ? (
          view === "kanban" ? (
            <Kanban
              jobs={filteredJobs}
              onStatusChange={updateStatus}
              onDelete={deleteJob}
            />
          ) : (
            <JobTable
              jobs={filteredJobs}
              onStatusChange={updateStatus}
              onDelete={deleteJob}
            />
          )
        ) : (
          <EmptyState
            title={jobs.length ? "No matching job leads" : "No job leads yet"}
            description={
              jobs.length
                ? "Adjust the search text or status filter to bring leads back into view."
                : "Add a company and role to start building your personal pipeline."
            }
          />
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="text-3xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-white/[0.15] bg-white/[0.035] p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Kanban({
  jobs,
  onStatusChange,
  onDelete
}: {
  jobs: JobLead[];
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {jobStatuses.map((status) => {
        const columnJobs = jobs.filter((job) => job.status === status);
        return (
          <section
            key={status}
            className="min-h-40 rounded-lg border border-white/10 bg-white/[0.035] p-3"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <StatusBadge status={status} />
              <span className="text-xs text-muted-foreground">
                {columnJobs.length}
              </span>
            </div>
            <div className="grid gap-3">
              {columnJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))}
              {!columnJobs.length ? (
                <p className="rounded-md border border-white/10 bg-black/[0.15] p-3 text-sm text-muted-foreground">
                  No leads in this status.
                </p>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function JobTable({
  jobs,
  onStatusChange,
  onDelete
}: {
  jobs: JobLead[];
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <div className="grid gap-3 md:hidden">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-lg border border-white/10 md:block">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-white/[0.055] text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Pay</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Follow-up</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-white/[0.025]">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-3 font-medium">{job.company}</td>
                <td className="px-4 py-3">{job.role}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {job.location}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{job.pay}</td>
                <td className="px-4 py-3">
                  <Select
                    value={job.status}
                    onChange={(event) =>
                      onStatusChange(job.id, event.target.value as JobStatus)
                    }
                  >
                    {jobStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {job.dateApplied}
                </td>
                <td
                  className={cn(
                    "px-4 py-3",
                    job.followUpDate ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {job.followUpDate}
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

function csvEscape(value: string) {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}
