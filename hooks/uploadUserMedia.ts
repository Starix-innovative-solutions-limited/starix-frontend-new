import { uploadMediaFile, type MediaUploadTarget } from "@/hooks/mediaUpload";

export type { MediaUploadTarget as UploadTarget } from "@/hooks/mediaUpload";

/**
 * Upload a file via POST /media/upload-url + S3 PUT.
 * Returns the clean public_url for persisting on the parent resource.
 */
export async function uploadMedia(file: File, target: MediaUploadTarget) {
  return uploadMediaFile(file, target);
}

/** Alias used by profile/onboarding flows */
export async function uploadUserMedia(file: File, target: MediaUploadTarget) {
  return uploadMediaFile(file, target);
}
