export function creatorProfileHref(
  username?: string | null,
  currentUsername?: string | null
) {
  const handle = username?.replace(/^@/, "").trim();
  if (!handle) return null;
  if (
    currentUsername &&
    handle.toLowerCase() === currentUsername.toLowerCase()
  ) {
    return "/profile";
  }
  return `/profile/${encodeURIComponent(handle)}`;
}

export function profileUsernameFromPath(pathname?: string | null) {
  const match = pathname?.match(/^\/profile\/([^/]+)/);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
