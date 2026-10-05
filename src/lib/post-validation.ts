import { z } from "zod";

const postSchema = z.object({
  title: z.string().trim().min(3, "De titel moet minstens 3 tekens bevatten.").max(140, "De titel mag maximaal 140 tekens bevatten."),
  excerpt: z.string().trim().min(10, "De korte samenvatting moet minstens 10 tekens bevatten.").max(320, "De korte samenvatting mag maximaal 320 tekens bevatten."),
  content: z.string().refine(value => value.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;|\u00a0/g, " ").trim().length > 0, "Vul de inhoud van het nieuwsbericht in."),
  status: z.enum(["draft", "published"], { error: "Kies Concept of Gepubliceerd als status." }),
  imageAlt: z.string().trim().max(180, "De beschrijving van de afbeelding mag maximaal 180 tekens bevatten."),
});

export function validatePost(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return postSchema.safeParse({
    title: text("title"),
    excerpt: text("excerpt"),
    content: text("content"),
    status: text("status"),
    imageAlt: text("imageAlt"),
  });
}
