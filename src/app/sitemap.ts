import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getPublishedPosts } from "@/lib/posts";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const pages=["","/praktijk","/nieuws","/team","/info/wachtpost","/info/afspraken","/info/geconventioneerd","/contact"].map(path=>({url:`${siteConfig.url}${path}`,lastModified:new Date(),changeFrequency:path==="/nieuws"?"weekly" as const:"monthly" as const,priority:path===""?1:.7}));const posts=(await getPublishedPosts()).map(post=>({url:`${siteConfig.url}/nieuws/${post.slug}`,lastModified:post.publishedAt,changeFrequency:"monthly" as const,priority:.6}));return [...pages,...posts]}
