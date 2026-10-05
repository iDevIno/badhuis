import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/auth";
import { NEWS_IMAGE_MAX_BYTES, NEWS_IMAGE_TYPES } from "@/lib/news-image";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await auth())?.user?.email) {
          throw new Error("Uw sessie is verlopen. Meld u opnieuw aan.");
        }
        if (!/^nieuws\/[a-zA-Z0-9._-]+$/.test(pathname)) {
          throw new Error("Ongeldige bestandsnaam.");
        }
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          throw new Error("Afbeeldingsopslag is nog niet gekoppeld.");
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
    return Response.json({ error: "De afbeelding kon niet worden geüpload. Controleer of u bent aangemeld en de afbeeldingsopslag is gekoppeld." }, { status: 400 });
  }
}
