export const jobStatuses = [
  "Interested",
  "Applied",
  "Interview",
  "Follow Up",
  "Rejected",
  "Offer"
] as const;

export type JobStatus = (typeof jobStatuses)[number];

export type JobLead = {
  id: string;
  company: string;
  role: string;
  location: string;
  pay: string;
  link: string;
  status: JobStatus;
  notes: string;
  dateApplied: string;
  followUpDate: string;
};

export const starterJobLeads: JobLead[] = [
  {
    id: "starter-1",
    company: "Example Technology Employer",
    role: "Junior Automation / Support Role",
    location: "Northeastern Pennsylvania",
    pay: "",
    link: "",
    status: "Interested",
    notes: "Replace this with a real lead. Track requirements, schedule, and next action.",
    dateApplied: "",
    followUpDate: ""
  },
  {
    id: "starter-2",
    company: "Example Direct Support Organization",
    role: "Mental Health Worker",
    location: "Wilkes-Barre area",
    pay: "",
    link: "",
    status: "Applied",
    notes: "Sample row showing local-only persistence. Edit or delete after launch.",
    dateApplied: "",
    followUpDate: ""
  }
];
