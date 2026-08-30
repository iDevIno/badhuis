import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Afspraken", description: "Praktische informatie over afspraken bij Huisartsenpraktijk Badhuis." };

export default function Afspraken() {
  return <><PageHero title="Afspraken" intro="Maak online een afspraak. Neem telefonisch contact op als u niet weet welk type afspraak u moet boeken."/><section className="section"><div className="container content-grid"><article className="prose"><h2>Online een afspraak maken</h2><p>Via Helena Pro ziet u de beschikbare momenten van onze artsen. Boek één afspraak per patiënt. Voor meerdere personen of meerdere vragen boekt u afzonderlijke momenten.</p><h2>Telefonisch contact</h2><p>Voor een dringend probleem of wanneer u online geen geschikt moment vindt, belt u tijdens de openingsuren naar <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p><h2>Kom op tijd</h2><p>Breng uw identiteitskaart en een actueel medicatieoverzicht mee. Kunt u niet komen? Annuleer uw afspraak dan zo vroeg mogelijk.</p><h2>Nieuwe patiënten</h2><p>Nieuwe patiënten kunnen zich vanaf 12 oktober inschrijven. Breng bij uw eerste afspraak uw identiteitskaart mee.</p></article><aside className="info-card"><h2>Online agenda</h2><p>De knop opent de Helena Pro-agenda.</p><BookingLink/></aside></div></section></>;
}
