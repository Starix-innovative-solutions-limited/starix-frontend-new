import { displayMediaUrl } from "@/lib/displayMediaUrl";

/**
 * Keep local assets on their own path. Send uploaded media through the
 * same-origin proxy so production does not depend on the image optimizer
 * being able to follow a short-lived S3 redirect.
 */
export default function imageLoader({ src }: { src: string }) {
  if (
    src.startsWith("/") ||
    src.startsWith("blob:") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  return displayMediaUrl(src) || src;
}
