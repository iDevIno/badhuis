import type { Metadata } from "next";
import { BookingLink } from "@/components/booking-link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { team } from "@/lib/content";
export const metadata:Metadata={title:"Ons team",description:"De huisartsen en praktijkmedewerkers van Huisartsenpraktijk Badhuis."};
export default function Team(){return <><PageHero title="Ons team" intro="De artsen en medewerkers van Huisartsenpraktijk Badhuis."/><section className="section"><div className="container team-grid">{team.map(member=><article className="team-card" key={member.name}><img className="team-photo" src={member.image} alt={`Portret van ${member.name}`}/><div className="team-card-content"><p className="team-role">{member.role}</p><h2>{member.name}</h2><p className="team-detail">{member.detail}</p>{member.role==="Huisarts"&&<BookingLink className="team-link" label="Afspraak maken →"/>}</div></article>)}</div></section><CtaBand/></>}
