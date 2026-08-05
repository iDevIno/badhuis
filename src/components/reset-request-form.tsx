"use client";
import { useActionState } from "react";
import { requestResetAction } from "@/lib/admin-actions";
export function ResetRequestForm(){const [state,action,pending]=useActionState(requestResetAction,{});return <form action={action}>{state.success&&<div className="notice" role="status">{state.success}</div>}<div className="form-group"><label htmlFor="email">E-mailadres</label><input className="input" id="email" name="email" type="email" required/></div><button className="button button-primary" disabled={pending}>{pending?"Versturen…":"Stuur herstel-link"}</button></form>}
