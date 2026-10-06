import { pageMetadata } from "@/lib/seo";
import { Phone } from "lucide-react";
import { BookingLink } from "@/components/booking-link";
import { PageHero } from "@/components/page-hero";
import { team } from "@/lib/content";
import { siteConfig } from "@/lib/config";

export const metadata = pageMetadata("Huisartsen in Sint-Andries", "Maak kennis met Wout Van De Leest, Bert Janssens, Juliette Melizan en Levi Van Winckel, huisartsen bij Badhuis in Sint-Andries, Antwerpen.", "/team");

export default function Team() {
  return (
    <div className="team-page">
      <PageHero title="Ons team" intro="De artsen en medewerkers van Huisartsenpraktijk Badhuis." />
      <section className="section">
        <div className="container team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <img className="team-photo team-avatar" src={member.image} alt="" />
              <div className="team-card-content">
                <p className="team-role">{member.role}</p>
                <h2>{member.name}</h2>
                <div className="team-contact">
                  <a href={member.contact?.phoneHref ?? siteConfig.phoneHref}>
                    {member.contact?.phone ?? siteConfig.phone}
                  </a>
                  <p>{member.contact?.shortHours ?? "Onthaal"}</p>
                </div>
                {member.role === "Huisarts" && (
                  member.onlineBookingAvailable ? (
                    <BookingLink className="team-link" label="Afspraak maken" href={member.bookingUrl} />
                  ) : (
                    <a className="team-link" href={siteConfig.phoneHref}>
                      <Phone aria-hidden="true" size={18} />Telefonisch afspreken
                    </a>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
