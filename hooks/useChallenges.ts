/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";
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
  total_submissions?: number;
  submissions_this_week?: number;
  pending_engagement_submissions?: number;
  measured_submissions?: number;
  total_engagement?: number;
  viewer_count?: number;
  share_count?: number;
  save_count?: number;
  is_funded?: boolean;
  is_published: boolean;
  is_saved?: boolean;
  media?: ChallengeMedia[];
  submission_eligibility?: "anyone" | "creators" | "circles";
  required_hashtags?: string[] | null;
  required_mentions?: string[] | null;
  platforms?: string[] | null;
  posting_rules?: string | null;
  brief_document_url?: string | null;
  prize_amounts?: Array<number | string> | null;
  prize_amounts_display?: string[] | null;
  campaign_objective?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChallengesResponse {
  challenges: ChallengeItem[];
  total: number;
}

export type ChallengeDetailFallbackSource = "cache" | "discover_feed";

export type ChallengeDetailMeta = {
  _partial?: boolean;
  _detailErrorStatus?: number | null;
  _detailErrorMessage?: string;
  _detailFallbackSource?: ChallengeDetailFallbackSource;
};

export type ChallengeDetailResult = ChallengeItem &
  ChallengeDetailMeta & {
    required_hashtags?: string[] | null;
    required_mentions?: string[] | null;
    posting_rules?: string | null;
    brief_document_url?: string | null;
    submission_eligibility?: string;
    platforms?: string[] | null;
    num_winners?: number;
    prize_amounts_display?: string[] | null;
  };

function findChallengeInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
): ChallengeItem | undefined {
  const cachedLists = queryClient.getQueriesData<{
    challenges?: ChallengeItem[];
  }>({ queryKey: ["challenges"] });

  for (const [, payload] of cachedLists) {
    const match = payload?.challenges?.find((c) => c.id === id);
    if (match) return match;
  }

  return undefined;
}

async function fetchChallengeFromDiscoverFeeds(
  id: string
): Promise<ChallengeItem | null> {
  const [recommended, trending] = await Promise.all([
    api.get<ChallengesResponse>("/challenges/recommended", {
      params: { limit: 100, offset: 0 },
    }),
    api.get<ChallengesResponse>("/challenges/trending", {
      params: { limit: 100, offset: 0 },
    }),
  ]);

  for (const item of [
    ...(recommended.data?.challenges ?? []),
    ...(trending.data?.challenges ?? []),
  ]) {
    if (item?.id === id) return item;
  }

  return null;
}

