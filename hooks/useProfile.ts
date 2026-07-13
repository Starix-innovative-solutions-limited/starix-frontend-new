/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "axios";

export interface CreatorProfile {
  first_name: string;
  last_name: string;
  username: string;
  profile_picture_url: string;
  banner_url: string;
  niches: string[];
  total_completed_challenges: number;
  connected_platforms: { platform: string; username: string }[];
  lifetime_engagements: number;
  starix_score?: number; // Optional because it's hidden if private
  bio: string;
}

export const useGetCreatorProfile = (username: string, options?: any) => {
  return useQuery<CreatorProfile>({
    queryKey: ["creatorProfile", username],
    queryFn: async () => {
      const { data } = await api.get(`/creators/${username}/profile`);
      return data;
    },
    enabled: !!username,
    ...options,
  });
};

// export function useCreatorProfile() {
//   const { setProfile } = useAuthStore();

//   return useQuery({
//     queryKey: ["authMe"], // Changed key to avoid collision
//     queryFn: async () => {
//       const { data } = await api.get("/auth/me");
//       if (data) setProfile(data); 
//       return data;
//     },
//     enabled: !!useAuthStore.getState().token,
//   });
// }

export function useCreatorProfile() {
  const { setProfile } = useAuthStore();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      if (data) setProfile(data);
      return data;
    },
    retry: false,
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
export const useGetMyStarixScore = () => {
  return useQuery({
    queryKey: ["starix-score", "me"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/starix-score/me");
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        // If 404, it means the score hasn't been calculated yet
        if (axiosError.response?.status === 404) return null;
        throw error;
      }
    },
    // Only fetch if the user is authenticated (assuming you have a way to check auth)
    enabled: !!useAuthStore.getState().token,
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


export type UpdateCreatorProfilePayload = {
  profile_picture_url?: string | null;
  banner_url?: string | null;
  starix_score_visibility?: "public" | "private";
  niches?: string[];
};

type UploadTarget =
  | "profile_picture"
  | "user_banner"
  | "challenge_banner"
  | "challenge_document"
  | "circle_profile_picture"
  | "circle_banner";

type UploadUrlResponse = {
  upload_url: string;
  object_key: string;
  public_url: string;
  expires_in: number;
};
export async function uploadUserMedia(file: File, target: UploadTarget) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be 5MB or smaller.");
  }

  const { data } = await api.post<UploadUrlResponse>("/media/upload-url", {
    target,
    filename: file.name,
    content_type: file.type,
  });

  const uploadResponse = await fetch(data.upload_url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 upload failed with status ${uploadResponse.status}`);
  }

  // FIX: Ensure we only return the clean URL
  // If data.public_url includes query params like ?AWSAccessKeyId=..., 
  // strip them if you want a permanent public link.
  const cleanUrl = data.public_url.split('?')[0]; 
  
  return cleanUrl;
}

export function useUpdateCreatorProfile() {
  const queryClient = useQueryClient();
  const { setProfile } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: UpdateCreatorProfilePayload) => {
      const { data } = await api.patch("/auth/me", payload);
      return data;
    },
    onSuccess: (updatedData: any) => {
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });

      queryClient.setQueryData(["authMe"], updatedData);
      queryClient.setQueryData(["me"], updatedData);

      if (updatedData) setProfile(updatedData);
    },
  });
}

export interface CreatorMetricsResponse {
  lifetime_earnings: {
    currency: string;
    total_minor: number;
  }[];
  lifetime_engagement: number;
  global_rank: number | null;
  previous_rank: number | null;
  rank_direction: "up" | "down" | "same" | "new";
}

export const useGetCreatorMetrics = (
  username: string | undefined,
  options?: any
) => {
  return useQuery<CreatorMetricsResponse | null>({
    queryKey: ["creatorMetrics", username],
    queryFn: async () => {
      if (!username) return null;

      const { data } = await api.get<CreatorMetricsResponse>(
        `/creators/${username}/metrics`
      );

      return data;
    },
    enabled: !!username,
    ...options,
  });
};

export interface CreatorCircle {
  circle_id: string;
  user_id: string;
  username: string;
  full_name: string;
  profile_picture_url: string | null;
  global_rank: number;
  active_challenge_count: number;
  role: "admin" | "manager" | "member";
  name: string;
  members: {
    user_id: string;
    profile_picture_url: string | null;
  }[];
  member_count: number;
}

export interface CreatorCirclesResponse {
  items: CreatorCircle[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
}

export const useGetCreatorCircles = (
  username: string | undefined,
  page = 1,
  pageSize = 4,
  options?: any
) => {
  return useQuery<CreatorCirclesResponse | null>({
    queryKey: ["creatorCircles", username, page, pageSize],
    queryFn: async () => {
      if (!username) return null;

      const { data } = await api.get<CreatorCirclesResponse>(
        `/creators/${username}/circles`,
        {
          params: {
            page,
            page_size: pageSize,
          },
        }
      );

      return data;
    },
    enabled: !!username,
    ...options,
  });
};