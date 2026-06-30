import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function StatCard({ title, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="group h-full bg-card/75 hover:border-primary/20">
      <CardContent className="p-5">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
