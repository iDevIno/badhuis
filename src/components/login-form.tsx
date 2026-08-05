"use client";
import { useActionState } from "react";
import { loginAction } from "@/lib/admin-actions";
export function LoginForm(){const [state,action,pending]=useActionState(loginAction,{});return <form action={action}>{state.error&&<div className="form-error" role="alert">{state.error}</div>}<div className="form-group"><label htmlFor="email">E-mailadres</label><input className="input" id="email" name="email" type="email" autoComplete="username" required/></div><div className="form-group"><label htmlFor="password">Wachtwoord</label><input className="input" id="password" name="password" type="password" autoComplete="current-password" minLength={5} required/></div><button className="button button-primary" disabled={pending}>{pending?"Aanmelden…":"Aanmelden"}</button></form>}
