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
  token_type: string;
  user_type: string;
  user: User;
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
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.access_token);
        }
      
        set({
          token: data.access_token,
          userType: data.user_type,
          user: data.user,
          isAuthenticated: true,
          profile: null,
        });
      
        get().fetchProfile();
      },

      // 💡 Action to update profile from anywhere (like your mutation hook)
      setProfile: (profile) => set({ profile }),

      fetchProfile: async () => {
        try {
          // 💡 We use /auth/me now since we know it works!
          const { data } = await api.get("/auth/me");
          set({ profile: data });
          console.log("Profile updated in store:", data);
        } catch (error: any) {
          console.error("Failed to fetch profile:", error);
          if (error.response?.status === 401) {
            get().logout();
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