# SEO en GEO — Huisartsenpraktijk Badhuis

Controle: 6 oktober 2026. Doel: vindbaarheid voor huisarts/huisartsen in Sint-Andries en Antwerpen.

## Uitgevoerde verbeteringen

- Homepage gericht op “Huisarts in Sint-Andries, Antwerpen”, met eigen titel en beschrijving.
- Elke publieke hoofdpagina heeft nu een eigen canonical. Team en nieuws namen voorheen de homepage-canonical over.
- Eigen Open Graph- en deelmetadata per pagina, inclusief praktijkfoto.
- Zichtbare praktijktekst vermeldt wijk, stad, volledig adres, afspraken en links naar artsen en belmomenten.
- MedicalClinic-gegevens bevatten een vaste identifier, URL, telefoon, adres, wijk en echte praktijkfoto. De specialiteit is gecorrigeerd naar schema.org/PrimaryCare.
- JSON-LD wordt veilig geserialiseerd. Geen verzonnen coördinaten, beoordelingen, keurmerken of kwalificaties toegevoegd.
- Sitemap wordt actueel opgevraagd, bevat publieke pagina’s en gepubliceerde berichten, en gebruikt waar beschikbaar de wijzigingsdatum van het bericht. Geen kunstmatige wijzigingsdatum meer op statische pagina’s.
- Bestaande basis: Nederlandstalige HTML, één hoofdtitel per pagina, tekst en links in server-rendered HTML, robots.txt en noindex voor beheer.

## Nog regelen bij publicatie — hoge prioriteit

1. **Eén publiek hoofddomein.** Koppel huisartsenpraktijkbadhuis.be aan de productieomgeving in Vercel. NEXT_PUBLIC_SITE_URL moet exact dat adres gebruiken. Controleer HTTPS en redirects vanaf www/andere publieke domeinen. De lokale metadata gebruikt dit domein al; de bereikbaarheid en indexeerbaarheid van de productieomgeving zijn nog niet bevestigd.
2. **Google Bedrijfsprofiel.** Claim/verifieer het bestaande praktijkprofiel of maak een profiel als er nog geen is. Gebruik de echte praktijknaam zonder extra zoekwoorden, de passende categorie huisarts/huisartsenpraktijk, Pachtstraat 16, 2000 Antwerpen, het praktijknummer, website en afspraaklink. Voeg echte praktijkfoto’s toe. Vermijd dubbele profielen voor dezelfde praktijk.
3. **Search Console.** Verifieer het domein, dien https://huisartsenpraktijkbadhuis.be/sitemap.xml in en controleer de homepage, team- en contactpagina via URL-inspectie. Controleer ook eventuele uitsluitingen en robots/noindex op de productieomgeving.
4. **Gegevens bevestigen.** De footer noemt de website nog een concept met onbevestigde praktijkgegevens. Bevestig openingsuren en andere praktijkafspraken vóór deze tekst wordt verwijderd. De standaard-FAQ bevat concrete beleidsuitspraken en een inschrijfdatum zonder jaartal: laat deze door de praktijk bevestigen en actualiseren. Deze audit heeft de medische/praktijkinhoud niet als juist gevalideerd.
5. **Consistente vermeldingen.** Houd naam, adres, telefoon en website gelijk op Google, ProGenda en bestaande relevante artsen-/praktijkvermeldingen. Vraag beheerders van bestaande vermeldingen om de website toe te voegen als die ontbreekt.

## GEO / AI-zoekdiensten

De zichtbare, feitelijke antwoorden over locatie, artsen, afspraken en contact vormen de basis. Zorg dat de productiepagina’s publiek bereikbaar en crawlbaar zijn. De huidige robots.txt sluit publieke pagina’s niet uit. Er is geen speciale AI-tekst of llms.txt toegevoegd: Google gebruikt dit niet als vereiste voor zijn AI-zoekfuncties. Indexering of vermelding in een AI-antwoord is niet gegarandeerd.

## Meten na publicatie

- Zoekvertoningen, klikken en zoektermen in Search Console: huisarts Sint-Andries, huisarts Antwerpen en praktijk-/artsnamen.
- Websitebezoeken, belklikken en routeaanvragen vanuit Google Bedrijfsprofiel.
- Mobiele prestaties/Core Web Vitals met PageSpeed Insights op de echte productie-URL; nog niet gemeten in deze lokale controle.
- Geen rankingpercentage of SEO-score toegekend: zonder productie-URL, Search Console en Bedrijfsprofielgegevens is dat niet onderbouwd.

## Bronnen

- Google lokale vindbaarheid: https://support.google.com/business/answer/7091?hl=en
- Google AI-zoekfuncties: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Schema.org MedicalClinic: https://schema.org/MedicalClinic
- Schema.org PrimaryCare: https://schema.org/PrimaryCare
