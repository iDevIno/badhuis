import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/editor";
import { DeletePostButton } from "@/components/delete-post-button";
import { getAdminPost } from "@/lib/admin-actions";
export const metadata:Metadata={title:"Nieuwsbericht bewerken",robots:{index:false,follow:false}};export const dynamic="force-dynamic";
export default async function EditPost({params}:{params:Promise<{id:string}>}){const {id}=await params;const post=await getAdminPost(id);if(!post)notFound();return <section className="admin-shell"><div className="admin-container"><div className="admin-head"><div><p className="eyebrow">Nieuwsbeheer</p><h1>Bericht bewerken</h1></div><DeletePostButton id={post.id}/></div><PostEditor post={{...post,imageUrl:post.imageUrl||null,imageAlt:post.imageAlt||null}}/></div></section>}
