import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getFaq } from "@/lib/faq";
import { FaqEditor } from "@/components/faq-editor";
export const metadata: Metadata = { title: "FAQ beheren", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function AdminFaq() {
  const session = await auth();
  if (!session?.user?.email) redirect("/beheer/inloggen");
  const items = await getFaq();
  return <section className="admin-shell"><div className="admin-container"><div className="admin-head"><div><h1>Veelgestelde vragen</h1><p>Pas vragen en antwoorden aan. Opslaan publiceert de volledige lijst.</p></div><span className="admin-total">{items.length} vragen</span></div>{!process.env.DATABASE_URL && <p className="notice">Opslaan is nog niet beschikbaar: de database is niet gekoppeld.</p>}<FaqEditor initialItems={items} /></div></section>;
}
