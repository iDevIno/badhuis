import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { listAdminPosts } from "@/lib/admin-actions";
import { AdminNewsList } from "@/components/admin-news-list";
export const metadata: Metadata = { title: "Nieuwsbeheer" };
export const dynamic = "force-dynamic";
export default async function AdminNews() {
  const items = await listAdminPosts();
  return <section className="admin-shell"><div className="admin-container"><div className="admin-head"><div><h1>Nieuwsberichten</h1><p>Beheer de berichten op de website.</p></div><Link className="button button-primary" href="/beheer/nieuws/nieuw"><Plus size={17} />Nieuw bericht</Link></div>{!process.env.DATABASE_URL && <div className="notice">Opslaan is nog niet beschikbaar: de database is niet gekoppeld. De website toont voorbeeldnieuws.</div>}<AdminNewsList items={items.map(item => ({ id: item.id, title: item.title, status: item.status, updated: item.updatedAt.toLocaleDateString("nl-BE") }))} /></div></section>;
}
