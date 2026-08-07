import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() { return <footer className="footer"><div className="container footer-grid">
  <div><div className="footer-brand"><span className="brand-mark light">B</span><span><strong>Huisartsenpraktijk</strong><em>Badhuis</em></span></div><p>Huisartsenpraktijk in Sint-Andries, Antwerpen.</p></div>
  <div><h2>Contact</h2><p><MapPin size={17}/>{siteConfig.address}</p><p><Phone size={17}/><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></p><p><Clock3 size={17}/>Ma–vr, 08:00–18:00</p></div>
  <div><h2>Snel naar</h2><Link href="/info/afspraken">Afspraken</Link><Link href="/info/wachtpost">Wachtpost</Link><Link href="/nieuws">Nieuws</Link><Link href="/beheer/inloggen">Beheer</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Huisartsenpraktijk Badhuis</span><span>Conceptwebsite — praktijkgegevens worden nog bevestigd</span></div></footer>; }
