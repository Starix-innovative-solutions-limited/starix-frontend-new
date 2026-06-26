/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface GetChallengesParams {
  skip?: number;
  limit?: number;
  q?: string;
  status?: string;
  brand_id?: string;
}

export interface ChallengeMedia {
  id: string;
  media_type: "video" | "image" | string;
  media_url: string;
  display_order: number;
  original_filename: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming" | string;
  start_date: string;
  end_date: string;
  currency: string;
  currency_symbol: string;
  prize_pool: number;
  prize_pool_display: string;
  banner_url: string;
  category_id: string;
  category_name: string;
  brand_id: string;
  brand_name: string;
  brand_profile_picture_url: string;
  brand_bio: string;
  participant_count: number;
  viewer_count: number;
  share_count: number;
  save_count: number;
  is_funded: boolean;
  is_published: boolean;
  is_saved: boolean;
  media: ChallengeMedia[];
  created_at: string;
  updated_at: string;
}

export interface ChallengesResponse {
  challenges: ChallengeItem[];
  total: number;
}

export function useCreateChallenge() {
  return useMutation({
    mutationFn: (data: any) => api.post("/challenges", data),
    onError: (err: any) => {
      console.error("Error Creating challenge:", err.response?.data || err.message);
      throw err;
    },
    onSuccess: (res: any) => {
      console.log("Challenge creation successful:", res.data);
    },
  });
}

export function useGetChallenges(params?: GetChallengesParams) {
  return useQuery<ChallengesResponse>({
    // Passing params in the query key makes React Query auto-refetch whenever a search query or tab changes!
    queryKey: ["challenges", params],
    queryFn: async () => {
      const response = await api.get<ChallengesResponse>("/challenges", {
        params: {
          skip: params?.skip ?? 0,
          limit: params?.limit ?? 25,
          q: params?.q || undefined,
          status: params?.status || undefined,
          brand_id: params?.brand_id || undefined,
        },
      });

      // FIX: Return response.data directly because 'challenges' and 'total' are root fields
      return response.data;
    },
  });
}

export interface JoinedChallengeItem {
  brand_logo_url: string;
  brand_name: string;
  challenge_id: string;
  currency: string;
  prize_pool: number;
  prize_pool_formatted: string;
  status: "in_progress" | "submitted" | "under_review" | string;
  title: string;
}

export interface JoinedChallengesResponse {
  items: JoinedChallengeItem[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
}

// Custom hook to fetch active campaigns a creator has officially entered
export function useGetJoinedActiveChallenges() {
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "active"],
    queryFn: async () => {
      const response = await api.get<JoinedChallengesResponse>("/challenges/joined/active");
      return response.data;
    },
  });
}

// Custom hook to fetch completed challenges a creator has finished
export function useGetJoinedCompletedChallenges() {
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "completed"],
    queryFn: async () => {
      const response = await api.get<JoinedChallengesResponse>("/challenges/joined/completed");
      return response.data;
    },
  });
}


export const useGetRecommendedChallenges = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ["challenges", "recommended", limit, offset],
    queryFn: async () => {
      const { data } = await api.get("/challenges/recommended", {
        params: { limit, offset }
      });
      return data;
    },
  });
};

export const useGetTrendingChallenges = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ["challenges", "trending", limit, offset],
    queryFn: async () => {
      // Check if this endpoint supports params; if not, remove the second argument
      const { data } = await api.get("/challenges/trending", {
        params: { limit, offset } 
      });
      return data;
    },
  });
};

/**
 * Fetches a single challenge's details by its ID.
 * @param id The UUID string of the challenge
 */
export const useGetChallengeById = (id: string) => {
  return useQuery({
    queryKey: ["challenges", "detail", id],
    queryFn: async () => {
      // Prevents making an API call if the id is undefined or missing
      if (!id) return null;
      
      const { data } = await api.get(`/challenges/${id}/detail`);
      return data;
    },
    enabled: !!id, // Only runs the query if an id is actually provided
  });
};

export interface SavedChallengesResponse {
  items: {
    challenge_id: string;
    title: string;
    brand_name: string;
    brand_logo_url: string;
    prize_pool_formatted: string;
    // Add other fields if needed
  }[];
  total_items: number;
}

export const useGetSavedChallenges = (page: number = 1, page_size: number = 8) => {
  return useQuery<SavedChallengesResponse>({
    queryKey: ["challenges", "saved", page, page_size],
    queryFn: async () => {
      const { data } = await api.get("/challenges/saved", {
        params: { page, page_size },
      });
      return data;
    },
  });
};