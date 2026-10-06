"use client";
import { useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { deletePostAction } from "@/lib/admin-actions";

function ConfirmationActions({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();
  return <div className="delete-dialog-actions">
    <button className="button button-secondary" type="button" autoFocus disabled={pending} onClick={onCancel}>Annuleren</button>
    <button className="button button-danger" type="submit" disabled={pending}>{pending ? "Verwijderen…" : "Definitief verwijderen"}</button>
  </div>;
}

export function DeletePostButton({ id, title, compact = false }: { id: string; title?: string; compact?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const descriptionId = useId();
  return <>
    <button className={compact ? "admin-delete-link" : "button button-danger"} type="button" aria-label={title ? `Verwijder ${title}` : "Bericht verwijderen"} onClick={() => dialog.current?.showModal()}>
      <Trash2 size={15} aria-hidden="true" />{compact ? "Verwijderen" : "Bericht verwijderen"}
    </button>
    <dialog ref={dialog} className="delete-dialog" aria-labelledby={headingId} aria-describedby={descriptionId}>
      <h2 id={headingId}>Nieuwsbericht verwijderen?</h2>
      <p id={descriptionId}>{title ? <>Wilt u ‘{title}’ definitief verwijderen?</> : "Wilt u dit nieuwsbericht definitief verwijderen?"} Dit kan niet ongedaan worden gemaakt.</p>
      <form action={deletePostAction}>
        <input type="hidden" name="id" value={id} />
        <ConfirmationActions onCancel={() => dialog.current?.close()} />
      </form>
    </dialog>
  </>;
}
