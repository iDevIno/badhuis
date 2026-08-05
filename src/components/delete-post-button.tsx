"use client";
import { useRef } from "react";
import { deletePostAction } from "@/lib/admin-actions";
export function DeletePostButton({id}:{id:string}){const formRef=useRef<HTMLFormElement>(null);return <form ref={formRef} action={deletePostAction} onSubmit={event=>{if(!window.confirm("Weet u zeker dat u dit nieuwsbericht definitief wilt verwijderen?"))event.preventDefault()}}><input type="hidden" name="id" value={id}/><button className="button button-danger" type="submit">Bericht verwijderen</button></form>}
