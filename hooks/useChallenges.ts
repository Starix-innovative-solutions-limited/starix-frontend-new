/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
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
  is_joined?: boolean;
  has_joined?: boolean;
  has_submitted?: boolean;
  already_submitted?: boolean;
  submission_id?: string | null;
  viewer_submission_id?: string | null;
  media?: ChallengeMedia[];
  submission_eligibility?: "anyone" | "creators" | "circles";
  required_hashtags?: string[] | null;
  required_mentions?: string[] | null;
  platforms?: string[] | null;
  posting_rules?: string | null;
  brief_document_url?: string | null;
  prize_amounts?: Array<number | string> | null;
  prize_amounts_display?: string[] | null;
  category?: string | null;
  categories?: Array<string | { id?: string; name?: string }> | null;
  category_names?: string[] | null;
  objective?: string | null;
  objectives?: string[] | null;
  campaign_objective?: string | null;
  campaign_objectives?: string[] | null;
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

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeChallengeId(value?: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).trim();
  } catch {
    return String(value).trim();
  }
}

function truthyFlag(value: unknown) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function pickTrimmedString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function looksLikeMediaUrl(value: string) {
  const trimmed = value.trim();
  return (
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:")
  );
}

function extractMediaUrl(value: unknown, depth = 0): string | null {
  if (depth > 4 || value == null) return null;
  if (typeof value === "string") {
    return looksLikeMediaUrl(value) ? value.trim() : null;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      const url = extractMediaUrl(entry, depth + 1);
      if (url) return url;
    }
    return null;
  }
  if (typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  return (
    pickTrimmedString(
      item.media_url,
      item.mediaUrl,
      item.public_url,
      item.publicUrl,
      item.file_url,
      item.fileUrl,
      item.image_url,
      item.imageUrl,
      item.url,
      item.src
    ) ||
    extractMediaUrl(item.media, depth + 1) ||
    extractMediaUrl(item.file, depth + 1)
  );
}

function mediaBucketToList(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string" && looksLikeMediaUrl(raw)) return [raw];
  const item = asRecord(raw);
  if (Array.isArray(item.items)) return item.items;
  if (Array.isArray(item.results)) return item.results;
  if (Array.isArray(item.data)) return item.data;
  if (extractMediaUrl(raw)) return [raw];
  return [];
}

function normalizeChallengeMediaList(raw: unknown): ChallengeMedia[] {
  const media: ChallengeMedia[] = [];

  mediaBucketToList(raw).forEach((entry, index) => {
    const media_url = extractMediaUrl(entry);
    if (!media_url) return;

    const item = asRecord(entry);
    const mediaType = String(
      item.media_type ?? item.mediaType ?? item.type ?? ""
    ).toLowerCase();

    media.push({
      id: pickTrimmedString(item.id) ?? undefined,
      media_url,
      media_type:
        mediaType.includes("video") || /\.(mp4|webm|mov)(\?|$)/i.test(media_url)
          ? "video"
          : mediaType.includes("image")
            ? "image"
            : "image",
      display_order:
        typeof item.display_order === "number"
          ? item.display_order
          : typeof item.displayOrder === "number"
            ? item.displayOrder
            : index,
      original_filename:
        pickTrimmedString(
          item.original_filename,
          item.originalFilename,
          item.filename,
          item.name
        ) ?? undefined,
    });
  });

  return media;
}

function collectChallengeMedia(item: Record<string, unknown>): ChallengeMedia[] {
  const seen = new Set<string>();
  const media: ChallengeMedia[] = [];
  const nested = asRecord(item.challenge);
  const buckets = [
    item.media,
    item.sample_media,
    item.sampleMedia,
    item.sample_contents,
    item.attachments,
    item.images,
    nested.media,
    nested.sample_media,
    nested.sampleMedia,
  ];

  for (const bucket of buckets) {
    for (const entry of normalizeChallengeMediaList(bucket)) {
      if (seen.has(entry.media_url)) continue;
      seen.add(entry.media_url);
      media.push(entry);
    }
  }

  const banner = pickTrimmedString(item.banner_url, nested.banner_url);
  if (banner && !seen.has(banner)) {
    media.push({ media_url: banner, media_type: "image" });
  }

  return media;
}

