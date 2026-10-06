import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/auth";
import { NEWS_IMAGE_MAX_BYTES, NEWS_IMAGE_TYPES } from "@/lib/news-image";

export async function POST(request: Request) {
  try {
    if (!(await auth())?.user?.email) {
      return Response.json({ error: "Uw sessie is verlopen. Meld u opnieuw aan." }, { status: 401 });
    }
    const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
    if (!token) {
      return Response.json({ error: "Afbeeldingsopslag is nog niet gekoppeld. Koppel Vercel Blob aan dit project en deploy opnieuw." }, { status: 503 });
    }
    const body = (await request.json()) as HandleUploadBody;
    if (body?.type !== "blob.generate-client-token" || typeof body.payload?.pathname !== "string" || !/^nieuws\/[a-zA-Z0-9._-]+$/.test(body.payload.pathname)) {
      return Response.json({ error: "Ongeldige uploadaanvraag. Kies de foto opnieuw." }, { status: 400 });
    }
    const result = await handleUpload({
      token,
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^nieuws\/[a-zA-Z0-9._-]+$/.test(pathname)) {
          throw new Error("Ongeldige bestandsnaam.");
        }
        return {
          allowedContentTypes: NEWS_IMAGE_TYPES,
          maximumSizeInBytes: NEWS_IMAGE_MAX_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    if (error instanceof Error && /Invalid.*token/i.test(error.message)) {
      return Response.json({ error: "De ingestelde Blob-token is ongeldig. Vervang BLOB_READ_WRITE_TOKEN door de token van de gekoppelde opslag en deploy opnieuw." }, { status: 503 });
    }
    return Response.json({ error: "De upload kon niet worden voorbereid. Controleer de Blob-koppeling en BLOB_READ_WRITE_TOKEN in Vercel." }, { status: 400 });
  }
}
