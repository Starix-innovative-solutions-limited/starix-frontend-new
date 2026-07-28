import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { compressImageForUpload } from "@/utils/compressImage";

type UploadTarget = 
  | "profile_picture" | "user_banner" | "challenge_banner" 
  | "challenge_document" | "circle_profile_picture" | "circle_banner";

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async ({ file, target }: { file: File; target: UploadTarget }) => {
      const uploadFile = await compressImageForUpload(file);

      // 1. Get the presigned URL from your backend
      const { data: presignedData } = await api.post("/media/upload-url", {
        target,
        filename: uploadFile.name,
        content_type: uploadFile.type,
      });

      const { upload_url, public_url } = presignedData as { 
        upload_url: string; 
        public_url: string; 
      };

      // 2. PUT the file directly to S3
      // IMPORTANT: Do not include the Authorization header here.
      // Send the same Content-Type you requested.
      const uploadResponse = await fetch(upload_url, {
        method: "PUT",
        body: uploadFile,
        headers: {
          "Content-Type": uploadFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // 3. Return the public_url to be used in your Create/Update form
      return { public_url };
    },
  });
};