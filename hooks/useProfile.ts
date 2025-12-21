/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreatorProfile() {
  return useQuery({
    queryKey: ["creatorProfile"],
    queryFn: async () => {
      const { data } = await api.get("/auth/profile/creator");
      return data;
    },
    // Only run if we actually have a token in the store
    enabled:
      useAuthStore?.getState().isAuthenticated &&
      !!useAuthStore.getState().token,
  });
}

// OTP Verfication
export function useUpdateCreatorProfile() {
  return useMutation({
    mutationFn: (data: any) => api.patch("/auth/profile/creator", data),
    onSuccess: (res: any) => {
      console.log("PROFILE UPDATE SUCCESS:", res.data);
    },
    onError: (err: any) => {
      console.log("PROFILE UPDATE ERROR:", err.response?.data);
    },
  });
}
