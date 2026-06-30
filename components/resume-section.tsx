import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResumeSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <Card className="bg-card/75">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
