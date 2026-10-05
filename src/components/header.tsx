"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BookingLink } from "./booking-link";

export function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return <header className="site-header">
    <div className="topbar"><div className="container topbar-inner"><span>Consultaties enkel op afspraak.</span><Link href="/faq">Veelgestelde vragen</Link></div></div>
    <div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="Huisartsenpraktijk Badhuis, home"><span className="brand-mark">B</span><span><strong>Huisartsenpraktijk</strong><em>Badhuis</em></span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="hoofdnavigatie" aria-label={open ? "Menu sluiten" : "Menu openen"}>{open ? <X /> : <Menu />}</button>
      <nav id="hoofdnavigatie" className={open ? "main-nav is-open" : "main-nav"} aria-label="Hoofdnavigatie">
        <Link href="/bereikbaarheid" onClick={closeMenu}>Bereikbaarheid</Link>
        <Link href="/nieuws" onClick={closeMenu}>Nieuws</Link>
        <Link href="/team" onClick={closeMenu}>Team</Link>
        <Link href="/faq" onClick={closeMenu}>FAQ</Link>
        <BookingLink className="button button-primary nav-cta" label="Afspraak maken" />
      </nav>
    </div>
  </header>;
}
