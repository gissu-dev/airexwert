import type { MetadataRoute } from "next";

const baseUrl = "https://skypalsdispatch.com";
const routes = ["", "/services", "/industries", "/about", "/pricing", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route || "/", baseUrl).toString(),
    lastModified,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));
}