function brandPictureFromChallenge(item: Record<string, unknown>): string | null {
  const brand = asRecord(item.brand);
  const brandProfile = asRecord(item.brand_profile);
  return pickTrimmedString(
    item.brand_profile_picture_url,
    item.brand_logo_url,
    item.brand_image_url,
    item.logo_url,
    brand.profile_picture_url,
    brand.logo_url,
    brand.logo,
    brand.image_url,
    brandProfile.profile_picture_url,
    brandProfile.logo_url
  );
}

export function hasJoinedChallengeFlags(
  challenge?: Pick<
    ChallengeItem,
    | "is_joined"
    | "has_joined"
    | "has_submitted"
    | "already_submitted"
    | "submission_id"
    | "viewer_submission_id"
  > | null
) {
  if (!challenge) return false;
  return (
    truthyFlag(challenge.is_joined) ||
    truthyFlag(challenge.has_joined) ||
    truthyFlag(challenge.has_submitted) ||
    truthyFlag(challenge.already_submitted) ||
    Boolean(challenge.submission_id) ||
    Boolean(challenge.viewer_submission_id)
  );
}

function rowToChallengeItem(raw: unknown): ChallengeItem | null {
  const item = asRecord(raw);
  const id = String(item.id ?? item.challenge_id ?? "").trim();
  if (!id) return null;
  const joined = hasJoinedChallengeFlags({
    is_joined: item.is_joined as boolean | undefined,
    has_joined: item.has_joined as boolean | undefined,
    has_submitted: item.has_submitted as boolean | undefined,
    already_submitted: item.already_submitted as boolean | undefined,
    submission_id: (item.submission_id as string | null | undefined) ?? null,
    viewer_submission_id:
      (item.viewer_submission_id as string | null | undefined) ?? null,
  });
  return {
    ...(item as unknown as ChallengeItem),
    id,
    title: String(item.title ?? "Untitled challenge"),
    brand_name:
      pickTrimmedString(
        item.brand_name,
        asRecord(item.brand).name,
        asRecord(item.brand).brand_name
      ) ?? "",
    brand_profile_picture_url: brandPictureFromChallenge(item),
    media: collectChallengeMedia(item),
    prize_pool_display: String(
      item.prize_pool_display ?? item.prize_pool_formatted ?? ""
    ),
    is_published: Boolean(item.is_published ?? true),
    is_saved: Boolean(item.is_saved),
    is_joined: joined,
    status: String(item.status ?? "active"),
  };
}

function findChallengeInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
): ChallengeItem | undefined {
  const cachedLists = queryClient.getQueriesData({ queryKey: ["challenges"] });

  for (const [, payload] of cachedLists) {
    const root = asRecord(payload);
    const lists = [root.challenges, root.items, root.results];
    for (const list of lists) {
      if (!Array.isArray(list)) continue;
      const match = list
        .map(rowToChallengeItem)
        .find((item) => item?.id === id);
      if (match) return match;
    }
  }

  return undefined;
}

async function fetchChallengeFromDiscoverFeeds(
  id: string
): Promise<ChallengeItem | null> {
  const [recommended, trending, joined] = await Promise.all([
    api.get("/challenges/recommended", {
      params: { limit: 100, offset: 0 },
    }),
    api.get("/challenges/trending", {
      params: { limit: 100, offset: 0 },
    }),
    api.get("/challenges/joined", {
      params: { limit: 100, offset: 0 },
    }).catch(() => ({ data: null })),
  ]);

  const cards = [
    ...unwrapChallengeList(recommended.data).challenges,
    ...unwrapChallengeList(trending.data).challenges,
    ...unwrapChallengeList(joined.data).challenges,
  ];

  return cards.find((item) => item?.id === id) ?? null;
}

