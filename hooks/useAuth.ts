/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { sessionAuth } from "@/utils/sessionAuth";
import {
  BrandSignupPayload,
  CreatorSignupPayload,
  GenerateOtpPayload,
  ResendOtpPayload,
  ResetPasswordOtpPayload,
  VerifyEmailOtpPayload,
} from "@/utils/type";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_type: "creator" | "brand" | string;
  user: any;
}

export function useLogin() {
  const { setAuth } = useAuthStore();

  return useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      const res = await api.post<LoginResponse>("/auth/login", data);
      return res.data; // Return actual payload
    },

    onError: (err: any) => {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      // Optionally throw to let mutateAsync catch it
      throw err;
    },

    onSuccess: (data: LoginResponse) => {
      console.log("LOGIN SUCCESS:", data);
      setAuth(data); // Update Zustand store
    },
  });
}

export const useCreatorSignup = () => {
  return useMutation({
    mutationFn: (data: CreatorSignupPayload) =>
      api.post("/auth/signup/creator", data),

      onSuccess: (res: any) => {
        const token = res?.data?.access_token;
        
        // Save to sessionAuth for app state
        sessionAuth.save({
          email: res?.data?.user?.email,
          role: "creator",
          access_token: token,
          token_type: res?.data?.token_type,
        });

        // CRITICAL: Save to localStorage as 'token' so api.ts interceptor finds it
        if (token) {
          localStorage.setItem("token", token);
        }
        
        console.log("Signup success, token stored:", token);
        return res?.data;
      },

    onError: (err: any) => {
      console.log("CREATOR SIGNUP ERROR:", err.response?.data);
      return err?.response?.data;
    },
  });
};

export const useBrandSignup = () => {
  return useMutation({
    mutationFn: (data: BrandSignupPayload) =>
      api.post("/auth/signup/brand", data),

    onSuccess: (res) => {
      sessionAuth.save({
        email: res?.data?.user?.brand_email,
        role: "brand",
        access_token: res?.data?.access_token,
        token_type: res?.data?.token_type,
      });
      console.log("Brand signup successful:", res.data);
    },

    onError: (err: any) => {
      console.error("Brand signup failed:", err.response?.data || err);
    },
  });
};

// OTP Verfication
export function useGenerateOtp() {
  return useMutation({
    mutationFn: (data: GenerateOtpPayload) =>
      api.post("/auth/otp/email/request", data),

    onSuccess: (res: any) => {
      console.log("OTP GENERATED SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("OTP GENERATED ERROR:", err.response?.data);
    },
  });
}

export function useVerifyEmailOtp() {
  return useMutation({
    mutationFn: (data: VerifyEmailOtpPayload) =>
      api.post("/auth/otp/email/verify", data),

    onSuccess: (res: any) => {
      console.log("EMAIL VERIFIED SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("EMAIL VERIFIED ERROR:", err.response?.data);
    },
  });
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      // 💡 This is the likely correct endpoint for password resets
      const { data } = await api.post("/auth/forgot-password", { email });
      return data;
    },
  });
};


// 💡 STEP 1: Request the Reset Code
// This hits the specific password-reset request route, bypassing the "already verified" check.
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => 
      api.post("/auth/password-reset/request", { email }), // Correct endpoint for requesting OTP
    onSuccess: (res: any) => {
      console.log("RESET CODE SENT:", res.data);
    },
    onError: (err: any) => {
      console.log("RESET REQUEST ERROR:", err.response?.data);
    },
  });
}

// 💡 STEP 2: Finalize the Password Change
// This hits the endpoint that actually updates the password in the database.
export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: (data: ResetPasswordOtpPayload) =>
      api.post("/auth/password-reset/confirm", data), // 💡 Double check if your backend uses /confirm or /reset
    onSuccess: (res: any) => {
      console.log("PASSWORD UPDATED SUCCESS:", res.data);
    },
    onError: (err: any) => {
      console.log("PASSWORD UPDATE ERROR:", err.response?.data);
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpPayload) => api.post("/auth/otp/email/request", data),

    onSuccess: (res: any) => {
      console.log("OTP RESENT SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("OTP RESENT ERROR:", err.response?.data);
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (data: any) => api.post("/auth/token/refresh", data),

    onSuccess: (res: any) => {
      console.log("REFRESH TOKEN SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("REFRESH TOKEN ERROR ERROR:", err.response?.data);
    },
  });
}

export const useJoinWaitlist = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => 
      // Using '../' tells Axios to go back one level from the /api base
      api.post("../waitlist", data), 

    onSuccess: (res: any) => {
      console.log("WAITLIST SUCCESS:", res.data);
      return res.data;
    },
    onError: (err: any) => {
      console.error("DEBUG URL:", err.config.url); // Check the console to see the final URL
      throw err;
    },
  });
};

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  user_type: "creator" | "brand" | string;
  phone_number: string | null;
  bio: string | null;
  profile_picture_url: string | null;
  banner_url?: string | null;
  niches?: string[];
  total_completed_challenges?: number;
  connected_platforms?: { platform: string; username: string }[];
  lifetime_engagements?: number;
  starix_score?: number;
  starix_score_visibility?: "public" | "private";
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export function useGetMe() {
  return useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: false,
  });
}


export interface ContactPayload {
  full_name: string;
  email: string;
  role: "creator" | "brand"; // Matches backend casing variants
  message: string;
}

export const useCreateContactMessage = () => {
  return useMutation({
    mutationFn: async (payload: ContactPayload) => {
      const { data } = await api.post("/contact", payload);
      return data;
    },
  });
};

