export const jobStatuses = [
  "saved",
  "applied",
  "interviewing",
  "follow_up",
  "offer",
  "rejected",
  "archived"
] as const;

export const jobPriorities = ["low", "medium", "high"] as const;

export type JobStatus = (typeof jobStatuses)[number];
export type JobPriority = (typeof jobPriorities)[number];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  pay: string;
  jobUrl: string;
  source: string;
  status: JobStatus;
  priority: JobPriority;
  dateSaved: string;
  dateApplied: string;
  interviewDate: string;
  followUpDate: string;
  nextAction: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  resumeUsed: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export const jobs: Job[] = [];

export const jobStatusLabels: Record<JobStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  follow_up: "Follow-Up",
  offer: "Offer",
  rejected: "Rejected",
  archived: "Archived"
};

export const jobPriorityLabels: Record<JobPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High"
};
