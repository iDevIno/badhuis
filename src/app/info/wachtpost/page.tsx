import type { Metadata } from "next";
import { AlertCircle, ExternalLink, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Wachtpost", description: "Medische hulp buiten de openingsuren van Huisartsenpraktijk Badhuis." };

export default function Wachtpost() {
  return <><PageHero title="Wachtpost" intro="Voor een dringend medisch probleem buiten de openingsuren belt u 1733."/><section className="section"><div className="container content-grid"><article className="prose"><h2>Wanneer belt u de wachtpost?</h2><p>Bel 1733 voor een dringend medisch probleem dat niet kan wachten tot het spreekuur van uw eigen huisarts. Een medewerker beoordeelt uw oproep en vertelt waar u terechtkunt.</p><h2>Bij levensgevaar</h2><p>Bij een levensbedreigende noodsituatie belt u onmiddellijk 112.</p></article><aside className="info-card"><AlertCircle size={28}/><h2>Huisartsenwachtpost Brabo</h2><p><MapPin size={17}/> Sint-Vincentiusstraat 20, 2018 Antwerpen</p><a className="button button-primary" href="tel:1733"><Phone size={18}/>Bel 1733</a><a className="text-link" href="https://www.huisartsenminerva.be/" target="_blank" rel="noreferrer">Website wachtpost <ExternalLink size={15}/></a></aside></div></section></>;
}
