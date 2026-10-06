import { put } from "@vercel/blob/client";

export async function uploadNewsImage(file: File) {
  const pathname = `nieuws/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const response = await fetch("/api/nieuws/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "blob.generate-client-token", payload: { pathname, multipart: false } }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || typeof result?.clientToken !== "string") {
    throw new Error(typeof result?.error === "string" ? result.error : "De foto-upload is niet bereikbaar. Vernieuw de pagina en meld u zo nodig opnieuw aan.");
  }
  return put(pathname, file, { access: "public", contentType: file.type, token: result.clientToken });
}
