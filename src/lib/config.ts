export const siteConfig = {
  name: "Huisartsenpraktijk Badhuis",
  shortName: "Badhuis",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://huisartsenpraktijkbadhuis.be",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://progenda.be/centers/van-de-leest-wout?locale=nl",
  phone: "03 790 12 14",
  phoneHref: "tel:+3237901214",
  address: "Pachtstraat 16, 2000 Antwerpen",
  hours: [
    ["Maandag – vrijdag", "08:00 – 18:00"],
    ["Weekend", "Gesloten"],
  ],
} as const;
