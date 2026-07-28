import axios from "axios";
import { sessionAuth } from "@/utils/sessionAuth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api-dev.starixapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Unified Request Interceptor ---
api.interceptors.request.use((config) => {
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
      const currentPath = window.location.pathname;

      const requestUrl = error.config?.url ?? "";

      if (
        status === 401 &&
        !currentPath.startsWith("/login") &&
        !requestUrl.includes("/auth/me")
      ) {
        localStorage.removeItem("token");
        sessionAuth.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);