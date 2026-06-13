import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

/**
 * Uploads a single media file (e.g. circle logo/banner) and returns the
 * hosted URL to use in `profile_picture_url` / `banner_url` fields.
 *
 * ⚠️ PLACEHOLDER CONTRACT — update to match your real media-upload endpoint:
 *  - endpoint path (currently "/media/upload")
 *  - the form field name the backend expects (currently "file")
 *  - the response field containing the hosted URL (currently `data.url`)
 */
export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Adjust this to match your API's actual response field
      return data as { url: string };
    },
  });
};