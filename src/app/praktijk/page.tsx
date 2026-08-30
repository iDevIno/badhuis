import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "De praktijk", description: "Huisartsenpraktijk Badhuis in Sint-Andries, Antwerpen." };

export default function Praktijk() {
  return <><PageHero title="De praktijk" intro="Huisartsenpraktijk Badhuis is gevestigd in de wijk Sint-Andries in Antwerpen."/><section className="section"><div className="container content-grid"><article className="prose"><h2>Iedereen is welkom</h2><p>Bij ons kan iedereen terecht, jong en oud, met alles wat met algemene geneeskunde te maken heeft: acute zorg, langdurige begeleiding en preventie. Indien nodig verwijzen we u door naar een specialist.</p><h2>Globaal medisch dossier</h2><p>In het globaal medisch dossier worden onder meer uw medicatie, onderzoeksresultaten en eerdere behandelingen bijgehouden.</p></article><aside className="info-card"><h2>Waarvoor kunt u bij ons terecht?</h2><ul className="detail-list"><li><CheckCircle2 size={20}/>Algemene en acute zorg</li><li><CheckCircle2 size={20}/>Langdurige begeleiding</li><li><CheckCircle2 size={20}/>Preventie</li><li><CheckCircle2 size={20}/>Vaccinaties</li><li><CheckCircle2 size={20}/>Medische administratie</li></ul></aside></div></section><CtaBand/></>;
}
