import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages have no reliable edit date; do not report every crawl as a change.
  const pages = ["", "/nieuws", "/team", "/faq", "/bereikbaarheid"].map(path => ({ url: `${siteConfig.url}${path}` }));
  const posts = (await getPublishedPosts()).map(post => ({
    url: `${siteConfig.url}/nieuws/${encodeURIComponent(post.slug)}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));
  return [...pages, ...posts];
}
