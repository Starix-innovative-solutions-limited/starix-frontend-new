import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token from Zustand
api.interceptors.request.use(
  (config) => {
    // Access the Zustand store state directly
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Recommended: Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the API returns 401, the token is likely expired or invalid
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
