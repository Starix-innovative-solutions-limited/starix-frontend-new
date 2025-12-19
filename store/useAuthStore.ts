/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { CreatorProfile } from "@/utils/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 1. Define the User structure based on your JSON
interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_ip: string;
  last_login_at: string;
}

// 2. Define the shape of the Login response
interface LoginResponse {
  access_token: string;
  token_type: string;
  user_type: string;
  user: User;
}

// 3. Define the Store's State and Actions
interface AuthState {
  user: User | null;
  token: string | null;
  userType: string | null;
  isAuthenticated: boolean;
  setAuth: (data: LoginResponse) => void;
  logout: () => void;
  profile: CreatorProfile | null; // Added profile field
  fetchProfile: () => void;
}

// 4. Create the store with Types
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Added 'get' to access current state
      user: null,
      profile: null,
      token: null,
      userType: null,
      isAuthenticated: false,

      setAuth: (data) => {
        set({
          token: data.access_token,
          userType: data.user_type,
          user: data.user,
          isAuthenticated: true,
        });
        // Immediately trigger profile fetch after login
        get().fetchProfile();
      },

      fetchProfile: async () => {
        try {
          const { data } = await api.get("/auth/profile/creator");
          set({ profile: data });
          console.log("set profile in auth", data);
        } catch (error) {
          console.error("Failed to fetch creator profile:", error);
          // If 401, you might want to logout
        }
      },

      logout: () =>
        set({ user: null, profile: null, token: null, isAuthenticated: false }),
    }),
    { name: "creator-auth-storage" }
  )
);
