import { api } from "@/lib/api";
import { compressImageForUpload } from "@/utils/compressImage";

type UploadTarget =
  | "profile_picture"
  | "user_banner"
  | "challenge_banner"
  | "challenge_document"
  | "circle_profile_picture"
  | "circle_banner";

type UploadUrlResponse = {
  upload_url: string;
  object_key: string;
  public_url: string;
  expires_in: number;
};

export async function uploadMedia(file: File, target: UploadTarget) {
  const uploadFile = await compressImageForUpload(file);

  const { data } = await api.post<UploadUrlResponse>("/media/upload-url", {
    target,
    filename: uploadFile.name,
    content_type: uploadFile.type,
  });

  const uploadResponse = await fetch(data.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": uploadFile.type,
    },
    body: uploadFile,
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 upload failed with status ${uploadResponse.status}`);
  }

  return data.public_url;
}