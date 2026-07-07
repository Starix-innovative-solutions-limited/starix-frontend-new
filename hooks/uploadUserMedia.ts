import { api } from "@/lib/api";

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
  const { data } = await api.post<UploadUrlResponse>("/media/upload-url", {
    target,
    filename: file.name,
    content_type: file.type,
  });

  const uploadResponse = await fetch(data.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 upload failed with status ${uploadResponse.status}`);
  }

  return data.public_url;
}