import type { ReactNode } from "react";

type RoadmapBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export function RoadmapDocument({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);
  const sections = blocks.filter(
    (block): block is Extract<RoadmapBlock, { type: "heading" }> =>
      block.type === "heading" && block.level === 2,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
      <aside className="rounded-xl border border-white/10 bg-card/65 p-5 lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Roadmap sections
        </p>
        <nav className="mt-4 grid gap-1" aria-label="Roadmap sections">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-md px-3 py-2 text-sm leading-5 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              {section.text}
            </a>
          ))}
        </nav>
      </aside>

      <article className="min-w-0 rounded-xl border border-white/10 bg-card/65 p-6 sm:p-8 lg:p-10">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            if (block.level === 1) {
              return null;
            }

            if (block.level === 2) {
              return (
                <h2
                  key={`${block.id}-${index}`}
                  id={block.id}
                  className="scroll-mt-24 border-t border-white/10 pt-10 text-2xl font-semibold first:border-0 first:pt-0 sm:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }

            return (
              <h3
                key={`${block.id}-${index}`}
                id={block.id}
                className="scroll-mt-24 pt-5 text-xl font-semibold text-white"
              >
                {block.text}
              </h3>
            );
          }

          if (block.type === "list") {
            const ListTag = block.ordered ? "ol" : "ul";

            return (
              <ListTag
                key={`list-${index}`}
                className={`mt-4 grid gap-3 pl-6 text-sm leading-7 text-muted-foreground sm:text-base ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
                ))}
              </ListTag>
            );
          }

          return (
            <p
              key={`paragraph-${index}`}
              className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base"
            >
              {renderInline(block.text)}
            </p>
          );
        })}
      </article>
    </div>
  );
}

function parseMarkdown(markdown: string): RoadmapBlock[] {
  const blocks: RoadmapBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  }

  function flushList() {
    if (listItems.length) {
      blocks.push({ type: "list", ordered: listOrdered, items: listItems });
      listItems = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const text = heading[2].replace(/â€”/g, "—");
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text,
        id: slugifyHeading(text),
      });
      continue;
    }

    const orderedItem = /^\d+\.\s+(.+)$/.exec(line);
    const unorderedItem = /^-\s+(?:\[[x ]\]\s+)?(.+)$/i.exec(line);
    if (orderedItem || unorderedItem) {
      flushParagraph();
      const nextOrdered = Boolean(orderedItem);
      if (listItems.length && listOrdered !== nextOrdered) {
        flushList();
      }
      listOrdered = nextOrdered;
      listItems.push((orderedItem?.[1] ?? unorderedItem?.[1] ?? "").trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g);

  return parts.filter(Boolean).map((part, index) => {
    const bold = /^\*\*(.*?)\*\*$/.exec(part);
    if (bold) {
      return <strong key={`${part}-${index}`} className="font-semibold text-foreground">{bold[1]}</strong>;
    }

    const link = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={`${part}-${index}`}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
