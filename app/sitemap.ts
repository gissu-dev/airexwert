import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const baseUrl = profile.siteUrl;

const routes = [
  "",
  "/about",
  "/projects",
  "/drone-services",
  "/automation-bots",
  "/resume",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects
    .filter((project) => project.status === "published")
    .map((project) => `/projects/${project.slug}`);

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
