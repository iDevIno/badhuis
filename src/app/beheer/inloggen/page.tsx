import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
export const metadata:Metadata={title:"Beheer aanmelden",robots:{index:false,follow:false}};export const dynamic="force-dynamic";
export default async function Login(){if((await auth())?.user)redirect("/beheer/nieuws");return <section className="admin-shell"><div className="admin-card"><h1>Aanmelden</h1><p>Meld u aan om nieuwsberichten en veelgestelde vragen te beheren.</p><LoginForm/><Link className="admin-link" href="/beheer/wachtwoord-vergeten">Wachtwoord vergeten?</Link></div></section>}
