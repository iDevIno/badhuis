"use client";

import { useActionState } from "react";
import { createUserAction, changeOwnPasswordAction } from "@/lib/user-actions";

function NewPasswordFields({ prefix }: { prefix: string }) {
  return <>
    <div className="form-group"><label htmlFor={`${prefix}-password`}>Nieuw wachtwoord</label><input className="input" id={`${prefix}-password`} name="password" type="password" autoComplete="new-password" minLength={12} maxLength={72} required /><p className="form-help">Minimaal 12 tekens.</p></div>
    <div className="form-group"><label htmlFor={`${prefix}-confirm`}>Herhaal nieuw wachtwoord</label><input className="input" id={`${prefix}-confirm`} name="confirmPassword" type="password" autoComplete="new-password" minLength={12} maxLength={72} required /></div>
  </>;
}

export function CreateUserForm() {
  const [state, action, pending] = useActionState(createUserAction, {});
  return <form action={action} className="editor-card user-form">
    <h2>Gebruiker toevoegen</h2><p>Een nieuwe gebruiker krijgt toegang tot nieuws, FAQ en gebruikersbeheer. Deel de inloggegevens zelf met de nieuwe gebruiker.</p>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.success && <p className="notice" role="status">{state.success}</p>}
    <fieldset disabled={pending}>
      <div className="form-group"><label htmlFor="user-email">E-mailadres</label><input className="input" id="user-email" name="email" type="email" autoComplete="off" maxLength={254} required /></div>
      <NewPasswordFields prefix="create" />
      <button className="button button-primary" type="submit">{pending ? "Aanmaken…" : "Gebruiker aanmaken"}</button>
    </fieldset>
  </form>;
}

export function ChangePasswordForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(changeOwnPasswordAction, {});
  return <form action={action} className="editor-card user-form">
    <h2>Mijn wachtwoord</h2><p>Wijzig het wachtwoord van uw account: {email}.</p>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.success && <p className="notice" role="status">{state.success}</p>}
    <fieldset disabled={pending}>
      <input type="hidden" name="username" autoComplete="username" value={email} />
      <div className="form-group"><label htmlFor="current-password">Huidig wachtwoord</label><input className="input" id="current-password" name="currentPassword" type="password" autoComplete="current-password" maxLength={128} required /></div>
      <NewPasswordFields prefix="own" />
      <button className="button button-primary" type="submit">{pending ? "Opslaan…" : "Wachtwoord wijzigen"}</button>
    </fieldset>
  </form>;
}
