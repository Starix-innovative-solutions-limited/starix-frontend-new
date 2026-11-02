import type { AxiosError } from "axios";

type ApiErrorBody = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
};

const LOGIN_CREDENTIALS_MESSAGE =
  "Sorry, your password was incorrect. Please double-check your password.";

function extractApiError(error: unknown): {
  status?: number;
  detail?: string | Array<{ msg?: string }>;
  message?: string;
} {
  const err = error as AxiosError<ApiErrorBody | string>;
  const status = err?.response?.status;
  const data = err?.response?.data;

  if (typeof data === "string") {
    return { status, detail: data, message: data };
  }

  return {
    status,
    detail: data?.detail,
    message: data?.message,
  };
}

function isGenericServerError(value?: string) {
  const text = (value ?? "").toLowerCase();
  return (
    text.includes("internal server error") ||
    text.includes("unexpected error") ||
    text === "error"
  );
}

/**
 * Maps auth API failures to user-facing copy.
 * 409 = email already registered (unique across creator + brand).
 */
export function getAuthErrorMessage(
  error: unknown,
  context: "brand-signup" | "creator-signup" | "login" | "generic" = "generic"
): string {
  const { status, detail, message } = extractApiError(error);
  const detailText = typeof detail === "string" ? detail : "";

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

  if (context === "login") {
    if (detailText.toLowerCase().includes("deactivat")) {
      return "This account is deactivated.";
    }
    if (!status) {
      return "Couldn't sign in. Check your connection and try again.";
    }
    // /auth/login currently 500s on bad credentials instead of 401.
    if (
      status === 400 ||
      status === 401 ||
      status === 403 ||
      status === 422 ||
      status === 500
    ) {
      return LOGIN_CREDENTIALS_MESSAGE;
    }
  }

  if (status === 401 || status === 403) {
    return "You don’t have permission to continue.";
  }

  if (Array.isArray(detail) && detail.length > 0) {
    return detail[0]?.msg || "Please check your inputs and try again.";
  }

  if (detailText.trim() && !isGenericServerError(detailText)) {
    return detailText;
  }

  if (typeof message === "string" && message.trim() && !isGenericServerError(message)) {
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
  return (
    status === 400 ||
    status === 401 ||
    status === 409 ||
    status === 422 ||
    status === 429
  );
}
