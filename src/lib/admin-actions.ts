"use server";
import { randomBytes, createHash } from "crypto";
import { head, del } from "@vercel/blob";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { getDb } from "@/db";
import { admins, passwordResetTokens, posts, siteContent } from "@/db/schema";
import { siteConfig } from "./config";
import { slugify } from "./slug";
import { validateNewsImage } from "./news-image";

export type ActionState={error?:string;success?:string};
export async function loginAction(_state:ActionState,formData:FormData):Promise<ActionState>{try{await signIn("credentials",{email:String(formData.get("email")),password:String(formData.get("password")),redirect:false});}catch{return {error:"De combinatie van e-mailadres en wachtwoord is niet geldig."}}redirect("/beheer/nieuws");}
export async function logoutAction(){await signOut({redirectTo:"/"})}
async function requireAdmin(){const session=await auth();if(!session?.user?.email)redirect("/beheer/inloggen");return session.user.email.toLowerCase()}

const postSchema=z.object({title:z.string().trim().min(3).max(140),excerpt:z.string().trim().min(10).max(320),content:z.string().min(3),status:z.enum(["draft","published"]),imageAlt:z.string().trim().max(180).optional()});
function cleanContent(value:string){return sanitizeHtml(value,{allowedTags:["p","h2","h3","strong","em","ul","ol","li","a","br"],allowedAttributes:{a:["href","target","rel"]},allowedSchemes:["http","https","mailto"]});}
async function uploadedImage(value: FormDataEntryValue | null) {
  if (!value) return null;
  if (typeof value !== "string") throw new Error("Ongeldige afbeelding.");
  const url = new URL(value);
  if (url.protocol !== "https:" || !/^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(url.hostname) || !url.pathname.startsWith("/nieuws/")) {
    throw new Error("Ongeldige afbeelding.");
  }
  const blob = await head(value);
  validateNewsImage({ size: blob.size, type: blob.contentType });
  return blob;
}
export async function savePostAction(_state:ActionState,formData:FormData):Promise<ActionState>{await requireAdmin();const db=getDb();if(!db)return {error:"De database is nog niet gekoppeld."};const parsed=postSchema.safeParse({title:formData.get("title"),excerpt:formData.get("excerpt"),content:formData.get("content"),status:formData.get("status"),imageAlt:formData.get("imageAlt")});if(!parsed.success)return {error:"Controleer de titel, samenvatting en inhoud."};try{const id=String(formData.get("id")||"");const existingSlug=String(formData.get("slug")||"");let slug=existingSlug||slugify(parsed.data.title);const [conflict]=await db.select({id:posts.id}).from(posts).where(eq(posts.slug,slug)).limit(1);if(conflict&&conflict.id!==id)slug=`${slug}-${Date.now().toString().slice(-5)}`;const blob=await uploadedImage(formData.get("uploadedImage"));const data={title:parsed.data.title,slug,excerpt:parsed.data.excerpt,content:cleanContent(parsed.data.content),imageAlt:parsed.data.imageAlt||null,status:parsed.data.status,imageUrl:blob?.url||String(formData.get("existingImage")||"")||null,publishedAt:parsed.data.status==="published"?new Date():null,updatedAt:new Date()};if(id)await db.update(posts).set(data).where(eq(posts.id,id));else await db.insert(posts).values(data);revalidatePath("/");revalidatePath("/nieuws");}catch(error){return {error:error instanceof Error?error.message:"Opslaan is niet gelukt."}}redirect("/beheer/nieuws");}
export async function deletePostAction(formData:FormData){await requireAdmin();const db=getDb();if(!db)return;const id=String(formData.get("id"));const [post]=await db.select().from(posts).where(eq(posts.id,id)).limit(1);if(post?.imageUrl&&post.imageUrl.includes("blob.vercel-storage.com")){try{await del(post.imageUrl)}catch{}}await db.delete(posts).where(eq(posts.id,id));revalidatePath("/nieuws");redirect("/beheer/nieuws");}
export async function listAdminPosts(){await requireAdmin();const db=getDb();return db?db.select().from(posts).orderBy(desc(posts.updatedAt)):[]}
export async function getAdminPost(id:string){await requireAdmin();const db=getDb();if(!db)return null;const [post]=await db.select().from(posts).where(eq(posts.id,id)).limit(1);return post||null}
export async function requestResetAction(_state:ActionState,formData:FormData):Promise<ActionState>{const email=String(formData.get("email")||"").toLowerCase();const db=getDb();if(!db)return {success:"Als dit account bestaat, ontvangt u zo meteen een e-mail."};const [admin]=await db.select().from(admins).where(eq(admins.email,email)).limit(1);if(admin&&process.env.RESEND_API_KEY){const token=randomBytes(32).toString("hex");const hash=createHash("sha256").update(token).digest("hex");await db.insert(passwordResetTokens).values({email,tokenHash:hash,expiresAt:new Date(Date.now()+30*60*1000)});const resend=new Resend(process.env.RESEND_API_KEY);await resend.emails.send({from:process.env.RESEND_FROM||"Badhuis <onboarding@resend.dev>",to:email,subject:"Nieuw wachtwoord instellen",html:`<p>U vroeg een nieuw wachtwoord aan voor Huisartsenpraktijk Badhuis.</p><p><a href="${siteConfig.url}/beheer/wachtwoord-resetten?token=${token}">Stel een nieuw wachtwoord in</a>. Deze link is 30 minuten geldig.</p>`});}return {success:"Als dit account bestaat, ontvangt u zo meteen een e-mail."};}
export async function resetPasswordAction(_state:ActionState,formData:FormData):Promise<ActionState>{const token=String(formData.get("token")||"");const password=String(formData.get("password")||"");if(password.length<12)return {error:"Gebruik minimaal 12 tekens."};const db=getDb();if(!db)return {error:"De database is nog niet gekoppeld."};const hash=createHash("sha256").update(token).digest("hex");const [record]=await db.select().from(passwordResetTokens).where(and(eq(passwordResetTokens.tokenHash,hash),gt(passwordResetTokens.expiresAt,new Date()),isNull(passwordResetTokens.usedAt))).limit(1);if(!record)return {error:"Deze herstel-link is ongeldig of verlopen."};await db.transaction(async tx=>{await tx.update(admins).set({passwordHash:await bcrypt.hash(password,12),updatedAt:new Date()}).where(eq(admins.email,record.email));await tx.update(passwordResetTokens).set({usedAt:new Date()}).where(eq(passwordResetTokens.id,record.id));});return {success:"Uw wachtwoord is gewijzigd. U kunt nu aanmelden."};}

export async function saveFaqAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const db = getDb();
  if (!db) return { error: "De database is nog niet gekoppeld. Er is niets opgeslagen." };
  const raw = formData.get("items");
  if (typeof raw !== "string" || raw.length > 200000) return { error: "De FAQ is te groot of ongeldig." };
  try {
    const items = z.array(z.object({ question: z.string().trim().min(3).max(200), answer: z.string().trim().min(3).max(5000) })).max(50).parse(JSON.parse(raw));
    await db.insert(siteContent).values({ key: "faq", items }).onConflictDoUpdate({ target: siteContent.key, set: { items, updatedAt: new Date() } });
    revalidatePath("/faq");
    revalidatePath("/beheer/faq");
    return { success: "De FAQ is opgeslagen en zichtbaar op de website." };
  } catch { return { error: "Opslaan is niet gelukt. Vul elke vraag en elk antwoord in en probeer opnieuw." }; }
}
