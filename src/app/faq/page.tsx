import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { BookingLink } from "@/components/booking-link";
import { getFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/config";
export const metadata = pageMetadata("Veelgestelde vragen", "Antwoorden over afspraken en uw bezoek aan Huisartsenpraktijk Badhuis in Sint-Andries, Antwerpen.", "/faq");
export const dynamic = "force-dynamic";
export default async function Faq() {
  const items = await getFaq();
  return <><PageHero title="Veelgestelde vragen" intro="Handig om te weten voor uw bezoek. We helpen u graag op weg." /><section className="section"><div className="container content-grid"><div className="faq-list">{items.map((item, i) => <details key={i}><summary>{item.question}</summary><p>{item.answer}</p></details>)}{!items.length && <p>Heeft u een vraag? Neem gerust telefonisch contact met ons op.</p>}</div><aside className="info-card"><h2>Kunnen we u helpen?</h2><p>U kunt ons tijdens de openingsuren bereiken op <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>.</p><BookingLink /></aside></div></section></>;
}
