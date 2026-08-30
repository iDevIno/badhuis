"use client";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { BookingLink } from "./booking-link";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topbar"><div className="container topbar-inner"><span>Consultaties enkel op afspraak.</span><Link href="/info/afspraken">Info over afspraken</Link></div></div>
    <div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="Huisartsenpraktijk Badhuis, home"><span className="brand-mark">B</span><span><strong>Huisartsenpraktijk</strong><em>Badhuis</em></span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="hoofdnavigatie" aria-label={open ? "Menu sluiten" : "Menu openen"}>{open ? <X /> : <Menu />}</button>
      <nav id="hoofdnavigatie" className={open ? "main-nav is-open" : "main-nav"} aria-label="Hoofdnavigatie">
        <Link href="/praktijk" onClick={() => setOpen(false)}>De praktijk</Link>
        <Link href="/nieuws" onClick={() => setOpen(false)}>Nieuws</Link>
        <Link href="/team" onClick={() => setOpen(false)}>Team</Link>
        <div className="nav-dropdown"><button>Info <ChevronDown size={15} aria-hidden="true" /></button><div className="dropdown-menu"><Link href="/info/wachtpost">Wachtpost</Link><Link href="/info/afspraken">Afspraken</Link></div></div>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        <BookingLink className="button button-primary nav-cta" label="Afspraak maken" />
      </nav>
    </div>
  </header>;
}
