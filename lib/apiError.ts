import type { AxiosError } from "axios";

type ApiErrorBody = {
  detail?: string | Array<{ msg?: string; message?: string }>;
  message?: string;
  error?: string;
};

export type ParsedApiError = {
  status: number | null;
  message: string;
  isServerError: boolean;
  isNotFound: boolean;
  isAuthError: boolean;
};

function detailToString(
  detail: ApiErrorBody["detail"]
): string | undefined {
  if (typeof detail === "string" && detail.trim()) {
    return detail.trim();
  }
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    const msg = first?.msg || first?.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  }
  return undefined;
}

/** Normalize axios/API failures into stable UI-friendly metadata. */
export function parseApiError(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): ParsedApiError {
  const err = error as AxiosError<ApiErrorBody | string>;
  const status = err?.response?.status ?? null;
  const data = err?.response?.data;

  let message = fallback;

  if (typeof data === "string" && data.trim()) {
    message = data.trim();
  } else if (data && typeof data === "object") {
    message =
      detailToString((data as ApiErrorBody).detail) ||
      (typeof (data as ApiErrorBody).message === "string"
        ? (data as ApiErrorBody).message!
        : undefined) ||
      (typeof (data as ApiErrorBody).error === "string"
        ? (data as ApiErrorBody).error!
        : undefined) ||
      fallback;
  } else if (typeof err?.message === "string" && err.message.trim()) {
    message = err.message.trim();
  }

  if (status === 500 && message === "Internal Server Error") {
    message =
      "The server couldn’t load full challenge details right now. Some information may be missing until this is fixed.";
  }

  return {
    status,
    message,
    isServerError: status !== null && status >= 500,
    isNotFound: status === 404,
    isAuthError: status === 401 || status === 403,
  };
}
