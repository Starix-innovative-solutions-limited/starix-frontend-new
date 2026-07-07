import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface EarningsData {
  currency: string;
  total_minor: number;
}

interface EarningsResponse {
  lifetime_earnings: EarningsData[];
  circle_earnings: EarningsData[];
  creator_earnings: EarningsData[];
}

export const useEarnings = () => {
  return useQuery<EarningsResponse, Error>({
    queryKey: ["analytics-earnings"],
    queryFn: async () => {
      const { data } = await api.get<EarningsResponse>("/analytics/me/earnings");
      return data;
    },
  });
};

interface ChartPoint {
  x: string;
  y: number | null;
}

interface RankResponse {
  current_rank: number | null;
  direction: "up" | "down" | "flat" | "new";
  delta_count: number;
  weekly_chart: {
    points: ChartPoint[];
    y_min: number;
    y_max: number;
  };
}

export const useRank = () => {
  return useQuery<RankResponse, Error>({
    queryKey: ["analytics-rank"],
    queryFn: async () => {
      const { data } = await api.get<RankResponse>("/analytics/me/rank");
      return data;
    },
  });
};

interface ChallengeBucket {
  total_count: number;
  ranked_count: number;
  under_review_count: number;
  not_qualified_count: number;
}

interface ChallengesResponse {
  lifetime_challenge_count: number;
  active: ChallengeBucket;
  completed: ChallengeBucket;
}

export const useChallenges = () => {
  return useQuery<ChallengesResponse, Error>({
    queryKey: ["analytics-challenges"],
    queryFn: async () => {
      const { data } = await api.get<ChallengesResponse>("/analytics/me/challenges");
      return data;
    },
  });
};

interface Metric {
  value: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export interface EngagementData {
  followers: Metric;
  likes: Metric;
  views: Metric;
  comments: Metric;
  monthly_chart: { points: { x: string; y: number }[]; y_min: number; y_max: number };
}

export interface EngagementResponse {
  overall: EngagementData;
  instagram: EngagementData | null;
  tiktok: EngagementData | null;
  youtube: EngagementData | null;
  [key: string]: EngagementData | null;
}

export const useEngagement = () => {
  return useQuery<EngagementResponse, Error>({
    queryKey: ["analytics-engagement"],
    queryFn: async () => {
      const { data } = await api.get<EngagementResponse>("/analytics/me/engagement");
      return data;
    },
  });
};

interface SpiderSeries {
  platform: string;
  values: number[];
  skipped_components: string[];
}

export interface StarixScoreResponse {
  overall_score: number | null;
  best_performing_platform: string | null;
  per_platform: Record<string, number | null>;
  spider: {
    dimensions: string[];
    series: SpiderSeries[];
  };
}

export const useStarixScore = () => {
  return useQuery<StarixScoreResponse, Error>({
    queryKey: ["analytics-starix-score"],
    queryFn: async () => {
      const { data } = await api.get<StarixScoreResponse>("/analytics/me/starix-score");
      return data;
    },
  });
};

interface TrendPoint {
  x: string;
  y: number | null;
}

export interface EngagementTrendResponse {
  lifetime_engagement_count: number;
  monthly_chart: {
    points: TrendPoint[];
    y_min: number;
    y_max: number;
  };
}

export const useEngagementTrend = () => {
  return useQuery<EngagementTrendResponse, Error>({
    queryKey: ["analytics-engagement-trend"],
    queryFn: async () => {
      const { data } = await api.get<EngagementTrendResponse>(
        "/analytics/me/engagement-trend"
      );
      return data;
    },
  });
};

interface PlatformEngagement {
  value: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export interface TotalEngagementsResponse {
  lifetime_engagement_count: number;
  per_platform: Record<string, PlatformEngagement>;
}

export const useTotalEngagements = () => {
  return useQuery<TotalEngagementsResponse, Error>({
    queryKey: ["analytics-total-engagements"],
    queryFn: async () => {
      const { data } = await api.get<TotalEngagementsResponse>(
        "/analytics/me/total-engagements"
      );
      return data;
    },
  });
};

interface ProfileClicksResponse {
  unique_clicks_count: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export const useProfileClicks = () => {
  return useQuery<ProfileClicksResponse, Error>({
    queryKey: ["analytics-profile-clicks"],
    queryFn: async () => {
      const { data } = await api.get<ProfileClicksResponse>(
        "/analytics/me/profile-clicks"
      );
      return data;
    },
  });
};