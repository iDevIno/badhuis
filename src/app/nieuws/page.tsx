import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/posts";
export const metadata:Metadata={title:"Nieuws",description:"Nieuws en praktische mededelingen van Huisartsenpraktijk Badhuis."};
export const dynamic="force-dynamic";
export default async function Nieuws(){const items=await getPublishedPosts();return <><PageHero title="Nieuws" intro="Praktische mededelingen, gezondheidsinformatie en nieuws uit onze praktijk."/><section className="section"><div className="container">{items.length?<div className="news-grid">{items.map(post=><article className="news-card" key={post.id}>{post.imageUrl&&<img className="news-image" src={post.imageUrl} alt={post.imageAlt||""}/>}<div className="news-content"><time className="news-date">{post.publishedAt.toLocaleDateString("nl-BE",{day:"numeric",month:"long",year:"numeric"})}</time><h2>{post.title}</h2><p>{post.excerpt}</p><Link className="text-link" href={`/nieuws/${post.slug}`}>Lees verder <ArrowRight size={16}/></Link></div></article>)}</div>:<div className="empty-state"><h2>Nog geen nieuwsberichten</h2><p>Binnenkort vindt u hier nieuws uit de praktijk.</p></div>}</div></section></>}
