import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CircleData {
  id: string;
  name: string;
  description: string;
  privacy: "public" | "private";
  niches: string[];
  profile_picture_url: string | null;
  banner_url: string | null;
  member_count: number;
  circle_score: number;
  join_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by_user_id: string;
}

export interface CircleMember {
  id: string;
  name: string;
  role: "Admin" | "Member";
  avatar: string | null;
}

export interface Challenge {
  id: string;
  title: string;
  company: string;
  company_verified: boolean;
  prize_pool: string;
  status: "Under Review" | "Ranked" | "Winner" | "Finalist" | "Not Qualified";
  logo_url: string | null;
}

export interface CircleStats {
  total_earnings: number;
  total_engagement: number;
  engagement_trend_percent: number;
  engagement_trend_direction: "up" | "down";
  global_rank: number | null;
  active_challenges_count: number;
}

export interface PaginatedChallenges {
  data: Challenge[];
  total: number;
  page: number;
  page_size: number;
}

// ─── API helper ───────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : "";

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseCircleProfileParams {
  circleId: string;
}

export function useCircleProfile({ circleId }: UseCircleProfileParams) {
  // ── Challenge filter / pagination state
  const [activeTab, setActiveTab] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [challengePage, setChallengePage] = useState(1);

  // ── Remote data
  const [circle, setCircle] = useState<CircleData | null>(null);
  const [members, setMembers] = useState<CircleMember[]>([]);
  const [stats, setStats] = useState<CircleStats | null>(null);
  const [challenges, setChallenges] = useState<PaginatedChallenges | null>(null);

  // ── Loading / error
  const [loadingCircle, setLoadingCircle] = useState(true);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Derived
  const isEmpty =
    !circle ||
    (circle.member_count <= 1 && (challenges?.total ?? 0) === 0);

  const totalPages = challenges
    ? Math.ceil(challenges.total / (challenges.page_size || 10))
    : 1;

  // ─── Fetchers ──────────────────────────────────────────────────────────────

  const fetchCircle = useCallback(async () => {
    if (!circleId) return;
    setLoadingCircle(true);
    setError(null);
    try {
      const [circleData, membersData, statsData] = await Promise.all([
        apiFetch<CircleData>(`/circles/${circleId}`),
        apiFetch<CircleMember[]>(`/circles/${circleId}/members`),
        apiFetch<CircleStats>(`/circles/${circleId}/stats`),
      ]);
      setCircle(circleData);
      setMembers(membersData);
      setStats(statsData);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load circle");
    } finally {
      setLoadingCircle(false);
    }
  }, [circleId]);

  const fetchChallenges = useCallback(async () => {
    if (!circleId) return;
    setLoadingChallenges(true);
    try {
      const data = await apiFetch<PaginatedChallenges>(
        `/circles/${circleId}/challenges?status=${activeTab.toLowerCase()}&page=${challengePage}&search=${encodeURIComponent(searchQuery)}`
      );
      setChallenges(data);
    } catch {
      // Non-fatal — show empty list rather than crashing
      setChallenges({ data: [], total: 0, page: 1, page_size: 10 });
    } finally {
      setLoadingChallenges(false);
    }
  }, [circleId, activeTab, challengePage, searchQuery]);

  useEffect(() => { fetchCircle(); }, [fetchCircle]);
  useEffect(() => { fetchChallenges(); }, [fetchChallenges]);

  // ─── Mutations ─────────────────────────────────────────────────────────────

  const updateBannerUrl = useCallback(
    async (url: string) => {
      try {
        const updated = await apiFetch<CircleData>(`/circles/${circleId}`, {
          method: "PATCH",
          body: JSON.stringify({ banner_url: url }),
        });
        setCircle(updated);
      } catch (err: any) {
        console.error("Banner update failed:", err?.message);
      }
    },
    [circleId]
  );

  // ─── Tab / search helpers (reset page on change) ───────────────────────────

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setChallengePage(1);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setChallengePage(1);
  }, []);

  return {
    // Data
    circle,
    members,
    stats,
    challenges,

    // Loading / error
    loadingCircle,
    loadingChallenges,
    error,

    // Derived
    isEmpty,
    totalPages,

    // Filter state (read)
    activeTab,
    searchQuery,
    challengePage,

    // Filter state (write)
    handleTabChange,
    handleSearchChange,
    setChallengePage,

    // Actions
    fetchCircle,   // exposed so the error retry button can call it
    updateBannerUrl,
  };
}