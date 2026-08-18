import { useMutation } from "@tanstack/react-query";
import {
  uploadMediaFile,
  type MediaUploadTarget,
} from "@/hooks/mediaUpload";

export type { MediaUploadTarget as UploadTarget } from "@/hooks/mediaUpload";

/**
 * React Query wrapper around POST /media/upload-url + S3 PUT.
 * Returns { public_url } for create/update forms.
 */
export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async ({
      file,
      target,
    }: {
      file: File;
      target: MediaUploadTarget;
    }) => {
      const public_url = await uploadMediaFile(file, target);
      return { public_url };
    },
  });
};