function unwrapChallengeDetail(payload: unknown): ChallengeDetailResult {
  const root = asRecord(payload);
  const candidates = [
    root,
    asRecord(root.data),
    asRecord(root.challenge),
    asRecord(asRecord(root.data).challenge),
  ];
  const withId = candidates.filter(
    (item) =>
      typeof item.id === "string" || typeof item.challenge_id === "string"
  );
  const nested =
    withId.find((item) => collectChallengeMedia(item).length > 0) ??
    withId[0] ??
    root;
  const normalized = rowToChallengeItem(nested);
  return {
    ...(nested as unknown as ChallengeDetailResult),
    ...(normalized ?? {}),
  };
}

function withFallbackMedia(
  detail: ChallengeDetailResult,
  extras: Array<ChallengeItem | null | undefined>
): ChallengeDetailResult {
  if ((detail.media?.length ?? 0) > 0) return detail;
  for (const extra of extras) {
    const media = extra?.media ?? collectChallengeMedia(asRecord(extra));
    if (media.length > 0) {
      return { ...detail, media };
    }
  }
  return detail;
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
  categories?: string[];
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
  objectives?: string[];
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
  const challenges = (
    (nested.challenges ?? nested.items ?? []) as unknown[]
  )
    .map(rowToChallengeItem)
    .filter((item): item is ChallengeItem => Boolean(item));
  const totalValue = nested.total;
  const total =
    typeof totalValue === "number" ? totalValue : challenges.length;

  return { challenges, total };
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
      const { data } = await api.get("/brands/challenges", {
        params: {
          status: params?.status || undefined,
          limit: params?.limit ?? 50,
          offset: params?.offset ?? 0,
        },
      });
      return unwrapChallengeList(data);
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
      return rowToChallengeItem(data) ?? data;
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
        return rowToChallengeItem(data) ?? data;
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

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function normalizeJoinedRow(raw: unknown): JoinedChallengeItem | null {
  const item = asRecord(raw);
  const challengeId = String(item.challenge_id ?? item.id ?? "").trim();
  if (!challengeId) return null;

  return {
    challenge_id: challengeId,
    title: String(item.title ?? "Untitled challenge"),
    brand_name: String(item.brand_name ?? ""),
    brand_logo_url: String(
      item.brand_logo_url ?? item.brand_profile_picture_url ?? ""
    ),
    prize_pool: Number(item.prize_pool) || 0,
    prize_pool_formatted: String(
      item.prize_pool_formatted ?? item.prize_pool_display ?? ""
    ),
    currency: String(item.currency ?? "NGN"),
    status: String(item.status ?? "completed"),
  };
}

function paginateJoinedItems(
  items: JoinedChallengeItem[],
  page: number,
  page_size: number,
  totalItems = items.length
): JoinedChallengesResponse {
  const total_pages = Math.max(1, Math.ceil(totalItems / page_size) || 1);
  return {
    items,
    page,
    page_size,
    total_items: totalItems,
    total_pages,
    prev_url: page > 1 ? `?page=${page - 1}&page_size=${page_size}` : null,
    next_url:
      page < total_pages ? `?page=${page + 1}&page_size=${page_size}` : null,
  };
}

function unwrapJoinedPage(
  payload: unknown,
  page: number,
  page_size: number
): JoinedChallengesResponse {
  const root = asRecord(payload);
  const nested =
    Array.isArray(root.items) || Array.isArray(root.challenges)
      ? root
      : asRecord(root.data);

  const rawItems = (nested.items ??
    nested.challenges ??
    nested.results ??
    []) as unknown[];
  const items = rawItems
    .map(normalizeJoinedRow)
    .filter((row): row is JoinedChallengeItem => Boolean(row));

  const totalItems =
    typeof nested.total_items === "number"
      ? nested.total_items
      : typeof nested.total === "number"
        ? nested.total
        : items.length;
  const totalPages =
    typeof nested.total_pages === "number"
      ? nested.total_pages
      : Math.max(1, Math.ceil(totalItems / page_size) || 1);

  return {
    items,
    page: typeof nested.page === "number" ? nested.page : page,
    page_size:
      typeof nested.page_size === "number" ? nested.page_size : page_size,
    total_items: totalItems,
    total_pages: totalPages,
    prev_url:
      typeof nested.prev_url === "string" || nested.prev_url === null
        ? (nested.prev_url as string | null)
        : null,
    next_url:
      typeof nested.next_url === "string" || nested.next_url === null
        ? (nested.next_url as string | null)
        : null,
  };
}

function isFinishedJoinedStatus(status?: string) {
  const value = (status ?? "").toLowerCase();
  return (
    value === "completed" ||
    value === "closed" ||
    value === "ranked" ||
    value === "winner" ||
    value === "finalist"
  );
}

function isCompletedChallengeStatus(status?: string) {
  const value = (status ?? "").toLowerCase();
  return isFinishedJoinedStatus(value) || value === "not_qualified";
}

function excludeFinishedJoined(
  page: JoinedChallengesResponse
): JoinedChallengesResponse {
  const items = page.items.filter(
    (item) => !isFinishedJoinedStatus(item.status)
  );
  const removed = page.items.length - items.length;
  if (removed === 0) return page;

  const total_items = Math.max(0, page.total_items - removed);
  return {
    ...page,
    items,
    total_items,
    total_pages: Math.max(1, Math.ceil(total_items / page.page_size) || 1),
  };
}

async function fetchCompletedJoinedFallback(
  page: number,
  page_size: number
): Promise<JoinedChallengesResponse> {
  const { data } = await api.get("/challenges/joined", {
    params: { limit: 100, offset: 0 },
  });
  const cards = unwrapChallengeList(data).challenges.filter((challenge) =>
    isCompletedChallengeStatus(challenge.status)
  );
  const mapped = cards
    .map(normalizeJoinedRow)
    .filter((row): row is JoinedChallengeItem => Boolean(row));
  const start = (page - 1) * page_size;
  return paginateJoinedItems(
    mapped.slice(start, start + page_size),
    page,
    page_size,
    mapped.length
  );
}

function clampJoinedPageSize(page_size: number) {
  return Math.min(50, Math.max(1, page_size || 8));
}

function shouldRetryJoinedQuery(failureCount: number, error: unknown) {
  const status = (error as { response?: { status?: number } })?.response?.status;
  if (status === 401 || status === 403 || status === 422) return false;
  return failureCount < 1;
}

export function useGetJoinedActiveChallenges(
  page: number = 1,
  page_size: number = 8,
  options?: { enabled?: boolean }
) {
  const size = clampJoinedPageSize(page_size);
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "active", page, size],
    queryFn: async () => {
      const response = await api.get(
        "/challenges/joined/active",
        { params: { page, page_size: size } }
      );
      return excludeFinishedJoined(unwrapJoinedPage(response.data, page, size));
    },
    enabled: options?.enabled ?? true,
    retry: shouldRetryJoinedQuery,
  });
}

