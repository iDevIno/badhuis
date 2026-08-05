import type { Metadata } from "next";
import { auth } from "@/auth";
import { PostEditor } from "@/components/editor";
import { redirect } from "next/navigation";
export const metadata:Metadata={title:"Nieuw nieuwsbericht",robots:{index:false,follow:false}};export const dynamic="force-dynamic";
export default async function NewPost(){if(!(await auth())?.user)redirect("/beheer/inloggen");return <section className="admin-shell"><div className="admin-container"><div className="admin-head"><div><p className="eyebrow">Nieuwsbeheer</p><h1>Nieuw bericht</h1></div></div><PostEditor/></div></section>}
