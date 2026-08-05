import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
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
          <div className="home-hero-title">
            <p className="home-kicker">Welkom bij Badhuis</p>
            <h1>Uw huisarts,<br />gewoon in<br /><em>de buurt.</em></h1>
          </div>
          <div className="home-hero-intro">
            <p>We zijn een kleinschalige groepspraktijk voor mensen uit de buurt. U kunt bij ons terecht met grote en kleine gezondheidsvragen, altijd met tijd voor een helder gesprek.</p>
            <Link href="/praktijk" className="home-inline-link">
              Leer ons kennen <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="practice-desk" aria-label="Praktische informatie">
        <div className="container practice-desk-grid">
          <div className="desk-status">
            <span className="desk-dot" />
            <span><strong>Vandaag bereikbaar</strong>08:00 — 18:00</span>
          </div>
          <a href="tel:+3235551212" className="desk-item">
            <Phone size={19} />
            <span><small>Liever bellen?</small>03 555 12 12</span>
          </a>
          <Link href="/contact" className="desk-item">
            <MapPin size={19} />
            <span><small>U vindt ons hier</small>Badhuisstraat 24</span>
          </Link>
          <BookingLink className="desk-booking" label="Plan uw afspraak" />
        </div>
      </section>

      <section className="home-manifesto">
        <div className="container manifesto-grid">
          <p className="home-section-number">01 / Onze praktijk</p>
          <div>
            <h2>Goede zorg begint niet bij een dossier, maar bij aandacht.</h2>
            <div className="manifesto-copy">
              <p>We luisteren naar wat er speelt, leggen begrijpelijk uit en beslissen samen wat nodig is. Geen overbodige afstand, wel zorgvuldige geneeskunde.</p>
              <p>Ons vaste team kent de buurt en volgt u doorheen verschillende levensfasen. Zo blijft zorg persoonlijk, ook wanneer uw vraag complexer wordt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-practice-image" aria-label="Een lichte consultatieruimte in de praktijk">
        <div className="container practice-image-wrap">
          <div className="practice-image" />
          <p><span>Badhuisstraat 24</span>Een rustige plek voor een open gesprek.</p>
        </div>
      </section>

      <section className="home-route-section">
        <div className="container home-route-grid">
          <div>
            <p className="home-section-number">02 / Snel naar</p>
            <h2>Waarmee kunnen we u helpen?</h2>
          </div>
          <nav className="route-list" aria-label="Praktische informatie">
            <Link href="/info/afspraken"><span>01</span><strong>Afspraken en huisbezoeken</strong><small>Hoe een consultatie verloopt</small><ArrowUpRight /></Link>
            <Link href="/info/wachtpost"><span>02</span><strong>Hulp buiten de openingsuren</strong><small>De huisartsenwachtpost</small><ArrowUpRight /></Link>
            <Link href="/info/geconventioneerd"><span>03</span><strong>Tarieven en terugbetaling</strong><small>Wij zijn geconventioneerd</small><ArrowUpRight /></Link>
            <Link href="/contact"><span>04</span><strong>Route naar de praktijk</strong><small>Adres en bereikbaarheid</small><ArrowUpRight /></Link>
          </nav>
        </div>
      </section>

      <section className="home-team-section">
        <div className="container">
          <div className="home-section-heading">
            <div><p className="home-section-number">03 / Ons team</p><h2>De mensen die voor u klaarstaan.</h2></div>
            <Link href="/team" className="home-inline-link">Iedereen bekijken <ArrowUpRight size={17} /></Link>
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
            <h2>Berichten voor onze patiënten.</h2>
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
          <div><p>Een afspraak nodig?</p><h2>Kies online een moment dat voor u past.</h2></div>
          <BookingLink className="home-closing-link" label="Naar de agenda" />
        </div>
      </section>
    </>
  );
}
