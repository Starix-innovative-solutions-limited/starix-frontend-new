/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { BrandProfile, CreatorProfile } from "@/utils/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  user_type?: "creator" | "brand" | string;
  user: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  userType: string | null;
  isAuthenticated: boolean;
  profile: CreatorProfile | BrandProfile | any | null;
  setAuth: (data: LoginResponse) => void;
  setProfile: (profile: any) => void; // 💡 Added this
  logout: () => void;
  fetchProfile: () => void;
  refreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      userType: null,
      isAuthenticated: false,

      setAuth: (data) => {
        const userType = data.user_type ?? data.user?.user_type;
      
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.access_token);
        }
      
        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
      
        set({
          token: data.access_token,
          userType,
          user: data.user,
          isAuthenticated: true,
          profile: data.user,
        });
      },

      // 💡 Action to update profile from anywhere (like your mutation hook)
      setProfile: (profile) => set({ profile }),

      fetchProfile: async () => {
        try {
          const token = get().token || localStorage.getItem("token");
      
          const { data } = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          set({ profile: data });
          console.log("Profile updated in store:", data);
        } catch (error: any) {
          console.error("Failed to fetch profile:", error);
          if (error.response?.status === 401) {
            console.warn("Profile fetch unauthorized after login. Check /auth/me backend auth.");
          }
        }
      },

      logout: () => {
        localStorage.removeItem("token"); // Clean up the manual token too
        set({
          user: null,
          profile: null,
          token: null,
          userType: null,
          isAuthenticated: false,
        });
      },

      refreshToken: async () => {
        try {
          const { data } = await api.post("/auth/refresh");
          set({ token: data.access_token, isAuthenticated: true });
          return data.access_token;
        } catch (error) {
          get().logout();
          return null;
        }
      },
    }),
    { name: "creator-auth-storage" }
  )
);