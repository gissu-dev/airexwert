import type { JobStatus } from "@/data/job-leads";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<JobStatus, string> = {
  Interested: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  Applied: "border-primary/35 bg-primary/10 text-primary",
  Interview: "border-violet-400/30 bg-violet-400/10 text-violet-100",
  "Follow Up": "border-accent/35 bg-accent/10 text-accent",
  Rejected: "border-red-400/30 bg-red-400/10 text-red-100",
  Offer: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100"
};

export function StatusBadge({
  status,
  className
}: {
  status: JobStatus;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1", statusStyles[status], className)}
    >
      {status}
    </Badge>
  );
}
