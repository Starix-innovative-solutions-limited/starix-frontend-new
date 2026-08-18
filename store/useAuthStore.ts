/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { BrandProfile, CreatorProfile, UserProfile } from "@/utils/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  user_type?: "creator" | "brand" | string;
  user: any;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshTokenValue: string | null;
  userType: string | null;
  isAuthenticated: boolean;
  profile: UserProfile | CreatorProfile | BrandProfile | any | null;
  setAuth: (data: LoginResponse) => void;
  setProfile: (profile: UserProfile | any) => void;
  logout: () => void;
  fetchProfile: () => Promise<UserProfile | null>;
  refreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      refreshTokenValue: null,
      userType: null,
      isAuthenticated: false,

      setAuth: (data) => {
        const userType = data.user_type ?? data.user?.user_type;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
        }

        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

        set({
          token: data.access_token,
          refreshTokenValue: data.refresh_token ?? null,
          userType,
          user: data.user,
          isAuthenticated: true,
          profile: data.user,
        });
      },

      setProfile: (profile) =>
        set({
          profile,
          user: profile,
          userType: profile?.user_type ?? get().userType,
        }),

      fetchProfile: async () => {
        try {
          const token = get().token || localStorage.getItem("token");
          if (!token) return null;

          const { data } = await api.get<UserProfile>("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          set({
            profile: data,
            user: data,
            userType: data.user_type ?? get().userType,
          });
          return data;
        } catch (error: any) {
          console.error("Failed to fetch profile:", error);
          if (error.response?.status === 401) {
            console.warn(
              "Profile fetch unauthorized. Check /auth/me backend auth."
            );
          }
          return null;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        set({
          user: null,
          profile: null,
          token: null,
          refreshTokenValue: null,
          userType: null,
          isAuthenticated: false,
        });
      },

      refreshToken: async () => {
        try {
          const refresh =
            get().refreshTokenValue ||
            localStorage.getItem("refresh_token");

          const { data } = await api.post("/auth/refresh", {
            refresh_token: refresh,
          });

          if (typeof window !== "undefined") {
            localStorage.setItem("token", data.access_token);
            if (data.refresh_token) {
              localStorage.setItem("refresh_token", data.refresh_token);
            }
          }

          set({
            token: data.access_token,
            refreshTokenValue: data.refresh_token ?? get().refreshTokenValue,
            isAuthenticated: true,
          });
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