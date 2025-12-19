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

export function useLogin() {
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post("/auth/login", data),

    onError: (err: any) => {
      console.log("LOGIN ERROR:", err.response?.data);
    },

    onSuccess: (res: any) => {
      console.log("LOGIN SUCCESS:", res.data);
      setAuth(res?.data);
    },
  });
}

export const useCreatorSignup = () => {
  return useMutation({
    mutationFn: (data: CreatorSignupPayload) =>
      api.post("/auth/signup/creator", data),

    onSuccess: (res: any) => {
      sessionAuth.save({
        email: res?.data?.user?.email,
        role: "creator",
        access_token: res?.data?.access_token,
        token_type: res?.data?.token_type,
      });
      console.log("CREATOR SIGNUP SUCCESS:", res.data);
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
        email: res?.data?.user?.email,
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
      api.post("/auth/otp/generate", data),

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
      api.post("/auth/otp/verify-email", data),

    onSuccess: (res: any) => {
      console.log("EMAIL VERIFIED SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("EMAIL VERIFIED ERROR:", err.response?.data);
    },
  });
}

export function useResetPasswordWithOtp() {
  return useMutation({
    mutationFn: (data: ResetPasswordOtpPayload) =>
      api.post("/auth/otp/reset-password", data),

    onSuccess: (res: any) => {
      console.log("PASSWORD RESET SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("PASSWORD RESET ERROR:", err.response?.data);
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpPayload) => api.post("/auth/otp/resend", data),

    onSuccess: (res: any) => {
      console.log("OTP RESENT SUCCESS:", res.data);
    },

    onError: (err: any) => {
      console.log("OTP RESENT ERROR:", err.response?.data);
    },
  });
}