export function useGetJoinedCompletedChallenges(
  page: number = 1,
  page_size: number = 8,
  options?: { enabled?: boolean }
) {
  const size = clampJoinedPageSize(page_size);
  return useQuery<JoinedChallengesResponse>({
    queryKey: ["challenges", "joined", "completed", page, size],
    queryFn: async () => {
      let pageData: JoinedChallengesResponse | null = null;
      try {
        const response = await api.get("/challenges/joined/completed", {
          params: { page, page_size: size },
        });
        pageData = unwrapJoinedPage(response.data, page, size);
      } catch {
        // Fall through after collecting any closed rows still listed as active.
      }

      let leaked: JoinedChallengeItem[] = [];
      try {
        const active = await api.get("/challenges/joined/active", {
          params: { page, page_size: size },
        });
        leaked = unwrapJoinedPage(active.data, page, size).items.filter((item) =>
          isFinishedJoinedStatus(item.status)
        );
      } catch {
        leaked = [];
      }

      if (!pageData) {
        if (leaked.length > 0) {
          return paginateJoinedItems(leaked, page, size, leaked.length);
        }
        return fetchCompletedJoinedFallback(page, size);
      }

      const extra = leaked.filter(
        (item) =>
          !pageData.items.some((row) => row.challenge_id === item.challenge_id)
      );
      if (extra.length === 0) {
        if (pageData.items.length > 0 || pageData.total_items > 0) return pageData;
        return fetchCompletedJoinedFallback(page, size);
      }

      return {
        ...pageData,
        items: [...pageData.items, ...extra],
        total_items: Math.max(pageData.total_items, pageData.items.length) + extra.length,
      };
    },
    enabled: options?.enabled ?? true,
    retry: shouldRetryJoinedQuery,
  });
}

