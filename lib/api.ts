/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

// interface RetryConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // REQUIRED for sending refresh cookie
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (token: string) => void;
//   reject: (error: AxiosError) => void;
// }[] = [];

// const processQueue = (error: AxiosError | null, token: string | null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else if (token) {
//       promise.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as RetryConfig;

//     // ❌ Not 401 → just fail
//     if (error.response?.status !== 401) {
//       return Promise.reject(error);
//     }

//     // ❌ Already retried → logout
//     if (originalRequest._retry) {
//       useAuthStore.getState().logout();
//       return Promise.reject(error);
//     }

//     // 🔁 Refresh in progress → queue this request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token: string) => {
//             originalRequest.headers = originalRequest.headers ?? {};
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           },
//           reject,
//         });
//       });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       const newToken = await useAuthStore.getState().refreshToken();

//       if (!newToken) throw new Error("Refresh failed");

//       processQueue(null, newToken);

//       originalRequest.headers = originalRequest.headers ?? {};
//       originalRequest.headers.Authorization = `Bearer ${newToken}`;

//       return api(originalRequest);
//     } catch (refreshError: any) {
//       processQueue(refreshError, null);
//       useAuthStore.getState().logout();
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );
