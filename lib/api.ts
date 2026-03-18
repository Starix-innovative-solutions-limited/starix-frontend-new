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
    // 1. Try to get the session data
    const session = sessionAuth.get(); 
    
    // 2. Try to get the direct token you saved in Login
    const directToken = localStorage.getItem("token");

    // 3. Pick whichever one is actually a string
    const token = typeof session === 'string' ? session : session?.access_token || directToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Header Set:", config.headers.Authorization); // Debugging line
    } else {
      console.warn("No token found in storage!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);