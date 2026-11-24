import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { sessionAuth } from "@/utils/sessionAuth";

const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-dev.starixapp.com";

function resolveBrowserBaseURL() {
  if (typeof window === "undefined") return configuredApiUrl;
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1";
  // Route local browser traffic through Next rewrite to avoid CORS on API errors.
  if (isLocal && configuredApiUrl.startsWith("http")) {
    return "/api-backend";
  }
  return configuredApiUrl;
}

export const api = axios.create({
  baseURL: configuredApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Unified Request Interceptor ---
api.interceptors.request.use((config) => {
  config.baseURL = resolveBrowserBaseURL();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }

  return config;
});

console.log("API interceptor build: auth-token-refresh-v3");

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshInFlight: Promise<string | null> | null = null;

function endSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  sessionAuth.clear();
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token")?.trim();
  if (!refreshToken) return null;

  // Use a bare client so the expired access token is not attached and a
  // rejected refresh cannot recurse through this interceptor.
  const refreshClient = axios.create({
    baseURL: resolveBrowserBaseURL(),
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await refreshClient.post<{
    access_token?: string;
    refresh_token?: string;
  }>("/auth/token/refresh", { refresh_token: refreshToken });

  if (!data.access_token) return null;
  localStorage.setItem("token", data.access_token);
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  return data.access_token;
}

function refreshAccessTokenOnce() {
  refreshInFlight ??= refreshAccessToken()
    .catch(() => null)
    .finally(() => {
      refreshInFlight = null;
    });
  return refreshInFlight;
}

// Renew an expired access token once, then retry the original request.
// A request that still returns 401 is rejected without ending the session.
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const request = error.config as RetryableRequest | undefined;
    const requestUrl = request?.url ?? "";
    const canRefresh =
      status === 401 &&
      typeof window !== "undefined" &&
      request &&
      !request._retry &&
      !requestUrl.includes("/auth/token/refresh") &&
      !requestUrl.includes("/auth/login") &&
      !requestUrl.includes("/auth/otp") &&
      !window.location.pathname.startsWith("/login") &&
      !window.location.pathname.startsWith("/verify-email");

    if (!canRefresh) return Promise.reject(error);

    request._retry = true;
    const accessToken = await refreshAccessTokenOnce();
    if (!accessToken) {
      endSession();
      return Promise.reject(error);
    }

    request.headers.Authorization = `Bearer ${accessToken}`;
    return api(request);
  }
);
