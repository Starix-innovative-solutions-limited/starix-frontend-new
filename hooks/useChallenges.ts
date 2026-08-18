/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export type ChallengeStatus =
  | "draft"
  | "publishing"
  | "published"
  | "active"
  | "judging"
  | "completed"
  | "closed"
  | string;

export interface GetChallengesParams {
  skip?: number;
  limit?: number;
  offset?: number;
  q?: string;
  status?: ChallengeStatus;
  brand_id?: string;
}

export interface ChallengeMedia {
  id?: string;
  media_type: "video" | "image" | string;
  media_url: string;
  display_order?: number;
  original_filename?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatus;
  start_date: string;
  end_date: string;
  currency: string;
  currency_symbol: string;
  prize_pool: number;
  prize_pool_display: string;
  banner_url?: string;
  category_id: string;
  category_name?: string | null;
  brand_id: string;
  brand_name?: string;
  brand_profile_picture_url?: string | null;
  brand_bio?: string | null;
  participant_count: number;
  viewer_count?: number;
  share_count?: number;
  save_count?: number;
  is_funded?: boolean;
  is_published: boolean;
  is_saved?: boolean;
  media?: ChallengeMedia[];
  created_at: string;
  updated_at: string;
}

export interface ChallengesResponse {
  challenges: ChallengeItem[];
  total: number;
}

export type CreateChallengePayload = {
  title: string;
  description: string;
  category: string;
  prize_pool: number | string;
  prize_amounts: Array<number | string>;
  start_date: string;
  end_date: string;
  submission_eligibility?: "anyone" | "creators" | "circles";
  currency?: string;
  hashtags?: string;
  mentions?: string;
  platforms?: string[];
  posting_rules?: string;
  brief_document_url?: string;
  sample_media?: Array<{
    media_url: string;
    media_type: "image" | "video";
    original_filename?: string | null;
  }>;
  objective?: string;
};

export type FundChallengeResponse = {
  transaction_id: string;
  payment_url: string;
  base_amount: number;
  commission_amount: number;
  total_amount: number;
  total_display: string;
  commission_display: string;
  currency: string;
  reference: string;
};

/**
 * POST /brands/challenges — create a draft challenge (brand-auth).
 * Not visible to creators until funded via POST /brands/challenges/{id}/fund.
 */
export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateChallengePayload) => {
      const { data: created } = await api.post<ChallengeItem>(
        "/brands/challenges",
        data
      );
      return created;
    },
    onError: (err: any) => {
      console.error(
        "Error Creating challenge:",
        err.response?.data || err.message
      );
      throw err;
    },
    onSuccess: async (created) => {
      if (!created?.id) return;

      queryClient.setQueryData(
        ["brands", "challenges", "detail", created.id],
        created
      );

      // Show on the brand list immediately (before network refetch).
      queryClient.setQueriesData<ChallengesResponse>(
        {
          predicate: (query) => {
            const key = query.queryKey;
            return (
              key[0] === "brands" &&
              key[1] === "challenges" &&
              key[2] !== "detail"
            );
          },
        },
        (old) => {
          if (!old || !Array.isArray(old.challenges)) {
            return { challenges: [created], total: 1 };
          }
          if (old.challenges.some((c) => c.id === created.id)) return old;
          return {
            ...old,
            challenges: [created, ...old.challenges],
            total: (old.total ?? old.challenges.length) + 1,
          };
        }
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["challenges"] }),
        queryClient.invalidateQueries({
          queryKey: ["brands", "challenges"],
          refetchType: "active",
        }),
      ]);
    },
  });
}

/**
 * POST /brands/challenges/{id}/fund — start Flutterwave checkout to publish.
 */
export function useFundChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challengeId,
      callbackUrl,
    }: {
      challengeId: string;
      callbackUrl?: string;
    }) => {
      const { data } = await api.post<FundChallengeResponse>(
        `/brands/challenges/${challengeId}/fund`,
        callbackUrl ? { callback_url: callbackUrl } : {}
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["brands", "challenges"] });
    },
  });
}

/**
 * GET /brands/challenges — list the authenticated brand's challenges.
 * Note: summary items omit `media` / `is_funded` — use detail for those.
 * 403 = not a verified brand (wrong role or email/account not verified).
 */
