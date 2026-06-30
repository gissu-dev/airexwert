import { Badge } from "@/components/ui/badge";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="container pb-10 pt-14 sm:pb-12 sm:pt-20">
      <Badge variant="secondary">{eyebrow}</Badge>
      <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
