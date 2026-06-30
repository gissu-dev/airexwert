type TimelineItem = {
  title: string;
  timeframe: string;
  description: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-white/20 to-transparent sm:block" />
      <div className="grid gap-5">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="relative rounded-lg border border-white/10 bg-white/[0.045] p-5 sm:ml-12"
          >
            <div className="absolute -left-[2.95rem] top-6 hidden h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-background text-xs font-semibold text-primary sm:flex">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="text-sm font-semibold text-primary">
              {item.timeframe}
            </div>
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
