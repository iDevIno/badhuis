import { and, desc, eq, isNotNull, lte } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { demoPosts } from "./content";
export type PublicPost={id:string;slug:string;title:string;excerpt:string;content:string;imageUrl:string|null;imageAlt:string|null;publishedAt:Date};
export async function getPublishedPosts(limit?:number):Promise<PublicPost[]>{const db=getDb();if(!db)return demoPosts.slice(0,limit);const query=db.select().from(posts).where(and(eq(posts.status,"published"),isNotNull(posts.publishedAt),lte(posts.publishedAt,new Date()))).orderBy(desc(posts.publishedAt));const rows=await (limit?query.limit(limit):query);return rows.filter(r=>r.publishedAt) as PublicPost[];}
export async function getPublishedPost(slug:string){const db=getDb();if(!db)return demoPosts.find(p=>p.slug===slug)||null;const [post]=await db.select().from(posts).where(and(eq(posts.slug,slug),eq(posts.status,"published"))).limit(1);return post?.publishedAt?post as PublicPost:null;}