export interface ChallengeLeaderboardEntry {
  rank: number;
  user_id?: string | null;
  username?: string | null;
  display_name?: string | null;
  full_name?: string | null;
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
  entrant_type?: "creator" | "circle" | string;
  circle_id?: string | null;
  content_url?: string | null;
  selected_platform?: string | null;
  engagement_captured_at?: string | null;
  refresh_pending?: boolean;
  cover_image_url?: string | null;
  links?: Array<{ content_url: string; platform?: string | null }>;
}

function asLeaderboardEntries(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function optionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeLeaderboardEntry(
  raw: unknown,
  index: number
): ChallengeLeaderboardEntry {
  const item = asRecord(raw);
  const platforms = Array.isArray(item.platforms)
    ? (item.platforms as string[])
    : item.selected_platform
      ? [String(item.selected_platform)]
      : item.platform
        ? [String(item.platform)]
        : [];
  const selectedScore = asRecord(item.selected_score);
  const snapshot = asRecord(selectedScore.snapshot);
  const evidence = asRecord(snapshot.evidence);
  const rawLinks = Array.isArray(item.links) ? item.links : [];
  const links = rawLinks
    .map((link) => {
      const record = asRecord(link);
      const url = String(record.content_url ?? record.url ?? "").trim();
      if (!url) return null;
      return {
        content_url: url,
        platform: record.platform ? String(record.platform) : null,
      };
    })
    .filter((link): link is { content_url: string; platform: string | null } =>
      Boolean(link)
    );

  return {
    ...(item as unknown as ChallengeLeaderboardEntry),
    rank: Number(item.rank) || index + 1,
    user_id: (item.user_id as string | null) ?? null,
    username: (item.username as string | null) ?? null,
    display_name:
      (item.display_name as string | null) ??
      (item.full_name as string | null) ??
      (item.name as string | null) ??
      (item.username as string | null) ??
      null,
    full_name: (item.full_name as string | null) ?? null,
    profile_picture_url: (item.profile_picture_url as string | null) ?? null,
    challenge_score: optionalNumber(item.challenge_score),
    final_score: optionalNumber(item.final_score),
    status: String(item.status ?? "submitted"),
    placement: optionalNumber(item.placement),
    previous_rank: optionalNumber(item.previous_rank),
    rank_direction: (item.rank_direction as string | null) ?? "new",
    platforms,
    total_engagement: optionalNumber(
      item.total_engagement ?? item.engagement_count ?? item.engagements
    ),
    submission_id: (item.submission_id as string | null) ?? null,
    entrant_id: (item.entrant_id as string | null) ?? null,
    entrant_type: (item.entrant_type as string | undefined) ?? "creator",
    circle_id: (item.circle_id as string | null) ?? null,
    content_url: (item.content_url as string | null) ?? null,
    selected_platform: (item.selected_platform as string | null) ?? null,
    refresh_pending: Boolean(item.refresh_pending),
    engagement_captured_at:
      (item.engagement_captured_at as string | null) ??
      (snapshot.captured_at as string | null) ??
      (evidence.captured_at as string | null) ??
      null,
    cover_image_url:
      (evidence.cover_image_url as string | null) ??
      (item.cover_image_url as string | null) ??
      null,
    links: links.length ? links : undefined,
  };
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
      nested.leaderboard ??
      nested.participants ??
      root.entries ??
      root.items ??
      (Array.isArray(payload) ? payload : [])
  ).map(normalizeLeaderboardEntry);

  const total =
    Number(nested.total_entries ?? nested.total ?? root.total_entries ?? root.total) ||
    entries.length;

  return {
    ...(nested as unknown as ChallengeLeaderboardResponse),
    challenge_id: String(nested.challenge_id ?? root.challenge_id ?? ""),
    scoring_state: String(nested.scoring_state ?? root.scoring_state ?? "pending"),
    is_tentative: Boolean(
      nested.is_tentative ?? root.is_tentative ?? nested.scoring_state === "pending"
    ),
    entries,
    total_entries: total,
    total,
  };
}

