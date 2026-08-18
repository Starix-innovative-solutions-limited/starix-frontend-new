import type { AxiosError } from "axios";

type ApiErrorBody = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
};

/**
 * Maps auth API failures to user-facing copy.
 * 409 = email already registered (unique across creator + brand).
 */
export function getAuthErrorMessage(
  error: unknown,
  context: "brand-signup" | "creator-signup" | "login" | "generic" = "generic"
): string {
  const err = error as AxiosError<ApiErrorBody>;
  const status = err?.response?.status;
  const detail = err?.response?.data?.detail;

  if (status === 409) {
    if (context === "brand-signup") {
      return "This email is already registered. Sign in with your existing account, or use a different email for a brand account.";
    }
    if (context === "creator-signup") {
      return "This email is already registered. Sign in with your existing account, or use a different email.";
    }
    return "This email is already registered. Please sign in instead.";
  }

  if (status === 429) {
    return "Too many attempts. Please try again later.";
  }

  if (status === 401 || status === 403) {
    if (context === "login") return "Incorrect email or password.";
    return "You don’t have permission to continue.";
  }

  if (Array.isArray(detail) && detail.length > 0) {
    return detail[0]?.msg || "Please check your inputs and try again.";
  }

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  const message = err?.response?.data?.message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (context === "brand-signup" || context === "creator-signup") {
    return "Signup failed. Please check your inputs and try again.";
  }

  return "Something went wrong. Please try again.";
}

/** True when the error is an expected client/auth conflict (don’t treat as app crash). */
export function isExpectedAuthConflict(error: unknown): boolean {
  const status = (error as AxiosError)?.response?.status;
  return status === 409 || status === 422 || status === 429 || status === 400;
}
