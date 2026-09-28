/**
 * Waitlist is for production (starixapp.com / `main`).
 * Testing (`preflight` branch, localhost, Vercel previews) behaves as if launched.
 *
 * Override with NEXT_PUBLIC_WAITLIST_ENABLED=true|false.
 */
export function isWaitlistEnabled() {
  const flag = process.env.NEXT_PUBLIC_WAITLIST_ENABLED?.trim().toLowerCase();
  if (flag === "true" || flag === "1") return true;
  if (flag === "false" || flag === "0") return false;

  if (typeof window !== "undefined") {
    return isProductionMarketingHost(window.location.hostname);
  }

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "";
  const host = site.replace(/^https?:\/\//, "").split("/")[0] || "";
  return isProductionMarketingHost(host);
}

function isProductionMarketingHost(hostname: string) {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  return host === "starixapp.com";
}

export function getLoginHref(role?: "creator" | "brand") {
  if (isWaitlistEnabled()) return "/coming-soon";
  return role === "brand" ? "/login?role=brand" : "/login";
}

export function getSignupHref(role?: "creator" | "brand") {
  if (isWaitlistEnabled()) return "/coming-soon";
  return role === "brand" ? "/signup?role=brand" : "/signup";
}
