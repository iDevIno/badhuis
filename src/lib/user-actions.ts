"use server";

import bcrypt from "bcryptjs";
import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { admins } from "@/db/schema";
import type { ActionState } from "./admin-actions";

async function accountContext() {
  const session = await auth();
  if (!session?.user?.email) redirect("/beheer/inloggen");
  const db = getDb();
  if (!db) return null;
  const [account] = await db.select().from(admins).where(eq(admins.email, session.user.email.toLowerCase())).limit(1);
  if (!account) redirect("/beheer/inloggen");
  return { db, account };
}

function newPassword(data: FormData) {
  const password = data.get("password");
  if (typeof password !== "string" || password.length < 12) return { error: "Gebruik minimaal 12 tekens voor het nieuwe wachtwoord." };
  if (Buffer.byteLength(password, "utf8") > 72) return { error: "Het wachtwoord is te lang. Gebruik maximaal 72 bytes (bijzondere tekens tellen soms dubbel)." };
  if (password !== data.get("confirmPassword")) return { error: "De twee nieuwe wachtwoorden komen niet overeen." };
  return { password };
}

export async function listUsers() {
  const context = await accountContext();
  if (!context) return null;
  const users = await context.db.select({ id: admins.id, email: admins.email }).from(admins).orderBy(asc(admins.email));
  return { users, currentEmail: context.account.email };
}

export async function createUserAction(_state: ActionState, data: FormData): Promise<ActionState> {
  const context = await accountContext();
  if (!context) return { error: "De database is nog niet gekoppeld." };
  const email = z.string().trim().toLowerCase().email().max(254).safeParse(data.get("email"));
  if (!email.success) return { error: "Vul een geldig e-mailadres in." };
  const credentials = newPassword(data);
  if (credentials.error || !credentials.password) return { error: credentials.error };
  try {
    const created = await context.db.insert(admins).values({ email: email.data, passwordHash: await bcrypt.hash(credentials.password, 12) }).onConflictDoNothing({ target: admins.email }).returning({ id: admins.id });
    if (!created.length) return { error: "Er bestaat al een gebruiker met dit e-mailadres." };
    revalidatePath("/beheer/gebruikers");
    return { success: `Gebruiker ${email.data} is aangemaakt en kan nu inloggen.` };
  } catch {
    return { error: "De gebruiker kon niet worden aangemaakt. Probeer opnieuw." };
  }
}

export async function changeOwnPasswordAction(_state: ActionState, data: FormData): Promise<ActionState> {
  const context = await accountContext();
  if (!context) return { error: "De database is nog niet gekoppeld." };
  const credentials = newPassword(data);
  if (credentials.error || !credentials.password) return { error: credentials.error };
  const current = data.get("currentPassword");
  if (typeof current !== "string" || current.length > 128 || !await bcrypt.compare(current, context.account.passwordHash)) {
    return { error: "Uw huidige wachtwoord is niet juist." };
  }
  try {
    const updated = await context.db.update(admins).set({ passwordHash: await bcrypt.hash(credentials.password, 12), updatedAt: new Date() }).where(and(eq(admins.id, context.account.id), eq(admins.passwordHash, context.account.passwordHash))).returning({ id: admins.id });
    if (!updated.length) return { error: "Uw account is ondertussen gewijzigd. Meld u opnieuw aan en probeer opnieuw." };
    return { success: "Uw wachtwoord is gewijzigd. Gebruik het nieuwe wachtwoord bij uw volgende aanmelding." };
  } catch {
    return { error: "Uw wachtwoord kon niet worden gewijzigd. Probeer opnieuw." };
  }
}
