/**
 * Creator and circle social OAuth callbacks.
 * Success arrives on the URL fragment; errors arrive as query params.
 */

export const SOCIAL_OAUTH_ERROR_CODES = [
  "account_already_linked",
  "access_denied",
  "authorization_failed",
  "missing_params",
  "required_permissions_missing",
  "different_account_selected",
  "connection_changed",
  "refresh_credential_missing",
  "renewal_verification_pending",
  "permission_grants_unavailable",
  "renewal_identity_mismatch",
  "connection_failed",
  "rate_limited",
  "provider_unavailable",
  "provider_configuration",
] as const;

export type SocialOAuthErrorCode = (typeof SOCIAL_OAUTH_ERROR_CODES)[number];

export type SocialOAuthResult =
  | {
      kind: "success";
      platform: string | null;
      platformUserId: string | null;
    }
  | {
      kind: "error";
      error: string;
      message: string;
    };

export function isSocialOAuthErrorCode(value: string | null): boolean {
  if (!value) return false;
  return (SOCIAL_OAUTH_ERROR_CODES as readonly string[]).includes(value);
}

function decodeParam(value: string | null): string | null {
  if (!value) return null;
  return value.trim() || null;
}

export function readSocialOAuthCallback(): SocialOAuthResult | null {
  if (typeof window === "undefined") return null;

  const hashParams = new URLSearchParams(
    window.location.hash.replace(/^#/, "")
  );
  const query = new URLSearchParams(window.location.search);

  const hashStatus = hashParams.get("status");
  const platform =
    hashParams.get("platform") || query.get("platform") || null;
  const platformUserId =
    hashParams.get("platform_user_id") ||
    query.get("platform_user_id") ||
    null;

  if (hashStatus === "connected" || hashStatus === "success") {
    return { kind: "success", platform, platformUserId };
  }

  const error = query.get("error");
  const description =
    decodeParam(query.get("error_description")) ||
    decodeParam(query.get("error_message"));

  if (error || description) {
    return {
      kind: "error",
      error: error || "connection_failed",
      message:
        description ||
        "Could not connect this account. Please try again.",
    };
  }

  return null;
}

export function hasSocialOAuthCallback(): boolean {
  return readSocialOAuthCallback() !== null;
}

export function clearSocialOAuthCallback(pathname: string) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", pathname);
}
