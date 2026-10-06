# Badhuis General Practice

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `.env.local`, then initialize the database:

```bash
npm run db:migrate
```

## Checks

```bash
npm run lint
npm run build
```

## Websiteadres en FAQ

Het publieke websiteadres is `https://huisartsenpraktijkbadhuis.be`. Stel
`NEXT_PUBLIC_SITE_URL` ook op de hosting in en koppel het domein daar via DNS.

De FAQ is beschikbaar op `/faq` en beheerbaar via `/beheer/faq` (ook bereikbaar
vanuit Nieuwsbeheer). Beheerders kunnen vragen toevoegen, bewerken, verwijderen
en ordenen. Opslaan publiceert de volledige lijst. Zonder database worden de
standaardvragen getoond; opslaan is dan niet mogelijk.

Voer voor publicatie `npm run db:migrate` uit met de productie-databaseconfiguratie;
de nieuwe migratie maakt de tabel `site_content` aan. Contactmomenten per arts
wachten nog op informatie van de praktijk. De hero gebruikt de bestaande sfeerfoto.

## Gebruikersbeheer

Via `/beheer/gebruikers` kunnen ingelogde beheerders extra beheerders aanmaken
en hun eigen wachtwoord wijzigen na controle van het huidige wachtwoord. Alle
accounts hebben dezelfde beheerrechten. De bestaande tabel `admins` wordt gebruikt;
hiervoor is geen nieuwe database-migratie nodig. Deel de inloggegevens zelf met
de nieuwe gebruiker; er wordt geen uitnodigingsmail verstuurd.

Controle: `node --test tests/user-management.mjs`. Deze tests gebruiken een
gesimuleerde database en echte wachtwoordhashes; ze wijzigen geen live accounts.
