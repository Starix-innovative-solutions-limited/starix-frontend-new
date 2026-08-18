import axios from "axios";
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

console.log("API interceptor build: auth-token-fix-v2");

// --- Smarter Response Interceptor ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      const requestUrl = error.config?.url ?? "";

      if (
        status === 401 &&
        !currentPath.startsWith("/login") &&
        !currentPath.startsWith("/verify-email") &&
        !requestUrl.includes("/auth/me") &&
        !requestUrl.includes("/auth/otp") &&
        !requestUrl.includes("/auth/login")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        sessionAuth.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
