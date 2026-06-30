import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

const baseUrl = profile.siteUrl;

const routes = [
  "",
  "/about",
  "/projects",
  "/drone-services",
  "/aviation",
  "/automation-bots",
  "/resume",
  "/job-search",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
