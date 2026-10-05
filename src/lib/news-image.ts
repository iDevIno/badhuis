export const NEWS_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const NEWS_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateNewsImage(file: { size: number; type: string }) {
  if (!NEWS_IMAGE_TYPES.includes(file.type) || file.size > NEWS_IMAGE_MAX_BYTES || file.size === 0) {
    throw new Error("Gebruik een JPG, PNG of WebP van maximaal 5 MB.");
  }
}

// The file is uploaded separately; only its URL travels with the server action.
export async function prepareNewsImage(
  formData: FormData,
  uploadFile: (file: File) => Promise<string>,
) {
  const file = formData.get("image");
  formData.delete("image");
  if (file instanceof File && file.size > 0) {
    validateNewsImage(file);
    formData.set("uploadedImage", await uploadFile(file));
  }
}
