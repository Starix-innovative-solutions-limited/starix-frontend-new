import axios from "axios";
import { sessionAuth } from "@/utils/sessionAuth";

export const api = axios.create({
  baseURL: "https://starix-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Unified Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    // Combine token retrieval
    const directToken = localStorage.getItem("token");
    const session = sessionAuth.get();
    const sessionToken =
      typeof session === "string" ? session : (session as any)?.access_token;

    const token = directToken || sessionToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

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