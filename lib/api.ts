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

      // 401/403: Only logout if NOT already on login/auth page
      if (status === 401 || status === 403) {
        // NEW: Check if we are trying to access a circle we just joined
        // If it's a 403, it might be a permission delay, not an auth failure.
        // We shouldn't necessarily log out for 403s!
        if (status === 401 && !currentPath.startsWith("/login")) {
          localStorage.removeItem("token");
          sessionAuth.clear();
          window.location.href = "/login";
        }
        
        // 403s are permissions. Log them but DON'T log the user out.
        if (status === 403) {
          console.warn("Permission denied for this resource.");
        }
      }
    }
    return Promise.reject(error);
  }
);