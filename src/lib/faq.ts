import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { siteContent } from "@/db/schema";

export type FaqItem = { question: string; answer: string };
export const defaultFaq: FaqItem[] = [
  { question: "Hoe maak ik een afspraak?", answer: "Via de online agenda ziet u de beschikbare momenten van onze artsen. Eén afspraak per patiënt helpt ons voldoende tijd te voorzien. Voor meerdere personen of meerdere vragen kunt u afzonderlijke momenten boeken. Vindt u geen geschikt moment of hebt u een dringend probleem? Bel ons tijdens de openingsuren." },
  { question: "Wat breng ik mee naar mijn afspraak?", answer: "Uw identiteitskaart en een actueel medicatieoverzicht zijn handig om mee te brengen. Als u op het afgesproken uur aanwezig bent, kunnen we de consultaties zo vlot mogelijk laten verlopen." },
  { question: "Kan ik attesten of medicatie aanvragen?", answer: "We bespreken attesten en medicatie graag tijdens een consultatie. Zo kan uw arts uw vraag zorgvuldig beoordelen. Aanvragen via mail of telefoon zijn alleen mogelijk als u dit vooraf met uw huisarts hebt afgesproken." },
  { question: "Wat als ik mijn afspraak niet kan nakomen?", answer: "Laat het ons liefst zo vroeg mogelijk weten als u verhinderd bent. Zo komt er een plaats vrij voor iemand anders. Bij drie gemiste afspraken volgt uitschrijving uit de praktijk." },
  { question: "Hoe zorgen we samen voor een aangenaam bezoek?", answer: "Een vriendelijke en respectvolle omgang met elkaar maakt de praktijk een aangename plek voor patiënten, artsen en medewerkers. Dank u om hier samen met ons voor te zorgen." },
  { question: "Kan ik me inschrijven als nieuwe patiënt?", answer: "Nieuwe patiënten kunnen zich vanaf 12 oktober inschrijven. Bij uw eerste afspraak neemt u uw identiteitskaart mee." },
];
export async function getFaq(): Promise<FaqItem[]> {
  const db = getDb();
  if (!db) return defaultFaq;
  const [record] = await db.select().from(siteContent).where(eq(siteContent.key, "faq")).limit(1);
  return record ? record.items : defaultFaq;
}
