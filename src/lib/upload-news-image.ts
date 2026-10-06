import { put } from "@vercel/blob/client";

export async function uploadNewsImage(file: File) {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  // Bound the whole operation, including delays between SDK retries.
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      controller.abort();
      reject(new Error("De foto-upload duurt te lang en is gestopt. Uw tekst en foto blijven bewaard; probeer opnieuw."));
    }, 45_000);
  });
  const upload = async () => {
    const pathname = `nieuws/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const response = await fetch("/api/nieuws/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({ type: "blob.generate-client-token", payload: { pathname, multipart: false } }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.clientToken !== "string") {
      throw new Error(typeof result?.error === "string" ? result.error : "De foto-upload is niet bereikbaar. Vernieuw de pagina en meld u zo nodig opnieuw aan.");
    }
    try {
      return await put(pathname, file, { access: "public", contentType: file.type, token: result.clientToken, abortSignal: controller.signal });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Onbekende uploadfout.";
      throw new Error(`De foto kon niet naar Blob worden geüpload. ${message}`);
    }
  };
  try {
    return await Promise.race([upload(), deadline]);
  } finally {
    clearTimeout(timeout);
  }
}
