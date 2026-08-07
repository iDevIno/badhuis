import Link from "next/link";
import { ArrowUpRight, Clock3, Info, MapPin } from "lucide-react";
import { BookingLink } from "@/components/booking-link";
import { demoPosts, team } from "@/lib/content";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Huisartsenpraktijk Badhuis",
    telephone: "+32 3 555 12 12",
    email: "info@huisartsenpraktijkbadhuis.be",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Badhuisstraat 24",
      postalCode: "2000",
      addressLocality: "Antwerpen",
      addressCountry: "BE",
    },
    medicalSpecialty: "GeneralPractice",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-index" aria-hidden="true">
            <span>Huisartsenpraktijk</span>
            <span>Antwerpen · 2000</span>
          </div>
          <div className="home-hero-statement">
            <p className="home-kicker">Huisartsenpraktijk Badhuis</p>
            <h1>Een huisartsenpraktijk in Sint-Andries, Antwerpen.</h1>
            <p>De naam van de praktijk verwijst naar het voormalige badhuis dat in dit gebouw gevestigd was. Buurtbewoners konden er vroeger terecht om zich te wassen.</p>
          </div>
          <div className="home-hero-facts">
            <p><span>Wijk</span>Sint-Andries</p>
            <p><span>Adres</span>Badhuisstraat 24<br />2000 Antwerpen</p>
            <Link href="/praktijk" className="home-inline-link">
              Over de praktijk <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="practice-desk" aria-label="Praktische informatie">
        <div className="container practice-desk-grid">
          <div className="desk-status">
            <span className="desk-dot" />
            <span><strong>Openingsuren</strong>Ma–vr · 08:00 — 18:00</span>
          </div>
          <Link href="/info/afspraken" className="desk-item">
            <Info size={19} />
            <span><small>Praktische informatie</small>Afspraken</span>
          </Link>
          <Link href="/contact" className="desk-item">
            <MapPin size={19} />
            <span><small>U vindt ons hier</small>Badhuisstraat 24</span>
          </Link>
          <BookingLink className="desk-booking" label="Plan uw afspraak" />
        </div>
      </section>

      <section className="home-manifesto">
        <div className="container manifesto-grid">
          <p className="home-section-number">01 / Praktijkafspraken</p>
          <div>
            <h2>Enkele afspraken voor een vlot verloop van de consultaties.</h2>
            <div className="practice-rules">
              <article><span>01</span><div><h3>Kom op tijd</h3><p>Meld u op het afgesproken uur aan in de praktijk.</p></div></article>
              <article><span>02</span><div><h3>Respect</h3><p>We verwachten een respectvolle omgang met artsen, medewerkers en andere patiënten.</p></div></article>
              <article><span>03</span><div><h3>Aanvullingen volgen</h3><p>De overige praktijkafspraken worden nog aangevuld.</p></div></article>
            </div>
          </div>
        </div>
      </section>

      <section className="home-practice-image" aria-label="Een lichte consultatieruimte in de praktijk">
        <div className="container practice-image-wrap">
          <div className="practice-image" />
          <p><span>Badhuisstraat 24</span>Huisartsenpraktijk Badhuis · Sint-Andries</p>
        </div>
      </section>

      <section className="home-route-section">
        <div className="container home-route-grid">
          <div>
            <p className="home-section-number">02 / Snel naar</p>
            <h2>Praktische informatie</h2>
          </div>
          <nav className="route-list" aria-label="Praktische informatie">
            <Link href="/info/wachtpost"><span>01</span><strong>Buiten de openingsuren</strong><small>De huisartsenwachtpost</small><ArrowUpRight /></Link>
            <Link href="/info/geconventioneerd"><span>02</span><strong>Tarieven</strong><small>Geconventioneerde artsen</small><ArrowUpRight /></Link>
            <Link href="/contact"><span>03</span><strong>Contact en route</strong><small>Adres en bereikbaarheid</small><ArrowUpRight /></Link>
          </nav>
        </div>
      </section>

      <section className="home-team-section">
        <div className="container">
          <div className="home-section-heading">
            <div><p className="home-section-number">03 / Team</p><h2>Ons team</h2></div>
            <Link href="/team" className="home-inline-link">Bekijk het team <ArrowUpRight size={17} /></Link>
          </div>
          <div className="home-team-list">
            {team.map((member, index) => (
              <article className="home-team-row" key={member.name}>
                <span className="team-index">0{index + 1}</span>
                <img src={member.image} alt={`Portret van ${member.name}`} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <small>{member.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-news-section">
        <div className="container home-news-grid">
          <div className="news-intro">
            <p className="home-section-number">04 / Van de praktijk</p>
            <h2>Praktijknieuws</h2>
            <Link href="/nieuws" className="home-inline-link">Alle berichten <ArrowUpRight size={17} /></Link>
          </div>
          <div className="home-news-list">
            {demoPosts.map((post) => (
              <article key={post.id}>
                <time>{post.publishedAt.toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" })}</time>
                <div><h3>{post.title}</h3><p>{post.excerpt}</p></div>
                <Link href={`/nieuws/${post.slug}`} aria-label={`Lees ${post.title}`}><ArrowUpRight /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-closing">
        <div className="container home-closing-grid">
          <Clock3 aria-hidden="true" />
          <div><p>Afspraken</p><h2>Maak online een afspraak.</h2></div>
          <BookingLink className="home-closing-link" label="Open de agenda" />
        </div>
      </section>
    </>
  );
}
