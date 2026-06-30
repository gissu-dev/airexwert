import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type SkillCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function SkillCard({ title, description, icon: Icon }: SkillCardProps) {
  return (
    <Card className="group h-full bg-card/70 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.08] text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
