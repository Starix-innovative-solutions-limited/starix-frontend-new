/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

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
