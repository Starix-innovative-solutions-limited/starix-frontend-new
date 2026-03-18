/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreatorProfile() {
  const { setProfile } = useAuthStore(); // 💡 Get the setter

  return useQuery({
    queryKey: ["creatorProfile"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      // 💡 Sync store whenever we fetch the profile
      if (data) setProfile(data); 
      return data;
    },
    enabled:
      useAuthStore?.getState().isAuthenticated &&
      !!useAuthStore.getState().token,
  });
}

export function useUpdateCreatorProfile() {
  const queryClient = useQueryClient();
  const { setProfile } = useAuthStore(); // 💡 Get the setter

  return useMutation({
    mutationFn: async (data: any) => {
      // Axios handles objects as JSON and FormData as multipart automatically
      const response = await api.patch("/auth/me", data);
      return response.data; // Return data directly for the component
    },
    onSuccess: (updatedData: any) => {
      console.log("PROFILE UPDATE SUCCESS:", updatedData);
      
      // 1. Refresh the cache for this query
      queryClient.invalidateQueries({ queryKey: ["creatorProfile"] });

      // 2. 💡 Sync the Zustand store immediately so the whole app updates
      if (updatedData) {
        setProfile(updatedData);
      }
    },
    onError: (err: any) => {
      console.error("PROFILE UPDATE ERROR:", err.response?.data || err.message);
    },
  });
}