import type { Metadata } from "next";
import { listUsers } from "@/lib/user-actions";
import { ChangePasswordForm, CreateUserForm } from "@/components/user-forms";

export const metadata: Metadata = { title: "Gebruikersbeheer", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const result = await listUsers();
  return <section className="admin-shell"><div className="admin-container">
    <div className="admin-head"><div><h1>Gebruikers</h1><p>Voeg een beheerder toe of wijzig uw eigen wachtwoord.</p></div></div>
    {result ? <>
      <section className="editor-card user-list" aria-labelledby="users-title"><h2 id="users-title">Beheerders</h2><ul>{result.users.map(user => <li key={user.id}><span>{user.email}</span>{user.email === result.currentEmail && <small>Uw account</small>}</li>)}</ul></section>
      <div className="user-forms"><CreateUserForm /><ChangePasswordForm email={result.currentEmail} /></div>
    </> : <p className="notice">Gebruikersbeheer is beschikbaar zodra de database is gekoppeld.</p>}
  </div></section>;
}
