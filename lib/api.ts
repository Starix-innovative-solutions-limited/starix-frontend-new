import axios from "axios";
import { sessionAuth } from "@/utils/sessionAuth";

export const api = axios.create({
  baseURL: "https://starix-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const publicRoutes = [
      "/auth/signup/creator",
      "/auth/signup/brand",
      "/auth/login",
      "/auth/otp/email/request",
      "/auth/otp/email/verify",
      "/auth/password-reset/request",
    ];

    // Get the base path without query parameters
    const path = config.url?.split('?')[0] || "";
    
    // Check if it's an exact match or starts with the public route
    const isPublic = publicRoutes.some(route => path === route || path.startsWith(route));

    if (!isPublic) {
      // ONLY attach token if it's NOT a public route
      const session = sessionAuth.get();
      const directToken = localStorage.getItem("token");
      let token = (typeof session === 'string' ? session : (session as any)?.access_token) || directToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage first (most reliable)
    const token = localStorage.getItem("token");

    // If a token exists, ALWAYS attach it.
    // If the backend requires it, it will be there. 
    // If the backend doesn't care, it will usually ignore the header.
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      
      
      const status = error.response.status;
      // 401 Unauthorized or 403 Forbidden
      if (status === 401 || status === 403) {
        const currentPath = window.location.pathname;
        
        // Don't redirect if we are already in the auth flow
        const isAuthFlow = currentPath.startsWith("/auth") || currentPath.includes("/verify-email");
        
        if (!isAuthFlow) {
          localStorage.removeItem("token");
          sessionAuth.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);