import { ProjectCaseStudy } from "@/components/project-case-study";

export const metadata = {
  title: "Project Case Study | WertWorks",
  description: "WertWorks project case study."
};

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectCaseStudyPage({
  params
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;

  return <ProjectCaseStudy slug={slug} />;
}
