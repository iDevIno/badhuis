import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock3, Info, MapPin } from "lucide-react";
import { BookingLink } from "@/components/booking-link";
import { team } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const news = await getPublishedPosts(3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Huisartsenpraktijk Badhuis",
    telephone: "+32 3 790 12 14",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pachtstraat 16",
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

      <section className="home-photo-hero" aria-label="Huisartsenpraktijk Badhuis">
        <Image src="/images/praktijk/wachtruimte.webp" alt="De lichte wachtruimte van Badhuis met hoge ramen en de groene toegangsdeur" fill sizes="100vw" preload />
        <div className="container home-photo-copy">
          <h1>Welkom bij Badhuis</h1>
          <p>Huisartsenpraktijk in Sint-Andries, Antwerpen.</p>
        </div>
      </section>

      <section className="practice-desk" aria-label="Praktische informatie">
        <div className="container practice-desk-grid">
          <div className="desk-status">
            <Clock3 size={19} aria-hidden="true" />
            <span><strong>Openingsuren</strong>Ma–vr · 08:00 — 18:00</span>
          </div>
          <Link href="/faq" className="desk-item">
            <Info size={19} />
            <span><small>Praktische informatie</small>Veelgestelde vragen</span>
          </Link>
          <Link href="/bereikbaarheid#contact" className="desk-item">
            <MapPin size={19} />
            <span><small>Adres</small>Pachtstraat 16</span>
          </Link>
          <BookingLink className="desk-booking" label="Plan uw afspraak" />
        </div>
      </section>

      <section className="home-news-section">
        <div className="container home-news-grid">
          <div className="news-intro">
            <h2>Praktijknieuws</h2>
            <Link href="/nieuws" className="home-inline-link">Alle berichten <ArrowRight size={17} /></Link>
          </div>
          <div className="home-news-list">
            {news.map((post) => (
              <article key={post.id}>
                <time>{post.publishedAt.toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" })}</time>
                <div><h3><Link href={`/nieuws/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-team-section">
        <div className="container">
          <div className="home-section-heading">
            <div><h2>Ons team</h2></div>
            <Link href="/team" className="home-inline-link">Bekijk het team <ArrowRight size={17} /></Link>
          </div>
          <div className="home-team-list">
            {team.map((member) => (
              <article className="home-team-row" key={member.name}>
                <img className="team-avatar" src={member.image} alt="" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-about" id="praktijk">
        <div className="container content-grid">
          <div><h2>Onze praktijk</h2></div>
          <div className="prose"><p>Huisartsenpraktijk Badhuis is er voor jong en oud in de wijk Sint-Andries in Antwerpen. Onze naam verwijst naar het badhuis dat hier van 1912 tot 1975 dienstdeed als publieke badkamer.</p><p>U kunt bij ons terecht voor algemene en acute zorg, langdurige begeleiding, preventie, vaccinaties en medische administratie. Indien nodig verwijzen we u door naar een specialist.</p><p>In uw globaal medisch dossier houden we onder meer uw medicatie, onderzoeksresultaten en eerdere behandelingen bij.</p></div>
        </div>
        <div className="container practice-photo-grid">
          <figure>
            <div className="practice-photo-frame practice-photo-reception"><Image src="/images/praktijk/onthaal.webp" alt="Het onthaal met een groene balie, houten trap en warm verlicht kruis" fill sizes="(max-width: 650px) calc(100vw - 40px), 33vw" /></div>
            <figcaption>Het onthaal</figcaption>
          </figure>
          <figure>
            <div className="practice-photo-frame"><Image src="/images/praktijk/consultatieruimte.webp" alt="Een consultatieruimte met onderzoekstafel en hoge ramen" fill sizes="(max-width: 650px) calc(100vw - 40px), 66vw" /></div>
            <figcaption>Een van onze consultatieruimtes</figcaption>
          </figure>
        </div>
        <p className="container practice-photo-credit">Fotografie: Katie Verkinderen</p>
      </section>

      <section className="home-route-section">
        <div className="container home-route-grid">
          <div>
            <h2>Praktische informatie</h2>
          </div>
          <nav className="route-list" aria-label="Praktische informatie">
            <Link href="/bereikbaarheid#wachtpost"><strong>Buiten de openingsuren</strong><small>De huisartsenwachtpost</small><ArrowRight /></Link>
            <Link href="/faq"><strong>Veelgestelde vragen</strong><small>Handig om te weten voor uw bezoek</small><ArrowRight /></Link>
            <Link href="/bereikbaarheid#contact"><strong>Contact en route</strong><small>Adres en bereikbaarheid</small><ArrowRight /></Link>
          </nav>
        </div>
      </section>


    </>
  );
}