function buildPartialChallenge(
  challenge: ChallengeItem,
  parsed: ReturnType<typeof parseApiError>,
  source: ChallengeDetailFallbackSource
): ChallengeDetailResult {
  return {
    ...challenge,
    _partial: true,
    _detailErrorStatus: parsed.status,
    _detailErrorMessage: parsed.message,
    _detailFallbackSource: source,
  };
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

/** PATCH /brands/challenges/{id} — update an owned draft challenge. */
export function useUpdateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challengeId,
      data,
    }: {
      challengeId: string;
      data: Partial<CreateChallengePayload>;
    }) => {
      const { data: updated } = await api.patch<ChallengeItem>(
        `/brands/challenges/${challengeId}`,
        data
      );
      return updated;
    },
    onSuccess: async (updated) => {
      queryClient.setQueryData(
        ["brands", "challenges", "detail", updated.id],
        updated
      );
      await queryClient.invalidateQueries({
        queryKey: ["brands", "challenges"],
      });
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
function unwrapChallengeList(payload: unknown): ChallengesResponse {
  const root =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const nested =
    root.challenges || root.items
      ? root
      : root.data && typeof root.data === "object"
        ? (root.data as Record<string, unknown>)
        : root;
  const challenges = (nested.challenges ??
    nested.items ??
    []) as ChallengeItem[];
  const totalValue = nested.total;
  const total =
    typeof totalValue === "number" ? totalValue : challenges.length;

  return { challenges, total };
}

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
        api.get("/challenges/recommended", {
          params: { limit, offset },
        }),
        api.get("/challenges/trending", {
          params: { limit, offset },
        }),
      ]);

      const recommendedList = unwrapChallengeList(recommended.data);
      const trendingList = unwrapChallengeList(trending.data);

      const byId = new Map<string, ChallengeItem>();
      for (const item of [
        ...recommendedList.challenges,
        ...trendingList.challenges,
      ]) {
        if (item?.id && !byId.has(item.id)) byId.set(item.id, item);
      }

      const challenges = Array.from(byId.values());
      return {
        challenges,
        total: Math.max(
          recommendedList.total,
          trendingList.total,
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
  user_id?: string | null;
  username?: string | null;
  display_name?: string | null;
  profile_picture_url?: string | null;
  challenge_score?: number | null;
  final_score?: number | null;
  status?: string;
  placement?: number | null;
  previous_rank?: number | null;
  rank_direction?: "up" | "down" | "same" | "new" | string;
  platforms?: string[];
  total_engagement?: number | null;
  submission_id?: string | null;
  entrant_id?: string | null;
  content_url?: string | null;
  selected_platform?: string | null;
  engagement_captured_at?: string | null;
}

function asLeaderboardEntries(value: unknown): ChallengeLeaderboardEntry[] {
  if (Array.isArray(value)) return value as ChallengeLeaderboardEntry[];
  return [];
}

export function normalizeBrandLeaderboard(
  payload: unknown
): ChallengeLeaderboardResponse {
  const root =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const nested =
    root.data && typeof root.data === "object" && !Array.isArray(root.data)
      ? (root.data as Record<string, unknown>)
      : root;

  const entries = asLeaderboardEntries(
    nested.entries ??
      nested.items ??
      nested.results ??
      root.entries ??
      root.items ??
      (Array.isArray(payload) ? payload : [])
  );

  const total =
    Number(nested.total_entries ?? nested.total ?? root.total_entries ?? root.total) ||
    entries.length;

  return {
    ...(nested as unknown as ChallengeLeaderboardResponse),
    challenge_id: String(nested.challenge_id ?? root.challenge_id ?? ""),
    is_tentative: Boolean(nested.is_tentative ?? root.is_tentative),
    entries,
    total_entries: total,
    total,
  };
}

export interface ChallengeLeaderboardResponse {
  challenge_id: string;
  is_tentative: boolean;
  entries: ChallengeLeaderboardEntry[];
  requester_rank?: number | null;
  total_entries: number;
  total?: number;
  limit?: number;
  offset?: number;
}

/** GET /challenges/{challenge_id}/leaderboard — creator accounts only */
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

/** GET /brands/challenges/{challenge_id}/leaderboard — brand owner only */
export function useGetBrandChallengeLeaderboard(
  challengeId?: string,
  options?: { enabled?: boolean; limit?: number; offset?: number }
) {
  const limit = options?.limit ?? 100;
  const offset = options?.offset ?? 0;

  return useQuery<ChallengeLeaderboardResponse>({
    queryKey: [
      "brands",
      "challenges",
      "leaderboard",
      challengeId,
      limit,
      offset,
    ],
    queryFn: async () => {
      const { data } = await api.get(
        `/brands/challenges/${challengeId}/leaderboard`,
        { params: { limit, offset } }
      );
      return normalizeBrandLeaderboard(data);
    },
    enabled: (options?.enabled ?? true) && Boolean(challengeId),
  });
}

export type BrandSubmissionRow = ChallengeLeaderboardEntry & {
  challenge_id: string;
  challenge_title: string;
};

export function submittedCount(challenge?: ChallengeItem | null) {
  if (!challenge) return 0;
  return Math.max(
    challenge.total_submissions ?? 0,
    challenge.participant_count ?? 0,
    challenge.pending_engagement_submissions ?? 0,
    challenge.measured_submissions ?? 0
  );
}

export function useGetBrandChallengeSubmissions(challengeId?: string | null) {
  const list = useGetBrandChallenges(
    { limit: 100, offset: 0 },
    { enabled: !challengeId }
  );
  const single = useGetBrandChallenge(challengeId || undefined, {
    enabled: Boolean(challengeId),
  });

  const challenges: ChallengeItem[] = challengeId
    ? single.data
      ? [single.data]
      : []
    : (list.data?.challenges ?? []);

  const boards = useQueries({
    queries: challenges.map((challenge) => ({
      queryKey: ["brands", "challenges", "leaderboard", challenge.id, 100, 0],
      queryFn: async () => {
        const { data } = await api.get(
          `/brands/challenges/${challenge.id}/leaderboard`,
          { params: { limit: 100, offset: 0 } }
        );
        return normalizeBrandLeaderboard(data);
      },
      enabled: Boolean(challenge.id),
    })),
  });

  const rows: BrandSubmissionRow[] = boards.flatMap((query, index) => {
    const challenge = challenges[index];
    const entries = query.data?.entries ?? [];
    if (!challenge || entries.length === 0) return [];
    return entries.map((entry) => ({
      ...entry,
      challenge_id: challenge.id,
      challenge_title: challenge.title,
    }));
  });

  const rankedByChallenge = new Map(
    challenges.map((challenge, index) => {
      const board = boards[index]?.data;
      const ranked = board?.total_entries || board?.entries?.length || 0;
      return [challenge.id, ranked] as const;
    })
  );

  const totalSubmitted = challenges.reduce(
    (sum, challenge) => sum + submittedCount(challenge),
    0
  );
  const pendingCount = challenges.reduce((sum, challenge) => {
    const ranked = rankedByChallenge.get(challenge.id) ?? 0;
    return sum + Math.max(0, submittedCount(challenge) - ranked);
  }, 0);

  return {
    rows,
    challenges,
    isLoading:
      (challengeId ? single.isLoading : list.isLoading) ||
      boards.some((query) => query.isLoading),
    isError:
      (challengeId ? single.isError : list.isError) ||
      boards.some((query) => query.isError),
    pendingCount,
    totalSubmitted,
  };
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
      return unwrapChallengeList(data);
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
      return unwrapChallengeList(data);
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

export type ChallengeSaveResponse = {
  is_saved: boolean;
  save_count: number;
};

export const useToggleChallengeSave = (challengeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<ChallengeSaveResponse>(
        `/challenges/${challengeId}/save`,
        undefined,
        {
          transformRequest: [
            (_data, headers) => {
              const requestHeaders = headers as
                | { delete?: (name: string) => void }
                | undefined;
              requestHeaders?.delete?.("Content-Type");
              requestHeaders?.delete?.("content-type");
              return undefined;
            },
          ],
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ChallengeDetailResult | null>(
        ["challenges", "detail", challengeId],
        (current) =>
          current
            ? {
                ...current,
                is_saved: data.is_saved,
                save_count: data.save_count,
              }
            : current
      );
      queryClient.invalidateQueries({ queryKey: ["challenges", "saved"] });
    },
  });
};

export const useGetChallengeById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<ChallengeDetailResult | null>({
    queryKey: ["challenges", "detail", id],
    queryFn: async () => {
      if (!id) return null;

      try {
        const { data } = await api.get<ChallengeDetailResult>(
          `/challenges/${id}/detail`
        );
        return data;
      } catch (error: unknown) {
        const parsed = parseApiError(
          error,
          "Unable to load challenge details."
        );

        if (process.env.NODE_ENV === "development") {
          console.warn("[useGetChallengeById] detail request failed", {
            id,
            status: parsed.status,
            message: parsed.message,
          });
        }

        const cached = findChallengeInCache(queryClient, id);
        if (cached) {
          return buildPartialChallenge(cached, parsed, "cache");
        }

        if (parsed.isServerError || parsed.isNotFound) {
          try {
            const fromFeed = await fetchChallengeFromDiscoverFeeds(id);
            if (fromFeed) {
              return buildPartialChallenge(fromFeed, parsed, "discover_feed");
            }
          } catch (feedError) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[useGetChallengeById] discover feed fallback failed",
                feedError
              );
            }
          }
        }

        const enriched = new Error(parsed.message) as Error & {
          status?: number | null;
          isServerError?: boolean;
          isNotFound?: boolean;
          isAuthError?: boolean;
        };
        enriched.status = parsed.status;
        enriched.isServerError = parsed.isServerError;
        enriched.isNotFound = parsed.isNotFound;
        enriched.isAuthError = parsed.isAuthError;
        throw enriched;
      }
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      const status = (error as { status?: number })?.status;
      if (status && status >= 400) return false;
      return failureCount < 1;
    },
  });
};

