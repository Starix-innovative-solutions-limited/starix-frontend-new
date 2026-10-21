const BLOCKED_PATH = /banner|advert|doubleclick/i;

function isTrustedMediaHost(hostname: string) {
  return (
    hostname.endsWith(".blob.core.windows.net") ||
    hostname.endsWith(".amazonaws.com")
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
    if (
      parsed.protocol === "https:" &&
      isTrustedMediaHost(parsed.hostname) &&
      BLOCKED_PATH.test(url)
    ) {
      return `/api/remote-image?k=${encodeMediaRef(url)}`;
    }
  } catch {
    return url;
  }

  return url;
}
