/**
 * Waitlist is for production (starixapp.com / `main`) only.
 * Preflight, Vercel previews, and localhost always behave as launched.
 *
 * NEXT_PUBLIC_WAITLIST_ENABLED=false turns it off even on production.
 * true only applies on the production marketing host — never on preview/preflight.
 */
export function isWaitlistEnabled() {
  if (isTestDeployment()) return false;

  const flag = process.env.NEXT_PUBLIC_WAITLIST_ENABLED?.trim().toLowerCase();
  if (flag === "false" || flag === "0") return false;
  if (flag === "true" || flag === "1") return true;

  return isProductionMarketingHost(resolveHostname());
}

function isTestDeployment() {
  const vercelEnv =
    process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || "";
  if (vercelEnv === "preview" || vercelEnv === "development") return true;

  const branch = (
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    ""
  ).toLowerCase();
  if (branch === "preflight") return true;

  const host = resolveHostname();
  if (!host) return false;
  if (host === "localhost" || host === "127.0.0.1") return true;
  if (host.endsWith(".vercel.app") || host.endsWith(".localhost")) return true;
  if (
    host.startsWith("preflight.") ||
    host.startsWith("dev.") ||
    host.startsWith("staging.")
  ) {
    return true;
  }
  return false;
}

function resolveHostname() {
  if (typeof window !== "undefined") {
    return window.location.hostname.replace(/^www\./, "").toLowerCase();
  }

  const site =
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "";
  return site.replace(/^https?:\/\//, "").split("/")[0]?.toLowerCase() || "";
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