const PARTIAL_DETAIL_FIELD_CHECKS: Array<{
  key: keyof ChallengeDetailResult;
  label: string;
  isMissing: (value: unknown) => boolean;
}> = [
  {
    key: "required_hashtags",
    label: "Required hashtags",
    isMissing: (v) => !Array.isArray(v) || v.length === 0,
  },
  {
    key: "required_mentions",
    label: "Required mentions",
    isMissing: (v) => !Array.isArray(v) || v.length === 0,
  },
  {
    key: "posting_rules",
    label: "Posting rules",
    isMissing: (v) => typeof v !== "string" || !v.trim(),
  },
  {
    key: "brief_document_url",
    label: "Brief document",
    isMissing: (v) => typeof v !== "string" || !v.trim(),
  },
  {
    key: "prize_amounts_display",
    label: "Prize breakdown",
    isMissing: (v) => !Array.isArray(v) || v.length === 0,
  },
  {
    key: "num_winners",
    label: "Winner count",
    isMissing: (v) => v === undefined || v === null,
  },
];

export function getPartialChallengeMissingFields(
  challenge: ChallengeDetailResult | null | undefined
): string[] {
  if (!challenge?._partial) return [];

  return PARTIAL_DETAIL_FIELD_CHECKS.filter(({ key, isMissing }) =>
    isMissing(challenge[key])
  ).map(({ label }) => label);
}

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
