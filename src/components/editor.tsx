"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
import { useActionState, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import { upload } from "@vercel/blob/client";
import { validatePost } from "@/lib/post-validation";
import { prepareNewsImage } from "@/lib/news-image";
import { savePostAction, type ActionState } from "@/lib/admin-actions";

type PostInput={id?:string;slug?:string;title?:string;excerpt?:string;content?:string;imageUrl?:string|null;imageAlt?:string|null;status?:string};
export function PostEditor({post={}}:{post?:PostInput}){const uploaded = useRef<{ file: File; url: string } | null>(null);
  const [title, setTitle] = useState(post.title ?? "");
  const [excerpt, setExcerpt] = useState(post.excerpt ?? "");
  const [status, setStatus] = useState(post.status ?? "draft");
  const [imageAlt, setImageAlt] = useState(post.imageAlt ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [state,action,pending]=useActionState(async (previous: ActionState, data: FormData): Promise<ActionState> => {
    const parsed = validatePost(data);
    if (!parsed.success) return { error: parsed.error.issues.map(issue => issue.message).join(" ") };
    try {
      await prepareNewsImage(data, async (file) => {
        if (uploaded.current?.file === file) return uploaded.current.url;
        setUploading(true);
        const blob = await upload(`nieuws/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`, file, {
          access: "public",
          handleUploadUrl: "/api/nieuws/upload",
          contentType: file.type,
        });
        uploaded.current = { file, url: blob.url };
        setUploadedUrl(blob.url);
        return blob.url;
      });
    } catch (error) {
      return { error: error instanceof Error ? error.message : "De foto kon niet worden geüpload. Probeer opnieuw." };
    } finally {
      setUploading(false);
    }
    return savePostAction(previous, data);
  },{});const [content,setContent]=useState(post.content||"<p></p>");const editor=useEditor({immediatelyRender:false,extensions:[StarterKit.configure({heading:{levels:[2,3]}}),LinkExtension.configure({openOnClick:false,HTMLAttributes:{target:"_blank",rel:"noopener noreferrer"}})],content,onUpdate:({editor})=>setContent(editor.getHTML())});
  const setLink=()=>{const url=window.prompt("Naar welk webadres moet de link verwijzen?");if(url)editor?.chain().focus().extendMarkRange("link").setLink({href:url}).run()};
  return <form action={action} className="editor-card" encType="multipart/form-data"><input type="hidden" name="id" value={post.id||""}/><input type="hidden" name="slug" value={post.slug||""}/><input type="hidden" name="content" value={content}/><input type="hidden" name="uploadedImage" value={uploadedUrl}/><input type="hidden" name="existingImage" value={post.imageUrl||""}/>{state.error&&<div className="form-error" role="alert">{state.error}</div>}<div className="editor-grid"><div><div className="form-group"><label htmlFor="title">Titel</label><input className="input" id="title" name="title" value={title} onChange={event => setTitle(event.target.value)} minLength={3} maxLength={140} aria-describedby="title-help" required/><p id="title-help" className="form-help">Minimaal 3 tekens.</p></div><div className="form-group"><label htmlFor="excerpt">Korte samenvatting</label><textarea className="input" id="excerpt" name="excerpt" value={excerpt} onChange={event => setExcerpt(event.target.value)} minLength={10} maxLength={320} aria-describedby="excerpt-help" required/><p id="excerpt-help" className="form-help">Minimaal 10 tekens, maximaal 320.</p></div><div className="form-group"><label>Inhoud</label><div className="editor-toolbar" aria-label="Tekstopmaak"><button type="button" onClick={()=>editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold")?"is-active":""}><strong>Vet</strong></button><button type="button" onClick={()=>editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic")?"is-active":""}><em>Cursief</em></button><button type="button" onClick={()=>editor?.chain().focus().toggleHeading({level:2}).run()}>Kop</button><button type="button" onClick={()=>editor?.chain().focus().toggleBulletList().run()}>Lijst</button><button type="button" onClick={setLink}>Link</button></div><EditorContent editor={editor} className="editor-content"/></div></div><aside className="editor-side"><h2>Publicatie</h2><div className="form-group"><label htmlFor="status">Status</label><select className="input" id="status" name="status" value={status} onChange={event => setStatus(event.target.value)}><option value="draft">Concept</option><option value="published">Gepubliceerd</option></select></div><div className="form-group"><label htmlFor="image">Hoofdafbeelding</label><input className="input" id="image" name="image" type="file" onChange={() => { uploaded.current = null; setUploadedUrl(""); }} accept="image/jpeg,image/png,image/webp"/><p className="form-help">JPG, PNG of WebP, maximaal 5 MB.</p></div><div className="form-group"><label htmlFor="imageAlt">Beschrijving afbeelding</label><input className="input" id="imageAlt" name="imageAlt" value={imageAlt} onChange={event => setImageAlt(event.target.value)} maxLength={180}/><p className="form-help">Beschrijf kort wat op de foto te zien is.</p></div></aside></div><div className="editor-actions"><button className="button button-primary" disabled={pending}>{uploading?"Foto uploaden…":pending?"Opslaan…":"Bericht opslaan"}</button><a className="button button-secondary" href="/beheer/nieuws">Annuleren</a></div></form>}
