type TeamMember = {
  name: string;
  role: string;
  detail: string;
  image: string;
  bookingUrl: string;
  onlineBookingAvailable: boolean;
  contact?: {
    hours: string;
    shortHours?: string;
    phone?: string;
    phoneHref?: string;
    absence?: string;
    appointments?: string[];
  };
};

export const team: TeamMember[] = [
  {
    name: "Wout Van De Leest",
    bookingUrl: "https://progenda.be/calendars/dokter-van-de-leest-wout-huisarts-antwerpen?locale=nl",
    onlineBookingAvailable: true,
    role: "Huisarts",
    detail: "Algemene geneeskunde",
    image: "/images/team/avatar.svg",
    contact: {
      hours: "Elke dag telefonisch bereikbaar van 12.00 tot 12.30 uur.",
      shortHours: "Dagelijks · 12.00–12.30 uur",
      phone: "0477 48 63 73",
      phoneHref: "tel:+32477486373",
      appointments: [
        "Via de online agenda of het praktijknummer, ook tijdens het dagelijkse telefoonmoment.",
      ],
    },
  },
  { name: "Bert Janssens",
    bookingUrl: "https://progenda.be/calendars/dokter-janssens-bert-huisarts-antwerpen?locale=nl",
    onlineBookingAvailable: true, role: "Huisarts", detail: "Algemene geneeskunde", image: "/images/team/avatar.svg" },
  {
    name: "Juliette Melizan",
    bookingUrl: "https://progenda.be/calendars/docteur-melizan-juliette-medecine-generale-antwerpen?locale=nl",
    onlineBookingAvailable: true,
    role: "Huisarts",
    detail: "Algemene geneeskunde",
    image: "/images/team/avatar.svg",
    contact: {
      hours: "Telefonisch bereikbaar op maandag, dinsdag, donderdag en vrijdag van 12.00 tot 12.30 uur.",
      shortHours: "Ma, di, do, vr · 12.00–12.30 uur",
      phone: "0491 63 04 03",
      phoneHref: "tel:+32491630403",
      absence: "Op woensdag niet aanwezig in de praktijk.",
    },
  },
  { name: "Levi Van Winckel",
    bookingUrl: "https://progenda.be/calendars/dokter-van-winckel-levi-antwerpen?locale=nl",
    onlineBookingAvailable: true, role: "Huisarts", detail: "Algemene geneeskunde", image: "/images/team/avatar.svg" },
];

export const demoPosts = [
  { id: "demo-1", slug: "vernieuwde-praktijk", title: "De praktijk is vernieuwd", excerpt: "De consultatieruimtes en de toegankelijkheid van het gebouw werden aangepast.", content: "<p>De consultatieruimtes zijn vernieuwd en de toegankelijkheid van het gebouw werd verbeterd.</p><h2>Wat verandert er?</h2><p>Afspraken kunnen zoals voordien telefonisch of online worden gemaakt.</p>", publishedAt: new Date("2026-06-12"), imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85", imageAlt: "Lichte, moderne wachtruimte" },
  { id: "demo-2", slug: "zomerregeling-2026", title: "Onze zomerregeling", excerpt: "Bekijk wanneer de praktijk deze zomer bereikbaar is en waar u buiten de uren terechtkunt.", content: "<p>Tijdens de zomermaanden blijft de praktijk op weekdagen geopend. Bij afwezigheid van uw vaste arts kunt u bij een collega terecht.</p>", publishedAt: new Date("2026-05-28"), imageUrl: null, imageAlt: null },
  { id: "demo-3", slug: "vaccinatiemomenten-najaar", title: "Vaccinatiemomenten dit najaar", excerpt: "Binnenkort kunt u opnieuw een afspraak maken voor de jaarlijkse vaccinatiemomenten.", content: "<p>In het najaar organiseren we verschillende vaccinatiemomenten. Meer praktische informatie volgt zodra de planning definitief is.</p>", publishedAt: new Date("2026-05-03"), imageUrl: null, imageAlt: null },
];