export function useGetBrandChallenges(
  params?: { status?: ChallengeStatus; limit?: number; offset?: number },
  options?: { enabled?: boolean }
) {
  return useQuery<ChallengesResponse>({
    queryKey: ["brands", "challenges", params],
    queryFn: async () => {
      const { data } = await api.get<ChallengesResponse>("/brands/challenges", {
        params: {
          status: params?.status || undefined,
          limit: params?.limit ?? 50,
          offset: params?.offset ?? 0,
        },
      });
      return data;
    },
    enabled: options?.enabled ?? true,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } })?.response
        ?.status;
      if (status === 401 || status === 403) return false;
      return failureCount < 2;
    },
  });
}

/**
 * GET /brands/challenges/{id} — full challenge including media + funding flags.
 */
export function useGetBrandChallenge(
  challengeId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery<ChallengeItem>({
    queryKey: ["brands", "challenges", "detail", challengeId],
    queryFn: async () => {
      const { data } = await api.get<ChallengeItem>(
        `/brands/challenges/${challengeId}`
      );
      return data;
    },
    enabled: (options?.enabled ?? true) && Boolean(challengeId),
  });
}

/**
 * Enrich brand challenge summaries with detail payloads (media, is_funded).
 */
export function useBrandChallengeDetails(
  challengeIds: string[],
  options?: { enabled?: boolean }
) {
  const queries = useQueries({
    queries: challengeIds.map((id) => ({
      queryKey: ["brands", "challenges", "detail", id],
      queryFn: async () => {
        const { data } = await api.get<ChallengeItem>(
          `/brands/challenges/${id}`
        );
        return data;
      },
      enabled: (options?.enabled ?? true) && Boolean(id),
      staleTime: 60_000,
    })),
  });

  const byId: Record<string, ChallengeItem> = {};
  challengeIds.forEach((id, index) => {
    const detail = queries[index]?.data;
    if (detail) byId[id] = detail;
  });

  return {
    byId,
    isLoading: queries.some((q) => q.isLoading),
    isFetching: queries.some((q) => q.isFetching),
  };
}

/**
 * Creator discovery — merges recommended + trending so newly funded
 * active challenges surface even when personalisation ranks them low.
 * There is no public GET /challenges collection.
 */
export function useGetChallenges(
  params?: GetChallengesParams,
  options?: { enabled?: boolean }
) {
  return useQuery<ChallengesResponse>({
    queryKey: ["challenges", "discover", params],
    queryFn: async () => {
      const limit = params?.limit ?? 25;
      const offset = params?.offset ?? params?.skip ?? 0;

      const [recommended, trending] = await Promise.all([
        api.get<ChallengesResponse>("/challenges/recommended", {
          params: { limit, offset },
        }),
        api.get<ChallengesResponse>("/challenges/trending", {
          params: { limit, offset },
        }),
      ]);

      const byId = new Map<string, ChallengeItem>();
      for (const item of [
        ...(recommended.data?.challenges ?? []),
        ...(trending.data?.challenges ?? []),
      ]) {
        if (item?.id && !byId.has(item.id)) byId.set(item.id, item);
      }

      const challenges = Array.from(byId.values());
      return {
        challenges,
        total: Math.max(
          recommended.data?.total ?? 0,
          trending.data?.total ?? 0,
          challenges.length
        ),
      };
    },
    enabled: options?.enabled ?? true,
  });
}

export interface JoinedChallengeItem {
  brand_logo_url: string;
  brand_name: string;
  challenge_id: string;
  currency: string;
  prize_pool: number;
  prize_pool_formatted: string;
  status:
    | "awaiting_review"
    | "under_review"
    | "in_progress"
    | "approved"
    | "not_qualified"
    | "ranked"
    | "winner"
    | "finalist"
    | string;
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

export function useGetJoinedActiveChallenges(
  page: number = 1,
  page_size: number = 8,
  options?: { enabled?: boolean }
) {
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "active", page, page_size],
    queryFn: async () => {
      const response = await api.get<JoinedChallengesResponse>(
        "/challenges/joined/active",
        { params: { page, page_size } }
      );
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
}

export function useGetJoinedCompletedChallenges(
  page: number = 1,
  page_size: number = 8,
  options?: { enabled?: boolean }
) {
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "completed", page, page_size],
    queryFn: async () => {
      const response = await api.get<JoinedChallengesResponse>(
        "/challenges/joined/completed",
        { params: { page, page_size } }
      );
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
}

export interface ChallengeLeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  profile_picture_url?: string | null;
  challenge_score?: number | null;
  final_score?: number | null;
  status?: string;
  placement?: number | null;
  previous_rank?: number | null;
  rank_direction?: "up" | "down" | "same" | "new" | string;
}

