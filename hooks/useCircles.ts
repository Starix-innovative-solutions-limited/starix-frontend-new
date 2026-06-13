import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useGetCircles = (page: number = 1) => {
  return useQuery({
    queryKey: ["circles", page],
    queryFn: async () => {
      const { data } = await api.get(`/circles?page=${page}&page_size=6`);
      return data;
    },
    // DISABLE retries so the error happens once and stops
    retry: false,
    // DISABLE refetching so it doesn't try again when you click around
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/circles", payload);
      return data;
    },
    onSuccess: () => {
      // Temporarily disable this to stop the 500 error loop
      // while you work with your backend dev
      // queryClient.invalidateQueries({ queryKey: ["circles"] });
      console.log("Circle created! Refresh manually for now.");
    },
  });
};

export const useGetCircle = (circleId: string) => {
  return useQuery({
    queryKey: ["circle", circleId],
    queryFn: async () => {
      const { data } = await api.get(`/circles/${circleId}`);
      return data;
    },
    enabled: !!circleId, // Only fetch if ID exists
  });
};

// Add this to your hooks/useCircles.ts
export const useUpdateCircle = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      name?: string;
      description?: string;
      privacy?: "public" | "private";
      niches?: string[];
      profile_picture_url?: string | null;
      banner_url?: string | null;
    }) => {
      const { data } = await api.patch(`/circles/${circleId}`, payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate the profile query to trigger a re-fetch of the UI
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
      // Also invalidate the raw circle record — SettingsModal's General
      // tab reads name/description/niches/privacy/join_code from this.
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
    },
  });
};

export const useGetCircleProfile = (circleId: string) => {
  return useQuery({
    queryKey: ["circle-profile", circleId],
    queryFn: async () => {
      const { data } = await api.get(`/circles/${circleId}/profile`);
      return data;
    },
    enabled: !!circleId,
  });
};


export const useJoinCircle = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      // The API expects { "code": "8421AC" }
      const { data } = await api.post("/circles/join", { code });
      return data;
    },
  });
};

export const useRotateJoinCode = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/circles/${circleId}/join-code/rotate`);
      return data;
    },
    onSuccess: () => {
      // 1. Invalidate the raw circle record (used by SettingsModal)
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
      
      // 2. Invalidate the profile record (used by CircleProfilePage)
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useClearJoinCode = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/circles/${circleId}/join-code`);
      return data;
    },
    onSuccess: () => {
      // Invalidate both keys to keep the UI in sync
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useUpdateMemberRole = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | "manager" | "member" }) => {
      const { data } = await api.patch(`/circles/${circleId}/members/${userId}/role`, { role });
      return data;
    },
    onSuccess: () => {
      // Invalidate the profile to trigger a re-fetch of the member list
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useGetCircleMembers = (circleId: string) => {
  return useQuery({
    queryKey: ["circle-members", circleId],
    queryFn: async () => {
      const { data } = await api.get(`/circles/${circleId}/members`);
      return data; // Assuming this returns an array of member objects
    },
  });
};