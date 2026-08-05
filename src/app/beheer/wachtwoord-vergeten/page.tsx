import type { Metadata } from "next";
import Link from "next/link";
import { ResetRequestForm } from "@/components/reset-request-form";
export const metadata:Metadata={title:"Wachtwoord herstellen",robots:{index:false,follow:false}};
export default function Forgot(){return <section className="admin-shell"><div className="admin-card"><p className="eyebrow">Beheeromgeving</p><h1>Wachtwoord vergeten?</h1><p>Vul het e-mailadres van de beheerder in. U ontvangt een herstel-link als het account bestaat.</p><ResetRequestForm/><Link className="admin-link" href="/beheer/inloggen">Terug naar aanmelden</Link></div></section>}
