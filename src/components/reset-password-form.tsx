"use client";
import { useActionState } from "react";
import Link from "next/link";
import { resetPasswordAction } from "@/lib/admin-actions";
export function ResetPasswordForm({token}:{token:string}){const [state,action,pending]=useActionState(resetPasswordAction,{});return <form action={action}><input type="hidden" name="token" value={token}/>{state.error&&<div className="form-error" role="alert">{state.error}</div>}{state.success?<><div className="notice" role="status">{state.success}</div><Link className="button button-primary" href="/beheer/inloggen">Naar aanmelden</Link></>:<><div className="form-group"><label htmlFor="password">Nieuw wachtwoord</label><input className="input" id="password" name="password" type="password" minLength={12} autoComplete="new-password" required/><p className="form-help">Gebruik minimaal 12 tekens.</p></div><button className="button button-primary" disabled={pending}>{pending?"Opslaan…":"Wachtwoord wijzigen"}</button></>}</form>}
