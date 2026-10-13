export function isRemoteMediaUrl(src?: string | null) {
  if (!src) return false;
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.includes("blob.core.windows.net") ||
    src.includes("amazonaws.com")
  );
}