export interface ChallengeLeaderboardResponse {
  challenge_id: string;
  is_tentative: boolean;
  scoring_state?: string;
  score_freezes_at?: string | null;
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
  options?: { enabled?: boolean; refetchInterval?: number | false }
) {
  return useQuery<ChallengeLeaderboardResponse>({
    queryKey: ["challenges", "leaderboard", challengeId],
    queryFn: async () => {
      const { data } = await api.get(
        `/challenges/${challengeId}/leaderboard`
      );
      return normalizeBrandLeaderboard(data);
    },
    enabled: (options?.enabled ?? true) && Boolean(challengeId),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: options?.refetchInterval,
  });
}

/** GET /brands/challenges/{challenge_id}/leaderboard — brand owner only */
export function useGetBrandChallengeLeaderboard(
  challengeId?: string,
  options?: {
    enabled?: boolean;
    limit?: number;
    offset?: number;
    refetchInterval?: number | false;
  }
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
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: options?.refetchInterval,
  });
}

export type BrandEngagementTrendPoint = {
  label: string;
  value: number;
};

function challengeEngagementTotal(challenge: ChallengeItem) {
  const recorded = Number(challenge.total_engagement);
  if (Number.isFinite(recorded) && recorded > 0) return recorded;
  const views = Number(challenge.viewer_count) || 0;
  const shares = Number(challenge.share_count) || 0;
  const saves = Number(challenge.save_count) || 0;
  const derived = views + shares + saves;
  if (derived > 0) return derived;
  return Number(challenge.participant_count) || 0;
}

