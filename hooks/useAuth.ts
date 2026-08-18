/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { sessionAuth } from "@/utils/sessionAuth";
import {
  BrandSignupPayload,
  BrandSignupResponse,
  CreatorSignupPayload,
  CreatorSignupResponse,
  LoginPayload,
  LoginResponse,
  RequestEmailOtpResponse,
  ResetPasswordOtpPayload,
  UserProfile,
  VerifyEmailOtpPayload,
  VerifyEmailOtpResponse,
} from "@/utils/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export type { UserProfile };

export function useLogin() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await api.post<LoginResponse>("/auth/login", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      return res.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      setAuth({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        user_type: data.user?.user_type,
        user: data.user,
      });
    },

    onError: (err: any) => {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
    },
  });
}

export const useCreatorSignup = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (data: CreatorSignupPayload) => {
      const res = await api.post<CreatorSignupResponse>(
        "/auth/signup/creator",
        data
      );
      return res.data;
    },

    onSuccess: (data) => {
      sessionAuth.save({
        email: data.user.email,
        role: "creator",
        access_token: data.access_token,
        token_type: data.token_type,
      });

      localStorage.setItem("token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      setAuth({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        user_type: data.user.user_type,
        user: data.user,
      });
    },

    onError: (err: any) => {
      console.log("CREATOR SIGNUP ERROR:", err.response?.data);
    },
  });
};

export const useBrandSignup = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (data: BrandSignupPayload) => {
      const res = await api.post<BrandSignupResponse>(
        "/auth/signup/brand",
        data
      );
      return res.data;
    },

    onSuccess: (data) => {
      sessionAuth.save({
        email: data.user.email,
        role: "brand",
        access_token: data.access_token,
        token_type: data.token_type,
      });

      localStorage.setItem("token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      setAuth({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        user_type: data.user.user_type,
        user: data.user,
      });
    },

    onError: (err: any) => {
      console.error("Brand signup failed:", err.response?.data || err);
    },
  });
};

// OTP Verification — POST /auth/otp/email/request (Bearer auth, no body)
export function useGenerateOtp() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<RequestEmailOtpResponse>(
        "/auth/otp/email/request"
      );
      return data;
    },

    onSuccess: (data) => {
      console.log("OTP GENERATED SUCCESS:", data);
    },

    onError: (err: any) => {
      console.log("OTP GENERATED ERROR:", err.response?.data);
    },
  });
}

export function useVerifyEmailOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: VerifyEmailOtpPayload) => {
      const { data } = await api.post<VerifyEmailOtpResponse>(
        "/auth/otp/email/verify",
        { code: payload.code.trim() }
      );
      return data;
    },

    onSuccess: (data) => {
      console.log("EMAIL VERIFIED SUCCESS:", data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
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

/** Alias of useGenerateOtp — same authenticated no-body request endpoint */
export function useResendOtp() {
  return useGenerateOtp();
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

export const useWaitlistTotal = () => {
  return useQuery({
    queryKey: ["waitlist", "total"],
    queryFn: async () => {
      const { data } = await api.get<{ waitlist_total: string }>("/waitlist/total");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export function useGetMe() {
  const { setProfile } = useAuthStore();

  return useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get<UserProfile>("/auth/me");
      setProfile(data);
      return data;
    },
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 5,
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

