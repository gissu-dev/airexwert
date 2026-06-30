"use client";

import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import type { JobLead, JobStatus } from "@/data/job-leads";
import { jobStatuses } from "@/data/job-leads";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type JobCardProps = {
  job: JobLead;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
};

export function JobCard({ job, onStatusChange, onDelete }: JobCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-lg shadow-black/10 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words font-semibold leading-tight">{job.role}</h3>
          <p className="mt-1 break-words text-sm text-muted-foreground">
            {job.company}
          </p>
        </div>
        <StatusBadge status={job.status} className="shrink-0" />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
        {job.location ? <p className="break-words">{job.location}</p> : null}
        {job.pay ? <p className="break-words">{job.pay}</p> : null}
        {job.followUpDate ? (
          <p className="flex items-center gap-2 text-accent">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Follow up {job.followUpDate}
          </p>
        ) : null}
      </div>

      {job.notes ? (
        <p className="mt-4 break-words text-sm leading-6 text-foreground/[0.82]">
          {job.notes}
        </p>
      ) : null}

      <div className="mt-4 grid gap-3">
        <Select
          aria-label={`Change status for ${job.role}`}
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
        <div className="flex gap-2">
          {job.link ? (
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a href={job.link} target="_blank" rel="noreferrer">
                Open
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-red-200 hover:text-red-100"
            onClick={() => onDelete(job.id)}
            aria-label={`Delete ${job.role} at ${job.company}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
}
