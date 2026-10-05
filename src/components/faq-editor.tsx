"use client";
import { useActionState, useState } from "react";
import { saveFaqAction } from "@/lib/admin-actions";
import type { FaqItem } from "@/lib/faq";

export function FaqEditor({ initialItems }: { initialItems: FaqItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [state, action, pending] = useActionState(saveFaqAction, {});
  function update(index: number, field: keyof FaqItem, value: string) {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }
  function move(index: number, offset: number) {
    const next = [...items];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    setItems(next);
  }
  return <form action={action} className="editor-card faq-editor" onInvalidCapture={event => { const details = (event.target as HTMLElement).closest("details"); if (details) details.open = true; }}>
    <input type="hidden" name="items" value={JSON.stringify(items)} />
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.success && <p className="notice" role="status">{state.success}</p>}
    <fieldset className="faq-fields" disabled={pending}>
      {items.map((item, index) => <details className="faq-edit-item" key={index} open={index === 0 || !item.question}><summary><span>{item.question || "Nieuwe vraag"}</span><small>Vraag {index + 1}</small></summary><div className="faq-edit-body">
        <div className="form-group"><label htmlFor={`question-${index}`}>Vraag {index + 1}</label><input className="input" id={`question-${index}`} value={item.question} onChange={e => update(index, "question", e.target.value)} minLength={3} maxLength={200} required /></div>
        <div className="form-group"><label htmlFor={`answer-${index}`}>Antwoord</label><textarea className="input" id={`answer-${index}`} value={item.answer} onChange={e => update(index, "answer", e.target.value)} minLength={3} maxLength={5000} required /></div>
        <div className="faq-edit-actions"><button type="button" className="button button-secondary" disabled={index === 0} onClick={() => move(index, -1)}>Omhoog</button><button type="button" className="button button-secondary" disabled={index === items.length - 1} onClick={() => move(index, 1)}>Omlaag</button><button type="button" className="button button-secondary" onClick={() => { if (window.confirm("Deze vraag verwijderen? De wijziging wordt pas gepubliceerd wanneer u opslaat.")) setItems(items.filter((_, i) => i !== index)); }}>Verwijderen</button></div>
      </div></details>)}
      {!items.length && <p>Er zijn nog geen vragen. Voeg hieronder een vraag toe.</p>}
      <div className="editor-actions"><button type="button" className="button button-secondary" disabled={items.length >= 50} onClick={() => setItems([...items, { question: "", answer: "" }])}>Vraag toevoegen</button><button className="button button-primary" type="submit">{pending ? "Opslaan…" : "FAQ opslaan"}</button></div>
    </fieldset>
  </form>;
}
