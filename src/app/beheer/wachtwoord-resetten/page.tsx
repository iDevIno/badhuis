import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/reset-password-form";
export const metadata:Metadata={title:"Nieuw wachtwoord",robots:{index:false,follow:false}};
export default async function Reset({searchParams}:{searchParams:Promise<{token?:string}>}){const {token=""}=await searchParams;return <section className="admin-shell"><div className="admin-card"><p className="eyebrow">Beheeromgeving</p><h1>Nieuw wachtwoord</h1><p>Kies een sterk, uniek wachtwoord voor het praktijkbeheer.</p><ResetPasswordForm token={token}/></div></section>}
