"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Newspaper, CircleHelp, LogOut, Menu, X, Users } from "lucide-react";
import { logoutAction } from "@/lib/admin-actions";

export function AdminFrame({ email, children }: { email: string | null; children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const authPage = ["/beheer/inloggen", "/beheer/wachtwoord-vergeten", "/beheer/wachtwoord-resetten"].includes(path);
  if (authPage) return <div className="admin-app admin-auth"><header className="admin-auth-brand"><Link href="/">Badhuis<span>Websitebeheer</span></Link></header>{children}<Link className="admin-auth-back" href="/">Terug naar de website <ArrowUpRight size={14} /></Link></div>;
  const isNews = path.startsWith("/beheer/nieuws");
  const isUsers = path === "/beheer/gebruikers";
  return <div className="admin-app admin-workspace">
    {open && <button className="admin-scrim" aria-label="Navigatie sluiten" onClick={() => setOpen(false)} />}
    <aside className={`admin-sidebar${open ? " is-open" : ""}`} id="admin-navigation">
      <div className="admin-wordmark"><Link href="/beheer/nieuws" onClick={() => setOpen(false)}>Badhuis<span>Websitebeheer</span></Link><button className="admin-mobile-close" aria-label="Navigatie sluiten" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <p className="admin-nav-label">Beheer</p>
      <nav aria-label="Beheernavigatie">
        <Link href="/beheer/nieuws" aria-current={isNews ? "page" : undefined} onClick={() => setOpen(false)}><Newspaper size={18} />Nieuwsberichten</Link>
        <Link href="/beheer/faq" aria-current={path === "/beheer/faq" ? "page" : undefined} onClick={() => setOpen(false)}><CircleHelp size={18} />Veelgestelde vragen</Link>
        <Link href="/beheer/gebruikers" aria-current={isUsers ? "page" : undefined} onClick={() => setOpen(false)}><Users size={18} />Gebruikers</Link>
      </nav>
      <div className="admin-sidebar-bottom"><Link href="/" target="_blank" rel="noreferrer">Website bekijken <ArrowUpRight size={16} /></Link><div className="admin-account"><span className="admin-avatar" aria-hidden="true">B</span><div><strong>Praktijkbeheer</strong><span>{email || "Beheerder"}</span></div></div><form action={logoutAction}><button type="submit"><LogOut size={16} />Uitloggen</button></form></div>
    </aside>
    <div className="admin-main"><header className="admin-topbar"><button className="admin-mobile-toggle" aria-label="Navigatie openen" aria-expanded={open} aria-controls="admin-navigation" onClick={() => setOpen(!open)}><Menu size={20} /></button><nav aria-label="Broodkruimels"><span>Beheer</span><span aria-hidden="true">/</span><Link href={isNews ? "/beheer/nieuws" : isUsers ? "/beheer/gebruikers" : "/beheer/faq"}>{isNews ? "Nieuwsberichten" : isUsers ? "Gebruikers" : "Veelgestelde vragen"}</Link>{isNews && path !== "/beheer/nieuws" && <><span aria-hidden="true">/</span><span>{path.endsWith("/nieuw") ? "Nieuw bericht" : "Bewerken"}</span></>}</nav><span className="admin-topbar-name">Huisartsenpraktijk Badhuis</span></header>{children}</div>
  </div>;
}