export interface ChallengeLeaderboardResponse {
  challenge_id: string;
  is_tentative: boolean;
  entries: ChallengeLeaderboardEntry[];
  requester_rank?: number | null;
  total_entries: number;
}

/** GET /challenges/{challenge_id}/leaderboard */
export function useGetChallengeLeaderboard(
  challengeId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery<ChallengeLeaderboardResponse>({
    queryKey: ["challenges", "leaderboard", challengeId],
    queryFn: async () => {
      const { data } = await api.get<ChallengeLeaderboardResponse>(
        `/challenges/${challengeId}/leaderboard`
      );
      return data;
    },
    enabled: (options?.enabled ?? true) && Boolean(challengeId),
  });
}

export const useGetRecommendedChallenges = (
  limit: number = 20,
  offset: number = 0
) => {
  return useQuery({
    queryKey: ["challenges", "recommended", limit, offset],
    queryFn: async () => {
      const { data } = await api.get("/challenges/recommended", {
        params: { limit, offset },
      });
      return data;
    },
  });
};

export const useGetTrendingChallenges = (
  limit: number = 20,
  offset: number = 0
) => {
  return useQuery({
    queryKey: ["challenges", "trending", limit, offset],
    queryFn: async () => {
      const { data } = await api.get("/challenges/trending", {
        params: { limit, offset },
      });
      return data;
    },
  });
};

export type SubmissionLinkInput = {
  content_url: string;
};

export type SubmissionCreatePayload = {
  links: SubmissionLinkInput[];
  circle_id?: string | null;
};

export type MessageResponse = {
  message: string;
};

/**
 * POST /challenges/{challenge_id}/submit-entry
 * One content_url per platform required by the challenge.
 * Platform / content type / post ID are auto-detected from each URL.
 */
export function useSubmitChallengeEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challengeId,
      payload,
    }: {
      challengeId: string;
      payload: SubmissionCreatePayload;
    }) => {
      const { data } = await api.post<MessageResponse>(
        `/challenges/${challengeId}/submit-entry`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges", "joined"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "discover"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "detail"] });
    },
  });
}

export const useGetChallengeById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["challenges", "detail", id],
    queryFn: async () => {
      if (!id) return null;

      try {
        const { data } = await api.get(`/challenges/${id}/detail`);
        return data;
      } catch (error: any) {
        const status = error?.response?.status;
        // Detail API currently 500s for some challenges; fall back to card data
        // already loaded from recommended/trending/discover feeds.
        const cachedLists = queryClient.getQueriesData<{
          challenges?: ChallengeItem[];
        }>({ queryKey: ["challenges"] });

        for (const [, payload] of cachedLists) {
          const match = payload?.challenges?.find((c) => c.id === id);
          if (match) {
            return {
              ...match,
              _partial: true,
              _detailErrorStatus: status ?? null,
            };
          }
        }

        throw error;
      }
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } })?.response
        ?.status;
      if (status && status >= 400) return false;
      return failureCount < 1;
    },
  });
};

export interface SavedChallengesResponse {
  items: {
    challenge_id: string;
    title: string;
    brand_name: string;
    brand_logo_url: string;
    prize_pool?: number;
    prize_pool_formatted: string;
    currency?: string;
    saved_at?: string;
  }[];
  page?: number;
  page_size?: number;
  total_items: number;
  total_pages?: number;
  prev_url?: string | null;
  next_url?: string | null;
}

export const useGetSavedChallenges = (
  page: number = 1,
  page_size: number = 8,
  options?: { enabled?: boolean }
) => {
  return useQuery<SavedChallengesResponse>({
    queryKey: ["challenges", "saved", page, page_size],
    queryFn: async () => {
      const { data } = await api.get("/challenges/saved", {
        params: { page, page_size },
      });
      return data;
    },
    enabled: options?.enabled ?? true,
  });
};
