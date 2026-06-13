/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

export interface StarixScoreResponse {
  user_id: string;
  starix_score: number;
  track_record_score: number;
  social_health_score: number;
  confidence: number;
  connected_platforms_count: number;
  recent_submissions_count: number;
  last_calculated_at: string;
}


// Updated Frontend Hook to match a dynamic backend adjustment
export const useGetMyStarixScore = (username: string | undefined) => {
  return useQuery({
    queryKey: ["starix-score", username],
    queryFn: async () => {
      if (!username) return null;
      try {
        const { data } = await api.get(`/starix-score/${username}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) return null;
        throw error;
      }
    },
    enabled: !!username,
  });
};

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  full_name: string;
  profile_picture_url: string;
  starix_score: number;
  previous_rank: number;
  rank_direction: "up" | "down" | "stable" | "new";
}

export interface GlobalLeaderboardResponse {
  entries: LeaderboardEntry[];
  viewer_entry: LeaderboardEntry | null;
  limit: number;
  offset: number;
  total_entries: number;
}

/**
 * Fetches the global creator leaderboard ranking schema
 */
export const useGetGlobalLeaderboard = (username: string | undefined) => {
  return useQuery({
    queryKey: ["leaderboard", "global", username],
    queryFn: async () => {
      if (!username) return null;
      try {
        const { data } = await api.get<GlobalLeaderboardResponse>(
          `/starix-score/${username}/leaderboard`
        );
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) return null;
        throw error;
      }
    },
    enabled: !!username,
  });
};