/** Live monthly engagement from brand leaderboards (polls every 10s). */
export function useBrandEngagementOverTime(challenges: ChallengeItem[]) {
  const tracked = useMemo(
    () => challenges.slice(0, 25),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [challenges.map((challenge) => challenge.id).join("|")]
  );

  const boards = useQueries({
    queries: tracked.map((challenge) => ({
      queryKey: [
        "brands",
        "challenges",
        "leaderboard",
        challenge.id,
        100,
        0,
      ],
      queryFn: async () => {
        const { data } = await api.get(
          `/brands/challenges/${challenge.id}/leaderboard`,
          { params: { limit: 100, offset: 0 } }
        );
        return normalizeBrandLeaderboard(data);
      },
      enabled: Boolean(challenge.id),
      refetchInterval: 10_000,
      refetchOnWindowFocus: true,
    })),
  });

  const points = useMemo<BrandEngagementTrendPoint[]>(() => {
    const now = new Date();
    const buckets = Array.from({ length: 7 }, (_, index) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (6 - index), 1);
      return {
        label: month.toLocaleString("en-US", { month: "short" }),
        end: new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999),
        value: 0,
      };
    });

    const add = (at: string | undefined | null, value: number) => {
      if (!Number.isFinite(value) || value <= 0) return;
      const time = at ? new Date(at).getTime() : Date.now();
      const captured = Number.isFinite(time) ? time : Date.now();
      for (const bucket of buckets) {
        if (captured <= bucket.end.getTime()) bucket.value += value;
      }
    };

    tracked.forEach((challenge, index) => {
      const entries = boards[index]?.data?.entries ?? [];
      if (entries.length > 0) {
        for (const entry of entries) {
          add(
            entry.engagement_captured_at ??
              challenge.updated_at ??
              challenge.created_at,
            Number(entry.total_engagement) || 0
          );
        }
        return;
      }
      add(
        challenge.updated_at ?? challenge.created_at,
        challengeEngagementTotal(challenge)
      );
    });

    return buckets.map(({ label, value }) => ({ label, value }));
  }, [boards, tracked]);

  return {
    points,
    isLoading: boards.some((board) => board.isLoading && !board.data),
  };
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

export type ChallengeSaveResponse = {
  is_saved: boolean;
  save_count: number;
};

function unwrapSaveStatus(payload: unknown): ChallengeSaveResponse {
  const root = asRecord(payload);
  const nested = asRecord(root.data);
  const source = typeof root.is_saved === "boolean" ? root : nested;
  return {
    is_saved: Boolean(source.is_saved),
    save_count: Number(source.save_count ?? 0),
  };
}

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
    onSuccess: (_data, { challengeId }) => {
      queryClient.setQueryData(
        ["challenges", "detail", challengeId],
        (current: ChallengeDetailResult | null | undefined) =>
          current
            ? {
                ...current,
                is_joined: true,
                has_submitted: true,
                is_saved: false,
              }
            : current
      );
      queryClient.invalidateQueries({ queryKey: ["challenges", "joined"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "saved"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "discover"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "detail"] });
      queryClient.invalidateQueries({ queryKey: ["circle-challenges"] });
      queryClient.invalidateQueries({ queryKey: ["circle-profile"] });

      void (async () => {
        try {
          const { data } = await api.get(`/challenges/${challengeId}/save`);
          if (!unwrapSaveStatus(data).is_saved) return;
          const { data: toggled } = await api.post(
            `/challenges/${challengeId}/save`
          );
          const status = unwrapSaveStatus(toggled);
          queryClient.setQueryData(
            ["challenges", "detail", challengeId],
            (current: ChallengeDetailResult | null | undefined) =>
              current
                ? {
                    ...current,
                    is_saved: status.is_saved,
                    save_count: status.save_count,
                  }
                : current
          );
          queryClient.setQueryData<ChallengeSaveResponse>(
            ["challenges", "save", challengeId],
            status
          );
          queryClient.invalidateQueries({ queryKey: ["challenges", "saved"] });
        } catch {
          queryClient.invalidateQueries({ queryKey: ["challenges", "saved"] });
        }
      })();
    },
  });
}

export const useChallengeSaveStatus = (challengeId?: string) => {
  return useQuery<ChallengeSaveResponse>({
    queryKey: ["challenges", "save", challengeId],
    queryFn: async () => {
      const { data } = await api.get(`/challenges/${challengeId}/save`);
      return unwrapSaveStatus(data);
    },
    enabled: Boolean(challengeId),
  });
};

