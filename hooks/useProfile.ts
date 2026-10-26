/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserProfile } from "@/utils/type";

export interface CreatorProfile {
  first_name: string;
  last_name: string;
  username: string;
  profile_picture_url: string;
  banner_url: string;
  niches: string[];
  total_completed_challenges: number;
  connected_platforms: { platform: string; username: string | null }[];
  lifetime_engagements: number;
  starix_score?: number | null;
  bio: string | null;
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

  return useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get<UserProfile>("/auth/me");
      if (data) setProfile(data);
      return data;
    },
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 5,
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
  last_calculated_at?: string | null;
}


// Updated Frontend Hook to match a dynamic backend adjustment
export const useGetMyStarixScore = () => {
  return useQuery<StarixScoreResponse | null>({
    queryKey: ["starix-score", "me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<StarixScoreResponse>("/starix-score/me");
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;
        // If 404, it means the score hasn't been calculated yet
        if (axiosError.response?.status === 404) return null;
        throw error;
      }
    },
    enabled: !!useAuthStore.getState().token,
    refetchInterval: (query) =>
      query.state.data?.last_calculated_at ? false : 12_000,
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
  bio?: string | null;
  starix_score_visibility?: "public" | "private";
  niches?: string[];
};

export { uploadUserMedia } from "@/hooks/uploadUserMedia";
export type { UploadTarget } from "@/hooks/uploadUserMedia";

export function useUpdateCreatorProfile() {
  const queryClient = useQueryClient();
  const { setProfile } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: UpdateCreatorProfilePayload) => {
      const settingsBody: Omit<UpdateCreatorProfilePayload, "bio"> = {};
      if ("profile_picture_url" in payload) {
        settingsBody.profile_picture_url = payload.profile_picture_url;
      }
      if ("banner_url" in payload) {
        settingsBody.banner_url = payload.banner_url;
      }
      if ("starix_score_visibility" in payload) {
        settingsBody.starix_score_visibility = payload.starix_score_visibility;
      }
      if ("niches" in payload) {
        settingsBody.niches = payload.niches;
      }

      let updated: UserProfile | null = null;

      if (Object.keys(settingsBody).length > 0) {
        const { data } = await api.patch<UserProfile>("/auth/me", settingsBody);
        updated = data;
      }

      // PATCH /auth/me does not accept bio. The documented write path is
      // PUT /creators/onboarding/profile, which updates bio without regressing onboarding.
      if ("bio" in payload) {
        await api.put("/creators/onboarding/profile", { bio: payload.bio ?? null });
        updated = {
          ...(updated ?? {}),
          bio: payload.bio ?? null,
        } as UserProfile;
      }

      if (!updated) {
        const { data } = await api.get<UserProfile>("/auth/me");
        updated = data;
      }

      return updated;
    },
    onSuccess: (updatedData: UserProfile) => {
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["creatorProfile"] });
      queryClient.invalidateQueries({ queryKey: ["creators", "onboarding"] });

      queryClient.setQueryData(["authMe"], updatedData);
      queryClient.setQueryData(["me"], updatedData);

      if (updatedData?.username) {
        queryClient.setQueryData(
          ["creatorProfile", updatedData.username],
          (current: CreatorProfile | undefined) =>
            current
              ? {
                  ...current,
                  bio: updatedData.bio ?? current.bio,
                  niches: updatedData.niches ?? current.niches,
                  profile_picture_url:
                    updatedData.profile_picture_url ?? current.profile_picture_url,
                  banner_url: updatedData.banner_url ?? current.banner_url,
                }
              : current
        );
      }

      if (updatedData) setProfile(updatedData);
    },
  });
}

export type BrandProfile = {
  profile_picture_url: string | null;
  banner_image_url: string | null;
  niches: string[];
  brand_description: string | null;
  brand_name: string;
  website_url: string | null;
};

export type UpdateBrandProfilePayload = {
  profile_picture_url: string | null;
  brand_name: string;
  website_url: string;
  brand_description: string;
  banner_image_url: string | null;
  niches: string[];
};

/**
 * GET /brands/profile returns the canonical values used by the brand
 * edit-profile form, including the industry as `niches`.
 */
export function useGetBrandProfile() {
  return useQuery({
    queryKey: ["brands", "profile"],
    queryFn: async () => {
      const { data } = await api.get<BrandProfile>("/brands/profile");
      return data;
    },
  });
}

export function useUpdateBrandProfile() {
  const queryClient = useQueryClient();
  const { setProfile } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: UpdateBrandProfilePayload) => {
      await api.put("/brands/profile", payload);
      const { data } = await api.get("/auth/me");
      return data;
    },
    onSuccess: (updatedData: any) => {
      queryClient.setQueryData(["me"], updatedData);
      queryClient.setQueryData(["authMe"], updatedData);
      queryClient.invalidateQueries({ queryKey: ["brands", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["brands", "onboarding"] });
      if (updatedData) setProfile(updatedData);
    },
  });
}

export interface BrandProfileOverviewResponse {
  total_published_challenges: number;
  total_engagement: number;
  total_active_challenges: number;
}

/** GET /brands/profile/overview — challenge totals for brand dashboard cards. */
export function useGetBrandOverview(options?: { enabled?: boolean }) {
  return useQuery<BrandProfileOverviewResponse>({
    queryKey: ["brands", "profile", "overview"],
    queryFn: async () => {
      const { data } = await api.get<BrandProfileOverviewResponse>(
        "/brands/profile/overview"
      );
      return data;
    },
    enabled: options?.enabled ?? true,
    staleTime: 60_000,
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
    username?: string;
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

export type PortfolioPlatform = "instagram" | "tiktok" | "youtube" | "x";

export type CreatorPortfolioItem = {
  id: string;
  platform: PortfolioPlatform | string;
  content_type: string;
  content_url: string;
  platform_post_id: string;
  cover_image_url: string | null;
  created_at: string;
};

export type CreatorPortfolioResponse = {
  items: CreatorPortfolioItem[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
};

export type GetCreatorPortfolioParams = {
  platform?: PortfolioPlatform | null;
  page?: number;
  page_size?: number;
};

export const useGetCreatorPortfolio = (
  username: string | undefined,
  params: GetCreatorPortfolioParams = {},
  options?: { enabled?: boolean }
) => {
  const page = params.page ?? 1;
  const pageSize = params.page_size ?? 10;
  const platform = params.platform ?? null;

  return useQuery<CreatorPortfolioResponse | null>({
    queryKey: ["creatorPortfolio", username, platform, page, pageSize],
    queryFn: async () => {
      if (!username) return null;

      try {
        const { data } = await api.get<CreatorPortfolioResponse>(
          `/creators/${username}/portfolio`,
          {
            params: {
              ...(platform ? { platform } : {}),
              page,
              page_size: pageSize,
            },
          }
        );
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<{ detail?: string }>;
        const status = axiosError.response?.status;
        const detail = axiosError.response?.data?.detail;

        if (status === 404) {
          throw new Error(
            typeof detail === "string" ? detail : "Creator not found."
          );
        }

        if (status === 422) {
          throw new Error(
            typeof detail === "string"
              ? detail
              : "Invalid platform value. Use instagram, tiktok, youtube, or x."
          );
        }

        throw error;
      }
    },
    enabled: !!username && (options?.enabled ?? true),
    ...options,
  });
};