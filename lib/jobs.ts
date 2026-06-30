// Temporary Phase 2 jobs repository. Replace this file with Supabase calls later.
import {
  jobPriorities,
  jobs as seedJobs,
  jobStatuses,
  type Job,
  type JobPriority,
  type JobStatus
} from "@/data/jobs";

const STORAGE_KEY = "wertworks.jobs.v1";

type JobInput = Omit<Job, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type JobsSort = "newest" | "follow_up" | "priority";

export function readJobs(): Job[] {
  if (typeof window === "undefined") {
    return cloneJobs(seedJobs);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seeds = cloneJobs(seedJobs);
    writeJobs(seeds);
    return seeds;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return cloneJobs(seedJobs);
    }

    return parsed.map(normalizeJob);
  } catch {
    return cloneJobs(seedJobs);
  }
}

export function writeJobs(jobs: Job[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function saveJob(input: JobInput): Job {
  const jobs = readJobs();
  const now = new Date().toISOString();
  const existing = input.id ? jobs.find((job) => job.id === input.id) : undefined;
  const job = normalizeJob({
    ...input,
    id: existing?.id ?? input.id ?? createJobId(),
    createdAt: existing?.createdAt ?? input.createdAt ?? now,
    updatedAt: now
  });

  const nextJobs = existing
    ? jobs.map((current) => (current.id === job.id ? job : current))
    : [job, ...jobs];

  writeJobs(nextJobs);
  return job;
}

export function archiveJob(id: string) {
  updateJobStatus(id, "archived");
}

export function updateJobStatus(id: string, status: JobStatus) {
  const jobs = readJobs();
  const now = new Date().toISOString();
  writeJobs(
    jobs.map((job) => (job.id === id ? { ...job, status, updatedAt: now } : job))
  );
}

export function findJobById(id: string) {
  return readJobs().find((job) => job.id === id);
}

export function createEmptyJob(): Job {
  const now = new Date().toISOString();
  const today = formatDateInput(new Date());

  return {
    id: "",
    title: "",
    company: "",
    location: "",
    pay: "",
    jobUrl: "",
    source: "",
    status: "saved",
    priority: "medium",
    dateSaved: today,
    dateApplied: "",
    interviewDate: "",
    followUpDate: "",
    nextAction: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    resumeUsed: "",
    notes: "",
    createdAt: now,
    updatedAt: now
  };
}

export function getJobCounts(jobs: Job[]) {
  return {
    saved: jobs.filter((job) => job.status === "saved").length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interviewing: jobs.filter((job) => job.status === "interviewing").length,
    followUpsDue: getFollowUpsDue(jobs).length
  };
}

export function getFollowUpsDue(jobs: Job[], date = new Date()) {
  const today = startOfDay(date).getTime();

  return jobs
    .filter((job) => {
      if (!job.followUpDate || ["archived", "rejected"].includes(job.status)) {
        return false;
      }

      return parseLocalDate(job.followUpDate).getTime() <= today;
    })
    .sort(compareByFollowUpDate);
}

export function getNextActionJobs(jobs: Job[]) {
  return jobs
    .filter(
      (job) =>
        !["archived", "rejected"].includes(job.status) &&
        (job.nextAction || job.followUpDate)
    )
    .sort((a, b) => {
      const due = compareByFollowUpDate(a, b);
      if (due !== 0) {
        return due;
      }

      return compareByPriority(a, b);
    })
    .slice(0, 5);
}

export function filterAndSortJobs({
  jobs,
  status,
  query,
  sort
}: {
  jobs: Job[];
  status: JobStatus;
  query: string;
  sort: JobsSort;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = jobs.filter((job) => {
    const matchesStatus = job.status === status;
    const matchesQuery =
      !normalizedQuery ||
      [job.title, job.company].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

    return matchesStatus && matchesQuery;
  });

  return filtered.sort((a, b) => {
    if (sort === "follow_up") {
      return compareByFollowUpDate(a, b);
    }

    if (sort === "priority") {
      return compareByPriority(a, b) || compareNewest(a, b);
    }

    return compareNewest(a, b);
  });
}

export function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeJob(job: Partial<Job>): Job {
  const now = new Date().toISOString();
  const status = jobStatuses.includes(job.status as JobStatus)
    ? (job.status as JobStatus)
    : "saved";
  const priority = jobPriorities.includes(job.priority as JobPriority)
    ? (job.priority as JobPriority)
    : "medium";

  return {
    id: String(job.id || createJobId()),
    title: String(job.title ?? ""),
    company: String(job.company ?? ""),
    location: String(job.location ?? ""),
    pay: String(job.pay ?? ""),
    jobUrl: String(job.jobUrl ?? ""),
    source: String(job.source ?? ""),
    status,
    priority,
    dateSaved: String(job.dateSaved ?? ""),
    dateApplied: String(job.dateApplied ?? ""),
    interviewDate: String(job.interviewDate ?? ""),
    followUpDate: String(job.followUpDate ?? ""),
    nextAction: String(job.nextAction ?? ""),
    contactName: String(job.contactName ?? ""),
    contactEmail: String(job.contactEmail ?? ""),
    contactPhone: String(job.contactPhone ?? ""),
    resumeUsed: String(job.resumeUsed ?? ""),
    notes: String(job.notes ?? ""),
    createdAt: String(job.createdAt ?? now),
    updatedAt: String(job.updatedAt ?? now)
  };
}

function createJobId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `job-${Date.now()}`;
}

function cloneJobs(jobs: Job[]) {
  return jobs.map((job) => ({ ...job }));
}

function compareNewest(a: Job, b: Job) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function compareByPriority(a: Job, b: Job) {
  const scores: Record<JobPriority, number> = {
    high: 3,
    medium: 2,
    low: 1
  };

  return scores[b.priority] - scores[a.priority];
}

function compareByFollowUpDate(a: Job, b: Job) {
  const aTime = a.followUpDate
    ? parseLocalDate(a.followUpDate).getTime()
    : Number.POSITIVE_INFINITY;
  const bTime = b.followUpDate
    ? parseLocalDate(b.followUpDate).getTime()
    : Number.POSITIVE_INFINITY;

  return aTime - bTime;
}

function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return startOfDay(new Date(year, (month || 1) - 1, day || 1));
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
