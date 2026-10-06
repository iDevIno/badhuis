import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { AlertCircle, Clock3, ExternalLink, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BookingLink } from "@/components/booking-link";
import { siteConfig } from "@/lib/config";
import { team } from "@/lib/content";

export const metadata = pageMetadata("Contact en bereikbaarheid in Antwerpen", "Huisartsenpraktijk Badhuis, Pachtstraat 16, 2000 Antwerpen, wijk Sint-Andries. Bekijk openingsuren, telefoonnummers en contactmomenten per arts.", "/bereikbaarheid");

export default function Bereikbaarheid() {
  return <>
    <PageHero title="Bereikbaarheid" intro="Hier vindt u onze openingsuren, contactgegevens en informatie over de wachtpost." />
    <nav className="container reach-nav" aria-label="Op deze pagina">
      <a href="#contact">Contact</a>
      <a href="#wachtpost">Wachtpost</a>
      <a href="#contactmomenten">Contactmomenten per arts</a>
    </nav>
    <section className="section reach-section" id="contact" aria-label="Contact"><div className="container contact-grid"><div className="contact-panel"><h2>Praktijkgegevens</h2><div className="contact-row"><MapPin/><div><span>Adres</span>{siteConfig.address}</div></div><div className="contact-row"><Phone/><div><span>Telefoon</span><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></div></div><div className="contact-row"><Clock3/><div style={{width:"100%"}}><span>Openingsuren</span><table className="hours-table"><tbody>{siteConfig.hours.map(([d,h])=><tr key={d}><td>{d}</td><td>{h}</td></tr>)}</tbody></table></div></div></div><figure className="practice-entrance"><div className="practice-entrance-photo"><Image src="/images/praktijk/ingang.webp" alt="De ingang van Huisartsenpraktijk Badhuis: een groene deur naast het rode kruis aan de bakstenen gevel" fill sizes="(max-width: 960px) calc(100vw - 40px), 50vw" /></div><figcaption>De ingang van onze praktijk aan {siteConfig.address}.<span>Fotografie: Katie Verkinderen</span></figcaption></figure></div></section>
    <section className="section reach-section" id="wachtpost" aria-labelledby="wachtpost-title"><div className="container reach-heading"><h2 id="wachtpost-title">Wachtpost</h2><p>Medische hulp buiten de openingsuren.</p></div><div className="container content-grid"><article className="prose"><h3>Wanneer belt u de wachtpost?</h3><p>Bel 1733 voor een dringend medisch probleem dat niet kan wachten tot het spreekuur van uw eigen huisarts. Een medewerker beoordeelt uw oproep en vertelt waar u terechtkunt.</p><h3>Bij levensgevaar</h3><p>Bij een levensbedreigende noodsituatie belt u onmiddellijk 112.</p></article><aside className="info-card"><AlertCircle size={28}/><h3>Huisartsenwachtpost Brabo</h3><p><MapPin size={17}/> Sint-Vincentiusstraat 20, 2018 Antwerpen</p><a className="button button-primary" href="tel:1733"><Phone size={18}/>Bel 1733</a><a className="text-link" href="https://www.huisartsenminerva.be/" target="_blank" rel="noreferrer">Website wachtpost <ExternalLink size={15}/></a></aside></div></section>
    <section className="section reach-section" id="contactmomenten" aria-labelledby="contactmomenten-title">
      <div className="container reach-heading">
        <h2 id="contactmomenten-title">Contactmomenten per arts</h2>
        <p>Hier vindt u de telefonische bereikbaarheid per arts.</p>
        <p><strong>Voicemail:</strong> laat geen voicemailbericht achter. Voicemailberichten worden niet beluisterd.</p>
      </div>
      <div className="container content-grid">
        <div>
          {team.map(member => (
            <article className="doctor-contact" key={member.name}>
              <h3>{member.name}</h3>
              <dl className="doctor-contact-details">
                <div>
                  <dt>{member.contact?.phone ? "Telefoon" : "Praktijknummer"}</dt>
                  <dd><a href={member.contact?.phoneHref ?? siteConfig.phoneHref}>{member.contact?.phone ?? siteConfig.phone}</a></dd>
                </div>
                {member.contact && <div>
                  <dt>Belmomenten</dt>
                  <dd>{member.contact.shortHours ?? member.contact.hours}</dd>
                </div>}
                {member.contact?.absence && <div>
                  <dt>Aanwezigheid</dt>
                  <dd>{member.contact.absence}</dd>
                </div>}
                {member.contact?.appointments && <div>
                  <dt>Afspraken</dt>
                  <dd>
                    <ul>{member.contact.appointments.map(instruction => <li key={instruction}>{instruction}</li>)}</ul>
                    <p>Praktijknummer: <a href={siteConfig.phoneHref}>{siteConfig.phone}</a></p>
                  </dd>
                </div>}
              </dl>
            </article>
          ))}
        </div>
        <aside className="info-card">
          <h3>Een consultatie plannen</h3>
          <p>Beschikbare afspraken vindt u in de online agenda.</p>
          <BookingLink className="team-link" label="Afspraak maken" />
        </aside>
      </div>
    </section>
  </>;
}
