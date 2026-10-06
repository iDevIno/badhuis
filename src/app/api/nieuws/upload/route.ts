import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/auth";
import { NEWS_IMAGE_MAX_BYTES, NEWS_IMAGE_TYPES } from "@/lib/news-image";

export async function POST(request: Request) {
  try {
    if (!(await auth())?.user?.email) {
      return Response.json({ error: "Uw sessie is verlopen. Meld u opnieuw aan." }, { status: 401 });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return Response.json({ error: "Afbeeldingsopslag is nog niet gekoppeld. Koppel Vercel Blob aan dit project en deploy opnieuw." }, { status: 503 });
    }
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
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
  } catch {
    return Response.json({ error: "De upload kon niet worden voorbereid. Controleer de Blob-koppeling en BLOB_READ_WRITE_TOKEN in Vercel." }, { status: 400 });
  }
}
