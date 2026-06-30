import { ProjectCaseStudy } from "@/components/project-case-study";

export const metadata = {
  title: "Project Case Study | WertWorks",
  description: "WertWorks project case study."
};

export default function ProjectCaseStudyPage({
  params
}: {
  params: { slug: string };
}) {
  return <ProjectCaseStudy slug={params.slug} />;
}