export const useToggleChallengeSave = (challengeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/challenges/${challengeId}/save`);
      return unwrapSaveStatus(data);
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
      queryClient.setQueryData<ChallengeSaveResponse>(
        ["challenges", "save", challengeId],
        data
      );
      queryClient.invalidateQueries({ queryKey: ["challenges", "saved"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "discover"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "recommended"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "trending"] });
      patchCachedChallengeSave(queryClient, challengeId, data);
    },
  });
};

export type ChallengeShareResponse = {
  share_url: string;
  share_count: number;
};

function unwrapShareResponse(payload: unknown): ChallengeShareResponse {
  const root = asRecord(payload);
  const nested = asRecord(root.data);
  const source = typeof root.share_url === "string" ? root : nested;
  return {
    share_url: String(source.share_url ?? ""),
    share_count: Number(source.share_count ?? 0),
  };
}

function patchCachedChallengeSave(
  queryClient: ReturnType<typeof useQueryClient>,
  challengeId: string,
  data: ChallengeSaveResponse
) {
  const patchList = (current: unknown) => {
    if (!current || typeof current !== "object") return current;
    const record = current as { challenges?: ChallengeItem[] };
    if (!Array.isArray(record.challenges)) return current;
    return {
      ...record,
      challenges: record.challenges.map((item) =>
        item.id === challengeId
          ? { ...item, is_saved: data.is_saved, save_count: data.save_count }
          : item
      ),
    };
  };

  queryClient.setQueriesData({ queryKey: ["challenges", "discover"] }, patchList);
  queryClient.setQueriesData(
    { queryKey: ["challenges", "recommended"] },
    patchList
  );
  queryClient.setQueriesData({ queryKey: ["challenges", "trending"] }, patchList);
}

export function useShareChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challengeId,
      medium = "link",
    }: {
      challengeId: string;
      medium?: string;
    }) => {
      const { data } = await api.post(`/challenges/${challengeId}/share`, {
        medium,
      });
      return unwrapShareResponse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges", "discover"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "recommended"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "trending"] });
      queryClient.invalidateQueries({ queryKey: ["challenges", "detail"] });
    },
  });
}

export const useGetChallengeById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<ChallengeDetailResult | null>({
    queryKey: ["challenges", "detail", id],
    queryFn: async () => {
      const challengeId = normalizeChallengeId(id);
      if (!challengeId) return null;

      try {
        const { data } = await api.get(
          `/challenges/${challengeId}/detail`
        );
        const detail = unwrapChallengeDetail(data);
        if ((detail.media?.length ?? 0) > 0) return detail;

        const cached = findChallengeInCache(queryClient, challengeId);
        if ((cached?.media?.length ?? 0) > 0) {
          return withFallbackMedia(detail, [cached]);
        }

        const fromFeed = await fetchChallengeFromDiscoverFeeds(challengeId);
        return withFallbackMedia(detail, [cached, fromFeed]);
      } catch (error: unknown) {
        const parsed = parseApiError(
          error,
          "Unable to load challenge details."
        );

        if (process.env.NODE_ENV === "development") {
          console.warn("[useGetChallengeById] detail request failed", {
            id: challengeId,
            status: parsed.status,
            message: parsed.message,
          });
        }

        const cached = findChallengeInCache(queryClient, challengeId);
        if (cached) {
          return buildPartialChallenge(cached, parsed, "cache");
        }

        if (parsed.isServerError || parsed.isNotFound) {
          try {
            const fromFeed = await fetchChallengeFromDiscoverFeeds(challengeId);
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
      const pageData = unwrapJoinedPage(data, page, page_size);
      return {
        items: pageData.items.map((item) => ({
          challenge_id: item.challenge_id,
          title: item.title,
          brand_name: item.brand_name,
          brand_logo_url: item.brand_logo_url,
          prize_pool: item.prize_pool,
          prize_pool_formatted: item.prize_pool_formatted,
          currency: item.currency,
        })),
        page: pageData.page,
        page_size: pageData.page_size,
        total_items: pageData.total_items,
        total_pages: pageData.total_pages,
        prev_url: pageData.prev_url,
        next_url: pageData.next_url,
      };
    },
    enabled: options?.enabled ?? true,
  });
};
