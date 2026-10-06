import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/posts";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const post=await getPublishedPost(slug);return post?pageMetadata(post.title,post.excerpt,`/nieuws/${encodeURIComponent(slug)}`):{};}
export default async function NewsDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getPublishedPost(slug);if(!post)notFound();return <article className="article-shell"><header className="article-header"><p className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/nieuws">Nieuws</Link></p><time className="news-date">{post.publishedAt.toLocaleDateString("nl-BE",{day:"numeric",month:"long",year:"numeric"})}</time><h1>{post.title}</h1><p className="lead">{post.excerpt}</p></header>{post.imageUrl&&<img className="article-image" src={post.imageUrl} alt={post.imageAlt||""}/>}<div className="narrow prose" dangerouslySetInnerHTML={{__html:post.content}}/></article>}
