export const siteConfig = {
  name: "Huisartsenpraktijk Badhuis",
  shortName: "Badhuis",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  bookingUrl: process.env.NEXT_PUBLIC_HELENA_URL || "https://agenda.helena.care/",
  phone: "03 555 12 12",
  phoneHref: "tel:+3235551212",
  email: "info@huisartsenpraktijkbadhuis.be",
  address: "Badhuisstraat 24, 2000 Antwerpen",
  hours: [
    ["Maandag – vrijdag", "08:00 – 18:00"],
    ["Telefonisch bereikbaar", "08:00 – 12:00 & 14:00 – 18:00"],
    ["Weekend", "Gesloten — contacteer de wachtpost"],
  ],
} as const;
