import axios from "axios";
import { sessionAuth } from "@/utils/sessionAuth";

export const api = axios.create({
  baseURL: "https://starix-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 💡 This interceptor runs BEFORE every request
api.interceptors.request.use(
  (config) => {
    // 1. Get the session data you saved during signup
    const session = sessionAuth.get(); 

    // 2. If a token exists, add it to the Authorization header
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);