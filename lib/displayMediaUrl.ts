function isTrustedMediaHost(hostname: string) {
  return (
    hostname.endsWith(".blob.core.windows.net") ||
    hostname.endsWith(".amazonaws.com") ||
    hostname === "cdn.starixapp.com" ||
    hostname.endsWith(".starixapp.com") ||
    hostname === "res.cloudinary.com"
  );
}

export function encodeMediaRef(url: string) {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(url, "utf8").toString("base64")
      : btoa(url);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function displayMediaUrl(url?: string | null) {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("data:") || url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" && isTrustedMediaHost(parsed.hostname)) {
      return `/api/remote-image?k=${encodeMediaRef(url)}`;
    }
  } catch {
    return url;
  }

  return url;
}
