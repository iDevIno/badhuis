import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { admins } from "@/db/schema";

const credentialsSchema=z.object({email:z.string().email(),password:z.string().min(5).max(128)});
export const { handlers, auth, signIn, signOut }=NextAuth({
  trustHost:true,
  secret:process.env.AUTH_SECRET||(process.env.NODE_ENV==="development"?"badhuis-local-development-secret-only":"build-time-placeholder-set-auth-secret-on-vercel"),
  session:{strategy:"jwt",maxAge:60*60*8},
  pages:{signIn:"/beheer/inloggen"},
  providers:[Credentials({credentials:{email:{label:"E-mailadres",type:"email"},password:{label:"Wachtwoord",type:"password"}},async authorize(raw){
    const parsed=credentialsSchema.safeParse(raw);if(!parsed.success)return null;
    const email=parsed.data.email.toLowerCase();const db=getDb();let passwordHash:string|undefined;
    if(db){const [record]=await db.select().from(admins).where(eq(admins.email,email)).limit(1);passwordHash=record?.passwordHash;
      if(!record&&process.env.ADMIN_EMAIL?.toLowerCase()===email&&process.env.ADMIN_PASSWORD_HASH){await db.insert(admins).values({email,passwordHash:process.env.ADMIN_PASSWORD_HASH}).onConflictDoNothing();passwordHash=process.env.ADMIN_PASSWORD_HASH;}
    }else if(process.env.ADMIN_EMAIL?.toLowerCase()===email){passwordHash=process.env.ADMIN_PASSWORD_HASH;}
    if(!passwordHash||!await bcrypt.compare(parsed.data.password,passwordHash))return null;
    return {id:email,email,name:"Praktijkbeheerder"};
  }})],
  callbacks:{authorized:async({auth})=>!!auth?.user},
});
